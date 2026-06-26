/**
 * Build Worker
 * 
 * Executes build tasks for individual files.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { resolve, join, basename, extname } from "path";
import { marked } from "marked";
import katex from "katex";

export interface WorkerOptions {
  contentDir: string;
  distDir: string;
  templatePath: string;
}

export class BuildWorker {
  private contentDir: string;
  private distDir: string;
  private template: string;

  constructor(options: WorkerOptions) {
    this.contentDir = resolve(options.contentDir);
    this.distDir = resolve(options.distDir);
    this.template = readFileSync(options.templatePath, "utf-8");
  }

  /**
   * Build a single file
   */
  async build(file: string): Promise<BuildResult> {
    const startTime = Date.now();
    
    try {
      // Ensure dist directory exists
      if (!existsSync(this.distDir)) {
        mkdirSync(this.distDir, { recursive: true });
      }

      // Read source file
      const sourcePath = join(this.contentDir, file);
      const markdown = readFileSync(sourcePath, "utf-8");

      // Process: frontmatter → custom blocks → KaTeX → markdown → post-process
      const processed = this.processMarkdown(markdown);
      
      // Parse to HTML
      let html = marked.parse(processed) as string;
      
      // Post-process headings
      html = this.postProcessHTML(html);

      // Wrap in template
      const output = this.template.replace("{{content}}", html);

      // Write output
      const outputName = file.replace(/\.md$/, ".html");
      const outputPath = join(this.distDir, outputName);
      writeFileSync(outputPath, output);

      const elapsed = Date.now() - startTime;
      
      return {
        success: true,
        file,
        output: outputName,
        elapsed,
        size: output.length,
      };
    } catch (error) {
      return {
        success: false,
        file,
        elapsed: Date.now() - startTime,
        error: error instanceof Error ? error.message : String(error),
      };
    }
  }

  /**
   * Clean and rebuild all content
   */
  async rebuildAll(files: string[]): Promise<BuildResult[]> {
    const results: BuildResult[] = [];
    
    for (const file of files) {
      results.push(await this.build(file));
    }
    
    return results;
  }

  private processMarkdown(text: string): string {
    // 1. Extract and strip frontmatter
    text = this.stripFrontmatter(text);
    
    // 2. Process custom blocks
    text = this.processCustomBlocks(text);
    
    // 3. Render KaTeX
    text = this.renderKaTeX(text);
    
    return text;
  }

  private stripFrontmatter(text: string): string {
    const match = text.match(/^---\n[\s\S]*?\n---\n?/);
    if (match) {
      return text.slice(match[0].length);
    }
    return text;
  }

  private processCustomBlocks(text: string): string {
    // sidenote blocks
    text = text.replace(/:::sidenote\n([\s\S]*?):::/g, (_, content) => {
      return `<aside class="sidenote">${content.trim()}</aside>`;
    });
    
    // newthought blocks
    text = text.replace(/:::newthought\n?([\s\S]*?):::/g, (_, content) => {
      return `<div class="newthought">${content.trim()}</div>`;
    });
    
    // margin-figure blocks
    text = text.replace(/:::margin-figure:([^\n]+)\n([\s\S]*?):::/g, (_, caption, content) => {
      return `<figure class="margin-figure">\n${content}\n<figcaption>${caption}</figcaption>\n</figure>`;
    });
    
    // figure blocks with caption
    text = text.replace(/:::figure:(\d+\.\d+):([^\n]+)\n([\s\S]*?):::/g, (_, num, caption, content) => {
      return `<figure class="full-width">\n${content}\n<figcaption>Figure ${num}: ${caption}</figcaption>\n</figure>`;
    });
    
    return text;
  }

  private renderKaTeX(text: string): string {
    // Display math: $$...$$
    text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
      } catch {
        return `<span class="katex-error">${this.escapeHtml(math)}</span>`;
      }
    });

    // Inline math: $...$
    text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
      try {
        return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
      } catch {
        return `<span class="katex-error">${this.escapeHtml(math)}</span>`;
      }
    });

    return text;
  }

  private postProcessHTML(html: string): string {
    // Section headings with § prefix
    html = html.replace(/<h2>(§\d+\.\d+(?:\.\d+)?)\s+([^<]+)<\/h2>/g, (_, number, title) => {
      return `<h2 class="section"><span class="section-number">${number}</span>${title.trim()}</h2>`;
    });
    
    // Subsection headings
    html = html.replace(/<h3>(§\d+\.\d+\.\d+)\s+([^<]+)<\/h3>/g, (_, number, title) => {
      return `<h3 class="subsection"><span class="subsection-number">${number}</span>${title.trim()}</h3>`;
    });
    
    // Chapter headings
    html = html.replace(/<h1>([IVX]+[\.\s].*|[Cc]hapter\s+[IVX]+)<\/h1>/g, (_, title) => {
      return `<h1 class="chapter">${title}</h1>`;
    });
    
    return html;
  }

  private escapeHtml(text: string): string {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }
}

export interface BuildResult {
  success: boolean;
  file: string;
  output?: string;
  elapsed: number;
  size?: number;
  error?: string;
}
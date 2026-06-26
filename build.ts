import { marked } from "marked";
import katex from "katex";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { processDiagrams, injectDiagrams } from "./src/agents/diagrams";
import { resolve, join } from "node:path";

// === Configuration ===
const CONTENT_DIR = resolve("./content");
const DIST_DIR = resolve("./dist");
const TEMPLATE_PATH = resolve("./src/templates/layout.html");
const STYLES_DIR = resolve("./src/styles");

// === Pre-processors ===

// Strip YAML frontmatter
function stripFrontmatter(text: string): string {
  const match = text.match(/^---\n[\s\S]*?\n---\n?/);
  if (match) {
    return text.slice(match[0].length);
  }
  return text;
}

// Extract frontmatter metadata
function extractFrontmatter(text: string): { text: string; meta: Record<string, string> } {
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) {
    return { text, meta: {} };
  }
  const yaml = match[1];
  const meta: Record<string, string> = {};
  
  for (const line of yaml.split("\n")) {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length > 0) {
      meta[key.trim()] = valueParts.join(":").trim();
    }
  }
  
  return {
    text: text.slice(match[0].length),
    meta
  };
}

// Process custom block syntax: :::sidenote, :::newthought, :::figure
function processCustomBlocks(text: string): string {
  // sidenote blocks: :::sidenote ... ::: or :::sidenote:Title ... :::
  text = text.replace(/:::sidenote:([^\n]+)\n([\s\S]*?):::/g, (_, title, content) => {
    return `<aside class="sidenote"><span class="sidenote-title">${title.trim()}</span>${content.trim()}</aside>`;
  });
  
  text = text.replace(/:::sidenote\n([\s\S]*?):::/g, (_, content) => {
    return `<aside class="sidenote">${content.trim()}</aside>`;
  });
  
  // newthought blocks: :::newthought ... :::
  text = text.replace(/:::newthought\n?([\s\S]*?):::/g, (_, content) => {
    return `<div class="newthought">${content.trim()}</div>`;
  });
  
  // explanation blocks: :::explanation ... :::
  text = text.replace(/:::explanation\n?([\s\S]*?):::/g, (_, content) => {
    return `<div class="explanation"><p class="explanation-label">What this means:</p>${content.trim()}</div>`;
  });
  
  // margin-figure blocks: :::margin-figure:caption... :::
  text = text.replace(/:::margin-figure:([^\n]+)\n([\s\S]*?):::/g, (_, caption, content) => {
    return `<figure class="margin-figure">\n${content}\n<figcaption>${caption}</figcaption>\n</figure>`;
  });
  
  // figure blocks with caption: :::figure:num:caption... :::
  text = text.replace(/:::figure:(\d+\.\d+):([^\n]+)\n([\s\S]*?):::/g, (_, num, caption, content) => {
    // Check if content has code fences and wrap in pre, or clean up fences
    let innerContent = content.trim();
    // Strip outer triple backticks if present
    innerContent = innerContent.replace(/^```\n?/, '').replace(/\n?```$/, '');
    // Wrap in pre tags for proper monospace rendering
    innerContent = `<pre><code>${innerContent}</code></pre>`;
    return `<figure class="full-width">\n${innerContent}\n<figcaption>Figure ${num}: ${caption}</figcaption>\n</figure>`;
  });
  
  return text;
}

// Post-process HTML: add classes and ids based on heading content
function postProcessHTML(html: string): string {
  // Section headings with § prefix: <h2>§1.1 Title</h2>
  html = html.replace(/<h2>(§\d+\.\d+(?:\.\d+)?)\s+([^<]+)<\/h2>/g, (_, number, title) => {
    const id = number.replace(/§/g, "section-").replace(/\./g, "-");
    return `<h2 class="section" id="${id}"><span class="section-number">${number}</span>${title.trim()}</h2>`;
  });
  
  // Subsection headings with § prefix
  html = html.replace(/<h3>(§\d+\.\d+\.\d+)\s+([^<]+)<\/h3>/g, (_, number, title) => {
    const id = number.replace(/§/g, "section-").replace(/\./g, "-");
    return `<h3 class="subsection" id="${id}"><span class="subsection-number">${number}</span>${title.trim()}</h3>`;
  });
  
  // Chapter headings (standalone numbers or "Chapter X" style)
  html = html.replace(/<h1>([IVX]+[\.\s].*|[Cc]hapter\s+[IVX]+)<\/h1>/g, (_, title) => {
    return `<h1 class="chapter">${title}</h1>`;
  });
  
  return html;
}

// === KaTeX Pre-processing ===
function renderKaTeX(text: string): string {
  // Display math: $$...$$
  text = text.replace(/\$\$([\s\S]+?)\$\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch (e) {
      return `<span class="katex-error">${math}</span>`;
    }
  });

  // Inline math: $...$
  text = text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch (e) {
      return `<span class="katex-error">${math}</span>`;
    }
  });

  return text;
}

// === Table of Contents Generation ===

interface TocEntry {
  level: number;
  title: string;
  anchor: string;
  file: string;
}

function generateTOC(files: string[], detailed: boolean = false): string {
  // Group entries by file
  const chapters: { file: string; title: string; anchor: string; sections: TocEntry[] }[] = [];
  
  // Sort files by name to get consistent ordering
  const sortedFiles = [...files].sort((a, b) => {
    if (a.startsWith("00-") && !b.startsWith("00-")) return -1;
    if (!a.startsWith("00-") && b.startsWith("00-")) return 1;
    return a.localeCompare(b);
  });
  
  for (const file of sortedFiles) {
    // Skip front matter files
    if (file.startsWith("00-")) continue;
    
    const inputPath = join(CONTENT_DIR, file);
    const stat = statSync(inputPath);
    if (!stat.isFile()) continue;
    
    const markdown = readFileSync(inputPath, "utf-8");
    const { text: content } = extractFrontmatter(markdown);
    
    // Extract h1 (chapters)
    const h1Match = content.match(/^#\s+(.+)$/m);
    if (h1Match) {
      const chapter = {
        file,
        title: h1Match[1].trim(),
        anchor: file.replace(".md", ".html"),
        sections: [] as TocEntry[]
      };
      
      if (detailed) {
        // Extract h2 (sections)
        const h2Matches = content.matchAll(/^##\s+(§\d+\.\d+(?:\.\d+)?)\s+(.+)$/gm);
        for (const match of h2Matches) {
          const number = match[1];
          const sectionTitle = match[2].trim();
          const anchorId = number.replace(/§/g, "section-").replace(/\./g, "-");
          chapter.sections.push({
            level: 2,
            title: `${number} ${sectionTitle}`,
            anchor: `${file.replace(".md", ".html")}#${anchorId}`,
            file
          });
        }
        
        // Extract h3 (subsections)
        const h3Matches = content.matchAll(/^###\s+(§\d+\.\d+\.\d+)\s+(.+)$/gm);
        for (const match of h3Matches) {
          const number = match[1];
          const sectionTitle = match[2].trim();
          const anchorId = number.replace(/§/g, "section-").replace(/\./g, "-");
          chapter.sections.push({
            level: 3,
            title: `${number} ${sectionTitle}`,
            anchor: `${file.replace(".md", ".html")}#${anchorId}`,
            file
          });
        }
      }
      
      chapters.push(chapter);
    }
  }
  
  // Generate HTML
  let html = '<nav class="toc" id="contents">\n';
  html += '<h1 class="toc-title">Contents</h1>\n';
  html += '<ol class="toc-list">\n';
  
  for (const chapter of chapters) {
    html += `  <li class="toc-level-1"><a href="${chapter.anchor}">${chapter.title}</a>`;
    
    if (chapter.sections.length > 0) {
      html += '\n    <ol class="toc-sections">\n';
      for (const section of chapter.sections) {
        const indent = section.level === 3 ? '      ' : '    ';
        html += `${indent}<li class="toc-level-${section.level}"><a href="${section.anchor}">${section.title}</a></li>\n`;
      }
      html += '    </ol>\n  </li>\n';
    } else {
      html += '</li>\n';
    }
  }
  
  html += '</ol>\n</nav>';
  
  return html;
}

function buildContentsPage(detailed: boolean = false): string {
  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md"));
  
  const tocHtml = generateTOC(files, detailed);
  
  let output = template.replace("{{content}}", tocHtml);
  output = output.replace(
    '<div id="pob-content" class="pob-content">',
    '<div id="pob-content" class="pob-content contents-page use-layout">'
  );
  output = output.replace("<title>{{title}}</title>", "<title>Contents</title>");
  
  return output;
}

// === Build Pipeline ===
export async function build(opts: { clean?: boolean } = {}) {
  const clean = opts.clean ?? true;
  if (clean) {
    console.log("🧹 Clearing dist/...");
    if (existsSync(DIST_DIR)) {
      rmSync(DIST_DIR, { recursive: true });
    }
  }
  mkdirSync(DIST_DIR, { recursive: true });

  console.log("Copying CSS files...");
  if (existsSync(STYLES_DIR)) {
    // Only copy pob.css (the unified content stylesheet)
    const pobCss = join(STYLES_DIR, "pob.css");
    if (existsSync(pobCss)) {
      const css = readFileSync(pobCss, "utf-8");
      writeFileSync(join(DIST_DIR, "pob.css"), css);
      console.log("  -> pob.css");
    }
  }

  console.log("📄 Reading template...");
  const template = readFileSync(TEMPLATE_PATH, "utf-8");

  console.log("📚 Processing content...");
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md"));

  for (const file of files) {
    const inputPath = join(CONTENT_DIR, file);
    const stat = statSync(inputPath);
    if (!stat.isFile()) continue;

    console.log(`  → ${file}`);

    const markdown = readFileSync(inputPath, "utf-8");
    
    // 1. Extract and strip frontmatter
    const { text: content, meta } = extractFrontmatter(markdown);
    
    // 2. Process custom blocks (sidenote, newthought, figure, etc.)
    const step1 = processCustomBlocks(content);
    // Process diagrams (ASCII art, Mermaid) before markdown parsing
    const { content: diagramContent, diagrams } = await processDiagrams(step1);
    
    // 3. Render KaTeX math (before markdown parsing so $...$ patterns exist)
    const step2 = renderKaTeX(diagramContent);
    
    // 4. Parse markdown to HTML
    let body = marked.parse(step2) as string;
    
    // 5. Inject diagram SVGs (placeholders were emitted before parsing)
    body = injectDiagrams(body, diagrams);
    
    // 6. Post-process HTML: add classes to headings based on §X.Y pattern
    body = postProcessHTML(body);

    let output = template.replace("{{title}}", meta.title || "Poverty of Biomechanics");
    output = output.replace("{{content}}", body);
    
    // Apply classes to the pob-content container
    // This allows toggling between naked and layout presentation
    const containerClass = meta.style 
      ? `pob-content ${meta.style} use-layout`
      : `pob-content use-layout`;
    output = output.replace(
      '<div id="pob-content" class="pob-content">',
      `<div id="pob-content" class="${containerClass}">`
    );
    
    const outputName = file.replace(".md", ".html");
    writeFileSync(join(DIST_DIR, outputName), output);
  }
  
  // Ensure a root index.html exists (copy from index-page.html)
  const indexPagePath = join(DIST_DIR, "index-page.html");
  if (existsSync(indexPagePath)) {
    const indexDestPath = join(DIST_DIR, "index.html");
    const html = readFileSync(indexPagePath);
    writeFileSync(indexDestPath, html);
    console.log("  -> index.html");
  }

  // Generate contents page
  console.log("  → contents.html");
  const contentsHtml = buildContentsPage(true); // Detailed TOC
  writeFileSync(join(DIST_DIR, "contents.html"), contentsHtml);

  console.log('Built ' + files.length + ' pages + contents to dist/\n');
}

// === CLI (only when invoked directly via `bun run build.ts`) ===
if (import.meta.main) {
const args = Bun.argv.slice(2);

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
pob — Static Site Generator for math-heavy Markdown

Usage:
  bun run build.ts [options]

Options:
  --clean    Clear dist/ before building
  --dry-run  Show what would be built without writing files
  --help     Show this help

Examples:
  bun run build.ts
  bun run build.ts --dry-run
  `);
  process.exit(0);
}

if (args.includes("--dry-run")) {
  console.log("🔍 Dry run — files that would be generated:");
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md"));
  for (const file of files) {
    console.log(`  dist/${file.replace(".md", ".html")}`);
  }
  process.exit(0);
}

build();
} // end import.meta.main
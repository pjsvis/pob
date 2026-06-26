import { marked } from "marked";
import katex from "katex";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";

// === Configuration ===
const CONTENT_DIR = resolve("./content");
const DIST_DIR = resolve("./dist");
const TEMPLATE_PATH = resolve("./src/templates/layout.html");

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
  // sidenote blocks: :::sidenote ... :::
  text = text.replace(/:::sidenote\n([\s\S]*?):::/g, (_, content) => {
    return `<aside class="sidenote">${content.trim()}</aside>`;
  });
  
  // newthought blocks: :::newthought ... :::
  text = text.replace(/:::newthought\n?([\s\S]*?):::/g, (_, content) => {
    return `<div class="newthought">${content.trim()}</div>`;
  });
  
  // margin-figure blocks: :::margin-figure:caption... :::
  text = text.replace(/:::margin-figure:([^\n]+)\n([\s\S]*?):::/g, (_, caption, content) => {
    return `<figure class="margin-figure">\n${content}\n<figcaption>${caption}</figcaption>\n</figure>`;
  });
  
  // figure blocks with caption: :::figure:num:caption... :::
  text = text.replace(/:::figure:(\d+\.\d+):([^\n]+)\n([\s\S]*?):::/g, (_, num, caption, content) => {
    return `<figure class="full-width">\n${content}\n<figcaption>Figure ${num}: ${caption}</figcaption>\n</figure>`;
  });
  
  return text;
}

// Post-process HTML: add classes based on heading content
function postProcessHTML(html: string): string {
  // Section headings with § prefix: <h2>§1.1 Title</h2>
  html = html.replace(/<h2>(§\d+\.\d+(?:\.\d+)?)\s+([^<]+)<\/h2>/g, (_, number, title) => {
    return `<h2 class="section"><span class="section-number">${number}</span>${title.trim()}</h2>`;
  });
  
  // Subsection headings with § prefix
  html = html.replace(/<h3>(§\d+\.\d+\.\d+)\s+([^<]+)<\/h3>/g, (_, number, title) => {
    return `<h3 class="subsection"><span class="subsection-number">${number}</span>${title.trim()}</h3>`;
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

// === Build Pipeline ===
function build() {
  console.log("🧹 Clearing dist/...");
  if (existsSync(DIST_DIR)) {
    rmSync(DIST_DIR, { recursive: true });
  }
  mkdirSync(DIST_DIR, { recursive: true });

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
    const { text: content } = extractFrontmatter(markdown);
    
    // 2. Process custom blocks (sidenote, newthought, figure, etc.)
    const step1 = processCustomBlocks(content);
    
    // 3. Render KaTeX math (before markdown parsing so $...$ patterns exist)
    const step2 = renderKaTeX(step1);
    
    // 4. Parse markdown to HTML
    let body = marked.parse(step2) as string;
    
    // 5. Post-process HTML: add classes to headings based on §X.Y pattern
    body = postProcessHTML(body);

    const output = template.replace("{{content}}", body);
    const outputName = file.replace(".md", ".html");
    writeFileSync(join(DIST_DIR, outputName), output);
  }

  console.log(`\n✅ Built ${files.length} pages to dist/\n`);
}

// === CLI ===
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
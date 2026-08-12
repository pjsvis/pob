import { marked } from "marked";
import katex from "katex";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync, copyFileSync } from "node:fs";
import { processDiagrams, injectDiagrams } from "./src/agents/diagrams";
import { resolve, join } from "node:path";

// === Configuration ===
// Source directories are scanned in order. `content/` holds the book
// structure (front-matter, chapters, index); `briefs/` holds standalone
// articles. Files are keyed by basename, so a name must be unique across
// all source dirs (the first directory wins on collision).
const SOURCE_DIRS = [resolve("./content"), resolve("./briefs")];
const DIST_DIR = resolve("./dist");
const TEMPLATE_PATH = resolve("./src/templates/layout.html");
const STYLES_DIR = resolve("./src/styles");

// Collect every markdown file across all source directories, de-duplicated
// by basename. Returns an array of { file, dir } in stable sort order.
function collectMarkdownFiles(): { file: string; dir: string }[] {
  const seen = new Set<string>();
  const out: { file: string; dir: string }[] = [];
  for (const dir of SOURCE_DIRS) {
    if (!existsSync(dir)) continue;
    for (const f of readdirSync(dir)) {
      if (!f.endsWith(".md")) continue;
      if (seen.has(f)) continue; // first dir wins
      seen.add(f);
      out.push({ file: f, dir });
    }
  }
  // Stable sort: front-matter (00-) first, then lexicographic.
  out.sort((a, b) => {
    if (a.file.startsWith("00-") && !b.file.startsWith("00-")) return -1;
    if (!a.file.startsWith("00-") && b.file.startsWith("00-")) return 1;
    return a.file.localeCompare(b.file);
  });
  return out;
}

/**
 * Is this file part of the reader-facing manuscript?
 *   - all of content/ (front matter, part dividers, demos, essays)
 *   - briefs/chapter-*.md and briefs/appendix-*.md (the book proper)
 * Working documents (other briefs, session notes, debriefs) are rendered into
 * the index's "Other Documents" section but are NOT gated: they legitimately
 * show `$$` examples inside prose and code fences. The gate protects the
 * reader; the reader reads the manuscript. Matches AGENTS.md §2.
 */
function isManuscript(file: string, dir: string): boolean {
  if (dir === resolve("./content")) return true;
  if (dir === resolve("./briefs")) {
    const f = file.toLowerCase();
    return f.startsWith("chapter-") || f.startsWith("appendix-");
  }
  return false;
}

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

  // diagram blocks: :::diagram:name ... caption ... :::
  // References a pre-rendered SVG by name (looked up at diagrams/<name>.svg)
  // and wraps it in a <figure class="diagram"> with a figcaption. The block
  // content is the caption text (also used as the alt attribute). Use this to
  // embed a pre-exported SVG (e.g. a reviewed diagram from dist/diagrams/)
  // with a named reference. For inline ASCII authoring, use a fenced code
  // block instead — the hybrid pipeline auto-detects and renders it.
  text = text.replace(/:::diagram:([\w\-]+)\n([\s\S]*?):::/g, (_, name, content) => {
    const caption = content.trim();
    const svgPath = `diagrams/${name}.svg`;
    const alt = caption.replace(/"/g, '&quot;');
    return `<figure class="diagram" data-diagram="${name}">\n<img src="${svgPath}" alt="${alt}" />\n<figcaption>${caption}</figcaption>\n</figure>`;
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

// === KaTeX math extraction (shared) ===
// Single source of truth for "what is a math span." Consumed by:
//   - renderKaTeX   (renders, throwOnError:false — resilient)
//   - validateMath  (build-time gate, throwOnError:true — fails the build)
//   - scripts/extract-display-equations.ts (inventory)
// Keeping the patterns in one place means render and validate cannot disagree
// on what counts as math. See decisions/011-math-rendering-and-verification.md.

export const DISPLAY_MATH_RE = /\$\$([\s\S]+?)\$\$/g;
export const INLINE_MATH_RE = /\$([^\$\n]+?)\$/g;

export type MathKind = "display" | "inline";
export interface MathSpan {
  latex: string;
  kind: MathKind;
  /** 1-indexed line of the opening delimiter in the source text. */
  line: number;
}
export interface MathError {
  file: string;
  line: number;
  kind: MathKind;
  latex: string;
  message: string;
}

/** Extract every math span from text, each with its 1-indexed source line. */
export function extractMath(text: string): MathSpan[] {
  const spans: MathSpan[] = [];
  const lineOf = (i: number) => text.slice(0, i).split("\n").length;

  // Display first: the inline regex's negated class means it cannot match
  // inside a $$ pair, so display is naturally excluded from inline results.
  for (const m of text.matchAll(DISPLAY_MATH_RE)) {
    spans.push({ latex: m[1].trim(), kind: "display", line: lineOf(m.index!) });
  }
  for (const m of text.matchAll(INLINE_MATH_RE)) {
    const start = m.index!;
    // Belt-and-braces: skip a $ that is the boundary of a $$ delimiter.
    if (text[start - 1] === "$") continue;
    if (text[start + m[0].length] === "$") continue;
    spans.push({ latex: m[1].trim(), kind: "inline", line: lineOf(start) });
  }
  return spans;
}

/**
 * Validate every math span parses under throwOnError:true. Returns one entry
 * per failure. The renderer keeps throwOnError:false (resilient); this is the
 * build-time gate ensuring a broken equation never ships silently.
 */
export function validateMath(file: string, text: string): MathError[] {
  const errors: MathError[] = [];
  for (const s of extractMath(text)) {
    try {
      katex.renderToString(s.latex, { displayMode: s.kind === "display", throwOnError: true });
    } catch (e) {
      errors.push({ file, line: s.line, kind: s.kind, latex: s.latex, message: (e as Error).message });
    }
  }
  return errors;
}

// === KaTeX rendering ===
function renderKaTeX(text: string): string {
  // Display math: $$...$$
  text = text.replace(DISPLAY_MATH_RE, (_match, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: true, throwOnError: false });
    } catch {
      return `<span class="katex-error">${math}</span>`;
    }
  });

  // Inline math: $...$
  text = text.replace(INLINE_MATH_RE, (_match, math) => {
    try {
      return katex.renderToString(math.trim(), { displayMode: false, throwOnError: false });
    } catch {
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

function generateTOC(files: { file: string; dir: string }[], detailed: boolean = false): string {
  // Group entries by file
  const chapters: { file: string; title: string; anchor: string; sections: TocEntry[] }[] = [];
  
  const sortedFiles = [...files]; // already sorted by collectMarkdownFiles
  
  for (const { file, dir } of sortedFiles) {
    // Skip front matter files
    if (file.startsWith("00-")) continue;
    
    const inputPath = join(dir, file);
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

// Categorize a markdown file into a book-order bucket.
// 0 = front matter (00-), 1 = part divider, 2 = chapter, 3 = appendix, 4 = book-structure, 5 = other
function bookOrder(file: string): number {
  if (file.startsWith("00-")) return 0;
  if (file.startsWith("part-")) return 1;
  if (file.startsWith("chapter-")) return 2;
  if (file.startsWith("appendix-")) return 3;
  if (file === "book-structure.md") return 4;
  return 5;
}

// Build the auto-generated, two-section link listing for the root index page.
// Section 1: The Book (front matter, part dividers, chapters, appendix, book-structure).
// Section 2: Other Documents (essays & demonstrations, then project documents).
// The listing is injected into the rendered index-page.html so the intro text
// stays authorable in Markdown while the links never go stale.
function buildIndexListing(files: { file: string; dir: string }[]): string {
  interface Entry { file: string; dir: string; title: string; href: string; }
  const book: Entry[] = [];
  const other: Entry[] = [];

  for (const { file, dir } of files) {
    if (file === "index-page.md") continue; // don't list the index itself
    const inputPath = join(dir, file);
    if (!statSync(inputPath).isFile()) continue;
    const markdown = readFileSync(inputPath, "utf-8");
    const { text: content, meta } = extractFrontmatter(markdown);
    const h1Match = content.match(/^#\s+(.+)$/m);
    const title = h1Match ? h1Match[1].trim() : (meta.title || file.replace(/\.md$/, "").replace(/-/g, " "));
    const entry: Entry = { file, dir, title, href: file.replace(/\.md$/, ".html") };
    if (bookOrder(file) < 5) book.push(entry); else other.push(entry);
  }

  book.sort((a, b) => {
    const oa = bookOrder(a.file), ob = bookOrder(b.file);
    return oa !== ob ? oa - ob : a.file.localeCompare(b.file);
  });
  other.sort((a, b) => a.file.localeCompare(b.file));

  // Split "other" into reader-facing material (content/) vs working project
  // documents (briefs/). Directory is the clean discriminator: files in
  // content/ are essays/demos; files in briefs/ that aren't book matter are
  // briefs, debriefs, session notes, and superseded drafts.
  const essays = other.filter(e => e.dir === resolve("./content"));
  const projectDocs = other.filter(e => e.dir === resolve("./briefs"));

  const list = (entries: Entry[]) =>
    entries.map(e => `  <li><a href="${e.href}">${e.title}</a></li>`).join("\n");

  let html = "\n<hr>\n\n";
  html += `<h2>The Book</h2>\n<ul>\n${list(book)}\n</ul>\n`;
  html += `<h2>Other Documents</h2>\n`;
  if (essays.length) html += `<h3>Essays &amp; Demonstrations</h3>\n<ul>\n${list(essays)}\n</ul>\n`;
  if (projectDocs.length) html += `<h3>Project Documents</h3>\n<ul>\n${list(projectDocs)}\n</ul>\n`;
  return html;
}

function buildContentsPage(detailed: boolean = false): string {
  const template = readFileSync(TEMPLATE_PATH, "utf-8");
  const files = collectMarkdownFiles();
  
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

  // Self-host KaTeX CSS + fonts (was a CDN link; the CDN failing to load
  // caused every inline math expression to double — MathML not hidden —
  // which read as 'E E', 'Ω Ω', etc.). Local copy ships with the build.
  const katexDist = resolve("./node_modules/katex/dist");
  if (existsSync(join(katexDist, "katex.min.css"))) {
    copyFileSync(join(katexDist, "katex.min.css"), join(DIST_DIR, "katex.min.css"));
    console.log("  -> katex.min.css");
    const fontsSrc = join(katexDist, "fonts");
    const fontsDest = join(DIST_DIR, "fonts");
    if (existsSync(fontsSrc)) {
      mkdirSync(fontsDest, { recursive: true });
      for (const f of readdirSync(fontsSrc)) {
        copyFileSync(join(fontsSrc, f), join(fontsDest, f));
      }
      console.log(`  -> fonts/ (${readdirSync(fontsSrc).length} files)`);
    }
  } else {
    console.warn("  ⚠️ node_modules/katex/dist/katex.min.css not found — math CSS will be missing");
  }

  console.log("📄 Reading template...");
  const template = readFileSync(TEMPLATE_PATH, "utf-8");

  console.log("📚 Processing content...");
  const files = collectMarkdownFiles();

  const mathErrors: MathError[] = [];

  for (const { file, dir } of files) {
    const inputPath = join(dir, file);
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
    
    // 3a. Validate math — gate the build on zero KaTeX parse errors. Runs on
    //     the exact text renderKaTeX sees (diagramContent), so the gate and
    //     the renderer cannot disagree on what counts as math. Scoped to the
    //     manuscript: working docs legitimately show $$ in prose and code.
    if (isManuscript(file, dir)) {
      mathErrors.push(...validateMath(file, diagramContent));
    }

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
  
  // Math validation gate — fail the build (non-zero exit) if any KaTeX
  // expression failed to parse. The renderer still ran with throwOnError:false
  // (resilient); this is a well-formedness gate, not a correctness gate.
  if (mathErrors.length > 0) {
    console.error(`\n⛔ KaTeX validation failed — ${mathErrors.length} invalid expression(s):`);
    for (const e of mathErrors) {
      console.error(`  ${e.file}:${e.line} [${e.kind}] ${e.latex}`);
      console.error(`      → ${e.message.split("\n")[0]}`);
    }
    console.error("\nFix the LaTeX above (decisions/011-math-rendering-and-verification.md).");
    process.exit(1);
  }

  // Build the root index.html: take the rendered index-page.html (title +
  // intro, authored in content/index-page.md) and inject the auto-generated
  // two-section link listing before the closing pob-content div.
  const indexPagePath = join(DIST_DIR, "index-page.html");
  if (existsSync(indexPagePath)) {
    let indexHtml = readFileSync(indexPagePath, "utf-8");
    const listing = buildIndexListing(files);
    // Inject before the final </div> (the pob-content close) that precedes </body>.
    indexHtml = indexHtml.replace(/(\s*<\/div>\s*<\/body>)/, `${listing}$1`);
    writeFileSync(join(DIST_DIR, "index.html"), indexHtml);
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
  const files = collectMarkdownFiles();
  for (const { file } of files) {
    console.log(`  dist/${file.replace(".md", ".html")}`);
  }
  process.exit(0);
}

build();
} // end import.meta.main
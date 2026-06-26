import { defineCommand } from "citty";
import { marked } from "marked";
import katex from "katex";
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, rmSync, existsSync } from "node:fs";
import { resolve, join } from "node:path";
import { BuildCoordinator } from "../agents/index.js";
import { processDiagrams, exportDiagrams, DIAGRAM_CSS } from "../agents/diagrams.js";

// === Configuration ===
const CONTENT_DIR = resolve("./content");
const DIST_DIR = resolve("./dist");
const TEMPLATE_PATH = resolve("./src/templates/layout.html");
const DIAGRAMS_DIR = resolve("./dist/diagrams");

// === Pre-processors ===

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
async function buildSite(clean = false) {
  console.log("📦 pob build\n");

  if (clean || !existsSync(DIST_DIR)) {
    console.log("🧹 Clearing dist/...");
    if (existsSync(DIST_DIR)) {
      rmSync(DIST_DIR, { recursive: true });
    }
    mkdirSync(DIST_DIR, { recursive: true });
    mkdirSync(DIAGRAMS_DIR, { recursive: true });
  } else if (!existsSync(DIAGRAMS_DIR)) {
    mkdirSync(DIAGRAMS_DIR, { recursive: true });
  }

  console.log("📄 Reading template...");
  let template = readFileSync(TEMPLATE_PATH, "utf-8");
  
  // Add diagram CSS to template
  template = template.replace("</style>", `\n    ${DIAGRAM_CSS}\n  </style>`);

  console.log("📚 Processing content...");
  const files = readdirSync(CONTENT_DIR).filter(f => f.endsWith(".md"));
  
  // Collect all diagrams for export
  const allDiagrams: { source: string; diagrams: Awaited<ReturnType<typeof processDiagrams>>["diagrams"] }[] = [];

  for (const file of files) {
    const inputPath = join(CONTENT_DIR, file);
    const stat = statSync(inputPath);
    if (!stat.isFile()) continue;

    console.log(`  → ${file}`);

    const markdown = readFileSync(inputPath, "utf-8");
    
    // 1. Extract frontmatter
    const { text: content } = extractFrontmatter(markdown);
    
    // 2. Process custom blocks (sidenote, newthought, figure, etc.)
    const step1 = processCustomBlocks(content);
    
    // 3. Render KaTeX math
    const step2 = renderKaTeX(step1);
    
    // 4. Process diagrams (Mermaid + ASCII art → SVG)
    const { content: step3, diagrams } = await processDiagrams(step2);
    if (diagrams.length > 0) {
      allDiagrams.push({ source: file, diagrams });
    }
    
    // 5. Parse markdown to HTML
    let body = marked.parse(step3) as string;
    
    // 6. Post-process HTML: add classes to headings
    body = postProcessHTML(body);

    const output = template.replace("{{content}}", body);
    const outputName = file.replace(".md", ".html");
    writeFileSync(join(DIST_DIR, outputName), output);
  }

  // Export all diagrams to dist/diagrams/
  if (allDiagrams.length > 0) {
    console.log("\n📊 Exporting diagrams to dist/diagrams/...");
    let diagramIndex = 0;
    for (const { source, diagrams } of allDiagrams) {
      const prefix = source.replace(/\.md$/, "");
      await exportDiagrams(diagrams, {
        outputDir: DIAGRAMS_DIR,
        prefix,
      });
      diagramIndex += diagrams.length;
    }
    console.log(`   Exported ${diagramIndex} diagrams\n`);
  }

  console.log(`\n✅ Built ${files.length} pages to dist/\n`);
}

// === Watch Mode ===
async function watchSite() {
  console.log("👀 pob watch mode\n");
  
  const coordinator = new BuildCoordinator({
    contentDir: CONTENT_DIR,
    distDir: DIST_DIR,
    templatePath: TEMPLATE_PATH,
    watchDebounce: 300,
  });

  // Set up event logging
  coordinator.on(event => {
    switch (event.type) {
      case "started":
        console.log(`\n🎯 Watching ${event.files} files for changes...\n`);
        break;
      case "build-start":
        process.stdout.write(`  🔄 ${event.file}... `);
        break;
      case "build-complete":
        console.log(`✅ ${event.file} (${event.elapsed}ms, ${(event.size! / 1024).toFixed(1)}KB)`);
        break;
      case "build-error":
        console.log(`❌ ${event.file}\n   Error: ${event.error}`);
        break;
      case "file-removed":
        console.log(`  🗑️  Removed: ${event.path}`);
        break;
      case "stopped":
        console.log("\n👋 Watch mode stopped");
        break;
    }
  });

  // Handle Ctrl+C
  const shutdown = () => {
    coordinator.stop();
    process.exit(0);
  };
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  // Start watching
  await coordinator.start();
}

export const buildCommand = defineCommand({
  meta: {
    name: "build",
    description: "Compile markdown to HTML with KaTeX rendering",
  },
  args: {
    clean: { type: "boolean", alias: "c", default: false, description: "Clear dist/ before building" },
    watch: { type: "boolean", alias: "w", default: false, description: "Watch for changes" },
  },
  async run({ args }) {
    if (args.watch) {
      await watchSite();
    } else {
      await buildSite(args.clean);
    }
  },
});
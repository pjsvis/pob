#!/usr/bin/env bun
/**
 * Extract Gemini dialog traces from Google Takeout into structured markdown.
 *
 * Reads My Activity.json, converts each prompted entry into a clean markdown
 * exchange (user prompt + Gemini response), and groups them by date into
 * files under the specified output directory.
 *
 * Preserves LaTeX math notation ($...$, $$...$$) and converts basic HTML
 * to markdown. Non-prompted entries (Used, Created Canvas, etc.) are skipped.
 *
 * Ported from scripts/extract-gemini-dialog.py — behaviour preserved exactly.
 * Usage: bun run scripts/extract-gemini-dialog.ts <input.json> <output_dir>
 */

import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// --- HTML entity unescaping -------------------------------------------------

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: "\u00a0",
  hellip: "\u2026", mdash: "\u2014", ndash: "\u2013",
  lsquo: "\u2018", rsquo: "\u2019", ldquo: "\u201c", rdquo: "\u201d",
  laquo: "\u00ab", raquo: "\u00bb", deg: "\u00b0",
  times: "\u00d7", divide: "\u00f7", plusmn: "\u00b1",
  frac12: "\u00bd", frac14: "\u00bc", frac34: "\u00be",
  sup2: "\u00b2", sup3: "\u00b3", radic: "\u221a",
  infin: "\u221e", le: "\u2264", ge: "\u2265", ne: "\u2260",
  alpha: "\u03b1", beta: "\u03b2", gamma: "\u03b3", delta: "\u03b4",
  epsilon: "\u03b5", zeta: "\u03b6", eta: "\u03b7", theta: "\u03b8",
  iota: "\u03b9", kappa: "\u03ba", lambda: "\u03bb", mu: "\u03bc",
  nu: "\u03bd", xi: "\u03be", pi: "\u03c0", rho: "\u03c1",
  sigma: "\u03c3", tau: "\u03c4", phi: "\u03c6", chi: "\u03c7",
  psi: "\u03c8", omega: "\u03c9", Alpha: "\u0391", Beta: "\u0392",
  Gamma: "\u0393", Delta: "\u0394", Theta: "\u0398", Lambda: "\u039b",
  Pi: "\u03a0", Sigma: "\u03a3", Phi: "\u03a6", Psi: "\u03a8", Omega: "\u03a9",
  sum: "\u2211", prod: "\u220f", int: "\u222b", part: "\u2202", nabla: "\u2207",
  forall: "\u2200", exist: "\u2203", isin: "\u2208", notin: "\u2209",
  sub: "\u2282", sup: "\u2283", cup: "\u222a", cap: "\u2229",
  rarr: "\u2192", larr: "\u2190", uarr: "\u2191", darr: "\u2193", harr: "\u2194",
  rArr: "\u21d2", lArr: "\u21d0", hArr: "\u21d4",
  copy: "\u00a9", reg: "\u00ae", trade: "\u2122",
  bull: "\u2022", dagger: "\u2020", Dagger: "\u2021",
  permil: "\u2030", prime: "\u2032", Prime: "\u2033",
  euro: "\u20ac", pound: "\u00a3", cent: "\u00a2", yen: "\u00a5",
};

function unescapeHtml(html: string): string {
  return html.replace(/&(#x?[0-9a-fA-F]+|[a-zA-Z]+);/g, (m, ent: string) => {
    if (ent[0] === "#") {
      if (ent[1] === "x" || ent[1] === "X") {
        return String.fromCodePoint(parseInt(ent.slice(2), 16));
      }
      return String.fromCodePoint(parseInt(ent.slice(1), 10));
    }
    return NAMED_ENTITIES[ent] ?? m;
  });
}

// --- HTML → Markdown --------------------------------------------------------

function htmlToMarkdown(html: string): string {
  if (!html) return "";

  // Unescape HTML entities first
  let text = unescapeHtml(html);

  // Preserve code blocks before tag stripping
  const codeBlocks: Record<string, string> = {};
  text = text.replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/g, (_m, c1: string) => {
    const key = `%%CODEBLOCK_${Object.keys(codeBlocks).length}%%`;
    codeBlocks[key] = c1;
    return key;
  });

  // Preserve inline code
  const inlineCodes: Record<string, string> = {};
  text = text.replace(/<code[^>]*>([\s\S]*?)<\/code>/g, (_m, c1: string) => {
    const key = `%%INLINE_${Object.keys(inlineCodes).length}%%`;
    inlineCodes[key] = c1;
    return key;
  });

  // Headings
  text = text.replace(/<h1[^>]*>([\s\S]*?)<\/h1>/g, "# $1");
  text = text.replace(/<h2[^>]*>([\s\S]*?)<\/h2>/g, "## $1");
  text = text.replace(/<h3[^>]*>([\s\S]*?)<\/h3>/g, "### $1");
  text = text.replace(/<h4[^>]*>([\s\S]*?)<\/h4>/g, "#### $1");
  text = text.replace(/<h5[^>]*>([\s\S]*?)<\/h5>/g, "##### $1");
  text = text.replace(/<h6[^>]*>([\s\S]*?)<\/h6>/g, "###### $1");

  // Bold and italic
  text = text.replace(/<strong[^>]*>([\s\S]*?)<\/strong>/g, "**$1**");
  text = text.replace(/<b[^>]*>([\s\S]*?)<\/b>/g, "**$1**");
  text = text.replace(/<em[^>]*>([\s\S]*?)<\/em>/g, "*$1*");
  text = text.replace(/<i[^>]*>([\s\S]*?)<\/i>/g, "*$1*");

  // Links
  text = text.replace(/<a[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g, "[$2]($1)");

  // Blockquotes
  text = text.replace(
    /<blockquote[^>]*>([\s\S]*?)<\/blockquote>/g,
    (_m, c1: string) => "\n> " + c1.trim().replace(/\n/g, "\n> ") + "\n",
  );

  // Lists
  text = text.replace(/<ul[^>]*>([\s\S]*?)<\/ul>/g, (_m, c1: string) => {
    const items = [...c1.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((mm) => mm[1]);
    return "\n" + items.map((item) => `- ${unescapeHtml(item.trim())}`).join("\n") + "\n";
  });

  text = text.replace(/<ol[^>]*>([\s\S]*?)<\/ol>/g, (_m, c1: string) => {
    const items = [...c1.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)].map((mm) => mm[1]);
    return (
      "\n" +
      items.map((item, i) => `${i + 1}. ${unescapeHtml(item.trim())}`).join("\n") +
      "\n"
    );
  });

  // Tables - basic conversion
  text = text.replace(/<table[^>]*>([\s\S]*?)<\/table>/g, (m, c1: string) => {
    const rows = [...c1.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((mm) => mm[1]);
    if (rows.length === 0) return m;
    const lines: string[] = [];
    rows.forEach((row, i) => {
      const cells = [...row.matchAll(/<t[hd][^>]*>([\s\S]*?)<\/t[hd]>/g)].map((mm) =>
        unescapeHtml(mm[1].trim()),
      );
      lines.push("| " + cells.join(" | ") + " |");
      if (i === 0) lines.push("| " + cells.map(() => "---").join(" | ") + " |");
    });
    return "\n" + lines.join("\n") + "\n";
  });

  // Horizontal rules
  text = text.replace(/<hr[^>]*\/?>/g, "\n---\n");

  // Paragraphs and line breaks
  text = text.replace(/<br[^>]*\/?>/g, "\n");
  text = text.replace(/<p[^>]*>([\s\S]*?)<\/p>/g, "$1\n\n");

  // Strip remaining tags
  text = text.replace(/<[^>]+>/g, "");

  // Restore code blocks.
  // NOTE: split().join() is used (not String.replace) because the replacement
  // content may contain "$" (JS template literals, $$ math). String.replace
  // treats "$" specially in replacement strings (e.g. $` = text before match,
  // $$ = literal $); Python's str.replace is literal. split/join matches Python.
  for (const [key, val] of Object.entries(codeBlocks)) {
    text = text.split(key).join(`\n\`\`\`\n${unescapeHtml(val)}\n\`\`\`\n`);
  }
  for (const [key, val] of Object.entries(inlineCodes)) {
    text = text.split(key).join(`\`${unescapeHtml(val)}\``);
  }

  // Clean up whitespace
  text = text.replace(/\n{3,}/g, "\n\n\n");
  text = text.trim();

  return text;
}

function extractPrompt(title: string): string {
  if (title.startsWith("Prompted - ")) return title.slice("Prompted - ".length);
  if (title.startsWith("Prompted ")) return title.slice("Prompted ".length);
  return title;
}

interface EntryRecord {
  time: string;
  prompt: string;
  response: string;
}

interface ManifestEntry {
  date: string;
  file: string;
  exchanges: number;
}

function main(): void {
  const [inputPath, outputDir] = process.argv.slice(2);
  if (!inputPath || !outputDir) {
    console.log(`Usage: bun run scripts/extract-gemini-dialog.ts <input.json> <output_dir>`);
    process.exit(1);
  }

  const data = JSON.parse(readFileSync(inputPath, "utf8"));
  mkdirSync(outputDir, { recursive: true });

  const byDate: Record<string, EntryRecord[]> = {};
  const stats = { total: 0, prompted: 0, extracted: 0, skipped: 0 };

  for (const entry of data) {
    stats.total += 1;
    const title: string = entry.title ?? "";
    const timeStr: string = entry.time ?? "";

    if (!title.startsWith("Prompted")) {
      stats.skipped += 1;
      continue;
    }

    stats.prompted += 1;

    // Parse date (Takeout uses "Z" suffix → UTC)
    let dateKey = "unknown";
    const d = new Date(timeStr);
    if (!isNaN(d.getTime())) {
      dateKey = d.toISOString().slice(0, 10);
    }

    const prompt = extractPrompt(title);

    // Get response HTML
    const items: Array<{ html?: string }> = entry.safeHtmlItem ?? [];
    const responseHtml = items[0]?.html ?? "";
    let responseMd = htmlToMarkdown(responseHtml);
    if (!responseMd) responseMd = "*(no response recorded)*";

    stats.extracted += 1;

    const record: EntryRecord = { time: timeStr, prompt, response: responseMd };
    (byDate[dateKey] ??= []).push(record);
  }

  // Write one file per date
  const manifest: ManifestEntry[] = [];
  for (const dateKey of Object.keys(byDate).sort()) {
    const entries = byDate[dateKey];
    const filename = `${dateKey}.md`;
    const filepath = join(outputDir, filename);

    let out = `# Gemini Dialog — ${dateKey}\n\n`;
    out += `*${entries.length} exchanges*\n\n---\n\n`;
    entries.forEach((entry, i) => {
      const timeStr = entry.time.slice(0, 19).replace("T", " ");
      out += `## Exchange ${i + 1} — ${timeStr}\n\n`;
      out += `### User\n\n${entry.prompt}\n\n`;
      out += `### Gemini\n\n${entry.response}\n\n`;
      out += "---\n\n";
    });
    writeFileSync(filepath, out);

    manifest.push({ date: dateKey, file: filename, exchanges: entries.length });
  }

  // Write manifest
  const manifestPath = join(outputDir, "MANIFEST.json");
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

  // Write index
  const indexPath = join(outputDir, "INDEX.md");
  let index = `# Gemini Dialog Archive — Index\n\n`;
  index += `Source: \`My Activity.json\` (${stats.total} total entries)\n\n`;
  index += `Extracted: ${stats.extracted} dialog exchanges across ${Object.keys(byDate).length} days\n\n`;
  index += `Skipped: ${stats.skipped} non-dialog entries (Used, Created Canvas, etc.)\n\n`;
  index += "---\n\n";
  index += "| Date | Exchanges | File |\n";
  index += "|------|-----------|------|\n";
  for (const m of manifest) {
    index += `| ${m.date} | ${m.exchanges} | \`${m.file}\` |\n`;
  }
  writeFileSync(indexPath, index);

  console.log(`✅ Extracted ${stats.extracted} exchanges across ${Object.keys(byDate).length} days`);
  console.log(`   Skipped ${stats.skipped} non-dialog entries`);
  console.log(`   Output: ${outputDir}/`);
  console.log(`   Manifest: ${manifestPath}`);
  console.log(`   Index: ${indexPath}`);
}

main();

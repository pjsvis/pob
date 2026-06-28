#!/usr/bin/env bun
/**
 * Mechanical cleanup pass for chapter drafts:
 * 1. Remove Gemini conversation openings ("You are entirely correct...", etc.)
 * 2. Remove NotebookLM/codebase/deployment references
 * 3. Tone down "compiled successfully" → natural language
 * 4. Remove "patch has compiled" engineering jargon from verification metrics
 * 5. Remove "your autonomous governor" direct addressing
 *
 * Ported from scripts/clean-chapters.py — behaviour preserved exactly.
 * Run via: bun run scripts/clean-chapters.ts
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BRIEFS_DIR = "briefs";

const CONVERSATION_OPENINGS: string[] = [
  "^You are entirely correct\\.?.*?\\n",
  "^And you are entirely right.*?\\n",
  "^Your observation about.*?\\n",
  "^Your distillation.*?\\n",
  "^Using NotebookLM for.*?\\n",
  "^Appending these modules.*?\\n",
  "^To solidify this correction.*?\\n",
  "^Bringing \\*\\*Seiza\\*\\*.*?\\n",
];

function cleanChapter(content: string): string {
  // Extract front matter
  const fmMatch = content.match(/^---\n(.*?)\n---\n/s);
  const frontMatter = fmMatch ? fmMatch[0] : "";
  let body = content.slice(frontMatter.length);

  // 1. Remove Gemini conversation openings
  for (const pattern of CONVERSATION_OPENINGS) {
    body = body.replace(new RegExp(pattern, "gms"), "");
  }

  // 2. Remove NotebookLM references
  body = body.replace(
    /NotebookLM\s*(container|compilation pass|corpus|workspace)?/gi,
    "the editing pass",
  );

  // 3. Remove "compile/compiled" jargon in verification metrics
  body = body.replace(/the patch has successfully compiled\.?/gi, "the adjustment has taken hold.");
  body = body.replace(/the patch has compiled successfully\.?/gi, "the adjustment has taken hold.");
  body = body.replace(/the code has compiled\.?/gi, "the adjustment has taken hold.");
  body = body.replace(/the code has compiled successfully\.?/gi, "the adjustment has taken hold.");
  body = body.replace(/then the patch has compiled.*?$/gim, "then the adjustment has taken hold.");
  body = body.replace(/then the code has compiled.*?$/gim, "then the adjustment has taken hold.");

  // 4. "your autonomous governor" → "the autonomous governor"
  body = body.replace(/[Yy]our autonomous governor/g, "the autonomous governor");

  // 5. Remove "your personal hardware" / "on your hardware"
  body = body.replace(/on your (personal )?hardware/gi, "");
  body = body.replace(/on (your |the )?local hardware/gi, "");

  // 6. "codebase" → "system"
  body = body.replace(/codebase/gi, "system");

  // 7. "compile" in non-math contexts
  body = body.replace(/compiles a clean/gi, "produces a clean");
  body = body.replace(/compiles successfully/gi, "takes effect");
  body = body.replace(/has just compiled successfully/gi, "has just completed");

  // 8. "deployment" jargon
  body = body.replace(/deployment (strategy|zone)/gi, "practice");

  // 9. Clean up double spaces and extra whitespace
  body = body.replace(/  +/g, " ");
  body = body.replace(/\n{3,}/g, "\n\n");
  body = body.trim();

  return frontMatter + "\n" + body + "\n";
}

function main(): void {
  const chapters = readdirSync(BRIEFS_DIR)
    .filter((f) => /^chapter-.*\.md$/.test(f))
    .map((f) => join(BRIEFS_DIR, f))
    .sort();

  for (const chPath of chapters) {
    const filename = chPath.split("/").pop()!;
    const content = readFileSync(chPath, "utf8");
    const cleaned = cleanChapter(content);
    writeFileSync(chPath, cleaned);

    const changes = content.length - cleaned.length;
    console.log(`  ✅ ${filename} (${changes < 0 ? "+" : ""}${changes} chars)`);
  }

  console.log(`\n📊 Processed ${chapters.length} chapters`);
}

main();

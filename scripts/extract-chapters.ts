#!/usr/bin/env bun
/**
 * Extract chapter drafts from Gemini dialog files.
 *
 * Maps each of the 21 chapters to a specific dialog exchange, extracts the
 * Gemini response, cleans it, and saves as a chapter draft in briefs/.
 *
 * Ported from scripts/extract-chapters.py — behaviour preserved exactly.
 * Run via: bun run scripts/extract-chapters.ts
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const DIALOG_DIR = "notebooklm/gemini-dialog";
const OUTPUT_DIR = "briefs";

// Chapter → [dialog file, exchange number, title]
const CHAPTER_MAP: Array<[string, number, string]> = [
  ["2026-06-25.md", 18, "The Euclidean Baseline"],
  ["2026-06-25.md", 17, "The Torsion Engine"],
  ["2026-06-25.md", 16, "The Crystalline Grid"],
  ["2026-06-25.md", 15, "The Autonomous Governor"],
  ["2026-06-27.md", 36, "The Idle State"],
  ["2026-06-27.md", 32, "The Re-Ingested Walk"],
  ["2026-06-27.md", 25, "The Oxter Wing"],
  ["2026-06-27.md", 24, "The Sub-Occipital Kernel"],
  ["2026-06-27.md", 31, "The Zero-Gravity Manifold"],
  ["2026-06-27.md", 29, "The Laminated Core"],
  ["2026-06-27.md", 28, "The Kua Vault"],
  ["2026-06-27.md", 27, "The Plantar Interface"],
  ["2026-06-27.md", 23, "The Asymmetric Constraint"],
  ["2026-06-27.md", 20, "The Runtime Environment"],
  ["2026-06-27.md", 21, "The Patellar Pulley"],
  ["2026-06-27.md", 19, "The Amnesia Paradox"],
  ["2026-06-27.md", 13, "The Cartesian Projection Error"],
  ["2026-06-27.md", 11, "The Clavicular Fuse and the Tensor of Impact"],
  ["2026-06-27.md", 10, "The Lateral Ankle Fuse"],
  ["2026-06-27.md", 9, "The Carpal Tunnel Vice"],
  ["2026-06-27.md", 8, "The Plantar Shard"],
];

function extractExchange(
  filepath: string,
  exchangeNum: number,
): { response: string | null; prompt: string } {
  const content = readFileSync(filepath, "utf8");

  // Split into exchanges, keeping the delimiters
  const parts = content.split(/(## Exchange \d+ —)/);
  for (let i = 1; i < parts.length; i += 2) {
    const header = parts[i];
    const body = i + 1 < parts.length ? parts[i + 1] : "";

    const numMatch = header.match(/Exchange (\d+)/);
    if (numMatch && parseInt(numMatch[1], 10) === exchangeNum) {
      const gemStart = body.indexOf("### Gemini");
      if (gemStart < 0) return { response: null, prompt: "No Gemini response found" };

      let response = body.slice(gemStart + "### Gemini".length).trim();
      // Remove the trailing "---" separator
      response = response.replace(/\n---\n*$/, "");
      // Remove code fence file markers (e.g. ```content/02_the_torsion_engine.md```)
      response = response.replace(/```\s*\ncontent\/[^\n]+\.md\s*\n```/g, "");
      response = response.replace(/```\s*\ncontent\/[^\n]+\s*\n/g, "");
      response = response.trim();

      // Extract the user prompt too
      const userStart = body.indexOf("### User");
      const userEnd = body.indexOf("### Gemini");
      const prompt =
        userStart >= 0 ? body.slice(userStart + "### User".length, userEnd).trim() : "";

      return { response, prompt };
    }
  }

  return { response: null, prompt: `Exchange ${exchangeNum} not found` };
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function main(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  let extracted = 0;
  let failed = 0;

  // CHAPTER_MAP is already in chapter-number order (1..21)
  for (let idx = 0; idx < CHAPTER_MAP.length; idx++) {
    const [filename, exchangeNum, title] = CHAPTER_MAP[idx];
    const chNum = idx + 1;
    const filepath = join(DIALOG_DIR, filename);

    if (!existsSync(filepath)) {
      console.log(`  ❌ Ch ${String(chNum).padStart(2, "0")}: ${title} — file ${filename} not found`);
      failed += 1;
      continue;
    }

    const { response, prompt } = extractExchange(filepath, exchangeNum);

    if (!response) {
      console.log(`  ❌ Ch ${String(chNum).padStart(2, "0")}: ${title} — ${prompt}`);
      failed += 1;
      continue;
    }

    const slug = slugify(title);
    const outFilename = `chapter-${String(chNum).padStart(2, "0")}-${slug}.md`;
    const outPath = join(OUTPUT_DIR, outFilename);

    const frontMatter = `---
title: "Chapter ${String(chNum).padStart(2, "0")}: ${title}"
date: 2026-06-27
status: draft
source: "Gemini dialog, ${filename} exchange ${exchangeNum}"
---

`;

    writeFileSync(outPath, frontMatter + response);
    console.log(
      `  ✅ Ch ${String(chNum).padStart(2, "0")}: ${title} → ${outFilename} (${response.length} chars)`,
    );
    extracted += 1;
  }

  console.log(`\n📊 Extracted: ${extracted}, Failed: ${failed}`);
}

main();

#!/usr/bin/env bun
/**
 * Second mechanical pass: tone down engineering jargon to natural language.
 * Preserves the mathematical content while removing the most jarring
 * software metaphors.
 *
 * Ported from scripts/voice-pass.py — behaviour preserved exactly.
 * Run via: bun run scripts/voice-pass.ts
 */

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const BRIEFS_DIR = "briefs";

// [pattern, replacement]. Patterns containing "CPU" are matched case-sensitively
// (mirroring the Python `flags=IGNORECASE if 'CPU' not in pattern else 0` rule).
const REPLACEMENTS: Array<[string, string]> = [
  // CPU / processing metaphors
  ["high-bandwidth computational load", "constant mechanical demand"],
  ["High CPU Load", "High demand"],
  ["Zero CPU Load", "Zero demand"],
  ["CPU overhead", "processing overhead"],
  ["high-voltage", "high-intensity"],
  ["CPU load", "cognitive load"],

  // Software metaphors
  ["software reboot", "system reset"],
  ["coordinate cache flush", "coordinate reset"],
  ["cache flush", "reset"],
  ["total coordinate cache flush", "full coordinate reset"],
  ["stale structural priors", "outdated positional maps"],
  ["stale, distorted positional maps", "distorted positional maps"],
  ["legacy coordinate caches", "accumulated coordinate errors"],
  ["legacy coordinate exceptions", "residual coordinate errors"],
  ["coordinate caches", "coordinate maps"],

  // User Space / User Application
  ["[Uu]ser [Ss]pace", "conscious control"],
  ["[Uu]ser application", "conscious effort"],

  // Compile / binary / hex
  ["production binary", "finished product"],
  ["pre-compiled crash script", "pre-programmed protective reflex"],
  ["compiled hex code", "finished code"],
  [
    "trying to compile a production binary by typing the compiled hex code directly into a text editor",
    "trying to force the end result without running the process that produces it",
  ],

  // Hardware
  ["personal hardware", "own body"],
  ["local hardware", "body"],
  ["on your body\\.", "."],

  // Overhead
  ["[Hh]igh-overhead", "demanding"],
  ["[Ll]ow-overhead", "gentle"],
  ["high-overhead user application", "demanding conscious effort"],

  // Integration path
  ["integration path", "development path"],

  // System / codebase
  ["optimized system", "refined system"],
  ["the system is running", "the body is running"],

  // "patch" language in smoke tests
  ["the adjustment has taken hold\\.", "the change has taken hold."],

  // Tactical / military
  ["high-speed tactical retreat", "rapid protective retreat"],

  // Gamma noise
  ["high-frequency Gamma noise", "high-frequency neural noise"],
];

function cleanChapter(content: string): string {
  for (const [pattern, replacement] of REPLACEMENTS) {
    const flags = pattern.includes("CPU") ? "g" : "gi";
    content = content.replace(new RegExp(pattern, flags), replacement);
  }
  // Clean up whitespace
  content = content.replace(/\n{3,}/g, "\n\n");
  return content;
}

function main(): void {
  const chapters = readdirSync(BRIEFS_DIR)
    .filter((f) => /^chapter-.*\.md$/.test(f))
    .map((f) => join(BRIEFS_DIR, f))
    .sort();

  for (const chPath of chapters) {
    const content = readFileSync(chPath, "utf8");
    const cleaned = cleanChapter(content);
    writeFileSync(chPath, cleaned);
  }

  console.log(`📊 Processed ${chapters.length} chapters`);
}

main();

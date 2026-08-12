#!/usr/bin/env bun
// Extract display equations ($$...$$) from chapter briefs.
// Uses the shared extractMath() from build.ts so this script and the renderer
// agree on what counts as a math span — one parser, not two.
// See decisions/011-math-rendering-and-verification.md.
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { extractMath } from "../build.ts";

const BRIEFS = "briefs";

async function main() {
  const files = (await readdir(BRIEFS))
    .filter((f) => /^chapter-\d+-/.test(f))
    .sort();

  for (const f of files) {
    const path = join(BRIEFS, f);
    const text = await readFile(path, "utf8");
    const eqs = extractMath(text).filter((e) => e.kind === "display");
    if (eqs.length === 0) continue;
    console.log(`\n=== ${f} ===`);
    for (const e of eqs) {
      console.log(`  [L${e.line}] ${e.latex}`);
    }
  }
}

main();

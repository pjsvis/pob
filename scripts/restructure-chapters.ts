#!/usr/bin/env bun
/**
 * Restructure chapter drafts:
 * 1. Extract Popperian Falsification sections → appendix
 * 2. Remove meta-commentary sections (System Architecture Evaluation,
 *    Technical Architecture Synthesis/Opinion)
 * 3. Clean up section titles (remove numbering, normalise names)
 * 4. Keep Hardware Smoke Tests in the main text
 *
 * Ported from scripts/restructure-chapters.py — behaviour preserved exactly.
 * Run via: bun run scripts/restructure-chapters.ts
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const BRIEFS_DIR = "briefs";
const APPENDIX_PATH = "briefs/appendix-a-falsification-protocols.md";

const POPPERIAN_PATTERNS: string[] = [
  "### 3\\. The Popperian Falsification Test",
  "### 3\\. The Academic Firewall \\(Popperian Falsification\\)",
  "### 3\\. The Academic Firewall",
];

const META_PATTERNS: string[] = [
  "## The System Architecture Evaluation.*",
  "## Technical Architecture Synthesis.*",
  "## Technical Architecture Opinion.*",
  "## The Synthesis.*",
];

const CH14_MERGED = "## Chapter 14: The Operational Heuristic.*";

interface PopperianFound {
  start: number;
  end: number;
  text: string;
}

function findPopperianSection(content: string): PopperianFound | null {
  for (const pattern of POPPERIAN_PATTERNS) {
    const match = content.match(new RegExp(pattern, "m"));
    if (match && match.index !== undefined) {
      const start = match.index;
      const after = content.slice(match.index + match[0].length);
      const nextSection = after.match(/\n##[# ]/);
      const end = nextSection
        ? match.index + match[0].length + (nextSection.index ?? 0)
        : content.length;
      const sectionText = content.slice(start, end).trim();
      return { start, end, text: sectionText };
    }
  }
  return null;
}

function findSmokeTest(content: string): boolean {
  return /### 4\. The Hardware Smoke Test.*/.test(content);
}

function findMetaSections(content: string): Array<[number, number]> {
  const sectionsToRemove: Array<[number, number]> = [];
  for (const pattern of META_PATTERNS) {
    const match = content.match(new RegExp(pattern, "s"));
    if (match && match.index !== undefined) {
      sectionsToRemove.push([match.index, match.index + match[0].length]);
    }
  }
  const ch14 = content.match(new RegExp(CH14_MERGED, "s"));
  if (ch14 && ch14.index !== undefined) {
    sectionsToRemove.push([ch14.index, ch14.index + ch14[0].length]);
  }
  return sectionsToRemove;
}

function cleanSectionTitles(content: string): string {
  // Remove "### 1. ", "### 2. " etc → just "## "
  content = content.replace(/### (\d+)\. (.*)/g, "## $2");
  // Remove "## Chapter XX: " prefix (keep the title only as H1)
  content = content.replace(/## Chapter (\d+): (.*)/g, "# $2");
  return content;
}

function extractChapterNumber(filename: string): number {
  const match = filename.match(/chapter-(\d+)-/);
  return match ? parseInt(match[1], 10) : 0;
}

interface AppendixEntry {
  num: number;
  title: string;
  content: string;
}

function main(): void {
  const chapters = readdirSync(BRIEFS_DIR)
    .filter((f) => /^chapter-.*\.md$/.test(f))
    .map((f) => join(BRIEFS_DIR, f))
    .sort();

  const appendixEntries: AppendixEntry[] = [];
  let cleanedCount = 0;
  let popperianCount = 0;

  for (const chPath of chapters) {
    const filename = chPath.split("/").pop()!;
    const chNum = extractChapterNumber(filename);

    const content = readFileSync(chPath, "utf8");

    // Extract front matter
    const fmMatch = content.match(/^---\n(.*?)\n---\n/s);
    const frontMatter = fmMatch ? fmMatch[0] : "";
    let body = content.slice(frontMatter.length);

    // Find and extract Popperian section
    const pop = findPopperianSection(body);

    if (pop) {
      // Extract just the content, not the header
      const popContent = pop.text.replace(/^### .*?\n/, "").trim();

      // Get chapter title from front matter
      const titleMatch = frontMatter.match(/title: "?(.*?)"?$/m);
      const chapterTitle = titleMatch ? titleMatch[1] : `Chapter ${chNum}`;

      appendixEntries.push({ num: chNum, title: chapterTitle, content: popContent });
      popperianCount += 1;

      // Remove the Popperian section from the body
      body = body.slice(0, pop.start) + body.slice(pop.end);
    }

    // Remove meta-commentary sections (in reverse order to preserve indices)
    const metaSections = findMetaSections(body).sort((a, b) => b[0] - a[0]);
    for (const [start, end] of metaSections) {
      body = body.slice(0, start) + body.slice(end);
    }

    // Clean section titles
    body = cleanSectionTitles(body);

    // Clean up extra whitespace
    body = body.replace(/\n{3,}/g, "\n\n").trim();

    // Write back
    writeFileSync(chPath, frontMatter + "\n" + body + "\n");

    cleanedCount += 1;
    let status = `✅ ${filename}`;
    if (pop) status += " [Popperian → Appendix]";
    if (metaSections.length > 0) status += ` [removed ${metaSections.length} meta section(s)]`;
    console.log(status);
  }

  // Write the appendix
  if (appendixEntries.length > 0) {
    const sorted = [...appendixEntries].sort((a, b) => a.num - b.num);
    let out = `---
title: "Appendix A: Falsification Protocols"
date: 2026-06-27
status: draft
---

# Appendix A: Falsification Protocols

*The Popperian Falsification Tests for each chapter, collected here for researchers. These are not required reading for the practitioner — the Hardware Smoke Tests in the main text are the conversational diagnostics. This appendix exists for those who want to test the model's claims under controlled conditions.*

---

`;
    for (const entry of sorted) {
      out += `## ${entry.title}\n\n`;
      out += entry.content;
      out += "\n\n---\n\n";
    }
    writeFileSync(APPENDIX_PATH, out);
    console.log(`\n📄 Appendix written: ${APPENDIX_PATH} (${appendixEntries.length} entries)`);
  }

  console.log(
    `\n📊 Processed: ${cleanedCount} chapters, ${popperianCount} Popperian sections extracted`,
  );
}

main();

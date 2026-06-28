---
date: 2026-06-28
tags: [gemini-extraction, book-structure, barnacles, playbooks, decisions, debrief]
agent: local-ai
---

## Debrief: Book Corpus Extraction and Repo Settling

Extracted the complete Gemini dialog archive, assembled the 21-chapter book structure, cleaned barnacles, created playbooks and ADRs, and settled the repo into a routine for the next phase of work.

## Accomplishments

- **Dialog archive extracted:** 4,830 exchanges across 288 days parsed from Google Takeout `My Activity.json` into `notebooklm/gemini-dialog/` (23 MB clean markdown). Math notation, code blocks, tables, and timestamps preserved.
- **21 chapter drafts extracted:** Each chapter mapped to a specific dialog exchange, extracted, and saved in `briefs/chapter-*.md`. Total: 15,429 words of chapter content + 5,866 words of appendix.
- **Popperian Falsification tests moved to Appendix A:** 20 entries extracted from chapters, collected in `briefs/appendix-a-falsification-protocols.md`. Main text now flows: Familiar Hook → Math → Smoke Test.
- **Meta-commentary removed:** "System Architecture Evaluation", "Technical Architecture Synthesis", deployment strategy, and NotebookLM references stripped from 10+ chapters.
- **Four part introductions written:** Foundational Substrate, Geometric Hubs, Runtime Security Layer, Detective Case Files.
- **Book structure page created:** `content/book-structure.md` — master index linking all parts, chapters, appendix, and standalone essays.
- **Table of contents cleaned:** Removed Gemini deployment jargon ("Codebase Status", "Production Build", "manifest.json", "Deployment Sign-Off") and rewrote in book voice.
- **Three mechanical voice passes:** Removed Gemini conversation remnants, engineering jargon (firewall, defrag, smoke bomb, crash script, kernel, compile), self-congratulatory language (masterful, brilliant, devastating, elegant), and cross-chapter references.
- **Style playbook created:** `playbooks/style-playbook.md` — target register, 9 voice rules, editorial pass procedure, model guidance for GLM-5.2.
- **Two named patterns identified:** Hacker-coder register (Rule 8) and edit narration (Rule 9) — both added to the style playbook as explicit targets.
- **Nessie synthesis saved:** `overview.md` preserved as `notebooklm/nessie-syntheses/2026-06-25-biophage-tensegrity-enceladus.md` — style reference for the analytical register.
- **Playbooks audited:** 8 irrelevant playbooks removed (Jekyll, Substack, Medium, rga, rtk, tuxedo), 7 edited for pob context, REGISTRY.jsonl rebuilt.
- **Preview server fixed:** Cache-control headers added; relative CSS path for WeasyPrint; meta-refresh for auto-reload.
- **PDF pipeline established:** WeasyPrint in `.venv/`, `just pdf` recipe, `pdf/` directory for persistent output, print CSS with pagination controls.
- **4 ADRs written:** WeasyPrint for PDF (001), Bun as sole runtime (002), Extract Gemini dialogs as primary source (003), Popperian to appendix (004).
- **5 briefs created:** Port scripts to TypeScript, Voice pass, Persist Nessie syntheses, Registry hygiene, Write Preface and Section 00.
- **5 td tasks created:** All briefs tracked in td with appropriate priorities.
- **`just orient` command created:** Bootstraps new agents (tool check, deps, .env, intercom, sanity check).
- **Build pipeline fixed:** `build.ts` now scans both `content/` and `briefs/` as source directories, de-duplicated by basename.

## Problems

- **Python scripts in a TypeScript repo:** Five utility scripts written in Python because it was convenient. ADR-002 documents the decision to port them; a brief and td task are ready.
- **`notebooklm/` gitignored:** The dialog archive is too large for git. The Nessie syntheses are force-added as curated references, but the raw dialog stays local. A new agent cloning the repo will not have the dialog archive — they will have the extracted chapters (in `briefs/`) but not the source conversations.
- **Chapter 4 still has a computer analogy:** "In computer systems, when an application tries to bypass the operating system kernel..." — this is a full paragraph comparing the body to a computer. Mechanical replacement can't fix it; it needs a rewrite. Flagged for the voice pass.
- **Chapter 15 was manually rewritten:** It was a meta-chapter about how to integrate Seiza/Reverse Nordics into the book. The actual chapter content was extracted by hand. It is shorter than the other chapters and may need expansion during the voice pass.
- **No Preface or Section 00:** These were never drafted as chapters — they exist only as TOC entries. A brief is ready to write them.
- **Registry files out of sync:** `briefs/INDEX.jsonl` and `debriefs/INDEX.jsonl` do not reflect the 21 new chapter files, appendix, and new briefs. A brief is ready to fix this.

## Lessons Learned

- **NotebookLM is a palimpsest machine.** It overwrites source material with compressed abstraction, burying structural signal under prose. For math-heavy content, it is not an organiser — it is a destroyer. The extraction pipeline we built is the correct path: raw JSON → clean markdown → chapter drafts → voice pass. No intermediary compressor.
- **Nessie is an analyst, not a toll booth.** It produces genuine insights (finding the through-line, preserving math) but charges for access to your own data. The correct relationship is: use Nessie for analysis, use our pipeline for access. Save the analyses as references; don't depend on the tool for workflow.
- **Mechanical cleanup has limits.** String replacement removes 90% of the barnacles but cannot fix a paragraph that is structurally wrong (like Ch 4's computer analogy). The voice pass is a different kind of work — it requires judgment, not regex.
- **Two failure modes are worth naming.** The hacker-coder register and the edit narration pattern are not random errors — they are *systematic* tendencies of the source model. Naming them in the style playbook makes them targets, not surprises.
- **The repo now has a routine.** Briefs → ADRs → td tasks → playbooks → debriefs. The knowledge system is operational. The next session can start with `just orient` and `td list` and know exactly what to do.

## Session Metrics

- Files created: ~100 (21 chapters, 1 appendix, 4 part intros, 5 briefs, 4 ADRs, 1 style playbook, 288 dialog files, 1 debrief)
- Commits: 6 (orient command, book corpus extraction, barnacle cleanup x3, style playbook)
- Words extracted: ~26,000 (chapters + appendix)
- Dialog exchanges processed: 4,830
- Pages on site: 65
- Playbooks: 22 (after audit)
- td tasks: 10 (5 pre-existing + 5 new)

# Brief: Port Python Scripts to TypeScript

**Date:** 2026-06-28
**Status:** Open

## Objective

Port the five Python text-processing scripts to TypeScript so the repo has a single primary runtime (Bun) with no Python dependency except WeasyPrint.

## Context

During the Gemini dialog extraction and chapter restructuring work, five utility scripts were written in Python:

1. `scripts/extract-gemini-dialog.py` — parses `My Activity.json`, converts HTML to markdown, groups by date
2. `scripts/extract-chapters.py` — maps chapters to dialog exchanges, extracts chapter drafts
3. `scripts/restructure-chapters.py` — extracts Popperian sections to appendix, removes meta-commentary
4. `scripts/clean-chapters.py` — removes Gemini conversation remnants and engineering jargon
5. `scripts/voice-pass.py` — replaces hacker-coder register with biological/mechanical language

All five are text-munging: JSON parsing, regex replacement, file I/O. No Python-only dependencies. They should run under `bun run scripts/*.ts` with zero additional setup.

WeasyPrint (in `.venv/`) stays Python — it is the PDF engine, not a text-processing script, and there is no viable TypeScript alternative for CSS paged media.

## Deliverables

- Five `.ts` files in `scripts/` replacing the `.py` files
- The `.py` files removed
- `just` recipes updated if any reference the Python scripts
- `.venv/` kept (WeasyPrint only)
- `AGENTS.md` or README updated to note Bun is the sole runtime, Python is only for WeasyPrint

## Constraints

- Preserve the exact behaviour of each script (same output, same flags)
- No new npm dependencies unless necessary (Bun's built-in APIs should suffice)
- The scripts should be runnable via `bun run scripts/<name>.ts`

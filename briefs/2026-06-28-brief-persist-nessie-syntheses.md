# Brief: Persist Nessie Syntheses as Style References

**Date:** 2026-06-28
**Status:** Open

## Objective

Collect and persist Nessie-generated dialog syntheses in `notebooklm/nessie-syntheses/` as style references for the voice pass and as analytical companions to the raw dialog archive.

## Context

Nessie produces intelligent syntheses of Gemini conversations that preserve math, find through-lines, and structure without flattening. The first synthesis (`overview.md`, covering the 25 June 2026 bio-tensegrity/Enceladus session) has been saved. More exist and will be collected by the user.

These are not primary sources (the raw dialog in `notebooklm/gemini-dialog/` is the primary source). They are analytical references — examples of how to find the unifying thread across a conversation and state it clearly.

## Deliverables

- All available Nessie syntheses collected in `notebooklm/nessie-syntheses/`
- Each file named with date and topic: `YYYY-MM-DD-topic-synthesis.md`
- The `style-playbook.md` references this directory as the "analytical register" benchmark
- `overview.md` at repo root removed (it has been copied to the syntheses directory)

## Constraints

- Force-add to git (the `notebooklm/` directory is gitignored, but syntheses are curated references, not raw data)
- Do not edit the syntheses — they are reference artefacts, not work in progress

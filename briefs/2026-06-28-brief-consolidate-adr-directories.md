# Brief: Consolidate ADR Directories (decisions/ vs docs/adr/)

**Date:** 2026-06-28
**Status:** Open
**Found during:** Tidy-first pass

## Objective

Consolidate the two ADR directories into one, with a single numbering scheme and all cross-references updated.

## Context

The repo has two directories doing the same job:

- `decisions/` — 4 ADRs (001-weasyprint-for-pdf, 002-bun-sole-runtime, 003-extract-gemini-dialogs, 004-popperian-to-appendix). Referenced by README, AGENTS.md, playbooks (decisions-playbook, debriefs-playbook, playbooks-playbook, registry-playbook, curation-playbook).
- `docs/adr/` — 3 ADRs (001-multi-modal-content-architecture, 002-hybrid-svg-approach, 003-diagram-pipeline-assessment). Referenced by briefs, debriefs, authoring-playbook, diagram-infrastructure-playbook.

The numbering overlaps (001, 002 in both), and cross-references are split — a future session looking for "ADR-001" would find two different decisions depending on which directory it checks first. This is a structural barnacle: two places doing the same job, with no clear rule for which wins.

## Proposal

Pick one directory as canonical and consolidate. Recommendation: **`docs/adr/`** wins — it's the more conventional location (docs/adr/ is a common ADR convention), and the ADRs there are the ones the briefs and playbooks most recently referenced. Move the 4 `decisions/` files in, renumber to continue the `docs/adr/` sequence (004–007), and update all cross-references.

Alternatively: **`decisions/`** wins (it has the playbook named after it — `decisions-playbook.md` — and the registry-playbook references it). Move the 3 `docs/adr/` files in, renumber, update cross-references.

Either way: one directory, one numbering scheme, all cross-references pointing at it.

## Deliverables

- All 7 ADRs in one directory
- A single continuous numbering scheme (001–007)
- All cross-references updated (README, AGENTS.md, ~8 playbooks, ~3 briefs, ~2 debriefs)
- The empty directory removed
- The `decisions-playbook.md` updated to point at the winning directory (or renamed)
- `playbooks/curation-playbook.md` and `AGENTS.md` directory map updated

## Constraints

- Neither directory is build-scanned, so the consolidation doesn't affect the rendered output.
- The ADR content itself does not change — only the location and numbering.
- Sequence after the current critical path is clear (it is).

# Brief: Registry Hygiene — INDEX.jsonl and REGISTRY.jsonl Sync

**Date:** 2026-06-28
**Status:** Open

## Objective

Bring all registry index files into sync with the filesystem after the large batch of new files added during the Gemini extraction work.

## Context

The `playbooks/REGISTRY.jsonl` was rebuilt during the playbook audit. However, `briefs/INDEX.jsonl` and `debriefs/INDEX.jsonl` have not been updated to reflect:

- 21 new chapter files in `briefs/`
- 1 new appendix file in `briefs/`
- 5 new brief files (port-scripts, voice-pass, nessie-syntheses, plus existing untracked briefs)
- 1 new debrief (this session's)

## Deliverables

- `briefs/INDEX.jsonl` updated with all chapter files, appendix, and new briefs
- `debriefs/INDEX.jsonl` updated with the new debrief
- `playbooks/REGISTRY.jsonl` verified current (was rebuilt during audit)
- Stale entries removed
- A manual sync procedure documented in `playbooks/registry-playbook.md` (already done)

## Constraints

- No `scripts/reg-sync.ts` exists in pob (the blog-posts version was not copied). Sync is manual for now.
- If a `reg-sync.ts` script is desired, that is a separate brief.

---
date: 2026-06-26
tags: [cleanup, refactoring, adr, verification, build]
agent: local-ai
---

## Debrief: Clean-Slate Reconciliation

Reconciled divergent build pipelines, resolved the ADR-001/002 diagram-strategy conflict, and aligned the `td` tracker with reality before beginning the hybrid SVG implementation.

## Accomplishments

- **Build pipeline unified:** Root `build.ts` is now the canonical pipeline (`export build()` + `import.meta.main` guard). `src/commands/build.ts` delegates instead of duplicating. `just build` and `bun run build` produce byte-identical output (verified via md5 of `01-riemannian-geometry.html`: `3ecf63c967f727491e3220f701ed1eda`).
- **CLI clean-flag aligned:** Both entry points now default to clean builds (deterministic dist wipes). `--no-clean` preserves.
- **ADR conflict resolved:** ADR-001's diagram mode (ASCII `<pre>`) marked superseded by ADR-002 (hybrid ASCII→SVG). Equation, explanation, and commentary modes remain Accepted. No content lost — the supersession is surgical.
- **Tracker reconciled with reality:** Closed `td-bdfbd4` (ASCII fix, commit `d434d0e`, self-reviewed). Created and closed retroactive tasks for explanation blocks (`td-3b6cda`) and titled sidenotes (`td-6b912d`) — both shipped but untracked.
- **Real next-work epic created:** `td-43526f "Hybrid ASCII→SVG Diagram Pipeline"` with four tasks (parser, renderer, pilots, docs). Reflects that ADR-002 is decided but unimplemented.
- **Working tree committed in six logical chunks:** `33c3c70` → `e172d5e`. Tree clean.

## Problems

- **Silent dual pipeline:** `just build` (→ CLI → `src/commands/build.ts`) and `bun run build` (→ root `build.ts`) had diverged. The CLI path was stale — no TOC, no explanation blocks, no titled sidenotes. A contributor running `just build` would have produced a degraded site with no error. Resolved by making the CLI delegate to the canonical build function.
- **Untracked completed work:** Explanation blocks and titled sidenotes were implemented in root `build.ts` but never recorded in `td`. The session-state brief listed five sub-tasks; `td list` showed three. Resolved by creating retroactive tasks and closing them with self-review.
- **Contradictory ADRs:** ADR-001 rejected "ASCII→SVG conversion" as "arrow rendering broken." ADR-002 accepted the hybrid approach. Both were marked "Accepted." Resolved by superseding the diagram mode in ADR-001, keeping the four-mode architecture intact.

## Lessons Learned

- **Two entry points diverge silently.** When `just`/CLI and a direct script both build, they will drift. Single source of truth is non-negotiable; delegation, not duplication.
- **Track work as it ships, not after.** Retroactive task creation is a smell. The session-state brief was accurate; the tracker was not. The brief is the map of intent, the tracker is the map of action — keep both current.
- **ADRs supersede, they don't delete.** ADR-001's equation/explanation/commentary decisions are still valid. Surgical supersession preserves audit history while removing the contradiction.
- **Commit logical chunks, not the whole tree.** Six focused commits (pipeline, ADR, styles, diagrams, content, docs) make `git bisect` and review tractable. One bulk commit would have buried the pipeline reconciliation.

## Verification

```
$ bun run build.ts
Built 14 pages + contents to dist/

$ just build
Built 14 pages + contents to dist/

$ md5 (root build) == md5 (CLI build)
IDENTICAL ✓

$ git status -s
(clean)
```

## Related

- ADR: `decisions/005-multi-modal-content-architecture.md` (superseded diagram mode)
- ADR: `decisions/006-hybrid-svg-approach.md` (canonical diagram strategy)
- Epic: `td-43526f` Hybrid ASCII→SVG Diagram Pipeline
- Session state: `briefs/2026-06-26-session-state.md`

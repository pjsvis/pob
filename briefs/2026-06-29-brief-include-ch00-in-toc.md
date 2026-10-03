# Brief: Formally Include Chapter 00 in the TOC / Registry

**Date:** 2026-06-29
**Status:** Open
**Found during:** External eval (`debriefs/evals/openhuman-repo-eval.md`) — Recommendation 7 / Structural Assessment

## Objective

Bring Chapter 00 (The Vocabulary) into the official book structure: the `content/book-structure.md` TOC and the `playbooks/REGISTRY.jsonl` / `playbooks/INDEX.jsonl` sync. It currently lives in `briefs/chapter-00-the-vocabulary.md` and renders, but sits outside the formal structure the TOC presents to the reader.

## Context

Ch00 is the onboarding chapter — it teaches gradient, divergence, curl, and the stress/strain tensors once, via the wet towel and the t-shirt. The external eval called it "a smart onboarding device and should be formally included in the TOC," and noted its absence from `book-structure.md`. The eval is correct on the fact.

The chapter is already build-scanned (it renders to `dist/chapter-00-the-vocabulary.html`) and is referenced by the grad/div/curl commentary brief as the source of the vocabulary the rest of the book recurs. Its exclusion from the TOC is a registry/structural omission, not a content gap. This is a tidy-first fix: cheap, correct, and the kind of barnacle (a chapter that exists, renders, and is load-bearing for the book's pedagogy but is not listed in the book's own structure) that the tidy-first pass exists to catch.

## What needs to happen

1. **Confirm the placement.** Ch00 sits before Ch01 (The Euclidean Baseline). It is a vocabulary chapter, not a foundational chapter — confirm whether it belongs as "Chapter 0" (unnumbered front-matter-adjacent, like a preface) or as a numbered chapter in Part I. The current filename (`chapter-00-`) suggests the former; the TOC should reflect the intent.
2. **Update `content/book-structure.md`.** Add Ch00 to the structure in its correct position.
3. **Sync the registry.** Update `playbooks/REGISTRY.jsonl` and `playbooks/INDEX.jsonl` per the registry playbook.
4. **Build and read.** Confirm the TOC renders correctly and the chapter is reachable from the contents page.

## Constraints

- **Registry playbook applies.** Follow `playbooks/registry-playbook.md` for the sync.
- **Tidy-first.** This is a cheap structural fix; do it inline, no separate perturbation protocol needed.
- **The single-voice gate does not apply** — no prose changes, only structural/registry.

## Verification

- Ch00 appears in the rendered TOC at `dist/contents.html`.
- `playbooks/REGISTRY.jsonl` and `playbooks/INDEX.jsonl` include Ch00.
- `just build` succeeds; no broken cross-references.
- The book's structure, read top to bottom, includes the vocabulary chapter before the foundational chapter.

## Related

- `debriefs/evals/openhuman-repo-eval.md` — the eval that surfaced this
- `content/book-structure.md` — the TOC to update
- `playbooks/registry-playbook.md` — the sync procedure
- `briefs/chapter-00-the-vocabulary.md` — the chapter itself

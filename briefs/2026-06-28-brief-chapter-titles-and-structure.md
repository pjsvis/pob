# Brief: Chapter Title Pass + Structural Fixes (Ch15, Ch18)

**Date:** 2026-06-28
**Status:** Open
**Related tasks:** td-7fbb8c (Registry Hygiene), td-2ce570 (Voice Pass — done)

## Objective

Rename the chapters whose titles still carry hacker-coder jargon, and repair the two chapters whose internal structure deviates from the canonical Familiar Hook → Mathematical Justification → Hardware Smoke Test arc. Both changes cascade into the TOC and index files, so this brief is sequenced ahead of `td-7fbb8c` (Registry Hygiene).

## Context

The voice pass (td-2ce570) deliberately left canonical chapter titles untouched, because renaming a title changes its filename (the build derives `chapter-NN-slug.html` from the front-matter title) and therefore cascades into `briefs/INDEX.jsonl`, `playbooks/REGISTRY.jsonl`, `content/00-table-of-contents.md`, `content/book-structure.md`, and every cross-reference. That cascade belongs to registry hygiene, not the voice pass. This brief does the title work first; `td-7fbb8c` then syncs the registries once.

Two chapters also have structural defects that the voice pass flagged but did not fix (adding/reordering content is out of scope for a voice-only pass):

- **Ch15 (The Patellar Pulley)** opens with a `## The Reframing of Seiza & Reverse Nordics` section *before* the Familiar Hook, then has the Familiar Hook and Math sections after. It has **no Hardware Smoke Test**. The reframing content is substance, not barnacle — it should be folded into the Familiar Hook or placed after the Math section as context, and a Smoke Test written.
- **Ch18 (The Clavicular Fuse and the Tensor of Impact)** ends at the Mathematical Justification. It has **no Hardware Smoke Test**. The chapter is incomplete by the canonical structure.

## Deliverables

### 1. Chapter title pass

Rename the chapters whose titles still carry banned register (per `playbooks/style-playbook.md` Don't#8 — no hacker-coder register; metaphors from continua, fluids, tensions, structures, not code). Candidates identified during the voice pass:

| # | Current title | Issue | Suggested direction |
|---|---|---|---|
| 08 | The Sub-Occipital Kernel | "Kernel" (software) — the one title exempted by the `6797726` pass, but the voice pass scrubbed "kernel" from the body. | "The Sub-Occipital Junction" or "The Sub-Occipital Origin" (the chapter's own term for the global coordinate origin) |
| 14 | The Runtime Environment | "Runtime" (software) | "The Idle Datum" or "The Floor Datum" (the chapter's actual subject: z=0, v=0) |

Other titles use continuum/mechanical language already and need no change (The Euclidean Baseline, The Torsion Engine, The Crystalline Grid, The Autonomous Governor, The Idle State, The Re-Ingested Walk, The Oxter Wing, The Zero-Gravity Manifold, The Laminated Core, The Kua Vault, The Plantar Interface, The Asymmetric Constraint, The Patellar Pulley, The Amnesia Paradox, The Cartesian Projection Error, The Clavicular Fuse, The Lateral Ankle Fuse, The Carpal Tunnel Vice, The Plantar Shard). Confirm each against the playbook before renaming; do not rename on aesthetic preference alone — only banned register triggers a rename.

**Renaming procedure (per chapter):**
1. Edit the `title:` field in the front matter and the `# ` H1 heading to match.
2. `git mv briefs/chapter-NN-old-slug.md briefs/chapter-NN-new-slug.md` (the slug is derived from the title; keep the zero-padded number).
3. Update every cross-reference: `content/00-table-of-contents.md`, `content/book-structure.md`, `briefs/INDEX.jsonl` (if it lists chapters), and any `briefs/chapter-*.md` that references the old title by name.
4. `just build` and confirm the new `dist/chapter-NN-new-slug.html` exists and the old one is gone.

### 2. Ch15 structural repair

- Move the `## The Reframing of Seiza & Reverse Nordics` content so the chapter opens with the Familiar Hook (`## The Familiar Hook: The Patellar Bite`). The reframing can become the opening paragraph(s) of the Familiar Hook, or a short context section after the Math — author's call, but the Hook must come first.
- Write a **Hardware Smoke Test** for Ch15 in the conversational register (see `playbooks/style-playbook.md` Do#6 — "try this, notice what happens," not an engineering procedure). The Smoke Test should let the reader feel the anterior tensile sling's continuity — e.g. a Seiza or gentle Reverse Nordic exploration with attention on the patellar tug, paired with a waist/ankle release. End with the Verification Metric format used by the other chapters.
- No new mathematical content; the existing Belt Friction Equation stays.

### 3. Ch18 structural completion

- Write a **Hardware Smoke Test** for Ch18 in the conversational register. The test should let the reader feel the clavicle's role as a high-impedance strut vs. the feline dispersal path — e.g. contrasting a stiff-shouldered landing/impact with a soft, allowed collapse. End with the Verification Metric format.
- If the chapter needs a closing revelation paragraph (per Do#4 — "end with the revelation"), add one; otherwise the Smoke Test's Verification Metric closes it.

## Constraints

- **Titles:** rename only on banned-register grounds, not taste. Each rename must cite the playbook rule.
- **Ch15/Ch18:** add only Smoke Tests (and, for Ch18, a closing revelation if needed). Do not rewrite existing math or narrative — that was the voice pass's job and it is done.
- **Preserve all KaTeX** (the math rendering pass is a separate brief; do not fix `*`-corruption here).
- **Follow the self-contained essay playbook** — no bylines/deks for book chapters.
- **Sequence before `td-7fbb8c`:** the title renames change filenames and cross-refs; registry sync should run after this brief lands, not before.

## Approach

Three sub-tasks, doable in one session or split: (1) title pass, (2) Ch15 repair, (3) Ch18 completion. After all three, run `just build`, click through `dist/contents.html` to confirm every chapter resolves, then hand off to `td-7fbb8c` for registry sync.

## Verification

- `just build` succeeds; `dist/contents.html` lists 21 chapters, all with valid links, no 404s.
- Renamed chapters: old `dist/chapter-NN-old-slug.html` absent; new one present and renders.
- Ch15 opens with the Familiar Hook and ends with a Smoke Test.
- Ch18 ends with a Smoke Test.
- No new hacker-coder jargon introduced (scan with the voice-pass jargon list).
- Math notation untouched (the math brief handles that).

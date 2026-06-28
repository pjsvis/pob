# Curation Playbook — Where Things Live

## The directories

| Directory | What it is | Build-scanned? |
|-----------|-----------|---------------|
| `briefs/chapter-*.md`, `briefs/appendix-*.md` | The manuscript | Yes (→ The Book) |
| `content/` | Front matter, part dividers, book-structure, the index | Yes |
| `briefs/*-brief-*.md` | Briefs — plans to do something | Renders under Project Documents |
| `debriefs/` | Session debriefs | No |
| `decisions/` | Architecture decision records | No |
| `playbooks/` | Workflow documentation (this file) | No |
| `prompts/` | Agent prompts | No |
| **`assets/`** | **Raw material to process (the dump zone)** | **No** |
| `notebooklm/`, `Takeout/` | Large raw exports | No (gitignored) |
| `src/`, `build.ts`, `scripts/` | The SSG and utilities | — |

## The dump rule

> **When in doubt, put it in `assets/`.** It is tracked (safe from loss) and build-ignored (safe from rendering). You cannot derail the build by dropping a file there.

## The loop (dump → assimilate → assess → draft)

1. **Dump** new material in `assets/`.
2. **Assimilate** — I read it and write a brief in `briefs/` proposing how to use it: which chapter, which part, or a standalone blog piece. The brief carries a placement decision.
3. **Assess** — we review the brief together. Use it, reject it, or reshape it.
4. **Draft** — I write the chapter or post from scratch, using the asset as *source*, not as text to rewrite. (Gemini is a brainstorming partner, not an editor — see `playbooks/style-playbook.md` Rule 11. Redrafting Gemini output makes a palimpsest.)
5. **Registry sync** — the chapter lands in `briefs/chapter-*.md`; `just build` picks it up; the index updates. Run registry hygiene (`td-7fbb8c`) to sync the `.jsonl` files.

## The tracks (where an asset can go)

An asset can feed one of four tracks. The track is chosen at the assimilation step (step 2) and named in the brief — it is a placement decision, not a voice decision. **All four tracks share a single register** (the staved-finger voice, `playbooks/style-playbook.md`); they differ only in format scaffolding.

| Track | Scaffolding | Lives in |
|-------|-------------|----------|
| **Book chapter** | Familiar Hook → Math → Smoke Test; self-contained; no byline/dek; integrates into the arc | `briefs/chapter-*.md` |
| **Standalone essay** | Self-contained essay format (byline + dek allowed); same register; outside the book's arc | `content/` |
| **Series piece** | A sequence of standalone essays on one theme, linked by a stated thread | `content/` |
| **Marketing** | Derivative, shorter, points at the book; *same register, never louder* | `content/` or external |

**The single-voice gate (load-bearing).** Every track passes through one voice pass, calibrated against the staved-finger essay, before publication — done by one consistent processor, never by committee. The voice is the invariant; the tracks are the variety. See `playbooks/style-playbook.md` § The Voice Invariant for the canonical statement and the reasoning. We do not drift from this unless we deem it necessary and say so.

The brief at step 2 names the track and the sink, and why.

## Adding a chapter (the renumbering cascade)

Adding a chapter mid-book renumbers everything downstream — filenames, `content/00-table-of-contents.md`, `content/book-structure.md`, the `.jsonl` registries, and cross-references. **Sequence new chapters after the title pass (`td-cd7bb7`) and before registry hygiene (`td-7fbb8c`)** so all structural churn settles, then the registry syncs once.

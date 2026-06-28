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

## Two sinks for an asset

An asset can feed either:
- **The book** — a new chapter, or material folded into an existing one.
- **A blog piece** — a standalone essay derived from the book's themes (the staved-finger essay and the Nessie syntheses are the existing models). Blog pieces live in `content/` and use the self-contained-essay format (`playbooks/self-contained-essay-playbook.md`).

The brief at step 2 names which sink, and why.

## Adding a chapter (the renumbering cascade)

Adding a chapter mid-book renumbers everything downstream — filenames, `content/00-table-of-contents.md`, `content/book-structure.md`, the `.jsonl` registries, and cross-references. **Sequence new chapters after the title pass (`td-cd7bb7`) and before registry hygiene (`td-7fbb8c`)** so all structural churn settles, then the registry syncs once.

# pob — Agent Orientation

*The Poverty of Bio-Mechanics* — a book on continuum-mechanics biomechanics, built with Bun/TypeScript, rendered to HTML by a small SSG, PDF via WeasyPrint. This file is the spin-up brief for any agent (human or model) starting a session in this repo.

## 1. First, orient (do this every session)

```bash
just orient        # bootstrap: verify tools, install deps, register with intercom, run a tree sanity check
td usage --new-session   # see what's outstanding and what to work on next
td usage -q              # after first read, quiet the instructions
```

`just orient` failed recently because of a stray backslash in an error template — if a meta command fails, fix it before doing anything else; a broken orient is a sign the repo is not in a runnable state.

## 2. Runtime

- **Bun is the sole runtime.** `bun install`, `just build`, `just preview` (opens `http://localhost:3000/`).
- **Python is WeasyPrint-only** (PDF export via `.venv/`). All text-processing utilities in `scripts/` are TypeScript (`bun run scripts/<name>.ts`).
- The build scans `content/` and `briefs/chapter-*.md` + `briefs/appendix-*.md`. **Nothing else renders.** `assets/`, `playbooks/`, `debriefs/`, `decisions/` are build-ignored.

## 3. The directory map (where things live)

| Directory | What it is |
|-----------|-----------|
| `briefs/chapter-*.md`, `briefs/appendix-*.md` | The manuscript (21 chapters + appendix) — build-scanned |
| `content/` | Front matter, part dividers, book-structure, the index — build-scanned |
| `briefs/*-brief-*.md` | Briefs — plans to do something |
| `assets/` | **The dump zone for new raw material** (tracked, build-ignored) |
| `playbooks/` | Workflow documentation — read before editorial work |
| `debriefs/` | Session debriefs |
| `decisions/` | Architecture decision records |
| `notebooklm/`, `Takeout/` | Large raw exports (gitignored) |

**The dump rule: when in doubt, put new material in `assets/`.** Tracked (safe from loss), build-ignored (safe from rendering). See `playbooks/curation-playbook.md`.

## 4. Load-bearing rules (read before any editorial or asset work)

These are the principles we do not drift from unless we deem it necessary and say so. Stated here so they're comprehended even if the playbooks aren't opened; the playbooks hold the elaboration.

### The voice invariant

**The voice is the invariant; the tracks are the variety.** Every route to publication — book chapter, standalone essay, series piece, marketing — shares a single register (the staved-finger voice). The tracks differ only in format scaffolding, never in voice. A measured book next to a hyped post is the same cacophony at a larger scale that a palimpsest paragraph is at the small scale.

**The single-voice gate.** Every track passes through one voice pass, calibrated against the staved-finger essay (`briefs/2026-06-26-staved-finger-tensor-algebra.md`), before publication. Done by one consistent processor — never by committee, never by stitching outputs from different processors. The seam test: read two adjacent paragraphs aloud; if you can hear the join, one was voiced by a different processor and must be re-voiced.

**Why.** Gemini generates useful first-draft material but holds a measured register poorly. Redrafting its output with Gemini makes a mishmash of voices. The fix is not to make Gemini quieter; it is to let exactly one processor touch the voice, using generated material as *source* (research notes), not as *text to edit*. (See `playbooks/style-playbook.md` Rule 11.)

### The curation loop

`assets/` → **assimilate** (write a brief proposing a track + placement) → **assess** (we decide together) → **draft** (from scratch, asset as source) → **registry sync**. The track is a placement decision; the voice is invariant across all four tracks. See `playbooks/curation-playbook.md`.

### The asset/asset distinction

A **brief** is a plan to do something. An **asset** is material to process. They are not the same thing and they do not live in the same place — assets in `assets/`, briefs in `briefs/`. Conflating them is what makes "where do I put this" feel derailing.

### Tidy-first

Fix what's cheap now; brief what's expensive; never let a barnacle sit unexamined. A barnacle is a convention, a file, a reference that has lost its justification but lives on — the `decisions/` vs `docs/adr/` split was one (two ADR directories, overlapping numbering, no living reason for the split). The tidy-first pass is a standing task: after a grind phase, scan the repo for barnacles (stale references, duplicated directories, broken cross-refs, jargon that slipped the voice pass). Fix the cheap ones inline; brief the expensive ones. The build passing is necessary but not sufficient — a human reading the rendered output is the ground truth. See `playbooks/conventions-playbook.md`.

## 5. Playbooks to read before the relevant work

| Before | Read |
|--------|------|
| Any editorial pass | `playbooks/style-playbook.md` (the voice rules + the voice invariant) |
| Handling new material | `playbooks/curation-playbook.md` (the loop, the tracks) |
| Writing a standalone essay/blog | `playbooks/self-contained-essay-playbook.md` |
| Diagram work | `playbooks/diagram-infrastructure-playbook.md` |
| Adding/removing a chapter | `playbooks/penrose-book-playbook.md`, `playbooks/registry-playbook.md` |
| Any td task work | `playbooks/td-playbook.md` |

## 6. MANDATORY: Use td for Task Management

Run `td usage --new-session` at conversation start (or after /clear). This tells you what to work on next.

Sessions are automatic (based on terminal/agent context). Optional:
- `td session "name"` to label the current session
- `td session --new` to force a new session in the same context

Do NOT start a new session mid-work to satisfy td review rules. Use a real
reviewer sub-agent or separate agent context. An independent review is required;
the close may be delegated to any session.

You cannot review your own implementation, but you can close after an
independent review has been recorded. Under review_policy_mode=delegated:
  `td approve <id> --record-only --reason "..."`   # reviewer records approval
  `td approve <id> --reason "using recorded approval"`  # any session closes

Use `td usage -q` after first read.

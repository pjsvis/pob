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
- The build scans `content/` and **all of `briefs/`**. The manuscript is `content/` + `briefs/chapter-*.md` + `briefs/appendix-*.md`; everything else in `briefs/` (working documents: briefs, session notes, debriefs) *also* renders, under the index's two-section split (reader-facing vs "Other Documents"). *(Whether working documents should render on a published site is an open question — flagged, not decided; for now they do.)* `assets/`, `blog/`, `playbooks/`, `debriefs/`, `decisions/` are build-ignored.

## 3. The directory map (where things live)

| Directory | What it is |
|-----------|-----------|
| `briefs/chapter-*.md`, `briefs/appendix-*.md` | The manuscript (21 chapters + appendix) — build-scanned |
| `content/` | Front matter, part dividers, book-structure, the index — build-scanned |
| `briefs/*-brief-*.md` | Briefs — plans to do something |
| `assets/` | **The dump zone for new raw material** (tracked, build-ignored) |
| `blog/` | **Blog post drafts in progress** (tracked, build-ignored; promote to `content/` when ready) |
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

### Memory vs documentation

**Use Gemini (or any generative model) as a research assistant with memory; use the documented principles as the editorial authority with git.** The two are different roles, and the mistake is letting the research assistant moonlight as the editor.

- **Memory is a research tool.** It lets the model feed you context — the project's themes, connections to other domains, the vocabulary you have been building. That is input. It helps the yap get up to speed. Good.
- **Memory is not an editorial tool.** It does not hold the voice. It does not apply the style rules consistently. It does not refuse the drift toward belonging (the "just like that thing we did last week" register). When memory touches the voice, the voice drifts toward the model's training defaults — eager, tech-fluent, impressed with itself. That is the path of least resistance, and memory gives it more material to drift with.
- **Documentation is the editorial authority.** The style rules, the voice benchmark, the principles — they live in git. They are auditable (diffable, revertable, commit-logged). Memory is not auditable. You cannot diff what the model decided to surface from last week; you cannot revert a belonging.
- **We look forward, not backwards.** Documentation is a gift to the next session, not a debt to the last one. The voice benchmark is not a memory of how we wrote last week; it is a rule for how we write next week. Memory is what happened; documentation is what we decided.

The yap is research; the voice is authorship; never let the yap author. See `blog/the-yap-and-the-voice.md` for the full argument.

### The applecart principle

A book is a context the reader enters somatically — they feel the room before they read the argument. Every register shift, jarring metaphor, rendering glitch, or broken promise is a contract violation that upsets the applecart: the reader's body leaves the room, and the mind follows with a post-hoc reason. The voice gate and tidy-first are trust-preservation mechanisms for the context, not stylistic preferences. The build passing is not enough; a human (or a proof-reader agent — see `playbooks/proof-reader-agent.md`) reading the rendered output is the only test that catches what the reader feels.

### Operating practices (process-level)

The principles above govern the *output* (the voice, the structure, the barnacles). The operating practices govern the *process* — how to work so the output gets there without losing the plot. All collected in `conceptual-lexicon.jsonl` (along with the project's special terms), updated only in a dedicated pruning session, never as a side task.

- **Hold two ideas without losing the plot.** When a second theme surfaces during a task, package the observation (write it down, flag it for the debrief) and return to the first theme. Do not let the second theme hijack the first. The packaging is the discipline; the returning is the skill.
- **No long-running tasks.** No task should run longer than the attention span of the person reviewing it. Long tasks produce a bubble reality: the agent's context fills with the task's internal logic, the user's attention drifts, the task's premises stop being questioned. Rest, take stock, confirm the path.
- **Proactive not reactive mind-changing.** Finish, then question; do not question and finish simultaneously. When you feel the pull to pivot, tidy-first and defer the discussion to the retrospective.
- **Top-sight.** Keep the end in sight whilst down in the trenches. The commit messages, the critical path, the principles layer, the debrief, and the conceptual-lexicon are externalisations of top-sight — the horizon made visible while the agent is in the trenches. Without them, top-sight is a purely internal discipline, and internal disciplines fail under fatigue.
- **Perturbation process.** The manuscript's own green-yellow frontier: small, local touches at the boundary between 'done' and 'done properly,' each one moving a sliver of almost-right into right. The perturbation is in the book's voice (the single-voice gate applies); the test is whether the whole feels more like itself after the touch. The perturbation must happen in a controlled environment — a bounded plane to measure against (the staved-finger benchmark, the style playbook, the CL) — not a noisy one. Touch, commit, rest: the sliver maps in the rest, not in the touch.
- **Perturbation protocol.** The named procedure: (1) see something that doesn't look or sound right; (2) note it for investigation — do not touch; (3) investigate the whole field, not just the triggering instance; (4) write a brief and have a good think about how to proceed; (5) perturb per-context, one touch at a time, against the benchmark. The gate between 'note' and 'touch' is what prevents premature action. The first attempted perturbation (a blanket word swap across 24 chapters) was reverted because it touched before it measured; the protocol is the formalisation of the lesson.
- **Minimal AI tech stack.** Strip the stack back at every fresh start; build incrementally; discard what the substrate has made unnecessary. The stack should get simpler over time as the substrate thickens, not more complex. Each tool carries the receipt of the problem it solved; when the receipt no longer holds, the tool is retired.

### The conceptual-lexicon

`conceptual-lexicon.jsonl` is the project's reference of operational heuristics and special terms. It is **not** updated casually. The rule:

> **Focus on the CL if you wish to amend the CL.** The focus is a critical focus: you focus on the CL and you figure out critically if there are any issues — any issues.

The CL is amended only in a **dedicated pruning session** — a special session whose sole purpose is to re-orient against the reference. The session runs tests: does each entry's justification still hold? Has any term drifted from its original intent? Are there entries that should be retired? Are there terms in active use that are not yet in the lexicon? The pruning session is the CL's tidy pass, and it follows the same discipline: finish, then question; prune deliberately, at a stopping point, with the reason recorded.

The CL is not a scrapbook. It is a reference, and a reference that drifts is worse than no reference — it propagates the drift into every session that consults it. The pruning session is the mechanism that prevents the CL from becoming a palimpsest of its own definitions.

See `blog/the-palimpsest-and-the-plot.md` for the full argument on why the discipline must be held in git, not in memory.

### Incremental formalisation

Add what the work demands, when the work demands it; formalise at the second occurrence, not the first and not the fifth. This is the meta-principle that governs the other six — each was added in response to a real problem (the voice pass surfaced the voice invariant; the tidy pass surfaced tidy-first; the Gemini memory problem surfaced the memory-vs-documentation principle), not in anticipation of an imagined one.

The anti-greenfield argument: front-loading the formalisation ("let's create a new repo with all the things we think it needs") is the map-before-the-territory error. The rules are guesses written for a practice not yet practised, and they survive on inertia as barnacles when the work arrives and does not match them. The incremental approach comprehends the moving ground — tools change, the project's understanding changes, practices that seemed right at week one are wrong by week four. You formalise only what the work has already taught you, so every rule carries a living justification you can test when the ground moves.

The risk: incremental can tip into *no* formalisation if the trigger threshold is too high. The companion rule: formalise at the second occurrence, not the first (too early — you don't know if it's a pattern) and not the fifth (too late — you've accumulated the damage). See `blog/incremental-formalisation.md` for the full argument.

## 5. Playbooks to read before the relevant work

| Before | Read |
|--------|------|
| Any editorial pass | `playbooks/style-playbook.md` (the voice rules + the voice invariant) |
| Bibliography / references | `playbooks/bibliography-playbook.md` (narrativised entries, the cap, the two-register structure) |
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

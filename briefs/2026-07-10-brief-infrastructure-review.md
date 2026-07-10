# Brief: Infrastructure Review — Trimming the Compensation Layer

**Date:** 2026-07-10
**Status:** Open

---

## Objective

Review the project's always-loaded and on-demand infrastructure for barnacles — conventions, heuristics, and formalisations that compensated for weaker models but are now overload for the current substrate. Produce a set of clear decision points where the user calls halt and decides.

## Framing: wabi-sabi infrastructure

The book's own wabi-sabi principle applies to the repo itself: operational coherence within a weathered container, not factory-spec perfection. The infrastructure was built in response to real problems (each rule carries its receipt), but the substrate has thickened. A better model doesn't need to be told not to lose the plot; a more convincing model makes the voice-drift problem *worse*, not better. The review separates these two categories:

- **Stays:** principles compensating for structural problems that better models make worse (voice drift, sycophancy, palimpsest risk).
- **Goes:** principles compensating for model weakness that the current substrate has outgrown (attention span, context window, plot-loss, compulsive touching).

The test for each piece: *does this carry a living justification, or does it survive on inertia from the era of weaker models?*

## The numbers (measured, not theorised)

| Layer | Chars | ~Tokens | Loaded when? |
|---|---|---|---|
| Edinburgh Protocol (`~/.pi/agent/AGENTS.md`) | 2,471 | ~618 | Every session |
| GitHub `AGENTS.md` | 362 | ~90 | Every session |
| pob `AGENTS.md` | 14,643 | ~3,660 | Every session |
| `conceptual-lexicon.jsonl` (26 entries) | 12,650 | ~3,162 | Every session |
| **Total always-loaded** | **30,126** | **~7,531** | |
| Playbooks (28 files) | ~154,000 | ~38,500 | On demand |

The per-session tax is ~7.5K, not 50K. The 50K figure is the full documentation surface including playbooks. The real question isn't token cost alone — it's signal-to-noise: how much of the always-loaded context is doing work vs. generating noise the model has to filter.

## The junctions (where the user decides)

Each junction is a decision point. The brief presents the case for each side; the user calls the halt and decides.

### Junction 1: The conceptual-lexicon

**The case for keeping it:** 26 entries, ~3K tokens. Already pruned at least once. Contains operational heuristics and special terms that the AGENTS.md doesn't fully duplicate.

**The case for trimming:** The AGENTS.md already states the principles; the CL elaborates them into heuristics. That's duplication. Some heuristics ("hold two ideas without losing the plot," "no long-running tasks," "proactive not reactive mind-changing") compensate for model weakness the current substrate doesn't have. The CL's own discipline says it should only be amended in a dedicated pruning session — this review *is* that session, or it isn't. Decide.

**Decision needed:** Prune the CL now (as this session's purpose), defer to a separate dedicated session, or leave it.

**If prune:** the test is per-entry. Does the entry compensate for a structural problem (stays) or for model weakness (goes)? The "perturbation protocol" (see → note → investigate → brief → perturb) was a formalisation of a lesson from a model that touched before it measured — a better model can be told "don't touch before you measure" in one sentence. The "tidy-first" principle compensates for a structural problem (barnacle accumulation) that better models make worse (more convincing barnacles). Sort each entry against this line.

### Junction 2: The AGENTS.md practice sections

**The case for keeping them:** The pob `AGENTS.md` (~3.7K tokens) is the orientation brief. It's load-bearing for any agent starting a session — the directory map, the build rules, the voice invariant, the curation loop.

**The case for trimming:** The "Operating practices" subsection (hold two ideas, no long-running tasks, proactive not reactive mind-changing, top-sight, perturbation process/protocol) is the compensation layer. These are procedures for managing a model that can't manage itself. A 2026-era model has the context window and attention for long tasks; it doesn't need "no long-running tasks" as a formalised rule — it needs a reminder to check in, at most.

**Decision needed:** Strip the "Operating practices" section down to a few sentences, or leave it. The philosophy sections (voice invariant, curation loop, memory vs documentation, applecart principle) stay regardless — those are structural, not compensatory.

### Junction 3: The Edinburgh Protocol vs the pob AGENTS.md

**The case for the Edinburgh Protocol:** ~618 tokens. Covers the spiritual layer (skepticism, systems thinking, map-not-territory, anti-dogma, practicality, no compulsive narrative, silo discipline) in a fraction of the pob AGENTS.md's length. Well-aligned with how a capable model behaves — gives it a posture, not a procedure.

**The case for the pob AGENTS.md's philosophy:** More specific to this project. The voice invariant, the single-voice gate, the applecart principle — these aren't generic posture; they're editorial authority for a book with a specific voice and a specific failure mode (Gemini drift).

**Decision needed:** These aren't in conflict — they're different layers. The question is whether the pob AGENTS.md's philosophy sections can be compressed now that the Edinburgh Protocol covers the spiritual layer. Can the pob AGENTS.md defer to the Edinburgh Protocol for the generic posture and keep only the project-specific editorial authority? Or is the redundancy intentional (belt and braces)?

### Junction 4: The playbooks

**The case for keeping them:** ~38.5K tokens, but on-demand only. Loaded when the work demands. Each carries the receipt of a problem it solved. The curation playbook, the style playbook, the bibliography playbook — these are reference material that a session consults before doing the relevant work.

**The case for trimming:** Some playbooks may be barnacles. The `css-architecture-blog-post.md` — is that still referenced? The `herdr-playbook.md` — is the SSH/iPad monitoring setup still in use? The `tree-view-playbook.md` — does the tree command still need a playbook? The tidy-first pass should scan for playbooks that have lost their justification.

**Decision needed:** A tidy-first pass over the playbooks directory. Not a big rewrite — a scan for barnacles. Fix the cheap ones (delete or merge stale playbooks); brief the expensive ones. This is the standing tidy-first task, not a new initiative.

### Junction 5: The dump-zone accumulation

**The case for addressing it:** There are 11 untracked assets and 7 untracked briefs in the tree from prior sessions. The curation loop says: dump → assimilate → assess → draft → registry sync. Several assets are stuck at "dump" — they haven't been assimilated into briefs yet. The `futon-specs-01..04`, `losing-the-floor-01..02`, `movement-revolution*.md`, `somatic-debt-shield.md`, `the-new-patriarchy-01..02` — these need the same treatment the sleep-tension dialog just got.

**The case for leaving it:** The dump rule says "when in doubt, put it in assets/." The assets are tracked and build-ignored. They're not broken; they're pending. The curation loop doesn't demand immediate assimilation.

**Decision needed:** Batch-assimilate the remaining assets (write briefs for each), or leave them in the dump zone for future sessions. The sleep-tension curation took one session; doing all 11 assets would be a long task — which violates "no long-running tasks" (if that rule survives Junction 2).

## What this brief is not

- Not a rewrite of the AGENTS.md. The philosophy stays.
- Not a greenfield rebuild. The anti-greenfield argument in the AGENTS.md applies: the rules survive because they were added in response to real problems, not anticipation.
- Not a side task. If the CL is pruned, it's pruned as this session's purpose, not as a side effect of something else.

## Proposed execution

1. User reviews this brief and decides at each junction.
2. For each "go" decision: the trim is done in this session, committed, and the change is noted in the debrief.
3. For each "defer" decision: a brief is written for the deferred work, and it's tracked in td.
4. The CL pruning (if approved) runs the per-entry test: structural (stays) vs compensatory (goes). Each removed entry gets a one-line reason in the commit message.
5. Build passes after each change. The build is necessary but not sufficient — a human reading the rendered output is the ground truth.

## Notes

- The wabi-sabi link the user flagged is the framing for the whole review: the infrastructure should be "good enough" (operational coherence), not "ideal" (factory-spec). The idealist aspiration is the greenfield reflex — front-loading formalisation for a practice not yet practised. The wabi-sabi approach accepts the weathered container and clears only what's accumulated beyond its justification.
- The Edinburgh Protocol's alignment with the LLM/human interaction is noted: better models need posture (skepticism, systems thinking), not procedure (don't lose the plot, no long tasks). The posture is ~600 tokens; the procedure is ~3K. The ratio should shift toward posture as the substrate thickens.

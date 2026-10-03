# Brief: Grad/Div/Curl Commentary Woven Through the Book

**Date:** 2026-06-28 (revised 2026-06-29)
**Status:** Open — thinking phase, parked for revisit. Commentaries drafted in `scratchpad/`; not yet perturbed into chapters.
**Related tasks:** td-785e7b (Grad/Div/Curl explanation convention — partially satisfied by Ch00 + the style-playbook convention), the bounded-plane brief (same date)

## Objective

Weave grad/div/curl into the book as a connective medium — the vocabulary Ch00 teaches once, recursed through the chapters so it deepens rather than dies. Two surfaces carry the recurrence: the **equation groundings** (under each load-bearing display equation) and the **narrative commentary** (woven into the Familiar Hook and prose).

## Context

Ch00 (The Vocabulary) teaches the three operators once: gradient (which way is up), divergence (where the water comes out), curl (the twist). Vocabulary taught once and never used is vocabulary forgotten. The operators need to recur — not as labels ("this is the divergence") but as the medium that relates an equation's things to the body's things.

The bounded-plane brief (same date) establishes that many equations are defined on a bounded domain, and the bounded domain is what makes the measurement a measurement rather than noise. Where a real bounded domain is doing work, the commentary names it. Where it is not, the commentary is silent — padding in a math section is worse than no commentary, because it teaches the reader to skip the prose.

### The precondition, stated once, reminded by contrast

With a physical reference plane and an orthogonal 1g vector field, things happen; without them, not much does. Stated once where the floor datum is introduced (Ch01). Reminded thereafter by **contrast** — the floor shown by what the space station or the moon deletes — not by restatement. Deployed only where the 1g-plus-datum is the real precondition; the bounded containers (thorax, tunnel, state-space) bound in zero-g too, so the contrast would be decoration there.

## Two surfaces, two forms

The commentary lives on two surfaces, and the form differs because the medium differs:

### Equation grounding (under the equation)

The equation is already the formal object in view; the grounding **translates** it. Form: *technical clause first (picking up the equation's content), physical consequence second (carrying it to the body).* Example shape: "the divergence goes to zero, the force leaves the muscle and runs into the fascia." No Ch00 mini-gloss repeated — Ch00 teaches the definitions once; the grounding recurs, it does not re-teach.

### Narrative commentary (in the prose)

No equation sits above the narrative; it earns the **felt-sense lead**. The operator appears as a thread in the story ("you feel the wringing... this is the twist you wrung into the towel"), the technical term lands once tied to Ch00's towel/t-shirt, and the felt verbs Ch00 generates ("bleeds," "spreads," "funnels," "leaks") carry the divergence in plain English. No coinage ("sourcing" was tried and retired — it didn't self-explain).

The operator appears **once or twice per chapter** in the narrative, never every paragraph. A thread, not a coating.

## The grounding checklist

Each equation grounding is judged against three tests:

1. **Operator named?** Gradient, divergence, curl — or what the equation does if it is not an operator equation (yield criterion, friction law, invariant).
2. **Bounded plane named where real?** The floor datum, the thorax, the sole — where the measurement depends on it; silent where not.
3. **Physical consequence in one clause?** What the equation is doing to the body.

The narrative commentary is judged by whether the operator recurs in felt terms, once or twice, tied to Ch00, without becoming jargon.

## Scope

### In scope: load-bearing display equations + narrative where the operator is the medium

Not every `$$...$$` — the load-bearing ones (intermediate steps inherit). Not every chapter's prose — only the chapters where an operator is genuinely the narrative medium (Ch02 curl, Ch03 divergence+curl, Ch05 gradient, Ch20 divergence; Ch07 and Ch13 drafted as candidates, not yet written).

### Out of scope: the heading swap and the Penrose retirement

- **The "Mathematical Justification" heading swap** is a separate open brief (`briefs/2026-06-28-brief-replacing-justification.md`). The commentary gives the math section its spine; the heading labels the spine afterward.
- **The Penrose Parallel retirement** is deferred to a separate brief, written after the commentary pass exists. Retiring it against a hypothetical is premature.

## Deliverables

### 1. The equation inventory (done)

Every load-bearing display equation across 22 chapters (Ch00 excluded), with operator family and bounded-plane/contrast flag. Held in `scratchpad/grad-div-curl-groundings.md` Part E.

### 2. The equation grounding set (drafted, in review)

One grounding per load-bearing equation, kept apart from the chapters. Held in `scratchpad/grad-div-curl-groundings.md` Parts A–C. Reviewed for consistency (same operator named the same way across chapters), voice (dry, no "we"), plane discipline (named only where real), and form (technical-first, no template).

### 3. The narrative commentary set (drafted, in review)

Proposed revisions/insertions for four chapters (Ch02, Ch03, Ch05, Ch20), kept apart from the chapters. Held in `scratchpad/narrative-commentary.md`. Reviewed for felt-sense lead, term placement, density, and whether the form generalises (Ch07, Ch13 drafted as candidates).

### 4. The perturbation (separate, after review)

Once both sets are approved, perturb per-chapter: touch, build, read against the staved-finger benchmark, keep or revert. Small touches, one at a time. The single-voice gate and the proof reader apply. The perturbation protocol gates this — note, investigate, brief, think, then touch.

## Current state (2026-06-29)

Both commentaries are drafted and read well — "sounds obvious as we read it" is the signal that the shape has stopped fighting the material. Parked for revisit rather than pushed, because:

- **Open questions are the author's to call** — the one-inch punch's loading (twist vs compression), term placement in the hook (term in vs withheld to math section), density (one operator per chapter vs two where genuine), and the one loaded phrase ("the boundary face of the divergence" in Ch12).
- **Two narrative chapters are candidates, not written** — Ch07 (oxter, divergence equilibrium), Ch13 (frontier scale, gradient zones). Doing them would confirm the form generalises or surface a case that breaks it.
- **The perturbation protocol hasn't run.** The commentaries are the thinking; the touching is separate and gated.

The scratchpad files are the living documents; this brief points to them and catches up at the stopping point.

## Constraints

- **One grounding per load-bearing equation** (intermediate steps inherit); **one or two operator mentions per chapter** in the narrative.
- **The checklist, not a template.** The equation grounding varies; the three tests hold.
- **The perturbation process applies.** Commentaries first (the thinking); chapter touches second (the touching). Do not touch a chapter until the commentaries are approved.
- **The single-voice gate applies.** Commentary in the book's voice. The proof reader checks for "we" and seminar register.
- **Preserve all KaTeX.** Commentary is prose; the equations are untouched.
- **Self-contained.** The equation grounding names the operator without re-teaching it (Ch00's job); the narrative ties the term to Ch00's felt sense once, then uses plain verbs.

## Verification

- Every load-bearing display equation has a grounding passing the three checklist tests.
- The narrative carries each operator once or twice, in felt terms, tied to Ch00.
- Both sets, read as wholes, are consistent in voice and varied in shape.
- Bounded planes and floor-contrasts are named only where real.
- `just build` succeeds; KaTeX renders; no jargon.
- The reader who reads only one chapter's math section can identify which operator is at work, without having read Ch00.

## Related

- **`scratchpad/grad-div-curl-groundings.md`** — the equation commentary (inventory + groundings, Parts A–E)
- **`scratchpad/narrative-commentary.md`** — the narrative commentary (Ch02, Ch03, Ch05, Ch20; Ch07, Ch13 as candidates)
- `briefs/2026-06-28-brief-the-bounded-plane.md` — the bounded-plane principle
- `briefs/chapter-00-the-vocabulary.md` — the onboarding chapter that teaches the operators
- `briefs/2026-06-28-brief-replacing-justification.md` — the heading swap, deferred to after this pass
- `playbooks/style-playbook.md` § "Explaining Math In-Chapter" — the `:::explanation` convention
- `conceptual-lexicon.jsonl` — terms: floor-datum, governor, perturbation-process

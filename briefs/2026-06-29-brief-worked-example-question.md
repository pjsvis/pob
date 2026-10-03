# Brief: The Worked-Example Question

**Date:** 2026-06-29
**Status:** Resolved 2026-06-29 — Option 2 (hold the line), for the reason recorded below. Brief retained as the record of the decision.
**Found during:** External eval (`debriefs/evals/openhuman-repo-eval.md`) — Weakness 1 / Recommendation 1
**Resolved by:** `briefs/2026-06-29-brief-math-as-illustration.md` (the math-as-illustration / citations-as-baseline stance)

## Objective

Decide whether the book should include at least one fully worked quantitative example — a concrete calculation that takes a reader from a measured input (e.g., ground reaction force data) through the tensor framework to a prediction (e.g., expected strain distribution). The external eval argues this single addition would "dramatically increase credibility without turning the book into a technical paper." This brief is the thinking before the decision.

## Context

The book claims a paradigm shift *via* continuum mechanics: the body is a bounded continuum with a non-Euclidean internal metric, calibrated against the floor datum, and chronic pain is broken geometry. The external eval's sharpest technical criticism is that the math is "described more than it is used" — the equations gesture at machinery (Poynting effect, Lie derivative, non-holonomic path dependency) without building to anything quantitatively predictive. The gap between "the body is a continuum" and "here is the PDE that governs gait" is never closed.

The eval is partly right and partly committing a category error. The book explicitly disclaims being a textbook ("not a textbook" — Section 00), so measuring it against an academic standard is misaimed. But there is a real kernel: you cannot claim a paradigm shift through continuum mechanics and then not use continuum mechanics quantitatively anywhere. A paradigm shift earned by formalism needs at least one place where the formalism does work the prose cannot. Right now the formalism is scaffolding; the question is whether it should, at least once, bear load.

### What a worked example would and would not do

It **would** demonstrate that the framework is not just rhetorical — that the equations, fed real inputs, produce a prediction. It would give the careful technical reader (the one the eval is channelling) a single point where the math earns its keep. It would close the "described vs used" gap at one location.

It **would not** turn the book into a textbook, provided it is bounded — one section, one calculation, signposted and skippable. The risk is the opposite: a worked example that is too thin looks performative (mathiness as legitimacy theatre), and one that is too thick betrays the audience and the voice. The example has to be real, not decorative.

### The honest tension

The book's audience is ambiguous (the eval's Weakness 4): the math prereq excludes most clinicians, the applied chapters are too hand-wavy for mathematicians. A worked example sharpens this tension rather than resolving it. It would serve the technical reader and potentially alienate the clinical reader further — unless it is shaped so the *result* is legible without the *derivation*. That shaping is the hard part, and it is a voice problem (the single-voice gate applies), not a math problem.

## The decision (resolved)

**Option 2 — hold the line — wins**, but for a better reason than "we don't want to." The reason is the math-as-illustration stance (`briefs/2026-06-29-brief-math-as-illustration.md`): the book's math is illustrative of accepted prior art, not derivational. The worked examples already exist — they are in the cited literature (Kepler and Newton, not re-derived). The book's job is to show where the accepted math touches the body, not to re-derive the math or produce a new worked prediction. Any derivation judged necessary for the careful reader goes in an appendix, not the main text.

The stance makes the register legible so that no future eval reads the equations as claims the book is obligated to complete. The critique is dissolved by clarification of role, not by capitulation to the demand.

The decision is recorded here so it is not re-litigated next session. If the stance changes, this decision re-opens.

---

The sections below are retained as the thinking that led to the decision.

## Constraints on whichever option is chosen

- **The single-voice gate applies.** A worked example, if added, is in the book's voice — not the textbook register, not the seminar register. The staved-finger benchmark holds.
- **The applecart principle applies.** A worked example that reads as mathiness (legitimacy theatre) upsets the room worse than no example. If it cannot be done in voice, option 2 is the honest call.
- **The perturbation process applies** if option 1 is chosen: investigate the field (which calculation, which inputs, which prediction), brief the specific example, think, then touch.
- **This is a decision brief, not an execution brief.** Do not draft an example until the option is chosen.

## Verification (of the decision, not the execution)

- The author has chosen an option and recorded the reason.
- If option 1: a follow-up execution brief is written, naming the specific calculation.
- If option 2: the reason is recorded so the critique is not re-litigated next session.
- If option 3: a trigger is defined for when the decision is revisited (e.g., "after the grad/div/curl commentary perturbation lands").

## Related

- `debriefs/evals/openhuman-repo-eval.md` — the eval that surfaced this (Weakness 1, Recommendation 1)
- `briefs/2026-06-28-brief-grad-div-curl-commentary.md` — the commentary pass that may affect the decision
- `briefs/appendix-a-falsification-protocols.md` — where the framework currently meets evidence
- `conceptual-lexicon.jsonl` — terms: applecart-principle, single-voice-gate, perturbation-process

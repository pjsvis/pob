# Brief: Math as Illustration — Citations as Baseline

**Date:** 2026-06-29
**Status:** Open
**Found during:** Reflection on the external eval (`debriefs/evals/openhuman-repo-eval.md`) — the eval read the equations as claims and found them underdeveloped; the booboo (body-as-plane) confirmed the book's register is not legible.

## Objective

Adopt an explicit stance: the book's equations are **illustrations of prior art**, not derivations or claims. Continuum mechanics, the Poynting effect, the Lie derivative, the Cauchy stress theorem, non-holonomic path dependency — these are accepted science, cited as baseline, not invented by the book. The book's contribution is the **synthesis and the application to the bio-tensegrity body on the floor datum**, not the math. State this stance openly in the Preface or Section 00 so no reader — and no future eval — misreads the equations as proofs the book is obligated to complete.

The analogy, stated in the book's voice: when we talk about going to Mars, we cite Kepler and Newton; we do not re-derive them. The math is the accepted baseline; the mission is the application. This book does the same. The baseline is continuum mechanics; the mission is the body on the floor.

## Context

The external eval's sharpest technical criticism was that the math is "described more than it is used" — equations gesture at machinery without building to anything quantitatively predictive, and the gap between "the body is a continuum" and "here is the PDE that governs gait" is never closed. The eval demanded a worked example.

The eval is measuring the wrong thing, but the confusion is the book's fault, not the eval's. Nothing currently tells the reader which register the equations are in. Display math, LaTeX, and the "Mathematical Justification" heading all signal *proof*. A competent reader reads them as claims and finds them underdeveloped — correctly, because they were never meant to bear that load. The fix is not to develop the math (that betrays the register and the audience); it is to make the register legible.

The Penrose/Tufte move: *The Road to Reality* illustrates; *The Visual Display of Quantitative Information* illustrates. Neither proves the world exists and that we are in it. The equation-as-illustration shows the reader the formal shape of the mechanism the prose is describing. It is a figure, not a proof. Derivations, if any, go in an appendix — where a reader who wants them expects to look.

### What the stance does

1. **Establishes a baseline of accepted science.** The math is not the book's invention; it is established physics. Citing it as such moves the book from "inventing a framework" to "applying one" — a stronger position. The novelty is the synthesis and the application to the body, not the math.
2. **Dissolves the "math underdeveloped" critique.** You cannot be criticised for not deriving something you explicitly say you are citing. The worked examples are in the cited literature; the book's job is to show where the math applies to the body.
3. **Matches the Mars/Kepler register.** The baseline is continuum mechanics (accepted, cited); the mission is the bio-tensegrity body on the floor datum (the synthesis). This is the book's actual move, made explicit.

## What this reframes (cross-cutting)

This stance does not live in one section; it reframes several open pieces of work. Each is updated by it, not replaced:

- **The "Mathematical Justification" heading** (`briefs/2026-06-28-brief-replacing-justification.md`). The heading implies the section justifies a claim with math. If the math is an illustration of prior art, the section does not justify — it illustrates or shows. The Model/Mechanism/Case swap still works, but now with a clearer rationale: the heading names the *kind of illustration*, not a kind of proof. The replacement heading signals "here is the formal shape of what we just described."
- **The grad/div/curl commentary** (`briefs/2026-06-28-brief-grad-div-curl-commentary.md`). Each operator's first appearance can carry a reference: "the divergence (Gauss's theorem; see [ref])" — the prior art named, the book's contribution (the application to the towel, the torso) is the recurrence. The commentary's job becomes clearer: showing the reader where the accepted math touches the body, not teaching or deriving. Ch00 becomes "the vocabulary, with references," not "the derivation."
- **The worked-example question** (`briefs/2026-06-29-brief-worked-example-question.md`). Resolved by the stance: Option 2 (hold the line) wins, for a better reason than "we don't want to." The book's math is illustrative, not derivational; worked examples live in the cited literature; an appendix holds any derivations judged necessary. The decision brief should be updated to record this resolution — the question is closed by the stance, not deferred.
- **The status-of-evidence note** (`briefs/2026-06-29-brief-status-of-evidence.md`). With prior art cited as baseline, the clinical chapters can say "the model (per [ref]'s framework) predicts X; this prediction is supported by anecdote / n=1 / no direct evidence yet." The evidence-status note now sits on a foundation of cited science rather than floating on the book's own authority.

## Deliverables

1. **A statement of the stance, in the book's voice, for the Preface or Section 00.** Short. The Mars/Kepler analogy, the equation-as-illustration framing, the prior-art-as-baseline position. This is the load-bearing deliverable — it is what makes the register legible. Drafted in a scratchpad, reviewed against the staved-finger benchmark, then perturbed into the Preface or Section 00.
2. **A citation inventory.** For each piece of math the book invokes, the origin reference: Gauss (divergence theorem), Cauchy (stress theorem), Poynting (the effect), Lie (the derivative), Gauss again (Theorema Egregium), the non-holonomic path-dependency literature, Maxwell (viscoelastic relaxation), etc. Held in a scratchpad; the book cites sparingly, but cites where it cites.
3. **An appendix plan.** What, if anything, gets derived in an appendix rather than illustrated in the main text. The default is: nothing, unless a specific derivation is judged necessary for the careful reader. The appendix is the home for derivations; the main text is illustrations.
4. **Updates to the cross-cutting briefs** listed above, recording how the stance reframes each.

## Constraints

- **The single-voice gate applies.** The stance statement is in the book's voice — dry, no "we", no seminar register, no marketing. The Mars analogy fits the voice (it is the kind of thing the book already says); borrowed-authority citations do not.
- **Citations are not legitimacy theatre.** Cite only where the citation does work (naming the origin of a concept the reader might want to verify), never to borrow authority. "This is Gauss's theorem" once, not "as shown by extensive literature [1-47]." A citation that smells like borrowed authority is the seminar register in a lab coat — the voice gate catches it.
- **The perturbation process applies.** Stance statement and citation inventory first (the thinking); chapter touches second (the touching), gated on approval.
- **The applecart principle applies.** The stance must read as a clarification, not a retreat. The book is not less bold for saying its math is illustrative; it is more honest, and honesty is the book's register. If the stance reads as "sorry our math is weak," it is wrong; if it reads as "here is the role the math plays," it is right.
- **Preserve all KaTeX.** The stance does not remove equations; it reframes how the reader meets them.

## Verification

- The Preface or Section 00 carries a statement making the equation-as-illustration register legible.
- Each piece of math invoked in the book has an origin reference in the citation inventory; the book cites the subset that does work.
- The cross-cutting briefs are updated to reflect the stance.
- The worked-example brief is resolved (Option 2, for the stance's reason).
- A fresh reader, reading the Preface, understands that the equations are illustrations of accepted science, not derivations or claims — and does not make the booboo of reading them as proofs.
- `just build` succeeds; the stance is in voice; no legitimacy theatre.

## Related

- `debriefs/evals/openhuman-repo-eval.md` — the eval whose misreading surfaced the need for the stance
- `briefs/2026-06-28-brief-replacing-justification.md` — the heading swap, reframed by this stance
- `briefs/2026-06-28-brief-grad-div-curl-commentary.md` — the commentary, given a citation backbone
- `briefs/2026-06-29-brief-worked-example-question.md` — resolved by this stance (Option 2)
- `briefs/2026-06-29-brief-status-of-evidence.md` — sits on the cited-science baseline
- `conceptual-lexicon.jsonl` — terms: applecart-principle, single-voice-gate, perturbation-process

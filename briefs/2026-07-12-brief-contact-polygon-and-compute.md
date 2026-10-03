# Brief: The Contact Polygon and the Cost of Computation

**Date:** 2026-07-12
**Status:** Open

---

## Objective

Argue that an embodied human tensegrity system, in contact with an orthogonal 1g field, sits on a *posture complexity ladder* (steepled finger → bipedal stance → supine), and that each rung reduces the inference problem the body (or its numerical model) must solve, with corresponding gains in effective compute bandwidth. Investigate whether the pattern generalises, what it costs, and where it stops.

## Piece Details

**Proposed Title:** *The Floor as a Computer: How Contact Geometry Calibrates Bio-Tensegrity*

**Dek:** The half-plane and the orthogonal 1g field install a reference frame for an embodied tensegrity system. A larger contact polygon shrinks the state space; smaller state space buys inference bandwidth. A trace of the ladder, with costs.

**Tags:** tensegrity, contact-mechanics, proprioception, inference, posture, whole-body, support-polygon

## Content Outline

1. **Hook** — Cat lands on turf without a snap; we break a clavicle (chapter 20). What is the substrate doing, computationally, in each case?
2. **The complexity ladder** — Steepled finger (five-digit shared baseline, `briefs/2026-06-26-staved-finger-tensor-algebra.md`) → bipedal stance on 1g (oriented reference frame, finite support polygon, vestibular soundtrack) → supine on 1g (maximal contact polygon, no vestibular tonal signal). Each rung transforms a category of degrees of freedom rather than merely removing them.
3. **The inference-cost reduction** — Standing forces continuous correction across a small support polygon; the body's "control loop" must run hot. Supine makes most rigid-body DOFs quasi-passive; the floor is doing the work. *Same idea at one-joint scale*: steepling reduced the staved finger's compute bill because the four neighbouring digits provided the baseline. The principle ladders.
4. **Throughput in two registers** —
   - (a) **External computation**: DOF count + constraint conditioning → feasible integration rate. For a numerical FEM/multibody simulation, supine posture typically integrates faster than stance because contact is well-conditioned and rotational DOFs are near-degenerate.
   - (b) **Biological inference**: passive support frees active inference for the residual state. Standing is the highest-resolution proprioceptive regime (vestibular + plantar + joint afferents all contributing simultaneously); it is also the most computationally expensive.
5. **Where the ladder costs** — At supine, vestibular otoliths read 0; spatial orientation is lost. *Information density drops even as computational demand drops.* The trade: a passive, low-bandwidth state in exchange for a cheap-to-maintain one. Standing is hard because it is high-bandwidth; lying is cheap because it is low-bandwidth. Not a free win.
6. **Resolution** — Posture choice is a *posture-complexity* choice. The body is not a fixed-cost computer; its compute bill is partly set by what it is *lying on*. Use the ladder; do not mistake high-bandwidth posture for high-cost-only.

## Research Needed

- [ ] Confirm the support-polygon definition for the supine case degenerates to the body's footprint — verify against a robotics or biomechanics reference
- [ ] Survey robotics literature on posture-conditioned computation cost (`underactuated posture`, `contact-rich planning`, `manipulability index`)
- [ ] Cross-reference chapter 20 (`briefs/chapter-20-the-clavicular-fuse-and-the-tensor-of-impact.md`) — the floor-as-boundary is already there; this brief should ladder the same idea across postures
- [ ] Verify the vestibular otolith claim (supine → otolithic signal ≈ zero) against a vestibular-physiology source
- [ ] Distinguish holonomic constraint ($\Phi(\mathbf x)=0$) from unilateral inequality constraint ($\Phi(\mathbf x)\geq 0$) at the contact interface — the body is the inequality case; the cli chapter needs to be honest about this
- [ ] Check whether the `extract-display-equations.ts` pipeline captures the additional tensor expression we will introduce

## Publication Checklist

- [ ] Decide placement: chapter addition, sub-section of chapter 20, or standalone piece in `content/`
- [ ] Math notation passes the display-equations extraction
- [ ] KaTeX renders clean in `just preview`
- [ ] Voice pass calibrated against `briefs/2026-06-26-staved-finger-tensor-algebra.md`
- [ ] `just build` passes
- [ ] `just pdf` passes and the PDF renders correctly
- [ ] Committed to main

## Notes

- The author's intuition — *posture reduces complexity, throughput rises* — is well-founded but needs careful framing. It is **not** that all DOFs reduce equally: the internal joint DOFs are largely invariant across the ladder. The reduction is at the *interface layer* (body ↔ ground) and at the *inference-conditioning* layer (the estimator's Jacobian is better-conditioned), not at the body's intrinsic joint count.
- The brief must not collapse the two throughput meanings (external simulation Hz vs. biological inference bandwidth). They are linked but not identical; the piece earns its place only if both are kept distinct.
- The piece should *not* become a FEM tutorial. The argument is a tabletop argument — a small piece of reasoning that fits beside the staved-finger chapter and chapter 20.
- If the piece grows past a brief, consider co-locating with chapter 20 as a sub-section, rather than promoting to a standalone chapter; the through-line is the same.
- The Mojo question (ADR-010) is incidentally relevant: if a numerical simulation of the ladder ever lands as a computational companion, Mojo becomes a candidate. Do not let this brief reopen that decision; it is a *trigger*, not a *reason*.

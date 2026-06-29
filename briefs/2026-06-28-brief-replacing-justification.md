# Brief: Replacing "Mathematical Justification" — A Per-Context Perturbation

**Date:** 2026-06-28
**Status:** Open
**Found during:** Perturbation process — the first attempted perturbation (a blanket word swap) was reverted because it touched before it measured.

## Objective

Replace the section heading "The Mathematical Justification: [subtitle]" across all 24 chapters with a heading that matches what each section actually does. No single replacement word — the 23 sections fall into at least four categories, and each category gets the heading that fits its function.

## Context

"The Mathematical Justification" appears in every chapter's math section. The word "justification" is an applecart upset: it sounds apologetic ("here is why I'm allowed to claim this"), it's the seminar register (defending a thesis to a committee), and it confirms the reader's suspicion that math is hand-waving ("you're justifying with equations, which is what people do when they can't justify with evidence"). The book is not defending; it is describing. The math is not the justification for the claim; it is the formalisation of what the body is doing.

A blanket swap to "Mathematical Model" was attempted and reverted. The revert was correct: the 23 sections are not all models. A single replacement word stretched across four different functions is the same error as the original word stretched across the same four functions — one word doing four jobs, wrong for at least three of them.

## The inventory

Every "Mathematical Justification" heading, categorised by what the section actually does:

### Model (16 chapters) — a formal model of a physical mechanism

| Ch | Current subtitle | What the section does |
|----|-----------------|----------------------|
| 01 | The Boundary Conditions | Models the floor datum ($z \ge 0$, $\mathbf{g} = -g\mathbf{e}_z$) |
| 02 | The Poynting Effect | Models the torsion-elongation coupling ($E_{zz} = \frac{1}{2}R^2\alpha^2$) |
| 03 | The Phase Change Matrix | Models the impact freeze ($\lim_{\Delta t \to 0} \mu = \infty$) |
| 05 | Stochastic Drift on the State-Space Manifold | Models the idle-state update (SGD on the cost function) |
| 07 | Non-Euclidean Slings and the Scapulothoracic Glide Plane | Models the shoulder's fascial sling |
| 08 | The Oculomotor Origin and VOR Coordinate Synchronization | Models the visual-vestibular coupling |
| 09 | Isotropic Invariance and the Deletion of the Vector Field | Models the zero-g manifold |
| 10 | Hoop Stress and Laminated Shell Mechanics | Models the core cylinder |
| 11 | Spherical Transformation Metrics and Gimbal Lock | Models the hip joint |
| 14 | Covariant Tensor Variance Across Asymmetric Manifolds | Models bilateral asymmetry |
| 16 | The Cable-Pulley Friction Equation | Models the patellar pulley |
| 19 | Gauss's Theorema Egregium and Metric Distortion | Models the Cartesian projection error |
| 20 | Stress Invariants and the Divergence of Impact | Models the clavicular fuse |
| 21 | Torque Propagation and the Proximal Lever Arm | Models the ankle fuse |
| 22 | Hydrostatic Tunnel Pressure and the Hovering Shear Vector | Models the carpal tunnel |
| 23 | Cumulative Line Tension and Anchor Point Shear | Models the plantar shard |

**Proposed heading:** `## The Model: [subtitle]`

A model is a formal description of what is happening. It does not apologise; it describes. "The Model: The Poynting Effect" says: here is the formal version of the torsion-elongation coupling. The reader who can't compute the model can still feel the felt thing it formalises (the twisted towel lengthening). The model is the scaffolding; the justification is the apology. The book doesn't apologise.

### Mechanism (5 chapters) — the physical mechanism behind a phenomenon

| Ch | Current subtitle | What the section does |
|----|-----------------|----------------------|
| 04 | The Lie Derivative and the Updating Coordinate Map | The mechanism by which the governor updates the map |
| 06 | Non-Affine Metric Ingestion | The mechanism by which the floor's calibration carries into walking |
| 12 | Distributed Pressure Transducers and the Cauchy Surface Functional | The mechanism by which the foot reads the ground |
| 13 | The Four Zones | The mechanism by which the governor partitions permission |
| 15 | The Cramp Scam and the Hysteresis Threshold | The mechanism by which the cramp fires as a false alarm |

**Proposed heading:** `## The Mechanism: [subtitle]`

These sections are not full models — they don't present a complete formal system. They explain *how* a thing works: the governor's update runs the Lie derivative; the foot reads the ground through the Cauchy stress tensor; the cramp fires at the hysteresis threshold. "The Mechanism: The Cramp Scam and the Hysteresis Threshold" says: here is how the cramp works. It is less grand than "model," which is correct — these sections are narrower, more focused on the *how* than the *what*.

### Argument (2 chapters) — the section is arguing a thesis

| Ch | Current subtitle | What the section does |
|----|-----------------|----------------------|
| 17 | Non-Holonomic Path Dependency and the Terminal State Error | Argues that the path is irrecoverable from the terminal state |
| 18 | Two Ways a Map Goes Dark | Argues that somatic and practitioner amnesia are mirror images |

**Proposed heading:** `## The Case: [subtitle]`

These sections are not models or mechanisms; they are arguments. Ch17 argues that you cannot reconstruct the path from the destination (the path integral is non-conservative). Ch18 argues that two amnesias share a structure (both delete a process, leave the output, mistake the output for the cause). "The Case" fits the book's detective-story register (Part IV is explicitly "Detective Case Files") and avoids the seminar register ("The Argument," "The Thesis"). "The Case: Non-Holonomic Path Dependency" says: here is the argument, laid out. It does not say: here is my justification for claiming this.

### Open questions for the author

1. **Does "The Model" / "The Mechanism" / "The Case" feel right, or is there a better set?** The three words cover the three categories, but the author may feel a different set fits the book's voice better. Alternatives: "The Formalism" (too academic), "The Math" (too casual), "The Physics" (too narrow — not all sections are physics), "The Geometry" (too narrow — not all sections are geometric). "The Model" / "The Mechanism" / "The Case" is my recommendation, but the author should decide.

2. **Does the word "Mathematical" stay in the heading?** Current: "The Mathematical Justification: [subtitle]." Proposed: "The Model: [subtitle]" — dropping "Mathematical." The math is in the section; the heading does not need to announce it. Announcing it is the "warning: equations ahead" sign, which is the apology. But the author may feel the word "Mathematical" serves as a signpost for the reader who wants to skip the math. If so, "The Mathematical Model" / "The Mathematical Mechanism" / "The Mathematical Case" — though "The Mathematical Case" is awkward. Recommendation: drop "Mathematical." The reader can see the equations.

3. **Are there sections that cross categories?** Ch08 (VOR) could be a description rather than a model. Ch13 (The Four Zones) could be a model rather than a mechanism. The boundaries are not sharp. The author should make the final call per chapter.

4. **Does Ch00 (The Vocabulary) need a heading change?** Ch00's sections are "The Three Operators," "The Tensors," "The Penrose Parallel" — none use "Justification." No change needed, but the Penrose Parallel revision (from the grad/div/curl brief) will touch Ch00 separately.

5. **Does the Preface or Section 00 use "Justification"?** No — the Preface has "The Premise," "The Logic," "What This Book Is"; Section 00 has "The Anti-Marketing Manifesto," "The Math," "The Signal-to-Noise Optimisation." Section 00 already uses "The Math" — which is a data point for the "drop Mathematical" recommendation.

## Deliverables

1. **This brief as the thinking-through.** The perturbation is not started until the author approves the per-chapter heading assignments.
2. **The perturbation itself, done per-chapter.** Each heading is changed individually, the build is run, the chapter is read against the benchmark, and the change is kept or reverted. Small touches, one at a time — the perturbation process.
3. **The style playbook updated.** The "Structure of a Chapter" section currently says "Familiar Hook → Mathematical Justification → Hardware Smoke Test." It should be updated to reflect that the math section's heading varies by category: Model, Mechanism, or Case. The structure is still Hook → Math → Smoke Test; the heading name is per-context.
4. **The CL updated** (in a pruning session, not casually) if a new term emerges from the heading set (e.g., "the model" / "the mechanism" / "the case" as named section types).

## Constraints

- **Think first, touch second.** The revert of the blanket swap is the proof that this discipline matters. The brief is the thinking; the perturbation is the touching. Do not touch until the thinking is approved.
- **Per-chapter, not blanket.** Each heading is changed individually and judged against the benchmark. A heading that works for Ch02 may not work for Ch17.
- **The perturbation process applies.** Small touches, in the book's voice, against the bounded plane of the benchmark. Touch, commit, rest.
- **The single-voice gate applies.** The new headings are in the book's voice, not the seminar register.
- **Preserve all KaTeX and section content.** Only the heading changes; the math and the prose underneath are untouched.

## Verification

- No "Justification" remains in any chapter heading.
- Each heading matches what the section does (Model, Mechanism, or Case).
- The style playbook's chapter-structure section reflects the per-context headings.
- The proof reader is run on each touched chapter.
- `just build` succeeds; KaTeX renders; no jargon.
- The reader who reads only one chapter can identify what kind of section they are in (a model, a mechanism, or a case) from the heading alone.

## Related

- `playbooks/style-playbook.md` § "The Structure of a Chapter" — the heading convention
- `conceptual-lexicon.jsonl` — terms: perturbation-process, applecart-principle
- `briefs/2026-06-28-brief-grad-div-curl-commentary.md` — the companion brief (the commentary names the operator + bounded plane; this brief names the section type)
- The reverted commit (e439791) — the blanket swap that was the wrong perturbation

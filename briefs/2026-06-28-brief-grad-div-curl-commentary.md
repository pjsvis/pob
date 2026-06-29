# Brief: Grad/Div/Curl Commentary Woven Through the Book

**Date:** 2026-06-28
**Status:** Open
**Related tasks:** td-785e7b (Grad/Div/Curl explanation convention — partially satisfied by Ch00 + the style-playbook convention), the bounded-plane brief (same date)

## Objective

Weave a grad/div/curl commentary through every chapter that contains an equation. Each equation's Mathematical Justification section should name the operator at work and the bounded plane it is measured against, in one plain-language sentence, before the equation. The combination — operator + bounded plane — is what reveals the truth of the equation to the reader who does not compute.

## Context

Ch00 (The Vocabulary) teaches the three operators once: gradient (which way is up), divergence (where the water comes out), curl (the twist). That is the vocabulary. But vocabulary taught once and never used is vocabulary forgotten. The operators need to recur — each chapter that has an equation should name which operator is at work, in plain language, so the reader hears the vocabulary in context and the meaning deepens with each encounter.

The bounded-plane brief (same date) establishes that every equation in the book is defined on a bounded domain, and the bounded domain is what makes the measurement a measurement rather than noise. The operator measures the field; the bounded plane scales the measurement; the combination is the truth. Teaching the operator alone gives the reader a definition. Teaching the operator on the bounded plane gives the reader an insight.

### The Penrose diagram replacement

This brief also proposes retiring the Penrose-diagram framing from the book. The original plan used Penrose diagrams as a "shortcut for reasoning about the equations." But the book is not reasoning *about* the equations — it is reasoning *from* them. The equations are scaffolding, not the headline; the prose does the explaining. A Penrose diagram is a compression device for reasoning about spacetime geometry (Penrose's own use); the grad/div/curl commentary is a compression device for reasoning from the equations to the body. The latter is the book's actual move. The Penrose diagram is a metaphor that imports someone else's project; the grad/div/curl commentary is a method that is native to this book's math.

The Penrose Parallel section in Ch00 (The Vocabulary) should be revised: the parallel is not "Penrose diagrams and operators are both compression devices" but "the operators, measured against the bounded plane, are how this book reasons from the equations." The compression is not a shortcut for reasoning about the math; it is the route from the math to the body. If the Penrose citation stays, it stays as a historical parallel (someone else compressed infinity to a finite boundary; we compress a field to a felt sense), not as the book's method.

## Deliverables

### 1. A cross-cutting commentary pass across all chapters with equations

For each chapter's Mathematical Justification section, add (or revise) the sentence that introduces the equation to:

- **Name the operator**: "The divergence of the stress tensor..." / "The gradient of the cost function..." / "The curl of the deformation field..."
- **Name the bounded plane**: "...measured against the floor datum..." / "...on the bounded continuum of the torso..." / "...relative to the steepled hand's shared reference plane..."
- **Give the physical meaning in one clause**: "...is zero where the tissue is in equilibrium" / "...points in the direction the frontier is steepening" / "...is the rotational load the cylinder is being wrung with"

The pattern: **[operator] of [field], measured against [bounded plane], is [physical meaning].** One sentence. The equation follows, anchored.

Examples of the pattern applied to existing chapters:

- **Ch02 (Torsion Engine)**: The curl of the twist field — the rotational load being applied to the torso, measured against the cylinder's longitudinal axis — produces an axial extension through the Poynting effect. $$E_{zz} = \frac{1}{2}R^2\alpha^2$$
- **Ch13 (Frontier Scale)**: The gradient of the cost function — the direction of greatest increase in the governor's threat level, measured against the floor datum — defines the zone boundaries. $$\Omega_{\text{green}} = \{\mathbf{x} \in \Omega : C(\mathbf{g}(\mathbf{x})) \le C_{\text{green}}\}$$
- **Ch18 (Two Faces of Amnesia)**: The divergence of the stress tensor — the internal force density, measured against the bounded continuum of the tissue — is undefined where the map has gone dark. $$g_{ij}(\mathbf{x}) \to \text{undefined} \quad \text{for } \mathbf{x} \in \Omega_{\text{unmapped}}$$
- **Ch20 (Clavicular Fuse)**: The divergence of the impact stress — where the force is being sourced inside the body, measured against the $z=0$ boundary — determines whether the load disperses (feline) or funnels (human). $$\nabla \cdot \boldsymbol{\sigma} = \mathbf{0}$$

### 2. Revise Ch00's Penrose Parallel section

Replace the "Penrose diagrams and operators are both compression devices" framing with "the operators, measured against the bounded plane, are how this book reasons from the equations to the body." Keep the Penrose citation as a historical parallel (conformal compression brought infinity to a finite boundary; the bounded plane brings a field to a felt sense), not as the book's method. The book's method is the operator + bounded plane, not the diagram.

### 3. Retire the Penrose-diagram aspiration from the book's documentation

Update `playbooks/diagram-infrastructure-playbook.md` and ADR-002/ADR-003 to note that the Penrose-diagram pipeline is retained for tensor-network diagrams (if any future chapter needs them) but the book's primary math-explanation method is the grad/div/curl commentary on the bounded plane, not diagrams. The book reasons from equations, not about them.

## Constraints

- **One sentence per equation.** The commentary is a naming, not an explanation. The explanation is in Ch00; the commentary is the recurrence. If the commentary needs more than one sentence, the equation needs an `:::explanation` block, not a longer commentary.
- **The perturbation process applies.** Small touches, in the book's voice, against the bounded plane of the benchmark. Do not rewrite the Mathematical Justification sections; add or revise the one naming sentence.
- **The single-voice gate applies.** The commentary is written in the book's voice (dry, second-person where possible, no "we"). The proof reader should check the commentary sentences for the editorial "we" and the seminar register.
- **Preserve all KaTeX.** The commentary is prose around the equations; the equations themselves are untouched (the math rendering pass already fixed them).
- **Self-contained.** Each chapter's commentary should name the operator in a way that is legible even if the reader skipped Ch00 (the naming is a mini-gloss), but should not re-teach the operator (that is Ch00's job).

## Approach

1. **Inventory the equations.** List every `$$...$$` display equation across all chapters, with the operator it uses (gradient, divergence, curl, or other) and the bounded plane it is measured against. Some equations are not operator equations (e.g., the Belt Friction Equation in Ch16, the yield criterion) — those get a different framing (the equation's own physical meaning, still on the bounded plane, but not an operator naming).
2. **Draft the naming sentence for each.** One sentence per equation, following the pattern: [operator] of [field], measured against [bounded plane], is [physical meaning].
3. **Perturb each chapter.** Add or revise the sentence, build, read the chapter against the benchmark, keep or revert. Small touches, one at a time.
4. **Revise Ch00's Penrose Parallel.** One section, rewritten to reframe the parallel.
5. **Run the proof reader.** Check the commentary sentences for voice, "we", jargon, and applecart upsets.
6. **Update the diagram playbook and ADRs.** Note the retirement of the Penrose-diagram aspiration as the primary math-explanation method.

## Verification

- Every display equation in the book has a naming sentence that names the operator and the bounded plane.
- The naming sentences are in the book's voice (proof reader clean).
- Ch00's Penrose Parallel is revised to reframe the parallel.
- The diagram playbook and ADRs note the retirement.
- `just build` succeeds; KaTeX renders; no jargon.
- The reader who reads only one chapter's math section can identify which operator is at work and what bounded plane it is measured against, without having read Ch00.

## Related

- `briefs/2026-06-28-brief-the-bounded-plane.md` — the bounded-plane principle (the reference the operators are measured against)
- `briefs/chapter-00-the-vocabulary.md` — the onboarding chapter that teaches the operators
- `playbooks/style-playbook.md` § "Explaining Math In-Chapter" — the `:::explanation` convention
- `playbooks/authoring-playbook.md` — the four representation modes
- `conceptual-lexicon.jsonl` — terms: floor-datum, governor, green-yellow-frontier, operational-heuristic, perturbation-process

# Brief: The Bounded Plane — Why Telemetry Needs a Datum

**Date:** 2026-06-28
**Status:** Open
**Source material:** the staved finger essay's open/closed chain argument; the user's framing: "telemetry without a bounded plane is unscaled, so it is treated as bad; telemetry with a bounded plane is scalable and can give accurate info"

## Objective

Write a chapter (or a substantial section) that explains the bounded-plane principle: why an unbounded kinetic chain produces unscaled, untrusted telemetry, and why a bounded plane (the floor datum, the steepled hand, any closed kinetic chain) gives the nervous system the reference it needs to scale, trust, and act on its sensory data. Give examples and explanations.

## Context

The staved finger essay (`briefs/2026-06-26-staved-finger-tensor-algebra.md`) is the existing worked example. It introduces the open kinetic chain (OKC) — the injured hand with unconstrained fingertips, floating in free space — and the closed kinetic chain (CKC) — the steepled hand, fingertips bound against each other. The key argument: in the OKC, the staved finger's afferent signal $\alpha_{\text{aff}}$ is an isolated absolute, measured against nothing. The CNS cannot determine whether the signal indicates real damage or benign displacement, because there is no reference plane to scale it against. Faced with unresolvable ambiguity, the CNS defaults to the conservative strategy: clamp, guard, flag Orange/Red. In the CKC, each fingertip shares a common reference plane, the signal becomes a differential quantity (compared moment-by-moment against its neighbours), and the CNS has a map it can trust. The guard stands down.

This is a specific instance of a general principle that the book states implicitly but never names explicitly:

- **Telemetry without a bounded plane is unscaled.** The signal is an absolute with no denominator. The CNS cannot determine its magnitude relative to anything, so it cannot determine whether it is safe or dangerous. Unscoped, unscaled telemetry is treated as bad — the conservative default, the clamp, the Orange/Red flag.
- **Telemetry with a bounded plane is scalable.** The signal is a differential, measured against the reference the bounded plane provides. The CNS can determine its magnitude, its direction, its trajectory. Scaled telemetry gives accurate info — the CNS can map, update, and release.

The bounded plane is the thing that converts an absolute into a differential. Without it, the CNS has noise; with it, the CNS has data.

## The principle, stated plainly

The body's nervous system does not measure forces in absolute terms. It measures them *relative to a reference*. The reference is the bounded plane — a fixed, external surface or constraint that the body can push against, measure itself against, and calibrate against. The floor ($z=0$) is the global bounded plane. The steepled hand is a local bounded plane. A closed kinetic chain is a bounded plane. Any holonomic constraint ($\Phi(\mathbf{x}) = 0$) that pins one part of the body against another, or against the ground, creates a bounded plane.

Without a bounded plane:
- The signal $\alpha_{\text{aff}}$ is an isolated absolute. The CNS has no denominator.
- The CNS cannot determine whether the displacement is safe or destructive.
- The conservative default fires: clamp, guard, flag the region as a threat.
- The telemetry is unscaled, so it is treated as bad.

With a bounded plane:
- The signal becomes a differential: $\Delta\,\text{tissue\_geometry}$ measured against the reference.
- The CNS can determine magnitude, direction, and trajectory.
- The CNS can map, update, and release.
- The telemetry is scaled, so it gives accurate info.

## Deliverables

- A chapter or section that states the bounded-plane principle explicitly, in the book's voice, with the staved finger as the primary example and at least two other examples from the book's existing material.
- Examples to include (not exhaustive — the author selects):
  - **The steepled hand** (staved finger essay): the OKC → CKC transition, the holonomic constraint, the shared reference plane, the differential telemetry. This is the existing, proven example.
  - **The floor datum** (Ch01, Ch15): $z=0$ as the global bounded plane. Lying on the floor gives the body a reference against which all internal stresses are measured. Without the floor, the standing body is an unbounded chain in a gravity field — the signal is unscaled, the CNS clamps. With the floor, the signal is scaled against the datum, the CNS can release.
  - **The plantar interface** (Ch12): the foot on the ground is a bounded plane. In cushioned shoes, the normal vector is scrambled, the bounded plane is lost, the telemetry is unscaled, the CNS clamps the hip. Barefoot on the floor, the bounded plane is restored, the telemetry is scaled, the CNS releases the hip.
  - **The Kua vault** (Ch11): the hip joint in an open chain (walking with an ungrounded foot) vs a closed chain (the foot pinned on the floor, the femoral head measured against the acetabular reference). The bounded plane is what makes the femoral head's position a differential rather than an absolute.
- The math: the holonomic constraint $\Phi(\mathbf{x}) = 0$, the constraint forces $\lambda$, the differential afferent signal. The staved finger essay has this; the chapter should restate it in the book's voice and generalise it.
- Plain-language explanation: "telemetry without a bounded plane is unscaled, so it is treated as bad; telemetry with a bounded plane is scalable and can give accurate info." The user's framing is the through-line; the chapter elaborates it.

## Placement (open — needs a call)

1. **A new section in the onboarding chapter (Ch00: The Vocabulary).** The bounded-plane principle is foundational — it explains *why* the floor matters before the reader meets the floor in Ch01. But Ch00 is already the math-vocabulary chapter; adding the bounded-plane principle would expand its scope from "what the operators mean" to "why the datum matters."
2. **A new section in Ch01 (The Euclidean Baseline).** Ch01 introduces $z=0$ as the floor datum; the bounded-plane principle is the *reason* the datum matters. The section would explain why the datum is not just a geometric convenience but the thing that makes telemetry scalable.
3. **A standalone chapter in Part I (after Ch01, before Ch02).** The principle is significant enough to warrant its own chapter, and it generalises beyond the floor (it applies to the steepled hand, the plantar interface, the Kua vault). A standalone chapter would let each subsequent chapter reference it by concept rather than re-explaining it.

**Recommendation: option 2** (a new section in Ch01). The principle is the *why* of Ch01's *what*, and folding it in keeps the foundational layer tight without a new chapter's renumbering cascade. The generalisation (it applies to the hand, the foot, the hip) can be stated briefly in Ch01 and referenced by the later chapters.

## Constraints

- Written in the book's voice from the start (single-voice gate, Rule 11).
- Preserve the staved finger essay's math; restate it in the book's voice, don't copy it.
- The user's framing ("telemetry without a bounded plane is unscaled...") is the through-line; elaborate it, don't replace it.
- Give examples and explanations — the user explicitly asked for this, and the principle is abstract enough that it needs the concrete examples to land.
- Self-contained (Don't#5): the chapter should explain the bounded-plane principle without requiring the reader to have read the staved finger essay.

## Verification

- The chapter states the principle explicitly: unscaled telemetry (no bounded plane) → treated as bad; scaled telemetry (bounded plane) → accurate info.
- At least two examples beyond the staved finger.
- The math is restated in the book's voice and generalised.
- The voice holds against the staved-finger benchmark.
- `just build` succeeds; KaTeX renders; no jargon.

## Related

- `briefs/2026-06-26-staved-finger-tensor-algebra.md` — the existing worked example (OKC → CKC, holonomic constraint, differential telemetry)
- `briefs/chapter-01-the-euclidean-baseline.md` — the floor datum ($z=0$)
- `briefs/chapter-12-the-plantar-interface.md` — the plantar bounded plane (shoes scramble it, barefoot restores it)
- `briefs/chapter-11-the-kua-vault.md` — the hip as a bounded/unbounded chain
- `conceptual-lexicon.jsonl` — terms: floor-datum, governor, green-yellow-frontier, operational-heuristic

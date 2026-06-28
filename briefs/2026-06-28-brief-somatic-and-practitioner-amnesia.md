# Brief: Two Faces of Amnesia — Somatic Amnesia and Practitioner-Amnesia

**Date:** 2026-06-28
**Status:** Open
**Source material:** `docs/the-pain-scale.md` §3 (SMA sidebar); `briefs/chapter-16-the-amnesia-paradox.md` (existing practitioner-amnesia chapter)
**Related tasks:** td-cd7bb7 (Chapter title pass), td-6b5002 (Math rendering pass)

## Objective

Write a chapter that braids two distinct amnesias the book currently keeps apart: **sensory-motor amnesia** (the patient loses the sensory-motor map — the Yellow zone undergoes a permanent blackout) and **practitioner-amnesia** (the advanced mover forgets the path that got them there, and deconstructs their finished state into rules for beginners). The pairing is a genuine gap: Ch16 covers the second; the first is not yet in the book.

## Context

Ch16 (The Amnesia Paradox) covers *practitioner-amnesia*: the practitioner who, once optimised, forgets the non-linear path that produced the change, and writes a manual of post-hoc symptoms ("place your weight on your heels, expand your midset") that beginners cannot run because the path-dependence integral $\Delta \mathbf{g} = \int_{\gamma} \boldsymbol{\omega} \neq 0$ is irreversible. The chapter's formal name for it is "the amnesia of progress."

The pain-scale source doc (`docs/the-pain-scale.md` §3) seeds the other face: **Sensory-Motor Amnesia (SMA)** — when the Yellow zone undergoes a permanent blackout. Chronic postural stress or unresolved trauma causes the motor cortex to delete the feedback loops for a muscle group. The system doesn't just lose range of motion; it loses the *concept* of that range. In the absence of data, the CNS treats the boundary as a hard Red wall, shrinking the individual's physical world.

These are mirror images, and the book does not yet say so:
- **Somatic amnesia** is the *patient's* loss — the territory disappears from the map. The body forgets it owns a region.
- **Practitioner-amnesia** is the *teacher's* loss — the journey disappears from memory. The practitioner forgets how they crossed the territory.

Both are amnesias of *the path*: one erases the path from the body, the other erases the path from the narrative. Both produce the same downstream error — a static, post-hoc rule (a "frozen" Red wall; a "hold your shoulders back" cue) presented as if it were the cause rather than the residue. The chapter's job is to name the symmetry and show that the Operational Heuristic dissolves both: the floor datum restores the map (somatic), and refuses the deconstruction (practitioner).

## Placement decision (open — needs your call)

Two candidates:

1. **New chapter in Part III, immediately after Ch16 (The Amnesia Paradox).** The most natural home: it extends Ch16's theme explicitly and lands in the security-layer part where protective amnesia belongs. Renumbers Ch17–21 → Ch18–22. **My recommendation** — but coordinate with the pain-scale chapter (same date): if both land, decide their relative order first (pain-scale opens Part III, amnesia pairing closes the Ch16 cluster).
2. **Extend Ch16 in place** — add an SMA section to the existing chapter and retitle to "The Amnesia Paradox (Two Faces of Forgetting)." No renumbering. Cost: Ch16 is already voice-passed and self-contained; folding in SMA roughly doubles its scope and blurs its single sharp thesis (the deconstruction fallacy) into a double thesis. A chapter that does two things reads as two half-chapters.

## Deliverables

1. **A new chapter draft** in `briefs/`, in the canonical arc:
   - **Familiar Hook:** open with the *sensation* of somatic amnesia — the experience of a body region that has dropped out of proprioception (the classic "I had no idea I was even holding that" moment, or the moment on the floor when a region you'd forgotten you owned suddenly re-appears). Then, in the second beat, the practitioner's amnesia — the moment the optimised mover realises they can no longer explain how they got there. Two sensations, one chapter.
   - **Mathematical Justification:** formalise the symmetry. Somatic amnesia as the collapse of the sensory-motor map over a region (the metric tensor field $g_{ij}$ loses definition — the Yellow frontier that fails to update becomes a permanent Red boundary, the coordinate map returns NaN, not zero). Practitioner-amnesia as the irreversibility of the path integral (Ch16's $\Delta \mathbf{g} = \int_{\gamma} \boldsymbol{\omega} \neq 0$ — the terminal state does not encode the path). The shared structure: in both, a *process* has been deleted and only its *output* remains; the output is then mistaken for a cause. Coordinate with `td-6b5002` for the notation.
   - **Hardware Smoke Test:** a conversational diagnostic for somatic amnesia (lying on the floor, attending to a region that has "gone quiet," and noticing whether it re-appears on the map when the floor datum removes the threat signal). The practitioner-amnesia side is observational, not a procedure — the test is to catch yourself teaching a symptom as a cause.
2. **Voice pass** against the staved-finger benchmark. Dry, not clinical; the SMA material risks reading like a neuroscience lecture — keep it in the body, second person, the somatic register.
3. **Cross-reference discipline:** the chapter may reference Ch16 (practitioner-amnesia) and the pain-scale chapter (the zone framework) by *concept*, but must remain self-contained — introduce what it needs inline (Don't#5). If it references Ch16, do so as "the amnesia of progress, which we met earlier," not "as discussed in Chapter 16."
4. **Update `content/book-structure.md` and `content/00-table-of-contents.md`** after the placement decision.

## Constraints

- **Do not duplicate Ch16.** This chapter *extends* the amnesia theme to its missing face (SMA) and names the symmetry. If it repeats the deconstruction-fallacy material, it has failed — reference, don't restate.
- **SMA is a real clinical concept (Thomas Hanna).** The chapter uses it but does not need to cite the literature — the book has no bibliography convention and the playbook bans self-congratulatory sourcing. State the phenomenon in the book's own language (the map going dark).
- **Sequence after `td-cd7bb7`** (title pass) so any Ch16 retitle and the new chapter's number settle together; **before `td-7fbb8c`** (registry hygiene) so the registry sync absorbs the new file once.
- **No new physics.** The math formalises the symmetry the prose already describes; do not introduce a new tensor or a new invariant.
- **Follow `playbooks/style-playbook.md`.**

## Verification

- `just build` succeeds; new chapter on the index and contents.
- A reader who has read Ch16 finds this chapter adds a face, not a repeat.
- The symmetry (patient loses the map / teacher loses the path) is stated explicitly, in plain language, by the end.
- Somatic amnesia is in the body's voice (second person, sensation-first), not a neuroscience abstract.
- Notation matches the rest of the book (coordinate with the math rendering pass).

## Notes

- The title "Two Faces of Amnesia" is a placeholder — pick a title that fits the book's noun-phrase convention (The X Paradox, The X Error, The X Vault). "The Forgotten Territory" is one direction; "The Deleted Map" is another. Decide in the title pass.
- If the pain-scale chapter lands first, the SMA material that it *seeds* lives here; the pain-scale chapter must not contain the SMA sidebar (see its brief). The two briefs are coupled — agree their boundary before drafting.
- This is the chapter that earns the book's repeated use of "amnesia" across Part III; right now the word appears in Ch16's title only and the theme is under-developed. This piece makes the part cohere.

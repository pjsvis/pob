# Brief: Two Faces of Amnesia — Somatic Amnesia and Practitioner-Amnesia

**Date:** 2026-06-28
**Status:** Open
**Source material:** `assets/the-pain-scale.md` §3 (SMA sidebar); `briefs/chapter-17-the-amnesia-paradox.md` (existing practitioner-amnesia chapter)
**Related tasks:** td-cd7bb7 (Chapter title pass), td-6b5002 (Math rendering pass)

## Objective

Write a chapter that braids two distinct amnesias the book currently keeps apart: **sensory-motor amnesia** (the patient's CNS drops the map of a region — the Yellow frontier stops updating and is read as a permanent Red wall) and **practitioner-amnesia** (the advanced mover forgets the path that got them there, and deconstructs their finished state into rules for beginners). The pairing is a genuine gap: Ch16 covers the second; the first is not yet in the book. Both are map problems, not territory problems — nothing is physically lost, and the green-yellow boundary work recovers both.

## Context

Ch16 (The Amnesia Paradox) covers *practitioner-amnesia*: the practitioner who, once optimised, forgets the non-linear path that produced the change, and writes a manual of post-hoc symptoms ("place your weight on your heels, expand your midset") that beginners cannot run because the path-dependence integral $\Delta \mathbf{g} = \int_{\gamma} \boldsymbol{\omega} \neq 0$ is irreversible. The chapter's formal name for it is "the amnesia of progress."

The pain-scale source doc (`assets/the-pain-scale.md` §3) seeds the other face: **Sensory-Motor Amnesia (SMA)** — when the Yellow zone stops updating. Chronic postural stress or unresolved trauma causes the motor cortex to drop the feedback loops for a muscle group. The system doesn't lose the territory; it loses the *map* of the territory. In the absence of a map, the CNS treats the boundary as a hard Red wall. This is not "use it or lose it" — nothing has been taken away, and the territory can always be rediscovered. The CNS simply no longer holds a chart of it, and an uncharted region reads, to the protective system, as a threat.

These are mirror images, and the book does not yet say so. Both are amnesias of *the map*, not the territory:
- **Somatic amnesia** is the *patient's* loss — the CNS drops the map of a region. The territory is intact and recoverable; the chart is gone, so the boundary reads as Red.
- **Practitioner-amnesia** is the *teacher's* loss — the practitioner drops the map of the *path*. The journey that produced their current state is gone from memory, so they teach the destination's symptoms as if they were the route.

The correction to the usual "use it or lose it" framing is the chapter's load-bearing insight: nothing is physically lost. The territory is always there to be rediscovered. What vanishes is the map — and a missing map is not a missing territory, it is a *governance* problem, which is exactly what the green-yellow boundary work addresses.

Both are amnesias of *the map*: one drops the map of a region (somatic), the other drops the map of the path (practitioner). Both produce the same downstream error — a static, post-hoc output (an unmapped region read as a permanent Red wall; a "hold your shoulders back" cue read as a cause) presented as if it were the cause rather than the residue. The chapter's job is to name the symmetry and show that the green-yellow boundary work dissolves both: the floor datum lets the CNS re-chart the missing region (somatic), and refuses the deconstruction of the path (practitioner). This is the same mechanism the Idle State chapter (Ch05) uses acutely on the frontier; here it is the chronic, un-updated case.

## Placement decision (open — needs your call)

Two candidates:

1. **New chapter in Part III, immediately after Ch16 (The Amnesia Paradox).** The most natural home: it extends Ch16's theme explicitly and lands in the security-layer part where protective amnesia belongs. Renumbers Ch17–21 → Ch18–22. **My recommendation** — but coordinate with the pain-scale chapter (same date): if both land, decide their relative order first (pain-scale opens Part III, amnesia pairing closes the Ch16 cluster).
2. **Extend Ch16 in place** — add an SMA section to the existing chapter and retitle to "The Amnesia Paradox (Two Faces of Forgetting)." No renumbering. Cost: Ch16 is already voice-passed and self-contained; folding in SMA roughly doubles its scope and blurs its single sharp thesis (the deconstruction fallacy) into a double thesis. A chapter that does two things reads as two half-chapters.

## Deliverables

1. **A new chapter draft** in `briefs/`, in the canonical arc:
   - **Familiar Hook:** open with the *sensation* of somatic amnesia — the experience of a body region that has dropped out of proprioception (the classic "I had no idea I was even holding that" moment, or the moment on the floor when a region you'd forgotten you owned suddenly re-appears). Then, in the second beat, the practitioner's amnesia — the moment the optimised mover realises they can no longer explain how they got there. Two sensations, one chapter.
   - **Mathematical Justification:** formalise the symmetry. Somatic amnesia as the collapse of the map over a region (the metric tensor field $g_{ij}$ loses definition there — the Yellow frontier that stops updating is read as a permanent Red boundary; the coordinate map returns *undefined*, not zero, and an undefined region is treated as a threat). Emphasise: the territory is unchanged; only the map is gone, so the fix is re-mapping, not re-building. Practitioner-amnesia as the irreversibility of the path integral (Ch16's $\Delta \mathbf{g} = \int_{\gamma} \boldsymbol{\omega} \neq 0$ — the terminal state does not encode the path). The shared structure: in both, a *process* has been deleted and only its *output* remains; the output is then mistaken for a cause. Coordinate with `td-6b5002` for the notation.
   - **Hardware Smoke Test:** a conversational diagnostic for somatic amnesia (lying on the floor, attending to a region that has "gone quiet," and noticing whether it re-appears on the map when the floor datum removes the threat signal). The practitioner-amnesia side is observational, not a procedure — the test is to catch yourself teaching a symptom as a cause.
2. **Voice pass** against the staved-finger benchmark. Dry, not clinical; the SMA material risks reading like a neuroscience lecture — keep it in the body, second person, the somatic register.
3. **Cross-reference discipline:** the chapter may reference Ch16 (practitioner-amnesia) and the pain-scale chapter (the zone framework) by *concept*, but must remain self-contained — introduce what it needs inline (Don't#5). If it references Ch16, do so as "the amnesia of progress, which we met earlier," not "as discussed in Chapter 16."
4. **Update `content/book-structure.md` and `content/00-table-of-contents.md`** after the placement decision.

## Constraints

- **Do not duplicate Ch16.** This chapter *extends* the amnesia theme to its missing face (SMA) and names the symmetry. If it repeats the deconstruction-fallacy material, it has failed — reference, don't restate.
- **SMA is a real clinical concept (Thomas Hanna).** The chapter uses it but does not need to cite the literature — the book has no bibliography convention and the playbook bans self-congratulatory sourcing. State the phenomenon in the book's own language (the map going dark, not the tissue disappearing).
- **Do not use the "use it or lose it" framing.** It is alarmist and wrong: the territory is never lost, only the map. The chapter's tone is that recovery is always possible — the CNS can always re-chart, which is exactly what the floor datum enables. Alarmism about permanent loss contradicts the book's whole thesis (the body is not broken; it is lost, and can be found).
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

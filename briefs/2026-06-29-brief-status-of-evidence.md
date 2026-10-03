# Brief: Status-of-Evidence Note per Clinical Chapter

**Date:** 2026-06-29
**Status:** Open
**Found during:** External eval (`debriefs/evals/openhuman-repo-eval.md`) — Recommendation 3

## Objective

Add a short, explicit "status of evidence" note to each clinical chapter (Part IV: Ch20–23, and the case-file-adjacent chapters in Part II where claims are made). State, per claim, whether it is (a) a logical consequence of the model with no direct evidence, (b) supported by anecdotal / n=1 evidence, or (c) supported by a formal study. This inoculates the book against the "alternative medicine makes untestable claims" critique while preserving the boldness of the framework.

## Context

The book is Popperian by commitment — Appendix A provides falsification protocols, and the Preface states the book describes rather than defends. But the falsification protocols are *proposed*, not *executed*. There are no study results, no pilot data, no case series. The main text sometimes presents clinical claims (carpal tunnel as a pressure-thresholding event, plantar fasciitis as line-tension at a clamped anchor) with a rhetorical certainty that outruns the evidence status. A careful reader — the kind the book wants — will notice.

The eval's recommendation aligns with the book's own principles. The applecart principle says every broken promise is a contract violation; a claim that sounds more certain than its evidence warrants is a quiet promise the book cannot keep. The note makes the promise explicit and honest.

The note is **not** a hedge or an apology. It is a calibration: the framework is bold, the evidence is where it is, and the reader is told both. The seminar register (defending a thesis) is the failure mode; so is the marketing register (overselling). The note holds the line between them.

## What the note is, and is not

The note is a **short label** at the foot of each clinical chapter, naming the evidence status of the chapter's central claim. One paragraph, three or four sentences. It does not relitigate the claim (the chapter did that), does not summarise the protocol (Appendix A does that), and does not apologise for the absence of studies. It states where the claim stands.

The note is not a literature review, a "more research is needed" boilerplate, or a disclaimer. Those are the seminar register wearing a lab coat.

## Deliverables

1. **A per-chapter evidence-status inventory.** For each clinical chapter (Ch20 clavicular fuse, Ch21 ankle fuse, Ch22 carpal tunnel, Ch23 plantar shard, and any Part II chapter making a clinical claim), state the central claim and its current evidence tier (a/b/c). Held in a scratchpad file for review before any touch.
2. **A note template.** One paragraph, in the book's voice, calibrated to the three tiers. Drafted once, applied per-chapter.
3. **The perturbation.** Per-chapter: add the note, build, read against the staved-finger benchmark, keep or revert. The perturbation protocol applies — note, investigate, brief (this), think, then touch.

## Constraints

- **One short paragraph per chapter.** Not a section, not a footnote essay. The note is a calibration, not a defence.
- **The single-voice gate applies.** The note is in the book's voice — dry, no "we", no hedging, no seminar register. The proof reader checks it.
- **Honest, not modest.** The book is not less bold for stating its evidence status; it is more trustworthy. Do not soften the claims; state their grounding.
- **The perturbation process applies.** Inventory and template first; chapter touches second, gated on approval.
- **Preserve all KaTeX and structure.** The note is appended prose; the chapter body is untouched.

## Verification

- Every clinical chapter carries an evidence-status note.
- The notes are consistent in voice and shape across chapters.
- A reader can identify, per chapter, whether the claim is model-logical, anecdotal, or study-supported.
- `just build` succeeds; the notes do not drift to the seminar register.

## Related

- `debriefs/evals/openhuman-repo-eval.md` — the eval that surfaced this (Recommendation 3)
- `briefs/appendix-a-falsification-protocols.md` — the protocols the notes reference
- `conceptual-lexicon.jsonl` — terms: applecart-principle, perturbation-process

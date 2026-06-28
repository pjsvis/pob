# Brief: The Pain Scale — Reframing Pain as Operational Telemetry

**Date:** 2026-06-28
**Status:** Open
**Source material:** `assets/the-pain-scale.md` (structural proposal, untracked — commit it as source)
**Related tasks:** td-cd7bb7 (Chapter title pass), td-7fbb8c (Registry hygiene), td-6b5002 (Math rendering pass)

## Objective

Assimilate the pain-scale structural proposal (`assets/the-pain-scale.md`) into the book as a chapter, reframing the clinical 1–10 pain scale as the four-zone operational telemetry (Green / Yellow / Orange / Red) that the rest of the book already uses implicitly.

## Context

The book's Green/Yellow/Red zone framework currently appears *without an explicit introduction* — Ch05 (The Idle State) uses it, Ch13/14/21 rely on it, but no chapter states it as the book's replacement for the pain scale. The source doc (`assets/the-pain-scale.md`) is that missing introduction: it attacks the 1–10 visual analogue scale as "dead data" (a volume slider on a binary threat signal, yielding no trajectory, no spatial boundary, no instruction for the governor) and replaces it with a horizontal map of systemic permission. It then seeds Sensory-Motor Amnesia (SMA) as a sidebar teaser for a later chapter — that teaser is spun out into its own brief (the amnesia pairing, same date).

The doc is chapter-shaped (three sections: the cul-de-sac of 1–10; the four-zone map; the SMA sidebar) but written in a brisker, more polemical register than the staved-finger benchmark. It needs a full voice pass against `playbooks/style-playbook.md` and a recasting into the canonical Familiar Hook → Mathematical Justification → Hardware Smoke Test arc.

## Placement decision (open — needs your call)

Three candidates, in my order of preference:

1. **New chapter in Part III (The Runtime Security Layer), before Ch13.** Part III is the CNS's protective system; the zone map *is* that system's language. Placing it as the Part III opener means every subsequent security-layer chapter (Ch13–17) can assume the framework is stated. **My recommendation.** Renumbering Ch13–21 → Ch14–22 cascades into TOC/INDEX/filenames/cross-refs — sequence this *after* `td-cd7bb7` (title pass) and `td-7fbb8c` (registry hygiene) so the registry sync happens once, after all structural churn settles.
2. **New chapter early in Part I, after Ch05 (The Idle State).** Ch05 already introduces Green/Yellow/Red informally; this chapter would formalise it. Argues for "state the framework early." Cost: renumbering Ch06–21, and the pain-scale attack lands better *after* the reader has met the security layer, not before.
3. **Fold into Ch05 as a new section.** No renumbering. Cost: Ch05 grows beyond its scope, and the pain-scale reframing deserves its own Familiar Hook (the 1–10 scale is a distinct cultural target, not a footnote to the idle state).

## Deliverables

1. **`assets/the-pain-scale.md` is committed** as source material (it lives in `assets/`, the build-ignored dump zone — see `playbooks/curation-playbook.md`).
2. **A new chapter draft** in `briefs/`, recast from the source doc into the canonical arc:
   - **Familiar Hook:** a sensation the reader recognises — being asked "rate your pain 1–10" and the uselessness of the answer. Open with the body, not the critique.
   - **Mathematical Justification:** the four-zone map as a state-space partition (Green = high-fidelity mapped ROM, Yellow = low-resolution frontier, Orange = active brake, Red = lockout). Formalise the zone transitions the book already uses informally (the $z=0$ floor datum, the Green-Yellow boundary $\partial\Omega_{\text{green}} \cap \partial\Omega_{\text{yellow}}$ from Ch05). A clean equation for the zone boundary as a function of the objective cost / threat-signal threshold would tie it to the existing math — coordinate with `td-6b5002` (math rendering pass) so the notation matches.
   - **Hardware Smoke Test:** a conversational diagnostic letting the reader *find* their own Yellow frontier (the book's existing "wander the grain" pattern, now framed as a pain-scale replacement).
3. **Voice pass** against the staved-finger benchmark. The source doc's register is too polemical ("This page has teeth," "zero operational utility," "navel-gazing") — soften to the dry, world-weary-but-curious benchmark tone. Scrub "software update," "fog of war," "parking brake," "burn out the engine" (hacker-coder / engineering metaphors per Don't#8). Keep "telemetry" only where it earns its place; prefer "data feed" / "signal."
4. **The SMA sidebar** is *removed* from this chapter and handed to the amnesia-pairing brief (it seeds a later chapter, per the source doc's own instruction). This chapter may end with a single-sentence forward reference to the amnesia chapter, but no more (self-containment, Don't#5).
5. **Update `content/book-structure.md` and `content/00-table-of-contents.md`** to include the new chapter (after the placement decision).

## Constraints

- **Sequence after structural tasks.** Adding a chapter renumbers everything downstream; do this after `td-cd7bb7` (title pass) so titles and numbering settle together, and before `td-7fbb8c` (registry hygiene) so the registry sync absorbs the new file in one pass.
- **No new content beyond the source doc's thesis.** The math should formalise what the doc already argues; do not invent new zones or new physics.
- **Preserve the existing zone vocabulary** (Green/Yellow/Orange/Red, "systemic permission," "the governor") — the rest of the book uses it; this chapter codifies it, does not rename it.
- **Follow `playbooks/style-playbook.md`** — Familiar Hook opens with a sensation, Smoke Test is conversational, no hacker-coder metaphors, self-contained.

## Verification

- `just build` succeeds; new chapter appears in `dist/contents.html` and on the auto-generated index (`dist/index.html`) under "The Book."
- The chapter reads standalone (a reader who hasn't read Ch05 still understands the zones).
- No raw 1–10 defence remains — the reframing is the chapter's spine.
- Voice matches the staved-finger benchmark (dry, not polemical).
- Downstream chapter cross-references (if any pointed at old Ch13–21 numbers) updated.

## Notes

- The source doc's "Non-Movement Mandate" (do not force an Orange/Red zone) is the book's existing thesis stated bluntly — fold it in, don't repeat it as a callout.
- "The Yellow zone isn't a wall; it's a fog of war" — replace "fog of war" with a continuum metaphor (the book's idiom is "the grain," "the boundary," "the frontier"). The Yellow zone is *low-resolution map*, not *enemy territory*.

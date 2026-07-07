# The Michelangelo Protocol

> *The marble is selected at Carrara. The block arrives. The figure is found by
> removing what isn't it — and by working around the crack no one saw until the
> chisel reached it.*

## What This Is

A named discipline for sculpting any artifact — chapter, essay, repo, codebase —
from raw material. The protocol is **two moves, in order**: a timing move and a
subtraction move, with a flaw-handling move for what they don't cover. It is
invoked throughout this project as "the sculpting heuristic"; this playbook
formalises it so the discipline is auditable rather than tacit.

It is a peer to the Edinburgh Protocol and the Watt Test: each names a stance,
each is operational, and each covers the others' blind spots.

## Move 1 — Carrara: Do Not Begin Until the Block Arrives

Michelangelo could not begin sculpting until the marble had arrived from
Carrara. So he did other work whilst he was waiting, rather than anticipating.

This is the timing discipline, and it is the move the project's briefs have been
reaching for without naming it:

- *"Do not let the investigation become an outline that predetermines the
  figure's shape."* (Pitt-Rivers brief)
- *"Do not let the brief become an outline that predetermines the chapter's
  shape."* (repo-as-thermostat brief)

Both are saying the Carrara thing. The figure is in **this** block, with its
specific grain and flaws, not in an abstract block you designed at your desk.
Pre-designing is not just wasted work; it is **anti-work**. The pre-design
fights the actual material when it arrives. You ship a plan that doesn't fit the
stone, then either force the stone to fit the plan (butchery) or throw the plan
away (waste).

The protocol's timing rule: **read the substrate before sculpting.** Do not
anticipate. Do not pre-outline. The substrate determines what figure is
possible, and that figure is not knowable until the substrate is in front of
you.

### What to do whilst waiting

The waiting is not dead time. While the marble is in transit, you cannot sculpt
— but you can do adjacent work that does not depend on the specific substrate.
Tidy the studio. Answer correspondence. Pursue the other commission.

In agentic terms: while you are waiting for the research to arrive, the dialog
trace to settle, the brief to mature, you do not fake-sculpt by producing
premature outlines. You do the entropy-reduction that does not require the
figure yet — tidy-first, registry-sync, the adjacent disciplines. The waiting
has honest work in it; the dishonest work is anticipating.

## Move 2 — Subtraction: The Figure Is Already in the Block

Once the block has arrived and been read, the operation is **removal**. Add
nothing. Find the figure by taking away what isn't it.

This is the move most often associated with Michelangelo, and it applies at
every scale:

- **The chapter.** The raw marble carries more than the finished piece needs.
  The figure is inside; the work is releasing it, not assembling it from parts.
- **The repo.** The harden-and-flense is this move applied to code and
  documentation: tighten encodings to the load they bear, remove the barnacle
  that lost its justification, delete the docs for the retired feature.
- **The argument.** A draft that explains too much has buried the figure. Cut
  the explanation that does not carry weight, and the claim stands clearer.

Subtraction is not minimalism for its own sake. It is the recognition that
**addition is the default failure mode of a continuously re-encoded artifact**,
and that subtraction is the discipline that resists it.

### The precondition for subtraction

Subtraction works **only from a settled, low-entropy state.** You can flense a
structure whose beams are visible. You cannot safely flense a high-entropy
structure, because you cannot tell the load-bearing material from the removable.
Sculpting a messy block produces rubble, not figures.

This is why the move pairs with tidy-first. Tidy-first reduces entropy to the
point where the figure becomes visible; subtraction then removes what isn't the
figure. Reversing the order — sculpting before tidying — is the failure mode.

## Move 3 — The Crack: Work Around the Flaw the Block Surprises You With

The marble is not uniform. Sometimes the chisel reaches a crack no one saw — a
vein, a flaw, a fault line running through what was meant to be the face. The
crack is not a reason to discard the block. It is a constraint that reshapes the
figure. You work around it, or you incorporate it, or you let it redirect the
composition. You do not pretend it isn't there, and you do not abandon the
block.

This is the move for what the first two don't cover: the **surprise that the
substrate itself injects**. The research turns up a counter-example. The primary
source doesn't hold up. The argument that was going to be the spine turns out to
have a fault line. The crack is information that arrived with the marble, not
noise you introduced. Working around it — adjusting the claim, redirecting the
chapter, finding the figure the actual block can support — is part of the
discipline, not a deviation from it.

The crack distinguishes this protocol from a naive subtract-and-finish: the
figure is not fully present in the block at the start. The block *and* its flaws
together determine what figure is possible, and some flaws are only discovered
mid-subtraction. The protocol requires staying responsive to the substrate as it
reveals itself.

## The Kill Criterion

Every load-bearing practice in this framework ships with a kill criterion. The
Michelangelo Protocol's is sharp:

**Stop sculpting the moment you can no longer tell figure from stone.**

That moment is the entropy threshold at which Move 2's precondition fails. The
protocol does not degrade gracefully past it — it inverts, becoming destructive
rather than clarifying. The right response to "I can't tell what to remove" is
not to remove anyway; it is to tidy until the distinction is visible again, then
resume.

The precondition and the kill criterion are the same state, viewed from opposite
ends: sculpt only when SNR is high enough to see the figure; stop the moment it
isn't.

## Provenance

The protocol is named for Michelangelo Buonarroti, after documented practice and
a widely-circulated motif. The two-load-bearing historical anchors:

1. **Carrara marble sourcing (well-attested).** Michelangelo's extended stays at
   the Carrara quarries, his careful block selection, and the transport delays
   that held up projects (notably the Julius II tomb) are documented art history,
   not quotation-tradition. This is the firm ground for Move 1.

2. **The subtraction motif (textually shakier).** The famous phrasing — *"I saw
   the angel in the marble and carved until I set him free"* — is widely
   attributed to Michelangelo but appears in print much later than his life, with
   varying Italian originals and a partly 19th-century English gloss. It carries
   the idea; it should not be cited as a verified quotation.

3. **The crack (Stone's novel, unverified).** A scene in Irving Stone's *The
   Agony and the Ecstasy* (1961) depicts the marble arriving with an unexpected
   and difficult crack that Michelangelo must work around. **This attribution is
   from a decades-old memory and has not been verified against the novel.** The
   Humean caveat applies: before any published piece leans on the crack scene,
   the novel should be checked directly. The crack as a *discipline* (respond to
   the substrate's surprises) is ours and stands regardless of whether Stone
   rendered the specific scene.

The protocol itself — the three moves, the precondition, the kill criterion — is
ours, not Michelangelo's or Stone's. The name carries the motif; the practice is
what the playbook specifies.

## The Honest Limit

The protocol operates on **structural** entropy, not semantic. It can tell you
to remove the barnacle (the dead playbook, the retired feature's docs, the
paragraph that explains what the next paragraph already showed). It cannot tell
you whether removing a paragraph made the argument clearer or merely shorter.

Subtraction is a permission, not a guarantee. A human still has to judge whether
the thing removed was noise or signal. Without that judgment, "the figure is
inside the block" degenerates into "delete whatever feels right" — which is the
opposite of discipline, and the failure mode the protocol exists to prevent.

This is why the protocol does not stand alone. Edinburgh provides the stance
(sceptic where the framing breaks); the checksum provides the safety net (refuse
corruption); Michelangelo provides the operation (read, subtract, work around
the crack). Each covers the others' blind spot.

## Relationship to the Sibling Disciplines

| Discipline | Stance | What it provides |
|------------|--------|------------------|
| Edinburgh Protocol | Hume's scepticism, Smith's systems, Watt's pragmatism | The *reading* that selects the policy |
| Watt Test | "Does this earn its place by delivering more work than it consumes?" | The *gate* that refuses the barnacle before the protocol is invoked |
| Michelangelo Protocol | "Wait for Carrara. Then subtract. Work around the crack." | The *operation* — three moves, in order |

The three compose: Edinburgh reads the entropy gradient; Watt refuses what
doesn't earn its place; Michelangelo releases the figure from what remains, in
three ordered moves. Out of order, each fails. In order, they form the sculpting
discipline that the l-inception-de-competence argument describes as the
transferable method for any cold-entry artifact.

**Note:** the Edinburgh Protocol and the Watt Test are defined in
`blog/l-inception-de-competence.md` and the project's dialog traces, not yet as
standalone playbooks in this directory. This is the first of the three to be
formalised as its own playbook; the others may follow, or may remain inline.
The cross-reference is to the *definitions*, not to filenames.

## When NOT to Apply

- **Before the block has arrived.** Move 1 forbids it. Do adjacent work, not
  anticipated sculpture.
- **High-entropy substrate.** Move 2's precondition is absent. Tidy first.
- **Greenfield work.** There is no block yet; the figure cannot be inside what
  doesn't exist. The protocol applies to re-shaping, not initial creation.
- **When you cannot state what the figure is.** If you can't say what you're
  releasing, you can't tell figure from stone, and the kill criterion has fired.
- **Semantic decisions.** The protocol is structural. Whether a removal made the
  piece *better* (not just shorter) is a judgment the protocol explicitly does
  not make.

## Related

- `blog/l-inception-de-competence.md` — the locus classicus; the harden-and-flense
  as Move 2 applied to the repo itself.
- `briefs/2026-06-29-brief-investigate-pitt-rivers.md` — first explicit invocation
  of "the figure is inside the block"; Move 1's discipline ("do not let the
  investigation predetermine the figure").
- `briefs/2026-07-07-brief-repo-as-thermostat.md` — sibling brief; the thermostat
  maintains the low-entropy state Move 2 requires.
- The Edinburgh Protocol and Watt Test — sibling disciplines (defined inline in
  `blog/l-inception-de-competence.md`).

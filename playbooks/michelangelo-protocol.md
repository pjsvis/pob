# The Michelangelo Protocol

> *I saw the angel in the marble and carved until I set him free.*
> — attributed to Michelangelo Buonarroti

## What This Is

A named discipline for the operation at the heart of sculpting any artifact —
chapter, essay, repo, codebase — from raw material. The protocol says: **the
figure is already in the block; the work is subtraction, not addition.** It is
invoked throughout this project as "the sculpting heuristic"; this playbook
formalises it so the discipline is auditable rather than tacit.

It is a peer to the Edinburgh Protocol and the Watt Test: each names a stance,
each is operational, and each covers the others' blind spots.

## The Core Move

When the substrate is low-entropy — when the structure has settled and the
load-bearing beams are visible — the safe and correct operation is **removal**.
Add nothing. Find the figure by taking away what isn't it.

This applies at every scale:

- **The chapter.** The raw marble carries more than the finished piece needs.
  The figure is inside; the work is releasing it, not assembling it from parts.
- **The repo.** The harden-and-flense is this protocol applied to code and
  documentation: tighten encodings to the load they bear, remove the barnacle
  that lost its justification, delete the docs for the retired feature.
- **The argument.** A draft that explains too much has buried the figure. The
  protocol says: cut the explanation that doesn't carry weight, and the claim
  stands clearer.

The protocol is not minimalism for its own sake. It is the recognition that
**addition is the default failure mode of a continuously re-encoded artifact**,
and that subtraction is the discipline that resists it.

## The Precondition

The protocol works **only from a settled, low-entropy state.**

You can flense a structure whose beams are visible. You cannot safely flense a
high-entropy structure, because you cannot tell the load-bearing material from
the removable. Sculpting a messy block produces rubble, not figures.

This is why the protocol pairs with tidy-first. Tidy-first reduces entropy to
the point where the figure becomes visible; the Michelangelo Protocol then
removes what isn't the figure. Reversing the order — sculpting before tidying —
is the failure mode. You remove what you think is stone and discover it was a
beam.

## The Kill Criterion

Every load-bearing practice in this framework ships with a kill criterion. The
Michelangelo Protocol's is sharp:

**Stop sculpting the moment you can no longer tell figure from stone.**

That moment is the entropy threshold at which the protocol's precondition fails.
The protocol does not degrade gracefully past it — it inverts, becoming
destructive rather than clarifying. The right response to "I can't tell what to
remove" is not to remove anyway; it is to tidy until the distinction is visible
again, then resume.

The precondition and the kill criterion are the same state, viewed from opposite
ends: sculpt only when SNR is high enough to see the figure; stop the moment it
isn't.

## Provenance

The protocol is named for Michelangelo Buonarroti, after the motif attributed to
him: the figure is already in the block, the sculptor releases it. The most
famous phrasing — *"I saw the angel in the marble and carved until I set him
free"* — is widely attributed but textually shaky; it appears in print much later
than Michelangelo's life, the Italian originals vary, and the received English
form is partly a 19th-century gloss.

Irving Stone deploys the sculpting-as-revelation motif throughout *The Agony and
the Ecstasy* (1961), and is the likely literary vector by which the motif
entered the popular imagination in its current form. **This attribution has not
been verified against the primary source.** Before any published piece leans on
it, the novel should be checked directly — the same Humean caveat that applies
to the Pitt-Rivers citation applies here. Do not cite Stone from a decades-old
memory.

The protocol itself — the discipline, the precondition, the kill criterion — is
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
corruption); Michelangelo provides the operation (subtract, don't add). Each
covers the others' blind spot.

## Relationship to the Sibling Disciplines

| Discipline | Stance | What it provides |
|------------|--------|------------------|
| Edinburgh Protocol | Hume's scepticism, Smith's systems, Watt's pragmatism | The *reading* that selects the policy |
| Watt Test | "Does this earn its place by delivering more work than it consumes?" | The *gate* that refuses the barnacle before the protocol is invoked |
| Michelangelo Protocol | "The figure is in the block; remove what isn't it" | The *operation* — subtract from a settled state |

The three compose: Edinburgh reads the entropy gradient; Watt refuses what
doesn't earn its place; Michelangelo releases the figure from what remains. Out
of order, each fails. In order, they form the sculpting discipline that the
l-inception-de-competence argument describes as the transferable method for any
cold-entry artifact.

**Note:** the Edinburgh Protocol and the Watt Test are defined in
`blog/l-inception-de-competence.md` and the project's dialog traces, not yet as
standalone playbooks in this directory. This is the first of the three to be
formalised as its own playbook; the others may follow, or may remain inline.
The cross-reference is to the *definitions*, not to filenames.

## When NOT to Apply

- **High-entropy substrate.** The precondition is absent. Tidy first.
- **Greenfield work.** There is no block yet; the figure cannot be inside what
  doesn't exist. The protocol applies to re-shaping, not initial creation.
- **When you cannot state what the figure is.** If you can't say what you're
  releasing, you can't tell figure from stone, and the kill criterion has fired.
- **Semantic decisions.** The protocol is structural. Whether a removal made the
  piece *better* (not just shorter) is a judgment the protocol explicitly does
  not make.

## Related

- `blog/l-inception-de-competence.md` — the locus classicus; the harden-and-flense
  as the protocol applied to the repo itself.
- `briefs/2026-06-29-brief-investigate-pitt-rivers.md` — first explicit invocation
  of "the figure is inside the block."
- `briefs/2026-07-07-brief-repo-as-thermostat.md` — sibling brief; the thermostat
  maintains the low-entropy state the protocol requires.
- The Edinburgh Protocol and Watt Test — sibling disciplines.

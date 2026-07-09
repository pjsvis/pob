# How to read this stuff — the coherence audit and the Shannon boundary

> **Status:** assess-stage conceptual notes for a "who are we" / reader-protocol piece (Medium/Substack front door). Forming, not ready to draft. Could expand. Filed 2026-07-09.

## The spine

Shannon drew one boundary: between the reliable-channel regime and everything else. Semantics — what the bits *mean*, whether they're *true* — is in the everything-else; the theorem excludes it from the engineering problem. The LLM, read as a Shannon channel (the context window is the channel; the input is the signal), inherits that boundary exactly. So the coherence audit works below the line and stops at it: an LLM can check whether a piece has reasoned consistently and cited honestly, and cannot check whether a novel frame is *true*, because truth is above the line. That's not a bug in the instrument; it's the shape of the channel.

## The coherence/correspondence asymmetry

- **Correspondence** (does the claim match the world?) is the world's to confirm. For novel work — a new frame, a new synthesis — correspondence checking is impossible by definition: the claim isn't in the training data, that's what makes it new.
- **Coherence** (is the text internally consistent — real citations used accurately, quantities used correctly, no unsupported leaps, no register shifts?) is the text's to satisfy. An LLM can do this pass, because coherence is a property of the text, not of the world.

This asymmetry is Shannon's semantic exclusion recognised in practice. The LLM gives us a new epistemic instrument: the coherence auditor. Pre-LLM, coherence-checking needed a careful human reader and was scarce. Post-LLM, any reader with an agent can run it at near-zero cost. The minimum bar for published writing rises — and the bar is internal consistency, which is exactly what yap fails.

## The two-step reader protocol

1. **Triage — is it worth reading?** The agent does the coherence + citation-existence pass and reports. Internally consistent? Citations real and roughly accurate? Register stable? If yes, the piece earns the reader's attention. If no, skip — it failed the minimum bar.
2. **Sustained critical reading.** The agent reads alongside, flagging leaps and unsupported claims in real time. But the judgement stays with the human. The agent flags; the human decides.

## The Popper parallel — resonance, not identity

Falsifiability and auditability share a structural property: specificity that permits checking. A claim that could in principle fail a test (Popper); a text that could in principle show a seam under attention (coherence). Both are anti-yap instruments. But the direction of fit differs:
- Falsifiability is world-facing — could evidence count against the claim?
- Auditability is text-facing — could an attentive reader find an inconsistency?

Use as illustration, not load-bearing formalism. Do not weld "Popper + Shannon + our method" into one framework — that's the entropy-inflation flourish the voice rejects.

## The honesty constraints (the piece must hold these or it yaps)

- **Coherence is necessary, not sufficient.** A piece can be perfectly coherent and wrong. The audit passing doesn't establish truth — it establishes that the piece is worth engaging with. Say this plainly, or the piece overclaims what the check delivers.
- **The agent is itself a noisy channel.** A coherence pass has false negatives and false positives. It's a signal, not a verdict — same discipline as the bibliography. Every channel is noisy, including the checking one.
- **The human still reads.** The risk is that coherence-checking becomes a substitute for engagement — "the agent said it's coherent, so I'll believe it" — building a new authority to be credulous toward. Step (2) is where the human does the work. The agent is an aid to critical reading, not a replacement for it.

## Confusions to hold — and not let harden

- **There is no formal "upper Shannon threshold."** Shannon has one threshold: channel capacity. Semantics isn't a zone above a second threshold; it's the region Shannon excluded from the theorem's scope. The three-zone picture (noise / Shannon / semantic) is a heuristic teaching diagram, not theorem. If the piece presents it as Shannon's result, a reader who knows the theorem catches the overclaim, and credibility collapses on the very point being made. State it as: "Shannon draws one boundary — between the reliable-channel regime and everything else; semantics is in the everything-else."
- **The entropy-direction-through-time is a repo instrument, not a single-text one.** The negative-entropy-gradient argument (l-inception) is about a repository's state across commits — does the centre get tidier or driftier? It is not a property of a single published text. Applying "entropy direction" to one essay is a category shift. Keep them on their own substrates: the repo is monitored through time; the text is audited at a point.

## The discipline (the ergodicity lesson, restated)

This is the exact territory where ergodicity died — borrowing a precise term and letting it drift. "Shannon zone" must mean what Shannon proved, no more. If we find ourselves writing "the Shannon zone of the text" as if it were a measured quantity, we've repeated the error. The word "Shannon" earns its place only when it points at the theorem. Everywhere else, it's decoration.

## Why this is the front-door piece

The project's whole discipline — narrativised few-investigable references, the voice gate, the seam test, the floor test, Hume's Razor — is already calibrated to pass a coherence audit. That wasn't planned for the LLM age; it emerged from the anti-yap discipline. But the consequence is that the work is built for the moment it's in: in a flood of generated volume, the distinguishing signal is coherence-plus-investigability, and the project produces exactly that. The "how to read this" piece is where that becomes explicit — our identity stated as a reader protocol, not as a boast.

## The hook: "Do your own research" (reclaimed)

The COVID-era phrase "do your own research" became toxic because it meant *decide your own facts* — correspondence-checking performed by people with no instrument for correspondence, an authority-claim disguised as epistemic humility. Rightly mocked.

The reclamation takes the phrase at its word and splits it along the Shannon boundary:
- **The LLM does the research** — the coherence audit, citation-existence, the "is this worth reading" triage. Below the Shannon line: syntactic, structural, delegable. The agent is the research assistant, and there is now an instrument that can do this at scale.
- **You do the judgement** — the correspondence check, the "is the novel frame true," the sustained critical reading. Above the line: semantic, world-facing, cannot be delegated. The agent flags; you decide.

The reclaimed phrase is the two-step reader protocol wearing a memorable handle. It's a stronger "who are we" stance than "how to read this stuff": outward (a protocol for anything, with our work as the example that passes), and it takes a cultural wound and offers a repair. Probable title: *Do your own research*. The parenthetical "(properly, this time)" may not survive the voice pass — slightly smug; a drafting decision.

## The refute mode — a stronger coherence probe, same boundary

The audit asks "is this consistent?" The refute mode asks the LLM to construct the counter: steelman the opposite, find the weakest link, pressure the text from the adversary's side. It's a stronger coherence probe — a piece that survives refutation has a stronger coherence claim than one that passes a neutral audit, because the adversary surfaces claims the author would prefer unexamined.

But it is still coherence, still below the Shannon line:
- The LLM's refutation works with the text, not the world — it cannot establish the counter-claim's *truth*, only its plausibility against the text's internal structure.
- A failure to refute is not a verdict for the piece — the LLM may lack the world-knowledge to find the real weakness, or may simply be bad at adversarial framing.

Audit and refute are the two directions of coherence pressure. Both stop at the Shannon line. Both are valid, neither is conclusive. The honest framing: these are tools for deciding whether a piece is worth your sustained critical reading — which is the judgement you cannot delegate.

## The quiet through-line (do not force)

The coherence audit is a *context* operation (non-local attention over the full text — the tension network); citation-veracity is a *retrieval* operation (database lookups). The reader protocol itself illustrates the context-vs-database distinction from the shelved ergodicity/LLM-substrate idea, without needing to name ergodicity. Don't force that connection into the piece — it'll show itself if it belongs.

## Process

Still assess stage. When ready, it's a brief for a standalone essay (self-contained-essay playbook, light on references — it's about practice, not evidence). The honesty constraints above are the gate. The load-carrying research is the next bounded chunk; this is the front-door piece that sits alongside it, not ahead of it.

## Related

- `blog/l-inception-de-competence.md` — the context-window-as-channel framing this extends
- `blog/the-yap-and-the-voice.md` — the yap/voice distinction; coherence is voice, not yap
- `assets/ergodicity.md` — the shelved doc; the discipline lesson (don't borrow precise terms loosely)
- `playbooks/bibliography-playbook.md` — the narrativised-investigable discipline; the same principle applied to sources
- `decisions/008-shannon-pitt-rivers-diptych.md` — the Shannon lineage the piece inherits

---
title: The Settling
dek: The book is good. It is not settled yet. Settling is not writing — it is the perturbation process applied to the whole artefact: words, typography, layout, content, rhythm. A settled book looks like it sprang into existence. It didn't. It started as an idea with a through-line, and the through-line became clearer the more it was articulated.
date: 2026-06-28
---

# The Settling

The book is good. We can feel it. But it is not settled yet, and settling is a different activity from writing.

Writing is adding. Settling is arranging. Writing is the first draft, the voice pass, the structural repair. Settling is the perturbation process — the small, local touches at the boundary between "done" and "done properly," each one moving a sliver of almost-right into right. The book has passed through the writing phase. It is now in the settling phase, and the settling has its own discipline.

## What settling is

Settling is not about the words alone. It is about the whole artefact: the words, the typography, the layout, the content's order, the chapter boundaries, the rhythm of the sections, the visual weight of the equations, the flow of the diagrams. The book is a room, and settling is the act of moving the furniture until the room feels right. You cannot rush it. You cannot do it all at once. You do it by perturbation — move one thing, step back, see whether the room feels more settled, keep or revert.

Take a good book — one of Penrose's. It looks settled. The typography holds. The layout breathes. The voice is consistent from the first page to the last. The reader cannot see the articulation that produced it. They only see the finished thing, and the finished thing looks like it sprang into existence as a settled piece of perfection.

It didn't. Nor did it start as a right mess. It started as an idea with a through-line, and the through-line became clearer the more it was articulated. The settling is the articulation — the slow, incremental process of touching the manuscript until the through-line is so clear that the reader cannot see the work that produced it. They only see the line.

## The perturbation process

We have a name for the settling: the perturbation process. It is the manuscript's own green-yellow frontier. The book describes a method for the body — lie on the floor, attend the boundary, let the system re-chart — and the same method applies to the manuscript. The manuscript has a frontier: the boundary between "done" and "done properly," between "good" and "settled." The perturbation is the small touch at that boundary. Not a rewrite — a refinement. Not a new voice — the same voice, adjusted. The whole converges faster through small perturbations than through large rewrites, because the large rewrite is a palimpsest (a new voice laid over the old) and the small perturbation is a refinement (the same voice, settled further).

The perturbation has a protocol. You see something that doesn't look or sound right. You note it for investigation — you do not touch. You investigate the whole field, not just the triggering instance. You write a brief. You have a good think about how to proceed. Then you perturb: one touch, one observation, against the bounded plane of the benchmark. Touch, commit, rest. The sliver maps in the rest, not in the touch.

We learned this protocol the hard way. The first perturbation — a blanket word swap across twenty-four chapters — was done before the investigation. It touched before it measured. It was reverted. The protocol is the formalisation of the lesson: note, investigate, brief, think, perturb. The gate between noting and touching is the thing that prevents premature action.

## The bounded plane

The perturbation must happen in a controlled environment, not a noisy one. The controlled environment is the bounded plane: the staved-finger benchmark, the style playbook, the conceptual-lexicon. These are the references against which the touch is measured. Without them, the touch is unscaled — you cannot tell whether the sentence is better or just different. With them, the touch is a differential — you can measure the sentence against the reference and know whether the whole feels more like itself.

This is the book's own principle, applied to the book. The book says: the body needs a bounded plane to scale its telemetry. Without the floor, the signal is unscaled, the CNS clamps. With the floor, the signal is a differential, the CNS can map. The manuscript needs a bounded plane to scale its touches. Without the benchmark, the touch is unscaled — a guess. With the benchmark, the touch is a measurement. The noisy environment is the unbounded chain; the controlled environment is the floor datum. The recursion is exact, and it is exact because the principle was never specific to bodies. It is a principle of any system that needs a reference to scale its internal state, and the manuscript is such a system.

## The moving substrate

The perturbation process exists inside a larger context: the substrate is changing underneath us. The models are becoming smarter and more capable. Things we used to have to do — manual voice passes, manual proof-reading, manual registry sync — are not required as much any more. Things we could not do — check the rendered output for doubled math, scan all twenty-four chapters for the editorial "we" in thirty seconds — are now possible.

The response is a minimal AI tech stack, built incrementally and stripped back at every fresh start. The stack we built this session — Bun, marked, KaTeX, WeasyPrint, the custom block processor, the diagram pipeline, the proof reader, the conceptual-lexicon — is not a stack we designed upfront. It is a stack that accreted in response to actual needs. Each tool was added when the work demanded it, and each tool carries the receipt of the problem it solved.

The principle: strip it back at every fresh start, build incrementally, discard what is no longer required. The stack should get simpler over time as the substrate thickens, not more complex. The tools that were scaffolding for a weaker substrate become barnacles for a stronger one. The fresh-start strip-back is the mechanism that catches them.

## Is anyone else doing this?

The honest answer is: partially, and from a different direction.

There is a growing body of work on agent self-improvement and meta-process. The APEX framework extracts behavioural principles from production traces and evolves them alongside the agent's harness. The "Agents All the Way Down" methodology names a five-phase practice for building custom agents, including an agent-tests-agent discipline that is a cousin of our proof reader. The Interpretable Context Methodology uses folder structure and plain markdown files as agent architecture — close to our playbooks and AGENTS.md, but for production pipelines rather than creative work. The "Designing Loops, Not Prompts" field guide identifies the axis that matters — who holds the state machine — and the compounding test: a loop that becomes the substrate the next loop reads from, rather than one that merely accumulates.

What we have not found is anyone reporting the specific pattern we lived through: start with creative work (writing a book), discover operating principles through the work, formalise them incrementally, and arrive at a conceptual-lexicon that carries the conventions across session boundaries. The existing work starts from engineering and designs the principles. We started from writing and discovered them. The existing work optimises for production agent performance. We optimise for voice consistency and reader trust. The existing work treats principles as machine-readable configurations. We treat them as conventions carried in git, read by humans and agents alike, auditable through diffs.

The difference matters. The engineering-first approach produces principles that are correct but may not be lived — they are designed for the agent, not discovered through the work. The practice-first approach produces principles that are earned — each one carries the receipt of the problem that forced it, and the receipt is the test of whether the principle still holds when the ground moves. The engineering-first approach is the greenfield reflex. The practice-first approach is incremental formalisation. Both produce principles. Only one produces principles that have been stress-tested by the work they govern.

## The recommendations

For anyone working with AI agents on a long creative project:

1. **Let the work teach you the principles.** Do not design the operating practices upfront. Start with the work, and when a problem recurs, formalise the response. The second occurrence is the threshold — not the first (too early) and not the fifth (too late).

2. **Carry the principles in git, not in memory.** Memory drifts. The model paraphrases. The human half-remembers. Git does not drift. The conceptual-lexicon is the anti-drift mechanism: conventions stated verbatim, read not remembered, auditable through diffs.

3. **Settle by perturbation, not by rewrite.** The book is good. It is not settled. The settling is the small touch at the frontier, measured against the benchmark, committed and rested upon. The sliver maps in the rest, not in the touch. The book needs to rest the way the body needs to rest.

4. **Keep the stack minimal and strip it back at every fresh start.** The substrate is getting smarter. The tools that were necessary at week one may be barnacles at week four. The fresh-start strip-back is the anti-barnacle mechanism for the stack.

5. **The book is a context the reader enters somatically.** Every perturbation is a potential applecart upset. The voice gate, the tidy-first pass, and the proof reader are trust-preservation mechanisms for the context. The build passing is not enough. A human reading the rendered output is the ground truth.

The book is coming along nicely. It is not settled yet. The settling is the work ahead, and the settling is the perturbation, and the perturbation is the method the book describes applied to the book itself. The through-line is becoming clearer the more it is articulated. It started as an idea. It is becoming a room that a reader can enter and feel they belong.

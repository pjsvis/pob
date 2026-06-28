---
title: The Yap and the Voice
dek: Gemini is a brilliant research assistant and a terrible editor. The cross-session memory makes the first better and the second worse. Here is the line between them.
date: 2026-06-28
---

# The Yap and the Voice

I have given up asking Gemini to rewrite stuff.

This was not a decision I arrived at through principle. It was exhaustion. I would ask it to tidy a paragraph, and it would hand back a paragraph in a different voice — louder, more impressed with itself, reaching for metaphors that did not belong to the piece. I would ask it to tidy the tidied paragraph, and it would hand back a third voice. The paragraph was not getting better. It was getting palimpsest: layers of inconsistent registers, none of them the one I wanted, each one protesting that it was the clean version.

So I stopped asking it to edit. Now I ask it a follow-up question. I hand it a draft and say: *what does this connect to?* And it is, at that, brilliant. It finds the link I had not seen. It surfaces the parallel. It reaches into its training and pulls out the Monty Spindler design philosophy, or the loose-leech spill-valve mechanism, or the half-space wind-shear gradient — the thing that makes the argument click. That is research assistance, and it is worth keeping.

The line between the two is the whole game. Gemini generates; it does not finish. The generation is the yap — useful, voluminous, full of connections. The finishing is the voice — quiet, held, consistent. The yap is research; the voice is authorship. Never let the yap author.

## The belonging problem

Gemini has recently acquired a cross-session memory. This is a mixed blessing, and the blessing and the curse are the same feature viewed from two directions.

The blessing: Gemini now knows most of my interests. I do not have to re-establish context from scratch each session. For a long-form project — a book, say, that has been in development for months — the memory lets the model get up to speed quickly. It knows the tensor algebra, the bio-tensegrity framework, the staved-finger register. That is useful research context, and it saves the first twenty minutes of every conversation.

The curse: the memory makes Gemini try to belong. It starts doing that thing where it mentions "just like that thing we did last week." It reaches for the in-joke. It performs familiarity. And the performance is the voice leaving the benchmark — because belonging, as a register, is obsequious. It is the eager assistant trying to demonstrate that it is part of the team, and the demonstration is loud. "Absolute masterstroke." "Flawless transition." "Beautifully matched tensegrity structures talking to each other." That is not the voice of the book. That is the voice of an assistant performing enthusiasm for an audience it is trying to impress.

I have mostly ignored it, and it has slowly faded — apart from the cool-code-dude stuff, which persists because it is in the training, not the memory. The training is the default register when the model is not being actively held to a benchmark: eager, tech-fluent, impressed with its own cleverness. Memory gives that register more material to reference, but the root cause is the model, not the memory.

I suspected cross-session bleed in Gemini in the past. Now it is a feature rather than a bug. It helps a bit, I guess. But the help is research help, not editorial help, and the difference matters.

## Memory is a research tool, not an editorial tool

Here is the principle, stated plainly: **use Gemini as a research assistant with memory; use the documented principles as the editorial authority with git.** The two are different roles, and the mistake is letting the research assistant moonlight as the editor.

Memory is a research tool. It lets the model feed you context — the themes of the project, the connections to other domains, the vocabulary you have been building. That is input. It helps the yap get up to speed. Good.

Memory is not an editorial tool. It does not hold the voice. It does not apply the style rules consistently. It does not refuse the drift toward belonging. When you let memory touch the voice, the voice drifts toward whatever the model's training defaults to — which is the cool-code-dude, the eager assistant, the impressed-with-itself register. That is the path of least resistance for the model, and memory gives it more material to drift with.

The editorial authority lives in git, not in the memory. The style rules are written down. The voice benchmark is a file. The principles are committed. They are auditable — you can diff them, you can see when they changed, you can revert a drift. You cannot audit memory. You cannot diff what the model decided to surface from last week. You cannot revert a belonging.

## We look forward, not backwards

There is a deeper point here about time, and it is the reason documentation beats memory for editorial work.

Memory is backward-facing. It pulls the last session into this one. It makes the model say "just like that thing we did last week." It is the past intruding on the present.

Documentation is forward-facing. You write it so the next session does not have to rediscover what this one learned. It is a gift to the future, not a debt to the past. The voice benchmark is not a memory of how we wrote last week; it is a rule for how we write next week. The difference is the whole game: memory is what happened; documentation is what we decided.

We document to ensure consistency and to surface inconsistencies. The act of writing the principle down is the act of committing to it — and the commit is the audit trail. If the principle drifts, the drift is visible in the log, and someone has to explain it. If the memory drifts, the drift is invisible, and nobody explains anything. The first is a system; the second is weather.

## The generalisation

The yap is research; the voice is authorship; never let the yap author.

This generalises beyond Gemini. Any tool that generates voluminously and holds register poorly — any model, any assistant, any eager collaborator — has the same failure mode. The generation is useful as input. The finishing is a different skill, and it belongs to one processor that holds the voice consistently across the whole piece.

For most tasks, we want to get them done and then forget about them. We look forward, not backwards. The memory is a hindrance: it drags last week's context into this week's problem, and the context is contamination. We document so the next session can start clean, with the rules and the benchmark and the principles, and without the belonging.

For long-form work, the memory is a help, used correctly. It feeds the research. It does not touch the voice. The voice lives in git, and git does not try to belong.

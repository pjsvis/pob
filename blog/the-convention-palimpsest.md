---
title: The Convention Palimpsest
dek: Long tasks fill the context. The context clears. What persists is memory, and memory drifts. After three sessions, the convention you agreed to is a palimpsest of three paraphrases, none of them the original. Here is the causal chain, and the fix.
date: 2026-06-28
---

# The Convention Palimpsest

We have been writing a book with an AI agent in the loop, and we have been keeping notes on how the process works — not the book's content, but the *practice* of producing the book with a model in the room. This is one of those notes. It is about a specific failure mode, the chain that produces it, and the structure that fixes it. The failure mode is called the convention palimpsest, and it is not fixed by trying harder. It is fixed by replacing memory with something that does not drift.

## Long tasks

A long-running task — "rewrite all 24 chapters," "port the five scripts," "do the voice pass" — fills the agent's context with the task's internal logic. The chapter you're editing, the equations you're checking, the jargon you're scrubbing, the cross-references you're updating: all of it is in the context window, and the context window is the agent's whole world while the task runs. This is fine while the task is running. The problem is what happens when the task ends.

The task ends. The context is cleared. The next session starts with an empty context, and the task's lessons — the things you discovered about how to do the work, the conventions you agreed to mid-task, the terms you coined — are gone. Not gone from the repo (the commits are there), but gone from the agent's working memory. The next session does not inherit the task's context. It inherits whatever persists across the boundary, and what persists across the boundary is memory.

## Memory

Memory is what's left when the context is cleared. It is the model's cross-session memory, if it has one. It is the human's recollection of what was decided. It is the commit messages, if anyone reads them. It is the debrief, if anyone consults it. Memory is the residue of the task, and the residue is never the original — it is a paraphrase, a summary, a half-remembered intention.

The model's memory is the most dangerous kind, because it feels reliable. The model says "just like that thing we did last week," and the familiarity is convincing, and the conviction is the drift. The model is not remembering the convention; it is remembering its last paraphrase of the convention, which is already one step from the original. The next session's paraphrase is two steps. The session after that is three. After three sessions, the convention is a palimpsest: three paraphrases ghosting through each other, none of them the one that was originally agreed.

The human's memory is no better. The human half-remembers the convention, fills the gaps with what seems reasonable, and the reasonable guess is not the original convention. The human and the model, between them, produce a collaborative palimpsest — each one paraphrasing the other's paraphrase, each paraphrase a little further from the original, the drift invisible because each step is small and individually reasonable.

## The palimpsest problem

A palimpsest is a manuscript that has been written over — the original scraped away, a new text written on top, the old ghosting through. The convention palimpsest is the same thing applied to practices: the original convention ("hold two ideas without losing the plot — package the observation and return to the task") is paraphrased across sessions until it becomes something adjacent but different ("try to remember to come back to the main task if you get distracted"). The first is a discipline with a mechanism; the second is a wish with a hope. The drift is not detected, because nobody compares the current paraphrase to the original — the original is in a context that no longer exists, and the paraphrase is in the context that does.

The symptoms are quiet. A term that used to mean one thing now means something slightly different. A practice that used to have a mechanism now has a vibe. A principle that used to be testable ("does the justification still hold?") is now an aspiration ("we should try to remember to do that"). The convention has been scraped and rewritten enough times that the original is ghosting through the paraphrase, and nobody can see the ghost because nobody has the original to compare it to.

The palimpsest is not caused by carelessness. It is caused by relying on memory for something that should be a convention. Memory drifts; conventions, if they are stated and read rather than remembered, do not. The fix is not to remember harder. The fix is to stop remembering and start reading.

## Stop, rethink

The first move is to stop. Not mid-task — the stop has to happen at a boundary, a stopping point, a retrospective. If you rethink mid-task, the rethink is a reactive pivot, and the pivot contaminates the task the same way the second theme contaminates the first. The discipline is: finish, then question. Finish the chapter, then question the convention. Finish the session, then question the direction. The stop is the gate; the rethink is the work that happens after the gate.

At the stop, the question is: what carries conventions across sessions without drifting? The answer is not memory (drifts), not the commit messages (too granular), not the debrief (too narrative). The answer is a structured reference — a place where the convention is stated once, verbatim, and read by every session that needs it. Not remembered. Read.

## The conceptual-lexicon

We call it the conceptual-lexicon. It is a JSONL file. Each entry has an id, a term, a type, a definition, an added date, and a status. The definition is the convention, stated once. The status is "active" or "retired." The file is in git, which means the history is auditable — every change to every definition is a diff, and the drift is visible in the log the same way a chapter palimpsest is audible when you read the paragraphs in sequence.

The CL is not memory. Memory is what happened; the CL is what was decided. Memory is the model's context window, cleared at session end; the CL is a file, read at session start. Memory drifts because it is reconstructed; the CL does not drift because it is not reconstructed — it is read. The same definition the last session wrote is the definition this session reads. Verbatim. No paraphrase. No drift.

The CL is not a dictionary, though it does contain definitions. It is a *convention carrier* — a device that transports agreed practices across the session boundary without relying on either the model's memory or the human's. The conventions it carries are the project's operational heuristics: the principles (the voice invariant, the single-voice gate, the tidy-first rule), the practices (hold two ideas, no long-running tasks, proactive not reactive, top-sight), and the terms (governor, frontier, palimpsest, barnacle, yap). Each one is a convention that would drift if it were remembered and does not drift because it is read.

## What it fixes, and what it does not

The CL fixes one specific thing: the convention palimpsest — the sub-class where practices and terms decay through paraphrase across sessions. It fixes it by replacing memory (which drifts) with convention (which is stated, read, and auditable).

It does not fix everything. It does not fix voice drift within a session — the model losing register mid-edit, layering a louder voice over a quiet one. That is fixed by the single-voice gate: one processor, one pass, from scratch. It does not fix the bubble reality of a long-running task — the agent's context filling with the task's logic, the user's attention drifting, the task's premises going unquestioned. That is fixed by the no-long-running-tasks practice: rest, take stock, confirm the path. It does not fix the applecart upset — a rendering glitch or a jarring metaphor that makes the reader's body leave the room. That is fixed by tidy-first and the proof reader: a human reading the rendered output is the ground truth.

The CL is one tool in the kit. Naming it as the sub-class fix rather than the universal fix is the honest claim, and the honesty is what makes the tool trustworthy. A tool that claims to fix everything fixes nothing, because nobody knows which problems to bring to it. A tool that claims to fix one thing, precisely, is a tool that gets used for the right problem.

## The pruning session

The CL is not updated casually. The rule is: focus on the CL if you wish to amend the CL, and the focus is a critical focus. You focus on the CL and you figure out critically if there are any issues — any issues.

The amendment happens in a dedicated pruning session — a special session whose sole purpose is to re-orient against the reference. The session runs tests: does each entry's justification still hold? Has any term drifted from its original intent? Are there entries that should be retired? Are there terms in active use that are not yet in the lexicon? The pruning session is the CL's tidy pass, and it follows the same discipline as every other tidy pass: deliberate, at a stopping point, with the reason recorded.

The pruning prevents the CL from becoming a barnacle — an entry that has lost its justification but survives on inertia. A convention that the project has stopped following is retired, not deleted, with a reason and a date. The history of what the project believed and stopped believing is as valuable as the history of what it currently believes. Silent deletion is the CL's equivalent of scraping the parchment; retirement with a reason is the CL's equivalent of a commit.

## Examples

The session that produced this essay is the evidence.

We discovered, mid-task, that the editorial "we" had crept into 8 of 24 chapters — a register shift the voice pass had missed and the proof reader caught. The convention (the benchmark never uses "we") had been bucked unknowingly, by both the agent and the human, because the convention was in memory (drifted) rather than in the CL (read). The proof reader — a separate agent with a separate checks list — caught it, because the proof reader checks against the benchmark, not against memory. 13 instances found and fixed in 30 seconds.

We discovered, mid-task, that a sentence — "things do not hurt because they are broken; they hurt because they are being fixed" — was good enough to belong in the preface. The pull to pivot was strong. We did not pivot. We packaged the observation, finished the chapter, and inserted the line in the preface afterward. Two ideas held; one plot kept. The practice ("hold two ideas without losing the plot") was in the CL, and the convention was read, not remembered.

We discovered, at the tidy pass, that the project had two ADR directories with overlapping numbering — a barnacle. The tidy-first pass found it; a brief was written; the consolidation was done at a stopping point, not mid-task. The practice ("tidy-first: fix what's cheap, brief what's expensive") was in the CL, and the convention was read.

We discovered, at the retrospective, that the CL itself was vulnerable to the palimpsest problem — that definitions could drift through casual updates the same way conventions drift through memory. The rule was written: the CL is amended only in a dedicated pruning session, with a critical focus. The rule is now in the CL, self-referentially. The recursion is the test: the CL says "palimpsest: layers of inconsistent voices"; the CL must not be a palimpsest. The CL says "pruning session: deliberate, at a stopping point"; the CL's own rule was added at a stopping point, with the reason recorded.

## Recommendations

For anyone working with AI agents on a long project:

1. **Don't rely on memory for conventions.** Memory drifts. The model paraphrases; the human half-remembers. After three sessions, the convention is a palimpsest of three paraphrases. Persist conventions in a structured reference that is read, not remembered.

2. **Carry the project's terms as a DSL.** If your project has a vocabulary that is not standard English — and any project of sufficient depth will — define the terms once, in the reference, and read them every session. Without the definitions, a new session interprets "the governor clamps the frontier" in standard English, which is wrong, and the wrongness propagates.

3. **Amend the reference only in a dedicated session.** Don't drop entries mid-task. The mid-task entry is written in the task's context, not the reference's context, and it enters the reference contaminated. Focus on the reference to amend the reference, and the focus is a critical focus: you figure out critically if there are any issues.

4. **Prune at a stopping point, with the reason recorded.** A convention that the project has stopped following is retired, not deleted. The history of what you believed and stopped believing is how you avoid re-formalising a rule you already tried and discarded.

5. **Name what the reference fixes and what it does not.** The CL fixes the convention palimpsest. It does not fix voice drift, the bubble reality, or the applecart upset. Other tools fix those. A reference that claims to fix everything fixes nothing. A reference that claims to fix one thing, precisely, is a reference that gets used for the right problem.

6. **Keep the reference in git.** The history is the audit trail. The drift is visible in the diff. The "held in git, not in memory" principle applies to the reference itself: the reference's definitions are held in git, and git does not palimpsest.

The convention palimpsest is the failure. The conceptual-lexicon is the fix. The difference is whether the convention is held in memory or in git — and memory, as we have learned, is the thing that drifts.

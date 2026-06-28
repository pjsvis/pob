---
title: The Moving Ground
dek: The standard move is to create a new repo with all the things you think it needs. The standard move is wrong. Here is what we learned by going in cold and formalising only what the work demanded.
date: 2026-06-28
---

# The Moving Ground

We have spent the last few weeks building a book about continuum-mechanics biomechanics. The book is the work. But alongside the book, almost accidentally, we have built something else: a set of operating principles for how to run a project with an AI agent in the loop. And the interesting thing about those principles is how they came to be.

We did not design them. We did not sit down at the start and say: here are the rules that will govern this project. We went in cold. We started writing the book, and when a problem surfaced, we wrote a rule for that problem, and only for that problem. The rules accumulated incrementally, each one born from a specific failure, each one carrying the justification of that failure attached to it like a receipt.

By the end, we had seven. A voice invariant, because the chapters drifted register. A single-voice gate, because stitching outputs from different processors produced an audible seam. A curation loop, because we needed a place to dump raw material without derailing the build. An asset/brief distinction, because "where do I put this" was derailing us. A tidy-first principle, because the repo accumulated barnacles. A memory-versus-documentation principle, because Gemini's cross-session memory made it try to belong. And an incremental-formalisation principle, which is the one that governs the other six, and which is the one worth talking about.

## The greenfield reflex

The standard move, when you start a project, is to set up the full apparatus. You write the playbooks. You write the architecture decision records. You define the directory structure. You create the templates, the conventions, the CI pipeline, the linting rules. You do this before there is any work for the apparatus to govern, because it feels disciplined, and because every guide you have ever read tells you that this is what a well-run project looks like.

It is not. It is the map-before-the-territory error, and it is the most expensive mistake you can make at the start of a project, because the rules you write are guesses. They are written by someone who has imagined the work but not done it, and they will be wrong in ways the imagination cannot predict. Then the work arrives, and it does not match the rules, and the rules are already committed and already referenced and already loaded into the agent's context, and the path of least resistance is to bend the work to fit the rules rather than question the rules.

That is how barnacles are born. A barnacle is a rule written for a need that never materialised, surviving on inertia, misdirecting every session that inherits it. The greenfield repo is a barnacle farm, because every rule in it was written before the need was known.

## The incremental alternative

The incremental approach is simpler and harder. You formalise only what the work has already taught you. You start with nothing — no playbooks, no ADRs, no conventions table — and you work. When a problem recurs, you write a rule for that problem. Not before. The rule carries the justification of the problem it was written to solve, and the justification is visible, and when the ground moves — when the tool changes, when the project's understanding shifts, when the practice that seemed right at week one is wrong by week four — you can test the justification against the new ground. Does the reason this rule exists still hold? If yes, the rule stays. If no, the rule is revised, and the revision is a commit.

This is the anti-barnacle mechanism, and it only works because the justification is attached to the rule. In a greenfield repo, the rules have no justifications — they were written because someone thought they would be a good idea, and "someone thought it would be a good idea" is not a justification you can test. In an incrementally formalised repo, every rule was written in response to a specific failure, and the failure is documented, and the test is: would this failure happen again without the rule? If the answer is maybe, the rule is doing its job. If the answer is no, the rule is a barnacle.

## The moving ground

The deeper argument for incremental formalisation is that the ground is moving underneath us, and front-loading the formalisation is a bet that your week-one guesses survive week-four reality. They will not.

In this project alone, the ground moved at least four times. The book's diagrams evolved from Penrose-style tensor networks to ASCII flowcharts, and the pipeline we built for the first need was over-engineered for the second. The KaTeX CSS moved from a CDN to self-hosted, because the CDN failed and every math expression doubled. Gemini acquired a cross-session memory, which changed the model from a stateless tool to a stateful one, and the state changed how we had to think about voice consistency. And the voice itself moved — the benchmark we started with turned out to be richer than we knew, and the rules we wrote to approach it had to be revised as we understood it better.

A greenfield repo, written at week one, would have rules for the CDN (wrong), rules for the tensor diagrams (wrong), rules for the stateless model (wrong), and rules for the voice based on a partial understanding of the benchmark (wrong). Four barnacles, each one misdirecting every session that inherited them. The incremental repo has rules written for the actual problems, revised when the problems changed, and carrying the receipts.

## The threshold

The one risk worth naming is that incremental formalisation can tip into no formalisation if you wait too long. The principle "add what the work demands, when the work demands it" only works if you are honest about when something is being demanded. If you wait until the fifth time a problem recurs before writing the rule, you have paid the problem's cost five times to save one rule-writing. If you write the rule on the first occurrence, you may be formalising an accident.

The companion rule is: formalise at the second occurrence, not the first and not the fifth. The first occurrence is too early — you do not yet know if it is a pattern or an accident. The fifth is too late — you have already accumulated the damage. The second is the threshold: the problem has recurred, it is a pattern, and the rule is worth writing because the pattern will continue.

In this project, the threshold was hit naturally. The Ch04 corruption was a one-off — we fixed it and did not formalise a rule. The `*`-corruption in the math was a one-off — we fixed it and did not formalise a rule. But the voice drift recurred across chapters, and the second occurrence was the trigger for the voice invariant. The barnacle accumulation recurred across tidy passes, and the second occurrence was the trigger for the tidy-first principle. The threshold is a judgement call, and it is the one place the incremental approach can fail: too patient, and you drift; too eager, and you are back to greenfield.

## The generalisation

This is not a rule about book projects, or about AI agents, or about biomechanics. It is a rule about how to formalise anything in a changing environment. You do not write the process document before you have run the process. You do not write the convention before you have broken it. You do not write the architecture decision record before you have made the decision and felt its consequences. You work first, and you formalise what the work teaches you, and you carry the justification forward so the next session can test it against ground that has, by then, moved again.

The alternative is to build the barnacle farm. It feels disciplined. It is not.

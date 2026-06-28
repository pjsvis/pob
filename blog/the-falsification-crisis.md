---
title: The Falsification Crisis
dek: AI is becoming another wasteland of crank theories. The problem is not the models — it is the absence of a framework for saying "that is wrong." Here is what we learned by building one.
date: 2026-06-28
---

# The Falsification Crisis

There is a book on biomechanics in this repository, and it has an appendix called "Falsification Protocols." Every chapter in the book makes a claim — the Poynting effect runs the spine; the clavicle is a calibrated fuse; the cramp is a false alarm thrown at a boundary the nervous system has decided not to let you cross — and the appendix states, for each claim, the conditions under which the claim would be proven false. Not the conditions under which it would be proven true. The conditions under which it would fail.

This is not a standard feature of popular science books. It is not a standard feature of anything in the current AI discourse, and the absence is becoming a problem.

## The crank wasteland

AI is generating content at a volume no human audience can evaluate, and the content is, increasingly, crank-adjacent. Not because the models are stupid — they are not — but because the models are optimised for plausibility, not for truth, and plausibility without falsifiability is the definition of a crank theory. A crank theory is one that cannot be proven wrong, because every counterexample is absorbed into the theory as a special case, and the theory expands to cover it without ever being revised. The model generates a claim. The claim sounds reasonable. The model generates supporting evidence. The evidence sounds relevant. The model generates a narrative that ties the evidence to the claim. The narrative is compelling. At no point does anyone ask: what would it take to show that this is wrong?

This is not a new problem. Karl Popper diagnosed it in the 1930s. What is new is the scale. A human crank can produce one theory at a time, and the crank's community can evaluate it at human speed. A model can produce theories at industrial volume, and the audience — also often a model, or a human assisted by a model — evaluates them at the same speed, with the same bias toward plausibility. The result is a wasteland: a landscape of claims that sound right, supported by evidence that sounds relevant, woven into narratives that sound compelling, none of it falsifiable, all of it generated faster than it can be checked.

The problem is not that the models are wrong. The problem is that the models are *good enough* — good enough to sound right, good enough to pass the plausibility test, good enough that the absence of a falsification framework is not noticed until someone asks the question that nobody is asking: under what conditions would this be false?

## What a falsification framework looks like

The appendix in this repository is a small example, and it is worth describing because it is cheap to build and it changes the character of the discourse.

For each chapter's claim, the appendix states three things. First, the claim itself, stated precisely. Second, the conditions under which the claim would be proven false — the experimental or observational result that, if observed, would require the claim to be revised or abandoned. Third, the existing evidence that bears on the claim, and whether it supports or undermines the claim's predictions.

The first chapter claims that the floor is a geometric datum against which the body's internal coordinate map is calibrated. The falsification condition: if lying on the floor produced no measurable change in the body's internal coordinate mapping — if the resting state on a hard surface were indistinguishable from the resting state on a soft surface, or from standing — the claim would be false. The claim is falsifiable because it makes a specific prediction about a specific intervention, and the prediction can be tested.

The chapter on the clavicle claims that the collarbone breaks as a deliberate fuse, sacrificing itself to protect the cervical spine. The falsification condition: if the stress tensor at the clavicle, under a lateral impact, were lower than the stress tensor at the cervical spine — if the clavicle were not the point of highest stress — the claim that the break is a *calibrated* release would be false, and the break would be re-interpreted as a simple structural failure. The claim is falsifiable because it makes a specific prediction about the stress distribution, and the prediction can be checked against a finite-element model.

The point is not that these claims are correct. The point is that they are *checkable*. A claim that cannot be checked is a crank theory regardless of whether it sounds right. A claim that can be checked is a scientific claim regardless of whether it is eventually proven wrong. The falsification framework does not guarantee truth; it guarantees that the discourse can self-correct, because the conditions for revision are stated in advance and agreed upon before the evidence arrives.

## Why the models do not do this

The models do not generate falsification conditions because they are not trained to. They are trained to generate plausible arguments — claims supported by evidence woven into narratives. Falsification is the opposite move: it is the generation of the conditions under which your own argument would fail. It requires the model to argue against itself, and the training does not reward that. The training rewards agreement, fluency, and the appearance of comprehensiveness. Falsification rewards disagreement, precision, and the admission of vulnerability.

This is not a limitation of the architecture. It is a limitation of the objective. A model trained to generate falsification conditions — trained to respond to a claim with "here is how you would prove this wrong" rather than "here is more evidence that this is right" — would produce a very different kind of discourse. It would produce claims that are more cautious, more precisely stated, and more useful, because every claim would carry its own exit condition. The audience would not have to trust the claim; they would have a protocol for testing it.

The absence of this training is why AI discourse is becoming a crank wasteland. The models are fluent, and fluency without falsifiability is the crank's primary tool. The models are comprehensive, and comprehensiveness without falsifiability is the crank's secondary tool — the theory that explains everything explains nothing, because it cannot be wrong. The models are persuasive, and persuasiveness without falsifiability is the crank's delivery mechanism.

## The cheap fix

The falsification framework is cheap to build. It does not require a new model. It requires a discipline: after generating a claim, generate the conditions under which the claim would be false. State them. Publish them alongside the claim. Let the audience hold the claim to its own falsification conditions.

In the book project, this discipline is a section in the appendix. It could equally be a section in a paper, a column in a table, a field in a database, a prompt in a model's system instructions. The form does not matter. The discipline matters: every claim carries its exit condition, and the exit condition is stated before the evidence arrives, so the discourse can self-correct when the evidence contradicts the claim rather than absorbing the contradiction as a special case.

The alternative is the wasteland. Claims that sound right, evidence that sounds relevant, narratives that sound compelling, none of it checkable, all of it generated faster than it can be evaluated. That is where AI discourse is heading, and the only thing that will stop it is the question that nobody is asking: under what conditions would this be false?

Ask it. Ask it of every claim the model generates. Ask it of your own claims. The question is cheap, and the absence of the question is expensive.

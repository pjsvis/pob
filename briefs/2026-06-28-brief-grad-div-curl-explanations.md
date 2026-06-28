# Brief: Grad/Div/Curl Explanation Blocks for Chapter Math

**Date:** 2026-06-28
**Status:** Open

## Objective

Establish a convention for explaining tensor mathematics in each chapter using gradient ($\nabla f$), divergence ($\nabla \cdot \mathbf{F}$), and curl ($\nabla \times \mathbf{F}$) as the explanatory vocabulary, following the model of the one-inch punch analysis.

## Context

The one-inch punch tensor analysis (`content/one-inch-punch-tensor-analysis.md`) demonstrates a style where the math is not just stated but *explained* through the language of vector calculus. The divergence of the stress tensor becomes "force density." The gradient of the gravitational potential becomes the gravitational field. These are not just equations — they are *narrative devices* that let the reader see what the math is doing in the body.

The `grad-div-curl-demo.md` page already defines custom block syntax for this:

```
:::grad
The gradient of a scalar field $f$ points in the direction of greatest increase.
:::

:::div
The divergence of a vector field $\mathbf{F}$ measures the net flux density.
:::

:::curl
The curl of a vector field $\mathbf{F}$ describes the local rotation.
:::
```

The problem: Gemini's voice is not constant enough to produce consistent revisions. When asked to redraft a chapter using these explanations, it loses too much — the math drifts, the metaphors shift, the register changes mid-paragraph. A chapter that was clean becomes a palimpsest of two voices.

## Proposal

1. **Define the convention formally** in `playbooks/style-playbook.md`: each chapter's Mathematical Justification section should include grad/div/curl explanation blocks where the math warrants it.

2. **Build the explanation blocks incrementally** — one chapter at a time, written in the book's voice (not Gemini's), using the one-inch punch as the register reference.

3. **Do not use Gemini for redrafting.** The voice pass and the grad/div/curl explanations should be written by the author (or a model that holds voice consistently, like GLM-5.2) *from scratch*, using the chapter draft as source material but not as a text to be redrafted. The pattern is: read the draft, understand the math, write the explanation in the book's voice. Not: ask Gemini to rewrite the draft.

4. **Create a glossary** — a shared reference that defines grad, div, curl, and the key tensor operations in plain language, so each chapter can reference it without re-explaining from scratch.

## Deliverables

- Style playbook updated with the grad/div/curl convention
- A shared glossary file (`content/glossary.md` or `briefs/glossary.md`) defining the key terms
- At least one chapter fully voiced with grad/div/curl explanations as a demonstration
- A clear statement in the style playbook that Gemini is not to be used for redrafting — only for initial drafting and brainstorming

## Constraints

- The grad/div/curl blocks must be self-contained — a reader who doesn't know vector calculus should still get the gist from the prose surrounding the equation
- The blocks must not become formulaic — each one should be specific to the physics of the chapter, not a generic "grad means steepest ascent" boilerplate
- The convention must work in both HTML and PDF (WeasyPrint)

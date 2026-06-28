# Brief: Onboarding Chapter — Grad, Div, Curl, and the Wet Towel

**Date:** 2026-06-28
**Status:** Open

## Objective

Write an introductory chapter that teaches the three vector-calculus operations (gradient, divergence, curl) and the basic tensor vocabulary (indices, subscripts, the Cauchy stress tensor) using physical examples the reader already holds in their hands: a wet twisted towel, a t-shirt being stretched, and a simple bio-tensegrity structure.

## Context

The book's 21 chapters use continuum mechanics and tensor algebra throughout. The equations are visually striking — dense with indices and subscripts — but they are also the barrier to entry for the general reader. An onboarding chapter that teaches the language *before* the reader encounters it in the wild would lower that barrier without dumbing down the math.

The model is the one-inch punch analysis, where the divergence of the stress tensor is explained as "force density" and the gradient of the gravitational potential becomes "the gravitational field." The operations are not abstract — they describe what is happening in the tissue.

The wet towel and t-shirt are the ideal teaching objects because:
- Every reader has wrung out a wet towel (torsion, shear, the Poynting effect — fluid forced out perpendicular to the twist)
- Every reader has stretched a t-shirt (anisotropic tension, the difference between along-fibre and across-fibre stretching)
- A simple bio-tensegrity example (e.g. the staved finger steeple, or a simpler hand configuration) connects the operations to the body

## Penrose Diagrams — Citation Required

Roger Penrose introduced conformal diagrams (now called Penrose diagrams) to simplify the representation of infinite spacetimes in a finite figure. The citation for his incentives — *why* he developed them — needs to be researched and added. Likely source: Penrose (1963), "Asymptotic properties of fields and space-times" or his later work on causal structure. The parallel to draw: Penrose simplified spacetime arguments with diagrams; we simplify tensor arguments with grad, div, and curl. Both are compression devices that preserve structural truth.

## Deliverables

- `briefs/onboarding-grad-div-curl.md` — the onboarding chapter
- Written in the book's voice from the start (staved finger register)
- Uses the wet towel, t-shirt, and a simple bio-tensegrity example as physical referents
- Teaches: $\nabla f$ (gradient), $\nabla \cdot \mathbf{F}$ (divergence), $\nabla \times \mathbf{F}$ (curl), $\sigma_{ij}$ (stress tensor), $\varepsilon_{ij}$ (strain tensor), index notation
- Each operation gets a physical explanation, not just a definition
- The chapter is placed in front matter or Part I, before Chapter 01
- The Penrose diagrams citation is included as a parallel: simplification devices that preserve truth

## Constraints

- No images. The reader visualises the wet towel, the t-shirt, the hand. (See style playbook Rule 10.)
- Self-contained — a reader who reads only this chapter should understand what grad, div, and curl *do* even if they can't compute them
- The equations are allowed to be beautiful — dense indices and subscripts are a feature, not a bug. The prose around them does the explaining.
- Do not redraft from Gemini. Write from scratch in the book's voice.

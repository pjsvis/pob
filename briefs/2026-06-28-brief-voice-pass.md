# Brief: Voice Pass — Bring Chapter Drafts to Target Register

**Date:** 2026-06-28
**Status:** Open

## Objective

Edit all 21 chapter drafts sentence-by-sentence to match the register of the staved finger essay, following the rules in `playbooks/style-playbook.md`.

## Context

The chapter drafts have been through mechanical cleanup (barnacle removal, jargon replacement, Popperian extraction). They are clean but not yet voiced. They still read like Gemini's enthusiastic engineering register, not the dry, precise, world-weary tone of the staved finger essay.

## Deliverables

- All 21 chapters edited to the target register
- Each chapter checked against the style playbook's 9 voice rules
- Remaining mixed metaphors resolved (e.g. Ch 4's computer analogy, Ch 6's ASCII diagrams, Ch 17's "non-linear engine on a graph sheet")
- Hardware Smoke Tests softened from engineering procedures to conversational invitations
- Self-containment pass: each chapter reads standalone

## Approach

Can be done chapter-by-chapter in sessions, or via a model like GLM-5.2 using the style playbook as guidance. The staved finger essay is the benchmark — if a chapter doesn't read like it, it's not finished.

## Constraints

- Preserve all mathematical notation (KaTeX)
- Do not add new content — only edit voice
- Do not change the chapter structure (Familiar Hook → Mathematical Justification → Smoke Test)
- Follow the self-contained essay playbook (no bylines/deks for book chapters — those are for standalone essays only)

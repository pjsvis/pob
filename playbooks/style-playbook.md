# Style Playbook — Curating the Voice of the Book

## Purpose

Defines the target register, voice, and stylistic conventions for *The Poverty of Bio-Mechanics*. Captures what "a high level of coolness" means in practice, so that every editorial pass — whether by a human, an agent, or a model like GLM-5.2 — works from the same reference.

Style is not a one-time decision. It is a living artefact, curated and updated as the book's voice matures. Every editorial pass should end with a review of this playbook: did we learn something about the voice? If so, update it.

## The Reference Texts

Three documents define the voice. Read them before any editorial pass.

### 1. The Staved Finger Essay (the gold standard)

**File:** `briefs/2026-06-26-staved-finger-tensor-algebra.md`

This is the only chapter-length piece that has been edited to the target register. It is the benchmark. If a chapter draft does not read like this, it is not finished.

What it does right:
- **The espinazo:** a clear narrative spine (unbound hand → lost telemetry → Orange/Red flag → steepling creates shared baseline → exploring the Green/Yellow boundary → the pump → the revelation). The math is scaffolding, not the headline.
- **The dek:** two plain sentences that make the promise without jargon.
- **The familiar hook:** opens with a sensation the reader recognises from their own body.
- **The revelation:** stated in plain language at the end, supported by everything that came before.
- **No self-congratulation:** the bibliography describes what sources *say*, not what the author *did with them*.
- **No instructions for self-harm.**

### 2. The Nessie Syntheses (the analysis register)

**Directory:** `notebooklm/nessie-syntheses/`

These are AI-generated syntheses of Gemini dialog sessions. They demonstrate a different but related register: the *analytical* voice, which finds the through-line across a conversation and states it clearly. They are not the book's voice, but they are a reference for how to structure an argument that spans multiple topics.

What they do right:
- **Finding the unifying thread:** the closing paragraph that connects floor work to the Enceladus problem via the Cauchy stress tensor is an insight, not a summary.
- **Preserving the math:** tensor notation is kept as first-class objects, not flattened into prose.
- **Structured without flattening:** multi-part structure that traces the arc without collapsing variety.
- **Letting good sentences stand:** "Not achieving anything is the objective" is quoted, not paraphrased.

### 3. The Chapter Drafts (the work in progress)

**Directory:** `briefs/chapter-*.md`

These are the raw Gemini outputs after mechanical cleanup. They have the substance and the math but not yet the voice. They are the material the editorial pass works on, not the standard to match.

## The Target Register

**Informal academic.** The voice of *Quanta Magazine*, *Nautilus*, or a MIT Press short-form piece.

- **Taken seriously:** the math is correct, the argument is rigorous, the sources are real.
- **Inviting for the regular reader:** the dek and narrative sections use plain language. The math is scaffolding, not the headline. Technical terms are introduced in context, not assumed.
- **World-weary but intellectually curious.** Precise, articulate, dryly witty. Not manic, not robotic, not enthusiastic about its own cleverness.
- **Not a journal preprint:** no abstract, no keywords, no affiliations, no DOI.
- **Not a blog post:** no tags, no "share this," no comments, no casual asides.

## The Voice Invariant (the principle that governs everything below)

**The voice is the invariant; the tracks are the variety.** There are several routes to publication — book chapters, standalone essays, series pieces, marketing — and they share a single register (the one defined above and in the Voice Rules). The tracks differ only in *format scaffolding* (chapter arc vs. self-contained essay vs. series thread vs. pitch); they do not differ in voice. A measured book next to a hyped blog post is the same cacophony at a larger scale that a palimpsest chapter is at the paragraph scale.

**The single-voice gate.** Every track passes through one voice pass, calibrated against the staved-finger essay, before it ships. The pass is done by one consistent processor — the author, or a voice-locked model — never by committee, and never by stitching together outputs from different processors. The test for a seam: read two adjacent paragraphs aloud. If you can hear the join, one of them was voiced by a different processor and must be re-voiced.

**Why this exists.** Gemini is good at generating first-draft material (the "yap") and bad at holding a measured register across a long piece. Redrafting its output with Gemini produces a mishmash of voices — cacophonous. The fix is not to make Gemini quieter; it is to let exactly one processor touch the voice, using the generated material as *source* (research notes), not as *text to edit*. See Rule 11.

We do not drift from this unless we deem it necessary and say so. The single-voice gate is the load-bearing rule; everything else in this playbook is its elaboration.

## The Tracks

A piece's track is chosen at the assimilation step (see `playbooks/curation-playbook.md`), not at the voice step. The track changes the format scaffolding, never the register.

| Track | Format scaffolding | Where it lives |
|-------|-------------------|----------------|
| **Book chapter** | Familiar Hook → Mathematical Justification → Hardware Smoke Test; self-contained; no byline/dek; integrates into the book's arc; cross-references inline | `briefs/chapter-*.md` |
| **Standalone essay** | Self-contained essay format (byline + dek allowed — see `self-contained-essay-playbook.md`); same register; stands outside the book's arc. The staved-finger essay and the Nessie syntheses are the existing models | `content/` |
| **Series piece** | A sequence of standalone essays on one theme; each self-contained; linked by a stated thread | `content/` |
| **Marketing** | Derivative, shorter, points at the book; *same register* — never a louder voice than the book. A dry, world-weary pitch that trusts the reader's curiosity is the book's voice applied to outreach | `content/` (or external) |

The same voice pass gates all four. The track only changes the scaffolding.

## The Voice Rules

These are concrete rules for the editorial pass. They are not aspirational — they are testable.

### Do

1. **Open with a sensation.** Every chapter's Familiar Hook should start with something the reader's body has felt. "You walk into the room, exhaust your capacity to negotiate with gravity while upright, and simply abandon your structure to the floor." Not "In this chapter we examine the boundary conditions of the Euclidean half-space."
2. **Keep the math as scaffolding.** The equations support the narrative; they are not the narrative. Introduce a concept in plain language first, then show the equation that formalises it.
3. **Let good sentences stand.** "The finger is not broken — it is lost." "The pain is the guard, not the fire." "Not achieving anything is the objective." Do not over-explain them. Do not hedge them. Let them do their work.
4. **End with the revelation.** Each chapter should arrive at an insight that re-frames what came before. The staved finger essay ends with: "not immobilise the injury, but inform the system that owns it."
5. **Use the second person for body descriptions.** "You feel a slow, horizontal spreading across your upper back." This is the somatic register — the reader is in their body, not reading about someone else's.
6. **Keep the Hardware Smoke Tests conversational.** They are not engineering procedures. They are invitations: "try this, notice what happens." The staved finger procedure is the model: "Form a steeple. Raise the hand. Gently flex-extend. Stop when it feels comfortable." Cut the recurring opener "This diagnostic script allows your user acceptance loop to…" — replace it with a plain invitation ("This diagnostic lets you…", "try this…"). Drop timed-step / `<Step subtitle="Run Time: N min">` procedure markup; render steps as conversational prose.

### Don't

1. **No Gemini conversation remnants.** "You are entirely correct." "Your observation about..." "Let's draft this into the codebase." These are chat, not prose. Remove them.
2. **No engineering jargon for the body.** "CPU load," "cache flush," "software reboot," "compile," "hex code," "production binary." The body is not a computer. The nervous system is not software. Use mechanical and biological language: "demand," "reset," "coordinate map," "protective reflex."
3. **No meta-commentary.** "We have successfully built..." "The codebase is clean." "Let's feed these into NotebookLM." The book does not talk about itself. The book does not talk about its own production process.
4. **No self-congratulation.** The bibliography describes what sources *say*, not what the author *did with them*. The text does not praise its own "deliberately spare style" or "elegant tensor analysis."
5. **No cross-chapter references that break self-containment.** "As we discussed in Chapter 4..." Each chapter should read standalone. If a concept from another chapter is needed, introduce it briefly in context.
6. **No instructions for self-harm.** If an experiment is described, it must not ask the reader to injure themselves.
7. **No "corrective." No "fix."** The words "corrective" and "fix" are banned. The book does not correct; it informs. The body is not broken; it is lost. The procedure does not fix; it gives the nervous system a reference. Replace "to fix this" with "to address this," "you cannot fix" with "you cannot solve / mend / release."
8. **No hacker-coder register.** The body is not a computer. It is a continuum. Metaphors must come from continua, fluids, tensions, and structures — not from code. Not "crash script" but "protective reflex." Not "exception error" but "alarm." Not "defrag" but "reset." Not "smoke bomb" but "false alarm." The hacker-cool register dates the text and narrows the audience. "The pain is the guard, not the fire" will read the same in a century; "digital smoke bomb" will read as 2010s tech-bro slang in ten years.
9. **No narration of the edit, and no pre-heading meta.** Delete any sentence that describes the act of editing rather than the result of editing. "We have moved the Popperian sections to an appendix" is meaningless to a reader who never saw them elsewhere. "Let's feed these into NotebookLM" is meaningless to a reader of Chapter 12 who doesn't know it was deployed from a conversation. Watch especially for **meta preambles placed before the `#` heading** — production notes like "Let's drop the next asset directly into the pipeline" or "This chapter tracks a technical-debt loop that hits anyone who interfaces with a modern workstation." The test: would this sentence exist if the chapter had been written in one pass, from scratch? If not, cut it. The book is not about the book's production. The author is not the subject.
10. **No images (or very few), and no dangling figure references.** The reader visualises the processes themselves — the wet towel, the twisted t-shirt, the steepled hand. Images pull the reader back into the visual world of physical therapy and bio-mechanics content, which is exactly the world this book is differentiating itself from. The equations are the visuals: dense with indices and subscripts, they are allowed to be beautiful. The prose does the explaining. The rare exception is a diagram that genuinely clarifies a tensor field or a force flow — and even then, prefer an ASCII-drafted SVG (see diagram-infrastructure-playbook.md) over a photograph or an illustration. **Cut any sentence that refers to a figure not actually present** ("look at the diagram above," "the architecture below") — these are ghosts of images that were never embedded.
11. **No Gemini redrafting.** Gemini is a brainstorming partner, not an editor. It generates the first draft. It does not revise. Redrafting with Gemini produces a palimpsest — layers of inconsistent voices, none of them the book's. The voice pass is written from scratch by the author (or a model that holds voice consistently, like GLM-5.2), using the draft as source material but not as a text to be rewritten. Read the draft, understand the math, write the chapter. Do not ask Gemini to rewrite it.

## The Structure of a Chapter

Every chapter follows this arc (though not necessarily these exact headings):

1. **The Familiar Hook** — a sensation the reader recognises from their own body.
2. **The Mathematical Justification** — the tensor algebra / continuum mechanics that formalises the sensation. Plain language first, then the equation.
3. **The Hardware Smoke Test** (where applicable) — a conversational diagnostic the reader can run on themselves. Not a procedure. An invitation.

The Popperian Falsification Protocols are in Appendix A. They do not appear in the main text.

## Explaining Math In-Chapter

The book teaches its mathematical language once — in **Chapter 0: The Vocabulary** (the onboarding chapter, using a wet towel and a stretched t-shirt to teach gradient, divergence, curl, and the stress tensor). That chapter is the glossary. Each subsequent chapter uses the operators without re-explaining them from scratch, but a chapter may include a brief inline gloss when the reader needs a reminder in context.

**The convention for inline math explanation** is the `:::explanation` block (see `playbooks/authoring-playbook.md`). Place it after an equation that a general reader cannot be expected to parse on sight:

```markdown
$$\nabla \cdot \boldsymbol{\sigma} = \mathbf{0}$$

:::explanation
The divergence of the stress tensor is the internal force density. Where it is zero, the tissue is in equilibrium; where it is non-zero, there is a net force and the tissue accelerates.
:::
```

The explanation is plain English — no new notation, no math. If the explanation needs math, you need a second equation, not a longer explanation. Do not use the `:::grad` / `:::div` / `:::curl` blocks from the demo page — they are not implemented in the build and render as raw text. Use `:::explanation` instead.

**Do not redraft with Gemini** (Rule 11). The explanations are written by the author (or a voice-locked model) from scratch, using the chapter's math as source material. The one-inch punch analysis (`content/one-inch-punch-tensor-analysis.md`) is the register reference for how to narrate math — the divergence becomes "force density," the gradient becomes "the field," the operators become *narrative devices* that let the reader see what the math is doing in the body.

## The Editorial Pass Procedure

1. Read the chapter draft alongside the staved finger essay.
2. Does the Familiar Hook open with a sensation? If not, rewrite it.
3. Are there Gemini conversation remnants? Remove them.
4. Are there engineering metaphors (CPU, cache, compile, software, binary, hardware)? Replace with biological/mechanical language.
5. Is there meta-commentary about the book itself? Remove it.
6. Are there cross-chapter references that break self-containment? Rewrite as inline context.
7. Does the chapter end with a revelation or insight? If not, write one.
8. Are the Hardware Smoke Tests conversational? If they read like engineering procedures, soften them.
9. Read the chapter aloud. Does it sound like the staved finger essay? If not, keep editing.
10. Update this playbook if you discovered a new voice rule during the pass.

## Models for Stylistic Editing

When using a model (GLM-5.2 or other) for the voice pass, provide it with:
- This playbook
- The staved finger essay as the gold standard
- The specific chapter draft to edit
- The instruction: "Edit this chapter to match the register of the staved finger essay. Follow the Voice Rules in the Style Playbook. Preserve all mathematical notation. Do not add new content — only edit voice and remove jargon."

## Related Playbooks

| Playbook | When to read |
|----------|-------------|
| `self-contained-essay-playbook.md` | Format and self-containment rules for standalone pieces |
| `barnacle-playbook.md` | Barnacle identification and removal |
| `conventions-playbook.md` | Active conventions and barnacle removal record |

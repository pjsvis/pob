# Self-Contained Essay Playbook

## Purpose

Defines the format, structure, and self-containment rules for standalone published pieces (essays, articles, briefs promoted to publication). Ensures every piece reads correctly as a PDF, a web page, or a printed sheet — with no assumption that the reader has seen any other document.

## When to Use This Playbook

- When promoting a brief to a published essay.
- When a piece will be distributed as a standalone PDF.
- Before running `just pdf` on any article.
- During the final editorial pass before publication.

## Context & Prerequisites

- The piece lives in `briefs/` (the canonical source).
- `just build` and `just pdf` are available and working.
- WeasyPrint is installed in `.venv/` for PDF generation.
- The build pipeline (`build.ts`) scans both `content/` and `briefs/` as source directories.

## The Format

Every self-contained piece follows this structure, top to bottom:

```
---
title: Piece Title
date: YYYY-MM-DD
---

# Title

*Author · Day Month Year*

*Dek — one or two plain sentences framing the question.*

---

(body sections)

---

*Bibliography*

- Author (Year). *Title*. Publisher. Narrative explanation
  of why this source is here and what it contributes.
```

### Element Specifications

| Element | Format | Rules |
|---------|--------|-------|
| **Front matter** | YAML `title` and `date` | Required. Used by the build pipeline for the page title and TOC. |
| **Title (H1)** | Plain text, sentence case or title case | One H1 only. States the topic, not the conclusion. |
| **Byline** | `*Author · Day Month Year*` (italic) | Informal academic: no affiliation, no institutional hierarchy. Author name and date are sufficient provenance. |
| **Dek** | One or two italic sentences below the byline | Plain language — no math, no jargon. States the surprising claim or the question. If the reader reads only the title and dek, they know what the piece answers and why they might care. Optional but recommended. |
| **Body** | Markdown sections with H2/H3 headings | The argument, the math, the story. The math is scaffolding for the narrative, not the headline. |
| **Bibliography** | `*Bibliography*` header, narrative entries | Informal academic style: Author (Year). *Title*. Publisher. Then one or more sentences explaining why the source is cited and what it contributes. The explanation may be longer than one line if the source's significance warrants it. No DOIs, no page numbers, no volume/issue — those belong in journals, not essays. |

## The Self-Containment Pass

Before generating the PDF, do a pass to ensure the piece is fully self-contained. A reader who holds only the PDF — who has never seen the website, never read another article — must understand every reference, allusion, and citation.

### Checklist

- [ ] **No "companion piece" links.** If the piece references a concept developed elsewhere, either:
  - Inline enough context that the reader doesn't need the other document, or
  - Remove the link and rephrase to stand alone.
- [ ] **No "home page" or "epigraph on the home page" references.** The PDF reader has not seen the home page.
- [ ] **No "see brief X" or "see article Y."** Replace with self-contained prose.
- [ ] **Internal site links are acceptable in the web version** but must not be the *only* way to understand a reference. The PDF version (which renders links as inert text or omits them) must read correctly without them.
- [ ] **Bibliography entries are self-contained.** Each entry explains the source's relevance without assuming the reader has read any other document.
- [ ] **No self-congratulatory references.** A bibliography entry describes what the source *says* and why it's *cited*, not what the citing author *did with it*. The article does not review itself in its own bibliography.
- [ ] **No instructions for self-harm.** If an experiment or procedure is described, it must not ask the reader to injure themselves. Safe, non-harmful observations are fine; instructions to cause injury are not.

## Style Register

The target register is **informal academic** — the voice of *Quanta Magazine*, *Nautilus*, or a MIT Press short-form piece:

- **Taken seriously:** the math is correct, the argument is rigorous, the sources are real.
- **Inviting for the regular reader:** the dek and narrative sections use plain language. The math is scaffolding, not the headline. Technical terms are introduced in context, not assumed.
- **Not a journal preprint:** no abstract, no keywords, no affiliations, no DOI.
- **Not a blog post:** no tags, no "share this," no comments, no casual asides.

## The Dek

The dek is the one place where the piece is allowed to be slightly seductive — it is the shop window, not the goods. It must be:

- **True** — no promises the body can't keep.
- **Plain** — no math, no jargon.
- **Brief** — one or two sentences.
- **Self-contained** — makes sense without the title, without the website, without any other document.

A good dek states the surprising claim in plain English, names the mechanism in one beat, and names the remedy or payoff in the next. It tells the reader what the scaffolding is *for*.

## Procedure

1. Write the piece in `briefs/YYYY-MM-DD-slug.md`.
2. Add front matter (`title`, `date`).
3. Add the byline (`*Author · Day Month Year*`).
4. Add the dek (one or two italic sentences).
5. Write the body. Keep the math as scaffolding for the narrative.
6. Write the bibliography. Each entry: Author (Year). *Title*. Publisher. Narrative explanation of significance.
7. Do the self-containment pass (see checklist above).
8. Run `just pdf file=<slug-without-extension>` to generate the PDF.
9. Review the PDF: check pagination, equation rendering, bibliography, and self-containment.
10. Commit the markdown source and the PDF to `pdf/`.

## Validation

- [ ] The piece reads correctly as a standalone PDF with no external references.
- [ ] The dek makes sense without the title or any other document.
- [ ] Every bibliography entry explains its own relevance.
- [ ] No self-congratulatory language in the bibliography.
- [ ] No instructions for self-harm.
- [ ] `just pdf` succeeds and the PDF renders equations and pagination correctly.
- [ ] The web version (`just preview`) also renders correctly.

## Related Playbooks

| Playbook | When to read |
|----------|-------------|
| `briefs-playbook.md` | Before drafting a piece |
| `css-architecture-playbook.md` | Understanding the print CSS that controls pagination |
| `just-playbook.md` | The `just pdf` and `just build` verbs |
| `publication-playbook.md` | The broader publication workflow |
| `export-playbook.md` | Multi-platform distribution |
| `debriefs-playbook.md` | After publishing a piece |

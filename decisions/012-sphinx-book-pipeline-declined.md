---
id: dec-012-sphinx-book-pipeline-declined
date: 2026-10-10
status: accepted
title: "Sphinx/MyST book pipeline — assessed, not adopted"
---

# ADR-012: Sphinx/MyST book pipeline — assessed, not adopted

## Context

A walkthrough post (*How to Write a Book in Markdown*, Syed Asif, 06/10/2026) describes building a technical book with Sphinx + MyST Markdown + `sphinx-book-theme`, producing HTML, PDF (`make latexpdf`, via LaTeX) and ePub from one source, with `{ref}` / `{numref}` cross-references, `numfig` figure numbering, `sphinxcontrib-bibtex` citations, and Read the Docs hosting.

The post arrived with three claims attached: that our pipeline "does not produce a book"; that the Python pipeline "seems to do all that we require"; and a request for an opinion. This record is that opinion, written down so the next session evaluates the idea rather than re-deriving it.

### What "does not produce a book" actually means here

Half true, and not for the reason stated. There is no Jekyll in this repo — the build is `bun run src/cli.ts build` (`justfile:8-9`) into a TypeScript SSG (`build.ts`, 606 lines), with PDF via WeasyPrint (`justfile:24-27`).

What the pipeline does produce: per-file HTML, a generated TOC (`build.ts:277`), an index listing (`build.ts:379`), a detailed contents page (`build.ts:420,568`), and per-document PDFs.

What it does not: **nothing composes N documents into one ordered volume.** `just pdf file=…` renders a single file at a time (`justfile:26`); the template is a content container plus a layout toggle and no reading-order navigation (`src/templates/layout.html:73-78` — the toggle button and `#pob-content`, and nothing else). No continuous chapter numbering, running heads, back-of-book index, or ePub. The gap is *assembly*, and Sphinx genuinely fills it.

## Findings

### 1. Sphinx's strongest feature is one we lack, and it is a gate, not a convenience

`{ref}` / `{numref}` resolve at build time, so a broken cross-reference fails the build. We hand-roll anchors with no verification (`build.ts:277`). That is error excluded by structure rather than caught by vigilance — the discipline this project keeps arguing for. It is the best argument for adoption, and it is not the one the post makes.

### 2. Our Markdown dialect is not Markdown

`processCustomBlocks` (`build.ts:92`) parses `:::sidenote`, `:::newthought`, `:::explanation`, `:::margin-figure`, `:::diagram` and the rest; the manuscript uses eleven distinct `:::` block forms across `content/` and `briefs/chapter-*.md`. Under Sphinx those become Python extensions, and the Penrose-style layout (`src/styles/pob.css:312-520`) is re-authored against `sphinx-book-theme`. That is not "no code" — it is our code in a second language.

### 3. Our diagrams are inline SVG generated at build time, and LaTeX has no native SVG

`renderMermaid` (`src/agents/diagrams.ts:26`) and `renderHybridSvg` (`:120`) emit `<svg>` strings which `injectDiagrams` (`:255`) splices in post-parse (`build.ts:518`). The `latexpdf` path needs `sphinx.ext.imgconverter` plus an external converter (inkscape/rsvg), or a separate PDF-export route. The post does not mention this. What a walkthrough omits is the most informative part of it.

### 4. The post's citation feature contradicts our bibliography rule

`sphinxcontrib-bibtex` + `{cite:p}` produces bare numbered citations. `playbooks/bibliography-playbook.md` forbids precisely that: the narrativised entry, the anti-yap gate, and the 5–8 reference cap exist to prevent the citation wall. Sphinx here sells a feature we have already decided against on editorial grounds.

### 5. "No Node.js" is not available to us

Pre-processing stays Bun (`scripts/`, `src/agents/`). A Sphinx build would move us from two runtimes (Bun; WeasyPrint-Python) to three (Bun; Sphinx-Python; LaTeX) — against `AGENTS.md` §2 (*Bun is the sole runtime*) and the *minimal AI tech stack* practice.

## Decision

**Do not adopt Sphinx/MyST now.** The decision is about *which artefact is primary*, not *which tool is better*: if the primary artefact is a print PDF, Sphinx/LaTeX wins and would not need defending; while the site is primary and the PDF secondary, adoption buys one output format at the price of a Python build runtime, a re-authored layout, a converted diagram path, and a bibliography rule reversed.

Grounded in the same two principles as ADR-009:

- **Minimal AI tech stack** — the current stack's receipt ("renders a math-heavy HTML site we control") still holds.
- **Incremental formalisation** — no current failure demands a build-engine migration. The pain is *felt* as "we have no volume", which is a missing output, not a broken engine.

## Consequences

No Sphinx, no `conf.py`, no `requirements.txt`, no second content tree. `build.ts` is unchanged. This record exists so the idea resurfaces with its costs attached rather than as a fresh good idea.

### Trigger conditions for revisiting (the "why we would")

Adoption becomes justified when *any* of the following holds — at that point the choice reopens, with the four questions below already answered:

- **A print artefact becomes the primary deliverable** (submission to a publisher, print-on-demand, ISBN). This is the highest-value trigger and the only one that is about the product rather than the tooling.
- **ePub becomes a real distribution requirement** — separate from print, and not satisfiable by a PDF.
- **Cross-reference integrity becomes load-bearing at scale** — the manual-anchor problem (`build.ts:277`) starts producing broken links a reader notices, or a bibliography/citation graph is needed *with resolution guarantees* (a `\ref`-style gate rather than the narrativised prose entries we require).
- **The `:::` dialect stops paying for itself** — i.e. we would rather write MyST directives than own `processCustomBlocks`.

### The spike, if a trigger fires

Do not rewrite. Take the most math- and diagram-heavy chapter (`chapter-02-the-torsion-engine`) through a throwaway template and answer four falsifiable questions:

1. Does MyST parse our `:::` blocks — natively, by extension, or not at all?
2. Do our `$$` blocks containing `aligned` / `bmatrix` survive both the HTML and the LaTeX path?
3. Do the generated SVGs reach the PDF, and at what cost and fidelity?
4. Does the Penrose-style layout survive, or must `pob.css:312-520` be re-authored?

An afternoon converts *"seems to do all that we require"* into a measurement. Whichever way the spike lands, the losing pipeline is deleted — two build pipelines is the outcome this decision refuses outright.

## Humean caveat

The post's claims are its author's report of a template he wrote; the tool underneath (Sphinx) is independently checkable and not in doubt. The assessment above rests on this repo's own files — `build.ts`, `src/agents/diagrams.ts`, `src/styles/pob.css`, `src/templates/layout.html`, `justfile`, `playbooks/bibliography-playbook.md` — read on 2026-10-10, plus the post's own text. It does **not** rest on having run Sphinx against our corpus, which we have not. If question 1 or 3 above comes back cheap, the cost side of this decision is wrong and the trigger conditions still govern.

## Related

- `decisions/009-satteri-markdown-parser-assessment.md` — same shape: assessed, declined, with triggers
- `decisions/007-diagram-pipeline-assessment.md` — the diagram pipeline that makes findings 3 load-bearing
- `decisions/002-bun-sole-runtime.md` — the runtime constraint finding 5 invokes
- `playbooks/bibliography-playbook.md` — the narrativised entry and the cap (finding 4)
- `src/cli.ts`, `build.ts`, `justfile` — the pipeline preserved by this decision

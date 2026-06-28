# ADR-003: Diagram Pipeline Assessment

**Date:** 2026-06-28
**Status:** Accepted
**Assessor:** ses_4f431f

## Context

ADR-002 adopted the hybrid ASCII→SVG pipeline for Penrose-style tensor diagrams. The pipeline was built (`src/agents/diagram-parser.ts` 174 lines, `src/agents/diagrams.ts` 262 lines) with a token set for tensor-network nodes (`o □ △`), matrix stamps (`◇ Δ ⊚`), half-space boundaries (`---`), d'Alembertians (`▱`), and contractions (`⟲`). It renders fenced code blocks containing those tokens as true SVG primitives (lines, circles, rects, polygons, markers).

This assessment evaluates whether the pipeline is viable for the book's actual diagram needs, now that the manuscript is substantially complete (24 chapters, preface, section 00, onboarding chapter).

## Findings

### 1. The book's diagrams are flowcharts, not tensor networks

An empirical scan of all 24 chapter files reveals: **zero chapters use the hybrid token set.** Every chapter diagram is a plain ASCII flowchart — labeled boxes (`[Standing State]`, `[Green Zone]`, `[Mainstream Podiatry]`) connected by arrows (`──►`, `│`, `▼`). These contain no structural tokens (`□ △ ◇ ⊚ ▱ ⟲`), so `isHybridDiagram()` returns false, and the pipeline falls back to the `<pre>` text renderer. The hybrid SVG pipeline fires only on the demo pages (`penrose-diagrams.html`, `diagram-demo.html`, `dalembertian-demo.html`).

This is not a bug. The book evolved: the chapters explain biomechanical mechanisms (force flows, zone transitions, chain reactions) using flowcharts, not tensor-network diagrams. The Penrose-style tensor diagrams the pipeline was designed for are a different visual language — one the book's voice outgrew when it settled on the Familiar Hook → Math → Smoke Test arc. The math is in the KaTeX equations; the diagrams are in the flowcharts; the tensor-network notation is in the prose. The hybrid pipeline was built for a need that the manuscript did not ultimately have.

### 2. The `<pre>` fallback is correct for flowcharts

The fallback behavior — rendering ASCII flowcharts as monospace text in a `<pre>` block — is the right call. ASCII flowcharts with `──►`, `│`, `▼`, and bracketed labels are a well-established convention (git logs, sequence diagrams, architecture sketches). They are legible, they render identically in HTML and PDF, and they require no tooling. The reader sees exactly what the author wrote. For a book whose voice is "dry, precise, world-weary," monospace flowcharts are on-register — they look like field notes, not infographics.

### 3. The hybrid pipeline is viable for the niche it serves

The pipeline itself (436 lines total) is clean, well-documented, and correctly gated. The `isHybridDiagram()` check — requiring at least one structural token before engaging — is the right design: it prevents prose arrows (`→` in an illustration) from accidentally triggering SVG rendering. The SVG output is basic (primitive shapes, no styling beyond CSS classes) but functional. For tensor-network diagrams specifically (if any future chapter needs them), the pipeline works.

### 4. Visual quality assessment

The hybrid SVGs look like schematic diagrams — clean lines, geometric shapes, arrow markers. They are adequate for a web build and a beta-reader PDF. For a published book, they would need typographic polish (font choices, stroke weights, labels). The `<pre>` flowcharts look like monospace text — again adequate for web and beta PDF, but a published book would likely want them redrawn as proper figures.

**Neither rendering path is publication-ready for a print book.** Both are sufficient for the current stage (beta reading, web preview). Final production diagrams are a separate task — likely hand-drawn SVG or an illustrator's work, not a pipeline output.

## Decision

**Retain the hybrid pipeline as-is.** It is viable for the niche it serves (tensor-network diagrams) and correctly falls back to `<pre>` for the flowcharts the book actually uses. No replacement is needed. No extension is needed — the book's diagrams work as ASCII flowcharts, and forcing them through an SVG pipeline would add complexity without visual benefit.

**The book's primary diagram format is ASCII flowcharts in `<pre>` blocks.** This is not a compromise; it is the correct format for the book's voice and content. The hybrid SVG pipeline is a secondary tool, available if a future chapter needs tensor-network notation, but it is not the book's primary rendering path.

**Final production diagrams (for print) are a separate, later task.** They will be hand-drawn SVG or illustrator-produced, not pipeline-generated. The current pipeline's job is to get the book to beta reading and web preview — which it does.

## Consequences

- The hybrid pipeline stays in the codebase but is not the book's primary diagram renderer.
- Authors should continue writing ASCII flowcharts in fenced code blocks; they render as `<pre>` and that is correct.
- If a future chapter needs a tensor-network diagram (nodes, stamps, half-spaces), the hybrid pipeline is ready — use the structural tokens and it will render as SVG.
- The `:::diagram:name` block (added in td-5cf3c1) is available for referencing pre-rendered SVGs if production diagrams are produced externally.
- `playbooks/diagram-infrastructure-playbook.md` is accurate as written; no changes needed to the authoring workflow.
- A print-production diagram task should be created when the book approaches final publication. It is not blocked by anything in the current pipeline.

## Related

- `docs/adr/002-hybrid-svg-approach.md` — the original decision to build the hybrid pipeline
- `playbooks/diagram-infrastructure-playbook.md` — the authoring workflow (now reflects this assessment's context)
- `src/agents/diagram-parser.ts` — the parser (retained)
- `src/agents/diagrams.ts` — the renderer (retained)

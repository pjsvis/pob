# Brief: Assess Hybrid ASCII→SVG Diagram Pipeline Viability

**Date:** 2026-06-28
**Status:** Open

## Objective

Assess whether the hand-rolled hybrid ASCII→SVG diagram pipeline is viable for the book's needs, or whether an alternative approach is required.

## Context

The project attempted to use Penrose diagrams for the book's mathematical illustrations. This proved impractical — Penrose requires its own toolchain and did not fit the SSG pipeline. Instead, a hybrid ASCII→SVG pipeline was built from scratch:

- `src/agents/diagram-parser.ts` (174 lines) — parses ASCII token diagrams into an AST
- `src/agents/diagrams.ts` (262 lines) — renders the AST as SVG, handles Mermaid placeholders
- Custom token set: `↓` (force arrows), `o` (nodes), `◇` (elastic matrix), `△` (thixotropic), `□` (structural), `⊚` (plastic), `---` (half-space boundary), `▱` (d'Alembertian)
- Caption syntax: `:::caption:Text`
- Working demos: `content/diagram-demo.md`, `content/grad-div-curl-demo.md`, `content/penrose-diagrams.md`, `content/dalembertian-demo.md`

The diagrams render during `just build` and are embedded as SVG in the HTML output. They also export to `dist/diagrams/` for external review.

## Questions to Assess

1. **Expressiveness:** Can the current token set represent the diagrams the book needs? (tensegrity units, force flows, half-space boundaries, tensor fields)
2. **Maintainability:** Is the parser/renderer code clean enough to extend, or is it accumulating complexity?
3. **Visual quality:** Do the rendered SVGs look good enough for a published book, or do they look like ASCII art wearing an SVG hat?
4. **Alternative paths:** Is there a better approach now that we know the requirements? (e.g. hand-drawn SVG templates, TikZ export, or accepting that the ASCII pipeline is a drafting tool and final diagrams are produced externally)

## Deliverables

- A written assessment (ADR or debrief) with a clear recommendation
- If the pipeline is viable: a brief for the next set of diagrams needed
- If not viable: a brief for the alternative approach
- Updated `playbooks/diagram-infrastructure-playbook.md` to reflect the assessment

## Constraints

- The book needs diagrams for: tensegrity units, force flows, half-space boundaries, the anterior tensile sling, the spinal engine, the laminated core, the plantar interface
- Diagrams must render in both HTML (KaTeX pipeline) and PDF (WeasyPrint)
- The pipeline must stay within the Bun/TypeScript runtime (no external rendering services)

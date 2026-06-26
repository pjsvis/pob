# Brief: Hybrid ASCII‑→‑SVG Approach for Penrose‑Style Diagrams

**Date:** 2026‑07‑01

**Purpose**
We need a reliable, low‑entropy way to render Penrose‑style diagrams (half‑space, orthogonal 1‑g field, tensor nodes, legs, and matrix stamps) without introducing a heavyweight DSL. The hybrid approach converts simple ASCII sketches into true SVG primitives (lines, arrows, shapes) at build time.

**Key Requirements**
- **Bounding‑box handling** – SVGs are emitted with a fixed `viewBox`. If the diagram exceeds the box, the container scrolls (`overflow:auto`).
- **Primitive set** – half‑space line, orthogonal field arrows, node shapes (`o`, `□`, `△`), leg arrows, variance direction, contraction loops, identity lines, and the three matrix stamps (`◇`, `Δ`, `⊚`).
- **Author workflow** – authors continue to write plain ASCII inside fenced code blocks. No extra markup is required beyond the three matrix symbols.
- **Review‑only** – diagrams are generated for inspection; reviewers may split or simplify oversized diagrams, but no pre‑visualisation step is performed.

**Outcome**
- Deterministic SVG output that scales cleanly.
- Minimal cognitive overhead for contributors.
- Alignment with the Penrose‑style emphasis on clarity and the Edinburgh Protocol’s entropy‑reduction mandate.

---

**Implementation Plan**
1. Extend `src/agents/diagrams.ts` with a primitive parser and SVG renderer.
2. Add CSS rule `.ascii-diagram { overflow:auto; }`.
3. Update documentation (playbooks, README).
4. Run a pilot on the existing Penrose triangle, staircase, and bio‑tensegrity diagrams.
5. Incorporate reviewer feedback and finalize the generator.

---

**Decision** – Adopt the hybrid approach as the canonical diagram pipeline. The Penrose‑DSL will be considered an optional advanced tool for future, more complex visualisations.

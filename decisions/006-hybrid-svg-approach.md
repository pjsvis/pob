# 002 – Hybrid ASCII‑→‑SVG Approach for Penrose Diagrams

**Status:** Accepted

**Context**
The project requires a set of diagrams that convey tensor‑algebra concepts within a Penrose‑style layout. The current ASCII‑to‑SVG pipeline renders the raw text inside a `<svg>`, which leads to alignment issues and visual brittleness. A full‑blown Penrose‑DSL would add unnecessary complexity and a new learning curve.

**Decision**
Adopt a hybrid approach that parses a limited set of ASCII symbols and emits true SVG primitives (lines, arrows, shapes, and matrix stamps). The generator will:
- Produce a fixed `viewBox` (e.g., `0 0 600 200`).
- Insert a half‑space line and an orthogonal field grid when the corresponding tokens are present.
- Automatically add `overflow:auto` to the container so oversized diagrams are scrollable.
- Keep the authoring experience simple: write plain ASCII, optionally using `◇`, `Δ`, `⊚` for matrix stamps.

**Consequences**
- No DSL is introduced; the build remains lightweight.
- Diagrams are deterministic and scale cleanly.
- Reviewers can split or simplify diagrams after generation; no pre‑visualisation step is required.
- Documentation and playbooks must be updated to reflect the new workflow.

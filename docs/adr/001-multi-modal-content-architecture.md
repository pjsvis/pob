# Decision Record: Multi-Modal Content Architecture

## ADR-001: Four Representation Modes for Tensor Concepts

**Date:** 2026-06-26  
**Status:** Accepted  
**Deciders:** Peter Smith

---

## Context

The project revealed that tensor algebra notation lacks web-native diagram tooling. Research found:
- `mptikz` (LaTeX, not web-ready)
- `tensor-network-editor` (quantum physics focus, not biomechanics)
- Various Python→TikZ tools (print-centric)

The question: should we build tooling or use existing simple approaches?

**Key insight from discussion:**
- Language ↔ ASCII ↔ Diagram mirrors Equation ↔ Diagram ↔ Explanation
- Content is the same, representation changes
- Reader needs multiple modes to form mental model

---

## Decision

Adopt four representation modes for each concept:

1. **Equation** — KaTeX (existing, working)
2. **Diagram** — ASCII `<pre>` blocks + `figure.full-width` for wide content
3. **Explanation** — Plain English prose blocks
4. **Commentary** — Sidenotes with optional titles

**Not adopting:**
- Complex SVG generation from custom DSL
- tensor-network-editor (mismatched domain)
- Automated diagram generation

---

## Reasons

| Option | Rejected because |
|--------|------------------|
| Custom SVG DSL | Adds complexity without clear benefit; domain too narrow |
| tensor-network-editor | Quantum physics focus; biomechanics semantics (pre-stress, boundaries) not supported |
| ASCII → SVG conversion | Arrow character rendering unreliable in SVG; `<pre>` is perfect |
| Mermaid CLI | Requires external dependency; adds build complexity |

**Adopted because:**
- Uses existing tools (KaTeX, `<pre>`, markdown)
- Minimal added complexity
- Matches Penrose/Tufte publishing practice
- Four modes reinforce each other

---

## Consequences

**Positive:**
- Readers have equation, diagram, explanation, and commentary
- Authors have simple syntax (fenced blocks)
- Build pipeline stays simple (markdown → HTML)
- Diagrams export to dist/diagrams/ for review

**Negative:**
- Complex diagrams (3D, animated) not supported
- ASCII art constrained to column width (mitigated by full-width figures)
- No index-contraction visualization (out of scope)

---

## Implementation Notes

```markdown
<!-- Equation (existing) -->
$$J_2 = \frac{1}{2} \mathbf{s} : \mathbf{s} > \tau_y^2$$

<!-- Diagram -->
:::diagram:yield-criterion
```
[ASCII art showing stress threshold]
```
:::

<!-- Explanation -->
:::explanation
When stress exceeds yield threshold, clay flows.
:::

<!-- Structured Sidenote -->
:::sidenote:Why this matters:
Repeated rotation drives J₂ above τᵧ².
:::
```

---

## Alternatives Considered

| Alternative | Pros | Cons |
|-------------|------|------|
| Custom SVG DSL | Flexible diagrams | Complexity, domain narrow |
| tensor-network-editor | Professional tooling | Wrong domain, LaTeX output |
| Client-side Mermaid | Full diagram support | JS dependency, DOM required |
| ASCII → SVG | Clean output | Arrow rendering broken |

---

## Related Decisions

- ADR-000: Initial architecture (KaTeX server-side rendering)
- Brief: 2026-06-26-multi-modal-content (full proposal)

---

## Review

**Next review:** After implementing explanation blocks and structured sidenotes  
**Success criteria:** Authors can write four-mode content in under 5 minutes per concept
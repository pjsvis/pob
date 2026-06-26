# Brief: Multi-Modal Content Architecture

## Context

The project revealed that tensor algebra notation (bio-tensegrity, continuum mechanics) lacks web-native tooling. However, the goal isn't to create tooling — it's to present meaning in multiple modes so readers can form robust mental models.

## Problem

Current content has:
- ✅ Equations (KaTeX, working)
- ⚠️ Diagrams (ASCII art, arrow rendering broken)
- ❌ Explanations (not structured)
- ⚠️ Commentary (basic sidenotes)

The reader journey: **equation → diagram → explanation** is interrupted.

## Proposal

Four representation modes for each concept:

| Mode | Purpose | Implementation |
|------|---------|----------------|
| Equation | Precise, formal | KaTeX (existing) |
| Diagram | Visual relationships | SVG via `<pre>` or custom DSL |
| Explanation | Plain English | `:::explanation` blocks |
| Commentary | Narrative context | Structured sidenotes |

## Content Structure

```markdown
## §4.2 The Yield Criterion

$$J_2 = \frac{1}{2} \mathbf{s} : \mathbf{s} > \tau_y^2$$

:::diagram:yield-criterion
[ASCII or SVG diagram showing stress threshold]
:::

**What this means:**

When the second invariant of the deviatoric stress tensor exceeds the material's yield stress squared, the clay enters a plastic state.

:::sidenote:Why this matters:
Centering only works because repeated rotation drives J₂ above τᵧ².
:::
```

## Tasks

### TASK-001: Fix ASCII Diagram Rendering
- Keep `<pre>` blocks for perfect text rendering
- Use `figure.full-width` for wide diagrams
- Document ASCII-compatible arrows (`->`, `=>`)

### TASK-002: Add Explanation Block Syntax
- Create `:::explanation` block processor
- Render as styled prose block
- Support markdown inside

### TASK-003: Structured Sidenote Titles
- Extend `:::sidenote` to accept title: `:::sidenote:Title`
- Render title in bold or small-caps

### TASK-004: Diagram Wrapper
- Support `:::diagram:name` for SVG/image embedding
- Export diagrams to dist/diagrams/

### TASK-005: Document Conventions
- Create authoring guide for multi-modal content
- Include examples for each mode

## Effort Estimate

| Task | Hours | Priority |
|------|-------|----------|
| Fix ASCII rendering | 1 | P1 |
| Explanation blocks | 1 | P1 |
| Structured sidenotes | 1 | P1 |
| Diagram wrapper | 1 | P2 |
| Documentation | 1 | P2 |
| **Total** | **5** | |

## Dependencies

- `src/commands/build.ts` — Build pipeline
- `src/agents/diagrams.ts` — Diagram processor
- `playbooks/penrose-book-playbook.md` — Existing conventions

## Out of Scope

- General-purpose tensor diagram tooling
- LaTeX-to-SVG conversion
- Interactive diagrams
- Automated diagram generation
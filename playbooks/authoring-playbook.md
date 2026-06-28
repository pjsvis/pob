# Authoring Playbook — Multi-Modal Content Conventions

## Purpose

Document the four representation modes available to authors, the custom block syntax the build supports, and the reader journey each mode serves. This is the reference for anyone writing book chapters, essays, or demos in this repo.

**Authoritative source for behaviour:** `build.ts` `processCustomBlocks()`, `renderKaTeX()`, and `src/agents/diagrams.ts`. If this playbook and the code disagree, the code is right — fix the playbook.

---

## The Four Representation Modes

Every concept in the book can be presented in up to four modes. The reader's journey is **equation → diagram → explanation → commentary**. Not every concept needs all four; but when a concept is hard, offering multiple modes is how the reader forms a robust mental model.

| Mode | Purpose | Implementation | Custom block? |
|------|---------|---------------|---------------|
| **Equation** | Precise, formal | KaTeX (server-side, `$...$` inline, `$$...$$` display) | No — standard math syntax |
| **Diagram** | Visual relationships | Hybrid ASCII→SVG pipeline (ADR-002) | No — fenced code block with structural tokens |
| **Explanation** | Plain English: "what this means" | `:::explanation` block | Yes |
| **Commentary** | Narrative context, asides | `:::sidenote` block | Yes |

Two further blocks — `:::newthought` and `:::figure` — support structural and figural conventions. All are documented below with syntax and examples.

---

## 1. Equations (KaTeX)

Write standard LaTeX inside `$...$` for inline and `$$...$$` for display. KaTeX renders server-side at build time; the reader gets zero-latency typeset math.

```markdown
The Jacobian $J^i_a = \frac{\partial x^i}{\partial q^a}$ maps joint velocities to task space.

$$\sigma_{ij} = C_{ijkl}\,\varepsilon_{kl}$$
```

**Conventions (match the staved-finger essay):**
- Subscripts use `_`, superscripts use `^`, multi-token groups are braced: `g_{ij}`, `\mathcal{L}_{\mathbf{v}}`.
- `\boldsymbol` for tensor symbols (`\boldsymbol{\sigma}`), `\mathbf` for vectors (`\mathbf{F}`).
- Display equations are single-line `$$...$$` (the build does not parse standalone-delimiter multi-line blocks).

**Do not** introduce notation the book doesn't already use — match the existing conventions. If you're writing a new chapter, check the staved-finger essay first.

---

## 2. Diagrams (Hybrid ASCII→SVG)

Write plain ASCII inside a fenced code block (no language tag). If the block contains at least one structural token (a node `o □ △`, a matrix stamp `◇ Δ ⊚`, a half-space `---`, a d'Alembertian `▱`, or a contraction `⟲`), the build parses it into true SVG primitives. If it doesn't, it falls back to a styled `<pre>` (monospace text).

```markdown
```
↓     ↓
o ──── o
---
```
```

See `playbooks/diagram-infrastructure-playbook.md` for the full symbol set, the gating rule, and the authoring workflow. **Do not** use Mermaid for new diagrams — it renders as a placeholder only.

### Named diagram references (`:::diagram:name`)

For embedding a **pre-rendered SVG** (e.g. a reviewed diagram exported to `dist/diagrams/`) with a named reference and a caption, use the `:::diagram` block. This complements the fenced-block pipeline: use the fenced block for inline ASCII authoring, use `:::diagram:name` to reference an already-generated SVG file.

**Syntax:**
```markdown
:::diagram:yield-criterion
The yield criterion: the distortional energy exceeds the threshold.
:::
```

**Rendered:**
```html
<figure class="diagram" data-diagram="yield-criterion">
  <img src="diagrams/yield-criterion.svg" alt="The yield criterion: ..." />
  <figcaption>The yield criterion: the distortional energy exceeds the threshold.</figcaption>
</figure>
```

The build looks up the SVG at `diagrams/<name>.svg` (relative to the built page). The block content becomes both the `<figcaption>` and the `alt` attribute (for accessibility). Use this when a diagram has been exported, reviewed, and you want to reference the stable, named version rather than re-rendering the ASCII inline.

---

## 3. Explanation blocks (`:::explanation`)

The explanation mode gives the plain-English meaning of an equation or diagram. The build wraps it in a styled div with a "What this means:" label.

**Syntax:**
```markdown
$$J_2 = \frac{1}{2} \mathbf{s} : \mathbf{s}$$

:::explanation
The yield criterion says that the material fails when the distortional energy — the shear-only part of the stress — exceeds a threshold. The colon operator is the double contraction: sum over both indices of the product.
:::
```

**Rendered:**
> **What this means:** The yield criterion says that the material fails when the distortional energy — the shear-only part of the stress — exceeds a threshold. The colon operator is the double contraction: sum over both indices of the product.

**When to use:** after an equation or diagram that a general reader cannot be expected to parse on sight. Keep it plain — no new notation, no math. If you need math in the explanation, you need a second equation, not a longer explanation.

---

## 4. Sidenotes / commentary (`:::sidenote`)

The commentary mode carries narrative context, asides, and historical notes that the main thread doesn't need but the curious reader wants. The build wraps it in an `<aside>`.

**Syntax (with title):**
```markdown
:::sidenote:The Poynting Effect
The Poynting effect is named for John Henry Poynting, who in 1909 showed that a twisted wire lengthens. It is a second-order effect: the extension is proportional to the square of the twist, which is why it vanishes for small twists and dominates for large ones.
:::
```

**Syntax (without title):**
```markdown
:::sidenote
A note that doesn't need a heading.
:::
```

**When to use:** for context that enriches but isn't load-bearing. If the reader skips every sidenote and still understands the chapter, the sidenotes are doing their job. If a sidenote is required reading, it belongs in the main text.

---

## 5. New-thought blocks (`:::newthought`)

Marks a paragraph as a new turn in the argument — a shift of register, a fresh thread. The build wraps it in a styled div (typically a small-caps lead-in or an indent).

**Syntax:**
```markdown
:::newthought
There is a second way to read the same equation.
:::
```

**When to use:** sparingly. If every section opens with a newthought, none of them do. Reserve it for the moments where the argument genuinely turns.

---

## 6. Figures (`:::figure` and `:::margin-figure`)

### Full-width figures with numbering

**Syntax:**
```markdown
:::figure:4.2:Coordinate transformation
[ASCII diagram or content here — code fences are stripped automatically]
:::
```

The build strips outer triple backticks from the content, wraps it in `<pre><code>`, and emits `<figure class="full-width">` with a numbered caption ("Figure 4.2: Coordinate transformation"). Use the `N.M` numbering that matches the chapter and section.

### Margin figures

**Syntax:**
```markdown
:::margin-figure:A small caption
[content]
:::
```

Emits `<figure class="margin-figure">` with a caption. Use for small diagrams that sit alongside the text rather than breaking it.

**Note:** For new Penrose-style tensor diagrams, prefer the hybrid ASCII→SVG pipeline (mode 2) over the `:::figure` block. The figure block is for verbatim content (code, pre-formatted text) that needs a caption; the hybrid pipeline is for diagrams that should render as crisp SVG.

---

## Not yet implemented

The `content/grad-div-curl-demo.md` demo proposes `:::grad`, `:::div`, and `:::curl` blocks for vector-calculus narratives. These are **not implemented** in `processCustomBlocks()` — they render as raw text. Do not use them in content until they are implemented; use `:::explanation` instead.

---

## The reader journey (how the modes combine)

A hard concept arrives in the reader's mind most reliably when it is presented in more than one mode, in sequence:

1. **Equation** — the precise statement. Dense, beautiful, potentially opaque.
2. **Diagram** — the geometric relationship. The equation's shape, made visible.
3. **Explanation** — the plain-English meaning. "What this says is…"
4. **Commentary** — the context, the history, the aside. Optional; enriches but doesn't load-bear.

Not every concept needs all four. A simple identity may need only the equation. A subtle tensor relationship may need all four. The author's judgement is which modes a given concept needs — but the default for anything with indices is equation + explanation, and the default for anything spatial is equation + diagram.

---

## Related

- `playbooks/diagram-infrastructure-playbook.md` — the hybrid ASCII→SVG pipeline
- `playbooks/style-playbook.md` — the voice (the single-voice gate applies to all four modes)
- `decisions/005-multi-modal-content-architecture.md` — the decision record
- `decisions/006-hybrid-svg-approach.md` — the diagram decision

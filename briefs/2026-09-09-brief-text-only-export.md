# Brief: Text-only export — a fourth consumer of the LaTeX source

**Date:** 2026-09-09
**Status:** Proposed (amended 2026-09-09 — pandoc finding)

---

## Objective

Produce a plain-text (Markdown) copy of the manuscript that reads in a terminal, greps as plaintext, and survives without KaTeX — without forking the manuscript or drifting the voice. The equations, which in this book take the role images play in a regular book, become figures; the inline notation Unicode-ises in place.

## Origin and framing

A re-reading of the rendered book after a decent interval ("they make good reading") prompted a question: can the book be read as text only, the way one reads source in a terminal? The manuscript source is *already* Markdown (`briefs/chapter-*.md`); the only non-text thing in it is the LaTeX math. So "text-only copy" reduces to a single question: **what happens to the math in a medium with no KaTeX?**

ADR-011 (`decisions/011-math-rendering-and-verification.md`) already settled the architecture this brief builds on: the LaTeX source string is the single source of truth; KaTeX renders it; Wolfram verifies it; renderer and verifier are orthogonal consumers that never modify the source. This brief proposes adding a fourth consumer — a **terminal/text reader** — to that set. It reads the same `briefs/chapter-*.md`, and writes to a separate `text/` directory. **Single source of truth, zero drift, no second manuscript to voice-pass.** The voice invariant is safe because the transform touches notation, not prose — a mechanical script cannot drift the staved-finger voice.

The framing reframe that makes the whole thing click is the user's own: **in this book, equations take the role of images in a regular book.** An equation is a discrete object the reader stops at — a figure, not typeset prose. That gives a clean splitting rule and, more importantly, it means the equation-as-image treatment is not a *degradation* of a text export; it is *faithful to the book's own logic*.

### The grep-fidelity tension, resolved

An earlier draft of this brief proposed hand-substituting inline math to Unicode (`$\boldsymbol{\sigma}$` → `σ`), which would change the string and break grep-fidelity against the source. The tension was real: ADR-011's "LaTeX source is the source of truth" plus the Minimal-AI-tech-stack receipt (arXiv 2605.05242 — grep-over-plaintext *is* the retrieval layer) implies the source string should be grep-stable.

The resolution, settled by the user: **`text/` is a reading artifact, not a retrieval index.** The source in `briefs/` remains the grep target and is untouched; the text export is a generated reading copy where readability wins over string-identity. Two different purposes, two different strings, no conflict. Raw LaTeX in the reading copy is dismissed as "not really very useful" — the reader wants symbols, not source. This is the correct trade *for a reading copy*, and it does not touch the source's role as the retrieval layer.

## Ground truth (measured, not guessed)

- **Source:** `briefs/chapter-*.md` + `briefs/appendix-*.md`. Plaintext + LaTeX math spans.
- **Math inventory:** 41 display equations (`$$…$$`), ~225 expressions total across 24 chapters.
- **Distinct LaTeX vocabulary:** ~25 commands — `\mathbf`, `\boldsymbol`, `\sigma`, `\partial`, `\Omega`, `\nabla`, `\frac`, `\to`, `\cdot`, `\le`/`\ge`/`\neq`, `\in`, `\int`, Greek letters, one `pmatrix` (the ch-00 stress tensor), `\begin{pmatrix}`.
- **Existing parser:** `scripts/extract-display-equations.ts` already pulls every math span via the shared `extractMath()` from `build.ts`. One parser, not two — ADR-011's discipline. (Still useful for identifying which display equations are the structural residue; see below.)
- **Existing macros:** `MACROS` table (`build.ts:187`) defines `\grad`→`\nabla`, `\curl`→`\nabla\times`, `\divergence`→`\nabla\cdot`. Pandoc expands these natively.
- **Existing figure pattern:** `:::figure:N.N:caption … :::` and `:::diagram:name … :::` blocks (`build.ts:112–139`). The text export should render these as plain figure references, not invent a new block.

## The pandoc finding — and what it collapses

**`pandoc`** (Homebrew, already at `/opt/homebrew/bin/pandoc`) does LaTeX→Unicode natively via `-t plain`. Tested against the whole corpus:

- **All inline math converts cleanly.** `$\boldsymbol{\sigma}$` → `σ`, `$\mathbf{E} \to \mathbf{0}$` → `E → 0`, `$\Omega$` → `Ω`. Bold/boldsymbol weight is dropped (the correct call — the prose already says "the stress tensor σ"); subscripts become `_(ij)`, `_(green)`; Greek and operators map to BMP Unicode.
- **31 of 41 display equations convert cleanly.** `$$\nabla \cdot \boldsymbol{\sigma} = \mathbf{0}$$` → `∇ ⋅ σ = 0`. `$$\Omega_{\text{green}} = \{\mathbf{x} \in \Omega : C(\mathbf{g}(\mathbf{x})) \le C_{\text{green}}\}$$` → `Ω_(green) = {x ∈ Ω : C(g(x)) ≤ C_(green)}`.
- **The 10 failures are exactly the structural residue** — and *only* the structural residue. Every failure contains `\frac` or `\begin{pmatrix}`:

```
\sigma_{ij} = \begin{pmatrix} ... \end{pmatrix}     (the ch-00 stress tensor)
\nabla f = \left(\frac{\partial f}{\partial x}, ...\right)
\nabla \cdot \mathbf{F} = \frac{\partial F_x}{...} + ...
\nabla \times \mathbf{F} = \left(\frac{...}{...}, ...\right)
\mathbf{E}_L = \frac{1}{2}(\mathbf{F}^T \mathbf{G}_L \mathbf{F} - \mathbf{I})
E_{zz} = \frac{1}{2}R^2\alpha^2
\sigma_{\theta} = \frac{P \cdot R}{t}
\sigma_{\text{axial}} = \frac{T + (F_{\text{impact}} \cdot \sin\theta)}{A}
P_{\text{tunnel}} = \frac{T}{R \cdot w}
\frac{\partial u}{\partial t} = -u + f(w \cdot u + I_{\text{alarm}})
```

Fractions and one matrix. Nothing else. Pandoc emits these as raw `$$…$$` with a visible warning — the failure mode is exactly the 10 the architecture predicted would need the image path. **The hand-built ~25-entry Unicode substitution table proposed in the earlier draft is deleted. Pandoc is the table, maintained and correct.**

## The split (revised)

| Class | Count | Treatment | Rationale |
|---|---|---|---|
| **Inline math** (`$…$`) | all | **Pandoc → BMP Unicode in place.** | Pandoc handles all of it. ~90% of the symbol vocabulary maps to Unicode any Nerd Font / JetBrains Mono / DejaVu renders cleanly. Bold weight dropped (typeset cue, not semantic). |
| **Display equations, non-structural** (`$$…$$` without `\frac`/`pmatrix`) | 31 | **Pandoc → Unicode, rendered as a centered block.** | Pandoc converts these cleanly. No image needed; the terminal renders ∇ ⋅ σ = 0 legibly. |
| **Display equations, structural** (the 10 with `\frac` or `pmatrix`) | 10 | **Pre-rendered SVG figure, linked with LaTeX alt-text.** | Fractions and matrices have no text form. These *are* the book's images. |

## The image path — scoped to 10, not 41

The earlier draft proposed MathJax `tex2svg` for all 41 display equations. The pandoc finding scopes it to 10. At 10 equations, a cheaper option than a new math engine surfaces: **render them once via the existing KaTeX HTML build** (screenshot or browser-SVG-capture), commit the 10 SVGs to `text/eqs/`, and have the script link to them. No new runtime dependency for the image path; the 10 images are authored artifacts, like the diagrams in `diagrams/*.svg` already are.

This fits the project's existing diagram pipeline (`:::diagram:name` → pre-rendered SVG committed to the repo) better than a new math engine does. The 10 residual equations become, effectively, 10 more diagrams — produced once, reviewed, committed, linked by name. The receipt for *not* automating their regeneration: there are 10 of them, they change rarely, and a human reviewing a rendered equation before it ships is the applecart principle in action.

**KaTeX does not emit SVG.** Its `output` option (`node_modules/katex/types/katex.d.ts:82`) is `"html" | "mathml" | "htmlAndMathml"` — no SVG mode. So the one-off render of the 10 residuals needs either a headless-browser SVG capture of the KaTeX HTML, or a one-shot MathJax `tex2svg` pass. Both are one-off authoring steps, not build dependencies. The brief recommends whichever is less ceremony at authoring time; the result (10 committed SVGs) is the same either way.

## Numbering — in the export, not the source

ADR-011 notes zero `\tag`/`\label`/`\eqref` in the corpus and flags `:::equation:N.N:` as a *deferred* source-level formalisation. **This brief does not touch the source.** Equation numbering is a presentation concern of the text-export consumer: the script assigns sequential numbers (`Eq 13.1`, `Eq 13.2` …) per chapter as it emits the figures, derived from `extractMath()` order. The source stays unnumbered. If a future session wants source-level numbering, that is its own brief — and ADR-011 already names the trigger.

## Scope and shape of the deliverable

- **A script:** `scripts/export-text.ts` (TypeScript, Bun — the project's sole runtime per `dependencies.md`). Reads `briefs/chapter-*.md` + `briefs/appendix-*.md` in book order; shells out to `pandoc -f markdown -t plain` for the math→Unicode pass; identifies the 10 structural display equations via `extractMath()` (those containing `\frac` or `\begin{pmatrix}`) and substitutes them with figure links to the pre-rendered SVGs; emits `text/chapter-NN-*.md`.
- **An output directory:** `text/`. **Tracked, not build-ignored.** This is a generated artifact for reading, not a dump; tracking it makes the export reproducible and reviewable. The script is the source of truth; `text/` is committed so a reader can read it without running the script. (Open: if `text/` grows noisy in git, switch to generated-on-demand and gitignore — a cheap reversal.)
- **The 10 residual SVGs:** `text/eqs/eq-NN-M.svg`, authored once, committed. Linked as `![Eq 13.1](eqs/eq-13-1.svg "σ_ij = begin{pmatrix} ... end{pmatrix}")` — alt text carries the LaTeX source for grep-ability of the figure reference.
- **Custom blocks:** `:::figure:`, `:::diagram:`, `:::margin-figure:`, `:::explanation`, `:::newthought` — render to their text equivalents (figure caption + reference; diagram → reference to the existing `diagrams/*.svg`; explanation → blockquote; newthought → bold lead). No new block syntax invented.
- **Front matter / part dividers / index:** `content/` is build-scanned; the text export should include front matter and part dividers in reading order. The index is a rendered artifact — omit it from the text export (it has no meaning without the HTML TOC).

## Tooling — what enters `dependencies.md`

| Tool | Role | Where it lives |
|---|---|---|
| `pandoc` | LaTeX→Unicode for the body (inline + 31/41 display) | `dependencies.md` → Tools (external, like WeasyPrint). Already installed. |
| `bun` + `typescript` | The export script itself | Already the sole runtime. |
| The 10 residual SVGs | Authored artifacts, committed | `text/eqs/`, like `diagrams/*.svg`. No dependency. |

**No new runtime dependency. No new math engine in the build.** Pandoc joins WeasyPrint as an external tool used by a generation step, not a runtime consumer of the book. The book build (`just build`) is unchanged.

## What this brief explicitly does NOT do

- **Does not fork the manuscript.** One source, four consumers. The text export is read-only over `briefs/` + `content/`.
- **Does not touch the voice.** Prose passes through untouched. The transform is notation-only. The voice invariant is held by the source, not re-applied.
- **Does not add equation numbering to the source.** Numbering is consumer-side presentation only.
- **Does not wire itself into `just build`.** This is a one-off script + committed artifact, not a permanent build track. Per *incremental formalisation*: formalise at the second occurrence, not the first. The first occurrence is one reader (the author, re-reading with curiosity after an interval). If a second use appears — a second reader, a grep-based retrieval need, a NotebookLM re-ingest, a terminal-diff review workflow — *then* promote to `just build` (a `just text` target). Until then the script carries its own receipt and the artifact is committed.
- **Does not preserve grep-fidelity in the reading copy.** The text export is a reading artifact, not a retrieval index. The source in `briefs/` remains the grep target. (See "The grep-fidelity tension, resolved" above.)

## Principles engaged

- **Minimal AI tech stack.** A second output format is stack growth. The receipt — "so the book can be read and grepped as plain text" — is real but soft. The brief holds the line: one-off script, not a build track; pandoc is an external tool already on the machine (like WeasyPrint), not a runtime dependency; the 10 residual images are authored artifacts, not a regenerated pipeline. Promotion to the build is a separate decision with a named trigger.
- **Incremental formalisation.** One reader, once. Build the script and the artifact; do not formalise the track until the second occurrence. The pandoc pass and the 10-image residual path are each formalised *because the work demands them* — pandoc because the body needs Unicode substitution, the 10 images because fractions and matrices have no text form.
- **The applecart principle.** A text reader who hits a tofu glyph or a broken figure reference has left the room. Pandoc's output is BMP Unicode that renders in any decent terminal font; the 10 structural failures fall through to visible figure links (not silent degradation), and pandoc's warnings surface any future equation that joins the residual set.
- **Memory vs documentation.** The export is generated from the documented source in git, not from any model's memory of "how we wrote it." The script is auditable; the artifact is diffable.

## Decision points (the things that need a yes/no)

1. **Proceed at all?** The receipt is soft (one reader, curiosity). The honest position: this is worth building because the script is cheap, the artifact is committed and reviewable, and the architecture keeps it drift-free. But it is not urgent.
2. **Pandoc as the math→Unicode engine?** Recommended. Already installed; handles all inline + 31/41 display cleanly. Replaces the hand-built table entirely.
3. **The 10 residuals as committed SVGs (one-off authoring) vs a MathJax `tex2svg` regeneration step?** Recommended: committed SVGs. Fits the diagram pipeline; no new math engine; 10 equations don't justify a regeneration dependency.
4. **`text/` tracked or gitignored?** Brief recommends tracked (reproducible, reviewable); cheap to reverse.
5. **Promote to `just build` now or defer?** Brief recommends defer. Named trigger: a second distinct use.

## Next step (per the perturbation protocol)

This brief is the *note* and *investigate* phase, now amended with the pandoc finding. The gate between this and *touch* is the assessment: the five decision points above. On agreement, the build is a single script (`scripts/export-text.ts`), 10 pre-rendered SVGs, and a committed `text/` directory — small, bounded, one consumer. No source changes, no voice pass, no build-track wiring unless promoted.

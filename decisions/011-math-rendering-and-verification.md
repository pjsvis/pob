---
id: dec-011-math-rendering-and-verification
date: 2026-07-31
status: accepted
title: "Math rendering and verification — KaTeX retained, Wolfram for correctness, online checkers assessed"
---

# ADR-011: Math rendering and verification — KaTeX retained, Wolfram for correctness, online checkers assessed

## Context

A review of [katex.org](https://katex.org/) prompted two questions that this record settles: (1) is KaTeX still the right math renderer for pob, and (2) does anything about KaTeX affect how we *verify* equations on the Wolfram site — and is there a better "online CAS format checker" we should be using instead?

pob's current pipeline (`build.ts`): `marked` parses Markdown; KaTeX renders server-side via a regex pre-pass (`renderKaTeX`, line 150) that replaces `$$…$$` and `$…$` with KaTeX HTML *before* `marked` sees the text; `throwOnError: false` turns broken LaTeX into a visible `<span class="katex-error">`; KaTeX CSS and fonts are vendored to `dist/` (lines 365–379). The LaTeX source lives in plaintext in `briefs/chapter-*.md`. KaTeX is pinned at `^0.17.0` (`dependencies.md`). ADR-009 already retained `marked` + KaTeX against the Sätteri alternative; this record does not re-litigate that. The project's concrete *correctness*-verification path — the `pi-mathematica-verify` Pi extension (`briefs/2026-07-09-brief-mathematica-verify.md`, built in `cool-pi-extensions`) — routes tensor-algebra claims through Wolfram Mathematica with a lookup-first registry and a planned build-gate. This record covers what neither ADR-009 nor that brief does: the *rendering* architecture (the katex.org review), the conceptual separation of renderer from verifier, and the online-checker landscape.

## Findings

### 1. KaTeX is the renderer and the right choice; katex.org confirms it

The landing page's four selling points — fast, print-quality, self-contained, server-side rendering — are all realised in the pipeline. The self-hosting of CSS + fonts is a hard-won fix documented in the code: a prior CDN link, when it failed to load, left MathML unhidden and every inline expression doubled (`E E`, `Ω Ω`). The receipt ("synchronous SSR, browser-independent output") holds. No case to switch.

### 2. The renderer is downstream of the source; Wolfram is a parallel consumer, not a downstream one

This is the load-bearing conceptual point. The LaTeX source string in `briefs/chapter-*.md` is the source of truth. It has three independent consumers: **KaTeX** renders it, **Wolfram** checks it, **the reader** reads it. KaTeX never modifies the source. Picking KaTeX changed only rendering; Wolfram verification is unaffected and would be equally unaffected under MathJax or no renderer at all. The question "can we still check on Wolfram with KaTeX" is answered by the architecture, not by KaTeX: yes, because verification operates on the source string KaTeX never touches.

### 3. The constraint on Wolfram ingestion is the LaTeX dialect, not the renderer

Our LaTeX is typesetting-flavoured (`\mathbf`, `\boldsymbol`, `\,`, `\displaystyle`, `\quad`). KaTeX needs these for appearance; Wolfram's LaTeX parser ignores or chokes on pure-cosmetic commands. This is a property of how we *author*, not how we *render* — unchanged by KaTeX. The strongest ingestion bridge is Mathematica's `ToExpression["…", TeXForm]` (Wolfram Cloud, free tier), which consumes the source string directly — but this bridge is *necessary, not sufficient* for tensor work: Mathematica parses `\sigma_{ij}` to `Subscript[σ, i j]`, a display form, not a tensor with index structure. This is precisely why `pi-mathematica-verify` ships a domain-specific LaTeX→Wolfram-Language translator rather than relying on `TeXForm` alone.

### 4. KaTeX gaps surfaced by the review (all latent, none acute)

- **No equation numbering / `\ref` cross-referencing.** KaTeX does not number; pob adds nothing (zero `\tag`/`\label`/`\eqref` in the corpus). If numbering is ever wanted, an `:::equation:N.N:` custom block mirroring the existing `:::figure:` pattern (`build.ts:114`) is the natural incremental formalisation.
- **No automatic line-breaking.** The one real print-quality risk versus MathJax (which can break). Currently latent: the corpus's equations are short (one `pmatrix`, zero `aligned`/`gather`/`cases`). It bites the moment a long governing equation lands — HTML scrolls, **WeasyPrint clips**. KaTeX-side mitigation is manual `\\` inside `aligned`.
- **No shared `macros` table.** `renderToString` is called with no `macros`; continuum-mech shorthand is written longhand each time, inviting drift. Cheap to add.
- **`throwOnError: false` with no build-time check.** A broken equation ships as a `.katex-error` span and nothing fails. For a book in production this is backwards — the check belongs in the build.

### 5. "Online CAS format checker" is two different checks; neither is the right tool for our pipeline

- **Renderer check ("will it render?").** The authoritative ad-hoc tool is KaTeX's own demo page (`katex.org/#demo`) — same dialect as the build, reports parse errors live. Third-party editors (`0x0bee.com`, `texlens.com`) wrap the same engine; several run `throwOnError: false` and *hide* errors, making them editors, not checkers. But the strictly better home for this check is **in the build**: we already ship KaTeX and have `scripts/extract-display-equations.ts` pulling all 225 expressions out — a render-pass asserting zero `.katex-error` spans checks the whole corpus at once, against the exact build version. Going online for it, one expression at a time, is a regression.
- **Correctness check ("is the math right?").** The project's chosen path is the `pi-mathematica-verify` harness — Mathematica (Cloud API Phase 1, local `wolframscript` + xAct kernel Phase 2), registry-first, chosen because it is "a judge that is not impressed by prose." Ad-hoc Wolfram Alpha paste remains the manual backstop. **SymPy Gamma** (`sympygamma.com`) was assessed as the open fallback and **rejected for our content specifically**: its `sympy.parsing.latex.parse_latex` is documented as *experimental*, and the Lark backend **does not support matrices** (`\begin{pmatrix}`/`bmatrix`/`array`) — and our chapter-00 stress tensor is exactly a `pmatrix` — nor higher-order or multi-variable partial derivatives. It cannot serve as the verification engine; it corroborates the choice of Mathematica.
- **Cortex Compute Engine / MathLive** (`expr.isValid` / `expr.errors`) is the closest thing to a true format checker with a semantic tree, but it is not a CAS, is a new dependency on a different stack, and verifies *well-formedness*, not *correctness*. Not adopted.

## Decision

1. **Retain KaTeX as the math renderer.** Confirmed by the katex.org review; no switch to MathJax, Sätteri-math, or any alternative.
2. **Affirm the two-consumer verification architecture:** the LaTeX source is the source of truth; KaTeX renders it; Wolfram verifies its correctness. Renderer and CAS are orthogonal — a change to one never touches the other. The concrete realisation of the correctness consumer is the `pi-mathematica-verify` harness; this record affirms the architecture that harness assumes.
3. **Do not adopt** SymPy Gamma, online CAS checkers, or the Cortex Compute Engine for verification.
4. **The renderer-check belongs in the build, not online** — recorded as a noted action under incremental formalisation (formalise at the second occurrence, not the first), not executed in this record.

Grounded in the same load-bearing principles as ADR-009:

- **Minimal AI tech stack** — KaTeX's receipt ("synchronous SSR, print-quality, self-contained") holds; SymPy Gamma, online checkers, and the Compute Engine solve problems pob does not have.
- **Incremental formalisation** — a build-time render-check, a `macros` table, equation numbering, and line-breaking are each justified only when the work demands them. None is demanded by a current failure; each has a named trigger below.

## Consequences

No dependency change. `build.ts` is unchanged. The Wolfram verification workflow is unchanged. This record exists so a future session asking "does KaTeX affect our Wolfram checking?" or "is there an online CAS checker we should use?" finds the settled position rather than re-deriving it.

The latent KaTeX gaps (numbering, line-breaking, macros, build-time check) are now on record as *deferred* actions with explicit triggers, not as oversights.

### Trigger conditions for revisiting (the "why we would")

- **A long display equation overflows a PDF proof** (WeasyPrint clips it). At that point MathJax re-enters the consideration set for its automatic line-breaking; the first response is manual `\\` inside `aligned`. See ADR-001 for the PDF engine.
- **Equation numbering or `\ref` cross-referencing is wanted.** Add an `:::equation:N.N:` block mirroring `:::figure:`. If KaTeX's lack of numbering becomes the friction, revisit.
- **Repeated cosmetic-LaTeX friction when pasting to Wolfram.** The `pi-mathematica-verify` translator already absorbs the book's notation conventions; if *manual* paste friction grows (outside the harness's curated registry), wire a cosmetics-stripped dump out of `scripts/extract-display-equations.ts`.

### Noted, unactioned actions (cheap; do at the second occurrence)

These are *renderer-level* only. The *correctness* build-gate is owned by `pi-mathematica-verify` (its Phase 4) and is not duplicated here.

- Add a shared `macros` object to `renderKaTeX` for continuum-mech shorthand.
- Add a build-time assertion that zero `.katex-error` spans survive rendering (distinct from — and simpler than — the harness's symbolic gate).

## Humean caveat

The decision does not rest on SymPy's specifics — KaTeX is retained and Wolfram is the correctness checker regardless of what SymPy Gamma can parse. The finding that `parse_latex` (Lark backend) cannot handle matrices or higher-order/multi-variable partials is from the SymPy 1.14 documentation read via search on 2026-07-31; if the Lark parser has since added matrix support, SymPy Gamma's viability as a fallback should be re-checked, but the *primary* decision is unaffected. The KaTeX gap analysis (numbering, line-breaking, no macros) was read against `build.ts` and the corpus directly.

## Related

- `decisions/009-satteri-markdown-parser-assessment.md` — adjacent "assess and retain/decline" record; also retained `marked` + KaTeX. Same structure, same principles.
- `decisions/001-weasyprint-for-pdf.md` — the PDF engine; relevant to the line-breaking-in-PDF risk (finding 4).
- `briefs/2026-07-09-brief-mathematica-verify.md` — the project's correctness-verification harness (the concrete realisation of the Wolfram consumer); this record frames its architecture and does not duplicate its plan.
- `build.ts` lines 2, 150–170, 365–379 — the KaTeX pipeline this record retains.
- `scripts/extract-display-equations.ts` — the equation extractor (cosmetics-stripped-dump and render-check hook).
- `dependencies.md` — `katex ^0.17.0`.
- `AGENTS.md` → "Minimal AI tech stack", "Incremental formalisation" — the principles the decision rests on.
- Sources read 2026-07-31: <https://katex.org/>, SymPy parsing docs (`docs.sympy.org/latest/modules/parsing.html`), `sympy/sympy_gamma` README, Cortex Compute Engine LaTeX-syntax docs (`mathlive.io/compute-engine/guides/latex-syntax/`).

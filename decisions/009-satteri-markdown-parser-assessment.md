---
id: dec-009-satteri-markdown-parser-assessment
date: 2026-06-30
status: accepted
title: "Sätteri as a markdown parser — assessed, not adopted"
---

# ADR-009: Sätteri as a markdown parser — assessed, not adopted

## Context

[Sätteri](https://satteri.bruits.org/) (reported as built by an Astro team member) is a Markdown processing pipeline: a Rust parser built on `pulldown-cmark`, exposed to JavaScript through `napi-rs`, with a TypeScript plugin layer. It parses to MDAST and converts to HAST before serialising to HTML — the same AST shapes as `mdast-util-from-markdown` / `mdast-util-to-hast`, so the model is familiar to anyone who has used remark/rehype, though the plugin API is explicitly **not** compatible with unified (existing remark/rehype plugins do not run unmodified). It advertises math support via a `features.math` flag.

pob's current pipeline (`build.ts`): `marked` parses Markdown; KaTeX renders server-side via a regex pre-pass (`renderKaTeX`, line 150) that replaces `$$…$$` and `$…$` with KaTeX HTML *before* `marked` sees the text. `throwOnError: false` turns broken LaTeX into a visible red `<span class="katex-error">`; KaTeX CSS and fonts are copied to `dist/` (lines 365–379). No client-side rendering, no macros, no equation numbering, no `\label`/`\ref` cross-referencing — the last forbidden explicitly by the math-rendering brief.

The question: does Sätteri support the math work pob does, and should it replace `marked`?

## Findings

### 1. Sätteri parses math; it does not render it

`features.math` recognises `$$…$$` display and `$…$` inline delimiters and emits MDAST math nodes. That is the entirety of its math surface. There is no KaTeX, no MathJax, no MathML output, no equation numbering, no macros, no cross-referencing. Rendering is, by the project's own pattern (see how it handles directives in the Divergences page), "up to a plugin" — and because the plugin API is not remark-compatible, `rehype-katex` cannot drop in. A migration would require a hand-written HAST visitor calling `katex.renderToString`, i.e. rebuilding the renderer pob already has.

The one genuinely considered affordance is `singleDollarTextMath: false` — keep `$$` working while treating single `$` as literal currency. Real, but narrow.

### 2. pob's "cool things" are mostly the renderer, which Sätteri does not touch

The KaTeX-via-regex pipeline is small (≈20 lines) and carries its own receipts: server-side rendering (no client JS, per the math-rendering brief's explicit constraint), `throwOnError: false` (corruption is legible, the build never crashes), and CSS/fonts vendored to `dist/`. Sätteri would replace only the 12-line regex *parser*; pob would still own the KaTeX *renderer* either way. The two stacks barely overlap.

### 3. The math pain pob has actually fought is editorial, not parser-level

`briefs/2026-06-28-brief-math-rendering-pass.md` documents the real problem: Gemini HTML extraction corrupted LaTeX across all 21 chapters (`*` where `_` / `^` should be, missing braces around groups). That is source corruption — a content problem no markdown parser touches. Adopting Sätteri would not have prevented or repaired a single instance of it.

### 4. The one honest architectural merit is unpurchased

An AST pipeline renders math *after* the tree is built, so KaTeX HTML never passes through `marked`. The current regex-before-`marked` approach is slightly fragile by comparison (KaTeX output rides through the Markdown parser). But pob has not felt this as pain — the regex has not broken on the 21-chapter corpus. The merit is real; it is unpurchased.

### 5. What is genuinely good about Sätteri (noted, not dismissed)

The engineering is serious: native binaries via `napi-rs` with a WASI fallback, the same AST shapes as the unified ecosystem, MDX with `optimizeStatic` (the Astro-originated static-subtree collapse), and at least one real improvement over remark — the smart-punctuation pairing across inline nodes, which `remark-smartypants` gets wrong (it leaves straight quotes when an inline node splits a pair). This is a project worth knowing about. The assessment is "not now, not for this," not "not good."

## Decision

**Do not adopt Sätteri. Note it as the candidate if the SSG ever migrates to an AST pipeline.**

Grounded in two load-bearing principles from `AGENTS.md`:

- **Minimal AI tech stack** — "strip the stack back at every fresh start; discard what the substrate has made unnecessary." `marked`'s receipt ("it parses our markdown") still holds; Sätteri's receipt ("fast, correct parsing for the JS ecosystem") solves a problem pob does not have.
- **Incremental formalisation** — "add what the work demands, when it demands it; formalise at the second occurrence, not the first." A parser migration is not demanded by any current failure; the first occurrence of parser-level pain has not arrived.

The decision is deliberately reversible and time-boxed by trigger conditions, not by calendar.

## Consequences

Sätteri is not added to `package.json`. `build.ts` is unchanged. This record exists so a future session evaluating a parser migration finds the prior assessment rather than re-deriving it from scratch.

### Trigger conditions for revisiting (the "why we would")

Adoption becomes justified when *any* of the following lands — at that point Sätteri is the default candidate, not a fresh survey:

- **Regex-before-`marked` breaks.** Most likely symptom: `$` inside code spans or inline code colliding with the inline-math regex, or currency in prose (`from $50 to $100`) mis-rendering. (`singleDollarTextMath: false` is Sätteri's direct answer to the latter.)
- **Equation numbering or `\label` / `\ref` cross-referencing is needed.** AST math nodes make this a tree-walk; regex makes it brittle. This is the highest-value trigger.
- **The diagram/AST work pulls the SSG toward a unified tree.** Per ADR-007, the hybrid SVG pipeline and `src/agents/diagrams.ts` already operate on structured input; a unified AST across prose + diagrams is the more likely pull than math alone.
- **MDX or component-in-Markdown becomes a real need.** Sätteri's `mdxToJs` / `evaluate` entry points and `optimizeStatic` would then carry weight pob currently has no use for.

### Cost to weigh at adoption time

- Pre-1.0: breaking changes on minor version bumps (per the Installation docs). Pin the version and track the changelog.
- Plugin rewrite: any remark/rehype plugin pob might want to reuse must be re-implemented against Sätteri's visitor API.
- Re-test the 21-chapter corpus against the new parser; the math-rendering-pass brief's browser-verification discipline applies.

## Humean caveat

The "built by an Astro team member" lineage is reported, not verified here; the decision does not rest on it. The assessment rests on what the Sätteri docs evidence directly (the `features.math` surface, the plugin-API incompatibility, the divergences from remark) and on pob's own `build.ts` and math-rendering brief — all of which were read in full on 2026-06-30. If the engineering claims above are wrong, the decision is wrong; if the authorship claim is wrong, the decision is unaffected.

## Related

- `briefs/2026-06-28-brief-math-rendering-pass.md` — the real math problem (source corruption, not parsing)
- `decisions/007-diagram-pipeline-assessment.md` — the adjacent "assess and retain/decline" decision; same structure, same principle
- `build.ts` lines 2, 150–170, 365–379 — the current KaTeX pipeline this decision preserves
- `AGENTS.md` → "Minimal AI tech stack", "Incremental formalisation" — the principles the decision rests on
- Source: <https://satteri.bruits.org/docs/> (features, options, plugins, asts, divergences; read 2026-06-30)

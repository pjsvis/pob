# Brief: Math Rendering Pass — Audit and Repair All KaTeX Notation

**Date:** 2026-06-28
**Status:** Open
**Related tasks:** td-2ce570 (Voice Pass — done), td-785e7b (Grad/Div/Curl explanation blocks)

## Objective

Audit every mathematical expression across the 21 chapters and the staved-finger benchmark, repair the corrupted notation so KaTeX renders it correctly, and verify the rendered output in the browser. Where an equation is too tangled to repair in place, recreate it from scratch from the chapter's prose meaning.

## Context

The chapter drafts were extracted from Gemini HTML exports, and the extraction mangled LaTeX subscripts and superscripts. The dominant corruption: **`*` where `_` (subscript) or `^` (superscript) should be**, and missing braces around subscript/superscript groups. Examples from the live chapters:

- Ch04: `$$\mathcal{L}*{\mathbf{v}} g*{ij} = \nabla_i v_j + \nabla_j v_i$$` — the `*` should be `_` (`\mathcal{L}_{\mathbf{v}} g_{ij}`).
- Ch06: `$$\mathbf{g}*{\text{upright}}(t) = \mathbf{F}^T \tilde{g}*{ij} \mathbf{F}$$` — same `*`→`_` corruption.

The benchmark (staved-finger essay) renders correctly because it was hand-edited: `$$J^i_a = \frac{\partial x^i}{\partial q^a}$$`. The chapters do not.

A scan finds `*`-adjacent-to-subscript patterns in **all 21 chapters** (2–6 instances each), plus 29 display-math delimiters across the corpus (≈14 display equations) and an uncounted number of inline `$...$` expressions. Not every `*` is wrong (some `*` is literal, e.g. in `\boldsymbol{\sigma}_0` there is none; but `J_2`, `\sigma_{11}` etc. must be checked case by case). The corruption is not uniform — some equations are clean, some are half-corrupted, some are unreadable.

## Deliverables

1. **A full inventory** of every `$...$` inline and `$$...$$` display expression across `briefs/chapter-*.md` and `briefs/2026-06-26-staved-finger-tensor-algebra.md`, with a per-expression status: clean / corrupted / recreated.
2. **All expressions repaired** so KaTeX renders them without error. The reference for correct notation is the staved-finger essay and standard LaTeX tensor conventions (`_` subscript, `^` superscript, `{}` for multi-token groups, `\boldsymbol`, `\mathbf`, `\partial`, `\nabla`, `\frac`, `\int`, `\sum`, `\lim`, `\mathcal`, `\Omega`, `\mathbb{R}`, `\Phi`, `\sigma`, `\tau`, `\mu`, `\lambda`, etc.).
3. **Equations recreated from scratch where repair is ambiguous** — if the corruption makes the intended expression unclear, read the surrounding prose, determine what the equation *should* say, and rewrite it cleanly. Note the recreation in the inventory so a reviewer can check the math against the prose.
4. **Browser verification:** `just build`, then open `dist/contents.html` in a browser and click through every chapter. KaTeX renders server-side, so a broken expression shows as raw `$$...$$` text or a KaTeX error in red — both are visible. No expression may render as raw source or error red.
5. **Inline-math check:** inline `$...$` is harder to spot in a scan; verify a representative sample per chapter (at least the first inline expression and any inline expression containing `_`, `^`, or `\`).

## Constraints

- **Preserve the math's meaning.** This is a rendering pass, not a re-derivation. Do not change the physics — fix the notation so the existing equation renders. Recreation is allowed only when the corruption hides the meaning; in that case the recreated equation must express the same relationship the prose describes.
- **Do not change chapter prose, titles, or structure** (those are the other briefs' scope).
- **Do not introduce notation the book doesn't already use** — match the staved-finger essay's conventions. If a chapter uses `\boldsymbol{\sigma}` and another uses `\sigma`, leave each as-is unless it's broken.
- **No client-side rendering.** KaTeX is compiled to HTML at build time; the deliverable is correct source LaTeX, not a JS shim.

## Approach

1. **Inventory first.** Extract every math expression with its file, line, and surrounding context into a scratch list (a simple `rg '\$\$?\$?' briefs/chapter-*.md` plus manual review, or a small script). Do not start editing until the full list exists — editing blind risks re-introducing errors.
2. **Fix per chapter, easiest corruption first:** the `*`→`_` / `*`→`^` substitutions where the intent is obvious. Reserve judgment on ambiguous cases.
3. **Recreate the tangled ones** from the prose, marking each in the inventory.
4. **Build and browser-check.** This is the empirical step — the rendered HTML is the only honest evidence. A clean `rg` pass is necessary but not sufficient; KaTeX error messages in the browser are the ground truth.
5. **Re-scan after fixes** to confirm no `*`-as-subscript patterns remain in math contexts.

## Verification

- `just build` succeeds with no KaTeX errors in the build log.
- Browser: every chapter on `dist/contents.html` renders all display equations as typeset math (not raw `$$`), no red KaTeX error blocks.
- `rg '\*[_{a-zA-Z]|[_{a-zA-Z}]\*' briefs/chapter-*.md` returns only legitimate `*` (e.g. none inside `$...$`).
- The inventory file (commit it to `scratchpad/` or as a debrief) records clean / corrupted / recreated status for every expression, so an independent reviewer can spot-check the math against the prose.

## Notes

- The d'Alembertian (Ch references) and the grad/div/curl material (td-785e7b, td-59e1ab) share notation conventions with these chapters; coordinate with those tasks if they land first.
- If recreating an equation requires changing the prose to match (e.g. the prose says "the stress tensor $\sigma^{ij}$" but the equation uses $\sigma_{ij}$), prefer fixing the equation to match the prose — the prose is the author's voice, the equation is the formalism.
- This pass does **not** add new equations. New math (grad/div/curl blocks, the d'Alembertian chapter) is td-785e7b / td-59e1ab.

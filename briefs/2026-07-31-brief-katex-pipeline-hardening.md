# Brief: KaTeX Pipeline Hardening — macros table, zero-error gate, equation numbering

**Date:** 2026-07-31
**Status:** Closed (2026-07-31)

---

## Objective

Action the three KaTeX items left open by ADR-011 (`decisions/011-math-rendering-and-verification.md`): a shared `macros` table for `renderKaTeX`, a build-time zero-`.katex-error` assertion, and equation numbering. Each is presented as a decision point with its design and its justification, because the three do *not* share the same strength of case — and incremental formalisation says we should not pretend they do.

## Origin and framing

ADR-011 reviewed the renderer and affirmed the architecture: the LaTeX source in `briefs/chapter-*.md` is the source of truth; KaTeX renders it; Wolfram (via `pi-mathematica-verify`) verifies it. The record deferred three renderer-level actions rather than execute them inline. This brief picks them up.

The framing lens is **incremental formalisation** ("add what the work demands, when it demands it; formalise at the second occurrence, not the first and not the fifth"). Applied honestly, the three items separate into three different confidence bands:

| Item | Strength of case | Nature |
|---|---|---|
| 2. Zero-error gate | Clear win — repairs a real gap | Reparative |
| 1. Macros table | Cheap but anticipatory | Facility |
| 3. Equation numbering | Speculative — a new feature, not a fix | Additive |

The order below is confidence order, not file order.

## Item 2 — Build-time zero-`.katex-error` gate (do first)

### The gap

`renderKaTeX` (`build.ts:150`) renders with `throwOnError: false`, so broken LaTeX becomes a visible `<span class="katex-error">` and the build stays green. For a book in production this is backwards: a corrupted equation ships silently. The applecart principle — a reader feels a broken equation before anyone names it — is exactly the failure this invites.

### The change

Add a validation pass that renders every extracted expression with `throwOnError: true`, catches the `ParseError`, and fails the build with a list of `{ file, line, latex, message }` if any fail. This is **distinct from** the render pass, which keeps `throwOnError: false` for resilience — the gate checks, it does not change how the book renders. It is also **distinct from** `pi-mathematica-verify`'s Phase-4 symbolic gate: that checks *correctness*; this checks *well-formedness*. Both belong; neither substitutes for the other.

### Design notes

- Reuse the existing extraction. ADR-011 flagged that display equations are parsed in two places — the `renderKaTeX` regex (`build.ts:152`) and the line-walker in `scripts/extract-display-equations.ts` — and can drift. The gate is a third consumer of the same parsing. **Tidy-first sub-item:** extract one `extractMath(text)` function shared by render, validate, and the script, so the three cannot diverge.
- Output the failures to stderr and exit non-zero; do not silently warn. A warning is the failure mode we are removing.

### Decision needed

None — this is a clear win. Only the scope of the tidy-first parser consolidation is at the user's discretion (do it inline, or as a follow-up).

## Item 1 — Shared `macros` table for `renderKaTeX`

### The honest caveat

This is the item where the case is weakest under incremental formalisation. A `macros` table would let us write `\vF` for `\mathbf{F}`, `\grad` for `\nabla`, etc. But the corpus does not currently suffer repetition of *project-specific shorthand* — it repeats *standard LaTeX* (`\mathbf{F}`, `\nabla \cdot \mathbf{F}`, `\sigma_{ij}`) written longhand. Nobody is writing `\vF` and resenting it. So the macros table does not consolidate existing pain; it offers **forward convenience and notational standardisation**. Formalising before the second occurrence is the map-before-the-territory error, unless we decide the vocabulary is worth standardising now for a separate reason.

### The separate reason that might justify it now

`pi-mathematica-verify`'s translator maps *this book's LaTeX conventions* to Wolfram Language. A smaller, canonical notation surface means a smaller, more stable translation target, and consistent notation across chapters as the manuscript grows. If we are going to standardise, doing it before more chapters land is cheaper than retrofitting.

### The change (if adopted)

A module-scope `MACROS` object passed to both `katex.renderToString` calls in `renderKaTeX`:

```ts
const MACROS = {
  "\\grad": "\\nabla",
  "\\divergence": "\\nabla\\cdot",
  "\\curl": "\\nabla\\times",
  "\\vect": "\\mathbf",
  // …
};
```

### Decision needed

**Adopt a canonical vocab now, or defer until a shorthand is actually wanted twice.** If defer, this item closes and reopens on the trigger. If adopt, the user picks the vocab (the above is illustrative, not proposed) — and existing chapters are *not* retroactively rewritten (per the perturbation protocol: touch deliberately, one context at a time).

## Item 3 — Equation numbering

### The caveat

This is a *new feature*, not a fix. The book currently has no numbered equations and no cross-references to them; ADR-011 listed numbering under "trigger conditions for revisiting," not under cheap actions. Nothing is broken. So the first question is not *how* but *whether* — and if yes, *what scheme*.

### The change (if adopted)

A custom block mirroring `:::figure:` (`build.ts:114`):

```
:::equation:4.7:
$$ \mathcal{L}_{\mathbf{v}} g_{ij} = \nabla_i v_j + \nabla_j v_i $$
:::
```

renders to a numbered display equation with a `(4.7)` tag.

### Design notes

- **Ordering subtlety.** `processCustomBlocks` (`build.ts:74`) runs *before* `renderKaTeX` (`build.ts:150`). The `:::figure:` block wraps its content in `<pre><code>`, which is correct for ASCII figures but would break math — renderKaTeX's `$$` regex would match inside `<pre><code>` and render it wrongly. The equation block must either emit the `$$…$$` raw (letting the existing renderKaTeX pass handle it) or call `katex.renderToString` directly in the block handler. The latter is cleaner but duplicates a render call site; the former reuses the pass but couples the block to the regex. Pick deliberately.
- **Numbering source.** Manual `N.N` in the block header (like figures), or auto-numbered by walk order? Figures use manual numbers; mirroring that is consistent and avoids renumbering cascades on edits. Recommend manual.
- **Cross-referencing.** `:::figure:` emits a `<figcaption>` but **no anchor** — figures aren't cross-referenced either. So "Eq. (4.7)" in prose currently has no resolution mechanism anywhere in the book. Phase A emits the numbered tag only; Phase B (cross-ref) is a separate, larger subsystem that would also fix figures. Do not let Phase A drift into Phase B.
- **KaTeX `\tag`.** KaTeX supports `\tag{4.7}` for a manual number on a display equation. The block could inject `\tag{N.N}` and let KaTeX render it, avoiding custom tag layout — but `\tag` is display-only and interacts with `\ref`/`\label` (which KaTeX does *not* support, reinforcing that cross-ref is a wrapper concern, not a KaTeX one).
- **Interaction with `pi-mathematica-verify`.** Its registry (`equations.jsonl`) keys equations by `(file, line)`. A stable equation number is a natural human-facing ID; worth noting but not a dependency — numbering does not block or require the registry.

### Recommended phasing

- **Phase A — numbered tags, no cross-ref.** `:::equation:N.N:` block, manual numbers, renders the math with a `(N.N)` tag. Apply only where the author wants a number; existing unnumbered `$$…$$` is untouched.
- **Phase B — cross-referencing** (deferred to its own brief if wanted). A `:::eqref:4.7:` block resolving to a link; would also retro-fit figure cross-refs. Do not start until Phase A is settled and the user confirms the scheme.

### Decision needed

1. Do we want numbered equations at all? (If no, this item closes.)
2. If yes: manual `N.N` (chapter.eq), and Phase A only for now?

## Sequencing

1. **Item 2 (zero-error gate)** — implement now. Clear win, no design questions, directly protects the applecart. Fold in the parser-consolidation tidy-first if the user agrees.
2. **Item 1 (macros)** — decide adopt-or-defer. If defer, close; if adopt, pick the vocab and add the table (no retroactive chapter rewrites).
3. **Item 3 (numbering)** — decide want-or-not, then scheme. If wanted, implement Phase A only.

Each item commits separately with its own review; the build passes after each.

## What this brief is not

- Not a switch away from KaTeX (ADR-011 settled that).
- Not the correctness gate — that is `pi-mathematica-verify`'s Phase 4. Item 2 is well-formedness only.
- Not a retroactive notation rewrite. If macros or numbering land, existing chapters are touched deliberately per the perturbation protocol, not blanket-swapped.
- Not a commitment to all three. Item 1 and Item 3 each have a "defer/close" option that this brief treats as a legitimate outcome.

## Notes

- The parser-consolidation tidy-first (Item 2) is the highest-leverage sub-action: it removes the two-parser drift ADR-011 flagged and gives render/validate/extract one source of truth.
- The ordering subtlety in Item 3 (processCustomBlocks before renderKaTeX) is the kind of latent fragility ADR-009 noted about the regex-before-`marked` approach — worth recording in the commit when the block is added.
- Per `playbooks/td-playbook.md`, the items the user greenlights become td tasks for execution; this brief is the plan, not the execution.

---

## Outcome (2026-07-31)

- **Item 2 — zero-error gate: DONE.** `extractMath()` is the single source of truth, consumed by `renderKaTeX` (resilient) and `validateMath` (gate). The gate is scoped to the manuscript via `isManuscript()`: `content/` + `chapter-`/`appendix-` briefs; working docs are not gated. Commit `23e3bcf`. *Sub-item: `scripts/extract-display-equations.ts` consumes the same `extractMath()` — render, validate, and inventory now share one parser (no two-parser drift).*
- **Item 1 — macros: ADOPTED (grad/curl/divergence only).** `\grad`→`\nabla`, `\curl`→`\nabla\times`, `\divergence`→`\nabla\cdot`; divergence is `\divergence` not `\div` (the ÷ builtin — shadowing it is a silent break). Additive — no chapter rewritten. Commit `3e60b96`.
- **Item 3 — equation numbering: DEFERRED.** The trigger is cross-referencing ("Eq. 4.7"); a full-manuscript grep found *zero* equation cross-references (equations are cited by name or by deixis). Incremental formalisation: formalise at the second occurrence, not the first; we are at zero. Reopen when an author writes "Equation (N.N)" twice — Phase A (tag only) is a clean pickup then.

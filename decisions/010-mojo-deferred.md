# Decision: Defer Mojo Adoption; Track Compiler Open-Sourcing

**Date:** 2026-07-12
**Status:** Deferred

## Context

A review of `https://mojolang.org/` (landing + `docs/manual/basics/`, v1.0.0b2, 18 Jun 2026) was prompted by the question whether Mojo could replace the existing tensor-algebra rendering stack or serve as a numerical implementation language for the book's biomechanics examples.

Three flavours of use case were considered:

1. **Replacement for the editorial/build pipeline** — Mojo as a second runtime alongside Bun. No current artefact demands it; the build scans `briefs/` and `content/` for prose + KaTeX-rendered equations.
2. **Numerical implementation of the chapters' tensor expressions** — e.g. a working demo of the constraint-projection dynamics ($M\ddot q + C\dot q + G = \tau + J^{\mathsf T}\lambda$) or the sinusoidal strain field $\varepsilon_{ij}(t) = \varepsilon_{ij}^{(0)} + \delta\varepsilon_{ij}\sin\omega t$. The current chapters typeset these as explanatory scaffolding; no simulation runs anywhere in `scripts/` or `src/`.
3. **Future computational companion volume** — a separate artefact where soft-tissue elasticity, kinematic chains, and possibly FEM demos are executed rather than narrated. No brief for this volume exists as of this decision.

Mojo's current state (per the docs): Python-superset syntax, statically typed, compiled, with SIMD/`TileTensor`, GPU codegen, Python interop via `Python.import_module("numpy")`. Compiler is closed-source; "open-source in 2026" is the published plan. Roadmap shows the language is mid-Phase 1 (perf CPU+GPU); Phase 2 (systems) and Phase 3 (Python-class semantics) remain ahead.

## Decision

Do not adopt Mojo in the current pipeline. File the language as a watch-item and reassess under the trigger conditions below.

The book's tensor algebra is literary scaffolding — equations that are written to be *thought with*, not executed. Mojo's value proposition (Python perf gap + GPU portability across vendor stacks) is genuine but addresses a workload we do not have. Adopting now would violate the Minimal AI Tech Stack principle documented in `AGENTS.md` and would introduce a closed-source beta compiler into a build chain the reader may eventually inspect.

## Alternatives Considered

| Alternative | Why Rejected (for now) |
|-------------|------------------------|
| Adopt Mojo for the editorial pipeline (alongside Bun) | No artefact requires it; the build scans markdown prose + KaTeX; a second runtime is gratuitous stack weight |
| Adopt Mojo for sample numerical implementations in chapters | Display equations in the manuscript are explanatory; rewriting them in Mojo would duplicate prose in code for vanishingly small pedagogy gain; Python+NumPy is the proportional tool if a demo is ever needed |
| Adopt Mojo immediately against the possibility of a future computational companion | Map-before-the-territory error (incremental-formalisation principle): no second occurrence yet, no brief driving the companion volume |
| Adopt JAX/PyTorch for a hypothetical numerical companion | Pre-emptive; same reason. Revisit when the companion volume is briefed |

## Consequences

**What becomes easier:**
- The build remains Bun + TypeScript + Python (.venv for WeasyPrint only). No new toolchain.
- A reader cloning the repo does not need a Mojo install to build the book.

**What becomes harder:**
- If a numerical companion volume materialises, the language question reopens and the work is not already done.

**Constraints this imposes:**
- Any new brief that proposes numerical code (`riemann-stress/`-style spin-offs, FEM demos, Jacobian-projection visualisations) must include a language-choice section; this ADR is the standing reference.

## Reassessment Triggers (revisit when any of these occur)

1. **Compiler open-sources as promised in 2026.** A closed-source dependency in the build chain shifts risk; open-sourcing reduces it materially.
2. **A `briefs/*-brief-computational-companion*.md` exists.** That brief's decisions column must answer "why this language and not Python/JAX/Mojo" with evidence.
3. **The tensor-algebra workloads in the book grow past what `display-equations.ts` can express** — i.e. an actual numerical simulation enters scope rather than a typeset formula.
4. **Modular's roadmap reaches Phase 3** (Python-class semantics). Earlier phases leave Python interop one-directional and limit ergonomics for plot-style usage.

Until at least one trigger fires, this ADR is the standing answer to "why aren't we using Mojo?"

## Related

- `briefs/2026-07-12-brief-contact-polygon-and-compute.md` — the brief the question also produced; reassessment trigger #2 is satisfied if that brief produces a numerical-computational companion
- `playbooks/conventions-playbook.md` — Minimal AI Tech Stack and incremental-formalisation principles
- `decisions/002-bun-sole-runtime.md` — the canonical runtime decision; Mojo would need to argue against it
- `decisions/009-satteri-markdown-parser-assessment.md` — earlier example of a "deferred with conditions" pattern

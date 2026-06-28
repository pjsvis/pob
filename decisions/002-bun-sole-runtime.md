# Decision: Bun as Sole Primary Runtime

**Date:** 2026-06-28
**Status:** Accepted

## Context

The project is a TypeScript static site generator (`build.ts`, `src/cli.ts`, `src/commands/*.ts`) running on Bun. During the Gemini dialog extraction work, five utility scripts were written in Python because it was convenient for text munging. This introduced a second runtime dependency that a new agent must discover and install.

## Decision

Bun is the sole primary runtime for the project. All utility scripts must be TypeScript, runnable via `bun run scripts/*.ts`. The only justified exception is WeasyPrint (see ADR-001), which stays in a Python venv because no TypeScript equivalent exists for CSS paged media generation.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Keep Python scripts | Adds a second runtime; new agents need Python + venv for text processing, which should be Bun-native |
| Use Node.js instead of Bun | Bun is already the project's runtime; switching would be churn for no benefit |
| Use Deno | Same — the project is already on Bun |

## Consequences

**What became easier:**
- One runtime to install (`bun`)
- `just orient` bootstraps everything
- Scripts share the project's package.json dependencies

**What became harder:**
- Text-munging scripts are slightly more verbose in TypeScript than Python (though Bun's built-in APIs close most of the gap)

**Constraints this imposes:**
- New scripts must be `.ts`, not `.py`
- WeasyPrint is the only Python dependency, clearly documented as an exception
- The `.venv/` is gitignored and optional (only needed for PDF generation)

## Related

- ADR-001 — WeasyPrint for PDF (the justified exception)
- `briefs/2026-06-28-brief-port-scripts-to-typescript.md` — the porting work
- `playbooks/silo-playbook.md` — documents the repo structure

# Just Playbook

## Core Principle

**The justfile is a facade, not a workbench.**

It enumerates what's available and delegates to scripts. It has zero logic of its own. Every non-trivial implementation lives in a script — testable, debuggable, versioned independently.

---

## Critical Settings

```just
set shell := ["bash", "-o", "pipefail", "-c"]
set dotenv-load := true
set positional-arguments := true

default:
    @just --list
```

| Setting | Why |
|---------|-----|
| `pipefail` | Pipeline fails on first error, not last |
| `dotenv-load` | Load `.env` for local overrides |
| `positional-arguments` | Access `$1`, `$2` in recipes |
| `default` recipe | `just` shows the menu, does nothing |

---

## The Decision Heuristic

Before adding a recipe, ask:

| Signal | Action |
|--------|--------|
| Recipe needs logic or text | Script |
| Recipe emits information | Markdown file + renderer (glow, bat) |
| Recipe runs multiple commands | Script |
| Recipe needs env vars or complex quoting | Script |
| Recipe is a one-liner with no deps | Just is fine |
| Recipe is getting clever | Move it to a script |

---

## Recipes That Should Never Be In The justfile

- Multi-line echo blocks with formatted text → Markdown file + renderer
- Complex env var assembly in shell → Python/JS script reads it internally
- Inline loops, conditionals, or state → Script
- Anything that breaks the parser (em dashes, `$$` gotchas) → Script

---

## Facade Pattern (correct usage)

```just
# justfile — thin interface, no logic
help:
    @glow docs/help.md 2>/dev/null || cat docs/help.md

build:
    bun run build.ts
```

```typescript
// build.ts — implementation, fully testable
import { marked } from 'marked';
import katex from 'katex';

export async function compile(markdown: string): Promise<string> {
  // Parse markdown, render KaTeX
  // ...
}
```

---

## Shebang vs Inline

**Shebang** — use for any logic, or when `cd` must persist across lines:
```just
build:
    #!/usr/bin/env bash
    set -euo pipefail
    cd src && ./build.sh
```

**Inline** — one-liners only:
```just
clean:
    rm -rf dist/
```

---

## Groups

Syntax: `[group("name")]` immediately above the recipe (no blank lines).

```just
[group("build")]
dev:
    bun run build.ts

[group("meta")]
help:
    @just --list
```

---

## Convention Hygiene

**Rule:** The justfile is named `justfile` (lowercase). No exceptions.

**Why:** `just` accepts both `justfile` and `Justfile`, but the built-in formatter writes to `justfile`. Fighting the tool default creates friction.

**General principle for conventions:**
1. If it fights the tool default, suspect it.
2. If you cannot justify it in one sentence, delete it.
3. If it causes friction twice, it is already a barnacle.

---

## Quick Reference

| Need | Syntax |
|------|--------|
| Quiet (no command echo) | `@command` |
| Shebang recipe | `#!` at body start |
| Dependency | `build: setup` |
| Group | `[group("name")]` above recipe |
| Default param | `param="default"` |
| Env var | `env("VAR", "default")` |
| Private (hidden) | `_recipe:` |
| Working dir | `invocation_directory()` |
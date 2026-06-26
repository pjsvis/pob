# The Poverty of Biomechanics

A minimalist Static Site Generator (SSG) that compiles raw Markdown files containing complex LaTeX equations into publication-grade HTML pages.

**Design archetype:** Roger Penrose's *The Road to Reality* — clean typography, zero visual fluff, high-density mathematical layout.

## Quick Start

```bash
bun install
bun run build.ts
```

## Project Structure

```
pob/
├── build.ts              # SSG compiler (core)
├── justfile              # Task runner facade
├── package.json          # Dependencies
├── src/templates/        # HTML shells
├── content/              # Markdown source
├── dist/                 # Generated output
├── playbooks/            # Workflow documentation
├── briefs/               # Session briefs
├── debriefs/             # Session retrospectives
├── decisions/            # Architecture decision records
└── scripts/              # Support scripts
```

## Commands

```bash
just build      # Compile content to dist/
just clean      # Clear dist/
just dev        # Watch mode (if implemented)
just check      # Dry-run build
just deps       # Show dependencies
```

## Philosophy

- **Local-first:** No external services, no CDN dependencies for math
- **Server-side rendering:** KaTeX compiled to HTML at build time
- **Minimal deps:** Only what's necessary for the job
- **Bun-native:** TypeScript execution, package management, build runner

## Related

- [dependencies.md](./dependencies.md) — Full dependency list
- [playbooks/](./playbooks/) — Workflow documentation
# The Poverty of Biomechanics

A minimalist Static Site Generator (SSG) that compiles raw Markdown files containing complex LaTeX equations into publication-grade HTML pages.

**Design archetype:** Roger Penrose's *The Road to Reality* — clean typography, zero visual fluff, high-density mathematical layout.

## Quick Start

```bash
bun install
bun run build.ts
```

## Development workflow

- **Consistent preview port** – The preview server runs on **port 3000** by default. This is the canonical port referenced throughout the documentation, scripts, and examples. If you need to use a different port (e.g., when 3000 is already occupied), you can pass `--port <port>` to `pob preview`, but keep the default for team consistency.
- **Automatic index page** – The build pipeline always creates a root `index.html` (by copying `index-page.html` to `index.html`). This page contains a list of links to all generated pages, so after adding a new Markdown file you only need to run `bun run build.ts` and the navigation updates automatically.
- **No extra steps** – With the above conventions, creating a page and reviewing it becomes a single command: `bun run build.ts && bun run src/cli.ts preview`.


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

- [grad‑div‑curl‑demo.md](./content/grad-div-curl-demo.md) – showcases an equation, a Penrose diagram, and Grad/Div/Curl narrative blocks
- [dalembertian‑demo.md](./content/dalembertian-demo.md) – demonstrates the D’Alembertian symbol and its use in a diagram
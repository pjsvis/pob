# Conventions Playbook

## What This Is

A living record of the project's **active conventions** — the rules we follow
because they solve real problems — and a process for identifying and removing
**barnacles**: conventions that have lost their purpose but live on in docs,
scripts, and agent context, misleading everyone who follows them.

## What Is a Barnacle?

A barnacle is a document fragment, script comment, or supposed "convention" that:
1. **Misdirects** — tells an agent to do the wrong thing
2. **Perpetuates bad practice** — the more it is followed, the worse things get
3. **Has no living justification** — nobody can explain why it exists

Barnacles are an **emergent property** of any project. Documents drift. Tools
change. What once made sense becomes noise, then harm.

## Active Conventions

| Convention | Justification | Since |
|------------|---------------|-------|
| `justfile` lowercase | Tool default; formatter compatibility | 2026-06-24 |
| `bun` over `node` where both work | Project standard; faster; native TS | 2026-06-24 |
| Server-side KaTeX rendering | Zero client-side latency for math | 2026-06-24 |
| Clean build (always clear `dist/`) | Prevents stale artifact pollution | 2026-06-24 |
| Every deliberate folder has a `README.md` | Prevents mystery; draws boundaries | 2026-06-24 |
| **Directory hierarchy** | | |
| `src/` = production TS | Tested, type-checked code only | 2026-06-24 |
| `src/templates/` = HTML shells | Not processed, just referenced | 2026-06-24 |
| `content/` = raw markdown | Build input, not build output | 2026-06-24 |
| `dist/` = generated output | Always clean, never committed | 2026-06-24 |
| `scripts/` = support scripts | Tooling, automation, not shipped | 2026-06-24 |

## Barnacle Removal Record

| Date | Barnacle | Where Found | Why Removed | Removed By |
|------|----------|-------------|-------------|------------|
| 2026-06-24 | `Justfile` (capitalized) | playbooks | Fights `just` formatter default | pob |

## Startup Ritual

When you begin work on this project, run:

```bash
just --list          # See what's available
bun run build.ts     # Verify build works
```

## Agent Note

You are not maintaining conventions for their own sake. You are preventing
the accumulation of misdirection. Every barnacle you scrape saves the next
agent an hour.

---

## Known Failure Modes

---

## Preview Server & Index Page

- **Default preview port** – The preview server runs on **port 3000** by default. This is the canonical port referenced in the `README.md`, `docs/preview.md`, and all CI scripts. It can be overridden with `--port <port>` only when absolutely necessary, but the default should be used for all regular development.
- **Automatic root `index.html`** – After every `bun run build.ts`, the build pipeline copies `dist/index-page.html` to `dist/index.html`. The `index-page.md` file contains a **Site Index** section with a curated list of links to all generated pages. This guarantees that visiting `http://localhost:3000/` always resolves to a navigation page without extra steps.
- **One‑command workflow** – Creating a new page and reviewing it is a single command:
  ```bash
  bun run build.ts && bun run src/cli.ts preview
  ```
  The build updates the index automatically, and the preview server serves it on the known port.
- **Documentation location** – See `README.md` (Development workflow) and `docs/preview.md` for the full details.

### KaTeX in JSX text — DO NOT USE escapes
**Rule:** Never use `\uXXXX` JS string escapes in raw JSX text. Use actual Unicode characters directly.

**Bad:** `<span>\u00a3</span>` → renders as literal `\u00a3`
**Good:** `<span>£</span>` or `<span>{"\u00a3"}</span>`

### Template literals with HTML tags
**Rule:** Do not use template literals (`` `...` ``) for strings containing HTML/JSX tags inside `.tsx` files.

The JSX parser applies to the entire file. Any `<tag>` inside a backtick string is misread as a JSX element.

### Revert is faster than forward-fix
If a change breaks the build and the fix isn't obvious, revert to the last known-good state. Trust the revert.
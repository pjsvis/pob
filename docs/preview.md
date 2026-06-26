# Preview Server & Index Page Documentation

## Overview

The **pob** static site generator provides a lightweight preview server for local development. The server is intentionally simple:
- Serves the generated `dist/` directory over HTTP.
- Uses a **single, canonical port** – **3000** – as the default.
- Hosts an `index.html` that lists the major pages for quick navigation.

These conventions are enforced in the build pipeline and the preview command, ensuring a predictable workflow for all contributors.

---

## Consistent Preview Port

- **Default port:** `3000`
- The `src/commands/preview.ts` script binds to `host` (default `localhost`) and `port` (default `3000`).
- The port can be overridden with `--port <port>` if absolutely necessary, but the default should be used for all regular development and CI pipelines.
- The README now includes a **Development workflow** section that explicitly states the default port and how to change it.

### Why a Fixed Port?
- **Discoverability:** Team members can always open `http://localhost:3000` without guessing.
- **Automation:** Scripts, CI jobs, and documentation reference a single URL.
- **Avoids conflicts:** By keeping the default, we reduce the chance of “wandering ports” that break tooling.

---

## Automatic Index Page Generation

- After each `bun run build.ts`, the script copies `dist/index-page.html` to `dist/index.html`.
- The `index-page.md` file contains a **Site Index** section with a curated list of links to the major pages.
- This guarantees that the root URL (`/`) always resolves to a useful navigation page.

### How It Works
```ts
// In build.ts (after processing all content files)
const indexPagePath = join(DIST_DIR, "index-page.html");
if (existsSync(indexPagePath)) {
  const indexDestPath = join(DIST_DIR, "index.html");
  const html = readFileSync(indexPagePath);
  writeFileSync(indexDestPath, html);
  console.log("  -> index.html");
}
```
- The copy is performed **after** all content files have been written, ensuring the latest `index-page.html` is used.
- The `index-page.md` can be edited to add or remove links; a rebuild automatically updates `index.html`.

---

## Development Workflow (single‑command)
```bash
# 1. Build the site (generates all HTML + index.html)
# run build.ts

# 2. Start the preview server (default port 3000)
bun run src/cli.ts preview   # opens http://localhost:3000
```
- Adding a new markdown file, committing it, and running the two commands above yields an up‑to‑date site with navigation ready.

---

## Discoverability

- This file lives under `docs/preview.md` and is referenced from the top‑level `README.md` Development **Development workflow** section.
- The `README.md` now contains a concise bullet list that points developers to the preview server and index page behavior.
- All contributors can locate the information by searching for "preview" or "index page" in the repository.

---

## Future Enhancements

- Add a `make preview` target that runs both build and preview in one step.
- Include a small script that checks if port 3000 is already in use and prints a helpful message.
- Document the same behavior in any additional docs (e.g., `docs/architecture.md`) if the project grows.

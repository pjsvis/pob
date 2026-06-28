# Decision: Use WeasyPrint for PDF Generation

**Date:** 2026-06-28
**Status:** Accepted

## Context

The project needs to generate PDFs from HTML with KaTeX-rendered math and CSS paged media pagination (break-inside, widows, orphans, @page margins). Three options were evaluated:

1. **Headless Chrome** (`--print-to-pdf`) — available on the development machine, but does not reliably honour `break-inside: avoid` on text containers. Splits sections mid-sentence.
2. **WeasyPrint** — open-source Python paged-media engine. Honours CSS Fragmentation properly. Requires a Python venv but no system-wide installation.
3. **DocRaptor** — hosted API wrapping PrinceXML (commercial, gold standard). Best pagination, but sends content to a third-party server and costs money.

## Decision

Use WeasyPrint for PDF generation. Keep it in a local `.venv/` so it does not pollute the system Python.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Headless Chrome | Does not honour `break-inside: avoid` on text containers — splits sections mid-sentence |
| DocRaptor | Sends content outside the silo; costs money; violates the "stay inside the boundary" principle |
| PrinceXML (local) | Commercial licence required for non-trivial use |
| LaTeX (tectonic) | Would require converting the HTML→Markdown pipeline; loses the CSS/KaTeX rendering |

## Consequences

**What became easier:**
- Clean pagination with proper section breaks, intact equations, no orphaned headings
- Print CSS (`@media print` in `pob.css`) is fully honoured

**What became harder:**
- PDF generation requires a Python venv (`.venv/`) in addition to Bun
- The `just pdf` recipe calls `.venv/bin/weasyprint` rather than a Bun-native tool

**Constraints this imposes:**
- `just orient` should mention the Python venv setup as an optional step
- The venv is gitignored; a new agent must run `python3 -m venv .venv && .venv/bin/pip install weasyprint` to enable PDF generation

## Related

- `justfile` — `pdf` recipe
- `src/styles/pob.css` — `@media print` section
- ADR-002 — Bun as sole primary runtime (WeasyPrint is the justified exception)

# Decision: Extract Gemini Dialogs as Primary Source

**Date:** 2026-06-28
**Status:** Accepted

## Context

The book *The Poverty of Bio-Mechanics* was developed through extended conversations with Gemini between December 2024 and June 2026. The original plan was to push the dialog material into NotebookLM for organisation and refactoring. This failed: NotebookLM compressed, summarised, stripped the LaTeX math, and produced lossy output that destroyed the structural integrity of the tensor algebra.

Nessie ($28/month) could read the dialogs and produce syntheses, but could not export the raw content in a usable form.

The raw material existed in a Google Takeout export (`My Activity.json`, 5,348 entries) but was inaccessible without extraction tooling.

## Decision

Extract the Gemini dialog traces from the Google Takeout into structured markdown files (`notebooklm/gemini-dialog/`) as the primary source material for the book. Do not use NotebookLM or any intermediary compressor. Build directly from the raw conversations.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| NotebookLM | Lossy compression; strips math; destroys structural integrity |
| Nessie | Read-only access to own data; $28/month toll; cannot export raw content |
| Manual copy-paste from Gemini UI | Impractical for 4,830 exchanges; lossy; time-consuming |

## Consequences

**What became easier:**
- Full fidelity preservation (math, timestamps, code blocks, tables)
- Local, offline, searchable (grep, rg, any tool)
- No third-party dependency for accessing own data
- Chapter drafts extracted directly from the conversations that generated them

**What became harder:**
- 23 MB of markdown to navigate (mitigated by the INDEX.md and MANIFEST.json)
- No AI-generated synthesis unless explicitly requested (mitigated by collecting Nessie syntheses as separate reference artefacts)

**Constraints this imposes:**
- The `notebooklm/` directory is gitignored (too large for git); the extracted dialog stays local
- Nessie syntheses are force-added to git as curated references
- The raw Takeout is gitignored

## Related

- `scripts/extract-gemini-dialog.py` (to be ported to TypeScript, see ADR-002)
- `notebooklm/gemini-dialog/INDEX.md` — the archive index
- `playbooks/style-playbook.md` — references Nessie syntheses as the analytical register
- `briefs/2026-06-28-brief-persist-nessie-syntheses.md`

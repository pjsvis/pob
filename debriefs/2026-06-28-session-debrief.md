# Debrief: Session ses_4f431f — 2026-06-28

## Overview

A single session that began with a broken `just orient` and ended with a substantially complete book, a principles layer, a proof-reader agent, and three blog drafts. 46 commits, 15 tasks closed, critical path cleared.

## What was done

### Tasks closed (15)

| Task | What | Key outcome |
|------|------|-------------|
| td-60e801 | Port Python→TS | 5 scripts, byte-identical verified; caught a JS `$`-handling bug by diffing |
| td-2ce570 | Voice pass (21 chapters) | All chapters edited to staved-finger register; Ch04 data corruption repaired |
| td-43526f | Hybrid SVG epic | Docs story closed; epic auto-cascaded |
| td-cd7bb7 | Title pass + structural fixes | Ch08→Origin, Ch14→Floor Datum; Ch15/Ch18 structural repair |
| td-6b5002 | Math rendering pass | 6 corrupted expressions fixed, 225 clean, KaTeX verified in rendered HTML |
| td-59e1ab | Onboarding chapter | Ch00: The Vocabulary — grad/div/curl/tensors via wet towel + t-shirt |
| td-c55f36 | Authoring playbook | Four representation modes + custom block documentation |
| td-b73b87 | Nessie syntheses persistence | .gitignore negation for curated references |
| td-7fbb8c | Registry hygiene | INDEX.jsonl/REGISTRY.jsonl synced (1→62 entries) |
| td-bb0f01 | Beta reader packaging | 8 PDFs + 3 per-reader cover notes (Laura/Emma/Barbara+Craig) |
| td-04fbdb | Preface + Section 00 | The Logic of the Rug + What to Expect (anti-marketing manifesto) |
| td-86e4c0 | Two Faces of Amnesia chapter | Ch18; map-not-territory reframing; renumbered Ch17–21→Ch18–22 |
| td-f91e04 | Frontier Scale chapter | Ch13; four-zone operational telemetry; renumbered Ch13–22→Ch14–23 |
| td-5cf3c1 | Diagram wrapper | :::diagram:name block for named SVG references |
| td-c4e1dd | Diagram pipeline assessment | ADR-003: pipeline viable for tensor networks; flowcharts use <pre> fallback |
| td-785e7b | Grad/Div/Curl explanation convention | Ch00 as glossary; :::explanation as the inline block |

### Bugs found and fixed

| Bug | How found | Impact |
|-----|-----------|--------|
| `just orient` syntax error | First command of the session | Blocked all orientation |
| Ch04 data corruption (literal `[Autonomous Governor]` tokens through every word) | Voice pass scan for "Ch4 computer analogy" | Chapter had been unreadable since commit 6797726 |
| KaTeX CSS CDN failure (doubled math: "E E", "Ω Ω") | User beta read of Ch01 | Every inline math expression on every page |
| Lowercase `o` diagram token (garbage circles in flowcharts) | Diagram pipeline assessment | Every chapter flowchart with "o" in a label |
| 5-second auto-refresh meta tag | Flagged during beta-reader packaging | Made web reading infuriating |
| Editorial "we/our" across 8 chapters | Proof-reader test run | Register drift invisible to the voice pass |

### Principles persisted (8)

1. Voice invariant — the voice is the invariant, the tracks are the variety
2. Single-voice gate — one processor on the voice, never committee
3. Curation loop — dump → assimilate → assess → draft
4. Asset/brief distinction — assets in `assets/`, briefs in `briefs/`
5. Tidy-first — fix what's cheap, brief what's expensive, never let a barnacle sit
6. Memory vs documentation — memory is research input, documentation is editorial authority
7. Incremental formalisation — add what the work demands, at the second occurrence
8. The applecart principle — a book is a context the reader enters somatically; every violation upsets the room

### Blog drafts (3, in `blog/`)

1. The Yap and the Voice — Gemini as research assistant vs editor
2. The Moving Ground — incremental formalisation vs the greenfield reflex
3. The Falsification Crisis — AI discourse without falsifiability

### Infrastructure

- `assets/` — dump zone for raw material (tracked, build-ignored)
- `blog/` — staging for blog drafts (tracked, build-ignored)
- Self-hosted KaTeX CSS + 60 font files (no CDN dependency)
- `:::diagram:name` custom block for named SVG references
- Auto-generated two-section index (The Book / Other Documents)
- Proof-reader agent spec (`playbooks/proof-reader-agent.md`)
- herdr-playbook for SSH/iPad monitoring
- ADRs consolidated into `decisions/` (001–007)

## What was learned

### The equivalence test is the only honest evidence for a port
The Python→TS port was verified by re-extracting raw chapters from the 40MB Takeout with both implementations and diffing after every pipeline stage. The diff found a JS `String.replace` `$`-handling bug that assertion-only testing would have missed. Lesson: a port's failure mode is silent behavioural drift; the only honest evidence is a diff against the original on real data.

### The voice pass is surgical, not a rewrite
The chapters were ~85% in-register after the mechanical passes. The voice pass edited voice and removed jargon, preserving all KaTeX and structure, adding no content. Rule 11 (no Gemini redrafting) was the load-bearing constraint — rewrite = palimpsest risk. Lesson: the benchmark is the ruler; the pass is the measurement; the rewrite is the failure.

### The tidy-first pass catches what the build cannot
Two rendering bugs (KaTeX CSS, `o`-token) were invisible in the source and visible only in the rendered output. The build reported green for both. Lesson: the build passing is necessary but not sufficient; a human reading the rendered output is the ground truth.

### The proof reader catches what the voice pass cannot
The editorial "we" across 8 chapters was invisible to the voice pass (which scanned for jargon, not pronouns) and visible to the proof reader (which checked against the benchmark, which never uses "we"). 13 instances found and fixed in 30 seconds. Lesson: the proof reader is a separate pass with a separate checks list; it catches register shifts the voice pass's scan cannot see.

### Incremental formalisation works because every rule carries its receipt
All 8 principles were added in response to real problems, not in anticipation of imagined ones. Each carries the justification of the problem it solves, testable when the ground moves. Lesson: the greenfield reflex (front-load the apparatus) is the map-before-the-territory error; the incremental approach comprehends the moving ground.

## What remains

### For the book
- Ch01–05 lack Smoke Tests (the method was not conceived until Ch06; may be intentional)
- Some content/ files lack H1 headings (stale index titles)
- Print-production diagrams (a later task; ASCII flowcharts are adequate for beta)
- The two new chapters (Frontier Scale, Two Faces of Amnesia) need the author's voice read
- Beta reader feedback not yet received

### For the meta-discussion
- More to discuss (user flagged "meta stuff" for the next session)

### Open briefs (not yet started)
- Consolidate ADR directories — done this session
- Ch01–05 Smoke Tests — if deemed necessary

## Session metrics

- 46 commits
- 15 tasks closed
- 27 book files (preface + section 00 + Ch00 + Ch01–23 + appendix)
- 82 pages build green
- 8 principles persisted
- 3 blog drafts
- 6 bugs found and fixed
- 0 stale cross-references
- Critical path: clear

## ADRs written this session

- ADR-003: Diagram pipeline assessment (viable for tensor networks; flowcharts use <pre> fallback)

## Decisions made

- `decisions/` is the canonical ADR directory; `docs/adr/` was a palimpsest, consolidated
- The pain scale is named "The Frontier Scale" (action at the green-yellow frontier)
- Zone definitions: Green (known ROM), Yellow (unknown, needs mapping), Orange (occasional twinges), Red (sustained signal)
- "Things do not hurt because they are broken; they hurt because they are being fixed" — persisted in the Preface
- The proof-reader agent is advisory, not a gate; it reports, the implementer decides
- Blog drafts live in `blog/` (build-ignored), promoted to `content/` when ready

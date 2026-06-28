# Briefs Playbook

## Writing a Brief

Every brief is a single `.md` file in `briefs/`. Use this format:

```markdown
# Brief: [Piece Topic]

**Date:** [YYYY-MM-DD]
**Status:** [Open | In Progress | Done]

---

## Objective

One sentence. What are we writing and why?

## Piece Details

**Proposed Title:**
**Dek:** [One or two plain sentences framing the question]
**Tags:** [comma-separated tags]

## Content Outline

1. **Hook** — Opening problem or question
2. **Body** — Key points (3-5 sections)
3. **Resolution** — What we're arguing or demonstrating

## Research Needed

- [ ] Source links / references verified
- [ ] Math notation checked (KaTeX renders correctly)
- [ ] Any existing pieces on this topic checked for overlap

## Publication Checklist

- [ ] Front-matter complete (title, date)
- [ ] Byline and dek added (see self-contained-essay-playbook.md)
- [ ] Self-containment pass completed
- [ ] `just build` succeeds
- [ ] `just pdf` succeeds and PDF renders correctly
- [ ] Committed to `main`

## Notes

Any non-obvious constraints, dependencies, or decisions about framing.

---

## Done

When all `[ ]` items are checked and the PDF has been reviewed.
```

**Rules:**
- One brief per piece or epic series
- Epic = multi-piece series, single brief = one deliverable piece
- File name: `YYYY-MM-DD-slug.md` (matching the date-based convention used in `briefs/`)
- Be specific in the objective — "write about biomechanics" is not a brief, "explains why steepling the hand calibrates afferent telemetry" is

## Executing a Brief

1. **Review** the brief before starting
2. **Verify** conditions at the top (what must already exist)
3. **Check off** items as you complete them
4. **Draft** in `briefs/` — the build pipeline scans both `briefs/` and `content/` as source directories
5. **Update Status** to Done when verified

## Archiving

Completed briefs stay in `briefs/`. Keep them — they're a record of what was decided and why.

## Epic Structure (Multi-Piece Series)

An epic groups related pieces. Use this in `epic-[name].md`:

```markdown
# Epic: [Series Name]

**Date:** [YYYY-MM-DD]
**Status:** [Open | In Progress | Done]
**Pieces:** [01 through 0N]

---

## Vision

One paragraph. Why does this series matter? What's the through-line?

---

## Pieces

### 01 — [Piece name]

**What:** [Description]
**Brief:** `briefs/YYYY-MM-DD-slug.md`

### 02 — [Piece name]

...

## Exit Criteria

What must be true for the epic to be considered complete?
```

## Capturing Decisions

Briefs are aspirational — they describe what you plan to write. The actual decisions made during drafting (framing choices, structural trade-offs, rejected alternatives) should be captured as **Architecture Decision Records (ADRs)** in `decisions/`.

When drafting a brief:
- If you make a choice between two viable framings, write an ADR
- If you discover a constraint that changes the structure, write an ADR
- If you adopt a new pattern or approach, write an ADR

See `playbooks/decisions-playbook.md` for the ADR format and process.

## Review Checklist

Before committing a brief:
- [ ] Objective is specific and actionable
- [ ] Content outline has clear structure (hook, body, resolution)
- [ ] No ambiguous language ("should", "maybe", "consider")
- [ ] Research checklist is realistic
- [ ] Publication checklist is complete
- [ ] Significant framing decisions have corresponding ADRs in `decisions/`

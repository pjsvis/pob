# Debriefs Playbook

## Purpose
A debrief is a retrospective document created after the completion of a significant task or milestone. It captures what was done, what went wrong, and what was learned to improve future work.

**Critical:** Debriefs are **MANDATORY** for all significant changes per the **Change Management Protocol**. A debrief documents what actually happened, not what was planned. It includes verification proof that changes work as intended.

## Required Frontmatter Fields
- `date`: YYYY-MM-DD format (creation date)
- `tags`: Array of relevant tags (e.g., [cleanup, verification, ssr])
- `agent`: Agent designation (e.g., [claude, cursor, local-ai])

**Example:**
```markdown
---
date: 2026-06-24
tags: [setup, build, katex]
agent: claude
---
```

## File Naming
- **Convention:** `YYYY-MM-DD-topic.md` (date first, always)
- **Final Location:** `debriefs/` directory (must be moved before session end)

## Template

```markdown
---
date: [YYYY-MM-DD]
tags: [tag1, tag2, tag3]
agent: [claude | cursor | local-ai]
---

## Debrief: [Task Name]

## Accomplishments

- **[Accomplishment 1]:** [Description of what was achieved]
- **[Accomplishment 2]:** [Description of what was achieved]

## Problems

- **[Problem 1]:** [Description of the issue encountered and how it was resolved]
- **[Problem 2]:** [Description of the issue encountered and how it was resolved]

## Lessons Learned

- **[Lesson 1]:** [Insight gained that can be applied to future tasks]
- **[Lesson 2]:** [Insight gained that can be applied to future tasks]
```

## Recommended Tags by Category

**Task Type:**
- `setup` - Project initialization
- `feature` - New feature implementation
- `bugfix` - Bug resolution and fixes
- `refactoring` - Code restructuring
- `cleanup` - Code cleanup, hygiene

**Domain:**
- `ssg` - Static site generation
- `math` - Math rendering (KaTeX)
- `markdown` - Markdown processing
- `build` - Build system

## Post-Debrief Checklist
- [ ] **Move Brief:** Move the completed brief from `briefs/` to `debriefs/`
- [ ] **Frontmatter Tags Present:** Verify debrief includes `date`, `tags`, and `agent` fields
- [ ] **Write ADRs:** Any architectural decisions made during the session have corresponding ADRs in `decisions/`
- [ ] **Update Changelog:** Add a summary of changes to `CHANGELOG.md` under the `[Unreleased]` section

## Capturing Architectural Decisions

During implementation, you will make choices between alternatives. These decisions — the *why* behind the *what* — are the most valuable output of any session. Capture them as **Architecture Decision Records (ADRs)** in `decisions/`.

**When to write an ADR:**
- You choose between two or more viable alternatives (e.g., marked vs markdown-it)
- You adopt a new tool, pattern, or constraint that shapes the architecture
- You discover a trade-off that future contributors need to understand

**How to link ADRs to debriefs:**
- Reference the ADR in the debrief's "Lessons Learned" section
- The ADR captures the decision; the debrief captures the context in which it was made

See `decisions/` directory for the ADR format.
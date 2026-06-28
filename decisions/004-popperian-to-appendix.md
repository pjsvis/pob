# Decision: Move Popperian Falsification Tests to Appendix

**Date:** 2026-06-28
**Status:** Accepted

## Context

The 21 chapter drafts originally contained Popperian Falsification Test sections embedded in the main text. These sections described controlled experiments designed to test or refute each chapter's model. They were procedural, researcher-oriented, and interrupted the narrative flow for the general reader.

## Decision

Extract all Popperian Falsification Test sections from the chapter drafts and collect them in Appendix A (`briefs/appendix-a-falsification-protocols.md`). The main text retains only the Hardware Smoke Tests, which are conversational diagnostics for the practitioner.

## Alternatives Considered

| Alternative | Why Rejected |
|-------------|-------------|
| Keep in main text | Breaks narrative; too procedural for general reader; researcher-focused |
| Remove entirely | Loses the falsifiability claim that gives the book its scientific rigour |
| Separate chapter per test | Inflates the book with 21 micro-chapters of protocols |

## Consequences

**What became easier:**
- Chapter narrative flows uninterrupted (Familiar Hook → Math → Smoke Test)
- General reader is not confronted with laboratory protocols
- Researchers can find all protocols in one place

**What became harder:**
- Cross-referencing between a chapter and its falsification test requires navigating to the appendix
- The appendix is 5,866 words — substantial but not excessive

**Constraints this imposes:**
- The book structure page and TOC must list the appendix
- The style playbook documents this as a structural rule

## Related

- `briefs/appendix-a-falsification-protocols.md`
- `playbooks/style-playbook.md` — "The Popperian Falsification Protocols are in Appendix A. They do not appear in the main text."
- `content/book-structure.md`

# Brief: Penrose-Style Book Template Implementation

## Epic: PENROSE-001 — Penrose-Style Layout Template

---

## Context

*The Poverty of Biomechanics* (pob) needs proper book publishing support. The current layout is functional but basic — no sidenotes, no proper chapter formatting, no full-width figures. This epic adds Penrose-style layout to match *The Road to Reality* typography.

---

## Outcome

A build template that produces publication-quality math books with:
- Proper sidenote system in margins
- Chapter/section structure (small caps, italic, §X.Y numbering)
- Full-width figure support
- Front matter templates (title, copyright, contents)

---

## Tasks

### PENROSE-001.1 — Sidenote Support
**Story:** As a writer, I want margin notes so I can add citations and exceptions without cluttering the text.

**Acceptance:**
- [ ] Sidenotes render in right margin (2in width)
- [ ] Sidenotes numbered inline (`¹`, `²`, etc.)
- [ ] CSS handles positioning and typography
- [ ] Works with existing KaTeX math rendering

**Implementation:**
1. Add CSS for `aside.sidenote` in `src/templates/layout.html`
2. Document markup syntax in `playbooks/penrose-book-playbook.md`
3. Test with sample sidenote content

**Effort:** 2h

---

### PENROSE-001.2 — Chapter/Section Formatting
**Story:** As a writer, I want proper chapter headings so the book looks like a Penrose text.

**Acceptance:**
- [ ] Chapters use small caps, centered, on own page
- [ ] Sections use `§X.Y` format, italic, left-aligned
- [ ] First paragraph after chapter has no indent
- [ ] Appropriate vertical spacing

**Implementation:**
1. Update CSS in `layout.html` for heading styles
2. Add `.chapter`, `.section`, `.subsection` classes
3. Add `.newthought` for first paragraph small caps
4. Document format in playbook

**Effort:** 3h

---

### PENROSE-001.3 — Full-Width Figure Support
**Story:** As a writer, I want figures that span text + margin so I can include wide diagrams.

**Acceptance:**
- [ ] `figure.full-width` spans text column + margin
- [ ] Captions render properly below figures
- [ ] Responsive: fall back to text-width on narrow screens

**Implementation:**
1. Add CSS for `.full-width` figures
2. Test with sample SVG diagram
3. Document markup in playbook

**Effort:** 2h

---

### PENROSE-001.4 — Math Display Spacing
**Story:** As a writer, I want proper spacing around equations so the page flows well.

**Acceptance:**
- [ ] Display equations have 1.5em vertical margin
- [ ] Wide equations scroll horizontally (not clipped)
- [ ] Inline math doesn't break line-height

**Implementation:**
1. Update `.katex-display` CSS
2. Add `overflow-x: auto` wrapper for wide equations
3. Test with multi-line display equations

**Effort:** 1h

---

### PENROSE-001.5 — Front Matter Templates
**Story:** As a writer, I want title page templates so the book has proper front matter.

**Acceptance:**
- [ ] Half-title page template exists
- [ ] Full title page template exists
- [ ] Contents page generates from structure
- [ ] Copyright page template

**Implementation:**
1. Create `content/00-half-title.md`
2. Create `content/00-title-page.md`
3. Create `content/00-copyright.md`
4. Create `content/00-contents.md`
5. Document front matter structure in playbook

**Effort:** 4h

---

### PENROSE-001.6 — Table of Contents Generation
**Story:** As a writer, I want automatic TOC generation so readers can navigate.

**Acceptance:**
- [ ] TOC generates from chapter/section headings
- [ ] TOC supports brief (chapters only) and detailed (sections) formats
- [ ] TOC renders in preview server

**Implementation:**
1. Add TOC generation to `build.ts`
2. Update preview server to serve TOC at `/contents`
3. Document TOC generation in playbook

**Effort:** 4h

---

## Total Estimate

**16 hours** across 6 tasks

---

## Dependencies

- `build.ts` — Build pipeline
- `src/templates/layout.html` — CSS template
- `playbooks/penrose-book-playbook.md` — This playbook

---

## Verification

```bash
just build --clean
# Check:
# - dist/ contains index.html, contents.html
# - Sidenotes render in right margin
# - Chapter headings in small caps
# - Figures span full width
# - Math displays have proper spacing
```

---

## Out of Scope (Future Epics)

- PDF export (requires Prince or WeasyPrint)
- Index generation
- Bibliography management
- Multiple book support (series/epub)
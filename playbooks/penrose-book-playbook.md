# Penrose-Style Book Playbook

## Purpose

Establish the template conventions for creating Penrose-style books (à la *The Road to Reality*). This playbook covers typography, layout structure, and markup conventions for the SSG.

---

## Design Principles

### 1. Typography

| Element | Style | Notes |
|---------|-------|-------|
| Body text | Serif, 11-12pt, 1.6 line-height | Georgia, Times New Roman fallback |
| Chapter headings | Small caps, centered | No numbering by default |
| Section headings | Italic, left-aligned | `§X.Y` format if numbered |
| Sidenotes | 8-9pt, margin-right | Numbered inline, flush left |
| Captions | 8-9pt, italic | Below figures |
| Math display | 10pt equivalent, centered | Generous vertical space |

### 2. Layout Grid

```
┌─────────────────────────────────┬─────────┐
│                                 │         │
│   Main text column              │  Margin │
│   ~65 characters (6.5in)        │  (2in)  │
│                                 │         │
│   ┌─────────────────────────┐   │         │
│   │   Sidenote             │   │ Sidenote│
│   └─────────────────────────┘   │         │
│                                 │         │
│   ┌─────────────────────────┐   │         │
│   │   Full-width figure    │   │         │
│   └─────────────────────────┘   │         │
│                                 │         │
└─────────────────────────────────┴─────────┘
```

- **Text width:** 6.5 inches (65-70 chars at 10pt)
- **Margin:** 2 inches on right (sidenotes, captions)
- **Gutter:** 0.375 inches
- **Top/bottom margins:** 1 inch / 1.2 inches
- **Paper:** 8.5 × 11 inches (Letter) or A4

### 3. Chapter Structure

```
[Empty half-page]

§1  EUCLIDEAN THREE-SPACE          ← Small caps, centered
──────────────────────────────────  ← Thin rule

[First paragraph - no indent, first words in small caps]
```

Format:
- Chapter number in Roman numerals: `§I`, `§II`, `§III`
- Title in small caps, centered on its own page
- Thin horizontal rule below
- First paragraph: no indent, first few words in small caps (`\newthought`)

### 4. Section Structure

```
§1.1  The Metric Tensor

Body text begins here...
```

Format:
- Section number: `§X.Y` (no "Chapter" prefix)
- Title in italic, left-aligned
- Immediate body text (no blank line)
- Subsections use triple numerals: `§1.1.1`

---

## Markup Conventions

### Sidenotes

Use the `:::sidenote` custom block syntax:

```markdown
The metric tensor $g_{\mu\nu}$ is symmetric.

:::sidenote
The metric satisfies $g_{\mu\nu} = g_{\nu\mu}$.
:::
```

This renders as `<aside class="sidenote">` positioned in the right margin by CSS.

**CSS positioning:**
```css
.sidenote {
  float: right;
  clear: right;
  position: relative;
  right: calc(-1 * var(--margin-width) + 0.25in);
  width: calc(var(--margin-width) - 0.5in);
  font-size: 0.85em;
  color: var(--muted);
}
```

### Full-Width Figures

Use the `:::figure:number:caption` custom block syntax:

```markdown
:::figure:1.1:Coordinate transformation between two charts
```
Content here (image, code block, etc.)
```
:::
```

This renders as `<figure class="full-width">` spanning text + margin.

**CSS:**
```css
figure.full-width {
  width: calc(var(--text-width) + var(--margin-width) - 0.5in);
  margin-left: calc(-1 * var(--margin-width) / 2 + 0.25in);
}
```

### Margin Figures

For smaller figures in the margin:

```markdown
:::margin-figure:Optional caption
![Image](path/to/image.svg)
:::
```

Renders as `<figure class="margin-figure">` positioned in the right margin.

### Code Blocks

Standard fenced code blocks work. Wide blocks scroll horizontally:

```markdown
```
Long line of code that might exceed the text width...
```

```css
pre {
  overflow-x: auto;
}
```

### Math Display

Use `$$...$$` for display math, `$...$` for inline:

```markdown
$$
R_{\mu\nu} - \frac{1}{2}g_{\mu\nu}R = 8\pi T_{\mu\nu}
$$
```

**CSS:**
```css
.katex-display {
  margin: 1.5em 0;
  overflow-x: auto;
  text-align: center;
}
```

---

## CSS Requirements

```css
:root {
  --text-width: 6.5in;
  --margin-width: 2in;
  --gutter: 0.375in;
  --font-serif: "Times New Roman", Georgia, serif;
  --font-math: "Latin Modern Math", "Times New Roman", serif;
  --body-size: 1.125rem;    /* 18px ~ 13pt */
  --line-height: 1.6;
}

/* Sidenote positioning */
aside.sidenote {
  position: absolute;
  right: -2in;
  width: 1.75in;
  font-size: 0.85em;
  line-height: 1.4;
  text-align: left;
}

/* Full-width figures */
figure.full-width {
  width: calc(var(--text-width) + var(--margin-width));
  margin-left: calc(-1 * var(--margin-width) / 2);
}

/* Chapter heading */
h1.chapter {
  font-variant: small-caps;
  text-align: center;
  font-size: 1.75em;
  letter-spacing: 0.1em;
}

/* Section heading */
h2.section {
  font-style: italic;
  font-size: 1.25em;
  margin-top: 2em;
}
```

---

## Front Matter Structure

```
[Half-title page]
[Full title page]
[Copyright page]
[Contents (brief)]
[Contents (detailed)]
[Preface / Introduction]
```

### Half-Title Page
- Title only, centered, small caps
- Publisher at bottom margin

### Full Title Page
- Author at top
- Title centered
- Subtitle below (if any)
- Publisher at bottom

### Contents
- Brief contents: Parts + Chapters
- Detailed contents: Parts + Chapters + Sections

---

## Build Checklist

- [ ] Layout template supports sidenotes (position: absolute, right margin)
- [ ] Layout template supports full-width figures (width: text + margin)
- [ ] CSS includes small-caps for chapter headings
- [ ] CSS includes proper line-height for body (1.6)
- [ ] Math display has proper vertical spacing
- [ ] Code blocks have appropriate styling
- [ ] Table of contents generates from chapter/section structure
- [ ] Front matter templates exist (title, copyright, contents)

---

## Common Mistakes

| Mistake | Why it's bad | Fix |
|---------|-------------|-----|
| Centering all headings | Penrose uses small caps for chapters, italic for sections | Use correct semantic elements |
| No margin for equations | Wide equations clip or cause horizontal scroll | `overflow-x: auto` on `.katex-display` |
| Indented first paragraphs | Penrose doesn't indent after chapter headings | Use `.no-indent` class |
| Numbered sections by default | Penrose-style omits section numbers | Override `secnumdepth` |

---

## Related

- `playbooks/init-playbook.md` — Project initialization
- `playbooks/conventions-playbook.md` — Typographic conventions
- `dependencies.md` — KaTeX and marked for math rendering
# CSS Architecture Playbook

## Core Principle: Containment First

CSS accrues complexity. The containment model prevents host page pollution from affecting our content, making the system predictable and portable.

```
Host Page    →    .pob-content    →    Presentation
(reset all)         (isolated)          (base + layout)
```

## The Container Model

### Containment (`all: initial`)
```css
.pob-content {
  all: initial;  /* Break inheritance from host page */
  /* Re-establish what we need */
  font-family: var(--pob-font-main);
  font-size: var(--pob-size);
  ...
}
```

**What this does:**
- Resets ALL CSS properties to initial values
- CSS custom properties are NOT reset (they inherit differently)
- Host page styles cannot affect content inside container

**Trade-off:** `all: initial` also resets CSS variables, so we use `--pob-*` namespace.

### Why not Shadow DOM?
- Requires JavaScript runtime
- Overkill for static SSG
- `all: initial` provides sufficient isolation for our use case

## CSS File Structure

### Single File: `pob.css` (617 lines)

Uses CSS cascade layers for organization:

```css
@layer base, layout;
```

| Layer | Purpose | Contents |
|-------|---------|----------|
| `base` | Readable content without layout | Typography, headings, lists, code, math, figures |
| `layout` | Optional Penrose-style presentation | Margins, sidenotes, columns (only when `.use-layout`) |

**No reset layer** - `all: initial` on container handles isolation.

## Design Tokens

```css
:root {
  --pob-font-main: "Times New Roman", Georgia, serif;
  --pob-font-math: "Latin Modern Math", "Times New Roman", serif;
  --pob-font-mono: "SF Mono", Monaco, "Courier New", monospace;
  
  --pob-size: 1rem;
  --pob-line-height: 1.7;
  --pob-text-color: #1a1a1a;
  --pob-muted: #666;
  --pob-link-color: #1a1a1a;
  
  --pob-spacing: 1.5em;
  --pob-paragraph: 1em;
}

/* Layout tokens (scoped to .use-layout) */
.pob-content.use-layout {
  --pob-text-width: 6.5in;
  --pob-margin-width: 1.5in;
  --pob-gutter: 0.5in;
  --pob-top: 1in;
  --pob-bottom: 1in;
}
```

## Two-Mode Responsive

Our content doesn't care about viewport width in the traditional sense. It has only two meaningful states:

| Viewport | Behavior | Result |
|----------|----------|--------|
| Wide (>45ch available) | Optimize for reading | 65ch max, comfortable lines |
| Narrow (<45ch available) | Optimize for phone | 100% width, stacked |

```css
.pob-content {
  /* Fill available space, but stay readable */
  max-width: clamp(45ch, 100%, 65ch);
}
```

- Never below 45ch (readability floor)
- Never above 65ch (readability ceiling)
- 100% fills available space when between those bounds

In layout mode, the layout layer overrides this to allow the wider Penrose-style presentation (margins + sidenotes).

## Container Classes

Every page gets a `<div class="pob-content">` wrapper. Classes applied:

| Class | Meaning |
|-------|---------|
| `pob-content` | Base class (always present) |
| `chapter` | Chapter-style h1 (small-caps, centered) |
| `half-title` | Half-title page (centered, flex layout) |
| `title-page` | Title page (centered, flex layout) |
| `copyright` | Copyright page (centered, flex layout) |
| `contents-page` | Table of contents page |
| `use-layout` | Layout mode active (margins, sidenotes) |

## Presentation Modes

| Mode | Container Classes | Presentation |
|------|-------------------|--------------|
| Naked | `pob-content [style]` | Base styles only, max-width: 65ch |
| Layout | `pob-content [style] use-layout` | Base + layout, full margins |

Toggle via JavaScript:
```javascript
container.classList.toggle('use-layout');
```

## Content Patterns

### Sidenote
```markdown
:::sidenote:Title text:::
```
Output: `<div class="sidenote">...</div>`

### Explanation Block
```markdown
:::explanation
Prose content...
:::
```
Output: `<div class="explanation">...</div>`

### Figure
```markdown
:::figure
ASCII diagram
:::
```
Output: `<figure><pre><code>...</code></pre></figure>`

### Full-width Figure
```markdown
:::figure{.full-width}
...
:::
```

## Adding New CSS

**Rule of thumb:** If it's about presentation within our container, it's fine. If it's about isolation from the host, the container already handles it.

### Checklist:
1. Is this for all content? → `@layer base`
2. Is this only for layout mode? → `@layer layout` with `.use-layout`
3. Is this for a specific page type? → `.pob-content.[type]`
4. Does it need to reset host styles? → Already done by container

### Selector Pattern:
```css
.pob-content { ... }           /* All content */
.pob-content h1 { ... }        /* All headings */
.pob-content.chapter h1 { ... } /* Chapter h1 only */
.pob-content.use-layout p { ... } /* Paragraphs in layout mode */
```

## Testing Checklist

- [x] All pages render without layout CSS (naked view)
- [x] All pages render with layout CSS (default view)
- [x] Toggle button switches views correctly
- [x] Math renders via KaTeX (pre-rendered at build time)
- [x] Diagrams render correctly (mermaid block in pre/code)
- [x] Sidenotes position correctly in layout mode
- [x] Chapter titles have correct styling (centered, small-caps)
- [x] Title pages display correctly (flex centered layout)
- [x] Containment isolates from host page (verified with `all: initial`)

## Browser Support

- `all: initial` — All evergreen browsers (Chrome 1+, FF 1+, Safari 1+)
- CSS cascade layers (`@layer`) — All evergreen browsers (Chrome 99+, FF 97+, Safari 15.4+)
- `text-wrap: balance` — Chrome 114+, FF 121+, Safari 17.5+

## Blog Post Idea: "A Minimalist CSS Architecture for Embedded Content"

**Pitch:** Most CSS architecture discussions assume you're building a whole page. This talk is about building a content container that can be dropped into ANY page without conflict.

**Outline:**
1. The problem: CSS is global, embedded content is vulnerable
2. Why Shadow DOM is overkill for static content
3. `all: initial` as a lightweight containment solution
4. CSS cascade layers for managing own complexity
5. The resulting architecture: 600 lines, single file, no magic
6. Real-world results: works anywhere, toggles cleanly, maintainable

**Key insight:** The containment model changes how you think about CSS. Instead of "how do I prevent my styles from leaking out?" you think "how do I make a hole in the host page and fill it with my content?"

## Files

- `src/styles/pob.css` — The single CSS file (617 lines)
- `src/templates/layout.html` — Template with `.pob-content` wrapper

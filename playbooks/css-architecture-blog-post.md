# A Minimalist CSS Architecture for Embedded Content

*Published: 2026-06-26*

## The problem nobody talks about

Most CSS architecture discussions assume you're building a complete page. But what happens when you need to embed content—mathematical typesetting, bio-tensegrity diagrams, technical documentation—into a page you don't control?

This is the problem I faced building [Penrose-on-Bilbo](https://github.com/earendil/pob), a static site generator for mathematical content. The content needed to work when:
- Embedded in a host page with its own styles
- Viewed standalone
- Toggled between "naked" (readable) and "layout" (book-like) modes

## The Naive Approach Fails

The obvious solution is "namespace everything." Use classes like `.pob-h1`, `.pob-section`, `.pob-sidenote`. The problem: host page styles can still leak in through:
- Global resets (`* { margin: 0 }`)
- Element selectors (`h1 { ... }`)
- Higher specificity selectors

You're fighting a losing battle trying to outspecificity a hostile environment.

## Why Shadow DOM Is Overkill

The "correct" solution in component-based frameworks is Shadow DOM. It creates true isolation—a DOM subtree that styles can't penetrate. But for static, pre-rendered content, Shadow DOM requires:
- JavaScript runtime
- Web Components infrastructure
- Complexity that doesn't match the problem

When your content is already rendered HTML, adding a runtime dependency feels wrong.

## The Lightweight Solution: `all: initial`

Turns out there's a simpler answer hiding in plain sight. The CSS property `all: initial` resets **all** properties to their initial values—including inheritance. Apply it to a wrapper, and you get containment without complexity:

```css
.pob-content {
  all: initial;  /* Host page styles bounce off */
  /* Re-establish what we need */
  font-family: "Times New Roman", Georgia, serif;
  font-size: 1rem;
  color: #1a1a1a;
}
```

That's it. The wrapper becomes a "hole" in the host page. Everything inside is ours.

**Trade-off:** `all: initial` also resets CSS custom properties (variables). So we namespace ours: `--pob-*` instead of `--font-*`.

## Two Modes, No Compromise

Here's the insight that simplified everything: **our content has only two meaningful states**.

| Viewport | Behavior | Result |
|----------|----------|--------|
| Wide (>45ch available) | Optimize for reading | 65ch max, comfortable lines |
| Narrow (<45ch available) | Optimize for phone | 100% width, stacked |

No breakpoints to manage. No "tablet" consideration. No "between sizes" edge cases. Either there's room to read comfortably, or there isn't.

**The implementation:**

```css
.pob-content {
  /* Fill available space, but never less than 45ch or more than 65ch */
  max-width: clamp(45ch, 100%, 65ch);
}
```

`clamp(min, preferred, max)` — the preferred value (100%) tries to fill the container, but:
- Never below 45ch (readability floor)
- Never above 65ch (readability ceiling)

**Why 45-65ch?** Research consistently shows 45-75 characters per line is optimal for reading. We pick 45-65ch as our target range. Simple.

## Layering Our Own Complexity

Once isolated from the host, we still need to manage our own CSS. This is where CSS cascade layers (`@layer`) shine:

```css
@layer base, layout;

/* Base layer: readable without layout */
@layer base {
  .pob-content {
    all: initial;
    --pob-font-main: "Times New Roman", Georgia, serif;
    --pob-size: 1rem;
    /* ... */
  }
}

/* Layout layer: optional Penrose-style presentation */
@layer layout {
  .pob-content.use-layout {
    max-width: calc(6.5in + 1.5in);
    /* Sidenotes float into margin */
  }
}
```

The layers let us toggle between "naked" (base only) and "layout" (base + layout) without duplicating rules or using `!important`.

## The Result

617 lines. Single file. No magic.

```css
@layer base, layout;

/* Containment + tokens */
@layer base {
  .pob-content {
    all: initial;
    max-width: clamp(45ch, 100%, 65ch);
    /* ... */
  }
}

/* Layout mode */
@layer layout {
  .pob-content.use-layout { /* ... */ }
}
```

The toggle becomes trivial:

```javascript
container.classList.toggle('use-layout');
```

## What We Get

1. **Host page isolation** — `all: initial` breaks inheritance
2. **Own cascade management** — CSS layers organize our styles
3. **Portable content** — Drop the wrapper anywhere, it works
4. **Clean toggle** — Naked vs layout without page reload
5. **Responsive by nature** — Two states, no breakpoints
6. **Maintainable** — 617 lines, single file, clear structure

## The Mental Shift

Instead of thinking:

> "How do I prevent my styles from leaking out and host styles from leaking in?"

Think:

> "How do I make a hole in the host page and fill it with my content?"

Or even more simply:

> "We either have the room to be comfortable, or we don't. Two options. No compromise."

Containment first, presentation second, responsiveness by constraint. Simple.

---

**Code:** [github.com/earendil/pob](https://github.com/earendil/pob)  
**CSS file:** 617 lines, single file  
**Dependencies:** None (CSS only)
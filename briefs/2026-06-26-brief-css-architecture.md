# A Minimalist CSS Architecture for Embedded Content

**The problem nobody talks about:** Most CSS architecture discussions assume you're building a complete page. But what happens when you need to embed content—mathematical typesetting, bio-tensegrity diagrams, technical documentation—into a page you don't control?

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

## Layering Our Own Complexity

Once isolated from the host, we still need to manage our own CSS. This is where CSS cascade layers (`@layer`) shine:

```css
@layer base, layout;

/* Base layer: readable without layout */
@layer base {
  .pob-content {
    all: initial;
    max-width: 65ch;  /* Optimal reading width */
  }
  .pob-content h1 { font-size: 2rem; }
  .pob-content p { margin: 1em 0; }
  /* ... */
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

600 lines. Single file. No magic.

```css
@layer base, layout;

/* Containment + tokens */
@layer base {
  .pob-content {
    all: initial;
    --pob-font-main: "Times New Roman", Georgia, serif;
    --pob-size: 1rem;
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
5. **Maintainable** — 600 lines, single file, clear structure

## What We Lose

Nothing essential. The approach works in all evergreen browsers (Chrome 1+, Firefox 1+, Safari 1+). Cascade layers need 2022+ browsers, but degrade gracefully.

The "limitation" is that our variables use `--pob-*` namespace—but that's actually a feature. Explicit naming prevents collisions.

## The Mental Shift

Instead of thinking:
> "How do I prevent my styles from leaking out and host styles from leaking in?"

Think:
> "How do I make a hole in the host page and fill it with my content?"

Containment first, presentation second. The container handles isolation; the layers handle complexity. Simple.

---

**Code:** [github.com/earendil/pob](https://github.com/earendil/pob)
**CSS file:** 617 lines, single file
**Dependencies:** None (CSS only)
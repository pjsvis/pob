# Tree View Playbook

## Two Tree View Approaches

We have two modes for displaying directory trees:

1. **Terminal**: Simple ANSI art tree (built into CLI)
2. **Browser**: `@pierre/trees` web component (for interactive file browsing)

---

## Terminal Tree (Default)

Our CLI includes a built-in tree command:

```bash
pob tree              # Show project tree
pob tree --depth 2    # Limit depth
just tree             # Via just facade
```

Implementation lives in `src/commands/tree.ts`. No external dependencies.

**Why it's simple:**
- ASCII/emoji art for terminal
- No web components, no shadow DOM
- Fast, zero dependency
- Works everywhere

---

## Browser Tree (`@pierre/trees`)

For interactive file browsing in the browser, we can use `@pierre/trees`.

**Status:** ⚠️ Requires attention

### Known Issues

| Issue | Impact |
|-------|--------|
| Shadow DOM CSS cascade | Safari shows black screen |
| SSR hydration complexity | Requires JS to attach shadow roots |
| CSS variable resolution | `--trees-bg-override` doesn't penetrate shadow DOM |

### When to Use

`@pierre/trees` is appropriate when:
- The component owns its entire visual surface (no external CSS influence)
- Not doing SSR — JS loads client-side only
- You control the shadow DOM CSS

### When to Avoid

Avoid shadow DOM web components for:
- SSR scenarios (rendering to HTML, then hydrating)
- Layout containers that need to blend with host page CSS
- Any case where CSS variables need to propagate from light DOM to shadow DOM

### Raw HTML Baseline Pattern

When adding browser trees, always start with raw HTML:

1. ✅ Raw HTML + inline styles → confirmed working
2. ⏳ Add content via HTMX swaps
3. ⏳ Fold in `@pierre/trees` via JS bundle (no SSR)
4. ⏳ Restore full CSS theming once layout is solid

### Library Info

```
@pierre/trees@1.0.0-beta.4
MIT License
Dependencies: preact, preact-render-to-string
```

Install:
```bash
bun add @pierre/trees
```

---

## The Anti-Barnacle Principle

Don't add `@pierre/trees` "just because." If a simple terminal tree works for your use case, use that. Web components with shadow DOM add complexity that must be justified.

**Rule:** If you can't explain why you need a browser-based tree in one sentence, use the terminal tree.

---

## Related

- `playbooks/init-playbook.md` — Project initialization
- `playbooks/conventions-playbook.md` — Active conventions
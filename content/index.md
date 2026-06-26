# The Poverty of Biomechanics

> *"The purpose of computing is insight, not numbers."* — Richard Hamming

## Introduction

This is a minimal Static Site Generator for mathematical content. It demonstrates server-side KaTeX rendering with zero client-side latency.

## Inline Math

The metric tensor $g_{ij}$ defines the distance between two infinitesimally close points:

$$ds^2 = g_{ij}dx^i dx^j$$

## Display Math

The Einstein field equations relate spacetime curvature to energy-momentum:

$$R_{\mu\nu} - \frac{1}{2}g_{\mu\nu}R = \frac{8\pi G}{c^4}T_{\mu\nu}$$

## Code Blocks

```typescript
function renderKaTeX(text: string): string {
  return text.replace(/\$([^\$\n]+?)\$/g, (_, math) => {
    return katex.renderToString(math.trim(), { displayMode: false });
  });
}
```

## Tables

| Symbol | Meaning |
|--------|---------|
| $g_{ij}$ | Metric tensor |
| $R_{\mu\nu}$ | Ricci curvature |
| $T_{\mu\nu}$ | Energy-momentum tensor |
| $G$ | Gravitational constant |

## Verification Test

- Inline: $E = mc^2$
- Display: $$\oint_\Gamma \mathbf{E} \cdot d\mathbf{l} = -\frac{d\Phi_B}{dt}$$
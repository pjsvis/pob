---
title: Chapter I
style: chapter
---

# Riemannian Geometry

:::newthought
In this chapter we develop the mathematical framework
:::

## §1.1 The Metric Tensor

The metric tensor $g_{\mu\nu}$ is the fundamental object that defines the geometry of a manifold. Given a coordinate system $\{x^\mu\}$, the metric assigns a scalar product to each tangent space.

:::sidenote
The metric is symmetric: $g_{\mu\nu} = g_{\nu\mu}$.
:::

The distance between two infinitesimally close points is:

$$
ds^2 = g_{\mu\nu}\,dx^\mu\,dx^\nu
$$

This expression, known as the **line element**, encapsulates all geometric information about the space.

## §1.2 Christoffel Symbols

The connection coefficients (Christoffel symbols) describe how vectors are parallel transported:

:::sidenote
Not tensors—transform homogeneously under coordinate changes.
:::

$$
\Gamma^\lambda_{\mu\nu} = \frac{1}{2}g^{\lambda\sigma}\left(
  \partial_\mu g_{\nu\sigma} + \partial_\nu g_{\mu\sigma} - \partial_\sigma g_{\mu\nu}
\right)
$$

:::figure:1.1:Coordinate transformation between two charts on a smooth manifold. The metric tensor transforms covariantly, while the Christoffel symbols transform inhomogeneously.
```
(x⁰,x¹,x²,x³)  ──────▶  (x'⁰,x'¹,x'²,x'³)
     │                           │
     │  g_{μν}                   │  g'_{μν}
     ▼                           ▼
  Metric                    Metric
Tensor Field              Tensor Field
     │                           │
     ▼                           ▼
Christoffel                Christoffel
Symbols: Γⁿ_{μν}          Symbols: Γ'ⁿ_{μν}
```
:::

## §1.3 Parallel Transport

A vector $V^\mu$ is parallel transported along a curve $x^\lambda(\tau)$ when:

$$
\frac{DV^\mu}{d\tau} = \frac{dx^\nu}{d\tau}\nabla_\nu V^\mu = 0
$$

Expanding this gives the **geodesic equation**:

:::sidenote
This is the Euler-Lagrange equation for the action $S = \int ds$.
:::

$$
\frac{d^2x^\mu}{d\tau^2} + \Gamma^\mu_{\nu\lambda}\frac{dx^\nu}{d\tau}\frac{dx^\lambda}{d\tau} = 0
$$

---

## §1.4 The Riemann Curvature Tensor

The Riemann tensor measures the failure of parallel transport to be path-independent:

$$
R^\rho_{\;\mu\nu\lambda} = \partial_\nu\Gamma^\rho_{\mu\lambda} - \partial_\lambda\Gamma^\rho_{\mu\nu} + \Gamma^\rho_{\nu\sigma}\Gamma^\sigma_{\mu\lambda} - \Gamma^\rho_{\lambda\sigma}\Gamma^\sigma_{\mu\nu}
$$

Key properties:

:::sidenote
These symmetries reduce the 256 components in 4D to just 20 independent ones.
:::

| Property | Expression |
|----------|------------|
| Antisymmetry | $R_{\mu\nu\rho\sigma} = -R_{\nu\mu\rho\sigma}$ |
| Pair symmetry | $R_{\mu\nu\rho\sigma} = R_{\rho\sigma\mu\nu}$ |
| First Bianchi | $R_{[\mu\nu\rho]\sigma} = 0$ |

The **Ricci tensor** is the contraction:

$$
R_{\mu\nu} = R^\lambda_{\;\mu\lambda\nu}
$$

And the **Ricci scalar**:

$$
R = g^{\mu\nu}R_{\mu\nu}
$$
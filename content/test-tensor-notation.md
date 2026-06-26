# Tensor Calculus Notation Test Suite

This document tests the full range of mathematical notation rendering — inline symbols, display equations, and code blocks with embedded math.

---

## 1. Basic Tensor Notation

The metric tensor $g_{\mu\nu}$ defines distances in spacetime. Its inverse $g^{\mu\nu}$ satisfies:

$$g_{\mu\nu} g^{\nu\rho} = \delta^\rho_\mu$$

The Levi-Civita symbol $\epsilon_{\mu\nu\rho\sigma}$ is fully antisymmetric:

$$\epsilon_{0123} = \sqrt{|g|}$$

---

## 2. Covariant and Contravariant Indices

A vector in contravariant form: $V^\mu = (V^0, V^i)$

A covector in covariant form: $V_\mu = g_{\mu\nu} V^\nu$

Mixed tensor: $T^\mu_{\ \nu\rho}$

Raising and lowering indices:
$$V_\mu = g_{\mu\nu} V^\nu$$
$$V^\mu = g^{\mu\nu} V_\nu$$

---

## 3. Christoffel Symbols (Connection Coefficients)

The Christoffel symbols of the second kind:
$$\Gamma^\mu_{\ \nu\rho} = \frac{1}{2} g^{\mu\sigma} \left( \partial_\nu g_{\rho\sigma} + \partial_\rho g_{\nu\sigma} - \partial_\sigma g_{\nu\rho} \right)$$

Symmetry in lower indices:
$$\Gamma^\mu_{\ \nu\rho} = \Gamma^\mu_{\ \rho\nu}$$

Covariant derivative of a vector:
$$\nabla_\mu V^\nu = \partial_\mu V^\nu + \Gamma^\nu_{\ \mu\rho} V^\rho$$

---

## 4. Riemann Curvature Tensor

The Riemann tensor with all four indices:
$$R^\mu_{\ \nu\rho\sigma} = \partial_\rho \Gamma^\mu_{\ \nu\sigma} - \partial_\sigma \Gamma^\mu_{\ \nu\rho} + \Gamma^\mu_{\ \rho\lambda} \Gamma^\lambda_{\ \nu\sigma} - \Gamma^\mu_{\ \sigma\lambda} \Gamma^\lambda_{\ \nu\rho}$$

Symmetries:
$$R_{\mu\nu\rho\sigma} = -R_{\nu\mu\rho\sigma} = -R_{\mu\nu\sigma\rho} = R_{\rho\sigma\mu\nu}$$

First Bianchi identity:
$$R_{[\mu\nu\rho]\sigma} = 0$$

---

## 5. Ricci Tensor and Scalar

Contracting the Riemann tensor:
$$R_{\mu\nu} = R^\rho_{\ \mu\rho\nu}$$

Ricci scalar:
$$R = g^{\mu\nu} R_{\mu\nu} = R^\mu_{\ \mu}$$

---

## 6. Einstein Field Equations

The full EFE in geometric units ($G = c = 1$):
$$R_{\mu\nu} - \frac{1}{2} g_{\mu\nu} R + \Lambda g_{\mu\nu} = 8\pi T_{\mu\nu}$$

Energy-momentum tensor trace:
$$T = g^{\mu\nu} T_{\mu\nu}$$

Stress-energy for perfect fluid:
$$T_{\mu\nu} = (\rho + p) U_\mu U_\nu + p g_{\mu\nu}$$

---

## 7. Covariant Derivative Operations

Divergence of a vector:
$$\nabla_\mu V^\mu = \frac{1}{\sqrt{|g|}} \partial_\mu (\sqrt{|g|} V^\mu)$$

Divergence of a rank-2 tensor:
$$\nabla_\mu T^{\mu\nu} = \frac{1}{\sqrt{|g|}} \partial_\mu (\sqrt{|g|} T^{\mu\nu}) + \Gamma^\nu_{\ \mu\rho} T^{\mu\rho}$$

Laplacian of a scalar:
$$\nabla^2 \phi = g^{\mu\nu} \nabla_\mu \nabla_\nu \phi = \frac{1}{\sqrt{|g|}} \partial_\mu (\sqrt{|g|} g^{\mu\nu} \partial_\nu \phi)$$

---

## 8. Geodesic Equation

The geodesic equation of motion:
$$\frac{d^2 x^\mu}{d\tau^2} + \Gamma^\mu_{\ \nu\rho} \frac{dx^\nu}{d\tau} \frac{dx^\rho}{d\tau} = 0$$

Affine parameter: $\tau$

Proper velocity: $u^\mu = \frac{dx^\mu}{d\tau}$

---

## 9. Code Blocks with Math

Inline math within code blocks should **not** be rendered as KaTeX:

```
# Wrong — this should be literal text, not rendered
R_{\mu\nu} - \frac{1}{2}g_{\mu\nu}R = 8\pi T_{\mu\nu}
```

Code blocks preserve the raw text for display purposes.

---

## 10. Greek Alphabet (Inline Test)

| Lower | Upper | Name |
|-------|-------|------|
| $\alpha$ | $A$ | Alpha |
| $\beta$ | $B$ | Beta |
| $\gamma$ | $\Gamma$ | Gamma |
| $\delta$ | $\Delta$ | Delta |
| $\epsilon$ | $E$ | Epsilon |
| $\zeta$ | $Z$ | Zeta |
| $\eta$ | $H$ | Eta |
| $\theta$ | $\Theta$ | Theta |
| $\iota$ | $I$ | Iota |
| $\kappa$ | $K$ | Kappa |
| $\lambda$ | $\Lambda$ | Lambda |
| $\mu$ | $M$ | Mu |
| $\nu$ | $N$ | Nu |
| $\xi$ | $\Xi$ | Xi |
| $o$ | $O$ | Omicron |
| $\pi$ | $\Pi$ | Pi |
| $\rho$ | $P$ | Rho |
| $\sigma$ | $\Sigma$ | Sigma |
| $\tau$ | $T$ | Tau |
| $\upsilon$ | $\Upsilon$ | Upsilon |
| $\phi$ | $\Phi$ | Phi |
| $\chi$ | $X$ | Chi |
| $\psi$ | $\Psi$ | Psi |
| $\omega$ | $\Omega$ | Omega |

---

## 11. Operators and Special Symbols

Partial derivative: $\partial_\mu$

Nabla (gradient): $\nabla_\mu$

D'Alembertian: $\Box = \nabla^\mu \nabla_\mu$

Laplace: $\Delta = \nabla^2$

Del operator: $\nabla$

Dot product: $\cdot$

Cross product: $\times$

Contraction: $A_\mu B^\mu$

---

## 12. Integration and Limits

Surface integral:
$$\oint_S \mathbf{E} \cdot d\mathbf{A} = \frac{Q}{\epsilon_0}$$

Line integral:
$$\int_C \mathbf{B} \cdot d\mathbf{l} = \mu_0 I_{\text{enc}}$$

Proper volume element:
$$dV = \sqrt{|g|} \, dx^0 dx^1 dx^2 dx^3$$

---

## 13. Complex Display Equations

Weyl tensor (trace-free part of Riemann):
$$C_{\mu\nu\rho\sigma} = R_{\mu\nu\rho\sigma} - \frac{2}{n-2}(g_{[\mu|} R_{|\nu]\rho\sigma} + g_{\rho[\mu|} R_{|\sigma]\nu}) + \frac{2}{(n-1)(n-2)} R \, g_{[\mu|\rho} g_{|\sigma]\nu}$$

Energy conservation:
$$\nabla_\mu T^{\mu\nu} = 0$$

Maxwell's equations in curved spacetime:
$$\nabla_\mu F^{\mu\nu} = -4\pi J^\nu$$
$$\nabla_{[\lambda} F_{\mu\nu]} = 0$$

---

## 14. Matrix/Tensor Notation

The stress-energy tensor as a matrix:
$$
T^{\mu\nu} = \begin{pmatrix}
\rho & S_x & S_y & S_z \\
S_x & p_x & \Pi_{xy} & \Pi_{xz} \\
S_y & \Pi_{yx} & p_y & \Pi_{yz} \\
S_z & \Pi_{zx} & \Pi_{zy} & p_z
\end{pmatrix}
$$

Kronecker delta:
$$\delta^\mu_\nu = \begin{cases} 1 & \text{if } \mu = \nu \\ 0 & \text{otherwise} \end{cases}$$

---

## 15. Verification Checklist

- [ ] Inline single-letter: $g$, $R$, $T$
- [ ] Inline subscript: $g_{\mu\nu}$, $R_{\mu\nu}$
- [ ] Inline superscript: $V^\mu$, $x^\mu$
- [ ] Inline mixed: $T^\mu_{\ \nu}$, $R^\mu_{\ \nu\rho\sigma}$
- [ ] Display simple: $$E = mc^2$$
- [ ] Display fraction: $$\frac{a}{b}$$
- [ ] Display sqrt: $$\sqrt{g_{\mu\nu}}$$
- [ ] Display sum: $$\sum_{i=0}^n$$
- [ ] Display integral: $$\int_a^b$$
- [ ] Display matrix: Using pmatrix environment
- [ ] Code blocks should NOT render as math

---

## 16. Error Test Cases

This should render as error (invalid syntax):
$$\mathcal{\invalid}$$

This should render normally:
$$\mathcal{L}$$

---

*Last verified: Built with KaTeX server-side rendering*
# Brief: D’Alembertian Symbol Integration

**Date:** 2026‑07‑02

**Purpose**
Introduce a dedicated visual token for the D’Alembertian operator (□ = ∂²/∂t² − ∇²) into the hybrid ASCII → SVG diagram pipeline. The token `▱` (light‑box) will be rendered as a double‑lined square (`<rect class="dalembertian">`). This avoids ambiguity with the existing tensor‑node square (`□`).

**Key Points**
- **Token:** `▱` (Unicode U+25A1) – visually similar to `□` but distinct.
- **SVG primitive:** `<rect>` with `stroke-dasharray:4 2` to give a double‑line appearance.
- **CSS class:** `.dalembertian` defined in `src/styles/pob.css` (inside the `@media print` block for graceful grayscale fallback).
- **Documentation:** Updated the *Penrose Symbol Set* table in `playbooks/diagram-infrastructure-playbook.md` and added a demo page `content/dalembertian-demo.md`.
- **Review:** Ensure the symbol renders correctly in both colour and grayscale, and that it does not clash with other symbols.

**Outcome**
The D’Alembertian is now a first‑class visual element in our diagrams, supporting clearer exposition of wave‑equation and field‑theory content.

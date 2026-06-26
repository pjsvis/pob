# Epic: Hybrid ASCII‑→‑SVG Diagram Pipeline

**ID:** EPIC‑001‑SVG

**Goal** – Provide a deterministic, low‑entropy SVG generation pipeline for Penrose‑style diagrams, using a simple ASCII token set.

---

## Review Stages

1. **Design Review** – Validate the primitive symbol set against all existing diagrams (Penrose triangle, staircase, bio‑tensegrity). Ensure every required visual element has a corresponding ASCII token.
2. **Prototype Implementation** – Extend `src/agents/diagrams.ts` with a parser and SVG renderer. Generate SVGs for the three pilot diagrams.
3. **Technical Review** – Verify that the SVGs:
   - Fit within the fixed `viewBox` (or overflow correctly).
   - Preserve the intended geometry (no skewed arrows, correct node shapes).
   - Contain the expected `<marker>` definitions for arrows.
4. **User‑Understanding Review** – Have a domain expert inspect the generated diagrams and confirm that they convey the intended tensor‑algebra concepts without extra effort.
5. **Documentation Review** – Ensure the playbooks, briefs, and ADR reflect the new workflow and that all deprecated references have been removed.
6. **Final Acceptance** – Merge the changes, run the full test suite, and close the epic.

---

## Acceptance Criteria
- All existing Penrose diagrams render correctly with the hybrid pipeline.
- No layout‑breaking regressions appear in the preview server.
- The `ascii-diagram` container automatically adds scrollbars when the diagram exceeds the viewBox.
- Documentation (playbooks, README, ADR) is up‑to‑date and free of barnacle entries.

---

## Timeline (suggested)
- **Day 1‑2:** Design Review & Symbol Set finalisation.
- **Day 3‑5:** Prototype implementation.
- **Day 6:** Technical Review.
- **Day 7:** User‑Understanding Review.
- **Day 8:** Documentation Review.
- **Day 9‑10:** Final Acceptance & merge.

---

**Owner:** <Your Name>

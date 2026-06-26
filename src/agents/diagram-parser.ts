/**
 * Hybrid ASCII→SVG Diagram Parser
 *
 * Parses a limited ASCII token set into an intermediate AST that a renderer
 * can turn into true SVG primitives (lines, arrows, shapes, markers).
 *
 * Canonical strategy: ADR-002 (hybrid ASCII→SVG).
 * Symbol set: playbooks/diagram-infrastructure-playbook.md
 *
 * Design note: the parser is deliberately positional. Each recognised token
 * occupies a grid cell; the AST preserves (col, row) so the renderer can map
 * to SVG coordinates deterministically. Unknown characters are ignored —
 * diagrams that use none of the hybrid tokens should fall back to the
 * text-in-<pre> renderer, not error out.
 */

// === AST ===

export type DiagramElement =
  | { kind: "half-space"; col: number; row: number; span: number }
  | { kind: "field-arrow"; col: number; row: number; direction: ArrowDirection }
  | { kind: "node"; col: number; row: number; shape: NodeShape }
  | { kind: "leg"; col: number; row: number; orientation: "horizontal" | "vertical" }
  | { kind: "identity"; col: number; row: number; orientation: "horizontal" | "vertical" }
  | { kind: "contraction"; col: number; row: number }
  | { kind: "dalembertian"; col: number; row: number }
  | { kind: "matrix-stamp"; col: number; row: number; shape: StampShape }
  | { kind: "label"; col: number; row: number; text: string };

export type ArrowDirection = "down" | "up" | "left" | "right";
export type NodeShape = "circle" | "square" | "triangle";
export type StampShape = "diamond" | "triangle" | "circle-double";

export interface DiagramAst {
  elements: DiagramElement[];
  cols: number;
  rows: number;
}

// === Token recognition ===

const NODE_CHARS: Record<string, NodeShape> = {
  "o": "circle",
  "□": "square",
  "△": "triangle",
};

const STAMP_CHARS: Record<string, StampShape> = {
  "◇": "diamond",
  "Δ": "triangle",
  "⊚": "circle-double",
};

const FIELD_ARROWS: Record<string, ArrowDirection> = {
  "↓": "down",
  "↑": "up",
  "←": "left",
  "→": "right",
};

const DALEMBERTIAN = "▱";
const CONTRACTION = "⟲";
const VERTICAL_LEG = "|";
// Horizontal connectors: em-dash, en-dash, hyphen, box-drawing horizontal
const HORIZONTAL_LEGS = new Set(["—", "–", "-", "─", "━"]);
const IDENTITY = "=";
const HALF_SPACE_RUN = /-{3,}/; // three or more hyphens on one line

// Structural tokens distinguish a hybrid tensor diagram from prose that
// happens to contain an arrow. A lone → (e.g. in an illustration) must NOT
// trigger the hybrid pipeline — at least one node, stamp, half-space,
// d'Alembertian, or contraction is required.
const STRUCTURAL_CHARS = new Set([
  ...Object.keys(NODE_CHARS),
  ...Object.keys(STAMP_CHARS),
  DALEMBERTIAN,
  CONTRACTION,
]);

// === Parser ===

/**
 * Does this block use the hybrid symbol set?
 * Used to decide between the hybrid parser and the text fallback.
 * Requires at least one STRUCTURAL token (node, stamp, half-space,
 * d'Alembertian, or contraction) — a lone field arrow is not enough,
 * because illustrations use → for direction.
 */
export function isHybridDiagram(text: string): boolean {
  const lines = text.split("\n");
  for (const line of lines) {
    if (HALF_SPACE_RUN.test(line)) return true;
    for (const ch of line) {
      if (STRUCTURAL_CHARS.has(ch)) return true;
    }
  }
  return false;
}

/**
 * Parse an ASCII diagram block into a positional AST.
 *
 * The grid is character-based: col = character index within a line,
 * row = line index. Multi-character runs (e.g. `---`) collapse to a
 * single element anchored at the starting col with a span.
 */
export function parseDiagram(text: string): DiagramAst {
  const lines = text.replace(/\n$/, "").split("\n");
  const rows = lines.length;
  const cols = Math.max(...lines.map((l) => l.length), 0);

  const elements: DiagramElement[] = [];

  for (let row = 0; row < rows; row++) {
    const line = lines[row];

    // Half-space runs: ---  (3+ hyphens)
    const halfSpaceMatch = line.match(HALF_SPACE_RUN);
    if (halfSpaceMatch && halfSpaceMatch.index !== undefined) {
      // Find the full extent of the run
      const start = halfSpaceMatch.index;
      let end = start;
      while (end < line.length && line[end] === "-") end++;
      elements.push({ kind: "half-space", col: start, row, span: end - start });
      // Continue scanning the rest of the line for other tokens (rare but possible)
    }

    // Scan character by character for single-cell tokens
    for (let col = 0; col < line.length; col++) {
      const ch = line[col];

      if (ch in NODE_CHARS) {
        elements.push({ kind: "node", col, row, shape: NODE_CHARS[ch] });
      } else if (ch in STAMP_CHARS) {
        elements.push({ kind: "matrix-stamp", col, row, shape: STAMP_CHARS[ch] });
      } else if (ch in FIELD_ARROWS) {
        elements.push({ kind: "field-arrow", col, row, direction: FIELD_ARROWS[ch] });
      } else if (ch === DALEMBERTIAN) {
        elements.push({ kind: "dalembertian", col, row });
      } else if (ch === CONTRACTION) {
        elements.push({ kind: "contraction", col, row });
      } else if (ch === VERTICAL_LEG) {
        elements.push({ kind: "leg", col, row, orientation: "vertical" });
      } else if (HORIZONTAL_LEGS.has(ch)) {
        // Coalesce a run of horizontal legs into one element
        let end = col + 1;
        while (end < line.length && HORIZONTAL_LEGS.has(line[end])) end++;
        elements.push({
          kind: "leg",
          col,
          row,
          orientation: "horizontal",
        });
        // Skip the rest of the run (but the span is implicit from grid position)
        col = end - 1;
      } else if (ch === IDENTITY) {
        // Coalesce runs of = into one identity leg
        let end = col + 1;
        while (end < line.length && line[end] === IDENTITY) end++;
        elements.push({
          kind: "identity",
          col,
          row,
          orientation: "horizontal",
        });
        col = end - 1;
      }
      // Unknown characters (spaces, letters, etc.) are ignored.
      // Labels could be added later: runs of alphanumerics → label elements.
    }
  }

  return { elements, cols, rows };
}

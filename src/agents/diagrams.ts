/**
 * Diagram Processor
 *
 * Two rendering paths (ADR-002):
 *   - Hybrid ASCII→SVG: parse a token set → true SVG primitives.
 *   - Mermaid: server-side placeholder (mermaid needs a DOM; deferred).
 *
 * Pipeline: processDiagrams() replaces fenced diagram blocks with numbered
 * placeholder comments; injectDiagrams() swaps in the real SVG AFTER
 * marked.parse, so the markdown parser never escapes the raw SVG.
 */

import { parseDiagram, isHybridDiagram, type DiagramAst, type DiagramElement } from "./diagram-parser.js";

// === Mermaid (placeholder) ===
//
// Mermaid requires a DOM; real server-side rendering is deferred. The
// placeholder is honest about being a placeholder — it shows the source.

let diagramCounter = 0;

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export async function renderMermaid(code: string): Promise<string> {
  diagramCounter++;
  const id = `mermaid-${Date.now()}-${diagramCounter}`;
  const lines = code.trim().split("\n");
  const height = Math.min(lines.length * 20 + 40, 200);
  const rows = lines.slice(0, 8).map((line, i) =>
    `<text x="10" y="${60 + i * 14}">${escapeXml(line.slice(0, 50))}</text>`
  ).join("\n  ");
  const more = lines.length > 8 ? `<text x="10" y="${60 + 8 * 14}">... (${lines.length - 8} more lines)</text>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${height}" class="mermaid-placeholder">
  <style>text { font-family: "SF Mono", Monaco, monospace; font-size: 11px; fill: #666; }</style>
  <text x="10" y="20">Mermaid Diagram (not rendered server-side)</text>
  <text x="10" y="40" font-size="9">${id}</text>
  ${rows}
  ${more}
</svg>`;
}

// === Hybrid ASCII→SVG Renderer ===
//
// Maps a parsed DiagramAst to true SVG primitives. Grid coordinates use a
// fixed cell size; the viewBox is derived from cols/rows so diagrams scale
// deterministically. Per ADR-002, overflow is handled by the container CSS.

const CELL = 28;          // px per grid cell
const NODE_R = 8;         // node radius
const STAMP_R = 9;        // matrix-stamp radius
const ARROW_LEN = 22;     // field-arrow shaft length

function escapeSvg(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Centre x of a grid column. */
function cx(col: number): number {
  return col * CELL + CELL / 2;
}

/** Centre y of a grid row. */
function cy(row: number): number {
  return row * CELL + CELL / 2;
}

function nodeSvg(shape: "circle" | "square" | "triangle", col: number, row: number): string {
  const x = cx(col), y = cy(row);
  const cls = `diagram-node diagram-node-${shape}`;
  switch (shape) {
    case "circle":
      return `<circle class="${cls}" cx="${x}" cy="${y}" r="${NODE_R}"/>`;
    case "square":
      return `<rect class="${cls}" x="${x - NODE_R}" y="${y - NODE_R}" width="${2 * NODE_R}" height="${2 * NODE_R}"/>`;
    case "triangle":
      return `<polygon class="${cls}" points="${x},${y - NODE_R} ${x - NODE_R},${y + NODE_R} ${x + NODE_R},${y + NODE_R}"/>`;
  }
}

function stampSvg(shape: "diamond" | "triangle" | "circle-double", col: number, row: number): string {
  const x = cx(col), y = cy(row);
  const r = STAMP_R;
  switch (shape) {
    case "diamond":
      return `<polygon class="diagram-stamp diagram-stamp-diamond" points="${x},${y - r} ${x + r},${y} ${x},${y + r} ${x - r},${y}"/>`;
    case "triangle":
      return `<polygon class="diagram-stamp diagram-stamp-triangle" points="${x},${y - r} ${x - r},${y + r} ${x + r},${y + r}"/>`;
    case "circle-double":
      return `<circle class="diagram-stamp diagram-stamp-circle" cx="${x}" cy="${y}" r="${r}"/><circle class="diagram-stamp diagram-stamp-circle-inner" cx="${x}" cy="${y}" r="${r - 3}"/>`;
  }
}

function fieldArrowSvg(direction: "down" | "up" | "left" | "right", col: number, row: number): string {
  const x = cx(col), y = cy(row);
  const half = ARROW_LEN / 2;
  let x1 = x, y1 = y, x2 = x, y2 = y;
  switch (direction) {
    case "down":  y1 = y - half; y2 = y + half; break;
    case "up":    y1 = y + half; y2 = y - half; break;
    case "left":  x1 = x + half; x2 = x - half; break;
    case "right": x1 = x - half; x2 = x + half; break;
  }
  return `<line class="diagram-arrow" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" marker-end="url(#arrowhead)"/>`;
}

function legSvg(orientation: "horizontal" | "vertical", col: number, row: number): string {
  const x = cx(col), y = cy(row);
  const half = CELL / 2;
  if (orientation === "horizontal") {
    return `<line class="diagram-leg" x1="${x - half}" y1="${y}" x2="${x + half}" y2="${y}"/>`;
  }
  return `<line class="diagram-leg" x1="${x}" y1="${y - half}" x2="${x}" y2="${y + half}"/>`;
}

/**
 * Render a parsed hybrid diagram AST to an SVG string.
 */
export function renderHybridSvg(ast: DiagramAst): string {
  const width = ast.cols * CELL;
  const height = ast.rows * CELL;

  const body = ast.elements.map((el: DiagramElement) => {
    switch (el.kind) {
      case "half-space":
        // Half-space = Euclidean plane / ground floor. Spans the full canvas
        // width (per playbook) regardless of how many hyphens the author typed.
        return `<line class="diagram-half-space" x1="0" y1="${cy(el.row)}" x2="${ast.cols * CELL}" y2="${cy(el.row)}"/>`;
      case "field-arrow":
        return fieldArrowSvg(el.direction, el.col, el.row);
      case "node":
        return nodeSvg(el.shape, el.col, el.row);
      case "leg":
        return legSvg(el.orientation, el.col, el.row);
      case "identity":
        // Identity renders as a leg with a distinct class
        return legSvg(el.orientation, el.col, el.row).replace("diagram-leg", "diagram-identity");
      case "contraction":
        return `<path class="diagram-contraction" d="M ${cx(el.col)} ${cy(el.row) - 6} a 6 6 0 1 1 0.1 0"/>`;
      case "dalembertian":
        return `<rect class="diagram-dalembertian" x="${cx(el.col) - NODE_R}" y="${cy(el.row) - NODE_R}" width="${2 * NODE_R}" height="${2 * NODE_R}" rx="1"/>`;
      case "matrix-stamp":
        return stampSvg(el.shape, el.col, el.row);
      case "label":
        return `<text class="diagram-label" x="${cx(el.col)}" y="${cy(el.row)}">${escapeSvg(el.text)}</text>`;
      default:
        return "";
    }
  }).join("\n  ");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="hybrid-diagram">
  <defs>
    <marker id="arrowhead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
      <polygon points="0 0, 6 3, 0 6" class="diagram-arrowhead"/>
    </marker>
  </defs>
  ${body}
</svg>`;
}

// === Diagram Processing ===

export interface DiagramResult {
  svg: string;
  type: "mermaid" | "hybrid";
  original: string;
}

export interface DiagramProcessorOptions {}

/**
 * Process all diagrams in content. Replaces fenced diagram blocks with
 * numbered placeholder comments; call injectDiagrams() after marked.parse.
 */
export async function processDiagrams(
  content: string,
  _options: DiagramProcessorOptions = {}
): Promise<{ content: string; diagrams: DiagramResult[] }> {
  const diagrams: DiagramResult[] = [];

  // Single-pass fence scanner. Walks line-by-line, tracking fence state so
  // closing fences are never mistaken for openings (the bug with naive regex).
  const lines = content.split("\n");
  const out: string[] = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const fenceMatch = line.match(/^(\s*)(```+)(.*)$/);
    if (!fenceMatch) {
      out.push(line);
      i++;
      continue;
    }
    const indent = fenceMatch[1];
    const fence = fenceMatch[2];
    const info = fenceMatch[3].trim();
    const lang = info.toLowerCase();

    // Collect lines until matching closing fence
    const body: string[] = [];
    let closed = false;
    let j = i + 1;
    while (j < lines.length) {
      if (new RegExp(`^${indent}${"`".repeat(fence.length)}\\s*$`).test(lines[j])) {
        closed = true;
        break;
      }
      body.push(lines[j]);
      j++;
    }
    if (!closed) {
      // Unterminated fence — pass through untouched
      out.push(line);
      i++;
      continue;
    }

    const code = body.join("\n");
    const trimmed = code.trim();
    let svg: string | null = null;
    let type: DiagramResult["type"] = "hybrid";

    if (lang === "mermaid") {
      svg = await renderMermaid(trimmed);
      type = "mermaid";
    } else if (lang === "" && isHybridDiagram(trimmed)) {
      const ast = parseDiagram(trimmed);
      svg = renderHybridSvg(ast);
      type = "hybrid";
    }

    if (svg) {
      const idx = diagrams.length;
      diagrams.push({ svg, type, original: trimmed });
      out.push(`${indent}<!--pob-diagram-${idx}-->`);
    } else {
      // Not a diagram — reconstruct the fenced block for marked to handle
      out.push(line);
      out.push(...body);
      out.push(`${indent}${fence}`);
    }
    i = j + 1;
  }
  content = out.join("\n");

  return { content, diagrams };
}

/**
 * Inject diagram SVGs into parsed HTML, replacing the placeholder comments
 * emitted by processDiagrams. Must run AFTER marked.parse so the raw SVG
 * markup is not escaped by the markdown parser.
 */
export function injectDiagrams(html: string, diagrams: DiagramResult[]): string {
  return html.replace(/<!--pob-diagram-(\d+)-->/g, (_, i) => {
    const d = diagrams[Number(i)];
    if (!d) return "";
    const cls = d.type === "hybrid" ? "hybrid-diagram" : "mermaid-diagram";
    return `<div class="diagram ${cls}">${d.svg}</div>`;
  });
}

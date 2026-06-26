/**
 * Diagram Processor
 * 
 * Renders diagrams: Mermaid → SVG, ASCII art → SVG
 * 
 * Note: Mermaid requires a DOM environment. For server-side rendering,
 * we use a lightweight approach with ASCII art for now, and defer
 * Mermaid to client-side or external tools.
 */

import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

// Counter for unique diagram IDs
let diagramCounter = 0;

// === Mermaid Processing ===

// Mermaid is deferred to client-side or external rendering.
// For server-side, we convert mermaid blocks to a placeholder with metadata.
// The client can render mermaid on load, or we can use mermaid-cli in a separate step.

/**
 * Process Mermaid blocks (server-side placeholder)
 * Returns SVG if mermaid is available, otherwise a placeholder
 */
export async function renderMermaid(code: string): Promise<string> {
  // For now, create a simple SVG placeholder from the mermaid code
  // In the future, this could call mermaid CLI or use puppeteer
  diagramCounter++;
  const id = `mermaid-${Date.now()}-${diagramCounter}`;
  
  // Create a simple box representation
  const lines = code.trim().split("\n");
  const height = Math.min(lines.length * 20 + 40, 200);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 ${height}" style="background:#fafafa;border:1px dashed #999;">
  <style>
    text { font-family: "SF Mono", Monaco, monospace; font-size: 11px; fill: #666; }
  </style>
  <text x="10" y="20">Mermaid Diagram</text>
  <text x="10" y="40" font-size="9">${id}</text>
  ${lines.slice(0, 8).map((line, i) => `<text x="10" y="${60 + i * 14}">${escapeXml(line.slice(0, 50))}</text>`).join("\n  ")}
  ${lines.length > 8 ? `<text x="10" y="${60 + 8 * 14}">... (${lines.length - 8} more lines)</text>` : ""}
</svg>`;
  
  return svg;
}

function escapeXml(text: string): string {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// === ASCII Art to SVG ===

/**
 * Convert ASCII art block to SVG
 */
export function asciiToSvg(text: string, options: AsciiSvgOptions = {}): string {
  const {
    width = 600,
    height = 100,
    fontSize = 12,
    fontFamily = '"SF Mono", Monaco, "Courier New", monospace',
    color = "#1a1a1a",
    background = "transparent",
  } = options;

  // Escape HTML entities for use in SVG text
  const escaped = text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Calculate line height based on font size
  const lineHeight = fontSize * 1.4;
  
  // Split into lines and create tspan elements
  const lines = escaped.split("\n");
  const tspans = lines.map((line, i) => 
    `<tspan x="0" dy="${i === 0 ? 0 : lineHeight}px">${line}</tspan>`
  ).join("\n");

  const svgHeight = Math.max(height, lines.length * lineHeight + 20);

  return `<svg xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 ${width} ${svgHeight}" 
    style="font-family: ${fontFamily}; font-size: ${fontSize}px; color: ${color}; background: ${background};">
  <style>
    text { white-space: pre; }
  </style>
  <text x="10" y="${fontSize + 10}">${tspans}</text>
</svg>`;
}

// === Diagram Processing ===

export interface DiagramResult {
  svg: string;
  type: "mermaid" | "ascii";
  original: string;
}

export interface AsciiSvgOptions {
  width?: number;
  height?: number;
  fontSize?: number;
  fontFamily?: string;
  color?: string;
  background?: string;
}

/**
 * Process all diagrams in content
 */
export async function processDiagrams(
  content: string,
  options: DiagramProcessorOptions = {}
): Promise<{ content: string; diagrams: DiagramResult[] }> {
  const diagrams: DiagramResult[] = [];
  
  // Process Mermaid blocks
  content = content.replace(/```mermaid\n([\s\S]*?)```/g, async (_, code) => {
    const svg = await renderMermaid(code);
    diagrams.push({ svg, type: "mermaid", original: code.trim() });
    return `<div class="diagram mermaid-diagram">${svg}</div>`;
  });

  // Process ASCII art blocks (```\n...\n```)
  content = content.replace(/```\n([\s\S]+?)```/g, (_, ascii) => {
    // Only convert if it looks like a diagram (arrows, boxes, etc.)
    if (looksLikeDiagram(ascii)) {
      const svg = asciiToSvg(ascii.trim(), {
        fontFamily: '"SF Mono", Monaco, "Courier New", monospace',
        fontSize: 11,
        width: 550,
        color: "#1a1a1a",
        background: "#fafafa",
      });
      diagrams.push({ svg, type: "ascii", original: ascii.trim() });
      return `<div class="diagram ascii-diagram">${svg}</div>`;
    }
    // Return as code block if not a diagram
    return `<pre><code>${ascii}</code></pre>`;
  });

  return { content, diagrams };
}

/**
 * Check if ASCII art looks like a diagram (has arrows, boxes, etc.)
 */
function looksLikeDiagram(text: string): boolean {
  const diagramPatterns = [
    /─►|→|<-|<─/,  // arrows
    /\[.+?\]/,      // boxes
    /┌|└|│|─/,     // box drawing
    /graph|flowchart|state/, // mermaid hint
    /────+/,        // horizontal lines
    /\s*│\s*/,      // vertical lines
  ];
  
  return diagramPatterns.some(pattern => pattern.test(text));
}

// === Export to dist/diagrams/ ===

export interface ExportOptions {
  outputDir: string;
  prefix?: string;
}

export async function exportDiagrams(
  diagrams: DiagramResult[],
  options: ExportOptions
): Promise<void> {
  const { outputDir, prefix = "diagram" } = options;
  
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
  
  for (let i = 0; i < diagrams.length; i++) {
    const diagram = diagrams[i];
    const filename = `${prefix}-${i + 1}-${diagram.type}.svg`;
    const filepath = join(outputDir, filename);
    
    // Clean up SVG (remove mermaid IDs, add proper namespaces)
    let svg = diagram.svg
      .replace(/id="[^"]*mermaid[^"]*"/g, "")
      .replace(/class="[^"]*mermaid[^"]*"/g, "");
    
    writeFileSync(filepath, svg);
    console.log(`  📊 Exported: ${filename}`);
  }
}

// === CSS for diagrams ===

export const DIAGRAM_CSS = `
/* Diagram container */
.diagram {
  margin: 1.5em 0;
  padding: 1em;
  overflow-x: auto;
}

/* Mermaid diagrams */
.mermaid-diagram svg {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 0 auto;
}

/* ASCII art diagrams */
.ascii-diagram svg {
  max-width: 100%;
  height: auto;
  border: 1px solid #ddd;
  background: #fafafa;
}

/* Error state */
.diagram-error {
  padding: 1em;
  background: #fee;
  border: 1px solid #c00;
  color: #c00;
  font-family: monospace;
}
`;
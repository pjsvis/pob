import { defineCommand } from "citty";
import { readdirSync, statSync } from "node:fs";
import { resolve, join } from "node:path";

interface FileNode {
  name: string;
  type: "file" | "dir";
  children?: FileNode[];
}

function buildTree(root: string, maxDepth: number, currentDepth = 0): FileNode[] {
  if (currentDepth > maxDepth) return [];

  const entries = readdirSync(root);
  const nodes: FileNode[] = [];

  for (const entry of entries) {
    // Skip hidden files and node_modules
    if (entry.startsWith(".") || entry === "node_modules") continue;

    const fullPath = join(root, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      const children = buildTree(fullPath, maxDepth, currentDepth + 1);
      nodes.push({ name: entry, type: "dir", children });
    } else {
      nodes.push({ name: entry, type: "file" });
    }
  }

  // Sort: dirs first, then alphabetically
  return nodes.sort((a, b) => {
    if (a.type !== b.type) return a.type === "dir" ? -1 : 1;
    return a.name.localeCompare(b.name);
  });
}

function printTree(nodes: FileNode[], prefix = "", isLast = true): string {
  let output = "";

  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    const isLastNode = i === nodes.length - 1;
    const connector = isLastNode ? "└── " : "├── ";
    const childPrefix = isLastNode ? "    " : "│   ";

    if (node.type === "dir") {
      output += `${prefix}${connector}📁 ${node.name}/\n`;
      if (node.children) {
        output += printTree(node.children, prefix + childPrefix, true);
      }
    } else {
      output += `${prefix}${connector}📄 ${node.name}\n`;
    }
  }

  return output;
}

function countNodes(nodes: FileNode[]): { files: number; dirs: number } {
  let files = 0;
  let dirs = 0;
  for (const node of nodes) {
    if (node.type === "dir") {
      dirs++;
      if (node.children) {
        const { files: f, dirs: d } = countNodes(node.children);
        files += f;
        dirs += d;
      }
    } else {
      files++;
    }
  }
  return { files, dirs };
}

export const treeCommand = defineCommand({
  meta: {
    name: "tree",
    description: "Show directory tree",
  },
  args: {
    depth: { type: "string", alias: "d", default: "3", description: "Maximum depth" },
  },
  run({ args }) {
    const maxDepth = parseInt(args.depth, 10);
    const root = resolve(".");
    console.log(`📂 ${root}\n`);

    const tree = buildTree(root, maxDepth, 0);
    const output = printTree(tree);

    console.log(output);

    const { files, dirs } = countNodes(tree);
    console.log(`\n${dirs} directories, ${files} files\n`);
  },
});
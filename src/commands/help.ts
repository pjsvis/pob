import { defineCommand } from "citty";

export const helpCommand = defineCommand({
  meta: {
    name: "help",
    description: "Show help information",
  },
  run() {
    console.log(`
🌐 pob — The Poverty of Biomechanics

A minimalist SSG for math-heavy Markdown.

Usage:
  pob <command> [options]

Commands:
  build         Compile markdown to HTML
  preview       Start preview server
  tree          Show directory tree
  help          Show this help

Options:
  -h, --help    Show help for a command

Examples:
  pob build             # Build once
  pob build --clean     # Clean then build
  pob build -c          # Same as above
  pob preview           # Start server on port 3000
  pob preview --port 8080
  pob preview --no-open # Don't open browser
  pob tree              # Show project tree
  pob tree --depth 2    # Limit depth

Documentation:
  https://github.com/user/pob#readme
`);
  },
});
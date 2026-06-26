# Agent Infrastructure Playbook

## Purpose

Document the lightweight build automation framework for pob: task queue, file watching, and worker coordination.

---

## Architecture

```
┌─────────────┐    ┌──────────┐    ┌─────────┐    ┌────────┐
│   Content   │───▶│  Watcher │───▶│  Queue  │───▶│ Worker │
│  *.md files │    │ (fs.watch)    │ (priority)   │ (build)│
└─────────────┘    └──────────┘    └──────────┘    └────────┘
                                             │
                                             ▼
                                      ┌─────────────┐
                                      │ Coordinator │
                                      │ (orchestra) │
                                      └─────────────┘
```

---

## Components

### 1. BuildQueue (`src/agents/queue.ts`)

Priority-based task queue with event system.

**Priority levels:**
- `critical` — Force rebuild
- `published` — Done content
- `review` — Draft content
- `draft` — Work in progress

**Usage:**
```typescript
import { BuildQueue } from "./agents/index.js";

const queue = new BuildQueue();

// Add tasks
queue.add("chapter-1.md", "published");
queue.add("chapter-2.md", "draft");

// Subscribe to events
queue.on(event => {
  if (event.type === "completed") {
    console.log(`✅ ${event.task.file}`);
  }
});
```

### 2. ContentWatcher (`src/agents/watcher.ts`)

File system watcher with debouncing.

**Features:**
- Recursive directory watching
- Debounce rapid changes (default 300ms)
- Ignore patterns (node_modules, .git, dist/)
- Configurable extensions

**Usage:**
```typescript
import { ContentWatcher } from "./agents/index.js";

const watcher = new ContentWatcher({
  dir: "./content",
  extensions: [".md"],
  debounce: 300,
  ignore: [/node_modules/, /\.git/],
});

watcher.on(event => {
  console.log(`${event.type}: ${event.relativePath}`);
});

watcher.start();
```

### 3. BuildWorker (`src/agents/worker.ts`)

Executes build tasks for individual files.

**Features:**
- Pre-processing pipeline: frontmatter → custom blocks → KaTeX → markdown → post-process
- KaTeX math rendering (server-side)
- Custom block syntax: sidenotes, figures, newthought
- Error handling with detailed results

**Usage:**
```typescript
import { BuildWorker } from "./agents/index.js";

const worker = new BuildWorker({
  contentDir: "./content",
  distDir: "./dist",
  templatePath: "./src/templates/layout.html",
});

const result = await worker.build("chapter-1.md");
if (result.success) {
  console.log(`Built in ${result.elapsed}ms`);
} else {
  console.error(`Failed: ${result.error}`);
}
```

### 4. BuildCoordinator (`src/agents/coordinator.ts`)

Orchestrates the watch → queue → worker pipeline.

**Usage:**
```typescript
import { BuildCoordinator } from "./agents/index.js";

const coordinator = new BuildCoordinator({
  contentDir: "./content",
  distDir: "./dist",
  templatePath: "./src/templates/layout.html",
});

coordinator.on(event => {
  switch (event.type) {
    case "build-start":
      process.stdout.write(`Building ${event.file}...`);
      break;
    case "build-complete":
      console.log(`✅ (${event.elapsed}ms)`);
      break;
    case "build-error":
      console.log(`❌ ${event.error}`);
      break;
  }
});

await coordinator.start();
// Keep running, watch for changes...
coordinator.stop();
```

---

## CLI Usage

```bash
# One-time build
just build

# Build with clean
just build --clean

# Watch mode (auto-rebuild on changes)
just watch

# Preview server
just preview
```

---

## Custom Block Syntax

### Sidenotes
```markdown
:::sidenote
Margin note with math $g_{\mu\nu}$.
:::
```

### Newthought (first paragraph styling)
```markdown
:::newthought
This paragraph gets special treatment.
:::
```

### Full-width Figures
```markdown
:::figure:1.1:Coordinate transformation
![Diagram](path/to/image.svg)
:::
```

### Margin Figures
```markdown
:::margin-figure:Caption
![Image](path/to/image.svg)
:::
```

---

## Future Extensions

- **Multiple workers:** Parallel build processing
- **Dependency tracking:** Rebuild files that depend on changed content
- **td integration:** Track build state in task database
- **Deployment hooks:** Auto-deploy after successful builds

---

## Related

- `playbooks/penrose-book-playbook.md` — Content formatting conventions
- `playbooks/init-playbook.md` — Project initialization
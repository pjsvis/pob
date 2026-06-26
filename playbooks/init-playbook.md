# Repository Initialization Playbook

## Purpose

Standardized procedure for initializing a new repository that follows our conventions and avoids common mistakes. Repo initialization is infrequent but consequential — a poorly initialized repo creates friction for every future session.

## When to Use This

- Creating a new project from scratch
- Migrating an existing project to our conventions
- Onboarding to a legacy project with no conventions

## The Initialization Sequence

### Phase 1: Foundation (Do First)

```bash
# 1. Create and enter the directory
mkdir project-name && cd project-name
git init

# 2. Initialize with Bun (creates package.json, tsconfig.json, index.ts)
bun init -y

# 3. Remove the default boilerplate
rm index.ts

# 4. Install core runtime dependencies
bun add marked katex

# 5. Install dev dependencies
bun add -d @types/katex typescript

# 6. Create the standard directory tree
mkdir -p src/templates content dist playbooks briefs debriefs decisions scripts
```

### Phase 2: Configuration Files

Create these in order — each enables the next:

1. **`.gitignore`** — Essential first commit item
   ```gitignore
   # Build output
   dist/

   # Dependencies
   node_modules/

   # Environment
   .env
   .env.local

   # Scratchpad (personal notes)
   scratchpad/

   # IDE
   .idea/
   .vscode/
   ```

2. **`justfile`** — The task facade
   ```just
   set shell := ["bash", "-o", "pipefail", "-c"]

   default:
       @just --list

   [group("build")]
   build:
       bun run build.ts

   [group("meta")]
   check:
       bun run build.ts --dry-run
   ```

3. **`tsconfig.json`** — TypeScript configuration
   ```json
   {
     "compilerOptions": {
       "lib": ["ESNext"],
       "target": "ESNext",
       "module": "ESNext",
       "moduleDetection": "force",
       "allowJs": true,
       "moduleResolution": "bundler",
       "allowImportingTsExtensions": true,
       "noEmit": true,
       "strict": true,
       "skipLibCheck": true
     },
     "include": ["**/*.ts", "**/*.tsx"]
   }
   ```

4. **`package.json`** — Clean up the defaults
   - Set `"private": true`
   - Remove `"module": "index.ts"`
   - Add proper `"scripts"` section
   - Add dependencies as proper objects (not strings)

### Phase 3: Documentation Scaffold

```bash
# 1. Create playbooks structure
mkdir -p playbooks
cat > playbooks/REGISTRY.jsonl << 'EOF'
{"file":"TEMPLATE.md","date":"YYYY-MM-DD","status":"active","summary":"(auto-generated)","meta":{"template":true}}
EOF
cp REGISTRY.jsonl playbooks/INDEX.jsonl

# 2. Create template playbook
cat > playbooks/TEMPLATE.md << 'EOF'
---
date: YYYY-MM-DD
tags: [tag1, tag2]
agent: claude
---

# [Title]

## Summary
One-paragraph summary.

## Core Principle
The guiding rule.

## Workflow
Step 1 → Step 2 → Step 3

## Commands
\`\`\`bash
command --flag
\`\`\`
EOF

# 3. Create dependencies.md
cat > dependencies.md << 'EOF'
# Dependencies

## Runtime
| Package | Version | Purpose |
|---------|---------|---------|
| ... | ... | ... |

## Development
| Package | Version | Purpose |
|---------|---------|---------|
EOF

# 4. Create README.md
cat > README.md << 'EOF'
# Project Name

One-line description.

## Quick Start

\`\`\`bash
bun install
bun run build.ts
\`\`\`

## Commands

\`\`\`
just build    # Build
just clean    # Clear output
\`\`\`
EOF
```

### Phase 4: First Build Verification

Before committing anything, verify the build works:

```bash
# Create a minimal test file
cat > content/test.md << 'EOF'
# Test

Inline math: $E = mc^2$

Display math:
$$R_{\mu\nu} - \frac{1}{2}g_{\mu\nu}R = \frac{8\pi G}{c^4}T_{\mu\nu}$$
EOF

# Run the build
bun run build.ts

# Check the output
cat dist/test.html | grep -o 'katex' | head -3  # Should see katex classes

# Clean up test file
rm content/test.md dist/*
```

### Phase 5: First Commit

```bash
# Add everything except node_modules and dist
git add .gitignore README.md package.json tsconfig.json build.ts justfile \
       src/ content/ playbooks/ dependencies.md

# Commit with clear message
git commit -m "chore: initial repo structure with SSG foundation

- Bun/TypeScript SSG with KaTeX server-side rendering
- Standard directory tree: src/, content/, dist/, playbooks/
- justfile facade for build tasks
- Playbook scaffold for conventions
"

# Verify the log
git log --oneline -1
```

## Lessons Learned

### What to Do

| Lesson | Why |
|--------|-----|
| Initialize with `bun init -y` | Creates proper package.json structure |
| Delete default `index.ts` | Avoids confusion with real entry points |
| Create `.gitignore` first | Prevents accidental node_modules commits |
| Verify build before first commit | Catch broken state before it propagates |
| Create playbooks directory early | Conventions should be established, not retrofitted |
| Use `bun.lock` lockfile | Bun's lockfile is the project standard |

### What Not to Do

| Mistake | Why | Fix |
|---------|-----|-----|
| Commit `node_modules/` | Bloats repo, causes merge conflicts | Already in .gitignore |
| Leave default `index.ts` | Confuses tooling about entry points | `rm index.ts` |
| Forget `scratchpad/` in .gitignore | Personal notes get shared | Add before first commit |
| Create complex justfile upfront | Premature abstraction | Start simple, add as needed |
| Skip first-build verification | Build might be broken from start | Always test before commit |
| Hardcode dependency versions | Update friction | Use `^` ranges |

## Common Issues

| Issue | Cause | Fix |
|-------|-------|-----|
| Build fails silently | Missing dependency | `bun add <package>` |
| TypeScript errors everywhere | Wrong tsconfig | Use the template above |
| Justfile syntax errors | Wrong settings syntax | Use `set shell := ["bash", "-o", "pipefail", "-c"]` |
| Lockfile conflicts | Mixed package managers | Use only `bun` for all operations |

## The Anti-Barnacle Checklist

Before declaring initialization complete:

- [ ] `.gitignore` excludes `node_modules/`, `dist/`, `scratchpad/`
- [ ] `package.json` has `"private": true` and clean scripts
- [ ] `tsconfig.json` uses bundler module resolution
- [ ] `justfile` exists and `just --list` works
- [ ] Playbooks directory exists with REGISTRY.jsonl
- [ ] First build produces valid output
- [ ] No `index.ts` default file remains
- [ ] `bun.lock` is committed (not .npm lockfiles)

## Related

- `playbooks/conventions-playbook.md` — Active conventions
- `playbooks/debriefs-playbook.md` — How to document this process
- `dependencies.md` — Dependency management
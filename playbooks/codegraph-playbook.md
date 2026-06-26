# CodeGraph Navigation Playbook

## Purpose

CodeGraph provides fast symbol lookup, call graph tracing, and blast radius analysis for refactoring decisions. It is a **pre-edit safety scanner**, not a static analyzer or linter. Use it to answer "could I touch this?" before committing to a change.

## Prerequisites

- CodeGraph initialized: `codegraph init` (one-time per repo)
- Index up to date: `codegraph status` shows ✓ Index is up to date

## Core Workflow: Could I, Should I, Would I

### Step 1: Explore — "Could I?"

Before editing any shared utility, run:

```bash
codegraph explore "symbol-name"
```

**What it returns:**
- Definition location + verbatim source (current on-disk)
- All callers across the codebase
- Test coverage status

**Example:**
```bash
codegraph explore "compile"
```

### Step 2: Assess — "Should I?"

Human judgment after seeing blast radius. Ask:

- Is the blast radius proportional to the change?
- Are the callers actual dependencies or just textual imports?
- Do untested callers need tests before proceeding?
- Is this change aligned with the codebase's intent?

### Step 3: Commit — "Would I?"

If blast radius is acceptable and coverage is understood, proceed with the edit.

## Key Commands

### Symbol Exploration
```bash
codegraph explore "symbol"      # Full analysis: definition + callers + source
codegraph node "SymbolName"     # Single symbol: source + caller/callee trail
```

### Call Graph Navigation
```bash
codegraph callers "function"    # Who calls this function?
codegraph callees "function"    # What does this function call?
```

### Impact Analysis
```bash
codegraph impact "symbol"       # What code is affected by changing this symbol?
codegraph affected tests/       # Which tests cover the changed files?
```

### Project Structure
```bash
codegraph files                 # Full tree with language metadata
codegraph status                # Index stats: files, nodes, edges by language
```

## Limitations

| What it can't do | Why | Workaround |
|-----------------|-----|------------|
| Evaluate assertions | Static analysis only | Run tests |
| Trace data flows | No runtime introspection | Read code + trace manually |
| Generate tests | Just flags coverage gaps | Write tests manually |

## When to Use CodeGraph

**Use it:**
- Before editing anything in `src/lib/`
- Before refactoring any shared constant or function
- To find untested code

**Skip it:**
- For one-off exploratory reading (just use `read`)
- For runtime behavior questions (run the code)
- For trivial changes (copy-paste, comment edits)

## Related
- `playbooks/conventions-playbook.md` — Coding conventions
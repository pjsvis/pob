# TD Playbook — Solo Workflow

> This playbook defines how to work on the pob project using `td` for task management.

---

## Session Startup

At the start of every session:

```bash
just orient    # bootstrap: verify tools, install deps, set up env, sanity check
td usage --new-session   # new session identity
```

---

## Claiming Work

Before editing a file, claim its task:

```bash
td start td-abc123       # start work on a task
td log "started"         # log progress
```

If the task is claimed by another session, comment requesting handover:

```bash
td comment td-abc123 "I'd like to work on this — can you handoff?"
```

---

## Progress Logging

After substantive changes:

```bash
td log "completed phase 1, drafted outline for piece X"
```

---

## Pre-Commit Gate

Before every commit:

```bash
just build      # verify the build pipeline still works
```

---

## Ending Work

Capture context before closing:

```bash
td handoff td-abc123 --done "piece drafted and reviewed" --remaining "generate PDF and commit"
td review td-abc123           # submit for review
```

---

## Branch Hygiene

- **Never commit directly to `main`** (unless the change is trivial and self-contained)
- **Branch** before starting substantive work: `git checkout -b feat/<name>`
- **One piece per branch** — stack if dependent
- **Run `just build`** before every commit

---

## TD Labels Convention

| Label | Meaning |
|-------|---------|
| `claimed-by:<session>` | Active session working this task |
| `blocked` | Task is blocked, not available |
| `needs-review` | Ready for human review |

---

## Common Commands

```bash
td current              # what you're working on
td list                 # all open tasks
td list --status in_progress   # in-flight tasks
td next                 # highest priority open issue
td context td-abc123    # full context for a task
td ws start "Epic: X"   # start a work session for an epic
td ws tag td-abc123 ... # tag tasks to workspace
td ws end               # end current workspace
```

---

## Related

- `AGENTS.md` — Project identity and coding rules
- `playbooks/conventions-playbook.md` — Coding conventions and barnacle removal
- `playbooks/silo-playbook.md` — pob silo structure

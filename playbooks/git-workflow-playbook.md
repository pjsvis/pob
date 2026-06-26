# Playbook: Git Workflow

## Principle
**Never merge to `main` until a PR has been reviewed and approved.**
Code on `main` must always be review-gated. No direct pushes to `main`.

## Workflow

```
dev → PR → review → fix → approve → merge → cleanup
```

### 1. Develop on a feature branch

```
git checkout -b feat/<short-description>
```

- Branch from `main`
- Keep commits focused: one logical change per commit
- Branch naming: `feat/`, `fix/`, `refactor/`, `docs/` prefixes

### 2. Open a PR early

```
gh pr create --title "<verb>: <what and why>" --body "<what changed, why>"
```

- Open the PR as soon as the feature is functional, not when it's perfect
- Include a clear title (imperative verb) and description

### 3. Review

- Reviewers leave comments on the PR
- **NO direct pushes to `main` during review**
- All review feedback is addressed on the feature branch

### 4. Fix review issues

```
# Make fixes on the same feature branch
git add -A
git commit -m "fix: address review feedback on <feature>"
git push origin feat/<short-description>
```

- Fixes go on the **feature branch**, not `main`
- Amend commits if they're small cosmetic fixes:
  ```
  git commit --amend --no-edit
  git push --force-with-lease
  ```
- For substantial review fixes, add a new commit so the history is clear

### 5. Approve and merge

```
# Once all review comments are resolved
gh pr merge --squash --delete-branch <pr-number>
```

- Squash merge keeps `main` linear
- `--delete-branch` cleans up the remote feature branch automatically

### 6. Cleanup

```
git checkout main
git pull origin main
git fetch --prune          # remove stale remote refs
git worktree prune         # if using worktrees
```

## What Not To Do

| Mistake | Why it's bad | Fix |
|---------|-------------|-----|
| Push to `main` before review | Bypasses review gate | Never do this |
| Rebase feature branch onto `main` *after* merging | PR shows zero diff, auto-closes | Rebase *before* merge only |
| Fix review issues on `main` | Makes review meaningless | Fix on feature branch |
| Merge then create a PR | Reverses the process | PR first, merge after |
| Force-push to `main` | Rewrites shared history | Never do this |

## Worktree Usage

When working on multiple features simultaneously:

```
# Create a worktree for a feature branch
git worktree add ../pob-feat/foo feat/foo

# When done, remove it
git worktree remove ../pob-feat/foo
git branch -d feat/foo        # local
git push origin --delete feat/foo  # remote (if not auto-deleted by merge)
```

## PR Checklist Before Requesting Review

- [ ] Branch is up to date with `main` (rebase if needed)
- [ ] `bun run build.ts` passes
- [ ] Tests pass (if any)
- [ ] PR title uses imperative verb + concise description
- [ ] PR body explains what changed and why
- [ ] No debug code, commented-out blocks

## Merge Criteria

- [ ] At least one reviewer approval
- [ ] All review comments resolved or dismissed
- [ ] CI checks pass (build, tests)
- [ ] No conflicts with `main`

## Anti-patterns

| Mistake | Why it's bad |
|---------|-------------|
| Commit to `main` without a coherent goal | No audit trail |
| Multiple unrelated changes in one PR | Hard to review, impossible to bisect |
| Delete branch before merge | Loses review context |
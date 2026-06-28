# Blog — Drafts and Proposals

Staging area for blog posts and standalone essays in progress. Parallel to `assets/` (raw material) — this is where drafts live while they're being written, assessed, and refined.

## The rule

Files in `blog/` are **not build-scanned**. They do not render to `dist/` or appear on the site index. You can draft here without the work showing up half-finished on the web.

## The loop

1. **Draft** the post here, in the book's register (see `playbooks/style-playbook.md` — the single-voice gate applies to blog posts too; they're a track, not an exception).
2. **Assess** — read it against the staved-finger benchmark. Does it land? Does the voice hold?
3. **Promote** — when it's ready, move the file to `content/`. The build picks it up; the auto-generated index lists it under "Other Documents → Essays & Demonstrations."
4. **PDF** — `just pdf <filename>` for standalone distribution.

## What goes here

- Blog post drafts (the book's themes applied to a specific topic, in the self-contained-essay format — byline + dek allowed, see `playbooks/self-contained-essay-playbook.md`)
- Marketing pieces (derivative, shorter, points at the book — same register, never louder)
- Series pieces (linked standalone essays on one theme)

## What does NOT go here

- Raw Gemini output → `assets/` (the yap; this directory is for the *voice*, applied to the yap)
- Project task briefs → `briefs/` (plans to do something; a blog post is a thing, not a plan)
- Finished, publication-ready essays → `content/` (the build scans it; the index lists it)

## Tracked, not gitignored

Like `assets/`, drafts in `blog/` are tracked in git — they're worth keeping as the provenance record of how a published piece developed.

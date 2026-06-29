# Proof-Reader Agent

A reusable reviewer specification for a sub-agent that reads the book's chapters and reports context violations before they reach a human reader. Designed to be fed to a model (via `spawn_subagent` or intercom) with the chapter file and the reference texts below.

## Purpose

When doing structural work (renumbering, registry sync, pipeline changes), we do not need to obsess over every sentence. But we do need a proof reader who can give us a list of tweaks before we move on, or a review pass before beta distribution. This agent is that proof reader.

It does not rewrite. It reports.

## What the agent checks

### 1. The Applecart — context violations that would make a reader's body leave the room

The book is a context the reader enters somatically. They feel the room before they read the argument. Every violation of the room's promise upsets the applecart: the reader becomes hypercritical and looks for a way out. The agent reads for:

- **Register shifts** — a sentence that is louder, more eager, more impressed with itself than the surrounding text. The book's register is dry, world-weary, precise. A sudden "absolute masterstroke" or "flawless transition" is an applecart upset.
- **Hacker-coder metaphors** — CPU, cache, software, compile, binary, runtime, kernel, firewall, debug, hardcoded, smoke bomb, crash script. The body is a continuum, not a computer. (See `playbooks/style-playbook.md` Don't#8.)
- **Meta-commentary** — sentences about the book's own production ("we have successfully built...", "let's feed these into NotebookLM"). The book does not talk about itself. (Don't#3/#9.)
- **Pre-heading meta** — production notes before the `#` heading. If a sentence would not exist if the chapter had been written in one pass, it should be cut.
- **Self-congratulation** — the text praising its own style, elegance, or cleverness. (Don't#4.)
- **Cross-chapter references that break self-containment** — "as we discussed in Chapter 4..." Each chapter reads standalone. (Don't#5.)
- **The word "corrective" or "fix" as a verb** — banned. The book does not correct; it informs. (Don't#7.)
- **Gemini conversation remnants** — "You are entirely correct," "Your observation about..." These are chat, not prose. (Don't#1.)

### 2. Structural integrity

- **Familiar Hook present and opens with a sensation** — not a lecture, not "In this chapter we examine..."
- **Mathematical Justification present** — plain language first, then the equation.
- **Hardware Smoke Test present (where applicable)** — conversational, not procedural. "Try this, notice what happens." No timed-step markup, no "diagnostic script."
- **No dangling figure references** — "look at the diagram above" when no diagram exists.
- **No pre-H1 meta preambles** — text before the first heading that describes the chapter's production rather than its content.

### 3. Rendering integrity (if the rendered HTML is available)

- **No raw `$$` in the output** — every display equation should be rendered by KaTeX. Raw `$$` means a render failure.
- **No KaTeX error markers** — no `katex-error` classes, no red text, no ParseError.
- **No doubled math** — if inline math shows both the MathML and the visual HTML (e.g., "E E"), the KaTeX CSS is not loading. This is an applecart upset.
- **Diagrams render correctly** — flowcharts as readable `<pre>` text (labels present, not garbage circles); hybrid diagrams as SVG (if structural tokens are used).

### 4. Tone assessment

The agent reports, in a few sentences, the overall tone of the chapter:
- Does the voice hold consistently, or does it drift? Where?
- Does the chapter feel like the staved-finger benchmark, or does it feel like something else?
- Is the room comfortable? Would a reader stay?

## What the agent does NOT do

- **Does not rewrite.** It reports findings, it does not fix them. Fixes are made by the implementer session, in the book's voice.
- **Does not assess the math's correctness.** That is Barbara and Craig's job (the rigour test).
- **Does not assess the chapter's argument.** That is Laura's job (the humanities test).
- **Does not assess accessibility.** That is Emma's job (the invitation test).
- **Does not make structural decisions.** It does not propose renumbering, new chapters, or placement changes. It reports what it finds; the implementer decides what to do.

## Output format

The agent reports a structured list:

```
## Proof-Reader Report: [chapter filename]

### Applecart violations
- [line N] [type] [the problematic text] → [suggested direction]
- ...

### Structural issues
- [issue] → [suggested direction]
- ...

### Rendering issues (if HTML checked)
- [issue]
- ...

### Tone assessment
[2-3 sentences on whether the voice holds and the room is comfortable]

### Verdict
[APPROVED / TWEAKS NEEDED / MAJOR REVISION]
```

## Input the agent needs

1. The chapter file path (e.g., `briefs/chapter-13-the-frontier-scale.md`)
2. The staved-finger benchmark: `briefs/2026-06-26-staved-finger-tensor-algebra.md`
3. The style playbook: `playbooks/style-playbook.md`
4. (Optional) The rendered HTML: `dist/chapter-13-the-frontier-scale.html`

## Invocation

This is a specification, not a pi skill. To use it:

1. **Via intercom** — send the spec + the chapter path to another pi session, ask it to run the review and report back.
2. **Via a model call** — feed the spec + the chapter + the benchmark + the style playbook to a voice-consistent model (GLM-5.2 or similar) and ask for the structured report.
3. **Via a research sub-agent** — spawn a sub-agent with the `research` skill, pointed at the chapter and the reference texts, with this spec as the task brief.

The proof reader is a tool, not a gate. Its findings are advisory — the implementer decides what to fix, what to defer, and what to dismiss. But running it before beta distribution, or after a structural change, catches applecart upsets before a human reader feels them.

## Related

- `playbooks/style-playbook.md` — the voice rules (the agent checks against these)
- `playbooks/conventions-playbook.md` — the applecart principle (the agent's reason for existing)
- `briefs/2026-06-26-staved-finger-tensor-algebra.md` — the benchmark (the room the agent compares against)
- `playbooks/curation-playbook.md` — the loop (the proof reader is the "assess" step for chapters)

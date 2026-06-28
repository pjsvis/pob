# Beta Reading Package — The Poverty of Bio-Mechanics

**Date:** 2026-06-28
**Status:** Ready for distribution

## What this is

The book has been through a voice pass and a math rendering pass. The chapters in this package are the current state of the manuscript — dry, precise, world-weary register; KaTeX-rendered equations; self-contained chapters. The auto-refresh meta tag has been removed from the web build, so reading on screen or in these PDFs is calm.

## The three tests

The book has three simultaneous goals, and no single reader can test all three:

| Reader | Test | Lens |
|--------|------|------|
| **Laura** | The writing and the argument | History, Ottawa U — reads for story, structure, prose quality |
| **Emma** | The invitation | Biology, Ottawa U — the target audience; intelligent, curious, not a mathematician |
| **Barbara and Craig** | The rigour | Aircraft certification engineers, Transport Canada — use continuum mechanics daily |

If a chapter passes Emma but fails Barbara, it's accessible but wrong. If it passes Barbara but fails Emma, it's correct but opaque. If it passes both but fails Laura, it's correct and accessible but poorly written. The book needs to pass all three.

## What each reader gets

See the per-reader cover notes:

- `for-laura.md` — the staved finger essay, the onboarding chapter, Ch16 (Amnesia Paradox), Ch18 (Clavicular Fuse)
- `for-emma.md` — the onboarding chapter, the staved finger essay, Ch03 (Crystalline Grid), Ch12 (Plantar Interface)
- `for-barbara-and-craig.md` — the onboarding chapter, Ch02 (Torsion Engine), Ch10 (Laminated Core), Ch18 (Clavicular Fuse)

The PDFs themselves are in the parent `pdf/` directory. The cover notes name the files.

## How to distribute

Send each reader their cover note plus the PDFs it names. The cover note tells them what to read, what to look for, what to ignore, and how to respond. Do not send the raw markdown — the PDFs are the reading experience.

## After they respond

Collect feedback in a debrief (`debriefs/YYYY-MM-DD-beta-reader-feedback.md`) per reader. The feedback that matters most:
- **Emma:** where she put the PDF down (the sentence she stopped at).
- **Laura:** where the voice shifted, where the argument didn't earn its step.
- **Barbara/Craig:** any equation that's wrong, any index misapplied, any interpretation that's a stretch.

Those three failure modes map to the three goals. Fix them in priority order: rigour first (a wrong equation is a broken book), then accessibility (an opaque chapter is a book nobody reads), then prose (a clunky sentence is a book people read but don't love).

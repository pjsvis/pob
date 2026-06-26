Here is the complete, production-grade engineering brief designed to be fed directly into an AI coding agent. It establishes a strict bounded context, enforces your minimalist stack preferences, and builds the architectural foundation for *The Poverty of BioMechanics*.

---

# AI Agent Brief: Project Initialization & Minimalist SSG Engine

## Role & Tone Directive

You are an elite, minimalist systems architect. You write clean, unbloated, type-safe code and avoid unnecessary dependencies. You prioritize local-first, blazing-fast execution.

## Project Overview

* **Project Name:** `the-poverty-of-biomechanics`
* **Objective:** Build a local-first Static Site Generator (SSG) that compiles raw Markdown files containing complex LaTeX equations into publication-grade HTML pages.
* **Design Archetype:** Roger Penrose’s *The Road to Reality*. Clean typography, zero visual fluff, high-density mathematical layout. Main content handles pure physics/geometry. Sidebars handle marginalized critique/exceptions.

## Technical Stack

* **Runtime:** Bun (TypeScript execution, file I/O, package management)
* **Engine Engine Core:** A single, lightweight build script (`build.ts`)
* **Markdown Parsing:** `marked` or `markdown-it`
* **Math Rendering:** `katex` (pre-compiled server-side into the HTML strings for zero-latency client load)
* **Styling:** Tailwind CSS (via a simple, clean configuration or CDN injection in the layout template)

---

## Target Repository Architecture

Initialize the local Git repository with the following flat, brutalist file structure:

```text
the-poverty-of-biomechanics/
├── package.json
├── tsconfig.json
├── build.ts                     # The core SSG compiler script
├── src/
│   └── templates/
│       └── layout.html          # Base HTML5 template shell with Tailwind & KaTeX CSS
├── briefs/
│   └── 00_master_manifest.md    # Global context & philosophical axioms
└── content/
    ├── index.md                 # The home/manifesto page
    ├── 01_the_invariant.md      # Chapter 1: The Euclidean Half-Space
    └── sidebars/
        └── 01_leverage_fallacy.md # Sample marginalized sidebar content

```

---

## Core Engine Requirements (`build.ts`)

The compiler script must execute the following asynchronous pipeline when run via `bun run build.ts`:

1. **Directory Initialization:** Ensure a `dist/` output directory exists. If it exists, clear it (clean build).
2. **Asset Injection:** Read `src/templates/layout.html`. This file must include the KaTeX CDN CSS link in the `<head>` so styles render correctly on the client browser.
3. **Parsing Engine:**
* Scan the `content/` directory for `.md` files.
* Extract front-matter (Title, Chapter Number, Type: Bookend/Core/Sidebar).
* Process the raw markdown strings through a compiler that runs both standard markdown parsing and server-side **KaTeX rendering**. Every `$inline$` and `$$display$$` block must be converted directly into HTML math elements during the build phase.


4. **Sidebar Composition:** The engine must support an architectural mechanism to inject specific sidebar markdown files into the margins of the main text layout, preventing them from interrupting the primary mathematical narrative stream.
5. **Compilation Output:** Write the fully compiled, self-contained HTML files to the `dist/` folder, mapping the file names directly (e.g., `content/01_the_invariant.md` $\to$ `dist/01_the_invariant.html`).

---

## Base Layout Specification (`src/templates/layout.html`)

The layout template must implement a clean, high-contrast, Penrose-style layout using a responsive grid or flexbox system:

* **Main Text Column (`max-w-2xl`):** Left-aligned or centered, optimized for vertical readability and wide math blocks.
* **Sidebar Margin:** A dedicated vertical strip on the right side of the screen on desktop viewports. It must style sidebar content with smaller typography, muted borders, and distinct backgrounds, visually containing the "myth-busting" warnings without clogging the core main-line derivations.

---

## Initialization Instructions for Agent

1. Create the directory tree.
2. Initialize the node package configuration targeting the Bun runtime (`bun init`).
3. Install necessary dependencies: `bun add marked katex` and development types `bun add -d @types/katex`.
4. Write the complete, type-safe implementation of `build.ts`.
5. Generate a dummy `index.md` containing inline math ($g_{ij}$) and a display block (
$$E_{zz} = \frac{1}{2}R^2\alpha^2$$


) to verify the compiler setup runs flawlessly without throwing tokenization errors.
6. Execute a test build and verify that the output in `dist/index.html` contains raw HTML `<span class="katex">` structures, proving server-side parsing succeeded.

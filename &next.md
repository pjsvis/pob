# &next — the text-only export, and where it stands

The brief is written and amended; the assessment gate is open. Five decisions sit inside it, but they are not five independent questions — they bundle into three actual paths forward, each narrativised below. Every silcrow points to a top-level (`##`) section of the brief; gloam opens the file, and the reader finds the heading by its skeleton — silcrows are pointers ("see § X"), not teleport links.

---

## Path A — build the whole thing now

Proceed. Take the recommended answer on all five points: pandoc for the body, ten committed SVGs for the structural residue, `text/` tracked, no `just build` wiring. The script is cheap, the architecture is drift-free, and the reading copy is the thing the curiosity was actually about. The receipt is soft, but soft receipts are the only kind a curiosity-driven task ever has — waiting for a hard one is waiting for a permission that will not arrive.

The work: one script (`scripts/export-text.ts`), one pandoc pass, ten SVGs authored from the existing KaTeX HTML, a committed `text/` directory. No source touched, no voice passed, no build track wired. See § Scope and shape of the deliverable, § Tooling, and § The pandoc finding in the brief for what "the whole thing" actually contains.

[§ Scope and shape of the deliverable](briefs/2026-09-09-brief-text-only-export.md#scope-and-shape-of-the-deliverable) · [§ The pandoc finding](briefs/2026-09-09-brief-text-only-export.md#the-pandoc-finding-and-what-it-collapses) · [§ Tooling](briefs/2026-09-09-brief-text-only-export.md#tooling-what-enters-dependenciesmd)

---

## Path B — build the slice, defer the residue

Run the pandoc pass now; leave the ten structural equations as visible raw-LaTeX placeholders in the reading copy until a reader actually complains. This is incremental formalisation applied to the export itself: the body (inline + 31/41 display) is the work that demands doing; the ten images are the work that can wait. The fraction and the matrix are legible enough as `$$…$$` to a reader who speaks LaTeX, and the terminal reader of a continuum-mechanics book does.

The cost: the reading copy is not fully clean — ten equations show as source. The benefit: zero image-authoring step, zero headless-browser or MathJax ceremony, and the decision on the residue is made when there is a reader to make it for. See § The split and § The image path for what the slice skips.

[§ The split](briefs/2026-09-09-brief-text-only-export.md#the-split-revised) · [§ The image path](briefs/2026-09-09-brief-text-only-export.md#the-image-path-scoped-to-10-not-41)

---

## Path C — defer the whole export

Wait. The book reads well rendered; the text-only copy is a curiosity, not a need. A second distinct use — a second reader, a grep-based retrieval need, a NotebookLM re-ingest, a terminal-diff review — is the trigger that makes the receipt hard. Until then the brief is the artifact: it records the architecture so a future session finds the settled position rather than re-deriving it. This is the strict reading of incremental formalisation: formalise at the second occurrence, not the first.

The risk: the brief's findings (pandoc handles the body; the residue is exactly ten equations) are cheap knowledge that decays if the session that holds them closes. The brief preserves the conclusions; the *demonstration* — pandoc run against the corpus, the ten residuals enumerated — lives only in this dialog. If you defer, the brief is the memory; the transcript is not.

[§ Decision points](briefs/2026-09-09-brief-text-only-export.md#decision-points-the-things-that-need-a-yesno) · [§ Next step](briefs/2026-09-09-brief-text-only-export.md#next-step-per-the-perturbation-protocol)

---

## The one decision that is not a path

Pandoc as the math→Unicode engine. This is settled by measurement, not by preference: it handles all inline math and 31 of 41 display equations cleanly, and the ten failures are exactly the structural residue. The hand-built substitution table is deleted; pandoc is the table. The only reason to revisit is if pandoc leaves the machine — and it is Homebrew-installed, not vendored. See § The pandoc finding.

[§ The pandoc finding](briefs/2026-09-09-brief-text-only-export.md#the-pandoc-finding-and-what-it-collapses)

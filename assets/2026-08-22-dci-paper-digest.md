# Grep Beats Embeddings: The Paper

*A digest of arXiv 2605.05242 — "Beyond Semantic Similarity: Rethinking Retrieval for Agentic Search via Direct Corpus Interaction" (Texas A&M / Waterloo / UC San Diego / Stanford / UIUC, incl. Jimmy Lin's group). Prepared for Eric, 2026-08-22. Not a publication — a share-out. Paper: https://arxiv.org/html/2605.05242v1*

---

## The one-paragraph version

Yesterday I suggested something along the lines of: a capable agent with a terminal doesn't need a vector index standing between it and the corpus — `grep` and file reads are enough, and the index is the bottleneck, not the model. *[Peter: adjust this line to whatever you actually said.]* Here is that argument, with numbers. A consortium paper calls the setup **direct corpus interaction (DCI)**: the agent searches the raw corpus with general-purpose terminal tools — `grep`, `find`, `head`, small pipelines — no embedding model, no vector index, no retrieval API, no offline indexing at all. Across agentic deep-research benchmarks (BrowseComp-Plus), multi-hop QA (HotpotQA, MuSiQue, etc.), and IR-ranking benchmarks (BRIGHT, BEIR), this beats strong sparse, dense, and reranker baselines — in several cases by margins that shouldn't be possible for "just grep."

## The headline numbers

| Result | Detail |
|---|---|
| **Agentic search** | Same model (Claude Sonnet 4.6): swapping the Qwen3-Embedding-8B retriever for DCI takes BrowseComp-Plus from 69.0% → 80.0% **while cutting cost 29%** ($1,440 → $1,016). |
| **Multi-hop QA** | 83.0 avg accuracy vs 52.3 for the strongest retrieval-agent baseline — +30.7 points. |
| **IR ranking** | 68.5 avg NDCG@10 vs 47.0 for the best reranker — +21.5 points, best on all six datasets. |
| **The pizza-shop number** | A *nano*-class model (GPT-5.4 nano) with just `bash` + `read` hit 62.9% at **$93 total**; the o3 retrieval agent got 66.0% for ~$740. Cheap model, good interface ≈ expensive model, bad interface. |

## Why it works — and it isn't recall

This is the interesting part. The paper instruments the trajectories and finds DCI does **not** surface more of the gold evidence. Mean gold-document coverage is roughly *half* the embedding retriever's (28.0 vs 56.7). What it does instead: once it reaches *one* useful document, it pivots to fine-grained local inspection — grep within the file, verify exact spans, chain lexical constraints (`rg 'foo' | rg 'bar'`), pull just the needed lines. They call this **retrieval interface resolution**, and score it: their "localization" metric is more than double the retriever's (48.4 vs 21.7). The gains come from converting reached documents into verified evidence, not from finding more documents.

Two supporting behavioural facts: 142 of the 176 questions where DCI won were cases where the retrieval agent had *already surfaced* at least one gold document and failed to use it; and full-document reads are almost never used (0.1% of commands) — it's `rg | head` (56%) and chained `rg | rg` (21%). The agent treats the terminal as a precision instrument, not a firehose.

Their reframing, which is the quotable bit: retrieval for capable agents is an **interface-design problem, not a retriever-design problem**. The paper opens with McLuhan — "the medium shapes and controls the scale and form of human association and action" — and means it literally: the top-k similarity interface *is* the medium, and it caps what any amount of downstream reasoning can recover. Evidence filtered out early cannot be recovered by stronger reasoning later.

## The honest limits

- Ablations run on n=100 subsets; several datasets sampled at 50 examples; answers graded by an LLM judge (GPT-4.1). Individual ±5-point differences are noise; the *pattern* — repeated across three benchmark families and two scaffolds — is the signal.
- **Scale is the real wall.** Doubling the corpus from 100K to 200K documents: tool calls double (38.5 → 86.9), cost more than doubles, accuracy drops 13.6 points. At 400K it falls apart. DCI wins on depth within a corpus it can navigate; it cannot grep the web. (A personal repo of markdown files sits comfortably inside the envelope.)
- Concurrent prior art points the same way (e.g. "Keyword search is all you need," arXiv 2602.23368 — keyword-search agents over raw PDFs matching vector-DB RAG), which strengthens rather than weakens the claim.

## A footnote for anyone building with agents

The paper's controlled ablation isn't Claude Code — it's **Pi** (Zechner's minimal terminal harness, cited as ref 71), restricted to two tools, running the nano model. The expensive scaffold adds ~12 points; the *interface alone* — read + grep, no bash, same tool-call budget — is worth +16 points over the embedding retriever. The context-management ablation is equally practical: aggressive LLM summarisation of old tool output *hurts*; a dumb zero-LLM compaction that replaces stale tool results with structure-preserving placeholders wins. Their line: "preserving more verbatim evidence is not the same as maintaining the right working state for continued search." Selective forgetting beats both hoarding and summarising.

## TL;DR

If the corpus is local, textual, and navigable, the index is a lossy middleman: buy interface resolution instead. Cheap model + raw files + grep > expensive model + top-k retrieval. The exceptions — huge corpora, no terminal access, single-shot pipelines — are where conventional retrieval keeps its job.

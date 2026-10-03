**Title:** Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction

**Author:** Affiliation: Texas A&M University  University of Waterloo  UC San Diego  Stanford University

**Source:** [https://arxiv.org/html/2605.05242v1](https://arxiv.org/html/2605.05242v1)

---

# Page Structure Map
```text
Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction
├── Abstract
├── 1 Introduction
├── 2 Related Work
│   ├── Retrieval-Augmented Generation (RAG).
│   ├── The Rise of Agentic Search.
│   └── Coding Agents.
├── 3 Direct Corpus Interaction
│   ├── 3.1 DCI Agent Implementations
│   │   ├── DCI-Agent-Lite: Minimal Scaffold.
│   │   └── DCI-Agent-CC: Stronger Scaffold.
│   ├── 3.2 Runtime Context Management for DCI
│   └── 3.3 Evaluating DCI: Coverage and Localization
│       ├── Coverage.
│       └── Localization.
├── 4 Experiments
│   ├── 4.1 Experimental Setup
│   │   ├── Implementation Details.
│   │   ├── Benchmarks.
│   │   └── Baselines.
│   ├── 4.2 Main Results
│   │   ├── RQ1: Can a mature DCI agent already achieve strong performance?
│   │   ├── Agentic Search.
│   │   ├── Knowledge-Intensive QA.
│   │   └── IR Ranking.
│   └── 4.3 Controlled Ablations and Mechanism Analysis
│       ├── RQ2: Why does DCI help?
│       ├── RQ3: What behavioral tradeoffs distinguish DCI from retrieval?
│       ├── RQ4: How does DCI scale with corpus size?
│       ├── RQ5: How does runtime context management affect DCI-Agent-Lite?
│       └── RQ6: How much does tool-set expressivity matter for DCI-Agent-Lite?
├── 5 Conclusion
├── References
├── Table of Contents
├── Appendix
├── Appendix A Experimental Details
│   ├── A.1 Benchmarks
│   ├── A.2 Compared Baselines
│   └── A.3 Metrics
│       ├── Accuracy Metrics
│       └── Resolution Metrics
├── Appendix B Further Discussion of Experimental Results
│   └── B.1 In-Depth Analysis of DCI-Agent-Lite Search Patterns
├── Appendix C Instruction Templates
│   ├── C.1 QA Instruction
│   ├── C.2 IR Instruction
│   └── C.3 LLM as Judge
└── Appendix D Case Study
    ├── D.1 Case 1: Demonstration Example
    ├── D.2 Case 2a: DCI-Agent-CC on Agentic Search
    ├── D.3 Case 2b: DCI-Agent-Lite on Agentic Search
    ├── D.4 Case 3a: DCI-Agent-CC on Knowledge-Intensive QA
    ├── D.5 Case 3b: DCI-Agent-Lite on Knowledge-Intensive QA
    ├── D.6 Case 4a: DCI-Agent-CC on Information Retrieval
    ├── D.7 Case 4b: DCI-Agent-Lite on Information Retrieval
    ├── D.8 Case 5a: Failure Case of DCI-Agent-CC in Agentic Search
    └── D.9 Case 5b: Failure Case of DCI-Agent-Lite in Agentic Search
```

---

Zhuofeng Li Haoxiang Zhang Cong Wei Pan Lu Ping Nie    Yi Lu Yuyang Bai Shangbin Feng Hangxiao Zhu Ming Zhong Yuyu Zhang    Jianwen Xie Yejin Choi James Zou Jiawei Han Wenhu Chen Jimmy Lin Affiliation: Texas A&M University University of Waterloo UC San Diego Stanford University Affiliation: Texas A&M University University of Waterloo UC San Diego Stanford University Affiliation: University of Washington University of Illinois Urbana-Champaign Verdent AI Lambda    Dongfu Jiang Yu Zhang

###### Abstract

Modern retrieval systems, whether lexical or semantic, expose a corpus through a fixed similarity interface that compresses access into a single top-kk retrieval step before reasoning. This abstraction is efficient, but for agentic search, it becomes a bottleneck: exact lexical constraints, sparse clue conjunctions, local context checks, and multi-step hypothesis refinement are difficult to implement by calling a conventional off-the-shelf retriever, and evidence filtered out early cannot be recovered by stronger downstream reasoning. Agentic tasks further exacerbate this limitation because they require agents to orchestrate multiple steps, including discovering intermediate entities, combining weak clues, and revising the plan after observing partial evidence. To tackle the limitation, we study direct corpus interaction (DCI), where an agent searches the raw corpus directly with general-purpose terminal tools (e.g., grep, file reads, shell commands, lightweight scripts), without any embedding model, vector index, or retrieval API. This approach requires no offline indexing and adapts naturally to evolving local corpora. Across IR benchmarks and end-to-end agentic search tasks, this simple setup substantially outperforms strong sparse, dense, and reranking baselines on several BRIGHT and BEIR datasets, and attains strong accuracy on BrowseComp-Plus and multi-hop QA without relying on any conventional semantic retriever. Our results indicate that as language agents become stronger, retrieval quality depends not only on reasoning ability but also on the resolution of the interface through which the model interacts with the corpus, with which DCI opens a broader interface-design space for agentic search.

Figure 1: Pareto frontier of performance vs. cost on BrowseComp-Plus, comparing two paradigms: retrieval (Qwen3-Embed-8B retriever) and our proposed direct corpus interaction (two DCI-Agents ★\\bigstar and ★\\bigstar) . The x-axis shows the estimated API cost over the entire evaluation set.

††footnotetext: †\\dagger: Project Leads. \*: Core Contributors. 🖂: Corresponding Authors.

## 1 Introduction

> _“The medium shapes and controls the scale and form of human association and action.”_
> 
> — Marshall McLuhan

For language agents, retrieval serves as the primary interface through which external corpora are accessed and perceived. This interface underpins a wide range of applications, including retrieval-augmented generation (26; 12; 47), open-domain question answering (58; 43), and deep research (64; 9). In standard retrieval-augmented pipelines, documents are chunked, indexed, and filtered into a top-kk candidate set using well-established sparse (45) or dense (23) techniques before downstream reasoning begins.

Entering the agentic era, retrieval agents (72) can iteratively plan, reformulate queries, and read, enabling more complex multi-round search behaviors (21; 19; 56; 55; 29). However, this increased flexibility is still constrained by a fixed, off-the-shelf retrieval interface that exposes only a top-kk slice of the corpus at each step. This limitation becomes more pronounced in emerging benchmarks such as BrowseComp-Plus (9), which require agents to compose many actions (e.g., discovering intermediate entities, aggregating sparse clues, enforcing exact lexical constraints, and revising search plans after inspecting local context). Under such demands, restricted evidence exposure hinders effective exploration. As a result, performance bottlenecks arise not only from post-retrieval reasoning but from the retrieval interface itself.

To overcome the bottleneck, in this paper, we position direct corpus interaction (DCI) as a new retrieval interface for agentic search. Instead of querying a conventional semantic retriever or retrieval API, the agent searches the raw corpus directly using general-purpose terminal tools such as grep, simple file reads, shell commands, and lightweight scripts. No off-the-shelf embedding model, vector index, or top-kk interface mediates access: the entire corpus remains available, and semantic interpretation is delegated to the agent itself. This becomes particularly beneficial once the agent is strong enough to search strategically (as recent systems suggest; e.g., 4; 41), because it can compose the search primitives on its own, preventing potentially useful evidence from being discarded before reasoning begins. In practice, DCI provides a small but highly flexible and composable set of operations for corpus exploration (e.g., find), exact matching (e.g., grep), local inspection (e.g., head, tail, or sed), and iterative refinement. Furthermore, these operations can be pipelined to enforce lexical constraints (e.g., grep ’foo’ file | grep ’bar’), combine weak clues (e.g., find . | grep ’report’ | grep ’2024’), and verify hypotheses against local context (e.g., grep -n ’keyword’ file | head).

To demonstrate the effectiveness of DCI, we evaluate it in end-to-end agentic search on BrowseComp-Plus (9), multi-hop QA benchmarks (68; 58), and ranking-oriented IR benchmarks (57; 50). On BrowseComp-Plus, replacing the Qwen3-Embedding-8B retrieval tool with DCI under the same Claude Sonnet 4.6 backbone improves accuracy from 69.0% to 80.0% (++11.0 points) while reducing cost from $1,440 to $1,016 (−\-29.4%). On multi-hop QA, combining DCI with Claude Code as the command-line interface agent achieves 83.0 average accuracy, surpassing the strongest retrieval-agent baseline (11) by 30.7 points. On IR ranking, the same setup reaches 68.5 average NDCG@10, outperforming the best retrieval baseline (32) by 21.5 points. To demonstrate generality, we further pair DCI with a minimal terminal-based coding harness (built on Pi and GPT-5.4 nano rather than Claude Code and Sonnet 4.6) that relies solely on bash and read, with lightweight runtime context-management strategies such as truncation and compaction. This configuration also consistently outperforms baselines on QA and IR benchmarks, while both improving performance and reducing cost on BrowseComp-Plus compared to conventional retrieval tools.

We further conduct controlled ablations and trajectory analyses to pinpoint the sources of DCI’s gains. Examining trajectory-level search patterns (RQ2), evidence use (RQ3), corpus scale (RQ4), context management (RQ5), and tool usage (RQ6), we find that DCI’s advantage does not primarily come from surfacing more gold documents: on BrowseComp-Plus, it often prevails even when retrieval agents have already surfaced some or all gold evidence, with the largest gains arising from converting surfaced evidence into higher-value, fine-grained local search and verification steps. We term this finer-grained mode of corpus access “retrieval interface resolution”, where “resolution” denotes the ability to operate on units smaller and more precise than entire documents or passages. The benefit persists even under a highly restricted tool profile. Separately, our scaling and context-management studies further delineate DCI’s operating envelope and the runtime choices that make it practical.

These results point to a broader view of retrieval in agentic systems: the central question is not just which retriever to use, but which interface best aligns with the agent’s reasoning. When models can search like human researchers (e.g., formulating hypotheses, testing exact patterns, reading local context, and refining queries), compressed similarity indexes become a bottleneck, making higher-resolution interfaces more valuable. In this light, DCI is not simply another approach but evidence that retrieval for capable agents should be reframed as an interface-design problem (whose granularity determines what the agent can observe, verify, and act upon), rather than solely a retriever-design problem (73; 47). Indeed, dense and sparse retrieval remain scalable and effective for large, static corpora, but they occupy only one point in the broader design space of corpus interfaces. In real agentic workspaces (49; 3) where corpora can be local, heterogeneous, and continually evolving, DCI via a standard bash terminal requires no offline embedding or indexing, adapts naturally to changing files, and lets the agent operate directly within the environment it is reasoning over.

To summarize, our work makes three key contributions:

-   •

    We formalize direct corpus interaction (DCI) as a retrieval paradigm and systematically evaluate it across diverse agentic search settings.

-   •

    We show that DCI is a competitive method for document ranking, multi-hop QA, and end-to-end agentic search, outperforming competitive baselines without relying on external retrievers across most benchmarks.

-   •

    We introduce retrieval interface resolution as a conceptual lens to explain DCI’s effectiveness, and support this view with trajectory-level evidence via coverage and localization analyses.

## 2 Related Work

#### Retrieval-Augmented Generation (RAG).

RAG (15; 26; 7; 5; 44; 12; 46) augments large language models (LLMs) with external knowledge via a retrieve-then-generate pipeline: given a query, the system first retrieves potentially relevant documents from a corpus, and the model conditions on the retrieved evidence to produce the final output. In classical RAG, retrieval is mediated by a prebuilt index for efficient search. Typically, documents are chunked, converted to sparse or dense representations, and indexed in advance. Sparse retrieval relies on lexical matching such as BM25 (45), while dense retrieval performs nearest-neighbor search over learned vectors (24; 23; 17; 62; 28; 74). Subsequent advances, including LLM-based reranking (53; 75; 65) and adaptive RAG (18), improve individual stages but retain the same underlying retrieval structure.

#### The Rise of Agentic Search.

A paradigm shift is underway from single-shot retrieve-then-generate pipelines to multi-step retrieval agents (21; 19; 30). Recent systems (56; 55; 29) leverage larger context windows and adaptive scaffolding to run long-horizon investigations, iteratively searching, accumulating evidence, and refining plans based on intermediate observations. Yet across these systems, the model’s only channel to the corpus is a fixed retriever that pushes semantic understanding upward into an index. As agents grow more capable and tasks become more challenging (34; 64; 8; 9), the bottleneck becomes not only post-retrieval reasoning but the interface itself, which fails to fully expose the corpus’s semantics. Our work inverts this design by moving semantic understanding downward to the LLM and granting it direct, high-resolution access to the raw corpus.

#### Coding Agents.

Modern agents equipped with command-line interfaces (CLI) have demonstrated a strong ability to resolve complex software engineering tasks (31; 20; 10; 1; 33; 27). SWE-agent (67) shows that agents equipped with bash, file search, and code editing tools substantially outperform direct prompting, while Agentless (66) demonstrates that even a simple grep-and-read pipeline can match full agent frameworks. Platforms such as OpenHands (63) and Aider (13) have further consolidated terminal-based coding agents as a mature paradigm. Beyond task completion, 54 recently shows that CLI primitives alone are sufficient for precise code localization; 51 shows that a tool-augmented keyword-search agent over raw PDFs can approach vector-database RAG for document QA, whereas we study direct corpus interaction as a broader retrieval interface for agentic search. These systems establish that grep, file reads, and shell commands serve as primary information channels through which agents create and edit code files, navigate entire repositories, and execute tests and other programs. The primary advantage of CLI tools lies not just in their precision, but in their flexibility and composability via pipelines (14). Our work positions CLI as a new retrieval medium for agentic search, treating general-purpose terminal tools, such as grep, file reads, and shell commands, as a high-resolution interface to the corpus.

## 3 Direct Corpus Interaction

Figure 2: Two retrieval interfaces for agentic search. (Left) Retriever-mediated retrieval relies on offline indexing over a corpus and a retriever: the agent queries the retriever and reasons over the returned top-kk candidates. (Right) In contrast, direct corpus interaction bypasses preprocessing and any separate retriever: the agent searches the raw corpus directly using general-purpose terminal tools such as grep, glob, bash, along with lightweight scripts, enabling fine-grained pattern matching and precise evidence localization.

In this paper, we aim to compare two broad paradigms for how an agent accesses a corpus during agentic search, as shown in Figure 2. In _retriever-mediated access_, corpus interaction is mediated by a conventional retriever: the agent formulates a query, receives a ranked top-kk list of documents or snippets, and iterates by reformulating queries based on the returned candidates. In this setting, the agent’s observations are largely constrained to what the retriever chooses to expose (typically short snippets plus document identifiers), and all evidence must pass through the retriever’s scoring and ranking interface.

In _direct corpus interaction_ (DCI), the agent bypasses any embedding model, vector index, or retrieval API, and instead interacts with the raw corpus through a general-purpose command-line interface. Concretely, the agent issues tool calls such as grep and rg for exact or regular-expression matches, find and glob for structural navigation, and targeted file reads or lightweight scripts to inspect local context around matches. The resulting observations are therefore _tool outputs_ (e.g., matched spans with surrounding context, file paths, counts, and metadata) rather than a fixed-format ranked list.

### 3.1 DCI Agent Implementations

We instantiate DCI under two agent scaffolds, plus controlled ablations. Both implementations search the raw corpus directly via terminal tools and file reads. They differ only in runtime support, allowing us to separate the core effect of the DCI interface from additional harness engineering.

#### DCI-Agent-Lite: Minimal Scaffold.

To isolate the interface change as cleanly as possible, we introduce DCI-Agent-Lite, a lightweight terminal coding agent adapted from Pi (71) and restricted to raw terminal interaction. The agent accesses the corpus through bash and file reads, using general-purpose shell operations such as grep and rg for lexical matching, find and glob for file discovery, together with lightweight scripts. Importantly, DCI-Agent-Lite contains no retrieval-specific module: there is no offline indexing, no dense retriever, and no reranker. This minimal scaffold enables controlled experiments in which improvements can be attributed primarily to the DCI paradigm.

#### DCI-Agent-CC: Stronger Scaffold.

To probe the performance frontier of the same paradigm under a more capable harness, we also implement DCI using Claude Code (1) as an off-the-shelf CLI agent. We name this variant as DCI-Agent-CC. Compared with DCI-Agent-Lite, it provides stronger prompting, more robust tool orchestration, and built-in context handling, which together improve stability on long-horizon search and heterogeneous corpora. Note that we treat DCI-Agent-CC as a stronger instantiation of DCI rather than a different retrieval method: it still operates purely through terminal tools over the raw corpus and does not call any embedding retriever or retrieval API.

### 3.2 Runtime Context Management for DCI

Figure 3: Visualization of runtime context-management strategies for long-horizon DCI. We use three mechanisms (i.e., tool-result truncation, history compaction, and summarization) to mitigate context pressure while preserving the search trajectory structure.

Table 1: Runtime context-management profiles.

Repeated grep and rg calls may return many matches, and opening files or extracting surrounding context can expose long spans of text. Over a long-horizon trajectory, these observations accumulate quickly and can exceed the model’s finite context window. The runtime must therefore balance two competing needs: (1) retaining evidence and intermediate constraints for later reasoning, and (2) making room for new observations as the search proceeds.

To support long-horizon DCI, we equip DCI-Agent-Lite with a lightweight runtime context-management layer, visualized in Figure 3. The layer is built around three mechanisms.

-   •

    Truncation caps the text from each tool call before reinserting it into the live working context, preserving that an observation occurred while limiting per-turn verbosity.

-   •

    Compaction is an in-memory, zero-LLM operation that clears the contents of older tool-result turns once accumulated tool output exceeds a configured threshold, replacing those turns with short placeholders that preserve the tool-call structure.

-   •

    Summarization is a higher-intervention strategy that, under additional context pressure, replaces compacted history with a model-generated summary while keeping the most recent context intact.

For controlled analysis, as shown in Table 1, we implement a small family of context-management policies, each enabling a different subset of these mechanisms with different aggressiveness. Concretely, L0 does not perform any context management. L1 applies only truncation (capping each tool result at 50,000 characters), while L2–L4 use a stricter 20,000-character cap. L3 additionally enables compaction, triggering once accumulated tool-result content exceeds 240,000 characters and compacting all but the most recent 12 turns. L4 further invokes summarization after compaction: if the estimated context tokens still exceed a threshold, the runtime replaces the compacted history with a model-generated summary while retaining the most recent 20,000 tokens, and it suppresses further attempts after three consecutive summarization failures within a session.

Note that these policies do _not_ change the retrieval interface itself. They only change how much tool-mediated evidence survives in the model’s working context during long-horizon search.

### 3.3 Evaluating DCI: Coverage and Localization

Answer accuracy on downstream tasks is of course an important metric for evaluating DCI. However, accuracy alone is insufficient to capture how DCI and conventional retriever-mediated access succeed or fail in qualitatively different ways. Retriever-mediated access typically provides high-level recall but offers limited control over exact string matches, conjunctions of weak lexical signals, and precise span-level triggers for the next hop. In contrast, DCI exposes a higher-resolution search interface: once the agent reaches a useful document, it can directly probe for specific terms, open the full file, extract new entities or constraints, and immediately launch follow-up searches grounded in localized evidence. To characterize these differences at the process level, we introduce two trajectory-level metrics. _Coverage_ measures whether a trajectory surfaces the relevant (gold) documents at all, reflecting broad evidence access. _Localization_ measures how efficiently the trajectory narrows to a small, usable evidence span within each surfaced gold document, reflecting within-document evidence isolation.

Formally, let 𝒟∗​(q)\\mathcal{D}^{\*}(q) denote the gold documents for question qq, and let ℳ⁡(q,τ)⊆𝒟∗​(q)\\mathcal{M}(q,\\tau)\\subseteq\\mathcal{D}^{\*}(q) be those surfaced along trajectory τ\\tau. Here, a document is surfaced when it appears explicitly in the recorded trace, either as a retrieved snippet or as a file returned by a tool call.

#### Coverage.

We report the three coverage aggregates:

<table id="S3.E1"><tbody><tr id="S3.E1X"><td></td><td></td><td><math id="S3.E1X.m2" alttext="\displaystyle\texttt{coverage}_{\texttt{any}}(q,\tau)=\mathds{1}\!\left[|\mathcal{M}(q,\tau)|\geq 1\right],\;\texttt{coverage}_{\texttt{mean}}(q,\tau)=\frac{|\mathcal{M}(q,\tau)|}{|\mathcal{D}^{*}(q)|},\;\text{and}" display="inline" intent=":literal"><semantics><mrow><mtext>coverage</mtext><msub><mrow></mrow><mtext>any</mtext></msub><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo><mo rspace="0.108em">=</mo><mo>[</mo><mo fence="false" rspace="0.167em" stretchy="false">|</mo><mi>ℳ</mi><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo><mo fence="false" stretchy="false">|</mo><mo lspace="0.167em">≥</mo><mn>1</mn><mo>]</mo><mo rspace="0.447em">,</mo><mtext>coverage</mtext><msub><mrow></mrow><mtext>mean</mtext></msub><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo><mo>=</mo><mstyle displaystyle="true"><mfrac><mrow><mo stretchy="false">|</mo><mrow><mi>ℳ</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow><mo stretchy="false">|</mo></mrow><mrow><mo stretchy="false">|</mo><mrow><msup><mi>𝒟</mi><mo>∗</mo></msup><mo lspace="0em" rspace="0em">​</mo><mrow><mo stretchy="false">(</mo><mi>q</mi><mo stretchy="false">)</mo></mrow></mrow><mo stretchy="false">|</mo></mrow></mfrac></mstyle><mo rspace="0.447em">,</mo><mtext>and</mtext></mrow><annotation encoding="application/x-tex">\displaystyle\texttt{coverage}_{\texttt{any}}(q,\tau)=\mathds{1}\!\left[|\mathcal{M}(q,\tau)|\geq 1\right],\;\texttt{coverage}_{\texttt{mean}}(q,\tau)=\frac{|\mathcal{M}(q,\tau)|}{|\mathcal{D}^{*}(q)|},\;\text{and}</annotation></semantics></math></td><td></td><td rowspan="2"><span>(1)</span></td></tr><tr id="S3.E1Xa"><td></td><td></td><td><math id="S3.E1Xa.m2" alttext="\displaystyle\texttt{coverage}_{\texttt{all}}(q,\tau)=\mathds{1}\!\left[|\mathcal{M}(q,\tau)|=|\mathcal{D}^{*}(q)|\right]." display="inline" intent=":literal"><semantics><mrow><mtext>coverage</mtext><msub><mrow></mrow><mtext>all</mtext></msub><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo><mo rspace="0.108em">=</mo><mo>[</mo><mo fence="false" rspace="0.167em" stretchy="false">|</mo><mi>ℳ</mi><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo><mo fence="false" stretchy="false">|</mo><mo lspace="0.167em" rspace="0em">=</mo><mo fence="false" rspace="0.167em" stretchy="false">|</mo><mi>𝒟</mi><msup><mrow></mrow><mo>∗</mo></msup><mo stretchy="false">(</mo><mi>q</mi><mo stretchy="false">)</mo><mo fence="false" rspace="0.167em" stretchy="false">|</mo><mo>]</mo><mo lspace="0em">.</mo></mrow><annotation encoding="application/x-tex">\displaystyle\texttt{coverage}_{\texttt{all}}(q,\tau)=\mathds{1}\!\left[|\mathcal{M}(q,\tau)|=|\mathcal{D}^{*}(q)|\right].</annotation></semantics></math></td><td></td></tr></tbody></table>

Empirically, these coverage scores are reach metrics. coverageany\\texttt{coverage}\_{\\texttt{any}} measures whether the trajectory surfaces at least one gold document, coveragemean\\texttt{coverage}\_{\\texttt{mean}} is the average over gold documents of whether each document is surfaced, and coverageall\\texttt{coverage}\_{\\texttt{all}} measures whether the full gold set is surfaced. They therefore reflect broad evidence access rather than fine-grained evidence use within a surfaced document.

#### Localization.

Let a trajectory τ\=(o1,…,oT)\\tau=(o\_{1},\\ldots,o\_{T}) comprise a sequence of observations. For each observation oto\_{t}, we define ℛ⁡(ot)\={(dt,1,σt,1),…,(dt,n,σt,n)},\\mathcal{R}(o\_{t})=\\{(d\_{t,1},\\sigma\_{t,1}),\\ldots,(d\_{t,n},\\sigma\_{t,n})\\}, where nn is the number of exposed items in observation oto\_{t}, dt,id\_{t,i} is the corresponding document, σt,i\\sigma\_{t,i} is the snippet exposed for dt,id\_{t,i}, and ℓt,i\=|σt,i|\\ell\_{t,i}=|\\sigma\_{t,i}| is its character length. We write ℓt\=(ℓt,1,…,ℓt,n)\\bm{\\ell}\_{t}=(\\ell\_{t,1},\\ldots,\\ell\_{t,n}) for the snippet-length list of observation oto\_{t}. We use fixed-width character _segments_ (whose length is csegc\_{\\mathrm{seg}} in characters) rather than lines as the unit of analysis, since many web and PDF exports collapse layout into long lines where line boundaries are not a reliable proxy for evidence granularity.

Localization builds on the following normalizations:

<table id="S3.E2"><tbody><tr><td></td><td><math id="S3.E2.m1" alttext="\nu(x)=\max\!\left(1,\left\lceil\frac{x}{c_{\mathrm{seg}}}\right\rceil\right),\qquad\psi(a;b)=\max\!\left(1-\frac{\log a}{\log b},\,0\right)\quad\text{for }1\leq a\leq b,\;b&gt;1," display="block" intent=":literal"><semantics><mrow><mrow><mrow><mrow><mi>ν</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow></mrow><mo>=</mo><mrow><mpadded width="1.808em"><mi>max</mi></mpadded><mo>⁡</mo><mrow><mo>(</mo><mn>1</mn><mo>,</mo><mrow><mo>⌈</mo><mfrac><mi>x</mi><msub><mi>c</mi><mi>seg</mi></msub></mfrac><mo>⌉</mo></mrow><mo>)</mo></mrow></mrow></mrow><mo rspace="2.167em">,</mo><mrow><mrow><mi>ψ</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><mi>a</mi><mo>,</mo><mi>b</mi><mo stretchy="false">)</mo></mrow></mrow><mo>=</mo><mrow><mpadded width="1.808em"><mi>max</mi></mpadded><mo>⁡</mo><mrow><mo>(</mo><mrow><mn>1</mn><mo>−</mo><mfrac><mrow><mi>log</mi><mo lspace="0.167em">⁡</mo><mi>a</mi></mrow><mrow><mi>log</mi><mo lspace="0.167em">⁡</mo><mi>b</mi></mrow></mfrac></mrow><mo>,</mo><mn> 0</mn><mo>)</mo></mrow></mrow></mrow><mspace width="1em"></mspace><mrow><mrow><mtext>for&nbsp;</mtext><mo lspace="0em" rspace="0em">​</mo><mn>1</mn></mrow><mo>≤</mo><mi>a</mi><mo>≤</mo><mi>b</mi></mrow><mo rspace="0.447em">,</mo><mrow><mi>b</mi><mo>&gt;</mo><mn>1</mn></mrow></mrow><mo>,</mo></mrow><annotation encoding="application/x-tex">\nu(x)=\max\!\left(1,\left\lceil\frac{x}{c_{\mathrm{seg}}}\right\rceil\right),\qquad\psi(a;b)=\max\!\left(1-\frac{\log a}{\log b},\,0\right)\quad\text{for }1\leq a\leq b,\;b&gt;1,</annotation></semantics></math></td><td></td><td rowspan="1"><span>(2)</span></td></tr></tbody></table>

with ψ⁡(a,1)\=1\\psi(a;1)=1. Here ν⁡(x)\\nu(x) maps a character length to a segment count, and ψ⁡(a,b)\\psi(a;b) assigns a higher score when aa is small relative to bb.

For the ii\-th candidate dt,id\_{t,i} in observation oto\_{t} that is aligned to a gold document d∗d^{\*}, we define

<table id="S3.E3"><tbody><tr><td></td><td><math id="S3.E3.m1" alttext="\texttt{seg-score}(d_{t,i};d^{*})=\psi\!\left(\nu(\ell_{t,i});\nu(|d^{*}|)\right)." display="block" intent=":literal"><semantics><mrow><mrow><mrow><mtext>seg-score</mtext><mo lspace="0em" rspace="0em">​</mo><mrow><mo stretchy="false">(</mo><msub><mi>d</mi><mrow><mi>t</mi><mo>,</mo><mi>i</mi></mrow></msub><mo>,</mo><msup><mi>d</mi><mo>∗</mo></msup><mo stretchy="false">)</mo></mrow></mrow><mo>=</mo><mrow><mpadded width="0.517em"><mi>ψ</mi></mpadded><mo>⁡</mo><mrow><mo>(</mo><mrow><mi>ν</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><msub><mi mathvariant="normal">ℓ</mi><mrow><mi>t</mi><mo>,</mo><mi>i</mi></mrow></msub><mo stretchy="false">)</mo></mrow></mrow><mo>,</mo><mrow><mi>ν</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><mrow><mo stretchy="false">|</mo><msup><mi>d</mi><mo>∗</mo></msup><mo stretchy="false">|</mo></mrow><mo stretchy="false">)</mo></mrow></mrow><mo>)</mo></mrow></mrow></mrow><mo lspace="0em">.</mo></mrow><annotation encoding="application/x-tex">\texttt{seg-score}(d_{t,i};d^{*})=\psi\!\left(\nu(\ell_{t,i});\nu(|d^{*}|)\right).</annotation></semantics></math></td><td></td><td rowspan="1"><span>(3)</span></td></tr></tbody></table>

This score measures how localized the exposed snippet is within the full gold document, assigning higher values when the exposed span is smaller relative to the document. Here, ℓt,i\\ell\_{t,i} is the character length of the snippet exposed by candidate dt,id\_{t,i} in observation oto\_{t}, and |d∗||d^{\*}| is the character length of the full gold document. The DCI-specific mapping from tool outputs to snippets is implementation-dependent. One can refer to § A.3 for details.

For each surfaced gold document d∗d^{\*}, let ℋ⁡(d∗,τ)\\mathcal{H}(d^{\*},\\tau) be the set of aligned candidates in trajectory τ\\tau. We define the best localization on d∗d^{\*} as

<table id="S3.E4"><tbody><tr><td></td><td><math id="S3.E4.m1" alttext="s(d^{*},\tau)=\max_{d_{t,i}\in\mathcal{H}(d^{*},\tau)}\texttt{seg-score}(d_{t,i};d^{*})." display="block" intent=":literal"><semantics><mrow><mrow><mrow><mi>s</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><msup><mi>d</mi><mo>∗</mo></msup><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow><mo>=</mo><mrow><mrow><munder><mi>max</mi><mrow><msub><mi>d</mi><mrow><mi>t</mi><mo>,</mo><mi>i</mi></mrow></msub><mo>∈</mo><mrow><mi>ℋ</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><msup><mi>d</mi><mo>∗</mo></msup><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow></mrow></munder><mo lspace="0.167em">⁡</mo><mtext>seg-score</mtext></mrow><mo lspace="0em" rspace="0em">​</mo><mrow><mo stretchy="false">(</mo><msub><mi>d</mi><mrow><mi>t</mi><mo>,</mo><mi>i</mi></mrow></msub><mo>,</mo><msup><mi>d</mi><mo>∗</mo></msup><mo stretchy="false">)</mo></mrow></mrow></mrow><mo lspace="0em">.</mo></mrow><annotation encoding="application/x-tex">s(d^{*},\tau)=\max_{d_{t,i}\in\mathcal{H}(d^{*},\tau)}\texttt{seg-score}(d_{t,i};d^{*}).</annotation></semantics></math></td><td></td><td rowspan="1"><span>(4)</span></td></tr></tbody></table>

We then aggregate over surfaced gold documents:

<table id="S3.E5"><tbody><tr><td></td><td><math id="S3.E5.m1" alttext="\texttt{localization}(q,\tau)=\frac{1}{|\mathcal{M}(q,\tau)|}\sum_{d^{*}\in\mathcal{M}(q,\tau)}s(d^{*},\tau)." display="block" intent=":literal"><semantics><mrow><mrow><mrow><mtext>localization</mtext><mo lspace="0em" rspace="0em">​</mo><mrow><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow><mo>=</mo><mrow><mfrac><mn>1</mn><mrow><mo stretchy="false">|</mo><mrow><mi>ℳ</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow><mo stretchy="false">|</mo></mrow></mfrac><mo lspace="0em" rspace="0em">​</mo><mrow><munder><mo movablelimits="false">∑</mo><mrow><msup><mi>d</mi><mo>∗</mo></msup><mo>∈</mo><mrow><mi>ℳ</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><mi>q</mi><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow></mrow></munder><mrow><mi>s</mi><mo>⁡</mo><mrow><mo stretchy="false">(</mo><msup><mi>d</mi><mo>∗</mo></msup><mo>,</mo><mi>τ</mi><mo stretchy="false">)</mo></mrow></mrow></mrow></mrow></mrow><mo lspace="0em">.</mo></mrow><annotation encoding="application/x-tex">\texttt{localization}(q,\tau)=\frac{1}{|\mathcal{M}(q,\tau)|}\sum_{d^{*}\in\mathcal{M}(q,\tau)}s(d^{*},\tau).</annotation></semantics></math></td><td></td><td rowspan="1"><span>(5)</span></td></tr></tbody></table>

That is, localization(⋅,⋅)(\\cdot,\\cdot) is the trajectory-level average of the best segment-level score attained for each surfaced gold document. Empirically, localization(⋅,⋅)(\\cdot,\\cdot) is a within-document metric: given that a useful document has been reached, it tests whether the trajectory can narrow to a small, usable evidence span. A high localization score thus indicates the agent is not merely reaching relevant documents but also extracting concentrated evidence from them.

## 4 Experiments

### 4.1 Experimental Setup

#### Implementation Details.

We first detail the implementation of two scaffolds for DCI. DCI-Agent-Lite is a minimal Pi-based harness that exposes only bash and read, with lightweight runtime context management to support long-horizon exploration. (Unless otherwise noted, we use L3 in the main results and L4 in ablation experiments.) DCI-Agent-ClaudeCode (CC) is built on Claude Code and otherwise follows its default configuration, except that we disable web-search, web-fetch, and subagents, and we block access to the data directory to prevent answer leakage. Unless otherwise noted, DCI-Agent-Lite uses GPT-5.4 nano (40) as its base model, providing a lightweight setting for evaluating DCI under strict budget constraints. In contrast, DCI-Agent-ClaudeCode (CC) uses Claude Sonnet 4.6 (4) as its base model, providing a high-capacity setting to probe the paradigm’s performance ceiling when budget constraints are relaxed. We set the reasoning effort to high for GPT-5.4 nano and to medium for Claude Sonnet 4.6, with a maximum turn budget of 300 for both agents. Further details on agent prompts are provided in §C.

#### Benchmarks.

We evaluate DCI-Agents across three benchmark families:

-   •

    Agentic Search. We use BrowseComp Plus (9) to assess agentic deep research capabilities. We adopt the officially released corpus, which includes both gold documents supporting the QA and distractors. For the retrieval-agent baselines introduced below, we additionally use the released FAISS index built from Qwen3-Embedding-8B embeddings (74) as the offline search engine.

-   •

    Knowledge-Intensive QA. We include NQ (25), TriviaQA (22), Bamboogle (43), HotpotQA (68), 2WikiMultiHopQA (16), and MuSiQue (58), to evaluate multi-hop QA via corpus search. Following prior work (21; 11), we use the 2018 Wikipedia dump (23) as the corpus. For retrieval-agent baselines, we build the index with E5 embeddings (62).

-   •

    IR Ranking. We include four datasets (Biology, Earth Science, Economics, and Robotics) from the BRIGHT benchmark (50) and two datasets (ArguAna and SciFact) from the BEIR benchmark (57) for ranking evaluation.

More benchmark details are provided in §A.1.

Table 2: Accuracy on multi-hop QA benchmarks. Δ\\Delta Avg. denotes the improvement in average accuracy over ASearcher-Local-14B, the strongest retrieval-agent baseline. Bold and underlined entries mark the best and second-best results in each column, respectively.

<table id="S4.T2.6"><tbody><tr id="S4.T2.6.1"><td id="S4.T2.6.1.1">Model</td><td id="S4.T2.6.1.2">NQ</td><td id="S4.T2.6.1.3">Trivia</td><td id="S4.T2.6.1.4">Bam.</td><td id="S4.T2.6.1.5">Hotpot</td><td id="S4.T2.6.1.6">2Wiki</td><td id="S4.T2.6.1.7">MuSiQue</td><td id="S4.T2.6.1.8">Avg.</td><td id="S4.T2.6.1.9"><math id="S4.T2.m3" alttext="\Delta" display="inline" intent=":literal"><semantics><mi mathvariant="normal">Δ</mi><annotation encoding="application/x-tex">\Delta</annotation></semantics></math> Avg.</td></tr><tr id="S4.T2.6.2"><td id="S4.T2.6.2.1" colspan="9"><span id="S4.T2.6.2.1.1">Retrieval Agents</span></td></tr><tr id="S4.T2.6.3"><td id="S4.T2.6.3.1">R1-Searcher-7B</td><td id="S4.T2.6.3.2">58</td><td id="S4.T2.6.3.3">50</td><td id="S4.T2.6.3.4">54</td><td id="S4.T2.6.3.5">46</td><td id="S4.T2.6.3.6">40</td><td id="S4.T2.6.3.7">24</td><td id="S4.T2.6.3.8">45.3</td><td id="S4.T2.6.3.9"><span id="S4.T2.6.3.9.1"><math id="S4.T2.m4" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FFE8E8" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 7.0</span></td></tr><tr id="S4.T2.6.4"><td id="S4.T2.6.4.1">Search-R1-32B</td><td id="S4.T2.6.4.2">56</td><td id="S4.T2.6.4.3">46</td><td id="S4.T2.6.4.4">52</td><td id="S4.T2.6.4.5">44</td><td id="S4.T2.6.4.6">50</td><td id="S4.T2.6.4.7">32</td><td id="S4.T2.6.4.8">46.7</td><td id="S4.T2.6.4.9"><span id="S4.T2.6.4.9.1"><math id="S4.T2.m5" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FFECEC" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 5.6</span></td></tr><tr id="S4.T2.6.5"><td id="S4.T2.6.5.1">ZeroSearch-7B</td><td id="S4.T2.6.5.2">26</td><td id="S4.T2.6.5.3">30</td><td id="S4.T2.6.5.4">18</td><td id="S4.T2.6.5.5">10</td><td id="S4.T2.6.5.6">18</td><td id="S4.T2.6.5.7">4</td><td id="S4.T2.6.5.8">17.7</td><td id="S4.T2.6.5.9"><span id="S4.T2.6.5.9.1"><math id="S4.T2.m6" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FD8D8D" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 34.6</span></td></tr><tr id="S4.T2.6.6"><td id="S4.T2.6.6.1">Verl-Tool-Search-7B-DAPO</td><td id="S4.T2.6.6.2">56</td><td id="S4.T2.6.6.3">44</td><td id="S4.T2.6.6.4">32</td><td id="S4.T2.6.6.5">50</td><td id="S4.T2.6.6.6">32</td><td id="S4.T2.6.6.7">12</td><td id="S4.T2.6.6.8">37.7</td><td id="S4.T2.6.6.9"><span id="S4.T2.6.6.9.1"><math id="S4.T2.m7" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FECFCF" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 14.6</span></td></tr><tr id="S4.T2.6.7"><td id="S4.T2.6.7.1">ASearcher-Local-14B</td><td id="S4.T2.6.7.2">56</td><td id="S4.T2.6.7.3">58</td><td id="S4.T2.6.7.4">62</td><td id="S4.T2.6.7.5">58</td><td id="S4.T2.6.7.6">56</td><td id="S4.T2.6.7.7">24</td><td id="S4.T2.6.7.8">52.3</td><td id="S4.T2.6.7.9">–</td></tr><tr id="S4.T2.6.8"><td id="S4.T2.6.8.1" colspan="9"><span id="S4.T2.6.8.1.1">DCI Agents</span></td></tr><tr id="S4.T2.6.9"><td id="S4.T2.6.9.1">DCI-Agent-Lite (GPT-5.4 nano)</td><td id="S4.T2.6.9.2"><span id="S4.T2.6.9.2.1">72</span></td><td id="S4.T2.6.9.3"><span id="S4.T2.6.9.3.1">84</span></td><td id="S4.T2.6.9.4"><span id="S4.T2.6.9.4.1">72</span></td><td id="S4.T2.6.9.5"><span id="S4.T2.6.9.5.1">72</span></td><td id="S4.T2.6.9.6"><span id="S4.T2.6.9.6.1">68</span></td><td id="S4.T2.6.9.7"><span id="S4.T2.6.9.7.1">40</span></td><td id="S4.T2.6.9.8"><span id="S4.T2.6.9.8.1">68.0</span></td><td id="S4.T2.6.9.9"><span id="S4.T2.6.9.9.1"><math id="S4.T2.m8" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo mathbackground="#AFE8B5" stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math> 15.7</span></td></tr><tr id="S4.T2.6.10"><td id="S4.T2.6.10.1">DCI-Agent-CC (Sonnet 4.6)</td><td id="S4.T2.6.10.2"><span id="S4.T2.6.10.2.1">78</span></td><td id="S4.T2.6.10.3"><span id="S4.T2.6.10.3.1">96</span></td><td id="S4.T2.6.10.4"><span id="S4.T2.6.10.4.1">80</span></td><td id="S4.T2.6.10.5"><span id="S4.T2.6.10.5.1">88</span></td><td id="S4.T2.6.10.6"><span id="S4.T2.6.10.6.1">82</span></td><td id="S4.T2.6.10.7"><span id="S4.T2.6.10.7.1">74</span></td><td id="S4.T2.6.10.8"><span id="S4.T2.6.10.8.1">83.0</span></td><td id="S4.T2.6.10.9"><span id="S4.T2.6.10.9.1"><math id="S4.T2.m9" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo mathbackground="#62D26D" stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math> 30.7</span></td></tr></tbody></table>

Table 3: NDCG@10 on IR ranking benchmarks. Δ\\Delta Avg. denotes the improvement in average accuracy over ReasonRank-32B, the strongest conventional retrieval baseline. Bold and underlined entries mark the best and second-best results in each column, respectively.

<table id="S4.T3.6"><tbody><tr id="S4.T3.6.1"><td id="S4.T3.6.1.1"></td><td id="S4.T3.6.1.2" colspan="4">BRIGHT</td><td id="S4.T3.6.1.3" colspan="2">BEIR</td><td id="S4.T3.6.1.4" colspan="2">Summary</td></tr><tr id="S4.T3.6.2"><td id="S4.T3.6.2.1">Method</td><td id="S4.T3.6.2.2">Bio.</td><td id="S4.T3.6.2.3">Earth.</td><td id="S4.T3.6.2.4">Econ.</td><td id="S4.T3.6.2.5">Robotics</td><td id="S4.T3.6.2.6">ArguAna</td><td id="S4.T3.6.2.7">SciFact</td><td id="S4.T3.6.2.8">Avg.</td><td id="S4.T3.6.2.9"><math id="S4.T3.m3" alttext="\Delta" display="inline" intent=":literal"><semantics><mi mathvariant="normal">Δ</mi><annotation encoding="application/x-tex">\Delta</annotation></semantics></math> Avg.</td></tr><tr id="S4.T3.6.3"><td id="S4.T3.6.3.1" colspan="9"><span id="S4.T3.6.3.1.1">Sparse &amp; Dense Retrieval</span></td></tr><tr id="S4.T3.6.4"><td id="S4.T3.6.4.1">BM25</td><td id="S4.T3.6.4.2">18.9</td><td id="S4.T3.6.4.3">27.2</td><td id="S4.T3.6.4.4">14.9</td><td id="S4.T3.6.4.5">13.6</td><td id="S4.T3.6.4.6">31.5</td><td id="S4.T3.6.4.7">15.8</td><td id="S4.T3.6.4.8">20.3</td><td id="S4.T3.6.4.9"><span id="S4.T3.6.4.9.1"><math id="S4.T3.m4" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FDA7A7" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 26.7</span></td></tr><tr id="S4.T3.6.5"><td id="S4.T3.6.5.1">OpenAI-text-emb-3-large</td><td id="S4.T3.6.5.2">23.3</td><td id="S4.T3.6.5.3">26.7</td><td id="S4.T3.6.5.4">19.5</td><td id="S4.T3.6.5.5">12.8</td><td id="S4.T3.6.5.6">58.1</td><td id="S4.T3.6.5.7">58.1</td><td id="S4.T3.6.5.8">33.1</td><td id="S4.T3.6.5.9"><span id="S4.T3.6.5.9.1"><math id="S4.T3.m5" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FED1D1" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 13.9</span></td></tr><tr id="S4.T3.6.6"><td id="S4.T3.6.6.1">GTE-Qwen2-7B-Instruct</td><td id="S4.T3.6.6.2">30.6</td><td id="S4.T3.6.6.3">36.4</td><td id="S4.T3.6.6.4">17.8</td><td id="S4.T3.6.6.5">13.2</td><td id="S4.T3.6.6.6">62.7</td><td id="S4.T3.6.6.7">75.3</td><td id="S4.T3.6.6.8">39.3</td><td id="S4.T3.6.6.9"><span id="S4.T3.6.6.9.1"><math id="S4.T3.m6" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FFE6E6" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 7.7</span></td></tr><tr id="S4.T3.6.7"><td id="S4.T3.6.7.1">Rank-R1-14B</td><td id="S4.T3.6.7.2">31.2</td><td id="S4.T3.6.7.3">38.5</td><td id="S4.T3.6.7.4">21.2</td><td id="S4.T3.6.7.5">22.6</td><td id="S4.T3.6.7.6">31.3</td><td id="S4.T3.6.7.7">72.2</td><td id="S4.T3.6.7.8">36.2</td><td id="S4.T3.6.7.9"><span id="S4.T3.6.7.9.1"><math id="S4.T3.m7" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FEDBDB" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 10.8</span></td></tr><tr id="S4.T3.6.8"><td id="S4.T3.6.8.1">Rank1-32B</td><td id="S4.T3.6.8.2">49.7</td><td id="S4.T3.6.8.3">35.8</td><td id="S4.T3.6.8.4">22.0</td><td id="S4.T3.6.8.5">22.5</td><td id="S4.T3.6.8.6">57.6</td><td id="S4.T3.6.8.7">74.8</td><td id="S4.T3.6.8.8">43.7</td><td id="S4.T3.6.8.9"><span id="S4.T3.6.8.9.1"><math id="S4.T3.m8" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo mathbackground="#FFF4F4" stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math> 3.3</span></td></tr><tr id="S4.T3.6.9"><td id="S4.T3.6.9.1">ReasonRank-32B</td><td id="S4.T3.6.9.2">58.2</td><td id="S4.T3.6.9.3">48.9</td><td id="S4.T3.6.9.4"><span id="S4.T3.6.9.4.1">36.6</span></td><td id="S4.T3.6.9.5">33.9</td><td id="S4.T3.6.9.6">28.7</td><td id="S4.T3.6.9.7"><span id="S4.T3.6.9.7.1">75.5</span></td><td id="S4.T3.6.9.8">47.0</td><td id="S4.T3.6.9.9">–</td></tr><tr id="S4.T3.6.10"><td id="S4.T3.6.10.1" colspan="9"><span id="S4.T3.6.10.1.1">DCI Agents</span></td></tr><tr id="S4.T3.6.11"><td id="S4.T3.6.11.1">DCI-Agent-Lite (GPT-5.4 nano)</td><td id="S4.T3.6.11.2"><span id="S4.T3.6.11.2.1">60.0</span></td><td id="S4.T3.6.11.3"><span id="S4.T3.6.11.3.1">50.8</span></td><td id="S4.T3.6.11.4">32.3</td><td id="S4.T3.6.11.5"><span id="S4.T3.6.11.5.1">42.4</span></td><td id="S4.T3.6.11.6"><span id="S4.T3.6.11.6.1">81.9</span></td><td id="S4.T3.6.11.7">72.7</td><td id="S4.T3.6.11.8"><span id="S4.T3.6.11.8.1">56.7</span></td><td id="S4.T3.6.11.9"><span id="S4.T3.6.11.9.1"><math id="S4.T3.m9" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo mathbackground="#CEF1D1" stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math> 9.7</span></td></tr><tr id="S4.T3.6.12"><td id="S4.T3.6.12.1">DCI-Agent-CC (Sonnet 4.6)</td><td id="S4.T3.6.12.2"><span id="S4.T3.6.12.2.1">77.1</span></td><td id="S4.T3.6.12.3"><span id="S4.T3.6.12.3.1">69.0</span></td><td id="S4.T3.6.12.4"><span id="S4.T3.6.12.4.1">46.8</span></td><td id="S4.T3.6.12.5"><span id="S4.T3.6.12.5.1">56.8</span></td><td id="S4.T3.6.12.6"><span id="S4.T3.6.12.6.1">85.3</span></td><td id="S4.T3.6.12.7"><span id="S4.T3.6.12.7.1">75.7</span></td><td id="S4.T3.6.12.8"><span id="S4.T3.6.12.8.1">68.5</span></td><td id="S4.T3.6.12.9"><span id="S4.T3.6.12.9.1"><math id="S4.T3.m10" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo mathbackground="#91DF99" stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math> 21.5</span></td></tr></tbody></table>

#### Baselines.

We include two categories of baselines to contextualize results:

-   •

    Retrieval Agents. For BrowseComp-Plus, we adopt the official agentic search pipeline with a conventional retriever interface, using BM25 and Qwen3-Embedding-8B, paired with GPT-5 (38), o3 (39), GLM-4.7 (70), Claude Sonnet 4.5 (2), and Claude Sonnet 4.6 (4). For knowledge-intensive QA, we compare against commonly adopted agentic retrieval baselines, including R1-Searcher (48), Search-R1 (21), ZeroSearch (52), Verl-Tool-Search (19), and ASearcher (11).

-   •

    Sparse & Dense Retrieval. For IR-ranking, we compare against both sparse and dense retrievers, including BM25 (45), OpenAI-text-embedding-3-large (35), GTE-Qwen2-7B-Instruct (28), as well as reasoning-oriented rerankers, including Rank-R1 (75), Rank1 (65), and ReasonRank (32).

More details on baseline implementations are provided in §A.2.

### 4.2 Main Results

#### RQ1: Can a mature DCI agent already achieve strong performance?

The answer is affirmative. We provide consistent evidence across three representative settings.

#### Agentic Search.

As shown in Figure 1, replacing a conventional retriever with DCI yields substantial gains on BrowseComp-Plus. Specifically, with the same Claude Sonnet 4.6 backbone, replacing Qwen3-Embedding-8B with DCI increases accuracy from 69.0% to 80.0% (++11.0 points) while reducing cost from $1,440 to $1,016 (−\-29.4%). Notably, DCI-Agent-CC not only outperforms its matched retrieval counterpart but also surpasses the strongest retrieval baseline overall, GPT-5 + Qwen3-Embedding-8B (71.7%), by +8.3 points. Meanwhile, DCI-Agent-Lite (GPT-5.4 nano) strikes a good balance between performance and cost: it achieves 62.9% accuracy at a cost of only $93, remaining competitive with substantially stronger retrieval agents such as o3 + Qwen3-Embedding-8B (66.0%) while reducing cost by $647. These results indicate that DCI can deliver strong deep-research accuracy and high cost efficiency.

#### Knowledge-Intensive QA.

As shown in Table 2, DCI agents consistently surpass retrieval-agent baselines on knowledge-intensive QA. DCI-Agent-CC attains 83.0% average accuracy, exceeding the strongest baseline, ASearcher-Local-14B (52.3%), by 30.7 points, while DCI-Agent-Lite is also competitive at 68.0%. The gains are especially pronounced on multi-hop benchmarks: relative to ASearcher-Local-14B, DCI-Agent-CC improves by 30 points on HotpotQA, 26 on 2Wiki, and 50 on MuSiQue. Across all six datasets, DCI-Agent-CC and DCI-Agent-Lite take the top two positions, indicating that DCI is a strong alternative to conventional retrieval-augmented pipelines for complex, multi-step evidence aggregation and reasoning.

#### IR Ranking.

As shown in Table 3, DCI agents exhibit a clear advantage over conventional retrieval baselines for IR ranking. DCI-Agent-CC (68.5%) achieves the best NDCG@10 score on all six datasets, exceeding the strongest retrieval baseline, ReasonRank-32B (47.0%), by 21.5 points on average. DCI-Agent-Lite remains highly competitive, ranking second overall with an average NDCG@10 of 56.7, still 9.7 points above the strongest retrieval baseline. These results suggest that the DCI paradigm is effective for ranking.

Taken together, these results indicate that DCI is a promising operating regime, pairing strong performance with favorable cost efficiency across diverse retrieval and reasoning tasks. Next, we examine the mechanisms behind these gains through controlled ablations and trajectory-level analyses.

### 4.3 Controlled Ablations and Mechanism Analysis

Figure 4: Left: Results on all 830 BrowseComp-Plus questions with the Sonnet 4.6 backbone, comparing DCI-Agent-CC to the retrieval agent using Qwen3-Embedding-8B as the retriever. Right: Distribution of tool calls and Bash intents across all DCI-Agent-CC runs, illustrating how the dominant Bash tool decomposes into ten concrete command intents.

#### RQ2: Why does DCI help?

We find that DCI’s advantage arises less from higher gold-document recall and more from fine-grained discovery, composition, and use of evidence through flexible, compositional bash commands. As shown in Figure 4 (left), with the same Sonnet 4.6 backbone, DCI-Agent-CC correctly answers 176 BrowseComp-Plus questions that the matched retrieval agent misses, whereas only 76 show the reverse pattern. Crucially, this gap is not primarily due to outright retrieval failure: among the 176 CC-win cases, only 34 contain no gold documents retrieved by the retrieval agent, while the remaining 142 already surface at least one gold document. These errors fall into two regimes: partial-chain failures (0<recall<1000<\\text{recall}<100, 83 cases), where retrieval exposes some but insufficient evidence to bridge the next hop, and post-retrieval failures (recall \=100\=100, 59 cases), where all gold documents are surfaced but not successfully utilized. The tool distribution in Figure 4 (right) reinforces this interpretation. DCI-Agent-CC relies primarily on Bash (62.4%) and Grep (33.0%), where Grep is Claude Code’s built-in file-search primitive, roughly analogous to grep\-style lexical search. Within Bash, usage concentrates on chained search (22.3%), local context peeking (18.0%), regex matching (17.0%), and file localization (14.0%), while full-document reads account for only 9.1%. Taken together, these patterns indicate that DCI’s gains come from exploiting the expressive, compositional nature of bash interactions to compose lexical constraints, verify exact spans, and selectively expand promising snippets into evidence.

Table 4: Trajectory analysis on a BrowseComp-Plus subset (nn = 100). As mentioned in §3.3, coverage is computed over per–gold-document hit lists using three aggregations: any, mean (recall), and all; Avg. localization averages the best segment-level localization score across matched gold documents only. Costs reflect agent-side cost only.

<table id="S4.T4.14.1"><tbody><tr id="S4.T4.14.1.1"><td id="S4.T4.14.1.1.1">Method</td><td id="S4.T4.14.1.1.2">Avg. tools</td><td id="S4.T4.14.1.1.3">Cost / q ($)</td><td id="S4.T4.14.1.1.4" colspan="3"><span id="S4.T4.14.1.1.4.1">coverage</span> <math id="S4.T4.m3" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math></td><td id="S4.T4.14.1.1.5">Avg. <span id="S4.T4.14.1.1.5.1">localization</span></td><td id="S4.T4.14.1.1.6">Acc.</td><td id="S4.T4.14.1.1.7"><math id="S4.T4.m4" alttext="\Delta" display="inline" intent=":literal"><semantics><mi mathvariant="normal">Δ</mi><annotation encoding="application/x-tex">\Delta</annotation></semantics></math> Acc.</td></tr><tr id="S4.T4.14.1.2"><td id="S4.T4.14.1.2.1"></td><td id="S4.T4.14.1.2.2"><math id="S4.T4.m5" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math></td><td id="S4.T4.14.1.2.3"><math id="S4.T4.m6" alttext="\downarrow" display="inline" intent=":literal"><semantics><mo stretchy="false">↓</mo><annotation encoding="application/x-tex">\downarrow</annotation></semantics></math></td><td id="S4.T4.14.1.2.4"><span id="S4.T4.14.1.2.4.1">any</span></td><td id="S4.T4.14.1.2.5"><span id="S4.T4.14.1.2.5.1">mean</span> (recall)</td><td id="S4.T4.14.1.2.6"><span id="S4.T4.14.1.2.6.1">all</span></td><td id="S4.T4.14.1.2.7"><math id="S4.T4.m7" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math></td><td id="S4.T4.14.1.2.8"><math id="S4.T4.m8" alttext="\uparrow" display="inline" intent=":literal"><semantics><mo stretchy="false">↑</mo><annotation encoding="application/x-tex">\uparrow</annotation></semantics></math></td><td id="S4.T4.14.1.2.9"></td></tr><tr id="S4.T4.14.1.3"><td id="S4.T4.14.1.3.1" colspan="9"><span id="S4.T4.14.1.3.1.1">Retrieval Agents (GPT-5.4-nano)</span></td></tr><tr id="S4.T4.14.1.4"><td id="S4.T4.14.1.4.1">BM25</td><td id="S4.T4.14.1.4.2">19.07</td><td id="S4.T4.14.1.4.3">0.0527</td><td id="S4.T4.14.1.4.4">63.0</td><td id="S4.T4.14.1.4.5">42.8</td><td id="S4.T4.14.1.4.6">17.0</td><td id="S4.T4.14.1.4.7">23.5</td><td id="S4.T4.14.1.4.8">32.0</td><td id="S4.T4.14.1.4.9"><math id="S4.T4.m9" alttext="\downarrow 13.0" display="inline" intent=":literal"><semantics><mrow><mphantom></mphantom><mo mathbackground="#FFD2D2" stretchy="false">↓</mo><mn mathbackground="#FFD2D2">13.0</mn></mrow><annotation encoding="application/x-tex">\downarrow 13.0</annotation></semantics></math></td></tr><tr id="S4.T4.14.1.5"><td id="S4.T4.14.1.5.1">Qwen3-Embedding-8B</td><td id="S4.T4.14.1.5.2"><span id="S4.T4.14.1.5.2.1">17.55</span></td><td id="S4.T4.14.1.5.3"><span id="S4.T4.14.1.5.3.1">0.0498</span></td><td id="S4.T4.14.1.5.4"><span id="S4.T4.14.1.5.4.1">74.0</span></td><td id="S4.T4.14.1.5.5"><span id="S4.T4.14.1.5.5.1">56.7</span></td><td id="S4.T4.14.1.5.6"><span id="S4.T4.14.1.5.6.1">28.0</span></td><td id="S4.T4.14.1.5.7">21.7</td><td id="S4.T4.14.1.5.8">45.0</td><td id="S4.T4.14.1.5.9">–</td></tr><tr id="S4.T4.14.1.6"><td id="S4.T4.14.1.6.1" colspan="9"><span id="S4.T4.14.1.6.1.1">DCI-Agent-Lite (GPT-5.4-nano)</span></td></tr><tr id="S4.T4.14.1.7"><td id="S4.T4.14.1.7.1">Direct interaction (L4)</td><td id="S4.T4.14.1.7.2">35.35</td><td id="S4.T4.14.1.7.3">0.1021</td><td id="S4.T4.14.1.7.4">70.0</td><td id="S4.T4.14.1.7.5">28.0</td><td id="S4.T4.14.1.7.6">1.0</td><td id="S4.T4.14.1.7.7"><span id="S4.T4.14.1.7.7.1">48.4</span></td><td id="S4.T4.14.1.7.8"><span id="S4.T4.14.1.7.8.1">73.0</span></td><td id="S4.T4.14.1.7.9"><math id="S4.T4.m10" alttext="\uparrow 28.0" display="inline" intent=":literal"><semantics><mrow><mphantom></mphantom><mo mathbackground="#A3DF9B" stretchy="false">↑</mo><mn mathbackground="#A3DF9B">28.0</mn></mrow><annotation encoding="application/x-tex">\uparrow 28.0</annotation></semantics></math></td></tr></tbody></table>

#### RQ3: What behavioral tradeoffs distinguish DCI from retrieval?

This question clarifies what DCI buys and what it costs. The key pattern in Table 4 is that DCI-Agent-Lite does not win by exhaustively recovering more gold documents. Its mean gold-document coverage is much lower than Qwen3-Embedding-8B’s (28.0 vs. 56.7), but its coverageany\\texttt{coverage}\_{\\texttt{any}} score is comparable (70.0 vs. 74.0), while its localization score is dramatically higher (48.4 vs. 21.7). This matters because BrowseComp-Plus questions typically have only 1–4 gold documents. In that regime, once DCI surfaces one useful gold document, it can pivot from broad retrieval to fine-grained inspection and verification. In effect, DCI trades exhaustive gold-chain recovery for high-resolution local progress: it finds a relevant document often enough, then extracts substantially more value from the document it has already reached. This pattern aligns with the observed ++28-point accuracy gain despite lower mean coverage and roughly twice as many tool calls. Additional analyses of DCI-Agent-Lite’s search patterns are provided in §B.1.

Figure 5: Corpus-scaling results for DCI-Agent-CC on a BrowseComp-Plus subset (nn = 100).

Table 5: Tool-profile ablation on a BrowseComp-Plus subset (nn = 100). Bold denotes the best result.

#### RQ4: How does DCI scale with corpus size?

As shown in Figure 5, DCI has a clear operating envelope: it scales well in search depth, but incurs rapidly rising costs in search breadth. We expand the BrowseComp-Plus corpus from 100K to 200K documents by injecting additional distractors from FineWeb (42) into the original set. Under this change, DCI-Agent-CC requires far more tool calls per question (38.5 →\\rightarrow 86.9), latency more than doubles, cost more than doubles, and accuracy drops by 13.6 points. At 400K documents, degradation is more severe: accuracy falls to 37.5%, average tool usage rises to 122.4 calls, and 20 examples terminate after hitting the maximum tool budget. In short, the high-resolution interface remains powerful once the agent reaches a promising document, but the cost of locating that first useful anchor grows sharply as the candidate space expands.

#### RQ5: How does runtime context management affect DCI-Agent-Lite?

We isolate the impact of runtime context management on DCI by evaluating it under a minimal harness and identifying the policy that best supports long-horizon search. The five levels listed in Table 1 are examined. For evaluation, we randomly sample 100 BrowseComp-Plus examples, with ablations reported in Table 6. The pattern is distinctly non-monotonic: more aggressive management does not simply yield better results. L1 is the fastest and retains the most gold evidence in the final state (31.3), yet L3 achieves the best answer accuracy (77) with lower retained coverage (27.0), indicating that preserving more verbatim evidence is not the same as maintaining the right working state for continued search. Meanwhile, L2 attains the lowest cost but the worst accuracy (69), and L4 declines again after the L3 peak. Overall, there is a sweet spot: policies that selectively forget are beneficial for sustaining multi-step hypothesis revision, whereas compression that is too weak allows drift and compression that is too blunt discards useful intermediate structure.

Table 6: DCI-Agent-Lite (GPT-5.4 nano) context-management ablation on a BrowseComp-Plus subset (nn = 100). Retained cov. is the fraction of gold evidence documents remaining in the final conversation state. Parenthesized deltas in Retained cov. and Acc. are computed relative to the L0 baseline. Bold denotes the best result in each metric column.

#### RQ6: How much does tool-set expressivity matter for DCI-Agent-Lite?

This question examines whether the observed gains come from DCI itself or from access to highly expressive tools such as an unrestricted shell. The ablation in Table 5 suggests a two-fold answer. First, the benefit already appears under a highly constrained interface: with only “read + grep”, restricting the agent to file inspection and exact or pattern-based search, the agent achieves 61% accuracy on BrowseComp-Plus, outperforming the retrieval-agent baseline using Qwen3-Embedding-8B (45%) by 16 points, while maintaining nearly identical tool-call intensity. Second, enabling the bash command set adds a further 12-point gain, but at the cost of substantially higher tool usage, latency, and compute. A detailed breakdown of DCI-Agent-Lite’s bash command usage is provided in §B.1. Overall, these results indicate that a small set of bash commands is sufficient to unlock most of the improvement, whereas additional expressivity yields incremental gains with reduced efficiency.

## 5 Conclusion

This paper formalizes _direct corpus interaction_ (DCI) as an alternative retrieval paradigm for agentic search, in which an agent searches and verifies against the raw corpus using general-purpose terminal tools rather than a conventional retriever. Across ranking-oriented IR, multi-hop QA, and end-to-end agentic search benchmarks, DCI already serves as a competitive approach without any offline index. Controlled ablations and trajectory-level analyses indicate that its advantage stems from retrieval-interface resolution: DCI often succeeds not by recovering more of the gold chain, but by converting surfaced evidence into higher-value local inspection, verification, and compositional search steps. We hope these results encourage future work to evaluate not only retrieval models, but also the corpus interfaces available to capable agents.

## References

-   Anthropic (2025a) Anthropic Claude Code: agentic coding tool. Note: https://docs.anthropic.com/en/docs/claude-code/overview Cited by: §2, §3.1.
-   Anthropic (2025b) Anthropic Introducing claude sonnet 4.5. Note: https://www.anthropic.com/news/claude-sonnet-4-5 Cited by: 2nd item, 1st item.
-   Anthropic (2026a) Anthropic Claude cowork by anthropic. Note: https://www.anthropic.com/product/claude-cowork Cited by: §1.
-   Anthropic (2026b) Anthropic Introducing claude sonnet 4.6. Note: https://www.anthropic.com/news/claude-sonnet-4-6 Cited by: 2nd item, §1, 1st item, §4.1.
-   Asai et al. (2023) A. Asai, S. Min, Z. Zhong, and D. Chen Retrieval-based language models and applications. In ACL’23, Tutorial Abstracts, pp. 41–46. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Bajaj et al. (2016) P. Bajaj, D. Campos, N. Craswell, L. Deng, J. Gao, X. Liu, R. Majumder, A. McNamara, B. Mitra, T. Nguyen, et al. MS marco: a human generated machine reading comprehension dataset. arXiv preprint arXiv:1611.09268. Cited by: §A.3.
-   Borgeaud et al. (2022) S. Borgeaud, A. Mensch, J. Hoffmann, T. Cai, E. Rutherford, K. Millican, G. B. Van Den Driessche, J. Lespiau, B. Damoc, A. Clark, et al. Improving language models by retrieving from trillions of tokens. In ICML’22, pp. 2206–2240. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Chen et al. (2025a) K. Chen, Y. Ren, Y. Liu, X. Hu, H. Tian, T. Xie, F. Liu, H. Zhang, H. Liu, Y. Gong, et al. Xbench: tracking agents productivity scaling with profession-aligned real-world evaluations. arXiv preprint arXiv:2506.13651. Cited by: §2.
-   Chen et al. (2025b) Z. Chen, X. Ma, S. Zhuang, P. Nie, K. Zou, A. Liu, J. Green, K. Patel, R. Meng, M. Su, S. Sharifymoghaddam, Y. Li, H. Hong, X. Shi, X. Liu, N. Thakur, C. Zhang, L. Gao, W. Chen, and J. Lin BrowseComp-plus: a more fair and transparent evaluation benchmark of deep-research agent. arXiv preprint arXiv:2508.06600. Cited by: 1st item, §1, §1, §1, §2, 1st item.
-   Deng et al. (2025) X. Deng, J. Da, E. Pan, Y. Y. He, C. Ide, K. Garg, N. Lauffer, A. Park, N. Pasari, C. Rane, et al. Swe-bench pro: can ai agents solve long-horizon software engineering tasks?. arXiv preprint arXiv:2509.16941. Cited by: §2.
-   Gao et al. (2025) J. Gao, W. Fu, M. Xie, S. Xu, C. He, Z. Mei, B. Zhu, and Y. Wu Beyond ten turns: unlocking long-horizon agentic search with large-scale asynchronous rl. arXiv preprint arXiv:2508.07976. Cited by: 5th item, §1, 2nd item, 1st item.
-   Gao et al. (2023) Y. Gao, Y. Xiong, X. Gao, K. Jia, J. Pan, Y. Bi, Y. Dai, J. Sun, M. Wang, and H. Wang Retrieval-augmented generation for large language models: a survey. arXiv preprint arXiv:2312.10997. Cited by: §1, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Gauthier (2024) P. Gauthier Aider: AI pair programming in your terminal. Note: https://github.com/Aider-AI/aider Cited by: §2.
-   GNU Project (2025) GNU Project Pipelines. Note: https://www.gnu.org/software/bash/manual/html\_node/Pipelines.html Cited by: §2.
-   Guu et al. (2020) K. Guu, K. Lee, Z. Tung, P. Pasupat, and M. Chang Retrieval augmented language model pre-training. In ICML’20, pp. 3929–3938. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Ho et al. (2020) X. Ho, A. D. Nguyen, S. Sugawara, and A. Aizawa Constructing a multi-hop qa dataset for comprehensive evaluation of reasoning steps. In COLING’20, pp. 6609–6625. Cited by: 5th item, 2nd item.
-   Izacard et al. (2022) G. Izacard, M. Caron, L. Hosseini, S. Riedel, P. Bojanowski, A. Joulin, and E. Grave Unsupervised dense information retrieval with contrastive learning. TMLR. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Jeong et al. (2024) S. Jeong, J. Baek, S. Cho, S. J. Hwang, and J. C. Park Adaptive-rag: learning to adapt retrieval-augmented large language models through question complexity. In NAACL-HLT’24, pp. 7036–7050. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Jiang et al. (2025) D. Jiang, Y. Lu, Z. Li, Z. Lyu, P. Nie, H. Wang, A. Su, H. Chen, K. Zou, C. Du, et al. Verltool: towards holistic agentic reinforcement learning with tool use. arXiv preprint arXiv:2509.01055. Cited by: 4th item, §1, §2, 1st item.
-   Jimenez et al. (2024) C. E. Jimenez, J. Yang, A. Wettig, S. Yao, K. Pei, O. Press, and K. Narasimhan SWE-bench: can language models resolve real-world GitHub issues?. In ICLR’24, Cited by: §2.
-   Jin et al. (2025) B. Jin, H. Zeng, Z. Yue, J. Yoon, S. O. Arik, D. Wang, H. Zamani, and J. Han Search-r1: training llms to reason and leverage search engines with reinforcement learning. In COLM’25, Cited by: 2nd item, §1, §2, 2nd item, 1st item.
-   Joshi et al. (2017) M. Joshi, E. Choi, D. S. Weld, and L. Zettlemoyer Triviaqa: a large scale distantly supervised challenge dataset for reading comprehension. In ACL’17, pp. 1601–1611. Cited by: 2nd item, 2nd item.
-   Karpukhin et al. (2020) V. Karpukhin, B. Oguz, S. Min, P. Lewis, L. Wu, S. Edunov, D. Chen, and W. Yih Dense passage retrieval for open-domain question answering. In EMNLP’20, pp. 6769–6781. Cited by: §1, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 2nd item.
-   Khattab and Zaharia (2020) O. Khattab and M. Zaharia Colbert: efficient and effective passage search via contextualized late interaction over bert. In SIGIR’20, pp. 39–48. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Kwiatkowski et al. (2019) T. Kwiatkowski, J. Palomaki, O. Redfield, M. Collins, A. Parikh, C. Alberti, D. Epstein, I. Polosukhin, J. Devlin, K. Lee, et al. Natural questions: a benchmark for question answering research. TACL 7, pp. 453–466. Cited by: 1st item, 2nd item.
-   Lewis et al. (2020) P. Lewis, E. Perez, A. Piktus, F. Petroni, V. Karpukhin, N. Goyal, H. Küttler, M. Lewis, W. Yih, T. Rocktäschel, et al. Retrieval-augmented generation for knowledge-intensive NLP tasks. In NeurIPS’20, pp. 9459–9474. Cited by: §1, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Li et al. (2026a) X. Li, W. Chen, Y. Liu, S. Zheng, X. Chen, Y. He, Y. Li, B. You, H. Shen, J. Sun, et al. SkillsBench: benchmarking how well agent skills work across diverse tasks. arXiv preprint arXiv:2602.12670. Cited by: §2.
-   Li et al. (2023) Z. Li, X. Zhang, Y. Zhang, D. Long, P. Xie, and M. Zhang Towards general text embeddings with multi-stage contrastive learning. arXiv preprint arXiv:2308.03281. Cited by: 3rd item, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 2nd item.
-   Li et al. (2026b) Z. Li, D. Jiang, X. Ma, H. Zhang, P. Nie, Y. Zhang, K. Zou, J. Xie, Y. Zhang, and W. Chen OpenResearcher: a fully open pipeline for long-horizon deep research trajectory synthesis. arXiv preprint arXiv:2603.20278. Cited by: §1, §2.
-   Li et al. (2025) Z. Li, H. Zhang, S. Han, S. Liu, J. Xie, Y. Zhang, Y. Choi, J. Zou, and P. Lu In-the-flow agentic system optimization for effective planning and tool use. arXiv preprint arXiv:2510.05592. Cited by: §2.
-   Liu et al. (2023) J. Liu, C. S. Xia, Y. Wang, and L. Zhang Is your code generated by chatgpt really correct? rigorous evaluation of large language models for code generation. In NeurIPS’23, pp. 21558–21572. Cited by: §2.
-   Liu et al. (2025) W. Liu, X. Ma, W. Sun, Y. Zhu, Y. Li, D. Yin, and Z. Dou Reasonrank: empowering passage ranking with strong reasoning ability. arXiv preprint arXiv:2508.07050. Cited by: 8th item, §1, 2nd item.
-   Merrill et al. (2026) M. A. Merrill, A. G. Shaw, N. Carlini, B. Li, H. Raj, I. Bercovich, L. Shi, J. Y. Shin, T. Walshe, E. K. Buchanan, et al. Terminal-bench: benchmarking agents on hard, realistic tasks in command line interfaces. arXiv preprint arXiv:2601.11868. Cited by: §2.
-   Mialon et al. (2024) G. Mialon, C. Fourrier, T. Wolf, Y. LeCun, and T. Scialom Gaia: a benchmark for general ai assistants. In ICLR’24, Cited by: §2.
-   OpenAI (2024) OpenAI Text-embedding-3-large. Note: https://developers.openai.com/api/docs/models/text-embedding-3-large Cited by: 2nd item, 2nd item.
-   OpenAI (2025a) OpenAI Introducing GPT-4.1 in the API. Note: https://openai.com/index/gpt-4-1/ Cited by: §A.3.
-   OpenAI (2025b) OpenAI Introducing gpt-5.2. Note: https://openai.com/zh-Hans-CN/index/introducing-gpt-5-2/ Cited by: 1st item.
-   OpenAI (2025c) OpenAI Introducing gpt-5. Note: https://openai.com/index/introducing-gpt-5/ Cited by: 1st item.
-   OpenAI (2025d) OpenAI Introducing openai o3 and o4-mini. Note: https://openai.com/index/introducing-o3-and-o4-mini/ Cited by: 1st item, 1st item.
-   OpenAI (2026a) OpenAI GPT-5.4 nano model. Note: https://developers.openai.com/api/docs/models/gpt-5.4-nano Cited by: 1st item, §4.1.
-   OpenAI (2026b) OpenAI Introducing GPT-5.4. Note: https://openai.com/index/introducing-gpt-5-4/ Cited by: §1.
-   Penedo et al. (2024) G. Penedo, H. Kydlíček, A. Lozhkov, M. Mitchell, C. A. Raffel, L. Von Werra, T. Wolf, et al. The fineweb datasets: decanting the web for the finest text data at scale. In NeurIPS’24, pp. 30811–30849. Cited by: §4.3.
-   Press et al. (2023) O. Press, M. Zhang, S. Min, L. Schmidt, N. A. Smith, and M. Lewis Measuring and narrowing the compositionality gap in language models. In Findings of EMNLP’23, pp. 5687–5711. Cited by: 3rd item, §1, 2nd item.
-   Ram et al. (2023) O. Ram, Y. Levine, I. Dalmedigos, D. Muhlgay, A. Shashua, K. Leyton-Brown, and Y. Shoham In-context retrieval-augmented language models. TACL 11, pp. 1316–1331. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Robertson et al. (1994) S. E. Robertson, S. Walker, S. Jones, M. M. Hancock-Beaulieu, M. Gatford, et al. Okapi at trec. In TREC’94, Cited by: 1st item, §1, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 2nd item.
-   Shi et al. (2024) W. Shi, S. Min, M. Yasunaga, M. Seo, R. James, M. Lewis, L. Zettlemoyer, and W. Yih Replug: retrieval-augmented black-box language models. In NAACL-HLT’24, pp. 8371–8384. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Singh et al. (2025) A. Singh, A. Ehtesham, S. Kumar, and T. T. Khoei Agentic retrieval-augmented generation: a survey on agentic rag. arXiv preprint arXiv:2501.09136. Cited by: §1, §1.
-   Song et al. (2025) H. Song, J. Jiang, Y. Min, J. Chen, Z. Chen, W. X. Zhao, L. Fang, and J. Wen R1-searcher: incentivizing the search capability in llms via reinforcement learning. arXiv preprint arXiv:2503.05592. Cited by: 1st item, 1st item.
-   Steinberger and OpenClaw Contributors (2025) P. Steinberger and OpenClaw Contributors OpenClaw: your own personal AI assistant. Note: https://github.com/openclaw/openclaw Cited by: §1.
-   Su et al. (2025) H. Su, H. Yen, M. Xia, W. Shi, N. Muennighoff, H. Wang, L. Haisu, Q. Shi, Z. S. Siegel, M. Tang, R. Sun, J. Yoon, S. O. Arik, D. Chen, and T. Yu BRIGHT: a realistic and challenging benchmark for reasoning-intensive retrieval. In ICLR’25, Cited by: 1st item, §A.3, §1, 3rd item.
-   Subramanian et al. (2025) S. Subramanian, A. Akinfaderin, Y. Zhang, I. Singh, M. Khanuja, S. Singh, and M. L. Tanke Keyword search is all you need: achieving rag-level performance without vector databases using agentic tool use. arXiv preprint arXiv:2602.23368. Cited by: §2.
-   Sun et al. (2025) H. Sun, Z. Qiao, J. Guo, X. Fan, Y. Hou, Y. Jiang, P. Xie, Y. Zhang, F. Huang, and J. Zhou Zerosearch: incentivize the search capability of llms without searching. arXiv preprint arXiv:2505.04588. Cited by: 3rd item, 1st item.
-   Sun et al. (2023) W. Sun, L. Yan, X. Ma, S. Wang, P. Ren, Z. Chen, D. Yin, and Z. Ren Is chatgpt good at search? investigating large language models as re-ranking agents. In EMNLP’23, pp. 14918–14937. Cited by: §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction").
-   Sutawika et al. (2026) L. Sutawika, A. B. Soni, A. Gandhi, T. Yassine, S. Vijayvargiya, Y. Li, X. Zhou, Y. Zhang, L. M. Maben, G. Neubig, et al. CodeScout: an effective recipe for reinforcement learning of code search agents. arXiv preprint arXiv:2603.17829. Cited by: §2.
-   Team et al. (2025a) M. Team, S. Bai, L. Bing, C. Chen, G. Chen, Y. Chen, Z. Chen, Z. Chen, X. Dong, et al. MiroThinker: pushing the performance boundaries of open-source research agents via model, context, and interactive scaling. arXiv preprint arXiv:2511.11793. Cited by: §1, §2.
-   Team et al. (2025b) T. D. Team, B. Li, B. Zhang, D. Zhang, F. Huang, G. Li, G. Chen, H. Yin, J. Wu, J. Zhou, et al. Tongyi deepresearch technical report. arXiv preprint arXiv:2510.24701. Cited by: §1, §2.
-   Thakur et al. (2021) N. Thakur, N. Reimers, A. Rücklé, A. Srivastava, and I. Gurevych BEIR: a heterogeneous benchmark for zero-shot evaluation of information retrieval models. In NeurIPS’21, Datasets and Benchmarks, Cited by: 2nd item, §A.3, §1, 3rd item.
-   Trivedi et al. (2022) H. Trivedi, N. Balasubramanian, T. Khot, and A. Sabharwal MuSiQue: multihop questions via single-hop question composition. TACL 10, pp. 539–554. Cited by: 6th item, §1, §1, 2nd item.
-   Voorhees and Tice (2000) E. M. Voorhees and D. M. Tice Building a question answering test collection. In SIGIR’00, pp. 200–207. Cited by: §A.3.
-   Wachsmuth et al. (2018) H. Wachsmuth, S. Syed, and B. Stein Retrieval of the best counterargument without prior topic knowledge. In ACL’18, pp. 241–251. Cited by: 2nd item.
-   Wadden et al. (2020) D. Wadden, S. Lin, K. Lo, L. L. Wang, M. van Zuylen, A. Cohan, and H. Hajishirzi Fact or fiction: verifying scientific claims. In EMNLP’20, pp. 7534–7550. Cited by: 2nd item.
-   Wang et al. (2022) L. Wang, N. Yang, X. Huang, B. Jiao, L. Yang, D. Jiang, R. Majumder, and F. Wei Text embeddings by weakly-supervised contrastive pre-training. arXiv preprint arXiv:2212.03533. Cited by: 4th item, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 2nd item.
-   Wang et al. (2025) X. Wang, B. Li, Y. Song, F. F. Xu, X. Tang, M. Zhuge, J. Pan, Y. Song, B. Li, J. Singh, H. H. Tran, F. Li, R. Ma, M. Zheng, B. Qian, Y. Shao, N. Muennighoff, Z. Yang, and G. Neubig OpenHands: an open platform for AI software developers as generalist agents. In ICLR’25, Cited by: §2.
-   Wei et al. (2025) J. Wei, Z. Sun, S. Papay, S. McKinney, J. Han, I. Fulford, H. W. Chung, A. T. Passos, W. Fedus, and A. Glaese Browsecomp: a simple yet challenging benchmark for browsing agents. arXiv preprint arXiv:2504.12516. Cited by: 1st item, §1, §2.
-   Weller et al. (2025) O. Weller, K. Ricci, E. Yang, A. Yates, D. Lawrie, and B. Van Durme Rank1: test-time compute for reranking in information retrieval. In COLM’25, Cited by: 7th item, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 2nd item.
-   Xia et al. (2025) C. S. Xia, Y. Deng, S. Dunn, and L. Zhang Demystifying llm-based software engineering agents. Proceedings of the ACM on Software Engineering 2 (FSE), pp. 801–824. Cited by: §2.
-   Yang et al. (2024) J. Yang, C. E. Jimenez, A. Wettig, K. Lieret, S. Yao, K. Narasimhan, and O. Press Swe-agent: agent-computer interfaces enable automated software engineering. In NeurIPS’24, pp. 50528–50652. Cited by: §2.
-   Yang et al. (2018) Z. Yang, P. Qi, S. Zhang, Y. Bengio, W. Cohen, R. Salakhutdinov, and C. D. Manning HotpotQA: a dataset for diverse, explainable multi-hop question answering. In EMNLP’18, pp. 2369–2380. Cited by: 4th item, §1, 2nd item.
-   Yu et al. (2025) Q. Yu, Z. Zhang, R. Zhu, Y. Yuan, X. Zuo, Y. Yue, W. Dai, T. Fan, G. Liu, L. Liu, et al. Dapo: an open-source llm reinforcement learning system at scale. arXiv preprint arXiv:2503.14476. Cited by: 4th item.
-   Z.AI (2025) Z.AI GLM-4.7: advancing the coding capability. Note: https://z.ai/blog/glm-4.7 Cited by: 3rd item, 1st item.
-   Zechner and Pi Contributors (2026) M. Zechner and Pi Contributors Pi: a minimal terminal coding harness. Note: https://shittycodingagent.ai Cited by: §3.1.
-   Zhai (2025) C. Zhai Information retrieval for artificial general intelligence: a new perspective of information retrieval research. In SIGIR’25, pp. 3876–3886. Cited by: §1.
-   Zhang et al. (2024) W. Zhang, J. Liao, N. Li, K. Du, and J. Lin Agentic information retrieval. arXiv preprint arXiv:2410.09713. Cited by: §1.
-   Zhang et al. (2025) Y. Zhang, M. Li, D. Long, X. Zhang, H. Lin, B. Yang, P. Xie, A. Yang, D. Liu, J. Lin, et al. Qwen3 embedding: advancing text embedding and reranking through foundation models. arXiv preprint arXiv:2506.05176. Cited by: 5th item, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 1st item.
-   Zhuang et al. (2025) S. Zhuang, X. Ma, B. Koopman, J. Lin, and G. Zuccon Rank-r1: enhancing reasoning in llm-based document rerankers via reinforcement learning. arXiv preprint arXiv:2503.06034. Cited by: 6th item, §2. ‣ 2 Related Work ‣ Beyond Semantic Similarity:Rethinking Retrieval for Agentic Search via Direct Corpus Interaction"), 2nd item.

## Table of Contents

## Appendix

## Appendix A Experimental Details

### A.1 Benchmarks

BRIGHT (Biology, Earth Science, Economics, and Robotics), as well as Bamboogle, we evaluate on the full test sets. For all other datasets, we evaluate a random sample of 50 examples per dataset for efficiency.

Agentic Search

-   •

    BrowseComp-Plus (9) is a closed-corpus benchmark designed for controlled evaluation of deep research agents. It employs a fixed, carefully curated corpus with human-verified supporting documents and mined hard negatives, enabling fair and transparent experimentation. The benchmark consists of complex, deep research questions, derived from a subset of BrowseComp (64) queries, which require retrieving and synthesizing evidence from multiple documents within the corpus, making it well-suited for assessing deep retrieval and multi-hop reasoning capabilities. For embedding-based retrieval baselines, we use the officially released corpus together with a BM25/Qwen3-Embedding-8B FAISS index to construct an offline search engine, removing dependence on live web access. For DCI, the agent accesses the same corpus via terminal tools without any index.

Knowledge-Intensive QA

-   •

    NQ (25) is a large-scale open-domain QA benchmark derived from real Google search queries, paired with Wikipedia passages as evidence. It primarily tests single-hop factual retrieval.

-   •

    TriviaQA (22) contains trivia questions authored by enthusiasts, with evidence gathered from Wikipedia and the web, evaluating single-hop retrieval under diverse, naturally occurring questions.

-   •

    Bamboogle (43) is a manually constructed multi-hop dataset designed to resist shortcut answers by requiring exactly two inferential steps. Each question is unanswerable without combining evidence from at least two documents.

-   •

    HotpotQA (68) is a widely used multi-hop benchmark built from Wikipedia, featuring bridge and comparison questions that require reasoning across two supporting documents.

-   •

    2WikiMultiHopQA (16) is a multi-hop QA dataset that combines structured Wikidata knowledge with unstructured Wikipedia text and provides annotated reasoning chains to support interpretable sequential inference across interconnected facts.

-   •

    MuSiQue (58) is a challenging multi-hop reasoning benchmark constructed by composing single-hop questions into multi-step chains, where each reasoning step depends on information derived from the preceding one. It is designed to minimize reasoning shortcuts and requires genuine sequential inference.

We exclude ambiguous questions and time-sensitive cases whose correct answers may have changed since the corpus was collected.

IR Ranking

-   •

    BRIGHT (50) is a reasoning-intensive retrieval benchmark where queries require nontrivial domain inference beyond surface keyword overlap. We evaluate four BRIGHT datasets spanning distinct scientific domains: Biology (103 queries), Earth Science (116 queries), Economics (103 queries), and Robotics (101 queries).

-   •

    BEIR (57) is a heterogeneous IR benchmark covering diverse domains and tasks. We evaluate two BEIR datasets: ArguAna (60), a counter-argument retrieval task (1,406 queries; we sample 50), and SciFact (61), a scientific fact-checking task that retrieves abstracts supporting or refuting a claim (300 queries; we sample 50).

Table 7summarizes the retrieval corpora used across all benchmarks.

Table 7: Retrieval corpus statistics. _Avg. len._ is the mean document length measured in whitespace-split words.

### A.2 Compared Baselines

Proprietary Models

The following proprietary models serve as agent backbones in the BrowseComp-Plus baseline evaluations.

-   •

    OpenAI Series (OpenAI): o3 (39), GPT-5.2 (37), and GPT-5.4 nano (40). In our experiments, o3 delivers the strongest retrieval\-augmented performance on BrowseComp-Plus among all baseline agents. GPT-5.2 serves as a standard retrieval agent backbone. GPT-5.4 nano is a lightweight model used as the backbone for DCI-Agent-Lite across all comprehensive evaluations and controlled ablations.

-   •

    Claude 4 Series (Anthropic): Claude Sonnet 4.6 (4), Claude Sonnet 4.5 (2), and Claude Haiku 4.5. Each model is evaluated as a retrieval agent backbone on BrowseComp-Plus, with Claude Sonnet 4.6 further serving as the primary backbone for DCI-Agent-CC across all evaluations.

-   •

    GLM Series (Z.AI): GLM-4.7 (70), a frontier model evaluated as a retrieval\-agent backbone on BrowseComp\-Plus.

-   •

    Kimi Series (Moonshot AI): Kimi K2, a frontier model evaluated as a retrieval\-agent backbone on BrowseComp\-Plus.

Retrieval Agents

-   •

    R1-Searcher-7B (48): an open\-weight agent that enables LLMs to invoke external search systems via a two\-stage outcome\-supervised RL framework, without process rewards or distillation. It is compatible with both base and instruction-tuned models.

-   •

    Search-R1-32B (21): an open\-weight agent that interleaves reasoning and retrieval through RL.

-   •

    ZeroSearch-7B (52): an open\-weight agent trained to use search without live engines during training, using SFT to simulate retrieval and a curriculum that degrades document quality to strengthen reasoning.

-   •

    Verl-Tool-Search-7B-DAPO (19): an open\-weight agent built on a unified framework for tool\-use RL, supporting multi\-turn stateful interactions via asynchronous rollouts and standardized tool APIs; trained with DAPO (69).

-   •

    ASearcher-Local-14B (11): an open\-weight deep research agent trained with fully asynchronous RL that decouples trajectory collection from model training, enabling up to 128 interaction turns.

Sparse & Dense Retrieval

-   •

    BM25 (45): a classical sparse method based on lexical matching and term frequency weighting. It is used as the standard sparse-retrieval baseline in IR ranking and as one of the two retrievers for retrieval agents on BrowseComp\-Plus.

-   •

    OpenAI text-embedding-3-large (35): a proprietary dense embedding model evaluated via nearest\-neighbor search over a prebuilt index. It serves as a strong dense-retrieval baseline on BRIGHT and BEIR.

-   •

    GTE-Qwen2-7B-Instruct (28): an open\-weight dense embedding model from the GTE family built on Qwen2, evaluated via nearest\-neighbor search on IR ranking benchmarks.

-   •

    E5 (62): an open-weight dense embedding model. It serves as the primary retriever for retrieval agent baselines on knowledge-intensive QA tasks.

-   •

    Qwen3-Embedding-8B (74): an open-weight embedding model from the Qwen3 family. It serves as the primary dense retriever for retrieval agent baselines on BrowseComp-Plus.

-   •

    Rank-R1-14B (75): an open\-weight reranker that performs explicit reasoning over the query and candidate documents, trained via RL with a small set of relevance labels and no reasoning supervision.

-   •

    Rank1-32B (65): an open\-weight reranker that applies test\-time compute by distilling reasoning traces from large reasoning models (e.g., DeepSeek\-R1) into a smaller model trained on MS MARCO, producing explainable chains before relevance judgments.

-   •

    ReasonRank-32B (32): a reasoning\-intensive listwise reranker trained in two stages (SFT for reasoning\-pattern learning followed by RL with a multi\-view ranking reward) using an automated reasoning\-focused data synthesis pipeline.

### A.3 Metrics

#### Accuracy Metrics

For Browsecomp-Plus and knowledge-intensive QA, we use GPT-4.1 (36) as an LLM-based judge to assess the correctness of the final answers. The judge compares the predicted answer with the reference answer only. Since the reference answers are short and well-defined, the comparison is largely unambiguous and reliably captures both semantic and numerical equivalence. The specific judging prompt is detailed in § C.3. For IR Ranking benchmarks, following prior work (59; 6; 57; 50), we use NDCG@10 as the main metric.

#### Resolution Metrics

The resolution metrics in §3.3 operate on observation-level candidate sets ℛ⁡(ot)\={(dt,1,σt,1),…,(dt,nt,σt,nt)}\\mathcal{R}(o\_{t})=\\{(d\_{t,1},\\sigma\_{t,1}),\\ldots,(d\_{t,n\_{t}},\\sigma\_{t,n\_{t}})\\}. This section specifies how ℛ⁡(ot)\\mathcal{R}(o\_{t}), the snippets σt,i\\sigma\_{t,i}, and hence the snippet lengths ℓt,i\=|σt,i|\\ell\_{t,i}=|\\sigma\_{t,i}| are instantiated for each interface.

For retriever-mediated access, the mapping is direct: each returned result becomes one candidate (dt,i,σt,i)(d\_{t,i},\\sigma\_{t,i}), where dt,id\_{t,i} is the retrieved document and σt,i\\sigma\_{t,i} is the preview text returned by the retriever. Thus, for a top-kk retrieval call, nt\=kn\_{t}=k, and ℓt\\bm{\\ell}\_{t} is simply the list of preview lengths.

For DCI traces, ℛ⁡(ot)\\mathcal{R}(o\_{t}) must be reconstructed from raw tool outputs rather than provided explicitly by the interface. The evaluator first aligns each observation to any surfaced gold document d∗∈𝒟∗​(q)d^{\*}\\in\\mathcal{D}^{\*}(q), either through an explicit file path or through matched local text that can be mapped back to d∗d^{\*}. It then assigns snippets conservatively according to the tool type:

-   •

    grep/rg\-style search. Each aligned matched line induces one candidate (dt,i,σt,i)(d\_{t,i},\\sigma\_{t,i}), with σt,i\\sigma\_{t,i} equal to that matched line. If an observation contains multiple aligned lines from the same gold document, all of them belong to ℛ⁡(ot)\\mathcal{R}(o\_{t}), and the metric in §3.3 will later keep the best seg-score among them through the maximization over ℋ⁡(d∗,τ)\\mathcal{H}(d^{\*},\\tau).

-   •

    read\-style file inspection. If a tool reads a gold-document file and the returned text overlaps sufficiently with the annotated gold evidence, the exposed read span is used as σt,i\\sigma\_{t,i}.

-   •

    Path-only surfacing or unmatched local text. Some observations surface a gold document through a path, listing, or other metadata without exposing a reliable local text span. In that case, the observation still contributes to coverage by marking d∗d^{\*} as surfaced, but we set ℓt,i\=|d∗|\\ell\_{t,i}=|d^{\*}|, equivalently treating σt,i\\sigma\_{t,i} as a full-document snippet for localization purposes. This yields a low seg-score, reflecting document reach without useful evidence localization.

This fallback rule matters mainly for DCI because different tools expose evidence at very different granularities. Retriever-mediated access, by contrast, already standardizes both ℛ⁡(ot)\\mathcal{R}(o\_{t}) and σt,i\\sigma\_{t,i} through the retriever API.

Figure 6: Distribution of Bash command patterns in DCI-Agent-Lite trajectories across 100 cases (3,168 commands total). The ratios aggregate command usage across both correct and incorrect runs and show that the agent relies primarily on compositional search operators such as rg | head and rg | rg, with full-document reads appearing only rarely.

## Appendix B Further Discussion of Experimental Results

### B.1 In-Depth Analysis of DCI-Agent-Lite Search Patterns

To better understand how DCI agents allocate tool usage, Figure 6 breaks Bash interactions into representative command patterns. Bash usage is dominated by search-plus-limit operations (rg | head, 56.2%) and chained search (rg | rg, 20.6%), with smaller shares devoted to aggregation or counting (wc, 7.8%), single-keyword search (rg keyword, 6.3%), and directory listing (ls, 4.3%). Python scripting (python -c, 2.4%) and file localization (find / ls | rg, 2.1%) appear only occasionally, while full-document reads are almost never used (cat, 0.1%); the remaining 0.2% falls into miscellaneous commands. Overall, this distribution suggests that the agent treats Bash as a high-resolution search interface: it composes lexical filters, inspects only bounded local snippets, and narrows the candidate space through iterative exact-match verification rather than broad document reading.

Based on these command traces, we further group tool-calling behavior into six representative operation patterns, roughly following their chronological order: (1) _corpus exploration_, which scans the directory structure to identify potentially relevant regions of the corpus (e.g., via ls); (2) _broad keyword search_, which performs corpus-level pattern matching to surface candidate files or snippets (e.g., rg -n); (3) _iterative narrowing_, which progressively refines search queries to prune the search space (e.g., chaining increasingly specific rg patterns such as rg -n "keyword1" | rg "keyword2"); (4) _targeted document reading_, which inspects specific files once they have been identified as promising (e.g., read or cat); (5) _in-document deep search_, which probes within a single document using multiple keywords or localized searches (e.g., rg -n "term" file.txt); and (6) _cross-document comparison_, which alternates across multiple documents for verification, disambiguation, or analysis (e.g., rg -n "keyword" file1.txt file2.txt).

## Appendix C Instruction Templates

### C.1 QA Instruction

### C.2 IR Instruction

### C.3 LLM as Judge

## Appendix D Case Study

In this section, we present a case study showing how DCI-Agent-Lite and DCI-Agent-CC conduct deep research with greater elegance, efficiency, and robustness.

### D.1 Case 1: Demonstration Example

This case demonstrates the basic agentic reasoning paradigm of our system on a knowledge-intensive QA task. The model receives a simple factual query from the Natural Questions benchmark, decomposes it into searchable terms, and iteratively refines its retrieval strategy when the initial approach encounters scaling limitations. In contrast to retrieval agents, our agent operates directly on a closed corpus using Grep and Bash, enabling precise lexical matching over structured document collections.

### D.2 Case 2a: DCI-Agent-CC on Agentic Search

This case illustrates how the model tackles a highly challenging, multi-document reasoning problem on BrowseComp-Plus—a benchmark for agentic search requiring deep research and constraint verification. The query contains twelve interlocking clues about a football match, and the model must identify the match, verify each constraint against corpus documents, and extract the target entity. The full trace spans 80 turns; we highlight the key moments of hypothesis formation, constraint verification, and cross-document inference.

### D.3 Case 2b: DCI-Agent-Lite on Agentic Search

This trace shows DCI-Agent-Lite—a lightweight variant equipped with only Bash and Read tools—successfully solving a multi-constraint BrowseComp-Plus query. The agent must identify a book from clues spanning publication date, plot details (tank, scoreboard, eye-color nickname), and author biography. Despite the narrower tool set, the agent progressively narrows the search space via targeted rg commands and verifies the answer by reading the candidate document.

### D.4 Case 3a: DCI-Agent-CC on Knowledge-Intensive QA

This case demonstrates the model’s ability to perform single-hop factual retrieval on the Natural Questions benchmark—a standard knowledge-intensive QA dataset. The query asks about a specific film role, and the model quickly locates the relevant Wikipedia article and cross-references it with the actor’s biography to produce a confident, cited answer.

### D.5 Case 3b: DCI-Agent-Lite on Knowledge-Intensive QA

This case demonstrates the lite model’s ability to answer a factoid question from a large local Wikipedia corpus. The query asks for a count rather than a named entity, so the model first searches for the relevant city and sports context, then extracts the exact sentence that enumerates the NFL teams associated with St. Louis.

### D.6 Case 4a: DCI-Agent-CC on Information Retrieval

This case showcases reasoning-intensive retrieval on the BRIGHT-Biology benchmark—an information retrieval task requiring domain-specific reasoning. The query is a complex scientific question about insect phototaxis that requires understanding the distinction between proximate and ultimate causation, as well as evaluating competing hypotheses (heat-seeking vs. light-driven orientation). The gold evidence is split across two source articles: the proximate/ultimate causation article and the phototaxis article.

### D.7 Case 4b: DCI-Agent-Lite on Information Retrieval

This case shows the lite model performing evidence-focused retrieval on BEIR-SciFact. The query is a biomedical claim, and the model must identify the exact paper that directly tests radioiodine treatment in non-toxic multinodular goitre while filtering out related but less relevant thyroid and dosimetry papers.

### D.8 Case 5a: Failure Case of DCI-Agent-CC in Agentic Search

This case demonstrates a failure mode of DCI-Agent-CC on a BrowseComp-Plus query requiring multi-hop reasoning over football match incidents and player loan histories. The agent must identify a player involved in a 2019 English football water-bottle scuffle, trace his loan from a European club, and determine which team he faced while on the bench for his parent club in a European competition. Although the agent correctly identifies Denis Suarez and FC Barcelona through corpus documents, it misattributes the UEFA Champions League bench appearance to the wrong opponent.

### D.9 Case 5b: Failure Case of DCI-Agent-Lite in Agentic Search

This trace illustrates a failure mode of DCI-Agent-Lite on a BrowseComp-Plus movie-identification task. The agent is given multiple interlocking clues (2000s release, rags-to-riches plot, actors born in the 1960s, and a Nov 2023 director–actor-brother dispute) but struggles to formulate precise search queries. It repeatedly issues overly broad rg patterns that return irrelevant documents, fails to converge on the correct corpus files, and ultimately hallucinates an incorrect answer (The Family Man) that partially matches some surface-level keywords.
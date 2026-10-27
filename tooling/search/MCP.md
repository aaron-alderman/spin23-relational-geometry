# Corpus search MCP candidate

**Status:** live local read-only successor with contribution beacon; not sealed or admitted into the protected Sourcery or Claimipedia runtime
**Implementation:** [corpus search MCP server](corpus_search_mcp.mjs)  
**Regression:** [MCP search tests](../../tests/repository/corpus_search_mcp.test.mjs)

The governed [retrieval suite](benchmark_cases.json) contains 30 cases across direct lookup, synthesis, experimentation, obstruction, audit, planning, claim, spelling, selector and concept-collision lanes. Its deterministic [local baseline](benchmark_baseline_v1.json) records full passage with mean reciprocal rank above the declared 0.8 gate.

## Purpose

This candidate gives an LLM a bounded way to find, assemble and inspect the corpus without loading the entire repository or treating graph centrality as scientific authority. It reflects the same hybrid retrieval used by the command-line search:

\[
\text{query}
\longrightarrow
\text{document and exact-claim seeds}
\longrightarrow
\text{confidence-gated associations and authored cross-reference bridges}
\longrightarrow
\text{personalized PageRank context}
\longrightarrow
\text{ranked sources with drill-down receipts, status and selector sensitivity}.
\]

The graph is built from authored local Markdown links. Exact Markdown paragraphs form bounded claim units with role, line range and a content-derived identity. Link-bearing paragraphs can route a query through a synthesis or register to its underlying source while retaining the bridge source, line range and hash. Corpus-local co-occurrence expansion is admitted only when at least two sufficiently specific query terms independently support the same candidate term; otherwise it returns no expansion rather than inventing semantic confidence. Reverse-navigation edges help recover context, but are downweighted. A selector sweep reports how rankings move under three PageRank mixing values. None of these quantities changes the source's declared epistemic status.

## Reflected operations

### `corpus_contribution_beacon`

Returns the live work invitations, contribution packet contract, local Observatory endpoints and authority boundary without starting a belief episode. It exists so an agent can help improve retrieval or evidence handling even when it does not use adaptive context for its own task. Contributions remain optional proposals and require a separate state-owning host plus approval before they can influence attention.

### `corpus_context`

Builds the smallest useful working set for a concrete LLM task. It retrieves a larger candidate pool, selects a relevance-and-diversity-balanced source bundle, extracts query-centred passages and renders the result inside a declared character budget. Every source remains separately bounded with its path, kind, declared status, inclusion reason, retrieval scores and selector-sensitivity warning. The packet names deliberately omitted candidates rather than pretending to be exhaustive. Source, excerpt, source-set and compiled-context hashes form a deterministic receipt, allowing answers to be compared under controlled context changes.

### `corpus_search`

Accepts a natural-language query, a result bound of at most 25, a declared task profile and bounded document/claim/semantic/graph weights. It returns:

- corrected query terms;
- document, claim, semantic-bridge, graph and combined navigation scores;
- the best exact claim passage with role, line range and hash;
- an exact authored cross-reference passage when it contributed to semantic routing;
- declared status and source snippet;
- selector-sweep ranks and rank spread;
- a repository path and `corpus:///` URI;
- a machine-readable authority receipt.

### `corpus_context_sweep`

Compiles a baseline packet and bounded one-factor variants across task profiles and graph weights. It reports the source intersection, sources present in at least three quarters of variants, the selector-sensitive perimeter, every pairwise source-set Jaccard score and the minimum and mean overlap. Each variant carries the exact context and source-set receipts. Context bodies are omitted by default to keep the diagnostic compact and can be included when a host is ready to run the downstream model evaluation.

This operation measures context stability, not answer stability. Its downstream contract requires the host to hold the model, model settings and answer prompt fixed, run once per retained context, then compare atomic claims, verdicts and cited source paths. It classifies the intended outcomes as stable, context-conditional, conflicting or unsupported.

### `corpus_answer_receipt`

Binds one answer to the exact context and source-set hashes, model name/version/settings, prompt hash, answer hash and a caller-supplied list of atomic claims. Each atomic claim has a stable lowercase key, statement hash, controlled verdict and cited source set. Citations outside the supplied context are retained and marked rather than silently accepted.

### `corpus_answer_stability`

Compares two to eight answer receipts. Exact stable keys are classified as `stable-exact`, `stable-verdict-wording-varies`, `context-conditional`, `conflict` or `unsupported`. A run is comparable only when prompt and model settings are identical and context hashes differ. Stable keys and statement hashes are comparison aids, not a proof of semantic equivalence.

### `corpus_belief_initialize`

Creates a deterministic caller-owned state for one externally supplied objective and the current corpus-content identity. It initializes bounded source-utility priors and carries an explicit authority receipt denying truth, promotion and model-training authority.

### `corpus_belief_update`

Consumes a hash-verified prior state and causally typed observation views, then returns a candidate successor and innovation receipt. Every view names its receipt, causal evidence family, exact source version, producer, independence class and selection arm. Correlated views from one family collapse to one effective update per source, and that family cannot influence the source again. Conflicts reopen uncertainty; receipt replay, source-version mismatch, corpus-identity mismatch and state tampering fail closed. The server retains and admits nothing.

### `corpus_adaptive_context`

Builds both baseline and adaptive context selections for the exact objective and profile bound into the state. Learned source utility contributes at most 0.2 and exploration at most 0.05. When exploration is active, one slot is reserved for an eligible unselected source, preferring sources with no prior exposure. The response exposes all movements and posterior estimates and preserves the source's declared status. See the [attention-utility contract](BELIEF_LOOP.md).

### `corpus_read`

Reads at most 30,000 characters from one Markdown path under `corpus/`, `book/edition-3/chapters/` or `verification/`. Absolute paths, traversal, non-Markdown files, unknown arguments and out-of-range bounds fail closed.

All nine operations declare `readOnlyHint`, `idempotentHint`, `destructiveHint: false` and `openWorldHint: false`. The index checks indexed source metadata after a short cache-validation interval and rebuilds automatically when the corpus changes.

## Retrieval intelligence evaluation

`retrieval_intelligence_benchmark.mjs` compares the predecessor fusion (`0.70` document / `0.30` graph) with the calibrated successor (`0.40` document / `0.20` claim / `0.20` semantic / `0.20` graph) on twelve paraphrased objectives, with six cases reserved as holdout. The successor gives exact passages and authored bridges equal standing with graph context, while retaining document evidence as the largest channel. It records recall at 6 and 12, mean reciprocal rank, per-case movement, exact claim receipts, exact bridge receipts and the corpus-content hash. Qualification requires no calibration or held-out recall/MRR regression, at least one held-out improvement, at least 25% held-out MRR improvement and valid drill-down hashes. A corpus identity change aborts the run.

Every result also reports `retrievalSupport`: matched query tokens, their document-level coverage and whether the hit is a direct passage, an authored cross-reference bridge, graph-assisted or only a weak local match. This classification explains navigation fit; it is explicitly not confidence in truth or scientific validity.

This benchmark measures recovery of preregistered navigation targets. It does not show that the expected source is uniquely relevant, complete or true. The retained `sourcery_admission_candidate_v1.json` hashes this local successor and its qualification benchmark, but remains an unsealed, unadmitted candidate; a fresh protected-lifecycle package is still required before runtime admission.

## Authority boundary

Every search and read result declares:

```json
{
  "readOnly": true,
  "entails": false,
  "empiricalAuthority": false,
  "corpusPromotion": false
}
```

Search can propose where an LLM should look next. It cannot establish theoremhood, empirical validity, novelty, corpus promotion or application admission. The model must inspect source context and retain its local status label when composing an answer.

## Local launch

```json
{
  "command": "node",
  "args": ["C:/Users/aaron/grand-theory/tooling/search/corpus_search_mcp.mjs"]
}
```

The server uses newline-delimited MCP JSON-RPC over stdio and has no package dependency. Its current protocol version is `2025-03-26`.

## Protected-runtime admission path

Local execution is live. Protected admission remains intentionally open and must proceed through the existing Sourcery lifecycle:

1. import the ten reflected tool contracts into a fresh development lane;
2. bind corpus identity to an immutable or explicitly refreshed source snapshot;
3. run the regression suite in a declared projection;
4. inspect the candidate and its authority receipts;
5. bless, seal, qualify and admit the successor through a fresh MCP connection;
6. verify operation discovery, search/read parity, belief-state replay, traversal rejection and absence of mutation authority.

Until that sequence closes, this file records a working local interface and an admission candidate—not a selected production capability. The [contribution beacon](CONTRIBUTION_BEACON.md) and local Observatory are nevertheless active local entry points.

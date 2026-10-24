# Corpus search MCP candidate

**Status:** locally implemented and tested read-only MCP candidate; not admitted into the protected Sourcery or Claimipedia runtime  
**Implementation:** [corpus search MCP server](corpus_search_mcp.mjs)  
**Regression:** [MCP search tests](../../tests/repository/corpus_search_mcp.test.mjs)

The governed [retrieval suite](benchmark_cases.json) contains 30 cases across direct lookup, synthesis, experimentation, obstruction, audit, planning, claim, spelling, selector and concept-collision lanes. Its deterministic [local baseline](benchmark_baseline_v1.json) records full passage with mean reciprocal rank above the declared 0.8 gate.

## Purpose

This candidate gives an LLM a bounded way to find, assemble and inspect the corpus without loading the entire repository or treating graph centrality as scientific authority. It reflects the same hybrid retrieval used by the command-line search:

\[
\text{query}
\longrightarrow
\text{weighted lexical seeds}
\longrightarrow
\text{personalized PageRank context}
\longrightarrow
\text{ranked sources with status and selector sensitivity}.
\]

The graph is built from authored local Markdown links. Reverse-navigation edges help recover context, but are downweighted. A selector sweep reports how rankings move under three PageRank mixing values. None of these quantities changes the source's declared epistemic status.

## Reflected operations

### `corpus_context`

Builds the smallest useful working set for a concrete LLM task. It retrieves a larger candidate pool, selects a relevance-and-diversity-balanced source bundle, extracts query-centred passages and renders the result inside a declared character budget. Every source remains separately bounded with its path, kind, declared status, inclusion reason, retrieval scores and selector-sensitivity warning. The packet names deliberately omitted candidates rather than pretending to be exhaustive. Source, excerpt, source-set and compiled-context hashes form a deterministic receipt, allowing answers to be compared under controlled context changes.

### `corpus_search`

Accepts a natural-language query, a result bound of at most 25, a declared task profile and a graph weight capped at 0.6. It returns:

- corrected query terms;
- lexical, graph and combined navigation scores;
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

Local execution is complete. Protected admission remains intentionally open and must proceed through the existing Sourcery lifecycle:

1. import the nine reflected tool contracts into a fresh development lane;
2. bind corpus identity to an immutable or explicitly refreshed source snapshot;
3. run the regression suite in a declared projection;
4. inspect the candidate and its authority receipts;
5. bless, seal, qualify and admit the successor through a fresh MCP connection;
6. verify operation discovery, search/read parity, belief-state replay, traversal rejection and absence of mutation authority.

Until that sequence closes, this file records a working local interface and an admission candidate—not a selected production capability.

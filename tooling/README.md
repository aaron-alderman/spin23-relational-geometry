# Repository tooling

- `audit/` checks Markdown links and regenerates the canonical manifest;
- `publication/` builds reader-facing editions and deployable HTML;
- `migration/` records the one-time reproducible transition from the original flat corpus layout;
- `indexing/` regenerates claim-range and certificate-operation indexes, plus the executable [corpus front door](../corpus/FRONT_DOOR.md), its capability-specific minimum closures and the drill-down-preserving [corpus evidence spine](../corpus/EVIDENCE_SPINE.md). Use `node tooling/indexing/refresh_corpus_entry_surfaces.mjs --write` after corpus changes: it refreshes the canonical manifest once, then iterates the mutually observing evidence/front-door surfaces until both check cleanly. Omit `--write` for a read-only freshness check.
- `search/` provides hybrid corpus retrieval: weighted lexical matching seeds personalized PageRank over actual Markdown links, while selector sweeps expose results that depend strongly on the navigation prior.

Search from the repository root:

```powershell
node tooling/search/search_corpus.mjs --query "Casimir boundary response"
node tooling/search/search_corpus.mjs --query "selector metastability" --profile experiment --json
```

Search scores are navigation aids. They never promote a claim's epistemic status.

The governed [30-case benchmark](search/benchmark_cases.json) spans ten retrieval lanes and retains its deterministic [passing baseline](search/benchmark_baseline_v1.json). Run it with:

```powershell
node tooling/search/run_benchmark.mjs
```

For an LLM host, [`search/corpus_search_mcp.mjs`](search/corpus_search_mcp.mjs) exposes nine bounded, read-only tools over MCP stdio. `corpus_search` returns structured scores, evidence-spine joins, selector sensitivity, snippets, source URIs and status labels; `corpus_context` assembles a relevance-and-diversity-balanced working packet inside a declared context budget; `corpus_context_sweep` identifies the invariant core and selector-sensitive perimeter across controlled packet variants; `corpus_answer_receipt` and `corpus_answer_stability` make downstream answer drift reproducible; `corpus_belief_initialize`, `corpus_belief_update` and `corpus_adaptive_context` provide a caller-owned [receipt-driven attention-utility loop](search/BELIEF_LOOP.md) with causal evidence-family collapse, exact episode scope and reserved exploration; and `corpus_read` opens Markdown beneath the indexed roots. The cached graph invalidates automatically when an indexed source changes. A host can launch it with:

```json
{
  "command": "node",
  "args": ["C:/Users/aaron/grand-theory/tooling/search/corpus_search_mcp.mjs"]
}
```

This is a local MCP candidate. Admission into a protected Sourcery or Claimipedia runtime remains a separate governed lifecycle.

The exact [Sourcery admission candidate](search/sourcery_admission_candidate_v1.json) hashes every member and reflected tool contract. [Federation](search/FEDERATION.md) and the visible [Context Hub](search/CONTEXT_HUB_UI.md) remain behind their declared identity, benchmark and admission gates.

The local [Context Hub Observatory](search/OBSERVATORY.md) makes the belief loop persistent, monitorable and tunable. It records hash-chained episodes under ignored `.context-hub/`, runs baseline and adaptive selection together, binds answers to context receipts, holds updates behind a separate approval event and supports non-mutating counterfactual replay. It is an explicit local host and is not included in the read-only MCP admission candidate.

Research certificates do not live here; see [`verification/`](../verification/README.md).

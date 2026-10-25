# Claim implication and defeat graph v1

**Date:** 25 October 2026  
**Status:** generated claim-level closure surface  
**Machine authority:** [JSON graph](claim_implication_defeat_graph_v1.json)

## What this graph does

This graph asks, for every canonical numbered claim, five separate questions: why is the claim stated in this exact form; what does it assume; what follows from it; what does not follow; and what observation, failed certificate or withdrawn dependency would force review. It then permits status propagation only across an explicit `Depends on` edge. Ordinary links, shared topics, shared mathematics and PageRank proximity remain reference paths, not entailment.

The graph covers **1,573 claims** and contains **795 explicit dependency edges**. **1,056** claims carry direct defeat or boundary text; **1,117** carry direct non-implication text; and **676** carry direct consequence text. Where claim-local prose is absent, the record says so and points only to typed bridge context or a structural review trigger. It does not manufacture a premise or implication.

## Propagation discipline

- Defeating a claim defeats that claim only at its declared scope. Its direct explicit dependents become `review_required`; they are not automatically false.
- Revising a claim preserves the old identity, names the replacement and places direct dependents under review.
- A surviving claim is not promoted into uniqueness, physical realization, ontology or support for neighbouring claims.
- Reference-only links and shared bridge membership carry no status.

## Coverage

| Field | Coverage states |
|---|---|
| exactForm | observed: 1031; observed-preamble: 49; observed-section: 493 |
| assumptions | explicit-absence: 9; inherited-context-only: 1240; observed-dependency: 321; observed-premise: 3 |
| consequences | bounded-graph-only: 622; explicit-consumer-propagation: 275; observed: 676 |
| nonImplications | bridge-bounded: 433; explicit-absence: 23; observed: 1117 |
| defeat | observed: 1056; structural-review-trigger: 517 |

Unresolved structural records: **0**.

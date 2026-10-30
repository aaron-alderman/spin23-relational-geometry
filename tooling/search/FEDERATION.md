# Context Hub federation contract

**Status:** all six repository-snapshot adapters and the packet composer implemented and locally tested; live remote refresh and protected admission remain open
**Depends on:** [local MCP contract](MCP.md), [Sourcery admission candidate](sourcery_admission_candidate_v1.json)

## Purpose

Federation should widen retrieval without flattening authority. The canonical corpus, Claimipedia, Sourcery derivations, publication surfaces and external literature are different evidence lanes. A result may cross them only while retaining source identity, lane authority, revision and the relation that justified the crossing.

## Federated result identity

Every result must carry:

- `lane`: `canonical-corpus`, `claimipedia`, `sourcery-derivation`, `publication` or `external-literature`;
- immutable source or revision identity;
- local object identity and content hash;
- declared or inferred epistemic status, with the inference marked;
- relation used to enter another lane;
- whether the relation is authored, structurally inferred or query-generated;
- read and promotion authority, which default to false outside the owning lane.

## Ranking rule

Federated ranking is a two-stage operation:

1. rank within each lane under its native contract;
2. compose a task-specific packet under declared lane quotas and crossing penalties.

No global scalar rank may erase lane identity. PageRank edges across lanes must be typed and separately weighted. Publication popularity, Claimipedia graph centrality and Sourcery derivation reach do not promote a canonical scientific claim.

## Required controls

- same-lane and cross-lane scores remain separately visible;
- external literature cannot enter without bibliographic identity;
- generated derivations remain proposals until independently admitted;
- publication text is a reading surface, not a second source of scientific truth;
- duplicate content is collapsed by source identity, not title similarity alone;
- context sweeps vary lane quotas as well as profile and graph weight;
- answer receipts record every lane represented in the context.

## Admission gates

Federation remains closed until the local benchmark is extended with cross-lane positive and negative fixtures, the protected MCP candidate is admitted, and each connected lane supplies a read-only revision-pinned interface. The first safe federation is canonical corpus plus its own publication surface; Claimipedia and Sourcery follow only after identity-preserving joins are verified.

The local [`federated_context.mjs`](federated_context.mjs) enforces the composition contract. It validates immutable object and revision identities, preserves lane-native ordering, applies explicit quotas and crossing penalties, round-robins lanes without manufacturing a global scalar rank, collapses exact cross-lane duplicates by target-plus-content identity and refuses promotion-capable inputs.

[`local_federation_adapters.mjs`](local_federation_adapters.mjs) closes the first safe adapter pair. It projects the governed local search into distinct canonical-corpus and Edition 3 publication lanes, then re-reads and hashes the exact source bytes. Publication results are marked as reading surfaces, never canonical claims. A publication crossing names an authored link to a canonical source when one exists; otherwise it is explicitly `query-generated`. Non-canonical paths, missing sources and undeclared lanes fail or remain outside the packet.

[`registered_federation_adapters.mjs`](registered_federation_adapters.mjs) closes the remaining repository-snapshot lanes without pretending their objects are alike:

- **Claimipedia** ranks individual manifest claims, preserves claim ID and epistemic state, hashes the exact claim object and resolves evidence basenames uniquely through the canonical manifest;
- **Sourcery derivation** ranks individual typed transformation steps, retaining slice, assumptions, losses, refusal, composer disposition and the authored corpus reference;
- **experiment** ranks exact retained JSON artifacts and reports whether empirical authority was actually declared rather than inferring it from file presence;
- **external literature** ranks support and opposition separately from the dated 22-target search register and refuses any result without a URL plus search date.

The all-lane repository test supplies at least one object from canonical corpus, Claimipedia, Sourcery derivation, publication, experiment and external literature in one packet, while retaining separate lane receipts and refusing both a global scalar rank and cross-lane promotion. This is snapshot federation, not live remote synchronization: later source updates require a new retained file identity, and protected delivery remains governed by its separate admission gate. The canonical and publication lanes currently share the governed corpus search engine before being separated and re-ranked inside each lane; a future native publication index may replace that projection without changing the packet contract.

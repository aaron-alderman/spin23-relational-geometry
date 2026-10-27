# Context Hub federation contract

**Status:** identity-preserving packet composer implemented and locally tested; live lane adapters and protected admission remain open
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

The local [`federated_context.mjs`](federated_context.mjs) now enforces the composition half of this contract. It validates immutable object and revision identities, preserves lane-native ordering, applies explicit quotas and crossing penalties, round-robins lanes without manufacturing a global scalar rank, collapses exact cross-lane duplicates by target-plus-content identity and refuses promotion-capable inputs. This closes the packet algebra, not the adapters: no live Claimipedia, Sourcery or external-literature connection is implied.

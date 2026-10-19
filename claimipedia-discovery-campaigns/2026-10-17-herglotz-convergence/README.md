# Herglotz convergence discovery campaign

This directory contains a reproducible, proposal-only Claimipedia discovery campaign over a bounded slice of the real grand-theory corpus.

## Reproduce

```powershell
node .\compile-campaign.mjs
node .\run-live-campaign.mjs
node .\verify-campaign.mjs
node --test .\campaign.test.mjs
```

`run-live-campaign.mjs` requires access to the local Sourcery Temple bridge and exact selected host recorded in the script. The other commands are local and fail closed if their source-ledger or source hashes drift.

## Artifacts

- `campaign-spec.json` — reviewed corpus bindings, typed objects, transformations, queries and ranking contract
- `generated/compiled-graph.json` — exact input graph for the admitted composer
- `generated/compiler-receipt.json` — source/anchor binding receipt
- `generated/live-results.json` — full live MCP responses
- `generated/discovery-docket.json` — ranked machine-readable docket
- `generated/verification-receipt.json` — independent certificate receipt
- `verify-stratified-schur-sewing.mjs` — cross-domain fixed-null/pole/rank-change contract witness
- `DISCOVERY-DOCKET.md` — human review docket
- `claimipedia-triage-packet.json` — proposal-only Claimipedia Triage handoff
- `REFLECTION-CHECKPOINT.md` — evidence, counterexample, limitations and disposition

No artifact in this directory automatically promotes a claim or mutates the Claimipedia corpus.

The next-stage D-02 proposal has been decomposed with the reusable option-preserving meta² method in `../../claimipedia-research-method/`, including a nine-link lightning strike, explicit layer boundaries, symmetry census, alternatives and stop/re-entry rules.

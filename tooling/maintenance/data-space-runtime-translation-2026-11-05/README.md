# Data-space catalog and runtime contracts — integrated baseline

Selected source: `937a580df650b780a6dabfa15a130ff677b50472`. This chunk adds **23 bounded translations**, **113 normative cases** and **59 focused checks**. Qualification now covers **113 retained contracts / 527 cases**, with **101 explicit historical amendments**. **311 of 424 declarations remain untranslated.** All 39 retained browser declarations remain qualified at their preceding bounded level.

The ledger review corrected the suggested next scope: publication foundations, gates and editors were already qualified in earlier chunks. This cohort covers the **22 unresolved asset-picker catalog contracts and their supporting data-space runtime composition**. Other data-space domains remain separately unresolved.

## Implementation and contract mapping

- **Catalog parsing.** The existing parser functions in the current data-space index now expose the same implementations used by normal configuration parsing. Qualification covers active asset and parent group references, exact entry/page/catalog/result ownership, label precedence, optional defaults, vocabulary refusal, page closure, cache correspondence, action-kind constraints, cursor evidence, connector-reference rules and receipt-history limits. Inventories preserve canonical numeric order with existing localeCompare tie behavior. Current compatibility Number conversion is retained; arbitrary non-finite numeric inputs are outside totality claims.
- **Canonical identities.** Parsed pages, actions, cursors, adapters and results retain the aliases used by current consumers. Action sync-result/default-result association uses canonical inventory order. A result can reference its action and the action can reference that same result; this is explicit local object identity, with possible cycles, and is not a JSON transport representation. Historical standalone inventory/index modules were not restored: current inventories are observed through the aggregate parser and its ephemeral internal Maps.
- **Own subject keys.** Frontend query, page and sync maps store own values for ordinary and prototype-named subjects without changing map prototypes. Projection helpers ignore inherited overrides and retain explicitly empty own query values. No cache is introduced for mutable caller-owned state.
- **Runtime sync outcomes.** Fetch and orchestration actions share one current implementation. It delegates one proposed mutation through the reached callback. Missing or rejecting capabilities record failure instead of leaving pending state or copying an earlier success. Native dispatch/render faults preserve identity and cleanup rendering cannot replace the original fault. A post-commit render fault leaves accepted evidence intact and does not retry the mutation. Orchestration and cursor page selection remain explicit caller state effects.
- **Hydration boundary.** The registered semantic provider requires selected pages/cursors to be typed and catalog-owned, and hydrated entries to belong to their result and reference an active parent picker, DataSpace asset and declared group. Non-ready selected results and replacement tokens without a declared cursor refuse with typed 409 before any proposed delta is returned. An omitted orchestration action is selected in canonical order, matching the parser. Successful hydration emits entry and receipt facts while preserving the input witness history.
- **Runtime composition.** Tests use the actual frontend provider, registered renderer interface and frozen 18-handler semantic provider. A scripted renderer host shows invalid configuration visibly and verifies one-shot disposal. Native browser rasterization, external connector/transport execution, arbitrary concurrent action arbitration and the other data-space edit/validation/transform/publication families are not inferred from these witnesses. Legacy sync without selected result can still emit authored synthetic receipt facts; these are not proof of an external fetch or HTTP transport result.

Qualified subjects:

- module.assetPickerCatalogAssetReference
- module.assetPickerCatalogEntry
- module.assetPickerCatalogPage
- module.assetPickerCatalogGroupRule
- module.assetPickerCatalogSyncResultEntry
- module.assetPickerCatalogSyncResult
- module.assetPickerCatalogCursorState
- module.assetPickerCatalogSyncAdapter
- module.assetPickerCatalogSharedCache
- module.assetPickerCatalogFetchReceipt
- module.assetPickerCatalogFetchAction
- module.assetPickerCatalogCacheOrchestration
- module.assetPickerCatalogPageInventory
- module.assetPickerCatalogGroupRuleInventory
- module.assetPickerCatalogFetchReceiptInventory
- module.assetPickerCatalogCursorStateInventory
- module.assetPickerCatalogFetchActionInventory
- module.assetPickerCatalogCacheOrchestrationInventory
- module.assetPickerCatalogSyncAdapterInventory
- module.assetPickerCatalogSyncResultInventory
- module.assetPickerCatalogFetchActionSyncResults
- module.assetPickerCatalog
- module.dataSpaceRuntime

## Evidence and preservation

[Twelve predecessor counterexamples](counterexamples.json) execute exact `8400b0e` frontend, projection and semantic-provider source bodies with recorded import-location rewrites. They reproduce lost prototype-named state, inherited overrides, pending/stale-success outcomes after refusal, unready or unowned hydration admission and raw-order orchestration selection. Current dependencies are used at the recorded locations; these selected boundary experiments are not a whole historical checkout or universal-equivalence proof.

The [retained review](cohort-retained-review.json) records the complete catalog declaration and all four historical runtime variants. Runtime semantic fields agree while interpreter-component lists differ. Selection is pinned explicitly and all variants remain available in [retained-version-selection.json](retained-version-selection.json). Current owners, defaults, exposed interfaces and qualification limits are explicit amendments; no generic executable algebra or old decomposition is silently declared restored.

All prior **90 contracts / 414 cases** retain their clauses, amendments, selected identities, public binding names and per-subject facts. **27 binding hashes** refresh on the explicitly allowed changed implementation paths; earlier specification facts are unchanged. [Preservation receipt](prior-semantic-preservation.json).

The authored catalog fixture contains inputs only; expected observations and refusals are independently specified in cases/tests. Its exact normative copy is sealed in the existing operation-code hash, so changing a test fixture cannot silently change the normative runner. Synchronous cases observe actual parser/state/provider results; async dispatch, fault and acceptance ordering are separately exercised by the focused suite.

## Final verification

- **1220 source checks**, zero failures or skips; one count is a discovered helper module.
- **1568 checks across 15 assembled suites**, including **786 semantic-translation checks**, Core 72, Claimipedia 35 and Frontier 99. [Integrated verification](integrated-verification.json).
- Fresh four-layer assembly using ordinary byte copies; **889 modules**, **617 roots**, **1835 static edges**, **15 dynamic boundaries**. [Assembly](assembly-proof.json), [runtime gate](assembled-runtime-module-verification.json), [semantic gate](assembled-semantic-contract-verification.json).
- Both isolated bootstraps pass **12 stages**, including the new 59-check suite and all preceding focused cohorts. They reproduce the same semantic identity, serve reader HTTP 200, reject mutation with 405, verify source bytes after execution and stop both readers. Model, response body, programme and writing-authority identities match the preceding browser-composition baseline. [Comparison](bootstrap-comparison.json), [reader preservation](reader-baseline-preservation.json), [shutdown](reader-shutdown-verification.json).
- Original 145 qualification hashes, 54 selected contract hashes, earlier semantic witnesses, all eight consumer sources and pre-existing overlays, source/artifact/bootstrap bytes and the original main user diff match. Five selected repositories pass Git connectivity checks. [Final integrity](final-integrity.json).

The artifact input pass streams eight files at a time and checks every required hash before launching any suite; its changed/missing-byte negative controls remain verified. Platform suites use bounded concurrency and consumer suites remain serialized to bound temporary snapshots. There is no new browser frame-time or whole-pipeline performance claim.

## Remaining work and authority

The remaining **311 declarations** include **147 data-space declarations**, **51 core admissibility declarations** and 113 in other owners/domains. [Complete grouping](remaining-contract-groups.json). The next integrated data-space chunk is the resolution and validation pipeline, including its required-value, uniqueness, allowed-value and composition contracts, against verified current owners.

The canonical Canvas schema `sdk/plugins/canvas/canvas-stdlib.rel` remains missing from the selected checkout and searched local history; the derived vocabulary catalogue is not replacement authority. Exact earlier Epistemic commit `274a2a541789ee2e8b6576ec3aeb5d9651165338` and Science commit `647e065a69867ee767c5d9b7dac04bdce1946d19` remain recovery obligations. Recovery is not declared impossible.

Active semantic ownership is complete for the observed current source. Global architectural completion and strict drift acceptance remain false; generic decomposition, dynamic execution authority, thin/default-free obligations and history recovery remain separate. There is no scientific acceptance, production activation or cleanup certification.

Only the preceding task's two generated bootstrap clones and its superseded initial generated validation root were retired, after committed receipt, source/bundle hash and native junction-safety checks. Their receipts and complete source bundles remain, as does the latest browser-composition assembled artifact. Retained source copies, research output and runtime-cache generations were not pruned. [Bootstrap reclamation](prior-bootstrap-reclamation.json), [superseded initial reclamation](superseded-initial-reclamation.json). The final source has a complete all-ref bundle and preserved source snapshot; no branches were merged or pushed.

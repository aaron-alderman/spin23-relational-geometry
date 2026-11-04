# Routing ownership qualification — 2026-11-04

Selected source: `dd39e52b7552f9fd1f18730afb460b2f8c6071d5`, branch `codex/reconcile-platform-sources`, in `.platform-reconstitution/sourcery-platform-reconciled`. Exact predecessor: `f9cc5e4726ef803465673cc72fca713912291828`.

This tranche resolves **three retained generic-owner expectations through explicit Sourcery-owned contract amendments**. It does not implement the missing generic APIs. All original retained tests remain unchanged, and all **11 expected assertions across the three amended files** retain their expected values/refusal patterns and case names.

## Ownership decisions and amendments

Expression Algebra's retained README limits it to domain-neutral values, codecs, authoring and evaluation; Sourcery owns platform policy. The selected route runtime already defines authored route grammar, decoding/refusal choices, `RouteCachePolicy` vocabulary, and HTTP cache-header projection. These specific contracts remain in Sourcery rather than being copied into the shared operator registry. This does not rule out separately qualified domain-neutral primitives in future.

| Retained test | Selected contract | Explicit amendment |
| --- | --- | --- |
| `route-path-match-algebra.test.mjs` | `matchRoutePath` in `sdk/core/route-runtime.mjs` | Replace the unavailable generic object-argument operation with the existing positional Sourcery API. Expected match/parameter/refusal values are unchanged. |
| `route-cache-lowering-algebra.test.mjs` | `lowerRouteCachePolicy` in the same owner | Keep the policy object and expected headers/errors; change ownership/import and function name. |
| `route-cache-policy-algebra.test.mjs` | `routeCachePolicySpec` in the same owner | Replace generic-record projection with authored facts plus a subject. Expected explicit fields and empty-subject refusal remain unchanged. This is an input-domain amendment, not generic API equivalence. |

Route matching and cache-header lowering were extracted **unchanged from the exact selected predecessor** into `route-runtime-path-match.mjs` and `route-runtime-cache-policy.mjs`. The public facade imports/reexports those same functions and frozen vocabulary objects, so existing callers keep their public API and one implementation owner. Authored cache fact projection remains in the existing route runtime. No shared-algebra source, export or opcode was changed.

`ownership-evidence.json` records old/new test hashes, exact diffs, AST fingerprints of expected assertions, source identities and the ownership rationale. `retained-generic-search.json` records a bounded source-directory search that found none of the three generic symbols; it does not establish that historical recovery is impossible.

## Counterexamples retained rather than hidden

- Historical route extraction `f8fbe25eb69b8a7ae1aaaf657ef7f7cad419c8aa` matches pattern `/items/:id` against candidate ` /items/a ` after trimming. The selected predecessor rejects it. That exact historical object was retained under `refs/recovery/route-runtime-variant-f8fbe25e`; it was not merged or promoted. Its code is retained separately in this audit.
- `route-access-policy-algebra.test.mjs` expects `undefined` for absent authenticated/unauthorized targets. The selected authored-fact projection returns empty strings. Its generic-record and Sourcery-fact inputs also differ. This is a recorded contract difference, not proof of a runtime bug. The test remains **blocked**, and its expected values were not rewritten.

Conformance preserves existing details, including exact-string short-circuit matching, decoder behavior, parameter/result freezing, numeric cache text, getter order and thrown-fault identity. Existing behavior was not silently tightened or normalized. Qualification is runtime/source conformance, not proof of executable REL, semantic-zero status, a complete routing audit or deployment readiness.

## Verification

| Receipt | Result |
| --- | --- |
| `routing-tests.txt` | **12/12** retained-intent, predecessor A/B, ownership and actual route-resolution checks passed. |
| `platform-tests.txt` | **60/60** selected-source checks passed. |
| `core-tests.txt` | Source ownership/closure check and **71/71** Core tests passed. |
| `shared-algebra-tests.txt` | **99/99** passed; shared owner remains clean at `5bcde83eb3ff167ba49df57a1463ce242ad389dc`. |

The exact-source A/B tests cover coercion, whitespace, invalid/duplicate parameters, encoded slashes, double encoding, invalid encodings, frozen results, cache vocabulary/number validation, getter ordering, source interfaces and defaults. Actual page-route resolution verifies static-route priority, decoded parameters and unknown-route refusal. These overlapping receipts belong to one local qualification run, not independent confirmations.

Inventories were regenerated: 310 MJS modules, 289 SDK-category modules, 33 runtime domains. SDK-category counts include SDK-local tests and are not deployment counts. **The last full assembly remains at `04ded46`; no new full materialization is claimed for this source revision.**

## Cohort disposition

| Status | Files |
| --- | ---: |
| Previous unchanged-test ports | 2 |
| Previous existing-runtime qualification | 1 |
| New explicit ownership amendments | 3 |
| Missing shared-owner contracts | 93 |
| Unresolved owner/input-contract difference | 1 |
| Missing platform components/exports | 38 |
| Missing resource contracts | 4 |
| Invalid retained syntax | 3 |
| **Total** | **145** |

Six files now have scoped qualifications; **139 remain unresolved**. `test-qualification-ledger.json` carries forward the earlier auth and forwarded-identity receipts and preserves original import requirements separately from amended selected contracts. No missing generic implementation is falsely marked restored.

The source and metadata are preserved in the new verified bundle/snapshots indexed by `preservation-identities.json`. `prior-records/` and `live-records/` capture the metadata transition. Original source, all 145 retained tests, previous witnesses, caches and research outputs remain preserved. No remote push, deployment or pruning occurred.

## Reproduction and next work

From the selected source checkout:

```powershell
node --test test/*.test.mjs sdk/plugins/core/semantic-mutation-policy.test.mjs sdk/plugins/postgres-rel/semantic-mutation-policy.test.mjs sdk/plugins/data-space/deferred/runtime/data-space-operation-contract.test.mjs
```

Core uses its normal source check and test command; the shared library uses `node --test test/*.test.mjs`. Historical conformance requires the exact retained predecessor and variant Git objects. The new bundle includes both; tests fail visibly if those sources are unavailable.

Next, review a bounded group of the remaining 93 missing shared-owner contracts using the same ownership/source-evidence gates. Resolve the access-policy input/default contract explicitly before porting it; do not replace `undefined` expectations merely to obtain a pass. Missing histories, remaining migration material, full assembly refresh and cache/output regeneration remain separate holds.

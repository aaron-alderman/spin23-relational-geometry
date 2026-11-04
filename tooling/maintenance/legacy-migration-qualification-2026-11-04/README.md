# Legacy migration qualification — 2026-11-04

Mapped the fixed **145-file retained test cohort across 27 domains**, then ported the bounded auth-provider diagnostic/session projection domain. Selected source commit: `f9cc5e4726ef803465673cc72fca713912291828`, branch `codex/reconcile-platform-sources`, in `.platform-reconstitution/sourcery-platform-reconciled`. Its exact predecessor is `04ded4687761514008c6c7a356f58a8a22c6a67a`.

| Disposition | Test files | Meaning |
| --- | ---: | --- |
| Qualified port | 2 | Auth-provider diagnostic and session/cookie projections; unchanged retained tests now run against the extracted components. |
| Qualified existing runtime contract | 1 | Forwarded request identity/signature binding and header sanitization pass against the existing implementation; no implementation change. |
| Shared-owner prerequisite gap | 97 | Static imports require missing generic-owner files or named exports. No operators were invented or added to make these tests pass. |
| Platform source/export gap | 38 | Required platform components or exports are absent from the selected source. |
| Resource source gap | 4 | Required authored contract/resource paths are missing. |
| Invalid test syntax | 3 | The retained test cannot be parsed unchanged. |
| **Total** | **145** | Every file has its original SHA-256, domain, parse result, import/resource targets, test names and disposition. |

The **142 prerequisite gaps remain unresolved**, with exact paths and missing named exports in `test-qualification-ledger.json`. Static presence checks are not execution or semantic equivalence. Missing historical APIs are not automatically obsolete contracts, and a test name containing “algebra” does not prove executable algebra ownership. Dynamic paths and runtime-generated operations are outside the complete reach of this static map.

The malformed files are `browser-startup-resource-algebra.test.mjs`, `route-runtime-defaults.test.mjs`, and `route-target-records-algebra.test.mjs`, each failing parsing at line 1, column 8. Original retained files were left unchanged.

## First qualified port

The two auth-provider tests require components that were absent as separate modules but whose behavior existed inside `sdk/server/auth-provider-runtime.mjs`. The port moves those exact diagnostic projections into `auth-provider-errors.mjs` and session/public-session/cookie projections into `auth-provider-session-values.mjs`, then connects the existing runtime to them. Permission resolution, authentication, persistence, session generation and cookie-security policy remain with their existing owners and are called through explicit ports.

The retained two tests were copied byte-for-byte. Additional conformance checks load the exact predecessor source from retained Git commit `04ded46`, extract its functions/closures with Acorn, and compare the current runtime delegation against those actual source functions. They cover:

- Diagnostic class, code, title, issue fields, metadata defaults and override behavior.
- Authentication short-circuiting, permission-operation/resource bindings, provider method receivers, callback order, false-like values and exact thrown-fault identity.
- Public-session getter/coercion order, cookie encoding, two separate security-attribute observations, encoding refusals and port faults.
- The actual server-auth runtime with an invocation-local session store, denied permissions in the absence of grants, secure cookie projection, duplicate plugin startup refusal and duplicate credential refusal.

Error stack file/line locations change with source extraction and are not asserted identical. This is **functional runtime-contract qualification**, not an executable-REL migration, semantic-zero proof, complete authentication-system audit or application admission. No generic Expression Algebra operator was added.

## Verification and preservation

| Receipt | Result |
| --- | --- |
| `auth-provider-tests.txt` | **7/7** focused retained/oracle/runtime checks passed. |
| `platform-tests.txt` | **48/48** selected-source tests passed, including the earlier policy, workspace and source-only architecture checks. |
| `core-tests.txt` | Source ownership/closure check and **71/71** Core tests passed against the current SDK. |
| `existing-forwarded-identity-tests.txt` | **2/2** retained checks passed against the existing runtime. |

These overlapping receipts describe one local qualification run, not independent confirmations. The source inventories were regenerated for 304 MJS modules and 287 SDK-category modules; SDK-local tests are included in that category. Counts and heuristic classifications remain triage evidence.

`prerequisite-ledger-before-port.json` preserves the initial static map. `predecessor/auth-provider-runtime.mjs` preserves the exact before-source outside the selected runtime repository. `qualification-summary.json`, `live-records/`, and `prior-records/` record source status and the live metadata transition. `preservation-identities.json` identifies the new verified bundle and source snapshots. Older source/binding snapshots remain in the prior reconciliation preservation chain.

The selected source and Core dependency binding are unchanged in location; Core continues to name `../sourcery-platform-reconciled/sdk`. No production action, remote push, retained-source deletion, cache/output pruning or new large artifact build was performed. **The latest full assembly remains at predecessor `04ded46`; it is explicitly not a recertification of this source revision.** This tranche was checked with focused conformance, actual runtime integration, full source tests and the Core suite.

The forwarded-identity checks ran in an isolated qualification workspace containing the unchanged retained test plus recorded SDK/dependency junctions. It is a test workspace, not a new source authority. Future removal must unlink its `sdk` and `node_modules` junctions without traversing their targets.

## Reproduction and next tranche

From the selected platform checkout:

```powershell
node --test test/*.test.mjs sdk/plugins/core/semantic-mutation-policy.test.mjs sdk/plugins/postgres-rel/semantic-mutation-policy.test.mjs sdk/plugins/data-space/deferred/runtime/data-space-operation-contract.test.mjs
```

Core uses `node scripts/check-source.mjs` followed by `node --test test/*.test.mjs`. The predecessor conformance test requires the retained `04ded46` Git object; it fails visibly if that exact source is unavailable. The new verified Git bundle includes that ancestor.

From the main checkout, `node tooling/maintenance/legacy-migration-qualification-2026-11-04/map-tests.cjs` regenerates a **static prerequisite map**. It does not execute tests or preserve the final qualification annotations by itself; keep the recorded runtime receipts and apply `finalize.cjs` only after its required checks and source commit exist.

The next tranche should resolve a bounded subset of the **97 shared-owner gaps**: locate exact retained implementations, distinguish generic reductions from Sourcery-owned policy, and qualify the chosen ownership boundary before porting. Separately repair malformed tests in reviewable copies when their source contracts are available. Do not bulk-register guessed operators or retire preserved tests based on this map.

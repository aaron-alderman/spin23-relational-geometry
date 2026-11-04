# Platform source reconciliation — 2026-11-04

The local development/integration source is `.platform-reconstitution/sourcery-platform-reconciled`, branch `codex/reconcile-platform-sources`, commit `04ded4687761514008c6c7a356f58a8a22c6a67a`. Merge commit `282c53c829176a9e6b8b4948846fc14fc24951bf` retains both the former local candidate `6d05a67755cf5e88c4cd9999f96e6713b113d0a7` and pinned GitHub main `9c7f73fe58a3b6ae030f9bbd2407ca49efef44c3` as ancestors. Git transport confirmed that upstream revision before reconciliation. No remote push, service reload, publication or production activation was performed.

This selects a **local integration baseline**, not upstream canonical authority, scientific status or application/deployment admission. The previous checkouts, branches, witnesses and preservation archives remain available.

## Decisions

Upstream explicitly replaced release/seal architecture with versionless live source. The reconciled repository therefore keeps that source-only boundary while retaining the local authored REL policy tranches and Temple workspace runtime. The seven overlaps were resolved as follows:

| Path | Resolution |
| --- | --- |
| `.sourcery-layer/manifest.json` | Accept upstream deletion; manifests are generated outside the source checkout for validation only. |
| `runtime-dependencies.json` | Accept upstream deletion; retained dependency bytes are external validation inputs. |
| `runtime-dependencies.sources.json` | Accept upstream deletion; prior provenance remains preserved outside the selected source. |
| `scripts/verify-platform-runtime.mjs` | Accept upstream deletion; updated verifier lives in this maintenance audit. |
| `sdk/SOURCERY-PAYLOAD.json` | Accept upstream deletion; payload manifest is generated in the validation snapshot. |
| `sdk/package.json` | Keep upstream's versionless source package and discovery exports; retain the local workspace export and add the reader's explicit runtime entrypoints. Dead release scripts are not resurrected. |
| `test/platform-runtime-native-dependency.test.mjs` | Accept upstream deletion; relevant dependency-integrity refusal checks live outside the source-only repository. |

The inherited local authority declaration and old bootstrap receipt were also removed from the **new isolated candidate** because they described a different source identity. Their originals remain in the preserved former candidate and its verified archives. The prior semantic inventories were regenerated for 299 MJS modules, 285 runtime modules, and 33 runtime domains. Their authority label explicitly identifies a local source inventory; these classifications remain triage evidence.

The top-level domain inventory now names the selected revision and current path counts. The older Core domain assessment is explicitly marked historical against its original basis; its heuristic findings were not silently transferred to the selected source. The SDK inventory's runtime category includes SDK-local test modules and is not a deployment inventory.

The reader helper repair was ported from the recovery SDK witness into the full source SDK. Its engine imports the four shared Expression Algebra value helpers instead of defining duplicate implementations. An exact function-identity regression check was added. The five reader entrypoints expose existing implementation files without compatibility copies. Core first passed against this SDK in an isolated checkout, then adopted it through its explicit local dependency. Core adoption commit: `ecc6dbc`.

## Verification receipts

- `platform-tests.txt`: 41/41 passing tests, covering source architecture, shared expression ownership, bounded discovery, authored policies, inventories and workspace runtime.
- `verification-boundary-tests.txt`: 5/5 passing checks, including tampered source bytes, missing exact commit provenance, altered payload identity and forbidden static reexports of optional dependencies.
- `core-against-reconciled-sdk-tests.txt`: isolated Core source check and 71/71 tests against the reconciled SDK.
- `core-selected-sdk-tests.txt`: actual Core source check and 71/71 tests after local SDK adoption.
- `claimipedia-provenance-tests.txt`: 9/9 focused ownership/provenance checks. These are not the complete scientific/application suite.
- `assembly-inputs.json`, `assembly-proof.json`, and `assembly-stderr.txt`: exact source and dependency manifests, verification code hash, full materialized runtime closure, entrypoint imports and scoped programme-completion result.
- Final assembly: **13,039 composed files**, 72 consumer entrypoints and 225 reachable SDK files; runtime payload `a9d37dce418e726dd1bc64e95c433421455b65dd428f053626ff3f61017d926c`. The receipt includes the shared algebra package and follows imports plus both forms of static reexport.
- `linked-composer-guards-tests.txt`: 2/2 passing guards against source-root reuse and nonempty output. `materialization-identity.json` also confirms distinct retained-source file identities for sampled SDK/application files and shared identities only between generated artifacts.
- `selected-baseline.json`: accepted local revision, scope, checks, bindings and remaining holds.
- `source-reconciliation.json`: exact source decisions, ancestry checks and final differences.
- `legacy-working-review.json`: path-level accounting for all 3,029 legacy working-state entries and the unchanged Claimipedia provenance diff.
- `preservation-identities.json`: verified new source snapshots and bundles; earlier preservation remains indexed by the 4 November recovery audit.

The inherited verifier ignored `export ... from` and `export * from` edges. The external verifier now follows both as static dependency edges, as well as imports. It validates the retained versionless Expression Algebra source through its exact Git commit/tree and captured file/payload hashes; no npm archive provenance or licence is fabricated for that local witness. Native dependency provenance remains the retained legacy evidence, not a new production observation.

## Assembly materialization and disk-space limit

The first attempt exposed repository `.gitattributes`/`.gitignore` ownership collisions. Those repository-local policies are preserved in source but excluded from the composed platform layer. A subsequent ordinary byte-copy assembly passed for merge commit `282c53c`. Its receipt is retained under `attempt-2/`.

The byte-copy rebuild after reader SDK integration exhausted disk space. The newly generated partial target was recorded and retired in `partial-target-retirement.json`: 9,672 generated files, 854,601,939 bytes, no junction traversal and no source-directory deletion. The failure is retained under `attempt-3/`.

Final materialization uses `compose-linked-validation.mjs`. It calls the retained Core's original manifest/graph/object verification functions, then links verified bytes from the new **generated platform snapshot** and the earlier **generated assembly** into a new empty generated target. **Retained source repositories are never hardlinked into the target.** The receipt uses the distinct `sourcery/local-linked-layer-composition-proof.v1` protocol rather than claiming the canonical Core byte-copy composer ran unchanged.

The generated linked target is for read-only validation: editing it can change associated generated snapshots/assemblies. It is not a standalone deployable copy. SDK and package dependency installations used for execution are regular copies. The full consumer closure, shared-algebra dependency, SDK entrypoint imports and configured programme-completion check run against the materialized target. Optional Playwright/Terser remain explicitly unadmitted; Linux native payload identity is checked without claiming Windows native execution or browser coverage.

## Legacy work and remaining holds

The legacy SDK root contains an independent recovery adapter repository; its many deleted tracked paths cannot be interpreted as intentional source retirement. The path-level ledger distinguishes 155 deleted working paths retained identically in the selected source, 177 with differing selected implementations, and 2,473 retained in legacy Git only. It also records 49 identical working files, nine differing working files and 166 working files absent from the selected source.

Those 166 include 145 unfinished migration tests, 15 assurance files, four generated audit outputs and two adapter-witness support files. They remain preserved, with their original histories and source archives. They have **not** all been ported or admitted by this reconciliation. The selected source retains the pinned histories and the specifically verified local policy/runtime tranches; this is not a blanket semantic equivalence certificate for unfinished legacy work.

Claimipedia's original three source files still contain the same six added source-provenance facts. Its working diff remains byte-identical to the preservation patch. Its recovered Core dependency link was restored, and Core's SDK dependency junction was replaced by unlinking only that verified junction; its former target was not traversed or deleted. Installation links are recorded in the selection receipt.

The next development work is selective qualification/porting of the remaining legacy migration tranches. Separately, the two missing dependency histories, direct semantic/effect ownership audit, runtime-cache regeneration and research-output regeneration remain open. No retained checkout, cache generation or research output was pruned, and no final consolidation certificate is issued.

## Reproduction

From `C:/Users/aaron/grand-theory`, with sufficient free space, run:

```powershell
node tooling/maintenance/platform-reconciliation-2026-11-04/assemble-reconciled.cjs <new-empty-validation-directory>
node --test tooling/maintenance/platform-reconciliation-2026-11-04/verification-boundary.test.mjs
```

The ordinary mode uses the retained Core composer and regular byte copies. To reproduce the linked validation, set `SOURCERY_RECONCILIATION_REUSE_TARGET` to the retained `reconciled-validation-2026-11-04-r2/assembled` directory before invoking the builder. The builder writes the current input directory to `assembly-inputs.json`, which the verifier tests consume. Run source tests from the selected platform checkout using the exact command recorded in `source-reconciliation.json`; Core uses its normal source check and test command. Restore source snapshots and bundles before rebuilding if their local directories have been retired. Same-machine preservation does not replace an independent backup.

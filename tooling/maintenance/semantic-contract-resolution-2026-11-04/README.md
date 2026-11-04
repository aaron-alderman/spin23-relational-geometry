# Semantic mutation subsystem qualification — 4 November 2026

All 82 previously unresolved semantic mutation contract files now pass under explicit Sourcery ownership. Their selected tests contain 130 cases and 329 assertions. Eighty files retain their expected assertions and case names, checked through Acorn AST comparison; two have explicit contract amendments. The fixes have passed source, ordinary-copy assembly and isolated Claimipedia consumer verification.

This establishes a local integrated development candidate. It does not certify executable expression algebra, scientific acceptance, deployment readiness or completed historical recovery. The retained original generic imports remain unavailable: of the 83 literal original semantic files, 14 pass and 69 still fail against the selected SDK. Qualification means an explicit, reviewed owner contract and passing selected implementation, rather than restoration of those original APIs.

## Pinned source and scope

Selected source: `.platform-reconstitution/sourcery-platform-reconciled`, commit `f534f34d2562df684fa8a6be48f0297a6b5a62c9`. Implementation checkpoint `51e8272cc52045ebe41df8b081a8ad6872b67721` and predecessor `c57f2679c3500174390e8f06c173a62bc90a0cbb` remain preserved. Core is unchanged at `6c3ac90692f94419e429ea363f55ac27000880f6`; shared expression algebra is unchanged at `5bcde83eb3ff167ba49df57a1463ce242ad389dc`.

`sdk/core/semantic-mutation-values.mjs` supplies 97 value-plan exports, linked statically from 63 production domain modules. Sixty-eight thin contract facades expose the same implementations. Controllers retain authorization, canonicalization and effect boundaries; callback order, receiver and fault identity have conformance checks. Static linkage is not execution coverage. No shared expression operator, opcode or generic algebra export was added.

Sixteen newly reconstituted REL resources record contract intent, test paths and falsifiers. They explicitly declare `authorityEffect none` and `notProved executable-algebra`. They are new specifications, not recovered historical bytes or executable algebra proofs. The SDK manifest binds their hashes and selected test/expectation hashes.

Of the 82 resolutions, 13 literal original tests now pass with locally reconstituted specifications, 67 preserve expectations with explicit Sourcery ownership, and two amend expectations:

- Actions now receive authored policy facts and retain the existing canonical sorted operation list and authored unknown-operation diagnostic. A private hard-coded operation policy was not reinstated.
- Target identity now covers ordered fact history, including retractions, using JSON-framed tuples. The former positive-only sorted delimiter signature was unsafe.

The complete retained 145-file cohort is now **91 qualified and 54 unresolved outside this subsystem**. All 83 selected semantic files are qualified. Remaining categories are 22 shared-owner contracts, 25 platform source/export gaps, two missing resources, two owner-contract differences and three invalid-syntax files. See [the qualification ledger](test-qualification-ledger.json), [subsystem results](subsystem-qualification.json), [ownership evidence](contract-ownership-evidence.json) and [static linkage](owner-linkage.json). All 145 retained original test hashes are unchanged.

## Demonstrated fixes

[Counterexamples](counterexamples.json) compare exact predecessor functions with the final source:

1. Stale-target identity previously ignored retractions/order and allowed delimiter ambiguity. Ordered JSON tuples now distinguish them. Actual proposal admission rejects a retraction-only target change with HTTP 412 `stale-session-target`, a rejected result and an empty candidate delta. The existing runtime guard remains conditional on a supplied non-empty fingerprint; mandatory pinning when metadata is omitted is not claimed. New empty-state fingerprints are `[]`; old non-empty fingerprints require readmission when they no longer match.
2. Restore validation could admit empty predicate/object fields because `.includes(false)` missed empty strings. Raw frames and canonical tuples now refuse them with HTTP 400 `invalid-restore-deleted-cluster` before delta production.
3. Compatible-contract comparison colon-joined five fields, admitting collisions such as `A:B`/`C` versus `A`/`B:C`. JSON framing now refuses the collision while preserving equivalent-contract identity.

Explicit unknown slot cardinalities also refuse through the existing authored slot policy; absent cardinality retains its established default. A missing property-plan owner was supplied. Existing scalar-replacement retractions remain intact; the positive-write value plan owns the positive value/MIME component.

## Verification

| Scope | Passed | Receipt |
| --- | ---: | --- |
| Final selected source | 299 | [source tests](platform-final-tests.txt) |
| Core against selected source | 71 | [Core tests](core-tests.txt) |
| Unchanged shared algebra | 99 | [shared tests](shared-algebra-tests.txt) |
| Assembled semantic subsystem | 236 | [semantic tests](assembled-semantic-tests.txt) |
| Assembled Core | 71 | [Core artifact tests](assembled-core-tests.txt) |
| Assembled Claimipedia | 35 | [Claimipedia tests](assembled-claimipedia-tests.txt) |
| Assembled Epistemic Core | 88 | [Epistemic tests](assembled-epistemic-tests.txt) |
| Assembled reader science | 15 | [reader-science tests](assembled-reader-science-tests.txt) |
| Assembled science programme | 51 | [programme tests](assembled-science-programme-tests.txt) |
| Assembled qualification runner | 24 | [runner tests](assembled-qualification-runner-tests.txt) |
| Assembled Git receiving | 14 | [receiving tests](assembled-git-receiving-tests.txt) |
| Assembled frontier programme | 99 | [frontier tests](assembled-frontier-tests.txt) |

The five source conformance groups use exact predecessor Git history in unique temporary oracle checkouts; they fail if the required objects are absent. They cover defaults/collections/timestamps, projection/removal/reference coercions, property callback order/receiver/faults, reference denial and prompt/reclassification copying. These Git-dependent checks are included in source 299 and excluded from the assembled semantic glob. Integration and manifest tests include refusal and tampering controls.

The final assembly contains **13,442 composed files**, materialized as ordinary copies. Payload hash: `d9794759019747e994ef2d98d75e35de8481f5e0a0c1f563075b81a9a91fea4c`. Its closure records 72 consumer entrypoints, 381 reachable files and 36 reachable semantic files. Programme completion passes in the assembly proof's declared scope. Native Linux identity was checked; native Linux execution and browser coverage are not claimed.

[Assembly proof](assembly-proof.json), [assembly inputs](assembly-inputs.json), [consumer inputs](claimipedia-assembly-inputs.json) and [integrated verification](integrated-verification.json) bind source revisions, file hashes and receipts. The isolated consumer fixture contains eight source repositories, 7,522 regular source files and 30 package junctions; Core and frontier retain independent Git oracle history. SDK/expression package links resolve to the final assembly. Two generated junctions were changed from the intermediate assembly with rollback protection; [the selection receipt](final-assembly-selection.json) records this. Intermediate assembly and receipts remain in place, with [earlier audit evidence](pre-compatibility-fix/) retained.

[Final integrity](final-integrity.json) checks source and artifact bytes after tests, selected repository connectivity, original test hashes and unchanged user working diffs. The same-run tests, matrices, manifests and assembly receipts overlap as engineering evidence; they are not independent confirmations or scientific admissions.

## Preservation and limits

[Preservation identities](preservation-identities.json) bind the final verified Git bundle and a 912-file source snapshot in `.platform-reconstitution/bundles/semantic-contract-resolution-final-2026-11-04/`. The intermediate checkpoint has its own bundle/snapshot. Unchanged consumer preservation is inherited from the [preceding integrated audit](../integrated-platform-baseline-2026-11-04/preservation-identities.json), including the Core follow-up. Historical archive metadata remains historical; [live records](live-records/) capture this final metadata transition, and [prior records](prior-records/) retain its predecessor.

Claimipedia's original three modified files and provenance working patch remain unchanged. Main checkout user edits remain unchanged. No branches were pushed, merged or deleted; no source copies, runtime generations or research outputs were pruned, and no production service was activated.

Exact earlier local commits remain missing for Epistemic Core (`274a2a541789ee2e8b6576ec3aeb5d9651165338`) and Claimipedia Science (`647e065a69867ee767c5d9b7dac04bdce1946d19`). Their documented reconstitutions (`9e5f44d243079ad7e49d26d2e5a2c4b09ab48828` and `dfc997a19ad77f3fcd825ffeb16106cecb9031eb`) pass the stated tests without closing those history gaps. Runtime-cache disposability and research-output reproducibility remain unresolved. Cleanup certification remains withheld.

The source inventory records 657 MJS modules, 512 SDK MJS files, 33 domains and 182,938 runtime lines under its declared classification. These heuristic counts include test/tooling distinctions and do not prove semantic-zero or deployment completeness. The next migration scope is the remaining 54 retained contracts; its shared-owner decisions must stay explicit.

## Reproduction

From the repository root, repeat all nine suites against the retained final fixture:

```powershell
node tooling/maintenance/semantic-contract-resolution-2026-11-04/verify-assembly-consumers.cjs
```

From the selected platform source directory, repeat the full source checks:

```powershell
node --test test/*.test.mjs sdk/plugins/core/semantic-mutation-policy.test.mjs sdk/plugins/postgres-rel/semantic-mutation-policy.test.mjs sdk/plugins/data-space/deferred/runtime/data-space-operation-contract.test.mjs
```

Start the isolated reader on an ephemeral local port, if needed:

```powershell
node .platform-reconstitution/semantic-contract-validation-2026-11-04/claimipedia-against-assembly/claimipedia/scripts/start.mjs 0
```

For a fresh restored workspace, use the pinned source, recorded consumer sources/working patch and retained dependency, capability and application witnesses; run `assemble-reconciled.cjs` with a fresh destination, then `prepare-claimipedia-assembly.cjs` and the verifier. Inspect their fixed paths before selecting a new generation. These preparation scripts refuse existing targets. `select-final-assembly.cjs` records a one-time intermediate-to-final binding correction, not fresh bootstrap. Source extraction/wiring/qualification scripts are development provenance, not an idempotent installation workflow; use committed source rather than rerunning them indiscriminately.

[Resolution summary](resolution-summary.json) is the machine-readable outcome. All paths and authority claims remain local to this recorded candidate.

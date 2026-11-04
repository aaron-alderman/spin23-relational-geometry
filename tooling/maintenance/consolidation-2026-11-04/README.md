# Recovery verification and preservation — 2026-11-04

**Disposition: verified local recovery witnesses; source-authority and cleanup hold remain open.** This supersedes the 3 November handoff only where fresh observations are recorded below. It is not a clean final baseline or a production/application admission.

## Completed

- Preserved source snapshots, Git histories, working patches, live recovery records, and the complete saturation-refresh checkout excluding `.git` and `node_modules`. Archives remain local under `.platform-reconstitution/bundles/preservation-2026-11-04/`. The operator-state archive includes private local state; do not publish it.
- Every source archive was verified by streaming its complete extracted file payload and comparing the ordered aggregate SHA-256 against the source read. Per-file hashes, archive hashes, exclusions, links, and read failures are retained in adjacent manifests. Each Git bundle passed `git bundle verify`.
- The preservation index records **17 verified source archives and 17 verified Git bundles**, about **1.23 GiB** combined, with **zero recorded source-read failures**. These include sequential pre-repair and post-repair snapshots, not 17 independent confirmations of integrity.
- Found exact Core historical commits `844fa64abe4ee58f37add8f8e1b8e9fcfe2343d2` and `dfb98dbb630b1bf00ca1e0da2d3dbf81e73bc048` in the already-retained recovery clone. Imported them under `refs/recovery/oracles/expression-844fa64` and `refs/recovery/oracles/presentation-dfb98db`, without merging histories or changing executable Core source.
- Recovered tests exposed duplicated SDK helper identities. The local SDK adapter now imports and reexports the four shared Expression Algebra value helpers, with an explicit package dependency. The existing tests verify exact identity, historical behaviour, and an isolated installation. The pre-repair SDK source and Git history remain preserved.
- Expression Algebra: **99/99 tests passed**. Core: source ownership/closure check passed and **71/71 tests passed**. The earlier 61/63 result stopped two files before their individual tests could execute; it is not directly the same test count.
- Fresh full assembly passed at platform candidate `6d05a67755cf5e88c4cd9999f96e6713b113d0a7`: **12,906 composed files**, three verified layer manifests, runtime payload/import/resource closure, four SDK entrypoint imports, and the scoped programme-completion check. There were 72 consumer entrypoints and 205 reachable files. The older receipt had 12,905 files at an earlier seal.
- Updated the live authority map, platform residual ledger, root reconstitution receipt, and Core historical-source residual record. The pre-reconciliation records are retained separately.

## Source authority and recovery limits

The platform candidate's `origin` points to the retained local source checkout. That source names the GitHub remote, but this alone does not establish current upstream equivalence. A fresh authenticated bare clone observed GitHub `main` at `9c7f73fe58a3b6ae030f9bbd2407ca49efef44c3`. The candidate and upstream share ancestor `49924654f7476f0a2b73597680fa8dc3ac2ce5e5`; **37 candidate-only and 52 upstream-only commits** remain. No merge, reset, push, or canonical promotion was performed. The GitHub connector returned 404; Git transport succeeded.

The bounded history search inspected **21 accessible object stores** under known development and backup roots, and advertised refs from **10 bundles**. It found the two Core oracle sources, but not these recorded dependency heads:

| Repository | Unrecovered exact commit |
| --- | --- |
| Epistemic Core | `274a2a541789ee2e8b6576ec3aeb5d9651165338` |
| Claimipedia Science | `647e065a69867ee767c5d9b7dac04bdce1946d19` |

Both authoritative remotes again returned `upload-pack: not our ref` for their exact hashes. Existing surviving dependency files and remote histories are preserved. This does not establish that deleted local-only content is recovered. The search records depth limits and errors; bundle advertised refs are not an exhaustive search of their packed objects. Machine snapshots, inaccessible locations, other volumes and external backups remain outside the search. A person-authority backup location was inaccessible and was not bypassed.

The reconstructed Expression Algebra and Core packages remain local witnesses. The capability/application directories are manifest-verified source projections, not independent Git checkouts. The full assembly receipt explicitly retains `applicationAuthority: false` and `projectionAuthority: false`. Its completion status covers the configured audit profile; it does not establish programme-wide semantic/effect ownership, browser behaviour, production readiness or full application tests. Native dependency payloads include Linux binaries, so the import proof is not Windows native-image-processing validation.

## Retained evidence

- `assembly-proof.json`: fresh full assembly result; `assembly-stderr.txt` is the corresponding stderr capture.
- `algebra-tests.txt` and `core-tests.txt`: fresh complete test output.
- `history-search.json`: bounded search roots, exclusions, exact object checks, broken markers, bundle refs and limits.
- `upstream-lineage.json` and `verification-summary.json`: source identities, divergence, recovered refs and remaining gaps.
- `platform-reconciliation.json`: exact divergent commit lists, changed paths and domain counts, legacy working-state census, and the preserved three-file Claimipedia provenance diff.
- `final-observations.json`: final connectivity checks, unchanged pre-existing main tracked diff, prior bundle identities, and mutable operator-state recheck. Preview payloads are covered by the archive verification.
- `preservation-identities.json`: archive/bundle identities, verification outcomes, snapshot exclusions and read-failure counts.
- `live-records/`: tracked copies of the final live recovery records. The actual archives and private operator state remain ignored and local.
- `.platform-reconstitution/.tmp-full-assembly` and `.platform-reconstitution/.assembly-validation-2026-11-04` both remain present. The prior assertion that all temporary assembly material had been removed was incorrect.

## Next work and retirement gates

1. Compare the 37/52 divergent platform commits by ownership and intended behaviour before choosing or merging a source baseline. Reconcile the legacy platform's existing changes and Claimipedia's three existing modified files against that baseline.
2. Search external backups or machine snapshots for the two dependency commits. If exact recovery is exhausted, author an explicit replacement-source baseline with revision, differences, missing-history statement and relevant application tests; retain surviving witnesses.
3. Continue direct semantic/effect ownership assurance. The deterministic inventory remains triage evidence, not proof that runtime semantics have all moved into executable algebra.
4. Saturation-refresh operator state and previews are now preserved, but **retirement is not performed**: archival verification alone does not establish that the operator has stopped or that state has been transferred to a selected live location.
5. Keep all three runtime-cache generations and research output. Identify the current runtime and reproduce superseded snapshots and research outputs before disposing of them. Historical references to a cache generation do not establish that it is active now.

No checkout, cache, output, branch or retained assembly was deleted. The main checkout's pre-existing edits and untracked work were not staged as part of this audit. No final clean-baseline certificate is issued.

The platform comparison narrows reconciliation to **252 differing paths**. Relative to the common ancestor, the candidate changes 50 paths and upstream changes 209. Seven paths changed on both sides: the layer manifest, runtime dependency declaration and sources, runtime verifier, SDK payload manifest and package manifest, and native-dependency test. Start with these coupled dependency/verification boundaries before resealing a combined candidate. The remaining path differences still need ownership review; non-overlap does not prove compatibility. Claimipedia's three working changes each add two source-provenance facts and remain preserved in place.

## Reproduction

Run from `C:/Users/aaron/grand-theory`:

```powershell
node tooling/maintenance/consolidation-2026-11-04/search-history.cjs <new-search-receipt.json>
node tooling/maintenance/consolidation-2026-11-04/preserve.cjs <new-local-archive-directory>
node tooling/maintenance/consolidation-2026-11-04/preserve-git.cjs <new-local-git-archive-directory>
node .platform-reconstitution/sourcery-platform-authority/scripts/assemble-source-clean-workspace.mjs .platform-reconstitution/sourcery-core .platform-reconstitution/sourcery-capabilities .platform-reconstitution/sourcery-applications <new-empty-target>
```

For source verification, run `node --test test/*.test.mjs` in Expression Algebra, and `node scripts/check-source.mjs` followed by `node --test test/*.test.mjs` in Core. Restoring the local SDK witness requires its declared Expression Algebra dependency installed at package scope. Its current dependency junction is recorded in `verification-summary.json`; unlink junctions without traversing their targets before any future checkout removal.

Restore archives only into a new empty directory, then compare each regular file to its manifest hash. Git bundles preserve history; source archives and patches preserve working files. Recreating a working checkout from a bundle alone does not restore uncommitted source or operator state. These archives are on the same machine and do not replace an independent backup.

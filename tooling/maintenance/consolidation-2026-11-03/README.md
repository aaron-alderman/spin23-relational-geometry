# Partial consolidation baseline — 2026-11-03

**Disposition: recovery hold. This is an observed, incomplete baseline, not a clean integrity certificate. No canonical source is promoted by this receipt.**

## Worktree disposition

Four registered checkout copies were retired. Their branch refs remain in the owning repositories and in complete, verified bundles under `.platform-reconstitution/bundles/`:

| Owning repository | Retired checkout | Preserved branch / commit |
| --- | --- | --- |
| sourcery-platform | assurance-engine-6 | codex/assurance-engine-6, `b7275d2cc12ad9a41f2efba8eacdacaf259d5c19` |
| sourcery-platform | sourcery-platform-canvas-3 | codex/platform-canvas-residuals, `101347df5e41b9cc1bb73c6199a31a34fbb76504` |
| claimipedia | claimipedia-reader-program-test | codex/reader-program-test-decomp, `9d7340e676c106d08c0379595295799ea44b8747` |
| claimipedia | worktrees/legacy-readback | codex/legacy-readback-algebra, `e1c5eb8b44926a1e8885cb19d64c30d872ca878e` |

The first two commits checkpoint existing local edits; they are not tested or admitted semantic changes. No branch was merged, deleted, or pushed. The original staged and unstaged binary patches are retained in `.platform-reconstitution/bundles/consolidation-2026-11-03/`. Bundle identities are in `bundle-identities.json`; both new bundles passed `git bundle verify` before removal.

The main repository still registers its primary checkout and `C:/Users/aaron/.codex/worktrees/saturation-refresh/grand-theory`. The latter is clean and its branch is an ancestor of the primary HEAD, but contains ignored `.context-hub` operator state and generated previews. It was retained pending preservation of that state. The main checkout's pre-existing local changes were not committed as part of consolidation.

## Existing provenance gap

At the start of this operation, `.platform-reconstitution/expression-algebra` and `.platform-reconstitution/claimipedia-core` were empty. Nine expression-algebra task copies and six claimipedia-core task copies pointed to missing Git metadata. Two additional historical task copies, `worktrees/parse-spki` and `worktrees/with-input-surface`, also have unresolved metadata.

`algebra-comparison.json` records the nine algebra variants. Their contents differ; the Ed25519 copy contains their file paths but differs in implementations. It is not a proven authoritative replacement. All these historical source copies remain in place. The separate root `expression-algebra` tree contains only two operation files and is not a complete package.

The earlier `integrations/sourcery/disk-hygiene-20261029/CHECKPOINT.md` claims source retention. Its capture-compaction receipt concerns older captures and cannot establish retention of these later local Git histories. Neither receipt authorizes promotion of a task copy.

## Removal incident and recovery

The first attempt to remove the clean Claimipedia reader worktree used `git worktree remove`. Git for Windows followed its `node_modules` junction into retained dependencies and failed with a long-path error. This deleted 23 previously clean reader-algebra tracked files in the main Claimipedia checkout and removed Git metadata and some files from adjacent `epistemic-core` and `claimipedia-science` repositories. This was caused during this consolidation operation, in addition to the pre-existing missing canonical repositories.

The reader-algebra files were restored from Claimipedia HEAD. Its working status again contains only the same three modified files observed initially. Remaining checkout junctions were explicitly unlinked before the residual reader checkout and legacy-readback checkout were removed. Future removal must unlink junctions without traversing their targets before invoking recursive deletion, including Git's own worktree removal.

The recorded pre-incident heads were:

- epistemic-core: `274a2a541789ee2e8b6576ec3aeb5d9651165338`, branch `codex/export-sync-comparison`, initially clean.
- claimipedia-science: `647e065a69867ee767c5d9b7dac04bdce1946d19`, branch `main`, initially one status entry.

Surviving files from both are archived without dependency junctions in `.platform-reconstitution/bundles/consolidation-2026-11-03/surviving-dependencies.tar.gz` (79 archive entries). Their exact previous history and any deleted local-only content are **not recovered**.

Four authoritative GitHub repositories were cloned with `--no-checkout` into `.platform-reconstitution/recovery/{epistemic-core,claimipedia-science,expression-algebra,claimipedia-core}`. They are isolated recovery candidates; no source or Git metadata was substituted into retained directories. The connector returned 404, but authenticated Git transport succeeded. Fetching the exact two pre-incident heads returned `upload-pack: not our ref`. A search across surviving local repositories and the older source location named in the migration receipts found neither object. The older location has different heads. Recovery clones therefore do not certify recovery of lost local commits.

## Runtime cache and generated results

All three runtime-cache generations remain. `runtime-cache-audit.json` records 451,244,442 bytes (about 0.42 GiB), their marker hashes, file counts, source snapshot IDs and overlay identities. They are different staged snapshots; creation order does not establish supersession or disposability. The accepted corpus seal names another blessed snapshot. No current-generation pointer or sufficient regeneration receipt was established. No runtime cache was pruned.

`output/` remains. The audit read 433,100,088 bytes (about 0.40 GiB), with 37 permission-denied paths explicitly recorded. Research regeneration was not established, so deletion was not justified. Existing retained migration sources and captures were not altered; the older capture archive claims were not freshly reverified.

## Verification and limits

- `git fsck --connectivity-only --no-dangling` passed for the retained main, platform, and Claimipedia repositories.
- Platform and Claimipedia each now register only their primary checkout; all four retired branches remain referenced.
- `baseline.json` contains SHA-256 identities for 11,499 readable files, Git observations, junction targets and explicit read failures. It was collected during this operation, before reader-algebra restoration and before recovery clones; `final-addendum.json` records those subsequent corrections. It is not an atomic pre-operation snapshot.
- No application tests were run: required local packages are missing, and the checkpoint commits preserve existing work rather than validate it.
- No source consolidation, cache pruning, output deletion, canonical-source promotion, production change or remote push was performed.

The next necessary action is authoritative recovery of the original local histories, or an explicitly governed reconstitution that preserves the missing-history report. Cleanup cannot be certified complete until this is resolved.

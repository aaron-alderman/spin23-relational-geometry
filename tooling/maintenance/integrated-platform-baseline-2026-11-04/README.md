# Integrated platform candidate — 2026-11-04

**A functional local integration candidate now passes source, assembly and current Claimipedia verification. Migration certification and historical recovery remain incomplete.**

The selected platform is `.platform-reconstitution/sourcery-platform-reconciled` at **`c57f2679c3500174390e8f06c173a62bc90a0cbb`**, on `codex/reconcile-platform-sources`. Core is **`6c3ac90692f94419e429ea363f55ac27000880f6`**. The generated assembly and isolated consumer fixture are under `.platform-reconstitution/integrated-validation-2026-11-04/`. This is local development evidence, not upstream canonical authority or a final consolidation certificate.

## Subsystem recovery and implementation

Retained platform Git commit `596948ed7b2e34e22f389844b4a837946b6aaf18` contains the modular semantic-mutation subsystem. Its exact object/history is preserved in the selected repository under `refs/recovery/semantic-mutation-596948ed`. The recovery candidate restored 183 domain source/resource paths and 38 historical test files, then recovered three missing dependency paths. The selected slot helpers and authored action-policy implementation were deliberately retained instead of restoring the historical private operation table or changing public slot defaults.

The recovered module closure covers action discovery and diagnostics, authority, editable contracts, choices, property operations, context bindings and references, create handlers, admission, deletion, restoration, reclassification and lifecycle dispatch. Its policy resources remain Sourcery-owned. No generic Expression Algebra export or opcode was invented.

Reconciliation wires explicit authored policy facts into action builders and removable-value helpers. Five historical fixtures now supply the selected stdlib policy. Acorn comparison confirms that **all 314 expected assertions across 90 historical cases** retain their expected expressions and test names. These are runtime contracts; names containing “algebra” do not establish executable algebra or semantic-zero status.

Two integration defects were corrected:

- The recovered property application failed to forward the actor and semantic index into authorization. Public-entrypoint tests exposed the missing actor; the fix preserves denial for an unauthorized actor.
- Scalar replacement emitted only a new positive fact. A later operation on the same subject could then fail cardinality admission because both values remained active. Scalar writes now emit retractions before the new positive fact. Repeated writes followed by collection mutation verify the resulting log. This is an explicit behavior correction, not a claim that every old delta is identical.

Six new public-entrypoint cases exercise property writes/removal/clear, repeated scalar replacement, authority/cardinality/unknown-operation refusals, discovery-to-execution, context attach/rename/detach, deletion/reclassification and registered versus unsupported creation. The 90 recovered cases, two existing action-policy cases and six integration cases give **98 semantic-mutation checks**. Effects are exercised through the in-memory mutation API; external persistence, production activation and scientific authority are not inferred.

`semantic-recovery.json`, `semantic-policy-reconciliation.json`, `semantic-promotion.json` and `semantic-contract-preservation.json` identify exact recovered bytes and subsequent changes. The isolated trial and its initial failures are retained.

## Dependency reconstitution

Two damaged dependency repositories are usable again through explicit local reconstitution. Missing files came from available remote history; every surviving local source file was preserved and retained. Original survivor archives and comparison manifests are indexed in `dependency-reconstitution.json`.

| Owner | Available remote base | Local reconstitution |
| --- | --- | --- |
| Epistemic Core | `a4a8178002839258fb205d86fd914d7794894ece` | `9e5f44d243079ad7e49d26d2e5a2c4b09ab48828` |
| Claimipedia Science | `0c4f8cb0ff551d4bd5a373e8e224031cfc6a4a10` | `dfc997a19ad77f3fcd825ffeb16106cecb9031eb` |

Epistemic Core exposes its retained sync-comparison records and entrypoint through explicit package exports. Claimipedia Science's restored duplicate indicator fixture now delegates to the existing Science Programme owner; value and function-identity checks pass. Three absent manifest-declared source junctions were created. No existing dependency junction was removed or traversed for deletion.

**The earlier exact local commits remain missing:** Epistemic Core `274a2a541789ee2e8b6576ec3aeb5d9651165338` and Claimipedia Science `647e065a69867ee767c5d9b7dac04bdce1946d19`. The new commits identify a reproducible local source choice; they do not pretend to recover that missing history.

## Assembly and current application verification

The fresh assembly uses the retained Core's normal byte-copy composer. It contains **13,269 composed files**, resolves **72 consumer entrypoints**, and checks **381 reachable SDK files and 36 semantic resources**. Runtime payload identity:

`6871f7389eeebcf668a57673123984121025aa1d4a49fb29de158411a6f14454`

The composed-layer proof is `sourcery/layer-composition-proof.v1`; the overall receipt is `sourcery/four-layer-assembly-proof.v1`. Generated manifests and sealed dependency inputs stay outside the source-only platform repository. Source and assembled SDK bytes match, and sampled filesystem identities confirm that retained source was not hardlinked into the artifact. This refresh supersedes the earlier `04ded46` assembly for this local candidate.

The four-layer completion check includes the retained Claimipedia journey projection. Separately, a fresh regular-file projection of **eight current consumer repositories, 7,522 files** verifies the current Claimipedia reader and its complete adjacent-source graph against the **assembled** SDK and shared-algebra packages. Runtime package links resolve only inside the generated consumer fixture or assembly. Claimipedia's three existing provenance edits are captured unchanged; they were not committed or overwritten.

| Suite | Source checkout | Against assembled packages |
| --- | ---: | ---: |
| Platform | 156/156 | Semantic subsystem 98/98 |
| Claimipedia Core | 71/71 | 71/71 |
| Claimipedia application and reader algebra | 35/35 | 35/35 |
| Epistemic Core, including component tests | 88/88 | 88/88 |
| Claimipedia Science | 15/15 | 15/15 |
| Science Programme | 51/51 | 51/51 |
| Qualification Runner | 24/24 | 24/24 |
| Git Receiving | 14/14 | 14/14 |
| Frontier Physics Programme | 99/99 | 99/99 |
| Shared Expression Algebra | 99/99, unchanged | Same captured source installed in assembly; consumed by the suites above |

Core, reader science, Science Programme and Qualification Runner source checks also pass. Claimipedia verification covers loopback boot, rendering, scientific/evidence traversal and refusals for writes, production scope, stale model identities and traversal. It remains a read-only, nonproduction reader and explicitly withholds scientific acceptance. No browser coverage or Linux native-library execution is claimed.

The first consumer run passed Claimipedia but exposed two qualification-fixture issues. Core's neutral-reader package copy excluded the entire installed package because its absolute ancestor path contained `node_modules`; the filter now considers paths relative to the package root, preserving every runtime assertion. Core and Frontier historical comparison tests also needed exact Git oracle objects inside the isolated fixture. Their independent Git metadata was supplied from preserved local histories. The initial receipts remain in `consumer-attempt-1/`; all nine final suites pass. These are overlapping observations from one engineering run, not independent confirmations.

## Retained migration status

All **83 retained semantic-mutation migration files** were executed individually without editing their originals. One original runtime file now passes. **82 still fail** because they require unavailable generic mutation APIs, missing historical REL declarations, a missing property-plan component, or differing public defaults/action contracts. Passing the restored domain runtime does not prove those alternate migration contracts. Exact failures and receipt hashes are in `semantic-migration-review.json` and `retained-semantic-results/`.

The fixed 145-file cohort now has **9 scoped qualified files and 136 unresolved**:

| Disposition | Files |
| --- | ---: |
| Previously ported unchanged runtime contracts | 2 |
| Previously qualified existing runtime contract | 1 |
| Explicit ownership/input amendments | 5 |
| Newly restored unchanged runtime contract | 1 |
| Missing shared-owner contracts | 90 |
| Missing platform source/exports | 26 |
| Missing other resources | 2 |
| Missing retained algebra declarations | 11 |
| Owner/input/default contract differences | 4 |
| Invalid retained syntax | 3 |
| **Total** | **145** |

These remaining requirements prevent a claim of completed migration or final clean-baseline certification. They do not erase the narrower passing source, assembly and current application evidence. All 145 original hashes still match. No algebra declarations were fabricated merely to satisfy textual assertions.

## Preservation and use

`preservation-identities.json` indexes ten verified complete Git bundles and source archives, plus the Core harness follow-up. Prior source/layer witnesses remain preserved by the preceding recovery and reconciliation audits. `prior-records/` and `live-records/` capture the authority-map, residual-ledger and domain-inventory transition. `final-integrity.json` records post-test consumer/SDK byte checks, clean selected repositories, Git connectivity and unchanged user/provenance diffs. Audit-local Git attributes preserve raw process-log bytes, including diagnostic whitespace and line endings.

The reusable local reader can be started against the assembled packages with an automatically allocated loopback port:

```powershell
node .platform-reconstitution/integrated-validation-2026-11-04/claimipedia-against-assembly/claimipedia/scripts/start.mjs 0
```

It prints its local URL and model identity. No service is left running by this audit.

To rerun the existing artifact's integrated checks from the main repository root:

```powershell
node tooling/maintenance/integrated-platform-baseline-2026-11-04/verify-assembly-consumers.cjs
```

For a fresh reconstruction, restore the pinned source commits and recorded Claimipedia working patch, the retained Core/capability/application layers, and the external dependency witness. In a workspace without this generated validation generation, run `assemble-reconciled.cjs` with `.platform-reconstitution/integrated-validation-2026-11-04/assembly`, then `prepare-claimipedia-assembly.cjs` and the verifier. The preparation script now imports the exact Core/Frontier qualification histories automatically. The scripts refuse to overwrite existing assembly/source fixtures. Use a distinct generation when rebuilding in this workspace; preserve these receipts rather than deleting them to reuse paths. `complete-consumer-qualification-inputs.cjs` records the original one-time fixture correction and is not an idempotent bootstrap script.

Next work should address the unresolved migration contracts as an explicit subsystem-level design/recovery decision, especially whether the unavailable generic mutation APIs are intended requirements or superseded by Sourcery-owned policy. Missing exact history recovery, cache-generation authority and research-output reproduction remain separate work. No retained checkout, cache or research output was deleted. Nothing was pushed, published or deployed.

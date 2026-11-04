# Browser conflict persistence, renderer/registry lifecycle and host effects

Selected source: `a5ced5348523bf12d18087ce4111213677e1cd99`. This chunk adds **11 bounded contract translations and 27 normative cases**, bringing the total to **73 contracts / 269 normative cases**, with **61 explicitly amended contracts** in 27 specification files. **351 of 424 retained declarations remain untranslated.**

## Changes

- Renderer and chart registration/resolution now distinguish own names from inherited JavaScript properties. Explicit own `constructor`, `toString` and `__proto__` adapters work; inherited names refuse. Duplicate/provider failures preserve the previously admitted registry.
- Persistence requires a nonempty server revision before accepting a save or conflict refresh. Authored retry counts must be safe nonnegative integers. A failure after an accepted save cannot enter the stale-write retry path. Legacy save success and a committed runtime receipt remain separate server evidence paths.
- Performance sinks and event emission cannot turn semantic success into failure or cause an accepted save to be replayed. DOM renderer measurement also contains observer faults.
- Returned invalid renderer controllers are disposed where possible. Authored-page mount failures clear partial DOM and preserve the original error despite disposal faults. Returned teardown is idempotent, and renderer disposal runs even if a frontend disposer fails. Semantic runtime source caching distinguishes object source identities.
- Motion and placement controllers release their local gesture before invoking external commit callbacks, so a thrown callback leaves no active gesture.

The cohort also witnesses metadata custody, actor-private projection filtering, keyed DOM identity, attribute render modes, event-wrapper replacement/removal and DOM controller disposal. Forty browser host tests use the actual public operations and shared runtime call sites. The predecessor fixture passes 21 and fails 19 of these same 40 checks; its exact Git blob identities, minimal import/export adaptations and raw output are retained in [predecessor-observation.json](predecessor-observation.json).

## Contract scope and preservation

Qualified subjects:

- module.browserConflictPersistence
- module.browserRendererLifecycle
- module.browserTelemetry
- module.browserCanvasEffects
- module.browserInteractionKernel
- module.projectionRuntimeRegistry
- module.semanticMutationRuntimeRegistry
- module.projectionMaterializationRuntime
- module.domRenderer
- module.projectedDomReconciler
- module.sessionEventCustody

The retained pure effect-planning and generic executor intent is explicitly amended to the selected current host seams. No general browser effect executor, complete canvas extraction, full hydration equivalence, dynamic import equivalence, concurrent registry initialization arbitration or arbitrary browser-host behavior is claimed. The separate retained inspector, startup, authored vocabulary/workbench and other untranslated declarations remain visible in [translation-ledger.json](translation-ledger.json).

All prior **62 contracts and 242 normative cases** retain their clauses, amendments, case definitions and selected retained-source identities. Six existing bindings refresh only the implementation SHA for frontend.mjs. Three shared specification files extend their subject sets; each prior subject's complete facts remain unchanged. This is recorded in [prior-semantic-preservation.json](prior-semantic-preservation.json).

## Verification

- Full source suite: **790 passed**, no failures or skips.
- Assembled application: **1138 checks across 15 suites**, including 356 semantic-translation checks, Core 72 and Claimipedia 35.
- Fresh ordinary-copy four-layer assembly: **13919 files**. Source/SDK/Core bytes, consumer snapshots, pre-existing consumer overlays, confined generated links and distinct source/artifact file identities were verified.
- Static runtime gate: **886 modules / 614 roots / 1825 source edges / 17 loading boundaries**.
- Both isolated Git-bundle bootstraps pass **eight stages**, including the prior 11 lifecycle and 28 publication-delivery tests plus all 40 new browser host tests, Core and Claimipedia verification. Both loopback readers return GET 200 and mutation POST 405, terminate afterward, and pass post-run tracked-byte checks.
- Repeated bootstrap identity: `f7f0edf63f4f0c70d05b6c33b45ed928b24f84c0594fa36515af7a98d2127303`. Both readers retain the preceding baseline's model, body, programme and writing-authority identities; see [reader-baseline-preservation.json](reader-baseline-preservation.json).
- Final integrity covers **37460 file observations**, the original 145 and selected 54 migration witnesses, all eight consumer sources/overlays, original main user diff, source bundles/archives and five Git connectivity checks.

Receipts: [assembly-proof.json](assembly-proof.json), [integrated-verification.json](integrated-verification.json), [bootstrap-comparison.json](bootstrap-comparison.json), [current-assurance.json](current-assurance.json), [final-integrity.json](final-integrity.json).

## Generated validation capacity

The previous run's two completed generated bootstrap checkouts were reclaimed after 17,760 current source-byte checks and verification of their committed receipts and complete source bundles. The link-aware deletion guard preserved its external junction target; 60 dependency links were unlinked without traversal. This run's completed assembly input staging directory was also retired after its provenance, representative source bytes and source bundles were verified; every removed regular file's hash is recorded. Both assembled artifacts, authoritative source checkouts, manifests, bundles, receipts, caches and research outputs remain. See [prior-bootstrap-reclamation.json](prior-bootstrap-reclamation.json) and [assembly-staging-reclamation.json](assembly-staging-reclamation.json).

## Remaining work and holds

The global audit still has **5074 physical finding identities / 5170 occurrences**, with zero unowned active semantic MJS. Qualified current behavior does not resolve generic executable algebra, all missing decomposition paths, thin/default-free architecture, dynamic effects or external pg/terser availability. Strict assurance drift remains unaccepted and the global goal remains incomplete.

The exact historical Epistemic and Science local commits remain unrecovered. Runtime caches and research outputs remain on their existing preservation/reproducibility holds. No branches were merged or pushed, no retained checkout or research output was pruned, and no production activation or scientific admission occurred. Main user edits and consumer provenance overlays remain preserved.

The next source-contract chunk can address retained inspector/startup and authored canvas workbench/vocabulary/diagnostic boundaries, using their current owners and separate host fixtures. Recovery and global architectural obligations remain independent of that qualification.

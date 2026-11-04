# Inspector/startup and authored canvas contracts — integrated baseline

Selected source: `e66a4630428da1e05fc96b28432e6fffbf7950b1`. This chunk adds **5 bounded translations and 36 normative cases**, bringing qualification to **78 retained contracts / 305 normative cases**, with **66 explicitly amended contracts**. **346 of 424 declarations remain untranslated.** The audit began on 4 November; observed-at timestamps record the actual runs.

## Changes and evidence

- **Inspector lifecycle.** Query/session identity is observed through the same public boundary used by the real inspector mount. Partial EventSource/window-listener setup rolls back acquired resources. Disposal attempts all listener removals, stream close, renderer disposal and container clearing, then propagates the first host fault, including null, zero or an empty thrown string. Repeated disposal is inert. Persisted pagehide parks publication callbacks; pageshow resumes them, and callbacks retained after disposal cannot mutate or render.
- **Workbench state.** Persistent and named-draft snapshots detach nested view-state values, omit transient editor buffers/history/callbacks/previews and retain the declared lens/inspection alias. Restore rejects malformed and non-record snapshots before mutation, clones incoming values and preserves current transient editor/history state. Prototype-named draft keys are own entries. Malformed persisted JSON cannot silently become a successful empty restore.
- **Startup.** Unknown declared formats and malformed asset records/lists refuse. Canonical empty asset lists override legacy aliases and fetched headers. Runtime asset identity includes both browser path and Node file. Deferred URLs must use HTTP(S) and the program origin; replacement-chain cycles refuse without re-requesting the same URL. Existing REL/S/B parsing remains with its current owning parsers; this qualification does not restore a generic multi-boundary merge or runtime-import admission.
- **Diagnostics.** Explanations preserve typed code or kind, subject/predicate/details/authority, transport status, cause kind and receipt/resolution references. Unknown thrown values receive an explicit unknown-runtime-failure issue. Diagnostic projection does not denote mutation success or admission.
- **Vocabulary.** The pinned AST catalogue contains **205 family/label entries across seven explicit syntax families**, including 19 widget types, 11 expression kinds, 27 action kinds, four lens modes and six list-target actions. The test checks every observed entry, its family and the primary renderer SHA. Public runtime vocabulary is projected from the constants used by the renderer. Computed/indirect labels, plugin extensions, slot schemas and complete Canvas interface closure remain unproved.

All **38 inspector/canvas tests** run in source, against the assembled SDK and in both isolated bootstraps. The bounded predecessor fixture executes 36 applicable tests: three pass and 33 fail; two newly introduced catalogue/API tests are explicitly skipped only in that historical fixture. Exact source blobs and minimal import/export adaptations are recorded in [predecessor-observation.json](predecessor-observation.json).

## Retained authority and preservation

Qualified subjects:

- module.frontendSessionInspectorRuntime
- module.browserStartupTransfer
- module.browserCanvasWorkbenchState
- module.browserCanvasAuthoredVocabulary
- module.browserCanvasDiagnostics

The vocabulary has two complete retained variants differing in their authority-effect declaration. The later declaration names `sdk/plugins/canvas/canvas-stdlib.rel` as canonical vocabulary authority. That coordinate is absent from the selected checkout and the local Git path history checked; no matching file was found in the retained copies searched. The new catalogue is strictly derived characterization and does not replace or reconstruct that missing schema. The variant choice and exact search scope are preserved in [retained-version-selection.json](retained-version-selection.json); recovery is not declared impossible.

All prior **73 contracts / 269 normative cases** retain their clauses, amendments, selected retained identities, public binding names and complete per-subject specification facts. Eleven existing frontend binding hashes refresh to the repaired implementation. Two shared specification files gain subjects while preserving all eight prior subjects verbatim as facts. See [prior-semantic-preservation.json](prior-semantic-preservation.json).

An initial source checkpoint `134dbc87e9786e6f099329ee3da8f4aad94a63db` passed 858 source checks and assembly. Final review added failure-identity, state-shape and fetched-asset-precedence fixes. Its raw receipts, source archive and bundle are retained under [initial-pass](initial-pass/README.md); its generated assembly was retired. Only the fresh final assembly and final source are qualified below.

## Final verification

- **864 source checks** (including one discovered helper module), no failures or skips.
- **1212 checks across 15 assembled suites**, including 430 semantic-translation checks, Core 72 and Claimipedia 35.
- Suite execution used one suite worker and one test-file worker to bound temporary disk usage; assertions and expected counts were unchanged.
- Fresh ordinary-copy four-layer assembly: **13921 files**; all selected SDK/Core bytes, eight consumer snapshots, existing provenance overlays and confined generated dependency links verified.
- Static module gate: **886 modules / 614 roots / 1825 source edges / 17 loading boundaries**.
- Both isolated Git-bundle bootstraps pass **nine stages**, retaining the prior 11 lifecycle, 28 delivery and 40 browser-host tests and adding all 38 inspector/canvas tests. Both loopback readers return GET 200 and mutation POST 405, stop afterward and pass post-run tracked-source byte verification.
- Repeated identity: `1fe01be6c961c498c3e8c0ba5b32452c49146b87640a78a561e34925ec5886f9`. Both readers preserve the previous baseline's model, body, programme and writing-authority identities.
- Final integrity covers **37468 file observations**, original 145 and selected 54 migration witnesses, all eight consumer sources/overlays, the original main user diff, source archives/bundles and five Git connectivity checks.

Receipts: [assembly-proof.json](assembly-proof.json), [integrated-verification.json](integrated-verification.json), [bootstrap-comparison.json](bootstrap-comparison.json), [reader-baseline-preservation.json](reader-baseline-preservation.json), [reader-shutdown-verification.json](reader-shutdown-verification.json), [final-integrity.json](final-integrity.json).

## Generated output disposition and remaining work

To preserve disk capacity, the preceding browser run's generated bootstrap clones and the older publication-validation output were reclaimed only after source-byte, committed-receipt and complete-bundle checks. A native junction guard confirmed that linked targets survive; links were unlinked without traversal. This task's preliminary assembly was separately retired after preserving its evidence. The latest prior browser assembly, authoritative source checkouts, bundles, archives, runtime caches and research outputs remain. The three scoped disposition receipts are [prior-bootstrap-reclamation.json](prior-bootstrap-reclamation.json), [superseded-publication-reclamation.json](superseded-publication-reclamation.json) and [initial-assembly-reclamation.json](initial-assembly-reclamation.json).

The global audit still records **5070 physical finding identities / 5161 occurrences**, with zero unowned active semantic MJS. Strict assurance drift is unaccepted and the global goal remains incomplete. No generic executable algebra, universal equivalence, production activation, scientific admission, native Linux qualification or cleanup certification follows from these same-run engineering checks.

Four retained browser declarations remain outside these cohorts: runtime defaults, runtime source boundaries, canvas hit testing and frontend network routing. Inspector mutation/editor/history branches, full canvas window/viewport persistence and arbitrary host implementations also remain outside this bounded qualification. The missing canonical Canvas schema and the exact earlier Epistemic/Science commits remain recovery obligations. Runtime-cache and research-output reproducibility holds remain unchanged. No branches were merged or pushed; original main user edits and consumer provenance overlays remain preserved.

# Browser action and composition contracts — integrated baseline

Selected source: `8400b0ee5cf6623df7a2848eef6268a7a955c14a`. This chunk translates the **eight remaining retained browser declarations**, adding **43 normative cases** and **44 focused composition checks**. Qualification now covers **90 retained contracts / 414 cases**, with **78 explicit historical amendments**. All **39 retained browser declarations** have bounded current translations. **334 of 424 declarations remain untranslated** across the wider repository graph; generic executable algebra and historical decomposition restoration remain unproved.

## Changes

- **Action dispatch and host composition.** Only own local action handlers execute before registered handlers; own prototype-named handlers remain valid. Host and local-handler maps stay frozen, teardown is consumed before mounting, operator/login redirects avoid acquiring unreached mount capabilities, and boot loaders settle before dispatch/announcement. Required targets reject malformed records and ambiguity instead of selecting the first match.
- **Deferred warmup.** Scheduler callbacks contain both synchronous and promise failures, report the fault once, and contain logging faults. Scheduling-registration failures retain their native identity. This does not add cancellation or arbitrary concurrent-mount arbitration.
- **Bootstrap.** Current REL/S/B parser ownership, inline program precedence, canonical empty-asset precedence, runtime source identity, fetched program headers, structured state witnesses and revision evidence are qualified through their current functions. Missing inline identity and invalid wire formats refuse. Successful transfer parsing returns a FactStore and retains parser provenance.
- **Authentication and conflict witnesses.** Session/login/logout use only reached endpoints; credential and CSRF request construction, explicit CSRF updates, 401 diagnostic requirements and failed-logout token preservation have direct checks. Conflict status/command/argument/revision replacement leaves unrelated runtime fields intact. Arbitrary JSON conversion faults do not imply atomic conflict-field replacement.
- **Optimistic persistence.** Accepted revision and server receipt/resolution identities are preserved. Committed receipts suppress duplicate intermediate rendering/publication; post-acceptance faults never cause another append. Stale writes refresh authoritative state, use bounded retry budgets, or project explicit conflict. Positive retry replays an actual authored emitting command through the real command owner and verifies the emitted fact in the durable lane; repeated refusal proves the append-attempt bound. Append-only history remains distinct from materialized active state.
- **Render composition and cleanup.** The global CSS style node is reused and invalid renderer diagnostics retain exact coordinates. Rollback attempts renderer disposal and container clearing while preserving the original mount failure. Final disposal attempts frontend teardown, renderer disposal and container clearing once, then rethrows the first escaping fault, including falsy values. Registry-owned plugin teardown faults retain their existing containment policy; asynchronous disposal completion is not newly guaranteed.
- **Inline payload, mount observation and task yield.** Parsed inline JSON must be a non-null non-array object; missing elements, malformed JSON and invalid shape have distinct refusals. Document lookup/text getter faults retain native identity. Mount details are stored before optional event dispatch with the same detail object. Scheduler yield is invoked once and awaited only when the browser and callable capability exist; native failures propagate.

Qualified subjects:

- module.frontendActionRuntime
- module.frontendBootstrapComposition
- module.frontendAuthPersistenceBoundary
- module.frontendOptimisticPersistence
- module.frontendRenderCompositionBoundary
- module.inlineStartupPayloadBoundary
- module.pageMountObservationBoundary
- module.browserTaskYieldBoundary

## Evidence and retained authority

[Seven predecessor counterexamples](counterexamples.json) execute exact `b3f3473` source bodies with recorded import rewrites and private helpers exposed. They establish inherited local dispatch, duplicate-target first-match routing, primitive inline acceptance, text-getter fault wrapping, synchronous warmup escape, mount rollback masking and teardown error replacement. They are selected boundary experiments, not a whole historical checkout or universal-equivalence claim.

The [retained review](cohort-retained-review.json) records all eight primary declarations and their full obligations. Optimistic persistence has four historical AlgebraModule variants: core semantic fields agree, while one variant omits the historical publication interpreter component. The selected complete declaration is pinned explicitly, all variants remain available, and current defaults/owners are explicit amendments in [retained-version-selection.json](retained-version-selection.json). Reintroduced specification coordinates do not retire the old decomposition findings.

All prior **82 contracts / 371 cases** preserve their clauses, amendments, selected identities, public binding names and complete per-subject facts. Fourteen implementation binding hashes refresh on the explicitly allowed frontend path. No earlier specification facts were rewritten. [Preservation receipt](prior-semantic-preservation.json).

The synchronous normative adapter observes immediate projections and effect invocation order; promise completion, actual async dispatch, network results, yielding and persistence completion are tested by the 44-check async suite. No unawaited normative projection is presented as async completion evidence. Initial source checks passed, then the positive-retry witness was strengthened to emit an authored fact. The first complete candidate also passed source, assembly and both bootstraps, but final review found an unintended argument forwarded by Promise.then. The zero-argument regression check refuses that candidate (43/44); an explicit zero-argument wrapper repairs it (44/44). Its receipts and source bundle remain under [initial-pass](initial-pass/README.md). Only the fresh final source and repeated gates qualify the final baseline.

## Final verification

- **1048 source checks**, zero failures or skips; one count is a discovered helper module.
- **1396 checks in 15 assembled suites**, including **614 semantic-translation checks**, Core 72, Claimipedia 35 and Frontier 99. [Integrated verification](integrated-verification.json).
- Fresh four-layer assembly using ordinary byte copies; **889 modules**, **617 roots**, **1835 static source edges**, **15 explicit dynamic boundaries**. [Assembly](assembly-proof.json), [runtime gate](assembled-runtime-module-verification.json), [semantic gate](assembled-semantic-contract-verification.json).
- Both isolated bootstraps pass **11 stages**, including all earlier lifecycle, publication, browser-host, inspector/canvas and browser-boundary suites plus the new composition suite. They produce the same semantic identity, serve reader HTTP 200, reject mutation with 405, verify source bytes after execution, and stop both readers. Model, response body, programme and writing-authority identities match the preceding browser-boundary baseline. [Bootstrap comparison](bootstrap-comparison.json), [reader preservation](reader-baseline-preservation.json), [shutdown](reader-shutdown-verification.json).
- Original 145 qualification hashes, 54 selected contract hashes, earlier semantic witnesses, all eight consumer sources and pre-existing overlays, source/artifact/bootstrap bytes and the original main user diff match. Five selected repositories pass Git connectivity checks. [Final integrity](final-integrity.json).

The previous performance changes remain in place: backward canvas scanning, allocation-free routing lookup and bounded platform validation concurrency. The artifact runner's initial hash pass now streams files with eight workers and awaits every required input hash before starting any suite. Its exact verifier accepts matching/restored bytes and refuses changed/missing files in [bounded negative controls](input-hash-guard-verification.json). The preflight records file count, concurrency and elapsed time. This chunk makes no new browser frame-time or end-to-end performance claim. Consumer suites remain serialized to bound temporary snapshots; all integrity reads remain required.

## Remaining work

The browser declaration cohort is covered at the stated bounded qualification level. The largest remaining group is **170 data-space plugin declarations**, followed by **51 core admissibility declarations**; other owners/domains make up the remaining 113. [Complete grouping](remaining-contract-groups.json). The next substantial platform chunk should translate the retained data-space publication/event/runtime contracts against current implementations, with the same assembly, consumer and isolated-bootstrap gates.

The canonical Canvas schema `sdk/plugins/canvas/canvas-stdlib.rel` remains missing from the selected checkout and searched local history; the derived vocabulary catalogue is not replacement authority. Exact earlier Epistemic commit `274a2a541789ee2e8b6576ec3aeb5d9651165338` and Science commit `647e065a69867ee767c5d9b7dac04bdce1946d19` remain recovery obligations. Recovery is not declared impossible.

Active semantic ownership is complete for the observed current source, but global architectural completion and strict drift acceptance remain false. Generic decomposition, dynamic execution authority, thin/default-free obligations and history recovery remain separate. There is no scientific acceptance, production activation or cleanup certification.

Only the preceding task's two generated bootstrap clones were reclaimed after committed receipt, all source/bundle hash and native junction-safety checks. Their evidence and bundles remain, as does the preceding assembled artifact. The superseded initial candidate bootstrap clones were likewise verified and retired; its assembly, consumer fixture, raw receipts and full source bundle remain. [Initial clone reclamation](initial-bootstrap-reclamation.json). Retained source copies, research output and runtime-cache generations were not pruned. [Reclamation receipt](prior-bootstrap-reclamation.json). The final source has a complete all-ref bundle and preserved source snapshot; no branches were pushed or merged.

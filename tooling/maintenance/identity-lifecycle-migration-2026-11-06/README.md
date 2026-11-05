# Identity lifecycle and resource custody checkpoint

Source **`710ba87766b73defdeb33bd9319338f9336b1938`** qualifies nine authored identity lifecycle protocols, explicit SQLite ownership and session lifetime refusal. This advances A2 under the [integrated closure plan](../integrated-baseline-closure-plan-2026-11-06/README.md). A2 and the overall baseline remain incomplete. Computer use remains paused.

The authored policy contains 196 expression roots and preserves all 44 predecessor SQL strings. Initialization, transaction, pruning, failure tracking, request authentication and logout use the existing canonical expression mechanism with explicit host ports. Prepared operations retain their original receiver and callable while checking current admission before invocation. The executor also admits bounded pure continuations, exercised by a non-auth counter.

The resource owner disposes acquired SQLite handles after initialization failure, closes even when checkpoint preparation fails, and retains retry custody when disposal fails. Rollback failure quarantines the connection before cleanup and preserves the exact primary fault. Authentication refuses a late claim after a clock hook disposes the owner. Real SQLite controls reproduce the predecessor construction and shutdown leaks and verify these corrections. [Resolution evidence](identity-lifecycle-resolution.json) records their finite scope and comparison limits.

## Qualification

All **2,257 source checks** passed: 2,256 assertions and one observation helper. [Assertion preservation](source-assertion-preservation.json) checks prior titles and multiplicities. The new suite adds 41 checks, including non-auth cache/event resources, real SQLite failures, exact falsy faults, data-only parameter changes and predecessor observable-order comparisons. The [source evidence](source-evidence.json) retains all 424 specifications, 88 owner specifications and current boundary correspondence.

The maintained managed runner passed **20 artifact suites / 2,605 checks**, assembly and Claimipedia gates, **424 retained contracts / 431 owner checks**, and **two 23-stage isolated bootstraps**. All 21 maintenance checks passed. [Checkpoint verification](closure-verification.json) confirms matching source identities, post-run bytes, preserved reader meaning, stopped readers, unchanged owner pins and original user edits, removed owned scratch and the released lease. Observed working usage peaked at 1,633,429,864 bytes. The audit archives 54 receipts totaling 8,507,755 bytes.

The complete source bundle was verified before qualification; its SHA-256 is `ae6a245f9a7c88d9e467c46757daad26d2d10c5547ead998f54c0e9642a04bb9`. Exact owner pins and tracked source hashes are in [the input profile](profile/bootstrap-inputs.json). The active graph has 897 runtime modules and 13 retained dynamic boundaries. Qualification does not establish native browser, external host, generic algebra or scientific acceptance.

## Open obligations and next work

[Remaining scope](remaining-scope.json) identifies async login/provider continuation, provisioning/link/status flows, projections, semantic-context authorization and diagnostics, and plugin/file/environment custody. Trusted synchronous callbacks are not sandboxed or awaited; acquisition callbacks retain responsibility for partial acquisition before returning. Prepared admission callbacks refuse by throwing. No complete auth or generic-effect claim follows from this checkpoint.

The unchanged architecture audit records **four additional finding IDs**: thick-module candidates for the resource owner and lifecycle adapter, and possible-hidden-default candidates for the lifecycle adapter and its test. No prior findings disappeared or were waived. A3/A4/A5 and the formal drift gates remain open.

[Exact retained Canvas controls](canvas-conformance-gaps.json) ran 16 assertions against the recovered dotted-path schema variants: all ten declaration assertions and three direct retained-adapter assertions pass; **three current-renderer compatibility assertions fail**. The current renderer reads semantic color roles as predicates, does not reject the supplied untyped grid-placement graph, and lacks the retained compatibility integration. These are real open S1/A2 obligations. No canonical schema variant was selected and no Canvas runtime source changed. The retained schema declaration alone is insufficient runtime evidence.

An [unselected async executor proposal](async-proposal-provenance.json) passed six [focused controls](async-proposal-final-tests.txt): explicit execution modes, yielding only at authored await points, exact synchronous/awaited faults, cancellation, opaque synchronous Promises and denial before effects. It is preparation for the next migration, outside the selected source and outside this qualification's check counts.

The four `author-*` / wiring utilities are one-shot predecessor migration records. Later corrections are present in the versioned final SDK policy and tests; these utilities are not final replay generators. The committed source and verified complete bundle provide the actual source identity. Earlier failed development reports remain as evidence and do not receive a passing disposition.

S1, native/external hosts, runtime cache reproduction, complete research-output reproduction, preservation-led consolidation and final certification retain their separate acceptance conditions. The selected development checkpoint is qualified; global completion remains false.

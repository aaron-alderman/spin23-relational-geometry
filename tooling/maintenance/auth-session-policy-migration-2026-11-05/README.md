# Auth and session policy integration

**Qualified source: `6698bb52af183333692335c979618e15c9a02c45`.** Verification passed **2,146 source checks**, **20 maintenance checks**, ordinary-copy assembly, **17 artifact suites / 2,494 checks**, standalone runtime and semantic gates, Claimipedia verification and both **20-stage isolated bootstraps**. Bootstrap identities match, reader meaning is preserved and both temporary readers are stopped. Computer use remains paused.

[Closing verification](closure-verification.json), [managed qualification](managed-receipts/qualification.json), [source assertions](source-assertion-preservation.json), [current architecture audit](current-assurance.json), [goal ledger](goal-progress.json).

The source total includes one nonasserting observation helper: 2,145 checks contain assertions.

Ten numeric defaults and their validation rules now live in the authored SDK policy document. A domain-independent adapter compiles and evaluates canonical expression-algebra expressions; the Node adapter loads the document. Cookie sessions, SQLite host identities, forwarded identity signing/verification and legacy snapshot retention use it. Cookie expiry decisions also execute the authored expressions. Existing content-addressed SessionStorePolicy selection and storage behavior retain their separate contract.

Valid defaults are preserved. Invalid/nonfinite or out-of-range limits now refuse before the selected provider, storage, database or key-parsing effects. Fractional limits and formerly clamped invalid inputs deliberately refuse. Environment TTL strings are explicitly parsed and validated. Epoch zero is valid; nonfinite clocks refuse. Already issued sessions retain their persisted expiry.

[Predecessor controls](predecessor-controls.json) reproduce an expired signed claim accepted with infinite skew or a NaN clock in the retained previous source. Current factories/verification refuse both. These are same-run engineering observations from one causal time-validation family, not independent scientific confirmations.

Sixteen focused checks cover authored changes without adapter edits, a separately authored field, accessor refusal, persisted cookie expiry/reopening, invalid policy effect ordering, malformed records, snapshot limits, SQLite lockout/session expiry, signed claim expiry, clock failures and environment trust. A recovery regression ensures an invalid reload clock cannot cause valid stored sessions to be classified as corrupt. Reload samples its clock before storage effects and outside file-corruption handling.

The initial source checkpoint `d252d872c590aafec2b25e1158fb67d3ced1cba8` passed 2,145 source checks. Its assembly was deliberately interrupted after the recovery edge case was found during review. The managed runner reclaimed that run's owned scratch and retained a failed-run receipt. The final source and profile include the recovery fix and sixteenth check. Initial inputs and logs remain identified as intermediate evidence. The complete final source bundle retains both implementation commits and their predecessor history.

All 336 translated specifications and 1,341 JSON cases are byte-identical to the preceding baseline. The 88 owner specifications, retained variants, clauses, amendments and named witnesses remain unchanged; four server implementation bindings are refreshed. Their 431 owner checks pass in integration. The explicit SDK inventory extension adds two modules, yielding 565 SDK runtime libraries and 892 reachable modules, with 13 current dynamic boundaries. Generic algebra, universal equivalence and execution admission remain unproved.

The maintained managed runner preserves all 15 base suites / 2,462 checks and the prior 16-check loading suite, then appends the 16-check policy suite to the artifact and both isolated bootstraps. Expected and observed totals match. Verification implementation hashes were captured before the final run and checked at closure. All pinned source owners and preserved working overlays still match. The original user diff remains byte-identical.

The managed run retained 8.06 MiB of receipts and observed 1.52 GiB of working data. Owned scratch, copied harness and lease are absent. Disposable materializations are explicitly retired; retained source/history archives, Context Hub state, runtime caches and research outputs were preserved.

The integrated baseline remains open: generic/thin/default-free architecture, remaining authentication/authorization and effect decomposition, dynamic execution authority, canonical Canvas authority, missing local history, native/browser and real connector verification, and cache/research-output reproducibility. Credential handling, crypto, randomness, cookie naming and identity schema still have their existing owners. This policy extraction does not certify the entire authentication subsystem or scientific/production admission.

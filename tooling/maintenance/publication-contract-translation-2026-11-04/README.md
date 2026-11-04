# Publication gate/editor and delivery contracts — integrated baseline

Selected source: `943cf0778da7291dbcecff85974a0ca06362a1b3`. This chunk adds **26 retained contract translations and 93 normative cases**, bringing the qualified total to **62 contracts / 242 normative cases**, with **50 amended contracts**. **362 of the 424 retained declarations remain untranslated.** These are bounded current-runtime qualifications; generic executable algebra, universal equivalence, historical private API restoration and global architectural completion remain unproved.

## Subsystem and repairs

The cohort contains all fifteen retained publication gate/parser/resolver contracts, five editor contracts, and six delivery contracts: metadata wire, pending custody, browser application, snapshot publication, delta append and lane reconciliation. Current DataSpace public parsing supplies the contexts previously passed to private helpers. The existing browser queue/publisher and delta append now have named public exports; a shared pure sessionDeltaRequest constructor is used by both the actual delta publisher and its normative request cases. Former decomposition paths are not restored by this change.

Concrete repairs:

1. **Cached graph ownership.** Cached expression leaves/groups now validate the expected expression-set owner before reuse. Same-owner object sharing remains; foreign-owner cache hits refuse. Previously a second set could receive a node belonging to the first set.
2. **Condition-group cycles.** Indirect condition-group cycles now refuse rather than returning a circular public graph. Expression-set cycle and self-edge refusals remain, and shared DAG descendants remain usable by editor indexes.
3. **Delivery preflight and ordering.** Named lane/runtime validation and checked pending-snapshot decoding happen before queue/lane changes. Missing destinations are explicit no-ops; unknown named lanes have typed refusals. Stale sequenced events preserve projection-update metadata. Backend and frontend high-water clocks remain separate, including duplicate-revision acknowledgements. Backend revision is no longer written before a failing delegated application.
4. **Sequence and fact identity.** Positive leading-digit sequence compatibility remains, but integers outside the safe range normalize to zero. Functional values and type memberships use unambiguous serialized coordinate tuples, preserving separate separator-bearing identities and retractions.
5. **Transfer consistency.** Session retrieval derives compatibility text from authoritative structured facts/S, including an explicit empty fact array. Stale supplied text cannot disagree with the returned fact store in those modes.
6. **Delta precondition errors.** Raw and JSON-null HTTP 412/428 responses now preserve stale-write/missing-precondition diagnostics instead of throwing a null-issues TypeError. Request projection preserves raw REL versus command JSON, If-Match, CSRF/trace and response-mode headers. Actual append tests cover body-level refusal, retained runtime evidence, no internal retry and the existing empty-body JSON-decode fallback.

Predecessor/current observations are in [predecessor-counterexamples.json](predecessor-counterexamples.json), [current-counterexamples.json](current-counterexamples.json), [predecessor-delivery-identity.json](predecessor-delivery-identity.json), [session-text-predecessor.json](session-text-predecessor.json), [session-text-current.json](session-text-current.json), [delta-predecessor-counterexamples.json](delta-predecessor-counterexamples.json) and [delta-current-counterexamples.json](delta-current-counterexamples.json). The delta predecessor was made observable with a named export before changing its implementation; its normalized function body was checked equal to the recorded b1578b1 body. Fetch was injected, so no external request was sent. These observations are one same-task engineering evidence family.

## Retained obligations and scope

Original source text, selected historical commit/path, SHA-256, subject facts and variants remain retained. The ledger rereads selected Git blobs. RuntimeSemanticContract specifications require all fourteen dimensions, explicit amendments, hash-bound current public exports and nonempty related cases. Previously translated RuntimeSemanticContract variants are excluded as original AlgebraModule authority. Passing cases do not establish universal equivalence.

The previous **36 contracts / 149 cases** keep their clauses, amendments, cases, public binding names/paths and specification bytes. Seven current binding hashes change for the repaired owning DataSpace parser; these updates are explicitly recorded in [prior-semantic-preservation.json](prior-semantic-preservation.json). Earlier selected contract tests and assertion hashes are unchanged.

| Added contract | Related normative cases |
| --- | ---: |
| module.browserPublicationApplication | 9 |
| module.browserPublicationLaneReconciliation | 12 |
| module.pendingPublicationCustody | 5 |
| module.publicationEditorFoundation | 8 |
| module.publicationEditorParse | 5 |
| module.publicationGateConditionExpressionParse | 5 |
| module.publicationGateConditionGroupParse | 3 |
| module.publicationGateConditionParse | 3 |
| module.publicationGateEditorComposition | 8 |
| module.publicationGateEditorLeaves | 8 |
| module.publicationGateExpressionConditionParse | 5 |
| module.publicationGateExpressionConditionResolver | 3 |
| module.publicationGateExpressionFlatten | 2 |
| module.publicationGateExpressionGroupParse | 4 |
| module.publicationGateExpressionGroupResolver | 5 |
| module.publicationGateExpressionResolver | 6 |
| module.publicationGateExpressionSetParse | 2 |
| module.publicationGateField | 4 |
| module.publicationGateGraphCompose | 9 |
| module.publicationGatePolicy | 5 |
| module.publicationGatePrecedenceEditor | 2 |
| module.publicationGatePrecedenceParse | 4 |
| module.publicationGateRequirements | 4 |
| module.sessionDeltaAppendNetwork | 4 |
| module.sessionPublicationWire | 13 |
| module.sessionSnapshotPublicationNetwork | 2 |

Some cases support related obligations; the new unique case count is 93. Reachable editor-index observations do not prove the private flatten helper's traversal count or standalone array API. Gate/editor qualification covers configuration and relationships, not external publication authorization or scientific release eligibility. General rollback for arbitrary caller getters/throwing substitute stores remains unproved. A false changed result concerns projection changes; a valid duplicate-revision acknowledgement may still advance its clock.

Zero/unsequenced delivery retains existing compatibility behavior and does not establish monotonic delivery guarantees. Unsafe sequences normalize to zero rather than gaining a new authority class. Snapshot/delta HTTP checks invoke the real current publisher with injected fetch observers; live service authorization/connectivity and the outer persistence retry policy are separate. The prior storage-key migration limit for colon/percent-bearing keys remains unchanged.

## Verification

**723 source checks passed**, with no failures or skips. The final ordinary-copy four-layer assembly contains **13914 files**. All **15 artifact suites / 1071 checks** passed, including 289 semantic/lifecycle/publication checks, Core 72 and Claimipedia 35. Runtime and semantic CLIs also pass against the generated proxy and actual ordinary-copy SDK. Source/SDK/Core copies and all eight consumer snapshots are checked by byte hash; the source-versus-assembly sample has separate file identities.

| Artifact suite | Checks | Result |
| --- | ---: | --- |
| assembled-prior-contracts-tests.txt | 14 | pass |
| assembled-architecture-tests.txt | 16 | pass |
| assembled-runtime-reconciliation-tests.txt | 10 | pass |
| assembled-postgres-driver-tests.txt | 3 | pass |
| assembled-semantic-tests.txt | 236 | pass |
| assembled-semantic-translation-tests.txt | 289 | pass |
| assembled-core-tests.txt | 72 | pass |
| assembled-migration-tests.txt | 105 | pass |
| assembled-reader-science-tests.txt | 15 | pass |
| assembled-epistemic-tests.txt | 88 | pass |
| assembled-qualification-runner-tests.txt | 24 | pass |
| assembled-claimipedia-tests.txt | 35 | pass |
| assembled-git-receiving-tests.txt | 14 | pass |
| assembled-science-programme-tests.txt | 51 | pass |
| assembled-frontier-tests.txt | 99 | pass |

The static catalogue remains **886 modules / 614 entry roots / 1,825 static source edges / 17 declared loading boundaries**. External pg/terser availability and dynamic execution remain unadmitted. See [integrated-verification.json](integrated-verification.json), [assembled-runtime-module-verification.json](assembled-runtime-module-verification.json) and [assembled-semantic-contract-verification.json](assembled-semantic-contract-verification.json).

Both final isolated Git-bundle bootstraps execute seven qualification stages: runtime CLI, semantic CLI, eleven prior lifecycle tests, twenty-eight publication delivery/network tests, Core source guard, Core 72 tests and Claimipedia 35 tests. Each serves a real loopback reader (GET 200 / POST 405), stops it in cleanup and verifies tracked source bytes afterward.

| Observation | Run A | Run B |
| --- | --- | --- |
| Semantic gate | 62 contracts / 242 cases | 62 contracts / 242 cases |
| Publication suite | 28 pass | 28 pass |
| Reader model | 661dbb2f1f6562b4613b9dc1eb8543415a14e1f9e661d9dcba6c7da017b3f3e7 | 661dbb2f1f6562b4613b9dc1eb8543415a14e1f9e661d9dcba6c7da017b3f3e7 |
| Root body SHA-256 | d7cbfbe0d08d33e3f76d04021a5d80491f2e5b2c3eaa9fa7a74185596c26dcb4 | d7cbfbe0d08d33e3f76d04021a5d80491f2e5b2c3eaa9fa7a74185596c26dcb4 |
| GET / POST | 200 / 405 | 200 / 405 |

Stable identity matches across the final runs:

`b6375d22572f8e7a50db6cac7599c8f0ffc5ddd179ef9aee191fd950071c9b18`

Reader model/body remain unchanged from the prior baseline. Destination, Git metadata, ephemeral URL, timing and process identity are explicitly excluded from stable comparison. Repeated local Windows/Node runs are not independent scientific corroboration, Linux/native-browser qualification, fresh upstream acquisition or production admission.

## Intermediate passes and resource recovery

The successful 25-contract pass at b1578b1 is preserved in [first-pass/manifest.json](first-pass/manifest.json), including its assembly and both bootstrap receipts. The closing ledger then exposed the additional sessionDeltaAppendNetwork sibling, which was included before final qualification. The original intermediate source stdout file was inadvertently reused before archival; its observed 709/0/0 summary is retained explicitly, while the complete final 723-check stdout is preserved. Initial new network-test assertion failures concerned decoded fact provenance fields; the final assertions check canonical fact coordinates without weakening prior tests.

The first expanded validation attempt hit ENOSPC during assembly copying and isolated Core fixture creation. Its logs/inputs are preserved under [resource-failed-pass/manifest.json](resource-failed-pass/manifest.json). Only this task's generated intermediate/failed validation trees were reclaimed after source bundles and receipts were verified. A native junction guard proved that deletion unlinks links without traversing their targets; 150 generated links were unlinked separately. [generated-validation-reclamation.json](generated-validation-reclamation.json) records the exact allowlisted paths and counts. Retained source checkouts, runtime caches and research outputs were outside the deletion allowlist. The final run uses fresh destinations and the unchanged sealed source.

## Closing integrity and remaining work

The closing receipt verifies **37432 file observations**, all 145 original witness hashes, all 54 selected migration witness hashes, prior semantic witnesses, eight consumer sources and their pre-existing overlays, source/SDK/Core copies, verified archive hashes and the original main working diff. Five selected repositories pass connectivity checks. Complete bundles and regular-file archives are retained at `C:/Users/aaron/grand-theory/.platform-reconstitution/bundles/publication-contract-complete-preservation-2026-11-04`. See [final-integrity.json](final-integrity.json), [baseline-summary.json](baseline-summary.json) and [translation-ledger.json](translation-ledger.json).

Current global observation: **5089 physical finding identities / 5191 occurrences**, zero unowned active semantic MJS and completion false. Missing historical interpreter components, remaining subject gaps, thin/default-free obligations, legacy regex/current AST baseline incompatibility and generic algebra remain open. Newly present shared specification resources do not qualify their missing sibling declarations. No original generic decomposition is retired by these translations.

Exact missing Epistemic Core and Claimipedia Science local histories remain unresolved. Runtime-cache/output reproducibility holds remain. No retained checkout retirement, production activation, scientific acceptance, push, merge or cleanup certification is granted. Previous root records and new live records are both retained; the main checkout's existing user edits and untracked work remain outside the audit commit.

The remaining 362 declarations include browser conflict persistence, renderer/registry lifecycle and host-effect boundaries. Those remain separate work rather than being inferred from this publication cohort's tests.

Source verification from the selected checkout:

~~~powershell
node --test --test-concurrency=1
node scripts/check-runtime-modules.mjs
node scripts/check-semantic-contracts.mjs
~~~

Bound assembly/bootstrap helpers require fresh destinations; use a fresh audit/destination for another run rather than overwriting these receipts.

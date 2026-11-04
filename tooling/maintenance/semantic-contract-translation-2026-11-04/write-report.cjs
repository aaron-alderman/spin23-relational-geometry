const fs=require('fs'),path=require('path'),audit=__dirname,read=n=>JSON.parse(fs.readFileSync(path.join(audit,n))),summary=read('baseline-summary.json'),integrity=read('final-integrity.json'),ledger=read('translation-ledger.json'),assurance=read('current-assurance.json'),a=read('bootstrap-a.json'),b=read('bootstrap-b.json'),document=JSON.parse(fs.readFileSync(path.resolve('.platform-reconstitution/sourcery-platform-reconciled/assurance/semantic-contract-translations.json')));
fs.writeFileSync(path.join(audit,'README.md'),`# Retained semantic contract translation — integrated admission and fact-state cohort

Platform source: \`${summary.platform}\`; Core: \`${summary.core}\`. This chunk translates **22 retained contracts** at the Sourcery admission, fact-state and page-boot boundary, with **82 normative behavioral cases** and **10 explicit contract-amendment records**. It does not claim all retained semantic contracts are translated: **402 of the 424 retained declarations remain outside this qualified cohort**. Global architectural completion, universal equivalence and generic executable algebra remain unproved.

## What was translated

The cohort covers diagnostic vocabulary/normalization/deduplication/errors; source and actor authority; extension and unrestricted authority observed through their current owning policies; proposal input and normalization; declaration diagnostics/specialization; persistence model and boot-profile adapters; page-boot projection/identity; lifecycle backing/admission; fact queries; and runtime diagnostics/redaction.

Exact retained subject facts are kept with their Git commit/path, complete source text and SHA-256 in \`assurance/retained-semantic-contracts.json\`. Selected historical Git blobs were reread from the local object store for this audit; their identities are recorded in [translation-ledger.json](translation-ledger.json). Retained alternative variants are preserved. Fact-query variants do not silently become current authority: the current API/default policy is an explicit amendment. Sparse boot-profile reconstitution facts remain preserved alongside the new specification.

Current specifications are typed **RuntimeSemanticContract**, not recovered AlgebraModule implementations. They retain all fourteen required semantic dimensions and explicitly record changed dimensions. Source-kind assurance accepts that type only after the translation gate passes. The gate checks retained statements, current source hashes/exports, specification bytes, operation/case implementation identity, nonempty related witnesses and authority limits, then executes the cases. It refuses stale or fabricated bindings, altered obligations, missing amendments, changed resources, empty expectations and authority escalation. This is bounded runtime qualification; the existence of fields or passing examples is not a universal equivalence proof.

| Current contract | Cases | Amended dimensions |
| --- | ---: | --- |
${document.records.map(r=>`| ${r.subject} | ${r.cases.length} | ${r.amendments.map(a=>a.field).join(', ')||'none in the fourteen dimensions'} |`).join('\n')}

Some cases support related obligations at a shared public boundary; the case total counts each case once. Private helper exports are not restored implicitly. Unproved additional retained fields and limits remain explicit in the translation records.

## Four concrete implementation repairs

1. **Page-boot active values and source forms.** The retained falsifier says a negated lane binding must not remain active. The predecessor removed it for arrays but retained it for a FactStore, and its one-value fast path could return a retracted or absent historical value. The new domain-owned helper resolves the same active history for arrays, stores, buffers and iterable/toArray sources. Latest active values, reassertion ordering, default empty values and view identities are covered. An independent bounded history oracle checks 341 histories in both array and store form.
2. **Fact-query coordinate identity.** The predecessor joined subject/predicate/object with a delimiter that could itself occur in coordinates. Two distinct facts collapsed, and retracting one could remove the other. Active folding now uses an unambiguous serialized tuple. The original collision/retraction counterexample and a 125-coordinate delimiter-bearing product are checked, preserving separate active and history modes.
3. **Proposal fast-path validation.** An object marked \`kind: fact-proposal\` could bypass identity validation and return invalid subjects/predicates unchanged. Existing proposals now pass the same identity validation before their identity is preserved. New proposals still freeze the same containers; valid existing proposals retain their existing identity and mutability. No admission authority is granted by normalization.
4. **Required boot fields and types.** The current adapter could return a retracted field and silently accept an omitted type constraint. It now uses active values, requires an explicit empty string or type identity, and produces ordered multiplicity/missing/reference/type diagnostics. Unknown boot kind does not remove an explicitly requested field requirement. Retracted types do not establish reference eligibility.

Actual predecessor observations remain in [predecessor-counterexamples.json](predecessor-counterexamples.json) and [predecessor-required-field.json](predecessor-required-field.json), against source \`809e989971a9b636c74e778bb7c7ba204e17cd98\`. These are same-task engineering counterexamples, not independent scientific evidence.

## Explicit compatibility limits

- Proposal input/private extension helpers are qualified through current public owning boundaries; standalone helper API equivalence is unproved.
- The current persistence model is a shallow copy of all supplied fact entries, not the old typed-index/cache object. Inspector/profile adapters append diagnostics and return undefined. The old model API is not represented as restored.
- Actor lookups require compatible authored semantic authority policy facts; missing policy refuses. Empty proposals and explicit-subject/generated-subject paths have separate witnesses.
- Fact queries retain current compatibility defaults and their source/view API. The retained strict no-implicit-default generic expression graph, its receipt model, serialization and buffer-mutator equivalence are not qualified by this cohort.
- Runtime diagnostic formatting requires valid object-like issue records; null inputs and explicit redactor refusals propagate. Universal totality for arbitrary JavaScript values is not asserted.

The prior 54 selected contract tests, case names and expected assertion ASTs are unchanged. The only prior specification-receipt update is the hash of the boot-profile resource extended with the runtime specification; the original sparse intent facts remain. [specification-receipt-update.json](specification-receipt-update.json) records that change. The runtime inventory test changes from 558 to 559 for the added page-boot projection helper.

## Integrated verification

**524 source checks** passed with no failures or skips, including one helper module discovered by Node. The focused cohort contributes **90 tests**: 82 behavioral cases and eight integrity/refusal/property controls. A fresh ordinary-copy assembly contains **${summary.assemblyFiles} files**; all **15 artifact suites / ${summary.artifactChecks} checks** passed. Both the current runtime catalogue CLI and semantic translation CLI then passed against the generated platform proxy and ordinary-copy assembled SDK. No retained-source shortcut or source hardlink was used.

| Artifact suite | Checks | Result |
| --- | ---: | --- |
${summary.artifactSuites.map(r=>`| ${r.receipt} | ${r.expectedTests} | pass |`).join('\n')}

The current catalogue covers **886 modules / 614 entry points / 1,825 static source edges** and 17 declared loading boundaries. Dynamic execution and external pg/terser availability remain separate and unadmitted by this gate.

Both isolated local Git-bundle bootstraps ran the runtime and semantic gates, Core's source check and 72 tests, Claimipedia's 35 tests and a real loopback reader. Both served GET 200, refused POST 405, stopped their reader processes and verified source bytes afterward. Stable source/model/body/writing-authority identity matched:

\`${summary.bootstrap.sourceIdentity}\`

| Observation | Run A | Run B |
| --- | --- | --- |
| Semantic gate | 22 contracts / 82 cases, pass | 22 contracts / 82 cases, pass |
| Model | ${a.reader.model} | ${b.reader.model} |
| Root body SHA-256 | ${a.reader.bodySha256} | ${b.reader.bodySha256} |
| GET / POST | ${a.reader.status} / ${a.reader.mutationStatus} | ${b.reader.status} / ${b.reader.mutationStatus} |

Location, Git metadata, timing, process identity and ephemeral ports are excluded from the stable comparison explicitly. These are repeated local Windows/Node engineering checks, not independent scientific corroboration, fresh upstream acquisition, browser/native Linux qualification or production admission.

## Remaining assurance and preservation

All 424 retained declarations have ledger rows. **22 have bounded current translations; 402 do not.** The three other former persistence-foundation declarations now have a missing-subject finding at the newly present specification resource; they are not treated as translated or retired. Old component/interpreter paths remain separately unresolved. Changed finding identities are mapped in [translation-ledger.json](translation-ledger.json), distinguishing qualified specifications from re-expressed gaps.

Current global observation: **${assurance.report.findings.length} physical finding identities**, ${assurance.report.summary.findingOccurrences} occurrences, zero unowned active semantic MJS. Legacy regex/current AST baseline incompatibility, thin/default-free obligations, source-history gaps and generic algebra remain open. Missing exact Epistemic Core/Claimipedia Science local histories are not claimed recovered. Cache/output reproducibility holds remain. No production activation, scientific acceptance, push, merge, retirement, pruning or cleanup certification occurred.

Closing checks verified **${integrity.filesVerified} captured file observations**, all 145 retained original hashes, the unchanged 54 selected contract hashes, earlier selected semantic witnesses, eight prior contract witnesses, all eight consumer sources and pre-existing overlays, both bootstrap trees, assembled SDK/Core bytes and the original main working diff. Five clean selected repositories passed Git connectivity checks. Final platform/Core/Claimipedia archives and the exact source bundle are preserved. [bootstrap-inputs.json](bootstrap-inputs.json) identifies reused immutable owner bundles and the new platform bundle; final snapshots are in \`.platform-reconstitution/bundles/semantic-contract-translation-final-preservation-2026-11-04/\`.

Key records: [baseline-summary.json](baseline-summary.json), [final-integrity.json](final-integrity.json), [current-assurance.json](current-assurance.json), [assembly-proof.json](assembly-proof.json), [integrated-verification.json](integrated-verification.json), [assembled-semantic-contract-verification.json](assembled-semantic-contract-verification.json), [bootstrap-comparison.json](bootstrap-comparison.json). Metadata before/after this transition is preserved in \`prior-records/\` and \`live-records/\`. Earlier failing integration checks remain in \`first-source-tests.txt\`; the stale specification receipt and source-checker custody gap were corrected without weakening the tests.

Reproduce the semantic gate, or a complete bootstrap with the pinned inputs and a nonexistent destination:

~~~powershell
node .platform-reconstitution/sourcery-platform-reconciled/scripts/check-semantic-contracts.mjs
node .platform-reconstitution/sourcery-platform-reconciled/scripts/run-local-bootstrap.mjs tooling/maintenance/semantic-contract-translation-2026-11-04/bootstrap-inputs.json <fresh-destination> <receipt.json>
~~~

The next coherent translation cohort is the retained routing/publication and lifecycle/effect contracts whose current entry points are present. Apply the same retained-variant, explicit-amendment and behavior-witness discipline; do not bulk accept the remaining declarations from structural coverage alone.
`);

const fs=require('fs'),p=require('path'),read=n=>JSON.parse(fs.readFileSync(p.join(__dirname,n))),summary=read('baseline-summary.json'),assurance=read('current-assurance.json'),ledger=read('translation-ledger.json'),cohort=read('new-cases.json'),integrity=read('final-integrity.json'),a=read('bootstrap-a.json'),b=read('bootstrap-b.json'),previous=read('../semantic-contract-translation-2026-11-04/bootstrap-comparison.json');
const root=p.resolve('.platform-reconstitution/sourcery-platform-reconciled'),document=JSON.parse(fs.readFileSync(p.join(root,'assurance/semantic-contract-translations.json'))),newRows=document.records.filter(r=>cohort.subjects.includes(r.subject));
const table=newRows.map(r=>`| ${r.subject} | ${r.cases.length} | ${r.amendments.map(a=>a.field).join(', ')} |`).join('\n');
const text=`# Routing/publication and lifecycle/effect contracts — integrated runtime baseline

Selected platform source: \`${summary.platform}\`. **14 additional retained contracts** have bounded current-runtime translations. The combined qualification is **36 contracts / 149 normative cases**, with **24 amended contracts**; **388 of the 424 retained declarations remain untranslated**. This is a qualified local integration baseline. Global architectural completion, historical private API restoration and generic executable algebra remain unproved.

## Cohort and concrete repairs

The new cohort covers route declaration admission, publication foundation/member/identity/navigation/placement/requirement parsing, trusted publication-card projection, keyboard and pointer routing, surface history, durable browser lane storage and frontend runtime registration/lifecycle. It adds 67 normative cases and eleven asynchronous lifecycle/property integration tests. The original 22 qualified contracts and 82 cases retain their clauses, amendments, binding bytes and specification identities; [prior-semantic-preservation.json](prior-semantic-preservation.json) checks that preservation.

Three implementation families were repaired:

1. **Route active history and index freshness.** Each public validation call now owns a fresh active fact snapshot. Retractions remove prior assertions, reassertions restore current eligibility, and a caller-mutated array cannot authorize a stale cached index. The tests cover arrays, stores, wrappers and toArray adapters, typed refusals and a separate 64-history last-polarity oracle. This does not restore the retained generic route/command/argument algebra or grant execution permission.
2. **Frontend own-action identity.** Registration and lookup now distinguish own registrations from inherited Object prototype names. An explicitly registered toString, constructor or __proto__ action is supported; absent inherited names resolve to null, and duplicate own names still refuse. Existing action/hook interfaces remain. Injected lifecycle tests exercise forward mounting/refresh, reverse and idempotent cleanup, partial-mount rollback, invalid mount results, contained teardown faults and preservation of previously admitted registry state after failed initialization.
3. **Storage coordinate identity.** Previously distinct project/partition/lane tuples could share a colon-joined key. Each coordinate now escapes percent and colon before joining. Ordinary keys are unchanged; a 216-tuple product and explicit colon/escape-marker cases check collision isolation. **Previously stored keys containing colon or percent need an explicitly owned migration. There is no automatic ambiguous legacy-key fallback.** Snapshot version 1 remains the existing wire discriminator. Injected storage tests verify round trips, missing/corrupt/wrong-version records and exact get/set failure identity.

Actual predecessor observations are retained in [predecessor-counterexamples.json](predecessor-counterexamples.json) and [storage-key-predecessor.json](storage-key-predecessor.json); current observations are in [current-counterexamples.json](current-counterexamples.json) and [storage-key-current.json](storage-key-current.json). The predecessor is \`1a7526d40dea6b5abeaf5f4cc540b7b447ecb6f3\`. These are same-task engineering counterexamples, not independent scientific confirmations.

## Retained obligations and amendments

Original historical source text, selected Git commit/path, SHA-256, subject facts and alternative variants remain in the source retention document. This audit rereads the selected historical Git blobs; [translation-ledger.json](translation-ledger.json) records the comparison. Previously translated RuntimeSemanticContract specifications are excluded from selection as original AlgebraModule authority.

The specifications have fourteen explicit semantic dimensions, current public implementation bindings, nonempty checked cases and explicit amendments. They are RuntimeSemanticContract records admitted only after the semantic gate passes. Retained extra dimensions, removed decomposition files and universal equivalence remain unproved. Public DataSpace parsing qualifies selected publication obligations through the current owner; former private parser exports are not restored. The complete explicit DataSpace configuration supplies the active asset/result sets and expected publication contexts used by those private obligations.

| Added contract | Related normative cases | Amended dimensions |
| --- | ---: | --- |
${table}

Cases may support related obligations; the new unique case count is 67. Native browser integration, arbitrary dynamic source loading, full publication shadow/optional-field coverage, every generic helper API and exhaustive equivalence are outside these bounded checks. Asynchronous lifecycle checks are an additional real suite, not counted as serialized semantic-gate cases.

## Assembly and consumer verification

**602 source checks passed**, including one discovered helper module, with no failures or skips. The ordinary-copy four-layer assembly contains **${summary.assemblyFiles} files**. All **15 artifact suites / ${summary.artifactChecks} checks** passed, including 168 semantic translation/lifecycle checks, Core's 72 checks and Claimipedia's 35. The current runtime catalogue and semantic translation CLIs also passed against copied qualification tooling and the actual assembled SDK. The source-versus-artifact sample has different file identities; SDK copies and consumer snapshots were hash-checked.

| Artifact suite | Checks | Result |
| --- | ---: | --- |
${summary.artifactSuites.map(r=>`| ${r.receipt} | ${r.expectedTests} | ${r.passed?'pass':'FAIL'} |`).join('\n')}

The static runtime catalogue remains **886 modules / 614 entry roots / 1,825 static source edges / 17 declared loading boundaries**. It does not establish external pg/terser availability or admit dynamic execution. See [integrated-verification.json](integrated-verification.json), [assembled-runtime-module-verification.json](assembled-runtime-module-verification.json) and [assembled-semantic-contract-verification.json](assembled-semantic-contract-verification.json).

Initial source checks correctly refused stale generated inventory/catalogue receipts. The final refresh generates the MJS inventory, then the domain inventory, then observes exact current source paths and regenerates the runtime graph. The closing full global audit independently verifies that graph. Initial and intermediate failure receipts remain; no existing assertion was relaxed to make qualification pass.

## Both isolated bootstraps

Both bootstraps materialized fresh local repositories from verified complete Git bundles and exact retained overlays, using only the recorded executable and dependencies. Each executed six qualification stages: runtime catalogue CLI, semantic CLI, eleven lifecycle/property tests, Core source check, Core 72 tests, and Claimipedia 35 tests. Each then started a real loopback reader, observed GET 200 / POST 405, stopped the process in cleanup and verified tracked source bytes afterward.

| Observation | Run A | Run B |
| --- | --- | --- |
| Semantic gate | 36 contracts / 149 cases, pass | 36 contracts / 149 cases, pass |
| Lifecycle suite | 11 pass | 11 pass |
| Model | ${a.reader.model} | ${b.reader.model} |
| Root body SHA-256 | ${a.reader.bodySha256} | ${b.reader.bodySha256} |
| GET / POST | ${a.reader.status} / ${a.reader.mutationStatus} | ${b.reader.status} / ${b.reader.mutationStatus} |

The stable source/model/body/writing-authority identity matches across the two runs:

\`${a.sourceIdentity}\`

It changes from the previous source baseline's \`${previous.sourceIdentity}\` because the selected source changes. Model and reader body remain unchanged. Locations, Git metadata, timing and ephemeral ports are explicitly excluded from stable comparison. These repeated local Windows/Node observations are one engineering evidence family, not independent scientific evidence, fresh upstream acquisition, Linux/browser qualification or production admission. See [bootstrap-comparison.json](bootstrap-comparison.json), [bootstrap-a.json](bootstrap-a.json), [bootstrap-b.json](bootstrap-b.json) and [bootstrap-inputs.json](bootstrap-inputs.json).

## Closing integrity and remaining work

The closing check verifies **${integrity.filesVerified} file observations**, all 145 original witness hashes, all 54 selected migration witness hashes, previous semantic witnesses, all eight consumer source snapshots and their pre-existing overlays, exact source/SDK/Core projections, archive hashes and the original main user diff. Git connectivity checks pass for the selected platform, Core, shared algebra, Epistemic Core and Claimipedia Science. Complete bundles and regular-file archives are retained at \`${summary.preservationRoot.replaceAll('\\','/')}\`. No link traversal or checkout retirement was performed. [final-integrity.json](final-integrity.json) contains the closing receipt.

The prior root records and new live records are both retained in this audit. Previous selected source metadata is cloned before the new candidate is recorded, so the previous commit remains intact. The main checkout's two pre-existing tracked edits and existing untracked work remain outside the audit commit.

The closing main-diff guard caught a case runner writing its new output into the previous audit folder. That output was preserved in this audit, the old receipt was restored byte-for-byte from its Git blob, and the runner was copied here. The closing check then passed with the original user diff unchanged. [audit-boundary-restoration.json](audit-boundary-restoration.json) records the exact hashes and correction.

The current global audit has **${assurance.report.summary.findings} physical finding identities / ${assurance.report.summary.findingOccurrences} occurrences**, zero unowned active semantic MJS and architectural completion false. Historical regex/current AST baseline incompatibility, missing component/interpreter paths, thin/default-free obligations and generic algebra remain open. The newly present shared specification resources still have explicit missing-subject findings for unqualified sibling declarations; their former source-missing findings are re-expressed rather than treated as semantic resolution. No prior decomposition is retired by this translation. The ledger distinguishes those changes.

The exact missing Epistemic Core and Claimipedia Science local histories remain unresolved. Runtime-cache/output reproducibility holds remain. No production activation, scientific acceptance, push, merge, pruning, retirement or cleanup certification is granted.

The next coherent semantic chunk is the remaining publication gate/editor and publication delivery contracts, together with their current owning parser/network boundaries, followed by the same assembly/Claimipedia/bootstrap verification. The broader untranslated set is 388, not a claim that all remaining work belongs to one subsystem.

Read-only/source verification commands from the selected source checkout:

\`\`\`powershell
node --test --test-concurrency=1
node scripts/check-runtime-modules.mjs
node scripts/check-semantic-contracts.mjs
\`\`\`

Assembly/bootstrap helpers in this audit are bound to their captured pins and fresh destinations. Repeat them in a fresh audit/destination rather than overwriting these receipts.
`;
fs.writeFileSync(p.join(__dirname,'README.md'),text);console.log({report:'README.md',source:summary.platform,sourceChecks:602,artifactChecks:summary.artifactChecks,contracts:36,remaining:388});

const fs=require('fs'),p=require('path'),a=__dirname,read=n=>JSON.parse(fs.readFileSync(p.join(a,n))),write=(n,d)=>fs.writeFileSync(p.join(a,n),JSON.stringify(d,null,2)+'\n');
const summary=read('baseline-summary.json'),ledger=read('translation-ledger.json'),controls=read('regression-negative-controls.json'),old=read('prior-semantic-preservation.json'),integrity=read('final-integrity.json');
if(summary.qualifiedSemanticContracts!==149||summary.semanticCases!==619||!controls.allControlsDetected||!integrity.mainUserDiffUnchanged)throw Error('Completed cohort receipts required');
const groups={};for(const row of ledger.rows)if(row.status==='not-translated-in-this-cohort'){const key=row.repository+':'+row.source;(groups[key]||=[]).push(row.subject);}write('remaining-contract-groups.json',groups);
const bootA=read('bootstrap-a.json'),bootB=read('bootstrap-b.json'),readerKeys=['model','bodySha256','programme','writingAuthority'],before=JSON.parse(fs.readFileSync(p.join(a,'../data-space-runtime-translation-2026-11-05/bootstrap-a.json'))).reader;
for(const r of [bootA.reader,bootB.reader])for(const key of readerKeys)if(JSON.stringify(r[key])!==JSON.stringify(before[key]))throw Error('Reader semantics changed: '+key);
write('reader-semantic-preservation.json',{keys:readerKeys,before,afterA:bootA.reader,afterB:bootB.reader,unchanged:true,sameRunEngineeringEvidence:true});
const review=read('cohort-retained-review.json');write('retained-version-decisions.json',{records:review.records.map(r=>({subject:r.subject,source:r.source,variantCount:r.variants.length,completeVariants:r.variants.filter(v=>v.facts.isa?.includes('AlgebraModule')).map(v=>v.commit),qualification:'bounded-current-runtime-behavior',genericRestorationProved:false})),noHistoricalVariantsDeleted:true});
fs.writeFileSync(p.join(a,'README.md'),`# Data-space resolution and validation — integrated checkpoint

Selected source: \`${summary.platform}\`. This cohort adds **36 bounded contract translations**, **92 normative cases** and **13 focused checks**. Current coverage is **149 retained contracts / 619 normative cases**, with **137 explicit amendments**. **275 of 424 declarations remain untranslated.** This checkpoint does not certify the full integrated platform goal.

## Changes and evidence

- Resolution now compares collision-free serialized string tuples. Distinct effective values and kinds containing the old separator remain conflicts. Own-property source-layer lookup gives unknown and prototype-named layers the retained explicit zero rank. Winning objects retain identity and caller arrays remain unchanged.
- Single-key and composite uniqueness resolve fields from the active parsed inventory. The missing deferred helper no longer throws. A composite rule uses its exact key-set profile without an unrelated singular field target. Absent/nonfinite duplicate evidence stays unknown; positive duplicate evidence is invalid. This does not certify profile provenance or universal numeric-domain validity.
- Sixteen existing parser implementations are exported directly from their current owner. Cases cover required facts, active/type/owner guards, policy filtering, profile/scope/lineage references, signed integer deltas and allowed-value workflow vocabularies. Focused tests verify endpoint, scope and nested inventory aliases, canonical ordering and unchanged fact inputs.
- Validation orchestration retains authored supported-kind order, empty explicit policy behavior, diagnostic-as-data results and fact projection. Existing compatibility defaults remain explicit amendments. The value-projection contract is limited to reached fact/suffix paths; unreached first-truthy/array helper equivalence remains unproved.

[Retained variants](cohort-retained-review.json), [version decisions](retained-version-decisions.json), [explicit amendments](cohort-amendments.json), [normative results](semantic-case-results.json) and [four previous-source controls](regression-negative-controls.json) identify the exact scope. All ${old.priorContracts} preceding contracts and ${old.priorCases} cases retain their clauses, amendments and witness expectations. These are same-run engineering checks, not independent scientific confirmations.

## Integrated verification

Source: **${summary.sourceTests} checks**, no failures/skips. Fresh ordinary-copy assembly: **${summary.assemblyFiles} projected files**. Artifact verification: **${summary.artifactChecks} checks / ${summary.artifactSuites.length} suites**, including Core, Claimipedia and all eight consumer sources. Runtime graph: **889 modules / 617 roots / 1835 static source edges / 15 dynamic boundaries**. Dynamic execution admission remains separate.

Both **13-stage isolated bootstraps** pass at the same source identity, with reader GET 200 and mutation 405. Model, body, programme and writing-authority identities match the preceding checkpoint. Readers close after verification. [Bootstrap comparison](bootstrap-comparison.json), [reader preservation](reader-semantic-preservation.json), [integrated verification](integrated-verification.json), [input guard controls](input-hash-guard-verification.json).

Native Windows Chrome also rendered the first isolated bootstrap's reader home and followed its provenance link. Displayed screenshots and accessibility text showed the 23 claims, 2935 documents, four contributions and the pinned model/programme identities. The dedicated verification window and server were closed; the port then refused connections. This is engineer-observed reader presentation/navigation evidence, not an automated workbench or external connector suite. [Native observation](native-reader-observation.json).

Closing checks verify **${integrity.filesVerified} file hashes**, original qualification/contract evidence, all consumer overlays and the main user's raw diff. Five selected repositories pass connectivity checks. Full source bundles and source/overlay archives remain retained. Superseded preceding bootstrap clones alone were removed after receipt/bundle/byte verification, without traversing their dependency links. [Integrity](final-integrity.json), [prior bootstrap reclamation](prior-bootstrap-reclamation.json).

## Full-goal work remaining

The remaining 275 declarations include **111 data-space** and **51 core admissibility** declarations. [Exact grouping](remaining-contract-groups.json). Next: the trusted-bridge condition, policy, creator/editor and mutation-plan subsystem, followed by the remaining data-space domains and other owners.

Bounded translations do not close original generic decomposition, thin-boundary, authored-default or dynamic execution requirements. The canonical Canvas schema and two exact lost local Git histories remain unresolved; identified reconstitution must preserve those history gaps. Native browser and external connector evidence, cache/research-output regeneration and final evidenced consolidation also remain open. Runtime-cache generations and research output are retained. No branches are merged/deleted/pushed, no production or scientific admission is made, and no complete/clean baseline is certified by this checkpoint.
`);
console.log({reported:true,remaining:275,globalGoalComplete:false});

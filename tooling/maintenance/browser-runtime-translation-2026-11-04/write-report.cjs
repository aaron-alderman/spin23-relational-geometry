const fs=require('fs'),p=require('path'),assert=require('assert/strict'),audit=__dirname,read=n=>JSON.parse(fs.readFileSync(p.join(audit,n))),summary=read('baseline-summary.json'),cohort=read('browser-cohort-definition.json'),preservation=read('prior-semantic-preservation.json'),assurance=read('current-assurance.json'),boot=read('bootstrap-a.json'),comparison=read('bootstrap-comparison.json');
const old=JSON.parse(fs.readFileSync(p.resolve('tooling/maintenance/publication-contract-translation-2026-11-04/bootstrap-a.json'))),readerChecks=[];
for(const pass of ['a','b'])for(const field of ['model','bodySha256','programme','writingAuthority']){assert.deepEqual(read('bootstrap-'+pass+'.json').reader[field],old.reader[field],pass+':'+field);readerChecks.push({pass,field,unchanged:true});}
fs.writeFileSync(p.join(audit,'reader-baseline-preservation.json'),JSON.stringify({previousSource:'943cf0778da7291dbcecff85974a0ca06362a1b3',currentSource:summary.platform,readerChecks,scientificAcceptance:false},null,2)+'\n');
const text=`# Browser conflict persistence, renderer/registry lifecycle and host effects

Selected source: \`${summary.platform}\`. This chunk adds **11 bounded contract translations and 27 normative cases**, bringing the total to **73 contracts / 269 normative cases**, with **61 explicitly amended contracts** in 27 specification files. **351 of 424 retained declarations remain untranslated.**

## Changes

- Renderer and chart registration/resolution now distinguish own names from inherited JavaScript properties. Explicit own \`constructor\`, \`toString\` and \`__proto__\` adapters work; inherited names refuse. Duplicate/provider failures preserve the previously admitted registry.
- Persistence requires a nonempty server revision before accepting a save or conflict refresh. Authored retry counts must be safe nonnegative integers. A failure after an accepted save cannot enter the stale-write retry path. Legacy save success and a committed runtime receipt remain separate server evidence paths.
- Performance sinks and event emission cannot turn semantic success into failure or cause an accepted save to be replayed. DOM renderer measurement also contains observer faults.
- Returned invalid renderer controllers are disposed where possible. Authored-page mount failures clear partial DOM and preserve the original error despite disposal faults. Returned teardown is idempotent, and renderer disposal runs even if a frontend disposer fails. Semantic runtime source caching distinguishes object source identities.
- Motion and placement controllers release their local gesture before invoking external commit callbacks, so a thrown callback leaves no active gesture.

The cohort also witnesses metadata custody, actor-private projection filtering, keyed DOM identity, attribute render modes, event-wrapper replacement/removal and DOM controller disposal. Forty browser host tests use the actual public operations and shared runtime call sites. The predecessor fixture passes 21 and fails 19 of these same 40 checks; its exact Git blob identities, minimal import/export adaptations and raw output are retained in [predecessor-observation.json](predecessor-observation.json).

## Contract scope and preservation

Qualified subjects:

${cohort.subjects.map(s=>'- '+s).join('\n')}

The retained pure effect-planning and generic executor intent is explicitly amended to the selected current host seams. No general browser effect executor, complete canvas extraction, full hydration equivalence, dynamic import equivalence, concurrent registry initialization arbitration or arbitrary browser-host behavior is claimed. The separate retained inspector, startup, authored vocabulary/workbench and other untranslated declarations remain visible in [translation-ledger.json](translation-ledger.json).

All prior **${preservation.priorContracts} contracts and ${preservation.priorCases} normative cases** retain their clauses, amendments, case definitions and selected retained-source identities. Six existing bindings refresh only the implementation SHA for frontend.mjs. Three shared specification files extend their subject sets; each prior subject's complete facts remain unchanged. This is recorded in [prior-semantic-preservation.json](prior-semantic-preservation.json).

## Verification

- Full source suite: **${summary.sourceTests} passed**, no failures or skips.
- Assembled application: **${summary.artifactChecks} checks across 15 suites**, including 356 semantic-translation checks, Core 72 and Claimipedia 35.
- Fresh ordinary-copy four-layer assembly: **${summary.assemblyFiles} files**. Source/SDK/Core bytes, consumer snapshots, pre-existing consumer overlays, confined generated links and distinct source/artifact file identities were verified.
- Static runtime gate: **${summary.currentRuntime.modules} modules / ${summary.currentRuntime.seeds} roots / ${summary.currentRuntime.staticSourceEdges} source edges / ${summary.currentRuntime.dynamicBoundaries} loading boundaries**.
- Both isolated Git-bundle bootstraps pass **eight stages**, including the prior 11 lifecycle and 28 publication-delivery tests plus all 40 new browser host tests, Core and Claimipedia verification. Both loopback readers return GET 200 and mutation POST 405, terminate afterward, and pass post-run tracked-byte checks.
- Repeated bootstrap identity: \`${comparison.sourceIdentity}\`. Both readers retain the preceding baseline's model, body, programme and writing-authority identities; see [reader-baseline-preservation.json](reader-baseline-preservation.json).
- Final integrity covers **${read('final-integrity.json').filesVerified} file observations**, the original 145 and selected 54 migration witnesses, all eight consumer sources/overlays, original main user diff, source bundles/archives and five Git connectivity checks.

Receipts: [assembly-proof.json](assembly-proof.json), [integrated-verification.json](integrated-verification.json), [bootstrap-comparison.json](bootstrap-comparison.json), [current-assurance.json](current-assurance.json), [final-integrity.json](final-integrity.json).

## Generated validation capacity

The previous run's two completed generated bootstrap checkouts were reclaimed after 17,760 current source-byte checks and verification of their committed receipts and complete source bundles. The link-aware deletion guard preserved its external junction target; 60 dependency links were unlinked without traversal. This run's completed assembly input staging directory was also retired after its provenance, representative source bytes and source bundles were verified; every removed regular file's hash is recorded. Both assembled artifacts, authoritative source checkouts, manifests, bundles, receipts, caches and research outputs remain. See [prior-bootstrap-reclamation.json](prior-bootstrap-reclamation.json) and [assembly-staging-reclamation.json](assembly-staging-reclamation.json).

## Remaining work and holds

The global audit still has **${assurance.report.findings.length} physical finding identities / ${assurance.report.summary.findingOccurrences} occurrences**, with zero unowned active semantic MJS. Qualified current behavior does not resolve generic executable algebra, all missing decomposition paths, thin/default-free architecture, dynamic effects or external pg/terser availability. Strict assurance drift remains unaccepted and the global goal remains incomplete.

The exact historical Epistemic and Science local commits remain unrecovered. Runtime caches and research outputs remain on their existing preservation/reproducibility holds. No branches were merged or pushed, no retained checkout or research output was pruned, and no production activation or scientific admission occurred. Main user edits and consumer provenance overlays remain preserved.

The next source-contract chunk can address retained inspector/startup and authored canvas workbench/vocabulary/diagnostic boundaries, using their current owners and separate host fixtures. Recovery and global architectural obligations remain independent of that qualification.
`;
fs.writeFileSync(p.join(audit,'README.md'),text);console.log({report:p.join(audit,'README.md'),readerBaselineUnchanged:true});

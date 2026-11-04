const fs=require('node:fs'),p=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const read=n=>JSON.parse(fs.readFileSync(p.join(__dirname,n))),summary=read('baseline-summary.json'),preservation=read('prior-semantic-preservation.json'),cohort=read('cohort-definition.json'),assurance=read('current-assurance.json'),performance=read('runtime-performance-paired.json'),scheduling=read('validation-scheduling-performance.json');
const root=p.resolve('.platform-reconstitution/sourcery-platform-reconciled'),retained=JSON.parse(fs.readFileSync(p.join(root,'assurance/retained-semantic-contracts.json'))),translated=JSON.parse(fs.readFileSync(p.join(root,'assurance/semantic-contract-translations.json'))),qualified=new Set(translated.records.map(r=>r.subject)),browser=read('translation-ledger.json').rows.filter(r=>r.repository==='sourceryPlatform'&&r.source.startsWith('sdk/browser/')),remaining=browser.filter(r=>!qualified.has(r.subject));
assert.equal(browser.length,39);assert.equal(remaining.length,8);assert.equal(summary.sourceTests,961);assert.equal(summary.artifactChecks,1309);
assert.equal(scheduling.sourceCommit,summary.platform);
for(const [file,expected]of Object.entries(read('runtime-performance-after.json').sourceSha256))assert.equal(crypto.createHash('sha256').update(fs.readFileSync(p.join(root,file))).digest('hex'),expected);
for(const row of read('runtime-performance-reconstruction.json').rows){assert(row.exactReconstruction);assert.equal(row.beforeSha256,read('runtime-performance-before.json').sourceSha256[row.path]);}
const previous=JSON.parse(fs.readFileSync(p.resolve('tooling/maintenance/inspector-canvas-translation-2026-11-04/bootstrap-a.json'))),readerChecks=[];
for(const pass of ['a','b'])for(const field of ['model','bodySha256','programme','writingAuthority']){assert.deepEqual(read('bootstrap-'+pass+'.json').reader[field],previous.reader[field],pass+':'+field);readerChecks.push({pass,field,unchanged:true});}
fs.writeFileSync(p.join(__dirname,'reader-baseline-preservation.json'),JSON.stringify({previousSource:'e66a4630428da1e05fc96b28432e6fffbf7950b1',currentSource:summary.platform,readerChecks,scientificAcceptance:false},null,2)+'\n');
const mean=a=>a.reduce((n,x)=>n+x,0)/a.length,serial=mean(scheduling.results.filter(r=>r.workers===1).map(r=>r.elapsedMs)),parallel=mean(scheduling.results.filter(r=>r.workers===2).map(r=>r.elapsedMs)),perfSummary={sourceCommit:summary.platform,hitTesting:performance.results.filter(r=>r.name.startsWith('hit-')),routing:performance.results.filter(r=>r.name.startsWith('route-')),validation:{serialMeanMs:serial,twoWorkerMeanMs:parallel,elapsedReduction:1-parallel/serial},limitations:'Same-machine Node microbenchmarks and seven-stage scheduling comparison. No measured browser frame-time or whole-pipeline speedup; cold-cache file I/O dominates its first sample.'};
fs.writeFileSync(p.join(__dirname,'performance-summary.json'),JSON.stringify(perfSummary,null,2)+'\n');
const text=`# Browser boundaries and performance — integrated baseline

Selected source: \`${summary.platform}\`. Four retained browser contracts gain 66 normative cases, bringing qualification to **82 contracts / 371 cases**. Seventy contracts explicitly amend historical claims. **342 of 424 declarations remain untranslated.** These are bounded implementation qualifications, with no claim of universal equivalence or restored executable algebra.

## Runtime changes

- Defaults and source selection now have three small shared helper modules, used by frontend, renderer and semantic-mutation registries. Undefined, null and falsy policies remain distinct; fresh fallback containers, source-object identity, native conversion/import/stat failures, Windows paths and the existing portable POSIX convention have direct witnesses. Shared dynamic loading reduces observed runtime import boundaries from 17 to 15.
- Canvas hit testing rejects non-finite or invalid geometry, clamps before grid multiplication, preserves half-open rectangles and last-painted order, and retains falsy action identities. Searching the materialized list backwards avoids reversing it or allocating a callback. Forward iterator consumption and fault ordering remain observable.
- Network routing rejects malformed or ambiguous own targets and foreign-origin conversion, validates ports and origin-only HTTP(S) bases, and preserves path/query/hash structure. Lookup counts matches without allocating a filtered array and observes later getter faults before reporting ambiguity. Mutable caller configurations are not cached.
- Bootstrap qualification uses two workers for the seven platform stages and retains all ten individual receipts in their declared order. The fifteen-suite artifact runner overlaps platform checks and serializes the eight consumer suites to bound temporary snapshots.

The qualified subjects are:

${cohort.subjects.map(s=>'- '+s).join('\n')}

[Five counterexamples](counterexamples.json) execute exact predecessor source bodies with explicitly recorded import/export adaptations. [31 boundary tests](browser-boundary-tests.txt) cover current behavior, including native host fault identity, sparse target lists, iterator order, and caller-owned state. The existing runtime-module inventory assertion now checks the exact prior 559 paths plus exactly three new modules, rather than a hardcoded unchanged count; the initial failed run and [rationale](inventory-expectation-update.json) are retained.

## Performance evidence

The [paired runtime measurement](runtime-performance-paired.json) alternates before/after execution eight times per workload in one process, with warmup and exact result identity checks. The two pre-performance source bodies are [reconstructable with exact full-file hashes](runtime-performance-reconstruction.json). Last-painted hit lookup improves about **2.5–3.0×** for 64, 1,024 and 4,096 regions; first-hit and miss cases run about **1.19–1.26× as fast**. Routing improves about **3–8%** for 16–1,024 targets. These are local Node measurements; browser frame-time has not been measured.

The [ABBA validation scheduling comparison](validation-scheduling-performance.json) executes the same seven read-only stages with one and two workers, preserving all qualification counts. Mean elapsed time is **${(serial/1000).toFixed(2)} s → ${(parallel/1000).toFixed(2)} s**, a **${((1-parallel/serial)*100).toFixed(1)}% reduction**. Consumer suites remain serialized. The separate [file I/O experiment](validation-io-performance.json) shows a large first-read cache effect and no clear warm-cache advantage for parallel streams; it does not justify a whole-pipeline speedup claim. Assembly still uses ordinary byte copies and all integrity hashes remain required.

## Verification and preservation

- **${summary.sourceTests} source checks**, zero failures or skips; one count is a discovered helper module.
- **${summary.artifactChecks} checks across 15 assembled suites**, including 527 semantic-translation checks, Core 72 and Claimipedia 35. [Integrated receipts](integrated-verification.json).
- Fresh four-layer ordinary-copy assembly, **889 current source modules**, 617 roots, 1,835 static edges and 15 explicit dynamic boundaries. [Assembly](assembly-proof.json), [runtime gate](assembled-runtime-module-verification.json), [semantic gate](assembled-semantic-contract-verification.json).
- Both isolated bootstraps pass all ten stages and reproduce the same semantic identity. Each serves the reader with HTTP 200, rejects mutation with 405, verifies source bytes after execution and stops its reader. Reader model, response body, programme and writing-authority identities match the preceding inspector/canvas baseline. [Comparison](bootstrap-comparison.json), [reader preservation](reader-baseline-preservation.json), [shutdown](reader-shutdown-verification.json).
- All prior **${preservation.priorContracts} contracts / ${preservation.priorCases} cases** preserve clauses, amendments, selected identities, public names and per-subject specification facts. Eighteen binding hashes refresh on the explicitly allowed implementation paths; thirteen old subjects in two extended specification files retain their facts. [Preservation receipt](prior-semantic-preservation.json).
- Original 145 qualification hashes, 54 selected contract hashes, earlier semantic witnesses, all eight consumer sources and their existing overlays, source/artifact/bootstrap bytes and the main user diff are preserved. Five selected Git repositories pass connectivity checks. [Final integrity](final-integrity.json). Complete all-ref platform bundle and source snapshots are retained under the recorded local preservation locations; no branches were pushed or merged.

## Remaining scope

The complete browser ledger contains **39 declarations: 31 qualified, eight untranslated**. This corrects the earlier report's narrower statement that only four browser declarations remained. The eight are:

${remaining.map(r=>'- '+r.subject).join('\n')}

The next integrated browser chunk is those action/composition contracts, carrying any fixes through the same assembly, consumer and isolated-bootstrap gates. Across all domains, 342 declarations remain outside qualified cohorts. The [translation ledger](translation-ledger.json) preserves historical findings separately from current coordinates; reintroducing helper coordinates does not prove generic restoration.

The canonical Canvas schema \`sdk/plugins/canvas/canvas-stdlib.rel\` remains missing from the selected checkout and searched local history; the derived 205-entry vocabulary catalogue does not replace it. Exact earlier local Epistemic commit \`274a2a541789ee2e8b6576ec3aeb5d9651165338\` and Science commit \`647e065a69867ee767c5d9b7dac04bdce1946d19\` remain recovery obligations. Available remote history is preserved, and recovery is not declared impossible.

Global architectural completion and strict drift acceptance remain false; active semantic ownership is complete for the observed source, but generic decomposition, dynamic execution authority, thin/default-free obligations and historical recovery are separate. There is no scientific acceptance, production activation or cleanup certification.

Only superseded generated bootstrap/browser validation trees were reclaimed, after committed receipt, source/bundle hash and junction-safety checks. The preceding inspector/canvas assembled artifact, retained source copies, research output and runtime-cache generations remain. [Bootstrap reclamation](prior-bootstrap-reclamation.json), [older browser artifact reclamation](superseded-browser-reclamation.json).
`;
assert(!text.includes('undefined'));fs.writeFileSync(p.join(__dirname,'README.md'),text);
const files=fs.readdirSync(__dirname).filter(n=>/\.(?:cjs|mjs)$/.test(n)),cp=require('node:child_process'),checks=files.map(file=>{cp.execFileSync(process.execPath,['--check',p.join(__dirname,file)]);return{file,sha256:crypto.createHash('sha256').update(fs.readFileSync(p.join(__dirname,file))).digest('hex'),syntaxPassed:true};});fs.writeFileSync(p.join(__dirname,'helper-syntax-verification.json'),JSON.stringify({checks,scope:'Syntax checks only; runtime receipts separately linked.'},null,2)+'\n');
console.log({source:summary.platform,sourceChecks:summary.sourceTests,artifactChecks:summary.artifactChecks,browserDeclarations:browser.length,browserUntranslated:remaining.length});

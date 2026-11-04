// Refresh live recovery records from retained, exact verification receipts.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),base=path.join(root,'.platform-reconstitution'),audit=__dirname;
const read=file=>JSON.parse(fs.readFileSync(file,'utf8'));
const write=(file,value)=>fs.writeFileSync(file,JSON.stringify(value,null,2)+'\n');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
function git(relative,args,alternate){
  const cwd=path.resolve(root,relative);
  const env={...process.env,...(alternate?{GIT_ALTERNATE_OBJECT_DIRECTORIES:alternate}:{})};
  const r=cp.spawnSync('git',['-c',`safe.directory=${cwd.replaceAll('\\','/')}`,'-C',cwd,...args],{encoding:'utf8',env,maxBuffer:16*1024*1024});
  if(r.status!==0)throw new Error(r.stderr);return r.stdout.trim();
}
const prior=path.join(base,'bundles/preservation-2026-11-04/pre-reconciliation-records');fs.mkdirSync(prior,{recursive:true});
for(const file of ['authority-map.json','platform-residual-ledger.json','RECONSTITUTION-RECEIPT.md']){
  if(!fs.existsSync(path.join(prior,file)))fs.copyFileSync(path.join(base,file),path.join(prior,file));
}
const corePrior=path.join(prior,'core-reconstitution-residuals.json');
if(!fs.existsSync(corePrior))fs.copyFileSync(path.join(base,'claimipedia-core/provenance/reconstitution-residuals.json'),corePrior);
const assembly=read(path.join(audit,'assembly-proof.json'));
if(assembly.platformRuntime.valid!==true||assembly.programmeCompletion.status!=='complete')throw new Error('Assembly did not pass.');
const observedAt=new Date().toISOString(),candidate=git('.platform-reconstitution/sourcery-platform-authority',['rev-parse','HEAD']);
const upstream='9c7f73fe58a3b6ae030f9bbd2407ca49efef44c3';
const alternate=path.join(base,'recovery/sourcery-platform-upstream-2026-11-04/objects');
const mergeBase=git('.platform-reconstitution/sourcery-platform-authority',['merge-base','HEAD',upstream],alternate);
const divergence=git('.platform-reconstitution/sourcery-platform-authority',['rev-list','--left-right','--count',`HEAD...${upstream}`],alternate).split(/\s+/).map(Number);
const lineage={observedAt,repository:'https://github.com/sourcerytech/sourcery-platform.git',transport:'authenticated Git clone; connector returned 404',upstreamMain:upstream,candidate,mergeBase,candidateOnlyCommits:divergence[0],upstreamOnlyCommits:divergence[1],candidateOrigin:git('.platform-reconstitution/sourcery-platform-authority',['remote','get-url','origin']),localSourceHead:git('C:/Users/aaron/sourcery/sourcery-platform',['rev-parse','HEAD']),status:'diverged; reconciliation required; candidate is not current upstream main'};
write(path.join(audit,'upstream-lineage.json'),lineage);
const map=read(path.join(base,'authority-map.json'));
Object.assign(map.canonicalCandidate,{commit:candidate,localReceiptCommit:candidate,status:'clean local recovery candidate; fresh full assembly verified; upstream history diverged; canonical promotion remains open'});
map.verifiedUpstreamLineage=lineage;
map.reconstitutedWitnesses.find(w=>w.path.endsWith('/sourcery-platform/sdk')).commit=git('.platform-reconstitution/sourcery-platform/sdk',['rev-parse','HEAD']);
map.reconstitutedWitnesses.find(w=>w.path.endsWith('/sourcery-platform/sdk')).status='local runtime adapter witness; shared algebra helpers repaired and Core 71/71 tests passed; not upstream authority';
map.reconstitutedWitnesses.find(w=>w.path.endsWith('/claimipedia-core')).commit=git('.platform-reconstitution/claimipedia-core',['rev-parse','HEAD']);
map.reconstitutedWitnesses.find(w=>w.path.endsWith('/claimipedia-core')).status='local witness; exact historical oracle objects recovered; source check and 71/71 tests pass; not upstream authority';
map.latestAssembly={observedAt,receipt:'tooling/maintenance/consolidation-2026-11-04/assembly-proof.json',sha256:hash(path.join(audit,'assembly-proof.json')),fileCount:assembly.projection.fileCount,proofHash:assembly.projection.proofHash,payloadHash:assembly.platformRuntime.payloadHash,applicationAuthority:false};
map.observedBlockers=['legacy sourcery-platform worktree has unreconciled changes','candidate and current GitHub main have diverged','programme-wide direct semantic/effect ownership assurance remains open','Epistemic Core and Claimipedia Science exact pre-incident local histories remain unrecovered'];
write(path.join(base,'authority-map.json'),map);
const ledger=read(path.join(base,'platform-residual-ledger.json'));
Object.assign(ledger.authority,{sourceCommit:candidate,localReceiptCommit:candidate,runtimeAssurance:'fresh full assembly, runtime consumer closure and scoped programme-completion check passed; no application authority granted'});
const bootstrap=ledger.residuals.find(r=>r.id==='bootstrap.github-only');
bootstrap.previousResolution=bootstrap.resolution;
bootstrap.resolution=`Fresh assembly of retained candidate ${candidate} verified ${assembly.projection.fileCount} unique files, composition proof ${assembly.projection.proofHash}, runtime payload ${assembly.platformRuntime.payloadHash}; receipt tooling/maintenance/consolidation-2026-11-04/assembly-proof.json. Retained local projections are verified; equivalence to current upstream main is not established.`;
if(!ledger.residuals.some(r=>r.id==='source.upstreamReconciliation'))ledger.residuals.push({id:'source.upstreamReconciliation',domain:'platform/source-authority',kind:'provenance',algebraStatus:'open',evidence:lineage,requiredAction:'Compare and reconcile local and upstream changes by ownership and intent; do not merge, reset, or promote based solely on passing bootstrap.'});
ledger.counts.open=3;
write(path.join(base,'platform-residual-ledger.json'),ledger);
const recovered=['844fa64abe4ee58f37add8f8e1b8e9fcfe2343d2','dfb98dbb630b1bf00ca1e0da2d3dbf81e73bc048'].map((commit,index)=>({commit,source:'.platform-reconstitution/recovery/claimipedia-core',retainedRef:index?'refs/recovery/oracles/presentation-dfb98db':'refs/recovery/oracles/expression-844fa64',objectType:git('.platform-reconstitution/claimipedia-core',['cat-file','-t',commit]),runtimeDependency:false}));
write(path.join(base,'claimipedia-core/provenance/reconstitution-residuals.json'),{kind:'reconstitution-residuals',observedAt,status:'historical oracle sources recovered; local witness authority unchanged',previousRecord:'bundles/preservation-2026-11-04/pre-reconciliation-records/core-reconstitution-residuals.json',deletedHistory:[],recoveredHistoricalSources:recovered,remainingVerification:{expressionAlgebra:'99/99 tests passed; fresh test receipt retained in current audit',claimipediaCore:'71/71 tests passed after exact history recovery and SDK helper ownership repair',sourceClosure:'passed'},decision:'Exact historical objects recovered without merging histories or changing executable Core source. Missing dependency histories remain a separate recovery hold.'});
const receiptPath=path.join(base,'RECONSTITUTION-RECEIPT.md');let receipt=fs.readFileSync(receiptPath,'utf8');
receipt=receipt.replace('The temporary assembled target was removed after the receipt was retained.','The earlier record reported removal of the temporary assembled target. A 4 November recheck found `.tmp-full-assembly` still present; it remains retained.');
receipt=receipt.replace('Those objects are unavailable by\r\ndesign after the approved history cleanup.','The initial run could not resolve those objects from the reconstructed repository. Both were subsequently found in the isolated recovery clone on 4 November; the earlier assertion about their unavailability is superseded.');
receipt=receipt.replace('Those objects are unavailable by\ndesign after the approved history cleanup.','The initial run could not resolve those objects from the reconstructed repository. Both were subsequently found in the isolated recovery clone on 4 November; the earlier assertion about their unavailability is superseded.');
if(!receipt.includes('## Fresh recovery verification — 2026-11-04'))receipt+=`\n## Fresh recovery verification — 2026-11-04\n\nBoth Core historical oracle commits were found in the isolated recovery clone and imported under explicit recovery refs. Repairing duplicated SDK helper ownership then produced **71/71 passing Core tests**, including the historical comparisons and isolated neutral-reader installation.\n\nA fresh full assembly of candidate \`${candidate}\` verified **${assembly.projection.fileCount} composed files**, all layer manifests, runtime consumer closure, and the scoped programme-completion check. It retains \`applicationAuthority: false\`. The previous 12,905-file receipt describes an earlier seal; the fresh count is ${assembly.projection.fileCount}. The new validation target \`.assembly-validation-2026-11-04\` remains retained.\n\nCurrent GitHub main and the candidate diverge from \`${mergeBase}\` (${divergence[0]} candidate-only and ${divergence[1]} upstream-only commits). This verification does not promote the candidate or establish current-upstream equivalence. Epistemic Core and Claimipedia Science exact local history recovery, legacy dirty-state reconciliation, direct semantic/effect assurance, and cache/output regeneration remain open.\n\nCurrent audit: \`tooling/maintenance/consolidation-2026-11-04/README.md\`.\n`;
fs.writeFileSync(receiptPath,receipt);
write(path.join(audit,'verification-summary.json'),{observedAt,lineage,assemblyReceiptSha256:hash(path.join(audit,'assembly-proof.json')),assemblyTarget:'.platform-reconstitution/.assembly-validation-2026-11-04',previousAssemblyRetained:'.platform-reconstitution/.tmp-full-assembly',recoveredHistoricalSources:recovered,sdkRepairCommit:git('.platform-reconstitution/sourcery-platform/sdk',['rev-parse','HEAD']),sourceAuthority:'local witnesses and diverged candidate; no promotion',missingDependencyCommits:[{repository:'epistemic-core',commit:'274a2a541789ee2e8b6576ec3aeb5d9651165338',remoteResult:'upload-pack: not our ref'},{repository:'claimipedia-science',commit:'647e065a69867ee767c5d9b7dac04bdce1946d19',remoteResult:'upload-pack: not our ref'}],newDependencyLink:{path:'.platform-reconstitution/sourcery-platform/sdk/node_modules/@sourcerytech/expression-algebra',target:'.platform-reconstitution/expression-algebra',kind:'junction; unlink without traversal before any future removal'},productionChanged:false,cleanupPerformed:false});
console.log(JSON.stringify({candidate,fileCount:assembly.projection.fileCount,recoveredHistoricalSources:recovered.length,divergence}));

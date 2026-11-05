import {readFileSync as read,writeFileSync as write,existsSync} from 'node:fs';
import {resolve,relative,join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const audit=import.meta.dirname,root=resolve('.'),source=resolve('.platform-reconstitution/sourcery-platform-reconciled'),prior='tooling/maintenance/auth-session-policy-migration-2026-11-05';
const sha=b=>createHash('sha256').update(b).digest('hex'),json=p=>JSON.parse(read(p)),save=(name,value)=>write(join(audit,name),JSON.stringify(value,null,2)+'\n');
const inputs={
 'prior:current-assurance':prior+'/current-assurance.json','prior:closure':prior+'/closure-verification.json','prior:qualification':prior+'/managed-receipts/qualification.json',
 'prior:profile-inputs':prior+'/profile/bootstrap-inputs.json','prior:goal-progress':prior+'/goal-progress.json','prior:authority-map':prior+'/live-records/authority-map.json',
 'prior:canvas-disposition':'tooling/maintenance/browser-boundary-translation-2026-11-05/README.md','prior:recovery-report':'tooling/maintenance/consolidation-2026-11-03/README.md',
 'prior:cache-audit':'tooling/maintenance/consolidation-2026-11-03/runtime-cache-audit.json','prior:managed-runner':'tooling/maintenance/managed-validation/README.md',
 'prior:browser-disposition':prior+'/managed-receipts/browser-verification-disposition.json',
};
for(const file of ['assurance/platform-reconstitution.rel','assurance/platform-reconstitution-goal-audit.mjs','assurance/platform-assurance-check.mjs','assurance/platform-assurance-source-text.mjs','assurance/runtime-module-catalogue.json','assurance/runtime-module-boundaries.json','assurance/runtime-loading-qualification.json','assurance/runtime-ownership.json','assurance/source-capabilities.json','assurance/retained-witness-migration.json','assurance/semantic-contract-translations.json','assurance/witness-contracts/sourceryPlatform/canvas.catalogue.module.rel'])inputs['source:'+file]=join(source,file);
const evidence=Object.entries(inputs).map(([id,file])=>{const bytes=read(file);return {id,path:relative(root,resolve(file)).replaceAll('\\','/'),sha256:sha(bytes),bytes:bytes.length};});
const a=json(inputs['prior:current-assurance']),catalogue=json(join(source,'assurance/runtime-module-catalogue.json')),owners=json(join(source,'assurance/runtime-ownership.json')),witness=json(join(source,'assurance/retained-witness-migration.json'));
const head=execFileSync('git',['-C',source,'rev-parse','HEAD']).toString().trim();assert.equal(head,json(inputs['prior:qualification']).source);
const roots=new Map(a.report.repositories.map(r=>[r.name,r.path])),runtime=new Map(catalogue.modules.map(m=>[m.key,m])),internals=new Map(a.report.internals.map(r=>[r.repository+'/'+r.path,r]));
const indexed=a.report.findings.map(f=>{
 const key=f.repository+'/'+f.path,impacted=[...new Set([key,...(f.members||[]).map(m=>m.repository+'/'+m.path)])],inRuntime=impacted.filter(k=>runtime.has(k));
 const sourceRecord=internals.get(key),sourcePath=roots.has(f.repository)?resolve(roots.get(f.repository),f.path):null;
 const scope=inRuntime.length?'current-runtime':sourceRecord?'catalogued-outside-current-runtime':f.repository==='graph'?'cross-source-comparison':'unresolved-catalogue-coordinate';
 return {id:f.id,kind:f.kind,repository:f.repository,path:f.path,occurrences:f.occurrences||1,scope,activeRuntimeMembers:inRuntime,
   sourceSha256:sourceRecord?.sourceHash||null,coordinatePresent:sourcePath?existsSync(sourcePath):null,
   primaryPackage:f.kind==='thick-mjs'?'A3':f.kind==='possible-hidden-default'?'A4':'A1',status:'open-review-required',
   evidencePointer:'prior:current-assurance#/report/findings/'+a.report.findings.indexOf(f),
   metrics:Object.fromEntries(['nonCommentLines','decisionTokens','defaultTokens'].filter(k=>f[k]!==undefined).map(k=>[k,f[k]]))};
});
save('finding-index.json',indexed);
const ownerMap=new Map(owners.records.map(r=>[r.repository+'/'+r.path,r]));
save('runtime-index.json',catalogue.modules.map(m=>({key:m.key,sha256:m.sha256,custodian:m.custodian,role:ownerMap.get(m.key)?.role||null,
 findingIds:indexed.filter(f=>f.activeRuntimeMembers.includes(m.key)).map(f=>f.id),primaryPackage:'A2',status:'semantic-disposition-and-proof-required',
 executableAlgebraProved:ownerMap.get(m.key)?.executableAlgebraProved===true,qualificationIsNotGenericProof:true})));
save('boundary-index.json',json(join(source,'assurance/runtime-module-boundaries.json')).records.map((r,i)=>({id:'boundary-'+String(i+1).padStart(2,'0'),...r,packages:['E1','H2'],status:'admission-not-established',executionGranted:false})));
save('drift-index.json',{newFindingIds:a.drift.newFindings.map(r=>r.id),regressions:a.drift.regressions,metricPolicy:a.drift.metricPolicy,primaryPackage:'A5',status:'open'});
save('declaration-observations.json',witness.records.filter(r=>r.kind==='BoundedDeclarationContract').map(r=>({subject:r.subject,owner:r.owner,kind:r.kind,specification:r.specification,specificationSha256:r.specificationSha256,primaryPackage:'A2',behaviorOrGenericProof:false})));
const worktrees=execFileSync('git',['worktree','list','--porcelain']).toString();write(join(audit,'worktrees.txt'),worktrees);
evidence.push({id:'live:worktrees',path:relative(root,join(audit,'worktrees.txt')).replaceAll('\\','/'),sha256:sha(Buffer.from(worktrees)),bytes:Buffer.byteLength(worktrees)});
const packages=json(join(audit,'work-packages.json'));
for(const p of packages){
 if(['H1','H2'].includes(p.id)&&!p.dependencies.includes('F1'))p.dependencies.push('F1');
 p.status=p.mode==='paused-by-user'?'paused-by-user':'open';
}
save('work-packages.json',packages);
const countBy=(rows,key)=>rows.reduce((out,r)=>(out[r[key]]=(out[r[key]]||0)+1,out),{});
const plan={protocol:'sourcery/integrated-baseline-closure-plan.v1',capturedAt:new Date().toISOString(),source:head,baselineAudit:'1e930eb9cd51457bf7a8c1a2a0803cc3bb37ad7c',
 planningComplete:false,integratedBaselineComplete:false,computerUsePaused:true,executionGranted:false,scientificAcceptance:false,
 counts:{packages:packages.length,findings:indexed.length,findingOccurrences:indexed.reduce((n,r)=>n+r.occurrences,0),findingsByKind:countBy(indexed,'kind'),findingsByScope:countBy(indexed,'scope'),runtimeModules:catalogue.modules.length,dynamicSites:catalogue.dynamicBoundaries.length,
 sourceryThick:indexed.filter(r=>r.repository==='sourceryPlatform'&&r.kind==='thick-mjs').length,sourceryDefaults:indexed.filter(r=>r.repository==='sourceryPlatform'&&r.kind==='possible-hidden-default').length,newDriftFindings:a.drift.newFindings.length,driftRegressions:a.drift.regressions.length,declarationObservations:7},
 evidence,formalRequirements:a.goal.requirements,
 sequence:[['A1','S1','S2','R2'],['A2','E1'],['A3','A4','E2','R1'],['A5'],['F1'],['H1','H2','R3'],['F2']],
 interpretation:'Dependencies gate closure, not useful preparatory work. Packages may progress partially in parallel; no sub-agent delegation or computer use is authorized by this plan. Counts overlap and are not independent defects or effort estimates.',
 scopePolicy:'The finite universe is this source snapshot, current runtime graph, complete assurance findings and named recovery/host/reproduction obligations. Future findings are appended with source identity and a crosswalk; none are silently dropped. Outside-current-runtime is a scope observation, not an exemption from repository-owned gates.',
 noShortcutRules:['Do not reset residual ledgers or raise ceilings to manufacture completion.','Do not treat a custody/default extraction or passing tests as generic algebra or execution authority.','Preserve all original user edits, overlays, source refs, bundles and historical evidence.','No cache, output, worktree or operator-state deletion is authorized by this plan.','Existing bounded contract qualification remains complete at its existing scope; do not relabel all 424 as newly unresolved.'],
 recommendedNext:{package:'A1',deliverable:'Complete source/declaration/runtime correspondence map and authenticated runtime vertical-slice inventory; then execute A2 auth/identity/authorization with effect ports as one integrated migration.',parallelPreparatoryWork:['S1: consolidate Canvas recovery/variant evidence','S2: identify genuinely unsearched backups and prepare explicit reconstitution disposition','R2: refresh output family and input inventory without deletion']}};
save('plan.json',plan);console.log(JSON.stringify(plan.counts));

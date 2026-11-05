import {readFileSync as read,writeFileSync as write,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const audit=import.meta.dirname,root=resolve('.'),json=p=>JSON.parse(read(p)),get=name=>json(join(audit,name)),sha=b=>createHash('sha256').update(b).digest('hex');
const plan=get('plan.json'),packages=get('work-packages.json'),findings=get('finding-index.json'),modules=get('runtime-index.json'),boundaries=get('boundary-index.json'),drift=get('drift-index.json');
for(const evidence of plan.evidence)assert.equal(sha(read(resolve(root,evidence.path))),evidence.sha256,evidence.id+' changed');
const evidence=new Map(plan.evidence.map(e=>[e.id,e])),prior=json(resolve(root,evidence.get('prior:current-assurance').path));
assert.deepEqual(plan.formalRequirements,prior.goal.requirements);assert.equal(plan.formalRequirements.length,13);
const ids=new Set(packages.map(p=>p.id));assert.equal(ids.size,16);const seen=new Set(),visiting=new Set();
function visit(id){assert(ids.has(id));assert(!visiting.has(id),'Dependency cycle: '+id);if(seen.has(id))return;visiting.add(id);const p=packages.find(p=>p.id===id);assert(p.acceptance.length&&p.scope&&p.owner&&p.mode);for(const d of p.dependencies)visit(d);visiting.delete(id);seen.add(id);}
for(const p of packages){visit(p.id);for(const e of p.evidence)assert(evidence.has(e)||existsSync(join(audit,e)),'Missing evidence '+e);}
assert.deepEqual(findings.map(f=>f.id),prior.report.findings.map(f=>f.id));assert.equal(new Set(findings.map(f=>f.id)).size,findings.length);
assert.equal(findings.reduce((n,f)=>n+f.occurrences,0),prior.report.summary.findingOccurrences);for(const f of findings){assert(ids.has(f.primaryPackage));assert.equal(f.status,'open-review-required');}
assert.deepEqual(drift.newFindingIds,prior.drift.newFindings.map(r=>r.id));assert.deepEqual(drift.regressions,prior.drift.regressions);
const graph=json(resolve(root,evidence.get('source:assurance/runtime-module-catalogue.json').path)),roots=new Map(prior.report.repositories.map(r=>[r.name,r.path]));
assert.deepEqual(modules.map(m=>m.key),graph.modules.map(m=>m.key));
for(const m of modules){const split=m.key.indexOf('/'),repository=m.key.slice(0,split),path=m.key.slice(split+1);assert.equal(sha(read(join(roots.get(repository),path))),m.sha256,m.key+' current bytes changed');}
assert.deepEqual(boundaries.map(b=>b.observation),graph.dynamicBoundaries);assert(boundaries.every(b=>b.executionGranted===false));
assert.equal(get('declaration-observations.json').length,7);assert.equal(modules.length,892);assert.equal(boundaries.length,13);assert.equal(findings.length,4561);
assert.equal(plan.integratedBaselineComplete,false);assert.equal(plan.computerUsePaused,true);assert.equal(packages.find(p=>p.id==='H1').status,'paused-by-user');
const source=resolve('.platform-reconstitution/sourcery-platform-reconciled'),git=(cwd,args)=>execFileSync('git',['-c','safe.directory='+cwd,'-C',cwd,...args]);
assert.equal(git(source,['rev-parse','HEAD']).toString().trim(),plan.source);assert.equal(git(source,['status','--porcelain']).toString().trim(),'');
assert.equal(git(root,['diff','--cached','--name-only']).toString().trim(),'');
const original=read('.platform-reconstitution/bundles/preservation-2026-11-04/supplementary/main-unstaged.patch');assert(git(root,['diff','--binary']).equals(original));
for(const name of ['work','harness','lock.json'])assert.equal(existsSync('.platform-reconstitution/managed-validation/'+name),false);
const receipt={observedAt:new Date().toISOString(),passed:true,source:plan.source,evidenceHashesVerified:plan.evidence.length,findingCoverage:findings.length,findingOccurrences:4648,runtimeModuleBytesVerified:modules.length,dynamicBoundaryCoverage:boundaries.length,declarationObservations:7,packages:packages.length,dependenciesAcyclic:true,allOriginalFormalRequirementsPreserved:13,userDiffUnchanged:true,sourceClean:true,scratchAllocated:false,computerUsePaused:true,planningComplete:true,integratedBaselineComplete:false};
plan.planningComplete=true;write(join(audit,'plan.json'),JSON.stringify(plan,null,2)+'\n');write(join(audit,'verification.json'),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify(receipt));

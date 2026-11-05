import {readFileSync as read,writeFileSync as write,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import {loadContract} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance-contract.mjs';
import {auditSemanticContracts} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/semantic-contract-assurance.mjs';
const audit=import.meta.dirname,root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),json=p=>JSON.parse(read(p)),get=p=>json(join(audit,p)),sha=b=>createHash('sha256').update(b).digest('hex');
const summary=get('summary.json'),records=get('module-correspondence.json'),routes=get('finding-correspondence.json'),bindings=get('current-bindings.json'),prior=json('tooling/maintenance/auth-session-policy-migration-2026-11-05/current-assurance.json');
const owners=new Map(prior.report.repositories.map(r=>[r.name,r.path])),contract=loadContract(root),declared=[...contract.subjects].filter(([,r])=>r.isa?.includes('PlatformModule'));
assert.deepEqual(records.map(r=>r.subject),declared.map(([id])=>id));assert.equal(records.length,424);
const required=prior.report.findings.filter(f=>f.kind.startsWith('module-')||f.kind==='duplicate-semantic-source');assert.deepEqual(routes.map(r=>r.id),required.map(r=>r.id));
let impacts=0;for(let i=0;i<routes.length;i++){
 const route=routes[i],original=required[i];assert.equal(route.formalFindingResolved,false);assert.equal(route.occurrences,original.occurrences);
 if(original.kind==='duplicate-semantic-source'){assert.deepEqual(route.members.map(({sha256,owner,...r})=>r),original.members);for(const m of route.members)assert.equal(sha(read(resolve(owners.get(m.repository),m.path))),m.sha256);continue;}
 assert.equal(route.impacts.length,original.impacts.length);
 for(let j=0;j<route.impacts.length;j++){const mapped=route.impacts[j],impact=original.impacts[j],subject=impact.module||(impact.repository==='algebra'?impact.path:null);assert.equal(mapped.subject,subject);assert.equal(mapped.retainedCoordinate,impact.path);assert(mapped.remainingObligations.length);assert(records.some(r=>r.subject===subject&&r.currentSpecification.sha256===mapped.currentSpecification.sha256));impacts++;}
}
assert.equal(impacts,1738);assert.equal(routes.length,1653);
for(const b of bindings)assert.equal(sha(read(resolve(owners.get(b.owner),b.path))),b.sha256,b.key+' binding changed');
for(const r of records){assert.equal(r.genericEquivalenceProved,false);assert.equal(sha(read(resolve(root,r.currentSpecification.path))),r.currentSpecification.sha256);for(const binding of r.currentBindings)assert(bindings.some(b=>b.key===binding.key&&b.sha256===binding.sha256));for(const p of r.registeredInterpreters)assert.equal(existsSync(resolve(owners.get(p.owner),p.path)),p.present);}
const semantics=auditSemanticContracts(root);assert.equal(semantics.findings.length,0);assert.equal(semantics.summary.passedCases,1341);assert.equal(semantics.summary.ownerWitness.valid,true);
const git=(cwd,args)=>execFileSync('git',['-C',cwd,...args],{maxBuffer:64*2**20});assert.equal(git(root,['rev-parse','HEAD']).toString().trim(),summary.source);assert.equal(git(root,['status','--porcelain']).toString().trim(),'');
assert(git(process.cwd(),['diff','--binary']).equals(read('.platform-reconstitution/bundles/preservation-2026-11-04/supplementary/main-unstaged.patch')));
const result={observedAt:new Date().toISOString(),source:summary.source,passed:true,package:'A1',completionScope:'Every catalogue/duplicate finding is mapped to an actual bounded current specification/bindings or an explicit remaining obligation. No original formal finding is waived or removed.',modules:424,findings:1653,declarationImpacts:impacts,liveBindingFilesVerified:bindings.length,semanticCasesPassed:1341,ownerWitnessStructureValid:true,priorOwnerWitnessExecutionReceipt:'tooling/maintenance/auth-session-policy-migration-2026-11-05/managed-receipts/assembled-semantic-contract-verification.json',newOwnerWitnessExecutionClaimed:false,sourceUnchanged:true,userDiffUnchanged:true,formalFindingsResolved:0,computerUsePaused:true,globalComplete:false};write(join(audit,'verification.json'),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));

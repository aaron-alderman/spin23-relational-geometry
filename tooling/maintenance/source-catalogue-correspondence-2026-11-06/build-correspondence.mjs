import {readFileSync as read,writeFileSync as write,existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import {loadContract} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/platform-assurance-contract.mjs';
import {parseRawRel} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/sdk/rel.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),audit=import.meta.dirname,json=p=>JSON.parse(read(p)),save=(p,v)=>write(join(audit,p),JSON.stringify(v,null,2)+'\n'),sha=b=>createHash('sha256').update(b).digest('hex');
const previous='tooling/maintenance/auth-session-policy-migration-2026-11-05',baseline=json(previous+'/current-assurance.json'),contract=loadContract(root),translations=json(join(root,'assurance/semantic-contract-translations.json')),witnesses=json(join(root,'assurance/retained-witness-migration.json'));
const repositories=new Map(baseline.report.repositories.map(r=>[r.name,r.path])),modules=new Map(json(join(root,'assurance/runtime-module-catalogue.json')).modules.map(r=>[r.key,r])),ownership=new Map(json(join(root,'assurance/runtime-ownership.json')).records.map(r=>[r.repository+'/'+r.path,r]));
const declarations=[...contract.subjects].filter(([,r])=>r.isa?.includes('PlatformModule')),qualified=new Map([...translations.records,...witnesses.records].map(r=>[r.subject,r])),bindings=new Map();
assert.equal(declarations.length,424);assert.equal(qualified.size,424);assert.deepEqual(declarations.map(([id])=>id).sort(),[...qualified.keys()].sort());
const content=new Map();function file(path){if(!content.has(path))content.set(path,read(path));return content.get(path);}
const records=declarations.map(([subject,declaration])=>{
 const q=qualified.get(subject),first=declaration.sourceRepository?.[0],sourceOwner=first?.replace(/^repository\./u,''),oldSource=declaration.source?.[0],oldPath=sourceOwner&&oldSource?resolve(repositories.get(sourceOwner),oldSource):null;
 const spec=q.specification||q.source,specBytes=file(resolve(root,spec));assert.equal(sha(specBytes),q.specificationSha256,subject+' spec changed');
 const retainedOwner=q.retained?.owner||sourceOwner;
 const current=q.bindings.map(b=>{
   const owner=b.owner||b.repository||'sourceryPlatform',path=b.repositoryPath||b.path,key=owner+'/'+path;
   const actual=b.owner?resolve(repositories.get(owner),b.path):resolve(root,b.path),bytes=file(actual);assert.equal(sha(bytes),b.sha256,key+' changed');
   const role=ownership.get(key)?.role||b.role||null;const row={key,owner,path,sha256:b.sha256,role,activeRuntime:modules.has(key),bindingRole:b.role||'runtime',exports:b.exports||[],operation:b.operation||null};
   const old=bindings.get(key);if(old)assert.equal(old.sha256,row.sha256);else bindings.set(key,{...row,subjects:[]});bindings.get(key).subjects.push(subject);return row;
 });
 const registered=[...(declaration.interpreter||[]).map(path=>({path,role:'interpreter'})),...(declaration.interpreterComponent||[]).map(path=>({path,role:'interpreterComponent'}))].map(r=>({...r,owner:sourceOwner,key:sourceOwner+'/'+r.path,present:existsSync(resolve(repositories.get(sourceOwner),r.path)),boundedBindingSameCoordinate:current.some(b=>b.owner===sourceOwner&&b.path===r.path)}));
 const oldBytes=oldPath&&existsSync(oldPath)?file(oldPath):null,oldFacts=oldBytes?parseRawRel(oldBytes.toString(),{file:oldSource}).filter(f=>f.s===subject):[];
 return {subject,sourceOwner,retainedOwner,declaredSource:{path:oldSource,present:!!oldBytes,sha256:oldBytes?sha(oldBytes):null,subjectPresent:oldFacts.length>0,kinds:oldFacts.filter(f=>f.p==='isa').map(f=>f.o)},
  registeredInterpreters:registered,currentSpecification:{owner:'sourceryPlatform',path:spec,sha256:sha(specBytes),kind:q.kind},currentBindings:current,
  currentEvidence:q.cases?{kind:'json-cases',cases:q.cases}:{kind:'named-owner-witnesses',witnesses:q.witnesses},
  preservedAmendmentsSha256:sha(JSON.stringify(q.amendments)),boundedQualificationOnly:true,genericEquivalenceProved:false,
  remainingObligations:subject==='canvas.catalogue.module'?['S1','A2']:['A2'],disposition:q.kind==='BoundedDeclarationContract'?'declaration-observation-with-explicit-nonbehavior-scope':'bounded-current-implementation-with-retained-semantic-gap'};
});
save('module-correspondence.json',records);save('current-bindings.json',[...bindings.values()].sort((a,b)=>a.key.localeCompare(b.key)));
const recordsBySubject=new Map(records.map(r=>[r.subject,r]));
const findings=baseline.report.findings.filter(f=>f.kind.startsWith('module-')||f.kind==='duplicate-semantic-source');
const routes=findings.map(f=>{
 if(f.kind==='duplicate-semantic-source')return {id:f.id,kind:f.kind,occurrences:f.occurrences,members:f.members.map(m=>{const actual=resolve(repositories.get(m.repository),m.path);return {...m,sha256:sha(file(actual)),owner:m.repository};}),disposition:'same-content-fixture-pair-retained-pending-owner-disposition',remainingObligations:['A5'],formalFindingResolved:false,causalEvidenceFamily:f.id};
 const impacts=(f.impacts||[f]).map(impact=>{const subject=impact.module||(impact.repository==='algebra'?impact.path:null),r=recordsBySubject.get(subject);assert(r,'Unmapped '+f.id);return {subject,retainedCoordinate:impact.path,retainedRole:impact.role||null,sourceOwner:r.sourceOwner,currentSpecification:r.currentSpecification,currentBindingKeys:r.currentBindings.map(b=>b.key),
  semanticClaim:'Exact bounded specification correspondence; not equivalence of the missing historical component.',disposition:impact.kind==='module-interpreter-missing'?'missing-declared-coordinate-mapped-to-bounded-current-subsystem':'declared-source-route-differs-from-qualified-specification',remainingObligations:r.remainingObligations};});
 return {id:f.id,kind:f.kind,occurrences:f.occurrences,impacts,formalFindingResolved:false};
});
save('finding-correspondence.json',routes);
const registered=records.flatMap(r=>r.registeredInterpreters),summary={protocol:'sourcery/source-catalogue-correspondence.v1',source:baseline.report.repositories.find(r=>r.name==='sourceryPlatform').head,sourceUnchanged:true,package:'A1',status:'correspondence-complete-open-obligations-linked',modules:records.length,sourceCatalogueFindings:routes.length,declarationImpacts:routes.filter(r=>r.impacts).reduce((n,r)=>n+r.impacts.length,0),distinctImpactedSubjects:new Set(routes.flatMap(r=>r.impacts||[]).map(r=>r.subject)).size,currentBindingFiles:bindings.size,registeredCoordinates:registered.length,missingRegisteredCoordinates:registered.filter(r=>!r.present).length,declarationOnlySubjects:records.filter(r=>r.currentSpecification.kind==='BoundedDeclarationContract').map(r=>r.subject),formalFindingsResolved:0,genericAlgebraProved:false,scientificAcceptance:false,executionGranted:false,computerUsePaused:true,
 inputIdentities:[...contract.sourceIdentity,...['assurance/semantic-contract-translations.json','assurance/retained-witness-migration.json','assurance/runtime-module-catalogue.json','assurance/runtime-ownership.json'].map(path=>({path,sha256:sha(file(resolve(root,path)))}))],next:'A2: complete auth/identity/authorization semantics and explicit effect-port vertical slice; retained registrations are not erased or presented as full historical recovery.'};
save('summary.json',summary);console.log(JSON.stringify(summary));

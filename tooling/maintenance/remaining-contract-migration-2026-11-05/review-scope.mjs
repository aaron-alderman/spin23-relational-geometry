import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import {resolve} from 'node:path';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import {parseRawRel} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/sdk/rel.mjs';
import {factsBySubject} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/rel-fact-index.mjs';
const audit=new URL('./',import.meta.url),read=n=>JSON.parse(readFileSync(new URL(n,audit))),sha=b=>createHash('sha256').update(b).digest('hex');
const previous=JSON.parse(readFileSync(new URL('../core-admissibility-translation-2026-11-05/current-assurance.json',audit))),scope=read('scope.json');
const repositories=new Map(previous.report.repositories.map(r=>[r.name,r]));
const decomposition=JSON.parse(readFileSync(new URL('../active-runtime-reconciliation-2026-11-04/decomposition-reconciliation.json',audit))).rows;
const git=(root,args)=>execFileSync('git',['-c',`safe.directory=${root}`,'-C',root,...args],{maxBuffer:32*1024*1024,stdio:['ignore','pipe','ignore']});
const fields=['sourceDomain','targetDomain','forwardMap','reverseMapOrAbsence','preservedInformation','lostInformation','identity','partiality','failure','authorityEffect','stateOwner','evidence','falsifier','default'];
const cache=new Map(),records=[];
for(const [repository,rows]of Object.entries(scope.groups))for(const row of rows){
 const root=repositories.get(repository).path,key=repository+'/'+row.source;
 if(!cache.has(key)){
  const commits=git(root,['log','--all','--format=%H','--',row.source]).toString().trim().split(/\r?\n/).filter(Boolean),versions=[];
  for(const commit of commits)try{const bytes=git(root,['show',commit+':'+row.source]);versions.push({commit,sha256:sha(bytes),sourceText:bytes.toString(),subjects:factsBySubject(parseRawRel(bytes.toString(),{file:key}))});}catch{}
  cache.set(key,versions);
 }
 const variants=[...new Map(cache.get(key).filter(v=>v.subjects.has(row.subject)).map(v=>[sha(JSON.stringify(v.subjects.get(row.subject))),v])).values()];
 const complete=variants.filter(v=>v.subjects.get(row.subject).isa?.includes('AlgebraModule')&&fields.every(f=>v.subjects.get(row.subject)[f]?.length));
 const declaration=decomposition.find(r=>r.subject===row.subject);
 records.push({...row,repository,root,head:git(root,['rev-parse','HEAD']).toString().trim(),variants:variants.map(v=>({commit:v.commit,sha256:v.sha256,sourceText:v.sourceText,facts:v.subjects.get(row.subject),complete:complete.includes(v)})),completeVariants:complete.length,currentImplementations:(declaration.registrations||[]).filter(r=>existsSync(resolve(root,r.path))).map(r=>({path:r.path,role:r.role,sha256:sha(readFileSync(resolve(root,r.path)))})),qualified:false,disposition:'review-required'});
}
if(records.length!==113||new Set(records.map(r=>r.subject)).size!==113)throw Error('Exact 113-subject scope required');
writeFileSync(new URL('retained-review.json',audit),JSON.stringify({protocol:'sourcery/remaining-contract-review.v1',records,sourceAuthority:false,executionGranted:false,scientificAcceptance:false},null,2)+'\n');
console.log(JSON.stringify({subjects:records.length,owners:repositories.size,missingComplete:records.filter(r=>!r.completeVariants).map(r=>r.subject),ambiguous:records.filter(r=>r.completeVariants>1).map(r=>({subject:r.subject,variants:r.completeVariants})),withoutCurrentImplementations:records.filter(r=>!r.currentImplementations.length).map(r=>r.subject)}));

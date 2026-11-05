import {execFileSync} from 'node:child_process';
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {pathToFileURL} from 'node:url';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
import * as current from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/plugins/data-space/index.mjs';
import {FactStore} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),commit='937a580df650b780a6dabfa15a130ff677b50472';
const bytes=execFileSync('git',['-C',root,'show',commit+':sdk/plugins/data-space/index.mjs'],{maxBuffer:4*1024*1024});
const source=bytes.toString().replaceAll("'./policy-values.mjs'",JSON.stringify(pathToFileURL(resolve(root,'sdk/plugins/data-space/policy-values.mjs')).href));
const previous=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const cases=JSON.parse(readFileSync(resolve(root,'assurance/semantic-contract-cases.json'))).cases,controls=[];
for(const id of ['data-validation-resolution-separator','data-validation-resolution-prototype']){
 const input=cases.find(c=>c.id===id).input.dataSpace,before=previous.resolveDataSpaceValues(structuredClone(input)),after=current.resolveDataSpaceValues(structuredClone(input));
 assert.equal(before[0].state,'valid');assert.equal(after[0].state,'conflict');controls.push({id,beforeState:before[0].state,afterState:after[0].state,negativeControlDetected:true});
}
const f=(s,p,o)=>({s,p,o,pol:'is'}),base=cases.find(c=>c.id==='data-validation-unique-zero').input.facts;
const facts=base.concat([f('key','isa','DataUniquenessKey'),f('key','rule','rule'),f('key','field','field')]);
assert.throws(()=>previous.computeDataValidationResults(FactStore.from(facts),'space'),{name:'ReferenceError',message:'fieldDetails is not defined'});
assert.equal(current.computeDataValidationResults(FactStore.from(facts),'space')[0].state,'valid');
controls.push({id:'single-key-helper-scope',beforeError:'ReferenceError: fieldDetails is not defined',afterState:'valid',negativeControlDetected:true});
// Isolate the subsequent composite-target defect after repairing only the missing lookup.
const lookupOnly=await import('data:text/javascript;base64,'+Buffer.from(source+'\nfunction fieldDetails(dataSpace, subject){return dataSpace.fields.find(field=>field.subject===subject)||null;}').toString('base64'));
const composite=base.filter(row=>!(row.s==='rule'&&row.p==='field')).concat([
 f('other','isa','DataField'),f('other','asset','asset'),f('other','sourceField','other.source'),f('other','inferenceState','accepted'),f('other.source','isa','FileField'),
 f('keyA','isa','DataUniquenessKey'),f('keyA','rule','rule'),f('keyA','field','field'),f('keyB','isa','DataUniquenessKey'),f('keyB','rule','rule'),f('keyB','field','other'),
 f('profile','isa','DataCompositeUniquenessProfile'),f('profile','rule','rule'),f('profile','key','keyA'),f('profile','key','keyB'),f('profile','duplicateCount','0')]);
assert.equal(lookupOnly.computeDataValidationResults(FactStore.from(composite),'space')[0].state,'invalid');
assert.equal(current.computeDataValidationResults(FactStore.from(composite),'space')[0].state,'valid');
controls.push({id:'composite-unrelated-singular-target',beforeState:'invalid',afterState:'valid',negativeControlDetected:true,control:'Old source with only missing field lookup supplied; no current validation algorithm copied.'});
const receipt={previousCommit:commit,previousIndexSha256:createHash('sha256').update(bytes).digest('hex'),controls,allControlsDetected:true,sameRunEngineeringEvidence:true,scientificAcceptance:false};
writeFileSync(new URL('regression-negative-controls.json',import.meta.url),JSON.stringify(receipt,null,2)+'\n');console.log(JSON.stringify({controls:controls.length,passed:true}));

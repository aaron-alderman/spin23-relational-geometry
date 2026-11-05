import {execFileSync} from 'node:child_process';import {readFileSync,writeFileSync} from 'node:fs';import {resolve} from 'node:path';import {pathToFileURL} from 'node:url';import {createHash} from 'node:crypto';import assert from 'node:assert/strict';
import * as current from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/plugins/data-space/index.mjs';
import {trustedBridgePolicyMatch} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/plugins/data-space/trust-bridge.mjs';
import {FactStore} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs';
const root=resolve('.platform-reconstitution/sourcery-platform-reconciled'),commit='04b5fc52f5bed63b989bbde8f39fa84e24dfb204',sha=b=>createHash('sha256').update(b).digest('hex');
const indexBytes=execFileSync('git',['-C',root,'show',commit+':sdk/plugins/data-space/index.mjs'],{maxBuffer:4*1024*1024}),policyBytes=execFileSync('git',['-C',root,'show',commit+':sdk/plugins/data-space/trust-bridge.mjs']);
let index=indexBytes.toString().replaceAll("'./policy-values.mjs'",JSON.stringify(pathToFileURL(resolve(root,'sdk/plugins/data-space/policy-values.mjs')).href));
for(const name of ['createTrustedBridgeExpressionSetResolver','flattenTrustedBridgePolicyConditionGroups','flattenTrustedBridgeExpressionConditionGroups'])index=index.replace('function '+name+'(','export function '+name+'(');
const old=await import('data:text/javascript;base64,'+Buffer.from(index).toString('base64'));
let policy=policyBytes.toString().replace('function trustedBridgePolicyMatch(','export function trustedBridgePolicyMatch(').replaceAll('"./index.mjs"',JSON.stringify(pathToFileURL(resolve(root,'sdk/plugins/data-space/index.mjs')).href));
const oldPolicy=await import('data:text/javascript;base64,'+Buffer.from(policy).toString('base64'));
const cases=JSON.parse(readFileSync(resolve(root,'assurance/semantic-contract-cases.json'))).cases,controls=[];
const f=(s,p,o)=>({s,p,o,pol:'is'}),base=cases.find(c=>c.id==='trusted-bridge-resolved-set').input.facts;
for(const kind of ['group','condition']){
 const rows=base.concat([f('other','isa','DataTrustedBridgeExpressionSet'),f('other','dataSpace','space'),f('other','conditionGroup','otherGroup'),f('otherGroup','isa','DataTrustedBridgeExpressionConditionGroup'),f('otherGroup','expressionSet','other'),f('otherGroup','logicKind','all'),f('otherGroup',kind==='group'?'nextGroup':'condition',kind==='group'?'group':'condition')]);
 const before=old.createTrustedBridgeExpressionSetResolver(FactStore.from(rows),'space');before.resolve('expressionSet');assert.equal(before.resolve('other').subject,'other');const after=current.createTrustedBridgeExpressionSetResolver(FactStore.from(rows),'space');after.resolve('expressionSet');assert.throws(()=>after.resolve('other'),/expressionSet must reference other/);controls.push({family:'cached-expression-owner',branch:kind,oldAccepted:true,currentRefused:true});
}
for(const suffix of ['unknown-logic','missing-operator','unknown-signal','no-members','missing-pattern','absent-numeric-evidence']){
 const spec=cases.find(c=>c.id==='trusted-bridge-runtime-'+suffix);assert.ok(oldPolicy.trustedBridgePolicyMatch(spec.input.context,spec.input.policies)?.policy);assert.equal(trustedBridgePolicyMatch(spec.input.context,spec.input.policies),null);controls.push({family:'malformed-eligibility',branch:suffix,oldMatched:true,currentMatched:false});
}
for(const name of ['flattenTrustedBridgePolicyConditionGroups','flattenTrustedBridgeExpressionConditionGroups']){assert.throws(()=>old[name]({}),TypeError);assert.deepEqual(current[name]({}),[]);controls.push({family:'nonarray-flatten',branch:name,oldError:'TypeError',currentValue:[]});}
writeFileSync(new URL('regression-negative-controls.json',import.meta.url),JSON.stringify({previousCommit:commit,indexSha256:sha(indexBytes),policySha256:sha(policyBytes),method:'Exact preceding module bodies with only private test entry points exposed and static relative imports relocated. Policy controls do not call the imported parser. This isolates these branches rather than replaying the whole preceding application.',controls,causalFamilies:3,allDetected:true,sameRunEngineeringEvidence:true,independentScientificConfirmations:false},null,2)+'\n');console.log({controls:controls.length,causalFamilies:3,passed:true});

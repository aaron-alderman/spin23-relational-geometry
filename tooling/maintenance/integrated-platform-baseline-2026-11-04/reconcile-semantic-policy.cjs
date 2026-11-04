const fs=require('node:fs'),path=require('node:path');
const audit=__dirname,target=path.resolve('.platform-reconstitution/integrated-validation-2026-11-04/semantic-candidate'),changes=[];
function edit(name,before,after){const file=path.join(target,name);let text=fs.readFileSync(file,'utf8');if(!text.includes(before))throw Error('Expected source not found: '+name+' '+before);text=text.replace(before,after);fs.writeFileSync(file,text);changes.push({path:name,before,after});}
const core='sdk/core/';
edit(core+'semantic-mutation-slot-action.mjs','return buildSemanticMutationAction({','return buildSemanticMutationAction({\n    policyFacts: prog?.facts || prog,');
edit(core+'semantic-mutation-action-discovery-subject.mjs','buildDeleteSubjectAction({ subject: request.subject })','buildDeleteSubjectAction({ policyFacts: semantic.facts, subject: request.subject })');
edit(core+'semantic-mutation-reclassification-choices.mjs','return buildReclassifyAction({','return buildReclassifyAction({\n    policyFacts: prog?.facts || prog,');
edit(core+'semantic-mutation-removal.mjs','function removableValueAction(subject, slot, values, projection)','function removableValueAction(subject, slot, values, projection, policyFacts)');
edit(core+'semantic-mutation-removal.mjs','singleRemovalAction(subject, slot, values[0], reference)','singleRemovalAction(subject, slot, values[0], reference, policyFacts)');
edit(core+'semantic-mutation-removal.mjs','multipleRemovalAction(subject, slot, values, projection, reference)','multipleRemovalAction(subject, slot, values, projection, reference, policyFacts)');
edit(core+'semantic-mutation-removal.mjs','function removableValueActions(subject, slot, values, projection)','function removableValueActions(subject, slot, values, projection, policyFacts)');
edit(core+'semantic-mutation-removal.mjs','const action = removableValueAction(subject, slot, values, projection);','const action = removableValueAction(subject, slot, values, projection, policyFacts);');
edit(core+'semantic-mutation-removal-single.mjs','function singleRemovalAction(subject, slot, value, reference)','function singleRemovalAction(subject, slot, value, reference, policyFacts)');
edit(core+'semantic-mutation-removal-single.mjs','const options = {','const options = {\n    policyFacts,');
edit(core+'semantic-mutation-removal-multiple.mjs','function multipleRemovalAction(subject, slot, values, projection, reference)','function multipleRemovalAction(subject, slot, values, projection, reference, policyFacts)');
edit(core+'semantic-mutation-removal-multiple.mjs','return buildSemanticMutationAction({','return buildSemanticMutationAction({\n    policyFacts,');
edit(core+'semantic-mutation-action-discovery-slots.mjs','removableValueActions(request.subject, slot, current, request.projection)','removableValueActions(request.subject, slot, current, request.projection, semantic.facts)');
// Preserve the exact upstream default/authority policies. Historical test fixtures
// must now provide those authored policies instead of assuming a private table.
const fixture=`import {readFileSync as readPolicySource} from 'node:fs';\nimport {parse as parsePolicySource} from '../sdk/core/rel-core.mjs';\nconst policyFacts=parsePolicySource(readPolicySource(new URL('../sdk/plugins/core/stdlib.rel',import.meta.url),'utf8'));\n`;
for(const name of ['semantic-mutation-action-discovery.test.mjs','semantic-mutation-action-diagnostics.test.mjs','semantic-mutation-authority.test.mjs','semantic-mutation-slot-action.test.mjs']){
 const file=path.join(target,'test',name);let text=fs.readFileSync(file,'utf8');text=fixture+text.replaceAll('FactStore.from(', 'withPolicy(');text+=`\nfunction withPolicy(facts){return FactStore.from([...policyFacts,...facts]);}\n`;fs.writeFileSync(file,text);changes.push({path:'test/'+name,amendment:'Fixture supplies selected authored stdlib policies; all assertion expressions unchanged.'});
}
const name='test/semantic-mutation-removal.test.mjs';let text=fs.readFileSync(path.join(target,name),'utf8');
// Append an explicit policy argument to each call using AST source ranges.
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');const offsets=[];
function walk(n){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&['removableValueAction','removableValueActions'].includes(n.callee?.name))offsets.push(n.end-1);for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(walk);else if(v?.type)walk(v);}}
walk(parse(text,{ecmaVersion:'latest',sourceType:'module'}));for(const offset of offsets.sort((a,b)=>b-a)){const left=text.slice(0,offset);text=left+(left.trimEnd().endsWith(',')?' policyFacts':', policyFacts')+text.slice(offset);}fs.writeFileSync(path.join(target,name),fixture+text);changes.push({path:name,amendment:'Explicit authored policy facts argument, preserving assertions.'});
fs.writeFileSync(path.join(audit,'semantic-policy-reconciliation.json'),JSON.stringify({changes,scope:'Retain selected authored policy, wire recovered callers explicitly; no default grant or private operation fallback.'},null,2)+'\n');

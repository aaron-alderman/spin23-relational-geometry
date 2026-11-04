const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const root=path.resolve('.platform-reconstitution/sourcery-platform-reconciled'),core=path.join(root,'sdk/core');
const valueFile=path.join(core,'semantic-mutation-values.mjs');let v=fs.readFileSync(valueFile,'utf8');
v=v.replace('name:String(mutation?.name||\'\').trim(),representation:String(mutation?.representation||\'\').trim()','name:mutation?.name==null?\'\':String(mutation.name).trim(),representation:mutation?.representation==null?\'\':String(mutation.representation).trim()');
v=v.replace("subject:subject||'<unknown>',diagnosticSubject:subject||'',predicate:predicate||''","subject:text(subject)||'<unknown>',diagnosticSubject:text(subject),predicate:text(predicate)");
v=v.replace('function mutationReceiptFields(', 'export function mutationReceiptFields(');
v=v.replace("slot.cardinality===policy.manyCardinality||!own(record,slot.predicate)","[policy.manyCardinality,'min1'].includes(slot.cardinality)||!own(record,slot.predicate)");
// Keep the exact row-copy wording in one implementation, used by both the
// adapter list planner and the existing adapter row public API.
const adapterFile=path.join(core,'semantic-mutation-choice-adapter-row.mjs'),adapter=fs.readFileSync(adapterFile,'utf8');const row=parse(adapter,{ecmaVersion:'latest',sourceType:'module'}).body.find(n=>n.declaration?.id?.name==='adapterTransformChoiceRow').declaration;
v+='\nexport '+adapter.slice(row.start,row.end).replace('function adapterTransformChoiceRow','function mutationAdapterTransformChoiceRowValue')+'\n';
const va=parse(v,{ecmaVersion:'latest',sourceType:'module'}),details=va.body.find(n=>n.declaration?.id?.name==='mutationAdapterChoiceDetailsValue').declaration;
v=v.slice(0,details.body.start)+`{\n if(!mutationRequiresStrictChoiceValidationValue(contract,policy))return null;if(!sourceType||!targetType)return[];\n const unnecessary=sourceType===targetType&&sourceType!=='blob';\n return transforms.map(transform=>mutationAdapterTransformChoiceRowValue(transform,sourceType,targetType,unnecessary));\n}`+v.slice(details.body.end);
fs.writeFileSync(valueFile,v);
fs.writeFileSync(adapterFile,'export { mutationAdapterTransformChoiceRowValue as adapterTransformChoiceRow } from "./semantic-mutation-values.mjs";\n');
const server=path.join(root,'sdk/server/mutation-runtime.mjs');let s=fs.readFileSync(server,'utf8');const receipt=parse(s,{ecmaVersion:'latest',sourceType:'module'}).body.find(n=>n.type==='FunctionDeclaration'&&n.id.name==='runtimeReceiptFields');s=s.slice(0,receipt.start)+s.slice(receipt.end);fs.writeFileSync(server,'import { mutationReceiptFields as runtimeReceiptFields } from "../core/semantic-mutation-values.mjs";\n'+s);
const admissionFile=path.join(core,'semantic-mutation-admission-result.mjs');let admission=fs.readFileSync(admissionFile,'utf8');admission=admission.replace('() => mutationAdmissionBasis(combinedFacts, delta, admissionInterfaces)\n    .filter(fact => mutationAdmissionResultFieldsValue({ delta, basisFacts: [fact] }).basisFacts.length)','() => mutationAdmissionResultFieldsValue({ delta, basisFacts: mutationAdmissionBasis(combinedFacts, delta, admissionInterfaces) }).basisFacts');fs.writeFileSync(admissionFile,admission);
const rep=path.join(core,'semantic-mutation-context-reference-representation.mjs');fs.writeFileSync(rep,fs.readFileSync(rep,'utf8').replace('operation:POLICY.representReferenceOperation','operation:POLICY.referenceRepresentationOperation'));
// Cardinality vocabulary continues to come from its authored owner. Absence
// retains the established public default; an explicit unknown value refuses.
const slots=path.join(core,'semantic-mutation-slots.mjs');let sl=fs.readFileSync(slots,'utf8');const sa=parse(sl,{ecmaVersion:'latest',sourceType:'module'}),sm=sa.body.find(n=>n.declaration?.id?.name==='slotIsMany').declaration;
sl=sl.slice(0,sm.body.start)+'{\n  return slot.cardinality === undefined ? false : cardinalityAllowsMany(slot.cardinality);\n}'+sl.slice(sm.body.end);fs.writeFileSync(slots,'import { cardinalityAllowsMany } from "./admissibility/slot-semantics-policy.mjs";\n'+sl);
// Remove unreachable private helpers and unused import bindings left by the
// extraction; this does not remove exported APIs or side-effect-only imports.
const modified=cp.execFileSync('git',['-C',root,'status','--porcelain=v1','-z'],{encoding:'utf8'}).split('\0').map(line=>line.slice(3)).filter(n=>n.startsWith('sdk/')&&n.endsWith('.mjs')&&!n.includes('semantic-mutation-contracts/'));
function visit(node,fn){if(!node||typeof node!=='object')return;fn(node);for(const value of Object.values(node)){if(Array.isArray(value))value.forEach(n=>visit(n,fn));else if(value?.type)visit(value,fn);}}
for(const name of modified){const file=path.join(root,name);let text=fs.readFileSync(file,'utf8');let changed=true;while(changed){changed=false;const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),refs=new Map();visit(ast,n=>{if(n.type==='Identifier'){if(!refs.has(n.name))refs.set(n.name,new Set());refs.get(n.name).add(n.start);}});const edits=[];for(const n of ast.body){if(n.type==='FunctionDeclaration'&&refs.get(n.id.name)?.size===1)edits.push({start:n.start,end:n.end,text:''});if(n.type==='ImportDeclaration'&&n.specifiers.length){const kept=n.specifiers.filter(spec=>(refs.get(spec.local.name)?.size||0)>1);if(kept.length!==n.specifiers.length){if(!kept.length)edits.push({start:n.start,end:n.end,text:''});else {const prefix=kept.map(spec=>spec.type==='ImportSpecifier'?(spec.imported.name===spec.local.name?spec.local.name:spec.imported.name+' as '+spec.local.name):null);if(prefix.every(Boolean))edits.push({start:n.start,end:n.end,text:'import { '+prefix.join(', ')+' } from '+JSON.stringify(n.source.value)+';'});}}}}
for(const e of edits.sort((a,b)=>b.start-a.start)){text=text.slice(0,e.start)+e.text+text.slice(e.end);changed=true;}}
fs.writeFileSync(file,text.replace(/\n{3,}/g,'\n\n'));
}
console.log(JSON.stringify({modifiedModulesCleaned:modified.length}));

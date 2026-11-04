const fs=require('node:fs'),path=require('node:path');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const core=path.resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/core'),changes=[];
function edit(file,name,body,imports=[]){let text=fs.readFileSync(file,'utf8');const n=parse(text,{ecmaVersion:'latest',sourceType:'module'}).body.map(n=>n.declaration||n).find(n=>n.type==='FunctionDeclaration'&&n.id.name===name);if(!n)throw Error(name);changes.push({file,function:name,before:text.slice(n.start,n.end)});text=text.slice(0,n.body.start)+'{\n'+body+'\n}'+text.slice(n.body.end);for(const symbol of imports){const line='import { '+symbol+' } from "./semantic-mutation-values.mjs";\n';if(!text.includes(line))text=line+text;}fs.writeFileSync(file,text);}
const V=(name,body)=>edit(path.join(core,'semantic-mutation-values.mjs'),name,body);
const R=(file,name,body,...imports)=>edit(path.join(core,'semantic-mutation-'+file+'.mjs'),name,body,imports);
V('mutationAuthorityResolutionValue',` if(subjectAuthorized)return{allowed:true,mode:'subject',authoritySubject:subject,helperTargets:[]};
 const targets=scopedTargets.length?unique([...helperTargets,...scopedTargets]):helperTargets;
 if(authorizedHelper)return{allowed:true,mode:'helper-target',authoritySubject:authorizedHelper,helperTargets:targets};
 return authorizedTarget?{allowed:true,mode:'scope-target',authoritySubject:authorizedTarget,helperTargets:targets}:{allowed:false,mode:'',authoritySubject:'',helperTargets:targets};`);
R('authority','resolvePropertyMutationAuthority',` if(hasSubjectMutationAuthority(combinedFacts,actor,subject))return{...mutationAuthorityResolutionValue({subject,subjectAuthorized:true}),helperTargets:Object.freeze([])};
 const helperTargets=helperMutationAuthorityTargets(combinedFacts,subject),scopedTargets=scopedAuthorityTargets(combinedFacts,subject),targets=uniqueRefList([...helperTargets,...scopedTargets]);
 const authorized=targets.find(target=>hasSubjectMutationAuthority(combinedFacts,actor,target));
 return mutationAuthorityResolutionValue({subject,helperTargets:targets,authorizedHelper:helperTargets.includes(authorized)?authorized:'',authorizedTarget:helperTargets.includes(authorized)?'':authorized});`,'mutationAuthorityResolutionValue');
R('authority-scope','scopedAuthorityTargets',' const store=asStore(facts);\n return Object.freeze(mutationScopedAuthorityTargetsValue(subject,id=>scopeValue(store,id),id=>relatedSubjects(store,id)));','mutationScopedAuthorityTargetsValue');
R('contract-resolution-values','preferredSiblingText',' return mutationPreferredSiblingTextValue(projectedValue,currentValue,POLICY.missingSiblingValue);','mutationPreferredSiblingTextValue');
// Assignment predicate selection is a single projection; its callers still
// decide when to read records and current facts.
const assignment=path.join(core,'semantic-mutation-contract-resolution-assignment.mjs');let as=fs.readFileSync(assignment,'utf8');
const predicateLine=as.split('\n').find(line=>line.includes('assignmentPredicate')&&line.includes('String('));
if(predicateLine){const expression=predicateLine.match(/String\((.*)\)\.trim\(\)/);if(expression)as=as.replace(expression[0],`mutationAssignmentPredicateValue({recordPredicate:${expression[1]}})`);}
// The shared resolver consumes it even when no direct-expression path exists.
const resolveValues=path.join(core,'semantic-mutation-contract-resolution-values.mjs');let rv=fs.readFileSync(resolveValues,'utf8');rv=rv.replace('return mutationPreferredSiblingTextValue(projectedValue,currentValue,POLICY.missingSiblingValue);','return mutationPreferredSiblingTextValue(projectedValue,currentValue,POLICY.missingSiblingValue);');
// Use the predicate planner in the lazy candidate selector's name comparison.
const vf=path.join(core,'semantic-mutation-values.mjs');let values=fs.readFileSync(vf,'utf8');values=values.replace('mutationPreferredSiblingTextValue(c.projectedPredicate,c.currentPredicate,missing).trim()','mutationAssignmentPredicateValue({recordPredicate:c.projectedPredicate,resolvedPredicate:mutationPreferredSiblingTextValue("",c.currentPredicate,missing)})');
values=values.replace('String(subject||\'\').trim()','String(subject).trim()');
values=values.replace("if(reason==='incoming')return result(policy.incomingDiagnostic,`Subject ${subject} cannot be deleted while incoming references remain.`", "if(reason==='incoming')return result(policy.incomingDiagnostic,`Subject ${subject} cannot be deleted while other facts still reference it.`");
values=values.replace('`Actor ${actor} lacks ${operation} authority for ${subject}.`','`Actor ${actor} lacks classification authority for ${subject}.`').replace('`Subject ${subject} is incompatible with ${type}.`','`Subject ${subject} is not compatible with ${type}.`');
values=values.replace('Unknown semantic mutation operation:','Unknown mutation operation:');
values=values.replace('const types=facts.filter(f=>f.s===subject&&f.p===predicate).map(f=>f.o),matches=', 'const types=unique(facts.filter(f=>f.s===subject&&f.p===predicate).map(f=>f.o).filter(Boolean)),matches=');
values=values.replace('mutationCreateFactsSubjectTypesValue(facts)',"mutationCreateFactsSubjectTypesValue(facts,typePredicate='isa')").replace("facts.filter(f=>f.p==='isa')","facts.filter(f=>f.p===typePredicate)");
values=values.replace('valueType:slot.valueType,value},policy.invalidValueStatus)','valueType:type,value},policy.invalidValueStatus)');
fs.writeFileSync(vf,values);fs.writeFileSync(assignment,as);
R('contract-duplicate','duplicateContractValueReason',` if(context.operation!==POLICY.duplicateOperation)return'';
 const slot=Object(contract.slot),explicit=Array.isArray(context.existingValues)?context.existingValues:[],values=explicit.length?explicit:existingContractValues(contract);
 return mutationDuplicateChoiceReasonValue({operation:context.operation,duplicateOperation:POLICY.duplicateOperation,value,existingValues:values,compatibleRefType:contract.compatibleRefType,allowedValues:Array.isArray(slot.allowed)?slot.allowed:[],refSlot:slotIsRef(slot),policy:POLICY});`,'mutationDuplicateChoiceReasonValue');
R('contract-validation','validateContractValue',` const intrinsicReason=validateContractIntrinsicValue(contract,value),duplicateReason=duplicateContractValueReason(contract,value,context),slot=Object(contract.slot);
 const plan=mutationContractValidationPlanValue({intrinsicReason,duplicateReason,subject:contract.subject,predicate:slot.predicate,value});if(plan.status==='ok')return;
 helpers.failSemantic(helpers.mutationIssue('invalid-mutation-value',\`Mutation value for \${plan.subject}.\${plan.predicate} is invalid: \${plan.reason}.\`,{subject:plan.diagnosticSubject,predicate:plan.predicate,value,reason:plan.reason}),{statusCode:400});`,'mutationContractValidationPlanValue');
R('delete-subject','executeDeleteSubjectMutation',` const {dynamicFacts,subject,meta}=input;helpers.authorize();
 const incoming=helpers.currentIncomingActiveFacts(dynamicFacts,subject);
 if(incoming.length){const r=mutationDeleteSubjectRefusalValue({reason:'incoming',subject,references:incoming,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode});}
 const currentFacts=dynamicFacts.factsForSubject(subject).filter(f=>f.pol===POLICY.currentPolarity);
 if(!currentFacts.length){const r=mutationDeleteSubjectRefusalValue({reason:'empty',subject,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode});}
 return mutationDeleteSubjectDeltaValue(subject,currentFacts,POLICY.deltaPolarity,(...args)=>helpers.deltaFact(...args),meta);`,'mutationDeleteSubjectRefusalValue','mutationDeleteSubjectDeltaValue');
// Preserve the admissibility issue class and its exact subject details.
let pi=fs.readFileSync(path.join(core,'semantic-mutation-projection-interface.mjs'),'utf8');
pi=pi.replace('const slot = iface?.slots.find(candidate => candidate[POLICY.slotPredicateField] === predicate);','const slot = iface?.slots.find(candidate => candidate[POLICY.slotPredicateField] === predicate);');
R('projection-interface','activeInterface',` const types=Array.isArray(record?.[POLICY.typeField])?record[POLICY.typeField]:[],matches=types.filter(type=>interfaces.has(type));
 if(matches.length>1){const subject=record?.[POLICY.subjectField]?record[POLICY.subjectField]:POLICY.missingSubjectIdentity;helpers.fail(helpers.issue(POLICY.ambiguousInterfaceDiagnostic,\`Subject matches multiple schema interfaces: \${matches.join(', ')}.\`,{subject}));}
 return mutationActiveInterfaceValue(record,interfaces,POLICY);`,'mutationActiveInterfaceValue');
R('property-canonicalization','canonicalizeMutationValue',` const mimeType=mutation.mimeType===undefined?POLICY.missingMimeType:mutation.mimeType;
 try{return canonicalizeSlotValue(slot,mutation.value,{mimeType});}catch(error){const r=mutationPropertyCanonicalizationRefusalValue({subject,slot,value:mutation?.value,errorMessage:error.message,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode});}`,'mutationPropertyCanonicalizationRefusalValue');
// Keep scalar retractions introduced by the predecessor integration. The value
// plan below owns only the positive value/MIME component of the write.
const write=path.join(core,'semantic-mutation-property-write.mjs');let wt=fs.readFileSync(write,'utf8');const begin=wt.indexOf('  delta.push(helpers.deltaFact(subject, slot.predicate, canonical.value, POLICY.positivePolarity, meta));'),end=wt.indexOf('  return Object.freeze',begin);if(begin<0||end<0)throw Error('Property positive write not found');wt=wt.slice(0,begin)+`  delta.push(...mutationPropertyWriteDeltaValue({subject,predicate:slot.predicate,value:canonical.value,valueType:slot.valueType,mimePredicate:slot.mimePredicate,mimeType:canonical.mimeType,polarity:POLICY.positivePolarity,meta},(...args)=>helpers.deltaFact(...args)));\n`+wt.slice(end);fs.writeFileSync(write,'import { mutationPropertyWriteDeltaValue } from "./semantic-mutation-values.mjs";\n'+wt);
// Context operations share refusal/value plans while retaining effect order.
for(const [file,functions]of [['context-attach',['executeAttachContextMutation']],['context-detach',['executeDetachContextMutation']],['context-reference-create',['executeReferenceContextMutation']],['context-reference-edit',['executeContextReferenceEdit']],['context-binding-edit',['executeContextBindingEdit']]]){
 const target=path.join(core,'semantic-mutation-'+file+'.mjs');let t=fs.readFileSync(target,'utf8');
 const ast=parse(t,{ecmaVersion:'latest',sourceType:'module'});const calls=[];
 function walk(n){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&n.callee?.object?.name==='helpers'&&n.callee.property?.name==='fail'&&n.arguments[0]?.type==='CallExpression')calls.push(n);for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(walk);else if(v?.type)walk(v);}}walk(ast);
 const symbols=new Set();
 for(const call of calls.sort((a,b)=>b.start-a.start)){const old=t.slice(call.start,call.end);let symbol,args;
  if(old.includes('Unknown context representation')){symbol='mutationUnknownRepresentationRefusalValue';args='{subject,context,representation,policy:POLICY}';}
  else if(old.includes('already visible')){symbol='mutationContextVisibilityRefusalValue';args="{reason:'already-visible',subject,context,policy:POLICY}";}
  else if(old.includes('already referenced')){symbol='mutationReferenceCreationRefusalValue';args="{reason:'already-referenced',subject,context,policy:POLICY}";}
  else if(old.includes('taxonomy-wide')){symbol='mutationContextVisibilityRefusalValue';args="{reason:'taxonomy-only',subject,context,policy:POLICY}";}
  else if(old.includes('no explicit context binding')){symbol='mutationContextVisibilityRefusalValue';args="{reason:'no-binding',subject,context,policy:POLICY}";}
  else if(old.includes('no explicit context reference')){symbol='mutationReferenceEditRefusalValue';args="{reason:'missing-reference',subject,context,reference:referenceInput,policy:POLICY}";}
  else if(old.includes('non-empty scoped name')){symbol=file==='context-reference-create'?'mutationReferenceCreationRefusalValue':'mutationReferenceEditRefusalValue';args="{reason:"+JSON.stringify(file==='context-reference-create'?'missing-name':'empty-name')+",subject,context,policy:POLICY}";}
  if(!symbol)continue;symbols.add(symbol);
  const options=call.arguments[1]?t.slice(call.arguments[1].start,call.arguments[1].end):'undefined';
  const replacement=`((refusal)=>helpers.fail(helpers.issue(refusal.code,refusal.message,refusal.details),${options}))(${symbol}(${args}))`;
  t=t.slice(0,call.start)+replacement+t.slice(call.end);
 }
 for(const symbol of symbols)t='import { '+symbol+' } from "./semantic-mutation-values.mjs";\n'+t;
 // Name/representation extraction remains lazy inside the selected branch.
 if(file==='context-reference-edit'||file==='context-binding-edit'){
  t=t.replace('const nameInput = mutation.name === undefined ? POLICY.missingName : mutation.name;',"const nameInput = mutationContextEditPlanValue({operation,mutation:{name:mutation.name},policy:POLICY}).name;");
  t=t.replace('const representationInput = mutation.representation === undefined ? POLICY.missingRepresentation : mutation.representation;',"const representationInput = mutationContextEditPlanValue({operation,mutation:{representation:mutation.representation},policy:POLICY}).representation;");
  t='import { mutationContextEditPlanValue } from "./semantic-mutation-values.mjs";\n'+t;
 }
 if(file==='context-attach'){
  t=t.replace('if (mutation.name != null && String(mutation.name).trim()) {\n    const name = helpers.canonicalizeValue("string", String(mutation.name).trim());',"const nameField=mutationContextOptionalFieldsValue({name:mutation.name}).name;\n  if(nameField){\n    const name = helpers.canonicalizeValue(\"string\", nameField);");
  t=t.replace('if (mutation.representation != null && String(mutation.representation).trim()) {\n    const representation = helpers.canonicalizeValue("ref", String(mutation.representation).trim());',"const representationField=mutationContextOptionalFieldsValue({representation:mutation.representation}).representation;\n  if(representationField){\n    const representation = helpers.canonicalizeValue(\"ref\", representationField);");
  t='import { mutationContextOptionalFieldsValue } from "./semantic-mutation-values.mjs";\n'+t;
 }
 fs.writeFileSync(target,t);
}
// The reference-specific authority adapter retains exact semantic error details.
const rep=path.join(core,'semantic-mutation-context-reference-representation.mjs');let rt=fs.readFileSync(rep,'utf8');const ra=parse(rt,{ecmaVersion:'latest',sourceType:'module'});let authorityCall;
function find(n){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&n.callee?.object?.name==='helpers'&&n.callee.property?.name==='fail'&&rt.slice(n.start,n.end).includes('lacks'))authorityCall=n;for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(find);else if(v?.type)find(v);}}find(ra);
if(authorityCall){const old=rt.slice(authorityCall.start,authorityCall.end),scopeName=old.includes('representationScope.')?'representationScope':'scope';rt=rt.slice(0,authorityCall.start)+`((r)=>helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode}))(mutationReferenceRepresentationAuthorityRefusalValue({actor,subject,context,operation:POLICY.representReferenceOperation,authority:${scopeName}.authority,grant:${scopeName}.grant,policy:POLICY}))`+rt.slice(authorityCall.end);rt='import { mutationReferenceRepresentationAuthorityRefusalValue } from "./semantic-mutation-values.mjs";\n'+rt;fs.writeFileSync(rep,rt);}
// Reclassification refusal and delta extraction leaves authority checks and
// compatibility evaluation in the same order.
const reclass=path.join(core,'semantic-mutation-reclassification-execution.mjs');let rc=fs.readFileSync(reclass,'utf8');const start=rc.indexOf('  const currentTypes ='),stop=rc.indexOf('\n  return delta;',start);if(start<0||stop<0)throw Error('Reclassification delta missing');rc=rc.slice(0,start)+`  const currentTypes=recordTypes.filter(type=>interfaces.has(type));\n  const delta=mutationReclassificationTypeDeltaValue(subject,currentTypes,targetType,POLICY.typePredicate,POLICY.negativePolarity,POLICY.positivePolarity,(...args)=>helpers.deltaFact(...args),meta);`+rc.slice(stop);rc='import { mutationReclassificationTypeDeltaValue } from "./semantic-mutation-values.mjs";\n'+rc;
const rca=parse(rc,{ecmaVersion:'latest',sourceType:'module'}),refusals=[];function collect(n){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&n.callee?.object?.name==='helpers'&&n.callee.property?.name==='fail')refusals.push(n);for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(collect);else if(v?.type)collect(v);}}collect(rca);
for(const call of refusals.sort((a,b)=>b.start-a.start)){const old=rc.slice(call.start,call.end),reason=old.includes('lacks classification')?'authority':old.includes('Unknown interface')?'unknown-target':'incompatible';const args=reason==='authority'?'{actor,subject,operation:mutation.operation,scope,policy:POLICY}':reason==='unknown-target'?'{subject,type:targetType,policy:POLICY}':'{subject,type:targetType,issues,policy:POLICY}';rc=rc.slice(0,call.start)+`((r)=>helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode}))(mutationReclassificationRefusalValue({reason:${JSON.stringify(reason)},...${args}}))`+rc.slice(call.end);}
rc='import { mutationReclassificationRefusalValue } from "./semantic-mutation-values.mjs";\n'+rc;fs.writeFileSync(reclass,rc);
fs.writeFileSync(path.join(__dirname,'final-runtime-wiring.json'),JSON.stringify({changes,scope:'Remaining planners and refusals are consumed by real domain owners. Positive write plans remain separate from scalar retractions. Framed target fingerprints retain all history.'},null,2)+'\n');console.log(JSON.stringify({functionsChanged:changes.length}));

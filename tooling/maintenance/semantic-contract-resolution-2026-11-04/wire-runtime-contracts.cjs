const fs=require('node:fs'),path=require('node:path');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const core=path.resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/core'),changes=[];
function fn(file,name,body,imports=[]){let text=fs.readFileSync(file,'utf8');const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),node=ast.body.map(n=>n.type==='ExportNamedDeclaration'?n.declaration:n).find(n=>n?.type==='FunctionDeclaration'&&n.id.name===name);if(!node)throw Error(name);changes.push({path:file,function:name,before:text.slice(node.start,node.end),body});text=text.slice(0,node.body.start)+'{\n'+body+'\n}'+text.slice(node.body.end);if(imports.length&&!text.includes('import { '+imports.join(', ')+' } from "./semantic-mutation-values.mjs";'))text='import { '+imports.join(', ')+' } from "./semantic-mutation-values.mjs";\n'+text;fs.writeFileSync(file,text);}
const V=(name,body)=>fn(path.join(core,'semantic-mutation-values.mjs'),name,body);
const R=(file,name,body,...imports)=>fn(path.join(core,'semantic-mutation-'+file+'.mjs'),name,body,imports);
V('mutationBindingActionRowsValue',` const rows=[],name=String(first(contextName,context));
 if(authorized.rename)rows.push(actionRow(\`rename in [\${name}]...\`,policy.renameBindingOperation,subject,context,policy,{binding:String(first(binding?.subject))},{message:\`Rename \${subject} in \${context}\`,defaultValue:String(first(binding?.name))}));
 if(authorized.represent)rows.push(actionRow(\`set representation in [\${name}]...\`,policy.representBindingOperation,subject,context,policy,{binding:String(first(binding?.subject))},{message:\`Set representation for \${subject} in \${context}\`,defaultValue:String(first(binding?.representation))}));
 if(authorized.detach&&binding)rows.push(actionRow(\`detach from [\${name}]\`,policy.detachBindingOperation,subject,context,policy));return rows;`);
V('mutationReferenceActionRowsValue',` const rows=[],name=String(first(contextName,context)),extra={reference:String(first(reference?.subject))};
 if(authorized.rename)rows.push(actionRow(\`rename reference in [\${name}]...\`,policy.renameReferenceOperation,subject,context,policy,extra,{message:\`Rename reference for \${subject} in \${context}\`,defaultValue:String(first(reference?.name))}));
 if(authorized.represent)rows.push(actionRow(\`set reference representation in [\${name}]...\`,policy.representReferenceOperation,subject,context,policy,extra,{message:\`Set reference representation for \${subject} in \${context}\`,defaultValue:String(first(reference?.representation))}));
 if(authorized.remove)rows.push(actionRow(\`remove reference from [\${name}]\`,policy.removeReferenceOperation,subject,context,policy,extra));return rows;`);
V('mutationContextActionRowsValue',` if(member)return[];const rows=[];
 if(authorized.attach)rows.push(actionRow(\`attach to [\${spec.name}]...\`,policy.attachOperation,subject,spec.subject,policy,{}, {message:\`Attach \${subject} to \${spec.name}. Optional scoped name\`,defaultValue:'',allowBlank:true}));
 if(authorized.reference&&!hasReference)rows.push(actionRow(\`reference in [\${spec.name}]...\`,policy.referenceOperation,subject,spec.subject,policy,{}, {message:\`Create a reference to \${subject} in \${spec.name}\`,defaultValue:''}));return rows;`);
R('action-discovery-binding','currentBindingActions',` if(!request.context||!currentMatches.has(request.context))return[];
 const binding=helpers.explicitBindingForMutation(semantic,request.context,request.subject),rows=[];
 for(const [key,operation]of [['rename',POLICY.renameBindingOperation],['represent',POLICY.representBindingOperation],['detach',POLICY.detachBindingOperation]]){
  const scope=authorityScopeForOperation(semantic,request.actor,operation,{context:request.context,subject:request.subject,record});
  if(scope.allowed)rows.push(...mutationBindingActionRowsValue({subject:request.subject,context:request.context,contextName,binding,authorized:{[key]:true},policy:POLICY}));
 }return rows;`,'mutationBindingActionRowsValue');
R('action-discovery-reference','currentReferenceActions',` if(!request.context||currentMatches.has(request.context))return[];
 if(!helpers.activeSubjectReferences(semantic,request.context,request.subject).length)return[];
 const reference=helpers.explicitReferenceForMutation(semantic,request.context,request.subject),rows=[];
 for(const [key,operation]of [['rename',POLICY.renameReferenceOperation],['represent',POLICY.representReferenceOperation],['remove',POLICY.removeReferenceOperation]]){
  const scope=authorityScopeForOperation(semantic,request.actor,operation,{context:request.context,subject:request.subject,record});
  if(scope.allowed)rows.push(...mutationReferenceActionRowsValue({subject:request.subject,context:request.context,contextName,reference,authorized:{[key]:true},policy:POLICY}));
 }return rows;`,'mutationReferenceActionRowsValue');
R('action-discovery-contexts','availableContextActions',` const rows=[];
 for(const spec of specs){const member=currentMatches.has(spec.subject);
  const attach=authorityScopeForOperation(semantic,request.actor,POLICY.attachOperation,{context:spec.subject,subject:request.subject,record});
  if(!member&&attach.allowed)rows.push(...mutationContextActionRowsValue({subject:request.subject,spec,member,authorized:{attach:true},policy:POLICY}));
  const reference=authorityScopeForOperation(semantic,request.actor,POLICY.referenceOperation,{context:spec.subject,subject:request.subject,record});
  if(!member&&!helpers.activeSubjectReferences(semantic,spec.subject,request.subject).length&&reference.allowed)rows.push(...mutationContextActionRowsValue({subject:request.subject,spec,member,authorized:{reference:true},policy:POLICY}));
 }return rows;`,'mutationContextActionRowsValue');
R('action-diagnostics','discoverSemanticActionDiagnostics',` const input=actionDiscoveryInputDiagnostics(request.subject,request.actor);
 const plan=fields=>Object.freeze(mutationActionDiagnosticsPlanValue({subject:request.subject,actor:request.actor,context:request.context,policy:POLICY,...fields}));
 if(input.length)return input;
 const record=helpers.visibleRecord(request.projection,request.subject);
 if(!record)return plan({});
 const current=new Set(contextMembershipMatchesForSubject(semantic,request.projection,request.subject).map(match=>match.context));
 const authority=hasDiscoveryAuthority(semantic,request.actor,request.subject,request.context,record,current,helpers);
 return plan({subjectVisible:true,authority,actionCount:authority?request.actions.length:0});`,'mutationActionDiagnosticsPlanValue');
R('contract-prompt','validateContractPromptValue',' return mutationContractPromptValidationValue(spec,value);','mutationContractPromptValidationValue');
// Preserve the authored sibling label in the exported validation rules too.
const rules=path.join(core,'semantic-mutation-contract-prompt-rules.mjs');
for(const [name,kind]of [['positiveNumber','positiveNumber'],['lessThanSiblingNumber','lessThanSiblingNumber'],['greaterThanSiblingNumber','greaterThanSiblingNumber']])fn(rules,name,` return mutationContractPromptValidationValue({...spec,kind:${JSON.stringify(kind)}},numeric,POLICY.missingSiblingPredicate);`,['mutationContractPromptValidationValue']);
R('property-route-execution','authorizeSubjectPropertyMutation',` const {semantic,actor,combinedFacts,subject,operation}=input;
 const authority=helpers.resolveAuthority(semantic,actor,combinedFacts,subject);if(authority.allowed)return;
 const refusal=mutationSubjectAuthorityRefusalValue({actor,subject,operation,helperTargets:authority.helperTargets,policy:POLICY});
 helpers.fail(helpers.issue(refusal.code,refusal.message,refusal.details),{statusCode:refusal.statusCode});`,'mutationSubjectAuthorityRefusalValue');
R('slot-action-prompt','intrinsicSlotPrompt',' return mutationIntrinsicSlotPromptValue(slot,subject,record,typedRecord,mode,POLICY,slotEditorCopy,currentCanonicalDefault);','mutationIntrinsicSlotPromptValue');
// Preserve authorizing and canonicalizing order. Planning consumes already read
// values and never substitutes an authorization decision.
R('property-clear','propertyClearDelta',` const {combinedFacts,subject,slot,mutation,meta}=input;
 const clearable=POLICY.clearableCardinalities.has(slot.cardinality);
 const current=clearable?helpers.currentSingleValue(combinedFacts,subject,slot.predicate):undefined;
 const present=clearable&&current!=null?helpers.hasPresentMutationValue(mutation):false;
 const canonicalValue=present?helpers.canonicalizeMutationValue(slot,mutation,subject).value:undefined;
 const plan=mutationPropertyClearPlanValue({clearable,current,hasMutationValue:present,canonicalValue,cardinality:slot.cardinality,unboundedCardinality:POLICY.unboundedCardinality});
 if(!plan.ok){const r=mutationPropertyClearRefusalValue({reason:plan.reason,subject,predicate:slot.predicate,cardinality:slot.cardinality,target:plan.target,current,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),r.statusCode===undefined?undefined:{statusCode:r.statusCode});}
 return[helpers.deltaFact(subject,slot.predicate,plan.target,POLICY.negativePolarity,meta)];`,'mutationPropertyClearPlanValue','mutationPropertyClearRefusalValue');
R('property-remove-target','resolvePropertyRemovalTarget',` const {subject,slot,mutation,current}=input;
 const hasMutationValue=helpers.hasPresentMutationValue(mutation),canonicalValue=hasMutationValue?helpers.canonicalizeMutationValue(slot,mutation,subject).value:undefined;
 const plan=mutationPropertyRemovalTargetValue({hasMutationValue:hasMutationValue&&canonicalValue!==undefined,canonicalValue,current});
 if(!plan.ok)helpers.fail(helpers.issue(POLICY.removeValueDiagnostic,\`Removing \${subject}.\${slot.predicate} requires an explicit current value when multiple values are present.\`,{subject,predicate:slot.predicate,current}),{statusCode:POLICY.badRequestStatus});return plan.target;`,'mutationPropertyRemovalTargetValue');
R('property-remove','propertyRemovalDelta',` const {combinedFacts,subject,slot,mutation,meta}=input,current=helpers.currentActiveValues(combinedFacts,subject,slot.predicate);
 const early=slot.cardinality===POLICY.singleCardinality||!current.length;
 const target=early?undefined:resolvePropertyRemovalTarget({subject,slot,mutation,current},helpers);
 const plan=mutationPropertyRemovalPlanValue({current,target,cardinality:slot.cardinality,singleCardinality:POLICY.singleCardinality,minimumOneCardinality:POLICY.minimumOneCardinality});
 if(!plan.ok){const r=mutationPropertyRemovalRefusalValue({reason:plan.reason,subject,predicate:slot.predicate,cardinality:slot.cardinality,target,current,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),r.statusCode===undefined?undefined:{statusCode:r.statusCode});}
 return[helpers.deltaFact(subject,slot.predicate,target,POLICY.negativePolarity,meta)];`,'mutationPropertyRemovalPlanValue','mutationPropertyRemovalRefusalValue');
R('reclassification-choices','reclassifyAction',` const choices=reclassificationChoiceDetails(prog,record,interfaces);
 return buildReclassifyAction({policyFacts:prog?.facts||prog,subject,prompt:mutationReclassificationPromptValue({subject,choices})});`,'mutationReclassificationPromptValue');
// Exact existing receipt field mechanics, extracted without dropping optional
// lineage fields. The source aliases below keep one implementation owner.
const server=path.resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/server/mutation-runtime.mjs');
let serverText=fs.readFileSync(server,'utf8'),valuesFile=path.join(core,'semantic-mutation-values.mjs'),valuesText=fs.readFileSync(valuesFile,'utf8');
const aliases=[['proposalTraceFields','mutationProposalTraceFieldsValue'],['revisionForFactCount','mutationRevisionForFactCountValue'],['projectedCommittedRevision','mutationProjectedCommittedRevisionValue'],['normalizeMutationTargetMetadata','normalizeMutationTargetMetadataValue']];
const ast=parse(serverText,{ecmaVersion:'latest',sourceType:'module'}),nodes=[];
const receipt=ast.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name==='runtimeReceiptFields');if(!receipt)throw Error('Missing receipt mechanics');
const receiptSource=serverText.slice(receipt.start,receipt.end).replace('runtimeReceiptFields','mutationReceiptFields');
if(!valuesText.includes('function mutationReceiptFields('))valuesText+='\n'+receiptSource+'\n';
for(const [oldName,newName]of aliases){const n=ast.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name===oldName);if(!n)throw Error(oldName);let definition=serverText.slice(n.start,n.end);definition=definition.replace('function '+oldName,'function '+newName).replaceAll('runtimeReceiptFields(', 'mutationReceiptFields(').replaceAll('revisionForFactCount(', 'mutationRevisionForFactCountValue(');
 const va=parse(valuesText,{ecmaVersion:'latest',sourceType:'module'}),v=va.body.find(n=>n.declaration?.id?.name===newName).declaration;valuesText=valuesText.slice(0,v.start)+definition+valuesText.slice(v.end);nodes.push(n);
}
fs.writeFileSync(valuesFile,valuesText);for(const n of nodes.sort((a,b)=>b.start-a.start))serverText=serverText.slice(0,n.start)+serverText.slice(n.end);
serverText='import { '+aliases.map(([a,b])=>b+' as '+a).join(', ')+' } from "../core/semantic-mutation-values.mjs";\n'+serverText;
const updated=parse(serverText,{ecmaVersion:'latest',sourceType:'module'}).body.find(n=>n.declaration?.id?.name==='semanticTargetFactsFingerprint').declaration;
serverText=serverText.slice(0,updated.body.start)+'{\n return semanticTargetFactsFingerprintValue(asStore(facts).toArray());\n}'+serverText.slice(updated.body.end);
serverText='import { semanticTargetFactsFingerprintValue } from "../core/semantic-mutation-values.mjs";\n'+serverText;fs.writeFileSync(server,serverText);
changes.push({path:server,functions:aliases.map(a=>a[0]),fingerprint:'ordered framed history including retractions; explicit security contract amendment'});
fs.writeFileSync(path.join(__dirname,'runtime-contract-wiring.json'),JSON.stringify({changes,scope:'Value plans feed production control paths; existing authorization, canonicalization and observer ordering retained. Receipt aliases extracted exactly; fingerprint strengthened.'},null,2)+'\n');console.log(JSON.stringify({ownersChanged:changes.length}));

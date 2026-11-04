const fs=require('node:fs'),path=require('node:path');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const core=path.resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/core'),changes=[];
function F(file,name,body,imports=[]){let text=fs.readFileSync(file,'utf8');const ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),n=ast.body.map(n=>n.declaration||n).find(n=>n.type==='FunctionDeclaration'&&n.id.name===name);if(!n)throw Error(name);changes.push({path:file,function:name,before:text.slice(n.start,n.end)});text=text.slice(0,n.body.start)+'{\n'+body+'\n}'+text.slice(n.body.end);for(const symbol of imports)if(!text.includes('import { '+symbol+' } from "./semantic-mutation-values.mjs";'))text='import { '+symbol+' } from "./semantic-mutation-values.mjs";\n'+text;fs.writeFileSync(file,text);}
const V=(name,body)=>F(path.join(core,'semantic-mutation-values.mjs'),name,body);
const R=(file,name,body,...imports)=>F(path.join(core,'semantic-mutation-'+file+'.mjs'),name,body,imports);
V('mutationAdapterChoiceDetailsValue',` if(!mutationRequiresStrictChoiceValidationValue(contract,policy))return null;if(!sourceType||!targetType)return[];
 const unnecessary=sourceType===targetType&&sourceType!=='blob';
 return transforms.map(transform=>({value:transform.subject,label:transform.value,disabled:unnecessary||transform.sourceType!==sourceType||transform.targetType!==targetType,reason:unnecessary?\`no transform needed for \${sourceType} -> \${targetType}; clear transform instead\`:transform.sourceType===sourceType&&transform.targetType===targetType?'':\`supports \${transform.sourceType} -> \${transform.targetType}; mapping is \${sourceType} -> \${targetType}\`}));`);
V('mutationChoiceSourceSelectionValue',` const read=value=>typeof value==='function'?value():value;
 const p=read(provider);if(Array.isArray(p))return p;
 const e=read(enumeration);if(Array.isArray(e))return e;
 const a=read(adapter);if(Array.isArray(a))return a;
 return slotValueType==='ref'?read(reference):[];`);
V('normalizeMutationEditablePromptInputValue',` return{subject:input.subject,predicate:input.predicate,record:emptyIfAbsent(input.record,{}),typedRecord:emptyIfAbsent(input.typedRecord,{}),currentContext:emptyIfAbsent(input.currentContext,policy.missingCurrentContext),mode:emptyIfAbsent(input.mode,policy.missingMode),choiceDetailsProviders:emptyIfAbsent(input.choiceDetailsProviders,[]),contractPolicyProviders:emptyIfAbsent(input.contractPolicyProviders,[]),profiler:emptyIfAbsent(input.profiler,policy.missingProfiler)};`);
R('editable-prompt-input','normalizeEditablePromptInput',' return Object.freeze(normalizeMutationEditablePromptInputValue(input===undefined?{}:input,POLICY));','normalizeMutationEditablePromptInputValue');
R('choice-adapter','requiresStrictChoiceValidation',' return mutationRequiresStrictChoiceValidationValue(contract,POLICY);','mutationRequiresStrictChoiceValidationValue');
// Retain the existing lazy reads of slot subjects/types, then project rows.
const adapter=path.join(core,'semantic-mutation-choice-adapter.mjs');let a=fs.readFileSync(adapter,'utf8');a=a.replace('return authoredAdapterTransforms(context.prog).map(transform => adapterTransformChoiceRow(transform, sourceType, targetType, noTransform));','return mutationAdapterChoiceDetailsValue({contract,sourceType,targetType,transforms:authoredAdapterTransforms(context.prog),policy:POLICY});');fs.writeFileSync(adapter,'import { mutationAdapterChoiceDetailsValue } from "./semantic-mutation-values.mjs";\n'+a);
R('choice-details','contractChoiceDetails',` const slot=Object(contract.slot),addingMany=context.mode==='add'&&slotIsMany(slot),existing=addingMany?new Set(existingContractValues(contract)):null;
 return mutationChoiceSourceSelectionValue({provider:()=>providerChoiceDetails(contract,context),enumeration:()=>Array.isArray(slot.allowed)&&slot.allowed.length?enumerationChoiceDetails(slot.allowed,existing):null,adapter:()=>adapterTransformChoiceDetails(contract,context),slotValueType:slot.valueType,reference:()=>{const policy=applyContractPolicy(contract,context);return referenceChoiceDetails(context,[contract.compatibleRefType,policy.compatibleRefType,''].find(Boolean),existing);}});`,'mutationChoiceSourceSelectionValue');
R('choice-validation','validateChoiceValue',` const slot=Object(contract.slot);if(slot.valueType==='ref'&&!requiresStrictChoiceValidation(contract))return;
 const choices=contractChoiceDetails(contract,context);if(!choices.length)return;
 const subject=text(contract.subject,'<unknown>'),predicate=text(slot.predicate,''),plan=mutationChoiceValidationPlanValue({strict:true,choices,value,subject,predicate});
 if(plan.status==='invalid')helpers.failSemantic(helpers.mutationIssue('invalid-mutation-value',\`Mutation value for \${subject}.\${predicate} failed allowed-value validation.\`,{subject:text(contract.subject,''),predicate,value,allowed:plan.allowed}),{statusCode:400});
 if(plan.status==='disabled')helpers.failSemantic(helpers.mutationIssue('invalid-mutation-value',\`Mutation value for \${subject}.\${predicate} is unavailable: \${plan.reason}.\`,{subject:text(contract.subject,''),predicate,value,reason:plan.reason}),{statusCode:400});`,'mutationChoiceValidationPlanValue');
R('contract-resolution-values','preferredSiblingText',' return mutationPreferredSiblingTextValue(projectedValue,currentValue,POLICY.missingSiblingValue);','mutationPreferredSiblingTextValue');
R('contract-resolution-values','assignmentParentSubjects',' return mutationAssignmentParentSubjectsValue(asStore(prog).factsForObject(assignmentSubject),POLICY.assignmentParentPredicate,"is-not");','mutationAssignmentParentSubjectsValue');
R('contract-resolution-values','assignmentSiblingValue',` const candidates=asStore(prog).objects(parentSubject,POLICY.assignmentParentPredicate).map(id=>({get projectedPredicate(){return projection?.[id]?.predicate;},get currentPredicate(){return latestResolutionText(prog,id,POLICY.assignmentNamePredicate);},get projectedValue(){return projection?.[id]?.value;},get currentValue(){return latestResolutionText(prog,id,POLICY.assignmentValuePredicate);}}));
 return mutationAssignmentSiblingValueValue(candidates,predicate,POLICY.missingSiblingValue);`,'mutationAssignmentSiblingValueValue');
R('context-state','activeSubjectBindings',' return mutationActiveSubjectBindingsValue(contextBindings(prog,contextSubject),subject);','mutationActiveSubjectBindingsValue');
R('context-state','activeSubjectReferences',' return mutationActiveSubjectReferencesValue(contextReferenceBindings(prog,contextSubject),subject);','mutationActiveSubjectReferencesValue');
R('context-state','explicitBindingForMutation',' return mutationExplicitBindingValue(activeSubjectBindings(combinedFacts,contextSubject,subject));','mutationExplicitBindingValue');
R('context-state','explicitReferenceForMutation',' return mutationExplicitReferenceValue(activeSubjectReferences(combinedFacts,contextSubject,subject),referenceSubject===undefined?POLICY.missingReference:referenceSubject);','mutationExplicitReferenceValue');
R('context-execution','classifyContextMutationOperation',' return mutationContextOperationPreparationValue(operation,undefined,POLICY.operationRoutes,POLICY.missingContext).kind;','mutationContextOperationPreparationValue');
R('context-execution','resolveKnownMutationContext',` const context=mutationKnownContextValue(contextSpecs(prog),contextSubject);
 if(!context){const r=mutationContextExecutionRefusalValue({reason:'unknown-context',context:contextSubject,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode});}return context;`,'mutationKnownContextValue','mutationContextExecutionRefusalValue');
R('context-execution','prepareContextMutation',` const {semantic,actor,subject,record,mutation}=input,operation=mutation.operation,kind=classifyContextMutationOperation(operation);
 if(!kind){const r=mutationContextExecutionRefusalValue({reason:'unknown-operation',operation,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode});}
 const context=mutation.context===undefined?POLICY.missingContext:mutation.context;helpers.ensureKnownContext(semantic,context);
 const scope=helpers.authorityScopeForOperation(semantic,actor,operation,{context,subject,record});
 if(!scope.allowed){const r=mutationContextExecutionRefusalValue({reason:'authority',actor,subject,context,operation,scope,policy:POLICY});helpers.fail(helpers.issue(r.code,r.message,r.details),{statusCode:r.statusCode});}
 return Object.freeze({context,scope,kind});`,'mutationContextExecutionRefusalValue');
R('removal','removableValueAction',` const reference=slot.valueType===POLICY.referenceValueType;
 const selection=mutationRemovalActionSelectionValue({values,eligible:mutationRemovalEligibilityValue(slot,values,POLICY)});
 if(selection==='none')return null;
 return selection==='single'?singleRemovalAction(subject,slot,values[0],reference,policyFacts):multipleRemovalAction(subject,slot,values,projection,reference,policyFacts);`,'mutationRemovalEligibilityValue','mutationRemovalActionSelectionValue');
R('removal','removableValueActions',' const action=removableValueAction(subject,slot,values,projection,policyFacts);\n const row=mutationRemovalActionRowValue({action,slot,reference:slot.valueType===POLICY.referenceValueType,policy:POLICY});return Object.freeze(row?[row]:[]);','mutationRemovalActionRowValue');
R('removal-single','singleRemovalAction',` const plan=mutationSingleRemovalActionValue(subject,slot,value,reference,POLICY),options={policyFacts,title:plan.title,...plan.mutation};
 return reference?buildDetachRelationAction(options):buildRemoveFactAction(options);`,'mutationSingleRemovalActionValue');
R('removal-multiple','multipleRemovalAction',` const plan=mutationMultipleRemovalActionValue(subject,slot,values,projection,reference,POLICY);
 return buildSemanticMutationAction({policyFacts,title:plan.title,...plan.mutation,prompt:plan.prompt});`,'mutationMultipleRemovalActionValue');
R('slot-action','slotMutationAction',` const mode=slotActionMode(slot,record,options.mode),copy=slotEditorCopy(slot,mode);
 const resolved=buildEditableSlotPrompt(prog,projection,interfaces,{subject,predicate:slot.predicate,record,typedRecord,currentContext:context,mode,choiceDetailsProviders:options.choiceDetailsProviders,contractPolicyProviders:options.contractPolicyProviders},helpers);
 const plan=mutationSlotActionPlanValue({copy,resolved,slot,mode,subject,policy:POLICY});
 return buildSemanticMutationAction({policyFacts:prog?.facts||prog,...plan,prompt:resolved===null?intrinsicSlotPrompt(slot,subject,record,typedRecord,mode):resolved});`,'mutationSlotActionPlanValue');
// Identity checks precede value restoration. Pure request validation has an
// explicit shape phase so it never needs a fabricated subject/authority anchor.
const valuesFile=path.join(core,'semantic-mutation-values.mjs');let values=fs.readFileSync(valuesFile,'utf8');values=values.replace('authorityTargetsExplicit=true})','authorityTargetsExplicit=true,shapeOnly=false})').replace("if(!restoredSubjects.length)return fail(","if(shapeOnly)return null;if(!restoredSubjects.length)return fail(");fs.writeFileSync(valuesFile,values);
R('restore-request','normalizeRestoreRequest',` const descriptor=Object(mutation.restoreDeletedCluster);
 const shape=mutationRestoreRequestPlanValue({restoredSubjectsExplicit:Array.isArray(descriptor.restoredSubjects),authorityTargetsExplicit:Array.isArray(descriptor.authorityTargets),shapeOnly:true});
 if(shape)reject(helpers,shape.message,shape.details);
 const tupleFacts=normalizeRestoreFacts(mutation,helpers),restoredSubjects=uniqueRefList(tupleFacts.map(f=>f.s)),descriptorSubjects=uniqueRefList(descriptor.restoredSubjects),authorityTargets=uniqueRefList(descriptor.authorityTargets);
 const plan=mutationRestoreRequestPlanValue({restoredSubjects,descriptorRestoredSubjects:descriptorSubjects,authorityTargets});if(plan)reject(helpers,plan.message,plan.details);
 return{descriptor,tupleFacts,restoredSubjects,authorityTargets};`,'mutationRestoreRequestPlanValue');
R('restore-interface','restoreSubjectInterface',` const plan=mutationRestoreInterfaceMatchValue(tupleFacts,subject,interfaces,RESTORE_POLICY.typePredicate);
 if(plan.matches.length>1)helpers.failSemantic(helpers.mutationIssue('ambiguous-interface',\`Subject matches multiple schema interfaces: \${plan.matches.join(', ')}.\`,{subject}),{statusCode:400});return plan.interface;`,'mutationRestoreInterfaceMatchValue');
const simpleEdits=[
 ['create-facts.mjs','const subjectTypes = uniqueRefList(tupleFacts.filter(fact => fact.p === typePredicate).map(fact => fact.o));','const subjectTypes = mutationCreateFactsSubjectTypesValue(tupleFacts, typePredicate);','mutationCreateFactsSubjectTypesValue'],
 ['admission-result.mjs','const changedSubjects = new Set(delta.map(fact => fact.s));','const { changedSubjects } = mutationAdmissionResultFieldsValue({ delta });','mutationAdmissionResultFieldsValue'],
 ['admission-result.mjs','.filter(fact => changedSubjects.has(fact.s))',".filter(fact => mutationAdmissionResultFieldsValue({ delta, basisFacts: [fact] }).basisFacts.length)",'mutationAdmissionResultFieldsValue'],
 ];
for(const [name,before,after,symbol]of simpleEdits){const file=path.join(core,'semantic-mutation-'+name);let t=fs.readFileSync(file,'utf8');if(!t.includes(before))throw Error(name+' missing edit');t=t.replace(before,after);if(!t.includes('import { '+symbol+' } from "./semantic-mutation-values.mjs";'))t='import { '+symbol+' } from "./semantic-mutation-values.mjs";\n'+t;fs.writeFileSync(file,t);}
// Extract the remaining server receipt function exactly, retaining all aliases.
const server=path.resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/server/mutation-runtime.mjs');let st=fs.readFileSync(server,'utf8');const sa=parse(st,{ecmaVersion:'latest',sourceType:'module'}),sn=sa.body.find(n=>n.type==='FunctionDeclaration'&&n.id.name==='staleRevisionEvidenceFields');
let definition=st.slice(sn.start,sn.end).replace('function staleRevisionEvidenceFields','function mutationStaleRevisionEvidenceFieldsValue').replaceAll('runtimeReceiptFields(', 'mutationReceiptFields(');
values=fs.readFileSync(valuesFile,'utf8');const vn=parse(values,{ecmaVersion:'latest',sourceType:'module'}).body.find(n=>n.declaration?.id?.name==='mutationStaleRevisionEvidenceFieldsValue').declaration;values=values.slice(0,vn.start)+definition+values.slice(vn.end);fs.writeFileSync(valuesFile,values);
st=st.slice(0,sn.start)+st.slice(sn.end);st='import { mutationStaleRevisionEvidenceFieldsValue as staleRevisionEvidenceFields } from "../core/semantic-mutation-values.mjs";\n'+st;fs.writeFileSync(server,st);
fs.writeFileSync(path.join(__dirname,'complete-runtime-wiring.json'),JSON.stringify({changes,scope:'Lazy policy/choice evaluation, action effects and restore identity checks remain explicit. All value projection stays in the Sourcery owner.'},null,2)+'\n');console.log(JSON.stringify({functionsRewired:changes.length}));

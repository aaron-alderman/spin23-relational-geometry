const fs=require('node:fs'),path=require('node:path');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const file=path.resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/core/semantic-mutation-values.mjs');let source=fs.readFileSync(file,'utf8');
function body(name,text){const ast=parse(source,{ecmaVersion:'latest',sourceType:'module'}),fn=ast.body.find(n=>n.declaration?.id?.name===name)?.declaration;if(!fn)throw Error(name);source=source.slice(0,fn.body.start)+'{\n'+text+'\n}'+source.slice(fn.body.end);}
body('mutationChoiceDefaultValue',` const enabled=choices.find(c=>!c.disabled);
 return enabled!==undefined?enabled.value:choices.length?choices[0].value:'';`);
body('mutationReclassificationPreservedPredicatesValue',` const allowed=new Set(iface?.slots?.map(s=>s.predicate)||[]);
 return Object.keys(record).filter(k=>!policy.reservedPredicates.includes(k)&&(iface?.mode===policy.openMode||allowed.has(k))).sort((a,b)=>a.localeCompare(b));`);
body('mutationEditablePromptEditorValue',` const editorKind=choiceDetails.length?policy.choiceEditor:first(spec?.editorKind,spec?.canonicalValueType,slot.valueType);
 const valueType=first(spec?.canonicalValueType,spec?.editorKind===policy.timestampEditor?policy.timestampEditor:'',slot.valueType);
 return {editorKind,valueType};`);
body('mutationPredicateCompatibilityIssuesValue',` if(!slot)return targetIface.mode===policy.closedMode?[{predicate,reason:\`\${predicate} is not allowed on \${targetIface.type}\`}]:[];
 if(!slot.many&&values.length>1)return[{predicate,reason:\`\${predicate} would violate \${targetIface.type}.\${predicate} cardinality\`}];
 for(const value of values){const reason=validateValue(slot,value);if(reason!=='')return[{predicate,reason}];}return[];`);
body('mutationVisibleRecordValue',` const record=projection?.[subject];return record&&typeof record==='object'&&Array.isArray(record[policy.typeField])?record:null;`);
body('mutationIncomingProjectionReferencesValue',` const out=[];
 for(const [subject,record]of Object.entries(projection)){
  if(subject===target||!mutationVisibleRecordValue(projection,subject,policy))continue;
  for(const [predicate,value]of Object.entries(record)){
   if(predicate===policy.typeField)continue;
   if((Array.isArray(value)?value:[value]).some(entry=>String(entry)===target))out.push({subject,predicate});
  }
 }return out;`);
body('mutationContractPromptValidationValue',` if(!validation||typeof validation!=='object')return '';
 const numeric=Number(value);if(!Number.isFinite(numeric))return '';
 const sibling=Number(validation.siblingValue),label=typeof validation.siblingPredicate==='string'&&validation.siblingPredicate?validation.siblingPredicate:missingSiblingLabel;
 if(validation.kind==='positiveNumber')return numeric>0?'':'stepValue must be a positive number for slider range controls';
 if(!Number.isFinite(sibling))return '';
 if(validation.kind==='lessThanSiblingNumber')return numeric<sibling?'':\`minValue must stay below \${label} \${validation.siblingValue} for slider range controls\`;
 if(validation.kind==='greaterThanSiblingNumber')return numeric>sibling?'':\`maxValue must stay above \${label} \${validation.siblingValue} for slider range controls\`;
 return '';`);
body('mutationIntrinsicSlotPromptValue',` const adding=mode===policy.addMode||['many','min1'].includes(slot.cardinality);
 const choices=Array.isArray(slot.allowed)&&slot.allowed.length?slot.allowed:null;
 const info=copy(slot,adding?policy.addMode:policy.setMode);
 const prompt={message:\`\${info.message} \${slot.predicate} \${info.connector} \${subject}\`,defaultValue:adding&&!own(record,slot.predicate)?currentDefault(slot,{},{}):currentDefault(slot,record,typedRecord),allowBlank:!adding&&slot.cardinality===policy.optionalCardinality};
 if(choices){prompt.editorKind=policy.choiceEditor;prompt.choices=choices;}else if(slot.valueType)prompt.editorKind=slot.valueType;
 return prompt;`);
// Optional selection excludes the selected binding, but reference conflicts have
// never been excluded by that binding id; retain this refusal behavior.
body('mutationScopedNameConflictsValue',` return [...bindings.filter(b=>b.subject!==existingBinding&&b.memberSubject&&b.name===name).map(b=>({entry:b.subject,entryType:'ContextBinding',subject:b.memberSubject,name})),...references.filter(r=>r.targetSubject&&r.name===name).map(r=>({entry:r.subject,entryType:'ContextReference',subject:r.targetSubject,name}))];`);
fs.writeFileSync(file,source);

const fs=require('node:fs'),p=require('node:path'),root=p.resolve('.platform-reconstitution/sourcery-platform-reconciled');
const names={
 'schema':['asStore','asFactsArray','activeFactsFromLog','activeReferenceStore','factRef','validationPlanForInterfaces'],
 'materialization':['arrayFromFacts','activeInterfaceTypesBySubject','referencedSubjectsForExpects'],
 'declarations':['asFactsArray','declarationFactIndex','matchingFacts','subjectsOfType','many','expectedList','factRef','subjectRef','requireSingle','optionalSingle','typeSetForFacts','knownSubjectsFromFacts','knownTypeNamesFromFacts','interfaceParentTypeMap','interfaceSubjectForType','issueWithHint']
};
const pending=[];for(const [module,functions]of Object.entries(names)){const file=p.join(root,'sdk/core/admissibility',module+'.mjs');let text=fs.readFileSync(file,'utf8');for(const name of functions){if(new RegExp('export (function|const) '+name+'[ (=]').test(text))continue;const pattern=new RegExp('(?<!export )(function|const) '+name+'(?=[ (=])');if(!pattern.test(text))throw Error('Missing current function '+module+':'+name);text=text.replace(pattern,(_all,kind)=>'export '+kind+' '+name);}pending.push([file,text]);}
const bindings={
 'admissibility-schema':{path:'sdk/core/admissibility/schema.mjs',exports:[...names.schema,'compileInterfaces','activeInterfaceForTypes','slotForPredicate','validateCardinality','canonicalizeSlotValue','validateSlotValue','canonicalAllowedValues','validateFactsAgainstInterfaces','admitSchemaFacts','admitFacts']},
 'admissibility-declaration':{path:'sdk/core/admissibility/declarations.mjs',exports:[...names.declarations,'validateTaxonomyDeclarations','validateContextDeclarations','validateSemanticAuthorityDeclarations','validateResourcePermissionPolicyDeclarations','validateSemanticDocumentationDeclarations','admitSemanticDocumentationDeclarations','validatePersistenceMetadataDeclarations','admitProjectDeclarations']},
 'admissibility-materialization':{path:'sdk/core/admissibility/materialization.mjs',exports:[...names.materialization,'admitMaterializedFacts']}
};
const file=p.join(root,'assurance/semantic-contract-operations.mjs');let text=fs.readFileSync(file,'utf8');if(text.includes("case 'admissibility-schema'"))throw Error('Already registered');
text="import * as schemaCurrent from '../sdk/core/admissibility/schema.mjs';\nimport * as declarationsCurrent from '../sdk/core/admissibility/declarations.mjs';\nimport * as materializationCurrent from '../sdk/core/admissibility/materialization.mjs';\n"+text;
const anchor='export const semanticOperationBindings=Object.freeze({';if(!text.includes(anchor))throw Error('Registry anchor missing');text=text.replace(anchor,()=>anchor+'\n'+Object.entries(bindings).map(([key,value])=>JSON.stringify(key)+':'+JSON.stringify(value)+',').join('\n'));
const branch=" case 'data-space-foundation':",evaluator=` case 'admissibility-schema':case 'admissibility-declaration':case 'admissibility-materialization':{
 const module=operation==='admissibility-schema'?schemaCurrent:operation==='admissibility-declaration'?declarationsCurrent:materializationCurrent;
 if(!semanticOperationBindings[operation].exports.includes(input.api))throw Error('Unregistered admissibility API');
 const issues=[],decode=v=>{if(Array.isArray(v))return v.map(decode);if(!v||typeof v!=='object')return v;if(Object.hasOwn(v,'map'))return new Map(v.map.map(([k,x])=>[k,decode(x)]));if(Object.hasOwn(v,'set'))return new Set(v.set.map(decode));if(Object.hasOwn(v,'factStore'))return FactStore.from(v.factStore);if(Object.hasOwn(v,'issues')&&Object.keys(v).length===1)return issues;return Object.fromEntries(Object.entries(v).map(([k,x])=>[k,decode(x)]));};
 const args=(input.args||[]).map(decode);value=module[input.api](...(input.form==='facts'?[input.facts||[],...args]:input.form==='options'?[decode(input.options||{})]:args));observations.issues=issues;
 if(value instanceof Map)observations.mapEntries=[...value];if(value instanceof FactStore)observations.factRows=value.toArray();break;}
`;
if(!text.includes(branch))throw Error('Operation anchor missing');text=text.replace(branch,()=>evaluator+branch);pending.push([file,text]);for(const [file,bytes]of pending)fs.writeFileSync(file,bytes);fs.writeFileSync(p.join(__dirname,'exposed-current-functions.json'),JSON.stringify(names,null,2)+'\n');console.log({registeredOperations:Object.keys(bindings)});

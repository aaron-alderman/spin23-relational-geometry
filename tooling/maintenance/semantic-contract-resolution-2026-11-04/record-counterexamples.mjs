import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {parse} from '../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn/dist/acorn.mjs';
import {FactStore} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs';
import {firstCompatibleContract} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/semantic-mutation-contract-resolution-compatibility.mjs';
import {semanticTargetFactsFingerprint} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/server/mutation-runtime.mjs';
import {factTupleFromMutationFact,nonEmptyString} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/semantic-mutation-authored-facts.mjs';
import {normalizeRestoreFacts} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/semantic-mutation-restore-request-facts.mjs';

const root=path.resolve('.platform-reconstitution/sourcery-platform-reconciled'),predecessor='c57f2679c3500174390e8f06c173a62bc90a0cbb';
const read=name=>execFileSync('git',['-c','safe.directory='+root,'-C',root,'show',predecessor+':'+name],{encoding:'utf8',maxBuffer:16*1024*1024});
function definitions(source,names){return parse(source,{ecmaVersion:'latest',sourceType:'module'}).body.map(n=>n.declaration||n).filter(n=>n.type==='FunctionDeclaration'&&names.includes(n.id.name)).map(n=>source.slice(n.start,n.end)).join('\n');}
const compatibilitySource=read('sdk/core/semantic-mutation-contract-resolution-compatibility.mjs'),oldCompatibility=Function(definitions(compatibilitySource,['text','signature','firstCompatibleContract'])+'; return firstCompatibleContract;')();
const first={iface:{type:'A:B'},slot:{predicate:'C',valueType:'string'}},different={iface:{type:'A'},slot:{predicate:'B:C',valueType:'string'}};
const fingerprintSource=read('sdk/server/mutation-runtime.mjs'),oldFingerprint=Function('FactStore','const asStore=f=>FactStore.from(f);'+definitions(fingerprintSource,['runtimeReceiptFields','normalizedPositiveMutationFacts','sortedFactSignature','semanticTargetFactsFingerprint'])+';return semanticTargetFactsFingerprint;')(FactStore);
const positive={s:'item',p:'name',o:'A',pol:'is'},negative={...positive,pol:'is-not'};
const restoreSource=read('sdk/core/semantic-mutation-restore-request-facts.mjs'),oldRestore=Function('factTupleFromMutationFact','nonEmptyString','RESTORE_POLICY',definitions(restoreSource,['reject','normalizeRestoreFacts'])+';return normalizeRestoreFacts;')(factTupleFromMutationFact,nonEmptyString,{positivePolarity:'is'});
const helpers={mutationIssue:(code,message,extra)=>({code,message,...extra}),failSemantic:(issue,options)=>{throw Object.assign(Error(issue.message),{code:issue.code,...options});}};
const capture=fn=>{try{return{accepted:true,value:fn()};}catch(e){return{accepted:false,error:{name:e.name,code:e.code,statusCode:e.statusCode,message:e.message}};}};
const restore={facts:[{s:'item',p:'name',o:''}]};
const report={predecessor,sourceCommit:execFileSync('git',['-C',root,'rev-parse','HEAD'],{encoding:'utf8'}).trim(),compatibility:{input:[first,different],predecessorIncorrectlyCompatible:oldCompatibility([first,different])!==null,currentCompatible:firstCompatibleContract([first,different])!==null},staleTarget:{input:[positive,negative],predecessorMissesRetractionOnlyChange:oldFingerprint([positive])===oldFingerprint([positive,negative]),currentDetectsRetractionOnlyChange:semanticTargetFactsFingerprint([positive])!==semanticTargetFactsFingerprint([positive,negative]),currentDetectsReordering:semanticTargetFactsFingerprint([positive,negative])!==semanticTargetFactsFingerprint([negative,positive])},restore:{input:restore,predecessor:capture(()=>oldRestore(restore,helpers)),current:capture(()=>normalizeRestoreFacts(restore,helpers))},scope:'Exact predecessor functions reconstructed for bounded counterexamples; same-run engineering evidence, not an independent scientific confirmation. Current stale-target refusal is separately exercised through actual proposal admission.'};
if(!report.compatibility.predecessorIncorrectlyCompatible||report.compatibility.currentCompatible||!report.staleTarget.predecessorMissesRetractionOnlyChange||!report.staleTarget.currentDetectsRetractionOnlyChange||!report.restore.predecessor.accepted||report.restore.current.accepted)throw Error('Counterexample changed');
fs.writeFileSync(path.join(import.meta.dirname,'counterexamples.json'),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({compatibilityCollisionClosed:true,retractionOnlyStaleTargetClosed:true,emptyRestoreFieldClosed:true}));

import {readFileSync,writeFileSync} from 'node:fs';
import {parse} from '../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn/dist/acorn.mjs';
const policyFile='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-lifecycle-policy.json',doc=JSON.parse(readFileSync(policyFile)),roots=doc.expressions.roots;
const L=value=>({kind:'typedLiteral',valueType:value===null?'null':typeof value,value:String(value)}),I=surface=>({kind:'input',surface}),F=(object,field)=>({kind:'field',object,field}),R=entries=>({kind:'record',entries:Object.entries(entries).map(([name,value])=>({name,value}))}),A=values=>({kind:'list',entries:values.map(value=>({value}))}),C=(condition,yes,no)=>({kind:'if',condition,then:yes,else:no}),E=(left,right)=>({kind:'strictEq',left,right});
const S=I('state'),D=F(S,'data'),V=name=>F(D,name),action=I('action'),Q=name=>F(V('request'),name),call=(port,input,save,next)=>R({kind:L('call'),port:L(port),input,save:L(save),next:L('transaction.'+next)}),ret=value=>R({kind:L('return'),value});
doc.fields.transactionSteps={default:32,check:'positiveInteger'};
roots['transaction.invalidOperation']=R({type:L('TypeError'),message:L('Explicit synchronous transaction callback required.'),fields:R({code:L('identity-transaction-operation-required')})});
roots['transaction.quarantined']=R({type:L('Error'),message:L('Identity database is unavailable after failed transaction recovery.'),fields:R({code:L('identity-runtime-quarantined'),statusCode:L(503)})});
roots['transaction.initial']=R({root:L('transaction.admit'),data:R({request:I('request')})});roots['transaction.resume']=R({root:F(action,'next'),data:{kind:'mergeRecords',left:D,right:{kind:'recordFromEntries',value:A([A([F(action,'save'),I('observation')])])}}});
roots['transaction.admit']=C(E({kind:'typeOf',value:Q('operation')},L('function')),call('begin',R({}),'begin','begun'),call('refuse',R({name:L('transaction.invalidOperation')}),'ignored','done'));
roots['transaction.begun']=C(F(V('begin'),'ok'),call('operation',R({}),'operation','operated'),call('raise',R({fault:F(V('begin'),'fault')}),'ignored','done'));
roots['transaction.operated']=C(F(V('operation'),'ok'),call('commit',R({}),'commit','committed'),call('rollback',R({}),'rollback','rolled-back'));
roots['transaction.committed']=C(F(V('commit'),'ok'),ret(F(V('operation'),'value')),call('rollback',R({}),'rollback','rolled-back'));
const primary=C(F(V('operation'),'ok'),F(V('commit'),'fault'),F(V('operation'),'fault'));
roots['transaction.rolled-back']=C(F(V('rollback'),'ok'),call('raise',R({fault:primary}),'ignored','done'),call('quarantine',R({}),'ignored','dispose'));
roots['transaction.dispose']=call('dispose',R({}),'cleanup','record');roots['transaction.record']=call('record',R({primary,rollback:F(V('rollback'),'fault'),cleanup:V('cleanup')}),'ignored','raise');
roots['transaction.raise']=call('raise',R({fault:primary}),'ignored','done');roots['transaction.done']=ret(L(null));
doc.protocols.transaction={initial:'transaction.initial',resume:'transaction.resume',states:Object.keys(roots).filter(name=>name.startsWith('transaction.')&&!['transaction.initial','transaction.resume','transaction.invalidOperation','transaction.quarantined'].includes(name)),budgetField:'transactionSteps'};
writeFileSync(policyFile,JSON.stringify(doc,null,2)+'\n');
const sourceFile='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-runtime.mjs';let text=readFileSync(sourceFile,'utf8'),ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),changes=[];
function visit(node){if(!node||typeof node!=='object')return;const callee=node.callee,object=callee?.object;if(node.type==='CallExpression'&&callee?.type==='MemberExpression'&&object?.type==='MemberExpression'&&object.object?.type==='ThisExpression'&&object.property?.name==='database'&&['prepare','exec'].includes(callee.property?.name)){const arg=node.arguments[0];if(arg?.callee?.name!=='identityLifecyclePolicyValue'||arg.arguments[0]?.type!=='Literal')throw Error('Expected authored SQL reference');changes.push({start:node.start,end:node.end,text:(callee.property.name==='prepare'?'prepareIdentityStatement':'executeIdentitySql')+'(this.database, '+JSON.stringify(arg.arguments[0].value)+')'});}for(const value of Object.values(node)){if(Array.isArray(value))for(const item of value)visit(item);else if(value&&typeof value==='object')visit(value);}}visit(ast);
for(const change of changes.sort((a,b)=>b.start-a.start))text=text.slice(0,change.start)+change.text+text.slice(change.end);
const start=text.indexOf('  transaction(operation) {'),end=text.indexOf('\n  migratePlatformPrincipals(',start);if(start<0||end<0)throw Error('Expected transaction method');text=text.slice(0,start)+`  transaction(operation) {
    return runIdentityTransaction(this.database, operation, () => this.#databaseResource.close());
  }
`+text.slice(end);
text=text.replace('identityLifecyclePolicyValue,identityLifecycleParameter,initializeIdentityDatabase','identityLifecyclePolicyValue,identityLifecycleParameter,initializeIdentityDatabase,prepareIdentityStatement,executeIdentitySql,runIdentityTransaction');writeFileSync(sourceFile,text);

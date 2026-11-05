import {readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {parse} from '../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn/dist/acorn.mjs';
const file='.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-runtime.mjs',text=readFileSync(file,'utf8'),ast=parse(text,{ecmaVersion:'latest',sourceType:'module'}),roots={},fields={},protocols={},queries=[],edits=[],counts=new Map();
const L=value=>({kind:'typedLiteral',valueType:value===null?'null':typeof value,value:String(value)}),I=surface=>({kind:'input',surface}),F=(object,field)=>({kind:'field',object,field}),R=entries=>({kind:'record',entries:Object.entries(entries).map(([name,value])=>({name,value}))}),A=values=>({kind:'list',entries:values.map(value=>({value}))}),REF=ref=>({ref}),C=(condition,yes,no)=>({kind:'if',condition,then:yes,else:no}),EQ=(left,right)=>({kind:'strictEq',left,right}),LT=(left,right)=>({kind:'lessThan',left,right}),AND=(...values)=>({kind:'and',entries:values.map(value=>({value}))});
roots.positiveInteger=AND({kind:'isSafeInteger',value:I('value')},LT(L(0),I('value')));
roots.nonemptyString=AND(EQ({kind:'typeOf',value:I('value')},L('string')),LT(L(0),{kind:'length',value:I('value')}));
function visit(node,method='module'){
  if(!node||typeof node!=='object')return;if(node.type==='MethodDefinition')method=node.key.name;
  const callee=node.callee,object=callee?.object;
  if(node.type==='CallExpression'&&callee?.type==='MemberExpression'&&object?.type==='MemberExpression'&&object.object?.type==='ThisExpression'&&object.property?.name==='database'&&['prepare','exec'].includes(callee.property?.name)){
    const arg=node.arguments[0];let sql;if(arg.type==='Literal'&&typeof arg.value==='string')sql=arg.value;else if(arg.type==='TemplateLiteral'&&!arg.expressions.length)sql=arg.quasis[0].value.cooked;else throw Error('Dynamic identity SQL needs explicit review');
    const key=method+'.'+callee.property.name,index=counts.get(key)||0;counts.set(key,index+1);const name='sql.'+key+'.'+index;
    roots[name]=L(sql);queries.push({name,method,operation:callee.property.name,sql,sha256:createHash('sha256').update(sql).digest('hex')});edits.push({start:arg.start,end:arg.end,value:'identityLifecyclePolicyValue('+JSON.stringify(name)+')'});
  }
  for(const [key,value]of Object.entries(node))if(key!=='start'&&key!=='end'){if(Array.isArray(value))for(const item of value)visit(item,method);else if(value&&typeof value==='object')visit(value,method);}
}visit(ast);
const sql=(method,match)=>{const rows=queries.filter(row=>row.method===method&&match(row.sql.trim()));if(rows.length!==1)throw Error('Ambiguous SQL root '+method);return REF(rows[0].name);};
const S=I('state'),D=F(S,'data'),V=name=>F(D,name),ACTION=I('action');
const call=(port,input,save,next)=>R({kind:L('call'),port:L(port),input,save:L(save),next:L('initialize.'+next)}),ret=value=>R({kind:L('return'),value});
fields.initializeSteps={default:64,check:'positiveInteger'};fields.csrfEntropyBytes={default:32,check:'positiveInteger'};fields.sessionEntropyBytes={default:32,check:'positiveInteger'};fields.eventEntropyBytes={default:18,check:'positiveInteger'};fields.revokedRetentionMs={default:604800000,check:'positiveInteger'};fields.auditDefaultLimit={default:100,check:'positiveInteger'};fields.auditMaximumLimit={default:500,check:'positiveInteger'};fields.operatorDefaultLimit={default:50,check:'positiveInteger'};
roots['initialize.initial']=R({root:L('initialize.pragmas'),data:R({request:I('request')})});
roots['initialize.resume']=R({root:F(ACTION,'next'),data:{kind:'mergeRecords',left:D,right:{kind:'recordFromEntries',value:A([A([F(ACTION,'save'),I('observation')])])}}});
roots['initialize.pragmas']=call('exec',R({sql:sql('constructor',s=>s.startsWith('PRAGMA journal_mode'))}),'ignored','schema');
roots['initialize.schema']=call('exec',R({sql:sql('constructor',s=>s.startsWith('CREATE TABLE'))}),'ignored','clock');
roots['initialize.clock']=call('clock',R({}),'timestamp','migration-one');
roots['initialize.migration-one']=call('run',R({sql:sql('constructor',s=>s.includes("VALUES (1, 'verified-identities-and-sessions'")),args:A([V('timestamp')])}),'ignored','columns');
roots['initialize.columns']=call('all',R({sql:sql('constructor',s=>s.startsWith('PRAGMA table_info')),args:A([])}),'columns','has-column');
roots['initialize.has-column']=call('hasFieldValue',R({rows:V('columns'),field:L('name'),value:L('platform_principal_id')}),'hasColumn','column-admission');
roots['initialize.column-admission']=C(V('hasColumn'),call('migrate',R({timestamp:V('timestamp')}),'ignored','index'),call('exec',R({sql:sql('constructor',s=>s.startsWith('ALTER TABLE'))}),'ignored','migrate'));
roots['initialize.migrate']=call('migrate',R({timestamp:V('timestamp')}),'ignored','index');
roots['initialize.index']=call('exec',R({sql:sql('constructor',s=>s.startsWith('CREATE INDEX'))}),'ignored','migration-two');
roots['initialize.migration-two']=call('run',R({sql:sql('constructor',s=>s.includes("VALUES (2, 'platform-principals-and-external-links'")),args:A([V('timestamp')])}),'ignored','entropy');
roots['initialize.entropy']=call('entropy',R({bytes:L(fields.csrfEntropyBytes.default),encoding:L('base64url')}),'token','insert-key');
roots['initialize.insert-key']=call('run',R({sql:sql('constructor',s=>s.startsWith('INSERT OR IGNORE INTO host_identity_metadata')),args:A([V('token')])}),'ignored','select-key');
roots['initialize.select-key']=call('get',R({sql:sql('constructor',s=>s.startsWith('SELECT value')),args:A([])}),'keyRow','read-key');
roots['initialize.read-key']=call('read',R({receiver:V('keyRow'),key:L('value')}),'key','assign-key');
roots['initialize.assign-key']=call('assignKey',R({value:V('key')}),'ignored','prune');
roots['initialize.prune']=call('prune',R({}),'ignored','done');roots['initialize.done']=ret(L(null));
protocols.initialize={initial:'initialize.initial',resume:'initialize.resume',states:Object.keys(roots).filter(name=>name.startsWith('initialize.')&&!['initialize.initial','initialize.resume'].includes(name)),budgetField:'initializeSteps'};
const document={protocol:'sourcery/authored-policy.v1',fields,expressions:{profile:'sourcery/expression-reduction-values/1',roots},protocols,provenance:{baseline:'3fcf489c2acc5641c85ad2f37a81368bf011d6eb',queryCount:queries.length,queryExtraction:'Literal cooked SQLite strings, preserved exactly; no dynamic SQL admitted.'}};
writeFileSync('.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-lifecycle-policy.json',JSON.stringify(document,null,2)+'\n');
let updated=text;for(const edit of edits.sort((a,b)=>b.start-a.start))updated=updated.slice(0,edit.start)+edit.value+updated.slice(edit.end);updated='import {identityLifecyclePolicyValue,initializeIdentityDatabase} from "./identity-lifecycle-policy.mjs";\nimport {createOwnedResource} from "../core/owned-resource.mjs";\n'+updated;
writeFileSync(file,updated);writeFileSync(new URL('./sql-preservation.json',import.meta.url),JSON.stringify({baseline:document.provenance.baseline,sourceSha256:createHash('sha256').update(text).digest('hex'),queries},null,2)+'\n');console.log(JSON.stringify({queries:queries.length,protocols:Object.keys(protocols),sourceChanged:true}));

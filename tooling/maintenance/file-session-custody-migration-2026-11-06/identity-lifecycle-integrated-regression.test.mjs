import test from 'node:test';
import assert from 'node:assert/strict';
import {createOwnedResource} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/owned-resource.mjs";
import * as fs from 'node:fs';
import * as vm from 'node:vm';
import * as sqlite from 'node:sqlite';
import * as crypto from 'node:crypto';
import {tmpdir} from 'node:os';
import {resolve,join,sep,basename} from 'node:path';
import {pathToFileURL} from 'node:url';
import document from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-lifecycle-policy.json" with {type:'json'};
import {prepareIdentityStatement,executeIdentitySql,runIdentityTransaction,identityTransactionFailure,initializeIdentityDatabase} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-lifecycle-policy.mjs";
import {compileAuthoredProtocol,executeAuthoredProtocol,createPreparedOperations} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/authored-protocol.mjs";

function caught(operation){try{return {thrown:false,value:operation()};}catch(error){return {thrown:true,error};}}
function capabilities(overrides={}){return {acquire:()=>({}),initialize:()=>{},prepareDispose:()=>{},dispose:()=>{},...overrides};}

test('resource capabilities are admitted before acquisition',()=>{
  for(const key of ['acquire','initialize','prepareDispose','dispose']){let acquired=0;const options=capabilities({acquire(){acquired++;return {};},[key]:null});assert.throws(()=>createOwnedResource(options),TypeError);assert.equal(acquired,0);}
});
test('acquisition faults never dispose an unacquired resource',()=>{
  for(const fault of [new Error('open'),undefined,null,false,0,'']){let disposed=0;const result=caught(()=>createOwnedResource(capabilities({acquire(){throw fault;},dispose(){disposed++;}})));assert.equal(result.thrown,true);assert.equal(result.error,fault);assert.equal(disposed,0);}
});
test('failed initialization disposes before preserving every exact primary fault',()=>{
  for(const fault of [new Error('init'),undefined,null,false,0,'']){const trace=[];const result=caught(()=>createOwnedResource(capabilities({acquire(){trace.push('acquire');return {};},initialize(){trace.push('initialize');throw fault;},prepareDispose(){trace.push('prepare');},dispose(){trace.push('dispose');}})));assert.equal(result.error,fault);assert.equal(result.thrown,true);assert.deepEqual(trace,['acquire','initialize','dispose']);}
});
test('construction compound faults retain a retry capability without enumerable resource disclosure',()=>{
  const primary=undefined,cleanup=false,resource={private:'fixture'};let attempts=0;
  const result=caught(()=>createOwnedResource(capabilities({acquire:()=>resource,initialize(){throw primary;},dispose(){if(++attempts===1)throw cleanup;}})));
  assert(result.error instanceof AggregateError);assert.deepEqual(result.error.errors,[primary,cleanup]);assert.equal(result.error.cause,primary);assert.equal(Object.hasOwn(result.error,'recovery'),true);assert.equal(Object.keys(result.error).includes('recovery'),false);assert.equal('resource' in result.error.recovery,false);assert.equal(result.error.recovery.state,'dispose-failed');result.error.recovery.close();assert.equal(result.error.recovery.state,'closed');assert.equal(attempts,2);
});
test('normal ownership transfer prepares and disposes once; repeated close is inert',()=>{
  const trace=[],resource={};const owned=createOwnedResource(capabilities({acquire:()=>resource,initialize(value,scope){assert.equal(value,resource);assert.equal(scope.state,'initializing');trace.push('initialize');},prepareDispose(){trace.push('prepare');},dispose(){trace.push('dispose');}}));assert.equal(owned.resource,resource);assert.equal(owned.state,'open');owned.close();owned.close();assert.equal(owned.state,'closed');assert.deepEqual(trace,['initialize','prepare','dispose']);
});
test('shutdown preparation faults cannot prevent disposal, including falsy faults',()=>{
  for(const fault of [new Error('prepare'),undefined,null,false,0,'']){let disposed=0;const owned=createOwnedResource(capabilities({prepareDispose(){throw fault;},dispose(){disposed++;}}));const result=caught(()=>owned.close());assert.equal(result.thrown,true);assert.equal(result.error,fault);assert.equal(owned.state,'closed');owned.close();assert.equal(disposed,1);}
});
test('failed disposal remains retryable without repeating preparation',()=>{
  const trace=[];let attempts=0;const fault={fixture:'dispose'};const owned=createOwnedResource(capabilities({prepareDispose(){trace.push('prepare');},dispose(){trace.push('dispose');if(++attempts===1)throw fault;}}));assert.equal(caught(()=>owned.close()).error,fault);assert.equal(owned.state,'dispose-failed');owned.close();assert.equal(owned.state,'closed');assert.deepEqual(trace,['prepare','dispose','dispose']);
});
test('compound shutdown faults preserve ordering and release uncertainty',()=>{
  const a=null,b=0;let fail=true;const owned=createOwnedResource(capabilities({prepareDispose(){throw a;},dispose(){if(fail)throw b;}}));const result=caught(()=>owned.close());assert(result.error instanceof AggregateError);assert.deepEqual(result.error.errors,[a,b]);assert.equal(result.error.cause,a);assert.equal(owned.state,'dispose-failed');fail=false;owned.close();assert.equal(owned.state,'closed');
});
test('reentrant shutdown refuses while still completing the outer disposal',()=>{
  let owned,disposed=0;owned=createOwnedResource(capabilities({prepareDispose(){owned.close();},dispose(){disposed++;}}));assert(caught(()=>owned.close()).error instanceof TypeError);assert.equal(disposed,1);assert.equal(owned.state,'closed');
});
test('initializers can close an owned resource without accidentally reopening its state',()=>{
  let disposed=0;const owned=createOwnedResource(capabilities({initialize(resource,scope){scope.close();},dispose(){disposed++;}}));assert.equal(owned.state,'closed');owned.close();assert.equal(disposed,1);
});

test('the same ownership mechanism releases a cache lease without altering other entries',()=>{
  const cache=new Map([['retained',7]]),key=Symbol('lease'),fault={fixture:'cache initializer'};
  const result=caught(()=>createOwnedResource({acquire:()=>({key}),initialize({key}){cache.set(key,3);throw fault;},prepareDispose(){},dispose({key}){cache.delete(key);}}));assert.equal(result.error,fault);assert.deepEqual([...cache],[['retained',7]]);
});
test('the same mechanism removes event subscriptions when setup fails or shutdown preparation throws',()=>{
  for(const initializeFails of [false,true]){const target=new EventTarget(),fault={fixture:'subscription'},handler=()=>{calls++;};let calls=0;const result=caught(()=>createOwnedResource({acquire:()=>target,initialize(t){t.addEventListener('tick',handler);t.dispatchEvent(new Event('tick'));if(initializeFails)throw fault;},prepareDispose(){throw fault;},dispose(t){t.removeEventListener('tick',handler);}}));if(!initializeFails)assert.equal(caught(()=>result.value.close()).error,fault);else assert.equal(result.error,fault);target.dispatchEvent(new Event('tick'));assert.equal(calls,1);}
});

const root="C:\\Users\\aaron\\grand-theory\\.platform-reconstitution\\sourcery-platform-reconciled",identityFile=join(root,'sdk/server/identity-runtime.mjs'),baselineDirectory=join(root,'test/fixtures/identity-lifecycle-baseline'),manifest=JSON.parse(fs.readFileSync(join(baselineDirectory,'manifest.json'))),sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
async function loadModule(file,{source,cryptoPorts={},sqliteModule,overrides=new Map()}={}){
  const identifier=pathToFileURL(file).href,module=new vm.SourceTextModule(source??fs.readFileSync(file,'utf8'),{identifier,importModuleDynamically:async name=>name==='node:sqlite'&&sqliteModule?sqliteModule:import(name.startsWith('.')?new URL(name,identifier).href:name)});
  await module.link(async name=>{const namespace=overrides.get(name)??(name==='node:crypto'?{...crypto,...cryptoPorts}:name.endsWith('.json')?{default:JSON.parse(fs.readFileSync(new URL(name,identifier)))}:await import(name.startsWith('.')?new URL(name,identifier).href:name)),keys=Object.keys(namespace);return new vm.SyntheticModule(keys,function(){for(const key of keys)this.setExport(key,namespace[key]);});});await module.evaluate();return module.namespace;
}
async function fixture({previous=false,fail=()=>{},policy}={},body){
  const directory=fs.mkdtempSync(join(tmpdir(),'sourcery-identity-lifecycle-')),file=join(directory,'identity.sqlite'),opened=[],trace=[];let nonce=0,closes=0;
  class TrackingDatabase extends sqlite.DatabaseSync {
    constructor(...args){super(...args);opened.push(this);}
    exec(sql){trace.push(['exec',sql]);fail('exec',sql);return super.exec(sql);}
    prepare(sql){trace.push(['prepare',sql]);fail('prepare',sql);const statement=super.prepare(sql);return new Proxy(statement,{get(target,key){const value=Reflect.get(target,key,target);if(['run','get','all'].includes(key)){trace.push(['lookup',key,sql]);return (...args)=>{trace.push([key,sql]);fail(key,sql);return Reflect.apply(value,target,args);};}return value;}});}
    close(){closes++;trace.push(['close']);fail('close','');return super.close();}
  }
  const sqliteModule=new vm.SyntheticModule(['DatabaseSync'],function(){this.setExport('DatabaseSync',TrackingDatabase);});await sqliteModule.link(()=>{});await sqliteModule.evaluate();
  const cryptoPorts={randomBytes(bytes){trace.push(['entropy',bytes]);fail('entropy',bytes);return Buffer.alloc(bytes,++nonce);}},overrides=new Map();
  try{
    if(policy)overrides.set('./identity-lifecycle-policy.mjs',await loadModule(join(root,'sdk/server/identity-lifecycle-policy.mjs'),{overrides:new Map([['./identity-lifecycle-policy.json',{default:policy}]])}));
    const source=previous?fs.readFileSync(join(baselineDirectory,'identity-runtime.mjs.txt')):fs.readFileSync("C:\\Users\\aaron\\grand-theory\\tooling\\maintenance\\file-session-custody-migration-2026-11-06/identity-runtime.integrated-proposal.mjs.txt");if(previous){assert.equal(manifest.commit,'3fcf489c2acc5641c85ad2f37a81368bf011d6eb');assert.equal(sha(source),manifest.sha256);}
    const namespace=await loadModule(identityFile,{source:source.toString(),sqliteModule,cryptoPorts,overrides});
    return await body({Runtime:namespace.SqliteHostIdentityRuntime,Database:TrackingDatabase,file,opened,trace,get closes(){return closes;}});
  }finally{
    for(const database of opened)if(database.isOpen)sqlite.DatabaseSync.prototype.close.call(database);
    const absolute=resolve(directory);assert(absolute.startsWith(resolve(tmpdir())+sep));assert(basename(absolute).startsWith('sourcery-identity-lifecycle-'));
    for(const name of fs.readdirSync(absolute)){const path=join(absolute,name),stat=fs.lstatSync(path);assert(stat.isFile()&&!stat.isSymbolicLink());fs.unlinkSync(path);}fs.rmdirSync(absolute);
  }
}
const provider={issuer:'fixture',authenticate:()=>({issuer:'fixture',subject:'person',principal:'person',identifier:'person',kind:'user',assurance:'credential',claims:{fixture:true}})},options=file=>({databaseFile:file,provider,now:()=>1_700_000_000_000});

test('real SQLite initialization faults close the acquired handle and preserve all falsy faults',async()=>{
  for(const fault of [new Error('fixture'),undefined,null,false,0,''])await fixture({fail(stage,sql){if(stage==='exec'&&sql.startsWith('PRAGMA journal_mode'))throw fault;}},context=>{const result=caught(()=>new context.Runtime(options(context.file)));assert.equal(result.thrown,true);assert.equal(result.error,fault);assert.equal(context.opened.length,1);assert.equal(context.closes,1);assert.equal(context.opened[0].isOpen,false);});
});
test('the retained predecessor confirms initialization left the SQLite handle open',async()=>{
  const fault={fixture:'retained initialization'};await fixture({previous:true,fail(stage,sql){if(stage==='exec'&&sql.startsWith('PRAGMA journal_mode'))throw fault;}},context=>{assert.equal(caught(()=>new context.Runtime(options(context.file))).error,fault);assert.equal(context.closes,0);assert.equal(context.opened[0].isOpen,true);});
});
test('later migration and CSRF setup failures also release the acquired database',async()=>{
  for(const prefix of ['CREATE TABLE','CREATE INDEX IF NOT EXISTS host_identities_platform_principal','INSERT OR IGNORE INTO host_identity_metadata']){const fault={fixture:prefix};await fixture({fail(stage,sql){if(['exec','prepare'].includes(stage)&&sql.trim().startsWith(prefix))throw fault;}},context=>{assert.equal(caught(()=>new context.Runtime(options(context.file))).error,fault);assert.equal(context.closes,1);assert.equal(context.opened[0].isOpen,false);});}
});
test('clock failure after database acquisition closes the handle without replacing the fault',async()=>{
  const fault=0;await fixture({},context=>{let calls=0;const result=caught(()=>new context.Runtime({...options(context.file),now(){if(++calls===2)throw fault;return 0;}}));assert.equal(result.thrown,true);assert.equal(result.error,fault);assert.equal(context.closes,1);});
});
test('CSRF statement preparation precedes entropy and wins simultaneous fault precedence',async()=>{
  const prepared={fixture:'prepare'},entropy={fixture:'entropy'};for(const previous of [false,true])await fixture({previous,fail(stage,sql){if(stage==='prepare'&&sql.startsWith('INSERT OR IGNORE INTO host_identity_metadata'))throw prepared;if(stage==='entropy')throw entropy;}},context=>{assert.equal(caught(()=>new context.Runtime(options(context.file))).error,prepared);assert.equal(context.trace.some(row=>row[0]==='entropy'),false);});
});
test('real SQLite construction compound failures expose a working cleanup retry',async()=>{
  const primary=null,cleanup=false;let attempts=0;await fixture({fail(stage,sql){if(stage==='exec'&&sql.startsWith('PRAGMA journal_mode'))throw primary;if(stage==='close'&&++attempts===1)throw cleanup;}},context=>{const result=caught(()=>new context.Runtime(options(context.file)));assert(result.error instanceof AggregateError);assert.deepEqual(result.error.errors,[primary,cleanup]);assert.equal(context.opened[0].isOpen,true);result.error.recovery.close();assert.equal(context.opened[0].isOpen,false);assert.equal(context.closes,2);});
});
test('checkpoint failure still closes SQLite and preserves the exact shutdown fault',async()=>{
  const fault=undefined;let armed=false;await fixture({fail(stage,sql){if(armed&&stage==='exec'&&sql.startsWith('PRAGMA wal_checkpoint'))throw fault;}},context=>{const runtime=new context.Runtime(options(context.file));armed=true;const result=caught(()=>runtime.close());assert.equal(result.thrown,true);assert.equal(result.error,fault);assert.equal(runtime.database.isOpen,false);runtime.close();assert.equal(context.closes,1);});
});
test('the retained predecessor confirms checkpoint failure prevented SQLite close',async()=>{
  const fault={fixture:'checkpoint'};let armed=false;await fixture({previous:true,fail(stage,sql){if(armed&&stage==='exec'&&sql.startsWith('PRAGMA wal_checkpoint'))throw fault;}},context=>{const runtime=new context.Runtime(options(context.file));armed=true;assert.equal(caught(()=>runtime.close()).error,fault);assert.equal(runtime.database.isOpen,true);assert.equal(context.closes,0);});
});
test('successful SQLite shutdown is idempotent',async()=>fixture({},context=>{const runtime=new context.Runtime(options(context.file));runtime.close();runtime.close();assert.equal(context.closes,1);assert.equal(runtime.database.isOpen,false);}));
test('initialization admits own callable capabilities before any SQLite property access',()=>{
  let gets=0,reads=0;const database=new Proxy({},{get(){gets++;throw Error('unreached');}}),capabilities={entropy(){},migrate(){},assignKey(){},prune(){}};Object.defineProperty(capabilities,'clock',{get(){reads++;return ()=>'';}});assert.throws(()=>initializeIdentityDatabase(database,capabilities),TypeError);assert.equal(gets,0);assert.equal(reads,0);
});
test('unknown or operation-mismatched SQL names refuse before preparing or executing',()=>{
  let effects=0;const database={get prepare(){effects++;throw Error('unreached');},get exec(){effects++;throw Error('unreached');}};for(const name of ['__proto__','missing','sql.constructor.exec.0'])assert.throws(()=>prepareIdentityStatement(database,name),{code:'identity-query-not-declared'});assert.throws(()=>executeIdentitySql(database,'sql.constructor.prepare.0'),{code:'identity-query-not-declared'});assert.equal(effects,0);
});
test('invalid transaction callbacks refuse before BEGIN',()=>{
  let effects=0;const database={exec(){effects++;}};for(const operation of [null,undefined,0,{},'operation'])assert.throws(()=>runIdentityTransaction(database,operation,()=>{}),{code:'identity-transaction-operation-required'});assert.equal(effects,0);
});
test('transactions commit values and preserve opaque Promise result identity synchronously',async()=>fixture({},context=>{const runtime=new context.Runtime(options(context.file)),value=Promise.resolve('opaque');context.trace.length=0;assert.equal(runtime.transaction(()=>value),value);assert.deepEqual(context.trace.filter(row=>row[0]==='exec').map(row=>row[1]),['BEGIN IMMEDIATE','COMMIT']);runtime.close();}));
test('operation faults roll back real SQLite mutations and preserve every exact fault',async()=>{
  for(const fault of [new Error('operation'),undefined,null,false,0,''])await fixture({},context=>{const runtime=new context.Runtime(options(context.file));runtime.database.exec('CREATE TABLE fixture(value)');const result=caught(()=>runtime.transaction(()=>{runtime.database.prepare('INSERT INTO fixture VALUES (1)').run();throw fault;}));assert.equal(result.thrown,true);assert.equal(result.error,fault);assert.equal(runtime.database.prepare('SELECT COUNT(*) AS n FROM fixture').get().n,0);assert.equal(runtime.database.isTransaction,false);runtime.close();});
});
test('commit faults roll back mutations before propagating the exact fault',async()=>{
  const fault={fixture:'commit'};let armed=false;await fixture({fail(stage,sql){if(armed&&stage==='exec'&&sql==='COMMIT')throw fault;}},context=>{const runtime=new context.Runtime(options(context.file));runtime.database.exec('CREATE TABLE fixture(value)');armed=true;assert.equal(caught(()=>runtime.transaction(()=>runtime.database.prepare('INSERT INTO fixture VALUES (1)').run())).error,fault);assert.equal(runtime.database.prepare('SELECT COUNT(*) AS n FROM fixture').get().n,0);assert.equal(runtime.database.isTransaction,false);runtime.close();});
});
test('rollback failure quarantines the connection, closes it and preserves the primary fault',async()=>{
  const primary=undefined,rollback=false;let armed=false;await fixture({fail(stage,sql){if(armed&&stage==='exec'&&sql==='ROLLBACK')throw rollback;}},context=>{let providerCalls=0;const runtime=new context.Runtime({...options(context.file),provider:{...provider,authenticate(){providerCalls++;return null;}}});armed=true;const result=caught(()=>runtime.transaction(()=>{throw primary;}));assert.equal(result.thrown,true);assert.equal(result.error,primary);assert.equal(runtime.database.isOpen,false);const failure=identityTransactionFailure(runtime.database);assert.equal(failure.primary,primary);assert.equal(failure.rollback,rollback);assert.throws(()=>runtime.failureState('person'),{code:'identity-runtime-quarantined'});assert.throws(()=>runtime.authenticateRequest({headers:{cookie:'rel_project_host_session=fixture'}}),{code:'identity-runtime-quarantined'});assert.equal(providerCalls,0);runtime.close();});
});
test('failed quarantine disposal remains denied and can be retried through the resource owner',async()=>{
  const primary=0,rollback=null,disposal=false;let armed=false,attempts=0;await fixture({fail(stage,sql){if(!armed)return;if(stage==='exec'&&sql==='ROLLBACK')throw rollback;if(stage==='close'&&++attempts===1)throw disposal;}},context=>{const runtime=new context.Runtime(options(context.file));armed=true;assert.equal(caught(()=>runtime.transaction(()=>{throw primary;})).error,primary);assert.equal(runtime.database.isOpen,true);assert.equal(identityTransactionFailure(runtime.database).cleanup.ok,false);assert.throws(()=>runtime.failureState('person'),{code:'identity-runtime-quarantined'});runtime.close();assert.equal(runtime.database.isOpen,false);});
});
test('all 44 authored SQL strings retain their predecessor identities',()=>{
  assert.equal(manifest.queries.length,44);assert.equal(Object.keys(document.expressions.roots).filter(name=>name.startsWith('sql.')).length,44);for(const row of manifest.queries){const root=document.expressions.roots[row.name];assert.equal(root.kind,'typedLiteral');assert.equal(root.valueType,'string');assert.equal(sha(Buffer.from(root.value)),row.sha256);}
});
test('initialization, login, session claims and logout preserve predecessor observable order',async()=>{
  const outputs=[];for(const previous of [true,false])await fixture({previous},async context=>{const runtime=new context.Runtime(options(context.file));const login=await runtime.login({identifier:'person',secret:'fixture'}),cookie=login.cookie.split(';')[0],req={method:'POST',headers:{cookie,'x-rel-csrf-token':login.auth.csrfToken}},auth=runtime.authenticateRequest(req),logout=runtime.logout(req);outputs.push({login,auth,logout,trace:context.trace});runtime.close();});assert.deepEqual(outputs[1],outputs[0]);
});
test('audit limit coercion remains after statement and method lookup',async()=>{
  const outputs=[],fault={fixture:'limit'};for(const previous of [true,false])await fixture({previous},context=>{const runtime=new context.Runtime(options(context.file));context.trace.length=0;const result=caught(()=>runtime.auditEvents({limit:{valueOf(){context.trace.push(['coerce-limit']);throw fault;}}}));assert.equal(result.error,fault);outputs.push([...context.trace]);runtime.close();});assert.deepEqual(outputs[1],outputs[0]);assert.deepEqual(outputs[1].map(row=>row[0]),['prepare','lookup','coerce-limit']);
});
test('authored entropy parameters change actual SQLite runtime effects without changing mechanisms',async()=>{
  const policy=structuredClone(document);policy.fields.csrfEntropyBytes.default=24;policy.fields.sessionEntropyBytes.default=40;policy.fields.eventEntropyBytes.default=12;await fixture({policy},async context=>{const runtime=new context.Runtime(options(context.file));await runtime.login({identifier:'person',secret:'fixture'});assert.deepEqual(context.trace.filter(row=>row[0]==='entropy').map(row=>row[1]),[24,40,12]);runtime.close();});
});
test('late disposal refuses a session claim that the retained predecessor returned after close',async()=>{
  for(const previous of [true,false])await fixture({previous},async context=>{
    let runtime,armed=false,requestClocks=0;runtime=new context.Runtime({...options(context.file),sessionTouchIntervalMs:1_000_000,now(){if(armed&&++requestClocks===2)runtime.close();return 1_700_000_000_000;}});const login=await runtime.login({identifier:'person',secret:'fixture'});armed=true;const request={headers:{cookie:login.cookie.split(';')[0]}};if(previous)assert.equal(runtime.authenticateRequest(request).authenticated,true);else assert.throws(()=>runtime.authenticateRequest(request),{code:'identity-runtime-closed'});assert.equal(runtime.database.isOpen,false);
  });
});

function counterDocument(){
  const L=value=>({kind:'typedLiteral',valueType:typeof value,value:String(value)}),I=surface=>({kind:'input',surface}),F=(object,field)=>({kind:'field',object,field}),R=entries=>({kind:'record',entries:Object.entries(entries).map(([name,value])=>({name,value}))}),S=I('state'),n=F(S,'n');
  return {protocol:'sourcery/authored-policy.v1',fields:{steps:{default:8,check:'positive'}},protocols:{count:{initial:'initial',resume:'resume',states:['advance'],budgetField:'steps'}},expressions:{profile:'sourcery/expression-reduction-values/1',roots:{positive:{kind:'and',entries:[{value:{kind:'isSafeInteger',value:I('value')}},{value:{kind:'lessThan',left:L(0),right:I('value')}}]},initial:R({root:L('advance'),n:F(I('request'),'n')}),resume:S,advance:{kind:'if',condition:{kind:'lessThan',left:L(0),right:n},then:R({kind:L('continue'),state:R({root:L('advance'),n:{kind:'subtract',left:n,right:L(1)}})}),else:R({kind:L('return'),value:n})}}}};
}
test('pure continuations execute a non-auth counter using only canonical expressions',()=>{
  const program=compileAuthoredProtocol(counterDocument());assert.equal(executeAuthoredProtocol(program,'count',{n:5},{ports:{}}),0);
});
test('pure continuations cannot cross the entry continuation boundary',()=>{
  const doc=counterDocument();doc.expressions.roots.advance.then.entries.find(row=>row.name==='state').value.entries.find(row=>row.name==='root').value.value='initial';assert.throws(()=>executeAuthoredProtocol(compileAuthoredProtocol(doc),'count',{n:1},{ports:{}}),{code:'authored-protocol-refused'});
});
test('pure continuation loops consume the authored step budget',()=>{
  assert.throws(()=>executeAuthoredProtocol(compileAuthoredProtocol(counterDocument()),'count',{n:20},{ports:{}}),{code:'authored-protocol-refused'});
});
test('continuation accessor state refuses without invoking its getter',()=>{
  const doc=counterDocument();doc.expressions.roots.advance={kind:'record',entries:[{name:'kind',value:{kind:'typedLiteral',valueType:'string',value:'continue'}},{name:'state',value:{kind:'field',object:{kind:'input',surface:'state'},field:'n'}}]};let gets=0;const value=Object.defineProperty({},'root',{get(){gets++;return'advance';}});assert.throws(()=>executeAuthoredProtocol(compileAuthoredProtocol(doc),'count',{n:value},{ports:{}}),{code:'authored-protocol-refused'});assert.equal(gets,0);
});
test('authored retention changes actual pruning boundaries without changing host code',async()=>{
  const policy=structuredClone(document);policy.fields.revokedRetentionMs.default=86_400_000;await fixture({policy},async context=>{const runtime=new context.Runtime(options(context.file)),login=await runtime.login({identifier:'person',secret:'fixture'}),now=1_700_000_000_000;runtime.database.prepare('UPDATE host_identity_sessions SET revoked_at = ?').run(new Date(now-2*86_400_000).toISOString());runtime.prune();assert.equal(runtime.database.prepare('SELECT COUNT(*) AS n FROM host_identity_sessions').get().n,0);runtime.close();assert.equal(login.auth.authenticated,true);});
});

test('prepared capabilities bind the original event receiver and reject foreign-scope tokens',()=>{
  const target=new EventTarget(),other=new EventTarget(),scope=createPreparedOperations(),foreign=createPreparedOperations();let events=0;target.addEventListener('tick',()=>events++);const token=scope.capture(target,target.dispatchEvent,()=>{});target.dispatchEvent=()=>{throw Error('replacement must not run');};scope.invoke(token,[new Event('tick')]);assert.equal(events,1);for(const candidate of [{},foreign.capture(other,other.dispatchEvent,()=>{})])assert.throws(()=>scope.invoke(candidate,[new Event('tick')]),{code:'authored-protocol-refused'});assert.equal(events,1);
});
test('prepared capabilities recheck current epoch admission before every effect',()=>{
  const scope=createPreparedOperations(),receiver={count:0};let active=true;const fault={fixture:'stale epoch'},token=scope.capture(receiver,function(){return ++this.count;},()=>{if(!active)throw fault;});assert.equal(scope.invoke(token,[]),1);active=false;assert.equal(caught(()=>scope.invoke(token,[])).error,fault);assert.equal(receiver.count,1);
});

import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs';
import * as vm from 'node:vm';
import * as sqlite from 'node:sqlite';
import * as crypto from 'node:crypto';
import {tmpdir} from 'node:os';
import {resolve,join,sep,basename} from 'node:path';
import {pathToFileURL} from 'node:url';
import {runIdentityWorkflow,runAsyncIdentityWorkflow} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-workflow-policy.mjs";

const root="C:\\Users\\aaron\\grand-theory\\.platform-reconstitution\\sourcery-platform-reconciled";
const directory=join(root,'test/fixtures/identity-workflow-baseline'),manifest=JSON.parse(fs.readFileSync(join(directory,'manifest.json'))),sha=bytes=>crypto.createHash('sha256').update(bytes).digest('hex');
function predecessor(name){const entry=manifest.files.find(row=>row.path==='sdk/server/'+name);assert(entry);const bytes=fs.readFileSync(join(directory,entry.file));assert.equal(sha(bytes),entry.sha256);assert.equal(manifest.commit,'710ba87766b73defdeb33bd9319338f9336b1938');return bytes.toString();}
async function load(file,{source,overrides=new Map(),sqliteModule,cryptoPorts={}}={}){
  const identifier=pathToFileURL(file).href,module=new vm.SourceTextModule(source??fs.readFileSync(file,'utf8'),{identifier,importModuleDynamically:async name=>name==='node:sqlite'?sqliteModule:import(name.startsWith('.')?new URL(name,identifier).href:name)});
  await module.link(async name=>{const namespace=overrides.get(name)??(name==='node:crypto'?{...crypto,...cryptoPorts}:await import(name.startsWith('.')?new URL(name,identifier).href:name)),keys=Object.keys(namespace);return new vm.SyntheticModule(keys,function(){for(const key of keys)this.setExport(key,namespace[key]);});});await module.evaluate();return module.namespace;
}
const identity=(subject='alice',principal=subject,kind='user')=>({issuer:'fixture',subject,principal,identifier:subject,kind,assurance:'credential',claims:{label:subject}});
async function fixture(previous,body){
  const scratch=fs.mkdtempSync(join(tmpdir(),'sourcery-identity-workflow-')),file=join(scratch,'identity.sqlite'),opened=[],trace=[];let nonce=0;
  class TrackingDatabase extends sqlite.DatabaseSync{
    constructor(...args){super(...args);opened.push(this);}
    exec(sql){trace.push(['exec',sql]);return super.exec(sql);}
    prepare(sql){trace.push(['prepare',sql]);const statement=super.prepare(sql);return new Proxy(statement,{get(target,key){const value=Reflect.get(target,key,target);if(['run','get','all'].includes(key)){trace.push(['lookup',key,sql]);return (...args)=>{trace.push([key,sql,args]);return Reflect.apply(value,target,args);};}return value;}});}
  }
  const sqliteModule=new vm.SyntheticModule(['DatabaseSync'],function(){this.setExport('DatabaseSync',TrackingDatabase);});await sqliteModule.link(()=>{});await sqliteModule.evaluate();
  const cryptoPorts={randomBytes(bytes){trace.push(['entropy',bytes]);return Buffer.alloc(bytes,++nonce);}},overrides=new Map();let runtime;
  try{
    if(previous){const policy=await load(join(root,'sdk/server/identity-lifecycle-policy.mjs'),{source:predecessor('identity-lifecycle-policy.mjs'),overrides:new Map([['./identity-lifecycle-policy.json',{default:JSON.parse(predecessor('identity-lifecycle-policy.json'))}]])});overrides.set('./identity-lifecycle-policy.mjs',policy);}
    const namespace=await load(join(root,'sdk/server/identity-runtime.mjs'),{source:previous?predecessor('identity-runtime.mjs'):fs.readFileSync("C:\\Users\\aaron\\grand-theory\\tooling\\maintenance\\file-session-custody-migration-2026-11-06/identity-runtime.integrated-proposal.mjs.txt",'utf8'),sqliteModule,cryptoPorts,overrides});
    runtime=new namespace.SqliteHostIdentityRuntime({databaseFile:file,provider:{issuer:'fixture',authenticate:()=>identity()},now:()=>1_700_000_000_000});trace.length=0;
    return await body({runtime,trace,file,identity});
  }finally{
    for(const database of opened)if(database.isOpen)sqlite.DatabaseSync.prototype.close.call(database);
    const absolute=resolve(scratch);assert(absolute.startsWith(resolve(tmpdir())+sep));assert(basename(absolute).startsWith('sourcery-identity-workflow-'));
    for(const name of fs.readdirSync(absolute)){const path=join(absolute,name),stat=fs.lstatSync(path);assert(stat.isFile()&&!stat.isSymbolicLink());fs.unlinkSync(path);}fs.rmdirSync(absolute);
  }
}
async function compare(body,{freshLinkAdmissions=0}={}){
  const runs=[];for(const previous of [true,false])runs.push(await fixture(previous,body));
  if(freshLinkAdmissions){
    const before=runs[0].trace,after=runs[1].trace;let cursor=0,admissions=0;
    while(cursor<before.length){
      if(JSON.stringify(before[cursor])===JSON.stringify(after[cursor])){cursor++;continue;}
      const added=after.slice(cursor,cursor+6);
      assert.deepEqual(added.map(row=>row[0]),['prepare','lookup','get','prepare','lookup','get']);
      assert(added[0][1].includes('FROM host_identity_sessions'));assert(added[3][1].includes('FROM host_identities'));
      assert(before.slice(0,cursor).some((row,index)=>JSON.stringify(before.slice(index,index+6))===JSON.stringify(added)),'Fresh authorization must repeat an exact prior session/identity observation');
      after.splice(cursor,6);admissions++;
    }
    assert.equal(admissions,freshLinkAdmissions);
  }
  assert.deepEqual(runs[1],runs[0]);return runs[1];
}
function snapshot(error){return {name:error.name,message:error.message,...Object.fromEntries(Object.keys(error).map(key=>[key,error[key]]))};}
async function observation(operation){try{return {value:await operation()};}catch(error){return {error:snapshot(error)};}}
const csrf=login=>({headers:{cookie:login.cookie.split(';')[0],'x-rel-csrf-token':login.auth.csrfToken}});

test('identity workflows preserve exact predecessor fixtures without ambient Git metadata',()=>{for(const name of ['identity-runtime.mjs','identity-lifecycle-policy.mjs','identity-lifecycle-policy.json'])assert(predecessor(name).length>0);});
test('new, unchanged and revised provisioning preserves SQLite traces, values and getter order',async()=>{
  await compare(async({runtime,trace})=>{const reads=[],provided=new Proxy(identity(),{get(target,key){reads.push(String(key));return target[key];}}),first=runtime.provisionIdentity(provided),same=runtime.provisionIdentity(provided);provided.claims.label='revised';const revised=runtime.provisionIdentity(provided);return {first,same,revised,reads,trace};});
});
test('provisioning collision, revoked identity and inactive principal retain refusal and rollback order',async()=>{
  await compare(async({runtime,trace})=>{const row=runtime.provisionIdentity(identity()),collision=await observation(()=>runtime.provisionIdentity(identity('other','alice')));runtime.database.prepare("UPDATE host_identities SET status='revoked' WHERE identity_id=?").run(row.identityId);const revoked=await observation(()=>runtime.provisionIdentity(identity()));runtime.database.prepare("UPDATE host_identities SET status='active' WHERE identity_id=?").run(row.identityId);runtime.database.prepare("UPDATE platform_principals SET status='suspended' WHERE platform_principal_id=?").run(row.platformPrincipalId);const inactive=await observation(()=>runtime.provisionIdentity(identity()));return {collision,revoked,inactive,trace};});
});
test('asynchronous login preserves receiver, provider rotation observation and SQLite effect order',async()=>{
  await compare(async({runtime,trace})=>{const effects=[];let release;const provider={get authenticate(){effects.push('lookup');return function(input){assert.equal(this,provider);effects.push(['authenticate',input]);return new Promise(resolve=>{release=resolve;});};}};runtime.provider=provider;const pending=runtime.login({identifier:'alice',secret:'secret'});effects.push('caller');runtime.provider={get issuer(){effects.push('late-issuer');return 'late';},authenticate(){throw Error('Must not replace captured callable');}};const authenticated=identity();delete authenticated.issuer;release(authenticated);const result=await pending;effects.push('resolved');return {result,effects,trace};});
});
test('invalid credentials and login lockout preserve failure persistence and diagnostic order',async()=>{
  await compare(async({runtime,trace})=>{runtime.provider={authenticate:()=>null};const failures=[];for(let i=0;i<6;i++)failures.push(await observation(()=>runtime.login({identifier:'missing'})));return {failures,trace};});
});
test('provider synchronous and awaited falsy failures preserve exact rejection identities without session effects',async()=>{
  for(const awaited of [false,true])for(const fault of [undefined,null,false,0,'',{fixture:'fault'}])await fixture(false,async({runtime,trace})=>{runtime.provider={authenticate(){if(awaited)return Promise.reject(fault);throw fault;}};let rejected=false;await runtime.login().then(()=>assert.fail('Expected rejection'),error=>{rejected=true;assert.equal(error,fault);});assert(rejected);assert(!trace.some(row=>row[0]==='run'&&row[1].includes('INSERT INTO host_identity_sessions')));});
});
test('login argument-destructuring failures remain asynchronous rejections before effects',async()=>{
  await fixture(false,async({runtime,trace})=>{const fault={fixture:'argument'},input={get identifier(){throw fault;}};let pending;assert.doesNotThrow(()=>{pending=runtime.login(input);});await assert.rejects(pending,error=>error===fault);assert.equal(trace.length,0);await assert.rejects(runtime.login(null),TypeError);});
});
test('link and unlink preserve successful transaction, session revocation and event traces',async()=>{
  await compare(async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);runtime.provider={authenticate:()=>identity('external')};const linked=await runtime.linkExternalIdentity({req,identifier:'external'}),link=linked.principal.links.find(row=>row.subject==='external'||row.identifier==='external');assert(link);const unlinked=runtime.unlinkExternalIdentity(link.identityId,{req,expectedRevision:link.revision});return {login,linked,unlinked,trace};},{freshLinkAdmissions:2});
});
test('relinking an existing identity and unlinking an already revoked link retain idempotent observations',async()=>{
  await compare(async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);runtime.provider={authenticate:()=>identity('external')};const linked=await runtime.linkExternalIdentity({req}),again=await runtime.linkExternalIdentity({req}),link=linked.principal.links.find(row=>row.identifier==='external'),unlinked=runtime.unlinkExternalIdentity(link.identityId,{req,expectedRevision:link.revision}),revoked=unlinked.principal.links.find(row=>row.identityId===link.identityId),againUnlinked=runtime.unlinkExternalIdentity(link.identityId,{req,expectedRevision:revoked.revision});return {linked,again,unlinked,againUnlinked,trace};},{freshLinkAdmissions:4});
});
test('link kind conflicts, collisions and revoked links preserve authored error fields and rollback',async()=>{
  await compare(async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login),other=runtime.provisionIdentity(identity('other'));runtime.provider={authenticate:()=>identity('service','service','service')};const kind=await observation(()=>runtime.linkExternalIdentity({req}));runtime.provider={authenticate:()=>identity('other')};const collision=await observation(()=>runtime.linkExternalIdentity({req}));runtime.database.prepare("UPDATE host_identities SET status='revoked',platform_principal_id=? WHERE identity_id=?").run(login.auth.platformPrincipalId,other.identityId);const revoked=await observation(()=>runtime.linkExternalIdentity({req}));return {kind,collision,revoked,trace};},{freshLinkAdmissions:6});
});
test('unlink missing, unknown, stale and last-active-link refusals preserve order and diagnostics',async()=>{
  await compare(async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login),missing=await observation(()=>runtime.unlinkExternalIdentity(login.auth.identityId,{req})),unknown=await observation(()=>runtime.unlinkExternalIdentity('unknown',{req,expectedRevision:1})),stale=await observation(()=>runtime.unlinkExternalIdentity(login.auth.identityId,{req,expectedRevision:99})),last=await observation(()=>runtime.unlinkExternalIdentity(login.auth.identityId,{req,expectedRevision:1}));return {missing,unknown,stale,last,trace};});
});
test('identity status transitions preserve revisions, session revocation, public projections and traces',async()=>{
  await compare(async({runtime,trace})=>{const login=await runtime.login(),suspended=runtime.setIdentityStatus(login.auth.identityId,'suspended',{actor:'operator',expectedRevision:1}),active=runtime.setIdentityStatus(login.auth.identityId,'active',{actor:'operator',expectedRevision:2}),revoked=runtime.setIdentityStatus(login.auth.identityId,'revoked',{actor:'operator',expectedRevision:3});return {login,suspended,active,revoked,trace};});
});
test('invalid status, unknown identity and stale revision preserve exact refusal fields',async()=>{
  await compare(async({runtime,trace})=>{const login=await runtime.login(),invalid=await observation(()=>runtime.setIdentityStatus(login.auth.identityId,'unknown',{actor:'operator'})),unknown=await observation(()=>runtime.setIdentityStatus('unknown','active',{actor:'operator'})),stale=await observation(()=>runtime.setIdentityStatus(login.auth.identityId,'active',{actor:'operator',expectedRevision:99}));return {invalid,unknown,stale,trace};});
});
test('closure during an awaited provider call refuses before observing the late provider or generating entropy',async()=>{
  for(const method of ['login','linkExternalIdentity'])await fixture(false,async({runtime,trace})=>{const login=method==='linkExternalIdentity'?await runtime.login():null;let release,issuerReads=0;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;}),get issuer(){issuerReads++;return 'fixture';}};const pending=runtime[method](login?{req:csrf(login)}:{});runtime.close();trace.length=0;release(identity());await assert.rejects(pending,{code:'identity-runtime-closed'});assert.equal(issuerReads,0);assert(!trace.some(row=>row[0]==='entropy'||row[0]==='prepare'));});
});
test('workflow entry and own-capability admission refuse before owner getters or host effects',()=>{
  let effects=0;const owner=new Proxy({},{get(){effects++;throw Error('Unexpected effect');}});assert.throws(()=>runIdentityWorkflow(owner,'login',{},{}),TypeError);assert.throws(()=>runIdentityWorkflow(owner,'provision',{},Object.create({clock(){effects++;}})),TypeError);assert.throws(()=>runAsyncIdentityWorkflow(owner,'status',{},{}),TypeError);assert.equal(effects,0);
});
test('login completion retains predecessor ordering against competing microtasks',async()=>{
  await compare(async({runtime})=>{const trace=[];const pending=runtime.login();pending.then(()=>trace.push('login'));for(let tick=0;tick<7;tick++){await Promise.resolve();trace.push('tick'+tick);}await pending;return trace;});
});
test('link authorization is revoked when logout occurs during provider authentication',async()=>{
  const outcomes=[];for(const previous of [true,false])outcomes.push(await fixture(previous,async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);let release;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;})};const pending=runtime.linkExternalIdentity({req});runtime.logout(req);trace.length=0;release(identity('late-external'));const outcome=await observation(()=>pending);return {outcome,inserted:trace.some(row=>row[0]==='run'&&row[1].includes('INSERT INTO host_identities'))};}));
  assert(outcomes[0].outcome.value);assert.equal(outcomes[0].inserted,true);assert.equal(outcomes[1].outcome.error?.code,'authentication-required');assert.equal(outcomes[1].inserted,false);
});
test('link continuation cannot switch to a different valid session or principal during the provider await',async()=>{
  const outcomes=[];for(const previous of [true,false])outcomes.push(await fixture(previous,async({runtime,trace})=>{const alice=await runtime.login(),req=csrf(alice);let release;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;})};const pending=runtime.linkExternalIdentity({req});runtime.provider={issuer:'fixture',authenticate:()=>identity('bob')};const bob=await runtime.login();req.headers=csrf(bob).headers;trace.length=0;release(identity('external'));return {outcome:await observation(()=>pending),inserted:trace.some(row=>row[0]==='run'&&row[1].includes('INSERT INTO host_identities'))};}));
  assert(outcomes[0].outcome.value);assert(outcomes[0].inserted);assert.equal(outcomes[1].outcome.error?.code,'identity-continuation-changed');assert.equal(outcomes[1].inserted,false);
});
test('changed CSRF evidence refuses link continuation before persistence after provider authentication',async()=>{
  await fixture(false,async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);let release;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;})};const pending=runtime.linkExternalIdentity({req});req.headers['x-rel-csrf-token']='changed';trace.length=0;release(identity('external'));await assert.rejects(pending,{code:'invalid-csrf-token'});assert(!trace.some(row=>row[0]==='run'));});
});
test('reentrant revocation at the last workflow clock refuses inside the transaction before linking',async()=>{
  await fixture(false,async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);let release,clocks=0,revoked=false;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;})};const pending=runtime.linkExternalIdentity({req});runtime.now=()=>{clocks++;if(clocks===3&&!revoked){revoked=true;runtime.logout(req);}return 1_700_000_000_000;};trace.length=0;release(identity('external'));await assert.rejects(pending,{code:'authentication-required'});assert(revoked);assert(trace.some(row=>row[0]==='exec'&&row[1]==='BEGIN IMMEDIATE'));assert(trace.some(row=>row[0]==='exec'&&row[1]==='ROLLBACK'));assert(!trace.some(row=>row[0]==='run'&&row[1].includes('INSERT INTO host_identities')));});
});
test('expiry between post-await admission and transaction admission refuses before linking',async()=>{
  await fixture(false,async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);let release,clocks=0;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;})};const pending=runtime.linkExternalIdentity({req});runtime.now=()=>++clocks<3?1_700_000_000_000:Date.parse(login.auth.expiresAt)+1;trace.length=0;release(identity('external'));await assert.rejects(pending,{code:'authentication-required'});assert(!trace.some(row=>row[0]==='run'&&row[1].includes('INSERT INTO host_identities')));});
});

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

const root=resolve('.platform-reconstitution/sourcery-platform-reconciled');
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
    const namespace=await load(join(root,'sdk/server/identity-runtime.mjs'),{source:previous?predecessor('identity-runtime.mjs'):undefined,sqliteModule,cryptoPorts,overrides});
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


const result=await fixture(false,async({runtime,trace})=>{const login=await runtime.login(),req=csrf(login);let release,afterAwaitClocks=0,revoked=false;runtime.provider={authenticate:()=>new Promise(resolve=>{release=resolve;})};const pending=runtime.linkExternalIdentity({req});runtime.now=()=>{afterAwaitClocks++;if(afterAwaitClocks===3&&!revoked){revoked=true;runtime.logout(req);}return 1_700_000_000_000;};trace.length=0;release(identity('reentrant-external'));const outcome=await observation(()=>pending);return {revoked,afterAwaitClocks,linked:!!outcome.value,error:outcome.error?.code||null,inserted:trace.some(row=>row[0]==='run'&&row[1].includes('INSERT INTO host_identities'))};});console.log(JSON.stringify(result));

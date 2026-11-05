import * as fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import {resolve,join} from 'node:path';
import assert from 'node:assert/strict';
import {withManagedWorkspace} from '../managed-validation/workspaces.mjs';
import {runCommand} from '../managed-validation/commands.mjs';
const root=resolve('.platform-reconstitution/managed-research-reproduction'),source=resolve('.platform-reconstitution/sourcery-platform-reconciled/sdk/server/identity-runtime.mjs');
const fixture=String.raw`import * as fs from 'node:fs';import * as vm from 'node:vm';import * as sqlite from 'node:sqlite';import {createHash} from 'node:crypto';import {pathToFileURL} from 'node:url';import assert from 'node:assert/strict';
const [file,databaseFile,report]=process.argv.slice(2),fault={fixture:'startup-pragma-failure'},opened=[];let closed=0;
class TrackingDatabase extends sqlite.DatabaseSync {constructor(...args){super(...args);opened.push(this);}exec(){throw fault;}close(){closed++;return super.close();}}
const sqliteNamespace=new vm.SyntheticModule(['DatabaseSync'],function(){this.setExport('DatabaseSync',TrackingDatabase);});await sqliteNamespace.link(()=>{});await sqliteNamespace.evaluate();
const bytes=fs.readFileSync(file),identifier=pathToFileURL(file).href,module=new vm.SourceTextModule(bytes.toString(),{identifier,importModuleDynamically:async name=>name==='node:sqlite'?sqliteNamespace:import(name)});
await module.link(async name=>{const namespace=await import(name.startsWith('.')?new URL(name,identifier).href:name),keys=Object.keys(namespace);return new vm.SyntheticModule(keys,function(){for(const key of keys)this.setExport(key,namespace[key]);});});await module.evaluate();
let thrown,closedByConstructor;
try{try{new module.namespace.SqliteHostIdentityRuntime({databaseFile,provider:{authenticate(){return null;}},now:()=>1000});}catch(error){thrown=error;}closedByConstructor=closed;assert.equal(thrown,fault);assert.equal(opened.length,1);assert.equal(closedByConstructor,0);}finally{for(const database of opened)database.close();}
fs.writeFileSync(report,JSON.stringify({sourcePath:file,sourceSha256:createHash('sha256').update(bytes).digest('hex'),realSqliteDatabase:true,sourceBodyUnmodified:true,injectedFault:'First database.exec after successful DatabaseSync construction',exactFaultIdentityPreserved:thrown===fault,opened:opened.length,closedByConstructor,closedByFixture:closed,expectedConstructorCloses:1,counterexampleConfirmed:closedByConstructor===0,sourceFixed:false,wholePackageComplete:false,scope:'A2 open identity/session lifecycle obligation; not a provider/claim protocol equivalence result.'},null,2));
`;
const result=await withManagedWorkspace({root,maxWorkBytes:4*2**20,minFreeBytes:2*2**30,maxReceiptBytes:1024*1024},async lease=>{const file=join(lease.harness,'fixture.mjs'),report=join(lease.harness,'result.json');await fs.writeFile(file,fixture);await runCommand(lease,{name:'identity-construction-counterexample',args:['--experimental-vm-modules',file,source,join(lease.work,'identity.sqlite'),report],cwd:lease.work,timeoutMs:30000,maxLogBytes:65536});return JSON.parse(await fs.readFile(report));});
assert(!existsSync(join(root,'work'))&&!existsSync(join(root,'harness'))&&!existsSync(join(root,'lock.json')));
const current=await fs.readFile(source,'utf8'),prior=await fs.readFile(resolve('.platform-reconstitution/sourcery-platform-reconciled/test/fixtures/provider-claim-baseline/identity-runtime.mjs.txt'),'utf8'),region=text=>text.slice(text.indexOf('    this.database = new DatabaseSync(this.databaseFile);'),text.indexOf('\n  transaction(operation)'));assert(region(current));assert.equal(region(current),region(prior));
const report={...result.value,priorSource:'81630729c6c3c3efb65c2cada5e228dc3e071cdc',databaseInitializationRegionByteEqualToPrior:true,ownedScratchRemoved:true,leaseReleased:true};await fs.writeFile(new URL('./identity-construction-counterexample.json',import.meta.url),JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));

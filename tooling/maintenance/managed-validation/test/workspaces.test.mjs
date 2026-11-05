import test from 'node:test';
import assert from 'node:assert/strict';
import * as fs from 'node:fs/promises';
import {join,sep} from 'node:path';
import {tmpdir} from 'node:os';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import {setTimeout as delay} from 'node:timers/promises';
import {withManagedWorkspace,removeOwnedTree} from '../workspaces.mjs';
import {runCommand} from '../commands.mjs';

const moduleUrl=new URL('../workspaces.mjs',import.meta.url).href;
async function setup(t){const parent=await fs.mkdtemp(join(tmpdir(),'validation-lifecycle-')),root=join(parent,'managed');t.after(async()=>{for(const name of await fs.readdir(parent))await removeOwnedTree(parent,join(parent,name));await fs.rmdir(parent);});return {parent,root,options:{root,maxWorkBytes:2**20,minFreeBytes:0,maxReceiptBytes:2**20}};}
const absent=file=>assert.rejects(fs.lstat(file),{code:'ENOENT'});
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));

test('repeated successful and failed runs retain only two passes and one failure, with no materializations',async t=>{
 const {root,options}=await setup(t);for(let i=0;i<8;i++){const operation=withManagedWorkspace(options,async lease=>{await fs.writeFile(join(lease.work,'copy.bin'),Buffer.alloc(32768));await fs.writeFile(join(lease.receipts,'evidence.json'),JSON.stringify({i}));if(i%3===0)throw Error('qualification refused');return i;});if(i%3===0)await assert.rejects(operation,/qualification refused/);else assert.equal((await operation).value,i);await absent(join(root,'work'));await absent(join(root,'harness'));await absent(join(root,'lock.json'));}
 const states=await Promise.all((await fs.readdir(join(root,'receipts'))).map(n=>read(join(root,'receipts',n,'status.json'))));assert.equal(states.filter(s=>s.status==='passed').length,2);assert.equal(states.filter(s=>s.status==='failed').length,1);
});
test('failure cleanup unlinks a Windows junction without touching its external target',async t=>{
 const {parent,root,options}=await setup(t),outside=join(parent,'outside');await fs.mkdir(outside);await fs.writeFile(join(outside,'source.txt'),'preserved bytes');await assert.rejects(withManagedWorkspace(options,async lease=>{await fs.symlink(outside,join(lease.work,'dependency'),process.platform==='win32'?'junction':'dir');throw Error('failed test');}),/failed test/);assert.equal(await fs.readFile(join(outside,'source.txt'),'utf8'),'preserved bytes');await absent(join(root,'work'));
});
test('unowned pre-existing roots and unleased scratch are refused without deletion',async t=>{
 const {root,options}=await setup(t);await fs.mkdir(root);await fs.writeFile(join(root,'source.txt'),'keep');await assert.rejects(withManagedWorkspace(options,()=>assert.fail()));assert.equal(await fs.readFile(join(root,'source.txt'),'utf8'),'keep');await fs.writeFile(join(root,'owner.json'),JSON.stringify({protocol:'sourcery/managed-validation.v1',root}));await fs.mkdir(join(root,'work'));await fs.writeFile(join(root,'work','unknown.txt'),'keep too');for(let attempt=0;attempt<2;attempt++){await assert.rejects(withManagedWorkspace(options,()=>assert.fail()),/Unleased/);assert.equal(await fs.readFile(join(root,'work','unknown.txt'),'utf8'),'keep too');await absent(join(root,'lock.json'));}
});
test('exclusive lease refuses overlapping validation allocations',async t=>{
 const {options}=await setup(t);await withManagedWorkspace(options,async()=>{await assert.rejects(withManagedWorkspace(options,()=>assert.fail()),/busy/);});
});
test('disk admission and working-byte limits refuse and clean up without leaking copies',async t=>{
 const {root,options}=await setup(t);await assert.rejects(withManagedWorkspace({...options,minFreeBytes:Number.MAX_SAFE_INTEGER},()=>assert.fail()),/Insufficient free/);await absent(join(root,'work'));await absent(join(root,'lock.json'));await assert.rejects(withManagedWorkspace({...options,maxWorkBytes:1024},async lease=>{await fs.writeFile(join(lease.work,'too-large'),Buffer.alloc(4096));await lease.checkBudget();}),/working byte budget/);await absent(join(root,'work'));await absent(join(root,'lock.json'));
});
test('receipt quota discards oversized payload and retains an explicit failed disposition',async t=>{
 const {root,options}=await setup(t);await assert.rejects(withManagedWorkspace({...options,maxReceiptBytes:2048},async lease=>{await fs.writeFile(join(lease.receipts,'oversized.bin'),Buffer.alloc(8192));}),/receipt budget/);const dirs=await fs.readdir(join(root,'receipts'));assert.equal(dirs.length,1);assert.deepEqual(await fs.readdir(join(root,'receipts',dirs[0])),['status.json']);assert.equal((await read(join(root,'receipts',dirs[0],'status.json'))).oversizeReceiptsDiscarded,true);await absent(join(root,'work'));
});
test('a genuinely killed owner is recovered on the next run, including partial copies',async t=>{
 const {root,options}=await setup(t);const code=`import{withManagedWorkspace}from ${JSON.stringify(moduleUrl)};import{writeFile}from'node:fs/promises';import{join}from'node:path';await withManagedWorkspace(${JSON.stringify(options)},async lease=>{await writeFile(join(lease.work,'partial.bin'),Buffer.alloc(65536));process.stdout.write('ready');await new Promise(()=>setInterval(()=>{},1000));});`;
 const child=spawn(process.execPath,['--input-type=module','-e',code],{stdio:['ignore','pipe','pipe'],windowsHide:true});const exited=once(child,'exit');await once(child.stdout,'data');child.kill('SIGKILL');await exited;await withManagedWorkspace(options,async lease=>{assert.deepEqual(await fs.readdir(lease.work),[]);});const states=await Promise.all((await fs.readdir(join(root,'receipts'))).map(n=>read(join(root,'receipts',n,'status.json'))));assert(states.some(s=>s.orphanRecovered===true&&s.status==='failed'));await absent(join(root,'lock.json'));
});
test('a stale owner with a live tracked child cannot trigger reclamation or another allocation',async t=>{
 const {root,options}=await setup(t);await withManagedWorkspace(options,async()=>{});const gone=spawn(process.execPath,['-e',''],{windowsHide:true});await once(gone,'exit');const child=spawn(process.execPath,['-e','setTimeout(()=>{},10000)'],{windowsHide:true});try{await fs.writeFile(join(root,'lock.json'),JSON.stringify({protocol:'sourcery/managed-validation.v1',root,pid:gone.pid,children:[child.pid]}));await fs.mkdir(join(root,'work'));await fs.writeFile(join(root,'work','partial'),'keep');await assert.rejects(withManagedWorkspace(options,()=>assert.fail()),/busy/);assert.equal(await fs.readFile(join(root,'work','partial'),'utf8'),'keep');}finally{const exited=once(child,'exit');child.kill();await exited;}
});
test('real subprocess deadlines terminate its descendant writer before scratch cleanup',async t=>{
 const {parent,root,options}=await setup(t),counter=join(parent,'counter.txt');const descendant=`const f=require('fs');setInterval(()=>f.appendFileSync(${JSON.stringify(counter)},'x'),10);`,code=`require('child_process').spawn(process.execPath,['-e',${JSON.stringify(descendant)}],{stdio:'ignore'});setTimeout(()=>{},20000);`;
 await assert.rejects(withManagedWorkspace(options,lease=>runCommand(lease,{name:'deadline',args:['-e',code],cwd:parent,timeoutMs:5000})),e=>e.message==='Validation command exceeded its deadline');const before=await fs.readFile(counter,'utf8');assert(before.length>0);await delay(150);assert.equal(await fs.readFile(counter,'utf8'),before);await absent(join(root,'work'));await absent(join(root,'lock.json'));
});
test('abort and output quotas terminate commands and remove the allocated workspace',async t=>{
 const {parent,root,options}=await setup(t);await assert.rejects(withManagedWorkspace(options,async lease=>{const controller=new AbortController();const timer=setTimeout(()=>controller.abort(Error('cancelled by test')),150);try{await runCommand(lease,{name:'abort',args:['-e','setTimeout(()=>{},20000)'],cwd:parent,signal:controller.signal});}finally{clearTimeout(timer);}}),/cancelled by test/);await absent(join(root,'work'));await assert.rejects(withManagedWorkspace(options,lease=>runCommand(lease,{name:'output',args:['-e','process.stdout.write("x".repeat(65536));setTimeout(()=>{},20000)'],cwd:parent,maxLogBytes:1024})),e=>e.message==='Validation command log budget exceeded');await absent(join(root,'work'));await absent(join(root,'lock.json'));
});
test('command arguments preserve spaces, quotes, trailing slashes, empty values and Unicode',async t=>{
 const {parent,options}=await setup(t),values=['space value','quote"value','trailing\\','', 'Δ text'];await withManagedWorkspace(options,async lease=>{await runCommand(lease,{name:'arguments',args:['-e','process.stdout.write(JSON.stringify(process.argv.slice(1)))','--',...values],cwd:parent,env:{...process.env,NODE_TEST_CONTEXT:'child-v8'}});assert.deepEqual(JSON.parse(await fs.readFile(join(lease.receipts,'arguments.log'),'utf8')),values);});
});
test('scratch release refuses lexical escapes into receipts or the ownership marker',async t=>{
 const {root,options}=await setup(t);await withManagedWorkspace(options,async lease=>{await assert.rejects(lease.remove(lease.work+sep+'..'+sep+'receipts'),/Only scratch/);await assert.rejects(lease.remove(lease.work+sep+'..'+sep+'owner.json'),/Only scratch/);assert.equal((await read(join(lease.receipts,'status.json'))).status,'running');await fs.mkdir(join(lease.work,'owned'));await lease.remove(join(lease.work,'owned'));await absent(join(lease.work,'owned'));});assert.equal((await read(join(root,'owner.json'))).root,root);
});
test('normal command completion closes the Windows job and terminates leftover descendants',async t=>{
 const {parent,options}=await setup(t),counter=join(parent,'normal-counter.txt'),descendant=`const f=require('fs');setInterval(()=>f.appendFileSync(${JSON.stringify(counter)},'x'),10);`,code=`const c=require('child_process').spawn(process.execPath,['-e',${JSON.stringify(descendant)}],{stdio:'inherit'});c.unref();const f=require('fs'),started=Date.now();setInterval(()=>{if(f.existsSync(${JSON.stringify(counter)}))process.exit(0);if(Date.now()-started>5000)process.exit(2)},20);`;
 await withManagedWorkspace(options,lease=>runCommand(lease,{name:'normal-exit',args:['-e',code],cwd:parent,timeoutMs:15000}));const before=await fs.readFile(counter,'utf8');assert(before.length>0);await delay(150);assert.equal(await fs.readFile(counter,'utf8'),before);
});
test('failure to record a newly launched child stops it before releasing the workspace',async t=>{
 const {parent,root,options}=await setup(t);let launched;
 await assert.rejects(withManagedWorkspace(options,async lease=>{const register=lease.childStarted;lease.childStarted=async pid=>{launched=pid;await register(pid);throw Error('lease persistence failure');};await runCommand(lease,{name:'registration',args:['-e','setTimeout(()=>{},20000)'],cwd:parent});}),/lease persistence failure/);assert(launched);assert.throws(()=>process.kill(launched,0),{code:'ESRCH'});await absent(join(root,'work'));await absent(join(root,'lock.json'));
});
test('cancelled child temporary payloads stay inside managed scratch and are reclaimed',async t=>{
 const {parent,root,options}=await setup(t),marker=join(parent,'temp-location.json'),code=`const f=require('fs'),p=require('path'),dir=require('os').tmpdir(),file=p.join(dir,'interrupted-copy.bin');f.writeFileSync(file,Buffer.alloc(5*1024*1024));f.writeFileSync(${JSON.stringify(marker)},JSON.stringify({dir,file}));setInterval(()=>{},1000);`;
 await assert.rejects(withManagedWorkspace({...options,maxWorkBytes:16*2**20},async lease=>{const controller=new AbortController(),command=runCommand(lease,{name:'temporary',args:['-e',code],cwd:parent,signal:controller.signal,timeoutMs:15000});command.catch(()=>{});try{const started=Date.now();while(!await fs.lstat(marker).then(()=>true,e=>e.code==='ENOENT'?false:Promise.reject(e))){if(Date.now()-started>10000)throw Error('Temporary child did not start');await delay(20);}const location=await read(marker);assert(location.dir.startsWith(lease.work+sep));assert.equal((await fs.stat(location.file)).size,5*2**20);controller.abort(Error('cancel temporary writer'));await command;}finally{controller.abort();await command.catch(()=>{});}}),/cancel temporary writer/);const location=await read(marker);await absent(location.file);await absent(join(root,'work'));await absent(join(root,'lock.json'));
});

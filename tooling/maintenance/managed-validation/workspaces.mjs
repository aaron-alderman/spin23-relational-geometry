import * as fs from 'node:fs/promises';
import {statfsSync,realpathSync} from 'node:fs';
import {resolve,join,dirname,sep,relative,isAbsolute} from 'node:path';
import {randomUUID} from 'node:crypto';

const protocol='sourcery/managed-validation.v1';
const alive=pid=>{if(!Number.isSafeInteger(pid)||pid<1)throw Error('Invalid process identity');try{process.kill(pid,0);return true;}catch(e){if(e.code==='ESRCH')return false;throw e;}};
const read=async file=>JSON.parse(await fs.readFile(file,'utf8'));
const exists=async file=>fs.lstat(file).then(()=>true,e=>e.code==='ENOENT'?false:Promise.reject(e));
const canonical=file=>{const absolute=resolve(file);if(realpathSync.native(absolute).toLowerCase()!==absolute.toLowerCase())throw Error('Managed path crossed a link: '+file);return absolute;};
const contained=(root,file)=>{const r=relative(root,resolve(file));if(!r||r==='..'||r.startsWith('..'+sep)||isAbsolute(r))throw Error('Path outside owned workspace');};
const free=root=>{const s=statfsSync(root);return s.bavail*s.bsize;};
async function write(file,value){await fs.writeFile(file,JSON.stringify(value,null,2)+'\n');}

// Walk directories ourselves. Never recursively remove a junction or symlink.
export async function removeOwnedTree(root,file){
 canonical(root);contained(root,file);const stat=await fs.lstat(file).catch(e=>e.code==='ENOENT'?null:Promise.reject(e));if(!stat)return;
 if(stat.isSymbolicLink()){try{await fs.unlink(file);}catch(e){if(!['EISDIR','EPERM'].includes(e.code))throw e;await fs.rmdir(file);}return;}
 if(stat.isDirectory()){canonical(file);for(const name of await fs.readdir(file))await removeOwnedTree(root,join(file,name));await fs.rmdir(file);return;}
 if(!stat.isFile())throw Error('Unexpected special file in owned workspace');
 try{await fs.unlink(file);}catch(e){if(e.code!=='EPERM'||stat.nlink!==1)throw e;await fs.chmod(file,0o600);await fs.unlink(file);}
}
async function usage(root){let bytes=0;for(const e of await fs.readdir(root,{withFileTypes:true})){const file=join(root,e.name),s=await fs.lstat(file);if(s.isSymbolicLink())continue;if(s.isDirectory()){canonical(file);bytes+=await usage(file);}else if(s.isFile())bytes+=s.size;else throw Error('Unexpected special workspace file');}return bytes;}
async function prune(root,keep){
 const entries=[];for(const name of await fs.readdir(join(root,'receipts'))){const dir=join(root,'receipts',name);canonical(dir);const s=await read(join(dir,'status.json'));if(s.protocol!==protocol||!['passed','failed'].includes(s.status))throw Error('Unsealed receipt directory');entries.push({dir,...s});}
 for(const status of ['passed','failed']){const rows=entries.filter(e=>e.status===status).sort((a,b)=>b.finishedAt.localeCompare(a.finishedAt)||b.id.localeCompare(a.id));for(const row of rows.slice(keep[status]))await removeOwnedTree(root,row.dir);}
}
export async function withManagedWorkspace({root,maxWorkBytes=4*2**30,minFreeBytes=2*2**30,maxReceiptBytes=64*2**20,keep={passed:2,failed:1}},body){
 root=resolve(root);for(const n of [maxWorkBytes,minFreeBytes,maxReceiptBytes,keep.passed,keep.failed])if(!Number.isSafeInteger(n)||n<0)throw Error('Invalid storage budget');if(!maxWorkBytes||maxReceiptBytes<2048||keep.passed<1||keep.failed<1)throw Error('Positive work and retention budgets and at least 2048 receipt bytes required');
 canonical(dirname(root));
 try{await fs.mkdir(root);await write(join(root,'owner.json'),{protocol,root});}catch(e){if(e.code!=='EEXIST')throw e;canonical(root);const owner=await read(join(root,'owner.json'));if(owner.protocol!==protocol||owner.root!==root)throw Error('Refusing unowned validation root');}
 canonical(root);const lock=join(root,'lock.json');
 let handle;try{handle=await fs.open(lock,'wx');}catch(e){if(e.code!=='EEXIST')throw e;const old=await read(lock);if(old.protocol!==protocol||old.root!==root)throw Error('Invalid workspace lease');if(alive(old.pid)||(old.children||[]).some(alive))throw Error('Validation workspace is busy; refusing another allocation');for(const name of ['work','harness'])await removeOwnedTree(root,join(root,name));if(old.receipt){const dir=join(root,'receipts',old.receipt);contained(join(root,'receipts'),dir);if(await exists(dir))await write(join(dir,'status.json'),{protocol,id:old.receipt,status:'failed',finishedAt:new Date().toISOString(),error:'Owner process exited before closing the workspace',orphanRecovered:true});}await fs.unlink(lock);handle=await fs.open(lock,'wx');}
 const id=new Date().toISOString().replaceAll(/[:.]/g,'-')+'-'+randomUUID(),lease={protocol,root,id,pid:process.pid,children:[],receipt:id};await handle.writeFile(JSON.stringify(lease));await handle.close();
 const work=join(root,'work'),harness=join(root,'harness'),receipts=join(root,'receipts',id);let failure,value,peakWorkBytes=0,ownedScratch=false;
 const saveLease=()=>write(lock,lease);
 const api={root,id,work,harness,receipts,minFreeBytes,freeBytes:()=>free(root),
  async childStarted(pid){lease.children.push(pid);await saveLease();},async childStopped(pid){lease.children=lease.children.filter(p=>p!==pid);await saveLease();},
  async remove(file){file=resolve(file);if(file!==work&&file!==harness&&!file.startsWith(work+sep)&&!file.startsWith(harness+sep))throw Error('Only scratch paths may be released');await removeOwnedTree(root,file);},
  async checkBudget(){const bytes=await usage(work);peakWorkBytes=Math.max(peakWorkBytes,bytes);if(bytes>maxWorkBytes)throw Error('Validation working byte budget exceeded');if(free(root)<minFreeBytes)throw Error('Validation free-space reserve exhausted');return bytes;}
 };
 try{
  await fs.mkdir(join(root,'receipts'),{recursive:true});await prune(root,keep);await fs.mkdir(receipts);await write(join(receipts,'status.json'),{protocol,id,status:'running'});
  if(await exists(work)||await exists(harness))throw Error('Unleased scratch directories found; refusing to overwrite');
  if(free(root)<maxWorkBytes+minFreeBytes)throw Error('Insufficient free space for the working budget and reserve');ownedScratch=true;await fs.mkdir(work);await fs.mkdir(harness);
  value=await body(api);await api.checkBudget();
 }catch(e){failure=e;}finally{
  try{if(lease.children.length)throw Error('Tracked child process remains; scratch retained under the exclusive lease');if(ownedScratch)for(const file of [work,harness])await removeOwnedTree(root,file);}catch(e){failure=new AggregateError([...(failure?[failure]:[]),e],'Workspace cleanup failed');}
  if(await exists(receipts)){
   const fullError=failure?.stack||null,status={protocol,id,status:failure?'failed':'passed',finishedAt:new Date().toISOString(),error:fullError?.slice(0,512)||null,errorTruncated:(fullError?.length||0)>512,peakWorkBytes,maxWorkBytes,minFreeBytes,maxReceiptBytes,disposableMaterialization:true};
   await write(join(receipts,'status.json'),status);
   if(await usage(receipts)>maxReceiptBytes){failure=new AggregateError([...(failure?[failure]:[]),Error('Receipt budget exceeded')],'Validation receipt budget exceeded');status.status='failed';status.error=failure.message;for(const name of await fs.readdir(receipts))await removeOwnedTree(root,join(receipts,name));status.oversizeReceiptsDiscarded=true;}
   await write(join(receipts,'status.json'),status);
  }
  if(!lease.children.length&&(!ownedScratch||(!await exists(work)&&!await exists(harness)))){await prune(root,keep);await fs.unlink(lock);}
 }
 if(failure)throw failure;return {value,receipts,peakWorkBytes};
}

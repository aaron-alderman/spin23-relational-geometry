import * as fs from 'node:fs';
import {resolve,join,relative,sep,isAbsolute} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const base=resolve('.platform-reconstitution'),audit=new URL('.',import.meta.url),planFile=new URL('./generated-retirement-plan.json',audit);
assert(!fs.existsSync(planFile),'Do not overwrite a retirement plan');
const selected=[
  'architecture-bootstrap-validation-2026-11-04/assembly/assembled',
  'architecture-bootstrap-validation-2026-11-04/assembly-qualified/assembled',
  'integrated-contract-validation-2026-11-04/assembly-qualified/assembled',
  'semantic-contract-validation-2026-11-04/assembly/assembled',
];
const roots=selected.map(path=>resolve(base,path)),sha=bytes=>createHash('sha256').update(bytes).digest('hex'),read=file=>JSON.parse(fs.readFileSync(file)),signature=stat=>[stat.size,stat.mtimeMs,stat.ino].join(':'),hash=async file=>{const h=createHash('sha256');for await(const chunk of fs.createReadStream(file))h.update(chunk);return h.digest('hex');};
function canonical(file){const absolute=resolve(file),r=relative(base,absolute);assert(r&&!r.startsWith('..'+sep)&&r!=='..'&&!isAbsolute(r),'Path outside reviewed workspace');assert.equal(fs.realpathSync.native(absolute).toLowerCase(),absolute.toLowerCase(),'Refuse junction or symlink boundary');return fs.lstatSync(absolute);}
const profile=read(new URL('./profile/bootstrap-inputs.json',audit)),qualified=read(new URL('../identity-lifecycle-migration-2026-11-06/closure-verification.json',audit));
assert(qualified.passed&&qualified.managedScratchRemoved&&qualified.managedLeaseReleased);assert.equal(qualified.source,'710ba87766b73defdeb33bd9319338f9336b1938');
assert(!fs.existsSync(join(base,'managed-validation/lock.json')),'No concurrent managed materialization');
const sourceRows=[];
for(const owner of profile.repositories){const root=resolve(base,owner.directory);assert(roots.every(target=>root!==target&&!root.startsWith(target+sep)));for(const row of owner.files)sourceRows.push({file:resolve(root,row.path),sha256:row.sha256});}
const layerManifests=[];
for(const name of ['sourcery-core','sourcery-capabilities','sourcery-applications']){const root=join(base,name),file=join(root,'.sourcery-layer/manifest.json'),bytes=fs.readFileSync(file),manifest=JSON.parse(bytes);layerManifests.push({file,sha256:sha(bytes),files:Array.isArray(manifest.files)?manifest.files.length:0});for(const row of manifest.files||[])sourceRows.push({file:resolve(root,row.path),sha256:row.contentHash});}
const known=new Map(),sourceFailures=[];let cursor=0;
await Promise.all(Array.from({length:4},async()=>{while(cursor<sourceRows.length){const row=sourceRows[cursor++];if(known.has(row.sha256))continue;assert(roots.every(target=>!row.file.startsWith(target+sep)),'Retained source cannot be inside a retirement root');try{const stat=canonical(row.file);assert(stat.isFile()&&!stat.isSymbolicLink());if(await hash(row.file)!==row.sha256){sourceFailures.push({file:row.file,reason:'manifest-hash-no-longer-current'});continue;}assert.equal(signature(canonical(row.file)),signature(stat));known.set(row.sha256,{file:row.file,signature:signature(stat)});}catch(error){sourceFailures.push({file:row.file,reason:error.code||error.message});}}}));
console.log(JSON.stringify({phase:'retained-sources-verified',uniqueHashes:known.size,sourceFailures:sourceFailures.length}));
const candidates=[],skipped=[],rootEvidence=[];
function scan(dir,root){canonical(dir);for(const name of fs.readdirSync(dir)){const file=join(dir,name),stat=fs.lstatSync(file);assert(file.startsWith(root+sep));if(stat.isSymbolicLink()||name==='.git'){skipped.push({file,reason:'protected-link-or-git'});continue;}if(stat.isDirectory())scan(file,root);else if(stat.isFile()){if(name==='.sourcery-assembly.json'){skipped.push({file,reason:'assembly-provenance-retained'});continue;}canonical(file);candidates.push({file,bytes:stat.size,signature:signature(stat)});}}}
for(const root of roots){assert(canonical(root).isDirectory());const marker=join(root,'.sourcery-assembly.json'),bytes=fs.readFileSync(marker),proof=JSON.parse(bytes);assert.equal(proof.protocol,'sourcery/four-layer-assembly-proof.v1');assert(proof.projection.fileCount>0);rootEvidence.push({root,marker,sha256:sha(bytes),fileCount:proof.projection.fileCount});scan(root,root);}
const rows=[];cursor=0;
await Promise.all(Array.from({length:4},async()=>{while(cursor<candidates.length){const row=candidates[cursor++],digest=await hash(row.file),source=known.get(digest);if(!source){skipped.push({file:row.file,reason:'no-exact-retained-source-match'});continue;}assert.equal(signature(canonical(row.file)),row.signature);rows.push({...row,sha256:digest,retainedSource:source.file,sourceSignature:source.signature});}}));
rows.sort((a,b)=>a.file.localeCompare(b.file));const plan={protocol:'sourcery/verified-generated-retirement.v1',observedAt:new Date().toISOString(),roots:rootEvidence,rows,skipped,sourceFailures,layerManifests,qualifiedReplacement:'tooling/maintenance/identity-lifecycle-migration-2026-11-06/closure-verification.json',sourceDeletion:false,historyDeletion:false,cacheAndResearchOutputDeletion:false,latestRetainedAssemblyAndBootstrapsOutsideRoots:true,reason:'Reclaim exact regular duplicates from four fixed obsolete marked assemblies after the replacement passed assembly, Claimipedia and both isolated bootstraps. No directory removal, junction traversal, source/history deletion or implicit ownership adoption.'};
fs.writeFileSync(planFile,JSON.stringify(plan,null,2)+'\n');console.log(JSON.stringify({phase:'plan-persisted',files:rows.length,logicalBytes:rows.reduce((sum,row)=>sum+row.bytes,0),skipped:skipped.length,roots:rootEvidence.map(row=>row.root)}));

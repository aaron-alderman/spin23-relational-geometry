import * as fs from 'node:fs';
import {resolve,join,sep,relative,isAbsolute} from 'node:path';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const base=resolve('.platform-reconstitution'),planFile=new URL('./generated-retirement-plan.json',import.meta.url),resultFile=new URL('./generated-retirement-result.json',import.meta.url),planBytes=fs.readFileSync(planFile),plan=JSON.parse(planBytes);
assert(!fs.existsSync(resultFile),'Completed retirement must not be rerun');
assert.equal(plan.protocol,'sourcery/verified-generated-retirement.v1');
const selected=[
  'architecture-bootstrap-validation-2026-11-04/assembly/assembled',
  'architecture-bootstrap-validation-2026-11-04/assembly-qualified/assembled',
  'integrated-contract-validation-2026-11-04/assembly-qualified/assembled',
  'semantic-contract-validation-2026-11-04/assembly/assembled',
].map(path=>resolve(base,path));
assert.deepEqual(plan.roots.map(row=>row.root),selected,'Fixed reviewed absolute roots required');
const sha=bytes=>createHash('sha256').update(bytes).digest('hex'),signature=stat=>[stat.size,stat.mtimeMs,stat.ino].join(':'),hash=async file=>{const h=createHash('sha256');for await(const chunk of fs.createReadStream(file))h.update(chunk);return h.digest('hex');};
function regular(file){const absolute=resolve(file),r=relative(base,absolute);assert(r&&r!=='..'&&!r.startsWith('..'+sep)&&!isAbsolute(r),'Path outside workspace');assert.equal(fs.realpathSync.native(absolute).toLowerCase(),absolute.toLowerCase(),'Resolved path crossed a junction or symlink');const stat=fs.lstatSync(absolute);assert(stat.isFile()&&!stat.isSymbolicLink(),'Regular resolved file required');return stat;}
assert(!fs.existsSync(join(base,'managed-validation/lock.json')),'No concurrent managed run');
for(const row of plan.roots){assert(row.root.startsWith(base+sep));assert.equal(fs.realpathSync.native(row.root).toLowerCase(),row.root.toLowerCase());assert.equal(sha(fs.readFileSync(row.marker)),row.sha256);}
const sources=new Map();
for(const row of plan.rows){assert(selected.some(root=>row.file.startsWith(root+sep)));assert(selected.every(root=>!row.retainedSource.startsWith(root+sep)),'Retained source must be outside every target');assert(!relative(selected.find(root=>row.file.startsWith(root+sep)),row.file).split(sep).includes('.git'),'Git metadata protected');assert.notEqual(row.file.split(sep).at(-1),'.sourcery-assembly.json','Provenance marker protected');sources.set(row.retainedSource,{sha256:row.sha256,signature:row.sourceSignature});}
let cursor=0;const entries=[...sources];
await Promise.all(Array.from({length:4},async()=>{while(cursor<entries.length){const [file,expected]=entries[cursor++];assert.equal(signature(regular(file)),expected.signature,'Retained source identity changed');assert.equal(await hash(file),expected.sha256,'Retained source bytes changed');assert.equal(signature(regular(file)),expected.signature);}}));
console.log(JSON.stringify({phase:'retained-sources-reverified',files:sources.size}));
const stat=fs.statfsSync(base),freeBefore=stat.bavail*stat.bsize;let removed=0,alreadyAbsent=0,bytes=0;cursor=0;
await Promise.all(Array.from({length:4},async()=>{while(cursor<plan.rows.length){const row=plan.rows[cursor++];assert.equal(signature(regular(row.retainedSource)),row.sourceSignature);if(!fs.existsSync(row.file)){alreadyAbsent++;continue;}assert.equal(signature(regular(row.file)),row.signature,'Generated target identity changed');assert.equal(await hash(row.file),row.sha256,'Generated target bytes changed');assert.equal(signature(regular(row.file)),row.signature);assert.equal(signature(regular(row.retainedSource)),row.sourceSignature);fs.unlinkSync(row.file);removed++;bytes+=row.bytes;if(removed%5000===0)console.log(JSON.stringify({phase:'retirement-progress',removed,total:plan.rows.length}));}}));
for(const row of plan.rows)assert(!fs.existsSync(row.file));
for(const row of plan.roots)assert.equal(sha(fs.readFileSync(row.marker)),row.sha256);
const after=fs.statfsSync(base),freeAfter=after.bavail*after.bsize,result={observedAt:new Date().toISOString(),planSha256:sha(planBytes),files:plan.rows.length,removed,alreadyAbsent,logicalBytesRemoved:bytes,skipped:plan.skipped.length,uniqueRetainedSourcesReverified:sources.size,freeBytesBefore:freeBefore,freeBytesAfter:freeAfter,observedFreeBytesIncrease:freeAfter-freeBefore,sourceAndTargetHashesRequired:true,nativeResolvedPathsRequired:true,sourceDeletion:false,historyDeletion:false,recursiveDirectoryDeletion:false,junctionTraversal:false,passed:true};
fs.writeFileSync(resultFile,JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));

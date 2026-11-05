import {statSync,createReadStream,readFileSync,writeFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
const prior='tooling/maintenance/reproduction-inventory-2026-11-06/expanded-output-files.json',path='output/plasma-heart-reduction/projection.svg',row=JSON.parse(readFileSync(prior)).find(row=>row.path==='plasma-heart-reduction/projection.svg'),before=statSync(path),hash=createHash('sha256');
if(!row||row.bytes!==before.size||row.modifiedAt!==before.mtime.toISOString())throw Error('Prior output metadata does not match');
let bytes=0;for await(const chunk of createReadStream(path,{highWaterMark:128*1024})){bytes+=chunk.length;hash.update(chunk);}
const after=statSync(path);if(bytes!==before.size||after.size!==before.size||after.mtimeMs!==before.mtimeMs)throw Error('File changed while hashing');
const result={observedAt:new Date().toISOString(),path,bytes,modifiedAt:before.mtime.toISOString(),sha256:hash.digest('hex'),priorInventory:prior,priorMetadataMatches:true,metadataUnchangedDuringRead:true,streamChunkBytes:128*1024,atomicSnapshotProved:false,scientificReproductionProved:false,wholePackageComplete:false,readOnly:true};
writeFileSync(new URL('./large-output-hash.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result));

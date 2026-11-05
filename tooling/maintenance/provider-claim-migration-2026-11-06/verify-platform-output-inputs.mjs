import {readFileSync,writeFileSync,statSync} from 'node:fs';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
const sourceManifest='output/plasma-heart-platform/sources.json',doc=JSON.parse(readFileSync(sourceManifest));
const rows=doc.sources.map(row=>{try{const file=resolve(row.path),stat=statSync(file);if(!stat.isFile()||stat.size>8*2**20)throw Error('Regular bounded source required');const bytes=readFileSync(file),actual=createHash('sha256').update(bytes).digest('hex');return {...row,actualSha256:actual,bytes:bytes.length,matches:actual===row.sha256};}catch(error){return {...row,matches:false,error:error.code||error.message};}});
const result={observedAt:new Date().toISOString(),family:'plasma-heart-platform',sourceManifest,rows,allDeclaredSourceHashesMatch:rows.every(row=>row.matches),dependencyClosureComplete:false,reproductionEstablished:false,scriptsExecuted:false,wholePackageComplete:false};
writeFileSync(new URL('./platform-output-input-review.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({sources:rows.length,matches:rows.filter(row=>row.matches).length,errors:rows.filter(row=>row.error).map(({id,error})=>({id,error})),reproductionEstablished:false}));

import {readFileSync,writeFileSync,lstatSync} from 'node:fs';
import {createHash} from 'node:crypto';
const prior='tooling/maintenance/reproduction-inventory-2026-11-06/expanded-output-files.json',rows=JSON.parse(readFileSync(prior)),selected=rows.filter(row=>row.path.split('/').length===2&&/\.(?:py|mjs|ipynb|sh|ps1)$/.test(row.path));
let readBytes=0;
const candidates=selected.map(row=>{
  const path='output/'+row.path,stat=lstatSync(path);if(!stat.isFile()||stat.size>1024*1024||(readBytes+=stat.size)>8*1024*1024)throw Error('Regular bounded candidate required');
  const bytes=readFileSync(path),sha256=createHash('sha256').update(bytes).digest('hex');if(sha256!==row.sha256)throw Error('Prior candidate changed: '+path);
  return {path,bytes:bytes.length,sha256,family:row.path.split('/')[0],role:'retained-source-candidate-not-yet-verified-as-producer',literalModuleSpecifiers:path.endsWith('.mjs')?[...new Set([...bytes.toString().matchAll(/\bfrom\s+['"]([^'"\r\n]+)['"]/gu)].map(match=>match[1]))]:undefined};
});
const result={observedAt:new Date().toISOString(),priorInventory:prior,scope:'Only direct family-level script files from the prior complete inventory. Earlier candidate-driver scan covered tooling/plasma-heart and verification, not retained scripts inside output. Test, plotting and observation files remain candidates until individually traced.',readBytes,candidates,families:[...new Set(candidates.map(row=>row.family))].map(family=>({family,candidates:candidates.filter(row=>row.family===family).length})),sourcesUnchanged:true,scriptsExecuted:false,reproductionEstablished:false,wholePackageComplete:false,deletionAuthorized:false};
writeFileSync(new URL('./retained-output-driver-candidates.json',import.meta.url),JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({candidates:candidates.length,families:result.families.length,readBytes,scriptsExecuted:false}));

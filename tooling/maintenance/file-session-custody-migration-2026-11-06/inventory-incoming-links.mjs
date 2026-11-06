import * as fs from 'node:fs';
import {resolve,join,dirname} from 'node:path';
const root=resolve('.'),rows=[],errors=[];
function walk(directory){
  let entries;try{entries=fs.readdirSync(directory,{withFileTypes:true});}catch(fault){errors.push({path:directory,code:fault.code});return;}
  for(const entry of entries){
    if(entry.name==='.git')continue;
    const path=join(directory,entry.name);
    if(entry.isSymbolicLink()){
      try{const raw=fs.readlinkSync(path),target=resolve(dirname(path),raw.replace(/^\\\\\?\\/u,''));rows.push({path,raw,target});}catch(fault){errors.push({path,code:fault.code});}
    }else if(entry.isDirectory())walk(path);
  }
}
walk(root);
const proposed=['active-runtime-validation-2026-11-04/assembly-qualified/assembled','integrated-validation-2026-11-04/assembly/assembled','reconciled-validation-2026-11-04-r2/assembled','.assembly-validation-2026-11-04'].map(path=>resolve('.platform-reconstitution',path));
const incoming=proposed.map(path=>({root:path,links:rows.filter(row=>row.target.toLowerCase()===path.toLowerCase()||row.target.toLowerCase().startsWith(path.toLowerCase()+'\\'))}));
fs.writeFileSync(new URL('./incoming-link-inventory.json',import.meta.url),JSON.stringify({observedAt:new Date().toISOString(),scope:'Read-only workspace link inventory; links and Git metadata are not traversed. No file contents or targets are read. Direct textual references and links outside this workspace are not proved absent.',links:rows,errors,proposed:incoming},null,2)+'\n');
console.log(JSON.stringify({links:rows.length,errors:errors.length,proposed:incoming.map(row=>({root:row.root,incoming:row.links.length}))}));

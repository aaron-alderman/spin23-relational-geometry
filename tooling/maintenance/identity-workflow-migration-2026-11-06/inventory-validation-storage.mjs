import * as fs from 'node:fs';
import {resolve,join} from 'node:path';
const root=resolve('.platform-reconstitution'),rows=[];
if(fs.realpathSync.native(root).toLowerCase()!==root.toLowerCase())throw Error('Inventory root crossed a link');
function scan(path,row){
  const stat=fs.lstatSync(path);
  if(stat.isSymbolicLink()){row.linksSkipped++;return;}
  if(stat.isFile()){row.files++;row.logicalBytes+=stat.size;if(stat.nlink>1)row.hardlinkedFiles++;return;}
  if(!stat.isDirectory())return;
  if(fs.realpathSync.native(path).toLowerCase()!==path.toLowerCase()){row.linksSkipped++;return;}
  for(const name of fs.readdirSync(path))try{scan(join(path,name),row);}catch(error){row.errors.push({path:join(path,name),code:error.code||error.name});}
}
for(const name of fs.readdirSync(root)){
  const path=join(root,name),stat=fs.lstatSync(path);if(!stat.isDirectory()||stat.isSymbolicLink())continue;
  const row={name,files:0,logicalBytes:0,hardlinkedFiles:0,linksSkipped:0,errors:[]};scan(path,row);rows.push(row);
}
rows.sort((a,b)=>b.logicalBytes-a.logicalBytes);
const result={observedAt:new Date().toISOString(),root,scope:'Read-only logical-byte inventory, without following junctions/symlinks. No ownership adoption, deletion or allocated-byte/reproducibility claim.',rows};
fs.writeFileSync(new URL('./validation-storage-inventory.json',import.meta.url),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify(rows.slice(0,15).map(({name,files,logicalBytes,linksSkipped,errors})=>({name,files,logicalBytes,linksSkipped,errors:errors.length}))));

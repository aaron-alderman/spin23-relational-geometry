// Bounded read-only search of known development copies and backup directories.
const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const hashes=['274a2a541789ee2e8b6576ec3aeb5d9651165338','647e065a69867ee767c5d9b7dac04bdce1946d19','844fa64abe4ee58f37add8f8e1b8e9fcfe2343d2','dfb98dbb630b1bf00ca1e0da2d3dbf81e73bc048'];
const root=process.cwd(),stores=new Set(),markers=[],errors=[],bundles=[];
const roots=[path.join(root,'.platform-reconstitution'),'C:/Users/aaron/sourcery',path.join(root,'.git')];
const skip=new Set(['node_modules','.pnpm-store','.private','.codex-remote-attachments','output','outputs','assets','runtime-dependency-payloads','nonproduction-claimipedia-runtime-cache','preservation-2026-11-04']);
function inspectStore(dir){
  const common=path.join(dir,'commondir');
  if(fs.existsSync(common))dir=path.resolve(dir,fs.readFileSync(common,'utf8').trim());
  if(fs.existsSync(path.join(dir,'objects')))stores.add(path.resolve(dir));
}
function walk(dir,depth=0){
  if(depth>8){errors.push({path:dir,error:'depth-limit-8'});return;}
  let entries;try{entries=fs.readdirSync(dir,{withFileTypes:true});}catch(e){errors.push({path:dir,error:e.code});return;}
  if(entries.some(e=>e.name==='objects'&&e.isDirectory())&&entries.some(e=>e.name==='HEAD')){inspectStore(dir);return;}
  for(const e of entries){
    const file=path.join(dir,e.name);
    if(e.isSymbolicLink())continue;
    if(e.name==='.git'){
      if(e.isDirectory())inspectStore(file);
      else if(e.isFile()){
        const marker=fs.readFileSync(file,'utf8').trim(),match=/^gitdir: (.+)$/m.exec(marker);
        const target=match?path.resolve(dir,match[1]):null;
        markers.push({path:file,target,exists:target?fs.existsSync(target):false});
        if(target&&fs.existsSync(target))inspectStore(target);
      }
    }else if(e.isDirectory()&&!skip.has(e.name))walk(file,depth+1);
    else if(e.isFile()&&e.name.endsWith('.bundle'))bundles.push(file);
  }
}
roots.forEach(r=>walk(r));
const checks=[];
for(const store of [...stores].sort()){
  const r=cp.spawnSync('git',['--git-dir',store,'cat-file','--batch-check=%(objectname) %(objecttype)'],{input:hashes.join('\n')+'\n',encoding:'utf8',timeout:10000});
  checks.push({store,exit:r.status,stdout:r.stdout?.trim(),stderr:r.stderr?.trim(),error:r.error?.message});
}
const bundleHeads=bundles.map(file=>{const r=cp.spawnSync('git',['bundle','list-heads',file],{encoding:'utf8',timeout:10000});return{path:file,exit:r.status,heads:r.stdout?.trim(),stderr:r.stderr?.trim(),scope:'advertised refs only; absence here does not establish object absence'};});
const result={observedAt:new Date().toISOString(),hashes,roots,maximumDepth:8,excludedDirectoryNames:[...skip],checks,markers,bundleHeads,errors,limitation:'Known accessible development and backup paths only; no claim about machine snapshots, inaccessible directories, other volumes or external backups.'};
fs.writeFileSync(process.argv[2],JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({stores:checks.length,bundles:bundles.length,unresolvedMarkers:markers.filter(m=>!m.exists).length,errors:errors.length,matches:checks.filter(c=>c.stdout?.split('\n').some(line=>!line.endsWith(' missing')))},null,2));

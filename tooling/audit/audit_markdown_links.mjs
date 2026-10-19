import fs from 'node:fs';
import path from 'node:path';

const root=process.cwd();
const ignoredDirectories=new Set([
  '.codex-remote-attachments',
  '.corpus-review',
  '.git',
  '.research-cache',
  '.venv-alpaca',
  '.worktrees',
  '__pycache__',
  'external',
  'node_modules',
  'spin23-relational-geometry',
]);
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{
  if(e.isDirectory()&&ignoredDirectories.has(e.name))return [];
  const p=path.join(d,e.name);
  return e.isDirectory()?walk(p):[p];
});
const files=walk(root).filter(p=>p.endsWith('.md'));
const broken=[];
for(const file of files){
  const text=fs.readFileSync(file,'utf8');
  const links=text.matchAll(/\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g);
  for(const match of links){
    let target=match[1].replace(/^<|>$/g,'');
    if(/^(?:https?:|mailto:|data:|#|codex:)/i.test(target))continue;
    target=decodeURIComponent(target.split('#')[0]);
    if(!target)continue;
    const resolved=path.isAbsolute(target)?target:path.resolve(path.dirname(file),target);
    if(!fs.existsSync(resolved))broken.push(path.relative(root,file)+' -> '+target);
  }
}
console.log('MARKDOWN='+files.length+' BROKEN_LINKS='+broken.length);
for(const item of broken)console.log(item);
if(broken.length)process.exitCode=1;

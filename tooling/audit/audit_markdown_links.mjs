import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

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
// Audit repository-owned Markdown only. `--exclude-standard` keeps imported
// migration caches and other ignored workspaces from becoming false failures,
// while still including newly created, not-yet-staged documentation.
const files=execFileSync('git',['ls-files','--cached','--others','--exclude-standard'],{cwd:root,encoding:'utf8'})
  .split(/\r?\n/)
  .filter(Boolean)
  .filter(p=>p.endsWith('.md'))
  .filter(p=>!p.split(/[\\/]/).some(part=>ignoredDirectories.has(part)))
  .map(p=>path.join(root,p))
  .filter(p=>fs.existsSync(p));
const broken=[];
for(const file of files){
  const text=fs.readFileSync(file,'utf8');
  const prose=text
    .replace(/```[\s\S]*?```/g,'')
    .replace(/~~~[\s\S]*?~~~/g,'')
    .replace(/\\\[[\s\S]*?\\\]/g,'')
    .replace(/\$\$[\s\S]*?\$\$/g,'');
  const links=prose.matchAll(/\[[^\]]*]\(([^)\s]+)(?:\s+"[^"]*")?\)/g);
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

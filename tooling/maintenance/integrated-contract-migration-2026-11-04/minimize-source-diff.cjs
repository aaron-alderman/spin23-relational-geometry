const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const root=path.resolve('.platform-reconstitution/sourcery-platform-reconciled');
function clean(v){if(Array.isArray(v))return v.map(clean);if(v instanceof RegExp)return{regex:v.source,flags:v.flags};if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).filter(([k])=>!['start','end','raw'].includes(k)).map(([k,x])=>[k,clean(x)]));return v;}
function key(n){const node=n.declaration||n;return node.type+':'+(node.id?.name||node.declarations?.[0]?.id?.name||node.source?.value||'');}
let restored=0;const files=cp.execFileSync('git',['-C',root,'diff','--name-only','--','sdk/**/*.mjs'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean);
for(const name of files){const old=cp.spawnSync('git',['-C',root,'show','f534f34:'+name],{encoding:'utf8',maxBuffer:16*1024*1024});if(old.status)continue;const file=path.join(root,name),text=fs.readFileSync(file,'utf8'),before=parse(old.stdout,{ecmaVersion:'latest',sourceType:'module'}),after=parse(text,{ecmaVersion:'latest',sourceType:'module'}),map=new Map(before.body.map(n=>[key(n),n])),edits=[];
for(const n of after.body){const prior=map.get(key(n));if(prior&&JSON.stringify(clean(prior))===JSON.stringify(clean(n)))edits.push({start:n.start,end:n.end,text:old.stdout.slice(prior.start,prior.end)});}
let next=text;for(const e of edits.sort((a,b)=>b.start-a.start)){next=next.slice(0,e.start)+e.text+next.slice(e.end);restored++;}fs.writeFileSync(file,next);
}
console.log(JSON.stringify({unchangedDeclarationsRestored:restored,files:files.length}));

const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const root=path.resolve('.platform-reconstitution/sourcery-platform-reconciled');
function clean(v){if(Array.isArray(v))return v.map(clean);if(v instanceof RegExp)return{regex:v.source,flags:v.flags};if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).filter(([k])=>!['start','end','raw'].includes(k)).map(([k,x])=>[k,clean(x)]));return v;}
const files=cp.execFileSync('git',['-C',root,'diff','--cached','--name-only'],{encoding:'utf8'}).trim().split(/\r?\n/).filter(n=>n.endsWith('.mjs'));
for(const name of files){const file=path.join(root,name),source=fs.readFileSync(file,'utf8'),ast=parse(source,{ecmaVersion:'latest',sourceType:'module'}),ranges=[];
function walk(n){if(!n||typeof n!=='object')return;if(n.type==='TemplateLiteral'){ranges.push([n.start,n.end]);return;}for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(walk);else if(v?.type)walk(v);}}walk(ast);
const edits=[...source.matchAll(/[ \t]+$/gm)].filter(m=>!ranges.some(([a,b])=>m.index>=a&&m.index+m[0].length<=b));let next=source;for(const e of edits.reverse())next=next.slice(0,e.index)+next.slice(e.index+e[0].length);
if(JSON.stringify(clean(ast))!==JSON.stringify(clean(parse(next,{ecmaVersion:'latest',sourceType:'module'}))))throw Error('Whitespace changed AST '+name);fs.writeFileSync(file,next);
}console.log(JSON.stringify({sourceFilesChecked:files.length,semanticAstUnchanged:true}));

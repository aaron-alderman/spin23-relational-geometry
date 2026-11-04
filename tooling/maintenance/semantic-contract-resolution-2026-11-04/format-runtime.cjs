const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const root=path.resolve('.platform-reconstitution/sourcery-platform-reconciled');
function comparable(value){if(Array.isArray(value))return value.map(comparable);if(value instanceof RegExp)return{source:value.source,flags:value.flags};if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).filter(([key])=>!['start','end','raw'].includes(key)).map(([key,v])=>[key,comparable(v)]));return value;}
const names=cp.execFileSync('git',['-C',root,'status','--porcelain=v1','-z'],{encoding:'utf8'}).split('\0').map(row=>row.slice(3)).filter(n=>n.startsWith('sdk/')&&n.endsWith('.mjs'));
for(const name of names){const file=path.join(root,name),source=fs.readFileSync(file,'utf8'),tokens=[],ast=parse(source,{ecmaVersion:'latest',sourceType:'module',onToken:tokens}),protectedRanges=[];
 function walk(n){if(!n||typeof n!=='object')return;if(n.type==='TemplateLiteral'){protectedRanges.push([n.start,n.end]);return;}for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(walk);else if(v?.type)walk(v);}}walk(ast);
 let depth=0;const edits=[];
 for(const t of tokens){if(protectedRanges.some(([a,b])=>t.start>=a&&t.end<=b))continue;
  if(t.type.label==='}') {depth=Math.max(0,depth-1);edits.push({at:t.start,text:'\n'+'  '.repeat(depth)});}
  if(t.type.label==='{')depth++;
  if(['{',';'].includes(t.type.label)||t.type.label===','&&depth>0)edits.push({at:t.end,text:'\n'+'  '.repeat(depth)});
 }
 let formatted=source;for(const e of edits.sort((a,b)=>b.at-a.at))formatted=formatted.slice(0,e.at)+e.text+formatted.slice(e.at).replace(/^[ \t]*/, '');
 // Delete only whitespace-only gaps added alongside an existing line break.
 // A semantic AST comparison protects raw template and regular-expression data.
 formatted=formatted.replace(/\n[ \t]*\n[ \t]*\n/g,'\n\n');
 if(JSON.stringify(comparable(ast))!==JSON.stringify(comparable(parse(formatted,{ecmaVersion:'latest',sourceType:'module'}))))throw Error('Formatting changed semantic AST '+name);
 fs.writeFileSync(file,formatted);
}
console.log(JSON.stringify({formattedModules:names.length,semanticAstUnchanged:true}));

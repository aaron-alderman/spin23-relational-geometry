// Static prerequisite map, deliberately separate from runtime qualification.
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),cp=require('node:child_process');
const {createRequire,builtinModules}=require('node:module');
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
const root=process.cwd(),selected=path.resolve('.platform-reconstitution/sourcery-platform-reconciled'),legacy=path.resolve('.platform-reconstitution/sourcery-platform');
const prior=JSON.parse(fs.readFileSync('tooling/maintenance/platform-reconciliation-2026-11-04/legacy-working-review.json'));
const sources=prior.rows.filter(row=>row.path.startsWith('test/')&&row.disposition==='working-file-not-in-selected-source-needs-port-review').map(row=>row.path);
if(sources.length!==145)throw new Error('Expected the fixed retained 145-test cohort.');
const slash=p=>p.replaceAll('\\','/'),sha=b=>crypto.createHash('sha256').update(b).digest('hex'),cache=new Map();
function exportsOf(file,seen=new Set()){
 if(cache.has(file))return cache.get(file);if(seen.has(file))return new Set();seen.add(file);
 const result=new Set();if(!fs.existsSync(file)||!file.endsWith('.mjs'))return result;
 let ast;try{ast=parse(fs.readFileSync(file,'utf8'),{ecmaVersion:'latest',sourceType:'module',allowHashBang:true});}catch{return result;}
 for(const node of ast.body){
  if(node.type==='ExportDefaultDeclaration')result.add('default');
  if(node.type==='ExportNamedDeclaration'){
   if(node.declaration?.id)result.add(node.declaration.id.name);
   for(const item of node.declaration?.declarations||[])if(item.id.type==='Identifier')result.add(item.id.name);
   for(const item of node.specifiers||[])result.add(item.exported.name||item.exported.value);
  }
  if(node.type==='ExportAllDeclaration'){
   let target;try{target=node.source.value.startsWith('.')?path.resolve(path.dirname(file),node.source.value):createRequire(file).resolve(node.source.value);}catch{continue;}
   for(const name of exportsOf(target,seen))if(name!=='default')result.add(name);
  }
 }
 cache.set(file,result);return result;
}
function domain(name){
 const n=path.basename(name);
 for(const [prefix,value] of [['auth-provider','auth-provider-projections'],['semantic-mutation','semantic-mutation'],['semantic-authority','semantic-authority'],['route-','routing'],['mcp-','mcp'],['project-extension','project-extension'],['data-space','data-space'],['server-service','server-service'],['forwarded-identity','forwarded-identity']])if(n.startsWith(prefix))return value;
 if(/blank-platform|platform-assurance|goal-audit|authoring-platform-shell|admissibility-declaration|command-evidence/.test(n))return 'bootstrap-assurance';
 return n.replace(/(?:-algebra)?\.test\.mjs$/,'');
}
function inspect(name){
 const data=fs.readFileSync(path.join(legacy,name)),text=data.toString('utf8'),row={path:name,sha256:sha(data),domain:domain(name),syntax:'valid',testCases:[],imports:[],resources:[]};
 let ast;try{ast=parse(text,{ecmaVersion:'latest',sourceType:'module',allowHashBang:true});}catch(error){row.syntax={message:error.message,line:error.loc?.line,column:error.loc?.column};row.disposition='blocked-invalid-syntax';return row;}
 function visit(node){
  if(!node||typeof node!=='object')return;
  if(node.type==='CallExpression'&&node.callee?.name==='test'&&typeof node.arguments[0]?.value==='string')row.testCases.push(node.arguments[0].value);
  if(node.type==='ImportDeclaration'){
   const specifier=node.source.value,names=node.specifiers.filter(s=>s.type!=='ImportNamespaceSpecifier').map(s=>s.type==='ImportDefaultSpecifier'?'default':s.imported.name||s.imported.value);
   if(specifier.startsWith('node:')||builtinModules.includes(specifier))row.imports.push({specifier,names,builtin:true});
   else{
    let target;try{target=specifier.startsWith('.')?path.resolve(selected,path.dirname(name),specifier):createRequire(path.join(selected,name)).resolve(specifier);}catch{}
    const exists=!!target&&fs.existsSync(target),available=exists?exportsOf(target):new Set();
    row.imports.push({specifier,names,target:target?slash(path.relative(root,target)):null,exists,missingExports:exists?names.filter(n=>!available.has(n)):names,owner:target&&target.startsWith(path.resolve('.platform-reconstitution/expression-algebra')+path.sep)?'shared-expression-algebra':'platform-or-other-owner'});
   }
  }
  if(node.type==='NewExpression'&&node.callee?.name==='URL'&&typeof node.arguments[0]?.value==='string'&&node.arguments[0].value.startsWith('.')){
   const specifier=node.arguments[0].value,target=path.resolve(selected,path.dirname(name),specifier);row.resources.push({specifier,target:slash(path.relative(root,target)),exists:fs.existsSync(target)});
  }
  if(node.type==='Literal'&&typeof node.value==='string'&&/^(?:sdk|assurance|test)\/[^\s]+\.(?:rel|mjs|json)$/u.test(node.value)){
   const target=path.resolve(selected,node.value);row.resources.push({specifier:node.value,target:slash(path.relative(root,target)),exists:fs.existsSync(target),resolution:'repository-root literal; dynamic paths are not fully inferred'});
  }
  for(const value of Object.values(node)){if(Array.isArray(value))value.forEach(visit);else if(value&&typeof value==='object'&&value.type)visit(value);}
 }
 visit(ast);
 const missing=row.imports.filter(i=>!i.builtin&&(!i.exists||i.missingExports.length));
 row.disposition=missing.some(i=>i.owner==='shared-expression-algebra')?'blocked-shared-owner-contract':missing.length?'blocked-platform-source-or-export':row.resources.some(r=>!r.exists)?'blocked-resource-source':'ready-for-runtime-qualification';
 row.scope='Import/resource presence and static exports only; not a passing test or executable-algebra proof.';
 return row;
}
const rows=sources.map(inspect),counts=rows.reduce((m,r)=>(m[r.disposition]=(m[r.disposition]||0)+1,m),{}),domains=Object.entries(rows.reduce((m,r)=>((m[r.domain]||=[]).push(r.path),m),{})).map(([domain,tests])=>({domain,testCount:tests.length,tests}));
const head=cp.execFileSync('git',['-C',selected,'rev-parse','HEAD'],{encoding:'utf8'}).trim();
const result={observedAt:new Date().toISOString(),cohort:'fixed 145 retained tests from the reconciliation ledger',selectedSource:{path:slash(path.relative(root,selected)),commit:head},counts,domains,rows,limits:['Static exports do not establish semantic equivalence.','Unparsed malformed tests remain blocked.','Missing generic operators are not invented or promoted by this map.','Names containing algebra do not prove executable algebra ownership.']};
fs.writeFileSync(path.join(__dirname,'test-qualification-ledger.json'),JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({tests:rows.length,domains:domains.length,counts,ready:rows.filter(r=>r.disposition==='ready-for-runtime-qualification').map(r=>r.path)},null,2));

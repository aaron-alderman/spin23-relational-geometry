const fs=require('node:fs'),path=require('node:path'),cp=require('node:child_process'),crypto=require('node:crypto');
const root=process.cwd(),audit=__dirname,base=path.join(root,'.platform-reconstitution'),selected=path.join(base,'sourcery-platform-reconciled'),legacy=path.join(base,'sourcery-platform');
const head='dd39e52b7552f9fd1f18730afb460b2f8c6071d5';
const git=args=>cp.execFileSync('git',['-C',selected,...args],{encoding:'utf8'}).trim();
if(git(['rev-parse','HEAD'])!==head||git(['status','--porcelain=v1']))throw Error('Expected exact clean selected source');
const hash=file=>crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
const write=(name,value)=>fs.writeFileSync(path.join(audit,name),typeof value==='string'?value:JSON.stringify(value,null,2)+'\n');
const prefix="import test from 'node:test';\nimport assert from 'node:assert/strict';\n";
const owner="../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/route-runtime.mjs";
const amendments=[
 {name:'boot-query-param-algebra.test.mjs',inputChange:'Generic record becomes authored facts plus boot subject; preserve expected value and missing-parameter refusal.',text:prefix+`import {bootQueryParamForBoot} from '${owner}';

test('boot query projection preserves explicit subject and parameter',()=>{
 assert.equal(bootQueryParamForBoot([{s:'boot.main',p:'queryParam',o:'token'}],'boot.main'),'token');
});

test('boot query projection refuses absent required parameter',()=>{
 assert.throws(()=>bootQueryParamForBoot([{s:'boot.main',p:'queryParam',o:''}],'boot.main'),/Missing required boot\\.main\\.queryParam/);
});
`},
 {name:'route-selector-algebra.test.mjs',inputChange:'Generic record-array/mode selection becomes authored RouteTarget facts and separate role/subject selectors. Generic renderer record becomes PageRendererContract facts. No mode dispatcher or generic API added.',text:prefix+`import {routeTargetByRole,routeTargetBySubject,pageRendererSupportsDomSsr} from '${owner}';

const targets=[{s:'target.a',p:'isa',o:'RouteTarget'},{s:'target.a',p:'role',o:'authenticatedDefault'},{s:'target.b',p:'isa',o:'RouteTarget'},{s:'target.b',p:'role',o:'operatorDefault'}];
const rendererFacts=mode=>[{s:'renderer.contract',p:'isa',o:'PageRendererContract'},{s:'renderer.contract',p:'renderer',o:'renderer.main'},...(mode===undefined?[]:[{s:'renderer.contract',p:'serverRenderMode',o:mode}])];

test('route selectors preserve role and subject lookup with explicit empty refusal',()=>{
 assert.equal(routeTargetByRole(targets,'operatorDefault').subject,'target.b');
 assert.equal(routeTargetBySubject(targets,'target.a').role,'authenticatedDefault');
 assert.equal(routeTargetByRole(targets,''),null);
});

test('page renderer SSR support is an explicit hydration-mode check',()=>{
 assert.equal(pageRendererSupportsDomSsr(rendererFacts('domHydration'),'renderer.main'),true);
 assert.equal(pageRendererSupportsDomSsr(rendererFacts('other'),'renderer.main'),false);
 assert.equal(pageRendererSupportsDomSsr(rendererFacts(),'renderer.main'),false);
});
`}
];
const {parse}=require('../../../.platform-reconstitution/sourcery-platform-authority/runtime-dependency-payloads/acorn');
function clean(v){if(Array.isArray(v))return v.map(clean);if(v instanceof RegExp)return{regex:v.source,flags:v.flags};if(v&&typeof v==='object')return Object.fromEntries(Object.entries(v).filter(([k])=>!['start','end','raw'].includes(k)).map(([k,x])=>[k,clean(x)]));return v;}
function contract(text){const result={testNames:[],assertions:[]};function walk(n){if(!n||typeof n!=='object')return;if(n.type==='CallExpression'&&n.callee?.name==='test')result.testNames.push(n.arguments[0].value);if(n.type==='CallExpression'&&n.callee?.object?.name==='assert')result.assertions.push({method:n.callee.property.name,expected:clean(n.arguments[1])});for(const v of Object.values(n)){if(Array.isArray(v))v.forEach(walk);else if(v?.type)walk(v);}}walk(parse(text,{ecmaVersion:'latest',sourceType:'module'}));return result;}
for(const row of amendments){const original=path.join(legacy,'test',row.name),originalText=fs.readFileSync(original,'utf8');if(JSON.stringify(contract(originalText))!==JSON.stringify(contract(row.text)))throw Error('Expected contract changed: '+row.name);write(row.name,row.text);row.originalSha256=hash(original);row.selectedTestSha256=hash(path.join(audit,row.name));row.contract=contract(row.text);const diff=cp.spawnSync('git',['diff','--no-index','--',original,path.join(audit,row.name)],{encoding:'utf8'});if(![0,1].includes(diff.status))throw Error(diff.stderr);row.diff=diff.stdout;delete row.text;}
const originals=['boot-query-param-algebra.test.mjs','route-selector-algebra.test.mjs','route-target-normalization-algebra.test.mjs'];
fs.mkdirSync(path.join(audit,'originals'),{recursive:true});for(const name of originals)fs.copyFileSync(path.join(legacy,'test',name),path.join(audit,'originals',name));
write('ownership-evidence.json',{observedAt:new Date().toISOString(),sourceCommit:head,sourceChanged:false,selectedOwner:'Sourcery authored route, renderer and PageBoot policy',scope:'Explicit input-domain amendments; runtime/source conformance only, not restoration of missing generic operations or executable algebra.',amendments,sourceHashes:Object.fromEntries(['sdk/core/route-runtime.mjs','sdk/core/page-boot-runtime.mjs','PLATFORM.md'].map(name=>[name,hash(path.join(selected,name))])),sharedOwnerReadmeSha256:hash(path.join(base,'expression-algebra/README.md')),normalizationDifference:{path:'test/route-target-normalization-algebra.test.mjs',originalSha256:hash(path.join(legacy,'test/route-target-normalization-algebra.test.mjs')),expectation:'Unknown mode must throw /Unknown route target normalization mode/',selectedContract:'Separate path, port and href functions; no mode argument or dispatcher.',disposition:'blocked-owner-contract-difference',conclusion:'Four value expectations can be reproduced; fifth dispatcher refusal cannot be claimed covered. No dispatcher invented.'}});
console.log(JSON.stringify({sourceCommit:head,files:amendments.length,preservedAssertions:amendments.reduce((n,r)=>n+r.contract.assertions.length,0)}));

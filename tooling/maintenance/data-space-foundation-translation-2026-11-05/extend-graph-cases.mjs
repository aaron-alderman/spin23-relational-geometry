import {readFileSync,writeFileSync} from 'node:fs';
import {foundationFact as f} from '../../../.platform-reconstitution/sourcery-platform-reconciled/assurance/data-space-foundation-fixtures.mjs';
const file='.platform-reconstitution/sourcery-platform-reconciled/assurance/semantic-contract-cases.json',doc=JSON.parse(readFileSync(file)),added=[],t=(s,k)=>f(s,'isa',k),map=(...map)=>({map});
const facts=[t('config','DataTransformConfig'),t('graph','DataTransformConfigInputSourceGraph'),f('graph','config','config'),f('graph','graphKind','join')],inputs=[],sources=[];
for(const n of ['a','b']){facts.push(f('graph','node',n),t(n,'DataTransformConfigInputSourceGraphNode'),f(n,'graph','graph'),f(n,'input','input.'+n),f(n,'assetSource','asset.'+n),f(n,'fieldSource','field.'+n));inputs.push(['input.'+n,{subject:'input.'+n,bindingKind:'asset'}]);sources.push(['asset.'+n,{subject:'asset.'+n,input:'input.'+n,sourceKind:'asset',asset:'asset'+n}],['field.'+n,{subject:'field.'+n,input:'input.'+n,sourceKind:'field',field:'key'+n}]);}
facts.push(f('graph','edge','edge'),t('edge','DataTransformConfigInputSourceGraphEdge'),f('edge','graph','graph'),f('edge','leftNode','a'),f('edge','rightNode','b'),f('edge','leftFieldSource','field.a'),f('edge','rightFieldSource','field.b'),f('edge','edgeKind','joinKey'));
function add(id,rows,checks,throws){added.push({id:'foundation-graph-'+id,operation:'data-space-foundation',input:{api:'parseTransformConfigInputSourceGraph',facts:rows,args:['graph','config',map(...inputs),map(...sources)]},subjects:['module.transformInputSourceGraph'],...(throws?{throws:{messageIncludes:throws}}:{checks})});}
const ck=(path,equals)=>({path:['value',...path],equals});
add('valid',facts,[ck(['nodes',0,'assetSourceConfig','asset'],'asseta'),ck(['edges',0,'leftFieldSource'],'field.a'),ck(['edgeInventories'],[])]);
add('too-few-nodes',facts.filter(r=>r.s!=='graph'||r.p!=='node'||r.o!=='b'),null,'at least two');
add('no-edge',facts.filter(r=>r.s!=='graph'||r.p!=='edge'),null,'at least one explicit graph edge');
add('self-edge',facts.filter(r=>r.s!=='edge'||r.p!=='rightNode').concat(f('edge','rightNode','a')),null,'different graph nodes');
add('foreign-field',facts.filter(r=>r.s!=='edge'||r.p!=='leftFieldSource').concat(f('edge','leftFieldSource','field.b')),null,'field source declared by a');
const inventory=[f('graph','edgeInventory','inventory'),t('inventory','DataTransformConfigInputSourceGraphEdgeInventory'),f('inventory','graph','graph'),f('inventory','edge','edge'),f('inventory','state','present')];
add('present-inventory',[...facts,...inventory],[ck(['edges',0,'subject'],'edge'),ck(['edgeInventories',0,'state'],'present')]);
add('removed-inventory',[...facts,...inventory.filter(r=>r.s!=='inventory'||r.p!=='state'),f('inventory','state','available')],null,'at least one active graph edge');
const existing=new Set(doc.cases.map(c=>c.id));if(added.some(c=>existing.has(c.id)))throw Error('Already added');doc.cases.push(...added);writeFileSync(file,JSON.stringify(doc,null,2)+'\n');console.log({added:added.length,total:doc.cases.length});

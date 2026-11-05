import test from 'node:test';import assert from 'node:assert/strict';
import {FactStore,parse} from "file:///C:/Users/aaron/grand-theory/.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs";
import * as data from './negative-control-index.mjs';
import {artifactContent} from './negative-control-export.mjs';
const f=(s,p,o)=>({s,p,o,pol:'is'});
test('catalog depth follows ancestry even when descendants sort before parents',()=>{
 const input={catalogNodes:[{subject:'leaf',parent:'branch',order:0,asset:'asset'},{subject:'branch',parent:'root',order:1},{subject:'root',parent:'',order:9}]},before=structuredClone(input),tree=data.buildDataCatalogTree(input);
 assert.equal(tree.nodesBySubject.get('leaf').depth,2);assert.equal(tree.nodesBySubject.get('branch').depth,1);assert.equal(tree.roots[0].descendantAssetCount,1);assert.deepEqual(input,before);assert.equal(tree.nodesBySubject.get('root').children[0],tree.nodesBySubject.get('branch'));
});
test('deep catalog ancestry and descendant counting avoid JavaScript recursion limits',()=>{
 const length=7000,catalogNodes=Array.from({length},(_,i)=>({subject:'n'+i,parent:i?'n'+(i-1):'',order:length-i,asset:i===length-1?'asset':''})),tree=data.buildDataCatalogTree({catalogNodes});
 assert.equal(tree.nodesBySubject.get('n'+(length-1)).depth,length-1);assert.equal(tree.roots[0].descendantAssetCount,1);
});
test('prototype-named reset layers use unknown precedence and cannot conceal fallback conflicts',()=>{
 const store=FactStore.from([f('target','name','current')]),winner={subject:'winner',effectiveValue:'current',sourceLayer:'draft'},property={state:'valid',value:winner,candidates:[winner,{subject:'a',sourceLayer:'constructor',effectiveValue:'A',valueKind:'string',provider:'one',validationState:'valid',order:0},{subject:'b',sourceLayer:'unknown',effectiveValue:'B',valueKind:'string',provider:'two',validationState:'valid',order:1}]};
 const result=data.deriveResetCandidateInventory(store,'',{target:'target',predicate:'name',valueKind:'string'},property);assert.deepEqual(result.map(r=>r.availability),['blockedConflict','blockedConflict']);assert(result.every(r=>!r.actionable));
});
test('custom prototype-named source kind is treated like other unknown kind labels',()=>{
 const store=FactStore.from([f('source','isa','DataSource'),f('source','source','object'),f('source','sourceKind','constructor'),f('object','isa','CustomSource')]);assert.equal(data.parseSource(store,'source').sourceKind,'constructor');
});
test('custom prototype-named asset kinds retain the generic catalog asset fallback',()=>{
 const store=FactStore.from([f('asset','isa','DataAsset'),f('asset','source','source'),f('asset','sourceObject','object'),f('asset','assetKind','constructor'),f('source','isa','DataSource'),f('object','isa','CustomObject')]),sources=[{subject:'source',source:'origin',sourceKind:'custom'}],asset=data.parseAsset(store,'asset',new Map([['source',sources[0]]]));
 const nodes=data.syntheticCatalogNodesForDataSpace('space',sources,[asset]);assert.equal(nodes[1].nodeKind,'asset');
});
test('unknown resolved-provider layers do not select inherited object members as policies',()=>{
 const store=FactStore.from([f('provider','isa','CustomProvider')]);assert.doesNotThrow(()=>data.requireResolvedValueProviderFamily(store,'value','constructor','provider',[]));
});
test('SQL metadata comments cannot inject executable lines',()=>{
 const target={targetKind:'sqlite',subject:'target\nDROP TABLE protected;--',bridgeKind:'publicationCard',bridgeSubject:'bridge\nDELETE FROM protected;--',asset:'asset\nDROP VIEW protected;--',publication:'publication',validationResult:'result',tableName:'safe'};
 const sql=artifactContent(target,[],'artifact');assert(!sql.split(/\r?\n/).some(line=>/^(DROP|DELETE)/.test(line)));assert.match(sql,/CREATE TABLE IF NOT EXISTS "safe"/);
});
test('REL experiment preview round-trips quoted and newline-bearing identities',()=>{
 const target={targetKind:'experimentViewer',subject:'target"\\\nquoted',asset:'asset"\\quoted',publication:'publication\nline',validationResult:'result'};
 const text=artifactContent(target,[],'artifact'),parsed=parse(text);assert.equal(parsed.one(target.subject,'asset'),target.asset);assert.equal(parsed.one(target.subject,'publication'),target.publication);assert.equal(parsed.one(target.subject,'targetKind'),'experimentViewer');
});

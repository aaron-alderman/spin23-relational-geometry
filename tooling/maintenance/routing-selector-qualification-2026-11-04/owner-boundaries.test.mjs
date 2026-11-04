import test from 'node:test';
import assert from 'node:assert/strict';
import * as route from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/route-runtime.mjs';
import * as generic from '../../../.platform-reconstitution/expression-algebra/src/index.mjs';

test('target selection respects explicit owner membership and fallback type subjects',()=>{
 const facts=[{s:'a',p:'isa',o:'RouteTarget'},{s:'a',p:'role',o:'operatorDefault'},{s:'b',p:'role',o:'operatorDefault'},{s:'net',p:'surfaceTarget',o:'b'}];
 assert.equal(route.routeTargetByRole(facts,' operatorDefault ').subject,'b');
 assert.equal(route.routeTargetBySubject(facts,'a'),null);
 assert.equal(route.routeTargetByRole(facts,'operatorDefault','other').subject,'a');
 assert.equal(route.routeTargetBySubject(facts,' b ').subject,'b');
 assert.equal(route.routeTargetBySubject(facts,''),null);
 assert.equal(route.routeTargetByRole(facts,'missing'),null);
});

test('renderer policy refuses ambiguous contracts rather than silently choosing',()=>{
 const facts=['a','b'].flatMap(s=>[{s,p:'isa',o:'PageRendererContract'},{s,p:'renderer',o:'main'},{s,p:'serverRenderMode',o:'domHydration'}]);
 assert.throws(()=>route.pageRendererSupportsDomSsr(facts,'main'),/at most one PageRendererContract; found 2/);
 assert.equal(route.pageRendererSupportsDomSsr([],'main'),false);
});

test('boot projection preserves fact precedence, negation filtering and callback fault identity',()=>{
 const facts=[{s:'boot',p:'queryParam',o:'old'},{s:'boot',p:'queryParam',o:'new'},{s:'boot',p:'queryParam',o:'ignored',pol:'is-not'}];
 assert.equal(route.bootQueryParamForBoot(facts,'boot'),'new');
 const seen=[];const fault=new Error('callback fault');
 assert.throws(()=>route.bootQueryParamForBoot(facts,'boot',{requireValue(label,value){seen.push([label,value]);throw fault;}}),e=>e===fault);
 assert.deepEqual(seen,[['boot.queryParam','new']]);
 const oneOnly={one(s,p){return p==='queryParam'?'source-one':'';}};
 assert.throws(()=>route.bootQueryParamForBoot(oneOnly,'boot'),/source is not iterable/);
 assert.equal(route.bootQueryParamForBoot({...oneOnly,factsForSubjectPredicate(){return [];}},'boot'),'source-one');
 assert.throws(()=>route.bootQueryParamForBoot([],'boot'),/Missing required boot.queryParam/);
});

test('normalization value cases agree while mode refusal remains an unresolved contract',()=>{
 const target={path:' /docs ',port:' 8080 ',href:''};
 assert.equal(route.routeTargetPath(target),'/docs');
 assert.equal(route.routeTargetPort(target),'8080');
 assert.equal(route.routeTargetHref(target),'/docs');
 assert.equal(route.routeTargetHref({path:'/docs',href:'https://example.test/docs'}),'https://example.test/docs');
 // A second argument is not a mode on this API. This records the API mismatch;
 // it does not substitute for the original dispatcher refusal assertion.
 assert.equal(route.routeTargetPath({},'unknown'),'');
 assert.equal(route.routeTargetNormalizationValue,undefined);
});

test('unavailable generic exports remain unavailable',()=>{
 for(const name of ['bootQueryParamValue','routeTargetSelectValue','pageRendererSupportsDomSsrValue','routeTargetNormalizationValue'])assert.equal(generic[name],undefined);
});

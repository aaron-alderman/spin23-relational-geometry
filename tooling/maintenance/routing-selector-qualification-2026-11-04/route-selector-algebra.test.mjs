import test from 'node:test';
import assert from 'node:assert/strict';
import {routeTargetByRole,routeTargetBySubject,pageRendererSupportsDomSsr} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/route-runtime.mjs';

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

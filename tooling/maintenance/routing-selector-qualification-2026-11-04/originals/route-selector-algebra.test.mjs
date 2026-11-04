import test from 'node:test';
import assert from 'node:assert/strict';
import {routeTargetSelectValue,pageRendererSupportsDomSsrValue} from '../../expression-algebra/src/index.mjs';

const targets=[{subject:'target.a',role:'authenticatedDefault'},{subject:'target.b',role:'operatorDefault'}];

test('route selectors preserve role and subject lookup with explicit empty refusal',()=>{
 assert.equal(routeTargetSelectValue({mode:'role',value:'operatorDefault',targets}).subject,'target.b');
 assert.equal(routeTargetSelectValue({mode:'subject',value:'target.a',targets}).role,'authenticatedDefault');
 assert.equal(routeTargetSelectValue({mode:'role',value:'',targets}),null);
});

test('page renderer SSR support is an explicit hydration-mode check',()=>{
 assert.equal(pageRendererSupportsDomSsrValue({serverRenderMode:'domHydration'}),true);
 assert.equal(pageRendererSupportsDomSsrValue({serverRenderMode:'other'}),false);
 assert.equal(pageRendererSupportsDomSsrValue({}),false);
});

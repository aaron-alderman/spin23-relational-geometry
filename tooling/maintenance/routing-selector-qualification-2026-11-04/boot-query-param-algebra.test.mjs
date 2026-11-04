import test from 'node:test';
import assert from 'node:assert/strict';
import {bootQueryParamForBoot} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/route-runtime.mjs';

test('boot query projection preserves explicit subject and parameter',()=>{
 assert.equal(bootQueryParamForBoot([{s:'boot.main',p:'queryParam',o:'token'}],'boot.main'),'token');
});

test('boot query projection refuses absent required parameter',()=>{
 assert.throws(()=>bootQueryParamForBoot([{s:'boot.main',p:'queryParam',o:''}],'boot.main'),/Missing required boot\.main\.queryParam/);
});

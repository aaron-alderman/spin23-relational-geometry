import test from 'node:test';
import assert from 'node:assert/strict';
import {bootQueryParamValue} from '../../expression-algebra/src/index.mjs';

test('boot query projection preserves explicit subject and parameter',()=>{
 assert.equal(bootQueryParamValue({subject:'boot.main',queryParam:'token'}),'token');
});

test('boot query projection refuses absent required parameter',()=>{
 assert.throws(()=>bootQueryParamValue({bootSubject:'boot.main',queryParam:''}),/Missing required boot\.main\.queryParam/);
});

import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import * as vm from 'node:vm';
import test from 'node:test';
import assert from 'node:assert/strict';
import * as core from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/rel-core.mjs';
const file=new URL('../provider-claim-migration-2026-11-06/canvas-retained-canvas-schema-compatibility.mjs.txt',import.meta.url),bytes=readFileSync(file);
assert.equal(createHash('sha256').update(bytes).digest('hex'),'c922e33804e72ebf7e889c28b4ec08dce6d72daa432b69abb384fac81d09a92a');
const module=new vm.SourceTextModule(bytes.toString(),{identifier:'retained://34502e9fbf19be78b8c58e4940dd474704f6a946/sdk/browser/canvas-schema-compatibility.mjs'});
await module.link(name=>{assert.equal(name,'../core/rel-core.mjs');return new vm.SyntheticModule(Object.keys(core),function(){for(const key of Object.keys(core))this.setExport(key,core[key]);});});await module.evaluate();
const {canvasStructuralTypeIssue,canvasSemanticColorRoleResolution}=module.namespace;
const f=(s,p,o,pol='is')=>({s,p,o,pol});
test('retained adapter counterexample: retracted structural type is still admitted',()=>{
  const store=core.FactStore.from([f('record','isa','CanvasExprArg'),f('record','isa','CanvasExprArg','is-not')]);
  assert.deepEqual(store.activeTypes('record'),[]);
  assert.equal(canvasStructuralTypeIssue(store,{subject:'record',expectedType:'CanvasExprArg'}),null);
});
test('retained adapter counterexample: retracted role edge still supplies a semantic color',()=>{
  const store=core.FactStore.from([f('doc','semanticColorRole','role'),f('role','name','commandFg'),f('role','color','cyan'),f('doc','semanticColorRole','role','is-not')]);
  assert.deepEqual(store.activeObjects('doc','semanticColorRole'),[]);
  assert.equal(canvasSemanticColorRoleResolution(store,{documentSubject:'doc',role:'commandFg',fallbackName:'white'}).colorName,'cyan');
});
test('retained adapter counterexample: retracted role name still matches the old role',()=>{
  const store=core.FactStore.from([f('doc','semanticColorRole','role'),f('role','name','commandFg'),f('role','color','cyan'),f('role','name','commandFg','is-not')]);
  assert.deepEqual(store.activeObjects('role','name'),[]);
  assert.equal(canvasSemanticColorRoleResolution(store,{documentSubject:'doc',role:'commandFg',fallbackName:'white'}).colorName,'cyan');
});

import test from 'node:test';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {verifyRetainedSourceProvenance} from './verify-reconciled-runtime.mjs';
const files=[{path:'package.json',bytes:2,contentHash:'a'.repeat(64)}],valid={name:'@sourcerytech/claimipedia-core',source:'https://github.com/sourcerytech/claimipedia-core.git',sourceCommit:'1'.repeat(40),sourceTree:'2'.repeat(40),files,payloadHash:createHash('sha256').update(JSON.stringify(files)).digest('hex')};
test('Core retained-source owner is explicit and malformed provenance still refuses',()=>{verifyRetainedSourceProvenance(valid);for(const bad of [{name:'unknown-owner'},{source:'https://example.test/unrelated.git'},{sourceCommit:''},{sourceTree:'bad'},{files:[]},{payloadHash:'0'.repeat(64)}])assert.throws(()=>verifyRetainedSourceProvenance({...valid,...bad}));});

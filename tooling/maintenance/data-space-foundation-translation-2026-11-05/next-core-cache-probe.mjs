import {writeFileSync} from 'node:fs';import assert from 'node:assert/strict';
import {validateSemanticDocumentationDeclarations} from '../../../.platform-reconstitution/sourcery-platform-reconciled/sdk/core/admissibility/declarations.mjs';
const f=(s,p,o)=>({s,p,o,pol:'is'}),facts=[f('target','isa','Record'),f('doc','isa','SemanticDoc'),f('doc','about','target')];
assert.deepEqual(validateSemanticDocumentationDeclarations(facts),[]);facts.push(f('doc','seeAlso','missing'));
const reused=validateSemanticDocumentationDeclarations(facts),fresh=validateSemanticDocumentationDeclarations([...facts]);
assert.equal(reused.length,0);assert.equal(fresh.length,1);assert.match(fresh[0].message,/unknown subject "missing"/);
const receipt={sourceCommit:'c1fd716c0ad1bc0fd9f4d856eb13f0024a666d19',finding:'Declaration fact-index WeakMap cache misses a new seeAlso edge when the same caller-owned fact array is reused after an append.',reusedArrayIssues:reused,freshArrayIssues:fresh,fixApplied:false,qualification:false,nextCohort:'core admissibility',causalEvidenceFamily:'mutable declaration array cache lifetime',scientificAcceptance:false};writeFileSync(new URL('next-core-cache-probe.json',import.meta.url),JSON.stringify(receipt,null,2)+'\n');console.log({staleCacheReproduced:true,fixApplied:false});

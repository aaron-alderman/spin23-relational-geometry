import assert from 'node:assert/strict';
import {existsSync,readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-next-investigation-execution-synthesis.json','utf8'));

assert.equal(evidence.schema,'spin23.next-investigation-execution-synthesis/1');
assert.deepEqual(evidence.executedClaims,[1512,1513,1514,1515,1516,1517,1518,1519]);
assert.deepEqual(evidence.priorities.map(x=>x.rank),[1,2,3,4,5,6,7,8]);
assert.equal(evidence.priorities.filter(x=>x.status.startsWith('completed')).length,7);
assert.equal(evidence.priorities.at(-1).status,'externally-blocked');

for(const id of evidence.executedClaims){
  const prefix=`corpus/claims/1500-1599/${id}_`;
  const manifest=JSON.parse(readFileSync('corpus/registers/spin23_corpus_manifest.json','utf8'));
  // The manifest is updated only after this verifier's first working-tree run;
  // existence of the claim is checked directly below through the filesystem.
  assert.ok(Array.isArray(manifest.files));
  const found=manifest.files.some(x=>typeof x.path==='string'&&x.path.startsWith(prefix));
  if(!found){
    const {readdirSync}=await import('node:fs');
    assert.ok(readdirSync('corpus/claims/1500-1599').some(x=>x.startsWith(`${id}_`)));
  }
}

assert.deepEqual(evidence.decisiveMissingRows.map(x=>x.id),[
  'family-anchor-action','spectator-connector','loop-ward-module','correlated-likelihood'
]);
for(const row of evidence.decisiveMissingRows) assert.ok(row.requirement.length>50);

const c=evidence.centralConclusions;
assert.equal(c.minimalMaskedTreeSectorConditionallySurvives,true);
assert.equal(c.publishedPatiSalamDerivesFamilyMask,false);
assert.equal(c.genericIndependentLoopRayIsTangent,false);
assert.equal(c.formalCategoryAloneEnforcesProvenance,false);
assert.equal(c.ordinaryFieldParityEmbeddingExists,false);
assert.equal(c.generalizedPhysicalCarrierDecided,false);
assert.equal(c.currentJordanSpin23DataForceProtectedMultiplicityOne,false);

for(const path of [
  'evidence/data/spin23-minimal-pati-salam-aggregate-intertwiner-census.json',
  'evidence/data/spin23-complex-indefinite-Schur-locus.json',
  'evidence/data/spin23-one-loop-Schur-tangency-toy.json',
  'evidence/data/spin23-complete-Schur-composition-category.json',
  'evidence/data/spin23-physical-carrier-bounded-embedding-search.json',
  'evidence/data/spin23-jordan-aggregate-multiplicity-one-audit.json',
  'evidence/data/spin23-functional-Schur-loop-tangency.json'
]) assert.ok(existsSync(path),`missing ${path}`);

console.log('PASS 1520: roadmap priorities 1-7 have bounded execution results, priority 8 is externally blocked, and four decisive missing rows are explicit.');

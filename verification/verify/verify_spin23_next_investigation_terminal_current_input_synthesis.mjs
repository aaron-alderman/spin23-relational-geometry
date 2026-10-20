import assert from 'node:assert/strict';
import {existsSync,readFileSync,readdirSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-next-investigation-terminal-current-input-synthesis.json','utf8'));

assert.equal(evidence.schema,'spin23.next-investigation-terminal-current-input-synthesis/1');
assert.deepEqual(evidence.roadmapClaims,[1511,1520]);
assert.deepEqual(evidence.reopeningClaims,[1521,1522,1523,1524,1525,1526]);

for(const id of [...evidence.roadmapClaims,...evidence.reopeningClaims,1527]){
  assert.ok(readdirSync('corpus/claims/1500-1599').some(x=>x.startsWith(`${id}_`)),
    `missing claim ${id}`);
}

assert.equal(evidence.sourcedCarrierDecision.fullPhysicalAdmission,false);
assert.equal(evidence.sourcedCarrierDecision.minimalTreeRankOneConditional,true);

const p=evidence.portalRow;
assert.equal(p.ordinaryCarrierSewingSafe,false);
assert.equal(p.coefficientLineFormallyViable,true);
assert.equal(p.sourcedScalarRealizesCoefficientLine,false);
assert.equal(p.loopStabilityDerived,false);

const s=evidence.spectatorRow;
assert.equal(s.primitiveConnectorPreservesCofactor,false);
assert.equal(s.primitiveConnectorCofactor,'-d m^2');
assert.equal(s.oneIntermediateRealPairCategoricallyRepairs,true);
assert.equal(s.categoricalRepairDeterminant,'d y^2 h^2');
assert.equal(s.categoricalRepairInSourcedCarrier,false);
assert.equal(s.ordinaryCompletionCharacters,6);
assert.equal(s.ordinaryCompletionAddsAtLeastTwoRealPairs,true);

assert.equal(evidence.externalRow.officialNuFITJointElectronZeroLikelihoodAcquired,false);
assert.equal(evidence.externalRow.latestOfficialListedRelease,'NuFIT 6.1');
assert.deepEqual(evidence.completionCriterion,{
  roadmapPrioritiesBounded:true,
  missingRowsExhaustedAtSmallestLevel:true,
  survivorsRequireExplicitNewObjects:true,
  furtherRecombinationOfCurrentInputsDecisive:false
});

for(const path of [
  'evidence/data/spin23-cross-anchor-sewing-exhaustion.json',
  'evidence/data/spin23-pati-salam-spectator-connector-classification.json',
  'evidence/data/spin23-spectator-connector-minimal-repair-exhaustion.json',
  'evidence/data/spin23-nufit61-current-acquisition-audit.json',
  'evidence/data/spin23-common-coefficient-line-physical-source-audit.json',
  'evidence/data/spin23-pati-salam-graded-chain-physical-lift.json'
]) assert.ok(existsSync(path),`missing ${path}`);

console.log('PASS 1527: both missing physical rows are exhausted at the smallest level; the sourced carrier is closed and only explicit new portal-law or correspondence-module branches survive.');

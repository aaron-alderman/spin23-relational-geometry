#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const data=JSON.parse(fs.readFileSync("evidence/data/admissibility-finite-band-levinson-pole-ledger-v1.json","utf8"));
const document=fs.readFileSync("corpus/programmes/admissibility/admissibility_55_finite_band_levinson_and_adaptive_pole_collisions.md","utf8");
assert.equal(data.schema,"admissibility.finite-band-levinson-pole-ledger/1");
assert.equal(data.id,"AZ-055");
assert.equal(data.result.global.backgroundCorrection,-1);
assert.deepEqual(data.result.global.correctedStateLedgerValues,[9]);
assert.equal(data.result.global.expectedAddedStateCount,9);
assert.equal(data.result.global.lengthCensusCases,36);
assert.equal(data.result.global.lengthCensusPass,true);
assert.ok(data.result.global.integerWindingResidualMax<1e-8);
assert.ok(data.result.global.continuationResidualMax<1e-10);
for(const rail of ["trivial","topological"]){
  const result=data.result.results[rail];
  assert.ok(Math.abs(result.thresholds.lower.epsilon+result.thresholds.upper.epsilon)<1e-12);
  assert.ok(Math.abs(result.thresholds.lower.cofactorResidual)<1e-12);
  assert.ok(Math.abs(result.thresholds.upper.cofactorResidual)<1e-12);
  for(const edge of ["lower","upper"]){
    const c=result.continuation[edge];
    assert.equal(c.inside.length,11);
    assert.equal(c.outside.length,11);
    assert.ok(c.scaling.continuedDistanceExponent>0.99&&c.scaling.continuedDistanceExponent<1.01);
    assert.ok(c.scaling.boundDistanceExponent>0.99&&c.scaling.boundDistanceExponent<1.01);
    assert.ok(c.inside.every((p)=>p.imag<=0&&p.residual<1e-9&&Number.isFinite(p.wignerDelayAtPoleReal)));
    assert.ok(c.outside.every((p)=>p.residual<1e-9&&p.localizationLength>0&&Number.isFinite(p.mirroredInBandWignerDelay)));
    const inner=c.inside.at(-1),outer=c.outside.at(-1);
    assert.ok(outer.localizationLength>100);
    assert.ok(Math.abs(inner.localLevelResidue.magnitude-outer.localLevelResidue.magnitude)<5e-4);
  }
  for(const row of result.ledgers){
    assert.equal(row.boundCount+row.phase.nearestInteger-1,9);
    assert.ok(Math.abs(row.phase.integerResidual)<1e-8);
    assert.ok(row.phase.maxPhaseStep<Math.PI);
  }
}
assert.equal(data.result.lengthCensus.length,36);
assert.ok(data.result.lengthCensus.every((x)=>x.passes&&x.correctedStateLedger===x.clusterSites));
assert.equal(data.admission.adaptivePoleCollisionLocalized,true);
assert.equal(data.admission.finiteBandCorrectedLedgerEstablished,true);
assert.equal(data.admission.universalAcrossArbitraryGraphsEstablished,false);
for(const phrase of ["N_{\\rm b}+\\nu_S-1=N_C","sampling or branch-choice artifacts","OT-014 and OT-041 close positively but narrowly","does not identify that action"])assert.ok(document.includes(phrase),`missing phrase: ${phrase}`);
console.log("PASS finite-band Levinson ledger and adaptive pole collisions");

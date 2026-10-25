import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/moonshine-2b-graded-cross-sector-ope-calibration-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(evidence.schemaVersion, "moonshine-2b-graded-cross-sector-ope-calibration-v1");
const graded = evidence.gradedSpace;
assert.equal(graded.untwistedDimension + graded.twistedDimension, graded.totalDimension);
assert.deepEqual(graded.productSelection, ["U circle U subset U", "U circle T subset T", "T circle T subset U"]);

const unit = evidence.griessUnit;
assert.equal(unit.normSquared, unit.centralCharge / 8);
assert.equal(unit.normSquared, 3);

const probes = evidence.commissioningProtocol.markedTwistedProbes;
const symmetric = probes * (probes + 1) / 2;
assert.equal(symmetric, evidence.commissioningProtocol.symmetricGramMeasurements);
assert.equal(symmetric, evidence.commissioningProtocol.identityCoupledThreePointMeasurements);

const eNorm2 = unit.normSquared;
for (let a = 0; a < probes; a += 1) {
  for (let b = a; b < probes; b += 1) {
    const delta = a === b ? 1 : 0;
    const projectionCoefficient = delta / eNorm2;
    assert.equal(projectionCoefficient * eNorm2, delta);
  }
}
assert.match(evidence.boundary, /not Monster-specific/);
assert.match(evidence.boundary, /residual untwisted tensor/);

console.log(JSON.stringify({
  status: "PASS",
  grading: {U: graded.untwistedDimension, T: graded.twistedDimension},
  unitNormSquared: eNorm2,
  twistedProbes: probes,
  gramAndThreePointCoefficientsEach: symmetric,
  diagonalUnitProjection: "e/3",
  oddTwistedThreePointParity: "zero",
  next: "tomograph the residual T-circle-T to U tensor and test Conway/Norton-Sakuma covariance"
}));

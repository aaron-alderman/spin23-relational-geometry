import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-cross-frequency-stieltjes-bound-v1.json"), "utf8"));
const tolerance = 1e-12;

assert.equal(data.protocol, "admissibility-cross-frequency-stieltjes-bound/1");
assert.equal(data.target, "OT-018");
assert.deepEqual(data.coordinate.samples, [1, 2, 3]);
assert.equal(data.positiveControl.audit.positiveSemidefiniteByPrincipalMinors, true);
assert.equal(data.passiveCounterexample.positiveOnSamples, true);
assert.equal(data.passiveCounterexample.decreasingOnSampleInterval, true);
assert.equal(data.passiveCounterexample.audit.positiveSemidefiniteByPrincipalMinors, false);
assert.ok(data.passiveCounterexample.audit.twoByTwoPrincipalMinors.every(({ value }) => value < 0));
assert.equal(data.typedCorrection.equalsPositiveControlKernel, true);
assert.equal(data.typedCorrection.audit.positiveSemidefiniteByPrincipalMinors, true);
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    assert.ok(Math.abs(data.typedCorrection.correctedKernel[i][j] - data.positiveControl.kernel[i][j]) < tolerance);
  }
}
assert.equal(data.decision.crossFrequencySharedMeasureBoundEstablished, true);
assert.equal(data.decision.fullPointwisePassivitySufficientForSharedRelaxationMeasure, false);
assert.equal(data.decision.conventionalPassiveCounterexampleExists, true);
assert.equal(data.decision.novelFundamentalInequalityEstablished, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  positiveControlPsd: true,
  passiveCounterexampleTwoPointMinors: data.passiveCounterexample.audit.twoByTwoPrincipalMinors,
  typedCorrectionRestoresKernel: true,
  verdict: data.decision.topicStatus
}, null, 2));

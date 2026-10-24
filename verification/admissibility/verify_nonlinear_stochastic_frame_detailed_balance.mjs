import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/nonlinear-stochastic-frame-detailed-balance-v1.json", root), "utf8"));

assert.equal(evidence.protocol, "nonlinear-stochastic-frame-detailed-balance/1");
assert.equal(evidence.target, "OT-016");
assert.equal(evidence.parent, "AZ-101");
assert.equal(evidence.audit.samplesChecked, 16);
assert.ok(evidence.audit.maximumCorrectDetailedBalanceResidual < 1e-12);
assert.ok(evidence.audit.minimumNaiveDetailedBalanceResidual > 0.4);
assert.ok(evidence.audit.minimumDiffusionEigenvalue > 0);
assert.equal(evidence.audit.transformedDiffusionPositive, true);
assert.equal(evidence.audit.correctedDetailedBalancePassed, true);
assert.equal(evidence.audit.naivePushforwardFailsDetailedBalance, true);
assert.equal(evidence.decision.noiseInducedDriftNecessary, true);
assert.equal(evidence.decision.hydrodynamicStressWardIdentityEstablished, false);
assert.equal(evidence.decision.fullOt016Closure, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

for (const sample of evidence.samples) {
  assert.equal(sample.jacobianDeterminant, 1);
  assert.ok(sample.diffusionEigenvalues.every(value => value > 0));
  assert.ok(Math.hypot(...sample.correctCurrentOverDensity) < 1e-12);
  assert.ok(Math.abs(Math.hypot(...sample.naiveCurrentOverDensity) - evidence.audit.expectedMissingItoDriftMagnitude) < 1e-12);
}

console.log(JSON.stringify({
  result: "pass",
  samples: evidence.audit.samplesChecked,
  correctedResidual: evidence.audit.maximumCorrectDetailedBalanceResidual,
  naiveResidual: evidence.audit.minimumNaiveDetailedBalanceResidual,
  minimumDiffusionEigenvalue: evidence.audit.minimumDiffusionEigenvalue,
  boundary: "finite-dimensional nonlinear stochastic covariance closed; hydrodynamic Ward/KMS field theory remains open",
}, null, 2));

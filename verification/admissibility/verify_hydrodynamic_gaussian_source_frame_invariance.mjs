import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/hydrodynamic-gaussian-source-frame-invariance-v1.json"), "utf8"));

assert.equal(data.protocol, "hydrodynamic-gaussian-source-frame-invariance/1");
assert.equal(data.target, "OT-016");
assert.ok(Math.abs(data.frameTransformation.determinant) > 0.1);
assert.equal(data.audit.samplesChecked, 4);
assert.ok(data.audit.maximumResponseDifference < 1e-12);
assert.equal(data.audit.sourceHessianInvariant, true);
assert.ok(data.samples.every(sample => sample.maximumResponseDifference < 1e-12));
assert.equal(data.decision.quadraticSourceFunctionalConstructed, true);
assert.equal(data.decision.gaussianInternalFrameInvarianceEstablished, true);
assert.equal(data.decision.sourceResponsePolesAndResiduesInvariant, true);
assert.equal(data.decision.arbitraryHydrodynamicFrameTheoremEstablished, false);
assert.equal(data.decision.wardCompleteNonlinearGeneratingFunctionalEstablished, false);
assert.equal(data.decision.microscopicMatchingEstablished, false);
assert.equal(data.decision.fullOt016Closure, false);
assert.equal(data.decision.generatedSpin23DynamicsEstablished, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  samples: data.audit.samplesChecked,
  maximumResponseDifference: data.audit.maximumResponseDifference,
  polesAndResiduesInvariant: true,
  boundary: "Gaussian internal-frame coordinate choice closed; derivative-dependent Ward-complete frame theorem remains open"
}, null, 2));

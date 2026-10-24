import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/hydrodynamic-local-derivative-frame-invariance-v1.json"), "utf8"));

assert.equal(data.protocol, "hydrodynamic-local-derivative-frame-invariance/1");
assert.equal(data.target, "OT-016");
assert.equal(data.parent, "AZ-098");
assert.equal(data.audit.samplesChecked, 5);
assert.ok(data.audit.maximumFrameDeterminantError < 1e-12);
assert.ok(data.audit.maximumResponseDifference < 1e-12);
assert.equal(data.audit.unimodularLocalFrame, true);
assert.equal(data.audit.sourceHessianInvariant, true);
assert.ok(data.samples.every(sample => sample.maximumResponseDifference < 1e-12));
assert.ok(data.samples.every(sample => Math.hypot(sample.rightFrameDeterminant.re - 1, sample.rightFrameDeterminant.im) < 1e-12));
assert.ok(data.samples.every(sample => Math.hypot(sample.leftFrameDeterminant.re - 1, sample.leftFrameDeterminant.im) < 1e-12));
assert.equal(data.decision.localDerivativeFrameConstructed, true);
assert.equal(data.decision.polynomialInverseConstructed, true);
assert.equal(data.decision.separateMomentumLegsTyped, true);
assert.equal(data.decision.gaussianDerivativeFrameInvarianceEstablished, true);
assert.equal(data.decision.wardCompleteSchwingerKeldyshActionEstablished, false);
assert.equal(data.decision.nonlinearHydrodynamicFrameTheoremEstablished, false);
assert.equal(data.decision.microscopicMatchingEstablished, false);
assert.equal(data.decision.fullOt016Closure, false);
assert.equal(data.decision.generatedSpin23DynamicsEstablished, false);
assert.equal(data.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  samples: data.audit.samplesChecked,
  maximumResponseDifference: data.audit.maximumResponseDifference,
  maximumFrameDeterminantError: data.audit.maximumFrameDeterminantError,
  boundary: "local Gaussian derivative-frame ambiguity closed; Ward-complete nonlinear improvement/contact terms and microscopic matching remain"
}, null, 2));

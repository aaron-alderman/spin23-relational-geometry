import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const data = JSON.parse(readFileSync(resolve(root, "evidence/data/hydrodynamic-gaussian-sk-kms-completion-v1.json"), "utf8"));

assert.equal(data.protocol, "hydrodynamic-gaussian-sk-kms-completion/1");
assert.equal(data.target, "OT-016");
assert.equal(data.parent, "AZ-100");
assert.equal(data.primaryLiterature.length, 3);
assert.equal(data.audit.samplesChecked, 4);
assert.ok(data.audit.maximumAdvancedDaggerError < 1e-12);
assert.ok(data.audit.maximumNoiseHermiticityError < 1e-12);
assert.ok(data.audit.maximumFluctuationDissipationError < 1e-12);
assert.ok(data.audit.maximumSourceCovarianceDifference < 1e-12);
assert.ok(data.audit.minimumNoiseEigenvalue >= -1e-12);
assert.ok(data.audit.minimumTransformedNoiseEigenvalue >= -1e-12);
assert.equal(data.audit.gaussianSkRealityPassed, true);
assert.equal(data.audit.gaussianKmsPassed, true);
assert.equal(data.audit.noisePositivityPassed, true);
assert.equal(data.audit.doubledSourceFunctionalInvariant, true);
assert.equal(data.decision.doubledGaussianSkKernelConstructed, true);
assert.equal(data.decision.fluctuationDissipationAndNoisePositivityEstablished, true);
assert.equal(data.decision.localDerivativeFramePreservesDoubledSourceFunctional, true);
for (const field of ["nonlinearDynamicalKmsTheoremEstablished", "stressWardIdentityEstablished", "entropyCurrentEstablished", "causalStableValidityWindowEstablished", "microscopicMatchingEstablished", "fullOt016Closure", "generatedSpin23DynamicsEstablished", "newPhysicsEvidence"]) assert.equal(data.decision[field], false, field);

console.log(JSON.stringify({
  result: "pass",
  samples: data.audit.samplesChecked,
  maximumSourceCovarianceDifference: data.audit.maximumSourceCovarianceDifference,
  minimumTransformedNoiseEigenvalue: data.audit.minimumTransformedNoiseEigenvalue,
  boundary: "Gaussian doubled SK/KMS completion closed; nonlinear Ward/KMS/entropy/validity and microscopic gates remain"
}, null, 2));

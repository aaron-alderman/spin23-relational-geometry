import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/hydrodynamic-relaxation-gaussian-kms-v1.json", root), "utf8"));

assert.equal(evidence.protocol, "hydrodynamic-relaxation-gaussian-kms/1");
assert.equal(evidence.target, "OT-016");
assert.equal(evidence.parent, "AZ-103");
assert.equal(evidence.audit.samplesChecked, 10);
assert.ok(evidence.audit.maximumShearLyapunovResidual < 1e-12);
assert.ok(evidence.audit.maximumSoundLyapunovResidual < 1e-12);
assert.ok(evidence.audit.minimumStationaryCovarianceEigenvalue > 0);
assert.ok(evidence.audit.positiveShearNoiseEigenvalue > 0);
assert.ok(evidence.audit.positiveSoundNoiseEigenvalue > 0);
assert.equal(evidence.audit.stationaryCovariancePositive, true);
assert.equal(evidence.audit.noisePositiveSemidefinite, true);
assert.equal(evidence.audit.gaussianClassicalKmsPassed, true);
assert.equal(evidence.decision.auxiliaryRelaxationNoiseConstructed, true);
assert.equal(evidence.decision.exactQuantumCothKmsEstablished, false);
assert.equal(evidence.decision.nonlinearDynamicalKmsEstablished, false);
assert.equal(evidence.decision.fullOt016Closure, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  samples: evidence.audit.samplesChecked,
  maximumShearResidual: evidence.audit.maximumShearLyapunovResidual,
  maximumSoundResidual: evidence.audit.maximumSoundLyapunovResidual,
  minimumCovarianceEigenvalue: evidence.audit.minimumStationaryCovarianceEigenvalue,
  boundary: "classical Gaussian auxiliary KMS closed; quantum and nonlinear dynamical KMS plus matching remain open",
}, null, 2));

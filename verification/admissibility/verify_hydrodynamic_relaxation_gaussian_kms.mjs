import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidencePath = new URL("evidence/data/hydrodynamic-relaxation-gaussian-kms-v1.json", root);
const parentPath = new URL("evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json", root);
const evidence = JSON.parse(readFileSync(evidencePath, "utf8"));
const parentBytes = readFileSync(parentPath);
const parent = JSON.parse(parentBytes);

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = z => C(z.re, -z.im);
const diagonal = values => values.map((value, i) => values.map((_, j) => C(i === j ? value : 0)));
const multiply = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((sum, value, q) => add(sum, mul(value, b[q][j])), C(0))));
const dagger = a => a[0].map((_, j) => a.map(row => conj(row[j])));
const matrixAdd = (...matrices) => matrices.reduce((out, matrix) => out.map((row, i) => row.map((value, j) => add(value, matrix[i][j]))));
const matrixSubtract = (a, b) => a.map((row, i) => row.map((value, j) => add(value, C(-b[i][j].re, -b[i][j].im))));
const parityTransform = (matrix, signs) => matrix.map((row, i) => row.map((value, j) => C(value.re * signs[i] * signs[j], value.im * signs[i] * signs[j])));
const maxAbs = matrix => Math.max(...matrix.flat().map(z => Math.hypot(z.re, z.im)));
const assertMatrixClose = (actual, expected, tolerance = 1e-14) => {
  assert.equal(actual.length, expected.length);
  assert.equal(actual[0].length, expected[0].length);
  assert.ok(maxAbs(matrixSubtract(actual, expected)) < tolerance);
};

assert.equal(evidence.protocol, "hydrodynamic-relaxation-gaussian-kms/1");
assert.equal(evidence.target, "OT-016");
assert.equal(evidence.parent, "AZ-103");
assert.equal(evidence.parentEvidence.path, "evidence/data/hydrodynamic-causal-relaxation-wedge-v1.json");
assert.equal(evidence.parentEvidence.sha256, createHash("sha256").update(parentBytes).digest("hex"));
for (const key of ["D", "Gamma", "cs2", "tauShear", "tauSound"]) {
  assert.equal(evidence.parameters[key], parent.parameters[key]);
}
assert.deepEqual(evidence.enlargedState.timeReversalParity, { shear: [-1, 1], sound: [1, -1, 1] });

const { D, Gamma, cs2, tauShear, tauSound } = parent.parameters;
const shearCovariance = diagonal([1, D / tauShear]);
const shearNoise = diagonal([0, 2 * D / tauShear ** 2]);
const soundCovariance = diagonal([1 / cs2, 1, Gamma / tauSound]);
const soundNoise = diagonal([0, 0, 2 * Gamma / tauSound ** 2]);
const shearParity = [-1, 1];
const soundParity = [1, -1, 1];

assert.equal(evidence.samples.length, parent.samples.length);
for (const [index, parentSample] of parent.samples.entries()) {
  const sample = evidence.samples[index];
  assert.equal(sample.k, parentSample.k);
  const k = parentSample.k;
  const shearGenerator = [
    [C(0), C(0, -k)],
    [C(0, -D * k / tauShear), C(-1 / tauShear)],
  ];
  const soundGenerator = [
    [C(0), C(0, -k), C(0)],
    [C(0, -cs2 * k), C(0), C(0, -k)],
    [C(0), C(0, -Gamma * k / tauSound), C(-1 / tauSound)],
  ];
  const shearLyapunov = matrixAdd(multiply(shearGenerator, shearCovariance), multiply(shearCovariance, dagger(shearGenerator)), shearNoise);
  const soundLyapunov = matrixAdd(multiply(soundGenerator, soundCovariance), multiply(soundCovariance, dagger(soundGenerator)), soundNoise);
  const shearOnsagerCasimir = matrixSubtract(multiply(shearGenerator, shearCovariance), parityTransform(multiply(shearCovariance, dagger(shearGenerator)), shearParity));
  const soundOnsagerCasimir = matrixSubtract(multiply(soundGenerator, soundCovariance), parityTransform(multiply(soundCovariance, dagger(soundGenerator)), soundParity));

  assertMatrixClose(sample.shearGenerator, shearGenerator);
  assertMatrixClose(sample.shearStationaryCovariance, shearCovariance);
  assertMatrixClose(sample.shearNoise, shearNoise);
  assertMatrixClose(sample.soundGenerator, soundGenerator);
  assertMatrixClose(sample.soundStationaryCovariance, soundCovariance);
  assertMatrixClose(sample.soundNoise, soundNoise);
  assert.ok(Math.abs(sample.shearLyapunovResidual - maxAbs(shearLyapunov)) < 1e-14);
  assert.ok(Math.abs(sample.soundLyapunovResidual - maxAbs(soundLyapunov)) < 1e-14);
  assert.ok(Math.abs(sample.shearOnsagerCasimirResidual - maxAbs(shearOnsagerCasimir)) < 1e-14);
  assert.ok(Math.abs(sample.soundOnsagerCasimirResidual - maxAbs(soundOnsagerCasimir)) < 1e-14);
}

assert.equal(evidence.audit.samplesChecked, parent.samples.length);
assert.ok(evidence.audit.maximumShearLyapunovResidual < 1e-12);
assert.ok(evidence.audit.maximumSoundLyapunovResidual < 1e-12);
assert.ok(evidence.audit.maximumShearOnsagerCasimirResidual < 1e-12);
assert.ok(evidence.audit.maximumSoundOnsagerCasimirResidual < 1e-12);
assert.ok(evidence.audit.minimumStationaryCovarianceEigenvalue > 0);
assert.ok(evidence.audit.positiveShearNoiseEigenvalue > 0);
assert.ok(evidence.audit.positiveSoundNoiseEigenvalue > 0);
assert.equal(evidence.audit.stationaryCovariancePositive, true);
assert.equal(evidence.audit.noisePositiveSemidefinite, true);
assert.equal(evidence.audit.onsagerCasimirPassed, true);
assert.equal(evidence.audit.stationaryGaussianFdtPassed, true);
assert.equal(evidence.decision.auxiliaryRelaxationNoiseConstructed, true);
assert.equal(evidence.decision.exactQuantumCothKmsEstablished, false);
assert.equal(evidence.decision.nonlinearDynamicalKmsEstablished, false);
assert.equal(evidence.decision.fullOt016Closure, false);
assert.equal(evidence.decision.newPhysicsEvidence, false);

console.log(JSON.stringify({
  result: "pass",
  samples: evidence.audit.samplesChecked,
  maximumShearLyapunovResidual: evidence.audit.maximumShearLyapunovResidual,
  maximumSoundLyapunovResidual: evidence.audit.maximumSoundLyapunovResidual,
  maximumShearOnsagerCasimirResidual: evidence.audit.maximumShearOnsagerCasimirResidual,
  maximumSoundOnsagerCasimirResidual: evidence.audit.maximumSoundOnsagerCasimirResidual,
  minimumCovarianceEigenvalue: evidence.audit.minimumStationaryCovarianceEigenvalue,
  boundary: "classical stationary Gaussian FDT and Onsager-Casimir compatibility closed; exact quantum and nonlinear dynamical KMS plus matching remain open",
}, null, 2));

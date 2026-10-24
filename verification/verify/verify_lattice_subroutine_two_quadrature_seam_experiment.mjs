import assert from "node:assert/strict";

const multiply = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const conjugate = ([real, imaginary]) => [real, -imaginary];
const scale = (scalar, [real, imaginary]) => [scalar * real, scalar * imaginary];
const magnitudeSquared = ([real, imaginary]) => real * real + imaginary * imaginary;

const coefficient = [0.8, -0.3];
const reference = [1.2, 0.4];
const seamAmplitude = (radius, phase) =>
  multiply(coefficient, [radius * Math.cos(phase), radius * Math.sin(phase)]);
const homodyne = (amplitude) => 2 * multiply(conjugate(reference), amplitude)[0];

const samples = [];
for (const radius of [0.01, 0.02, 0.05, 0.1]) {
  for (const phase of [0, Math.PI / 2, Math.PI, 3 * Math.PI / 2]) {
    const plus = seamAmplitude(radius, phase);
    const minus = scale(-1, plus);
    const odd = (homodyne(plus) - homodyne(minus)) / 2;
    const plusPower = magnitudeSquared(plus);
    const minusPower = magnitudeSquared(minus);
    assert.ok(Math.abs(plusPower - minusPower) < 1e-15);
    assert.ok(Math.abs(homodyne(plus) + homodyne(minus)) < 1e-15);
    samples.push({ radius, phase, odd, power: plusPower });
  }
}

const phaseZero = samples.filter((sample) => sample.phase === 0);
for (let i = 1; i < phaseZero.length; i += 1) {
  const radiusRatio = phaseZero[i].radius / phaseZero[0].radius;
  const oddRatio = phaseZero[i].odd / phaseZero[0].odd;
  const powerRatio = phaseZero[i].power / phaseZero[0].power;
  assert.ok(Math.abs(oddRatio - radiusRatio) < 1e-12);
  assert.ok(Math.abs(powerRatio - radiusRatio ** 2) < 1e-12);
}

console.log(JSON.stringify({
  model: "Aseam=c*epsilon with coherent reference",
  sampleCount: samples.length,
  reversal: {
    oddHomodyne: "changes sign",
    seamPower: "unchanged"
  },
  smallAmplitudeScaling: {
    oddChannelExponent: 1,
    evenPowerExponent: 2
  },
  conclusion: "The proposed run matrix separates a coherent orientation-odd seam record from the phase-blind squared control."
}, null, 2));
console.log("PASS verify_lattice_subroutine_two_quadrature_seam_experiment");

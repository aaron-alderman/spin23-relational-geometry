import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/lattice-subroutine-two-resonator-transfer-preflight-v1.json", import.meta.url),
  "utf8"
));
const p = evidence.nominalParameters;

const add = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
const subtract = ([ar, ai], [br, bi]) => [ar - br, ai - bi];
const multiply = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const conjugate = ([real, imaginary]) => [real, -imaginary];
const divide = (a, b) => {
  const denominator = b[0] ** 2 + b[1] ** 2;
  const numerator = multiply(a, conjugate(b));
  return [numerator[0] / denominator, numerator[1] / denominator];
};
const scale = (factor, [real, imaginary]) => [factor * real, factor * imaginary];
const magnitudeSquared = ([real, imaginary]) => real ** 2 + imaginary ** 2;
const polar = (radius, phase) => [radius * Math.cos(phase), radius * Math.sin(phase)];

const d1 = [p.kappa1 / 2, -p.detuning1];
const d2 = [p.kappa2 / 2, -p.detuning2];
const portFactor = Math.sqrt(p.externalKappa1 * p.externalKappa2);
const feedthrough = polar(p.feedthroughMagnitude, p.feedthroughPhase);
const reference = polar(p.referenceMagnitude, p.referencePhase);

const transfer = (epsilon) => {
  const epsilonSquared = magnitudeSquared(epsilon);
  const denominator = add(multiply(d1, d2), [epsilonSquared, 0]);
  const numerator = scale(portFactor, [epsilon[1], -epsilon[0]]);
  return divide(numerator, denominator);
};
const homodyne = (amplitude) => 2 * multiply(conjugate(reference), amplitude)[0];

const logSlope = (points) => {
  const xs = points.map(([x]) => Math.log(x));
  const ys = points.map(([, y]) => Math.log(Math.abs(y)));
  const meanX = xs.reduce((a, b) => a + b, 0) / xs.length;
  const meanY = ys.reduce((a, b) => a + b, 0) / ys.length;
  const covariance = xs.reduce((sum, x, i) => sum + (x - meanX) * (ys[i] - meanY), 0);
  const variance = xs.reduce((sum, x) => sum + (x - meanX) ** 2, 0);
  return covariance / variance;
};

let maximumOddnessError = 0;
let maximumCorrectedPowerError = 0;
let maximumRawPowerDifference = 0;
const scalingPoints = [];

for (const radius of p.couplingRadii) {
  for (const phase of p.couplingPhases) {
    const epsilon = polar(radius, phase);
    const plus = transfer(epsilon);
    const minus = transfer(scale(-1, epsilon));
    maximumOddnessError = Math.max(
      maximumOddnessError,
      Math.hypot(plus[0] + minus[0], plus[1] + minus[1])
    );
    maximumCorrectedPowerError = Math.max(
      maximumCorrectedPowerError,
      Math.abs(magnitudeSquared(plus) - magnitudeSquared(minus))
    );
    const rawPlus = add(feedthrough, plus);
    const rawMinus = add(feedthrough, minus);
    maximumRawPowerDifference = Math.max(
      maximumRawPowerDifference,
      Math.abs(magnitudeSquared(rawPlus) - magnitudeSquared(rawMinus))
    );
    if (phase === 0) {
      scalingPoints.push([radius, homodyne(plus), magnitudeSquared(plus)]);
    }
  }
}

assert.ok(maximumOddnessError < 1e-14);
assert.ok(maximumCorrectedPowerError < 1e-14);
assert.ok(maximumRawPowerDifference > 1e-5);

const amplitudeSlope = logSlope(scalingPoints.slice(0, 4).map(([r, odd]) => [r, odd]));
const powerSlope = logSlope(scalingPoints.slice(0, 4).map(([r, , power]) => [r, power]));
assert.ok(Math.abs(amplitudeSlope - 1) < 0.01);
assert.ok(Math.abs(powerSlope - 2) < 0.02);

console.log(JSON.stringify({
  maximumOddnessError,
  maximumCorrectedPowerError,
  maximumRawPowerDifference,
  fittedSmallCouplingSlopes: {
    oddHomodyne: amplitudeSlope,
    correctedPower: powerSlope
  },
  conclusion: "Complex baseline subtraction removes the feedthrough-induced false odd-power channel while retaining the genuine odd seam amplitude."
}, null, 2));
console.log("PASS verify_lattice_subroutine_two_resonator_transfer_preflight");

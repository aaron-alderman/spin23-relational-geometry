import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/lattice-subroutine-modular-sign-detector-reassignment-v1.json", import.meta.url),
  "utf8"
));

const { edgeMagnitude: g, linewidth: kappa, probeFrequency: omega } = evidence.threeModeModel;
const add = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
const subtract = ([ar, ai], [br, bi]) => [ar - br, ai - bi];
const multiply = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const conjugate = ([r, i]) => [r, -i];
const magnitudeSquared = ([r, i]) => r * r + i * i;
const divide = (a, b) => {
  const denominator = magnitudeSquared(b);
  const numerator = multiply(a, conjugate(b));
  return [numerator[0] / denominator, numerator[1] / denominator];
};

const invert = (matrix) => {
  const n = matrix.length;
  const augmented = matrix.map((row, i) => row.map((z) => [...z]).concat(
    Array.from({ length: n }, (_, j) => [Number(i === j), 0])
  ));
  for (let column = 0; column < n; column += 1) {
    let pivot = column;
    while (pivot < n && magnitudeSquared(augmented[pivot][column]) < 1e-20) pivot += 1;
    assert.ok(pivot < n);
    [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
    const pivotValue = augmented[column][column];
    augmented[column] = augmented[column].map((z) => divide(z, pivotValue));
    for (let row = 0; row < n; row += 1) {
      if (row === column) continue;
      const factor = augmented[row][column];
      augmented[row] = augmented[row].map((z, j) => subtract(z, multiply(factor, augmented[column][j])));
    }
  }
  return augmented.map((row) => row.slice(n));
};

const resolvent = (sigma) => {
  const signed = sigma * g;
  const H = [
    [[0, 0], [signed, 0], [g, 0]],
    [[signed, 0], [0, 0], [g, 0]],
    [[g, 0], [g, 0], [0, 0]]
  ];
  const z = [omega, kappa / 2];
  return invert(H.map((row, i) => row.map((entry, j) =>
    i === j ? subtract(z, entry) : [-entry[0], -entry[1]])));
};

const ringRecords = evidence.sourceDatum.values.map((sigma) => {
  const G = resolvent(sigma);
  const complexOdd = subtract(G[1][0], G[0][1]);
  const powerOdd = magnitudeSquared(G[1][0]) - magnitudeSquared(G[0][1]);
  assert.ok(magnitudeSquared(complexOdd) < 1e-24);
  assert.ok(Math.abs(powerOdd) < 1e-12);
  return {
    sigma,
    flux: sigma === 1 ? 0 : Math.PI,
    determinantInvariant: 2 * g ** 3 * sigma,
    complexDirectionalOddNormSquared: magnitudeSquared(complexOdd),
    powerDirectionalOdd: powerOdd
  };
});
assert.notEqual(ringRecords[0].determinantInvariant, ringRecords[1].determinantInvariant);

const reference = [1.2, 0.4];
const seam = [0.35, -0.15];
const amplitude = (sigma, withReference = true) => add(withReference ? reference : [0, 0], [sigma * seam[0], sigma * seam[1]]);
const referencedDifference = magnitudeSquared(amplitude(1)) - magnitudeSquared(amplitude(-1));
const predictedDifference = 4 * multiply(conjugate(reference), seam)[0];
const referenceOffDifference = magnitudeSquared(amplitude(1, false)) - magnitudeSquared(amplitude(-1, false));
assert.ok(Math.abs(referencedDifference - predictedDifference) < 1e-12);
assert.ok(Math.abs(referencedDifference) > 1e-6);
assert.ok(Math.abs(referenceOffDifference) < 1e-12);

console.log(JSON.stringify({
  sourceCharacter: "Z2",
  ringRecords,
  referencedInterference: { measuredDifference: referencedDifference, predictedDifference, referenceOffDifference },
  conclusion: "The modular sign selects binary spectral parity or referenced interference; it does not source orientation-odd three-mode transfer."
}, null, 2));
console.log("PASS verify_lattice_subroutine_modular_sign_detector_reassignment");

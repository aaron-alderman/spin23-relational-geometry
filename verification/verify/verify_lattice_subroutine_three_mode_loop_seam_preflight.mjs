import assert from "node:assert/strict";
import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/lattice-subroutine-three-mode-loop-seam-preflight-v1.json", import.meta.url),
  "utf8"
));
const { edgeMagnitude: g, linewidth: kappa, probeFrequency: omega } = evidence.model;

const add = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
const subtract = ([ar, ai], [br, bi]) => [ar - br, ai - bi];
const multiply = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const divide = (a, b) => {
  const denominator = b[0] ** 2 + b[1] ** 2;
  const numerator = multiply(a, [b[0], -b[1]]);
  return [numerator[0] / denominator, numerator[1] / denominator];
};
const magnitudeSquared = ([real, imaginary]) => real ** 2 + imaginary ** 2;
const polar = (radius, phase) => [radius * Math.cos(phase), radius * Math.sin(phase)];
const negate = ([real, imaginary]) => [-real, -imaginary];
const conjugate = ([real, imaginary]) => [real, -imaginary];

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
      augmented[row] = augmented[row].map((z, j) =>
        subtract(z, multiply(factor, augmented[column][j])));
    }
  }
  return augmented.map((row) => row.slice(n));
};

const hamiltonian = ([phi12, phi23, phi31]) => {
  const e12 = polar(g, phi12);
  const e23 = polar(g, phi23);
  const e31 = polar(g, phi31);
  return [
    [[0, 0], e12, conjugate(e31)],
    [conjugate(e12), [0, 0], e23],
    [e31, conjugate(e23), [0, 0]]
  ];
};

const resolvent = (phases) => {
  const H = hamiltonian(phases);
  const z = [omega, kappa / 2];
  return invert(H.map((row, i) => row.map((entry, j) =>
    i === j ? subtract(z, entry) : negate(entry))));
};

const determinantInvariant = (flux) => 2 * g ** 3 * Math.cos(flux);
for (const flux of evidence.model.fluxes) {
  assert.ok(Math.abs(determinantInvariant(flux) - determinantInvariant(-flux)) < 1e-14);
}

const distributions = (flux) => [
  [flux, 0, 0],
  [0, flux, 0],
  [0, 0, flux],
  [flux / 3, flux / 3, flux / 3]
];

const directionalRecords = [];
for (const flux of evidence.model.fluxes) {
  const records = distributions(flux).map((phases) => {
    const G = resolvent(phases);
    return magnitudeSquared(G[1][0]) - magnitudeSquared(G[0][1]);
  });
  const spread = Math.max(...records) - Math.min(...records);
  assert.ok(spread < 1e-12);
  directionalRecords.push({ flux, directionalPowerDifference: records[0] });
}

const plus = directionalRecords.find((record) => record.flux === Math.PI / 2);
const minus = directionalRecords.find((record) => record.flux === -Math.PI / 2);
const zero = directionalRecords.find((record) => record.flux === 0);
const pi = directionalRecords.find((record) => record.flux === Math.PI);
assert.ok(Math.abs(plus.directionalPowerDifference + minus.directionalPowerDifference) < 1e-12);
assert.ok(Math.abs(plus.directionalPowerDifference) > 1e-6);
assert.ok(Math.abs(zero.directionalPowerDifference) < 1e-12);
assert.ok(Math.abs(pi.directionalPowerDifference) < 1e-12);

console.log(JSON.stringify({
  determinantFluxParity: "even",
  spectraAtPlusMinusFlux: "identical by characteristic invariants",
  directionalRecords,
  phaseRedistributionInvariant: true,
  conclusion: "The three-mode loop supplies intrinsic flux; spectra forget its orientation while directional coherent transfer retains it."
}, null, 2));
console.log("PASS verify_lattice_subroutine_three_mode_loop_seam_preflight");

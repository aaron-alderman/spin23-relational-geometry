#!/usr/bin/env node
import path from "node:path";
import {execFileSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const analyzer = JSON.parse(execFileSync(process.execPath, [
  path.join(here, "analyze-leech-pareto-transformers.mjs"), "--full"
], {encoding: "utf8"}));
const G = analyzer.results.find(({id}) => id === "gram-first").gram.map((row) => row.map(BigInt));
const n = G.length;

const gcd = (a, b) => {
  a = a < 0n ? -a : a;
  b = b < 0n ? -b : b;
  while (b !== 0n) [a, b] = [b, a % b];
  return a;
};
const rational = (numerator, denominator = 1n) => {
  if (denominator < 0n) { numerator = -numerator; denominator = -denominator; }
  const divisor = gcd(numerator, denominator);
  return {numerator: numerator / divisor, denominator: denominator / divisor};
};
const subtract = (a, b) => rational(
  a.numerator * b.denominator - b.numerator * a.denominator,
  a.denominator * b.denominator
);
const multiply = (a, b) => rational(a.numerator * b.numerator, a.denominator * b.denominator);
const divide = (a, b) => rational(a.numerator * b.denominator, a.denominator * b.numerator);
const text = (a) => a.denominator === 1n ? a.numerator.toString()
  : `${a.numerator}/${a.denominator}`;
const number = (a) => Number(a.numerator) / Number(a.denominator);

const augmented = G.map((row, i) => [
  ...row.map((value) => rational(value)),
  ...Array.from({length: n}, (_, j) => rational(i === j ? 1n : 0n))
]);
for (let column = 0; column < n; column += 1) {
  const pivot = augmented.findIndex((row, index) =>
    index >= column && row[column].numerator !== 0n);
  if (pivot < 0) throw new Error("singular Gram matrix");
  [augmented[column], augmented[pivot]] = [augmented[pivot], augmented[column]];
  const pivotValue = augmented[column][column];
  augmented[column] = augmented[column].map((value) => divide(value, pivotValue));
  for (let row = 0; row < n; row += 1) if (row !== column) {
    const factor = augmented[row][column];
    augmented[row] = augmented[row].map((value, index) =>
      subtract(value, multiply(factor, augmented[column][index])));
  }
}
const inverse = augmented.map((row) => row.slice(n));
if (!inverse.flat().every((value) => value.denominator === 1n)) {
  throw new Error("unimodular inverse was not integral");
}
const inverseDiagonal = inverse.map((row, index) => row[index]);
const effectiveMasses = inverseDiagonal.map((value) => rational(value.denominator, value.numerator));
const minimumEffectiveMass = effectiveMasses.reduce((best, value) =>
  number(value) < number(best) ? value : best);
const minimumCoordinates = effectiveMasses.map((value, index) => ({value, index}))
  .filter(({value}) => value.numerator * minimumEffectiveMass.denominator
    === minimumEffectiveMass.numerator * value.denominator).map(({index}) => index + 1);
const diagonalMasses = G.map((row, index) => Number(row[index]));

const ratios = [0.0001, 0.001, 0.01];
const scans = ratios.map((ratio) => {
  const lowerAction = 8 * Math.sqrt(number(minimumEffectiveMass) / ratio);
  const straightCoordinateActions = diagonalMasses.map((mass) => 8 * Math.sqrt(mass / ratio));
  return {
    chargingToCosineRatio: ratio,
    rigorousActionFloorForAnyPrimitiveCoordinateWinding: lowerAction,
    semiclassicalExponentialCeilingIgnoringPrefactor: Math.exp(-lowerAction),
    smallestStraightCoordinateTrialAction: Math.min(...straightCoordinateActions),
    actionBracketRatio: Math.min(...straightCoordinateActions) / lowerAction
  };
});

console.log(JSON.stringify({
  schemaVersion: "leech-compact-winding-bound-run-v1",
  inverseIntegral: true,
  inverseDiagonal: inverseDiagonal.map(text),
  effectiveSchurMasses: effectiveMasses.map(text),
  minimumEffectiveSchurMass: text(minimumEffectiveMass),
  minimumCoordinates,
  gramDiagonal: diagonalMasses,
  theorem: "for fixed dot(theta_i), min over other velocities dot(theta)^T G dot(theta)=dot(theta_i)^2/(G^-1)_ii",
  actionBound: "S_winding_i >= 8 sqrt(g_eff_i u/U), g_eff_i=1/(G^-1)_ii",
  straightPath: "S_straight_i=8 sqrt(G_ii u/U)",
  scans
}, null, 2));

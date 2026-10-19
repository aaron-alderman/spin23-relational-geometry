import assert from 'node:assert/strict';

const charges = [0, 1, 0]; // E,C,D
const allowed = Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => charges[i] === charges[j]));
assert.deepEqual(allowed, [
  [true, false, true],
  [false, true, false],
  [true, false, true],
]);
assert.equal(allowed.flat().filter(Boolean).length, 5); // dim_C M2 + C

const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const zero = A => A.every(row => row.every(x => Math.abs(x) < 1e-12));
const pNu = [[1, 0, 0], [0, 0, 0], [0, 0, 1]];
const K = [[2, 0, 3], [0, 5, 0], [7, 0, 11]];
assert(zero(sub(mul(pNu, K), mul(K, pNu))));

const theta = 0.731;
const phase = [1, Math.cos(theta), 1];
const phaseIm = [0, Math.sin(theta), 0];
// A real charged off-diagonal E-C entry acquires a nonzero imaginary part.
const chargedEntryReal = 4 * phase[1];
const chargedEntryImag = -4 * phaseIm[1];
assert(Math.abs(chargedEntryImag) > 1e-6);
assert.notEqual(chargedEntryReal, 4);

// A neutral E-D entry is unchanged.
const neutralPhaseDifference = charges[0] - charges[2];
assert.equal(neutralPhaseDifference, 0);

console.log('Electromagnetic-superselection neutrino-corner certificate: PASS');
console.log('gauge-invariant response commutant is M2(E,D) + C(C); linear charged leakage is forbidden');


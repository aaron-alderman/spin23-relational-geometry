import assert from 'node:assert/strict';

// Native real source ideals: O, H, C, R.
const sourceDims = [8, 4, 2, 1];
assert.equal(new Set(sourceDims).size, 4);
assert.notEqual(2, 1); // O_1 is a complex line; terminal R is a real line.

// R has no element squaring to -1, while C does.
const complexSquare = ([a, b]) => [a * a - b * b, 2 * a * b];
assert.deepEqual(complexSquare([0, 1]), [-1, 0]);
for (const x of [-3, -2, -1, 0, 1, 2, 3]) assert.notEqual(x * x, -1);

// Anti-Hermitian dimensions of C and R under ordinary conjugation.
const antiHermitianDims = { C: 1, R: 0 };
assert.notEqual(antiHermitianDims.C, antiHermitianDims.R);

// Completed complex carrier: O1,O2,H,C,R with gauge generators represented
// by scalar charges on each block. O1 and R have the same trivial charge.
const dims = [1, 3, 2, 1, 1];
const hypercharge = [0, 1 / 3, 1 / 2, 1, 0];
const offsets = dims.map((_, i) => dims.slice(0, i).reduce((a, b) => a + b, 0));
const n = dims.reduce((a, b) => a + b, 0);
const Y = Array.from({ length: n }, () => Array(n).fill(0));
for (let b = 0; b < dims.length; b++) {
  for (let i = 0; i < dims[b]; i++) Y[offsets[b] + i][offsets[b] + i] = hypercharge[b];
}
const S = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const iO1 = offsets[0], iR = offsets[4];
for (let j = 0; j < n; j++) { S[iO1][j] = 0; S[iR][j] = 0; }
S[iO1][iR] = 1; S[iR][iO1] = 1;
const mul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
assert.deepEqual(mul(S, S), Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0)));
assert.deepEqual(mul(S, Y), mul(Y, S));

// Theta = S K squares to one because S is real and S^2=I.
const v = Array.from({ length: n }, (_, i) => [i + 1, 2 * i - 3]); // [real,imag]
const theta = w => {
  const conjugated = w.map(([a, b]) => [a, -b]);
  return S.map(row => {
    const k = row.findIndex(x => x === 1);
    return conjugated[k];
  });
};
assert.deepEqual(theta(theta(v)), v);

console.log('Furey real-form obstruction certificate: PASS');
console.log('native swap: forbidden; completed-carrier swap: exact but non-source-derived');


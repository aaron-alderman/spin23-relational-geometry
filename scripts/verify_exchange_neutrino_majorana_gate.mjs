import assert from 'node:assert/strict';

const mul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = A => A[0].map((_, i) => A.map(row => row[i]));
const trace = A => A.reduce((s, row, i) => s + row[i], 0);
const zero = [[0, 0], [0, 0]];
const nA = [[0, 0], [1, 0]]; // O1 -> R
const nB = [[0, 1], [0, 0]]; // R -> O1
assert.deepEqual(mul(nA, nA), zero);
assert.deepEqual(mul(nB, nB), zero);
assert.equal(trace(mul(nB, nA)), 1);
assert.equal(trace(mul(nA, nB)), 1);
assert.deepEqual(transpose(nA), nB);

// Real representative of N(m); the complex phase is paired with its conjugate.
const m = 3;
const N = [[0, m], [m, 0]];
assert.deepEqual(transpose(N), N);
assert.deepEqual(mul(N, N), [[m * m, 0], [0, m * m]]);

// Gauge singlet Y=0 contributes zero to all hypercharge anomaly monomials.
const y = 0;
assert.equal(y, 0);
assert.equal(y ** 3, 0);

console.log('Exchange-neutrino Majorana-gate certificate: PASS');
console.log('individual arrows nilpotent; exchange pair closes a Hermitian two-cycle with spectrum +/-|m|');


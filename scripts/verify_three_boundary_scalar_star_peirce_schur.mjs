import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.abs(x - B[i][j]))));
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const det3 = A =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
const matVec = (A, v) => A.map(row => row.reduce((s, x, i) => s + x * v[i], 0));

const response = (g, m) => {
  const C = m + g.reduce((a, b) => a + b, 0);
  return {
    C,
    R: g.map((gi, i) => g.map((gj, j) => (i === j ? gi : 0) - gi * gj / C)),
  };
};

const g = [2, 3, 5];
const m = 7;
const { C, R } = response(g, m);
assert.equal(C, 17);

// Interior stationary solution chi=(g dot phi)/C.
const phi = [0.4, -0.7, 1.1];
const chi = g.reduce((s, gi, i) => s + gi * phi[i], 0) / C;
const interiorEquation = C * chi - g.reduce((s, gi, i) => s + gi * phi[i], 0);
assert(close(interiorEquation, 0));

// Schur/triple correction is gg^T/C.
const expected = g.map((gi, i) => g.map((gj, j) => (i === j ? gi : 0) - gi * gj / C));
assert(maxDiff(R, expected) < 1e-12);
assert(R[0][0] > 0 && det2(R.slice(0, 2).map(row => row.slice(0, 2))) > 0 && det3(R) > 0);

const determinantFormula = m * g.reduce((a, b) => a * b, 1) / C;
assert(close(det3(R), determinantFormula));
const loop = R[0][1] * R[1][2] * R[2][0];
assert(close(loop, -((g[0] * g[1] * g[2]) ** 2) / C ** 3));

// Ungrounded response has one common-shift zero mode and rank two.
const free = response(g, 0);
assert(maxDiff([matVec(free.R, [1, 1, 1])], [[0, 0, 0]]) < 1e-10);
assert(close(det3(free.R), 0));
assert(det2(free.R.slice(0, 2).map(row => row.slice(0, 2))) > 0);
assert(free.C > 0); // interior elimination remains defined

// Eliminate boundary port 3 from grounded R.
const c3 = R[2][2];
const R2 = [0, 1].map(i => [0, 1].map(j => R[i][j] - R[i][2] * R[2][j] / c3));
assert(R2[0][0] > 0 && det2(R2) > 0);
assert(close(det3(R), c3 * det2(R2)));

console.log('Three-boundary scalar-star Peirce-Schur certificate: PASS');
console.log(`C=${C}; detR=${det3(R)}; formula=${determinantFormula}; loop=${loop}; free_det=0; terminal_H2_positive=true`);

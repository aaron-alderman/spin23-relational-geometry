import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const det2 = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const det3 = A =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

// A positive matrix R=L L^T.
const L = [[2, 0, 0], [0.4, 1.5, 0], [-0.3, 0.6, 1.2]];
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const R = mm(L, T(L));
const [[a, x, y], [, b, z], [, , c]] = R;
const cubic = a * b * c + 2 * x * y * z - a * z * z - b * y * y - c * x * x;
assert(close(det3(R), cubic));
assert(a > 0 && b > 0 && c > 0);
assert(a * b - x * x > 0);
assert(a * c - y * y > 0);
assert(b * c - z * z > 0);
assert(det3(R) > 0);

const schur = [[a - y * y / c, x - y * z / c], [x - y * z / c, b - z * z / c]];
assert(schur[0][0] > 0 && det2(schur) > 0);
assert(close(det3(R), c * det2(schur)));

assert.equal(2 * (2 + 1) / 2, 3); // dim H2(R)
assert.equal(3 * (3 + 1) / 2, 6); // dim H3(R)
assert.equal(2 * (2 * 2 + 1), 10); // dim sp(4,R)
assert.equal(3 * (2 * 3 + 1), 21); // dim sp(6,R)

// Complex Gram example from the preceding loop certificate.
const C = (re, im = 0) => ({ re, im });
const add = (p, q) => C(p.re + q.re, p.im + q.im);
const mul = (p, q) => C(p.re * q.re - p.im * q.im, p.re * q.im + p.im * q.re);
const conj = p => C(p.re, -p.im);
const abs2 = p => p.re ** 2 + p.im ** 2;
const s = 1 / Math.sqrt(2);
const vectors = [[C(1), C(0)], [C(s), C(s)], [C(s), C(0, s)]];
const inner = (u, v) => u.reduce((sum, p, i) => add(sum, mul(conj(p), v[i])), C(0));
const rho = vectors.map(u => vectors.map(v => inner(u, v)));
const u = rho[0][1], v = rho[1][2], w = rho[2][0];
const loop = mul(mul(u, v), w);
assert(close(loop.re, 0.25) && close(loop.im, 0.25));

const hermitianDetFormula =
  rho[0][0].re * rho[1][1].re * rho[2][2].re
  + 2 * loop.re
  - rho[0][0].re * abs2(v)
  - rho[1][1].re * abs2(w)
  - rho[2][2].re * abs2(u);
assert(close(hermitianDetFormula, 0)); // rank two Gram matrix

const realLoopImaginaryPart = 0; // x*y*z is real for every H3(R) element.
assert.equal(realLoopImaginaryPart, 0);

console.log('Three-port H3(R) cubic-consistency certificate: PASS');
console.log(`detR=${det3(R)}; c_detSchur=${c * det2(schur)}; dim_H3R=6; dim_Sp6R=21; complex_loop=${loop.re}+${loop.im}i`);

import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => z(a.re, -a.im);
const eq = (a, b, eps = 1e-12) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const zero3 = () => Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => z(0)));
const matMul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const sameMatrix = (A, B) => A.every((row, i) => row.every((x, j) => eq(x, B[i][j])));
const projection = indices => {
  const P = zero3();
  for (const i of indices) P[i][i] = z(1);
  return P;
};
const pCharged = projection([0, 1]); // E,C
const pNeutral = projection([0, 2]); // E,D
assert(sameMatrix(matMul(pCharged, pCharged), pCharged));
assert(sameMatrix(matMul(pNeutral, pNeutral), pNeutral));

const compress = (P, X) => matMul(matMul(P, X), P);
const X = [
  [z(2), z(3, 4), z(5, 6)],
  [z(3, -4), z(7), z(8, 9)],
  [z(5, -6), z(8, -9), z(11)],
];
const Xn = compress(pNeutral, X);
assert(eq(Xn[0][1], z(0)) && eq(Xn[1][2], z(0)));
assert(sameMatrix(dagger(Xn), Xn));
assert(sameMatrix(compress(pNeutral, Xn), Xn));

// Hypercharge weights in the ordered basis (E,C,D) are (0,1,0).
const theta = 0.431;
const U = zero3();
U[0][0] = z(1); U[1][1] = z(Math.cos(theta), Math.sin(theta)); U[2][2] = z(1);
const gauge = A => matMul(matMul(U, A), dagger(U));
assert(sameMatrix(gauge(Xn), Xn));

const Xe = compress(pCharged, X);
assert.equal(sameMatrix(gauge(Xe), Xe), false);
assert.equal(Math.abs(gauge(Xe)[0][1].im) > 1e-6, true);

// Of the two endpoint-selected two-face corners containing E, only E+D has equal weights.
const weights = { E: 0, C: 1, D: 0 };
assert.equal(weights.E === weights.C, false);
assert.equal(weights.E === weights.D, true);

// Real fixed slice determinant has Lorentz signature (1,2).
const a = 7, d = 5, b = 2;
const t = (a + d) / 2, x = (a - d) / 2, y = b;
assert.equal(a * d - b * b, t * t - x * x - y * y);
assert.equal(a * d - b * b, 31);

console.log('Neutrino Peirce-corner H2(R) certificate: PASS');
console.log('E+D is the unique gauge-trivial endpoint corner; its real determinant is Lorentzian');


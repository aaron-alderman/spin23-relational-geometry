import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const neg = a => z(-a.re, -a.im);
const conj = a => z(a.re, -a.im);
const eq = (a, b) => a.re === b.re && a.im === b.im;
const matMul = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const matSub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const matConj = A => A.map(row => row.map(conj));
const det3 = A => add(sub(
  mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))),
  mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))
), mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))));

const Hu = [[z(1),z(0),z(0)],[z(0),z(4),z(0)],[z(0),z(0),z(16)]];
const Hd = [[z(3),z(1),z(0,-1)],[z(1),z(3),z(1)],[z(0,1),z(1),z(3)]];

// Sylvester criterion for Hd: its leading principal minors are positive.
const minors = [3, 3 * 3 - 1, det3(Hd).re];
assert.deepEqual(minors, [3, 8, 18]);
assert.equal(det3(Hd).im, 0);

const comm = (A, B) => matSub(matMul(A, B), matMul(B, A));
const dA = det3(comm(Hu, Hd));
assert(eq(dA, z(0, 1080)));

const dB = det3(comm(matConj(Hu), matConj(Hd)));
assert(eq(dB, conj(dA)));
assert(eq(dB, z(0, -1080)));
assert.equal(dA.im + dB.im, 0);
assert.equal(dA.im - dB.im, 2160);

console.log('Exchange-paired Yukawa CP certificate: PASS');
console.log('J_A = 1080, J_B = -1080, unoriented sum = 0, oriented difference = 2160');


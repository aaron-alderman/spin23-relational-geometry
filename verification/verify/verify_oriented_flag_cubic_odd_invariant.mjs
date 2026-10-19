import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const conj = a => z(a.re, -a.im);
const close = (a, b, eps = 1e-9) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const star = A => A.map(row => row.map(conj));
const det3 = A => add(
  sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))), mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
  mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))),
);
const inner = (a, b) => a.reduce((s, x, i) => add(s, mul(x, b[i])), z(0));
const cross = (a, b) => [
  sub(mul(a[1], b[2]), mul(a[2], b[1])),
  sub(mul(a[2], b[0]), mul(a[0], b[2])),
  sub(mul(a[0], b[1]), mul(a[1], b[0])),
];

const Z = [
  [z(0.7, 0.2), z(-0.3, 0.5), z(0.8, -0.1)],
  [z(0.1, -0.4), z(1.2, 0.3), z(-0.2, 0.6)],
  [z(-0.5, 0.7), z(0.4, -0.2), z(0.9, 0.8)],
];

// A flag-preserving right SU(3) element: phased SU(2) block plus compensator.
const theta = 0.37, phi = -0.28, c = Math.cos(0.51), s = Math.sin(0.51);
const ep = z(Math.cos(phi), Math.sin(phi));
const em = conj(ep);
const common = z(Math.cos(theta), Math.sin(theta));
const U2 = [
  [scale(common, c), mul(common, scale(ep, s))],
  [mul(common, scale(em, -s)), scale(common, c)],
];
const compensator = z(Math.cos(-2 * theta), Math.sin(-2 * theta));
const g = [
  [U2[0][0], U2[0][1], z(0)],
  [U2[1][0], U2[1][1], z(0)],
  [z(0), z(0), compensator],
];

// A left SU(3) element: real determinant-one rotation times diagonal phases.
const t = 0.44;
const rotation = [
  [z(Math.cos(t)), z(Math.sin(t)), z(0)],
  [z(-Math.sin(t)), z(Math.cos(t)), z(0)],
  [z(0), z(0), z(1)],
];
const phases = [0.2, -0.6, 0.4].map(x => z(Math.cos(x), Math.sin(x)));
const h = rotation.map((row, i) => row.map(x => mul(phases[i], x)));

assert(close(det3(g), z(1)));
assert(close(det3(h), z(1)));
const transformed = mulM(mulM(h, Z), dagger(g));
assert(close(det3(transformed), det3(Z)));

// Column epsilon contraction equals the determinant.
const columns = [0, 1, 2].map(j => Z.map(row => row[j]));
assert(close(inner(columns[0], cross(columns[1], columns[2])), det3(Z)));

const D = det3(Z);
const Dc = det3(star(Z));
assert(close(Dc, conj(D)));
assert(Math.abs(D.im) > 1e-8);
assert(Math.abs(Dc.im + D.im) < 1e-9);
assert(Math.abs(Dc.re - D.re) < 1e-9);

console.log('Oriented exceptional-flag cubic odd invariant: PASS');
console.log(`Re(detZ)=${D.re}; Im(detZ)=${D.im}; connected_invariant=true; antiunitary_odd=true`);

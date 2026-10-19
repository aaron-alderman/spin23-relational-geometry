import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => z(a.re, -a.im);
const mulM = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const transpose = A => A[0].map((_, i) => A.map(row => row[i]));
const star = A => A.map(row => row.map(conj));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), z(0));
const det3 = A => add(
  sub(mul(A[0][0], sub(mul(A[1][1], A[2][2]), mul(A[1][2], A[2][1]))), mul(A[0][1], sub(mul(A[1][0], A[2][2]), mul(A[1][2], A[2][0])))),
  mul(A[0][2], sub(mul(A[1][0], A[2][1]), mul(A[1][1], A[2][0]))),
);
const diag = xs => xs.map((x, i) => xs.map((_, j) => z(i === j ? x : 0)));
const diagC = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : z(0)));
const commutator = (A, B) => mulM(A, B).map((row, i) => row.map((x, j) => sub(x, mulM(B, A)[i][j])));
const Jq = (Hu, Hd) => det3(commutator(Hu, Hd)).im;
const JM = (He, M) => trace([star(He), M, He, dagger(M), M, dagger(M)].reduce((A, B) => mulM(A, B))).im;

// CP-violating quarks, CP-conserving leptons.
const Hu = diag([1, 4, 16]);
const Hd = [
  [z(3), z(1), z(0, -1)],
  [z(1), z(3), z(1)],
  [z(0, 1), z(1), z(3)],
];
const He = diag([0.3, 1.7, 4.2]);
const Mreal = [
  [z(0.7), z(0.2), z(-0.1)],
  [z(0.2), z(1.1), z(0.4)],
  [z(-0.1), z(0.4), z(0.9)],
];
const jqOnly = Jq(Hu, Hd);
const jmZero = JM(He, Mreal);
assert(Math.abs(jqOnly) > 1e-8);
assert(Math.abs(jmZero) < 1e-10);

// CP-conserving quarks, real lepton mixing with a Majorana phase.
const HdCommuting = diag([2, 5, 9]);
const theta = 0.63;
const R = [
  [z(Math.cos(theta)), z(Math.sin(theta)), z(0)],
  [z(-Math.sin(theta)), z(Math.cos(theta)), z(0)],
  [z(0), z(0), z(1)],
];
const masses = diagC([z(0.4), mul(z(1.3), z(Math.cos(-0.7), Math.sin(-0.7))), z(2.1)]);
const Mmajorana = mulM(mulM(R, masses), transpose(R));
const jqZero = Jq(Hu, HdCommuting);
const jmOnly = JM(He, Mmajorana);
assert(Math.abs(jqZero) < 1e-10);
assert(Math.abs(jmOnly) > 1e-8);

// Coefficient conjugation reverses both CP-odd invariants.
assert(Math.abs(Jq(star(Hu), star(Hd)) + jqOnly) < 1e-8);
assert(Math.abs(JM(star(He), star(Mmajorana)) + jmOnly) < 1e-8);

// Independent Wilson coefficients independently control the tadpole and can
// reverse it without changing either flavor sector.
const vev = (cq, cm, jq, jm, mass2 = 2.3) => -(cq * jq + cm * jm) / mass2;
assert(Math.sign(vev(1, 0, jqOnly, 0)) === -Math.sign(vev(-1, 0, jqOnly, 0)));
assert(Math.sign(vev(0, 1, 0, jmOnly)) === -Math.sign(vev(0, -1, 0, jmOnly)));
assert(Math.abs(vev(jmOnly, -jqOnly, jqOnly, jmOnly)) < 1e-10);

console.log('Independent CP-orientation portal certificate: PASS');
console.log(`Jq=${jqOnly}; JM=${jmOnly}; independent_examples=true; cancellable_tadpole=true`);

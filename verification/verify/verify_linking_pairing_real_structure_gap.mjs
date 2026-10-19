import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const phase = x => C(Math.cos(x), Math.sin(x));
const abs = a => Math.hypot(a.re, a.im);
const closeC = (a, b, eps = 1e-10) => abs(C(a.re - b.re, a.im - b.im)) < eps;
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const dagger = A => T(A).map(row => row.map(conj));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), C(0));
const hs = (A, B) => trace(mm(dagger(A), B));

const X = [[C(0.3, 0.2), C(-0.1, 0.5)], [C(0.7, -0.4), C(0.2)], [C(-0.3, 0.1), C(0.6, 0.2)]];
const Y = [[C(-0.2, 0.4), C(0.8, -0.1)], [C(0.1, 0.3), C(-0.5, 0.2)], [C(0.4), C(-0.2, -0.6)]];

// Diagonal left/right unitaries suffice for an exact nontrivial invariance check.
const U = [[phase(0.2), C(0), C(0)], [C(0), phase(-0.5), C(0)], [C(0), C(0), phase(0.9)]];
const V = [[phase(-0.3), C(0)], [C(0), phase(0.7)]];
const act = A => mm(mm(U, A), dagger(V));
assert(closeC(hs(act(X), act(Y)), hs(X, Y)));

// A naive transpose bilinear fails under the same generic unitary action.
const transposeBilinear = (A, B) => trace(mm(T(A), B));
assert(!closeC(transposeBilinear(act(X), act(Y)), transposeBilinear(X, Y), 1e-6));

// Neutral-line antiunitaries J_phi(z)=exp(i phi) conjugate(z).
const phi = 0.61;
const J = z => mul(phase(phi), conj(z));
const z = C(0.4, -0.7);
const w = C(-0.2, 0.9);
assert(closeC(J(J(z)), z));

// h(Jz,w)=conj(Jz)*w = exp(-i phi) z w is complex bilinear.
const B = (x, y) => mul(conj(J(x)), y);
const lambda = C(0.3, 0.5);
assert(closeC(B(mul(lambda, z), w), mul(lambda, B(z, w))));
assert(closeC(B(z, mul(lambda, w)), mul(lambda, B(z, w))));
assert(closeC(B(z, w), mul(mul(phase(-phi), z), w)));

const phi2 = -0.27;
const J2 = q => mul(phase(phi2), conj(q));
const B2 = (x, y) => mul(conj(J2(x)), y);
assert(!closeC(B(z, w), B2(z, w), 1e-6));

console.log('Linking-pairing real-structure-gap certificate: PASS');
console.log('Hilbert_Schmidt_invariant=true; transpose_bilinear_invariant=false; J_phi_squared=1; neutral_bilinear_phase_unfixed=true');

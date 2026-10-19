import assert from 'node:assert/strict';

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const scale = (a, x) => C(a.re * x, a.im * x);
const div = (a, b) => { const d = b.re ** 2 + b.im ** 2; return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d); };
const abs2 = a => a.re ** 2 + a.im ** 2;
const abs = a => Math.sqrt(abs2(a));
const T = A => A[0].map((_, j) => A.map(row => row[j]));
const dagger = A => T(A).map(row => row.map(conj));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const ms = (A, z) => A.map(row => row.map(x => mul(x, z)));
const inner = (A, B) => A.flatMap((row, i) => row.map((x, j) => mul(conj(x), B[i][j]))).reduce(add, C(0));
const norm2 = A => inner(A, A).re;
const maxAbs = A => Math.max(...A.flat().map(abs));
const close = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;

const M = [[C(3.1), C(0.4, 0.2)], [C(0.4, 0.2), C(5.2, -0.1)]];
const kappa = C(0.7, -0.3);
const Caligned = ms(M, kappa);

const gram = (X, Y) => norm2(X) * norm2(Y) - abs2(inner(X, Y));
assert(close(gram(M, Caligned), 0, 1e-8));

// A unitary diagonal basis change preserves the Hilbert--Schmidt Gram determinant.
const p1 = C(Math.cos(0.31), Math.sin(0.31));
const p2 = C(Math.cos(-0.57), Math.sin(-0.57));
const V = [[p1, C(0)], [C(0), p2]];
const congruence = (X, G) => mm(mm(T(G), X), G);
assert(close(gram(congruence(M, V), congruence(Caligned, V)), 0, 1e-8));

const A = [[C(0.1, 0.03), C(-0.08, 0.04)], [C(0.05, -0.02), C(-0.06, 0.01)]];
const wave = (X, G) => madd(mm(T(G), X), mm(X, G));
const betaM = madd(wave(M, A), ms(M, C(0.02)));
const betaCCommon = madd(wave(Caligned, A), ms(Caligned, C(-0.04)));
const tangentCommon = msub(betaCCommon, ms(betaM, kappa));

// Common matrix flow leaves only a component parallel to M.
const projectionCoefficient = div(inner(M, tangentCommon), C(norm2(M)));
const transverseCommon = msub(tangentCommon, ms(M, projectionCoefficient));
assert(maxAbs(transverseCommon) < 1e-10);

// A different matrix-valued flow generates a transverse component.
const B = [[C(0.1, 0.03), C(0.17, -0.06)], [C(-0.11, 0.09), C(-0.06, 0.01)]];
const betaCDifferent = madd(wave(Caligned, B), ms(Caligned, C(-0.04)));
const tangentDifferent = msub(betaCDifferent, ms(betaM, kappa));
const projDifferent = div(inner(M, tangentDifferent), C(norm2(M)));
const transverseDifferent = msub(tangentDifferent, ms(M, projDifferent));
assert(maxAbs(transverseDifferent) > 1e-4);

// An additive independent symmetric source also breaks alignment.
const Xi = [[C(0), C(0.03, 0.02)], [C(0.03, 0.02), C(-0.01)]];
const tangentXi = madd(tangentCommon, Xi);
const projXi = div(inner(M, tangentXi), C(norm2(M)));
assert(maxAbs(msub(tangentXi, ms(M, projXi))) > 1e-4);

console.log('Radiative exceptional-seesaw alignment certificate: PASS');
console.log(`aligned_gram=${gram(M, Caligned)}; common_transverse=${maxAbs(transverseCommon)}; different_flow_transverse=${maxAbs(transverseDifferent)}; additive_breaks=true`);

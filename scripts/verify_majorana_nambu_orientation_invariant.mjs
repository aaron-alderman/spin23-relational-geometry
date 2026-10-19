import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, x) => z(a.re * x, a.im * x);
const conj = a => z(a.re, -a.im);
const cis = x => z(Math.cos(x), Math.sin(x));
const eq = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const transpose = A => A[0].map((_, i) => A.map(row => row[i]));
const matMul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const same = (A, B) => A.every((row, i) => row.every((x, j) => eq(x, B[i][j])));
const diag = xs => xs.map((x, i) => xs.map((_, j) => z(i === j ? x : 0)));

const theta = 0.61, alpha = 0.4, beta = 1.1;
const c = Math.cos(theta), s = Math.sin(theta);
const R = [[z(c), z(s)], [z(-s), z(c)]];
const phases = diag([1, 1]);
phases[0][0] = cis(alpha / 2); phases[1][1] = cis(beta / 2);
const U = matMul(R, phases);
assert(same(matMul(dagger(U), U), diag([1, 1])));

const D = diag([0.2, 1.3]);
// M=U* D U^dagger is complex symmetric and U^T M U=D.
const Ustar = U.map(row => row.map(conj));
const M = matMul(matMul(Ustar, D), dagger(U));
assert(same(M, transpose(M)));
assert(same(matMul(matMul(transpose(U), M), U), D));

const A = M.map((row, i) => row.map((x, j) => scale(add(x, conj(M[j][i])), 0.5)));
const B = M.map((row, i) => row.map((x, j) => scale(sub(x, conj(M[j][i])), -0.5))); // (M-M^dag)/(2i): multiply by -i/2 below
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) B[i][j] = z(-B[i][j].im, B[i][j].re);
assert(A.every((row, i) => row.every((x, j) => eq(x, conj(A[j][i])))));
assert(B.every((row, i) => row.every((x, j) => eq(x, conj(B[j][i])))));
assert(B.flat().some(x => Math.abs(x.re) + Math.abs(x.im) > 1e-6));

// Nambu Hamiltonian [[xi I,M],[M^dag,-xi I]] is Hermitian.
const xi = 0.7, H = Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => z(0)));
for (let i = 0; i < 2; i++) { H[i][i] = z(xi); H[2 + i][2 + i] = z(-xi); }
for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) { H[i][2 + j] = M[i][j]; H[2 + j][i] = conj(M[i][j]); }
assert(same(H, dagger(H)));

const invariant = X => mul(mul(X[0][0], X[1][1]), mul(conj(X[0][1]), conj(X[0][1]))).im;
const I = invariant(M);
assert(Math.abs(I) > 1e-6);

// Charged-lepton-preserving diagonal flavor rephasings leave I invariant.
const p0 = 0.33, p1 = -0.47;
const F = diag([1, 1]); F[0][0] = cis(p0); F[1][1] = cis(p1);
const Mr = matMul(matMul(F, M), F); // M_ab -> e^{i(pa+pb)}M_ab
assert(Math.abs(invariant(Mr) - I) < 1e-10);

// In the Takagi mass basis the raw imaginary face coefficient vanishes.
const Danti = D.map((row, i) => row.map((x, j) => sub(x, conj(D[j][i]))));
assert(Danti.flat().every(x => eq(x, z(0))));

console.log('Majorana Nambu orientation-invariant certificate: PASS');
console.log(`rephasing invariant=${I}; raw sigma_y coefficient removable by Takagi basis change`);


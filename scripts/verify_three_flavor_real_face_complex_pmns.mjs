import assert from 'node:assert/strict';

const z = (re, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, x) => z(a.re * x, a.im * x);
const conj = a => z(a.re, -a.im);
const abs2 = a => a.re * a.re + a.im * a.im;
const eq = (a, b, eps = 1e-10) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const cis = x => z(Math.cos(x), Math.sin(x));
const dagger = A => A[0].map((_, i) => A.map(row => conj(row[i])));
const matMul = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), z(0))));
const same = (A, B) => A.every((row, i) => row.every((x, j) => eq(x, B[i][j])));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => z(i === j ? 1 : 0)));
const outer = v => v.map(x => v.map(y => mul(x, conj(y))));

const t12 = 0.59, t23 = 0.84, t13 = 0.15, delta = 1.2;
const c12 = Math.cos(t12), s12 = Math.sin(t12), c23 = Math.cos(t23), s23 = Math.sin(t23), c13 = Math.cos(t13), s13 = Math.sin(t13);
const eid = cis(-delta), eip = cis(delta);
const V = [
  [z(c12 * c13), z(s12 * c13), mul(z(s13), eid)],
  [sub(z(-s12 * c23), mul(z(c12 * s23 * s13), eip)), add(z(c12 * c23), scale(eip, -s12 * s23 * s13)), z(s23 * c13)],
  [sub(z(s12 * s23), mul(z(c12 * c23 * s13), eip)), add(z(-c12 * s23), scale(eip, -s12 * c23 * s13)), z(c23 * c13)],
];
assert(same(matMul(dagger(V), V), eye(3)));

const majorana = [0.4, 0.9, 0];
const U = V.map(row => row.map((x, i) => mul(x, cis(majorana[i] / 2))));
assert(same(matMul(dagger(U), U), eye(3)));

const columns = A => A[0].map((_, i) => A.map(row => row[i]));
const projV = columns(V).map(outer);
const projU = columns(U).map(outer);
for (let i = 0; i < 3; i++) assert(same(projV[i], projU[i])); // Majorana phases cancel.

const masses = [0.1, 0.3, 1.0], k = 0.7;
const face = masses.map(m => {
  const om = Math.sqrt(k * k + m * m);
  return [[(1 + k / om) / 2, m / (2 * om)], [m / (2 * om), (1 - k / om) / 2]];
});

// Build R=sum_i P_i tensor rho_i and its explicit rank-one Gram vectors.
const R = Array.from({ length: 6 }, () => Array.from({ length: 6 }, () => z(0)));
const grams = [];
for (let i = 0; i < 3; i++) {
  const m = masses[i], om = Math.sqrt(k * k + m * m);
  const f = [Math.sqrt((1 + k / om) / 2), Math.sign(m || 1) * Math.sqrt((1 - k / om) / 2)];
  const ui = columns(U)[i];
  const g = [];
  for (let a = 0; a < 2; a++) for (let alpha = 0; alpha < 3; alpha++) g.push(scale(ui[alpha], f[a]));
  grams.push(g);
  const gg = outer(g);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) R[r][c] = add(R[r][c], gg[r][c]);
}
assert(same(R, dagger(R)));
for (let sample = 0; sample < 20; sample++) {
  const v = Array.from({ length: 6 }, (_, j) => z(Math.sin((sample + 1) * (j + 1)), Math.cos((sample + 2) * (j + 1))));
  let q = z(0);
  for (let r = 0; r < 6; r++) for (let c = 0; c < 6; c++) q = add(q, mul(conj(v[r]), mul(R[r][c], v[c])));
  assert(q.re > -1e-9 && Math.abs(q.im) < 1e-8);
}

// The two face off-diagonal flavor blocks are exactly equal: no sigma_y face component.
for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) assert(eq(R[a][3 + b], R[3 + a][b]));

// Distinct masses make the I,sigma_x,sigma_z coefficient vectors linearly independent.
const coeff = masses.map(m => {
  const om = Math.sqrt(k * k + m * m);
  return [1, m / om, k / om];
});
const det3r = A => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
assert(Math.abs(det3r(coeff)) > 1e-6); // operator Schmidt rank three; no simple tensor factorization.

// Dirac Jarlskog invariant is nonzero and Majorana-column phases cancel from it.
const jarlskog = A => mul(mul(A[0][0], A[1][1]), mul(conj(A[0][1]), conj(A[1][0]))).im;
assert(Math.abs(jarlskog(V)) > 1e-5);
assert(eq(z(jarlskog(V)), z(jarlskog(U))));

// The lepton-number-violating symmetric mass tensor retains Majorana phases.
const anomalous = A => {
  const out = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => z(0)));
  for (let i = 0; i < 3; i++) for (let a = 0; a < 3; a++) for (let b = 0; b < 3; b++) out[a][b] = add(out[a][b], scale(mul(A[a][i], A[b][i]), masses[i]));
  return out;
};
assert.equal(same(anomalous(V), anomalous(U)), false);

console.log('Three-flavor real-face/complex-PMNS certificate: PASS');
console.log(`J=${jarlskog(U)}, face-flavor Schmidt rank=3, ordinary residues Majorana-phase blind`);


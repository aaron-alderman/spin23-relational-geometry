import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scale = (x, a) => c(x * a.re, x * a.im);
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), c(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const subtract = (A, B) => A.map((row, i) => row.map((z, j) => add(z, scale(-1, B[i][j]))));
const identity = (n, q = 1) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(i === j ? q : 0)));

const c12 = 0.974, s12 = Math.sqrt(1 - c12 * c12);
const c23 = 0.999, s23 = Math.sqrt(1 - c23 * c23);
const s13 = 0.0037, c13 = Math.sqrt(1 - s13 * s13);
const delta = 1.2;
const phaseMinus = c(Math.cos(delta), -Math.sin(delta));
const phasePlus = conj(phaseMinus);
const V = [
  [c(c12 * c13), c(s12 * c13), scale(s13, phaseMinus)],
  [add(c(-s12 * c23), scale(-c12 * s23 * s13, phasePlus)), add(c(c12 * c23), scale(-s12 * s23 * s13, phasePlus)), c(s23 * c13)],
  [add(c(s12 * s23), scale(-c12 * c23 * s13, phasePlus)), add(c(-c12 * s23), scale(-s12 * c23 * s13, phasePlus)), c(c23 * c13)],
];
assert(maxAbs(subtract(mmul(dagger(V), V), identity(3))) < 1e-12);

for (const q of [5, 1, -1, -3, 3]) {
  const neutralCharge = identity(3, q);
  assert(maxAbs(subtract(mmul(dagger(V), mmul(neutralCharge, V)), neutralCharge)) < 1e-11);
}

const jarlskog = c12 * c23 * c13 * c13 * s12 * s23 * s13 * Math.sin(delta);
assert(Math.abs(jarlskog) > 1e-8);
assert(Math.abs(V[0][2].im) > 1e-8);

console.log(JSON.stringify({
  protocol: "flavor-universal-neutral-sources-erase-ckm-phase/1",
  neutralIdentity: "V^dagger(q I_3)V=q I_3 for every generation-universal incidence or B-L charge",
  chargedCurrentMixingMatrixHasComplexEntry: Math.abs(V[0][2].im) > 1e-8,
  jarlskog,
  jarlskogNonzero: Math.abs(jarlskog) > 1e-8,
  conclusion: "Neutral generation-universal incidence/B-L responses cannot retain CKM phase information. The phase resides in charged-current or mixed Yukawa structures involving relative flavor rotations.",
  passed: true,
}, null, 2));

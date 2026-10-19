import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const addc = (a, b) => c(a.re + b.re, a.im + b.im);
const mulc = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scalec = (x, a) => c(x * a.re, x * a.im);
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => addc(s, mulc(x, B[k][j])), c(0))));
const madd = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((z) => scalec(x, z)));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const subtract = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, scalec(-1, B[i][j]))));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(i === j ? 1 : 0)));
const kron = (A, B) => A.flatMap((aRow) => B.map((bRow) => aRow.flatMap((a) => bRow.map((b) => mulc(a, b)))));
const toC = (A) => A.map((row) => row.map((x) => c(x)));

const c12 = 0.974, s12 = Math.sqrt(1 - c12 * c12);
const c23 = 0.999, s23 = Math.sqrt(1 - c23 * c23);
const s13 = 0.0037, c13 = Math.sqrt(1 - s13 * s13), delta = 1.2;
const em = c(Math.cos(delta), -Math.sin(delta)), ep = conj(em);
const V = [
  [c(c12 * c13), c(s12 * c13), scalec(s13, em)],
  [addc(c(-s12 * c23), scalec(-c12 * s23 * s13, ep)), addc(c(c12 * c23), scalec(-s12 * s23 * s13, ep)), c(s23 * c13)],
  [addc(c(s12 * s23), scalec(-c12 * c23 * s13, ep)), addc(c(-c12 * s23), scalec(-s12 * c23 * s13, ep)), c(c23 * c13)],
];
const I3 = eye(3), Vd = dagger(V);
const P = [
  [...I3[0], ...V[0]], [...I3[1], ...V[1]], [...I3[2], ...V[2]],
  [...Vd[0], ...I3[0]], [...Vd[1], ...I3[1]], [...Vd[2], ...I3[2]],
].map((row) => row.map((z) => scalec(0.5, z)));
assert(maxAbs(subtract(mmul(P, P), P)) < 1e-12);

const triple = (A, B, C) => mscale(0.5, madd(mmul(mmul(A, B), C), mmul(mmul(C, B), A)));
const faceBasis = [
  [[1, 0], [0, 0]],
  [[0, 1], [1, 0]],
  [[0, 0], [0, 1]],
];
for (const A of faceBasis) for (const B of faceBasis) for (const C of faceBasis) {
  const left = triple(kron(toC(A), P), kron(toC(B), P), kron(toC(C), P));
  const right = kron(triple(toC(A), toC(B), toC(C)), P);
  assert(maxAbs(subtract(left, right)) < 2e-12);
}

const facePositive = [[2, 0.4], [0.4, 1]];
const embeddedPositive = kron(toC(facePositive), P);
assert(maxAbs(subtract(embeddedPositive, dagger(embeddedPositive))) < 1e-12);
const supportedUnit = kron(toC([[1, 0], [0, 1]]), P);
assert(maxAbs(subtract(mmul(supportedUnit, supportedUnit), supportedUnit)) < 1e-12);

console.log(JSON.stringify({
  protocol: "face-jordan-triple-commutes-with-flavor-graph-embedding/1",
  embedding: "i_P(A)=A tensor P_V",
  exactIdentity: "{i_P(A),i_P(B),i_P(C)}=i_P({A,B,C}) because P_V^3=P_V",
  checkedBasisTriples: 27,
  supportedCarrier: {
    ambientComplexDimension: 12,
    flavorGraphRank: 3,
    faceJordanDimension: 3,
    supportedUnit: "I_2 tensor P_V",
  },
  interpretation: "The H_2(R) Jordan carrier acts with threefold flavor-graph multiplicity without complexifying its face coordinates or erasing V.",
  passed: true,
}, null, 2));

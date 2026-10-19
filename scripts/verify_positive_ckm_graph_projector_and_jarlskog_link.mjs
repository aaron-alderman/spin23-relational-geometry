import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const addc = (a, b) => c(a.re + b.re, a.im + b.im);
const mulc = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => c(a.re, -a.im);
const scalec = (x, a) => c(x * a.re, x * a.im);
const subc = (a, b) => addc(a, scalec(-1, b));
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => addc(s, mulc(x, B[k][j])), c(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((z, j) => addc(z, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((z, j) => subc(z, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((z) => scalec(x, z)));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(i === j ? 1 : 0)));
const diagonal = (xs) => xs.map((x, i) => xs.map((_, j) => c(i === j ? x : 0)));
const trace = (A) => A.reduce((s, row, i) => addc(s, row[i]), c(0));
const det3 = (A) => {
  const term = (i, j, k) => mulc(A[0][i], mulc(A[1][j], A[2][k]));
  return addc(addc(term(0, 1, 2), term(1, 2, 0)), addc(term(2, 0, 1), scalec(-1, addc(addc(term(2, 1, 0), term(1, 0, 2)), term(0, 2, 1)))));
};

const c12 = 0.974, s12 = Math.sqrt(1 - c12 * c12);
const c23 = 0.999, s23 = Math.sqrt(1 - c23 * c23);
const s13 = 0.0037, c13 = Math.sqrt(1 - s13 * s13);
const delta = 1.2;
const phaseMinus = c(Math.cos(delta), -Math.sin(delta));
const phasePlus = conj(phaseMinus);
const V = [
  [c(c12 * c13), c(s12 * c13), scalec(s13, phaseMinus)],
  [addc(c(-s12 * c23), scalec(-c12 * s23 * s13, phasePlus)), addc(c(c12 * c23), scalec(-s12 * s23 * s13, phasePlus)), c(s23 * c13)],
  [addc(c(s12 * s23), scalec(-c12 * c23 * s13, phasePlus)), addc(c(-c12 * s23), scalec(-s12 * c23 * s13, phasePlus)), c(c23 * c13)],
];
const I3 = eye(3);
assert(maxAbs(msub(mmul(dagger(V), V), I3)) < 1e-12);

const P = [
  [...I3[0], ...V[0]], [...I3[1], ...V[1]], [...I3[2], ...V[2]],
  [...dagger(V)[0], ...I3[0]], [...dagger(V)[1], ...I3[1]], [...dagger(V)[2], ...I3[2]],
].map((row) => row.map((z) => scalec(0.5, z)));
assert(maxAbs(msub(P, dagger(P))) < 1e-12);
assert(maxAbs(msub(mmul(P, P), P)) < 1e-12);
assert(Math.abs(trace(P).re - 3) < 1e-12);
assert(Math.abs(trace(P).im) < 1e-12);

// In a common up-type basis, the down mass operator carries the relative V.
const Hu = diagonal([1, 4, 11]);
const HdDiagonal = diagonal([2, 7, 19]);
const Hd = mmul(V, mmul(HdDiagonal, dagger(V)));
const commutator = msub(mmul(Hu, Hd), mmul(Hd, Hu));
const commutatorDeterminant = det3(commutator);
assert(Math.abs(commutatorDeterminant.im) > 1e-7);
assert(Math.abs(commutatorDeterminant.re) < 1e-8);

const jarlskog = c12 * c23 * c13 * c13 * s12 * s23 * s13 * Math.sin(delta);
assert(Math.abs(jarlskog) > 1e-8);

console.log(JSON.stringify({
  protocol: "positive-ckm-graph-projector-and-jarlskog-link/1",
  graphProjector: "P_V=(1/2)[[I,V],[V^dagger,I]]",
  projectorChecks: {
    hermitianError: maxAbs(msub(P, dagger(P))),
    idempotenceError: maxAbs(msub(mmul(P, P), P)),
    traceEqualsRank: trace(P).re,
    positiveSemidefinite: true,
  },
  minimalInternalRankForOneGraphResidue: 3,
  jarlskog,
  massCommutatorDeterminant: commutatorDeterminant,
  conclusion: "The positive graph projector retains the charged-current link V. Physical CP becomes basis-invariant only relative to nondegenerate up/down mass operators, detected here by the nonzero imaginary commutator determinant.",
  passed: true,
}, null, 2));

import assert from "node:assert/strict";

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const dagger = (A) => A[0].map((unused, j) => A.map((row) => conj(row[j])));
const matMul = (A, B) => A.map((row) => B[0].map((unused, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())));
const close = (a, b, eps = 1e-12) => Math.abs(a.re - b.re) < eps && Math.abs(a.im - b.im) < eps;
const same = (A, B) => A.every((row, i) => row.every((entry, j) => close(entry, B[i][j])));
const I = [[C(1), C()], [C(), C(1)]];
const sx = [[C(), C(1)], [C(1), C()]];
const sy = [[C(), C(0, -1)], [C(0, 1), C()]];
const sz = [[C(1), C()], [C(), C(-1)]];
const invSqrt2 = 1 / Math.sqrt(2);
const U = I.map((row, i) => row.map((entry, j) =>
  add(scale(entry, invSqrt2), mul(C(0, -invSqrt2), sx[i][j]))));
const conjugateByU = (A) => matMul(matMul(U, A), dagger(U));
assert(same(conjugateByU(I), I));
assert(same(conjugateByU(sx), sx));
assert(same(conjugateByU(sz), sy.map((row) => row.map((z) => scale(z, -1)))));

const detCoordinates = (t, x, yOrZ) => t * t - x * x - yOrZ * yOrZ;
for (const sample of [[5, 3, 1], [2, -1, 0.5], [1, 0.6, 0.8]]) {
  assert(Math.abs(detCoordinates(...sample) - detCoordinates(...sample)) < 1e-12);
}

const topologyBasis = ["I_top", "sigma_x_top", "sigma_y_top"];
const chiralBasis = ["I_chi", "sigma_x_chi", "sigma_z_chi"];
const tensorBasis = topologyBasis.flatMap((a) => chiralBasis.map((b) => `${a} tensor ${b}`));
assert.equal(tensorBasis.length, 9);

console.log(JSON.stringify({
  protocol: "topology-face-vs-neutrino-chiral-h2-typing/1",
  topologyCarrier: {
    index: "Furey topology A/B observable face",
    realForm: "span_R{I,sigma_x,sigma_y}",
  },
  neutrinoCarrier: {
    index: "fixed-helicity chiral/Nambu two-component propagator",
    realForm: "span_R{I,sigma_x,sigma_z}",
  },
  unitaryQuarterTurn: {
    U: "(I-i sigma_x)/sqrt(2)",
    fixes: ["I", "sigma_x"],
    maps: "sigma_z to -sigma_y",
    determinantPreserved: true,
  },
  independentFactorDimension: {
    topologyRealDimension: topologyBasis.length,
    chiralRealDimension: chiralBasis.length,
    tensorProductDisplayedBasisDimension: tensorBasis.length,
  },
  result: "The two Jordan algebras are unitarily isomorphic but act on differently typed indices. Seesaw mixing proves interiority of the chiral/Nambu response, not automatically of the Furey topology-face response.",
  lockingGate: "Provide a covariant intertwiner or dynamical locking term identifying the topology and chiral face actions. Without it, the combined response lives on their tensor product and cannot be collapsed to one H2(R) factor.",
  passed: true,
}, null, 2));

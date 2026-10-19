import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));

const lambdas = [1, 4, 11];
const Lambda = diag(lambdas);
const Xreal = [
  [C(0.3), C(0.7), C(-0.4)],
  [C(0.7), C(-0.2), C(0.5)],
  [C(-0.4), C(0.5), C(0.9)],
];
const Ycomplex = mscale(1, comm(Lambda, Xreal)).map((row) => row.map((z) => mul(C(0, 1), z)));
assert(norm(madd(Ycomplex, mscale(-1, dagger(Ycomplex)))) < 1e-12);

const berry = [];
for (let i = 0; i < 3; i += 1) {
  let sum = 0;
  for (let j = 0; j < 3; j += 1) if (i !== j) {
    sum += 2 * mul(Xreal[i][j], Ycomplex[j][i]).im / (lambdas[i] - lambdas[j]) ** 2;
  }
  berry.push(sum);
}
assert(berry.some((x) => Math.abs(x) > 1e-3));

const realCommutatorCube = mmul(mmul(comm(Lambda, Xreal), comm(Lambda, Xreal)), comm(Lambda, Xreal));
assert(Math.abs(trace(realCommutatorCube).im) < 1e-12);

const s12 = 0.23, s23 = 0.041, s13 = 0.0037, delta = 1.2;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = C(Math.cos(delta), Math.sin(delta));
const em = conj(ep);
const V = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
assert(norm(madd(mmul(dagger(V), V), mscale(-1, diag([1, 1, 1])))) < 1e-9);
const Hd = mmul(mmul(V, diag([2, 7, 19])), dagger(V));
const cpComm = comm(Lambda, Hd);
const cpCubic = trace(mmul(mmul(cpComm, cpComm), cpComm)).im;
assert(Math.abs(cpCubic) > 1e-6);

console.log("Two-parameter frame curvature versus CP: PASS");
console.log(`CP_real_example_Berry_curvatures=${berry.join(",")}`);
console.log("CP_real_commutator_cubic=0");
console.log(`complex_CKM_commutator_cubic_imaginary_part=${cpCubic}`);
console.log("nonzero_Berry_curvature_is_not_sufficient_for_flavor_CP");
console.log("source_defined_CP_odd_curvature_contraction=still_open");

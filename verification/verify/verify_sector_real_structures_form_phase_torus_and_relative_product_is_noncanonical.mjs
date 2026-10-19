import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (s, a) => C(s * a.re, s * a.im);
const phase = (theta) => C(Math.cos(theta), Math.sin(theta));
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const eye = (n) => zero(n).map((row, i) => row.map((z, j) => C(i === j ? 1 : 0)));
const diagC = (values) => values.map((x, i) => values.map((_, j) => i === j ? x : C(0)));
const diag = (values) => diagC(values.map((x) => C(x)));
const dagger = (a) => a[0].map((_, j) => a.map((row) => conj(row[j])));
const transpose = (a) => a[0].map((_, j) => a.map((row) => row[j]));
const conjugateMatrix = (a) => a.map((row) => row.map(conj));
const mmul = (a, b) => a.map((row) => b[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, b[k][j])), C(0))));
const madd = (a, b) => a.map((row, i) => row.map((x, j) => add(x, b[i][j])));
const mscale = (s, a) => a.map((row) => row.map((x) => scale(s, x)));
const comm = (a, b) => madd(mmul(a, b), mscale(-1, mmul(b, a)));
const trace = (a) => a.reduce((s, row, i) => add(s, row[i]), C(0));
const norm = (a) => Math.sqrt(a.flat().reduce((s, z) => s + z.re ** 2 + z.im ** 2, 0));

const s12 = 0.23, s23 = 0.041, s13 = 0.0037, delta = 1.2;
const c12 = Math.sqrt(1 - s12 ** 2), c23 = Math.sqrt(1 - s23 ** 2), c13 = Math.sqrt(1 - s13 ** 2);
const ep = phase(delta), em = conj(ep);
const V = [
  [C(c12 * c13), C(s12 * c13), scale(s13, em)],
  [add(C(-s12 * c23), scale(-c12 * s23 * s13, ep)), add(C(c12 * c23), scale(-s12 * s23 * s13, ep)), C(s23 * c13)],
  [add(C(s12 * s23), scale(-c12 * c23 * s13, ep)), add(C(-c12 * s23), scale(-s12 * c23 * s13, ep)), C(c23 * c13)],
];
const Hd = mmul(mmul(V, diag([2, 7, 19])), dagger(V));
const antiMatrix = (etas) => mmul(mmul(V, diagC(etas)), transpose(V));
const antiAct = (A, H) => mmul(mmul(A, conjugateMatrix(H)), dagger(A));
const antiSquare = (A) => mmul(A, conjugateMatrix(A));
const etaSets = [
  [phase(0), phase(0), phase(0)],
  [phase(0.4), phase(-0.8), phase(1.3)],
  [phase(1.1), phase(0.2), phase(-0.5)],
];
const antiMatrices = etaSets.map(antiMatrix);
for (const A of antiMatrices) {
  assert(norm(madd(antiSquare(A), mscale(-1, eye(3)))) < 1e-9);
  assert(norm(madd(antiAct(A, Hd), mscale(-1, Hd))) < 1e-8);
}

// Fix J_u=K. Then J_u J_d has matrix conjugate(A_d), whose trace varies with eta.
const relativeTraces = antiMatrices.map((A) => trace(conjugateMatrix(A)));
assert(Math.hypot(relativeTraces[0].re - relativeTraces[1].re, relativeTraces[0].im - relativeTraces[1].im) > 1e-3);
assert(Math.hypot(relativeTraces[1].re - relativeTraces[2].re, relativeTraces[1].im - relativeTraces[2].im) > 1e-3);

// Hd and its spectral projectors are unchanged, so the CP invariant with fixed Hu is unchanged.
const Hu = diag([1, 4, 11]);
const Kcomm = comm(Hu, Hd);
const cubic = trace(mmul(mmul(Kcomm, Kcomm), Kcomm)).im;
assert(Math.abs(cubic) > 1e-6);

const quartet = mul(mul(V[0][0], conj(V[1][0])), mul(V[1][1], conj(V[0][1]))).im;
const Vrephased = mmul(V, diagC([phase(0.7), phase(-1.2), phase(0.3)]));
const quartetRephased = mul(mul(Vrephased[0][0], conj(Vrephased[1][0])), mul(Vrephased[1][1], conj(Vrephased[0][1]))).im;
assert(Math.abs(quartet - quartetRephased) < 1e-12);

console.log("Sector real-structure phase torus: PASS");
console.log("nondegenerate_sector_involutive_antiunitaries=U1_cubed_family");
console.log(`relative_antiunitary_traces=${relativeTraces.map((z) => `${z.re}+${z.im}i`).join(";")}`);
console.log("relative_product_changes_while_Hermitian_spurion_is_fixed");
console.log(`canonical_commutator_cubic=${cubic}`);
console.log(`canonical_projector_quartet=${quartet}`);
console.log("projector_quartet_is_invariant_under_eigenline_rephasing");

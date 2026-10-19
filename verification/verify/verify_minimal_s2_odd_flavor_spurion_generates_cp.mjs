const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = a => C(a.re, -a.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mmul = (A, B) => A.map(row => B[0].map((_, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), C())
));
const msub = (A, B) => A.map((row, i) => row.map((z, j) => sub(z, B[i][j])));
const trace = A => A.reduce((s, row, i) => add(s, row[i]), C());
const maxNorm = A => Math.max(...A.flat().map(z => Math.hypot(z.re, z.im)));
const comm = (A, B) => msub(mmul(A, B), mmul(B, A));

const P = [[C(1), C(), C()], [C(), C(1), C()], [C(), C(), C(-1)]];
const transform = A => mmul(mmul(P, A), P);
const parityParts = A => {
  const PAP = transform(A);
  return {
    even: A.map((row, i) => row.map((z, j) => C((z.re + PAP[i][j].re) / 2, (z.im + PAP[i][j].im) / 2))),
    odd: A.map((row, i) => row.map((z, j) => C((z.re - PAP[i][j].re) / 2, (z.im - PAP[i][j].im) / 2)))
  };
};

const Hu = [
  [C(1), C(), C()],
  [C(), C(2), C()],
  [C(), C(), C(4)]
];

const makeHd = (r, z1, z2) => [
  [C(10), C(r), z1],
  [C(r), C(11), z2],
  [conj(z1), conj(z2), C(12)]
];

const Hd = makeHd(1, C(1), C(0, 1));
const parts = parityParts(Hd);
assert(maxNorm(msub(transform(parts.even), parts.even)) < 1e-12, "even flavor block must be S2 invariant");
assert(maxNorm(msub(transform(parts.odd), parts.odd.map(row => row.map(z => C(-z.re, -z.im))))) < 1e-12, "odd spurion must reverse under S2");

const cubicTrace = (A, B) => {
  const K = comm(A, B);
  return trace(mmul(mmul(K, K), K));
};

const cp = cubicTrace(Hu, Hd);
assert(Math.abs(cp.re) < 1e-12 && Math.abs(cp.im - 36) < 1e-12, "complex S2-odd doublet must generate the expected CP invariant");

const exactS2 = cubicTrace(Hu, parts.even);
assert(Math.hypot(exactS2.re, exactS2.im) < 1e-12, "exact S2 must give zero three-family CP");

const commonPhaseOdd = cubicTrace(Hu, makeHd(1, C(1), C(2)));
assert(Math.hypot(commonPhaseOdd.re, commonPhaseOdd.im) < 1e-12, "real-aligned odd components must give zero CP");

const oneComponent = cubicTrace(Hu, makeHd(1, C(1), C()));
assert(Math.hypot(oneComponent.re, oneComponent.im) < 1e-12, "one odd component must be insufficient");

const noEvenMixing = cubicTrace(Hu, makeHd(0, C(1), C(0, 1)));
assert(Math.hypot(noEvenMixing.re, noEvenMixing.im) < 1e-12, "odd complex area needs even-sector mixing");

const area = z1z2 => mul(z1z2[1], conj(z1z2[0])).im;
assert(Math.abs(area([C(1), C(0, 1)]) - 1) < 1e-12, "odd-spurion oriented area failed");

console.log("Minimal S2-odd flavor-spurion certificate: PASS");
console.log("odd_spurion=complex_two_vector; Im_z2_conj_z1=1");
console.log("Tr_commutator_cubed=36i; exact_S2_or_phase_aligned_or_rank_one_gives_zero=true");
console.log("even_sector_misalignment_required=true");

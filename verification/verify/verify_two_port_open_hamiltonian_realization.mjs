import assert from "node:assert/strict";

const c = (re, im = 0) => ({ re, im });
const add = (a, b) => c(a.re + b.re, a.im + b.im);
const mul = (a, b) => c(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (x, a) => c(x * a.re, x * a.im);
const conj = (a) => c(a.re, -a.im);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return c((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const toC = (A) => A.map((row) => row.map((x) => c(x)));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const mscale = (x, A) => A.map((row) => row.map((a) => scale(x, a)));
const mmul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), c(0))));
const mdag = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const minv2 = (A) => {
  const d = add(mul(A[0][0], A[1][1]), scale(-1, mul(A[0][1], A[1][0])));
  return [[div(A[1][1], d), scale(-1, div(A[0][1], d))], [scale(-1, div(A[1][0], d)), div(A[0][0], d)]];
};
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const realMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const maxErr = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x.re - B[i][j].re, x.im - B[i][j].im))));

const I = [[c(1), c(0)], [c(0), c(1)]];
const H0 = [[-1, 0], [0, 1]];
const W = [[1, 0], [1, 1]];
const Wt = transpose(W);
const Rminus = [[1, 0], [0, 0]];
const Rplus = [[1, 1], [1, 1]];

const poleK = (E) => [
  [1 / (-1 - E) + 1 / (1 - E), 1 / (1 - E)],
  [1 / (1 - E), 1 / (1 - E)],
];

const kFromInternalHamiltonian = (E) => {
  const inverse = [[1 / (-1 - E), 0], [0, 1 / (1 - E)]];
  return realMul(Wt, realMul(inverse, W));
};

const cayley = (K) => {
  const Kc = toC(K);
  const minusI = [[c(0, -1), c(0)], [c(0), c(0, -1)]];
  const plusI = [[c(0, 1), c(0)], [c(0), c(0, 1)]];
  return mmul(madd(Kc, minusI), minv2(madd(Kc, plusI)));
};

const openScattering = (E) => {
  const WWT = realMul(W, Wt);
  const denominator = H0.map((row, i) => row.map((h, j) => c((i === j ? E : 0) - h, WWT[i][j])));
  const correction = mmul(toC(Wt), mmul(minv2(denominator), toC(W)));
  return madd(I, mscale(-2, correction).map((row) => row.map((z) => mul(c(0, 1), z))));
};

const samples = [-2.3, -0.4, 0.2, 1.7];
const checks = samples.map((E) => {
  const K = poleK(E);
  const KHamiltonian = kFromInternalHamiltonian(E);
  assert(maxErr(toC(K), toC(KHamiltonian)) < 1e-12);
  const Sc = cayley(K);
  const Sopen = openScattering(E);
  assert(maxErr(Sc, mscale(-1, Sopen)) < 1e-11);
  assert(maxErr(mmul(mdag(Sopen), Sopen), I) < 1e-11);
  return {
    energy: E,
    reactionMatrix: K,
    cayleyEqualsMinusOpenScatteringError: maxErr(Sc, mscale(-1, Sopen)),
    openScatteringUnitarityError: maxErr(mmul(mdag(Sopen), Sopen), I),
  };
});

console.log(JSON.stringify({
  protocol: "two-port-open-hamiltonian-realization/1",
  internalHamiltonian: H0,
  channelCoupling: W,
  residueFactorization: { Rminus, Rplus },
  reactionMatrix: "K(E)=W^T(H0-EI)^-1W=Rminus/(-1-E)+Rplus/(1-E)",
  physicalScatteringMatrix: "S_open=I-2i W^T(E-H0+iWW^T)^-1W",
  conventionDictionary: "(K-iI)(K+iI)^-1=-S_open; the constant phase -1 leaves Wigner-Smith delay unchanged",
  unresolvedTerm: "The additional E I ultraviolet-slope term in F(E)=E I+K(E) is not produced by this finite internal Hamiltonian and requires an energy-dependent boundary/background realization.",
  checks,
  passed: true,
}, null, 2));

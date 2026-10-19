import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const zero = (r, c = r) => Array.from({ length: r }, () => Array.from({ length: c }, () => C(0)));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(Number(i === j))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const minus = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const plus = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const frob = (A) => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const diagC = (values) => values.map((x, i) => values.map((_, j) => i === j ? x : C(0)));
const diagR = (values) => diagC(values.map((x) => C(x)));
const block2 = (A, B, Cb, D) => {
  const n = A.length;
  const O = zero(2 * n);
  for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    O[i][j] = A[i][j]; O[i][n + j] = B[i][j];
    O[n + i][j] = Cb[i][j]; O[n + i][n + j] = D[i][j];
  }
  return O;
};

const omega = C(-0.5, Math.sqrt(3) / 2);
const omega2 = mul(omega, omega);
const s3 = 1 / Math.sqrt(3);
const UL = [
  [C(s3), C(s3), C(s3)],
  [C(s3), scale(omega, s3), scale(omega2, s3)],
  [C(s3), scale(omega2, s3), scale(omega, s3)]
];
const VR = [
  [C(1 / Math.sqrt(2)), C(1 / Math.sqrt(2)), C(0)],
  [C(-1 / Math.sqrt(2)), C(1 / Math.sqrt(2)), C(0)],
  [C(0), C(0), C(1)]
];
assert(frob(minus(mm(dagger(UL), UL), identity(3))) < 1e-12);
assert(frob(minus(mm(dagger(VR), VR), identity(3))) < 1e-12);

const masses = diagR([1.2, 2.7, 0]);
const M = mm(mm(UL, masses), dagger(VR));
const P = mm(mm(VR, masses), dagger(VR));
const support = diagR([1, 1, 0]);
const QL = mm(mm(UL, support), dagger(UL));
const QR = mm(mm(VR, support), dagger(VR));
const H = block2(zero(3), M, dagger(M), zero(3));
const Z = block2(diagR([-1, -1, -1]), zero(3), zero(3), identity(3));

const extension = (alpha) => {
  const phase = C(Math.cos(alpha), Math.sin(alpha));
  return mm(mm(UL, diagC([C(1), C(1), phase])), dagger(VR));
};
const exchange = (U) => block2(zero(3), U, dagger(U), zero(3));

const alphas = [0, 0.4, 1.7, 3.2];
const exchanges = [];
for (const alpha of alphas) {
  const U = extension(alpha);
  const S = exchange(U);
  exchanges.push(S);
  assert(frob(minus(mm(U, dagger(U)), identity(3))) < 1e-12);
  assert(frob(minus(mm(S, S), identity(6))) < 1e-12);
  assert(frob(plus(mm(S, Z), mm(Z, S))) < 1e-12);
  assert(frob(minus(mm(S, H), mm(H, S))) < 1e-12);
  // Every extension agrees with the unique partial isometry on massive support.
  assert(frob(minus(mm(U, QR), mm(mm(UL, support), dagger(VR)))) < 1e-12);
}
assert(frob(minus(exchanges[0], exchanges[1])) > 1e-3);

// The ambiguity is invisible after support compression.
const support6 = block2(QL, zero(3), zero(3), QR);
assert(frob(minus(mm(mm(support6, exchanges[0]), support6), mm(mm(support6, exchanges[2]), support6))) < 1e-12);

// A nonzero kernel mass fixes the extension phase.
const kernelMass = 0.3;
const selectedAlpha = 0.73;
const fullMasses = diagC([C(1.2), C(2.7), C(kernelMass * Math.cos(selectedAlpha), kernelMass * Math.sin(selectedAlpha))]);
const Mfull = mm(mm(UL, fullMasses), dagger(VR));
const Hfull = block2(zero(3), Mfull, dagger(Mfull), zero(3));
const selectedS = exchange(extension(selectedAlpha));
const wrongS = exchange(extension(selectedAlpha + 0.5));
assert(frob(minus(mm(selectedS, Hfull), mm(Hfull, selectedS))) < 1e-12);
assert(frob(minus(mm(wrongS, Hfull), mm(Hfull, wrongS))) > 1e-3);

console.log(JSON.stringify({
  protocol: "rank-two-neutrino-polar-exchange-has-u1-kernel-ambiguity/1",
  rank: 2,
  kernelDimension: 1,
  extensionFamily: "U_alpha=U_L diag(1,1,e^{i alpha}) V_R^dagger",
  invariantsForEveryAlpha: ["U_alpha unitary", "S_alpha^2=I", "{S_alpha,Z}=0", "[S_alpha,H_rank2]=0"],
  supportRestriction: "all extensions coincide on the massive support",
  liftedKernel: "a nonzero complex kernel mass fixes alpha to its phase",
  punctureComparison: "removing nu^c destroys the exchange pair; retaining nu^c with zero Dirac mass leaves a U(1) exchange ambiguity",
  passed: true
}, null, 2));

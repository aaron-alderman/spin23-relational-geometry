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
const frob = (A) => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const block2 = (A, B, Cb, D) => {
  const r1 = A.length, r2 = Cb.length, c1 = A[0].length, c2 = B[0].length;
  const O = zero(r1 + r2, c1 + c2);
  for (let i = 0; i < r1; i += 1) for (let j = 0; j < c1; j += 1) O[i][j] = A[i][j];
  for (let i = 0; i < r1; i += 1) for (let j = 0; j < c2; j += 1) O[i][c1 + j] = B[i][j];
  for (let i = 0; i < r2; i += 1) for (let j = 0; j < c1; j += 1) O[r1 + i][j] = Cb[i][j];
  for (let i = 0; i < r2; i += 1) for (let j = 0; j < c2; j += 1) O[r1 + i][c1 + j] = D[i][j];
  return O;
};
const diag = (values) => values.map((x, i) => values.map((_, j) => C(i === j ? x : 0)));
const det3 = (A) => {
  const p = (i, j, k) => mul(A[0][i], mul(A[1][j], A[2][k]));
  return add(sub(add(p(0, 1, 2), p(1, 2, 0)), p(2, 1, 0)), sub(p(2, 0, 1), add(p(1, 0, 2), p(0, 2, 1))));
};

// A normalized nontrivial Higgs direction and its charge-conjugate frame.
const hRaw = [C(1, 1), C(2, -1)];
const hNorm = Math.sqrt(hRaw.reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const h = hRaw.map((z) => scale(z, 1 / hNorm));
const hTilde = [conj(h[1]), scale(conj(h[0]), -1)]; // (h2*, -h1*)
const FH = [
  [hTilde[0], h[0]],
  [hTilde[1], h[1]]
];
assert(frob(minus(mm(dagger(FH), FH), identity(2))) < 1e-12);

// Flavor polar unitaries: Uu=I and Ud=DFT_3, which has a nonzero CP phase.
const Uu = identity(3);
const omega = C(-0.5, Math.sqrt(3) / 2);
const omega2 = mul(omega, omega);
const invSqrt3 = 1 / Math.sqrt(3);
const Ud = [
  [C(invSqrt3), C(invSqrt3), C(invSqrt3)],
  [C(invSqrt3), scale(omega, invSqrt3), scale(omega2, invSqrt3)],
  [C(invSqrt3), scale(omega2, invSqrt3), scale(omega, invSqrt3)]
];
assert(frob(minus(mm(dagger(Ud), Ud), identity(3))) < 1e-12);

// D_H maps the six right singlet channels (uR,dR) to Q_L = C^2 weak tensor C^3 flavor.
const D = zero(6);
for (let a = 0; a < 2; a += 1) for (let i = 0; i < 3; i += 1) for (let j = 0; j < 3; j += 1) {
  D[a * 3 + i][j] = mul(hTilde[a], Uu[i][j]);
  D[a * 3 + i][3 + j] = mul(h[a], Ud[i][j]);
}
assert(frob(minus(mm(dagger(D), D), identity(6))) < 1e-12);
assert(frob(minus(mm(D, dagger(D)), identity(6))) < 1e-12);

const Pu = diag([1, 2, 4]);
const Pd = diag([1.5, 3, 5]);
const Pmass = block2(Pu, zero(3), zero(3), Pd);
const M = mm(D, Pmass);
const Hmass = block2(zero(6), M, dagger(M), zero(6));
const Sex = block2(zero(6), D, dagger(D), zero(6));
const Zchir = block2(timesIdentity(6, -1), zero(6), zero(6), identity(6));

function timesIdentity(n, value) {
  return diag(Array(n).fill(value));
}

assert(frob(minus(mm(Sex, Sex), identity(12))) < 1e-12);
assert(frob(minus(mm(Zchir, Zchir), identity(12))) < 1e-12);
assert(frob(mm(Sex, Zchir).map((row, i) => row.map((x, j) => add(x, mm(Zchir, Sex)[i][j])))) < 1e-12);
assert(frob(minus(mm(Sex, Hmass), mm(Hmass, Sex))) < 1e-12);

// A bare exchange using the Higgs frame but no down-sector polar unitary fails.
const Dbare = zero(6);
for (let a = 0; a < 2; a += 1) for (let i = 0; i < 3; i += 1) {
  Dbare[a * 3 + i][i] = hTilde[a];
  Dbare[a * 3 + i][3 + i] = h[a];
}
const Sbare = block2(zero(6), Dbare, dagger(Dbare), zero(6));
assert(frob(minus(mm(Sbare, Hmass), mm(Hmass, Sbare))) > 1e-3);

// Nonzero CKM-type invariant from the same Uu, Ud data.
const Mu = mm(Uu, Pu);
const Md = mm(Ud, Pd);
const Hu = mm(Mu, dagger(Mu));
const Hd = mm(Md, dagger(Md));
const comm = minus(mm(Hu, Hd), mm(Hd, Hu));
const jdet = det3(comm).im;
assert(Math.abs(jdet) > 1e-6);

console.log(JSON.stringify({
  protocol: "higgs-polar-dressed-exchange-preserves-complex-yukawas/1",
  higgsFrame: "D_H=[tilde h tensor Uu, h tensor Ud] is unitary for h nonzero",
  exchange: "S_H=[[0,D_H],[D_H^dagger,0]]",
  pauliRelations: ["S_H^2=I", "Z_chir^2=I", "{S_H,Z_chir}=0"],
  massCovariance: "[S_H,H_mass]=0 for M=D_H P_mass",
  bareExchangeFailureNorm: frob(minus(mm(Sbare, Hmass), mm(Hmass, Sbare))),
  cpOddCommutatorDeterminantImaginaryPart: jdet,
  boundary: "S_H is built from the Higgs direction and Yukawa polar unitaries; it is singular at h=0 and noncanonical for rank-deficient Yukawas",
  passed: true
}, null, 2));

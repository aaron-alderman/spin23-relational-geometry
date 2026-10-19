import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => C(a.re * s, a.im * s);
const zero = (n) => Array.from({ length: n }, () => Array.from({ length: n }, () => C(0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mm = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const minus = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const frob = (A) => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const diag = (values) => values.map((x, i) => values.map((_, j) => i === j ? x : C(0)));
const congruence = (V, D) => mm(mm(V, D), transpose(V));

const m = 2.3;
const root2 = Math.sqrt(2);
const V0 = [
  [C(1 / root2), C(0, 1 / root2)],
  [C(1 / root2), C(0, -1 / root2)]
];
const Ddeg = diag([C(m), C(m)]);
const Mdirac = [[C(0), C(m)], [C(m), C(0)]];
assert(frob(minus(congruence(V0, Ddeg), Mdirac)) < 1e-12);

// Right multiplication by every real O(2) matrix preserves the degenerate Takagi factor.
for (const theta of [0, 0.3, 1.4, 2.8]) {
  const O = [
    [C(Math.cos(theta)), C(-Math.sin(theta))],
    [C(Math.sin(theta)), C(Math.cos(theta))]
  ];
  assert(frob(minus(congruence(mm(V0, O), Ddeg), Mdirac)) < 1e-12);
}

// A zero Takagi singular value has an unrestricted U(1) column phase.
const mu = 1.7;
const Dzero = diag([C(mu), C(0)]);
for (const alpha of [0, 0.5, 1.9, 4.4]) {
  const V = diag([C(1), C(Math.cos(alpha), Math.sin(alpha))]);
  assert(frob(minus(congruence(V, Dzero), Dzero)) < 1e-12);
}

// Lifting the zero mode fixes the Takagi phase modulo sign.
const r = 0.4;
const beta = 1.1;
const target = diag([C(mu), C(r * Math.cos(beta), r * Math.sin(beta))]);
const Vhalf = diag([C(1), C(Math.cos(beta / 2), Math.sin(beta / 2))]);
const VhalfMinus = diag([C(1), C(-Math.cos(beta / 2), -Math.sin(beta / 2))]);
const Vwrong = diag([C(1), C(Math.cos(beta / 2 + 0.2), Math.sin(beta / 2 + 0.2))]);
const Dlift = diag([C(mu), C(r)]);
assert(frob(minus(congruence(Vhalf, Dlift), target)) < 1e-12);
assert(frob(minus(congruence(VhalfMinus, Dlift), target)) < 1e-12);
assert(frob(minus(congruence(Vwrong, Dlift), target)) > 1e-3);

// Face exchange invariance of a symmetric L/R Majorana mass matrix.
const S = [[C(0), C(1)], [C(1), C(0)]];
const invariantResidual = (mL, mD, mR) => {
  const M = [[C(mL), C(mD)], [C(mD), C(mR)]];
  return frob(minus(congruence(S, M), M));
};
assert(invariantResidual(0, 1, 3) > 1e-3); // type-I
assert(invariantResidual(3, 1, 3) < 1e-12); // balanced faces

const MR = 3;
const disc = Math.sqrt(MR * MR + 4);
const signed = [(MR - disc) / 2, (MR + disc) / 2];
const takagiMasses = signed.map(Math.abs);
assert(Math.abs(takagiMasses[0] - takagiMasses[1]) > 1e-3);

console.log(JSON.stringify({
  protocol: "majorana-takagi-lifts-u1-to-sign-and-breaks-face-exchange/1",
  diracLimit: "two equal Takagi singular values with O(2) postfactor freedom; connected SO(2) is lepton-number phase",
  zeroMode: "a zero Takagi column has U(1) phase freedom",
  liftedZeroMode: "nonzero complex Majorana mass fixes half its phase modulo a sign",
  typeIExampleTakagiMasses: takagiMasses,
  exchangeCondition: "S^T M S=M iff m_L=m_R for M=[[m_L,m_D],[m_D,m_R]]",
  typeIExchangeResidual: invariantResidual(0, 1, 3),
  balancedExchangeResidual: invariantResidual(3, 1, 3),
  conclusion: "a conventional right-only Majorana mass lifts Dirac degeneracy but breaks exact face exchange",
  passed: true
}, null, 2));

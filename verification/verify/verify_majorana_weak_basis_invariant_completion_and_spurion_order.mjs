import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const zero = (r, c = r) => Array.from({ length: r }, () => Array.from({ length: c }, () => C(0)));
const identity = (n) => Array.from({ length: n }, (_, i) =>
  Array.from({ length: n }, (_, j) => C(Number(i === j))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const bar = (A) => A.map((row) => row.map(conj));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mm = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((sum, x, k) => add(sum, mul(x, B[k][j])), C(0))));
const trace = (A) => A.reduce((sum, row, i) => add(sum, row[i]), C(0));
const minus = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const frob = (A) => Math.sqrt(A.flat().reduce((sum, z) => sum + z.re ** 2 + z.im ** 2, 0));
const diag = (xs) => xs.map((x, i) => xs.map((_, j) => C(i === j ? x : 0)));

const m = [
  [C(1.2, 0.3), C(0.7, -0.4)],
  [C(0.7, -0.4), C(0.9, 0.8)]
];
const Hl = diag([1.0, 4.0]);
const Hnu = mm(m, dagger(m));
const Glnu = mm(mm(m, bar(Hl)), dagger(m));
const I2 = trace(mm(mm(Hl, Hnu), Glnu)).im;
assert(Math.abs(I2) > 1e-8);

// A generic complex 2x2 unitary weak-basis rotation.
const theta = 0.43, phi = -0.61;
const eiphi = C(Math.cos(phi), Math.sin(phi));
const W = [
  [C(Math.cos(theta)), mul(eiphi, C(Math.sin(theta)))],
  [scale(conj(eiphi), -Math.sin(theta)), C(Math.cos(theta))]
];
assert(frob(minus(mm(dagger(W), W), identity(2))) < 1e-12);

// Weak-basis transformations:
// m -> W^dagger m W^*, Hl -> W^dagger Hl W.
const mp = mm(mm(dagger(W), m), bar(W));
const Hlp = mm(mm(dagger(W), Hl), W);
assert(frob(minus(mp, transpose(mp))) < 1e-12);
const Hnup = mm(mp, dagger(mp));
const Gp = mm(mm(mp, bar(Hlp)), dagger(mp));
const I2p = trace(mm(mm(Hlp, Hnup), Gp)).im;
assert(Math.abs(I2p - I2) < 1e-10);

// CP-conserving real data give zero.
const mr = [[C(1.2), C(0.7)], [C(0.7), C(0.9)]];
const Hnur = mm(mr, dagger(mr));
const Gr = mm(mm(mr, bar(Hl)), dagger(mr));
const I2real = trace(mm(mm(Hl, Hnur), Gr)).im;
assert(Math.abs(I2real) < 1e-12);

console.log(JSON.stringify({
  protocol: "majorana-weak-basis-invariant-completion/1",
  definitions: {
    Hl: "M_l M_l^dagger",
    Hnu: "m_nu m_nu^dagger",
    Glnu: "m_nu Hl^* m_nu^dagger",
    I2: "Im Tr(Hl Hnu Glnu)"
  },
  weakBasisTransformation: {
    mnu: "W^dagger mnu W^*",
    Hl: "W^dagger Hl W"
  },
  originalValue: I2,
  rotatedValue: I2p,
  invariantDifference: I2p - I2,
  realCpConservingValue: I2real,
  massDimensionAfterEwsb: 8,
  spurionOrder: "quartic in m_nu and quartic in charged-lepton Yukawa/mass insertions",
  consequence: "a basis-independent Majorana odd response coefficient requires charged-lepton as well as neutrino data and is higher spurion order than the fixed-basis pair invariant",
  passed: true
}, null, 2));

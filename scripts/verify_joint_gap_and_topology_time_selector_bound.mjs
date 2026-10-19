import assert from "node:assert/strict";

const C = (re, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const sub = (a, b) => C(a.re - b.re, a.im - b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const div = (a, b) => {
  const d = b.re * b.re + b.im * b.im;
  return C((a.re * b.re + a.im * b.im) / d, (a.im * b.re - a.re * b.im) / d);
};
const conj = (a) => C(a.re, -a.im);
const scale = (a, s) => C(a.re * s, a.im * s);
const plus = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const minus = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const times = (A, s) => A.map((row) => row.map((x) => scale(x, s)));
const conjugate = (A) => A.map((row) => row.map(conj));
const frob = (A) => Math.sqrt(A.flat().reduce((s, z) => s + z.re * z.re + z.im * z.im, 0));
const inv2 = (A) => {
  const det = sub(mul(A[0][0], A[1][1]), mul(A[0][1], A[1][0]));
  return [
    [div(A[1][1], det), div(scale(A[0][1], -1), det)],
    [div(scale(A[1][0], -1), det), div(A[0][0], det)]
  ];
};
const outer = (w) => w.map((x) => w.map((y) => mul(x, conj(y))));
const identity2 = [[C(1), C(0)], [C(0), C(1)]];
const diagBlocks = (A, B) => [
  [A[0][0], A[0][1], C(0), C(0)],
  [A[1][0], A[1][1], C(0), C(0)],
  [C(0), C(0), B[0][0], B[0][1]],
  [C(0), C(0), B[1][0], B[1][1]]
];
const blockFiniteTopology = (A, B, decay) => {
  const mean = times(plus(A, B), 0.5);
  const diff = times(minus(A, B), 0.5 * decay);
  return diagBlocks(plus(mean, diff), minus(mean, diff));
};
const blockAsymptotic = (A, B) => {
  const mean = times(plus(A, B), 0.5);
  return diagBlocks(mean, mean);
};

const H2 = [
  [C(0.4), C(0.2, 0.3)],
  [C(0.2, -0.3), C(-0.1)]
];
const w = [C(0.5, 0.1), C(-0.2, 0.4)];
const z = 1.3;
const gammaX = 0.65;
const A0 = minus(times(identity2, z), H2);
const R0 = inv2(A0);

const checks = [];
for (const Delta of [8, 16, 32, 64]) {
  const Sigma = times(outer(w), 1 / (z - Delta));
  const RDelta = inv2(minus(A0, Sigma));
  const alpha = frob(R0) * frob(Sigma);
  assert(alpha < 1);
  const gapBound = frob(R0) * frob(R0) * frob(Sigma) / (1 - alpha);
  const actualGap = frob(minus(RDelta, R0));
  assert(actualGap <= gapBound + 1e-12);

  for (const t of [0.5, 1, 2, 4]) {
    const decay = Math.exp(-2 * gammaX * t);
    const dynamic = blockFiniteTopology(RDelta, conjugate(RDelta), decay);
    const target = blockAsymptotic(R0, conjugate(R0));
    const actualJoint = frob(minus(dynamic, target));
    const ImR0 = R0.map((row) => row.map((v) => C(0, v.im)));
    const topologyBound = Math.sqrt(2) * decay * frob(ImR0);
    const totalBound = Math.sqrt(2) * gapBound + topologyBound;
    assert(actualJoint <= totalBound + 1e-12);
    checks.push({ Delta, t, actualGap, gapBound, actualJoint, topologyBound, totalBound });
  }
}

// Increasing either control parameter cannot increase its own analytic term.
for (const t of [0.5, 1, 2, 4]) {
  const rows = checks.filter((x) => x.t === t);
  for (let i = 1; i < rows.length; i += 1) assert(rows[i].gapBound < rows[i - 1].gapBound);
}
for (const Delta of [8, 16, 32, 64]) {
  const rows = checks.filter((x) => x.Delta === Delta);
  for (let i = 1; i < rows.length; i += 1) assert(rows[i].topologyBound < rows[i - 1].topologyBound);
}

console.log(JSON.stringify({
  protocol: "joint-gap-and-topology-time-selector-bound/1",
  gapTerm: "sqrt(2)*||R0||_F^2 ||Sigma_Delta||_F/(1-||R0||_F||Sigma_Delta||_F)",
  topologyTerm: "sqrt(2)*exp(-2 gammaX t)*||Im R0||_F",
  pairingTerm: "add epsilon_pair for imperfect conjugate-pair preparation",
  totalBound: "epsilon_pair + gapTerm + topologyTerm",
  assumptions: [
    "spectral point is away from the heavy pole",
    "||R0||_F ||Sigma_Delta||_F < 1",
    "topology generator acts independently of the carrier gap",
    "input blocks are conjugate paired up to epsilon_pair"
  ],
  checks: checks.length,
  sample: checks.at(-1),
  passed: true
}, null, 2));

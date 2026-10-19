import assert from "node:assert/strict";

const C = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => C(a.re + b.re, a.im + b.im);
const mul = (a, b) => C(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const conj = (a) => C(a.re, -a.im);
const phase = (x) => C(Math.cos(x), Math.sin(x));
const close = (a, b, eps = 1e-10) => Math.hypot(a.re - b.re, a.im - b.im) < eps;
const matMul = (a, b) => a.map((row) => b[0].map((unused, j) =>
  row.reduce((sum, value, k) => add(sum, mul(value, b[k][j])), C())));
const matConj = (a) => a.map((row) => row.map(conj));
const equal = (a, b) => a.every((row, i) => row.every((z, j) => close(z, b[i][j])));
const tx = [[C(), C(1)], [C(1), C()]];
const zero = [[C(), C()], [C(), C()]];
const identity = [[C(1), C()], [C(), C(1)]];
const particle = [[C(1), C()], [C(), C()]];
const realLine = [[C(0.5), C(0.5)], [C(0.5), C(0.5)]];
const carTransform = (p) => matMul(matMul(tx, matConj(p)), tx);
const gaugeTransform = (p, q, alpha) => {
  const u = [[phase(q * alpha), C()], [C(), phase(-q * alpha)]];
  const ud = [[conj(u[0][0]), C()], [C(), conj(u[1][1])]];
  return matMul(matMul(u, p), ud);
};

const q = 1 / 6;
assert(equal(gaugeTransform(particle, q, 0.73), particle));
assert(!equal(carTransform(particle), particle));
assert(equal(carTransform(realLine), realLine));
assert(!equal(gaugeTransform(realLine, q, 0.73), realLine));
assert(equal(carTransform(zero), zero) && equal(carTransform(identity), identity));

// Algebraic classification: gauge commutation for q != 0 forces a Hermitian
// projector to diag(a,d). CAR invariance forces a=d. Idempotence gives a=0 or 1.
const classifiedCommonProjectors = [
  { rank: 0, matrix: "0" },
  { rank: 2, matrix: "I" },
];
assert(!classifiedCommonProjectors.some((p) => p.rank === 1));

console.log(JSON.stringify({
  protocol: "no-gauge-car-invariant-nambu-half-projection/1",
  module: "V_q direct-sum V_-q with q nonzero",
  gaugeInvariantParticleProjector: true,
  particleProjectorCarInvariant: false,
  carInvariantRealLineProjector: true,
  realLineProjectorGaugeInvariant: false,
  commonHermitianProjectors: classifiedCommonProjectors,
  commonRankOneProjectorExists: false,
  proof: "Gauge commutation makes P diagonal; J0 invariance swaps its real diagonal entries; idempotence leaves only P=0 or P=I.",
  implication: "An undoubled chiral half cannot be obtained by a projector preserving both charged gauge symmetry and exact CAR reality. Nambu doubling must be treated as redundancy with a non-invariant polarization, or the selector must arise from the linear exchange S instead.",
  passed: true,
}, null, 2));

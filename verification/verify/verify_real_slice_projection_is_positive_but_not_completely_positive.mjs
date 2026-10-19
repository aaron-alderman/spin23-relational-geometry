import assert from "node:assert/strict";

const realSlice = (X) => [
  [X[0][0].re, X[0][1].re],
  [X[1][0].re, X[1][1].re],
];
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];

const positiveHermitianSamples = [
  [[{ re: 2, im: 0 }, { re: 0.4, im: 0.8 }], [{ re: 0.4, im: -0.8 }, { re: 1, im: 0 }]],
  [[{ re: 1, im: 0 }, { re: 0, im: 1 }], [{ re: 0, im: -1 }, { re: 1, im: 0 }]],
  [[{ re: 3, im: 0 }, { re: -1, im: 0.2 }], [{ re: -1, im: -0.2 }, { re: 2, im: 0 }]],
];
for (const X of positiveHermitianSamples) {
  const complexDet = X[0][0].re * X[1][1].re - (X[0][1].re ** 2 + X[0][1].im ** 2);
  assert(complexDet >= -1e-12);
  const E = realSlice(X);
  assert(E[0][0] >= -1e-12 && det2(E) >= -1e-12);
}

// Choi matrices in the ordered basis |00>,|01>,|10>,|11>.
// C_id=|Omega><Omega|, C_transpose=F (the swap).
const Cid = [
  [1, 0, 0, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [1, 0, 0, 1],
];
const Fswap = [
  [1, 0, 0, 0],
  [0, 0, 1, 0],
  [0, 1, 0, 0],
  [0, 0, 0, 1],
];
const antisymmetric = [0, 1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
const quadratic = (v, A) => v.reduce((s, x, i) => s + x * A[i].reduce((t, a, j) => t + a * v[j], 0), 0);
assert(Math.abs(quadratic(antisymmetric, Cid)) < 1e-12);
assert(Math.abs(quadratic(antisymmetric, Fswap) + 1) < 1e-12);

const ps = [0.01, 0.25, 0.5, 1];
const witnesses = ps.map((p) => {
  const Choi = Cid.map((row, i) => row.map((x, j) => (1 - p) * x + p * Fswap[i][j]));
  const expectation = quadratic(antisymmetric, Choi);
  assert(expectation < 0);
  assert(Math.abs(expectation + p) < 1e-12);
  return { transposeWeight: p, antisymmetricChoiExpectation: expectation, completelyPositive: false };
});

console.log(JSON.stringify({
  protocol: "real-slice-projection-is-positive-but-not-completely-positive/1",
  selector: "E(X)=(X+X^T)/2 on Hermitian 2x2 matrices, equivalently entrywise real part",
  positiveOnH2C: true,
  idempotentOntoH2R: true,
  choiWitness: "|psi_->=(|01>-|10>)/sqrt(2)",
  mixtures: witnesses,
  theorem: "For Phi_p=(1-p)id+p transpose, <psi_-|C(Phi_p)|psi_->=-p. Every p>0 fails complete positivity.",
  consequence: "Real-slice selection is a valid positive Jordan projection but cannot be an ordinary deterministic complex-quantum channel, even with arbitrarily weak transpose averaging.",
  passed: true,
}, null, 2));

import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const approx = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const approxM = (A, B) => A.every((row, i) => row.every((x, j) => approx(x, B[i][j])));
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const I = [[1, 0], [0, 1]];

// A general real symmetric quadratic response metric/counterterm.
const invariantUnder = (K, S) => approxM(mm(mm(tr(S), K), S), K);
const samples = [];
for (let a = -2; a <= 2; a++) for (let b = -2; b <= 2; b++) for (let c = -2; c <= 2; c++) {
  const K = [[a, b], [b, c]];
  if (invariantUnder(K, D) && invariantUnder(K, X)) samples.push(K);
}
assert.ok(samples.every(K => K[0][1] === 0 && K[0][0] === K[1][1]));

// Symbolically: D invariance kills b; X invariance equates a and c.
const a = 1.7, b = -0.4, c = 0.9;
const K = [[a, b], [b, c]];
const DKD = mm(mm(tr(D), K), D);
const XKX = mm(mm(tr(X), K), X);
assert.ok(approx(DKD[0][1], -b));
assert.ok(approx(XKX[0][0], c));
assert.ok(approx(XKX[1][1], a));

const k = 2.3;
const scalarK = I.map(row => row.map(x => k * x));
assert.ok(invariantUnder(scalarK, D));
assert.ok(invariantUnder(scalarK, X));

// Unequal D-invariant wavefunction factors deform the canonical mediator
// angle; the additional X symmetry removes this deformation.
const normalizedSlope = (zL, zQ) => Math.sqrt(zL / zQ) * Math.sqrt(3);
assert.ok(!approx(normalizedSlope(1, 2), Math.sqrt(3)));
assert.ok(approx(normalizedSlope(k, k), Math.sqrt(3)));

// The two involutions generate the full real 2x2 matrix algebra: their
// simultaneous linear commutant is scalar. Verify on a general matrix by a
// bounded exact census.
const commute = (M, S) => approxM(mm(M, S), mm(S, M));
const commutant = [];
for (let p = -2; p <= 2; p++) for (let q = -2; q <= 2; q++)
for (let r = -2; r <= 2; r++) for (let s = -2; s <= 2; s++) {
  const M = [[p, q], [r, s]];
  if (commute(M, D) && commute(M, X)) commutant.push(M);
}
assert.ok(commutant.every(M => M[0][1] === 0 && M[1][0] === 0 && M[0][0] === M[1][1]));

console.log(JSON.stringify({
  protocol: 'crossed-grading-response-metric-rigidity/1',
  generators: { hChiSign: D, channelExchange: X, relation: 'DX = -XD' },
  symmetricCounterterm: {
    general: 'K = [[a,b],[b,c]]',
    DInvariance: 'b = 0',
    XInvariance: 'a = c',
    jointResult: 'K = k I',
  },
  fullLinearCommutant: 'R times I',
  mediatorGeometry: {
    unequalResidues: 'slope sqrt(3) becomes sqrt(zL/zQ)*sqrt(3)',
    jointSymmetry: 'zL=zQ, so the A2 angle is unchanged',
  },
  qualification: 'This is a conditional protection theorem. The corpus has the two algebraic involutions, but a microscopic defect theory must still prove that both constrain its counterterms.',
  passed: true,
}, null, 2));

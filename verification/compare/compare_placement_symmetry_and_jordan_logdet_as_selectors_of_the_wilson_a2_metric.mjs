import assert from 'node:assert/strict';

const tol = 1e-12;
const A = [[0, -1], [1, -1]];
const transpose = (X) => X[0].map((_, j) => X.map((row) => row[j]));
const mm = (X, Y) => X.map((row) => Y[0].map((_, j) =>
  row.reduce((s, x, k) => s + x * Y[k][j], 0)));
const sub = (X, Y) => X.map((row, i) => row.map((x, j) => x - Y[i][j]));
const scale = (s, X) => X.map((row) => row.map((x) => s * x));
const frob2 = (X) => X.flat().reduce((s, x) => s + x * x, 0);
const det2 = (X) => X[0][0] * X[1][1] - X[0][1] * X[1][0];
const trace = (X) => X[0][0] + X[1][1];
const metric = (r) => [[1 + r, -r], [-r, 1 + r]];
const quad = (x, K) => x.reduce((s, a, i) =>
  s + a * K[i].reduce((t, b, j) => t + b * x[j], 0), 0);
const rays = [[1, 0], [0, 1], [1, 1]];

for (const r of [0, 0.25, 1, 3]) {
  const K = metric(r);
  const defect = sub(mm(mm(transpose(A), K), A), K);
  assert(Math.abs(frob2(defect) - 3 * (r - 1) ** 2) < tol);

  const norms = rays.map((x) => quad(x, K));
  const mean = norms.reduce((x, y) => x + y, 0) / 3;
  const variance = norms.reduce((s, x) => s + (x - mean) ** 2, 0);
  assert(Math.abs(variance - (2 / 3) * (r - 1) ** 2) < tol);

  // Normalize trace before comparing determinant/entropy-like isotropy.
  const Kh = scale(1 / trace(K), K);
  const normalizedDet = det2(Kh);
  const expected = (1 + 2 * r) / (4 * (1 + r) ** 2);
  assert(Math.abs(normalizedDet - expected) < tol);
}

const Kstar = metric(1);
assert(frob2(sub(mm(mm(transpose(A), Kstar), A), Kstar)) < tol);

// The trace-normalized determinant decreases strictly for r>0:
// d log(det Khat)/dr = -2r/[(1+2r)(1+r)].
const logDetDerivative = (r) => -2 * r / ((1 + 2 * r) * (1 + r));
assert(logDetDerivative(0) === 0);
for (const r of [0.1, 0.5, 1, 5]) assert(logDetDerivative(r) < 0);
const normalizedDetAtZero = det2(scale(1 / trace(metric(0)), metric(0)));
const normalizedDetAtA2 = det2(scale(1 / trace(Kstar), Kstar));
assert(normalizedDetAtZero > normalizedDetAtA2);
assert(Math.abs(normalizedDetAtZero - 1 / 4) < tol);
assert(Math.abs(normalizedDetAtA2 - 3 / 16) < tol);

console.log(JSON.stringify({
  protocol: 'placement-symmetry-versus-jordan-logdet-wilson-a2-metric-selector/1',
  metricFamily: 'K(r)=[[1+r,-r],[-r,1+r]], r=kappa/m^2 >= 0',
  placementCycle: A,
  successfulSelectors: {
    covarianceDefect: '||A^T K(r) A-K(r)||_F^2=3(r-1)^2',
    rayNormVariance: 'sum_i(||q_i||_K^2-mean)^2=(2/3)(r-1)^2 for q_i=e1,e2,e1+e2',
    uniqueMinimum: 'r=1',
    interpretation: 'exact projective C3 covariance, equivalently equal weighting of the three Wilson relationship rays',
  },
  failedGenericSelector: {
    traceNormalizedDeterminant: 'det(K/tr K)=(1+2r)/[4(1+r)^2]',
    logarithmicDerivative: '-2r/[(1+2r)(1+r)]',
    maximum: 'r=0',
    values: { r0: normalizedDetAtZero, r1: normalizedDetAtA2 },
    verdict: 'a generic trace-normalized log-det/Jordan isotropy principle selects the unmixed metric, not the A2 point',
  },
  physicalBoundary: 'placement C3 or equal-ray weighting must be derived as a symmetry/dynamical term in the mediator action; adding the defect potential by hand only restates the desired geometry',
  passed: true,
}, null, 2));

import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const zero = (m, n = m) => Array.from({ length: m }, () => Array(n).fill(0));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map(row => row.map(x => a * x));
const eq = (A, B, eps = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const pow = (A, n) => { let X = I(A.length); for (let i = 0; i < n; i++) X = mm(X, A); return X; };

// Rows are the cyclically ordered completed mediator roots.
const M = [[1, rt3], [-2, 0], [1, -rt3]];
const J3 = Array.from({ length: 3 }, () => Array(3).fill(1));
const Pstd = add(I(3), scale(-1 / 3, J3));
assert.ok(eq(mm(tr(M), M), scale(6, I(2))));
assert.ok(eq(mm(M, tr(M)), scale(6, Pstd)));

// An isotropic active-plane Gaussian z with covariance I/6 pushes forward
// under y=M z to standard-plane covariance Pstd.
const Covz = scale(1 / 6, I(2));
const Covy = mm(mm(M, Covz), tr(M));
assert.ok(eq(Covy, Pstd));

// Rebuild the whitened handle frame and verify that this pushed covariance
// produces the exact class-sum channel on every matrix basis element.
const R = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, -1]];
const H = [[0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1], [0, 0, 1, 0]];
const R2 = pow(R, 2), handles = [H, mm(mm(R, H), R2), mm(mm(R2, H), R)];
const rs = Math.sqrt(2 / 3), rl = Math.sqrt(2), d = (rs + rl) / 2, o = (rs - rl) / 2;
const L = zero(4), Li = zero(4);
const is = (1 / rs + 1 / rl) / 2, io = (1 / rs - 1 / rl) / 2;
for (const [a, b] of [[0, 2], [1, 3]]) {
  L[a][a] = L[b][b] = d; L[a][b] = L[b][a] = o;
  Li[a][a] = Li[b][b] = is; Li[a][b] = Li[b][a] = io;
}
const O = handles.map(K => mm(mm(L, K), Li));
assert.ok(eq(O.reduce(add, zero(4)), zero(4)));

const fromMediatorCovariance = X => {
  let out = zero(4);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) {
    out = add(out, scale(Covy[i][j] / 3, mm(mm(O[i], X), tr(O[j]))));
  }
  return out;
};
const classSum = X => scale(1 / 3, O.map(K => mm(mm(K, X), tr(K))).reduce(add, zero(4)));
for (let a = 0; a < 4; a++) for (let b = 0; b < 4; b++) {
  const E = zero(4); E[a][b] = 1;
  assert.ok(eq(fromMediatorCovariance(E), classSum(E)));
}

console.log(JSON.stringify({
  protocol: 'mediator-root-gaussian-to-handle-class-sum/1',
  mediatorSynthesisMatrix: M,
  tightFrameIdentities: { frameOperator: 'M^T M = 6 I2', labelGram: 'M M^T = 6 Pstd' },
  gaussianPushforward: { activeCovariance: Covz, labelCovariance: Covy, verdict: 'exactly Pstd' },
  carrierChannel: {
    formula: '(1/3) sum_ij Covy_ij O_i (.) O_j^T',
    equals: '(1/3) sum_i O_i (.) O_i^T',
    checkedOnAll16MatrixUnits: true,
  },
  consequence: 'The completed mediator root orbit supplies the exact Gaussian label covariance needed by the established handle class-sum channel; no additional covariance fit is required.',
  physicalBoundary: 'One must still derive an isotropic mediator-plane Gaussian and identify the mediator cyclic labels with handle conjugacy labels. For the canonical fully traced middle-frame route, document 922 closes the quadratic color-contraction gate; noncanonical or partially observed color vertices remain separate.',
  passed: true,
}, null, 2));

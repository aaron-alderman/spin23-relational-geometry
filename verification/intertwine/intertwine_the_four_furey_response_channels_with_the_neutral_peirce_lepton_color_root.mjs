import assert from 'node:assert/strict';

const mm = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const eye = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => +(i === j)));
const scale = (s, A) => A.map((r) => r.map((x) => s * x));
const eq = (A, B, tol = 1e-12) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < tol));
const blockDiag = (A, B) => {
  const n = A.length, p = A[0].length, m = B.length, q = B[0].length;
  return Array.from({ length: n + m }, (_, i) => Array.from({ length: p + q }, (_, j) => {
    if (i < n && j < p) return A[i][j];
    if (i >= n && j >= p) return B[i - n][j - p];
    return 0;
  }));
};

const s2 = Math.sqrt(2);
// Atomic order: (u, nu, d, e). Aggregate order: (L, Q).
const A = [[0, 1 / s2, 0, 1 / s2], [1 / s2, 0, 1 / s2, 0]];
const p = [[1, 0, 0, 0], [0, -1, 0, 0], [0, 0, 1, 0], [0, 0, 0, -1]];
const FC = [[0, 0, 0, 1], [0, 0, 1, 0], [0, 1, 0, 0], [1, 0, 0, 0]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const epsilon = mm(D, X);
const minusD = scale(-1, D);
assert.ok(eq(mm(A, transpose(A)), eye(2)));
assert.ok(eq(mm(A, p), mm(minusD, A)));
assert.ok(eq(mm(A, FC), mm(X, A)));
assert.ok(eq(mm(A, mm(FC, p)), mm(epsilon, A)));
assert.ok(eq(mm(FC, p), scale(-1, mm(p, FC))));
assert.ok(eq(mm(mm(FC, p), mm(FC, p)), scale(-1, eye(4))));

// Realification of antiunitary M K is diag(M,-M).
const sourceGammaR = blockDiag(mm(FC, p), scale(-1, mm(FC, p)));
const targetGammaR = blockDiag(epsilon, scale(-1, epsilon));
const realA = blockDiag(A, A);
assert.ok(eq(mm(realA, sourceGammaR), mm(targetGammaR, realA)));
assert.ok(eq(mm(sourceGammaR, sourceGammaR), scale(-1, eye(8))));
assert.ok(eq(mm(targetGammaR, targetGammaR), scale(-1, eye(4))));

// The aggregate projection is reducing for p, FC and their coherent product.
const Pagg = mm(transpose(A), A);
assert.ok(eq(mm(Pagg, p), mm(p, Pagg)));
assert.ok(eq(mm(Pagg, FC), mm(FC, Pagg)));

// Under sector-symmetric support and normalized rows, only four sign choices exist;
// requiring FC to descend as +X leaves one common overall sign.
const candidates = [];
for (const sl of [-1, 1]) for (const sq of [-1, 1]) {
  const C = [[0, sl / s2, 0, sl / s2], [sq / s2, 0, sq / s2, 0]];
  const exchangeIsPositiveX = eq(mm(C, FC), mm(X, C));
  candidates.push({ leptonSign: sl, quarkSign: sq, exchangeIsPositiveX });
}
assert.equal(candidates.filter((x) => x.exchangeIsPositiveX).length, 2);

console.log(JSON.stringify({
  protocol: 'four-furey-response-channels-to-peirce-lepton-color-root/1',
  atomicOrder: ['u', 'nu', 'd', 'e'],
  aggregateOrder: ['L', 'Q'],
  intertwiners: { productGrading: 'A p = (-D) A', channelTranslation: 'A F_C = X A', coherentAntiunitary: 'A (F_C p K) = (epsilon K) A' },
  squares: { sourceAntiunitary: '-I4 complex carrier', targetAntiunitary: '-I2 complex aggregate' },
  reducingProjection: true,
  uniqueness: 'sector-symmetric normalized aggregation plus positive-X covariance fixes A up to one common sign',
  candidates,
  boundary: 'This closes the response-channel intertwiner. Identifying the aggregate complex coordinate with the neutral D-E Peirce line and deriving the operation from a microscopic action remain open.',
  passed: true,
}, null, 2));

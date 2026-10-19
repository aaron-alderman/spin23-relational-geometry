import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const eq = (A, B, eps = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const inverse = A => {
  const n = A.length, M = A.map((row, i) => [...row, ...I(n)[i]]);
  for (let c = 0; c < n; c++) {
    let p = c; while (p < n && Math.abs(M[p][c]) < 1e-12) p++;
    assert.ok(p < n); [M[c], M[p]] = [M[p], M[c]];
    const d = M[c][c]; M[c] = M[c].map(x => x / d);
    for (let i = 0; i < n; i++) if (i !== c) {
      const f = M[i][c]; M[i] = M[i].map((x, j) => x - f * M[c][j]);
    }
  }
  return M.map(row => row.slice(n));
};
const choleskyLower = A => {
  const n = A.length, L = Array.from({ length: n }, () => Array(n).fill(0));
  for (let i = 0; i < n; i++) for (let j = 0; j <= i; j++) {
    let sum = A[i][j];
    for (let k = 0; k < j; k++) sum -= L[i][k] * L[j][k];
    L[i][j] = i === j ? Math.sqrt(sum) : sum / L[j][j];
  }
  return L;
};

const H = [[0, 0, 1, 1], [0, 0, 0, -1], [1, 1, 0, 0], [0, -1, 0, 0]];
const G0 = [[2, -1, 0, 0], [-1, 2, 0, 0], [0, 0, 2, 3], [0, 0, 3, 6]];
assert.ok(eq(mm(H, H), I(4)));
assert.ok(eq(mm(mm(tr(H), G0), H), G0));
assert.ok(eq(mm(tr(H), G0), mm(G0, H))); // G-self-adjoint.

// G0=L^T L using the transpose of the usual lower Cholesky factor.
const lower = choleskyLower(G0);
const L = tr(lower), Linv = inverse(L);
assert.ok(eq(mm(tr(L), L), G0));
const O = mm(mm(L, H), Linv);
assert.ok(eq(mm(tr(O), O), I(4)));
assert.ok(eq(O, tr(O)));
assert.ok(eq(mm(O, O), I(4)));

// Projector ranks from traces: H has two +1 and two -1 eigenvalues.
const traceH = H.reduce((s, row, i) => s + row[i], 0);
assert.equal(traceH, 0);
const rankPlus = (4 + traceH) / 2, rankMinus = (4 - traceH) / 2;
assert.equal(rankPlus, 2); assert.equal(rankMinus, 2);

console.log(JSON.stringify({
  protocol: 'full-handle-constant-rational-inner-feedthrough/1',
  transfer: 'S(z)=H',
  analytic: 'entire constant matrix; no finite poles',
  realTime: 'H is real, so S(-omega)=conjugate(S(omega))',
  generalizedLosslessness: 'H^T G0 H = G0',
  generalizedReciprocity: 'H^T G0 = G0 H',
  powerNormalizedTransfer: O,
  normalizedProperties: { orthogonal: true, symmetric: true, involutive: true, plusRank: rankPlus, minusRank: rankMinus },
  interpretation: 'a zero-memory reciprocal lossless boundary feedthrough realizing the primitive Lagrangian graph of H',
  qualification: 'This closes causal effective transfer realization. It does not derive which microscopic Standard-Model boundary imposes H or the physical kinetic metric G0.',
  passed: true,
}, null, 2));

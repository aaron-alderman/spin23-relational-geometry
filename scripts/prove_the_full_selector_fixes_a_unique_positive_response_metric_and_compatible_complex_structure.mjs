import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const block = (A, B, C, D) => A.map((row, i) => [...row, ...B[i]]).concat(C.map((row, i) => [...row, ...D[i]]));
const zero = (m, n) => Array.from({ length: m }, () => Array(n).fill(0));
const I = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const eq = (A, B, eps = 1e-10) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < eps));
const det = M => M.length === 1 ? M[0][0] : M[0].reduce((sum, x, j) => {
  const minor = M.slice(1).map(row => row.filter((_, k) => k !== j));
  return sum + (j % 2 ? -1 : 1) * x * det(minor);
}, 0);
const inverse = A => {
  const n = A.length;
  const M = A.map((row, i) => [...row, ...I(n)[i]]);
  for (let c = 0; c < n; c++) {
    let p = c;
    while (p < n && Math.abs(M[p][c]) < 1e-12) p++;
    assert.ok(p < n);
    [M[c], M[p]] = [M[p], M[c]];
    const pivot = M[c][c];
    M[c] = M[c].map(x => x / pivot);
    for (let i = 0; i < n; i++) if (i !== c) {
      const factor = M[i][c];
      M[i] = M[i].map((x, j) => x - factor * M[c][j]);
    }
  }
  return M.map(row => row.slice(n));
};
const rank = A => {
  const M = A.map(row => row.slice());
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let p = r;
    while (p < M.length && Math.abs(M[p][c]) < 1e-10) p++;
    if (p === M.length) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const pivot = M[r][c];
    M[r] = M[r].map(x => x / pivot);
    for (let i = 0; i < M.length; i++) if (i !== r) {
      const factor = M[i][c];
      M[i] = M[i].map((x, j) => x - factor * M[r][j]);
    }
    r++;
  }
  return r;
};

const eps = [[0, 1], [-1, 0]];
const J = block(eps, zero(2, 2), zero(2, 2), eps.map(row => row.map(x => -x)));
const A = [[1, 3], [-1, -2]];
const X = [[1, 1], [0, -1]];
const R = block(I(2), zero(2, 2), zero(2, 2), A);
const H = block(zero(2, 2), X, X, zero(2, 2));
const G0 = [
  [2, -1, 0, 0],
  [-1, 2, 0, 0],
  [0, 0, 2, 3],
  [0, 0, 3, 6],
];
assert.ok(eq(mm(mm(tr(R), G0), R), G0));
assert.ok(eq(mm(mm(tr(H), G0), H), G0));
const leadingMinors = [1, 2, 3, 4].map(n => det(G0.slice(0, n).map(row => row.slice(0, n))));
assert.deepEqual(leadingMinors, [2, 3, 6, 9]);

// Compute the dimension of invariant symmetric forms.
const symmetricBasis = [];
for (let i = 0; i < 4; i++) for (let j = i; j < 4; j++) {
  const E = zero(4, 4);
  E[i][j] = 1;
  E[j][i] = 1;
  symmetricBasis.push(E);
}
const equations = [];
for (const S of [R, H]) for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
  equations.push(symmetricBasis.map(E => mm(mm(tr(S), E), S)[i][j] - E[i][j]));
}
const constraintRank = rank(equations);
assert.equal(symmetricBasis.length - constraintRank, 1);

// Compatible complex structure: C=sqrt(3) G^-1 J has C^2=-I.
const K = mm(inverse(G0), J);
const K2scaled = mm(K, K).map(row => row.map(x => 3 * x));
assert.ok(eq(K2scaled, I(4).map(row => row.map(x => -x))));
assert.ok(eq(mm(R, K), mm(K, R)));
assert.ok(eq(mm(H, K), mm(K, H)));

console.log(JSON.stringify({
  protocol: 'unique-selector-invariant-positive-metric/1',
  primitiveMetric: G0,
  leadingPrincipalMinors: leadingMinors,
  determinant: det(G0),
  invariantSymmetricFormSpace: { ambientDimension: symmetricBasis.length, constraintRank, dimension: 1 },
  relativeNormalization: 'fixed by R and H; only a common positive scale remains',
  compatibleComplexStructure: {
    definition: 'C = sqrt(3) G0^{-1} J',
    square: '-I',
    commutesWithR: true,
    commutesWithH: true,
    consequence: 'the finite selector lies in the compact U(2)-type subgroup determined by (J,G0)',
  },
  qualification: 'Uniqueness is conditional on exact full-selector invariance of the physical quadratic response. It does not derive that invariance from Standard-Model dynamics.',
  passed: true,
}, null, 2));

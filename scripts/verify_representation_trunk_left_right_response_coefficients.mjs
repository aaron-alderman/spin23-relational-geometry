import assert from 'node:assert/strict';

const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const zeroMatrix = (n) => Array.from({ length: n }, () => Array(n).fill(0));

const rank = (input) => {
  const A = input.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < (A[0]?.length ?? 0) && r < A.length; c += 1) {
    const p = A.findIndex((row, i) => i >= r && Math.abs(row[c]) > 1e-10);
    if (p < 0) continue;
    [A[r], A[p]] = [A[p], A[r]];
    const q = A[r][c];
    for (let j = c; j < A[r].length; j += 1) A[r][j] /= q;
    for (let i = 0; i < A.length; i += 1) if (i !== r && Math.abs(A[i][c]) > 1e-10) {
      const f = A[i][c];
      for (let j = c; j < A[i].length; j += 1) A[i][j] -= f * A[r][j];
    }
    r += 1;
  }
  return r;
};

const E = [[0, 1], [0, 0]];
const F = [[0, 0], [1, 0]];
const H = [[1, 0], [0, -1]];
const J = [[0, 1], [-1, 0]];
const embed = (A, offset) => {
  const X = zeroMatrix(4);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) X[i + offset][j + offset] = A[i][j];
  return X;
};
const generators = [E, F, H].flatMap((X) => [embed(X, 0), embed(X, 2)]);

// Coordinates on all alternating 4x4 forms.
const pairs = [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]];
const basis = pairs.map(([i, j]) => {
  const K = zeroMatrix(4); K[i][j] = 1; K[j][i] = -1; return K;
});
const constraintRows = (tests) => {
  const rows = [];
  for (const test of tests) for (let i = 0; i < 4; i += 1) for (let j = 0; j < 4; j += 1) {
    rows.push(basis.map((K) => test(K)[i][j]));
  }
  return rows;
};

// Continuous SU(2)_L x SU(2)_R invariance: X^T K + KX = 0.
const lieTests = generators.map((X) => (K) => add(mul(transpose(X), K), mul(K, X)));
const continuousRank = rank(constraintRows(lieTests));
assert.equal(basis.length - continuousRank, 2);

const KL = zeroMatrix(4); KL[0][1] = 1; KL[1][0] = -1;
const KR = zeroMatrix(4); KR[2][3] = 1; KR[3][2] = -1;
for (const X of generators) {
  assert.deepEqual(add(mul(transpose(X), KL), mul(KL, X)), zeroMatrix(4));
  assert.deepEqual(add(mul(transpose(X), KR), mul(KR, X)), zeroMatrix(4));
}

// The simultaneous Weyl reflection swaps up/down components inside each
// doublet, but does not exchange the L and R irreducible summands.
const W = [[0,1,0,0],[-1,0,0,0],[0,0,0,1],[0,0,-1,0]];
const weylTests = [(K) => sub(mul(mul(transpose(W), K), W), K)];
const continuousPlusWeylRank = rank(constraintRows([...lieTests, ...weylTests]));
assert.equal(basis.length - continuousPlusWeylRank, 2);

// A separate left-right parity exchanges the two doublets.  Only this extra
// operation relates their normalizations.
const P = [[0,0,1,0],[0,0,0,1],[1,0,0,0],[0,1,0,0]];
const parityTests = [(K) => sub(mul(mul(transpose(P), K), P), K)];
const withParityRank = rank(constraintRows([...lieTests, ...parityTests]));
assert.equal(basis.length - withParityRank, 1);
assert.deepEqual(mul(mul(transpose(P), KL), P), KR);
assert.deepEqual(mul(mul(transpose(P), KR), P), KL);

// Boundary check: realifying both pseudoreal SU(2) doublets enlarges the
// invariant two-form space.  Each realified doublet has a quaternionic
// commutant and therefore three invariant real alternating forms.
const realify2 = (re, im) => {
  const R = zeroMatrix(4);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    R[i][j] = re[i][j];
    R[i][j + 2] = -im[i][j];
    R[i + 2][j] = im[i][j];
    R[i + 2][j + 2] = re[i][j];
  }
  return R;
};
const compact2 = [
  realify2([[0,0],[0,0]], [[0,1],[1,0]]),
  realify2([[0,1],[-1,0]], [[0,0],[0,0]]),
  realify2([[0,0],[0,0]], [[1,0],[0,-1]]),
];
const zeroN = (n) => Array.from({ length: n }, () => Array(n).fill(0));
const embedN = (A, offset, n) => {
  const X = zeroN(n);
  for (let i = 0; i < A.length; i += 1) for (let j = 0; j < A.length; j += 1) X[i + offset][j + offset] = A[i][j];
  return X;
};
const alternatingBasis = (n) => {
  const out = [];
  for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
    const K = zeroN(n); K[i][j] = 1; K[j][i] = -1; out.push(K);
  }
  return out;
};
const constraintsFor = (n, formBasis, tests) => {
  const rows = [];
  for (const test of tests) for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) rows.push(formBasis.map((K) => test(K)[i][j]));
  return rows;
};
const realGenerators = compact2.flatMap((X) => [embedN(X, 0, 8), embedN(X, 4, 8)]);
const realBasis = alternatingBasis(8);
const realLieTests = realGenerators.map((X) => (K) => add(mul(transpose(X), K), mul(K, X)));
const realInvariantDimension = realBasis.length - rank(constraintsFor(8, realBasis, realLieTests));
assert.equal(realInvariantDimension, 6);
const P8 = zeroN(8);
for (let i = 0; i < 4; i += 1) { P8[i][i + 4] = 1; P8[i + 4][i] = 1; }
const realParityTest = (K) => sub(mul(mul(transpose(P8), K), P8), K);
const realParityDimension = realBasis.length - rank(constraintsFor(8, realBasis, [...realLieTests, realParityTest]));
assert.equal(realParityDimension, 3);

console.log(JSON.stringify({
  protocol: 'representation-trunk/left-right-response-coefficients/1',
  carrier: 'V=(2,1)+(1,2) over C',
  continuousGroup: 'SU(2)_L x SU(2)_R',
  invariantAlternatingSpace: {
    dimension: 2,
    generalForm: 'a_L epsilon_L + a_R epsilon_R',
  },
  simultaneousWeylReflection: {
    invariantDimension: 2,
    verdict: 'swaps components within each doublet but does not force a_L=a_R',
  },
  addedLeftRightParity: {
    invariantDimension: 1,
    verdict: 'forces a_L=a_R',
  },
  fullRealificationBoundary: {
    carrier: 'realification of (2,1)+(1,2), real dimension 8',
    connectedInvariantTwoForms: realInvariantDimension,
    withOrdinaryBlockSwapParity: realParityDimension,
    verdict: 'realification enlarges rather than removes the response freedom',
  },
  implication: 'The connected left-right gauge group permits two minimal response coefficients. One coefficient requires an additional L<->R parity/intertwiner or a specified bidoublet dynamics.',
  passed: true,
}, null, 2));

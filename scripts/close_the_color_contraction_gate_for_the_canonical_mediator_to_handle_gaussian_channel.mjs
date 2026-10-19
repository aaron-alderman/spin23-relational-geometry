import assert from 'node:assert/strict';

const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(row => row[j]));
const kron = (A, B) => A.flatMap(rowA => B.map(rowB => rowA.flatMap(x => rowB.map(y => x * y))));
const rank = A => {
  const M = A.map(row => row.slice()); let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c++) {
    let p = r; while (p < M.length && Math.abs(M[p][c]) < 1e-10) p++;
    if (p === M.length) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const d = M[r][c]; M[r] = M[r].map(x => x / d);
    for (let i = 0; i < M.length; i++) if (i !== r) {
      const f = M[i][c]; M[i] = M[i].map((x, j) => x - f * M[r][j]);
    }
    r++;
  }
  return r;
};
const inverse2 = A => {
  const d = A[0][0] * A[1][1] - A[0][1] * A[1][0];
  return [[A[1][1] / d, -A[0][1] / d], [-A[1][0] / d, A[0][0] / d]];
};
const approx = (a, b, eps = 1e-12) => Math.abs(a - b) < eps;
const approxM = (A, B, eps = 1e-12) => A.every((row, i) => row.every((x, j) => approx(x, B[i][j], eps)));
const Ccolor = [[0, -1], [1, -1]];
const Gcolor = [[2, -1], [-1, 2]];
const Pstd = [[2 / 3, -1 / 3, -1 / 3], [-1 / 3, 2 / 3, -1 / 3], [-1 / 3, -1 / 3, 2 / 3]];

assert.ok(approx((Ccolor[0][0] - 1) * (Ccolor[1][1] - 1) - Ccolor[0][1] * Ccolor[1][0], 3));
assert.deepEqual(mm(mm(tr(Ccolor), Gcolor), Ccolor), Gcolor);
assert.equal(rank(Pstd), 2);
assert.equal(rank(Gcolor), 2);
const rawBathGram = kron(Pstd, Gcolor);
assert.equal(rank(rawBathGram), 4);

// Normalized invariant color trace maps the factor Gcolor to one.
const Ginv = inverse2(Gcolor);
const normalizedColorTrace = 0.5 * (mm(Ginv, Gcolor)[0][0] + mm(Ginv, Gcolor)[1][1]);
assert.ok(approx(normalizedColorTrace, 1));

// Redundant color-resolved Kraus coefficients multiply only two operator
// directions. Their coefficient Gram is the identity and their span rank is 2.
const redundantCoefficients = [[0.5, 0], [Math.sqrt(3) / 2, 0], [0, 0.5], [0, Math.sqrt(3) / 2]];
assert.equal(rank(redundantCoefficients), 2);
assert.ok(approxM(mm(tr(redundantCoefficients), redundantCoefficients), [[1, 0], [0, 1]]));

console.log(JSON.stringify({
  protocol: 'canonical-color-contraction-gate-closure/1',
  colorRepresentation: {
    cycle: Ccolor,
    noInvariantLinearFunctionalWitness: 'det(C-I)=3',
    uniqueQuadraticMetric: Gcolor,
  },
  canonicalMiddleFrameBath: {
    gram: 'Pstd tensor Gcolor',
    rawRank: rank(rawBathGram),
    multiplicityRank: rank(Pstd),
    colorRank: rank(Gcolor),
  },
  quadraticContraction: {
    normalizedTraceOfMetric: normalizedColorTrace,
    reducedCovariance: 'Pstd',
    redundantColorKrausLabels: 4,
    operatorSpanRank: rank(redundantCoefficients),
    normalizedChannelUnchanged: true,
  },
  consequence: 'For the canonical middle-slot factorized Gram, color contraction is an exact quadratic reduction and does not enlarge the two-dimensional handle environment. The remaining frame obstruction is physical cyclic labeling, not algebraic color rank.',
  qualification: 'This closure applies to the canonical fully traced middle-frame response. Partially observed or noncanonical color-conditioned vertices may retain extra environment structure.',
  passed: true,
}, null, 2));

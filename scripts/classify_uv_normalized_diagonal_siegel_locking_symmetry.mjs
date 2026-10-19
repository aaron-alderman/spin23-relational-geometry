import assert from "node:assert/strict";

// Linearized stabilizer equations X M + M X^T = 0 for X in M_2(R).
// Unknown ordering: X11,X12,X21,X22.
const stabilizerRows = (M) => {
  const [[a, b], [, d]] = M;
  return [
    [2 * a, 2 * b, 0, 0],
    [b, d, a, b],
    [0, 0, 2 * b, 2 * d],
  ];
};
const rank = (rows) => {
  const A = rows.map((row) => row.map(Number));
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    while (pivot < A.length && Math.abs(A[pivot][c]) < 1e-12) pivot += 1;
    if (pivot === A.length) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const scale = A[r][c];
    A[r] = A[r].map((x) => x / scale);
    for (let i = 0; i < A.length; i += 1) if (i !== r) {
      const f = A[i][c];
      A[i] = A[i].map((x, j) => x - f * A[r][j]);
    }
    r += 1;
  }
  return r;
};
const positive2 = (M) => M[0][0] > 0 && M[0][0] * M[1][1] - M[0][1] ** 2 > 0;

const Mshared = [[2, 0], [0, 1]];
const Mtop = [[2, 0], [0, 1]];
const Mchi = [[3, 1], [1, 2]];
assert(positive2(Mshared) && positive2(Mchi));
const sharedRank = rank(stabilizerRows(Mshared));
const genericPairRank = rank([...stabilizerRows(Mtop), ...stabilizerRows(Mchi)]);
const sharedLieDimension = 4 - sharedRank;
const genericPairLieDimension = 4 - genericPairRank;
assert.equal(sharedLieDimension, 1);
assert.equal(genericPairLieDimension, 0);

const dimensions = {
  fullSp4DomainAutomorphisms: 10,
  uvClassPreservingSiegelParabolic: 7, // GL(2):4 plus Sym_2 contact shifts:3
  sharedFixedLeadingMatrixWithContacts: sharedLieDimension + 3,
  twoGenericFixedLeadingMatricesWithContacts: genericPairLieDimension + 3,
  sharedFixedLeadingMatrixAndContactsFixed: sharedLieDimension,
  twoGenericFixedLeadingMatricesAndContactsFixed: genericPairLieDimension,
};
assert.deepEqual(dimensions, {
  fullSp4DomainAutomorphisms: 10,
  uvClassPreservingSiegelParabolic: 7,
  sharedFixedLeadingMatrixWithContacts: 4,
  twoGenericFixedLeadingMatricesWithContacts: 3,
  sharedFixedLeadingMatrixAndContactsFixed: 1,
  twoGenericFixedLeadingMatricesAndContactsFixed: 0,
});

console.log(JSON.stringify({
  protocol: "uv-normalized-diagonal-siegel-locking-symmetry/1",
  asymptoticForm: "Z_a(iy)=iy M_a+Q_a+o(1), M_a>0",
  hierarchy: {
    domain: "Sp(4,R), dimension 10",
    normalizedClass: "GL(2,R) semidirect Sym_2(R), dimension 7",
    fixedSharedM: "O(M) with Lie dimension 1, plus three common contact translations if retained",
    fixedGenericPair: "O(M_top) intersect O(M_chi), generically discrete, plus three common contact translations if retained",
  },
  examples: {
    shared: { M: Mshared, stabilizerEquationRank: sharedRank, continuousCongruenceDimension: sharedLieDimension },
    genericPair: { Mtop, Mchi, stabilizerEquationRank: genericPairRank, continuousCongruenceDimension: genericPairLieDimension, genericDiscreteIntersection: "four sign reflections in the generalized-eigenvector basis" },
  },
  dimensions,
  lockingImplication: "A diagonal Siegel geodesic lock is fully Sp(4,R)-invariant as domain geometry, but fixed UV data generically reduce its continuous spectral symmetry to none. Common real symmetric translations survive only as simultaneous contact-term shifts and disappear when the subtraction scheme fixes them.",
  enhancementCondition: "If locking dynamics also forces M_top=M_chi, the congruence stabilizer enhances from a generic discrete intersection to O(M), with one continuous generator.",
  physicalGate: "Derive whether the two responses share one UV coefficient and whether common contact translations are redundancy or measurable. Full Spin(2,3) cannot be called a symmetry of one normalized response without transforming its UV data.",
  passed: true,
}, null, 2));

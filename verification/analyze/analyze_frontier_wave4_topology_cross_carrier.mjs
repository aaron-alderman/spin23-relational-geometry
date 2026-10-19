#!/usr/bin/env node

import assert from "node:assert/strict";

const I = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));
const Z = (r, c) => Array.from({ length: r }, () => Array(c).fill(0));
const T = (A) => A[0].map((_, j) => A.map((r) => r[j]));
const mul = (A, B) => A.map((r) => B[0].map((_, j) => r.reduce((s, x, i) => s + x * B[i][j], 0)));
const sub = (A, B) => A.map((r, i) => r.map((x, j) => x - B[i][j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));

function rank(A, tol = 1e-10) {
  if (A.length === 0 || A[0].length === 0) return 0;
  const M = A.map((r) => [...r]);
  let out = 0;
  for (let c = 0; c < M[0].length && out < M.length; c += 1) {
    const p = M.findIndex((row, i) => i >= out && Math.abs(row[c]) > tol);
    if (p < out) continue;
    [M[out], M[p]] = [M[p], M[out]];
    const d = M[out][c];
    M[out] = M[out].map((x) => x / d);
    for (let i = 0; i < M.length; i += 1) if (i !== out) {
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x - f * M[out][j]);
    }
    out += 1;
  }
  return out;
}

function nullity(rows, cols) { return cols - rank(rows); }

// Linear equations for A X = X B in row-major coordinates of X.
function intertwinerRows(A, B) {
  const m = A.length;
  const n = B.length;
  const rows = [];
  for (let i = 0; i < m; i += 1) for (let j = 0; j < n; j += 1) {
    const row = Array(m * n).fill(0);
    for (let k = 0; k < m; k += 1) row[k * n + j] += A[i][k];
    for (let k = 0; k < n; k += 1) row[i * n + k] -= B[k][j];
    rows.push(row);
  }
  return rows;
}

// H2(R)=R*1 plus its traceless weight-two O(2) plane.
const peirceJ = [[0, 0, 0], [0, 0, -1], [0, 1, 0]];
const peirceReflection = [[1, 0, 0], [0, 1, 0], [0, 0, -1]];
const trivialJ = Z(3, 3);
const trivialReflection = I(3);
const homPeirceToTrivialRows = [
  ...intertwinerRows(trivialJ, peirceJ),
  ...intertwinerRows(trivialReflection, peirceReflection),
];
const homPeirceToTrivialDimension = nullity(homPeirceToTrivialRows, 9);
assert.equal(homPeirceToTrivialDimension, 3);

const peirceEndRows = [
  ...intertwinerRows(peirceJ, peirceJ),
  ...intertwinerRows(peirceReflection, peirceReflection),
];
const peirceEndDimension = nullity(peirceEndRows, 9);
assert.equal(peirceEndDimension, 2);

// Any map to a trivial target kills the rotating plane, hence has rank <= 1.
const peirceWitnessToTrivial = [[1, 0, 0], [2, 0, 0], [3, 0, 0]];
assert.equal(rank(peirceWitnessToTrivial), 1);

// S3 on three relationship labels. Its commutant is span(I,J_all).
const s3Swap12 = [[0, 1, 0], [1, 0, 0], [0, 0, 1]];
const s3Cycle = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
const s3EndRows = [
  ...intertwinerRows(s3Swap12, s3Swap12),
  ...intertwinerRows(s3Cycle, s3Cycle),
];
const s3EndDimension = nullity(s3EndRows, 9);
assert.equal(s3EndDimension, 2);
const s3ToTrivialRows = [
  ...intertwinerRows(I(3), s3Swap12),
  ...intertwinerRows(I(3), s3Cycle),
];
const s3ToTrivialDimension = nullity(s3ToTrivialRows, 9);
assert.equal(s3ToTrivialDimension, 3);

// Natural atom/Walsh norm is scalar. A non-scalar invariant form requires an
// unfixed singlet/doublet ratio alpha:beta.
const ones = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
const invariantNonScalar = I(3).map((r, i) => r.map((x, j) => 2 * x + ones[i][j]));
assert.equal(maxAbs(sub(mul(T(s3Cycle), mul(invariantNonScalar, s3Cycle)), invariantNonScalar)), 0);
assert(maxAbs(sub(invariantNonScalar, I(3))) > 0);

// The defining five-dimensional so(2,3) module has no invariant vector.
const eta = [1, 1, -1, -1, -1];
const so23 = [];
for (let i = 0; i < 5; i += 1) for (let j = i + 1; j < 5; j += 1) {
  const A = Z(5, 5);
  A[i][j] = 1;
  A[j][i] = -eta[i] * eta[j];
  so23.push(A);
  const lhs = mul(T(A), Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => eta[r] * Number(r === c))));
  const rhs = mul(Array.from({ length: 5 }, (_, r) => Array.from({ length: 5 }, (_, c) => eta[r] * Number(r === c))), A);
  assert.equal(maxAbs(lhs.map((r, x) => r.map((v, y) => v + rhs[x][y]))), 0);
}
const invariantVectorRows = so23.flatMap((A) => A);
const spin23InvariantVectorDimension = nullity(invariantVectorRows, 5);
assert.equal(spin23InvariantVectorDimension, 0);

const result = {
  target: {
    mediatorSpace: "W_mediator=C^3",
    establishedActionFromTopologyStructures: "trivial/absent",
    rankTwoProjectorOrbit: "U(3)/(U(2)xU(1))=CP^2",
    orbitRealDimension: 4,
  },
  peirce: {
    canonicalModule: "H2(R)=1 plus traceless O(2) plane",
    realDimension: 3,
    endomorphismCommutantDimension: peirceEndDimension,
    homToTrivialMediatorDimension: homPeirceToTrivialDimension,
    maximumEquivariantRankToTrivialMediator: 1,
    canonicalTraceGram: I(3),
    conclusion: "full-rank transport requires first assigning the Peirce action to W; equivariance leaves a free singlet/doublet ratio, while normalized trace isometry gives scalar Gram",
  },
  ribbonAndContrast: {
    canonicalModule: "three-label permutation/contrast module 1 plus 2 of S3",
    realDimension: 3,
    endomorphismCommutantDimension: s3EndDimension,
    homToTrivialMediatorDimension: s3ToTrivialDimension,
    maximumEquivariantRankToTrivialMediator: 1,
    naturalWalshGram: I(3),
    nonScalarInvariantGramExists: true,
    nonScalarInvariantGramExample: invariantNonScalar,
    missingNormalization: "the singlet/doublet eigenvalue ratio",
  },
  golayAndLattice: {
    m11OrderedPointFlag: [
      { fixedPoints: 0, stabilizerOrder: 7920, invariantFormDimension: 0, maximumRank: 0 },
      { fixedPoints: 1, stabilizerOrder: 720, invariantFormDimension: 0, maximumRank: 0 },
      { fixedPoints: 2, stabilizerOrder: 72, invariantFormDimension: 1, maximumRank: 1 },
      { fixedPoints: 3, stabilizerOrder: 8, invariantFormDimension: 3, maximumRank: 3 },
      { fixedPoints: 4, stabilizerOrder: 1, invariantFormDimension: 15, maximumRank: 5 },
    ],
    canonicalRealPositiveThreeModule: false,
    reason: "rank three occurs only after choosing an ordered three-point flag, in characteristic three, with a nonunique invariant form",
  },
  spin23: {
    lieAlgebraDimension: 10,
    gl3Dimension: 9,
    nontrivialThreeDimensionalLinearRepresentation: false,
    proofKey: "simplicity makes any nonzero differential injective, impossible from dimension 10 into dimension 9",
    definingVectorDimension: 5,
    definingVectorInvariantDimension: spin23InvariantVectorDimension,
    h2SectionStabilizerDimension: 4,
    h2SectionOrbitDimension: 6,
  },
  verdict: {
    pass: "canonical 3D source modules exist for Peirce observables and three-label ribbon/contrast data",
    noGo: "with the established trivial action on W every equivariant map has rank at most one; full Spin(2,3) has no nontrivial linear 3D module; canonical normalized source Grams are scalar",
    indeterminate: "a new broken-symmetry or dynamical cross-action could orient W, but it is absent from established data",
    firstMissingDatum: "a physically typed nontrivial representation rho_W of one named source symmetry on W_mediator, derived without q_QQ, together with a normalization fixing the singlet/doublet scale",
  },
};

console.log(JSON.stringify(result, null, 2));

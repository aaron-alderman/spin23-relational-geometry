#!/usr/bin/env node

import assert from "node:assert/strict";

const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);

// Clebsch rows, with representation-wide normalization absorbed into the
// scalar mixing coefficients.  The 10 triplet follows the standard SU(5)
// 10_F 10_F 5_H ratio QQ:u^c e^c = 1:2 and the Spin(10) orientation
// u^c e^c:d^c nu^c = 1:-1.  The two 126 triplets are its SU(5) 5 and 50.
const tripletRows = Object.freeze({
  QQ: [1, 1, 1],
  ucec: [2, -2, 2],
  dcnuc: [-2, 0, 0],
});
const tripletColumns = ["10", "126_SU5_5", "126_SU5_50"];

// The anti-triplet rows are the SU(5) anti-5 in the 10 and anti-45 in the
// 126.  They have opposite versus equal signs between u^c d^c and QL.
const antiTripletRows = Object.freeze({
  ucdc: [1, 1],
  QL: [-1, 1],
});
const antiTripletColumns = ["10", "126_SU5_bar45"];

// Algebraic one-texture witness.  H=F is understood; overall normalization
// and phases are immaterial.
const wTriplet = [-2, 1, 1];
const wAntiTriplet = [1, -1];

const witness = {
  QQ: dot(tripletRows.QQ, wTriplet),
  ucec: dot(tripletRows.ucec, wTriplet),
  dcnuc: dot(tripletRows.dcnuc, wTriplet),
  ucdc: dot(antiTripletRows.ucdc, wAntiTriplet),
  QL: dot(antiTripletRows.QL, wAntiTriplet),
};

assert.equal(witness.QQ, 0);
assert.equal(witness.ucdc, 0);
assert.notEqual(witness.QL, 0);
assert.notEqual(witness.ucec, 0);
assert.notEqual(witness.dcnuc, 0);
assert.equal(witness.ucec, -witness.dcnuc);

// A unitary change of mediator basis cannot delete a nonzero source covector
// from the complete inventory.  Moreover, in the canonical positive metric
// the triplet danger direction is not orthogonal to the retained source span.
const tripletDangerNorm2 = dot(tripletRows.QQ, tripletRows.QQ);
const antiDangerNorm2 = dot(antiTripletRows.ucdc, antiTripletRows.ucdc);
assert(tripletDangerNorm2 > 0);
assert(antiDangerNorm2 > 0);
const canonicalCrossInnerProducts = {
  QQ_with_ucec: dot(tripletRows.QQ, tripletRows.ucec),
  QQ_with_dcnuc: dot(tripletRows.QQ, tripletRows.dcnuc),
  ucdc_with_QL: dot(antiTripletRows.ucdc, antiTripletRows.QL),
};
assert.notEqual(canonicalCrossInnerProducts.QQ_with_ucec, 0);
assert.notEqual(canonicalCrossInnerProducts.QQ_with_dcnuc, 0);
assert.equal(canonicalCrossInnerProducts.ucdc_with_QL, 0);

// The 120 family tensor is antisymmetric.  It has no diagonal entries and
// cannot cancel a nonzero symmetric matrix from the 10 or 126.
const G = [
  [0, 2, -3],
  [-2, 0, 5],
  [3, -5, 0],
];
for (let i = 0; i < G.length; i += 1) assert.equal(G[i][i], 0);

const transpose = (M) => M[0].map((_, j) => M.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (a, A) => A.map((row) => row.map((x) => a * x));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const symmetricPart = (M) => scale(0.5, add(M, transpose(M)));
const antisymmetricPart = (M) => scale(0.5, add(M, scale(-1, transpose(M))));

const H = [
  [1, 2, 0],
  [2, 3, 1],
  [0, 1, 4],
];
const FIndependent = [
  [2, 0, 1],
  [0, -1, 3],
  [1, 3, 5],
];

assert.equal(maxAbs(antisymmetricPart(H)), 0);
assert.equal(maxAbs(antisymmetricPart(FIndependent)), 0);
assert.equal(maxAbs(symmetricPart(G)), 0);

// If aH+bF+cG=0, symmetric and antisymmetric projections vanish separately.
// The explicit independent witness H,F makes the symmetric map rank two;
// nonzero G makes the antisymmetric map rank one.  Only a=b=c=0 survives.
const flatten = (M) => M.flat();
const vectorsIndependent = (A, B) => {
  const a = flatten(A);
  const b = flatten(B);
  let ratio = null;
  for (let i = 0; i < a.length; i += 1) {
    if (a[i] === 0 && b[i] === 0) continue;
    if (a[i] === 0 || b[i] === 0) return true;
    const r = b[i] / a[i];
    if (ratio === null) ratio = r;
    else if (r !== ratio) return true;
  }
  return false;
};
assert(vectorsIndependent(H, FIndependent));
assert(maxAbs(G) > 0);

// A small allowed mismatch F=(1+eps)H regenerates both dangerous sources
// when the tree-level kernel weights are held fixed.
const epsilon = 1e-3;
const antiResidualFactor = 1 - (1 + epsilon);
const tripletResidualFactor = -2 + (1 + epsilon) + (1 + epsilon);
assert(Math.abs(antiResidualFactor) > 0);
assert(Math.abs(tripletResidualFactor) > 0);

const result = {
  clebschBasis: {
    tripletColumns,
    tripletRows,
    antiTripletColumns,
    antiTripletRows,
  },
  algebraicWitness: {
    assumption: "F=H after absorbing nonzero representation normalizations",
    tripletWeights: wTriplet,
    antiTripletWeights: wAntiTriplet,
    channels: witness,
    preservesRightOrientation: witness.ucec === -witness.dcnuc,
  },
  completeInventory: {
    tripletDangerNorm2,
    antiTripletDangerNorm2: antiDangerNorm2,
    unitaryBasisChangeCanDeleteAllDangerSources: false,
    canonicalCrossInnerProducts,
    canonicalPositiveMetricFullyBlockSeparatesTripletSources: false,
  },
  flavorObstruction: {
    tenAnd126: "symmetric family tensors H and F; cancellation of a full matrix requires F proportional to H",
    oneTwenty: "antisymmetric family tensor G; G_AA=0 and its antisymmetric part cannot cancel H/F",
    genericIndependentHFHasNontrivialSelector: false,
  },
  radiativeTest: {
    epsilon,
    regeneratedUcdcFactor: antiResidualFactor,
    regeneratedQQFactor: tripletResidualFactor,
    protectedBySpin10Alone: false,
  },
  verdict: {
    algebraicCancellation: "exists on the aligned-Yukawa and tuned-mixing locus",
    symmetryProtectedCancellation: "absent from Spin(10) representation content alone",
    oneTwentyRepair: "no for same-family channels and no cancellation between symmetric and antisymmetric flavor sectors",
  },
};

console.log(JSON.stringify(result, null, 2));

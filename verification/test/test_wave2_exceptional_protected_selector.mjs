#!/usr/bin/env node

import assert from "node:assert/strict";

const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const maxAbs = (A) => Math.max(...A.flat().map(Math.abs));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => x - B[i][j]));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Number(i === j)));

function inverse3(A) {
  const M = A.map((row, i) => [...row, ...identity(3)[i]]);
  for (let c = 0; c < 3; c += 1) {
    const p = M.findIndex((row, r) => r >= c && Math.abs(row[c]) > 1e-12);
    assert(p >= c);
    [M[c], M[p]] = [M[p], M[c]];
    const pivot = M[c][c];
    M[c] = M[c].map((x) => x / pivot);
    for (let r = 0; r < 3; r += 1) {
      if (r === c) continue;
      const factor = M[r][c];
      M[r] = M[r].map((x, j) => x - factor * M[c][j]);
    }
  }
  return M.map((row) => row.slice(3));
}

function rank(A, tolerance = 1e-10) {
  const M = A.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < M[0].length && r < M.length; c += 1) {
    const p = M.findIndex((row, i) => i >= r && Math.abs(row[c]) > tolerance);
    if (p < r) continue;
    [M[r], M[p]] = [M[p], M[r]];
    const pivot = M[r][c];
    M[r] = M[r].map((x) => x / pivot);
    for (let i = 0; i < M.length; i += 1) {
      if (i === r) continue;
      const f = M[i][c];
      M[i] = M[i].map((x, j) => x - f * M[r][j]);
    }
    r += 1;
  }
  return r;
}

// Clebsch source covectors from exceptional frontier 03.
const triplet = Object.freeze({
  dangerQQ: [1, 1, 1],
  safeUe: [2, -2, 2],
  safeDnu: [-2, 0, 0],
});
const anti = Object.freeze({
  dangerUd: [1, 1],
  safeQL: [-1, 1],
});

const gram = {
  tripletQQ_Ue: dot(triplet.dangerQQ, triplet.safeUe),
  tripletQQ_Dnu: dot(triplet.dangerQQ, triplet.safeDnu),
  antiUd_QL: dot(anti.dangerUd, anti.safeQL),
};
assert.equal(gram.tripletQQ_Ue, 2);
assert.equal(gram.tripletQQ_Dnu, -2);
assert.equal(gram.antiUd_QL, 0);

// In a unitary finite symmetry, inequivalent character/isotypic sectors are
// orthogonal.  The nonzero triplet Gram entries are therefore a no-go for a
// charge symmetry that allows both safe sources and forbids QQ on the complete
// canonical mediator inventory.
const unitarySeparation = {
  antiTripletExchangePossible: gram.antiUd_QL === 0,
  tripletChargeSeparationPossible: gram.tripletQQ_Ue === 0 && gram.tripletQQ_Dnu === 0,
};
assert.equal(unitarySeparation.antiTripletExchangePossible, true);
assert.equal(unitarySeparation.tripletChargeSeparationPossible, false);

const exchange2 = [[0, 1], [1, 0]];
const apply = (M, v) => M.map((row) => dot(row, v));
assert.deepEqual(apply(exchange2, anti.dangerUd), anti.dangerUd);
assert.deepEqual(apply(exchange2, anti.safeQL), anti.safeQL.map((x) => -x));

// Algebraically, V = ker(QQ) direct-sum ker(Ue) intersect ker(Dnu).
// The corresponding selector exists as an oblique idempotent, but is not a
// self-adjoint projection in the inherited canonical metric.
const s1 = [1, -1, 0];
const s2 = [1, 0, -1];
const dangerOnly = [0, 1, 1];
assert.equal(dot(triplet.dangerQQ, s1), 0);
assert.equal(dot(triplet.dangerQQ, s2), 0);
assert.equal(dot(triplet.safeUe, dangerOnly), 0);
assert.equal(dot(triplet.safeDnu, dangerOnly), 0);

const B = transpose([s1, s2, dangerOnly]);
const selectorDiag = [[1, 0, 0], [0, 1, 0], [0, 0, 0]];
const P = matMul(matMul(B, selectorDiag), inverse3(B));
assert(maxAbs(sub(matMul(P, P), P)) < 1e-12);
const selfAdjointDefect = maxAbs(sub(P, transpose(P)));
assert(selfAdjointDefect > 0);
const rowTimes = (v, M) => M[0].map((_, j) => v.reduce((s, x, i) => s + x * M[i][j], 0));
const qAfterP = rowTimes(triplet.dangerQQ, P);
const qAfterAdjoint = rowTimes(triplet.dangerQQ, transpose(P));
assert(maxAbs([qAfterP]) < 1e-12);
assert(maxAbs([qAfterAdjoint]) > 0);
const Binv = inverse3(B);
const adaptedMetric = matMul(transpose(Binv), Binv);
const adaptedSelfAdjointDefect = maxAbs(sub(matMul(adaptedMetric, P), matMul(transpose(P), adaptedMetric)));
assert(adaptedSelfAdjointDefect < 1e-12);

// The family SO(3) commutant on its defining irreducible real triplet is one
// dimensional.  Solve [X,L_i]=0 for all three generators.
const L = [
  [[0, 0, 0], [0, 0, -1], [0, 1, 0]],
  [[0, 0, 1], [0, 0, 0], [-1, 0, 0]],
  [[0, -1, 0], [1, 0, 0], [0, 0, 0]],
];
const equations = [];
for (const A of L) {
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) {
      const row = Array(9).fill(0);
      for (let k = 0; k < 3; k += 1) {
        row[3 * i + k] += A[k][j];
        row[3 * k + j] -= A[i][k];
      }
      equations.push(row);
    }
  }
}
const commutantDimension = 9 - rank(equations);
assert.equal(commutantDimension, 1);

// It follows that invariant symmetric family tensors are scalar matrices:
// H=h I and F=f I.  They are proportional when nonzero, but the algebra leaves
// h/f arbitrary and acts on no mediator multiplicity index.
const familyAlgebra = {
  commutantDimension,
  forcesHScalar: true,
  forcesFScalar: true,
  forcesRelativeHFNormalization: false,
  fixesMediatorKernelVectors: false,
};

const result = {
  sourceGram: gram,
  unitarySeparation,
  antiTripletExchange: {
    matrix: exchange2,
    dangerParity: 1,
    safeParity: -1,
    extendsToUnbrokenSpin10Multiplets: false,
  },
  representedOneFormCandidate: {
    safeBasis: [s1, s2],
    dangerOnlyBasis: [dangerOnly],
    obliqueIdempotent: P,
    idempotent: true,
    selfAdjointInCanonicalMetric: false,
    selfAdjointDefect,
    dangerAfterObliqueProjector: qAfterP,
    dangerAfterAdjointClosure: qAfterAdjoint,
    adjointClosureRestoresDanger: true,
    adaptedPositiveMetric: adaptedMetric,
    selfAdjointDefectInAdaptedMetric: adaptedSelfAdjointDefect,
    verdict: "requires an added metric/incidence datum; not an inherited represented *-algebra projection",
  },
  familyAlgebra,
  completeSelector: {
    exchangeSymmetryAlone: false,
    familyAlgebraAlone: false,
    inheritedRepresentedOneForm: false,
    smallestLiveExtension: "family-scalar algebra plus an explicitly new broken-phase self-adjoint incidence projector and compatible heavy metric",
    status: "indeterminate until a finite algebra, representation, J, grading, D_F, and junk quotient derive that projector",
  },
};

console.log(JSON.stringify(result, null, 2));

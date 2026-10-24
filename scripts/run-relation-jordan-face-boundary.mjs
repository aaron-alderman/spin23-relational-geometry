#!/usr/bin/env node

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const parentPath = resolve(root, "corpus/programmes/frontier/wave-7/claimipedia_spin_temple_closed_carrier_v1.json");
const outputPath = resolve(root, "evidence/data/relation-jordan-face-boundary-v1.json");
const write = process.argv.includes("--write");
const parentBytes = readFileSync(parentPath);
const parent = JSON.parse(parentBytes);

const add = (a, b) => a.map((row, i) => row.map((value, j) => value + b[i][j]));
const scale = (s, a) => a.map(row => row.map(value => s * value));
const multiply = (a, b) => a.map(row => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
const transpose = a => a[0].map((_, j) => a.map(row => row[j]));
const jordan = (a, b) => scale(0.5, add(multiply(a, b), multiply(b, a)));
const subtract = (a, b) => add(a, scale(-1, b));
const maxAbs = a => Math.max(...a.flat().map(Math.abs));
const determinant = a => a[0][0] * a[1][1] - a[0][1] * a[1][0];
const trace = a => a[0][0] + a[1][1];

const e11 = [[1, 0], [0, 0]];
const e22 = [[0, 0], [0, 1]];
const q = [[0, 1], [0, 0]];
const s = [[0, 0], [1, 0]];
const x = add(q, s);
const k = subtract(q, s);
const identity = add(e11, e22);
const symmetricBasis = [e11, e22, x];
const coefficientSamples = [-2, -1, 0, 1, 2];
const matrices = [];
for (const a of coefficientSamples) for (const b of coefficientSamples) for (const c of coefficientSamples) matrices.push(add(add(scale(a, e11), scale(b, x)), scale(c, e22)));

let maximumJordanIdentityResidual = 0;
let maximumTransposeClosureResidual = 0;
for (const a of matrices) {
  for (const b of matrices) {
    const a2 = jordan(a, a);
    const lhs = jordan(jordan(a, b), a2);
    const rhs = jordan(a, jordan(b, a2));
    maximumJordanIdentityResidual = Math.max(maximumJordanIdentityResidual, maxAbs(subtract(lhs, rhs)));
    maximumTransposeClosureResidual = Math.max(maximumTransposeClosureResidual, maxAbs(subtract(jordan(a, b), transpose(jordan(a, b)))));
  }
}

const productTable = {
  "e11 o e11": jordan(e11, e11),
  "e22 o e22": jordan(e22, e22),
  "e11 o e22": jordan(e11, e22),
  "e11 o x": jordan(e11, x),
  "e22 o x": jordan(e22, x),
  "x o x": jordan(x, x),
};
const positiveWitness = [[2, 1], [1, 3]];
const boundaryWitness = [[1, 1], [1, 1]];
const indefiniteWitness = [[1, 2], [2, 1]];

const result = {
  protocol: "relation-jordan-face-boundary/1",
  packet: "AZ-111",
  target: "OT-026",
  parent: {
    schema: parent.schema,
    path: "corpus/programmes/frontier/wave-7/claimipedia_spin_temple_closed_carrier_v1.json",
    sha256: createHash("sha256").update(parentBytes).digest("hex"),
    semisimpleQuotient: parent.operatorAlgebra.semisimpleQuotient,
    radicalDimension: parent.operatorAlgebra.jacobsonRadicalDimension,
  },
  construction: {
    reversibleBlock: "M2(Q) on the Spin-Temple strongly connected component",
    involution: "matrix transpose in the named two-node basis, exchanging the two reverse arrows q and s",
    fixedSpace: "span{E11,E22,q+s}=H2(Q), extended to H2(R) for positivity",
    jordanProduct: "A o B=(AB+BA)/2",
    identity: identity,
    dimension: symmetricBasis.length,
    rank: 2,
    trace: "tr([[a,b],[b,c]])=a+c",
    determinantNorm: "det([[a,b],[b,c]])=ac-b^2",
    positiveCone: "a>=0, c>=0, ac-b^2>=0",
    productTable,
  },
  exactAudit: {
    coefficientGrid: coefficientSamples,
    matricesChecked: matrices.length,
    orderedPairsChecked: matrices.length ** 2,
    maximumJordanIdentityResidual,
    maximumTransposeClosureResidual,
    positiveWitness: { matrix: positiveWitness, trace: trace(positiveWitness), determinant: determinant(positiveWitness), positiveDefinite: true },
    boundaryWitness: { matrix: boundaryWitness, trace: trace(boundaryWitness), determinant: determinant(boundaryWitness), rank: 1 },
    indefiniteWitness: { matrix: indefiniteWitness, trace: trace(indefiniteWitness), determinant: determinant(indefiniteWitness), admitted: false },
  },
  fullCanonicalJordanizationBoundary: {
    algebra: "Q plus M2(Q)^+",
    dimension: 5,
    rank: 3,
    genericCubicNorm: "lambda det(M)",
    nonEuclideanWitness: { element: q, jordanSquare: jordan(q, q), nonzeroElementHasZeroSquare: true },
    implication: "Symmetrizing the entire semisimple quotient gives a special Jordan algebra, but not the rank-two formally-real response carrier. The desired Euclidean face appears only after the transpose-fixed restriction.",
  },
  informationLoss: {
    radicalDimensionsDiscarded: parent.operatorAlgebra.jacobsonRadicalDimension,
    lostContent: "one-way typed path history between strongly connected components",
    relationTypesCollapsed: "the fixed vector q+s no longer distinguishes Supports from Qualifies",
    positivitySourceNative: false,
    physicalObservableTransported: false,
  },
  decision: {
    exactLocalJordanFaceConstructed: true,
    productPreservedOnFixedFace: true,
    determinantAndMatrixRankAvailable: true,
    graphForcesPositiveOrder: false,
    fullGraphTranslated: false,
    exceptionalCubicDerived: false,
    ot026ClosureConditionMet: false,
    ot026ShouldRemainGated: true,
    newPhysicsEvidence: false,
  },
  nextGate: "Supply a source-native order or involution that survives the radical rather than being imposed after quotienting, and use the resulting product to predict a held-out relation composition or physical observable.",
};

if (write) {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
  console.log(`wrote ${outputPath}`);
}
console.log(JSON.stringify({
  jordanFace: result.construction.fixedSpace,
  orderedPairsChecked: result.exactAudit.orderedPairsChecked,
  maximumJordanIdentityResidual,
  maximumTransposeClosureResidual,
  radicalDimensionsDiscarded: result.informationLoss.radicalDimensionsDiscarded,
  ot026ClosureConditionMet: result.decision.ot026ClosureConditionMet,
}, null, 2));

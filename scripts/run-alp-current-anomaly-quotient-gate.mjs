import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const write = process.argv.includes("--write");
const outputPath = resolve(import.meta.dirname, "../evidence/data/alp-current-anomaly-quotient-gate-v1.json");

const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, x, k) => sum + x * B[k][j], 0)));
const matVec = (A, x) => A.map(row => row.reduce((sum, entry, i) => sum + entry * x[i], 0));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const close = (a, b) => Math.abs(a - b) < 1e-12;

// Bauer et al. derivative basis, one diagonal generation:
// r=(c_Q,c_u,c_d,c_L,c_WW). Their Eqs. (10)-(11) give
// c_t=-c_Q+c_u, c_b=-c_Q+c_d,
// a_2=3c_Q+c_L and ctilde_WW=c_WW-a_2/2.
const derivativeToInvariant = [
  [-1, 1, 0, 0, 0],
  [-1, 0, 1, 0, 0],
  [3, 0, 0, 1, 0],
  [-1.5, 0, 0, -0.5, 1],
];
// Projection of the completed B-L vector current onto this restricted
// (c_Q,c_u,c_d,c_L,c_WW) slice.  It is not baryon number alone.
const bMinusLNull = [1, 1, 1, -3, 0];

// In the corpus all-left-handed convention and the non-redundant c_H=0 basis:
// v_u=c_Q-c_u=-c_t, v_d=c_Q-c_d=-c_b.
const corpusToMeasured = [
  [-1, 0, 0, 0],
  [0, -1, 0, 0],
  [0, 0, -0.5, 1],
]; // (v_u,v_d,a_2,c_WW) -> (c_t,c_b,ctilde_WW)
const weakBlindDirection = [0, 0, 2, 1];
const currentOnlyMap = [
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -0.5],
];

const rawExample = [2, 7, 5, -1, 11];
const shiftedExample = rawExample.map((x, i) => x + 4 * bMinusLNull[i]);
const invariantExample = matVec(derivativeToInvariant, rawExample);
const shiftedInvariantExample = matVec(derivativeToInvariant, shiftedExample);
const measuredExample = matVec(corpusToMeasured, [5, 3, 5, 11]);
const measuredBlindShift = matVec(corpusToMeasured, [5, 3, 5 + 2 * 7, 11 + 7]);

const responseExample = [
  [9, -3, 6],
  [-3, 4, -4],
  [6, -4, 16],
];
const currentOnlyResponse = multiply(transpose(currentOnlyMap), multiply(responseExample, currentOnlyMap));

const result = {
  protocol: "alp-current-anomaly-quotient-gate/1",
  date: "2026-10-25",
  targets: ["OT-047", "OT-048"],
  parent: "AZ-075",
  sourceConvention: {
    reference: "Bauer et al., arXiv:2012.12272v2, Eqs. (1), (10) and (11)",
    derivativeBasis: ["c_Q", "c_u", "c_d", "c_L", "c_WW"],
    invariantCoordinates: ["c_t", "c_b", "a_2", "ctilde_WW"],
    equations: [
      "c_t=-c_Q+c_u",
      "c_b=-c_Q+c_d",
      "a_2=3c_Q+c_L",
      "ctilde_WW=c_WW-a_2/2",
    ],
    derivativeToInvariant,
  },
  quotientCertificate: {
    nullDirectionName: "projection of completed B-L, not baryon number alone",
    bMinusLNull,
    imageOfBMinusLNull: matVec(derivativeToInvariant, bMinusLNull),
    rawExample,
    shiftedExample,
    invariantExample,
    shiftedInvariantExample,
    invariantUnderBMinusLShift: invariantExample.every((x, i) => close(x, shiftedInvariantExample[i])),
  },
  corpusTranslation: {
    declaredSlice: "one diagonal generation, corpus all-left-handed convention, redundant Higgs-current coefficient fixed to c_H=0",
    equations: [
      "v_u=c_Q-c_u=-c_t",
      "v_d=c_Q-c_d=-c_b",
      "a_2=3c_Q+c_L",
      "ctilde_WW=c_WW-a_2/2",
    ],
    corpusPlusDirectWeakCoordinates: ["v_u", "v_d", "a_2", "c_WW"],
    measuredCoordinates: ["c_t", "c_b", "ctilde_WW"],
    corpusToMeasured,
    weakBlindDirection,
    imageOfWeakBlindDirection: matVec(corpusToMeasured, weakBlindDirection),
    measuredExample,
    measuredBlindShift,
    currentOnlySlice: {
      condition: "c_WW=0",
      map: currentOnlyMap,
      inverseEquations: ["v_u=-c_t", "v_d=-c_b", "a_2=-2 ctilde_WW"],
      determinant: -0.5,
      responseTransport: "F_corpus=T^T F_measured T",
      responseExample,
      transportedResponseExample: currentOnlyResponse,
    },
  },
  boundary: {
    closed: "The signed tree-level translation is exact in the cited normalization and the c_H=0 operator basis. The corpus current-source slice maps invertibly to (c_t,c_b,ctilde_WW) only when the independent direct coefficient c_WW is fixed.",
    correctedClaim: "The five-coordinate quotient is the physical quotient of phase-current sources, not the complete parameter space of a general ALP EFT with independent bosonic operators.",
    nonIdentification: "A W-associated measurement of ctilde_WW alone cannot separate the current anomaly a_2 from an independent c_WW because (delta a_2,delta c_WW)=(2 lambda,lambda) is invisible.",
    open: "RG evolution, electroweak matching, flavor matrices, covariance transport and the source-native three-coupling amplitude remain to be computed at one declared scale and scheme.",
    nextCalculation: "Choose either the current-only UV hypothesis c_WW=0 or retain c_WW as a sixth source coordinate; then run the RG and weak-threshold map into the measured basis before evaluating the 27 settings.",
  },
};

if (write) await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
console.log(JSON.stringify({ outputPath, quotient: result.quotientCertificate, corpusTranslation: result.corpusTranslation, boundary: result.boundary }, null, 2));

import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

const fullAmplitudeMap = [[-1 / 2, 1, 0], [0, 1, 1]];
const fixedCbbMap = [[-1 / 2, 1], [0, 1]];
const fullNull = [2, 1, -1];
const matVec = (matrix, vector) => matrix.map(row => row.reduce((sum, value, i) => sum + value * vector[i], 0));
const rateBranches = [];
for (const weakSign of [-1, 1]) {
  for (const photonSign of [-1, 1]) {
    const weakAmplitude = weakSign * 2;
    const photonAmplitude = photonSign * 3;
    rateBranches.push({ weakSign, photonSign, cWW: photonAmplitude, A2: 2 * (photonAmplitude - weakAmplitude) });
  }
}

const evidence = {
  schema: "admissibility.alp-charged-neutral-detector-rank/1",
  date: "2026-10-25",
  sourceCoordinates: ["A_2", "c_WW", "c_BB"],
  amplitudeRecords: {
    chargedWeakAfterKnownTerms: "R_W = c_WW - A_2/2",
    neutralPhotonAfterKnownFermionAndThresholdTerms: "R_gamma = c_WW + c_BB",
  },
  fullAmplitudeMap,
  fullNull,
  fullNullImage: matVec(fullAmplitudeMap, fullNull),
  fixedCbb: {
    map: fixedCbbMap,
    determinant: -1 / 2,
    inverse: ["c_WW = R_gamma", "A_2 = 2*(R_gamma - R_W)"],
    amplitudeIdentifiable: true,
  },
  rateOnlyExample: {
    measuredSquares: { weak: 4, photon: 9 },
    branches: rateBranches,
    branchesBeforeGlobalSignQuotient: rateBranches.length,
    relativeSignBranches: 2,
    uniqueSignedIdentification: false,
  },
  decisions: {
    chargedPlusNeutralAmplitudeRowsSufficeWhenCbbFixed: true,
    chargedPlusNeutralRatesAloneSufficeForSignedIdentification: false,
    coherentInterferenceOrPhaseReferenceRequired: true,
    unrestrictedThreeOriginLabelsIdentifiable: false,
    sourceCompleteLoopsThresholdsWidthsAcceptanceRequired: true,
    newPhysicsEvidence: false,
  },
};

if (process.argv.includes("--write")) writeFileSync(resolve("evidence/data/alp-charged-neutral-detector-rank-v1.json"), `${JSON.stringify(evidence, null, 2)}\n`);
console.log(JSON.stringify({ fixedCbbDeterminant: -0.5, fullNullImage: evidence.fullNullImage, rateBranches: rateBranches.length }, null, 2));

#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const sourcePath = path.resolve(here, "../../evidence/data/a11-platform-realization-comparison.json");
const data = JSON.parse(fs.readFileSync(sourcePath, "utf8"));

const add2 = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale2 = (s, A) => A.map((row) => row.map((x) => s * x));
const outer2 = ([x, y]) => [[x * x, x * y], [x * y, y * y]];
const det2 = (A) => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const vec = (A) => [A[0][0], A[1][1], Math.SQRT2 * A[0][1]];
const dot = (x, y) => x.reduce((sum, value, i) => sum + value * y[i], 0);
const norm = (x) => Math.sqrt(dot(x, x));
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const det3 = (M) =>
  M[0][0] * (M[1][1] * M[2][2] - M[1][2] * M[2][1])
  - M[0][1] * (M[1][0] * M[2][2] - M[1][2] * M[2][0])
  + M[0][2] * (M[1][0] * M[2][1] - M[1][1] * M[2][0]);

const exp = data.minimalExecutableExperiment;
const branchMatrices = exp.branches.map((branch) => outer2(branch.outerVector));
const responses = exp.sectorConductances.map((weights) =>
  weights.reduce((sum, weight, i) => add2(sum, scale2(weight, branchMatrices[i])), [[0, 0], [0, 0]]),
);
const determinants = responses.map(det2);
const positiveDefinite = responses.map((C) => C[0][0] > 0 && det2(C) > 0);
const responseVectors = responses.map(vec);
const spanDeterminant = det3(responseVectors);
const responseSpanRank = Math.abs(spanDeterminant) > 1e-12 ? 3 : 2;

const referenceVectors = exp.referencePlaneBranchIds.map((id) => {
  const index = exp.branches.findIndex((branch) => branch.id === id);
  return vec(branchMatrices[index]);
});
const rawNormal = cross(referenceVectors[0], referenceVectors[1]);
const normal = rawNormal.map((x) => x / norm(rawNormal));
const Dc = [[0, 0], [0, 0]];
const Ds = [[0, 0], [0, 0]];
for (let h = 0; h < 3; h += 1) {
  const theta = 2 * Math.PI * h / 3;
  const cPart = scale2((2 / 3) * Math.cos(theta), responses[h]);
  const sPart = scale2((2 / 3) * Math.sin(theta), responses[h]);
  const cNext = add2(Dc, cPart);
  const sNext = add2(Ds, sPart);
  for (let i = 0; i < 2; i += 1) for (let j = 0; j < 2; j += 1) {
    Dc[i][j] = cNext[i][j];
    Ds[i][j] = sNext[i][j];
  }
}
const meanNorm = responseVectors.reduce((sum, v) => sum + norm(v), 0) / 3;
const transverseFirstHarmonic = Math.hypot(dot(normal, vec(Dc)), dot(normal, vec(Ds))) / meanNorm;

const operationalScores = data.platforms.map((platform) => ({
  id: platform.id,
  score: data.operationalCriteria.reduce((sum, criterion) => sum + platform.scores[criterion], 0),
  topologyClass: platform.topologyClass,
})).sort((a, b) => b.score - a.score || b.topologyClass - a.topologyClass || a.id.localeCompare(b.id));

const scoreFieldsValid = data.platforms.every((platform) =>
  data.operationalCriteria.every((criterion) => [0, 1, 2].includes(platform.scores[criterion]))
  && [0, 1, 2].includes(platform.topologyClass),
);
const syntheticWinner = operationalScores[0].id === "passive-switched-two-port";
const protectedCandidates = operationalScores.filter((x) => x.topologyClass === 2);
const protectedCandidateNotReady = protectedCandidates.every((x) => x.score < operationalScores[0].score);

const report = {
  protocol: data.protocol,
  operationalRanking: operationalScores,
  topologyMeaningKeptSeparate: true,
  fixture: {
    responses,
    determinants,
    positiveDefinite,
    responseSpanRank,
    spanDeterminant,
    transverseFirstHarmonic,
    genuineTopologicalHolonomy: exp.expected.genuineTopologicalHolonomy,
  },
  checks: {
    scoreFieldsValid,
    syntheticWinner,
    protectedCandidateExists: protectedCandidates.length > 0,
    protectedCandidateNotOperationalWinner: protectedCandidateNotReady,
    determinantsMatch: determinants.every((x, i) => Math.abs(x - exp.expected.responseDeterminants[i]) < 1e-12),
    allResponsesPositiveDefinite: positiveDefinite.every(Boolean),
    responseSpanRankMatches: responseSpanRank === exp.expected.responseSpanRank,
    transverseFirstHarmonicStrictlyPositive: transverseFirstHarmonic > 1e-12,
    syntheticFixtureNotCalledHolonomy: exp.claimClass === "synthetic-control validation only" && exp.expected.genuineTopologicalHolonomy === false,
  },
};
report.passed = Object.values(report.checks).every(Boolean);

process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
if (!report.passed) process.exitCode = 1;

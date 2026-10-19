import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const generated = resolve(here, "generated");
const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const dot = (left, right) => left.reduce((sum, value, index) => sum + value * right[index], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const determinant3 = ([r1, r2, r3]) => dot(r1, cross(r2, r3));
const projectorCoordinate = (r) => [r ** 2, 1, Math.SQRT2 * r];

const triples = [
  [-2, 0.5, 3],
  [0, 1, 2],
  [-1.2, -0.1, 0.4],
  [1, 1, 2]
].map((ratios) => {
  const coordinates = ratios.map(projectorCoordinate);
  const determinant = determinant3(coordinates);
  const vandermonde = Math.SQRT2 * (ratios[1] - ratios[0]) * (ratios[2] - ratios[0]) * (ratios[2] - ratios[1]);
  return { ratios, coordinates, determinant, vandermonde, distinct: new Set(ratios).size === 3 };
});
assert.ok(triples.every(({ determinant, vandermonde }) => Math.abs(determinant - vandermonde) < 1e-10));
assert.ok(triples.filter(({ distinct }) => distinct).every(({ determinant }) => Math.abs(determinant) > 1e-6));
assert.ok(triples.filter(({ distinct }) => !distinct).every(({ determinant }) => Math.abs(determinant) < 1e-12));

// Include the projective point at infinity, representing a state seen only by O_g.
const infinityCoordinate = [1, 0, 0];
const finiteWithInfinity = [0.5, 2].map((r) => projectorCoordinate(r));
const infinityDeterminant = determinant3([infinityCoordinate, ...finiteWithInfinity]);
assert.ok(Math.abs(infinityDeterminant) > 1e-6);

// Threshold-separated state classes make their weights independently observable.
const stateClasses = [
  { id: "scalar-pair", threshold: 4, ratio: 2 },
  { id: "gauge-pair", threshold: 0, ratio: "infinity" },
  { id: "four-scalar-or-mixed", threshold: 16, ratio: -0.6 }
];
const coordinateOf = ({ ratio }) => ratio === "infinity" ? infinityCoordinate : projectorCoordinate(ratio);
const stateClassDeterminant = determinant3(stateClasses.map(coordinateOf));
assert.ok(Math.abs(stateClassDeterminant) > 1e-6);

// Equal dimensions or three named sectors are insufficient when their amplitude ratios coincide.
const collapsedClasses = [
  { id: "sector-a", ratio: 1.5 },
  { id: "sector-b", ratio: 1.5 },
  { id: "sector-c", ratio: 1.5 }
];
const collapsedDeterminant = determinant3(collapsedClasses.map(coordinateOf));
assert.ok(Math.abs(collapsedDeterminant) < 1e-12);

const result = {
  protocol: "claimipedia-d03-projective-spectrum-strike/1",
  strikeId: "d03-projective-source-ratio-vandermonde-v1",
  theoremCandidate: {
    spectralProjectors: "For real reciprocal sources, each resolved state class with amplitude vector v_n=(<n|O_g|0>,<n|O_H|0>) contributes a positive rank-one projector v_n v_n^T to the spectral measure.",
    projectiveCoordinate: "When the Higgs amplitude is nonzero, only the ratio r_n=v_g/v_H fixes the projector direction; a vanishing Higgs amplitude is the projective point at infinity.",
    vandermondeCriterion: "For three finite ratios r1,r2,r3, the determinant of their coordinates (r_i^2,1,sqrt(2)r_i) is sqrt(2)(r2-r1)(r3-r1)(r3-r2). Thus their projectors span H2(R) exactly when the ratios are pairwise distinct.",
    physicalQualification: "Distinct projector directions give linear span. An open physical image additionally requires independently variable nonnegative weights, obtained for example from separated thresholds, controls or selection rules.",
    complexPhaseBoundary: "If amplitudes do not admit one common real structure, the natural carrier is H2(C); phase alignment or an antiunitary symmetry is an additional gate for H2(R)."
  },
  finiteRatioFixtures: triples,
  infinityFixture: { infinityCoordinate, finiteRatios: [0.5, 2], determinant: infinityDeterminant },
  candidateStateCensus: { stateClasses, coordinateDeterminant: stateClassDeterminant, status: "structural target only; the third Standard-Model amplitude ratio is not yet calculated" },
  collapsedSectorCounterexample: { collapsedClasses, coordinateDeterminant: collapsedDeterminant },
  dispositions: {
    threeDistinctRealSourceRatiosSpanH2: true,
    threeNamedSectorsAutomaticallySpanH2: false,
    twoProjectiveDirectionsCanSpanH2: false,
    independentWeightsNeededForOpenImage: true,
    commonRealStructureAutomatic: false
  },
  nextGate: "Compute source-amplitude ratios for scalar-pair, gauge-pair and the lowest mixed/four-particle channels in Abelian Higgs theory, including phase and threshold typing.",
  authority: { proposalOnly: true, entails: false, empiricalAuthority: false, automaticCorpusAdmission: false, applicationAdmission: false }
};

const receipt = {
  protocol: "claimipedia-d03-projective-spectrum-strike-receipt/1",
  checks: {
    spectralProjectorDecompositionRecorded: true,
    vandermondeIdentityVerified: true,
    repeatedRatioCollapseVerified: true,
    infinityPointHandled: true,
    thresholdTypedCandidateCensusRecorded: true,
    spanAndOpenImageSeparated: true,
    realAndComplexCarriersSeparated: true,
    authorityBoundaryPreserved: result.authority.automaticCorpusAdmission === false
  },
  resultSha256: sha256(JSON.stringify(result)),
  passed: true
};
assert.ok(Object.values(receipt.checks).every(Boolean));

mkdirSync(generated, { recursive: true });
writeFileSync(resolve(generated, "d03-projective-spectrum-result.json"), `${JSON.stringify(result, null, 2)}\n`);
writeFileSync(resolve(generated, "d03-projective-spectrum-receipt.json"), `${JSON.stringify(receipt, null, 2)}\n`);
console.log(JSON.stringify(receipt, null, 2));

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const shell = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-cutoff-charge-shell-enumeration-v1.json'
), 'utf8'));
const graph = shell.normFourSingleChargeGraph;
const vertices = graph.vertices;
const histogram = Object.entries(graph.degreeHistogram).map(([degree, count]) => ({degree: Number(degree), count}));
const mean = histogram.reduce((sum, item) => sum + item.degree * item.count, 0) / vertices;
const variance = histogram.reduce((sum, item) => sum + (item.degree - mean) ** 2 * item.count, 0) / vertices;
const exterior = graph.exteriorHops;
const p0 = graph.isolatedVertices / vertices;
const p6 = graph.exteriorHopsByTargetNorm['6'] / exterior;
const p8 = graph.exteriorHopsByTargetNorm['8'] / exterior;
const fiveSigmaTwoSidedAlpha = 5.733031437583866e-7;
const structuralTestCount = 4;
const structuralPerTestAlpha = fiveSigmaTwoSidedAlpha / structuralTestCount;
const hoeffdingSamples = (tolerance, alpha) => Math.ceil(Math.log(2 / alpha) / (2 * tolerance ** 2));
const bernsteinSamples = (valueVariance, maximumDeviation, tolerance, alpha) => Math.ceil(
  Math.log(2 / alpha) * (2 * valueVariance + 2 * maximumDeviation * tolerance / 3) / tolerance ** 2
);
const zeroEventSamples = (upperRate, alpha) => Math.ceil(Math.log(alpha) / Math.log(1 - upperRate));
const isolatedTolerance = 0.01;
const degreeTolerance = 0.03;
const transitionTolerance = 0.01;
const rootlessUpperRate = 1e-4;
const familyAlpha = 0.05;
const oddLeakageUpperRate = 1e-3;
const evenMatrixElementTolerance = 0.02;
const zeroChargeDirectedHops = graph.exteriorHopsByTargetNorm['0'];
const inversionPairsToZero = zeroChargeDirectedHops / 2;
const oddShotsPerPair = zeroEventSamples(oddLeakageUpperRate, familyAlpha / inversionPairsToZero);
const evenShotsPerPair = hoeffdingSamples(evenMatrixElementTolerance, familyAlpha / inversionPairsToZero);
const isolatedSamples = hoeffdingSamples(isolatedTolerance, structuralPerTestAlpha);
const degreeSamples = bernsteinSamples(variance, Math.max(mean, 12 - mean), degreeTolerance, structuralPerTestAlpha);
const stateSamples = Math.max(isolatedSamples, degreeSamples);
const transitionSamples = hoeffdingSamples(transitionTolerance, structuralPerTestAlpha);

const output = {
  schemaVersion: 'leech-charge-shell-commissioning-v1',
  date: '2026-10-25',
  source: shell.schemaVersion,
  exactTargets: {
    normFourStates: vertices,
    isolatedFraction: p0,
    meanInternalDegree: mean,
    degreeVariance: variance,
    exteriorHops: exterior,
    normSixExteriorFraction: p6,
    normEightExteriorFraction: p8,
    normTwoExteriorHops: graph.exteriorHopsByTargetNorm['2'] ?? 0,
    zeroChargeDirectedHops,
    inversionPairsToZero,
    evenPairZeroChargeMatrixElementMagnitude: 1 / Math.sqrt(2),
    oddPairZeroChargeMatrixElementMagnitude: 0
  },
  preregisteredSampling: {
    structuralTwoSidedFailureProbability: fiveSigmaTwoSidedAlpha,
    structuralTestCount,
    structuralPerTestFailureProbability: structuralPerTestAlpha,
    concentrationBounds: 'Hoeffding for proportions and Bernstein with the frozen degree variance and range for the mean degree',
    isolatedFractionTolerance: isolatedTolerance,
    meanDegreeTolerance: degreeTolerance,
    exteriorFractionTolerance: transitionTolerance,
    uniformlySampledNormFourStates: stateSamples,
    isolatedFractionMinimumSamples: isolatedSamples,
    meanDegreeMinimumSamples: degreeSamples,
    singleChargeCommandsPerState: 48,
    stateSurveyTransitionCommands: 48 * stateSamples,
    uniformlySampledExteriorHops: transitionSamples,
    rootlessNormTwoUpperRate: rootlessUpperRate,
    rootlessConfidence: 1 - familyAlpha,
    rootlessZeroEventSamples: zeroEventSamples(rootlessUpperRate, familyAlpha),
    oddZeroChargeLeakageUpperRate: oddLeakageUpperRate,
    oddCancellationFamilyConfidence: 1 - familyAlpha,
    oddCancellationShotsPerPair: oddShotsPerPair,
    oddCancellationTotalShots: oddShotsPerPair * inversionPairsToZero,
    evenControlMatrixElementTolerance: evenMatrixElementTolerance,
    evenControlFamilyConfidence: 1 - familyAlpha,
    evenControlShotsPerPair: evenShotsPerPair,
    evenControlTotalShots: evenShotsPerPair * inversionPairsToZero
  },
  pass: [
    `sampled isolated fraction is within ${isolatedTolerance} of ${p0}`,
    `sampled mean internal degree is within ${degreeTolerance} of ${mean}`,
    `sampled norm-six and norm-eight exterior fractions are each within ${transitionTolerance} of their frozen targets`,
    `no norm-two target is observed in at least ${zeroEventSamples(rootlessUpperRate, familyAlpha)} exterior-hop samples`,
    `all ${inversionPairsToZero} odd charge-pair states have zero-charge leakage below ${oddLeakageUpperRate} at family confidence ${1 - familyAlpha}`,
    `all ${inversionPairsToZero} even controls reproduce matrix-element magnitude 1/sqrt(2) within ${evenMatrixElementTolerance} at family confidence ${1 - familyAlpha}`
  ],
  failMeaning: {
    degreeOrCoronaMismatch: 'wrong Gram basis, cutoff map, or single-charge hopping operator',
    normTwoEvent: 'rootlessness failure or charge-norm calibration error',
    oddCancellationFailureWithEvenControlPassing: 'inversion phase/coherence failure',
    bothOddAndEvenControlFail: 'state preparation, zero-charge readout, or hopping calibration failure'
  },
  boundary: 'This packet commissions the finite cutoff-two Leech charging and cosine dictionary. Passing it does not establish the bulk gap, chiral edge, inversion orbifold, Moonshine character, Monster defects, or Griess product.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));

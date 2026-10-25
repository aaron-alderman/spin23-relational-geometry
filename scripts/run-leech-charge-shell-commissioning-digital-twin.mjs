#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', name), 'utf8'));
const shell = read('leech-cutoff-charge-shell-enumeration-v1.json');
const packet = read('leech-charge-shell-commissioning-v1.json');
const discrimination = read('leech-charge-shell-discrimination-v1.json');
const robust = read('leech-charge-shell-drift-robust-likelihood-v1.json');

let state = 20261028;
function uniform() { state = (1664525 * state + 1013904223) >>> 0; return (state + 0.5) / 2 ** 32; }
function binomial(trials, probability) {
  let count = 0;
  for (let i = 0; i < trials; i += 1) if (uniform() < probability) count += 1;
  return count;
}
function categoricalCounts(trials, weightedValues) {
  const total = weightedValues.reduce((sum, item) => sum + item.weight, 0);
  const cumulative = [];
  let running = 0;
  for (const item of weightedValues) { running += item.weight / total; cumulative.push({...item, ceiling: running}); }
  const counts = Object.fromEntries(weightedValues.map(item => [item.value, 0]));
  for (let i = 0; i < trials; i += 1) {
    const draw = uniform();
    const selected = cumulative.find(item => draw <= item.ceiling) ?? cumulative.at(-1);
    counts[selected.value] += 1;
  }
  return counts;
}

const targets = packet.exactTargets;
const sampling = packet.preregisteredSampling;
const background = robust.referenceDesign.commonBackgroundUpper;
const rootBudget = robust.referenceDesign.rootful;
const oddBudget = robust.referenceDesign.oddSinglePair;
const rootThreshold = 0.000225;
const oddThreshold = 0.00125;
const degreeWeights = Object.entries(shell.normFourSingleChargeGraph.degreeHistogram).map(([value, weight]) => ({value: Number(value), weight}));
const exteriorWeights = Object.entries(shell.normFourSingleChargeGraph.exteriorHopsByTargetNorm).map(([value, weight]) => ({value: Number(value), weight}));

function structuralSurvey(overrides = {}) {
  const isolatedProbability = targets.isolatedFraction + (overrides.isolatedFractionShift ?? 0);
  const isolatedCount = binomial(sampling.uniformlySampledNormFourStates, isolatedProbability);
  const degreeCounts = categoricalCounts(sampling.uniformlySampledNormFourStates, degreeWeights);
  const meanDegree = Object.entries(degreeCounts).reduce((sum, [degree, count]) => sum + Number(degree) * count, 0) / sampling.uniformlySampledNormFourStates;
  const exteriorCounts = categoricalCounts(sampling.uniformlySampledExteriorHops, exteriorWeights.map(item => item.value === 8 ? {...item, weight: item.weight + (overrides.normEightExteriorFractionShift ?? 0) * targets.exteriorHops} : item));
  const normSixFraction = exteriorCounts[6] / sampling.uniformlySampledExteriorHops;
  const normEightFraction = exteriorCounts[8] / sampling.uniformlySampledExteriorHops;
  return {
    isolatedFraction: isolatedCount / sampling.uniformlySampledNormFourStates,
    meanDegree,
    normSixFraction,
    normEightFraction,
    pass: {
      isolatedFraction: Math.abs(isolatedCount / sampling.uniformlySampledNormFourStates - targets.isolatedFraction) <= sampling.isolatedFractionTolerance,
      meanDegree: Math.abs(meanDegree - targets.meanInternalDegree) <= sampling.meanDegreeTolerance,
      normSixFraction: Math.abs(normSixFraction - targets.normSixExteriorFraction) <= sampling.exteriorFractionTolerance,
      normEightFraction: Math.abs(normEightFraction - targets.normEightExteriorFraction) <= sampling.exteriorFractionTolerance
    }
  };
}

function differenceArm(trialsPerArm, signalProbability, threshold) {
  const signalEvents = binomial(trialsPerArm, signalProbability);
  const blankEvents = binomial(trialsPerArm, background);
  const difference = signalEvents / trialsPerArm - blankEvents / trialsPerArm;
  return {trialsPerArm, signalEvents, blankEvents, difference, threshold, pass: difference <= threshold};
}

function detectorSurvey(overrides = {}) {
  const root = differenceArm(rootBudget.trialsPerArm, background + (overrides.normTwoDetectedExcess ?? 0), rootThreshold);
  const oddPairs = Array.from({length: targets.inversionPairsToZero}, (_, pair) => differenceArm(
    oddBudget.trialsPerArm,
    background + (pair === (overrides.oddLeakPair ?? -1) ? (overrides.oddDetectedExcess ?? 0) : 0),
    oddThreshold
  ));
  const evenPairs = Array.from({length: targets.inversionPairsToZero}, (_, pair) => {
    const magnitude = targets.evenPairZeroChargeMatrixElementMagnitude + (pair === (overrides.evenBiasPair ?? -1) ? (overrides.evenMatrixElementBias ?? 0) : 0);
    const shots = sampling.evenControlShotsPerPair;
    const plus = binomial(shots, (1 + magnitude) / 2);
    const estimate = 2 * plus / shots - 1;
    return {pair, shots, plus, estimate, residual: estimate - targets.evenPairZeroChargeMatrixElementMagnitude, pass: Math.abs(estimate - targets.evenPairZeroChargeMatrixElementMagnitude) <= sampling.evenControlMatrixElementTolerance};
  });
  return {root, oddPairs, evenPairs, pass: {root: root.pass, odd: oddPairs.every(item => item.pass), even: evenPairs.every(item => item.pass)}};
}

function classify(detector) {
  const odd = detector.pass.odd ? 'pass' : 'fail';
  const even = detector.pass.even ? 'pass' : 'fail';
  return discrimination.decisionTruthTable.find(row => row.oddCancellation === odd && row.evenControl === even).meaning;
}

function makeCase(id, structuralOverrides = {}, detectorOverrides = {}) {
  const structural = structuralSurvey(structuralOverrides);
  const detector = detectorSurvey(detectorOverrides);
  const gates = {...structural.pass, rootlessness: detector.pass.root, oddCancellation: detector.pass.odd, evenControl: detector.pass.even};
  return {id, structural, detector, phaseControlMeaning: classify(detector), gates, allPass: Object.values(gates).every(Boolean)};
}

const cases = [
  makeCase('ideal-leech-shell'),
  makeCase('graph-isolation-shift', {isolatedFractionShift: 0.03}),
  makeCase('corona-norm-eight-shift', {normEightExteriorFractionShift: -0.03}),
  makeCase('rootful-contamination', {}, {normTwoDetectedExcess: 0.0005 * 0.9}),
  makeCase('single-pair-inversion-phase-leak', {}, {oddLeakPair: 7, oddDetectedExcess: 0.005 * 0.5}),
  makeCase('single-pair-even-control-bias', {}, {evenBiasPair: 11, evenMatrixElementBias: 0.06})
];
const byId = Object.fromEntries(cases.map(item => [item.id, item]));
const output = {
  schemaVersion: 'leech-charge-shell-commissioning-digital-twin-v1',
  date: '2026-10-26',
  inputs: [shell.schemaVersion, packet.schemaVersion, discrimination.schemaVersion, robust.schemaVersion],
  acquisitionModel: {
    structuralStateSamples: sampling.uniformlySampledNormFourStates,
    exteriorHopSamples: sampling.uniformlySampledExteriorHops,
    robustRootfulTotalTrials: rootBudget.totalTrials,
    robustOddFamilyTotalTrials: robust.referenceDesign.oddFamilyTotalTrials,
    evenControlTotalShots: sampling.evenControlTotalShots,
    commonBackground: background,
    detectorEfficiency: {rootful: 0.9, odd: 0.5},
    randomization: 'deterministic seeded Bernoulli and exact categorical sampling from the enumerated shell histograms'
  },
  cases,
  decision: {
    idealAccepted: byId['ideal-leech-shell'].allPass,
    everyNamedCounterfeitRejected: discrimination.counterfeits.every(item => !byId[item.id].allPass),
    eachCounterfeitRejectedByNamedObservable: {
      graphIsolation: !byId['graph-isolation-shift'].gates.isolatedFraction,
      coronaNormEight: !byId['corona-norm-eight-shift'].gates.normEightFraction,
      rootful: !byId['rootful-contamination'].gates.rootlessness,
      inversionLeak: !byId['single-pair-inversion-phase-leak'].gates.oddCancellation && byId['single-pair-inversion-phase-leak'].gates.evenControl,
      evenBias: !byId['single-pair-even-control-bias'].gates.evenControl
    },
    implication: 'one frozen synthetic acquisition and truth-table path accepts the exact shell and localizes every named counterfeit to its preregistered observable class'
  },
  boundary: 'This aggregate seeded digital twin assumes independent trials, known efficiencies and declared backgrounds. It validates the decision plumbing, not the physical carrier, the bounded-drift estimates or the route-swapped detector implementation.'
};

if (process.argv.includes('--write')) fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-digital-twin-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));

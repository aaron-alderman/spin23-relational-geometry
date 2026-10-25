#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const protocol = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-v1.json'), 'utf8'));
const power = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-discrimination-v1.json'), 'utf8'));
const familyAlpha = 1e-6;

function bernsteinTwoSample(eventRate, efficiency, background, alpha) {
  const signalExcess = eventRate * efficiency;
  if (background + signalExcess >= 1) throw new Error('invalid signal probability');
  const threshold = signalExcess / 2;
  const nullVariance = 2 * background * (1 - background);
  const alternativeVariance = (
    (background + signalExcess) * (1 - background - signalExcess)
    + background * (1 - background)
  );
  const logPenalty = Math.log(1 / alpha);
  const falsePositiveSamples = Math.ceil(
    logPenalty * (2 * nullVariance + 2 * threshold / 3) / threshold ** 2
  );
  const falseNegativeSamples = Math.ceil(
    logPenalty * (2 * alternativeVariance + 4 * threshold / 3) / threshold ** 2
  );
  return {
    eventRate,
    efficiency,
    background,
    signalExcess,
    decisionThreshold: threshold,
    perTailFailureProbability: alpha,
    signalTrials: Math.max(falsePositiveSamples, falseNegativeSamples),
    blankTrials: Math.max(falsePositiveSamples, falseNegativeSamples),
    totalTrials: 2 * Math.max(falsePositiveSamples, falseNegativeSamples),
    falsePositiveSamples,
    falseNegativeSamples
  };
}

const rootfulRate = power.counterfeits.find(item => item.id === 'rootful-contamination').perturbation.normTwoEventRate;
const oddRate = power.counterfeits.find(item => item.id === 'single-pair-inversion-phase-leak').perturbation.oddZeroChargeLeakageRateOnOnePair;
const backgrounds = [1e-6, 1e-5, 1e-4, 1e-3];
const rootfulEfficiencies = [0.5, 0.75, 0.9];
const oddEfficiencies = [0.25, 0.5, 0.75];
const rootfulSurface = backgrounds.flatMap(background => rootfulEfficiencies.map(
  efficiency => bernsteinTwoSample(rootfulRate, efficiency, background, familyAlpha)
));
const oddPerPairAlpha = familyAlpha / protocol.exactTargets.inversionPairsToZero;
const oddSurface = backgrounds.flatMap(background => oddEfficiencies.map(
  efficiency => bernsteinTwoSample(oddRate, efficiency, background, oddPerPairAlpha)
));
const referenceRootful = bernsteinTwoSample(rootfulRate, 0.9, 1e-5, familyAlpha);
const referenceOddPair = bernsteinTwoSample(oddRate, 0.5, 1e-5, oddPerPairAlpha);

const output = {
  schemaVersion: 'leech-charge-shell-background-likelihood-v1',
  date: '2026-10-25',
  inputs: [protocol.schemaVersion, power.schemaVersion],
  method: {
    schedule: 'cryptographically committed random interleaving of signal and hopping-disabled blank trials',
    statistic: 'difference of signal and blank event proportions',
    threshold: 'one half of the efficiency-adjusted counterfeit signal excess',
    bound: 'two-sample Bernstein bounds with independent bounded Bernoulli arms',
    familyFailureProbability: familyAlpha
  },
  referenceDesign: {
    measuredBackgroundUpper: 1e-5,
    rootful: referenceRootful,
    oddSinglePair: referenceOddPair,
    oddPairCount: protocol.exactTargets.inversionPairsToZero,
    oddFamilyTotalTrials: referenceOddPair.totalTrials * protocol.exactTargets.inversionPairsToZero
  },
  costSurface: {
    backgrounds,
    rootfulEfficiencies,
    oddEfficiencies,
    rootful: rootfulSurface,
    oddSinglePair: oddSurface
  },
  promotionRule: 'Use the table entry at or below the measured background upper bound and at or below the measured detection efficiency. If neither bracket exists, regenerate the table before data collection.',
  boundary: 'The two-sample design tolerates nonzero stationary background but still assumes independent paired trials and a common signal/blank background. Drift, afterpulsing, crosstalk, or label-dependent background must be tested separately.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-background-likelihood-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));

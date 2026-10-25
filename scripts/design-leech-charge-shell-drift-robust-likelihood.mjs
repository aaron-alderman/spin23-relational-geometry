#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-background-likelihood-v1.json'), 'utf8'));

function robustBudget(reference, labelBiasFraction, designEffect) {
  const {eventRate, efficiency, background, decisionThreshold, perTailFailureProbability} = reference;
  const signalExcess = eventRate * efficiency;
  const labelDifferenceBound = labelBiasFraction * decisionThreshold;
  const remainingGap = decisionThreshold - labelDifferenceBound;
  if (remainingGap <= 0) throw new Error('label difference reaches decision threshold');
  const nullSignal = background + labelDifferenceBound;
  const nullBlank = background;
  const alternativeSignal = background + signalExcess;
  const alternativeBlank = background + labelDifferenceBound;
  if (Math.max(nullSignal, alternativeSignal, alternativeBlank) >= 1) throw new Error('invalid probability');
  const variance = (p) => p * (1 - p);
  const nullVariance = variance(nullSignal) + variance(nullBlank);
  const alternativeVariance = variance(alternativeSignal) + variance(alternativeBlank);
  const penalty = Math.log(1 / perTailFailureProbability);
  const falsePositiveIndependent = Math.ceil(
    penalty * (2 * nullVariance + 4 * remainingGap / 3) / remainingGap ** 2
  );
  const falseNegativeIndependent = Math.ceil(
    penalty * (2 * alternativeVariance + 4 * remainingGap / 3) / remainingGap ** 2
  );
  const independentTrialsPerArm = Math.max(falsePositiveIndependent, falseNegativeIndependent);
  const trialsPerArm = Math.ceil(designEffect * independentTrialsPerArm);
  return {
    labelBiasFractionOfDecisionThreshold: labelBiasFraction,
    labelDifferenceBound,
    designEffect,
    remainingDecisionGap: remainingGap,
    independentTrialsPerArm,
    trialsPerArm,
    totalTrials: 2 * trialsPerArm,
    falsePositiveIndependent,
    falseNegativeIndependent
  };
}

const fractions = [0, 0.1, 0.25, 0.4];
const designEffects = [1, 1.5, 2, 4];
const rootReference = base.referenceDesign.rootful;
const oddReference = base.referenceDesign.oddSinglePair;
const surface = (reference) => fractions.flatMap(fraction => designEffects.map(
  effect => robustBudget(reference, fraction, effect)
));
const rootSurface = surface(rootReference);
const oddSurface = surface(oddReference);
const selectedFraction = 0.25;
const selectedEffect = 2;
const referenceRoot = robustBudget(rootReference, selectedFraction, selectedEffect);
const referenceOdd = robustBudget(oddReference, selectedFraction, selectedEffect);
const oddPairs = base.referenceDesign.oddPairCount;

const output = {
  schemaVersion: 'leech-charge-shell-drift-robust-likelihood-v1',
  date: '2026-10-25',
  input: base.schemaVersion,
  interpretation: {
    labelDifferenceBound: 'absolute signal-versus-blank background difference after randomized interleaving',
    designEffect: 'variance inflation from autocorrelation, afterpulsing or clustered trials; equals effective raw trials divided by independent trials',
    guard: 'label difference must stay strictly below the decision threshold'
  },
  referenceDesign: {
    commonBackgroundUpper: base.referenceDesign.measuredBackgroundUpper,
    selectedLabelBiasFraction: selectedFraction,
    selectedDesignEffect: selectedEffect,
    rootful: referenceRoot,
    oddSinglePair: referenceOdd,
    oddPairCount: oddPairs,
    oddFamilyTotalTrials: referenceOdd.totalTrials * oddPairs
  },
  costSurface: {
    labelBiasFractions: fractions,
    designEffects,
    rootful: rootSurface,
    oddSinglePair: oddSurface
  },
  executionContract: [
    'cryptographically commit the signal/blank labels and acquisition order before unblinding',
    'balance signal and blank counts inside every acquisition block',
    'estimate the label-dependent background difference from interleaved blank-label sentinels',
    'estimate the integrated autocorrelation/design effect from the same time-ordered record',
    'select a cost-surface cell no more favorable than both measured bounds; otherwise regenerate before hypothesis testing'
  ],
  boundary: 'The robust surface covers bounded label asymmetry and variance inflation. It does not cover nonergodic state changes, unbounded adversarial drift, or a detector response that changes specifically when the physical signal is present.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-drift-robust-likelihood-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));

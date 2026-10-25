#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const protocol = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-v1.json'), 'utf8'));
const power = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-discrimination-v1.json'), 'utf8'));
const sampling = protocol.preregisteredSampling;
const passProbability = 0.95;
const desiredFalseAcceptance = 1e-6;
const maximumBackgroundForZeroPass = (samples, probability) => 1 - probability ** (1 / samples);
const minimumEfficiencyForDetection = (eventRate, samples, falseAcceptance) => (
  (1 - falseAcceptance ** (1 / samples)) / eventRate
);
const rootfulRate = power.counterfeits.find(item => item.id === 'rootful-contamination').perturbation.normTwoEventRate;
const phaseRate = power.counterfeits.find(item => item.id === 'single-pair-inversion-phase-leak').perturbation.oddZeroChargeLeakageRateOnOnePair;
const graphShift = Math.abs(power.counterfeits.find(item => item.id === 'graph-isolation-shift').perturbation.isolatedFractionShift);
const coronaShift = Math.abs(power.counterfeits.find(item => item.id === 'corona-norm-eight-shift').perturbation.normEightExteriorFractionShift);
const evenBias = Math.abs(power.counterfeits.find(item => item.id === 'single-pair-even-control-bias').perturbation.evenMatrixElementBias);

const output = {
  schemaVersion: 'leech-charge-shell-detector-burden-v1',
  date: '2026-10-25',
  inputs: [protocol.schemaVersion, power.schemaVersion],
  zeroEventBackgroundBurden: {
    requiredIdealPassProbability: passProbability,
    normTwoSamples: sampling.rootlessZeroEventSamples,
    maximumNormTwoBackgroundPerTrial: maximumBackgroundForZeroPass(sampling.rootlessZeroEventSamples, passProbability),
    oddPairSamplesEach: sampling.oddCancellationShotsPerPair,
    oddPairCount: protocol.exactTargets.inversionPairsToZero,
    maximumOddBackgroundPerTrialForFamilyPass: maximumBackgroundForZeroPass(
      sampling.oddCancellationShotsPerPair * protocol.exactTargets.inversionPairsToZero,
      passProbability
    )
  },
  detectorEfficiencyBurden: {
    desiredFalseAcceptance,
    normTwoCounterfeitRate: rootfulRate,
    minimumNormTwoDetectionEfficiency: minimumEfficiencyForDetection(
      rootfulRate, sampling.rootlessZeroEventSamples, desiredFalseAcceptance
    ),
    oddLeakCounterfeitRate: phaseRate,
    minimumOddLeakDetectionEfficiency: minimumEfficiencyForDetection(
      phaseRate, sampling.oddCancellationShotsPerPair, desiredFalseAcceptance
    )
  },
  adversarialMaskingMargins: {
    graphSamplingBiasNeededToEnterAcceptanceBand: graphShift - sampling.isolatedFractionTolerance,
    coronaSamplingBiasNeededToEnterAcceptanceBand: coronaShift - sampling.exteriorFractionTolerance,
    evenControlCalibrationBiasNeededToEnterAcceptanceBand: evenBias - sampling.evenControlMatrixElementTolerance
  },
  requiredPromotion: {
    options: [
      'demonstrate raw background and efficiency beyond all recorded burdens on the selected platform',
      'replace zero-event acceptance with a preregistered signal-versus-background likelihood ratio using interleaved blank controls',
      'cryptographically commit randomized state/command order and bound selection imbalance below the masking margins'
    ],
    recommended: 'interleaved two-sample likelihood with blinded randomized scheduling, because the raw zero-background burdens are substantially stronger than the current hardware dictionary establishes'
  },
  boundary: 'This audit does not retract the ideal-model power calculation. It proves that those powers cannot be transported to laboratory data without measured efficiency, background, drift, and randomization guarantees.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-detector-burden-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));

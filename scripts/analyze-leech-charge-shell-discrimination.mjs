#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const protocol = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-charge-shell-commissioning-v1.json'
), 'utf8'));
const target = protocol.exactTargets;
const sampling = protocol.preregisteredSampling;
const exp = Math.exp;
const proportionFalseAccept = (shift, tolerance, samples) => {
  const gap = Math.abs(shift) - tolerance;
  return gap <= 0 ? 1 : exp(-2 * samples * gap ** 2);
};

const counterfeits = [
  {
    id: 'graph-isolation-shift',
    perturbation: {isolatedFractionShift: 0.03},
    rejectingObservable: 'isolated fraction',
    falseAcceptanceUpperBound: proportionFalseAccept(0.03, sampling.isolatedFractionTolerance, sampling.uniformlySampledNormFourStates),
    failMeaning: 'wrong Gram basis, cutoff map, or hopping graph'
  },
  {
    id: 'corona-norm-eight-shift',
    perturbation: {normEightExteriorFractionShift: -0.03},
    rejectingObservable: 'norm-eight exterior fraction',
    falseAcceptanceUpperBound: proportionFalseAccept(-0.03, sampling.exteriorFractionTolerance, sampling.uniformlySampledExteriorHops),
    failMeaning: 'wrong inter-shell hopping corona'
  },
  {
    id: 'rootful-contamination',
    perturbation: {normTwoEventRate: 5e-4},
    rejectingObservable: 'zero-event norm-two null',
    falseAcceptanceUpperBound: (1 - 5e-4) ** sampling.rootlessZeroEventSamples,
    failMeaning: 'rootlessness failure or norm calibration error'
  },
  {
    id: 'single-pair-inversion-phase-leak',
    perturbation: {oddZeroChargeLeakageRateOnOnePair: 0.005},
    rejectingObservable: 'odd zero-charge cancellation',
    falseAcceptanceUpperBound: (1 - 0.005) ** sampling.oddCancellationShotsPerPair,
    failMeaning: 'inversion phase/coherence failure when the even control passes'
  },
  {
    id: 'single-pair-even-control-bias',
    perturbation: {evenMatrixElementBias: 0.06},
    rejectingObservable: 'even Hadamard-test control',
    falseAcceptanceUpperBound: proportionFalseAccept(0.06 / 2, sampling.evenControlBernoulliProbabilityTolerance, sampling.evenControlShotsPerPair),
    failMeaning: 'state preparation, readout, or selective hopping calibration failure'
  }
];
for (const item of counterfeits) {
  item.rejectionProbabilityLowerBound = item.falseAcceptanceUpperBound >= Number.EPSILON
    ? 1 - item.falseAcceptanceUpperBound : null;
  item.rejectionStatement = `rejection probability is at least 1 - ${item.falseAcceptanceUpperBound}`;
}
const maximumFalseAcceptanceUpperBound = Math.max(...counterfeits.map(item => item.falseAcceptanceUpperBound));

const output = {
  schemaVersion: 'leech-charge-shell-discrimination-v1',
  date: '2026-10-25',
  protocol: protocol.schemaVersion,
  targetSnapshot: {
    isolatedFraction: target.isolatedFraction,
    normEightExteriorFraction: target.normEightExteriorFraction,
    normTwoEventRate: 0,
    oddZeroChargeLeakageRate: 0,
    evenMatrixElementMagnitude: target.evenPairZeroChargeMatrixElementMagnitude
  },
  counterfeits,
  decisionTruthTable: [
    {oddCancellation: 'pass', evenControl: 'pass', meaning: 'inversion pair commissioned at declared scope'},
    {oddCancellation: 'fail', evenControl: 'pass', meaning: 'relative inversion phase/coherence failure'},
    {oddCancellation: 'pass', evenControl: 'fail', meaning: 'even-arm preparation/readout/selective-hop failure; phase inference withheld'},
    {oddCancellation: 'fail', evenControl: 'fail', meaning: 'shared preparation/readout/selective-hop failure; phase inference withheld'}
  ],
  maximumCounterfeitFalseAcceptanceUpperBound: maximumFalseAcceptanceUpperBound,
  minimumCounterfeitRejectionProbabilityLowerBound: 1 - maximumFalseAcceptanceUpperBound,
  boundary: 'Power bounds apply only to the named effect sizes and declared independent bounded-sample models. Smaller, correlated, drifting, or adversarial errors require a revised protocol and must not inherit these powers.'
};

if (process.argv.includes('--write')) {
  fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-discrimination-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
}
console.log(JSON.stringify(output, null, 2));

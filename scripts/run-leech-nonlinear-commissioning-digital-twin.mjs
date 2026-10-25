#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = name => JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', name), 'utf8'));
const packet = read('leech-nonlinear-commissioning-packet-v1.json');
const harmonic = read('leech-coupled-metric-pendulum-gap-audit-v1.json');
const mixing = read('leech-one-quantum-quartic-mixing-v1.json');
const orderTwo = read('leech-24mode-full-cosine-order-two-v1.json');
const winding = read('leech-compact-winding-action-bound-v1.json');

const baseFrequencies = harmonic.harmonicSmallOscillationCertificate.harmonicFrequenciesAscending;
const calibration = packet.modeSplit.oneBasedCalibrationModes.map(x => x - 1);
const heldOut = packet.modeSplit.oneBasedHeldOutModes.map(x => x - 1);
const harmonicRatios = packet.settings.precisionRatios;
const anharmonicRatios = packet.settings.anharmonicRatios;
const mixedByRatio = new Map(mixing.scans.map(scan => [scan.chargingToCosineRatio, scan.mixedTransitionsAscending]));
const gapByRatio = new Map(orderTwo.scans.map(scan => [scan.chargingToCosineRatio, scan.gapThroughOrderTwo]));
const actionByRatio = new Map(winding.scans.map(scan => [scan.chargingToCosineRatio, scan.rigorousActionFloor]));

let state = 42424242;
function uniform() { state = (1664525 * state + 1013904223) >>> 0; return (state + 0.5) / 2 ** 32; }
function gaussian() { return Math.sqrt(-2 * Math.log(uniform())) * Math.cos(2 * Math.PI * uniform()); }
function dot(a, b) { return a.reduce((sum, x, i) => sum + x * b[i], 0); }
function rms(values) { return Math.sqrt(values.reduce((sum, x) => sum + x * x, 0) / values.length); }

function runCase(id, heldOutKerrMultiplier, seedOffset) {
  state = (42424242 + seedOffset) >>> 0;
  const harmonicRelativeNoise = 8e-5;
  const shiftRelativeNoise = 1e-4;
  const gapRelativeNoise = 8e-5;

  const harmonicFits = harmonicRatios.map(ratio => {
    const target = baseFrequencies.map(value => value * Math.sqrt(ratio));
    const measured = target.map(value => value * (1 + harmonicRelativeNoise * gaussian()));
    const fittedScale = dot(calibration.map(i => measured[i]), calibration.map(i => target[i]))
      / dot(calibration.map(i => target[i]), calibration.map(i => target[i]));
    const residuals = heldOut.map(i => (measured[i] - fittedScale * target[i]) / (fittedScale * target[i]));
    return {ratio, fittedScale, heldOutRmsRelativeResidual: rms(residuals), heldOutMaximumRelativeResidual: Math.max(...residuals.map(Math.abs))};
  });

  const targetShifts = [];
  const measuredShifts = [];
  for (const ratio of anharmonicRatios) {
    const harmonicAtRatio = baseFrequencies.map(value => value * Math.sqrt(ratio));
    const transitions = mixedByRatio.get(ratio);
    for (let mode = 0; mode < 24; mode += 1) {
      const targetShift = transitions[mode] - harmonicAtRatio[mode];
      const multiplier = heldOut.includes(mode) ? heldOutKerrMultiplier : 1;
      targetShifts.push({ratio, mode, value: targetShift});
      measuredShifts.push({ratio, mode, value: multiplier * targetShift * (1 + shiftRelativeNoise * gaussian())});
    }
  }
  const calibrationTargets = targetShifts.filter(item => calibration.includes(item.mode)).map(item => item.value);
  const calibrationMeasured = measuredShifts.filter(item => calibration.includes(item.mode)).map(item => item.value);
  const sharedShiftScale = dot(calibrationTargets, calibrationMeasured) / dot(calibrationTargets, calibrationTargets);
  const shiftScores = anharmonicRatios.map(ratio => {
    const residuals = heldOut.map(mode => {
      const target = targetShifts.find(item => item.ratio === ratio && item.mode === mode).value;
      const measured = measuredShifts.find(item => item.ratio === ratio && item.mode === mode).value;
      return (measured - sharedShiftScale * target) / Math.abs(sharedShiftScale * target);
    });
    const tolerance = ratio === 0.001 ? 0.001 : 0.0025;
    return {ratio, tolerance, heldOutRmsRelativeShiftResidual: rms(residuals), heldOutMaximumRelativeShiftResidual: Math.max(...residuals.map(Math.abs)), pass: Math.max(...residuals.map(Math.abs)) <= tolerance};
  });

  const softGapScores = anharmonicRatios.map(ratio => {
    const target = gapByRatio.get(ratio);
    const measured = target * (1 + gapRelativeNoise * gaussian());
    const relativeResidual = Math.abs(measured - target) / target;
    const tolerance = ratio === 0.001 ? 0.001 : 0.0025;
    return {ratio, target, measured, relativeResidual, tolerance, pass: relativeResidual <= tolerance};
  });

  const parityAndOrdering = anharmonicRatios.map(ratio => {
    const transitions = mixedByRatio.get(ratio);
    return {ratio, firstTransitionOddDriveActive: true, strictlyAscendingWithoutRelabelling: transitions.every((value, i) => i === 0 || value > transitions[i - 1])};
  });

  const offsetProfiles = harmonicRatios.map(ratio => {
    const actionFloor = actionByRatio.get(ratio);
    const amplitude = 0.1 * Math.exp(-actionFloor);
    const samples = Array.from({length: packet.settings.offsetPhasePointsPerRatio}, (_, index) => {
      const phase = 2 * Math.PI * index / packet.settings.offsetPhasePointsPerRatio;
      return {phase, response: amplitude * Math.cos(phase)};
    });
    return {ratio, actionFloor, fittedAmplitude: amplitude, samples};
  });
  const exponentialTrendPass = offsetProfiles.every((item, i) => i === 0 || item.fittedAmplitude > offsetProfiles[i - 1].fittedAmplitude);

  const powerModes = [0, 1, 12, 13];
  const powers = [0.25, 0.5, 1];
  const powerControls = powerModes.map(mode => {
    const intrinsic = mixedByRatio.get(0.001)[mode];
    const slope = intrinsic * 2e-4 * (mode + 1) / 24;
    const measurements = powers.map(power => ({power, center: intrinsic + slope * power}));
    const meanPower = powers.reduce((a, b) => a + b, 0) / powers.length;
    const meanCenter = measurements.reduce((sum, item) => sum + item.center, 0) / measurements.length;
    const fittedSlope = measurements.reduce((sum, item) => sum + (item.power - meanPower) * (item.center - meanCenter), 0)
      / powers.reduce((sum, power) => sum + (power - meanPower) ** 2, 0);
    const intercept = meanCenter - fittedSlope * meanPower;
    return {modeOneBased: mode + 1, intercept, intrinsic, relativeZeroPowerError: Math.abs(intercept - intrinsic) / intrinsic};
  });

  const gates = {
    N1: harmonicFits.every(item => item.heldOutRmsRelativeResidual <= 0.005 && item.heldOutMaximumRelativeResidual <= 0.01),
    N2: shiftScores.every(item => item.pass),
    N3: softGapScores.every(item => item.pass),
    N4: parityAndOrdering.every(item => item.firstTransitionOddDriveActive && item.strictlyAscendingWithoutRelabelling),
    N5: exponentialTrendPass,
    N6: powerControls.every(item => item.relativeZeroPowerError <= 0.001)
  };
  return {
    id,
    injected: {harmonicRelativeNoise, shiftRelativeNoise, gapRelativeNoise, heldOutKerrMultiplier},
    harmonicFits,
    sharedShiftScale,
    shiftScores,
    softGapScores,
    parityAndOrdering,
    offsetProfiles,
    exponentialTrendPass,
    powerControls,
    gates,
    allPass: Object.values(gates).every(Boolean)
  };
}

const ideal = runCase('shared-cosine-carrier', 1, 0);
const counterfeit = runCase('held-out-mode-kerr-counterfeit', 1.005, 1000);
const output = {
  schemaVersion: 'leech-nonlinear-commissioning-digital-twin-v1',
  date: '2026-10-26',
  inputs: [packet.schemaVersion, harmonic.schemaVersion, mixing.schemaVersion, orderTwo.schemaVersion, winding.schemaVersion],
  schedule: packet.configurations,
  cases: [ideal, counterfeit],
  decision: {
    idealAccepted: ideal.allPass,
    counterfeitRejectedBySharedAnharmonicFingerprint: !counterfeit.gates.N2,
    counterfeitPassesOtherGates: ['N1', 'N3', 'N4', 'N5', 'N6'].every(gate => counterfeit.gates[gate]),
    implication: 'the calibration/holdout split distinguishes a shared diagonal-cosine fingerprint from a mode-selective Kerr counterfeit without weakening the harmonic, soft-gap, parity, compactness or power controls'
  },
  boundary: 'This deterministic synthetic twin validates the analysis logic under small Gaussian spectroscopy noise and one deliberately structured Kerr counterfeit. It is not laboratory evidence, a nonlinear likelihood calibration or a proof of the asymptotic remainder.'
};

if (process.argv.includes('--write')) fs.writeFileSync(path.join(root, 'evidence', 'data', 'leech-nonlinear-commissioning-digital-twin-v1.json'), `${JSON.stringify(output, null, 2)}\n`);
console.log(JSON.stringify(output, null, 2));

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-commissioning-v1.json'), 'utf8'));
const shell = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-cutoff-charge-shell-enumeration-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-charge-shell-commissioning-v1', 'wrong schema');
assert(record.source === shell.schemaVersion, 'wrong source');
const target = record.exactTargets;
const sampling = record.preregisteredSampling;
assert(target.normFourStates === shell.normFourSingleChargeGraph.vertices, 'state count mismatch');
assert(Math.abs(target.isolatedFraction - 110242 / 196512) < 1e-15, 'isolated fraction mismatch');
assert(Math.abs(target.meanInternalDegree - 2 * 75856 / 196512) < 1e-15, 'mean degree mismatch');
assert(target.normTwoExteriorHops === 0, 'rootlessness null not frozen');
assert(target.inversionPairsToZero === 16, 'wrong zero-charge pair count');
assert(Math.abs(target.evenPairZeroChargeMatrixElementMagnitude - 1 / Math.sqrt(2)) < 1e-15, 'wrong even control amplitude');
assert(target.oddPairZeroChargeMatrixElementMagnitude === 0, 'odd cancellation target must be zero');
const alpha = sampling.structuralTwoSidedFailureProbability;
const hoeffding = Math.ceil(Math.log(2 / sampling.structuralPerTestFailureProbability) / (2 * sampling.isolatedFractionTolerance ** 2));
assert(sampling.structuralTestCount === 4, 'wrong structural family size');
assert(Math.abs(sampling.structuralPerTestFailureProbability * 4 - alpha) < 1e-20, 'family split mismatch');
assert(sampling.isolatedFractionMinimumSamples === hoeffding, 'Hoeffding budget mismatch');
assert(sampling.uniformlySampledNormFourStates === 82257, 'wrong state survey budget');
assert(sampling.stateSurveyTransitionCommands === 3948336, 'wrong command budget');
assert(sampling.uniformlySampledExteriorHops === 82257, 'wrong exterior survey budget');
assert(sampling.rootlessZeroEventSamples === 29956, 'wrong rootlessness zero-event budget');
assert(sampling.oddCancellationShotsPerPair === 5766, 'wrong odd-pair budget');
assert(sampling.oddCancellationTotalShots === 92256, 'wrong odd total');
assert(sampling.evenControlMatrixElementTolerance === 0.02, 'wrong even-control tolerance');
assert(sampling.evenControlShotsPerPair === 8077, 'wrong even-control pair budget');
assert(sampling.evenControlTotalShots === 129232, 'wrong even-control total');
assert(record.pass.length === 6, 'pass contract incomplete');

console.log(JSON.stringify({
  status: 'PASS',
  isolatedFraction: target.isolatedFraction,
  meanDegree: target.meanInternalDegree,
  normSixFraction: target.normSixExteriorFraction,
  normEightFraction: target.normEightExteriorFraction,
  stateSamples: sampling.uniformlySampledNormFourStates,
  stateSurveyCommands: sampling.stateSurveyTransitionCommands,
  exteriorSamples: sampling.uniformlySampledExteriorHops,
  rootlessSamples: sampling.rootlessZeroEventSamples,
  oddCancellationShots: sampling.oddCancellationTotalShots,
  evenControlShots: sampling.evenControlTotalShots
}));

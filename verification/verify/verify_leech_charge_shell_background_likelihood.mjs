#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-background-likelihood-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-charge-shell-background-likelihood-v1', 'wrong schema');
assert(record.inputs.includes('leech-charge-shell-commissioning-v1'), 'protocol input missing');
assert(record.inputs.includes('leech-charge-shell-discrimination-v1'), 'power input missing');
assert(record.method.bound.includes('Bernstein'), 'Bernstein contract missing');
assert(record.method.familyFailureProbability === 1e-6, 'wrong family alpha');
const reference = record.referenceDesign;
assert(reference.measuredBackgroundUpper === 1e-5, 'wrong reference background');
assert(reference.rootful.efficiency === 0.9, 'wrong rootful efficiency');
assert(reference.rootful.signalTrials === 338280 && reference.rootful.blankTrials === 338280, 'wrong rootful budget');
assert(reference.rootful.totalTrials === 676560, 'wrong rootful total');
assert(reference.oddSinglePair.efficiency === 0.5, 'wrong odd efficiency');
assert(reference.oddSinglePair.perTailFailureProbability === 6.25e-8, 'odd family split mismatch');
assert(reference.oddSinglePair.totalTrials === 142134, 'wrong odd-pair total');
assert(reference.oddFamilyTotalTrials === 2274144, 'wrong odd-family total');
assert(record.costSurface.rootful.length === 12, 'rootful cost surface incomplete');
assert(record.costSurface.oddSinglePair.length === 12, 'odd cost surface incomplete');
assert(record.promotionRule.includes('regenerate'), 'out-of-grid rule missing');

console.log(JSON.stringify({
  status: 'PASS',
  backgroundUpper: reference.measuredBackgroundUpper,
  rootfulEfficiency: reference.rootful.efficiency,
  rootfulTotalTrials: reference.rootful.totalTrials,
  oddEfficiency: reference.oddSinglePair.efficiency,
  oddPairTotalTrials: reference.oddSinglePair.totalTrials,
  oddFamilyTotalTrials: reference.oddFamilyTotalTrials,
  rootfulSurfacePoints: record.costSurface.rootful.length,
  oddSurfacePoints: record.costSurface.oddSinglePair.length
}));

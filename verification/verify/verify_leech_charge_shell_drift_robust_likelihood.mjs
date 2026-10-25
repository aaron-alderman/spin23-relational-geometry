#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-charge-shell-drift-robust-likelihood-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-charge-shell-drift-robust-likelihood-v1', 'wrong schema');
assert(record.input === 'leech-charge-shell-background-likelihood-v1', 'wrong input');
assert(record.referenceDesign.commonBackgroundUpper === 1e-5, 'wrong reference background');
assert(record.referenceDesign.selectedLabelBiasFraction === 0.25, 'wrong label-bias allowance');
assert(record.referenceDesign.selectedDesignEffect === 2, 'wrong design effect');
assert(record.referenceDesign.rootful.labelDifferenceBound === 0.000056250000000000005, 'wrong rootful label bound');
assert(record.referenceDesign.rootful.independentTrialsPerArm === 619575, 'wrong rootful independent budget');
assert(record.referenceDesign.rootful.totalTrials === 2478300, 'wrong rootful total');
assert(record.referenceDesign.oddSinglePair.labelDifferenceBound === 0.0003125, 'wrong odd label bound');
assert(record.referenceDesign.oddSinglePair.independentTrialsPerArm === 130270, 'wrong odd independent budget');
assert(record.referenceDesign.oddSinglePair.totalTrials === 521080, 'wrong odd-pair total');
assert(record.referenceDesign.oddFamilyTotalTrials === 8337280, 'wrong odd-family total');
assert(record.costSurface.rootful.length === 16, 'rootful cost surface incomplete');
assert(record.costSurface.oddSinglePair.length === 16, 'odd cost surface incomplete');
assert(record.executionContract.some(step => step.includes('autocorrelation')), 'autocorrelation control missing');
assert(record.boundary.includes('nonergodic'), 'nonergodic boundary missing');

console.log(JSON.stringify({
  status: 'PASS',
  backgroundUpper: record.referenceDesign.commonBackgroundUpper,
  labelBiasFraction: record.referenceDesign.selectedLabelBiasFraction,
  designEffect: record.referenceDesign.selectedDesignEffect,
  rootfulTotalTrials: record.referenceDesign.rootful.totalTrials,
  oddPairTotalTrials: record.referenceDesign.oddSinglePair.totalTrials,
  oddFamilyTotalTrials: record.referenceDesign.oddFamilyTotalTrials,
  rootfulSurfacePoints: record.costSurface.rootful.length,
  oddSurfacePoints: record.costSurface.oddSinglePair.length
}));

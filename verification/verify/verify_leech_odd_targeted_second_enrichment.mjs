#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(
  root, 'evidence', 'data', 'leech-odd-targeted-second-enrichment-v1.json'
), 'utf8'));

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

assert(record.schemaVersion === 'leech-odd-targeted-second-enrichment-v1', 'wrong schema');
assert(record.configuration.sites === 24 && record.configuration.cutoff === 2, 'wrong carrier');
assert(record.configuration.selection === 'aggregate', 'published record must use stronger aggregate selection');
assert(record.configuration.retainedResidualConfigurations === 50000, 'wrong retained support');
assert(record.firstEnrichment.valuesBelowSeparator === 18, 'wrong first-layer count');
assert(record.firstEnrichment.missingIndicesWithinLowest24.join(',') === '18,19,20,21,22,23', 'wrong target directions');
assert(record.targetedCorrection.orthogonalityToQ0Maximum < 1e-12, 'Q0 orthogonality failed');
assert(record.targetedCorrection.orthogonalityToQ1Maximum < 1e-12, 'Q1 orthogonality failed');
assert(record.targetedCorrection.gramIdentityMaximumError < 1e-11, 'Q2 normalization failed');
assert(record.projectedSpectrum.numberBelowSeparator === 20, 'unexpected separator count');
assert(record.projectedSpectrum.twentyFourth > record.projectedSpectrum.separator, '24th value unexpectedly admitted');
assert(record.projectedSpectrum.lowest24BelowSeparator === false, 'record must refuse admission');
assert(record.admission.variationalProjectionValid === true, 'variational projection not declared valid');
assert(record.admission.exteriorResidualComputed === false, 'exterior residual must remain open');
assert(record.admission.lehmannBoundsComputed === false, 'Lehmann bounds must remain open');

console.log(JSON.stringify({
  status: 'PASS',
  retainedConfigurations: record.configuration.retainedResidualConfigurations,
  projectedDimension: record.configuration.projectedDimension,
  firstLayerBelowSeparator: record.firstEnrichment.valuesBelowSeparator,
  targetedBelowSeparator: record.projectedSpectrum.numberBelowSeparator,
  twentieth: record.projectedSpectrum.ritzValues[19],
  twentyFirst: record.projectedSpectrum.ritzValues[20],
  separator: record.projectedSpectrum.separator,
  admitted: record.projectedSpectrum.lowest24BelowSeparator
}));

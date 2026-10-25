#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-gram-first-ideal-network-manifest-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }
const fraction = value => {
  const [a, b = '1'] = value.split('/');
  return Number(a) / Number(b);
};

assert(record.schemaVersion === 'leech-gram-first-ideal-network-manifest-v1', 'wrong schema');
assert(record.basis === 'gram-first', 'wrong basis');
assert(record.portCount === 24, 'wrong port count');
assert(record.diagonalCapacitors.length === 24, 'capacitor manifest incomplete');
assert(record.unityPaths.length === 24, 'unity paths incomplete');
assert(record.offDiagonalTransformerRatios.length === 252, 'transformer manifest incomplete');
assert(record.counts.totalModeMixingTerms === 276, 'wrong total term count');
const L = Array.from({length: 24}, (_, i) => Array.from({length: 24}, (_, j) => i === j ? 1 : 0));
for (const item of record.offDiagonalTransformerRatios) L[item.inputPort][item.capacitorCoordinate] = fraction(item.ratio);
const D = record.diagonalCapacitors.map(item => fraction(item.relativeCapacitance));
let maximumError = 0;
for (let i = 0; i < 24; i += 1) for (let j = 0; j < 24; j += 1) {
  let value = 0;
  for (let k = 0; k < 24; k += 1) value += L[i][k] * D[k] * L[j][k];
  maximumError = Math.max(maximumError, Math.abs(value - record.targetGramMatrix[i][j]));
}
assert(maximumError < 1e-10, `Gram reconstruction error ${maximumError}`);
assert(record.commissioning.requiredNonidealities.length === 6, 'nonideality handoff incomplete');

console.log(JSON.stringify({
  status: 'PASS',
  ports: record.portCount,
  capacitors: record.counts.capacitors,
  signedOffDiagonalRatios: record.counts.signedOffDiagonalRatios,
  totalModeMixingTerms: record.counts.totalModeMixingTerms,
  maximumFloatingReconstructionError: maximumError,
  nonidealityClasses: record.commissioning.requiredNonidealities.length
}));

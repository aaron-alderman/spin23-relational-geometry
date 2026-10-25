#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-24port-commissioning-digital-twin-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-24port-commissioning-digital-twin-v1', 'wrong schema');
assert(record.inputs.includes('leech-gram-first-ideal-network-manifest-v1'), 'manifest input missing');
assert(record.inputs.includes('leech-24port-admittance-commissioning-packet-v1'), 'protocol input missing');
assert(record.schedule.totalComplexAcquisitions === 25200, 'wrong acquisition count');
assert(record.schedule.heldOutConfigurations === 84, 'wrong held-out count');
const ideal = record.cases.find(item => item.id === 'ideal-gram-first');
const counterfeit = record.cases.find(item => item.id === 'soft-mode-counterfeit');
assert(ideal?.allPass === true, 'ideal carrier not accepted');
assert(ideal.reconstruction.inverseMetricError < 0.00004, 'ideal recovery degraded');
assert(Object.values(ideal.gates).every(Boolean), 'ideal gate failure');
assert(counterfeit?.allPass === false, 'counterfeit accepted');
assert(counterfeit.gates.inverseMetric === false, 'counterfeit inverse gate did not fail');
assert(counterfeit.reconstruction.inverseMetricError > 0.018, 'counterfeit separation too small');
for (const gate of ['reciprocity', 'passivity', 'loss', 'dispersion', 'positiveDefinite', 'heldOutDrive']) {
  assert(counterfeit.gates[gate] === true, `counterfeit unexpectedly fails ${gate}`);
}
assert(record.decision.counterfeitPassesOrdinaryLinearChecks === true, 'ordinary-check contrast missing');
assert(record.boundary.includes('not measured hardware data'), 'synthetic boundary missing');

console.log(JSON.stringify({
  status: 'PASS',
  acquisitions: record.schedule.totalComplexAcquisitions,
  heldOutConfigurations: record.schedule.heldOutConfigurations,
  idealInverseMetricError: ideal.reconstruction.inverseMetricError,
  counterfeitInverseMetricError: counterfeit.reconstruction.inverseMetricError,
  idealAccepted: record.decision.idealAccepted,
  counterfeitRejectedByInverseMetric: record.decision.counterfeitRejectedByInverseMetric,
  counterfeitPassesOrdinaryLinearChecks: record.decision.counterfeitPassesOrdinaryLinearChecks
}));

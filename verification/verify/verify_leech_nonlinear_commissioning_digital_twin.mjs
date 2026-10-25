#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..', '..');
const record = JSON.parse(fs.readFileSync(path.join(root, 'evidence', 'data', 'leech-nonlinear-commissioning-digital-twin-v1.json'), 'utf8'));
function assert(condition, message) { if (!condition) throw new Error(message); }

assert(record.schemaVersion === 'leech-nonlinear-commissioning-digital-twin-v1', 'wrong schema');
assert(record.inputs.includes('leech-nonlinear-commissioning-packet-v1'), 'packet input missing');
assert(record.schedule.total === 228 && record.schedule.totalRepeatedAcquisitions === 22800, 'wrong schedule');
const ideal = record.cases.find(item => item.id === 'shared-cosine-carrier');
const counterfeit = record.cases.find(item => item.id === 'held-out-mode-kerr-counterfeit');
assert(ideal?.allPass === true, 'ideal nonlinear carrier rejected');
assert(Object.values(ideal.gates).every(Boolean), 'ideal nonlinear gate failure');
assert(ideal.shiftScores.every(item => item.pass), 'ideal shift score failure');
assert(ideal.offsetProfiles.every(item => item.samples.length === 32), 'offset profiles incomplete');
assert(counterfeit?.allPass === false, 'Kerr counterfeit accepted');
assert(counterfeit.gates.N2 === false, 'Kerr counterfeit did not fail N2');
for (const gate of ['N1', 'N3', 'N4', 'N5', 'N6']) assert(counterfeit.gates[gate] === true, `counterfeit unexpectedly fails ${gate}`);
assert(counterfeit.shiftScores.every(item => item.heldOutMaximumRelativeShiftResidual > 0.005), 'counterfeit effect too small');
assert(record.decision.counterfeitPassesOtherGates === true, 'discriminator isolation missing');
assert(record.boundary.includes('not laboratory evidence'), 'synthetic boundary missing');

console.log(JSON.stringify({
  status: 'PASS',
  configurations: record.schedule.total,
  acquisitions: record.schedule.totalRepeatedAcquisitions,
  idealGates: ideal.gates,
  idealMaximumShiftResiduals: ideal.shiftScores.map(item => item.heldOutMaximumRelativeShiftResidual),
  counterfeitGates: counterfeit.gates,
  counterfeitMaximumShiftResiduals: counterfeit.shiftScores.map(item => item.heldOutMaximumRelativeShiftResidual),
  counterfeitRejectedOnlyByN2: record.decision.counterfeitRejectedBySharedAnharmonicFingerprint && record.decision.counterfeitPassesOtherGates
}));

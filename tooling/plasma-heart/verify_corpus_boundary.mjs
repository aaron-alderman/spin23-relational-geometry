#!/usr/bin/env node
/** Verify the corpus-grounded momentum boundary without Python output generation. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const claims = [
  'corpus/claims/1800-1899/1800_internal_stress_broken_symmetry_and_control_loops_require_a_declared_momentum_port.md',
  'corpus/claims/1800-1899/1801_standard_qed_forbids_steady_self_thrust_of_a_closed_static_electrostatic_device.md'
];
const sourcesPresent = claims.every((claim) => fs.existsSync(path.join(root, claim)));
const result = {
  protocol: 'plasma-heart-corpus-boundary/1',
  sources: claims,
  sourcesPresent,
  implications: [
    'symmetry breaking selects motion but does not create net momentum without a declared momentum port',
    'a closed static electrostatic apparatus has zero total force under translation-invariant QED',
    'the model must identify material, field, radiation, thermal, chamber, or other external momentum carriers before physical thrust admission'
  ],
  modelStatus: 'reference-cycle only; no free-thrust claim admitted',
  physicalAdmission: false,
  scope: 'Corpus-grounded conservation boundary for the algebra and numerical handoff.'
};
console.log(JSON.stringify(result, null, 2));
if (!sourcesPresent) process.exitCode = 1;

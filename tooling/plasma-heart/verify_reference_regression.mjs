#!/usr/bin/env node
/** Structural regression check without hash snapshots or Python ceremony. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const legacyRoot = path.join(root, 'output/plasma-heart-feedback');
const files = [
  '3d-cycle-packet.json', '3d-cycle-pareto-results.json', '3d-cycle-robust-results.json',
  '3d-cycle-power-ledger.json', '3d-cycle-energy-audit.json', '3d-cycle-mesh-audit.json',
  '3d-cycle-torque-audit.json', '3d-cycle-chemthermal-robust.json', '3d-cycle-compressibility.json',
  '3d-cycle-estimator.json', '3d-cycle-loop-reversal.json', 'resolved-external-cycle-results.json',
  'external-packet-pareto-results.json', 'time-series-import-results.json',
  'surface-contract.schema.json', 'solver-request.json', 'physical-admission-audit.json',
  'requirements-matrix.json', 'corpus-boundary-audit.json'
];
const failures = [];
for (const file of files) {
  const target = path.join(legacyRoot, file);
  if (!fs.existsSync(target)) { failures.push(`missing ${file}`); continue; }
  try {
    const value = JSON.parse(fs.readFileSync(target, 'utf8'));
    if (value && value.physicalAdmission === true) failures.push(`physical admission true: ${file}`);
  } catch (error) { failures.push(`invalid JSON ${file}: ${error.message}`); }
}
const result = {
  protocol: 'plasma-heart-reference-regression/1',
  passed: failures.length === 0,
  checkedFiles: files.length,
  failures,
  physicalAdmission: false,
  scope: 'Structural regression and explicit-status check; no hashes are generated and no physical claim is admitted.'
};
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;

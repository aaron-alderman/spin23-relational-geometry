#!/usr/bin/env node
/** Verify a cycle of solver-IR packets without relying on Python screening. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const inputArg = process.argv.indexOf('--inputs');
const inputs = inputArg >= 0 ? process.argv[inputArg + 1].split(',') : ['output/plasma-heart-algebra/synthetic-ir-packet.json'];
const packets = inputs.map((input) => JSON.parse(fs.readFileSync(path.resolve(root, input), 'utf8')));
const failures = [];
const meshes = new Set();
const solvers = new Set();
for (const [index, packet] of packets.entries()) {
  const identity = packet.identity ?? {};
  meshes.add(identity.meshIdentity); solvers.add(identity.solverIdentity);
  for (const key of ['cycleId', 'sampleIndex', 'time', 'meshIdentity', 'solverIdentity']) if (identity[key] === null || identity[key] === undefined) failures.push(`packet[${index}].identity.${key}`);
  const ledger = packet.ledger ?? {};
  if (!Number.isFinite(ledger.energyResidual)) failures.push(`packet[${index}].ledger.energyResidual`);
  if (!Number.isFinite(ledger.entropyProduction) || ledger.entropyProduction < 0) failures.push(`packet[${index}].ledger.entropyProduction`);
  if (!Array.isArray(packet.geometry?.faceArea) || packet.geometry.faceArea.length === 0) failures.push(`packet[${index}].geometry.faceArea`);
}
if (meshes.size > 1) failures.push('cycle uses multiple mesh identities');
if (solvers.size > 1) failures.push('cycle uses multiple solver identities');
const result = {
  protocol: 'plasma-heart-solver-cycle-verification/1',
  passed: failures.length === 0,
  packetCount: packets.length,
  meshIdentities: [...meshes],
  solverIdentities: [...solvers],
  failures,
  physicalAdmission: false,
  scope: 'Cycle identity and energy/entropy admissibility only; mesh convergence and physical admission remain separate gates.'
};
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;

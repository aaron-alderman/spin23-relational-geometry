#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'tooling/plasma-heart/fixtures/minimal_solver_packet.json'), 'utf8'));
const outDir = path.join(root, 'output/plasma-heart-algebra/custom-cycle-inputs');
fs.mkdirSync(outDir, { recursive: true });
const files = [];
for (let i = 0; i < 5; i += 1) {
  const packet = JSON.parse(JSON.stringify(source));
  packet.identity = { ...packet.identity, cycleId: 'custom-cycle-fixture', sampleIndex: i, time: i * 0.25, period: 1, solverIdentity: 'custom-js' };
  packet.ledger.inputPower = 0.1 + 0.01 * i;
  const file = path.join(outDir, `packet-${i}.json`);
  fs.writeFileSync(file, `${JSON.stringify(packet, null, 2)}\n`);
  files.push(path.relative(root, file).replaceAll('\\', '/'));
}
console.log(JSON.stringify({ protocol: 'plasma-heart-custom-cycle-fixture/1', files, physicalAdmission: false }, null, 2));

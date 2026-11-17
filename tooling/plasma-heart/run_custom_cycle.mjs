#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const arg = process.argv.indexOf('--inputs');
if (arg < 0) throw new Error('--inputs is required');
const inputs = process.argv[arg + 1].split(',');
const outDirArg = process.argv.indexOf('--out-dir');
const outDir = outDirArg >= 0 ? process.argv[outDirArg + 1] : 'output/plasma-heart-algebra/custom-cycle-results';
const absoluteOutDir = path.isAbsolute(outDir) ? outDir : path.join(root, outDir);
fs.mkdirSync(absoluteOutDir, { recursive: true });
const outputs = [];
for (let i = 0; i < inputs.length; i += 1) {
  const output = path.join(absoluteOutDir, `packet-${i}.json`);
  const run = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', inputs[i], '--output', output], { cwd: root, encoding: 'utf8' });
  if (run.status !== 0) throw new Error(`custom solver failed for ${inputs[i]}: ${run.stdout || run.stderr}`);
  outputs.push(path.relative(root, output).replaceAll('\\', '/'));
}
const verify = spawnSync(process.execPath, ['tooling/plasma-heart/verify_solver_cycle.mjs', '--inputs', outputs.join(',')], { cwd: root, encoding: 'utf8' });
if (verify.status !== 0) throw new Error(`cycle verification failed: ${verify.stdout || verify.stderr}`);
console.log(JSON.stringify({ protocol: 'plasma-heart-custom-cycle/1', packetCount: outputs.length, outputs, verification: JSON.parse(verify.stdout), physicalAdmission: false }, null, 2));

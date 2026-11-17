#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const inputs = Array.from({ length: 9 }, (_, i) => path.join(root, `output/plasma-heart-algebra/converted-cycle-inputs/packet-${i}.json`));
const outDir = path.join(root, 'output/plasma-heart-algebra/orientation-reversal-results');
fs.mkdirSync(outDir, { recursive: true });
const evaluate = (reverse) => inputs.map((input, i) => {
  const packet = JSON.parse(fs.readFileSync(input, 'utf8'));
  if (reverse) packet.geometry.outwardNormal = packet.geometry.outwardNormal.map(normal => normal.map(x => -x));
  const temp = path.join(outDir, `${reverse ? 'reverse' : 'forward'}-input-${i}.json`);
  const output = path.join(outDir, `${reverse ? 'reverse' : 'forward'}-${i}.json`);
  fs.writeFileSync(temp, `${JSON.stringify(packet, null, 2)}\n`);
  const run = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', temp, '--output', output], { cwd: root, encoding: 'utf8' });
  if (run.status !== 0) throw new Error(run.stdout || run.stderr);
  return JSON.parse(fs.readFileSync(output, 'utf8'));
});
const forward = evaluate(false), reverse = evaluate(true);
const mean = (rows, key, index = null) => rows.reduce((sum, row) => sum + (index === null ? row.ledger[key] : row.ledger[key][index]), 0) / rows.length;
const forwardForce = [0, 1, 2].map(i => mean(forward, 'force', i)), reverseForce = [0, 1, 2].map(i => mean(reverse, 'force', i));
const forwardPower = mean(forward, 'inputPower'), reversePower = mean(reverse, 'inputPower');
const oddForceComponentN = (forwardForce[0] - reverseForce[0]) / 2;
const evenMeanPowerW = (forwardPower + reversePower) / 2;
const result = { protocol: 'plasma-heart-cycle-orientation-reversal/2', positiveOrientation: { meanForceN: forwardForce, meanPowerW: forwardPower }, negativeOrientation: { meanForceN: reverseForce, meanPowerW: reversePower }, oddForceComponentN, evenMeanPowerW, orientationDiscriminates: Math.abs(oddForceComponentN) > 1e-8, powerEvenWithinOnePercent: Math.abs(forwardPower - reversePower) / Math.max(evenMeanPowerW, 1e-30) < 0.01, physicalAdmission: false, scope: 'Typed-packet orientation reversal; odd response may still be ordinary boundary or medium coupling.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/orientation-reversal-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ oddForceComponentN, evenMeanPowerW, orientationDiscriminates: result.orientationDiscriminates, powerEvenWithinOnePercent: result.powerEvenWithinOnePercent, physicalAdmission: false }, null, 2));

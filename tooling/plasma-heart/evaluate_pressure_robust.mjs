#!/usr/bin/env node
/** Typed pressure scaling over converted solver packets. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const inputDir = path.join(root, 'output/plasma-heart-algebra/converted-cycle-inputs'), outDir = path.join(root, 'output/plasma-heart-algebra/pressure-coupling');
fs.mkdirSync(outDir, { recursive: true });
const packetFiles = fs.readdirSync(inputDir).filter((name) => name.endsWith('.json')).sort();
const scales = [0.8, 0.9, 1, 1.1, 1.2];
const cases = scales.map((pressureScale) => {
  const ledgers = [];
  for (const name of packetFiles) {
    const packet = JSON.parse(fs.readFileSync(path.join(inputDir, name), 'utf8'));
    packet.fluid.pressure = packet.fluid.pressure.map((value) => value * pressureScale);
    packet.identity = { ...packet.identity, meshIdentity: `pressure-scale-${pressureScale}`, solverIdentity: 'custom-js-pressure-robust' };
    const input = path.join(outDir, `input-${pressureScale}-${name}`), output = path.join(outDir, `result-${pressureScale}-${name}`);
    fs.writeFileSync(input, `${JSON.stringify(packet, null, 2)}\n`);
    const run = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', input, '--output', output], { cwd: root, encoding: 'utf8' });
    if (run.status !== 0) throw new Error(`pressure case failed: ${run.stderr || run.stdout}`);
    ledgers.push(JSON.parse(fs.readFileSync(output, 'utf8')).ledger);
  }
  const meanForce = [0, 1, 2].map((i) => ledgers.reduce((sum, ledger) => sum + ledger.force[i], 0) / ledgers.length), forceMagnitudeN = Math.hypot(...meanForce), meanPowerW = ledgers.reduce((sum, ledger) => sum + ledger.inputPower, 0) / ledgers.length, energyResidualMaxW = Math.max(...ledgers.map((ledger) => Math.abs(ledger.energyResidual)));
  return { pressureScale, forceN: meanForce, forceMagnitudeN, meanPowerW, forcePerPowerNPerW: forceMagnitudeN / Math.max(meanPowerW, 1e-30), energyResidualMaxW, closureQualified: energyResidualMaxW < 1e-8 };
});
const result = { protocol: 'plasma-heart-pressure-robustness/2', cases, worstScore: Math.min(...cases.map((x) => x.forcePerPowerNPerW)), passed: cases.every((x) => x.closureQualified), physicalAdmission: false, scope: 'Typed pressure multiplier over converted solver packets; full pressure-dependent species transport and spatial chemistry remain unresolved.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/pressure-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: cases.length, worstScore: result.worstScore, passed: result.passed, physicalAdmission: false }, null, 2));

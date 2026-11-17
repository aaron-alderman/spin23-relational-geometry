#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/converted-cycle-inputs/packet-0.json'), 'utf8'));
const outDir = path.join(root, 'output/plasma-heart-algebra/chemistry-coupling'); fs.mkdirSync(outDir, { recursive: true });
const cases = [];
for (const reactionRateScale of [0.8, 0.9, 1, 1.1, 1.2]) {
  const packet = JSON.parse(JSON.stringify(source));
  const reaction = reactionRateScale * 0.1, speciesA = 1 - reaction, speciesB = reaction;
  packet.fluid.speciesDensities = packet.fluid.speciesDensities.map(() => [speciesA, speciesB]);
  packet.chemistry.reactionSource = packet.chemistry.reactionSource.map(() => [reaction]);
  packet.chemistry.reactionHeat = packet.chemistry.reactionHeat.map(() => 5 * reaction);
  packet.thermal.heatFlux = packet.thermal.heatFlux.map(value => Array.isArray(value) ? value.map(x => x + 5 * reaction) : value + 5 * reaction);
  packet.identity = { ...packet.identity, meshIdentity: `chemistry-rate-${reactionRateScale}`, solverIdentity: 'custom-js' };
  const input = path.join(outDir, `input-${reactionRateScale}.json`), output = path.join(outDir, `result-${reactionRateScale}.json`); fs.writeFileSync(input, `${JSON.stringify(packet, null, 2)}\n`);
  const run = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', input, '--output', output], { cwd: root, encoding: 'utf8' }); if (run.status !== 0) throw new Error(run.stdout || run.stderr);
  const solved = JSON.parse(fs.readFileSync(output, 'utf8'));
  cases.push({ reactionRateScale, meanForceN: solved.ledger.force, forceMagnitudeN: Math.hypot(...solved.ledger.force), heatExportW: solved.ledger.heatExport, meanSpeciesA: speciesA, meanSpeciesB: speciesB, reactionHeatW: solved.ledger.jouleHeating, energyResidualW: solved.ledger.energyResidual });
}
const result = { protocol: 'plasma-heart-chemistry-surface/2', cases, allPositive: cases.every(item => item.forceMagnitudeN > 0 && item.heatExportW > 0), metadata: { species: ['A', 'B'], reactionHeatIncluded: true, maxwellStressIncluded: true, massPressureAlreadyCounted: true, emForceAlreadyCounted: false }, physicalAdmission: false, scope: 'Typed species/reaction/thermal coupling; resolved reaction kinetics and transport remain required.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/chemistry-surface-coupling-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: cases.length, allPositive: result.allPositive, physicalAdmission: false }, null, 2));

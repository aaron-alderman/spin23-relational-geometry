#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const sourcePath = path.join(root, 'output/plasma-heart-algebra/converted-cycle-inputs/packet-0.json');
const source = JSON.parse(fs.readFileSync(sourcePath, 'utf8'));
const outDir = path.join(root, 'output/plasma-heart-algebra/mesh-convergence');
fs.mkdirSync(outDir, { recursive: true });
const rows = [];
for (const stride of [1, 2, 4]) {
  const packet = JSON.parse(JSON.stringify(source));
  const keep = index => index % stride === 0;
  for (const section of ['faceArea', 'outwardNormal', 'facePosition']) packet.geometry[section] = packet.geometry[section].filter((_, i) => keep(i));
  packet.geometry.faceArea = packet.geometry.faceArea.map(area => area * stride);
  for (const section of ['density', 'velocity', 'pressure', 'temperature', 'speciesDensities']) packet.fluid[section] = packet.fluid[section].filter((_, i) => keep(i));
  for (const section of ['electricField', 'magneticField', 'maxwellStress', 'conductivity', 'currentDensity']) packet.electromagnetic[section] = packet.electromagnetic[section].filter((_, i) => keep(i));
  for (const section of ['heatFlux', 'wallTemperature', 'quenchRate']) packet.thermal[section] = packet.thermal[section].filter((_, i) => keep(i));
  for (const section of ['reactionSource', 'reactionHeat', 'transportCoefficients']) packet.chemistry[section] = packet.chemistry[section].filter((_, i) => keep(i));
  for (const section of ['radiationPowerFlux', 'radiationDirection', 'emissivityOrClosure']) packet.radiation[section] = packet.radiation[section].filter((_, i) => keep(i));
  packet.identity = { ...packet.identity, meshIdentity: `custom-resampled-stride-${stride}`, solverIdentity: 'custom-js' };
  const input = path.join(outDir, `input-${stride}.json`), output = path.join(outDir, `result-${stride}.json`);
  fs.writeFileSync(input, `${JSON.stringify(packet, null, 2)}\n`);
  const run = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', input, '--output', output], { cwd: root, encoding: 'utf8' });
  if (run.status !== 0) throw new Error(run.stdout || run.stderr);
  const solved = JSON.parse(fs.readFileSync(output, 'utf8'));
  rows.push({ stride, faceCount: packet.geometry.faceArea.length, forceN: solved.ledger.force, forceMagnitudeN: Math.hypot(...solved.ledger.force), energyResidualW: solved.ledger.energyResidual });
}
const previous = rows[1].forceMagnitudeN;
const finest = rows[2].forceMagnitudeN;
const relativeLastRefinement = Math.abs(finest - previous) / Math.max(finest, 1e-30);
const result = { protocol: 'plasma-heart-solver-mesh-convergence/2', rows, relativeLastRefinement, meshConverged: relativeLastRefinement < 0.1, explicitMomentumLedger: true, physicalAdmission: false, scope: 'Typed custom-solver mesh refinement proxy; turbulence, wall resolution, and independent solver-order convergence remain unresolved.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/solver-mesh-convergence.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ relativeLastRefinement, meshConverged: result.meshConverged, physicalAdmission: false }, null, 2));

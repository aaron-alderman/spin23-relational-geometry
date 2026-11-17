#!/usr/bin/env node
/** Add explicit one-way Lorentz/Joule sources to the Euler reference. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const euler = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/compressible-euler-3d-evaluation.json'), 'utf8'));
const run = spawnSync(process.execPath, ['tooling/plasma-heart/evaluate_resistive_mhd_reference.mjs'], { cwd: root, encoding: 'utf8' });
if (run.status !== 0) throw new Error(`resistive MHD evaluator failed: ${run.stderr || run.stdout}`);
const mhd = JSON.parse(run.stdout);
const meanForce = [0, 1, 2].map((i) => mhd.samples.reduce((sum, sample) => sum + sample.lorentzForceN[i], 0) / mhd.samples.length);
const meanJoule = mhd.samples.reduce((sum, sample) => sum + sample.jouleHeatingW, 0) / mhd.samples.length;
const packets = euler.packets.map((packet) => {
  const base = packet.integrated.forceMagnitudeN;
  const sourceCorrected = Math.hypot(base, ...meanForce);
  return { grid: packet.grid, surfaceForceMagnitudeN: base, lorentzSourceForceN: meanForce, jouleEnergySourceW: meanJoule, sourceCorrectedForceMagnitudeN: sourceCorrected };
});
const relativeLastRefinement = Math.abs(packets.at(-1).sourceCorrectedForceMagnitudeN - packets.at(-2).sourceCorrectedForceMagnitudeN) / Math.max(packets.at(-1).sourceCorrectedForceMagnitudeN, 1e-30);
const result = { protocol: 'plasma-heart-compressible-mhd-source-reference/2', solverIdentity: euler.packets.at(-1).solver, mhdProtocol: mhd.protocol, packets, lorentzSourceExplicit: true, jouleEnergySourceExplicit: true, surfaceFluxSeparate: true, meshConverged: relativeLastRefinement < 0.1, relativeLastRefinement, physicalAdmission: false, scope: 'Compressible reference with one-way Lorentz and Joule sources; full MHD fluxes, induction and thermodynamic coupling remain unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/compressible-mhd-source-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ grids: packets.length, meshConverged: result.meshConverged, relativeLastRefinement, sourceForceN: meanForce, physicalAdmission: false }, null, 2));

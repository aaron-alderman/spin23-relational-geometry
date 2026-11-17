#!/usr/bin/env node
/** Compatibility linter for the legacy resolved packet shape, without Python. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const input = process.argv[2] ?? 'output/plasma-heart-algebra/3d-cycle-packet.json';
const packet = JSON.parse(fs.readFileSync(path.resolve(root, input), 'utf8'));
const missing = [];
const samples = packet.samples ?? [];
if (samples.length < 4) missing.push('at least four time samples');
const meshes = new Set();
const solvers = new Set();
const faceFields = ['area', 'normal', 'position', 'density', 'velocity', 'pressure', 'emStress', 'heatFlux', 'speciesDensities', 'electronDensityM3', 'conductivitySPerM', 'radiationPowerFluxWPerM2', 'radiationDirection'];
samples.forEach((sample, i) => {
  const meta = sample.metadata ?? {};
  meshes.add(meta.meshHash); solvers.add(meta.solver);
  for (const key of ['meshHash', 'solver', 'schemaVersion', 'forceOrigin']) if (!meta[key]) missing.push(`sample[${i}].metadata.${key}`);
  if (!Array.isArray(sample.faces) || sample.faces.length === 0) { missing.push(`sample[${i}].faces`); return; }
  sample.faces.forEach((face, j) => {
    for (const key of faceFields) if (!(key in face)) missing.push(`sample[${i}].face[${j}].${key}`);
    if (Array.isArray(face.radiationDirection)) {
      const norm = Math.hypot(...face.radiationDirection);
      if (Math.abs(norm - 1) > 1e-6) missing.push(`sample[${i}].face[${j}].radiationDirection not unit`);
    }
  });
});
if (meshes.size !== 1) missing.push('single meshHash across cycle');
if (solvers.size !== 1) missing.push('single solver identity across cycle');
const result = {
  protocol: 'plasma-heart-legacy-resolved-packet-linter/1',
  source: input,
  accepted: missing.length === 0,
  missingCount: new Set(missing).size,
  missing: [...new Set(missing)].sort(),
  physicalAdmission: false,
  scope: 'Compatibility lint for legacy packet shape; passing still requires IR conversion, convergence, and independent energy/entropy evidence.'
};
console.log(JSON.stringify(result, null, 2));
if (!result.accepted) process.exitCode = 1;

#!/usr/bin/env node
/** Build a typed periodic 3-D packet from the JS Stokes evaluator. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const run = spawnSync(process.execPath, ['tooling/plasma-heart/evaluate_3d_stokes_reference.mjs'], { cwd: root, encoding: 'utf8' });
if (run.status !== 0) throw new Error(`Stokes evaluator failed: ${run.stderr || run.stdout}`);
const reference = JSON.parse(run.stdout), base = reference.packets.find((packet) => packet.grid.nx === 8) ?? reference.packets[0];
const eps0 = 8.854187812e-12, mu0 = 4e-7 * Math.PI, period = 2 * Math.PI / 0.1;
const maxwellStress = (position, phase) => { const [x] = position, B = [0, 0.018 + 0.004 * Math.cos(phase), 0.002 + 0.001 * x], E = [0, 0, 2e4 * Math.sin(phase)], e2 = E.reduce((s, v) => s + v * v, 0), b2 = B.reduce((s, v) => s + v * v, 0); return E.map((_, i) => B.map((_, j) => eps0 * (E[i] * E[j] - 0.5 * e2 * (i === j ? 1 : 0)) + (B[i] * B[j] - 0.5 * b2 * (i === j ? 1 : 0)) / mu0)); };
const faceNames = ['inlet', 'outlet', 'yminus', 'yplus', 'zminus', 'zplus'];
const samples = [];
for (let k = 0; k < 9; k += 1) {
  const phase = 2 * Math.PI * k / 8, feedbackPhase = phase + 0.25, scale = 1 + 0.12 * Math.cos(phase), faces = base.faces.map((source, faceIndex) => {
    const face = JSON.parse(JSON.stringify(source)), [x, y] = face.position;
    face.name = faceNames[faceIndex] ?? `boundary-${faceIndex}`;
    face.emStress = maxwellStress(face.position, feedbackPhase);
    face.heatFlux = 18 * (1 + 0.15 * Math.sin(feedbackPhase + x));
    face.speciesDensities = { A: 0.72 + 0.04 * Math.cos(feedbackPhase + x), B: 0.28 - 0.04 * Math.cos(feedbackPhase + x) };
    face.reactionSourceKgPerM3S = 0.01 * (1 + 0.1 * Math.sin(phase));
    face.wallTemperatureK = 420 + 12 * Math.cos(feedbackPhase + y);
    face.quenchRateSInv = 0.08 + 0.01 * Math.sin(phase);
    const mix = face.speciesDensities.A + 0.9 * face.speciesDensities.B, thermal = (face.wallTemperatureK - 420) / 420;
    face.density *= mix * (1 - 0.12 * thermal); face.pressure *= mix * (1 + 0.08 * thermal); face.velocity = face.velocity.map((v, i) => (i === 0 ? v * scale : v));
    return face;
  });
  const netMass = faces.reduce((sum, face) => sum + face.density * face.velocity.reduce((s, v, i) => s + v * face.normal[i], 0) * face.area, 0), outlet = faces.find((face) => face.name === 'outlet');
  if (outlet) outlet.velocity[0] -= netMass / (outlet.density * outlet.area);
  samples.push({ time: period * k / 8, inputPowerW: 0.34 + 0.025 * scale * scale, energyResidualW: 0, entropyProductionW: 1e-3 * scale, metadata: { meshIdentity: '3d-stokes-cycle-js-n8-v1', solver: `${base.solver}+maxwell-screen`, schemaVersion: 'plasma-heart-surface-momentum/1', forceOrigin: [0, 0, 0], massFlowAlreadyCounted: false, emPhotonAlreadyCounted: false, maxwellStressIncluded: true, emForceAlreadyCounted: false, chemistryIncluded: true, thermalFeedbackIncluded: true, massConservationEnforced: true }, faces });
}
const result = { protocol: 'plasma-heart-3d-cycle-reference/2', period, samples, physicalAdmission: false, scope: 'Typed periodic packet from JS Stokes reference; not resolved Navier–Stokes/MHD admission.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ samples: samples.length, period, solver: base.solver, physicalAdmission: false }, null, 2));

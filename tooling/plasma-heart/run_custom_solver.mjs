#!/usr/bin/env node
/** Custom numerical evaluator for a complete solver-IR packet. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../..');
const args = process.argv.slice(2);
const value = (name, fallback = null) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : fallback; };
const input = value('--input');
const output = value('--output', 'output/plasma-heart-algebra/custom-solver-result.json');
if (!input) throw new Error('--input is required');
const inputPath = path.isAbsolute(input) ? input : path.join(root, input);
const packet = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const lint = spawnSync(process.execPath, ['tooling/plasma-heart/lint_plasma_heart_solver_packet.mjs', '--input', input], { cwd: root, encoding: 'utf8' });
if (lint.status !== 0) throw new Error(`solver packet refused by IR linter: ${lint.stdout || lint.stderr}`);

const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const add = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, k) => a.map(x => x * k);
const n = packet.geometry.faceArea.length;
let mass = 0, inputPower = Number(packet.ledger.inputPower ?? 0);
let force = [0, 0, 0], materialForce = [0, 0, 0], maxwellForce = [0, 0, 0], photonForce = [0, 0, 0], torque = [0, 0, 0], joule = 0, radiationPower = 0, mechanicalSurfacePower = 0, heatExport = 0;
for (let i = 0; i < n; i++) {
  const area = packet.geometry.faceArea[i];
  const normal = packet.geometry.outwardNormal[i];
  const rho = packet.fluid.density[i];
  const velocity = packet.fluid.velocity[i];
  const pressure = packet.fluid.pressure[i];
  const electric = packet.electromagnetic.electricField[i];
  const magnetic = packet.electromagnetic.magneticField[i];
  const conductivity = packet.electromagnetic.conductivity[i];
  const current = packet.electromagnetic.currentDensity[i];
  const stress = packet.electromagnetic.maxwellStress[i];
  const material = add(scale(velocity, rho * dot(velocity, normal)), scale(normal, pressure));
  const maxwell = scale(stress.map(row => dot(row, normal)), -1);
  const photon = scale(packet.radiation.radiationDirection[i], -packet.radiation.radiationPowerFlux[i] / 299792458);
  const traction = add(add(material, maxwell), photon);
  materialForce = add(materialForce, scale(material, area));
  maxwellForce = add(maxwellForce, scale(maxwell, area));
  photonForce = add(photonForce, scale(photon, area));
  mechanicalSurfacePower += dot(traction, velocity) * area;
  const heatFlux = packet.thermal.heatFlux[i];
  heatExport += (Array.isArray(heatFlux) ? dot(heatFlux, normal) : Number(heatFlux)) * area;
  force = add(force, scale(traction, area));
  const arm = packet.geometry.facePosition[i].map((x, j) => x - packet.geometry.forceOrigin[j]);
  torque = add(torque, scale(cross(arm, traction), area));
  mass += rho * dot(velocity, normal) * area;
  joule += conductivity * dot(electric, electric) * area;
  radiationPower += packet.radiation.radiationPowerFlux[i] * area;
}
const energyResidual = inputPower - joule - radiationPower;
const result = {
  ...packet,
  identity: { ...packet.identity, solverIdentity: 'custom-conservation-evaluator/1' },
  solver: { engine: 'custom', resolved: true, numericalMethod: 'face-integrated algebra operators', physicalAdmission: false },
  ledger: { ...packet.ledger, force, materialForce, maxwellForce, photonForce, torque, massFlux: mass, jouleHeating: joule, radiationPower, mechanicalSurfacePower, heatExport, energyResidual, forceDecompositionResidual: force.map((x, i) => x - materialForce[i] - maxwellForce[i] - photonForce[i]) },
  physicalAdmission: false,
  scope: 'Resolved custom evaluator output; mesh convergence, independent energy/entropy closure, and external solver comparison remain required.'
};
const outputPath = path.isAbsolute(output) ? output : path.join(root, output);
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ protocol: 'plasma-heart-custom-solver/1', output, force, materialForce, maxwellForce, photonForce, torque, massFlux: mass, energyResidual, physicalAdmission: false }, null, 2));

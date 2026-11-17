#!/usr/bin/env node
/** Evaluate declared packet operators numerically; this is not physical admission. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const ir = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json'), 'utf8'));
const inputArg = process.argv.indexOf('--input');
if (inputArg < 0 || !process.argv[inputArg + 1]) {
  console.error('usage: node tooling/plasma-heart/evaluate_solver_packet.mjs --input <packet.json>');
  process.exit(2);
}
const packet = JSON.parse(fs.readFileSync(path.resolve(root, process.argv[inputArg + 1]), 'utf8'));
const add = (a, b) => a.map((x, i) => x + b[i]);
const scale = (a, s) => a.map((x) => x * s);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const zero = () => [0, 0, 0];
const faces = packet.geometry.faceArea.length;
const requireArray = (section, field, width = faces) => {
  const value = packet[section]?.[field];
  if (!Array.isArray(value) || value.length !== width) throw new Error(`invalid ${section}.${field}`);
  return value;
};
const area = requireArray('geometry', 'faceArea');
const normal = requireArray('geometry', 'outwardNormal');
const position = requireArray('geometry', 'facePosition');
const density = requireArray('fluid', 'density');
const velocity = requireArray('fluid', 'velocity');
const pressure = requireArray('fluid', 'pressure');
const maxwell = requireArray('electromagnetic', 'maxwellStress');
const radiationPower = requireArray('radiation', 'radiationPowerFlux');
const radiationDirection = requireArray('radiation', 'radiationDirection');
const current = requireArray('electromagnetic', 'currentDensity');
const magnetic = requireArray('electromagnetic', 'magneticField');
const electric = requireArray('electromagnetic', 'electricField');
let materialMomentum = zero();
let massFlux = 0;
let maxwellMomentum = zero();
let photonMomentum = zero();
let lorentzForce = zero();
let joulePower = 0;
let force = zero();
let torque = zero();
for (let i = 0; i < faces; i += 1) {
  const material = add(scale(velocity[i], density[i] * dot(velocity[i], normal[i])), scale(normal[i], pressure[i]));
  const em = maxwell[i].map((row) => dot(row, normal[i]));
  const photon = scale(radiationDirection[i], radiationPower[i] / 299792458);
  const faceForce = scale(add(add(material, scale(em, -1)), scale(photon, -1)), area[i]);
  materialMomentum = add(materialMomentum, scale(material, area[i]));
  massFlux += density[i] * dot(velocity[i], normal[i]) * area[i];
  maxwellMomentum = add(maxwellMomentum, scale(em, -area[i]));
  photonMomentum = add(photonMomentum, scale(photon, -area[i]));
  force = add(force, faceForce);
  torque = add(torque, cross(position[i], faceForce));
  lorentzForce = add(lorentzForce, cross(current[i], magnetic[i]));
  joulePower += dot(current[i], electric[i]) * area[i];
}
const result = {
  protocol: 'plasma-heart-solver-evaluation/1',
  authority: ir.authority,
  physicalAdmission: false,
  sampleCount: faces,
  operators: { massFlux, materialMomentum, maxwellMomentum, photonMomentum, lorentzForce, joulePower, force, torque },
  ledger: { inputPower: packet.ledger?.inputPower ?? null, energyResidual: packet.ledger?.energyResidual ?? null, entropyProduction: packet.ledger?.entropyProduction ?? null },
  invariants: ir.invariants,
  scope: 'Numerical evaluation of declared operators only; no solver validation or thrust claim is admitted.'
};
console.log(JSON.stringify(result, null, 2));

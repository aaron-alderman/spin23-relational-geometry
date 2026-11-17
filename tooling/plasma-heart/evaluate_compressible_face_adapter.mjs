#!/usr/bin/env node
/** Stage-1 compressible face-state adapter in the solver-side runtime. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const packet = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), 'utf8'));
const gamma = 1.4, R = 287.05, cp = gamma * R / (gamma - 1);
const dot = (a, b) => a.reduce((s, x, i) => s + x * b[i], 0);
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const samples = []; let maxMach = 0; const speeds = [], densities = [], pressures = [], machValues = [];
for (const sample of packet.samples ?? []) {
  const force = [0, 0, 0], torque = [0, 0, 0]; let mass = 0, enthalpy = 0; const local = [];
  for (const face of sample.faces ?? []) {
    const em = (face.emStress ?? [[0, 0, 0], [0, 0, 0], [0, 0, 0]]).map((row) => dot(row, face.normal));
    const flux = face.density * dot(face.velocity, face.normal); const dF = face.velocity.map((v, i) => face.area * (flux * v + face.pressure * face.normal[i] - em[i])); dF.forEach((v, i) => { force[i] += v; }); cross(face.position, dF).forEach((v, i) => { torque[i] += v; });
    const temperature = face.wallTemperatureK ?? 420; const sound = Math.sqrt(gamma * R * temperature); const speed = Math.hypot(...face.velocity); const mach = speed / sound; const mdot = flux * face.area; const h = cp * temperature + 0.5 * speed * speed; mass += mdot; enthalpy += mdot * h; maxMach = Math.max(maxMach, mach); speeds.push(speed); densities.push(face.density); pressures.push(face.pressure); machValues.push(mach); local.push({ position: face.position, temperatureK: temperature, soundSpeedMPerS: sound, mach, massFluxKgPerS: mdot, totalEnthalpyJPerKg: h });
  }
  samples.push({ time: sample.time, forceN: force, torqueNm: torque, massFluxKgPerS: mass, enthalpyFluxW: enthalpy, faces: local });
}
const result = { protocol: 'plasma-heart-compressible-face-adapter/1', samples, maxMach, maxSpeedMPerS: Math.max(...speeds), meanMach: machValues.reduce((a, b) => a + b, 0) / machValues.length, soundSpeedMPerS: Math.sqrt(gamma * R * 420), densityRangeKgPerM3: [Math.min(...densities), Math.max(...densities)], pressureRangePa: [Math.min(...pressures), Math.max(...pressures)], massClosureMaxKgPerS: Math.max(...samples.map((sample) => Math.abs(sample.massFluxKgPerS))), compressibleStateFinite: samples.every((sample) => Number.isFinite(sample.enthalpyFluxW)), lowMachReference: maxMach < 0.3, compressibilityCorrectionRequired: maxMach >= 0.3, physicalAdmission: false, scope: 'Stage-1 compressible face-state adapter; it does not replace a conservative compressible Navier–Stokes solver.' };
console.log(JSON.stringify(result, null, 2));

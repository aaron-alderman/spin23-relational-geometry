#!/usr/bin/env node
/** Generate the typed quasi-1D periodic isentropic packet. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const areaMach = (m, g = 1.4) => (1 / m) * (2 / (g + 1) * (1 + (g - 1) * m * m / 2)) ** ((g + 1) / (2 * (g - 1)));
const subsonicMach = (ratio, g = 1.4) => { let lo = 1e-5, hi = 0.999999; for (let i = 0; i < 80; i += 1) { const mid = (lo + hi) / 2; if (areaMach(mid, g) > ratio) lo = mid; else hi = mid; } return (lo + hi) / 2; };
const state = (A, Astar, p0, T0 = 300, g = 1.4, R = 287) => { const M = subsonicMach(A / Astar, g), T = T0 / (1 + (g - 1) * M * M / 2), p = p0 * (T / T0) ** (g / (g - 1)), density = p / (R * T), sound = Math.sqrt(g * R * T); return { pressurePa: p, density, velocityMPerS: M * sound }; };
const ri = 0.012, ro = 0.022, L = 0.05, n = 32, Ai = Math.PI * ri ** 2, Ao = Math.PI * ro ** 2, period = 2 * Math.PI / 0.1, slope = (ro - ri) / L, sl = Math.sqrt(1 + slope * slope);
const samples = [];
for (let k = 0; k < 9; k += 1) {
  const t = period * k / 8, pscale = 1 + 0.05 * Math.cos(2 * Math.PI * k / 8), si = state(Ai, Ai, 101325 * pscale), so = state(Ao, Ai, 101325 * pscale), faces = [];
  for (let j = 0; j < n; j += 1) {
    const th = 2 * Math.PI * (j + 0.5) / n, c = Math.cos(th), s = Math.sin(th), dtheta = 2 * Math.PI / n, emStress = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    faces.push({ area: Ai / n, normal: [0, 0, -1], position: [ri * c / 2, ri * s / 2, 0], velocity: [0, 0, si.velocityMPerS], density: si.density, pressure: si.pressurePa, emStress, heatFlux: 0 });
    faces.push({ area: Ao / n, normal: [0, 0, 1], position: [ro * c / 2, ro * s / 2, L], velocity: [0, 0, so.velocityMPerS], density: so.density, pressure: so.pressurePa, emStress, heatFlux: 0 });
    const area = sl * L * ((ri + ro) / 2) * dtheta, tv = [slope * c / sl, slope * s / sl, 1 / sl];
    faces.push({ area, normal: [c / sl, s / sl, -slope / sl], position: [(ri + ro) * c / 2, (ri + ro) * s / 2, L / 2], velocity: tv.map((v) => so.velocityMPerS * v), density: so.density, pressure: so.pressurePa, emStress, heatFlux: 0 });
  }
  samples.push({ time: t, inputPowerW: 0.4 + 0.01 * Math.cos(2 * Math.PI * k / 8), energyResidualW: 0, entropyProductionW: 1e-3, metadata: { meshIdentity: 'quasi1d-cycle-v1', solver: 'quasi1d-isentropic-reference', schemaVersion: 'plasma-heart-surface-momentum/1', forceOrigin: [0, 0, 0], massFlowAlreadyCounted: false, emPhotonAlreadyCounted: false }, faces });
}
const result = { protocol: 'plasma-heart-quasi1d-cycle-packet/2', period, samples, physicalAdmission: false, scope: 'Typed compressible-flow reference packet; replace with resolved 3-D Navier–Stokes/MHD packet for physical claims.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/quasi1d-cycle-packet.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ samples: samples.length, period, physicalAdmission: false }, null, 2));

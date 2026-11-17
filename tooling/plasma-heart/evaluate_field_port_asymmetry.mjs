#!/usr/bin/env node
import fs from 'node:fs';
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const norm = v => Math.hypot(...v);
const q = 1e-6, cm0 = [0, 1e-2, 0], p = [1e-8, 0, 0], m = [0, 0, 1e-6], E0 = 100, B0 = 0.01, coilLossW = 10 * 0.1 ** 2, period = 2 * Math.PI / 0.1;
const cases = [];
for (const biasFraction of [0, 0.25, 0.5]) for (const phaseOffset of [0, Math.PI / 2, Math.PI]) {
  const forceSamples = [], torqueSamples = [];
  for (let k = 0; k <= 64; k += 1) {
    const t = period * k / 64, phase = 0.1 * t;
    const E = [E0 * Math.cos(phase), 0, 0];
    const B = [0, 0, B0 * (biasFraction + Math.sin(phase + phaseOffset))];
    const angularRate = 0.03 * Math.sin(phase);
    const cm = [cm0[0], cm0[1] + 2e-3 * Math.tanh(angularRate / 0.03), cm0[2]];
    forceSamples.push([q * E[0] + cross(cm, B)[0], q * E[1] + cross(cm, B)[1], q * E[2] + cross(cm, B)[2]]);
    torqueSamples.push(cross(p, E).map((x, i) => x + cross(m, B)[i]));
  }
  const average = rows => rows.reduce((sum, row) => sum.map((x, i) => x + row[i]), [0, 0, 0]).map(x => x / rows.length);
  const meanForceN = average(forceSamples), meanTorqueNm = average(torqueSamples), totalPowerW = 0.35 + coilLossW;
  cases.push({ biasFraction, phaseOffset, meanForceN, meanForceMagnitudeN: norm(meanForceN), meanTorqueNm, coilLossW, totalPowerW, forcePerTotalPower: norm(meanForceN) / totalPowerW });
}
const best = cases.reduce((a, b) => b.forcePerTotalPower > a.forcePerTotalPower ? b : a);
const result = { protocol: 'plasma-heart-3d-field-port/2', parameters: { chargeC: q, E0Vpm: E0, B0T: B0, coilLossW }, cases, best, physicalAdmission: false, scope: 'Vector E/B coupling screen; coil geometry, resolved Maxwell solution, and actuator losses remain unresolved.' };
fs.mkdirSync('output/plasma-heart-algebra', { recursive: true });
fs.writeFileSync('output/plasma-heart-algebra/field-port-asymmetry-evaluation.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: cases.length, bestForcePerTotalPower: best.forcePerTotalPower, physicalAdmission: false }, null, 2));

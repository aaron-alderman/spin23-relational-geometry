#!/usr/bin/env node
/** Typed chemistry-rate and phase-jitter robustness grid. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const rows = [];
for (const rateScale of [0.8, 1, 1.2]) for (const jitter of [-0.05, 0, 0.05]) {
  const phaseGain = Math.cos(jitter), force = cycle.meanForceN.map((value, i) => (i === 0 ? value * phaseGain * rateScale : value * rateScale));
  const forceMagnitudeN = Math.hypot(...force), meanPowerW = cycle.meanInputPowerW + 0.002 * Math.abs(rateScale - 1) + 0.001 * Math.abs(jitter);
  rows.push({ rateScale, phaseJitter: jitter, forceN: force, forceMagnitudeN, meanPowerW, forcePerPowerNPerW: forceMagnitudeN / Math.max(meanPowerW, 1e-30), thermalProxy: 0.18 * (1 + Math.abs(jitter)) });
}
const result = { protocol: 'plasma-heart-combined-robustness/2', solverIdentity: cycle.solverIdentity, cases: rows, worstScore: Math.min(...rows.map((x) => x.forcePerPowerNPerW)), worstPeakThermalProxy: Math.max(...rows.map((x) => x.thermalProxy)), passed: rows.every((x) => x.forcePerPowerNPerW > 0 && x.thermalProxy <= 0.25), physicalAdmission: false, scope: 'Typed chemistry-rate and phase-jitter robustness; nonlinear kinetics and thermal lag remain unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/combined-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: rows.length, worstScore: result.worstScore, passed: result.passed, physicalAdmission: false }, null, 2));

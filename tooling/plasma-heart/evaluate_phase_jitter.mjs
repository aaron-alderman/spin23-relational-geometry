#!/usr/bin/env node
/** Typed phase-jitter robustness around the solver-cycle control point. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const rows = [];
for (const dLaser of [-0.05, 0, 0.05]) for (const dCooling of [-0.05, 0, 0.05]) for (const dVessel of [-0.05, 0, 0.05]) {
  const phaseGain = Math.cos(dLaser - dCooling + dVessel);
  const force = cycle.meanForceN.map((value, i) => (i === 0 ? value * phaseGain : value));
  const forceMagnitudeN = Math.hypot(...force);
  const meanPowerW = cycle.meanInputPowerW + 0.002 * (dLaser ** 2 + dCooling ** 2 + dVessel ** 2);
  rows.push({ dLaser, dCooling, dVessel, forceN: force, forceMagnitudeN, meanPowerW, forcePerPowerNPerW: forceMagnitudeN / Math.max(meanPowerW, 1e-30), thermalProxy: 0.18 + 0.04 * Math.abs(dCooling), periodicClosure: cycle.periodicForceClosure });
}
const result = {
  protocol: 'plasma-heart-phase-jitter/2',
  solverIdentity: cycle.solverIdentity,
  jitterRadians: 0.05,
  cases: rows,
  worstScore: Math.min(...rows.map((row) => row.forcePerPowerNPerW)),
  scoreSpread: Math.max(...rows.map((row) => row.forcePerPowerNPerW)) - Math.min(...rows.map((row) => row.forcePerPowerNPerW)),
  worstThermalProxy: Math.max(...rows.map((row) => row.thermalProxy)),
  periodicClosureQualified: cycle.periodicClosureQualified,
  physicalAdmission: false,
  scope: 'Typed phase-jitter robustness over solver-cycle controls; nonlinear actuator and thermal lag remain unresolved.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/phase-jitter-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: rows.length, worstScore: result.worstScore, scoreSpread: result.scoreSpread, periodicClosureQualified: result.periodicClosureQualified, physicalAdmission: false }, null, 2));

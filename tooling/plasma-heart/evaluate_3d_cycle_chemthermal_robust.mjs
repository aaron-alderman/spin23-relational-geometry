#!/usr/bin/env node
/** Typed chemistry/thermal uncertainty over the robust 3-D front. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const robust = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-robust-evaluation.json'), 'utf8'));
const cases = robust.cases.map((item) => {
  const values = [];
  for (const chemistryScale of [0.9, 1, 1.1]) for (const thermalScale of [0.9, 1, 1.1]) {
    const force = cycle.meanMaterialForceN.map((value, i) => value * chemistryScale + cycle.meanMaxwellForceN[i] + cycle.meanPhotonForceN[i]);
    const forceMagnitudeN = Math.hypot(...force), meanPowerW = cycle.meanInputPowerW + 0.005 * Math.abs(thermalScale - 1) + 0.002 * chemistryScale;
    values.push({ chemistryScale, thermalScale, forceN: force, forceMagnitudeN, meanPowerW, forcePerPowerNPerW: forceMagnitudeN / Math.max(meanPowerW, 1e-30), thermalProxy: item.thermalPeakProxy * thermalScale });
  }
  const worstCase = values.reduce((a, b) => b.forcePerPowerNPerW < a.forcePerPowerNPerW ? b : a);
  return { candidate: item.candidate, scenarios: values.length, worstCase, allPositive: values.every((value) => value.forcePerPowerNPerW > 0), maxThermalProxy: Math.max(...values.map((value) => value.thermalProxy)) };
});
const result = { protocol: 'plasma-heart-3d-chemthermal-robust/2', solverIdentity: cycle.solverIdentity, cases, qualified: cases.filter((x) => x.allPositive).length, frontCount: cases.length, verifiedWorstCase: cases.every((x) => x.allPositive), uncertaintySet: { chemistryScale: [0.9, 1, 1.1], thermalScale: [0.9, 1, 1.1] }, physicalAdmission: false, scope: 'Typed chemistry/thermal robustness over 3-D reference cycles; validated transport remains unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-chemthermal-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ frontCount: cases.length, qualified: result.qualified, bestWorst: Math.max(...cases.map((x) => x.worstCase.forcePerPowerNPerW)), physicalAdmission: false }, null, 2));

#!/usr/bin/env node
/** Typed bounded robustness over the 3-D Pareto front. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const pareto = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-pareto-evaluation.json'), 'utf8'));
const cases = pareto.front.map((candidate) => {
  const values = [];
  for (const fieldScaleFactor of [0.9, 1, 1.1]) for (const phaseJitterRad of [-0.1, 0, 0.1]) for (const driveBiasDelta of [-0.02, 0, 0.02]) {
    const scale = candidate.fieldScale * fieldScaleFactor, phaseGain = Math.cos(candidate.phaseShiftRad + phaseJitterRad);
    const force = cycle.meanMaterialForceN.map((value, i) => value * (1 + candidate.driveBias + driveBiasDelta) + cycle.meanMaxwellForceN[i] * scale * phaseGain + cycle.meanPhotonForceN[i]);
    const forceMagnitudeN = Math.hypot(...force), meanPowerW = cycle.meanInputPowerW + 0.02 * (0.018 * scale) ** 2;
    values.push({ fieldScaleFactor, phaseJitterRad, driveBiasDelta, forceN: force, forceMagnitudeN, meanPowerW, forcePerPowerNPerW: forceMagnitudeN / Math.max(meanPowerW, 1e-30), thermalProxy: 0.35 * scale ** 2 + 0.04 * Math.abs(candidate.driveBias + driveBiasDelta) });
  }
  const worstCase = values.reduce((a, b) => b.forcePerPowerNPerW < a.forcePerPowerNPerW ? b : a);
  return { candidate: { fieldScale: candidate.fieldScale, driveBias: candidate.driveBias, phaseShiftRad: candidate.phaseShiftRad }, scenarios: values.length, worstCase, allPositive: values.every((value) => value.forcePerPowerNPerW > 0), thermalPeakProxy: Math.max(...values.map((value) => value.thermalProxy)) };
});
const result = { protocol: 'plasma-heart-3d-cycle-robust/2', solverIdentity: cycle.solverIdentity, cases, qualified: cases.filter((x) => x.allPositive).length, frontCount: cases.length, verifiedWorstCase: cases.every((x) => x.allPositive), uncertaintySet: { fieldScaleFactor: [0.9, 1, 1.1], phaseJitterRad: [-0.1, 0, 0.1], driveBiasDelta: [-0.02, 0, 0.02] }, physicalAdmission: false, scope: 'Typed robust 3-D cycle evaluator; resolved multiphysics validation remains required.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ frontCount: cases.length, qualified: result.qualified, bestWorst: Math.max(...cases.map((x) => x.worstCase.forcePerPowerNPerW)), physicalAdmission: false }, null, 2));

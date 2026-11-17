#!/usr/bin/env node
/** Solver-side Pareto search over typed 3-D cycle outputs and controls. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const candidates = [];
for (const fieldScale of [0.7, 1, 1.3]) for (const driveBias of [-0.06, 0, 0.06]) for (const phaseShiftRad of [-0.25, 0, 0.25]) {
  const phaseGain = Math.cos(phaseShiftRad);
  const material = cycle.meanMaterialForceN.map((value) => value * (1 + driveBias));
  const field = cycle.meanMaxwellForceN.map((value) => value * fieldScale * phaseGain);
  const photon = cycle.meanPhotonForceN;
  const force = [0, 1, 2].map((i) => material[i] + field[i] + photon[i]);
  const magnitude = Math.hypot(...force);
  const fieldLossW = 0.02 * (0.018 * fieldScale) ** 2;
  const meanPowerW = cycle.meanInputPowerW + fieldLossW;
  candidates.push({ fieldScale, driveBias, phaseShiftRad, meanForceN: force, meanForceMagnitudeN: magnitude, meanPowerW, forcePerPowerNPerW: magnitude / Math.max(meanPowerW, 1e-30), thermalProxy: 0.35 * fieldScale ** 2 + 0.04 * Math.abs(driveBias) });
}
const dominates = (a, b) => a.forcePerPowerNPerW >= b.forcePerPowerNPerW && a.thermalProxy <= b.thermalProxy && (a.forcePerPowerNPerW > b.forcePerPowerNPerW || a.thermalProxy < b.thermalProxy);
const front = candidates.filter((candidate) => !candidates.some((other) => other !== candidate && dominates(other, candidate)));
const result = {
  protocol: 'plasma-heart-3d-cycle-pareto/2',
  solverIdentity: cycle.solverIdentity,
  objective: 'maximize typed external force per power while minimizing thermal proxy',
  candidates: candidates.length,
  frontCount: front.length,
  front,
  allPositive: candidates.every((candidate) => candidate.forcePerPowerNPerW > 0),
  explicitMomentumLedger: true,
  maxwellStressIncluded: true,
  syntheticLossCoefficients: true,
  physicalAdmission: false,
  scope: 'Typed 3-D cycle Pareto evaluator; resolved multiphysics calibration and physical admission remain required.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-pareto-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ candidates: candidates.length, frontCount: front.length, best: front.reduce((a, b) => b.forcePerPowerNPerW > a.forcePerPowerNPerW ? b : a), physicalAdmission: false }, null, 2));

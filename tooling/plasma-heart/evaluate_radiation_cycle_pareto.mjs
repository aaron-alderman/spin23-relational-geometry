#!/usr/bin/env node
/** Add the typed radiation port to the typed 3-D cycle Pareto front. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const pareto = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-pareto-evaluation.json'), 'utf8'));
const cases = pareto.front.map((candidate) => {
  const totalForceN = candidate.meanForceN.map((value, i) => value + cycle.meanPhotonForceN[i]);
  const totalForceMagnitudeN = Math.hypot(...totalForceN);
  const totalPowerW = candidate.meanPowerW + cycle.meanRadiationPowerW;
  return { ...candidate, photonRecoilN: cycle.meanPhotonForceN, radiationPortPowerW: cycle.meanRadiationPowerW, totalForceN, totalForceMagnitudeN, totalPowerW, forcePerTotalPowerNPerW: totalForceMagnitudeN / Math.max(totalPowerW, 1e-30) };
});
cases.sort((a, b) => b.forcePerTotalPowerNPerW - a.forcePerTotalPowerNPerW);
const result = { protocol: 'plasma-heart-radiation-cycle-pareto/2', solverIdentity: cycle.solverIdentity, candidates: cases, frontCount: cases.length, best: cases[0], explicitPhotonLedger: true, materialMomentumSeparate: true, energyClosureProvided: cycle.energyClosureQualified, physicalAdmission: false, scope: 'Typed radiation-aware cycle ranking; radiative transfer and port calibration remain unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/radiation-cycle-pareto-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ frontCount: cases.length, bestForcePerTotalPowerNPerW: cases[0].forcePerTotalPowerNPerW, physicalAdmission: false }, null, 2));

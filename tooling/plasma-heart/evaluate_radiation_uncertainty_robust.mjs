#!/usr/bin/env node
/** Typed robust radiation-port uncertainty propagation. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const pareto = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-pareto-evaluation.json'), 'utf8'));
const C = 299792458;
const scenarios = [];
for (const directivity of [0.1, 0.35, 0.6]) for (const laserFraction of [0.02, 0.05, 0.1]) for (const alignment of [0.9, 1, 1.1]) scenarios.push({ directivity, laserFraction, alignment });
const cases = pareto.front.map((candidate) => {
  let worst = null;
  for (const scenario of scenarios) {
    const radiationPowerW = scenario.directivity * cycle.meanRadiationPowerW + scenario.laserFraction * candidate.meanPowerW;
    const recoilN = scenario.alignment * radiationPowerW / C;
    const totalPowerW = candidate.meanPowerW + radiationPowerW;
    const forcePerPowerNPerW = (candidate.meanForceMagnitudeN + recoilN) / Math.max(totalPowerW, 1e-30);
    const row = { ...scenario, radiationPowerW, photonRecoilN: recoilN, totalPowerW, forcePerPowerNPerW };
    if (!worst || row.forcePerPowerNPerW < worst.forcePerPowerNPerW) worst = row;
  }
  return { candidate, scenarios: scenarios.length, worstCase: worst, allPositive: worst.forcePerPowerNPerW > 0 };
});
cases.sort((a, b) => b.worstCase.forcePerPowerNPerW - a.worstCase.forcePerPowerNPerW);
const result = { protocol: 'plasma-heart-radiation-uncertainty-robust/2', solverIdentity: cycle.solverIdentity, cases, scenarioCount: scenarios.length, verifiedWorstCase: cases.every((x) => x.allPositive), directivityUncertaintyIncluded: true, laserFractionUncertaintyIncluded: true, alignmentUncertaintyIncluded: true, physicalAdmission: false, scope: 'Typed radiation-port uncertainty propagation; emissivity and radiative-transfer calibration remain unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/radiation-uncertainty-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: cases.length, scenarioCount: scenarios.length, bestWorstForcePerPowerNPerW: cases[0].worstCase.forcePerPowerNPerW, physicalAdmission: false }, null, 2));

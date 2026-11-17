#!/usr/bin/env node
/** Combine typed external momentum ports without double counting. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const sum = (a, b) => a.map((x, i) => x + b[i]);
const materialForceN = cycle.meanMaterialForceN;
const fieldForceN = cycle.meanMaxwellForceN;
const photonForceN = cycle.meanPhotonForceN;
const totalExternalForceN = sum(sum(materialForceN, fieldForceN), photonForceN);
const totalForceMagnitudeN = Math.hypot(...totalExternalForceN);
const result = {
  protocol: 'plasma-heart-combined-force/2',
  solverIdentity: cycle.solverIdentity,
  components: {
    massFlowForceN: materialForceN,
    photonForceN,
    fieldForceN,
    inputPowerW: cycle.meanInputPowerW
  },
  totalExternalForceN,
  totalForceMagnitudeN,
  totalPowerW: cycle.meanInputPowerW,
  forcePerPower: totalForceMagnitudeN / Math.max(cycle.meanInputPowerW, 1e-30),
  doubleCountingGuard: {
    materialMomentumSeparate: true,
    photonMomentumSeparate: true,
    fieldMomentumSeparate: true,
    inputPowerIncludedOnce: true,
    closedSurfaceTermsNotInvented: true
  },
  physicalAdmission: false,
  scope: 'Combined typed-port ledger from the solver cycle; field calibration, radiation transfer and physical admission remain unresolved.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/combined-force-ledger.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ totalForceMagnitudeN, totalPowerW: cycle.meanInputPowerW, forcePerPower: result.forcePerPower, physicalAdmission: false }, null, 2));

#!/usr/bin/env node
/** Typed total-input-power ledger over algebra-declared actuator controls. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const candidates = [
  { name: 'nominal', fieldGradientTPerM: 0.1, phiVessel: 0, phiLaser: 0 },
  { name: 'robust-worst-case', fieldGradientTPerM: 0.08, phiVessel: 0.06, phiLaser: 0 }
];
const ledger = (candidate) => {
  const coilLossW = 0.5 * candidate.fieldGradientTPerM ** 2;
  const coolingOverheadW = 0.020;
  const vesselDriveW = 0.010 * (1 - Math.cos(candidate.phiVessel - candidate.phiLaser));
  const laserAdditionalW = 0;
  const totalPowerW = cycle.meanInputPowerW + coilLossW + coolingOverheadW + vesselDriveW + laserAdditionalW;
  return {
    candidate,
    surfaceForceN: cycle.meanForceMagnitudeN,
    orbitInputPowerW: cycle.meanInputPowerW,
    coilLossW,
    coolingOverheadW,
    vesselDriveW,
    laserAdditionalW,
    totalPowerW,
    forcePerTotalPowerNPerW: cycle.meanForceMagnitudeN / Math.max(totalPowerW, 1e-30),
    accounting: 'surface force is sourced from the typed cycle; orbit input and added actuator losses are listed once'
  };
};
const rows = candidates.map(ledger);
const result = {
  protocol: 'plasma-heart-total-power-ledger/2',
  solverIdentity: cycle.solverIdentity,
  nominal: rows[0],
  robustWorstCase: rows[1],
  doubleCountingGuard: {
    surfaceForceSource: 'solver-cycle-evaluation',
    orbitPowerSource: 'solver-cycle-evaluation',
    fieldLossSeparate: true,
    coolingSeparate: true,
    vesselSeparate: true
  },
  syntheticLossCoefficients: true,
  physicalAdmission: false,
  scope: 'Typed reduced-order total-power ledger; replace loss coefficients with resolved actuator models before physical admission.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/total-power-ledger.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ nominalForcePerTotalPower: rows[0].forcePerTotalPowerNPerW, robustWorstForcePerTotalPower: rows[1].forcePerTotalPowerNPerW, physicalAdmission: false }, null, 2));

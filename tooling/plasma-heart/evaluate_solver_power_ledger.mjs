#!/usr/bin/env node
import fs from 'node:fs';
const cycle = JSON.parse(fs.readFileSync('output/plasma-heart-algebra/solver-cycle-evaluation.json', 'utf8'));
const candidates = [
  { fieldScale: 0.7, driveBias: -0.06, phaseShiftRad: 0.25, thermalPeakProxy: 0.18 },
  { fieldScale: 0.7, driveBias: 0, phaseShiftRad: 0.25, thermalPeakProxy: 0.18 }
];
const rows = candidates.map(candidate => {
  const scale = Math.abs(candidate.fieldScale);
  const coilLossW = 0.5 * (0.018 * scale) ** 2;
  const fieldStorageW = 0.02 * (0.018 * scale) ** 2;
  const driveLossW = 0.025 * (1 + Math.abs(candidate.driveBias)) ** 2;
  const coolingOverheadW = 0.018 + 0.03 * candidate.thermalPeakProxy;
  const totalPowerW = cycle.meanInputPowerW + coilLossW + fieldStorageW + driveLossW + coolingOverheadW;
  return { candidate, fluidInputPowerW: cycle.meanInputPowerW, coilLossW, fieldStorageW, driveLossW, coolingOverheadW, totalPowerW, forceN: cycle.meanForceMagnitudeN, forcePerTotalPowerNPerW: cycle.meanForceMagnitudeN / totalPowerW, doubleCountingGuard: { fluidInputIncludedOnce: true, coilLossSeparate: true, fieldStorageSeparate: true, driveLossSeparate: true, coolingSeparate: true } };
});
const best = rows.reduce((a, b) => b.forcePerTotalPowerNPerW > a.forcePerTotalPowerNPerW ? b : a);
const result = { protocol: 'plasma-heart-solver-power-ledger/2', solverIdentity: cycle.solverIdentity, candidates: rows, best, allPositive: rows.every(row => row.forcePerTotalPowerNPerW > 0), syntheticLossCoefficients: true, physicalAdmission: false, scope: 'Typed cycle power ledger; coil, field-storage, drive, cooling, and species losses remain unresolved synthetic terms.' };
fs.writeFileSync('output/plasma-heart-algebra/solver-power-ledger.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ candidates: rows.length, bestForcePerTotalPowerNPerW: best.forcePerTotalPowerNPerW, syntheticLossCoefficients: true, physicalAdmission: false }, null, 2));

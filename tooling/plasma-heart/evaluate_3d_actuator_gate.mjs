#!/usr/bin/env node
const frequencyHz = 0.1;
const candidates = [
  { fieldScale: 0.7, driveBias: -0.06, phaseShiftRad: 0.25, thermalPeakProxy: 0.18, worstPowerW: 0.36322 },
  { fieldScale: 0.7, driveBias: 0, phaseShiftRad: 0.25, thermalPeakProxy: 0.18, worstPowerW: 0.36619 }
];
const cases = candidates.map(candidate => {
  const fieldPeak = 0.018 * Math.abs(candidate.fieldScale), fieldSlew = 2 * Math.PI * frequencyHz * fieldPeak;
  const drivePeak = Math.abs(1 + candidate.driveBias) + 0.12, driveSlew = 2 * Math.PI * frequencyHz * drivePeak;
  const phaseRate = 2 * Math.PI * frequencyHz * Math.abs(candidate.phaseShiftRad);
  const values = { fieldPeakT: fieldPeak, fieldSlewTPerS: fieldSlew, drivePeak, driveSlewPerS: driveSlew, phaseRateRadPerS: phaseRate };
  const checks = { fieldPeak: fieldPeak <= 0.03, fieldSlew: fieldSlew <= 0.02, drivePeak: drivePeak <= 1.3, driveSlew: driveSlew <= 1, phaseRate: phaseRate <= 0.2, thermalProxy: candidate.thermalPeakProxy <= 0.25, power: candidate.worstPowerW <= 0.5 };
  return { candidate, values, checks, qualified: Object.values(checks).every(Boolean) };
});
const result = { protocol: 'plasma-heart-3d-actuator-gate/2', frequencyHz, cases, qualified: cases.filter(item => item.qualified).length, allQualified: cases.every(item => item.qualified), physicalAdmission: false, scope: 'Analytic 3-D actuator envelope gate; hardware bandwidth, inductance, and saturation remain unresolved.' };
console.log(JSON.stringify(result, null, 2));

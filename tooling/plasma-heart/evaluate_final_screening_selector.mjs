#!/usr/bin/env node
/** Select the best typed robust candidate after actuator-envelope gating. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const pareto = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-pareto-evaluation.json'), 'utf8'));
const radiation = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/radiation-uncertainty-robust-evaluation.json'), 'utf8'));
const frequencyHz = 0.1;
const limits = { fieldPeakT: 0.03, fieldSlewTPerS: 0.02, drivePeak: 1.3, driveSlewPerS: 1, phaseRateRadPerS: 0.2, thermalProxy: 0.25, powerW: 0.5 };
const key = (c) => `${c.fieldScale}|${c.driveBias}|${c.phaseShiftRad}`;
const robustByKey = new Map(radiation.cases.map((row) => [key(row.candidate), row]));
const cases = pareto.front.map((candidate) => {
  const fieldPeak = 0.018 * Math.abs(candidate.fieldScale), fieldSlew = 2 * Math.PI * frequencyHz * fieldPeak;
  const drivePeak = Math.abs(1 + candidate.driveBias) + 0.12, driveSlew = 2 * Math.PI * frequencyHz * drivePeak;
  const phaseRate = 2 * Math.PI * frequencyHz * Math.abs(candidate.phaseShiftRad);
  const checks = { fieldPeak: fieldPeak <= limits.fieldPeakT, fieldSlew: fieldSlew <= limits.fieldSlewTPerS, drivePeak: drivePeak <= limits.drivePeak, driveSlew: driveSlew <= limits.driveSlewPerS, phaseRate: phaseRate <= limits.phaseRateRadPerS, thermalProxy: candidate.thermalProxy <= limits.thermalProxy, power: candidate.meanPowerW <= limits.powerW };
  const robust = robustByKey.get(key(candidate));
  return { candidate, actuator: { fieldPeakT: fieldPeak, fieldSlewTPerS: fieldSlew, drivePeak, driveSlewPerS: driveSlew, phaseRateRadPerS: phaseRate, checks, qualified: Object.values(checks).every(Boolean) }, robustWorstForcePerPowerNPerW: robust?.worstCase?.forcePerPowerNPerW ?? null };
}).filter((row) => row.actuator.qualified && row.robustWorstForcePerPowerNPerW !== null);
if (cases.length === 0) throw new Error('no candidate passed typed actuator and robust gates');
const selected = cases.reduce((best, row) => row.robustWorstForcePerPowerNPerW > best.robustWorstForcePerPowerNPerW ? row : best);
const result = { protocol: 'plasma-heart-final-screening-selector/2', eligibleCount: cases.length, selected, actuatorIntersection: true, robustSource: 'radiation-uncertainty-robust-evaluation', physicalAdmission: false, scope: 'Typed final screening selector; resolved multiphysics and hardware validation remain required.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/final-screening-selection.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ eligibleCount: cases.length, selected: selected.candidate, robustWorstForcePerPowerNPerW: selected.robustWorstForcePerPowerNPerW, physicalAdmission: false }, null, 2));

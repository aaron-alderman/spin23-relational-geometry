#!/usr/bin/env node
/** Join typed electromagnetic, radiation, and chemistry/thermal worst cases. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const read = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const em = read('output/plasma-heart-algebra/3d-cycle-robust-evaluation.json');
const radiation = read('output/plasma-heart-algebra/radiation-uncertainty-robust-evaluation.json');
const chemistry = read('output/plasma-heart-algebra/3d-cycle-chemthermal-robust-evaluation.json');
const key = (candidate) => `${candidate.fieldScale}|${candidate.driveBias}|${candidate.phaseShiftRad}`;
const radByKey = new Map(radiation.cases.map((row) => [key(row.candidate), row]));
const chemByKey = new Map(chemistry.cases.map((row) => [key(row.candidate), row]));
const cases = em.cases.map((row) => {
  const r = radByKey.get(key(row.candidate)), c = chemByKey.get(key(row.candidate));
  const componentWorstCases = { electromagnetic: row.worstCase.forcePerPowerNPerW, radiation: r?.worstCase?.forcePerPowerNPerW ?? null, chemistryThermal: c?.worstCase?.forcePerPowerNPerW ?? null };
  const values = Object.values(componentWorstCases).filter((value) => value !== null);
  return { candidate: row.candidate, componentWorstCases, combinedWorstForcePerPowerNPerW: Math.min(...values), limitingComponent: Object.entries(componentWorstCases).filter(([, value]) => value !== null).sort((a, b) => a[1] - b[1])[0][0] };
});
cases.sort((a, b) => b.combinedWorstForcePerPowerNPerW - a.combinedWorstForcePerPowerNPerW);
const result = { protocol: 'plasma-heart-combined-physics-robust-pareto/2', cases, frontCount: cases.length, best: cases[0], componentCount: 3, allPositive: cases.every((x) => x.combinedWorstForcePerPowerNPerW > 0), physicalAdmission: false, scope: 'Typed combined robustness across electromagnetic, radiation, and chemistry/thermal evaluator receipts.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/combined-physics-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: cases.length, bestCombinedWorstForcePerPowerNPerW: result.best.combinedWorstForcePerPowerNPerW, limitingComponent: result.best.limitingComponent, physicalAdmission: false }, null, 2));

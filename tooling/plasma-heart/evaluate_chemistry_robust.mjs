#!/usr/bin/env node
/** Typed reaction-rate robustness over chemistry surface solver receipts. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const run = spawnSync(process.execPath, ['tooling/plasma-heart/evaluate_chemistry_surface_coupling.mjs'], { cwd: root, encoding: 'utf8' });
if (run.status !== 0) throw new Error(`chemistry evaluator failed: ${run.stderr || run.stdout}`);
const cycle = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/solver-cycle-evaluation.json'), 'utf8'));
const rates = [0.8, 0.9, 1, 1.1, 1.2];
const cases = rates.map((reactionRateScale) => {
  const solved = JSON.parse(fs.readFileSync(path.join(root, `output/plasma-heart-algebra/chemistry-coupling/result-${reactionRateScale}.json`), 'utf8'));
  const forceMagnitudeN = Math.hypot(...solved.ledger.force), meanPowerW = cycle.meanInputPowerW + Math.max(0, solved.ledger.heatExport) * 0.001;
  return { reactionRateScale, forceN: solved.ledger.force, forceMagnitudeN, heatExportW: solved.ledger.heatExport, forcePerPowerNPerW: forceMagnitudeN / Math.max(meanPowerW, 1e-30), energyResidualW: solved.ledger.energyResidual };
});
const result = { protocol: 'plasma-heart-chemistry-robustness/2', cases, worstScore: Math.min(...cases.map((x) => x.forcePerPowerNPerW)), allPositive: cases.every((x) => x.forceMagnitudeN > 0 && x.heatExportW > 0), physicalAdmission: false, scope: 'Typed reaction-rate perturbation over species/reaction/thermal solver packets; real cross sections and pressure-dependent kinetics remain unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/chemistry-robust-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ cases: cases.length, worstScore: result.worstScore, allPositive: result.allPositive, physicalAdmission: false }, null, 2));

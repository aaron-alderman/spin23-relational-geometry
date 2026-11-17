#!/usr/bin/env node
/**
 * Algebra-first MHD cycle ledger.
 *
 * The cycle receipt is authoritative for resolved material/Maxwell/photon
 * terms.  The induced-current evaluator contributes a separately labelled
 * local closure term; it is not silently folded into the base force or power.
 * This remains a synthetic evaluator and never admits physical performance.
 */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../..');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const cycle = readJson('output/plasma-heart-algebra/solver-cycle-evaluation.json');

const inducedRun = spawnSync(process.execPath, ['tooling/plasma-heart/evaluate_induced_current_fixed_point.mjs'], {
  cwd: root,
  encoding: 'utf8'
});
if (inducedRun.status !== 0) throw new Error(`induced-current evaluator failed: ${inducedRun.stderr || inducedRun.stdout}`);
const induced = JSON.parse(inducedRun.stdout);
const meanInducedForceN = [0, 1, 2].map((i) => induced.samples.reduce((sum, row) => sum + row.inducedLorentzForceN[i], 0) / induced.samples.length);
const inducedJouleHeatingW = induced.samples.reduce((sum, row) => sum + row.inducedJouleHeatingW, 0) / induced.samples.length;

const candidates = [
  { name: 'nominal', forceScale: 1, powerScale: 1 },
  { name: 'conductivity-low', forceScale: 0.9, powerScale: 0.8 },
  { name: 'conductivity-high', forceScale: 1.1, powerScale: 1.2 }
];
const rows = candidates.map((candidate) => {
  const baseForceN = cycle.meanForceN.map((value) => value * candidate.forceScale);
  const inducedForceN = meanInducedForceN.map((value) => value * candidate.forceScale);
  const totalForceN = baseForceN.map((value, i) => value + inducedForceN[i]);
  const totalPowerW = cycle.meanInputPowerW + inducedJouleHeatingW * candidate.powerScale;
  const forceMagnitudeN = Math.hypot(...totalForceN);
  return {
    candidate,
    baseForceN,
    inducedLorentzForceN: inducedForceN,
    totalForceN,
    baseInputPowerW: cycle.meanInputPowerW,
    inducedJouleHeatingW: inducedJouleHeatingW * candidate.powerScale,
    totalPowerW,
    worstForceMagnitudeN: forceMagnitudeN,
    worstForcePerTotalPowerNPerW: forceMagnitudeN / Math.max(totalPowerW, 1e-30),
    doubleCountingGuard: {
      baseCycleForceIncludedOnce: true,
      inducedForceAddedSeparately: true,
      baseCyclePowerIncludedOnce: true,
      inducedJouleAddedSeparately: true
    }
  };
});
rows.sort((a, b) => b.worstForcePerTotalPowerNPerW - a.worstForcePerTotalPowerNPerW);
const result = {
  protocol: 'plasma-heart-mhd-coupled-cycle-ledger/2',
  solverIdentity: cycle.solverIdentity,
  inducedEvaluatorProtocol: induced.protocol,
  candidates: rows,
  best: rows[0],
  frontCount: rows.length,
  inducedCurrentIncluded: true,
  fixedPointConverged: induced.fixedPointConverged,
  allPositive: rows.every((row) => row.worstForcePerTotalPowerNPerW > 0),
  physicalAdmission: false,
  scope: 'Typed cycle ledger with a separately labelled local induced-current closure; full coupled Maxwell-fluid transport and boundary calibration remain unresolved.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/mhd-coupled-cycle-ledger.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({
  candidates: rows.length,
  bestWorstForcePerPowerNPerW: rows[0].worstForcePerTotalPowerNPerW,
  inducedJouleHeatingW: rows[0].inducedJouleHeatingW,
  fixedPointConverged: induced.fixedPointConverged,
  physicalAdmission: false
}, null, 2));

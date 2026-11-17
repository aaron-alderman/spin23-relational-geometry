#!/usr/bin/env node
/** Typed reduced-order power ledger for conductivity and radiation ports. */
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '../..');
const readJson = (file) => JSON.parse(fs.readFileSync(path.join(root, file), 'utf8'));
const runJson = (script) => {
  const run = spawnSync(process.execPath, [`tooling/plasma-heart/${script}`], { cwd: root, encoding: 'utf8' });
  if (run.status !== 0) throw new Error(`${script} failed: ${run.stderr || run.stdout}`);
  return JSON.parse(run.stdout);
};
const cycle = readJson('output/plasma-heart-algebra/solver-cycle-evaluation.json');
const conductivity = runJson('evaluate_plasma_conductivity.mjs');
const radiation = runJson('evaluate_radiation_port_reference.mjs');
const plasmaJouleLossW = conductivity.samples.reduce((sum, sample) => sum + sample.plasmaJouleLossW, 0) / conductivity.samples.length;
const radiationPortPowerW = radiation.meanDirectedRadiationPowerW;
const candidates = [
  { name: 'nominal', fieldScale: 1, driveBias: 0, thermalPeakProxy: 0.18 },
  { name: 'field-low', fieldScale: 0.9, driveBias: -0.06, thermalPeakProxy: 0.18 },
  { name: 'field-high', fieldScale: 1.1, driveBias: 0.06, thermalPeakProxy: 0.22 }
];
const rows = candidates.map((candidate) => {
  const fs = Math.abs(candidate.fieldScale);
  const coilLossW = 0.5 * (0.018 * fs) ** 2;
  const fieldStorageW = 0.02 * (0.018 * fs) ** 2;
  const driveLossW = 0.025 * (1 + Math.abs(candidate.driveBias)) ** 2;
  const coolingOverheadW = 0.018 + 0.03 * candidate.thermalPeakProxy;
  const totalPowerW = cycle.meanInputPowerW + coilLossW + fieldStorageW + driveLossW + coolingOverheadW + plasmaJouleLossW + radiationPortPowerW;
  return {
    candidate,
    fluidInputPowerW: cycle.meanInputPowerW,
    coilLossW,
    fieldStorageW,
    driveLossW,
    coolingOverheadW,
    plasmaJouleLossW,
    radiationPortPowerW,
    totalPowerW,
    forceN: cycle.meanForceN,
    forceMagnitudeN: cycle.meanForceMagnitudeN,
    forcePerTotalPowerNPerW: cycle.meanForceMagnitudeN / Math.max(totalPowerW, 1e-30),
    doubleCountingGuard: {
      fluidInputIncludedOnce: true,
      coilLossSeparate: true,
      fieldStorageSeparate: true,
      driveLossSeparate: true,
      coolingSeparate: true,
      plasmaJouleSeparate: true,
      radiationPortSeparate: true,
      materialMomentumSeparate: true
    }
  };
});
rows.sort((a, b) => b.forcePerTotalPowerNPerW - a.forcePerTotalPowerNPerW);
const result = {
  protocol: 'plasma-heart-fully-coupled-power-ledger/2',
  solverIdentity: cycle.solverIdentity,
  conductivityProtocol: conductivity.protocol,
  radiationProtocol: radiation.protocol,
  candidates: rows,
  best: rows[0],
  allPositive: rows.every((row) => row.forcePerTotalPowerNPerW > 0),
  conductivityIncluded: true,
  radiationIncluded: true,
  syntheticLossCoefficients: true,
  physicalAdmission: false,
  scope: 'Typed reduced-order ledger with conductivity and directed-radiation evaluator outputs; resolved transport, emissivity and actuator calibration remain required.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/fully-coupled-power-ledger.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ candidates: rows.length, bestWorstForcePerPowerNPerW: rows[0].forcePerTotalPowerNPerW, bestTotalPowerW: rows[0].totalPowerW, physicalAdmission: false }, null, 2));

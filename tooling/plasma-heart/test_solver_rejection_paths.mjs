#!/usr/bin/env node
/** Negative-path tests for solver-IR admission safety. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const base = JSON.parse(fs.readFileSync(path.join(root, 'tooling/plasma-heart/fixtures/minimal_solver_packet.json'), 'utf8'));
const clone = () => JSON.parse(JSON.stringify(base));
const lint = (packet) => {
  const failures = [];
  for (const value of packet.fluid?.density ?? []) if (!Number.isFinite(value) || value < 0) failures.push('density');
  for (const value of packet.radiation?.radiationPowerFlux ?? []) if (!Number.isFinite(value) || value < 0) failures.push('radiation');
  for (const direction of packet.radiation?.radiationDirection ?? []) if (Math.abs(Math.hypot(...direction) - 1) > 1e-6) failures.push('radiationDirection');
  if (!packet.identity?.solverIdentity) failures.push('solverIdentity');
  if (!Number.isFinite(packet.ledger?.entropyProduction) || packet.ledger.entropyProduction < 0) failures.push('entropy');
  return failures;
};
const cases = {};
const negativeDensity = clone(); negativeDensity.fluid.density[0] = -1; cases.negativeDensityRejected = lint(negativeDensity).includes('density');
const missingSolver = clone(); delete missingSolver.identity.solverIdentity; cases.missingSolverRejected = lint(missingSolver).includes('solverIdentity');
const negativeEntropy = clone(); negativeEntropy.ledger.entropyProduction = -1; cases.negativeEntropyRejected = lint(negativeEntropy).includes('entropy');
const badRadiation = clone(); badRadiation.radiation.radiationDirection[0] = [2, 0, 0]; cases.nonUnitRadiationRejected = lint(badRadiation).includes('radiationDirection');
const valid = clone(); cases.validFixtureAccepted = lint(valid).length === 0;
const result = { protocol: 'plasma-heart-solver-rejection-tests/1', checks: cases, passed: Object.values(cases).every(Boolean), physicalAdmission: false, scope: 'Negative-path IR validation; does not admit physical solver results.' };
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;

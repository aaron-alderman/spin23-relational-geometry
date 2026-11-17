#!/usr/bin/env node
/** Verify the solver handoff contract from the authored IR, without legacy packet files. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const ir = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json'), 'utf8'));
const requiredSections = ['identity', 'geometry', 'fluid', 'electromagnetic', 'thermal', 'chemistry', 'radiation', 'ledger'];
const requiredMetadata = ['meshIdentity', 'solverIdentity'];
const missingSections = requiredSections.filter((section) => !ir.packet?.[section]);
const loweringEngines = Object.keys(ir.lowering ?? {});
const result = {
  protocol: 'plasma-heart-solver-handoff/1',
  readyForResolvedData: missingSections.length === 0 && loweringEngines.length >= 4 && ir.invariants.length >= 8,
  packetSections: Object.keys(ir.packet ?? {}),
  requiredMetadata,
  loweringEngines,
  missingSections,
  unresolvedSolverOutputs: ['electricField', 'magneticField', 'currentDensity', 'reactionSource', 'entropyProduction'],
  physicalAdmission: false,
  scope: 'Authored IR handoff audit; readiness is not resolved-solver validation or physical admission.'
};
console.log(JSON.stringify(result, null, 2));
if (!result.readyForResolvedData) process.exitCode = 1;

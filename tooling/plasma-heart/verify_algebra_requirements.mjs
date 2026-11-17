#!/usr/bin/env node
/** Verify objective coverage directly from authored algebra and solver IR. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const algebra = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_algebra_v1.json'), 'utf8'));
const ir = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json'), 'utf8'));
const operators = new Set(Object.keys(algebra.operators));
const state = new Set(Object.values(algebra.state).flat());
const breaks = new Set(algebra.symmetryBreaks.map((item) => item.id));
const rows = [
  ['momentum accounting', operators.has('surfaceMomentumFlux') && operators.has('photonMomentumFlux') && operators.has('momentumBalance')],
  ['mass conservation', operators.has('massBalance') && state.has('rho')],
  ['electromagnetic coupling', operators.has('lorentzForceDensity') && state.has('electricField') && state.has('magneticField')],
  ['thermal and chemistry ports', state.has('thermalPort') && state.has('chemicalPort') && operators.has('energyBalance') && operators.has('speciesBalance')],
  ['symmetry-break declarations', breaks.size >= 6 && [...breaks].every((id) => algebra.symmetryBreaks.find((item) => item.id === id)?.portRequired)],
  ['solver lowering', Object.keys(ir.lowering ?? {}).length >= 4],
  ['admissibility constraints', Boolean(algebra.admission) && ir.invariants.length >= 8]
];
const failures = rows.filter(([, passed]) => !passed).map(([name]) => name);
const result = { protocol: 'plasma-heart-algebra-requirements/1', passed: failures.length === 0, rows: rows.map(([requirement, passed]) => ({ requirement, passed })), failures, physicalAdmission: false, scope: 'Authored algebra/IR coverage only; numerical solver results and hardware claims remain separate.' };
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;

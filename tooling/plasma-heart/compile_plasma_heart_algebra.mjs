#!/usr/bin/env node
/** Compile the authored plasma-heart algebra into solver-facing manifests. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const algebraPath = path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_algebra_v1.json');
const irPath = path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json');
const outDir = path.join(root, 'output/plasma-heart-algebra');
const algebra = JSON.parse(fs.readFileSync(algebraPath, 'utf8'));
const ir = JSON.parse(fs.readFileSync(irPath, 'utf8'));

const requiredOperators = ['surfaceMomentumFlux', 'photonMomentumFlux', 'lorentzForceDensity', 'ohmicHeating', 'massBalance', 'momentumBalance', 'energyBalance', 'speciesBalance', 'inductionClosure', 'periodicClosure'];
const missingOperators = requiredOperators.filter((key) => !(key in algebra.operators));
const requiredFields = ['geometry', 'fluid', 'fields', 'ports', 'controls', 'epistemics'];
const missingState = requiredFields.filter((key) => !(key in algebra.state));
const engines = Object.keys(ir.lowering);
const invariantCount = ir.invariants.length;
const passed = missingOperators.length === 0 && missingState.length === 0 && engines.length >= 4 && invariantCount >= 7;

const manifest = {
  protocol: 'plasma-heart-algebra-lowering/1',
  source: { algebra: path.relative(root, algebraPath), solverIr: path.relative(root, irPath) },
  passed,
  physicalAdmission: false,
  authority: algebra.authority,
  operators: requiredOperators,
  stateFields: requiredFields,
  invariants: ir.invariants,
  engines: engines.map((engine) => ({ engine, role: ir.lowering[engine], evaluatorOnly: true })),
  retirement: algebra.retirement,
  failures: { missingOperators, missingState },
  scope: 'Algebra compilation and solver-lowering manifest; no physical claim is admitted.'
};
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'solver-lowering-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify({ passed, engines, invariantCount, output: path.relative(root, path.join(outDir, 'solver-lowering-manifest.json')) }, null, 2));
if (!passed) process.exitCode = 1;

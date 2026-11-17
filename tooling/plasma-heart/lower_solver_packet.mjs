#!/usr/bin/env node
/** Lower the solver IR to an explicit engine plan without inventing results. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const irPath = path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json');
const ir = JSON.parse(fs.readFileSync(irPath, 'utf8'));
const engineArg = process.argv.indexOf('--engine');
const engine = engineArg >= 0 ? process.argv[engineArg + 1] : 'custom';
const supported = Object.hasOwn(ir.lowering, engine);
const plan = {
  protocol: 'plasma-heart-solver-plan/1',
  authority: ir.authority,
  engine,
  supported,
  evaluatorOnly: true,
  lowering: supported ? ir.lowering[engine] : null,
  packetSections: Object.keys(ir.packet),
  derivedOperators: Object.keys(ir.derivedOperators),
  invariants: ir.invariants,
  physicalAdmission: false,
  refusal: supported ? null : `unsupported engine: ${engine}`,
  scope: 'Execution plan only. No solver is invoked and no physical result is inferred.'
};
console.log(JSON.stringify(plan, null, 2));
if (!supported) process.exitCode = 1;

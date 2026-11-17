#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const algebra = read('corpus/programmes/programme-algebra/plasma_heart_algebra_v1.json');
const ir = read('corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json');
const admission = read('output/plasma-heart-algebra/physical-admission-audit.json');
const cycle = read('output/plasma-heart-algebra/custom-cycle-results/packet-0.json');
const report = {
  protocol: 'plasma-heart-solver-handoff-report/1', authority: algebra.protocol, irProtocol: ir.protocol,
  solverIdentity: cycle.identity.solverIdentity, meshIdentity: cycle.identity.meshIdentity,
  packetSections: Object.keys(ir.packet), derivedOperators: Object.keys(ir.derivedOperators), invariants: ir.invariants,
  cycleReceipt: { cycleId: cycle.identity.cycleId, sampleIndex: cycle.identity.sampleIndex, force: cycle.ledger.force, torque: cycle.ledger.torque, massFlux: cycle.ledger.massFlux, energyResidual: cycle.ledger.energyResidual },
  admission: { physicalAdmission: false, requiredSections: admission.requiredSections, unresolved: admission.items.flatMap(item => item.missing) },
  scope: 'Algebra/IR handoff report; numerical evaluator output is not physical or hardware validation.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/solver-handoff-report.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ protocol: report.protocol, solverIdentity: report.solverIdentity, meshIdentity: report.meshIdentity, physicalAdmission: false }, null, 2));

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const algebra = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_algebra_v1.json'), 'utf8'));
const ir = JSON.parse(fs.readFileSync(path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json'), 'utf8'));
const requiredSections = Object.keys(ir.packet);
const items = [
  { requirement: 'explicit surface momentum flux', status: 'IR-required', evidence: ['surfaceMomentumFlux', 'materialMomentum', 'maxwellMomentum', 'photonMomentum'], physicalAdmission: false, missing: ['resolved solver fields', 'mesh convergence'] },
  { requirement: 'electromagnetic coupling', status: 'IR-required', evidence: ['electricField', 'magneticField', 'currentDensity', 'lorentzSource', 'jouleSource'], physicalAdmission: false, missing: ['resolved vector Maxwell solve'] },
  { requirement: 'species chemistry and reaction heat', status: 'IR-required', evidence: ['speciesDensities', 'reactionSource', 'reactionHeat'], physicalAdmission: false, missing: ['validated reaction mechanism'] },
  { requirement: 'spatial thermal feedback', status: 'IR-required', evidence: ['heatFlux', 'wallTemperature', 'quenchRate'], physicalAdmission: false, missing: ['conjugate heat-transfer validation'] },
  { requirement: 'actuator-constrained timing', status: 'algebra-declared', evidence: ['actuatorTiming', 'stateEstimation', 'riskAdjustedControlSelection'], physicalAdmission: false, missing: ['hardware actuator limits'] },
  { requirement: 'energy and entropy closure', status: 'IR-required', evidence: ['energyResidual', 'entropyProduction'], physicalAdmission: false, missing: ['independent resolved closure'] }
];
const result = {
  protocol: 'plasma-heart-physical-admission-audit/2', algebraProtocol: algebra.protocol, irProtocol: ir.protocol,
  requiredSections, invariantCount: ir.invariants.length, items,
  physicalClaimsAdmitted: false, physicalAdmission: false,
  conclusion: 'Algebra and solver-interface requirements are explicit; no numerical screening result is promoted to physical admission.',
  scope: 'Authoritative admission boundary only; it does not validate hardware, external solver accuracy, or physical thrust.'
};
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/physical-admission-audit.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ protocol: result.protocol, items: items.length, requiredSections: requiredSections.length, physicalClaimsAdmitted: false }, null, 2));

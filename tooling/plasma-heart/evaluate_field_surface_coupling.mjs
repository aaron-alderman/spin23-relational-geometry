#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const source = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/converted-cycle-inputs/packet-0.json'), 'utf8'));
const mu0 = 4e-7 * Math.PI;
const stress = (position, gradient) => { const [x, y, z] = position, B = [-0.5 * gradient * x, -0.5 * gradient * y, 0.02 + gradient * z], b2 = B.reduce((s, v) => s + v * v, 0); return B.map((bi, i) => B.map((bj, j) => (bi * bj - (i === j ? 0.5 * b2 : 0)) / mu0)); };
const run = (gradient, name) => { const packet = JSON.parse(JSON.stringify(source)); packet.electromagnetic.maxwellStress = packet.geometry.facePosition.map(position => stress(position, gradient)); packet.identity = { ...packet.identity, meshIdentity: `field-coupling-${name}`, solverIdentity: 'custom-js' }; const input = path.join(root, 'output/plasma-heart-algebra', `field-coupling-${name}-input.json`), output = path.join(root, 'output/plasma-heart-algebra', `field-coupling-${name}-result.json`); fs.writeFileSync(input, `${JSON.stringify(packet, null, 2)}\n`); const child = spawnSync(process.execPath, ['tooling/plasma-heart/run_custom_solver.mjs', '--input', input, '--output', output], { cwd: root, encoding: 'utf8' }); if (child.status !== 0) throw new Error(child.stdout || child.stderr); return JSON.parse(fs.readFileSync(output, 'utf8')); };
const control = run(0, 'uniform'), biased = run(0.1, 'gradient');
const delta = biased.ledger.force.map((value, i) => value - control.ledger.force[i]);
const result = { protocol: 'plasma-heart-field-surface-coupling/2', controlUniformField: { forceN: control.ledger.force, maxwellForceN: control.ledger.maxwellForce }, biasedField: { forceN: biased.ledger.force, maxwellForceN: biased.ledger.maxwellForce }, fieldForceDeltaN: delta, metadata: { maxwellStressIncluded: true, massPressureAlreadyCounted: true, emForceAlreadyCounted: false, fieldModel: 'divergence-free linear B screening field; not a coil/Maxwell solve' }, physicalAdmission: false, scope: 'Typed Maxwell-stress coupling regression; resolved coil/plasma fields remain required.' };
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/field-surface-coupling-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ controlForceN: Math.hypot(...control.ledger.force), biasedForceN: Math.hypot(...biased.ledger.force), fieldForceDeltaN: delta, physicalAdmission: false }, null, 2));

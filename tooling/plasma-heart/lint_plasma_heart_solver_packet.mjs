#!/usr/bin/env node
/** Lint a solver packet against the authored solver-independent IR. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const irPath = path.join(root, 'corpus/programmes/programme-algebra/plasma_heart_solver_ir_v1.json');
const ir = JSON.parse(fs.readFileSync(irPath, 'utf8'));
const inputArg = process.argv.indexOf('--input');
const inputPath = inputArg >= 0 ? process.argv[inputArg + 1] : null;
const failures = [];

if (!ir.protocol || !ir.packet || !ir.invariants?.length || !ir.lowering) {
  failures.push('solver IR is incomplete');
}

let packet;
if (inputPath) {
  const resolved = path.resolve(root, inputPath);
  packet = JSON.parse(fs.readFileSync(resolved, 'utf8'));
  for (const [section, fields] of Object.entries(ir.packet)) {
    if (!packet[section] || typeof packet[section] !== 'object') {
      failures.push(`missing packet section: ${section}`);
      continue;
    }
    for (const field of fields) if (!(field in packet[section])) failures.push(`missing field: ${section}.${field}`);
  }
  if (packet.identity) {
    for (const field of ir.packet.identity) if (packet.identity[field] === null || packet.identity[field] === undefined) failures.push(`empty identity field: ${field}`);
  }
  if (packet.geometry) {
    const areas = packet.geometry.faceArea;
    const normals = packet.geometry.outwardNormal;
    const positions = packet.geometry.facePosition;
    if (Array.isArray(areas) && Array.isArray(normals) && areas.length !== normals.length) failures.push('faceArea/outwardNormal length mismatch');
    if (Array.isArray(areas) && Array.isArray(positions) && areas.length !== positions.length) failures.push('faceArea/facePosition length mismatch');
    if (Array.isArray(normals)) normals.forEach((normal, index) => {
      if (!Array.isArray(normal) || normal.length !== 3 || normal.some((value) => !Number.isFinite(value))) failures.push(`invalid outward normal at face ${index}`);
      else if (Math.hypot(...normal) === 0) failures.push(`zero outward normal at face ${index}`);
    });
  }
  if (packet.fluid) {
    const density = packet.fluid.density ?? [];
    const velocity = packet.fluid.velocity ?? [];
    density.forEach((value, index) => { if (!Number.isFinite(value) || value < 0) failures.push(`invalid density at face ${index}`); });
    velocity.forEach((value, index) => { if (!Array.isArray(value) || value.length !== 3 || value.some((component) => !Number.isFinite(component))) failures.push(`invalid velocity at face ${index}`); });
  }
  if (packet.electromagnetic) {
    (packet.electromagnetic.conductivity ?? []).forEach((value, index) => { if (!Number.isFinite(value) || value < 0) failures.push(`invalid conductivity at face ${index}`); });
  }
  if (packet.radiation) {
    (packet.radiation.radiationPowerFlux ?? []).forEach((value, index) => { if (!Number.isFinite(value) || value < 0) failures.push(`invalid radiation power at face ${index}`); });
    (packet.radiation.radiationDirection ?? []).forEach((direction, index) => { if (!Array.isArray(direction) || direction.length !== 3 || Math.abs(Math.hypot(...direction) - 1) > 1e-6) failures.push(`non-unit radiation direction at face ${index}`); });
  }
  if (packet.ledger) {
    for (const field of ['energyResidual', 'entropyProduction']) if (!Number.isFinite(packet.ledger[field])) failures.push(`non-finite ledger field: ${field}`);
    if (Number.isFinite(packet.ledger.entropyProduction) && packet.ledger.entropyProduction < 0) failures.push('negative entropy production');
  }
}

const result = {
  protocol: 'plasma-heart-solver-packet-lint/1',
  authority: ir.authority,
  passed: failures.length === 0,
  physicalAdmission: false,
  input: inputPath ?? null,
  checkedSections: Object.keys(ir.packet),
  invariants: ir.invariants,
  failures,
  scope: 'Schema and invariant-presence lint only; solver output remains evaluator data and no thrust claim is admitted.'
};
console.log(JSON.stringify(result, null, 2));
if (!result.passed) process.exitCode = 1;

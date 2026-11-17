#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const inputArg = process.argv.indexOf('--inputs');
const inputs = inputArg >= 0 ? process.argv[inputArg + 1].split(',') : Array.from({ length: 9 }, (_, i) => `output/plasma-heart-algebra/custom-cycle-results/packet-${i}.json`);
const packets = inputs.map(file => JSON.parse(fs.readFileSync(path.resolve(root, file), 'utf8')));
const rows = packets.map(packet => ({ time: packet.identity.time, inputPowerW: packet.ledger.inputPower, mechanicalSurfacePowerW: packet.ledger.mechanicalSurfacePower, heatExportW: packet.ledger.heatExport, jouleHeatingW: packet.ledger.jouleHeating, radiationPowerW: packet.ledger.radiationPower, energyResidualW: packet.ledger.energyResidual, resolvedTermsW: packet.ledger.mechanicalSurfacePower + packet.ledger.jouleHeating + packet.ledger.radiationPower }));
const maxResidual = Math.max(...rows.map(row => Math.abs(row.energyResidualW)));
const result = { protocol: 'plasma-heart-solver-energy-audit/2', samples: rows.length, rows, maxUnresolvedResidualW: maxResidual, finiteLedger: rows.every(row => Object.values(row).slice(1).every(Number.isFinite)), independentSurfacePowerUsed: true, unresolvedPowerTerms: ['coilLoss', 'fieldStorage', 'driveLoss', 'coolingOverhead', 'species enthalpy closure'], energyClosureQualified: maxResidual < 1e-8, entropyNonnegative: packets.every(packet => packet.ledger.entropyProduction >= 0), physicalAdmission: false, scope: 'Typed solver energy audit; unresolved actuator, field-storage, species, and cooling terms remain explicit.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/solver-energy-audit.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ samples: result.samples, maxUnresolvedResidualW: result.maxUnresolvedResidualW, energyClosureQualified: result.energyClosureQualified, physicalAdmission: false }, null, 2));

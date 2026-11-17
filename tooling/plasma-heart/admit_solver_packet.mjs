#!/usr/bin/env node
/** Apply IR admission guards, including explicit double-counting refusals. */
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '../..');
const inputArg = process.argv.indexOf('--input');
if (inputArg < 0) { console.error('usage: node tooling/plasma-heart/admit_solver_packet.mjs --input <packet.json>'); process.exit(2); }
const input = process.argv[inputArg + 1];
const packet = JSON.parse(fs.readFileSync(path.resolve(root, input), 'utf8'));
const failures = [];
const admission = packet.admission ?? {};
if (admission.massMomentumAlreadyCounted === true) failures.push('mass-flow double count');
if (admission.photonMomentumAlreadyCounted === true) failures.push('photon/Maxwell double count');
if (!packet.identity?.forceOrigin && !packet.geometry?.forceOrigin) failures.push('force origin missing');
if (!packet.ledger || !Array.isArray(packet.ledger.force) || !Array.isArray(packet.ledger.torque)) failures.push('force/torque ledger missing');
const result = { protocol: 'plasma-heart-solver-admission/1', source: input, admitted: failures.length === 0, failures, physicalAdmission: false, scope: 'IR packet admission guards only; admission does not imply resolved physics or thrust.' };
console.log(JSON.stringify(result, null, 2));
if (!result.admitted) process.exitCode = 1;

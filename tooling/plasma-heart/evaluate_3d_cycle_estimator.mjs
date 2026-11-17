#!/usr/bin/env node
/** Sequential diagonal estimator over typed 3-D cycle observables. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '../..');
const packet = JSON.parse(fs.readFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-packet.json'), 'utf8'));
const integrate = (faces) => { const force = [0, 0, 0]; for (const face of faces) { const em = face.emStress.map((row) => row.reduce((s, x, i) => s + x * face.normal[i], 0)); const flux = face.density * face.velocity.reduce((s, x, i) => s + x * face.normal[i], 0); face.velocity.forEach((v, i) => { force[i] += face.area * (flux * v + face.pressure * face.normal[i] - em[i]); }); } return Math.hypot(...force); };
const x = [1, 1, 1], P = [0.12, 0.12, 0.12], R = [0.04, 0.04, 0.04], updates = [];
for (const sample of packet.samples) {
  const z = [integrate(sample.faces) / 0.19, sample.inputPowerW / 0.36518, sample.faces.reduce((sum, face) => sum + face.heatFlux, 0) / sample.faces.length / 18];
  for (let i = 0; i < 3; i += 1) { const K = P[i] / (P[i] + R[i]); x[i] += K * (z[i] - x[i]); P[i] *= (1 - K); }
  updates.push({ state: [...x], std: P.map((v) => Math.sqrt(v)), observation: z });
}
const result = { protocol: 'plasma-heart-3d-estimator/2', samples: updates.length, updates, uncertaintyShrinks: updates.at(-1).std[0] < updates[0].std[0] && updates.at(-1).std[1] < updates[0].std[1], forceLedgerUnchanged: true, calibrationUsed: false, physicalAdmission: false, scope: 'Typed estimator over 3-D solver observables; sensor noise and observability remain unresolved.' };
fs.mkdirSync(path.join(root, 'output/plasma-heart-algebra'), { recursive: true });
fs.writeFileSync(path.join(root, 'output/plasma-heart-algebra/3d-cycle-estimator-evaluation.json'), `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ samples: updates.length, uncertaintyShrinks: result.uncertaintyShrinks, finalStd: updates.at(-1).std, physicalAdmission: false }, null, 2));

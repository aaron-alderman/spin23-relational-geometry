#!/usr/bin/env node
import fs from 'node:fs';
const baseForce = 0.01, basePower = 0.36, baseHeat = 0.15, truth = [1.08, 0.94, 1.12];
const x = [1, 1, 1], variance = [0.16, 0.16, 0.16], R = [2e-5, 2e-5, 2e-5];
const H = [[baseForce * 0.85, baseForce * 0.15, 0], [basePower * 0.05, basePower * 0.03, 0], [0, 0, baseHeat]], updates = [];
for (let k = 0; k < 5; k += 1) {
  const observations = [H[0][0] * truth[0] + H[0][1] * truth[1] + (k - 2) * 1e-5, H[1][0] * truth[0] + H[1][1] * truth[1] - (k - 2) * 1e-5, H[2][2] * truth[2] + (k - 2) * 1e-5];
  const predicted = H.map(row => row.reduce((sum, value, j) => sum + value * x[j], 0));
  const innovation = observations.map((value, i) => value - predicted[i]);
  for (let j = 0; j < 3; j += 1) { const gain = variance[j] * H[j][j] / (H[j][j] * variance[j] * H[j][j] + R[j]); x[j] += gain * innovation[j]; variance[j] *= (1 - gain * H[j][j]); }
  updates.push({ step: k + 1, observation: observations, estimate: [...x], std: variance.map(v => Math.sqrt(Math.max(v, 0))), innovation });
}
const result = { protocol: 'plasma-heart-resolved-estimator/2', parameters: ['flowScale', 'pressureScale', 'reactionScale'], observables: ['explicitSurfaceForceN', 'totalPowerW', 'thermalHeatW'], updates, finalEstimate: [...x], uncertaintyShrinks: updates.at(-1).std[0] < updates[0].std[0] && updates.at(-1).std[2] < updates[0].std[2], physicalAdmission: false, scope: 'Kalman-style estimator over synthetic solver observables; delayed/noisy sensor calibration and identifiability remain unresolved.' };
fs.mkdirSync('output/plasma-heart-algebra', { recursive: true });
fs.writeFileSync('output/plasma-heart-algebra/resolved-estimator-evaluation.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ finalEstimate: result.finalEstimate, finalStd: updates.at(-1).std, uncertaintyShrinks: result.uncertaintyShrinks, physicalAdmission: false }, null, 2));

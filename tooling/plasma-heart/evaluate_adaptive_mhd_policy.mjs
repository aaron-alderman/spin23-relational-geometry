import fs from 'node:fs';

const algebra = JSON.parse(fs.readFileSync('corpus/programmes/programme-algebra/plasma_heart_algebra_v1.json', 'utf8'));
const samples = Array.from({ length: 8 }, (_, i) => {
  const phase = (2 * Math.PI * i) / 8;
  return {
    time: i,
    measuredConductivitySPerM: 1.0e3 * (1 + 0.08 * Math.sin(phase)),
    measuredFieldScale: 1 + 0.05 * Math.cos(phase + 0.3),
    solverForcePerPowerNPerW: [
      1.2e-4 * (1 + 0.04 * Math.cos(phase)),
      1.0e-4 * (1 + 0.08 * Math.sin(phase + 0.4)),
      0.9e-4 * (1 - 0.05 * Math.cos(phase - 0.2))
    ]
  };
});

const x = [0.8e3, 0.9];
const variance = [4.0e4, 0.04];
const processVariance = [1.0e2, 1.0e-3];
const measurementVariance = [4.0e2, 1.0e-2];
const updates = [];
for (const sample of samples) {
  for (let i = 0; i < 2; i++) variance[i] += processVariance[i];
  const z = [sample.measuredConductivitySPerM, sample.measuredFieldScale];
  for (let i = 0; i < 2; i++) {
    const gain = variance[i] / (variance[i] + measurementVariance[i]);
    x[i] += gain * (z[i] - x[i]);
    variance[i] *= (1 - gain);
  }
  updates.push({ time: sample.time, estimateConductivitySPerM: x[0], estimateFieldScale: x[1], stdConductivitySPerM: Math.sqrt(variance[0]), stdFieldScale: Math.sqrt(variance[1]) });
}

const final = updates.at(-1);
const uncertaintyPenalty = final.stdConductivitySPerM / Math.max(final.estimateConductivitySPerM, 1e-9)
  + final.stdFieldScale / Math.max(Math.abs(final.estimateFieldScale), 1e-9);
const candidates = samples[0].solverForcePerPowerNPerW.map((_, index) => {
  const forcePerPower = samples.reduce((sum, sample) => sum + sample.solverForcePerPowerNPerW[index], 0) / samples.length;
  return { candidate: `phase-${index}`, solverForcePerPowerNPerW: forcePerPower, uncertaintyPenalty, riskAdjustedScore: forcePerPower / (1 + uncertaintyPenalty) };
});
const selected = candidates.reduce((best, candidate) => candidate.riskAdjustedScore > best.riskAdjustedScore ? candidate : best);
const result = {
  protocol: 'plasma-heart-adaptive-mhd-policy/2', algebraProtocol: algebra.protocol,
  estimator: { model: 'diagonal-kalman-like', updates, uncertaintyShrinks: final.stdConductivitySPerM < updates[0].stdConductivitySPerM && final.stdFieldScale < updates[0].stdFieldScale },
  candidates, selected, forceLedgerUnchanged: true, physicalAdmission: false,
  scope: 'Synthetic adaptive policy over solver-returned force-per-power candidates; observability, actuator constraints, and resolved field calibration remain unresolved.'
};
fs.mkdirSync('output/plasma-heart-algebra', { recursive: true });
fs.writeFileSync('output/plasma-heart-algebra/adaptive-mhd-policy-evaluation.json', `${JSON.stringify(result, null, 2)}\n`);
console.log(JSON.stringify({ selected: selected.candidate, riskAdjustedScore: selected.riskAdjustedScore, uncertaintyPenalty, physicalAdmission: false }, null, 2));

import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transformer-structured-tolerance-v1.json", import.meta.url), "utf8"
));
const factor = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-pareto-transformer-factor-audit-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-transformer-structured-tolerance-v1");
assert.equal(record.model.selectedBasis, factor.selectedCircuitBasis.id);
assert.equal(record.model.nonzeroTransformerRatios,
  factor.candidates.find((candidate) => candidate.id === record.model.selectedBasis).nonzeroTransformerRatios);
assert.equal(record.model.independentParameters,
  record.model.nonzeroTransformerRatios + record.model.diagonalCapacitors);

const wilson95 = (successes, count) => {
  const z = 1.959963984540054;
  const fraction = successes / count;
  const denominator = 1 + z ** 2 / count;
  const center = (fraction + z ** 2 / (2 * count)) / denominator;
  const half = z * Math.sqrt(fraction * (1 - fraction) / count
    + z ** 2 / (4 * count ** 2)) / denominator;
  return [Math.max(0, center - half), Math.min(1, center + half)];
};
for (const result of record.results) {
  assert.equal(result.passFraction, result.passCount / record.model.drawsPerSigma);
  const interval = wilson95(result.passCount, record.model.drawsPerSigma);
  assert.ok(Math.abs(result.wilson95[0] - interval[0]) < 2e-15);
  assert.ok(Math.abs(result.wilson95[1] - interval[1]) < 2e-15);
  assert.ok(result.medianInverseError <= result.p95InverseError);
  assert.ok(result.p95InverseError <= result.p99InverseError);
  assert.ok(result.p99InverseError <= result.maximumInverseError);
}
for (let i = 1; i < record.results.length; i += 1) {
  assert.ok(record.results[i].sigma > record.results[i - 1].sigma);
  assert.ok(record.results[i].passFraction <= record.results[i - 1].passFraction);
  assert.ok(record.results[i].medianInverseError > record.results[i - 1].medianInverseError);
}
const target = record.results.find((result) => result.sigma === 0.002);
const warning = record.results.find((result) => result.sigma === 0.003);
const transition = record.results.find((result) => result.sigma === 0.005);
const reject = record.results.find((result) => result.sigma === 0.01);
assert.ok(target.wilson95[0] > 0.99);
assert.ok(warning.wilson95[0] > 0.95);
assert.ok(transition.wilson95[0] < 0.5 && transition.wilson95[1] < 0.5);
assert.ok(reject.wilson95[1] < 0.01);

// Smoke-test the executable model independently of the frozen 40,000-draw ledger.
const executable = fileURLToPath(new URL("../../scripts/simulate-leech-transformer-tolerance.mjs", import.meta.url));
const run = spawnSync(process.execPath, [executable, "8", String(record.model.seed), "0.002"], {
  encoding: "utf8", windowsHide: true
});
assert.equal(run.status, 0, run.stderr);
const smoke = JSON.parse(run.stdout);
assert.equal(smoke.model.independentParameters, record.model.independentParameters);
assert.equal(smoke.results[0].draws, 8);
assert.equal(smoke.results[0].componentLogSigma, 0.002);
assert.ok(record.epistemicStatus.conditionalInference.includes("only under"));
assert.ok(record.boundary.includes("conditional engineering evidence"));

console.log(JSON.stringify({
  status: "PASS",
  simulatedDraws: record.results.length * record.model.drawsPerSigma,
  selectedBasis: record.model.selectedBasis,
  qualificationSigma: target.sigma,
  qualificationObservedYield: target.passFraction,
  qualificationWilson95: target.wilson95,
  transitionSigma: transition.sigma,
  transitionObservedYield: transition.passFraction,
  rejectSigma: reject.sigma,
  rejectObservedYield: reject.passFraction,
  epistemicStatus: record.epistemicStatus,
  boundary: record.boundary
}));

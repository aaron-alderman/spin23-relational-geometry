import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transformer-correlated-tolerance-v1.json", import.meta.url), "utf8"
));
const iid = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-transformer-structured-tolerance-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-transformer-correlated-tolerance-v1");
assert.equal(record.commonProtocol.parameters, iid.model.independentParameters);
assert.equal(record.commonProtocol.drawsPerPoint, 5000);
assert.equal(record.commonProtocol.sharedVarianceFraction, 0.9);

const wilson95 = (successes, count) => {
  const z = 1.959963984540054;
  const fraction = successes / count;
  const denominator = 1 + z ** 2 / count;
  const center = (fraction + z ** 2 / (2 * count)) / denominator;
  const half = z * Math.sqrt(fraction * (1 - fraction) / count
    + z ** 2 / (4 * count ** 2)) / denominator;
  return [Math.max(0, center - half), Math.min(1, center + half)];
};
for (const model of record.models) {
  for (const result of model.results) {
    assert.equal(result.passFraction, result.passCount / record.commonProtocol.drawsPerPoint);
    const interval = wilson95(result.passCount, record.commonProtocol.drawsPerPoint);
    assert.ok(Math.abs(result.wilson95[0] - interval[0]) < 2e-15);
    assert.ok(Math.abs(result.wilson95[1] - interval[1]) < 2e-15);
  }
  for (let i = 1; i < model.results.length; i += 1) {
    assert.ok(model.results[i].sigma > model.results[i - 1].sigma);
    assert.ok(model.results[i].passFraction <= model.results[i - 1].passFraction);
    assert.ok(model.results[i].p95InverseError > model.results[i - 1].p95InverseError);
  }
  const robust = model.results.find((result) => result.sigma === 0.0015);
  const old = model.results.find((result) => result.sigma === 0.002);
  assert.ok(robust.wilson95[0] > 0.99);
  assert.ok(old.wilson95[0] < 0.99);
}
for (const comparison of record.iidComparison) {
  const source = iid.results.find((result) => result.sigma === comparison.sigma);
  assert.equal(comparison.passFraction, source.passFraction);
  assert.equal(comparison.wilson95Lower, source.wilson95[0]);
  assert.equal(comparison.p95InverseError, source.p95InverseError);
}

const executable = fileURLToPath(new URL("../../scripts/simulate-leech-transformer-tolerance.mjs", import.meta.url));
for (const model of record.models) {
  const run = spawnSync(process.execPath, [
    executable, "8", String(model.seed), "0.0015", model.id,
    String(record.commonProtocol.sharedVarianceFraction)
  ], {encoding: "utf8", windowsHide: true});
  assert.equal(run.status, 0, run.stderr);
  const smoke = JSON.parse(run.stdout);
  assert.equal(smoke.model.errorModel, model.id);
  assert.equal(smoke.model.correlationFraction, record.commonProtocol.sharedVarianceFraction);
  assert.equal(smoke.results[0].draws, 8);
}
assert.ok(record.decision.supersededProcurementTarget.includes("not retained"));
assert.ok(record.boundary.includes("direct matrix measurement remains decisive"));

console.log(JSON.stringify({
  status: "PASS",
  correlatedDraws: record.models.reduce((sum, model) =>
    sum + model.results.length * record.commonProtocol.drawsPerPoint, 0),
  models: record.models.map((model) => model.id),
  sharedVarianceFraction: record.commonProtocol.sharedVarianceFraction,
  revisedQualificationSigma: 0.0015,
  oldTargetRejectedByCorrelatedModels: true,
  rowBlockYieldAtOldTarget: record.models[0].results.find((point) => point.sigma === 0.002).passFraction,
  smoothGradientYieldAtOldTarget: record.models[1].results.find((point) => point.sigma === 0.002).passFraction,
  epistemicStatus: record.epistemicStatus,
  boundary: record.boundary
}));

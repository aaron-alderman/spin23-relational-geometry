import assert from "node:assert/strict";
import fs from "node:fs";
import {spawnSync} from "node:child_process";
import {fileURLToPath} from "node:url";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-admittance-parasitic-pole-stress-v1.json", import.meta.url), "utf8"
));
const packet = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-24port-admittance-commissioning-packet-v1.json", import.meta.url), "utf8"
));
assert.equal(record.schemaVersion, "leech-admittance-parasitic-pole-stress-v1");
assert.equal(record.model.gates.dispersion,
  Number(packet.proposedPassGates.find((gate) => gate.id === "dispersion").pass.match(/0\.005/)[0]));

const wilson95 = (successes, count) => {
  const z = 1.959963984540054;
  const p = successes / count;
  const denominator = 1 + z ** 2 / count;
  const center = (p + z ** 2 / (2 * count)) / denominator;
  const half = z * Math.sqrt(p * (1 - p) / count + z ** 2 / (4 * count ** 2)) / denominator;
  return [Math.max(0, center - half), Math.min(1, center + half)];
};
for (const result of record.results) {
  assert.equal(result.passFraction, result.passCount / record.model.drawsPerPoint);
  const interval = wilson95(result.passCount, record.model.drawsPerPoint);
  assert.ok(Math.abs(result.wilson95[0] - interval[0]) < 2e-15);
  assert.ok(Math.abs(result.wilson95[1] - interval[1]) < 2e-15);
}
for (const pole of record.model.poleFrequencyOverCommissioningCenter) {
  const points = record.results.filter((result) => result.poleRatio === pole);
  for (let i = 1; i < points.length; i += 1) {
    assert.ok(points[i].strength > points[i - 1].strength);
    assert.ok(points[i].passFraction <= points[i - 1].passFraction);
    assert.ok(points[i].p95InverseError > points[i - 1].p95InverseError);
  }
  assert.ok(points.find((point) => point.strength === 0.00001).wilson95[0] > 0.99);
}
assert.ok(record.results.find((point) => point.poleRatio === 4 && point.strength === 0.00003).wilson95[0] < 0.99);
for (const point of record.results.filter((entry) => entry.strength === 0.0001)) {
  assert.ok(point.p95Dispersion < record.model.gates.dispersion);
  assert.ok(point.p95LossRatio < record.model.gates.lossRatio);
  assert.ok(point.p95InverseError > record.model.gates.inverseMetric);
}

const executable = fileURLToPath(new URL("../../scripts/simulate-leech-admittance-parasitics.mjs", import.meta.url));
const smoke = spawnSync(process.execPath, [executable, "4", String(record.model.qualityFactor), "0.00001", "4", "30"], {
  encoding: "utf8", windowsHide: true
});
assert.equal(smoke.status, 0, smoke.stderr);
const output = JSON.parse(smoke.stdout);
assert.equal(output.model.parasitic, record.model.parasitic);
assert.equal(output.results[0].draws, 4);
assert.ok(record.decision.dominantGate.includes("inverse-metric"));
assert.ok(record.boundary.includes("not a device-independent tolerance theorem"));

console.log(JSON.stringify({
  status: "PASS",
  simulatedDraws: record.results.length * record.model.drawsPerPoint,
  poles: record.model.poleFrequencyOverCommissioningCenter,
  qualityFactor: record.model.qualityFactor,
  robustConditionalParasiticStrength: 0.00001,
  dominantGate: record.decision.dominantGate,
  hundredPpmYields: record.results.filter((point) => point.strength === 0.0001)
    .map((point) => ({pole: point.poleRatio, yield: point.passFraction})),
  epistemicStatus: record.epistemicStatus,
  boundary: record.boundary
}));

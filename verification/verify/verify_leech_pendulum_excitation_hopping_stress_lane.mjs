import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-pendulum-excitation-hopping-stress-lane-v1.json", import.meta.url),
  "utf8"
));
const rotor = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-rotor-native-pendulum-gap-v1.json", import.meta.url),
  "utf8"
));
assert.equal(record.schemaVersion, "leech-pendulum-excitation-hopping-stress-lane-v1");

const reference = rotor.cutoffSpectrum.find((rung) => rung.N === 64).gap;
const delta = record.effectiveModel.unperturbedGap;
assert.ok(Math.abs(delta - reference) < 2e-12);
assert.ok(Math.abs(record.effectiveModel.criticalHopping - delta / 2) < 2e-12);

for (const point of record.periodicStressLadder) {
  assert.ok(Math.abs(point.hopping - point.hoppingOverGap * delta) < 2e-12);
  const expectedGap = Math.max(0, delta - 2 * Math.abs(point.hopping));
  assert.ok(Math.abs(point.gap - expectedGap) < 2e-12);
}
assert.equal(record.periodicStressLadder.at(-1).gap, 0);

const stressRatio = 0.4;
let previousGap = Infinity;
for (const point of record.openChainAtHoppingOverGapPointFour) {
  const hopping = stressRatio * delta;
  const expectedGap = delta - 2 * hopping * Math.cos(Math.PI / (point.cells + 1));
  assert.ok(Math.abs(point.gap - expectedGap) < 2e-12);
  assert.ok(point.gap < previousGap);
  assert.ok(point.gap > delta * (1 - 2 * stressRatio));
  previousGap = point.gap;
}

assert.equal(record.measurementProtocol.falsifiers.length, 4);
assert.ok(record.boundary.includes("not the general Yarotsky stability radius"));

console.log(JSON.stringify({
  status: "PASS",
  unperturbedGap: delta,
  criticalHopping: record.effectiveModel.criticalHopping,
  criticalHoppingOverGap: record.effectiveModel.criticalHopping / delta,
  heldOutRatios: [0.3, 0.4, 0.45],
  largestOpenChainCheck: record.openChainAtHoppingOverGapPointFour.at(-1),
  boundary: record.boundary
}));

import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-c24-normalized-character-discriminator-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-c24-normalized-character-discriminator-v1");

const weightTwo = 196884;
for (const point of evidence.checkpoints) {
  const q = Math.exp(-2 * Math.PI * point.y);
  assert.ok(Math.abs(q - point.q) < 1e-15);
  assert.ok(Math.abs(point.leechMonsterSignal - 24 * q) < 1e-14);
  assert.ok(Math.abs(point.e8MonsterSignal - 744 * q) < 1e-13);
  assert.ok(Math.abs(point.sharedWeightTwoContribution - weightTwo * q ** 2) < 1e-13);
  assert.ok(Math.abs(point.e8MonsterSignal - point.leechMonsterSignal - 720 * q) < 1e-13);
}

const yOne = evidence.checkpoints.find((point) => point.y === 1);
assert.ok(yOne);
assert.ok(yOne.leechMonsterSignal > 0.04);
assert.ok(yOne.e8MonsterSignal > 1);
assert.equal(evidence.finiteSizeDictionary.modulus, "y=v beta/L");
assert.ok(evidence.commissioningOrder.at(-1).includes("order-46"));
assert.ok(evidence.interpretationBoundary.some((line) => line.includes("finite-size")));

console.log(JSON.stringify({
  status: "PASS",
  exactDifferences: evidence.exactDifferences,
  checkpoints: evidence.checkpoints,
  selfDualPoint: yOne,
  recommendedOrder: evidence.commissioningOrder,
}));

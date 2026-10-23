#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-axial-fixed-point-identifiability-v1.json", root,
), "utf8"));

const a = 2;
const target = 1 / 8;
const betaKnown = (eta, h) => a * eta * h * h;
const completions = [
  { id: "select_one_eighth", beta: (eta, h, g) => betaKnown(eta, h) + g * (eta - target), slope: 1 },
  { id: "reject_one_eighth", beta: (eta, h, g) => betaKnown(eta, h) + g * (eta - 1 / 3), slope: 1 },
  { id: "opposite_local_slope", beta: (eta, h, g) => betaKnown(eta, h) - g * (eta - target), slope: -1 },
];

assert.equal(evidence.targetCoefficient, target);
for (const completion of completions) {
  for (const eta of [-2, 0, target, 0.7]) {
    for (const h of [0, 0.2, 1]) {
      assert.ok(Math.abs(completion.beta(eta, h, 0) - betaKnown(eta, h)) < 1e-15);
    }
  }
}
assert.equal(completions[0].beta(target, 0, 1), 0);
assert.notEqual(completions[1].beta(target, 0, 1), 0);
assert.equal(completions[2].beta(target, 0, 1), 0);
assert.equal(completions[0].slope, -completions[2].slope);
assert.equal(evidence.minimumReopeningPacket.length, 5);

console.log("Spin(2,3) axial fixed-point identifiability: PASS");
console.log("  same known slice: fixed, nonfixed, and opposite-slope completions exist");
console.log("  consequence: eta=1/8 and its relevance class are not identified");

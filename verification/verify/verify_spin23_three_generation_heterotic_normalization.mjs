#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-three-generation-heterotic-normalization-v1.json", root,
), "utf8"));

const c = data.compactification;
assert.equal(c.coverEulerCharacteristic / c.freelyActingGroupOrder, c.quotientEulerCharacteristic);
assert.equal(2 * (c.quotientHodgeNumbers.h11 - c.quotientHodgeNumbers.h21), c.quotientEulerCharacteristic);
assert.equal(Math.abs(c.quotientEulerCharacteristic) / 2, c.netGenerationMagnitude);
assert.equal(c.standardEmbeddingGaugeGroup, "E6");

for (const witness of data.kahlerScaling.witnesses) {
  assert.equal(witness.volumeRatio, witness.r ** 6);
  assert.equal(witness.canonicalCouplingRatio, witness.r ** -3);
  assert.equal(witness.netGenerations, c.netGenerationMagnitude);
}
assert.equal(data.modeAudit.identified, false);
assert.ok(data.modeAudit.missingInputs.length >= 5);

console.log("Spin(2,3) three-generation heterotic normalization: PASS");
console.log("  topology: chi=-6, |chi|/2=3, E6 standard embedding");
console.log("  normalization: fixed family index but lambda_c scales as r^-3");
console.log("  mode identity: massive PGT 0-minus eigenmode not established");

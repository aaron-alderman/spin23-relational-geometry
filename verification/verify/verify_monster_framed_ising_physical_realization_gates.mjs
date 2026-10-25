import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-framed-ising-physical-realization-gates-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-framed-ising-physical-realization-gates-v1");

const route = evidence.exactMathematicalRoute;
assert.equal(route.isingFrameFactors * route.centralChargePerFactor, route.totalCentralCharge);
assert.equal(route.totalCentralCharge, 24);
assert.equal(route.monsterValues.dimV1, 0);
assert.equal(route.monsterValues.dimV2, 196884);

const scaffold = evidence.order23Scaffold;
const permutation = scaffold.candidatePermutation;
assert.equal(permutation.length, 48);
assert.deepEqual([...permutation].sort((a, b) => a - b), Array.from({ length: 48 }, (_, i) => i));
const compose = (left, right) => right.map((value) => left[value]);
let power = Array.from({ length: 48 }, (_, i) => i);
let order = 0;
do {
  power = compose(permutation, power);
  order += 1;
  assert.ok(order <= 48);
} while (power.some((value, index) => value !== index));
assert.equal(order, scaffold.permutationOrder);
assert.equal(order, 23);

const seen = new Set();
const cycleLengths = [];
for (let start = 0; start < permutation.length; start += 1) {
  if (seen.has(start)) continue;
  let cursor = start;
  let length = 0;
  do {
    seen.add(cursor);
    cursor = permutation[cursor];
    length += 1;
  } while (cursor !== start);
  cycleLengths.push(length);
}
cycleLengths.sort((a, b) => b - a);
assert.deepEqual(cycleLengths, scaffold.candidateCycleLengths);
assert.equal(scaffold.provedToPreserveMoonshineStructureCodes, false);
assert.equal(scaffold.provedToLiftToMonster23AB, false);

const gateStatus = Object.fromEntries(evidence.physicalGates.map((gate) => [gate.id, gate.status]));
assert.equal(Object.keys(gateStatus).length, 5);
assert.ok(gateStatus.F2.includes("open"));
assert.ok(gateStatus.F5.includes("open"));
assert.ok(evidence.antiOverclaim.some((line) => line.includes("not V-natural")));

console.log(JSON.stringify({
  status: "PASS",
  centralCharge: route.totalCentralCharge,
  frameFactors: route.isingFrameFactors,
  candidateCycleLengths: cycleLengths,
  candidatePermutationOrder: order,
  theoremGate: "framed + holomorphic + c=24 + V1=0 => V-natural",
  openGates: evidence.physicalGates.filter((gate) => gate.status.includes("open")).map((gate) => gate.id),
  lightningTarget: evidence.laneJunction.lightningTarget,
}));

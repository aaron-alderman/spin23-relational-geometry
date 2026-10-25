import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/monster-edge-dynamics-transport-witness-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));

assert.equal(evidence.schemaVersion, "monster-edge-dynamics-transport-witness-v1");
const {boltzmannJK: kB, planckJs: h} = evidence.thermalTransport.constantsSI;
const hbar = h / (2 * Math.PI);
const c = evidence.universalDynamics.centralCharge;
const slope = c * Math.PI ** 2 * kB ** 2 / (3 * h);
assert.ok(Math.abs(slope / evidence.thermalTransport.expectedWPerK2 - 1) < 1e-14);

const {edgeLengthM: L, velocityMPerS: v, temperatureK: T} = evidence.benchmark;
const leechHz = v / L;
const monsterHz = 2 * v / L;
const monsterGapJ = 4 * Math.PI * hbar * v / L;
const monsterGapK = monsterGapJ / kB;
assert.equal(leechHz, evidence.benchmark.leechFirstOnsetHz);
assert.equal(monsterHz, evidence.benchmark.monsterFirstOnsetHz);
assert.ok(Math.abs(monsterGapJ / evidence.benchmark.monsterGapJ - 1) < 1e-8);
assert.ok(Math.abs(monsterGapK / evidence.benchmark.monsterGapK - 1) < 1e-12);
assert.ok(Math.abs(slope * T / evidence.benchmark.thermalHallWPerK - 1) < 1e-14);

assert.equal(evidence.spectralWitness.monsterWeightOneDegeneracy, 0);
assert.equal(evidence.spectralWitness.monsterFirstExcitedDegeneracy, 196884);
assert.equal(evidence.spectralWitness.leechWeightOneDegeneracy, 24);
assert.match(evidence.boundary, /Thermal transport alone cannot distinguish/);

console.log(JSON.stringify({
  status: "PASS",
  thermalHallSlopeWPerK2: slope,
  benchmark: {
    L,
    v,
    leechFirstOnsetHz: leechHz,
    monsterFirstOnsetHz: monsterHz,
    monsterGapJ,
    monsterGapK,
    thermalHallWPerK: slope * T
  },
  provenanceOrder: evidence.measurementOrder
}));

import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/leech-monster-toric-code-condensation-fork-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "leech-monster-toric-code-condensation-fork-v1");

const labels = evidence.sectors.map((sector) => sector.label);
assert.deepEqual(labels, ["1", "e", "m", "epsilon"]);
const byLabel = Object.fromEntries(evidence.sectors.map((sector) => [sector.label, sector]));
for (const sector of evidence.sectors) {
  const spin = Math.cos(2 * Math.PI * sector.lowestWeightModulo1);
  assert.ok(Math.abs(spin - sector.topologicalSpin) < 1e-12);
  assert.equal(sector.quantumDimension, 1);
}

const encoding = evidence.fusion.encoding;
const decode = Object.fromEntries(Object.entries(encoding).map(([label, value]) => [value, label]));
const fuse = (a, b) => decode[encoding[a] ^ encoding[b]];
assert.equal(fuse("e", "e"), "1");
assert.equal(fuse("m", "m"), "1");
assert.equal(fuse("e", "m"), "epsilon");
assert.equal(fuse("epsilon", "epsilon"), "1");

const S = evidence.modularS;
for (let i = 0; i < 4; i += 1) {
  for (let j = 0; j < 4; j += 1) {
    const inner = S[i].reduce((sum, value, k) => sum + value * S[j][k], 0);
    assert.ok(Math.abs(inner - (i === j ? 1 : 0)) < 1e-12);
  }
}
assert.equal(1 / S[0][0], evidence.parent.totalQuantumDimension);

for (const fork of evidence.condensationFork) {
  const boson = byLabel[fork.condensedBoson];
  assert.equal(boson.topologicalSpin, 1);
  assert.equal(fuse(fork.condensedBoson, fork.condensedBoson), "1");
  assert.equal(fork.holomorphic, true);
}
assert.notEqual(evidence.condensationFork[0].condensedBoson, evidence.condensationFork[1].condensedBoson);
assert.ok(Math.abs(evidence.interface.quantumDimension - Math.sqrt(2)) < 1e-15);
assert.ok(evidence.antiOverclaim.some((line) => line.includes("does not determine")));

console.log(JSON.stringify({
  status: "PASS",
  parent: evidence.parent.chiralAlgebra,
  fusionTable: Object.fromEntries(labels.flatMap((a) =>
    labels.map((b) => [a + "*" + b, fuse(a, b)]))),
  topologicalSpins: Object.fromEntries(evidence.sectors.map((sector) => [sector.label, sector.topologicalSpin])),
  condensates: evidence.condensationFork.map((fork) => ({
    algebra: fork.algebra,
    output: fork.output,
  })),
  interfaceQuantumDimension: evidence.interface.quantumDimension,
  nextOpenStep: evidence.p3Dictionary.open,
}));

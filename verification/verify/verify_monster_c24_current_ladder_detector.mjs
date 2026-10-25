import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-c24-current-ladder-detector-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));
assert.equal(evidence.schemaVersion, "monster-c24-current-ladder-detector-v1");

const carriers = Object.fromEntries(evidence.carriers.map((carrier) => [carrier.id, carrier]));
const e8Roots = 240;
assert.equal(carriers.E8cubed.rootCurrents, 3 * e8Roots);
assert.equal(carriers.E8cubed.rankCurrents, 3 * 8);
assert.equal(
  carriers.E8cubed.weightOneDimension,
  carriers.E8cubed.rootCurrents + carriers.E8cubed.rankCurrents,
);
assert.equal(carriers.Leech.rootCurrents, 0);
assert.equal(carriers.Leech.weightOneDimension, carriers.Leech.rankCurrents);
assert.equal(carriers.Monster.weightOneDimension, 0);
assert.deepEqual(
  evidence.carriers.map((carrier) => carrier.weightOneDimension),
  [744, 24, 0],
);

const orbifold = evidence.orbifoldResolution;
assert.equal(
  (orbifold.unorbifoldedLeechWeightOne + orbifold.inversionInsertionWeightOne) / 2,
  orbifold.projectedUntwistedWeightOne,
);
assert.equal(24 / 16, orbifold.twistedGroundWeight);
assert.equal(2 ** 12, orbifold.twistedGroundRawDegeneracy);
assert.equal(
  orbifold.untwistedProjectedWeightTwo + orbifold.twistedProjectedWeightTwo,
  orbifold.monsterWeightTwo,
);
assert.equal(orbifold.monsterWeightTwo, evidence.sharedData.weightTwoCharacterCoefficient);
assert.ok(evidence.falsifiers.some((line) => line.startsWith("196884")));

console.log(JSON.stringify({
  status: "PASS",
  currentLadder: evidence.carriers.map((carrier) => ({
    carrier: carrier.id,
    dimV1: carrier.weightOneDimension,
    character: carrier.character,
  })),
  sharedWeightTwoCoefficient: evidence.sharedData.weightTwoCharacterCoefficient,
  orbifoldWeightTwoSplit: {
    untwisted: orbifold.untwistedProjectedWeightTwo,
    twisted: orbifold.twistedProjectedWeightTwo,
  },
  firstDiscriminator: "dim(V_1), not 196884",
}));

import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/moonshine-twisted-sector-resource-compiler-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(evidence.schemaVersion, "moonshine-twisted-sector-resource-compiler-v1");

const input = evidence.orbifoldInput;
assert.equal(input.invertedBosons / 16, 1.5);
assert.equal(2 ** input.twistedGroundQubits, input.twistedGroundDegeneracy);

const level = evidence.firstRetainedTwistedLevel;
assert.equal(1.5 + 0.5, level.weight);
assert.equal(input.twistedGroundDegeneracy * level.halfOscillatorChoices, level.degeneracy);
assert.equal(level.degeneracy, 98304);
assert.equal(level.degeneracy + 98580, 196884);

const toy = evidence.surfaceCodeResourceAnalogue;
assert.equal(toy.twistDefects, 2 * toy.twistPairs);
assert.equal(2 ** (toy.twistPairs - 1), toy.fixedParityDimension);
assert.equal(Math.log2(toy.fixedParityDimension), toy.fixedParityLogicalQubits);
assert.equal(toy.fixedParityDimension * toy.channelSelectorDimension, toy.combinedDimension);
assert.equal(toy.combinedDimension, level.degeneracy);
assert.match(evidence.boundary, /only a resource analogue/);

console.log(JSON.stringify({
  status: "PASS",
  twistWeight: input.invertedBosons / 16,
  twistedGroundDimension: input.twistedGroundDegeneracy,
  logicalQubits: input.twistedGroundQubits,
  surfaceCodeTwists: toy.twistDefects,
  halfOscillatorChoices: level.halfOscillatorChoices,
  retainedWeight: level.weight,
  retainedTwistedDimension: level.degeneracy,
  fullWeightTwoDimension: level.degeneracy + 98580
}));

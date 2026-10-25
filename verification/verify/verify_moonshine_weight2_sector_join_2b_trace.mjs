import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/moonshine-weight2-sector-join-2b-trace-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(evidence.schemaVersion, "moonshine-weight2-sector-join-2b-trace-v1");

const u = evidence.untwistedInvariant;
assert.equal(u.symmetricTwoOscillatorDimension, u.oscillatorChannels * (u.oscillatorChannels + 1) / 2);
assert.equal(u.antipodalMinimalVectorPairs, u.leechMinimalVectors / 2);
assert.equal(u.total, u.symmetricTwoOscillatorDimension + u.antipodalMinimalVectorPairs);
assert.equal(u.total, 98580);

const t = evidence.twistedInvariant;
assert.equal(t.twistedGroundDimension, 2 ** 12);
assert.equal(t.total, t.twistedGroundDimension * t.halfOscillatorChannels);
assert.equal(t.total, 98304);

const join = evidence.weightTwoJoin;
assert.equal(join.identityTrace, u.total + t.total);
assert.equal(join.zTrace, u.total - t.total);
assert.equal(join.monsterDimension, join.identityTrace);
assert.equal(join.zTrace, 276);
assert.equal(join.monsterClass, "2B");
assert.match(evidence.boundary, /does not reconstruct cross-sector Griess products/);

console.log(JSON.stringify({
  status: "PASS",
  untwisted: {
    symmetricOscillators: u.symmetricTwoOscillatorDimension,
    minimalVectorPairs: u.antipodalMinimalVectorPairs,
    total: u.total
  },
  twisted: t.total,
  monsterWeightTwo: join.monsterDimension,
  trace2B: join.zTrace,
  next: "cross-sector Griess products and noncentral Monster action"
}));

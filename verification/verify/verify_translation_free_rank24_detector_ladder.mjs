import assert from "node:assert/strict";
import fs from "node:fs";

const load = name => JSON.parse(fs.readFileSync(new URL(`../../evidence/data/${name}`, import.meta.url), "utf8"));
const ladder = load("translation-free-rank24-detector-ladder-v1.json");
const leech = load("leech-explicit-k-matrix-v1.json");
const monster = load("monster-is-physics-proof-certificate-v1.json");

assert.equal(ladder.schemaVersion, "translation-free-rank24-detector-ladder-v1");
assert.deepEqual(ladder.bulkCollision.record, [24,1,24,24]);

const current = ladder.weightOneDetector;
assert.equal(current.E8Cubed.rank + current.E8Cubed.normTwoRootCount, 744);
assert.equal(current.Leech.rank + current.Leech.normTwoRootCount, 24);
assert.equal(current.Moonshine.dimV1, 0);
assert.equal(new Set([current.E8Cubed.dimV1, current.Leech.dimV1, current.Moonshine.dimV1]).size, 3);
assert.equal(current.injectiveOnDeclaredFamily, true);

assert.equal(leech.source.catalogueClaims.dimension, 24);
assert.equal(leech.source.catalogueClaims.minimalNorm, 4);
assert.match(JSON.stringify(monster), /weight.?one|V1|V_1/i);
assert.equal(ladder.characterBoundary.unrestrictedMoonshineUniquenessClaimed, false);
assert.equal(ladder.detectorOrder.length, 5);

console.log(JSON.stringify({
  status: "PASS",
  bulkDetector: {record:[24,1,24,24], injective:false},
  currentDetector: {E8Cubed:744, Leech:24, Moonshine:0, injectiveOnDeclaredFamily:true},
  nextDetector: "frame/Griess multiplication before marked defects and sewing"
}));

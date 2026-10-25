import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const atlas = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/mystery_atlas_register_v1.json"), "utf8"));
const distance = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/mystery_distance_register_v1.json"), "utf8"));

assert.equal(distance.schema, "dynatology-mystery-distance/1");
assert.equal(distance.authority, "planning_heuristic_not_truth_probability");
assert.deepEqual(distance.coordinates, ["carrier", "dynamics", "detector", "evidence", "promotionDebt"]);

const atlasIds = atlas.entries.map((entry) => entry.id);
const distanceIds = distance.entries.map((entry) => entry.mysteryId);
assert.deepEqual(distanceIds, atlasIds, "every mystery must have exactly one ordered distance card");
assert.equal(new Set(distanceIds).size, distanceIds.length);

const bandFor = (total) => distance.bands.find((band) => total >= band.min && total <= band.max)?.id;
for (const entry of distance.entries) {
  assert.deepEqual(Object.keys(entry.scores), distance.coordinates, `${entry.mysteryId}: score coordinates`);
  for (const [coordinate, score] of Object.entries(entry.scores)) {
    assert.ok(Number.isInteger(score) && score >= 0 && score <= 4, `${entry.mysteryId}: ${coordinate}`);
  }
  const total = Object.values(entry.scores).reduce((sum, value) => sum + value, 0);
  assert.equal(entry.total, total, `${entry.mysteryId}: total`);
  assert.equal(entry.band, bandFor(total), `${entry.mysteryId}: band`);
  assert.ok(typeof entry.nearestCorpusObject === "string" && entry.nearestCorpusObject.trim(), `${entry.mysteryId}: nearestCorpusObject`);
  assert.ok(Array.isArray(entry.missingJoins) && entry.missingJoins.length > 0, `${entry.mysteryId}: missingJoins`);
  assert.ok(typeof entry.shortestBridge === "string" && entry.shortestBridge.trim(), `${entry.mysteryId}: shortestBridge`);
  assert.ok(Array.isArray(entry.sourceRefs) && entry.sourceRefs.length > 0, `${entry.mysteryId}: sourceRefs`);
  for (const ref of entry.sourceRefs) {
    assert.ok(fs.existsSync(path.join(root, ref)), `${entry.mysteryId}: missing ${ref}`);
  }
}

const sorted = [...distance.entries].sort((a, b) => a.total - b.total || a.mysteryId.localeCompare(b.mysteryId));
assert.equal(sorted[0].mysteryId, "MY-014", "quantum measurement should remain the closest current target");
assert.equal(sorted.at(-1).mysteryId, "MY-018", "untyped metaphysical bundle should remain the farthest target");

const bandCounts = Object.fromEntries(distance.bands.map((band) => [band.id, distance.entries.filter((entry) => entry.band === band.id).length]));
assert.deepEqual(bandCounts, {embedded:0, adjacent:2, bridged_but_unjoined:10, method_only_or_remote:7, currently_disconnected:3});

console.log("Dynatology mystery distance: PASS");
console.log(JSON.stringify(bandCounts));

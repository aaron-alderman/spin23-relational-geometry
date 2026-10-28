import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const catalogue = JSON.parse(await readFile(resolve(root, "evidence/data/prophecy-element-catalogue-v1.json"), "utf8"));
const result = JSON.parse(await readFile(resolve(root, "evidence/data/prophecy-element-catalogue-v1-result.json"), "utf8"));

assert.equal(catalogue.protocol, "prophetic-admissibility/element-catalogue/1");
assert.ok(result.recordCount >= 100);
assert.equal(result.recordCount, result.uniqueIdCount);
assert.equal(result.validationErrors.length, 0);
assert.equal(result.canonicalCoverage.length, 66);
assert.equal(result.canonicalUnreviewedCount, 0);
assert.ok(result.canonicalCoverage.every((entry) => ["catalogued", "reviewed-zero-record"].includes(entry.status)));
assert.equal(result.catalogueComplete, false);
assert.ok(Object.keys(result.collectionCounts).length >= 8);
assert.ok(result.candidacyCounts.yes > result.candidacyCounts.maybe);
assert.ok(result.candidacyCounts.maybe > 0);
assert.ok(result.candidacyCounts["low-probability"] > 0);

for (const required of ["gen-015-013-sojourn-affliction", "isa-044-cyrus", "dan-009-seventy-weeks", "mic-005-bethlehem-ruler", "mat-024-temple", "rev-013-number-666", "rec-newton-2060"]) {
  assert.ok(catalogue.records.some((record) => record.id === required), `missing ${required}`);
}

console.log(JSON.stringify({
  result: "pass",
  protocol: result.protocol,
  records: result.recordCount,
  books: result.bookCount,
  candidacyCounts: result.candidacyCounts,
  catalogueComplete: result.catalogueComplete
}, null, 2));

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const registry = JSON.parse(await readFile(resolve(root, "evidence/data/biblical-time-transform-register-v0.json"), "utf8"));

assert.equal(registry.protocol, "prophetic-admissibility/biblical-time-transforms/0");
assert.equal(new Set(registry.transforms.map((entry) => entry.id)).size, registry.transforms.length);

const dayYear = registry.transforms.filter((entry) => entry.id.startsWith("day-for-year"));
assert.equal(dayYear.length, 2);
assert.ok(dayYear.every((entry) => entry.authority === "explicit_local_assignment"));
assert.ok(dayYear.every((entry) => entry.globalChronologyLicense === false));

const millennium = registry.transforms.find((entry) => entry.id === "thousand-years-like-day");
assert.equal(millennium.authority, "reciprocal_simile");
assert.equal(millennium.globalChronologyLicense, false);

const family1260 = registry.candidateFamilies.find((entry) => entry.sourceDuration === "1260 days");
assert.equal(family1260.candidates.length, 4);
assert.equal(family1260.candidates.some((entry) => entry.output === "1260 years"), true);
assert.equal(family1260.candidates.some((entry) => entry.output === "1260000 years"), true);

console.log(JSON.stringify({
  result: "pass",
  protocol: registry.protocol,
  transforms: registry.transforms.length,
  boundary: "textual authority and scope only; no predictive ranking"
}, null, 2));


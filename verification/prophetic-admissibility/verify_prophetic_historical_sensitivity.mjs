import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const registry = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-historical-sensitivity-v0.json"), "utf8"));
const result = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-historical-sensitivity-v0-result.json"), "utf8"));

assert.equal(registry.protocol, "prophetic-admissibility/historical-critical-sensitivity/0");
assert.equal(new Set(registry.cases.map((entry) => entry.id)).size, registry.cases.length);
assert.ok(registry.cases.length >= 7);
assert.equal(result.primaryEligibleCount, 0);
assert.ok(result.sensitivityEligibleCount >= 5);

for (const entry of registry.cases) {
  assert.ok(Object.hasOwn(registry.codingRule.dateClasses, entry.dateClass));
  assert.ok(["I0", "I1", "I2", "I3", "I4"].includes(entry.independenceClass));
  assert.ok(entry.sources.length > 0);
  assert.ok(entry.annotation.length > 0);
  assert.ok(entry.rivals.length >= 2);
  assert.equal(new Set(entry.rivals.map((rival) => rival.id)).size, entry.rivals.length);
  assert.ok(entry.rivals.every((rival) => rival.claim && rival.scoringEffect));
}

assert.ok(result.rivalModelCount >= registry.cases.length * 2);

const tyre = registry.cases.find((entry) => entry.id === "ezekiel-tyre-sensitivity");
assert.equal(tyre.outcome, "miss");
const nahum = registry.cases.find((entry) => entry.id === "nahum-nineveh-fall-sensitivity");
assert.equal(nahum.dateClass, "D2");

console.log(JSON.stringify({
  result: "pass",
  protocol: registry.protocol,
  cases: registry.cases.length,
  primaryEligibleCount: result.primaryEligibleCount,
  sensitivityEligibleCount: result.sensitivityEligibleCount,
  boundary: result.authorityBoundary
}, null, 2));


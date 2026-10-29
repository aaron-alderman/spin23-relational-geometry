import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const registry = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-interpreter-forecasts-v0.json"), "utf8"));

assert.equal(registry.protocol, "prophetic-admissibility/interpreter-forecast-controls/0");
assert.ok(registry.records.length >= 7);
assert.equal(new Set(registry.records.map((record) => record.id)).size, registry.records.length);
for (const record of registry.records) {
  assert.ok(record.sources.length > 0, `${record.id} lacks sources`);
  assert.ok(["match", "partial", "miss", "censored"].includes(record.outcome));
  assert.ok(record.repair.length > 0, `${record.id} lacks repair ledger text`);
}

const newton = registry.records.find((record) => record.id === "newton-2060");
assert.equal(newton.outcome, "censored");
assert.equal(newton.forecastWindow.latest, null);

const camping = registry.records.find((record) => record.id === "camping-2011");
assert.equal(camping.outcome, "miss");
assert.match(camping.repair, /spiritual judgment/);

console.log(JSON.stringify({
  result: "pass",
  protocol: registry.protocol,
  records: registry.records.length,
  boundary: "descriptive historical control; no population rate or divine-agency inference"
}, null, 2));


import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const registry = JSON.parse(await readFile(resolve(root, "evidence/data/prophetic-admissibility-pilot-v0.json"), "utf8"));

assert.equal(registry.protocol, "prophetic-admissibility/source-admission-pilot/0");
assert.ok(registry.cases.length >= 8);
assert.equal(new Set(registry.cases.map((entry) => entry.id)).size, registry.cases.length);

const required = registry.admissionRule.predictiveCalibrationRequires;
for (const entry of registry.cases) {
  assert.ok(entry.sources.length > 0, `${entry.id} lacks source provenance`);
  assert.ok(entry.rejectionReceipt.length > 0, `${entry.id} lacks a rejection receipt`);
  for (const gate of required) {
    assert.equal(typeof entry.gates[gate], "boolean", `${entry.id} lacks boolean gate ${gate}`);
  }
}

const admitted = registry.cases.filter((entry) => required.every((gate) => entry.gates[gate]));
assert.equal(admitted.length, 0, "v0 must not silently promote a seed case into predictive calibration");

const newton = registry.cases.find((entry) => entry.id === "newton-2060-lower-bound");
assert.equal(newton.censoring.startsWith("right-censored"), true);
assert.equal(newton.outcome.latest, null);
assert.equal(newton.gates.independent_outcome, false);

console.log(JSON.stringify({
  result: "pass",
  protocol: registry.protocol,
  caseCount: registry.cases.length,
  predictiveCalibrationAdmittedCount: admitted.length,
  boundary: "source-admission pilot only; no predictive or theological ranking"
}, null, 2));


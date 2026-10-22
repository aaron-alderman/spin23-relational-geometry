#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const result = JSON.parse(await readFile(new URL(
  "../../evidence/data/worldwright-identity-retention-response-surface-local-v1.json",
  import.meta.url,
), "utf8"));
const harness = await readFile(new URL("../experiments/run_worldwright_identity_retention_response_surface.mjs", import.meta.url), "utf8");

assert.equal(result.schema, "worldwright.identity-retention-response-surface.local/1");
assert.equal(result.design.conditions, 5);
assert.equal(result.design.totalPairedCells, 3200);
assert.equal(result.design.modelRunsPerExecution, 6400);
assert.deepEqual(result.conditions.map(item => item.salience), [0, 0.25, 0.5, 0.75, 1]);
assert.ok(result.conditions.every(item => Object.values(item.winnerCounts).reduce((a, b) => a + b, 0) === 640));
assert.deepEqual(["0", "0.25", "0.5", "0.75", "1"].map(level => result.winnerChangesFromZero[level]), [0, 26, 45, 64, 87]);
assert.equal(result.relationalMonotonicViolations, 0);
assert.equal(result.overallMonotonicViolations, 0);
assert.equal(result.retentionGate.passed, true);
assert.equal(result.exactRepeat, true);
assert.match(result.gateHash, /^sha256:[0-9a-f]{64}$/);
for (const hash of Object.values(result.provenance).filter(value => /^[0-9a-f]{64}$/.test(value))) assert.ok(harness.includes(hash), `harness source pin missing: ${hash}`);
assert.ok(Object.values(result.authority).every(value => value === false));

for (let index = 1; index < result.conditions.length; index++) {
  assert.ok(result.conditions[index].meanRelationalDelta > result.conditions[index - 1].meanRelationalDelta);
  assert.ok(result.conditions[index].meanOverallDelta > result.conditions[index - 1].meanOverallDelta);
}

console.log("Worldwright identity retention response surface: PASS");
console.log("  5 salience levels; 3,200 paired cells; 6,400 runs per execution; exact repeat");
console.log("  identity 0->1 changes 87/640 winners with zero monotonicity violations");

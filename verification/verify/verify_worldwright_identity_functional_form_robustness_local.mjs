#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const result = JSON.parse(await readFile(new URL(
  "../../evidence/data/worldwright-identity-functional-form-robustness-local-v1.json",
  import.meta.url,
), "utf8"));
const harness = await readFile(new URL(
  "../experiments/run_worldwright_identity_functional_form_robustness.mjs",
  import.meta.url,
), "utf8");

assert.equal(result.schema, "worldwright.identity-functional-form-robustness.local/1");
assert.equal(result.design.normalizedForms, 5);
assert.equal(result.design.conditions, 30);
assert.equal(result.design.totalPairedCells, 19200);
assert.equal(result.design.modelRunsPerExecution, 38400);
assert.equal(result.exactRepeat, true);
assert.match(result.robustnessHash, /^sha256:[0-9a-f]{64}$/);
for (const hash of Object.values(result.provenance).filter(value => /^[0-9a-f]{64}$/.test(value))) assert.ok(harness.includes(hash), `harness source pin missing: ${hash}`);

const normalized = result.forms.filter(form => form.id !== "nullControl");
assert.ok(normalized.every(form => form.endpointWinnerChanges === 87));
assert.deepEqual(result.forms.find(form => form.id === "nullControl").winnerChangesFromZero, [0, 0, 0, 0, 0]);
assert.equal(result.relationalMonotonicityViolations, 0);
assert.equal(result.overallMonotonicityViolations, 0);
assert.ok(Object.values(result.hypotheses).every(Boolean));
assert.ok(new Set(normalized.map(form => JSON.stringify(form.winnerChangesFromZero))).size > 1);
assert.ok(Object.values(result.authority).every(value => value === false));

console.log("Worldwright identity functional-form robustness: PASS");
console.log("  6 forms; 30 conditions; 19,200 paired cells; 38,400 runs per execution; exact repeat");
console.log("  endpoint retention is invariant at 87/640; intermediate dose-response is not identified");

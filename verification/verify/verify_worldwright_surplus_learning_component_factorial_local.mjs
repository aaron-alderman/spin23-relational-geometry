#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const result = JSON.parse(await readFile(new URL(
  "../../evidence/data/worldwright-surplus-learning-component-factorial-local-v1.json",
  import.meta.url,
), "utf8"));
const harness = await readFile(new URL("../experiments/run_worldwright_surplus_learning_component_factorial.mjs", import.meta.url), "utf8");

assert.equal(result.schema, "worldwright.surplus-learning-component-factorial.local/1");
assert.equal(result.design.conditions, 8);
assert.equal(result.design.totalPairedCells, 5120);
assert.equal(result.design.modelRunsPerExecution, 10240);
assert.equal(result.design.smoothTransition.weights.reduce((a, b) => a + b, 0), 1);
assert.equal(result.exactRepeat, true);
assert.match(result.factorialHash, /^sha256:[0-9a-f]{64}$/);
for (const hash of Object.values(result.provenance).filter(value => /^[0-9a-f]{64}$/.test(value))) assert.ok(harness.includes(hash), `harness source pin missing: ${hash}`);

for (const transition of [result.results.hard, result.results.smoothWidth2]) {
  assert.equal(transition.neither.activeContrasts, 0);
  assert.equal(transition.healthOnly.activeContrasts, 0);
  assert.equal(transition.healthOnly.totalAbsoluteChange, 0);
  assert.equal(transition.learningOnly.activeContrasts, transition.both.activeContrasts);
  assert.equal(transition.learningOnly.totalAbsoluteChange, transition.both.totalAbsoluteChange);
  assert.equal(transition.learningNecessaryContrasts, transition.both.activeContrasts);
  assert.equal(transition.healthNecessaryContrasts, 0);
  assert.equal(transition.interactionActiveContrasts, 0);
  assert.equal(transition.interactionL1, 0);
  assert.equal(transition.additiveReproductionCount, 480);
}

assert.equal(result.results.hard.both.activeContrasts, 304);
assert.equal(result.results.smoothWidth2.both.activeContrasts, 360);
assert.ok(Object.values(result.authority).every(value => value === false));

console.log("Worldwright learning-health component factorial: PASS");
console.log("  8 conditions; 5,120 paired cells; 10,240 runs per execution; exact repeat");
console.log("  learning reproduces 100% of the relational timing effect; health and interaction reproduce 0%");

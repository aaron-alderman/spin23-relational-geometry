#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const result = JSON.parse(await readFile(new URL(
  "../../evidence/data/worldwright-smooth-capacity-transition-comparator-local-v1.json",
  import.meta.url,
), "utf8"));

assert.equal(result.schema, "worldwright.smooth-capacity-transition-comparator.local/1");
assert.equal(result.design.weights.reduce((a, b) => a + b, 0), 1);
assert.equal(result.design.conditions, 4);
assert.equal(result.design.totalPairedCells, 2560);
assert.equal(result.design.modelRunsPerExecution, 5120);
assert.deepEqual(result.conditions.map(item => item.width), [0, 1, 2, 4]);
assert.deepEqual(result.conditions.map(item => item.activeContrasts), [304, 328, 360, 424]);
assert.deepEqual(result.conditions.map(item => item.totalAbsoluteChange), [19.6, 19.495, 19.026, 18.167]);
assert.deepEqual(result.conditions.map(item => item.emergent), [0, 24, 56, 120]);
assert.deepEqual(result.conditions.map(item => item.l1FromHard), [0, 0.641, 1.364, 3.723]);
assert.ok(result.conditions.every(item => item.negative === item.activeContrasts));
assert.equal(result.hardActivePreservedAtEverySmoothWidth, 304);
assert.equal(result.hardActiveSignsPreservedAtEverySmoothWidth, 304);
assert.equal(result.signReversals, 0);
assert.equal(result.disappearedHardEffects, 0);
assert.ok(Object.values(result.hypotheses).every(Boolean));
assert.match(result.comparatorHash, /^sha256:[0-9a-f]{64}$/);
assert.equal(result.exactRepeat, true);
assert.ok(Object.values(result.authority).every(value => value === false));

console.log("Worldwright smooth capacity-transition comparator: PASS");
console.log("  4 conditions; 2,560 paired cells; 5,120 runs per execution; exact repeat");
console.log("  all 304 hard effects persist with zero reversals; width 4 adds 120 contrasts");

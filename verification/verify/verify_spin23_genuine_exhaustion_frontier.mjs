import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..", "..");
const frontier = JSON.parse(readFileSync(join(root, "evidence", "data", "spin23-genuine-exhaustion-frontier.json"), "utf8"));

assert.equal(frontier.schema, "spin23.genuine-exhaustion-frontier/1");
assert.equal(frontier.physicalAdmission, false);

const expected = ["A2", "A4", "A5", "A6", "A7", "A9", "A11"];
const ids = frontier.blockers.map(({ id }) => id).sort();
assert.deepEqual(ids, expected.slice().sort());

const byId = new Map(frontier.blockers.map((gate) => [gate.id, gate]));
for (const gate of frontier.blockers) {
  assert(gate.firstMissingDatum.length > 20, `${gate.id} needs a first missing datum`);
  assert(gate.smallestResolvingCalculation.length > 20, `${gate.id} needs a resolving calculation`);
  assert(gate.falsifier.length > 20, `${gate.id} needs a falsifier`);
  assert(gate.externalInputBoundary.length > 10, `${gate.id} needs an external-input boundary`);
  for (const dependency of gate.dependsOn) assert(byId.has(dependency), `${gate.id} has unknown dependency ${dependency}`);
}

const visiting = new Set();
const visited = new Set();
function visit(id) {
  assert(!visiting.has(id), `dependency cycle at ${id}`);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const dependency of byId.get(id).dependsOn) visit(dependency);
  visiting.delete(id);
  visited.add(id);
}
for (const id of ids) visit(id);

assert.deepEqual(frontier.priorityRoots, ["A2", "A4", "A5"]);
assert.equal(byId.get("A11").dependsOn.includes("A9"), true);
assert.equal(byId.get("A9").dependsOn.includes("A6"), true);
assert.equal(byId.get("A9").dependsOn.includes("A7"), true);

console.log(JSON.stringify({
  passed: true,
  schema: frontier.schema,
  blockerCount: frontier.blockers.length,
  priorityRoots: frontier.priorityRoots,
  conditionalParallelGate: frontier.conditionalParallelGate,
  downstreamConsumers: frontier.downstreamConsumers,
  physicalAdmission: frontier.physicalAdmission
}, null, 2));

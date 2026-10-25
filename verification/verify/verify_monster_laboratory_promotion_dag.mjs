import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/monster-laboratory-promotion-dag-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));

assert.equal(evidence.schemaVersion, "monster-laboratory-promotion-dag-v1");
assert.match(evidence.carrierRule.required, /same carrier/);
assert.match(evidence.carrierRule.forbiddenSubstitution, /does not advance/);

const allowedStatuses = new Set(evidence.statusVocabulary);
const gates = new Map(evidence.gates.map((gate) => [gate.id, gate]));
assert.equal(gates.size, evidence.gates.length, "gate ids must be unique");
assert.deepEqual([...gates.keys()], ["A", "B", "C", "D", "E", "F", "G", "H", "I"]);

for (const gate of gates.values()) {
  assert.ok(allowedStatuses.has(gate.status), `${gate.id}: invalid status`);
  assert.ok(gate.formalTarget.length > 20, `${gate.id}: target missing`);
  assert.ok(gate.measurement.length > 20, `${gate.id}: measurement missing`);
  assert.ok(gate.pass.length > 20, `${gate.id}: pass rule missing`);
  assert.ok(gate.failMeaning.length > 10, `${gate.id}: failure meaning missing`);
  for (const dependency of gate.dependsOn) assert.ok(gates.has(dependency), `${gate.id}: missing dependency ${dependency}`);
}

const visiting = new Set();
const visited = new Set();
function visit(id) {
  if (visited.has(id)) return;
  assert.ok(!visiting.has(id), `cycle at ${id}`);
  visiting.add(id);
  for (const dependency of gates.get(id).dependsOn) visit(dependency);
  visiting.delete(id);
  visited.add(id);
}
for (const id of gates.keys()) visit(id);

const ancestors = (id, found = new Set()) => {
  for (const dependency of gates.get(id).dependsOn) {
    if (!found.has(dependency)) {
      found.add(dependency);
      ancestors(dependency, found);
    }
  }
  return found;
};
assert.deepEqual([...ancestors("I")].sort(), ["A", "B", "C", "D", "E", "F", "G", "H"]);
assert.deepEqual(gates.get("H").dependsOn, ["F", "G"]);
assert.deepEqual(evidence.promotion.requiredGateOrder, [...gates.keys()]);

assert.match(gates.get("B").formalTarget, /rather than a factorized/);
assert.match(gates.get("D").pass, /24 to 0/);
assert.match(gates.get("E").formalTarget, /196884=98580\+98304/);
assert.match(gates.get("G").formalTarget, /sqrt\(23\)/);
assert.match(gates.get("H").pass, /0\.00373794542221053/);
assert.match(gates.get("H").pass, /0\.0784643601781287/);
assert.match(gates.get("I").measurement, /six two-point plus ten symmetric three-point/);

const labOpen = evidence.gates.filter((gate) => gate.status === "laboratory-open").map((gate) => gate.id);
assert.deepEqual(labOpen, ["D", "E", "F", "G", "H", "I"]);
assert.equal(evidence.currentFrontier.firstUnclosedGate, "A");
assert.equal(evidence.promotion.natureSelectionStillOpen, true);

console.log(JSON.stringify({
  status: "PASS",
  gates: [...gates.keys()],
  topologicallyAcyclic: true,
  terminalAncestors: [...ancestors("I")].sort(),
  laboratoryOpen: labOpen,
  firstUnclosedGate: evidence.currentFrontier.firstUnclosedGate,
  natureSelectionStillOpen: evidence.promotion.natureSelectionStillOpen
}));

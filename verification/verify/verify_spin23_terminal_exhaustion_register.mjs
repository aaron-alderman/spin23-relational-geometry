import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const register = JSON.parse(readFileSync(join(root, "evidence", "data", "spin23-terminal-exhaustion-register.json"), "utf8"));

assert.equal(register.schema, "spin23.terminal-exhaustion-register/1");
assert.equal(register.documentId, 1453);
assert.equal(register.physicalAdmission, false);

const allowedStatuses = new Set([
  "established",
  "conditionally-constructed",
  "internally-exhausted",
  "externally-open",
  "failed"
]);
assert.deepEqual(new Set(Object.keys(register.statusVocabulary)), allowedStatuses);

const expectedGates = ["A2", "A4", "A5", "A6", "A7", "A9", "A11"];
assert.deepEqual(register.gates.map(g => g.id), expectedGates);
for (const gate of register.gates) {
  assert(allowedStatuses.has(gate.terminalClass));
  assert(gate.secondaryClasses.every(x => allowedStatuses.has(x)));
  assert.equal(gate.gatePassed, false);
  assert(gate.survivingClaim.length > 60);
  assert(gate.firstExternalDatum.length > 40);
  assert(gate.reopenCondition.startsWith("Reopen"));
  assert(gate.forbiddenOverclaim.length > 40);
  assert(Array.isArray(gate.failedCandidateClasses));
}

function sourceExists(id) {
  const band = id < 1300 ? "1200-1299" : id < 1400 ? "1300-1399" : "1400-1499";
  return readdirSync(join(root, "corpus", "claims", band)).some(name => name.startsWith(id + "_"));
}
for (const source of register.sources) assert(sourceExists(source), "missing source document " + source);

// The dependency ledger must be a typed DAG rather than an unqualified causal theorem.
const gateIds = new Set(expectedGates);
const allowedEdgeTypes = new Set(["present-model", "logical-for-physical-stress", "programme-mechanism", "logical-for-stress-response"]);
const adjacency = new Map(expectedGates.map(id => [id, []]));
for (const edge of register.dependencyEdges) {
  assert(gateIds.has(edge.from) && gateIds.has(edge.to));
  assert(allowedEdgeTypes.has(edge.type));
  adjacency.get(edge.from).push(edge.to);
}
const visiting = new Set();
const visited = new Set();
function visit(id) {
  assert(!visiting.has(id), "cycle at " + id);
  if (visited.has(id)) return;
  visiting.add(id);
  for (const next of adjacency.get(id)) visit(next);
  visiting.delete(id);
  visited.add(id);
}
for (const id of expectedGates) visit(id);
assert.equal(visited.size, expectedGates.length);
assert(register.edgeQualification.includes("not universal logical dependencies"));

// Terminal status lists form a disjoint and complete partition of the seven gates.
const t = register.terminalVerdict;
const partitions = [
  t.internallyExhaustedGates,
  t.conditionallyConstructedGates,
  t.externallyOpenGates,
  t.failedWholeGates
];
const flattened = partitions.flat();
assert.equal(new Set(flattened).size, flattened.length);
assert.deepEqual([...flattened].sort(), [...expectedGates].sort());
assert.deepEqual(t.failedWholeGates, []);
assert.equal(t.failedCandidateClassesExist, true);

const byGate = new Map(register.gates.map(g => [g.id, g]));
for (const id of t.internallyExhaustedGates) assert.equal(byGate.get(id).terminalClass, "internally-exhausted");
for (const id of t.conditionallyConstructedGates) assert.equal(byGate.get(id).terminalClass, "conditionally-constructed");
for (const id of t.externallyOpenGates) assert.equal(byGate.get(id).terminalClass, "externally-open");

// Red-team corrections are required terminal constraints, not optional prose.
const corrections = register.redTeamCorrectionsApplied.join(" ");
for (const token of ["1291", "1394", "1292", "1290", "1393", "1396", "1231", "1230"]) {
  assert(corrections.includes(token), "missing red-team correction for " + token);
}
assert(byGate.get("A5").failedCandidateClasses.some(x => x.includes("1291")));
assert(byGate.get("A6").forbiddenOverclaim.includes("rank-nullity"));
assert(byGate.get("A4").forbiddenOverclaim.includes("fully healthy"));

assert.deepEqual(register.independentGraphLane.documents, [1280, 1281, 1282]);
assert.equal(register.independentGraphLane.terminalClass, "internally-exhausted");
assert.equal(register.independentGraphLane.physicalSpacetimeAdmission, false);
assert(register.independentGraphLane.survivingClaim.includes("sp(4,R)"));

assert.equal(existsSync(join(root, "corpus", "claims", "1400-1499",
  "1453_genuine_exhaustion_leaves_no_untyped_internal_work_but_seven_named_external_or_conditional_frontiers.md")), true);

console.log(JSON.stringify({
  passed: true,
  documentId: register.documentId,
  gates: expectedGates,
  terminalPartition: {
    internallyExhausted: t.internallyExhaustedGates,
    conditionallyConstructed: t.conditionallyConstructedGates,
    externallyOpen: t.externallyOpenGates,
    failedWholeGates: t.failedWholeGates
  },
  graphLane: register.independentGraphLane.terminalClass,
  physicalAdmission: register.physicalAdmission
}, null, 2));

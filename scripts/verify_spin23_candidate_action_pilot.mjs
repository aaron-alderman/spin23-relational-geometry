import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));
const repositoryRoot = resolve(scriptDirectory, "..");
const specificationPath = join(repositoryRoot, "spin23-action-pilot", "candidate-action-v1.json");
const specification = JSON.parse(readFileSync(specificationPath, "utf8"));

assert.equal(specification.schema, "spin23.typed-candidate-action-pilot/1");
assert.deepEqual(specification.statusVocabulary, ["implemented", "exact", "conditional", "missing"]);
assert.equal(specification.claimBoundary.fundamentalSpin23ActionDerived, false);
assert.equal(specification.claimBoundary.standardModelDerived, false);
assert.equal(specification.claimBoundary.newPhysicalEffectObserved, false);
assert.equal(specification.claimBoundary.physicalAdmission, false);

for (const source of specification.sources) {
  assert(existsSync(join(repositoryRoot, source)), `missing declared source: ${source}`);
}

const nodes = new Map(specification.nodes.map((node) => [node.id, node]));
assert.equal(nodes.size, specification.nodes.length, "node identifiers must be unique");

for (const node of specification.nodes) {
  assert(specification.statusVocabulary.includes(node.status), `unknown status on ${node.id}`);
  for (const dependency of node.dependsOn) {
    assert(nodes.has(dependency), `${node.id} has unknown dependency ${dependency}`);
    assert.notEqual(dependency, node.id, `${node.id} depends on itself`);
  }
  for (const evidence of node.evidence ?? []) {
    assert(existsSync(join(repositoryRoot, evidence)), `${node.id} has missing evidence ${evidence}`);
  }
  if (node.status === "missing") {
    assert.equal(node.passed, false, `${node.id}: a missing node cannot pass`);
    assert((node.missingEvidence ?? []).length > 0, `${node.id}: missing nodes must state missing evidence`);
  }
  if (node.gate && node.passed) {
    assert(specification.admissionPolicy.allowedPassingStatuses.includes(node.status), `${node.id}: conditional/missing gate cannot pass`);
  }
}

// Prove acyclicity rather than trusting the displayed ordering.
const temporary = new Set();
const permanent = new Set();
function visit(id) {
  if (permanent.has(id)) return;
  assert(!temporary.has(id), `cycle detected at ${id}`);
  temporary.add(id);
  for (const dependency of nodes.get(id).dependsOn) visit(dependency);
  temporary.delete(id);
  permanent.add(id);
}
for (const id of nodes.keys()) visit(id);

const requiredGates = specification.admissionPolicy.requiredGateIds.map((id) => {
  assert(nodes.has(id), `unknown required gate ${id}`);
  const node = nodes.get(id);
  assert.equal(node.gate, true, `${id} is required but is not marked as a gate`);
  return node;
});
const blockers = requiredGates
  .filter((node) => !node.passed || !specification.admissionPolicy.allowedPassingStatuses.includes(node.status))
  .map((node) => node.id);
assert.deepEqual(blockers, specification.admissionPolicy.expectedCurrentBlockers);
assert(blockers.includes("A4"), "physical-state/ghost gate must remain exposed");
assert(blockers.includes("A5"), "chiral selector gate must remain exposed");
assert(blockers.includes("A6"), "Standard Model limit must remain exposed");
assert(blockers.includes("A9"), "physical Standard Model response must remain exposed");
assert(blockers.includes("A11"), "branch-discriminating measurement must remain exposed");

const admitted = blockers.length === 0;
assert.equal(admitted, specification.claimBoundary.physicalAdmission);

// A locally valid theorem or diagnostic is not an instantiated physical step
// until every dependency on its path is also available.
const operationalMemo = new Map();
function isOperational(id) {
  if (operationalMemo.has(id)) return operationalMemo.get(id);
  const node = nodes.get(id);
  const result = node.passed
    && specification.admissionPolicy.allowedPassingStatuses.includes(node.status)
    && node.dependsOn.every(isOperational);
  operationalMemo.set(id, result);
  return result;
}
const endToEndBlockers = requiredGates.filter((node) => !isOperational(node.id)).map((node) => node.id);
const locallyPassedButUninstantiated = requiredGates
  .filter((node) => node.passed && !isOperational(node.id))
  .map((node) => node.id);
assert(locallyPassedButUninstantiated.includes("A8"), "the exact H2 response theorem must not masquerade as a calculated response");

// The observable is numerically well-defined on positive two-by-two responses.
const determinant = (matrix) => matrix[0][0] * matrix[1][1] - matrix[0][1] ** 2;
const normalizedRank = (matrix) => determinant(matrix) / (matrix[0][0] + matrix[1][1]) ** 2;
const positiveInterior = [[2, 0.5], [0.5, 1]];
const positiveRay = [[2, 2], [2, 2]];
assert(determinant(positiveInterior) > 0);
assert(normalizedRank(positiveInterior) > 0 && normalizedRank(positiveInterior) <= 0.25);
assert.equal(determinant(positiveRay), 0);
assert.equal(normalizedRank(positiveRay), 0);

assert.equal(specification.branchDiscriminatingTarget.status, "specified-not-predicted");
assert.match(specification.branchDiscriminatingTarget.candidatePositiveSignature, /third positive response direction/u);
assert.match(specification.branchDiscriminatingTarget.candidatePositiveSignature, /Z3 holonomy/u);

console.log(JSON.stringify({
  passed: true,
  candidateId: specification.candidateId,
  nodeCount: specification.nodes.length,
  requiredGateCount: requiredGates.length,
  passingRequiredGates: requiredGates.length - blockers.length,
  blockers,
  endToEndBlockers,
  locallyPassedButUninstantiated,
  physicalAdmission: admitted,
  branchTargetStatus: specification.branchDiscriminatingTarget.status
}, null, 2));

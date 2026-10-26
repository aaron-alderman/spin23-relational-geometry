import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL("../../evidence/data/monster-is-physics-proof-certificate-v1.json", import.meta.url);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));
assert.equal(evidence.schemaVersion, "monster-is-physics-proof-certificate-v1");
assert.equal(evidence.physicalityCriteria.length, 5);
assert.deepEqual(evidence.premises.map((premise) => premise.id), ["P1", "P2", "P3", "P4"]);
assert.ok(evidence.premises.every((premise) => premise.status === "established"));
assert.ok(evidence.premises.every((premise) => premise.evidence.length >= 1));

const citedEvidence = new Set(evidence.premises.flatMap((premise) => premise.evidence));
for (const required of [
  "leech-explicit-k-matrix-v1",
  "monster-leech-edge-orbifold-physicality-v1",
  "monster-framed-ising-physical-realization-gates-v1",
  "monster-edge-dynamics-transport-witness-v1",
  "monster-edge-operator-tomography-dictionary-v1"
]) assert.ok(citedEvidence.has(required));

assert.match(evidence.deduction.at(-1), /exact physical realization/);
assert.equal(evidence.independentPhysicalRealization.status, "established-at-declared-scope");
assert.equal(evidence.laboratoryFrontier.status, "open");
assert.equal(evidence.laboratoryFrontier.protocol, "monster-laboratory-promotion-dag-v1");
assert.equal(evidence.operationalSelfReconstruction.status, "optional-stronger-frontier");
assert.equal(evidence.operationalSelfReconstruction.evidence, "monster-typed-self-description-gate-v1");
assert.match(evidence.operationalSelfReconstruction.requirement, /held-out trace, defect and OPE channels/);
assert.match(evidence.operationalSelfReconstruction.boundary, /does not refute/);
assert.ok(evidence.notDeduced.length >= 5);
for (const forbidden of ["four-dimensional spacetime", "fundamentally selects", "response algebra is gravity", "E8 gauge field"]) {
  assert.ok(evidence.notDeduced.some((item) => item.includes(forbidden)), `missing scope refusal: ${forbidden}`);
}
assert.match(evidence.verdict, /proved as an existence statement/);
assert.match(evidence.verdict, /remain falsifiable open promotions/);

console.log(JSON.stringify({
  status: "PASS",
  establishedPremises: evidence.premises.map((premise) => premise.id),
  physicalityCriteria: evidence.physicalityCriteria,
  conclusion: evidence.verdict,
  laboratoryStatus: evidence.laboratoryFrontier.status,
  refusedOverclaims: evidence.notDeduced.length
}));

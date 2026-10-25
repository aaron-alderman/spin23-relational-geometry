import assert from "node:assert/strict";
import fs from "node:fs";

const path = new URL(
  "../../evidence/data/monster-orthogonal-physics-witness-stack-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(path, "utf8"));

assert.equal(
  evidence.schemaVersion,
  "monster-orthogonal-physics-witness-stack-v1",
);

const criteria = new Set(evidence.physicsCriteria);
assert.deepEqual([...criteria], [
  "state-space",
  "operator-composition",
  "dynamics-or-amplitudes",
  "observable-readout",
  "provenance",
]);

const witnesses = new Map(evidence.witnesses.map((witness) => [witness.id, witness]));
assert.deepEqual([...witnesses.keys()], ["H", "T", "J", "E", "L", "C"]);
for (const witness of witnesses.values()) {
  for (const criterion of witness.tests) {
    assert.ok(criteria.has(criterion), `${witness.id} has unknown criterion ${criterion}`);
  }
  assert.ok(witness.scopeBoundary.length > 20, `${witness.id} lacks a scope boundary`);
}
assert.match(witnesses.get("E").scopeBoundary, /excludes an affine E8 current algebra/);
assert.match(witnesses.get("L").scopeBoundary, /without the c=24 Monster/);
assert.match(witnesses.get("C").signature, /2A for 46CD and 2B for 46AB/);

const features = new Set(evidence.features);
assert.equal(features.size, 8);
const candidates = new Map(
  evidence.candidateMatrix.map((candidate) => [candidate.id, candidate]),
);
assert.equal(candidates.size, evidence.candidateMatrix.length);
for (const candidate of candidates.values()) {
  assert.equal(new Set(candidate.passes).size, candidate.passes.length);
  for (const feature of candidate.passes) {
    assert.ok(features.has(feature), `${candidate.id} has unknown feature ${feature}`);
  }
}

const fullSet = evidence.features;
const passesAll = (candidate, required = fullSet) => {
  const passed = new Set(candidate.passes);
  return required.every((feature) => passed.has(feature));
};
const fullCandidates = evidence.candidateMatrix
  .filter((candidate) => passesAll(candidate))
  .map((candidate) => candidate.id);
assert.deepEqual(fullCandidates, ["heterotic-monster-model"]);

const provenanceFeatures = [
  "monster-character",
  "ty23-fourier-associator",
  "sym24-jordan-fixed-sector",
  "norton-sakuma-e8-atlas",
  "order46-2a-2b-junction",
  "single-carrier-coherence",
];
const mathematicalRealizations = evidence.candidateMatrix
  .filter((candidate) => passesAll(candidate, provenanceFeatures))
  .map((candidate) => candidate.id);
assert.deepEqual(mathematicalRealizations, [
  "abstract-moonshine-voa",
  "heterotic-monster-model",
]);

for (const impostor of [
  "scalar-moonshine-output",
  "generic-c24-chiral-theory",
  "generic-ty23-system",
  "generic-monster-type-axial-system",
  "xxz23-carrier",
]) {
  assert.equal(passesAll(candidates.get(impostor), provenanceFeatures), false);
}

assert.deepEqual(
  evidence.jointLaboratoryPromotionGate.requiredOnOneCarrier,
  evidence.features.filter((feature) => feature !== "heterotic-bps-dictionary"),
);
assert.equal(evidence.jointLaboratoryPromotionGate.currentStatus, "open");
assert.ok(evidence.jointLaboratoryPromotionGate.minimumHeldOutChecks.length >= 4);
assert.deepEqual(evidence.logicalConclusion, {
  P1: "proved",
  P2: "proved-at-declared-theoretical-scope",
  P3: "open",
  P4: "open",
});

console.log(JSON.stringify({
  status: "PASS",
  witnesses: [...witnesses.keys()],
  independentFeatures: features.size,
  impostorsRejected: 5,
  mathematicalRealizations,
  fullPhysicsRealizations: fullCandidates,
  laboratoryPromotion: evidence.jointLaboratoryPromotionGate.currentStatus,
  conclusion: evidence.logicalConclusion,
}));

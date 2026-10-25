import assert from "node:assert/strict";
import fs from "node:fs";

const evidencePath = new URL(
  "../../evidence/data/monster-physics-realization-ladder-v1.json",
  import.meta.url,
);
const evidence = JSON.parse(fs.readFileSync(evidencePath, "utf8"));

assert.equal(
  evidence.schemaVersion,
  "monster-physics-realization-ladder-v1",
);

const claims = new Map(evidence.claimLevels.map((claim) => [claim.id, claim]));
assert.deepEqual([...claims.keys()], ["P1", "P2", "P3", "P4"]);

const resolved = new Set();
for (const claim of evidence.claimLevels) {
  for (const prerequisite of claim.requires) {
    assert.ok(claims.has(prerequisite), `${claim.id} has unknown prerequisite ${prerequisite}`);
    assert.ok(resolved.has(prerequisite), `${claim.id} precedes prerequisite ${prerequisite}`);
  }
  resolved.add(claim.id);
}

assert.equal(claims.get("P1").status, "established");
assert.equal(claims.get("P2").status, "established-in-theory");
assert.equal(claims.get("P3").status, "open");
assert.equal(claims.get("P4").status, "open");

const dictionary = new Map(evidence.heteroticDictionary);
for (const source of [
  "McKay-Thompson coefficient",
  "modular invariance group",
  "denominator product",
  "Monstrous Lie algebra",
]) {
  assert.ok(dictionary.has(source), `missing heterotic dictionary entry: ${source}`);
}
assert.match(evidence.heteroticIndexIdentity, /\^24$/);
assert.equal(evidence.heteroticScope.effectiveDimension, "0+1");
assert.equal(evidence.heteroticScope.stringCoupling, "zero");
assert.match(evidence.heteroticScope.firewall, /gravitational-anomaly/);

assert.deepEqual(evidence.realizationFunctorObligations, [
  "preparation",
  "composition",
  "dynamics",
  "detection",
  "provenance",
]);

const parseRational = (text) => {
  const [numerator, denominator = "1"] = text.split("/");
  return [BigInt(numerator), BigInt(denominator)];
};
const addRationals = ([a, b], [c, d]) => [a * d + c * b, b * d];
const [centralNumerator, centralDenominator] = addRationals(
  parseRational(evidence.finiteWitness.majoranaCentralCharge),
  parseRational(evidence.finiteWitness.babyMonsterCentralCharge),
);
assert.equal(
  centralNumerator,
  BigInt(evidence.finiteWitness.centralCharge) * centralDenominator,
  "Majorana plus Baby-Monster central charge must equal 24",
);

assert.equal(
  evidence.finiteWitness.arfOddZeros + evidence.finiteWitness.arfEvenComponents,
  evidence.finiteWitness.arfInputComponents,
);
assert.match(evidence.finiteWitness.uniquenessQualifier, /framed or Griess/);

const structuralLayers = new Set(evidence.finiteWitness.requiredStructuralLayers);
for (const layer of [
  "2A fermionization",
  "23AB orientation-sensitive defect observable",
  "order-46 junction",
  "nontrivial sewing or coherence relation",
]) {
  assert.ok(structuralLayers.has(layer), `missing witness layer: ${layer}`);
}

assert.ok(evidence.scalarNoGos.includes("T_23A equals T_23B"));
assert.ok(
  evidence.scalarNoGos.includes(
    "a programmed finite permutation does not establish Monster provenance",
  ),
);

const promotionGates = new Map(
  evidence.p3PromotionGates.map((gate) => [gate.id, gate.status]),
);
assert.equal(promotionGates.size, 8);
assert.ok([...promotionGates.values()].every((status) => status === "open"));

const p3Promotable = [...promotionGates.values()].every(
  (status) => status === "passed",
);
assert.equal(p3Promotable, false);
assert.equal(evidence.forbiddenConclusion, "nature is Monster");

const orderedRoutes = [...evidence.rankedRoutes].sort((a, b) => a.rank - b.rank);
assert.deepEqual(
  orderedRoutes.map((route) => route.rank),
  [1, 2, 3, 4],
);
assert.equal(orderedRoutes[0].id, "heterotic-bps");

console.log(JSON.stringify({
  status: "PASS",
  establishedClaims: evidence.claimLevels
    .filter((claim) => claim.status.startsWith("established"))
    .map((claim) => claim.id),
  openClaims: evidence.claimLevels
    .filter((claim) => claim.status === "open")
    .map((claim) => claim.id),
  heteroticDictionaryEntries: dictionary.size,
  witnessLayers: structuralLayers.size,
  p3PromotionGates: promotionGates.size,
  p3Promotable,
  currentConclusion: evidence.currentConclusion,
}));


#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..", "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "evidence/data/admissibility-boundary-compiler-v1.json"), "utf8"));
const document = fs.readFileSync(path.join(root, "corpus/programmes/admissibility/admissibility_53_boundary_lift_to_casimir_thermoelectric_compiler.md"), "utf8");

assert.equal(data.schema, "admissibility.boundary-compiler/1");
assert.equal(data.id, "AZ-053");
assert.equal(data.model.sameInventory, true);
assert.equal(data.model.sameTraceH2, true);
assert.equal(data.difference.traceH2, 0);
assert.ok(Math.abs(data.difference.traceH4) > 1);
assert.ok(Math.abs(data.difference.seebeck) > 1);
assert.ok(Math.abs(data.difference.casimirProxy) > 1e-3);

const fibre = data.completePlacementFibre;
assert.equal(fibre.size, 35);
assert.equal(fibre.expectedBinomialSize, 35);
assert.equal(new Set(fibre.members.map((member) => member.word)).size, 35);
for (const member of fibre.members) {
  assert.equal([...member.word].filter((symbol) => symbol === "S").length, 4);
  assert.equal([...member.word].filter((symbol) => symbol === "W").length, 3);
  assert.ok(member.transmissionAtChemicalPotential >= 0 && member.transmissionAtChemicalPotential <= 1 + 1e-8);
}
assert.equal(fibre.seebeckSigns.negative + fibre.seebeckSigns.nearZero + fibre.seebeckSigns.positive, 35);
assert.ok(fibre.seebeckSigns.negative > 0 && fibre.seebeckSigns.positive > 0);
assert.equal(fibre.seebeckRange.distinctAt1e9, 19);
assert.equal(fibre.casimirProxyRange.distinctAt1e9, 35);
assert.equal(fibre.reversalAudit.orbitCount, 19);
assert.equal(fibre.reversalAudit.palindromicOrbitCount, 3);
assert.equal(fibre.reversalAudit.thermoelectricResponseIsReversalBlind, true);
assert.equal(fibre.reversalAudit.oneSidedCasimirProxyIsReversalSensitive, true);
assert.ok(fibre.reversalAudit.maximumSeebeckDifference < 1e-12);
assert.ok(fibre.reversalAudit.maximumCasimirDifference > 1e-3);

assert.equal(data.factorizationTests.traceH2FactorsThroughInventoryForThisPair, true);
assert.equal(data.factorizationTests.traceH4FactorsThroughInventoryForThisPair, false);
assert.equal(data.factorizationTests.seebeckFactorsThroughInventoryForThisPair, false);
assert.equal(data.factorizationTests.casimirProxyFactorsThroughInventoryForThisPair, false);
assert.match(data.absentChannels.anomalousNernst, /not_represented/);
assert.equal(data.admission.commonCasimirSeebeckInvariantEstablished, false);
assert.equal(data.admission.materialPredictionEstablished, false);

for (const phrase of [
  "constant on every fibre",
  "complete fibre",
  "19 orbits",
  "lifts the reversal quotient",
  "no anomalous Nernst channel",
  "joint-detector injectivity",
]) assert.ok(document.includes(phrase), `missing document phrase: ${phrase}`);

console.log("PASS boundary-admissibility compiler, complete placement fibre and type firewalls");
console.log(JSON.stringify({placements: fibre.size, reversalOrbits: fibre.reversalAudit.orbitCount, seebeckClasses: fibre.seebeckRange.distinctAt1e9, boundaryClasses: fibre.casimirProxyRange.distinctAt1e9}));

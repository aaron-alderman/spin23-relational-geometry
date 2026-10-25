import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/transition-operator-admissibility-bridge-v1.json", root), "utf8"));
const document = readFileSync(new URL("corpus/programmes/admissibility/admissibility_127_transition_operators_selection_rules_and_lifetime_frontier.md", root), "utf8");

assert.equal(evidence.packet, "AZ-127");
assert.equal(evidence.target, "OT-036");
assert.equal(evidence.chain.length, 6);
assert.equal(evidence.established.wignerEckartSeparatesAngularAndReducedData, true);
assert.equal(evidence.established.allowedNonzeroAndFastAreDistinct, true);
assert.equal(evidence.established.atomicAndNuclearMechanismsRemainTypedSeparately, true);
assert.equal(evidence.experiment.buildGateDeclared, true);
assert.equal(evidence.experiment.bridgeGateDeclared, true);
assert.equal(evidence.experiment.physicsGateDeclared, true);
assert.equal(evidence.boundaries.derivesStandardModel, false);
assert.equal(evidence.boundaries.equatesSymmetryPermissionWithAmplitude, false);

for (const required of [
  "Wigner--Eckart theorem",
  "Einstein coefficient",
  "Metastable helium",
  "Fermi and Gamow--Teller",
  "single trapped \\(^{40}{\\rm Ca}^{+}\\) ion",
  "**Build gate:**",
  "**Bridge gate:**",
  "**Physics gate:**",
  "What this does not show"
]) assert.ok(document.includes(required), `missing required bridge text: ${required}`);

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  target: evidence.target,
  chainStages: evidence.chain.length,
  nextGate: evidence.nextGate
}, null, 2));

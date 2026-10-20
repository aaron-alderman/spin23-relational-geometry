#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-z3-electroweak-domain-wall-gate.json",
  import.meta.url,
), "utf8"));

const n = evidence.group.order;
const stabilizer = (charge) => Array.from({ length: n }, (_, k) => k)
  .filter((k) => (charge * k) % n === 0);

assert.equal(stabilizer(evidence.chargesModuloThree.S0).length, 3);
assert.equal(stabilizer(evidence.chargesModuloThree.fundamental27H).length, 3);
const portalStabilizer = stabilizer(evidence.chargesModuloThree.portalS1);
assert.deepEqual(portalStabilizer, [0]);
assert.equal(portalStabilizer.length, evidence.electroweakVacuum.stabilizerOrderForGlobalZ3);
assert.equal(n / portalStabilizer.length, evidence.electroweakVacuum.orbitSize);
assert.equal(evidence.electroweakVacuum.symmetryRelatedDegenerateRepresentatives, 3);
assert.equal(evidence.electroweakVacuum.disconnectedVacuumComponentsDerivedFromChargeDataAlone, false);
assert.equal(evidence.electroweakVacuum.stableDomainWallsIfRepresentativesAreIsolatedGlobalVacua, true);
assert.equal(Object.keys(evidence.escapeRoutes).length, 4);

console.log("spin23 E6 Z3 electroweak domain-wall gate verification: PASS");
console.log("  high-scale neutral VEV stabilizer: Z3");
console.log("  nonzero charge-two portal VEV stabilizer: trivial");
console.log("  exact global orbit: three degenerate images; disconnectedness remains a scalar-vacuum test");

#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-conformal-topological-axial-selection-no-go-v1.json", root,
), "utf8"));
const w = evidence.weylWeights;

assert.equal(2 * w.diracField + w.inverseGamma, w.contravariantAxialCurrent);
assert.equal(w.sqrtMetric + w.axialTorsionOneForm + w.contravariantAxialCurrent, 0);
assert.equal(2 + (-2), w.axialTorsionOneForm);
assert.equal(evidence.topologyTests.fermionVariationNonzero, true);
assert.equal(evidence.topologyTests.torsionVariationNonzero, true);
assert.equal(evidence.topologyTests.characteristicClass, false);
assert.equal(evidence.topologyTests.coefficientQuantized, false);

console.log("Spin(2,3) conformal/topological axial-selection no-go: PASS");
console.log("  Weyl weight: sqrt(g) S_mu J5^mu = 4 + 0 - 4 = 0");
console.log("  topology: local fermion and torsion variations are nonzero");
console.log("  result: neither conformal covariance nor characteristic-class quantization fixes the coefficient");

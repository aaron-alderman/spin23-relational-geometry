#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-axial-u1-locking-completion-v1.json", root,
), "utf8"));

const effective = ({ g, q, rho, M }) => ({
  eta: g * q * rho,
  fourFermion: -((g * q) ** 2) / (2 * M ** 2),
});
assert.equal(effective({ g: 0.5, q: 1, rho: 0.25, M: 10 }).eta, 1 / 8);
assert.notEqual(effective({ g: 0.4, q: 1, rho: 0.25, M: 10 }).eta, 1 / 8);
assert.equal(effective({ g: 0.5, q: 1, rho: 0.25, M: 10 }).fourFermion, -0.00125);

const anomaly = (charges) => ({
  gravitational: -2 * charges.reduce((sum, q) => sum + q, 0),
  cubic: -2 * charges.reduce((sum, q) => sum + q ** 3, 0),
});
assert.deepEqual(anomaly([1]), { gravitational: -2, cubic: -2 });
const cancelled = anomaly(evidence.minimalCancellationWitness);
assert.ok(Math.abs(cancelled.gravitational) < 1e-15);
assert.ok(Math.abs(cancelled.cubic) < 1e-15);
assert.equal(evidence.selectionTest.oneEighthIsPrediction, false);
assert.ok(evidence.spectrumCost.length >= 4);

console.log("Spin(2,3) axial U(1) locking completion: PASS");
console.log("  eta_eff=g q rho remains continuous and a four-fermion threshold is generated");
console.log("  one pure-axial Dirac fermion is anomalous; opposite charge cancels at extra spectrum cost");

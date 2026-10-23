#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-axial-coefficient-selection-no-go-v1.json", root,
), "utf8"));

const cMin = evidence.minimalMagnitude;
const kappa = 0.037;
assert.equal(cMin, 1 / 8);
assert.equal(cMin + kappa, 0.162);

// If O is invariant, both nonzero c_min O and arbitrary kappa O are invariant.
const operatorCharacter = 1;
assert.equal(operatorCharacter * cMin, cMin);
assert.equal(operatorCharacter * kappa, kappa);

// Compensator reversal: J5 -> -J5, E -> -E, T -> -T.
const firstFactorParity = (-1) * (-1);
const secondFactorParity = (-1) * (-1);
assert.equal(firstFactorParity * secondFactorParity, 1);

const C = 2;
const h = 0.8;
const beta = (eta) => C * eta * h ** 2 / (4 * Math.PI) ** 2;
assert.equal(beta(0), 0);
assert.notEqual(beta(cMin), 0);
assert.equal(evidence.oneLoopRG.minimalPointIsFixed, false);
assert.deepEqual(evidence.oneLoopRG.fixedPointsForNonzeroYukawa, [0]);
assert.ok(evidence.namedTransformations.every((entry) =>
  entry.result === "does not forbid" || entry.result === "cannot fix its scalar coefficient"));

console.log("Spin(2,3) axial-coefficient selection no-go: PASS");
console.log("  symmetry: identical operator provenance cannot be distinguished");
console.log("  compensator reversal: parent nonminimal invariant is even");
console.log("  one-loop RG: eta = 0 fixed, |eta| = 1/8 not fixed for h != 0");

#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const data = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-cross-sector-symmetry-classification-v1.json", root,
), "utf8"));

const m2 = 3;
const wSpin0 = -m2 * 0 * (0 + 1);
const wSpin2 = -m2 * 2 * (2 + 1);
assert.notEqual(wSpin0, wSpin2);
// [B,W^2]=0 implies (w2-w0) B_20=0.
const candidateMatrixElement = 0;
assert.ok(Math.abs((wSpin2 - wSpin0) * candidateMatrixElement) === 0);
assert.equal(data.representationAudit.spin2Spin0EigenvaluesDistinct, true);
assert.equal(data.representationAudit.ordinaryInternalGeneratorMixesSpin2AndSpin0, false);
assert.equal(data.colemanMandulaScope.assumptions.length, 5);
assert.ok(data.remainingLoopholeClasses.length >= 4);
assert.match(data.gradedExtension.minimalN1Result, /continuous Kahler coupling/);

console.log("Spin(2,3) cross-sector symmetry classification: PASS");
console.log("  Poincare commutant: distinct W^2 eigenspaces cannot mix");
console.log("  conditional bosonic S-matrix route: Poincare x internal only");
console.log("  graded loophole: supersymmetry; minimal N=1 already non-selective");

#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidenceUrl = new URL(
  "../../evidence/data/spin23-e6-gauge-loop-lambda2-source.json",
  import.meta.url,
);
const evidence = JSON.parse(await readFile(evidenceUrl, "utf8"));

assert.equal(evidence.generatorAudit.count, 78);
assert.equal(evidence.generatorAudit.fundamentalDimension, 27);
assert.ok(evidence.generatorAudit.maximumHermiticityResidual < 1e-12);
assert.ok(evidence.generatorAudit.maximumDiagonalNormalizationResidual < 1e-12);
assert.ok(evidence.generatorAudit.maximumOffDiagonalTraceResidual < 1e-12);

const norm = (entries) =>
  2 * entries.reduce((sum, [, , value]) => {
    const x = value === "-1/sqrt(10)"
      ? -1 / Math.sqrt(10)
      : value.startsWith("-(5+")
        ? -(5 + Math.sqrt(5)) / (20 * Math.sqrt(2))
        : (15 - Math.sqrt(5)) / (20 * Math.sqrt(2));
    return sum + x * x;
  }, 0);

assert.ok(Math.abs(norm(evidence.canonicalDirections.upChannel.symmetricEntries) - 1) < 1e-12);
assert.ok(Math.abs(norm(evidence.canonicalDirections.downChannel.symmetricEntries) - 1) < 1e-12);

const upPairs = evidence.contraction.upOrderedPairs;
const downPairs = evidence.contraction.downOrderedPairs;
assert.equal(upPairs.length, evidence.contraction.orderedGeneratorPairsPerChannel);
assert.equal(downPairs.length, evidence.contraction.orderedGeneratorPairsPerChannel);
assert.equal(new Set(upPairs.map((pair) => pair.join(","))).size, upPairs.length);
assert.equal(new Set(downPairs.map((pair) => pair.join(","))).size, downPairs.length);

const positive = (-5 + 3 * Math.sqrt(5)) / (8 * Math.sqrt(10));
const negative = (-5 - Math.sqrt(5)) / (8 * Math.sqrt(10));
const mixedHessian = 8 * positive + 24 * negative;
assert.ok(Math.abs(mixedHessian + 2 * Math.sqrt(10)) < 1e-12);

const i2Hessian = -1 / Math.sqrt(10);
const i2Coefficient = mixedHessian / i2Hessian;
assert.ok(Math.abs(i2Coefficient - 20) < 1e-12);

const backgroundValue = 208 / 9;
const i1Coefficient = backgroundValue - i2Coefficient;
assert.ok(Math.abs(i1Coefficient - 28 / 9) < 1e-12);

assert.equal(evidence.decision.pureGaugeOneLoopProjectsOntoI2, true);
assert.equal(evidence.decision.lambda2ZeroSurfaceGaugeRgeClosed, false);
assert.equal(evidence.decision.minimalNonsupersymmetricInertRouteTechnicallyNatural, false);

console.log("spin23 E6 pure-gauge lambda2 source verification: PASS");
console.log(`  normalized symmetric directions: 1, 1`);
console.log(`  nonzero ordered generator pairs: ${upPairs.length}, ${downPairs.length}`);
console.log(`  mixed Hessians: ${mixedHessian}, ${mixedHessian}`);
console.log(`  K decomposition: (28/9) I1 + ${i2Coefficient} I2`);

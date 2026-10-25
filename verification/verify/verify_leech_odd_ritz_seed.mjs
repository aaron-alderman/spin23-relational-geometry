#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-odd-ritz-seed-v1.json", import.meta.url)
));
assert.equal(record.configuration.dimension, 24);
assert.equal(record.configuration.cutoff, 2);
assert.equal(record.localPotential.parities.join(","), "1,-1,1,-1,1");
assert.equal(record.projectedProblem.ritzValues.length, 24);
assert.ok(record.projectedProblem.ritzValues.every(
  (value, index, values) => index === 0 || value >= values[index - 1]
));
assert.equal(record.projectedProblem.valuesBelowOddSeparator, 0);
assert.ok(record.projectedProblem.lowestRitz
  > record.projectedProblem.oddSeparator);
assert.ok(record.residualBlock.spectralNorm > 0.63);
assert.ok(record.residualBlock.minimumGramEigenvalue > 0);
assert.ok(record.denseControl.rayleighMatrixMaximumError < 2e-14);
assert.ok(record.denseControl.residualGramMaximumError < 2e-14);
assert.equal(record.admission.separatorDimensionRequirementMet, true);
assert.equal(record.admission.allRitzValuesBelowSeparator, false);
assert.equal(record.admission.lehmannLowerBoundsComputed, false);

console.log(JSON.stringify({
  status: "PASS",
  dimension: record.configuration.dimension,
  lowestRitz: record.projectedProblem.lowestRitz,
  oddSeparator: record.projectedProblem.oddSeparator,
  valuesBelowSeparator: record.projectedProblem.valuesBelowOddSeparator,
  residualBlockNorm: record.residualBlock.spectralNorm,
  denseControl: record.denseControl,
  conclusion: "bare one-odd potential band is not an admissible Lehmann subspace"
}));

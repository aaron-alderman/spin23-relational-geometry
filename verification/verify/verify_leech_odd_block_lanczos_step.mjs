#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-odd-block-lanczos-step-v1.json", import.meta.url)
));
const seed = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-odd-ritz-seed-v1.json", import.meta.url)
));
assert.equal(record.configuration.initialDimension, 24);
assert.equal(record.configuration.enrichedDimension, 48);
assert.equal(record.projectedSpectrum.ritzValues.length, 48);
assert.ok(record.projectedSpectrum.lowest < seed.projectedProblem.lowestRitz);
assert.ok(record.projectedSpectrum.lowest < 4.23);
assert.equal(record.projectedSpectrum.numberBelowSeparator, 18);
assert.equal(record.projectedSpectrum.lowest24BelowSeparator, false);
assert.ok(record.projectedSpectrum.twentyFourth
  > record.projectedSpectrum.oddSeparator);
assert.ok(record.denseControl.projectedMatrixMaximumError < 1e-13);
assert.ok(record.denseControl.projectedSpectrumMaximumError < 1e-13);
assert.equal(record.admission.blockLanczosAlgebraClosed, true);
assert.equal(record.admission.residualOfEnrichedSubspaceComputed, false);
assert.equal(record.admission.lehmannBoundsComputed, false);

console.log(JSON.stringify({
  status: "PASS",
  seedLowestRitz: seed.projectedProblem.lowestRitz,
  enrichedLowestRitz: record.projectedSpectrum.lowest,
  improvement: seed.projectedProblem.lowestRitz
    - record.projectedSpectrum.lowest,
  valuesBelowSeparator: record.projectedSpectrum.numberBelowSeparator,
  requiredValues: 24,
  denseControl: record.denseControl,
  admitted: false
}));

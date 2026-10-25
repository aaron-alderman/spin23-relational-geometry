#!/usr/bin/env node
import assert from "node:assert/strict";
import fs from "node:fs";

const record = JSON.parse(fs.readFileSync(
  new URL("../../evidence/data/leech-temple-separator-burden-v1.json", import.meta.url)
));
const spectrum = record.potentialOnlySpectrum;
const [v1, v2, v3, v4] = spectrum.localEigenvalues;
assert.ok(Math.abs(v1 - (1 - Math.cos(Math.PI / 6))) < 1e-14);
assert.ok(Math.abs(v2 - 0.5) < 1e-14);
assert.ok(Math.abs(v3 - 1) < 1e-14);
assert.ok(Math.abs(v4 - 1.5) < 1e-14);
assert.ok(Math.abs(spectrum.evenSeparator - (22 * v1 + 2 * v2)) < 1e-13);
assert.ok(spectrum.evenSeparator > record.fullCarrierEvenResidual.directUncompressedRun.rayleigh);
assert.equal(spectrum.oddFirstBand.multiplicity, 24);
assert.ok(Math.abs(spectrum.oddTwentyFifthSeparator
  - (21 * v1 + 3 * v2)) < 1e-13);

const residual = record.fullCarrierEvenResidual;
assert.equal(residual.directUncompressedRun.compressed, false);
assert.match(residual.directUncompressedRun.checkpointSha256, /^[0-9a-f]{64}$/u);
assert.ok(residual.maximumCompressionResidualSpread < 2e-12);
assert.ok(residual.reducedDenseControls.evenMaximumDenseContractionError < 1e-14);
assert.ok(residual.reducedDenseControls.oddMaximumDenseContractionError < 1e-14);

const temple = record.evenTempleCandidate;
const input = temple.paddedInputs;
const expected = input.rayleighLower - input.residualUpper ** 2
  / (input.separatorLower - input.rayleighLower);
assert.ok(Math.abs(temple.lower - expected) < 1e-14);
assert.ok(temple.lower < temple.upper);
assert.ok(temple.width < 0.0011);
assert.equal(temple.rigorousMachineIntervalCertified, false);

assert.equal(record.oddSeparatorBurden.lowerOperatorStatesBelowRitz, 24);
assert.equal(record.oddSeparatorBurden.requiredRitzSubspaceDimensionForThisRoute, 24);
assert.equal(record.oddSeparatorBurden.nextLowerOperatorEigenvalueAboveRitz, true);

console.log(JSON.stringify({
  status: "PASS",
  evenSeparator: spectrum.evenSeparator,
  evenTempleCandidate: [temple.lower, temple.upper],
  evenIntervalWidth: temple.width,
  oddStatesBelowRitz: record.oddSeparatorBurden.lowerOperatorStatesBelowRitz,
  oddTwentyFifthSeparator: spectrum.oddTwentyFifthSeparator,
  rigorousMachineIntervalCertified: temple.rigorousMachineIntervalCertified
}));

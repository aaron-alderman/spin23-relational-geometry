#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-torsion-empirical-geometry-extraction-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, tolerance = 1e-12) => {
  assert.ok(Math.abs(actual - expected) <= tolerance * Math.max(1, Math.abs(actual), Math.abs(expected)));
};

assert.equal(evidence.primarySource.doi, "10.1103/PhysRevLett.134.181801");
assert.equal(evidence.extractedGeometry.sensorCell.shape, "sphere");
assert.equal(evidence.extractedGeometry.sensorCell.diameterMillimetres, 12);
assert.equal(evidence.extractedGeometry.smCo5Core.shape, "cylinder");
assert.equal(evidence.extractedGeometry.smCo5Core.diameterMillimetres, 2.5);
assert.equal(evidence.extractedGeometry.smCo5Core.heightMillimetres, 2.5);
assert.equal(evidence.extractedGeometry.sourceSensorCenterDistance.millimetres, 50);
assert.equal(evidence.extractedGeometry.sourceSensorCenterDistance.sigmaMillimetres, 0.05);
assert.equal(evidence.modelDisclosure.sourceIntegralDeclared, true);
assert.equal(evidence.modelDisclosure.netSourceSpins, 4.63e20);
assert.equal(evidence.modelDisclosure.netSourceSpinsSigma, 0.56e20);
assert.equal(evidence.modelDisclosure.neutronSpinFraction, 0.58);
assert.equal(evidence.modelDisclosure.protonSpinFraction, 0.04);

close(evidence.dimensionlessAtSevenMillimetreRange.centerDistanceOverRange, 50 / 7);
close(evidence.dimensionlessAtSevenMillimetreRange.sourceRadiusOverCenterDistance, 1.25 / 50);
close(evidence.dimensionlessAtSevenMillimetreRange.sourceHeightOverCenterDistance, 2.5 / 50);
close(evidence.dimensionlessAtSevenMillimetreRange.sensorRadiusOverCenterDistance, 6 / 50);

assert.equal(evidence.availabilityLedger.macroscopicDimensions, "partially available");
assert.equal(evidence.availabilityLedger.combinedSmCo5AndSoftIronSpinDensityMap, "not identified");
assert.equal(evidence.availabilityLedger.rawTimeSeries, "not identified");
assert.equal(evidence.availabilityLedger.massDependentLikelihoodOrLimitTable, "figure-only in inspected source");
assert.ok(evidence.correction.correctedFinding.includes("explicitly approximate recast is possible"));
assert.ok(Object.values(evidence.authority).every(value => value === false));

console.log("Spin(2,3) torsion empirical geometry extraction: PASS");
console.log("  published geometry: 12 mm spherical cell; 2.5 mm x 2.5 mm SmCo5 core; 50.00(5) mm center distance");
console.log("  narrowed blocker: combined SmCo5/soft-iron spin density, exact simulation inputs, response weighting and likelihood data");
console.log("  status: approximate recast enabled; independent reproduction remains blocked");

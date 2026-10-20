import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const evidencePath = path.join(
  root,
  "evidence/data/spin23-a6-flux-split-spectator-anomaly-repair.json",
);
const data = JSON.parse(readFileSync(evidencePath, "utf8"));

assert.equal(data.documentId, 1457);
assert.equal(data.geometry.selectedIndex, 3);
assert.equal(data.geometry.spectatorIndex, 0);
assert.equal(data.geometry.familyCurvaturePurelyInternal, true);

const multiplets = [
  { name: "Q", color: 3, weak: 2, dimension: 6, y6: 1, colorCubic: 1 },
  { name: "u^c", color: 3, weak: 1, dimension: 3, y6: -4, colorCubic: -1 },
  { name: "d^c", color: 3, weak: 1, dimension: 3, y6: 2, colorCubic: -1 },
  { name: "L", color: 1, weak: 2, dimension: 2, y6: -3, colorCubic: 0 },
  { name: "e^c", color: 1, weak: 1, dimension: 1, y6: 6, colorCubic: 0 },
  { name: "N", color: 1, weak: 1, dimension: 1, y6: 0, colorCubic: 0 },
];

const sum = (fn) => multiplets.reduce((total, row) => total + fn(row), 0);
const componentDimension = sum((row) => row.dimension);
const su3Cubed = sum((row) => row.weak * row.colorCubic);
const su3SquaredY6 = sum((row) => (row.color === 3 ? row.weak * row.y6 : 0));
const su2SquaredY6 = sum((row) => (row.weak === 2 ? row.color * row.y6 : 0));
const gravitationalSquaredY6 = sum((row) => row.dimension * row.y6);
const y6Cubed = sum((row) => row.dimension * row.y6 ** 3);
const weakDoublets = sum((row) => (row.weak === 2 ? row.color : 0));

assert.equal(componentDimension, 16);
assert.equal(data.fieldContent.selectedComponentDimension, componentDimension);
assert.equal(data.fieldContent.spectatorComponentDimension, componentDimension);
assert.equal(data.fieldContent.sixDimensionalChiralityDifference, 0);
assert.equal(su3Cubed, 0);
assert.equal(su3SquaredY6, 0);
assert.equal(su2SquaredY6, 0);
assert.equal(gravitationalSquaredY6, 0);
assert.equal(y6Cubed, 0);
assert.equal(weakDoublets, 4);
assert.equal(weakDoublets % 2, 0);

const anomaly = data.anomalyFactorization;
assert.equal(anomaly.su3Cubed, su3Cubed);
assert.equal(anomaly.su3SquaredY6, su3SquaredY6);
assert.equal(anomaly.su2SquaredY6, su2SquaredY6);
assert.equal(anomaly.gravitationalSquaredY6, gravitationalSquaredY6);
assert.equal(anomaly.Y6Cubed, y6Cubed);
assert.equal(anomaly.fourDimensionalWeakDoublets, weakDoublets);
assert.equal(anomaly.internalFluxSquare, 0);
assert.equal(anomaly.localAnomalyOnRestrictedBackground, 0);
assert.equal(anomaly.sixDimensionalGlobalSu2DifferenceMod6, 0);

// The round S2 Dirac spectrum is +/- (ell+1)/R.  Its lowest level is
// nonzero, whereas the degree-three twisted index supplies three zero modes.
const ell = 0;
const untwistedLowest = ell + 1;
assert.equal(untwistedLowest, data.spectrum.spectatorFirstMassInInverseRadiusUnits);
assert.equal(data.spectrum.spectatorZeroModes, 0);
assert.equal(data.spectrum.masslessMirrorModes, 0);
assert.equal(data.spectrum.selectedPositiveZeroModes, 3);

assert.equal(data.verdict.minimalParentNoGoRemainsValid, true);
assert.equal(data.verdict.explicitZeroNetIndexSpectatorRepairExists, true);
assert.equal(data.verdict.masslessMirrorsReturn, false);
assert.equal(data.verdict.a6Passed, false);
assert.equal(data.verdict.physicalAdmission, false);

console.log(
  "PASS 1457: flux-split spectators cancel the restricted 6D anomaly polynomial and add no massless mirror kernel.",
);

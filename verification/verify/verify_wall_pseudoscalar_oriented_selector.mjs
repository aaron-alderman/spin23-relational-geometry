#!/usr/bin/env node

import assert from "node:assert/strict";

const tol = 1e-11;
const g = 0.9;
const lambda = 0.27;
const z = 0.4;
const k = 1.1;

const scalarWallResponse = () => z / (k * k - z * z);
const helicityWallResponse = (wallOrientation) => wallOrientation * k / (k * k - z * z);
const potential = (theta, wallOrientation) =>
  g * Math.sin(theta) ** 2 - lambda * wallOrientation * Math.sin(2 * theta);
const gradient = (theta, wallOrientation) =>
  g * Math.sin(2 * theta) - 2 * lambda * wallOrientation * Math.cos(2 * theta);
const hessian = (theta, wallOrientation) =>
  2 * g * Math.cos(2 * theta) + 4 * lambda * wallOrientation * Math.sin(2 * theta);
const selectedAngle = (wallOrientation) => 0.5 * Math.atan2(2 * lambda * wallOrientation, g);

assert.equal(scalarWallResponse(1), scalarWallResponse(-1));
assert.ok(Math.abs(helicityWallResponse(1) + helicityWallResponse(-1)) < tol);

for (const wallOrientation of [-1, 1]) {
  const theta = selectedAngle(wallOrientation);
  const expectedChi = (2 * lambda * wallOrientation) / Math.sqrt(g * g + 4 * lambda * lambda);
  const expectedOverlap = 0.5 * (1 + g / Math.sqrt(g * g + 4 * lambda * lambda));
  const expectedHessian = 2 * Math.sqrt(g * g + 4 * lambda * lambda);
  const expectedMinimum = g / 2 - Math.sqrt(g * g / 4 + lambda * lambda);

  assert.ok(Math.abs(gradient(theta, wallOrientation)) < tol);
  assert.ok(Math.abs(Math.sin(2 * theta) - expectedChi) < tol);
  assert.ok(Math.abs(Math.cos(theta) ** 2 - expectedOverlap) < tol);
  assert.ok(Math.abs(hessian(theta, wallOrientation) - expectedHessian) < tol);
  assert.ok(hessian(theta, wallOrientation) > 0);
  assert.ok(Math.abs(potential(theta, wallOrientation) - expectedMinimum) < tol);
}

assert.ok(Math.abs(selectedAngle(1) + selectedAngle(-1)) < tol);
assert.ok(Math.abs(potential(selectedAngle(1), 1) - potential(selectedAngle(-1), -1)) < tol);

for (const theta of [-1.1, -0.4, 0, 0.3, 0.9]) {
  const historyAverage = 0.5 * (potential(theta, 1) + potential(theta, -1));
  assert.ok(Math.abs(historyAverage - g * Math.sin(theta) ** 2) < tol);
}

const labelError = 0.5;
const physicalOddSelection = Math.sin(2 * selectedAngle(1));
const observedOddSelection = (1 - 2 * labelError) * physicalOddSelection;
assert.ok(Math.abs(physicalOddSelection) > 0);
assert.ok(Math.abs(observedOddSelection) < tol);

console.log(JSON.stringify({
  result: "pass",
  selectedAngles: { positiveWall: selectedAngle(1), negativeWall: selectedAngle(-1) },
  selectedOverlap: Math.cos(selectedAngle(1)) ** 2,
  selectedOrientedCoordinate: physicalOddSelection,
  hessian: hessian(selectedAngle(1), 1),
  interpretation: "wall history supplies the pseudoscalar needed for equilibrium oriented selection",
}, null, 2));


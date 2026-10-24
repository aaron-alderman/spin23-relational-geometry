#!/usr/bin/env node

import assert from "node:assert/strict";

const tol = 1e-12;
const J = [[0, -1], [1, 0]];
const JT = [[0, 1], [-1, 0]];
const Y = [[1, 0], [0, 0]];

function projector(theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return [[c * c, c * s], [c * s, s * s]];
}

function multiply(a, b) {
  return a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
}

function subtract(a, b) {
  return a.map((row, i) => row.map((value, j) => value - b[i][j]));
}

function trace(a) {
  return a.reduce((sum, row, i) => sum + row[i], 0);
}

function determinant2([[a, b], [c, d]]) {
  return a * d - b * c;
}

function overlap(p) {
  return trace(multiply(p, Y));
}

function pseudoscalar(p) {
  const commutator = subtract(multiply(p, Y), multiply(Y, p));
  return trace(multiply(JT, commutator));
}

for (const theta of [-1.2, -0.7, -0.2, 0, 0.3, 0.8, 1.3]) {
  const p = projector(theta);
  const pReflected = projector(-theta);
  const t = overlap(p);
  const tReflected = overlap(pReflected);
  const chi = pseudoscalar(p);
  const chiReflected = pseudoscalar(pReflected);

  assert.ok(Math.abs(t - Math.cos(theta) ** 2) < tol);
  assert.ok(Math.abs(t - tReflected) < tol, "overlap must be reflection even");
  assert.ok(Math.abs(chi - Math.sin(2 * theta)) < tol);
  assert.ok(Math.abs(chi + chiReflected) < tol, "pseudoscalar must be reflection odd");
  assert.ok(Math.abs(chi * chi - 4 * t * (1 - t)) < tol);
}

const m2 = 2.1;
const g = 0.6;
const h = 0.4;

function pairedDeterminant(theta) {
  const p = projector(theta);
  const t = overlap(p);
  const commutator = subtract(multiply(p, Y), multiply(Y, p));
  const a = m2 + g * (1 - t);
  // A_h = a I + i h [P,Y]. Its complex off-diagonal entries are
  // represented directly in the determinant as a^2 - h^2 t(1-t).
  const closedForm = a * a - h * h * t * (1 - t);
  const commutatorMagnitudeSquared = determinant2(commutator);
  assert.ok(Math.abs(commutatorMagnitudeSquared - t * (1 - t)) < tol);
  return closedForm;
}

for (const theta of [0.1, 0.35, 0.8, 1.2]) {
  assert.ok(Math.abs(pairedDeterminant(theta) - pairedDeterminant(-theta)) < tol);
  assert.ok(pairedDeterminant(theta) > 0, "chosen kernel parameters must remain positive");
}

console.log(JSON.stringify({
  result: "pass",
  unorientedInvariant: "t = Tr(PY) = cos^2(theta)",
  orientedLift: "chi = Tr(J^T[P,Y]) = sin(2 theta)",
  doubleCoverIdentity: "chi^2 = 4 t (1-t)",
  equilibriumNoGo: "the paired determinant is reflection even and loses the sign of chi",
}, null, 2));


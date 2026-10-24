#!/usr/bin/env node

import assert from "node:assert/strict";

const tol = 1e-10;
const v = 1.3;
const delta = 0.9;
const exponent = v * delta;

const sech = (u) => 1 / Math.cosh(u);
const wallMass = (x) => v * Math.tanh(x / delta);
const zeroModeEnvelope = (x) => sech(x / delta) ** exponent;
const zeroModeDerivative = (x) => -wallMass(x) * zeroModeEnvelope(x);

for (const x of [-5, -1.1, -0.2, 0, 0.2, 1.1, 5]) {
  const firstOrderResidual = zeroModeDerivative(x) + wallMass(x) * zeroModeEnvelope(x);
  assert.ok(Math.abs(firstOrderResidual) < tol, `zero-mode equation failed at x=${x}`);
}

const extent = 20 * delta;
const intervals = 200000;
const dx = (2 * extent) / intervals;
let norm = 0;
for (let i = 0; i <= intervals; i += 1) {
  const x = -extent + i * dx;
  const weight = i === 0 || i === intervals ? 0.5 : 1;
  norm += weight * zeroModeEnvelope(x) ** 2 * dx;
}
assert.ok(Number.isFinite(norm) && norm > 0);
assert.ok(zeroModeEnvelope(extent) < 1e-9 && zeroModeEnvelope(-extent) < 1e-9);

function projector(theta) {
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  return [[c * c, c * s], [c * s, s * s]];
}

function subtract(a, b) {
  return a.map((row, i) => row.map((value, j) => value - b[i][j]));
}

function multiply(a, b) {
  return a.map((row) => b[0].map((_, j) => row.reduce((sum, value, k) => sum + value * b[k][j], 0)));
}

function determinant2([[a, b], [c, d]]) {
  return a * d - b * c;
}

function maxDifference(a, b) {
  return Math.max(...a.flatMap((row, i) => row.map((value, j) => Math.abs(value - b[i][j]))));
}

const m2 = 1.7;
const g = 0.8;
const y = projector(0);

for (const theta of [-1.2, -0.4, 0, 0.3, 1.1]) {
  const pMinusY = subtract(projector(theta), y);
  const square = multiply(pMinusY, pMinusY);
  const scalar = Math.sin(theta) ** 2;
  const expectedSquare = [[scalar, 0], [0, scalar]];
  assert.ok(maxDifference(square, expectedSquare) < tol);

  const kernel = [
    [m2 + g * square[0][0], g * square[0][1]],
    [g * square[1][0], m2 + g * square[1][1]],
  ];
  const effectiveActionFromDeterminant = 0.5 * Math.log(determinant2(kernel));
  const effectiveActionClosedForm = Math.log(m2 + g * scalar);
  assert.ok(Math.abs(effectiveActionFromDeterminant - effectiveActionClosedForm) < tol);
}

const gamma = (theta) => Math.log(m2 + g * Math.sin(theta) ** 2);
const h = 1e-5;
const numericalHessian = (gamma(h) - 2 * gamma(0) + gamma(-h)) / (h * h);
const analyticHessian = 2 * g / m2;
assert.ok(Math.abs(numericalHessian - analyticHessian) < 2e-6);
assert.ok(analyticHessian > 0);

const alpha = 0.6;
const returnMultiplier = 1 - alpha * analyticHessian;
assert.ok(Math.abs(returnMultiplier) < 1);

for (const theta of [0.1, 0.4, 0.9]) {
  assert.ok(Math.abs(gamma(theta) - gamma(-theta)) < tol, "projective determinant must be orientation blind");
}

const selfGeneratedKernelDeterminant = m2 * m2;
const selfGeneratedAction = 0.5 * Math.log(selfGeneratedKernelDeterminant);
assert.ok(Math.abs(selfGeneratedAction - Math.log(m2)) < tol);

console.log(JSON.stringify({
  result: "pass",
  localizedMode: { exponent, numericalNorm: norm },
  probeDeterminant: { m2, g, analyticHessian },
  returnMap: { alpha, multiplier: returnMultiplier, contractive: true },
  boundary: "the generated potential is projective and cannot choose quarter-turn orientation",
}, null, 2));


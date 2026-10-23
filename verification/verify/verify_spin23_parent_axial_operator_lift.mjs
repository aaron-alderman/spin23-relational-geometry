#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-parent-axial-operator-lift-v1.json", root,
), "utf8"));

function epsilon4(a, b, c, d) {
  const values = [a, b, c, d];
  if (new Set(values).size < 4) return 0;
  let inversions = 0;
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
    if (values[i] > values[j]) inversions++;
  }
  return inversions % 2 ? -1 : 1;
}

const J = [2, -3, 5, 7];
const W = [1, 2, 3, 4];
const T = Array.from({ length: 4 }, (_, a) =>
  Array.from({ length: 4 }, (_, c) =>
    Array.from({ length: 4 }, (_, d) => W.reduce((sum, value, q) =>
      sum + epsilon4(a, c, d, q) * value, 0))));
const S = Array(4).fill(0);
let wedgeCoefficient = 0;
for (let b = 0; b < 4; b++) for (let a = 0; a < 4; a++) {
  for (let c = 0; c < 4; c++) for (let d = 0; d < 4; d++) {
    S[b] += epsilon4(a, c, d, b) * T[a][c][d];
    wedgeCoefficient += 0.5 * J[b] * T[a][c][d] * epsilon4(b, a, c, d);
  }
}
const axialContraction = J.reduce((sum, value, b) => sum + value * S[b], 0);

assert.equal(evidence.formDegree, 4);
assert.notEqual(axialContraction, 0);
assert.ok(Math.abs(wedgeCoefficient + 0.5 * axialContraction) < 1e-12);
assert.match(evidence.parentInvariant, /J_\(5,A\) E\^A/);
assert.match(evidence.coefficientStatus, /independent dimensionless/);
assert.match(evidence.verdict, /does not forbid/);

console.log("Spin(2,3) parent axial-operator lift: PASS");
console.log("  covariant four-form: (J5_A E^A) wedge (E_B wedge T^B)");
console.log("  physical-gauge reduction: proportional to S_a J5^a vol");
console.log("  consequence: parent covariance does not protect kappa = 0");

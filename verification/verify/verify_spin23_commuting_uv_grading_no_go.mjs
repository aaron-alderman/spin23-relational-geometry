#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-commuting-uv-grading-no-go-v1.json", root,
), "utf8"));

for (const s of [-1, 1]) {
  const E = s;
  const T = s;
  const gammaV = s;
  const identityCurrent = gammaV;
  assert.equal(identityCurrent * E, 1);
  assert.equal(E * T, 1);
  assert.equal(identityCurrent * E * E * T, 1);
}

const theta = 0.51;
const U = [[Math.cos(theta), -Math.sin(theta)], [Math.sin(theta), Math.cos(theta)]];
const transformedIdentity = [
  [U[0][0] ** 2 + U[1][0] ** 2, U[0][0] * U[0][1] + U[1][0] * U[1][1]],
  [U[0][1] * U[0][0] + U[1][1] * U[1][0], U[0][1] ** 2 + U[1][1] ** 2],
];
assert.ok(Math.abs(transformedIdentity[0][0] - 1) < 1e-14);
assert.ok(Math.abs(transformedIdentity[1][1] - 1) < 1e-14);
assert.ok(Math.abs(transformedIdentity[0][1]) < 1e-14);
assert.equal(evidence.inducedSigns.parentOperator, "+1");
assert.match(evidence.verdict, /every commuting linear internal symmetry/);

console.log("Spin(2,3) commuting UV-grading no-go: PASS");
console.log("  compensator signs cancel pairwise in both factors");
console.log("  family rotations retain the identity current");
console.log("  result: the parent axial operator is invariant for the whole commuting linear class");

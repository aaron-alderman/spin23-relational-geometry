#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-nucleon-axial-flavor-map-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-11) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};
const [p, n] = [evidence.map.protonRow, evidence.map.neutronRow];
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const u = p[0], d = p[1], s = p[2];

assert.deepEqual(n, [d, u, s]);
assert.equal(evidence.map.rank, 2);
close(u - d, 1.286);
close(u + d, 0.438);
close(2 * s, -0.0916);

const singularIsovector = Math.abs(u - d);
const singularIsoscalar = Math.sqrt((u + d) ** 2 + 2 * s ** 2);
close(evidence.map.nonzeroSingularValues[0], singularIsovector);
close(evidence.map.nonzeroSingularValues[1], singularIsoscalar);
close(evidence.map.nonzeroConditionNumber, singularIsovector / singularIsoscalar);

const kernel = evidence.map.nullDirectionRelative;
close(kernel[0], 1);
close(kernel[1], 1);
close(kernel[2], -(u + d) / s);
close(dot(p, kernel), 0, 1e-8);
close(dot(n, kernel), 0, 1e-8);
close(800194.9055700476 / 8, 100024.36319625594);
assert.match(evidence.experimentalInterface.logicalLimit, /cannot determine all three/);

console.log("Spin(2,3) nucleon axial flavor map: PASS");
console.log(`  rank: ${evidence.map.rank}; kernel: (1, 1, ${kernel[2].toFixed(6)})`);
console.log(`  isovector map: c_p-c_n=${(u-d).toFixed(3)}(c_u-c_d)`);
console.log(`  isoscalar map: c_p+c_n=${(u+d).toFixed(3)}(c_u+c_d)${(2*s).toFixed(4)}c_s`);
console.log("  three light-quark coefficients are not identifiable from p,n channels alone");

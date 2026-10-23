#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-two-isotope-nucleon-tomography-v1.json",
  import.meta.url,
), "utf8"));
const close = (actual, expected, rel = 1e-10) => {
  const scale = Math.max(Number.MIN_VALUE, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= rel * scale, `${actual} != ${expected}`);
};
const [[n1, p1], [n2, p2]] = evidence.nucleonResponse.matrix;
const determinant = n1 * p2 - p1 * n2;
const aa = n1 ** 2 + p1 ** 2;
const bb = n1 * n2 + p1 * p2;
const dd = n2 ** 2 + p2 ** 2;
const trace = aa + dd;
const discriminant = Math.sqrt((aa - dd) ** 2 + 4 * bb ** 2);
const singularValues = [
  Math.sqrt((trace + discriminant) / 2),
  Math.sqrt((trace - discriminant) / 2),
];
const rowAngle = Math.acos(bb / Math.sqrt(aa * dd)) * 180 / Math.PI;

close(p1 / n1, evidence.nucleonResponse.protonToNeutronRatios[0]);
close(p2 / n2, evidence.nucleonResponse.protonToNeutronRatios[1]);
close(determinant, evidence.nucleonResponse.determinant);
singularValues.forEach((value, index) => close(value, evidence.nucleonResponse.singularValues[index]));
close(singularValues[0] / singularValues[1], evidence.nucleonResponse.conditionNumber);
close(rowAngle, evidence.nucleonResponse.rowAngle_degrees);
assert.equal(evidence.nucleonResponse.rank, 2);

const protonRow = [0.862, -0.424, -0.0458];
const neutronRow = [-0.424, 0.862, -0.0458];
const quarkRow = (n, p) => neutronRow.map((value, i) => n * value + p * protonRow[i]);
quarkRow(n1, p1).forEach((value, i) => close(value, evidence.quarkResponse.ne21Row[i]));
quarkRow(n2, p2).forEach((value, i) => close(value, evidence.quarkResponse.xe129Row[i]));
const kernel = evidence.quarkResponse.remainingKernelRelative;
for (const row of [evidence.quarkResponse.ne21Row, evidence.quarkResponse.xe129Row]) {
  assert.ok(Math.abs(row.reduce((sum, value, i) => sum + value * kernel[i], 0)) < 1e-12);
}
assert.match(evidence.experimentalBoundary.missing, /likelihood|response table/);

console.log("Spin(2,3) two-isotope nucleon tomography: PASS");
console.log(`  nucleon response rank: 2; determinant: ${determinant.toFixed(5)}`);
console.log(`  row separation: ${rowAngle.toFixed(3)} degrees`);
console.log(`  condition number: ${evidence.nucleonResponse.conditionNumber.toFixed(2)}`);
console.log("  quark response rank remains 2 with one exact flavor kernel");

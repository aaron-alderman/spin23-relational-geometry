#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(await readFile(new URL(
  "evidence/data/spin23-nieh-yan-axial-selector-no-go-v1.json", root,
), "utf8"));

assert.match(evidence.identity, /^NY = d\(/);
assert.equal(evidence.closedSmoothManifold.integral, 0);
assert.equal(evidence.closedSmoothManifold.reason, "Stokes theorem");
assert.equal(evidence.bulkWilsonCoefficientDimension, 0);
assert.equal(evidence.niehYanAnomalyCoefficientDimension, 2);
assert.notEqual(evidence.bulkWilsonCoefficientDimension, evidence.niehYanAnomalyCoefficientDimension);
assert.equal(evidence.currentRedefinition.cIsContinuous, true);
assert.equal(evidence.selectorTests.length, 4);
assert.ok(evidence.selectorTests.every((test) => test.passes === false));

console.log("Spin(2,3) Nieh-Yan axial selector no-go: PASS");
console.log("  closed smooth integral: zero; boundary value: boundary datum");
console.log("  dimensionful, counterterm-shiftable anomaly coefficient cannot select dimensionless eta");

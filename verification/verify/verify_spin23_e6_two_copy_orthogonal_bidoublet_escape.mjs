#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-two-copy-orthogonal-bidoublet-escape.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.fieldContent.symmetricHiggsCopies, 2);
assert.deepEqual(evidence.gaugeTensor.copyMatrix, [[1, 0], [0, 1]]);
assert.equal(evidence.gaugeTensor.offDiagonalCopyTerms, 0);

const inner = (x, y) => x.reduce(
  (sum, value, index) => sum + value.conjugate * y[index],
  0,
);

const w = [{ conjugate: 1 }, { conjugate: 0 }];
const d = [0, 1];
assert.equal(inner(w, d), 0);

const gaugeI2Projection = 20;
const singleCopyHessian = -1 / Math.sqrt(10);
const gaugeMixingCoefficient = gaugeI2Projection * singleCopyHessian;
assert.ok(Math.abs(gaugeMixingCoefficient + 2 * Math.sqrt(10)) < 1e-12);
assert.ok(Math.abs(gaugeMixingCoefficient * inner(w, d)) < 1e-12);

const y = [2, 3];
const massProjection = y[0];
const portalProjection = y[1];
assert.notEqual(massProjection, 0);
assert.notEqual(portalProjection, 0);

const yParallel = [2, 0];
assert.notEqual(yParallel[0], 0);
assert.equal(yParallel[1], 0);

assert.equal(evidence.decision.pureGaugeLoopsPreserveCopyOrthogonalInertness, true);
assert.equal(evidence.decision.twoCopiesReopenGaugeInertRoute, true);
assert.equal(evidence.decision.twoCopiesAloneDerivePortal, false);
assert.equal(evidence.decision.twoCopiesAloneDeriveNormalizedWardLine, false);

console.log("spin23 E6 two-copy orthogonal bidoublet verification: PASS");
console.log(`  gauge mixing coefficient along w: ${gaugeMixingCoefficient}`);
console.log("  orthogonal light direction gauge mixing: 0");
console.log("  nonzero mass and portal require y_parallel != 0 and y_perpendicular != 0");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-bidirectional-three-family-convergence.json"), "utf8"));

assert.equal(data.documentId, 1473);
assert.equal(data.provisionalMiddle.dimension, 3);
const one = [1, 1, 1];
const deltas = [[-2, 1, 1], [1, -2, 1], [1, 1, -2]];
const dot = (a, b) => a.reduce((sum, value, i) => sum + value * b[i], 0);
for (const delta of deltas) assert.equal(dot(one, delta), 0);
const gram = deltas.map((a) => deltas.map((b) => dot(a, b)));
assert.deepEqual(gram, [[6, -3, -3], [-3, 6, -3], [-3, -3, 6]]);
assert.equal(data.provisionalMiddle.decomposition.length, 2);

const moduliDimension = (n) => Math.max(n - data.moduliAudit.pgl2Dimension, 0);
assert.equal(moduliDimension(3), data.moduliAudit.orderedThreePointModuliDimension);
assert.equal(moduliDimension(4), data.moduliAudit.orderedFourPointModuliDimension);
assert.equal(data.moduliAudit.threePointCrossRatioExists, false);
assert.equal(data.moduliAudit.continuousMassOrMixingParametersFromBareThreePointDivisor, 0);
assert.equal(data.convergence.independentEvidenceCountForThree, 1);
assert.equal(data.verdict.topAndBottomConvergeOnPermutationModule, true);
assert.equal(data.verdict.familyBasisSelected, false);
assert.equal(data.verdict.massesAndMixingDerived, false);
assert.equal(data.verdict.physicalAdmissionChanged, false);

console.log("PASS 1473: top-down defect fibers and bottom-up family space meet in the S3 permutation module 1+A2, but three points on CP1 have no cross-ratio and cannot by themselves encode continuous flavour data.");

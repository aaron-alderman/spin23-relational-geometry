import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const data = JSON.parse(readFileSync(path.join(root, "evidence/data/spin23-decorated-defect-triangle-flavour-count.json"), "utf8"));

assert.equal(data.documentId, 1474);
const shape = data.metricShape.rawRealDimension - data.metricShape.genericOrbitDimension;
assert.equal(shape, data.metricShape.genericShapeDimension);
assert.equal(shape, data.countMatch.geometricShapeParameters);

const cycleRank = data.connection.edges - data.connection.vertices + data.connection.connectedComponents;
assert.equal(cycleRank, data.connection.cycleRank);
assert.equal(cycleRank, data.countMatch.loopPhaseParameters);

const total = shape + cycleRank;
assert.equal(total, data.countMatch.total);
assert.equal(total, data.mixingTarget.totalCKMLikeParameters);
assert.equal(data.countMatch.matchesCKMLikeCount, true);
assert.equal(data.countMatch.numericalMapDerived, false);
assert.deepEqual(data.explicitNondegenerateSection.blochPairwiseDotProducts, [0, 0, 0]);
assert.equal(data.boundaries.mixingAnglesDerived, false);
assert.equal(data.boundaries.cpPhaseDerived, false);
assert.equal(data.boundaries.majoranaSectorDerived, false);
assert.equal(data.boundaries.physicalAdmissionChanged, false);

console.log("PASS 1474: a Fubini-Study three-defect triangle has three generic shape invariants and one U(1) cycle phase, matching the 3+1 CKM-like parameter count without deriving their values.");

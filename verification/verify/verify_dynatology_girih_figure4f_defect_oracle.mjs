import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const record = JSON.parse(fs.readFileSync(path.join(root, "corpus/programmes/dynatology/girih_figure4f_defect_oracle_v1.json"), "utf8"));

assert.equal(record.schema, "dynatology-girih-figure4f-defect-oracle/1");
assert.equal(record.status, "exact_source_annotation_oracle_independent_detector_pending");
const before = record.registeredSupports.beforePurpleBBox;
const after = record.registeredSupports.afterPurpleBBox;
const dxMin = after[0] - before[0];
const dxMax = after[2] - before[2];
const dx = record.registeredSupports.horizontalTranslation;
const tolerance = record.registeredSupports.translationRoundingTolerance;
assert.ok(Math.abs(dxMin - dx) <= tolerance + 1e-12);
assert.ok(Math.abs(dxMax - dx) <= tolerance + 1e-12);
assert.equal(before[1], after[1]);
assert.equal(before[3], after[3]);
assert.ok(Math.abs((before[2] - before[0]) - (after[2] - after[0])) <= 2 * tolerance + 1e-12);

const annotation = record.sourceAnnotation;
assert.equal(annotation.yellowFilledPathComponentsBefore, 2);
assert.equal(annotation.yellowFilledPathComponentsAfter, 0);
assert.deepEqual(annotation.closedDotSubpathsPerComponent, [6, 6]);
assert.equal(annotation.closedDotSubpathsPerComponent.reduce((a, b) => a + b, 0), annotation.displayDots);
assert.equal(annotation.violatedSeams, 2);
assert.equal(annotation.connectedPointDefects, 1);
assert.equal(annotation.yellowBBoxes.length, 2);

assert.deepEqual(record.repair.tileCountDelta, {decagon: 0, hexagon: 0, bowtie: 0});
assert.equal(record.repair.beforeDefects, 1);
assert.equal(record.repair.afterDefects, 0);
assert.equal(record.blindDetectorProtocol.expectedBeforeViolatedSeams, 2);
assert.equal(record.blindDetectorProtocol.expectedBeforeConnectedDefects, 1);
assert.equal(record.blindDetectorProtocol.expectedAfterViolatedSeams, 0);
assert.ok(record.blindDetectorProtocol.withheldInputs.includes("yellow_annotation"));
assert.match(record.stopRule, /do_not_expand_to_the_3700_tile_panel/);

console.log("Dynatology girih Figure 4F defect oracle: PASS");
console.log(JSON.stringify({registrationDx: dx, displayDots: annotation.displayDots, violatedSeams: annotation.violatedSeams, connectedDefectsBefore: annotation.connectedPointDefects, connectedDefectsAfter: record.repair.afterDefects, countDelta: record.repair.tileCountDelta}));


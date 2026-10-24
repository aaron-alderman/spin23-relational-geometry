import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";

const root = process.cwd();
const file = path.join(root, "corpus/programmes/dynatology/topkapi_108_radial_scaffold_v0.json");
const data = JSON.parse(fs.readFileSync(file, "utf8"));

assert.equal(data.schema, "dynatology-topkapi-108-radial-scaffold/0");
assert.ok(fs.existsSync(path.join(root, data.sourceObservationRef)));
assert.equal(data.detectedPeaks.length, 13);
assert.equal(data.detectedPeaks.filter((peak) => peak.role === "principal_internal_ray").length, 11);
assert.equal(data.detectedPeaks.filter((peak) => peak.role === "quadrant_boundary").length, 2);

const angles = data.detectedPeaks.map((peak) => peak.angleDegrees);
assert.deepEqual(angles, [...angles].sort((a, b) => a - b));
const spacings = angles.slice(1).map((angle, i) => angle - angles[i]);
const mean = spacings.reduce((sum, value) => sum + value, 0) / spacings.length;
const maxResidual = Math.max(...spacings.map((value) => Math.abs(value - 7.5)));

assert.ok(Math.abs(mean - data.derived.observedMeanSpacingDegrees) < 1e-12);
assert.ok(Math.abs(mean - data.derived.idealQuarterSpacingDegrees) < 0.1);
assert.ok(Math.abs(maxResidual - data.derived.maximumAbsoluteSpacingResidualDegrees) < 1e-12);
assert.ok(maxResidual <= 0.5);
assert.equal(data.derived.quarterSectorCount, 12);
assert.equal(data.derived.mirroredHalfVaultSectorCount, 24);
assert.equal(data.derived.generatorAngleRadians, "pi/24");
assert.match(data.interpretation.boundary, /not evidence of octonion multiplication/i);

console.log("Dynatology Topkapi 108 radial scaffold: PASS");
console.log(JSON.stringify({internalRays: 11, sectors: 12, meanSpacingDegrees: mean, maxResidualDegrees: maxResidual}));


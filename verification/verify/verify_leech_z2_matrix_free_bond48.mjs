import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(here, "../..");
const record = JSON.parse(fs.readFileSync(path.join(root,
  "evidence/data/leech-z2-matrix-free-bond48-v1.json"), "utf8"));
assert.equal(record.schemaVersion, "leech-z2-matrix-free-bond48-v1");
const points = record.stabilizedBondLadder;
assert.deepEqual(points.map(x => x.bond), [24,32,40,48]);
for (const point of points) assert.ok(Math.abs(point.oddEnergy-point.evenEnergy-point.gap)<1e-14);
for (let i=1;i<points.length;i+=1) {
  assert.ok(points[i].evenEnergy<points[i-1].evenEnergy);
  assert.ok(points[i].oddEnergy<points[i-1].oddEnergy);
  assert.ok(Math.abs(points[i].gap-points[i-1].gap-record.gapCorrections[i-1])<1e-14);
}
assert.ok(record.absoluteCorrectionRatios[0]>0.5 && record.absoluteCorrectionRatios[0]<0.505);
assert.ok(record.absoluteCorrectionRatios[1]>0.48 && record.absoluteCorrectionRatios[1]<0.481);
assert.ok(points[3].finalFixedBondRelativeGapShift<4.1e-6);
assert.ok(record.latestRelativeBondCorrection<2.33e-4);
assert.equal(record.scaling.effectiveMatrixMaterialized,false);
assert.ok(record.scaling.maximumSectorDimension>=28840);
assert.ok(record.quarantinedHeuristic.admissibility.includes("not a lower bound"));
assert.ok(record.boundary.includes("no lower enclosure"));
console.log(JSON.stringify({status:"PASS",bonds:points.map(x=>x.bond),gaps:points.map(x=>x.gap),
  correctionRatios:record.absoluteCorrectionRatios,bond48SweepDrift:points[3].finalFixedBondGapShift,
  maximumSectorDimension:record.scaling.maximumSectorDimension,aitkenPromoted:false,gapCertified:false,
  epistemicStatus:record.epistemicStatus}));

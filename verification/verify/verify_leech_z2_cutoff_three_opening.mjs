import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
const here=path.dirname(fileURLToPath(import.meta.url));
const root=path.join(here,"../..");
const record=JSON.parse(fs.readFileSync(path.join(root,"evidence/data/leech-z2-cutoff-three-opening-v1.json"),"utf8"));
assert.equal(record.schemaVersion,"leech-z2-cutoff-three-opening-v1");
assert.equal(record.configuration.cutoff,3);
for(const point of record.bond24Trajectory) assert.ok(Math.abs(point.oddEnergy-point.evenEnergy-point.gap)<1e-14);
for(let i=1;i<record.bond24Trajectory.length;i+=1){
  assert.ok(record.bond24Trajectory[i].evenEnergy<record.bond24Trajectory[i-1].evenEnergy);
  assert.ok(record.bond24Trajectory[i].oddEnergy<record.bond24Trajectory[i-1].oddEnergy);
}
assert.ok(record.bond24Trajectory[1].gapShift>0);
assert.ok(record.bond24Trajectory[2].gapShift<0);
assert.ok(record.bond16To24Final.evenEnergyShift<0&&record.bond16To24Final.oddEnergyShift<0);
assert.ok(record.bond16To24Final.relativeGapShift>0.01);
assert.equal(record.scaling.effectiveMatrixMaterialized,false);
assert.ok(record.scaling.maximumSectorDimension>=14130);
assert.ok(record.boundary.includes("convergence failure"));
console.log(JSON.stringify({status:"PASS",cutoff:3,bonds:[16,24],
  bond24Gaps:record.bond24Trajectory.map(x=>x.gap),
  oppositeSignSweepShifts:true,relativeBondCorrection:record.bond16To24Final.relativeGapShift,
  gapAdmittedAsPrediction:false,epistemicStatus:record.epistemicStatus}));

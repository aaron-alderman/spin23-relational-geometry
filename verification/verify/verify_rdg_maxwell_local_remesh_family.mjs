import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-local-remesh-family-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-local-remesh-family-v1");
assert.equal(record.family.exhaustiveWithinRule,true);
assert.deepEqual(record.family.fineCentreChoices,[0,1,2]);
assert.equal(record.result.chainMapCases,3);
assert.equal(record.result.retractCases,3);
assert.equal(record.result.positiveDiagonalMetricCompatibleCases,0);
for(const item of record.family.cases){
  assert.ok(item.chainResiduals.every(value=>value===0));
  assert.ok(item.retractResiduals.every(value=>value===0));
  assert.ok(item.diagonalMetricObstructions.every(Boolean));
}
assert.match(record.boundary.notProved,/general weighted cochain maps/);
assert.match(record.verdict,/family-wide/);

console.log(JSON.stringify({
  status:"PASS",
  family:"all three boundary-fixed centre-to-vertex simplicial collapses",
  gauge:"every case is a chain retract",
  metric:"no case admits a strictly positive diagonal metric making TR self-adjoint",
  boundary:"weighted transports and block-local Hodge matrices remain open",
}));


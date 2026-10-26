import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-two-macroelement-assembly-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-two-macroelement-assembly-v1");
assert.deepEqual(record.topology.coarseBetti,[1,0,0]);
assert.deepEqual(record.topology.fineBetti,[1,0,0]);
for(const key of ["chainResiduals","retractResiduals","metricPullbackResiduals","weightedRestrictionResiduals","projectorSelfAdjointResiduals","restrictionChainResiduals","metricSymmetryResiduals"]){
  assert.ok(record.assembly[key].every(value=>value<1e-12),`${key} must vanish`);
}
assert.equal(record.positivity.verifiedFullRanks,true);
assert.ok(record.assembly.offDiagonalEntries.every(value=>value>0));
assert.ok(record.locality.crossMacroResidual<1e-12);
assert.match(record.verdict,/survives the first overlap test/);

console.log(JSON.stringify({
  status:"PASS",
  mesh:"two coarse triangles sharing an edge, each stellarly refined",
  assembly:"positive sparse local metrics assemble exactly",
  compatibility:"transport, restriction, d and energy adjointness remain compatible",
  locality:"no direct coupling between exclusive cells of different macroelements",
}));


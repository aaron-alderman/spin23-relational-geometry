import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-remeshing-retract-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-remeshing-retract-v1");
assert.deepEqual(record.complexes.coarse.betti,[1,0,0]);
assert.deepEqual(record.complexes.fine.betti,[1,0,0]);
for(const key of ["subdivisionResiduals","collapseResiduals"])assert.ok(record.chainMaps[key].every(value=>value===0));
for(const key of ["transportCommutatorResiduals","restrictionCommutatorResiduals","retractResiduals"])assert.ok(record.cochainMaps[key].every(value=>value===0));
for(const key of ["projectorResiduals","projectorChainResiduals","defectChainResiduals"])assert.ok(record.reconstruction[key].every(value=>value===0));
assert.deepEqual(record.reconstruction.admittedSubcomplex.betti,[1,0,0]);
assert.deepEqual(record.reconstruction.unresolvedSubcomplex.betti,[0,0,0]);
assert.ok(record.reconstruction.unresolvedDimensions.some(value=>value>0));
assert.ok(record.metricBoundary.euclideanIsometryResiduals.some(value=>value>0));
assert.ok(record.metricBoundary.euclideanLeastSquares.retractResiduals.every(value=>value<1e-12));
assert.ok(record.metricBoundary.euclideanLeastSquares.projectorResiduals.every(value=>value<1e-12));
assert.ok(record.metricBoundary.euclideanLeastSquares.orthogonalityResiduals.every(value=>value<1e-12));
assert.ok(record.metricBoundary.euclideanLeastSquares.restrictionChainResiduals.some(value=>value>0));
assert.ok(record.metricBoundary.euclideanLeastSquares.projectorChainResiduals.some(value=>value>0));
assert.match(record.verdict,/cochain retract/);

console.log(JSON.stringify({
  status:"PASS",
  remesh:"stellar subdivision and simplicial collapse are chain maps",
  retract:"restriction after transport is identity on coarse cochains",
  reconstruction:"TR is an idempotent chain projector on fine cochains",
  residual:"I-TR retains acyclic unresolved fine modes",
  boundary:"metric and energy compatibility are not automatic",
}));


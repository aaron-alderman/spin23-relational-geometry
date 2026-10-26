import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-two-cycle-cut-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-two-cycle-cut-v1");
assert.deepEqual(record.carriers.sphere.betti,[1,0,1]);
assert.deepEqual(record.carriers.puncturedDisk.betti,[1,0,0]);
assert.equal(record.closedFlux.d1WithFluxRank-record.closedFlux.d1Rank,1);
assert.ok(record.puncture.exactnessResidual<1e-12);
assert.ok(record.puncture.boundaryCancellationResidual<1e-12);
assert.equal(record.puncture.boundaryCirculation,record.puncture.retainedDiskFlux);
assert.ok(record.puncture.reconstructionIdentityResidual<1e-12);
assert.ok(record.compactPhase.productResidual<1e-12);
assert.match(record.physicalBoundary.sourceFreeMaxwell,/forces total magnetic flux to zero/);
assert.match(record.verdict,/boundary circulation/);

console.log(JSON.stringify({
  status:"PASS",
  topology:"sphere H2=1 becomes punctured-disk H2=0",
  transfer:"bulk flux becomes boundary circulation plus cap flux",
  phase:"closed-surface phase factors into disk-boundary and cap phases",
  boundary:"nonzero sphere flux is not source-free Maxwell without an additional physical qualification",
}));


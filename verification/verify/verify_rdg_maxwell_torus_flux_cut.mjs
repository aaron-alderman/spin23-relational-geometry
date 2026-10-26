import assert from "node:assert/strict";
import fs from "node:fs";

const record=JSON.parse(fs.readFileSync(new URL("../../evidence/data/rdg-maxwell-torus-flux-cut-v1.json",import.meta.url),"utf8"));
assert.equal(record.schemaVersion,"rdg-maxwell-torus-flux-cut-v1");
assert.deepEqual(record.carriers.torus.betti,[1,2,1]);
assert.deepEqual(record.carriers.cylinder.betti,[1,1,0]);
assert.ok(record.cutMap.chainResiduals.every(value=>value===0));
assert.ok(record.cutMap.cochainResiduals.every(value=>value===0));
assert.equal(record.fluxTransfer.torusD1WithFluxRank-record.fluxTransfer.torusD1Rank,1);
assert.ok(record.fluxTransfer.reconstructionResidual<1e-12);
assert.ok(record.fluxTransfer.boundarySplitResidual<1e-12);
assert.ok(record.fluxTransfer.stokesResidual<1e-12);
assert.ok(record.compactPhase.residual<1e-12);
assert.match(record.sourceFreeInterpretation.gauss,/d2 B=0/);
assert.match(record.verdict,/source-free non-bounding H2 flux/);

console.log(JSON.stringify({
  status:"PASS",
  topology:"T2 H2=1 becomes cylinder H2=0",
  source:"nonzero flux is source-free on the non-bounding periodic cycle",
  record:"bulk flux becomes relative boundary Wilson circulation",
  compact:"phase record is preserved",
}));


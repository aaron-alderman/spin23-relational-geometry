import assert from "node:assert/strict";import fs from "node:fs";
const r=JSON.parse(fs.readFileSync(new URL("../../evidence/data/translation-free-e8-two-cell-projected-coupling-v1.json",import.meta.url),"utf8"));
const rel=(a,b)=>Math.abs(b-a)/Math.abs(a);
assert.equal(r.schemaVersion,"translation-free-e8-two-cell-projected-coupling-v1");assert.equal(r.projectedDimension,r.localRoots**2);
for(const point of r.couplingSweep){for(let i=0;i<2;i++){assert.ok(Math.abs(rel(point.gaps[i],point.gaps[i+1])-point.gapDrifts[i])<2e-15);assert.ok(point.gapDrifts[i]<0.01);}assert.ok(point.gaps.at(-1)>0.18);if(point.J>0){for(let i=0;i<2;i++){assert.ok(Math.abs(rel(point.splittings[i],point.splittings[i+1])-point.splittingDrifts[i])<2e-15);assert.ok(point.splittingDrifts[i]<0.01);}assert.ok(point.splittings.at(-1)>0);}}
assert.ok(r.maximumFinalLocalBoundaryProbability<5e-6);assert.ok(r.maximumFinalLocalResidual<1e-10);assert.ok(r.maximumCosineSymmetryError<4e-15);assert.ok(r.maximumSineProxyAntisymmetryError<3e-14);
assert.equal(r.finalJ01LowBranches[1].swap,1);assert.equal(r.finalJ01LowBranches[2].swap,-1);assert.equal(r.finalJ01LowBranches[1].inversion,-1);assert.equal(r.finalJ01LowBranches[2].inversion,-1);
assert.equal(r.projectedTwoCellGapPromoted,true);assert.equal(r.fullTwoCellGapCertified,false);assert.equal(r.localRootCountConverged,false);assert.match(r.boundary,/not a diagonalization of the full two-cell/u);
console.log(JSON.stringify({status:"PASS",maximumJ:r.couplingSweep.at(-1).J,minimumProjectedGap:Math.min(...r.couplingSweep.map(x=>x.gaps.at(-1))),J01CollectiveRelativeSplitting:r.couplingSweep.at(-1).splittings.at(-1),projectedTwoCellGapPromoted:true,fullTwoCellGapCertified:false,widthGapCertified:false},null,2));

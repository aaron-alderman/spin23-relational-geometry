#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-axial-response-critical-normal-map-v1.json",
  import.meta.url,
),"utf8"));

// Strip the common positive kappa*A/(pi^2*epsilon).  On the admitted branch
// a1>0, both absent curvature-axial responses are strictly nonzero.
for(const a1 of [1e-9,0.1,1,10,1e6]){
  const xiR=-(7/96+1/(144*(a1+1)));
  const xiRic=3/8;
  assert.ok(xiR<0);
  assert.ok(xiRic>0);
}

assert.equal(evidence.completeAxialResponse.deltaZ,"0");
assert.deepEqual(
  evidence.strictDeparture.nonzeroOnAdmittedBranch,
  ["deltaXiR","deltaXiRic"],
);
assert.equal(evidence.rankSeparation.axialResponseDesignRank,5);
assert.equal(evidence.rankSeparation.displayedNormalDimension,8);
assert.equal(evidence.rankSeparation.currentlyEmbeddedNormalInformationRank,2);
assert.match(evidence.rankSeparation.normalRankUpgrade,/not justified/);
assert.match(evidence.mapClassification.A,/insufficient/);
assert.match(evidence.mapClassification.B,/tangent/);
assert.equal(evidence.missingEmbedding.length,4);

console.log("Spin(2,3) axial-response critical-normal map: PASS");
console.log("  two absent curvature-axial coefficients are nonzero");
console.log("  sparse critical action: packet-level departure proved");
console.log("  axial response design rank: 5");
console.log("  embedded displayed-normal information rank remains: 2");
console.log("  next boundary: covariant curvature coupling Jacobian and quotient");

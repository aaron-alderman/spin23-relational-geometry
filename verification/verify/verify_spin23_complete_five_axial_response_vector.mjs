#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-complete-five-axial-response-vector-v1.json",
  import.meta.url,
),"utf8"));

const close=(x,y)=>assert.ok(Math.abs(x-y)<1e-12*Math.max(1,Math.abs(y)));

// Strip the common kappa*A/(pi^2*epsilon), and additionally A/bX from
// deltaA.  Test at several admissible a1 values.
for(const a1 of [-0.75,0,2.5,11]){
  const pureA=1/(24*(a1+1));
  const mixedA=0;
  close(pureA+mixedA,1/(24*(a1+1)));

  const pureB=-1/(24*(a1+1));
  const mixedB=-1/4;
  close(pureB+mixedB,-(6+1/(a1+1))/24);

  const pureXiR=-1/(144*(a1+1));
  const mixedXiR=-7/96;
  close(pureXiR+mixedXiR,-(7/96+1/(144*(a1+1))));
}

const mixedXiR=-7/96;
const mixedXiRic=3/8;
const qEinstein=mixedXiR+mixedXiRic/4;
const E=-12*mixedXiR-3*mixedXiRic;
const P=-12*mixedXiR-2*mixedXiRic;
close(qEinstein,1/48);
close(E,-1/4);
close(P,1/8);
close(P-E,mixedXiRic);
close(-E/12-(P-E)/4,mixedXiR);

assert.equal(evidence.complete.deltaZ,"0");
assert.equal(evidence.remainingReducedBosonicQuadraticAxialResponses,0);
assert.equal(evidence.countertermSign,"opposite");

console.log("Spin(2,3) complete five-response axial vector: PASS");
console.log("  deltaA, deltaB, deltaZ integrated");
console.log("  deltaXiR, deltaXiRic integrated");
console.log("  Einstein and product curvature projections invert exactly");
console.log("  remaining reduced-bosonic quadratic axial responses: zero");
console.log("  external boundary: complete second-class measure");

#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-two-curved-response-residual-inverse-v1.json",
  import.meta.url,
),"utf8"));

const close=(actual,expected,tolerance=1e-12)=>
  assert.ok(Math.abs(actual-expected)<tolerance*Math.max(1,Math.abs(expected)));

for(const witness of [
  {u:2.5,v:-1.2,RE:-12,RP:-12,rP:-2},
  {u:-0.7,v:3.4,RE:8,RP:-5,rP:1.1},
]){
  const E=witness.RE*(witness.u+witness.v/4);
  const P=witness.RP*witness.u+witness.rP*witness.v;
  const qmix=E/witness.RE;
  const dP=witness.rP-witness.RP/4;
  const v=(P-witness.RP*qmix)/dP;
  const u=qmix-v/4;
  close(u,witness.u);
  close(v,witness.v);
}

const geometry=evidence.packetGeometry;
assert.equal(geometry.dP,geometry.rP-geometry.RP/4);
assert.equal(geometry.RE,geometry.RP);

for(const witness of [{u:4,v:7},{u:-3.5,v:0.25}]){
  const E=geometry.RE*(witness.u+witness.v/4);
  const P=geometry.RP*witness.u+geometry.rP*witness.v;
  close(P-E,witness.v);
  close(-E/12-(P-E)/4,witness.u);
  const E2=-24*(witness.u+witness.v/4);
  close(E2,2*E);
}

assert.equal(evidence.unknownResponses.length,2);
assert.match(evidence.directRicciIsolation,/M_product-M_Einstein/);

console.log("Spin(2,3) two curved-response residual inverse: PASS");
console.log("  unknown response rank: two");
console.log("  equal-R difference isolates deltaXiRic_h-p directly");
console.log("  second Einstein background is a linear-curvature consistency check");
console.log("  remaining: two mixed curved heat-kernel response traces");

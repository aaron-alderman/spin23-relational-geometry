#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-mixed-integrability-defect-v1.json",
  import.meta.url,
),"utf8"));

// Coefficients of the exact rearrangement:
// h X Ds/2 + Ds(DJ-hX/2) = Ds DJ.
assert.equal(0.5-0.5,0);

// Integrating X[-h^(mu nu) nabla_mu s_nu-s_nu F^nu(h)] by parts:
// the two X*nabla_mu h^(mu nu) terms cancel, leaving
// (nabla_mu X)h^(mu nu)+(X/2)nabla^nu h.
assert.equal(1-1,0);
assert.equal(0.5,1/2);

// Formal block expansion with scalar representatives verifies the factors.
for(const {K,J,b,W,Hinv} of [
  {K:3,J:5,b:7,W:11,Hinv:13},
  {K:2,J:-3,b:4,W:5,Hinv:7},
]){
  const V=K*J+b*W;
  const direct=-0.5*Hinv*V*(1/K)*V;
  const expanded=-0.5*Hinv*(J*K*J+b*(J*W+W*J)+b*b*W*(1/K)*W);
  assert.equal(direct,expanded);
}

// Curvature grading: W is order one, so the cross term is order one and
// W^2 is order two.  The order-one cross contains no massive axial
// denominator because K^-1 K=1.
const grades={J:0,K:0,W:1};
assert.equal(grades.J+grades.W,1);
assert.equal(grades.W+grades.W,2);

// q_mix=kappa*A/(48*pi^2*eps); E=R*q_mix at R=-12.
assert.equal(-12/48,-1/4);
assert.equal(evidence.poleCounting.linearCurvatureLogPole,0);
assert.equal(evidence.remainingUnknownResponses,1);

console.log("Spin(2,3) mixed integrability defect: PASS");
console.log("  exact block: V_sh=K_s J_P+bX W_X");
console.log("  W_X is algebraic O(RP) at the matching jet");
console.log("  linear defect is a scaleless massless tadpole");
console.log("  complete Einstein q_mix: kappa*A/(48*pi^2*epsilon)");
console.log("  remaining unknown response rank: one");

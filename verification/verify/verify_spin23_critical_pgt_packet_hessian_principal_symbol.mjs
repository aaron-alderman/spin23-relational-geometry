#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-packet-hessian-principal-symbol-v1.json",
  import.meta.url,
), "utf8"));

const sectors = Object.values(evidence.bosonicFields);
assert.equal(sectors.reduce((n, x) => n+x.components, 0), evidence.bosonicTotals.components);
assert.equal(sectors.reduce((n, x) => n+x.secondOrder, 0), evidence.bosonicTotals.secondOrderRank);
assert.equal(
  evidence.bosonicFields.axialConnection.algebraic
  + evidence.bosonicFields.traceConnection.algebraic
  + evidence.bosonicFields.tensorConnection.algebraic,
  evidence.bosonicTotals.algebraicConnectionDirections,
);
assert.equal(evidence.bosonicTotals.components, 34);
assert.equal(evidence.bosonicTotals.secondOrderRank, 11);
assert.equal(evidence.bosonicTotals.algebraicConnectionDirections, 23);

const determinant = (input) => {
  const a = input.map((row) => row.slice());
  let det = 1;
  for (let c = 0; c < a.length; c += 1) {
    let p = c;
    for (let i = c+1; i < a.length; i += 1) if (Math.abs(a[i][c]) > Math.abs(a[p][c])) p = i;
    assert.ok(Math.abs(a[p][c]) > 1e-12);
    if (p !== c) { [a[p],a[c]]=[a[c],a[p]]; det *= -1; }
    const pivot = a[c][c];
    det *= pivot;
    for (let i = c+1; i < a.length; i += 1) {
      const f = a[i][c]/pivot;
      for (let j = c+1; j < a.length; j += 1) a[i][j] -= f*a[c][j];
    }
  }
  return det;
};

for (const { A, B, p } of [
  { A: 2, B: 3, p: [1,2,0,0] },
  { A: 5, B: 0.25, p: [1,-1,2,3] },
  { A: 1, B: 1, p: [0,0,0,4] },
]) {
  const p2 = p.reduce((s,x) => s+x*x,0);
  const K = Array.from({length:4}, (_,i) => Array.from({length:4}, (_,j) =>
    (i===j ? A : 0)+B*p[i]*p[j]));
  const expected = A**3*(A+B*p2);
  assert.ok(Math.abs(determinant(K)-expected) < 1e-9*Math.max(1,expected));
  assert.ok(A > 0 && A+B*p2 > 0);
}

assert.equal(evidence.axialKernel.transverseMultiplicity, 3);
assert.equal(evidence.axialKernel.physicalPoles, 1);
assert.equal(evidence.ghostFields.diffeomorphism.order, 2);
assert.equal(evidence.ghostFields.lorentz.order, 0);
assert.equal(evidence.ghostFields.brokenSpin23.order, 0);
assert.match(evidence.reductionRule.forbidden, /unreduced 34-component mixed-order Hessian/);

console.log("Spin(2,3) packet Hessian principal symbol: PASS");
console.log("  bosonic second-order rank: 11/34");
console.log("  algebraic connection directions: 23/24");
console.log("  axial determinant: A^3 (A+B p^2)");
console.log("  reduced propagating connection poles: one positive 0-minus pole");
console.log("  next gate: curved measure-preserving Schur complement");

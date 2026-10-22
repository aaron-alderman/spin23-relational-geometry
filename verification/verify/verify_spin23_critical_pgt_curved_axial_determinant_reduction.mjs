#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-curved-axial-determinant-reduction-v1.json",
  import.meta.url,
), "utf8"));

const determinant = (input, tolerance = 1e-12) => {
  const a = input.map((row) => row.slice());
  let det = 1;
  for (let c = 0; c < a.length; c += 1) {
    let p = c;
    for (let i = c+1; i < a.length; i += 1) if (Math.abs(a[i][c]) > Math.abs(a[p][c])) p = i;
    if (Math.abs(a[p][c]) <= tolerance) return 0;
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
const transpose = (m) => m[0].map((_,j) => m.map((row) => row[j]));
const multiply = (a,b) => a.map((row) => b[0].map((_,j) => row.reduce((s,x,k) => s+x*b[k][j],0)));
const identity = (n) => Array.from({length:n}, (_,i) => Array.from({length:n}, (_,j) => i===j ? 1 : 0));
const addScaled = (I,m,x) => I.map((row,i) => row.map((v,j) => v+x*m[i][j]));

for (const D of [
  [[1,0,2],[0,1,-1]],
  [[1,2,0,1],[0,1,1,0],[2,0,1,-1]],
  [[1,0,0,1,2],[0,1,1,0,-1]],
]) {
  const Dt = transpose(D);
  const DDt = multiply(D,Dt);
  const DtD = multiply(Dt,D);
  for (const ratio of [0.25, 1, 3]) {
    const lhs = determinant(addScaled(identity(DtD.length),DtD,ratio));
    const rhs = determinant(addScaled(identity(DDt.length),DDt,ratio));
    assert.ok(Math.abs(lhs-rhs) < 1e-9*Math.max(1,Math.abs(lhs),Math.abs(rhs)));
  }
}

assert.equal(evidence.contorsionShift.coordinateDeterminant, 1);
assert.equal(evidence.physicalOperator.multiplicity, 1);
assert.equal(evidence.derivativeFactorization.length, 2);
assert.ok(evidence.notIncluded.some((x) => /34-constraint/.test(x)));
assert.match(evidence.determinantIdentity, /A\^\(N1-N0\)/);

console.log("Spin(2,3) curved axial determinant reduction: PASS");
console.log("  contorsion-shift coordinate Jacobian: 1");
console.log("  Sylvester determinant identity: verified on rectangular maps");
console.log("  propagating torsion determinant: one minimal scalar, m^2=A/B");
console.log("  remaining loop obstruction: complete second-class measure");

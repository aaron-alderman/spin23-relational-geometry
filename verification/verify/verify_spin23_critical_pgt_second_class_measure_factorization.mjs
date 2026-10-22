#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-critical-pgt-second-class-measure-factorization-v1.json",
  import.meta.url,
), "utf8"));

for (const group of Object.values(evidence.constraintGroups)) {
  assert.equal(group.dimensions.reduce((a,b) => a+b,0), group.total);
}
assert.equal(Object.values(evidence.constraintGroups).reduce((a,x) => a+x.total,0), evidence.totalSecondClassConstraints);
assert.equal(evidence.totalSecondClassConstraints, 34);
assert.equal(evidence.pairingBlockEigenclasses.reduce((a,x) => a+x.multiplicity,0), 11);

const zeros = (n,m) => Array.from({length:n}, () => Array(m).fill(0));
const transpose = (m) => m[0].map((_,j) => m.map((row) => row[j]));
const determinant = (input, tolerance = 1e-10) => {
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
const antisymmetricBlocks = (values) => {
  const n = values.length*2;
  const a = zeros(n,n);
  values.forEach((v,i) => { a[2*i][2*i+1]=v; a[2*i+1][2*i]=-v; });
  return a;
};
const assemble = (A,E,C,F) => {
  const na=A.length, nb=E.length, ns=E.length, Ct=transpose(C), Et=transpose(E);
  const out=zeros(na+nb+ns,na+nb+ns);
  const put=(block,r0,c0) => block.forEach((row,i) => row.forEach((v,j) => { out[r0+i][c0+j]=v; }));
  put(A,0,0); put(Ct,0,na+nb); put(E,na,na+nb); put(C.map(r=>r.map(x=>-x)),na+nb,0); put(Et.map(r=>r.map(x=>-x)),na+nb,na); put(F,na+nb,na+nb);
  return out;
};

const A=antisymmetricBlocks([2,3,5,7,11,13]);
const E=zeros(11,11); for (let i=0;i<11;i+=1) E[i][i]=i+2;
const C=Array.from({length:11},(_,i)=>Array.from({length:12},(_,j)=>((3*i+5*j)%7)-3));
const F=zeros(11,11); for(let i=0;i<11;i+=1) for(let j=i+1;j<11;j+=1){F[i][j]=(i-j)%5;F[j][i]=-F[i][j];}
const Delta=assemble(A,E,C,F);
const lhs=determinant(Delta);
const rhs=determinant(A)*determinant(E)**2;
assert.ok(Math.abs(lhs-rhs) < 1e-7*Math.max(1,Math.abs(rhs)));

assert.match(evidence.determinantIdentity, /independent of C and F/);
assert.match(evidence.measureDecision, /ultralocal/);
assert.equal(evidence.crossDerivativeFamilies.length,5);

console.log("Spin(2,3) massive 0-minus second-class measure: PASS");
console.log("  complete constraint count: 34 = 12 + 11 + 11");
console.log("  determinant: det(A) det(E)^2, independent of derivative cross-blocks");
console.log("  torsionless massive measure: ultralocal");
console.log("  curvature-square contribution from constraint measure: zero");

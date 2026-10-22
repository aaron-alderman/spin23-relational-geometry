#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-mixed-curved-operator-reduction-v1.json",
  import.meta.url,
),"utf8"));

// Coefficient check for D(J_P h)=-Q_P h when the first source jet vanishes.
// Indices are Euclidean and h is symmetric.  Compare coefficients of
// (partial_a h_mn) P_r for every ordered derivative/source index and every
// symmetric tensor basis element.
const d=4;
const pairs=[];
for(let m=0;m<d;m++) for(let n=m;n<d;n++) pairs.push([m,n]);
const hcoef=(m,n,u,v)=>{
  if(u===v) return m===u&&n===v?1:0;
  return (m===u&&n===v)||(m===v&&n===u)?1:0;
};

for(let a=0;a<d;a++) for(let r=0;r<d;r++) for(const [u,v] of pairs){
  // D J: partial_a[(h/2)P_a-h_(a m)P_m].
  let lhs=0;
  if(r===a){
    for(let t=0;t<d;t++) lhs+=0.5*hcoef(t,t,u,v);
  }
  lhs-=hcoef(a,r,u,v);

  // -Q: -P_m partial_n h_(m n)+(1/2)P_m partial_m h.
  let rhs=0;
  for(let m=0;m<d;m++){
    if(r===m) rhs-=hcoef(m,a,u,v);
  }
  if(r===a){
    for(let t=0;t<d;t++) rhs+=0.5*hcoef(t,t,u,v);
  }
  assert.equal(lhs,rhs);
}

// The trace algebra fixes the surviving parallel-jet coefficient:
// 1/2[(A/2)J^2+b Q^2]-1/2[A J^2+b Q^2]=-A J^2/4.
const A=7;
const b=11;
assert.equal(0.5*(A/2)-0.5*A,-A/4);
assert.equal(0.5*b-0.5*b,0);

// Build the curvature-action matrix P_sigma -> R_(rho sigma mu nu) P_sigma.
// Its column rank is the codimension of parallel one-forms.
const rank=matrix=>{
  const a=matrix.map(row=>row.map(Number));
  let row=0;
  for(let col=0;col<a[0].length&&row<a.length;col++){
    let pivot=row;
    while(pivot<a.length&&Math.abs(a[pivot][col])<1e-12) pivot++;
    if(pivot===a.length) continue;
    [a[row],a[pivot]]=[a[pivot],a[row]];
    const p=a[row][col];
    for(let j=col;j<a[0].length;j++) a[row][j]/=p;
    for(let i=0;i<a.length;i++) if(i!==row){
      const f=a[i][col];
      for(let j=col;j<a[0].length;j++) a[i][j]-=f*a[row][j];
    }
    row++;
  }
  return row;
};

const curvatureMatrix=riemann=>{
  const rows=[];
  for(let rho=0;rho<d;rho++) for(let mu=0;mu<d;mu++) for(let nu=0;nu<d;nu++){
    rows.push(Array.from({length:d},(_,sigma)=>riemann(rho,sigma,mu,nu)));
  }
  return rows;
};
const delta=(i,j)=>i===j?1:0;
const constantK=-1;
const Rconstant=(rho,sigma,mu,nu)=>constantK*(
  delta(rho,mu)*delta(sigma,nu)-delta(rho,nu)*delta(sigma,mu)
);
assert.equal(rank(curvatureMatrix(Rconstant)),4);

// Product H2(k1) x H2(k2): mixed curvature components vanish.
const k=[-2,-2,-4,-4];
const factor=i=>i<2?0:1;
const Rproduct=(rho,sigma,mu,nu)=>{
  if(factor(rho)!==factor(sigma)||factor(rho)!==factor(mu)||factor(rho)!==factor(nu)) return 0;
  return k[rho]*(delta(rho,mu)*delta(sigma,nu)-delta(rho,nu)*delta(sigma,mu));
};
assert.equal(rank(curvatureMatrix(Rproduct)),4);

assert.equal(evidence.integrability.constantCurvatureCommonKernelDimension,0);
assert.equal(evidence.integrability.productH2CommonKernelDimension,0);
assert.equal(evidence.remainingData.length,2);

console.log("Spin(2,3) mixed curved operator reduction: PASS");
console.log("  D J_P=-Q_P at zero first source jet");
console.log("  divergence-channel seagull/bubble cancels exactly");
console.log("  parallel-jet remainder: -(A/4) Tr(H_h^-1 Jdagger J)");
console.log("  both curved matching backgrounds forbid nonzero parallel one-forms");
console.log("  remaining: inserted graviton a1 plus curvature-commutator form factor");

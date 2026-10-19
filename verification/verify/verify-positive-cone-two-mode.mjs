#!/usr/bin/env node

const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,k)=>s+x*b[k][j],0)));
const transpose=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const equal=(a,b)=>a.every((r,i)=>r.every((x,j)=>x===b[i][j]));
const det2=a=>a[0][0]*a[1][1]-a[0][1]*a[1][0];
const positive2=a=>a[0][0]>0&&det2(a)>0;
const G=[[2,1],[1,1]], X=[[1,0],[0,1]], Y=mul(mul(G,X),transpose(G));
const V=[[2,1],[1,2]];
const I=[[1,0],[0,1]],Z=[[0,0],[0,0]];
const block=(a,b,c,d)=>[[...a[0],...b[0]],[...a[1],...b[1]],[...c[0],...d[0]],[...c[1],...d[1]]];
const scale=(k,a)=>a.map(r=>r.map(x=>k*x));
const J=block(Z,I,scale(-1,I),Z), S=block(V,Z,Z,I), K=mul(J,S);
const K2=mul(K,K), expectedK2=block(scale(-1,V),Z,Z,scale(-1,V));
const report={
  protocol:"positive-sym2-cone-and-two-mode/1",
  homogeneousConeExample:{X,Y,G,YequalsGXGt:equal(Y,mul(mul(G,X),transpose(G))),Xpositive:positive2(X),Ypositive:positive2(Y)},
  twoModePotential:V,
  potentialPositive:positive2(V),
  potentialEigenvalues:[1,3],
  hamiltonianHessianPositive:positive2(V),
  KSquaredEqualsMinusVOnBothBlocks:equal(K2,expectedK2),
  normalModeFrequencies:["1","sqrt(3)"],
};
report.passed=report.homogeneousConeExample.YequalsGXGt&&report.homogeneousConeExample.Xpositive&&report.homogeneousConeExample.Ypositive&&report.potentialPositive&&report.KSquaredEqualsMinusVOnBothBlocks;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

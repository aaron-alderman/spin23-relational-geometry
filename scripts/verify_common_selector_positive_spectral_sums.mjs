#!/usr/bin/env node

const eps=1e-9;
const assert=(c,m)=>{if(!c)throw new Error(m);};
const P=[[1,0,0],[0,0,0],[0,0,0]];
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const multiply=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const commutes=A=>frob(sub(multiply(A,P),multiply(P,A)))<eps;
const planeMax=B=>(B[0][0]+B[1][1]+Math.sqrt((B[0][0]-B[1][1])**2+4*B[0][1]**2))/2;
const matVec=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const norm=v=>Math.sqrt(v.reduce((s,x)=>s+x*x,0));
const normalize=v=>{const n=norm(v);return v.map(x=>x/n);};

const K1=[[4,0,0],[0,2,1],[0,1,1]];
const K2=[[5,0,0],[0,1,-0.5],[0,-0.5,3]];
assert(commutes(K1)&&commutes(K2),"sector matrices must share P");
const plane1=[[2,1],[1,1]], plane2=[[1,-0.5],[-0.5,3]];
const gap1=4-planeMax(plane1), gap2=5-planeMax(plane2);
assert(gap1>0&&gap2>0,"common line must be top and isolated in each sector");

// Plane blocks need not commute.
assert(frob(sub(multiply(plane1,plane2),multiply(plane2,plane1)))>eps,
  "test requires noncommuting plane dynamics");

const w1=2,w2=3;
const sum=add(scale(w1,K1),scale(w2,K2));
assert(commutes(sum),"positive sum must preserve common selector");
const sumPlane=[[sum[1][1],sum[1][2]],[sum[2][1],sum[2][2]]];
const sumGap=sum[0][0]-planeMax(sumPlane);
assert(sumGap>0&&sumGap>=w1*gap1+w2*gap2-eps,"positive gaps must add");

// A small time-plane mixing rotates the selected eigenline.
const mixing=[[0,0.08,0],[0.08,0,0],[0,0,0]];
const mixed=add(K2,mixing);
assert(!commutes(mixed),"mixed sector should lose common projector");
let v=normalize([1,0.1,0]);
for(let k=0;k<100;k++)v=normalize(matVec(mixed,v));
assert(Math.abs(v[1])>1e-3,"top eigenline should rotate under mixing");

// Accidental integrated closure: opposite off-diagonal terms cancel only at
// one weighting and are not pointwise common-projector closure.
const base=[[3,0,0],[0,2,0],[0,0,1]];
const E=[[0,0.2,0],[0.2,0,0],[0,0,0]];
const rhoPlus=add(base,E), rhoMinus=sub(base,E);
assert(!commutes(rhoPlus)&&!commutes(rhoMinus),"pointwise densities should violate closure");
assert(commutes(add(rhoPlus,rhoMinus)),"equal-weight moment should cancel accidentally");
assert(!commutes(add(scale(2,rhoPlus),rhoMinus)),"unequal weighting should expose fragility");

console.log("Common-selector positive spectral-sum certificate: PASS");
console.log(`common_P=true; sector_gaps=${gap1.toFixed(6)},${gap2.toFixed(6)}; weighted_sum_gap=${sumGap.toFixed(6)}; plane_blocks_commute=false`);
console.log("pairwise_full_commutativity_not_required=true; pointwise_P_closure_strong=true; integrated_cancellation_fragile=true");

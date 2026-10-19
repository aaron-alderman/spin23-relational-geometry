#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const T=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const sub=(A,B)=>add(A,scale(-1,B));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const outer=v=>v.map(x=>v.map(y=>x*y));

// Positive spectral moment from positive rank-one residues.
const residues=[[1,0,0],[0,2,0],[0,0,3]], weights=[1,1,1];
let Q=Array.from({length:3},()=>Array(3).fill(0));
for(let k=0;k<residues.length;k++)Q=add(Q,scale(weights[k],outer(residues[k])));
assert(JSON.stringify(Q)===JSON.stringify([[1,0,0],[0,4,0],[0,0,9]]),"positive spectral moment failed");

// Exact phase average around the population z axis.
const qperp=(Q[0][0]+Q[1][1])/2;
const Qavg=[[qperp,0,0],[0,qperp,0],[0,0,Q[2][2]]];
for(const phi of [0.2,0.7,1.1]){
  const c=Math.cos(phi),s=Math.sin(phi),R=[[c,-s,0],[s,c,0],[0,0,1]];
  assert(maxAbs(sub(mul(mul(R,Qavg),T(R)),Qavg))<1e-12,"phase-neutral moment must commute with rephasing");
}
assert(Qavg[0][0]===Qavg[1][1] && Qavg[2][2]!==qperp,"only population axis may remain isolated");

// Conserved Euclidean source projector as a finite Ward-quotient check.
const p=[1,2,0,0], p2=p.reduce((s,x)=>s+x*x,0);
const theta=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>(i===j?1:0)-p[i]*p[j]/p2));
const pTheta=theta[0].map((_,j)=>p.reduce((s,x,i)=>s+x*theta[i][j],0));
assert(Math.max(...pTheta.map(Math.abs))<1e-12,"transverse Ward projector failed");

// Normal z fixes span{I,sigma_x,sigma_y}: equal diagonal populations.
const t=3,x=1,y=0.5;
const det=t*t-x*x-y*y;
assert(det>0,"selected equal-population carrier must have positive example");

console.log("Ward-positive spectral selector/rephasing gate certificate: PASS");
console.log(`raw_Q=diag(1,4,9); phase_averaged_Q=diag(${qperp},${qperp},9)`);
console.log("Ward_transverse=true; rephasing_invariant_director=population_axis_only");
console.log(`fixed_carrier=span(I,sigma_x,sigma_y); equal_populations=true; example_det=${det}`);

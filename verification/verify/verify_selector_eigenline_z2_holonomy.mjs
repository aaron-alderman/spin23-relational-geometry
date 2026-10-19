#!/usr/bin/env node

const eps = 1e-9;
const assert = (condition, message) => { if (!condition) throw new Error(message); };
const dot = (u,v) => u.reduce((s,x,i) => s+x*v[i],0);
const matVec = (A,v) => A.map(r => dot(r,v));
const outer = v => v.map(x => v.map(y => x*y));
const subM = (A,B) => A.map((r,i) => r.map((x,j) => x-B[i][j]));
const scaleM = (s,A) => A.map(r => r.map(x => s*x));
const frob = A => Math.sqrt(A.flat().reduce((s,x) => s+x*x,0));
const I = [[1,0,0],[0,1,0],[0,0,1]];

const K = phi => {
  const c=Math.cos(phi), s=Math.sin(phi);
  return [[c,s,0],[s,-c,0],[0,0,-2]];
};
const n = phi => [Math.cos(phi/2),Math.sin(phi/2),0];
const P = phi => outer(n(phi));
const eta = phi => subM(scaleM(2,P(phi)),I);

for(const phi of [0,0.3,1.7,4.8,2*Math.PI]){
  const residual=matVec(K(phi),n(phi)).map((x,i)=>x-n(phi)[i]);
  assert(Math.sqrt(dot(residual,residual))<eps,"top eigenline equation failed");
}
assert(dot(n(0),n(2*Math.PI)) < -1+eps,"eigenvector must return with minus sign");
assert(frob(subM(P(0),P(2*Math.PI)))<eps,"projector must be periodic");
assert(frob(subM(eta(0),eta(2*Math.PI)))<eps,"selector metric must be periodic");

// Discrete Z2 Wilson loop: continuous local overlaps are positive, while the
// final closure overlap contributes one minus sign.
const N=1000;
let localProduct=1;
for(let k=0;k<N;k++) localProduct*=Math.sign(dot(n(2*Math.PI*k/N),n(2*Math.PI*(k+1)/N)));
const closureSign=Math.sign(dot(n(2*Math.PI),n(0)));
assert(localProduct===1 && closureSign===-1,"Z2 holonomy failed");

// Projector map into RP1 has odd degree: z=(P00-P11)+i2P01=e^{i phi}.
let previous=0, accumulated=0;
for(let k=0;k<=N;k++){
  const phi=2*Math.PI*k/N, p=P(phi);
  const phase=Math.atan2(2*p[0][1],p[0][0]-p[1][1]);
  if(k>0){ let d=phase-previous; while(d>Math.PI)d-=2*Math.PI; while(d<-Math.PI)d+=2*Math.PI; accumulated+=d; }
  previous=phase;
}
const degree=Math.round(accumulated/(2*Math.PI));
assert(degree===1,"RP1 projector degree must be one");

console.log("Selector eigenline Z2-holonomy certificate: PASS");
console.log("spectrum=1,-1,-2; gap_on_loop=2; n(2pi)=-n(0); P_and_eta_periodic=true");
console.log(`RP1_projector_degree=${degree}; w1=${degree%2}; time_orientation_global=false; unoriented_selector_global=true`);

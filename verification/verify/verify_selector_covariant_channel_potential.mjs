import assert from "node:assert/strict";

const EPS=1e-10;
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const frob2=A=>A.flat().reduce((s,x)=>s+x*x,0);
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));

const E0=[[3/5,5/13],[4/5,0],[0,12/13]];
const Gstar=mm(tr(E0),E0);
assert.ok(maxAbs(add(Gstar,scale(-1,[[1,3/13],[3/13,1]])))<EPS);
const alpha=1,beta=1,v2=2,h=12/13;
const x=(v2+h/(2*beta))/2,y=(v2-h/(2*beta))/2;
assert.ok(Math.abs(x-16/13)<EPS);
assert.ok(Math.abs(y-10/13)<EPS);
const hessian=[[2*alpha+2*beta,2*alpha-2*beta],[2*alpha-2*beta,2*alpha+2*beta]];
assert.ok(Math.abs(hessian[0][0]+hessian[0][1]-4*alpha)<EPS);
assert.ok(Math.abs(hessian[0][0]-hessian[0][1]-4*beta)<EPS);

const Vgram=(E,G)=>{const D=add(mm(tr(E),E),scale(-1,G));return alpha*trace(D)**2+beta*frob2(D);};
assert.ok(Math.abs(Vgram(E0,Gstar))<EPS);
const theta=.37,c=Math.cos(theta),s=Math.sin(theta);
const R=[[c,-s,0],[s,c,0],[0,0,1]];
assert.ok(Math.abs(Vgram(mm(R,E0),Gstar))<EPS);
const phi=.29,cp=Math.cos(phi),sp=Math.sin(phi),S=[[cp,-sp],[sp,cp]];
const transformedE=mm(mm(R,E0),tr(S));
const transformedG=mm(mm(S,Gstar),tr(S));
assert.ok(Math.abs(Vgram(transformedE,transformedG)-Vgram(E0,Gstar))<EPS);

const Ebad=[[1,0],[0,1],[0,0]];
assert.ok(Vgram(Ebad,Gstar)>EPS);

console.log(JSON.stringify({
  status:"PASS",
  lowestDegreeCovariantPotential:"V=alpha tr(E^T E-G*)^2 + beta ||E^T E-G*||_F^2 (degree four in E)",
  checkpointGram:Gstar,
  singularValuePotential:{formula:"alpha(x+y-v^2)^2+beta(x-y)^2-h(x-y)",parameters:{alpha,beta,v2,h},vacuum:[x,y],hessianEigenvalues:[4*alpha,4*beta]},
  unspurionedLimit:"h=0 forces x=y at the isolated full-rank minimum",
  vacuumManifold:"E=U sqrt(G*) with U in the real Stiefel manifold V_2(R^3), isomorphic to SO(3); target orientation remains unselected",
  covarianceCheck:"V(R E S^T; S G* S^T)=V(E;G*)",
  fullMatrixSelection:"requires an additional target frame/cross spurion or boundary calibration; G* alone selects the measured Gram data but not E0 itself",
  interpretation:"E is an order parameter or covariant spurion, never an invariant tensor of the unbroken selector"
}));

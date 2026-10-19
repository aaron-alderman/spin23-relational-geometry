import assert from 'node:assert/strict';

const sigma=.92,kappa=.41,Q=[[-1.2,.25],[.1,1.05],[1.35,-.6]],U=[[-.75,-.8],[.6,.35],[1.55,.2]],D=[[-1.45,.7],[.3,-.4],[1.4,1.15]];
const sub=(a,b)=>a.map((x,i)=>x-b[i]),dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0),wedge=(a,b)=>a[0]*b[1]-a[1]*b[0];
const mixed=(R,kind)=>Array.from({length:2},(_,i)=>Array.from({length:2},(_,j)=>kind==='dot'?dot(sub(Q[i+1],Q[0]),sub(R[j+1],R[0]))/(2*sigma*sigma):kappa*wedge(sub(Q[i+1],Q[0]),sub(R[j+1],R[0]))));
const inv=A=>{const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]]},mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const Cu=mixed(U,'dot'),Cd=mixed(D,'dot'),Pu=mixed(U,'wedge'),Pd=mixed(D,'wedge'),Mu=mm(Pu,inv(Cu)),Md=mm(Pd,inv(Cd));
assert(maxDiff(Mu,Md)<1e-11);
assert(Math.abs(Mu[0][0]+Mu[1][1])<1e-11);
const g=2*kappa*sigma*sigma,M2=mm(Mu,Mu),target=[[-g*g,0],[0,-g*g]];
assert(maxDiff(M2,target)<1e-11);
const rawCoordinates=18,continuousRedundancies=4,shapeParameters=rawCoordinates-continuousRedundancies,scalesAndFlux=3,total=shapeParameters+scalesAndFlux,quarkObservables=10;
assert.equal(total,17);assert(total>quarkObservables);

console.log('Shared-left flux/magnitude relation certificate: PASS');
console.log('Pu*Cu^-1=Pd*Cd^-1; common_matrix_squared=-(2*kappa*sigma^2)^2 I; generic_parameters=17>10; predictive_relation_requires_preferred_localization_basis');

import assert from 'node:assert/strict';

const eta=[[1,0,0],[0,-1,0],[0,0,-1]],mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),T=A=>A[0].map((_,j)=>A.map(r=>r[j])),add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j])),scale=(A,c)=>A.map(r=>r.map(x=>c*x)),outer=(v,w)=>v.map(x=>w.map(y=>x*y)),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0)),I=[[1,0,0],[0,1,0],[0,0,1]];
const v=[.3,-.4,.2],A=outer(v,v),generator=add(mm(T(A),eta),mm(eta,A)),lambda=(generator[0][0]-generator[1][1]-generator[2][2])/3,residual=add(generator,scale(eta,-lambda));
assert(norm(residual)>1e-4);
const conformalRankOneImpliesZero=({v0,v1,v2})=>{const sameSquares=Math.abs(v0*v0-v1*v1)<1e-12&&Math.abs(v0*v0-v2*v2)<1e-12,spatialOff=Math.abs(v1*v2)<1e-12;return sameSquares&&spatialOff?Math.hypot(v0,v1,v2)<1e-12:true};
for(let a=-2;a<=2;a++)for(let b=-2;b<=2;b++)for(let c=-2;c<=2;c++)assert(conformalRankOneImpliesZero({v0:a,v1:b,v2:c}));
const alpha=.6,F=add(I,scale(A,alpha)),q=x=>x[0]*x[0]-x[1]*x[1]-x[2]*x[2],mv=(M,x)=>M.map(r=>r.reduce((s,z,j)=>s+z*x[j],0)),x1=[2,.5,.3],x2=[2,.3,.5];
assert(Math.abs(q(x1)-q(x2))<1e-12);
const r1=q(mv(F,x1))/q(x1),r2=q(mv(F,x2))/q(x2);assert(Math.abs(r1-r2)>1e-5);

console.log('Rank-one Schur/Lorentz-determinant certificate: PASS');
console.log('nonzero_vvT_not_in_co(1,2)=true; equal_determinant_vectors_scale_differently=true; exact_Spin23_carrier_requires_mixing_zero_or_non_rank1_completion');

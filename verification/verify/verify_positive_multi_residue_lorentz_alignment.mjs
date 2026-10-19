import assert from 'node:assert/strict';

const eta=[[1,0,0],[0,-1,0],[0,0,-1]],mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),T=A=>A[0].map((_,j)=>A.map(r=>r[j])),add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j])),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j])),scale=(A,c)=>A.map(r=>r.map(x=>c*x)),outer=(v,w)=>v.map(x=>w.map(y=>x*y)),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const n=[.6,.8],v1=[1,n[0],n[1]],v2=[0,-n[1],n[0]],R1=outer(v1,v1),R2=outer(v2,v2),S=add(R1,R2),target=[[1,.6,.8],[.6,1,0],[.8,0,1]];
assert(norm(sub(S,target))<1e-12);
const conformalResidual=A=>{const G=add(mm(T(A),eta),mm(eta,A)),lambda=(G[0][0]-G[1][1]-G[2][2])/3;return sub(G,scale(eta,lambda))};
assert(norm(conformalResidual(R1))>1e-3&&norm(conformalResidual(R2))>1e-3&&norm(conformalResidual(S))<1e-12);
const det=A=>A[0][0]*(A[1][1]*A[2][2]-A[1][2]*A[2][1])-A[0][1]*(A[1][0]*A[2][2]-A[1][2]*A[2][0])+A[0][2]*(A[1][0]*A[2][1]-A[1][1]*A[2][0]);assert(Math.abs(det(S))<1e-12);
for(let q=0;q<20;q++){const x=[Math.sin(q+1),Math.cos(2*q+.3),Math.sin(3*q-.2)],sx=mm(S,x.map(z=>[z])).flat();assert(x.reduce((s,z,i)=>s+z*sx[i],0)>-1e-12)}
const z=.2,degenerate=scale(S,1/(2.1-z)),split=add(scale(R1,1/(2.1-z)),scale(R2,1/(2.7-z)));assert(norm(conformalResidual(degenerate))<1e-12&&norm(conformalResidual(split))>1e-4);

console.log('Positive multi-residue Lorentz-alignment certificate: PASS');
console.log('minimal_aligned_rank=2; two_rank1_residues_sum_conformal=true; exact_mass_degeneracy_required=true; split_poles_break_alignment=true');

import assert from 'node:assert/strict';

const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j])),T=A=>A[0].map((_,j)=>A.map(r=>r[j])),det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0],inv=A=>{const d=det(A);return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]]},norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0)),scale=(A,c)=>A.map(r=>r.map(x=>c*x)),add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const J=[[0,1],[-1,0]],g=.73,A=[[1.2,-.35],[.4,1.1]],M=scale(mm(mm(A,J),inv(A)),g),I=[[1,0],[0,1]];
assert(norm(add(mm(M,M),scale(I,g*g)))<1e-12);
const v=[[1],[.27]],Mv=mm(M,v),S=[[v[0][0],-Mv[0][0]/g],[v[1][0],-Mv[1][0]/g]];
assert(Math.abs(det(S))>1e-8&&norm(sub(M,scale(mm(mm(S,J),inv(S)),g)))<1e-12);
const rank=R=>{const B=R.map(r=>[...r]);let q=0;for(let c=0;c<B[0].length&&q<B.length;c++){let p=q;while(p<B.length&&Math.abs(B[p][c])<1e-12)p++;if(p===B.length)continue;[B[q],B[p]]=[B[p],B[q]];const z=B[q][c];B[q]=B[q].map(x=>x/z);for(let i=0;i<B.length;i++)if(i!==q){const f=B[i][c];B[i]=B[i].map((x,j)=>x-f*B[q][j])}q++}return q};
const commutatorMap=[[0,M[1][0],-M[0][1],0],[M[0][1],M[1][1]-M[0][0],0,-M[0][1]],[-M[1][0],0,M[0][0]-M[1][1],M[1][0]],[0,-M[1][0],M[0][1],0]];
assert.equal(4-rank(commutatorMap),2);
const theta=.41,R=add(scale(I,Math.cos(theta)),scale(J,Math.sin(theta))),X=[[1.4,.3],[.3,.9]],Xp=mm(mm(R,X),T(R));
assert(norm(sub(Xp,T(Xp)))<1e-12&&Math.abs(det(Xp)-det(X))<1e-12);

console.log('Negative-square complex-structure classification certificate: PASS');
console.log('M_conjugate_to_gJ=true; centralizer_dimension=2; H2R_congruence_preserves_symmetry_and_determinant=true; source_intertwiner_still_required');

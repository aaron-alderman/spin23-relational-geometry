import assert from 'node:assert/strict';

const sigma=.88,kappa=.37,A=[[1.2,-.4],[.3,1.1]],Bu=[[.8,.2],[1.6,.4]],Bd=[[-.3,.9],[-.15,.45]];
const T=A=>A[0].map((_,j)=>A.map(r=>r[j])),mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),scale=(A,c)=>A.map(r=>r.map(x=>c*x)),join=(A,B)=>A.map((r,i)=>[...r,...B[i]]),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j])),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0)),det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0],inv=A=>{const d=det(A);return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]]};
const J=[[0,1],[-1,0]],C=B=>scale(mm(A,T(B)),1/(2*sigma*sigma)),P=B=>scale(mm(mm(A,J),T(B)),kappa),Cu=C(Bu),Cd=C(Bd),Pu=P(Bu),Pd=P(Bd);
assert(Math.abs(det(Cu))<1e-12&&Math.abs(det(Cd))<1e-12);
const Cs=join(Cu,Cd),Ps=join(Pu,Pd),gram=mm(Cs,T(Cs));assert(Math.abs(det(gram))>1e-8);
const M=mm(mm(Ps,T(Cs)),inv(gram));assert(norm(sub(Ps,mm(M,Cs)))<1e-11);
const g=2*kappa*sigma*sigma,target=[[-g*g,0],[0,-g*g]];assert(norm(sub(mm(M,M),target))<1e-11&&Math.abs(M[0][0]+M[1][1])<1e-11);
const onlyUpGram=mm(Cu,T(Cu));assert(Math.abs(det(onlyUpGram))<1e-12);

console.log('Shared-left singular pseudoinverse certificate: PASS');
console.log('det_Cu=det_Cd=0; stacked_rank=2; common_M_unique=true; residual=0; M_squared_negative_scalar=true');

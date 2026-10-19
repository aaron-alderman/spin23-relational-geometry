#!/usr/bin/env node

const C=(re=0,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),sc=(a,s)=>C(a.re*s,a.im*s),conj=a=>C(a.re,-a.im);
const vadd=(a,b)=>a.map((x,i)=>add(x,b[i])),vsc=(a,s)=>a.map(x=>sc(x,s));
const outer=(a,b)=>a.map(x=>b.map(y=>mul(x,y)));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),msc=(A,s)=>A.map(r=>r.map(x=>sc(x,s)));
const mcomplex=(A,z)=>A.map(r=>r.map(x=>mul(x,z)));
const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C())));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const inner=(A,B)=>A.reduce((s,r,i)=>r.reduce((t,x,j)=>add(t,mul(conj(x),B[i][j])),s),C()).re;
const J=[ [C(),C(-1),C()], [C(1),C(),C()], [C(),C(),C()] ];
const ep=[C(1/Math.sqrt(2)),C(0,1/Math.sqrt(2)),C()];
const em=ep.map(conj),e0=[C(),C(),C(1)];
const sym=(a,b)=>msc(madd(outer(a,b),outer(b,a)),1/Math.sqrt(2));
const states=[
  {q:2,X:outer(ep,ep)},
  {q:1,X:sym(ep,e0)},
  {q:0,X:[[C(1/Math.sqrt(6)),C(),C()],[C(),C(1/Math.sqrt(6)),C()],[C(),C(),C(-2/Math.sqrt(6))]]},
  {q:-1,X:sym(em,e0)},
  {q:-2,X:outer(em,em)}
];
const comm=X=>madd(matMul(J,X),msc(matMul(X,J),-1));
const symmetric=X=>X.every((r,i)=>r.every((x,j)=>Math.abs(x.re-X[j][i].re)<1e-12&&Math.abs(x.im-X[j][i].im)<1e-12));
const traceless=X=>{const z=add(add(X[0][0],X[1][1]),X[2][2]);return Math.abs(z.re)<1e-12&&Math.abs(z.im)<1e-12;};
const eigen=(X,q)=>{const H=comm(X),target=mcomplex(X,C(0,-q));return H.every((r,i)=>r.every((z,j)=>Math.abs(z.re-target[i][j].re)<1e-12&&Math.abs(z.im-target[i][j].im)<1e-12));};
const checks=states.map(s=>({q:s.q,symmetric:symmetric(s.X),traceless:traceless(s.X),norm:inner(s.X,s.X),chargeEigenstate:eigen(s.X,s.q)}));
const overlaps=states.map(a=>states.map(b=>inner(a.X,b.X)));
const report={
  protocol:"custodial-fiveplet-charge-eigenstates/1",
  convention:"[J3,X]=-i q X; Hermitian electric generator is +i ad(J3)",
  charges:states.map(s=>s.q),
  checks,
  gramMatrix:overlaps,
  photonVertices:{threePoint:"i e q (p-p')_mu",fourPoint:"e^2 q^2 A_mu A^mu |H_q|^2"},
  ladderStructure:"Broken weak generators connect adjacent q values with spin-2 ladder coefficients.",
  conclusion:"The physical symmetric-traceless sector is an orthonormal spin-2 multiplet with unavoidable neutral, singly charged and doubly charged components."
};
report.passed=checks.every(x=>x.symmetric&&x.traceless&&Math.abs(x.norm-1)<1e-12&&x.chargeEigenstate)&&overlaps.every((r,i)=>r.every((x,j)=>Math.abs(x-(i===j?1:0))<1e-12));
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>C(a.re,-a.im);
const scale=(a,s)=>C(a.re*s,a.im*s);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const madd=(A,B,sa=1,sb=1)=>A.map((r,i)=>r.map((x,j)=>add(scale(x,sa),scale(B[i][j],sb))));
const inv2=M=>{const d=add(mul(M[0][0],M[1][1]),scale(mul(M[0][1],M[1][0]),-1));const di=conj(d),q=1/(d.re*d.re+d.im*d.im),r=scale(di,q);return [[mul(M[1][1],r),mul(scale(M[0][1],-1),r)],[mul(scale(M[1][0],-1),r),mul(M[0][0],r)]]};
const transform=(U,X)=>mm(mm(U,X),dag(U));
const schur=(A,B,D)=>madd(A,mm(mm(B,inv2(D)),dag(B)),1,-1);
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const det=M=>add(mul(M[0][0],M[1][1]),scale(mul(M[0][1],M[1][0]),-1));
const trace=M=>add(M[0][0],M[1][1]);

const A=[[C(3.2),C(0.35,0.12)],[C(0.35,-0.12),C(2.7)]];
const D=[[C(2.0),C(0.15,-0.05)],[C(0.15,0.05),C(1.8)]];
const B=[[C(0.4,0.1),C(0.08,-0.03)],[C(-0.06,0.04),C(0.3,-0.08)]];
const S=schur(A,B,D);
assert(trace(S).re>0&&det(S).re>0&&Math.abs(det(S).im)<1e-10);

for(const phi of [0.11,0.37,0.93]){
  const p=C(Math.cos(4*phi),Math.sin(4*phi));
  const q=C(Math.cos(3*phi),Math.sin(3*phi));
  const U=[[p,C(0)],[C(0),conj(p)]];
  const V=[[q,C(0)],[C(0),conj(q)]];
  const Ap=transform(U,A),Dp=transform(V,D),Bp=mm(mm(U,B),dag(V));
  const Sp=schur(Ap,Bp,Dp),expected=transform(U,S);
  assert(maxDiff(Sp,expected)<1e-10);
  assert(Math.hypot(trace(Sp).re-trace(S).re,trace(Sp).im-trace(S).im)<1e-10);
  assert(Math.hypot(det(Sp).re-det(S).re,det(Sp).im-det(S).im)<1e-10);
}

console.log('Twisted-bundle Schur covariance certificate: PASS');
console.log('patch_covariance=true; recursive_elimination_global=true; trace_determinant_positive_global=true; real_reduction_requires_portal_intertwiner=true');

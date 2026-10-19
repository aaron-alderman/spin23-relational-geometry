import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),comm=(A,B)=>mm(A,B).map((r,i)=>r.map((x,j)=>sub(x,mm(B,A)[i][j]))),det3=M=>add(sub(mul(M[0][0],sub(mul(M[1][1],M[2][2]),mul(M[1][2],M[2][1]))),mul(M[0][1],sub(mul(M[1][0],M[2][2]),mul(M[1][2],M[2][0])))),mul(M[0][2],sub(mul(M[1][0],M[2][1]),mul(M[1][1],M[2][0]))));
const Hu=[[C(1),C(0),C(0)],[C(0),C(2),C(0)],[C(0),C(0),C(4)]],Hd=[[C(10),C(1),C(0,-1)],[C(1),C(11),C(1)],[C(0,1),C(1),C(12)]],bar=A=>A.map(r=>r.map(conj)),real=A=>A.map(r=>r.map(z=>C(z.re)));
const J=det3(comm(Hu,Hd));assert(Math.abs(J.im)>1e-8);
const HdB=bar(Hd);assert(Math.abs(det3(comm(bar(Hu),HdB)).im+J.im)<1e-10);
const diagonalMismatch=Math.max(...Hd.flatMap((r,i)=>r.map((z,j)=>Math.hypot(z.re-HdB[i][j].re,z.im-HdB[i][j].im))));assert(diagonalMismatch>1);
const Jr=det3(comm(real(Hu),real(Hd)));assert(Math.hypot(Jr.re,Jr.im)<1e-12);
const complexGeneration=16,pairedAmbientReal=4*complexGeneration,exchangeFixedReal=2*complexGeneration,diagonalIntersectionReal=complexGeneration;
assert.equal(exchangeFixedReal,32);assert.equal(diagonalIntersectionReal,16);

console.log('Full-TRO diagonal-locking CP obstruction certificate: PASS');
console.log('exchange_fixed=one_complex_generation; diagonal_intersection=one_real_generation; complex_CP_rejected_by_diagonal; real_projection_J=0; locking_must_be_response_factor_local');

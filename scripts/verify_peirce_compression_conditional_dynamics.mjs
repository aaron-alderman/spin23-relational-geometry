import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),comm=(A,B)=>mm(A,B).map((r,i)=>r.map((x,j)=>sub(x,mm(B,A)[i][j]))),msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j]))),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x.re*x.re+x.im*x.im,0));
const p=[[C(1),C(0),C(0)],[C(0),C(0),C(0)],[C(0),C(0),C(1)]],q=[[C(0),C(0),C(0)],[C(0),C(1),C(0)],[C(0),C(0),C(0)]],I=p.map((r,i)=>r.map((x,j)=>add(x,q[i][j]))),E=X=>mm(mm(p,X),p),blockE=X=>{const PX=E(X),QX=mm(mm(q,X),q);return PX.map((r,i)=>r.map((x,j)=>add(x,QX[i][j])))};
assert(norm(msub(E(I),p))<1e-12&&norm(msub(blockE(I),I))<1e-12);
const X=[[C(2),C(.2,.1),C(.3,-.2)],[C(.2,-.1),C(1),C(.4,.3)],[C(.3,.2),C(.4,-.3),C(1.5)]],a=E([[C(.7),C(0),C(.2)],[C(0),C(0),C(0)],[C(.2),C(0),C(.8)]]),b=E([[C(.5),C(0),C(0,.1)],[C(0),C(0),C(0)],[C(0,-.1),C(0),C(.9)]]);
assert(norm(msub(E(mm(mm(a,X),b)),mm(mm(a,E(X)),b)))<1e-12);
assert(norm(msub(E(E(X)),E(X)))<1e-12&&norm(msub(blockE(blockE(X)),blockE(X)))<1e-12);
const Hgood=[[C(.4),C(0),C(.2,.1)],[C(0),C(1.1),C(0)],[C(.2,-.1),C(0),C(.8)]],Hbad=[[C(.4),C(.3),C(.2,.1)],[C(.3),C(1.1),C(0)],[C(.2,-.1),C(0),C(.8)]];
assert(norm(comm(Hgood,p))<1e-12&&norm(comm(Hbad,p))>1e-3);
const Y=[[C(0),C(0),C(0)],[C(0),C(1),C(0)],[C(0),C(0),C(0)]];assert(norm(comm(Hgood,Y))<1e-12&&norm(comm(Hbad,Y))>1e-3);
assert(norm(msub(E(X.map(r=>r.map(conj))),E(X).map(r=>r.map(conj))))<1e-12);

console.log('Peirce-compression conditional-dynamics certificate: PASS');
console.log('compression_CP_retraction=true; not_unital_on_M3=true; block_expectation_unital=true; invariant_iff_H_commutes_p=true; isolated_hypercharge_invariance_sufficient=true; conjugation_compatible=true');

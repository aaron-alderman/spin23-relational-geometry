#!/usr/bin/env node

const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const sub=(a,b)=>C(a.re-b.re,a.im-b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale=(s,a)=>C(s*a.re,s*a.im);
const conj=a=>C(a.re,-a.im);
const zeros=(r,c)=>Array.from({length:r},()=>Array.from({length:c},()=>C(0)));
const mmul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const msub=(A,B)=>A.map((r,i)=>r.map((x,j)=>sub(x,B[i][j])));
const tr=A=>A.reduce((s,r,i)=>add(s,r[i]),C(0));
const blockDiag=(A,B)=>{
  const n=A.length,m=B.length,Znm=zeros(n,m),Zmn=zeros(m,n);
  return [...A.map((r,i)=>[...r,...Znm[i]]),...B.map((r,i)=>[...Zmn[i],...r])];
};
const mconj=A=>A.map(r=>r.map(conj));

const Hu=[[C(1),C(0),C(0)],[C(0),C(2),C(0)],[C(0),C(0),C(4)]];
const Hd=[
  [C(10),C(1),C(0,-1)],
  [C(1),C(11),C(1)],
  [C(0,1),C(1),C(12)],
];
const comm=(A,B)=>msub(mmul(A,B),mmul(B,A));
const cube=A=>mmul(mmul(A,A),A);
const base=tr(cube(comm(Hu,Hd)));
assert(Math.abs(base.re)<1e-12&&Math.abs(base.im-36)<1e-12,"base CP invariant failed");

const Du=blockDiag(Hu,mconj(Hu)), Dd=blockDiag(Hd,mconj(Hd));
const CD=cube(comm(Du,Dd));
const ungraded=tr(CD);
assert(Math.hypot(ungraded.re,ungraded.im)<1e-12,"ungraded doubled CP trace must cancel");

const iI3=[[C(0,1),C(0),C(0)],[C(0),C(0,1),C(0)],[C(0),C(0),C(0,1)]];
const minusI3=iI3.map(r=>r.map(z=>scale(-1,z)));
const J=blockDiag(iI3,minusI3);
const graded=scale(-0.5,tr(mmul(J,CD)));
assert(Math.abs(graded.re-36)<1e-12&&Math.abs(graded.im)<1e-12,"J-graded CP invariant failed");

// Theta=sigma_x K preserves D(H) and the anti-Hermitian complex structure J.
const thetaBlock=X=>{
  const n=X.length/2;
  return Array.from({length:2*n},(_,i)=>Array.from({length:2*n},(_,j)=>{
    const si=i<n?i+n:i-n, sj=j<n?j+n:j-n;
    return conj(X[si][sj]);
  }));
};
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((z,j)=>Math.hypot(z.re-B[i][j].re,z.im-B[i][j].im))));
assert(maxDiff(thetaBlock(Dd),Dd)<1e-12,"exchange must fix doubled flavor observable");
assert(maxDiff(thetaBlock(J),J)<1e-12,"exchange must fix the retained complex structure");

console.log("Three-family CP/Furey-exchange certificate: PASS");
console.log(`single_sector_Tr_comm3=${base.re}+${base.im}i; ungraded_doubled_trace=0`);
console.log(`J_graded_exchange_fixed_invariant=${graded.re}; nonzero_CP_retained=true`);
console.log("Theta_fixes_doubled_H=true; Theta_fixes_complex_structure_J=true");

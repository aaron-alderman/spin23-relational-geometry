import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)},conj=a=>C(a.re,-a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=M=>{const n=M.length,A=M.map((r,i)=>[...r.map(x=>C(x.re,x.im)),...Array.from({length:n},(_,j)=>C(i===j?1:0))]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.hypot(A[i][k].re,A[i][k].im)>Math.hypot(A[p][k].re,A[p][k].im))p=i;[A[k],A[p]]=[A[p],A[k]];const q=A[k][k];A[k]=A[k].map(x=>div(x,q));for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];A[i]=A[i].map((x,j)=>sub(x,mul(f,A[k][j])))} }return A.map(r=>r.slice(n))};
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x.re*x.re+x.im*x.im,0)), block=(A,r,c,n,m)=>A.slice(r,r+n).map(x=>x.slice(c,c+m));
const had=.5,U=[[1,1,1,1],[1,-1,1,-1],[1,1,-1,-1],[1,-1,-1,1]].map(r=>r.map(x=>C(had*x)));
const lam=[0,2,3,4],A=mm(mm(U,lam.map((x,i)=>lam.map((_,j)=>C(i===j?x:0)))),dag(U));
const h=[.2,.8,1.3,1.7],y=C(.31,.17),D=h.map((x,i)=>h.map((_,j)=>i===j?mul(y,C(x)):C(0)));
const Z=Array.from({length:4},()=>Array.from({length:4},()=>C(0))),negA=A.map(r=>r.map(x=>C(-x.re,-x.im)));
const H=[...A.map((r,i)=>[...r,...D[i]]),...dag(D).map((r,i)=>[...r,...negA[i]])];
const cols=[0,4,1,2,3,5,6,7],T=Array.from({length:8},(_,r)=>cols.map(c=>c<4?(r<4?U[r][c]:C(0)):(r>=4?U[r-4][c-4]:C(0))));
const Hb=mm(mm(dag(T),H),T),Hpp=block(Hb,0,0,2,2),Hpq=block(Hb,0,2,2,6),Hqp=block(Hb,2,0,6,2),Hqq=block(Hb,2,2,6,6);
const z=C(.09,.27),shift=(M)=>M.map((r,i)=>r.map((x,j)=>sub(x,i===j?z:C(0)))),R=inv(shift(Hb)),G=block(R,0,0,2,2);
const Rq=inv(shift(Hqq)),Sigma=mm(mm(Hpq,Rq),Hqp),S=shift(Hpp).map((r,i)=>r.map((x,j)=>sub(x,Sigma[i][j])));
assert(maxDiff(G,inv(S))<1e-10);
const mean=h.reduce((s,x)=>s+x,0)/4,variance=h.reduce((s,x)=>s+(x-mean)**2,0)/4,yn2=y.re*y.re+y.im*y.im;
assert(Math.abs(frob(Hpq)**2-2*yn2*variance)<1e-11);
assert(frob(Sigma)<=frob(Hpq)**2/z.im+1e-11);
const flat=h.map(()=>mean),Df=flat.map((x,i)=>flat.map((_,j)=>i===j?mul(y,C(x)):C(0))),Hf=[...A.map((r,i)=>[...r,...Df[i]]),...dag(Df).map((r,i)=>[...r,...negA[i]])],Hfb=mm(mm(dag(T),Hf),T);
assert(frob(block(Hfb,0,2,2,6))<1e-12);

console.log('Inhomogeneous-Higgs Schur correction certificate: PASS');
console.log('exact_compressed_resolvent=true; mixing_variance_identity=true; Herglotz_bound=true; flat_profile_decouples_exactly=true');

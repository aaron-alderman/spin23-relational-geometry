import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)},conj=a=>C(a.re,-a.im),phase=t=>C(Math.cos(t),Math.sin(t));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=M=>{const n=M.length,A=M.map((r,i)=>[...r.map(x=>C(x.re,x.im)),...Array.from({length:n},(_,j)=>C(i===j?1:0))]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.hypot(A[i][k].re,A[i][k].im)>Math.hypot(A[p][k].re,A[p][k].im))p=i;[A[k],A[p]]=[A[p],A[k]];const q=A[k][k];A[k]=A[k].map(x=>div(x,q));for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];A[i]=A[i].map((x,j)=>sub(x,mul(f,A[k][j])))} }return A.map(r=>r.slice(n))};

const f=[0.08,0.31,0.63,0.63,0.31,0.08],norm=Math.sqrt(f.reduce((s,x)=>s+x*x,0)),fn=f.map(x=>x/norm),h=[0.9,1.0,1.1,1.1,1.0,0.9],y=mul(C(0.7),phase(0.43));
const overlap=fn.reduce((s,x,i)=>s+x*h[i]*fn[i],0),m=mul(y,C(overlap));assert(overlap>0&&Math.hypot(m.re,m.im)>0);
const k=[0.21,-0.16,0.29],K=[[C(k[2]),C(k[0],-k[1])],[C(k[0],k[1]),C(-k[2])]],Z=[[C(0),C(0)],[C(0),C(0)]],I=[[C(1),C(0)],[C(0),C(1)]];
const H=[[...K[0],mul(m,I[0][0]),C(0)],[...K[1],C(0),mul(m,I[1][1])],[mul(conj(m),I[0][0]),C(0),C(-K[0][0].re,-K[0][0].im),C(-K[0][1].re,-K[0][1].im)],[C(0),mul(conj(m),I[1][1]),C(-K[1][0].re,-K[1][0].im),C(-K[1][1].re,-K[1][1].im)]];
assert(maxDiff(H,dag(H))<1e-12);
const H2=mm(H,H),gap2=k.reduce((s,x)=>s+x*x,0)+m.re*m.re+m.im*m.im,expected=Array.from({length:4},(_,i)=>Array.from({length:4},(_,j)=>C(i===j?gap2:0)));assert(maxDiff(H2,expected)<1e-11);
const phi=Math.atan2(m.im,m.re),alpha=2*phi+0.2,beta=0.2;assert(Math.hypot(mul(phase(alpha-beta),conj(m)).re-m.re,mul(phase(alpha-beta),conj(m)).im-m.im)<1e-11);
const z=C(0.1,0.35),R=inv(H.map((r,i)=>r.map((x,j)=>sub(x,C(i===j?z.re:0,i===j?z.im:0))))),ids=[0,2],G=ids.map(i=>ids.map(j=>R[i][j])),Im=G.map((r,i)=>r.map((x,j)=>(x.im+G[j][i].im)/2));assert(Im[0][0]>0&&Im[1][1]>0&&Im[0][0]*Im[1][1]-Im[0][1]**2>-1e-9);

console.log('Wall Yukawa Dirac-pole certificate: PASS');
console.log(`profile_overlap=${overlap.toFixed(8)}; mass_abs=${Math.hypot(m.re,m.im).toFixed(8)}; exact_E2=${gap2.toFixed(8)}; selector_aligned=true; compressed_Herglotz=true`);

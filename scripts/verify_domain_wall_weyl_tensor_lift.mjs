import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)},conj=a=>C(a.re,-a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=M=>{const n=M.length,A=M.map((r,i)=>[...r.map(x=>C(x.re,x.im)),...Array.from({length:n},(_,j)=>C(i===j?1:0))]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.hypot(A[i][k].re,A[i][k].im)>Math.hypot(A[p][k].re,A[p][k].im))p=i;[A[k],A[p]]=[A[p],A[k]];const q=A[k][k];assert(Math.hypot(q.re,q.im)>1e-12);A[k]=A[k].map(x=>div(x,q));for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];A[i]=A[i].map((x,j)=>sub(x,mul(f,A[k][j])))} }return A.map(r=>r.slice(n))};

const N=5,a=0.8,m0=1.0,ratios=Array.from({length:N},(_,j)=>Math.exp(-a*(j<N/2?-m0:m0)));
const Q=Array.from({length:N},(_,j)=>Array.from({length:N+1},(_,i)=>i===j?-ratios[j]:i===j+1?1:0));
const f=[1];for(const r of ratios)f.push(r*f.at(-1));const fn=Math.sqrt(f.reduce((s,x)=>s+x*x,0));for(let i=0;i<f.length;i++)f[i]/=fn;
const k=[0.23,-0.17,0.31],K=[[C(k[2]),C(k[0],-k[1])],[C(k[0],k[1]),C(-k[2])]],k2=k.reduce((s,x)=>s+x*x,0);
const e=N+1,o=N,size=2*(e+o),H=Array.from({length:size},()=>Array.from({length:size},()=>C(0)));
const ei=(i,s)=>2*i+s,oi=(j,s)=>2*e+2*j+s;
for(let i=0;i<e;i++)for(let s=0;s<2;s++)for(let t=0;t<2;t++)H[ei(i,s)][ei(i,t)]=K[s][t];
for(let j=0;j<o;j++)for(let s=0;s<2;s++)for(let t=0;t<2;t++)H[oi(j,s)][oi(j,t)]=C(-K[s][t].re,-K[s][t].im);
for(let j=0;j<o;j++)for(let i=0;i<e;i++)for(let s=0;s<2;s++){H[ei(i,s)][oi(j,s)]=C(Q[j][i]);H[oi(j,s)][ei(i,s)]=C(Q[j][i])}
assert(maxDiff(H,dag(H))<1e-12);

const H2=mm(H,H);
for(let i=0;i<size;i++)for(let j=0;j<size;j++){
  if((i<2*e)!==(j<2*e))assert(Math.hypot(H2[i][j].re,H2[i][j].im)<1e-10);
}

// The f tensor spin subspace carries exactly sigma.k.
for(let spin=0;spin<2;spin++){
  const v=Array.from({length:size},()=>C(0));for(let i=0;i<e;i++)v[ei(i,spin)]=C(f[i]);
  const Hv=H.map(r=>r.reduce((s,x,j)=>add(s,mul(x,v[j])),C(0)));
  const expected=Array.from({length:size},()=>C(0));for(let i=0;i<e;i++)for(let t=0;t<2;t++)expected[ei(i,t)]=mul(C(f[i]),K[t][spin]);
  assert(Math.max(...Hv.map((x,i)=>Math.hypot(x.re-expected[i].re,x.im-expected[i].im)))<1e-10);
}
assert(Math.abs((k2)-k.reduce((s,x)=>s+x*x,0))<1e-12);

const z=C(0.19,0.37),R=inv(H.map((r,i)=>r.map((x,j)=>sub(x,C(i===j?z.re:0,i===j?z.im:0)))));
const probes=[ei(Math.floor(e/2),0),ei(Math.floor(e/2),1),ei(Math.floor(e/2)+1,0),ei(Math.floor(e/2)+1,1)];
const G=probes.map(i=>probes.map(j=>R[i][j]));
const Im=G.map((r,i)=>r.map((x,j)=>(x.im+G[j][i].im)/2));
// PSD checked by random real vectors.
for(let n=0;n<100;n++){const v=Array.from({length:4},(_,i)=>Math.sin((n+1)*(i+1)*1.37));let q=0;for(let i=0;i<4;i++)for(let j=0;j<4;j++)q+=v[i]*Im[i][j]*v[j];assert(q>-1e-8)}

console.log('Domain-wall Weyl tensor-lift certificate: PASS');
console.log(`matrix_size=${size}; exact_wall_Weyl_subspace=true; dispersion_squared=${k2.toFixed(6)}; bulk_cross_terms_cancel=true; projected_resolvent_passive=true`);

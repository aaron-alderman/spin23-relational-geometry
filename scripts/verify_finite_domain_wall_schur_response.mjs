import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im});
const add=(a,b)=>C(a.re+b.re,a.im+b.im);
const subc=(a,b)=>C(a.re-b.re,a.im-b.im);
const mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)};
const conj=a=>C(a.re,-a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0))));
const dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j])));
const madd=(A,B,sa=1,sb=1)=>A.map((r,i)=>r.map((x,j)=>add(C(sa*x.re,sa*x.im),C(sb*B[i][j].re,sb*B[i][j].im))));
const inv=M=>{const n=M.length,A=M.map((r,i)=>[...r.map(x=>C(x.re,x.im)),...Array.from({length:n},(_,j)=>C(i===j?1:0))]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.hypot(A[i][k].re,A[i][k].im)>Math.hypot(A[p][k].re,A[p][k].im))p=i;[A[k],A[p]]=[A[p],A[k]];assert(Math.hypot(A[k][k].re,A[k][k].im)>1e-12);const q=A[k][k];A[k]=A[k].map(x=>div(x,q));for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];A[i]=A[i].map((x,j)=>subc(x,mul(f,A[k][j])))} }return A.map(r=>r.slice(n))};
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const transpose=A=>A[0].map((_,j)=>A.map(r=>r[j]));

const N=8,a=0.7,m0=1.1;
const masses=Array.from({length:N},(_,j)=>j<(N/2)?-m0:m0);
const ratios=masses.map(m=>Math.exp(-a*m));
const Q=Array.from({length:N},(_,j)=>Array.from({length:N+1},(_,i)=>i===j?-ratios[j]:i===j+1?1:0));
const f=[1];for(const r of ratios)f.push(r*f.at(-1));const fn=Math.sqrt(f.reduce((s,x)=>s+x*x,0));for(let i=0;i<f.length;i++)f[i]/=fn;
for(let j=0;j<N;j++)assert(Math.abs(f[j+1]-ratios[j]*f[j])<1e-12);
const peak=f.map(Math.abs).indexOf(Math.max(...f.map(Math.abs)));assert(peak===N/2);

const size=2*N+1,H=Array.from({length:size},()=>Array(size).fill(0));
for(let j=0;j<N;j++)for(let i=0;i<N+1;i++){H[i][N+1+j]=Q[j][i];H[N+1+j][i]=Q[j][i]}
const zero=[...f,...Array(N).fill(0)];for(let i=0;i<size;i++)assert(Math.abs(H[i].reduce((s,x,j)=>s+x*zero[j],0))<1e-11);

const probes=[N/2,N/2+1],rest=Array.from({length:size},(_,i)=>i).filter(i=>!probes.includes(i)),perm=[...probes,...rest];
const z=C(0.23,0.41);
const K=perm.map(i=>perm.map(j=>subc(C(H[i][j]),C(i===j?z.re:0,i===j?z.im:0))));
const Kinv=inv(K),G=Kinv.slice(0,2).map(r=>r.slice(0,2));
const Im=G.map((r,i)=>r.map((x,j)=>(x.im-conj(G[j][i]).im)/2));
assert(Im[0][0]>0&&Im[1][1]>0&&Im[0][0]*Im[1][1]-Im[0][1]*Im[1][0]>-1e-9);

const A=K.slice(0,2).map(r=>r.slice(0,2)),B=K.slice(0,2).map(r=>r.slice(2)),D=K.slice(2).map(r=>r.slice(2));
const S=madd(A,mm(mm(B,inv(D)),transpose(B).map(r=>r.map(x=>x))),1,-1);
assert(maxDiff(G,inv(S))<1e-8);

console.log('Finite domain-wall Schur response certificate: PASS');
console.log(`sites=${size}; zero_mode_peak=${peak}; exact_kernel=true; two_probe_Herglotz=true; block_inverse_equals_inverse_Schur=true`);

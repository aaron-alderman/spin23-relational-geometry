import assert from 'node:assert/strict';

const chain=(cells,t1=0.35,t2=1)=>{const n=2*cells,H=Array.from({length:n},()=>Array(n).fill(0));for(let i=0;i<n-1;i++){const t=i%2===0?t1:t2;H[i][i+1]=H[i+1][i]=t}return H};
const jacobi=A0=>{const A=A0.map(r=>[...r]),n=A.length,V=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?1:0));for(let it=0;it<100*n*n;it++){let p=0,q=1,m=0;for(let i=0;i<n;i++)for(let j=i+1;j<n;j++)if(Math.abs(A[i][j])>m){m=Math.abs(A[i][j]);p=i;q=j}if(m<1e-13)break;const phi=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);for(let k=0;k<n;k++)if(k!==p&&k!==q){const akp=A[k][p],akq=A[k][q];A[k][p]=A[p][k]=c*akp-s*akq;A[k][q]=A[q][k]=s*akp+c*akq}const app=A[p][p],aqq=A[q][q],apq=A[p][q];A[p][p]=c*c*app-2*s*c*apq+s*s*aqq;A[q][q]=s*s*app+2*s*c*apq+c*c*aqq;A[p][q]=A[q][p]=0;for(let k=0;k<n;k++){const vkp=V[k][p],vkq=V[k][q];V[k][p]=c*vkp-s*vkq;V[k][q]=s*vkp+c*vkq}}return {values:A.map((r,i)=>r[i]),vectors:V}};

const deltas=[];
for(const cells of [4,6,8,10]){const {values,vectors}=jacobi(chain(cells));const order=values.map((x,i)=>({x,i})).sort((a,b)=>Math.abs(a.x)-Math.abs(b.x));const e0=order[0],e1=order[1];assert(e0.x*e1.x<0);assert(Math.abs(Math.abs(e0.x)-Math.abs(e1.x))<1e-9);deltas.push(Math.abs(e0.x));const v=vectors.map(r=>r[e0.i]),endWeight=v[0]**2+v.at(-1)**2;assert(endWeight>0.6)}
for(let i=1;i<deltas.length;i++)assert(deltas[i]<0.2*deltas[i-1]);

// Complex inverse for the two-end Herglotz response.
const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)};
const inv=M=>{const n=M.length,A=M.map((r,i)=>[...r,...Array.from({length:n},(_,j)=>C(i===j?1:0))]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.hypot(A[i][k].re,A[i][k].im)>Math.hypot(A[p][k].re,A[p][k].im))p=i;[A[k],A[p]]=[A[p],A[k]];const q=A[k][k];A[k]=A[k].map(x=>div(x,q));for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];A[i]=A[i].map((x,j)=>sub(x,mul(f,A[k][j])))} }return A.map(r=>r.slice(n))};
const H=chain(8),z=C(0.03,0.2),R=inv(H.map((r,i)=>r.map((x,j)=>sub(C(x),C(i===j?z.re:0,i===j?z.im:0))))),ids=[0,H.length-1],G=ids.map(i=>ids.map(j=>R[i][j])),Im=G.map((r,i)=>r.map((x,j)=>(x.im+G[j][i].im)/2));assert(Im[0][0]>0&&Im[1][1]>0&&Im[0][0]*Im[1][1]-Im[0][1]**2>-1e-9);

console.log('Finite-slab mirror splitting certificate: PASS');
console.log(`near_zero_splittings=${deltas.map(x=>x.toExponential(3)).join(',')}; paired=true; exponentially_suppressed=true; end_localized=true; end_resolvent_Herglotz=true`);

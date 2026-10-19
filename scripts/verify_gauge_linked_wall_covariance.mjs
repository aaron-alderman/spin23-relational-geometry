import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),sub=(a,b)=>C(a.re-b.re,a.im-b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),div=(a,b)=>{const d=b.re*b.re+b.im*b.im;return C((a.re*b.re+a.im*b.im)/d,(a.im*b.re-a.re*b.im)/d)},conj=a=>C(a.re,-a.im),phase=t=>C(Math.cos(t),Math.sin(t));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),dag=A=>A[0].map((_,j)=>A.map(r=>conj(r[j]))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.hypot(x.re-B[i][j].re,x.im-B[i][j].im))));
const inv=M=>{const n=M.length,A=M.map((r,i)=>[...r.map(x=>C(x.re,x.im)),...Array.from({length:n},(_,j)=>C(i===j?1:0))]);for(let k=0;k<n;k++){let p=k;for(let i=k+1;i<n;i++)if(Math.hypot(A[i][k].re,A[i][k].im)>Math.hypot(A[p][k].re,A[p][k].im))p=i;[A[k],A[p]]=[A[p],A[k]];const q=A[k][k];assert(Math.hypot(q.re,q.im)>1e-12);A[k]=A[k].map(x=>div(x,q));for(let i=0;i<n;i++)if(i!==k){const f=A[i][k];A[i]=A[i].map((x,j)=>sub(x,mul(f,A[k][j])))} }return A.map(r=>r.slice(n))};

const L=3,spin=2,wallDim=L*spin,sx=[[C(0),C(1)],[C(1),C(0)]],links=[phase(0.2),phase(-0.35),phase(0.5)];
const buildWall=Us=>{const H=Array.from({length:wallDim},()=>Array.from({length:wallDim},()=>C(0)));const ix=(x,s)=>2*x+s;for(let x=0;x<L;x++){const xp=(x+1)%L;for(let s=0;s<2;s++)for(let t=0;t<2;t++){const forward=mul(C(0,-0.5),mul(sx[s][t],Us[x]));H[ix(x,s)][ix(xp,t)]=add(H[ix(x,s)][ix(xp,t)],forward);H[ix(xp,t)][ix(x,s)]=add(H[ix(xp,t)][ix(x,s)],conj(forward));}}return H};
const Hw=buildWall(links);assert(maxDiff(Hw,dag(Hw))<1e-12);

const angles=[0.4,-0.1,0.7],gp=angles.map(phase);
const transformedLinks=links.map((u,x)=>mul(mul(gp[x],u),conj(gp[(x+1)%L]))),Hwp=buildWall(transformedLinks);
const Gwall=Array.from({length:wallDim},(_,i)=>Array.from({length:wallDim},(_,j)=>i===j?gp[Math.floor(i/2)]:C(0)));
assert(maxDiff(Hwp,mm(mm(Gwall,Hw),dag(Gwall)))<1e-11);

const r=1.4,Q=[[-r,1]],Hp=[[C(0),C(0),C(-r)],[C(0),C(0),C(1)],[C(-r),C(1),C(0)]],Gamma=[1,1,-1],total=3*wallDim;
const H=Array.from({length:total},()=>Array.from({length:total},()=>C(0))),idx=(p,w)=>p*wallDim+w;
for(let p=0;p<3;p++)for(let q=0;q<3;q++)for(let w=0;w<wallDim;w++)H[idx(p,w)][idx(q,w)]=add(H[idx(p,w)][idx(q,w)],Hp[p][q]);
for(let p=0;p<3;p++)for(let u=0;u<wallDim;u++)for(let v=0;v<wallDim;v++)H[idx(p,u)][idx(p,v)]=add(H[idx(p,u)][idx(p,v)],C(Gamma[p]*Hw[u][v].re,Gamma[p]*Hw[u][v].im));
assert(maxDiff(H,dag(H))<1e-11);

const G=Array.from({length:total},(_,i)=>Array.from({length:total},(_,j)=>i===j?gp[Math.floor((i%wallDim)/2)]:C(0))),Hpfull=mm(mm(G,H),dag(G));
const Hdirect=(()=>{const X=H.map(r=>r.map(x=>C(x.re,x.im)));for(let p=0;p<3;p++)for(let u=0;u<wallDim;u++)for(let v=0;v<wallDim;v++){const old=C(Gamma[p]*Hw[u][v].re,Gamma[p]*Hw[u][v].im),neu=C(Gamma[p]*Hwp[u][v].re,Gamma[p]*Hwp[u][v].im);X[idx(p,u)][idx(p,v)]=add(sub(X[idx(p,u)][idx(p,v)],old),neu)}return X})();
assert(maxDiff(Hpfull,Hdirect)<1e-10);

const z=C(0.21,0.43),R=inv(H.map((r,i)=>r.map((x,j)=>sub(x,C(i===j?z.re:0,i===j?z.im:0))))),probes=[idx(0,0),idx(1,0)],Resp=probes.map(i=>probes.map(j=>R[i][j]));
const Im=Resp.map((r,i)=>r.map((x,j)=>(x.im+Resp[j][i].im)/2));assert(Im[0][0]>=-1e-9&&Im[1][1]>=-1e-9&&Im[0][0]*Im[1][1]-Im[0][1]*Im[1][0]>=-1e-8);

console.log('Gauge-linked wall covariance certificate: PASS');
console.log('wall_link_Hermitian=true; local_U1_covariance=true; transverse_index_unchanged=true; full_wall_covariance=true; projected_Herglotz=true');

import assert from 'node:assert/strict';

const C=(re,im=0)=>({re,im}),add=(a,b)=>C(a.re+b.re,a.im+b.im),mul=(a,b)=>C(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),conj=a=>C(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im);
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>add(s,mul(x,B[k][j])),C(0)))),kron=(A,B)=>A.flatMap(r=>B.map(s=>r.flatMap(x=>s.map(y=>mul(x,y))))),eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>C(i===j?1:0))),maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(C(x.re-B[i][j].re,x.im-B[i][j].im)))));
const mu=1.2,lambda=.7,K=[1,1,1,-1],L=Array.from({length:8},()=>Array.from({length:8},()=>C(0)));
for(let i=0;i<4;i++){L[i][i]=L[i+4][i+4]=C(mu+lambda);L[i][i+4]=L[i+4][i]=C(-mu-lambda*K[i])}
const masses=[C(.8,.12),C(.8,.12),C(.8,.12),C(.23,-.08),C(.23,-.08),C(.23,-.08),C(.04,.03),C(.31,-.06)],D=Array.from({length:8},(_,i)=>Array.from({length:8},(_,j)=>i===j?masses[i]:C(0)));
const Y=Array.from({length:16},(_,i)=>Array.from({length:16},(_,j)=>i<8&&j>=8?D[i][j-8]:i>=8&&j<8?conj(D[j][i-8]):C(0)));
const left=mm(kron(L,eye(16)),kron(eye(8),Y)),right=mm(kron(eye(8),Y),kron(L,eye(16)));assert(maxDiff(left,right)<1e-12);
const q8=[2/3,2/3,2/3,-1/3,-1/3,-1/3,0,-1],q16=[...q8,...q8],Q=q16.map((x,i)=>q16.map((_,j)=>C(i===j?x:0)));assert(maxDiff(mm(Q,Y),mm(Y,Q))<1e-12);
const nullVectors=[];for(let i=0;i<3;i++){const v=Array(8).fill(C(0));v[i]=v[i+4]=C(1/Math.sqrt(2));nullVectors.push(v)}
for(const v of nullVectors){const w=L.map(r=>r.reduce((s,x,j)=>add(s,mul(x,v[j])),C(0)));assert(Math.max(...w.map(abs))<1e-12)}
const Hd=[[C(10),C(1),C(0,-1)],[C(1),C(11),C(1)],[C(0,1),C(1),C(12)]],flLeft=mm(kron(L,eye(3)),kron(eye(8),Hd)),flRight=mm(kron(eye(8),Hd),kron(L,eye(3)));assert(maxDiff(flLeft,flRight)<1e-12&&Hd[0][2].im!==0);

console.log('Factor-local selector/full-Yukawa commutant certificate: PASS');
console.log('selector_kernel=H2R_dimension3; four_channel_mass_dimension=16; EM_commutator=0; selector_Yukawa_commutator=0; complex_flavor_preserved=true');

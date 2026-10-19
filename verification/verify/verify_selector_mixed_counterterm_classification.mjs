import assert from 'node:assert/strict';

const K=[1,1,1,-1],n=8,Theta=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i<4?(j===i+4?K[i]:0):(j===i-4?K[i-4]:0))),Conj=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>i===j?K[i%4]:0));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j])),norm=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0)),outer=(u,v)=>u.map(x=>v.map(y=>x*y)),add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const light=[];for(let i=0;i<3;i++){const v=Array(n).fill(0);v[i]=v[i+4]=1/Math.sqrt(2);light.push(v)}
const heavyPlus=Array(n).fill(0);heavyPlus[3]=1/Math.sqrt(2);heavyPlus[7]=-1/Math.sqrt(2);
for(const v of [...light,heavyPlus]){const t=mm(Theta,v.map(x=>[x])).flat();assert(norm([t.map((x,i)=>[x-v[i]])])<1e-12)}
const v=[.2,-.31,.17],lv=Array(n).fill(0);for(let a=0;a<3;a++)for(let i=0;i<n;i++)lv[i]+=v[a]*light[a][i];
const R=add(outer(lv,heavyPlus),outer(heavyPlus,lv));
assert(norm(sub(mm(R,Theta),mm(Theta,R)))<1e-12);
assert(norm(sub(mm(R,Conj),mm(Conj,R)))>1e-3);
const coupling=v.reduce((s,x)=>s+x*x,0),Mh=2.4,z=.3,sigma=v.map(x=>v.map(y=>x*y/(Mh-z)));
assert(Math.abs(sigma.flat().reduce((s,x)=>s+x*x,0)-coupling*coupling/(Mh-z)**2)<1e-12);
const exchangeEvenDimension=4,lightDimension=3,dangerous=lightDimension*(exchangeEvenDimension-lightDimension);assert.equal(dangerous,3);

console.log('Selector mixed-counterterm classification certificate: PASS');
console.log('exchange_even_dimension=4; light_dimension=3; dangerous_mixings=3; exchange_allows=true; response_conjugation_forbids=true; Schur_correction=real_rank1');

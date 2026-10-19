import assert from 'node:assert/strict';

const sigma=.9,a=[-1.1,.2,1.4],b=[-.8,.7,2.0];
const overlap=(x,y)=>Math.exp(-((x-y)**2)/(4*sigma*sigma));
const O=a.map(x=>b.map(y=>overlap(x,y)));
const C=Array.from({length:2},(_,i)=>Array.from({length:2},(_,j)=>Math.log(O[i+1][j+1])-Math.log(O[i+1][0])-Math.log(O[0][j+1])+Math.log(O[0][0])));
assert(Math.abs(C[0][0]*C[1][1]-C[0][1]*C[1][0])<1e-12);
for(let i=0;i<2;i++)for(let j=0;j<2;j++)assert(Math.abs(C[i][j]-(a[i+1]-a[0])*(b[j+1]-b[0])/(2*sigma*sigma))<1e-12);

const target=[[.001,.02,.3],[.04,.5,.07],[.8,.09,1.2]],lambda=target.map((r,i)=>r.map((x,j)=>x/O[i][j])),reconstructed=lambda.map((r,i)=>r.map((x,j)=>x*O[i][j]));
assert(Math.max(...target.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-reconstructed[i][j]))))<1e-12);
const Ct=Array.from({length:2},(_,i)=>Array.from({length:2},(_,j)=>Math.log(target[i+1][j+1])-Math.log(target[i+1][0])-Math.log(target[0][j+1])+Math.log(target[0][0])));
assert(Math.abs(Ct[0][0]*Ct[1][1]-Ct[0][1]*Ct[1][0])>1e-3);

const hierarchical=[.7,.08,.002],M=1;
const distances=hierarchical.map(m=>2*sigma*Math.sqrt(Math.log(M/m)));
for(let i=0;i<hierarchical.length;i++)assert(Math.abs(M*overlap(0,distances[i])-hierarchical[i])<1e-12);
const reflected=distances.map(x=>-x);
for(let i=0;i<hierarchical.length;i++)assert(Math.abs(overlap(0,reflected[i])-hierarchical[i])<1e-12);

const det3=M=>M[0][0]*(M[1][1]*M[2][2]-M[1][2]*M[2][1])-M[0][1]*(M[1][0]*M[2][2]-M[1][2]*M[2][0])+M[0][2]*(M[1][0]*M[2][1]-M[1][1]*M[2][0]);
const tr=A=>A.map((r,i)=>r[i]).reduce((x,y)=>x+y,0),transpose=A=>A[0].map((_,j)=>A.map(r=>r[j])),mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0))),sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const Ou=O,Od=a.map(x=>[-1.6,.1,1.8].map(y=>overlap(x,y))),Hu=mm(Ou,transpose(Ou)),Hd=mm(Od,transpose(Od)),comm=sub(mm(Hu,Hd),mm(Hd,Hu));
assert(Math.abs(det3(comm))<1e-12&&Math.abs(tr(mm(mm(comm,comm),comm)))<1e-12);

console.log('Gaussian localization identifiability certificate: PASS');
console.log('log_cross_difference_rank=1; arbitrary_seed_surjective=true; masses_fix_only_absolute_distances=true; real_geometry_CP_invariant=0');

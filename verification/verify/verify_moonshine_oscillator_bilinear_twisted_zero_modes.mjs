import assert from "node:assert/strict";
import fs from "node:fs";

const data=new URL("../../evidence/data/",import.meta.url);
const record=JSON.parse(fs.readFileSync(new URL("moonshine-oscillator-bilinear-twisted-zero-modes-v1.json",data),"utf8"));
const K=JSON.parse(fs.readFileSync(new URL("leech-explicit-k-matrix-v1.json",data),"utf8")).K.map(r=>r.map(BigInt));
const generators=JSON.parse(fs.readFileSync(new URL("leech-catalogue-automorphism-generators-v1.json",data),"utf8")).generators.map(g=>g.map(r=>r.map(BigInt)));
assert.equal(record.schemaVersion,"moonshine-oscillator-bilinear-twisted-zero-modes-v1");
const n=K.length;
const I=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>BigInt(i===j)));
const T=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,i)=>s+x*b[i][j],0n)));
const mulv=(a,v)=>a.map(r=>r.reduce((s,x,i)=>s+x*v[i],0n));
const add=(a,b)=>a.map((r,i)=>r.map((x,j)=>x+b[i][j]));
const scale=(c,a)=>a.map(r=>r.map(x=>c*x));
const outer=(a,b)=>a.map(x=>b.map(y=>x*y));
const basis=I.map((_,i)=>I.map(r=>r[i]));

// Store 8 B_(h,k) as an integral numerator:
// N_(h,k)=4[h(k^T K)+k(h^T K)]+(h^T K k)I.
const numerator=(h,k)=>{
  const hflat=mulv(K,h), kflat=mulv(K,k);
  const inner=h.reduce((s,x,i)=>s+x*kflat[i],0n);
  return add(scale(4n,add(outer(h,kflat),outer(k,hflat))),scale(inner,I));
};

const pairs=[];
for(let i=0;i<n;i++) for(let j=i;j<n;j++) pairs.push([i,j,numerator(basis[i],basis[j])]);
assert.equal(pairs.length,300);
for(const [i,j,N] of pairs) assert.deepEqual(mul(T(N),K),mul(K,N),`self-adjoint pair ${i},${j}`);

let covarianceChecks=0;
for(const G of generators){
  const A=T(G);
  for(const [i,j,N] of pairs){
    const target=numerator(mulv(A,basis[i]),mulv(A,basis[j]));
    assert.deepEqual(mul(A,N),mul(target,A));
    covarianceChecks++;
  }
}

// Exact integral inverse of unimodular K.
const gcd=(a,b)=>{a=a<0n?-a:a;b=b<0n?-b:b;while(b)[a,b]=[b,a%b];return a;};
const norm=(num,den=1n)=>{if(den<0n){num=-num;den=-den;}const d=gcd(num,den);return{num:num/d,den:den/d};};
const qsub=(a,b)=>norm(a.num*b.den-b.num*a.den,a.den*b.den);
const qmul=(a,b)=>norm(a.num*b.num,a.den*b.den);
const qdiv=(a,b)=>norm(a.num*b.den,a.den*b.num);
const aug=K.map((r,i)=>[...r.map(x=>norm(x)),...I[i].map(x=>norm(x))]);
for(let c=0;c<n;c++){
  const p=aug.findIndex((r,i)=>i>=c&&r[c].num!==0n);assert.notEqual(p,-1);[aug[c],aug[p]]=[aug[p],aug[c]];
  const pv=aug[c][c];aug[c]=aug[c].map(x=>qdiv(x,pv));
  for(let r=0;r<n;r++)if(r!==c){const f=aug[r][c];aug[r]=aug[r].map((x,j)=>qsub(x,qmul(f,aug[c][j])));}
}
const Kinv=aug.map(r=>r.slice(n).map(x=>{assert.equal(x.den,1n);return x.num;}));

// 8 o(omega)=sum_ij (K^-1)_ij N_ij /2, using all ordered pairs.
let omega8=Array.from({length:n},()=>Array(n).fill(0n));
for(let i=0;i<n;i++)for(let j=0;j<n;j++) omega8=add(omega8,scale(Kinv[i][j],numerator(basis[i],basis[j])));
// The preceding ordered sum is 16 o(omega), because omega carries 1/2.
assert.deepEqual(omega8,scale(32n,I));
// Hence o(omega)=2I and o(omega/2)=I.

const ground=4096;
assert.equal(record.orthonormalFingerprints.diagonal.fullTrace,(9+23)*ground/8);
assert.equal(record.orthonormalFingerprints.diagonal.fullTraceSquare,(81+23)*ground/64);
assert.equal(record.orthonormalFingerprints.offDiagonal.fullTrace,0);
assert.equal(record.orthonormalFingerprints.offDiagonal.fullTraceSquare,2*ground/4);
assert.equal(covarianceChecks,record.covariance.checks);

console.log(JSON.stringify({status:"PASS",compiledBilinears:pairs.length,carrierDimension:24*ground,covarianceChecks,selfAdjointChecks:pairs.length,conformalZeroMode:"2 I_98304",griessUnitZeroMode:"I_98304",orthonormalFingerprints:record.orthonormalFingerprints,next:record.open}));

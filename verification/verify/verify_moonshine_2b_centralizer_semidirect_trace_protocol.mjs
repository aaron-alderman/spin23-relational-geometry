import assert from "node:assert/strict";
import fs from "node:fs";

const here = new URL("../../evidence/data/", import.meta.url);
const record = JSON.parse(fs.readFileSync(new URL("moonshine-2b-centralizer-semidirect-trace-protocol-v1.json", here), "utf8"));
const Kz = JSON.parse(fs.readFileSync(new URL("leech-explicit-k-matrix-v1.json", here), "utf8")).K.map((r) => r.map(BigInt));
const generators = JSON.parse(fs.readFileSync(new URL("leech-catalogue-automorphism-generators-v1.json", here), "utf8")).generators.map((g) => g.map((r) => r.map(BigInt)));
const seeds = JSON.parse(fs.readFileSync(new URL("leech-minimal-pair-to-pauli-action-v1.json", here), "utf8")).executableCompiler.markedOperators;
assert.equal(record.schemaVersion, "moonshine-2b-centralizer-semidirect-trace-protocol-v1");
const n = Kz.length;
assert.equal(n, 24);

const T = (a) => a[0].map((_, j) => a.map((r) => r[j]));
const mod2 = (x) => Number(((x % 2n) + 2n) % 2n);
const K = Kz.map((r) => r.map(mod2));
const I = Array.from({length:n}, (_, i) => Array.from({length:n}, (_, j) => +(i === j)));
const mul = (a,b) => a.map((r) => b[0].map((_,j) => r.reduce((s,x,i) => s ^ (x & b[i][j]), 0)));
const mulv = (a,v) => a.map((r) => r.reduce((s,x,i) => s ^ (x & v[i]), 0));
const add = (a,b) => a.map((x,i) => x ^ b[i]);
const pair = (a,b) => {
  let s=0;
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) s ^= a[i]&K[i][j]&b[j];
  return s;
};
const q = (v) => {
  let norm=0n;
  for(let i=0;i<n;i++) for(let j=0;j<n;j++) norm += BigInt(v[i])*Kz[i][j]*BigInt(v[j]);
  return Number(((norm/2n)%2n+2n)%2n);
};
const inv = (m) => {
  const a=m.map((r,i)=>[...r,...I[i]]);
  for(let c=0;c<n;c++){
    const p=a.findIndex((r,i)=>i>=c&&r[c]); assert.notEqual(p,-1);
    [a[c],a[p]]=[a[p],a[c]];
    for(let r=0;r<n;r++) if(r!==c&&a[r][c]) a[r]=a[r].map((x,j)=>x^a[c][j]);
  }
  return a.map(r=>r.slice(n));
};
const rank = (m) => {
  const a=m.map(r=>[...r]); let r=0;
  for(let c=0;c<a[0].length&&r<a.length;c++){
    const p=a.findIndex((row,i)=>i>=r&&row[c]);
    if(p<0) continue;
    [a[r],a[p]]=[a[p],a[r]];
    for(let i=0;i<a.length;i++) if(i!==r&&a[i][c]) a[i]=a[i].map((x,j)=>x^a[r][j]);
    r++;
  }
  return r;
};

const remaining=I.map(r=>[...r]); const pairs=[];
while(remaining.length){
  const a=remaining.shift(); const p=remaining.findIndex(v=>pair(a,v)); assert.notEqual(p,-1);
  let [b]=remaining.splice(p,1); pairs.push([a,b]);
  for(let i=0;i<remaining.length;i++){
    let u=remaining[i]; if(pair(u,b))u=add(u,a); if(pair(u,a))u=add(u,b); remaining[i]=u;
  }
}
for(const p of pairs) if(q(p[1])) p[1]=add(p[1],p[0]);
const S=Array.from({length:n},(_,i)=>pairs.flat().map(v=>v[i]));
const Sinv=inv(S);
const J=mul(mul(T(S),K),S);
assert.deepEqual(mul(Sinv,S),I);

const fingerprints=[];
for(const [index,Gz] of generators.entries()){
  const A=T(Gz).map(r=>r.map(mod2));
  const C=mul(mul(Sinv,A),S);
  assert.deepEqual(mul(mul(T(C),J),C),J);
  for(let i=0;i<n;i++){
    const e=I.map(r=>r[i]);
    const x=mulv(Sinv,e);
    assert.deepEqual(mulv(C,x),mulv(Sinv,mulv(A,e)), `seed covariance generator ${index} seed ${i}`);
  }
  const fixedMatrix=C.map((r,i)=>r.map((x,j)=>x^+(i===j)));
  const fixedDimension=n-rank(fixedMatrix);
  const channelTrace=Gz.reduce((s,r,i)=>s+r[i],0n);
  const cliffordTraceMagnitudeUpperBound=2**(fixedDimension/2);
  fingerprints.push({
    generator:index+1,
    channelTrace:Number(channelTrace),
    fixedPauliDimension:fixedDimension,
    fixedPauliLabels:2**fixedDimension,
    cliffordTraceMagnitudeUpperBound,
    fullTraceMagnitudeUpperBound:Math.abs(Number(channelTrace))*cliffordTraceMagnitudeUpperBound
  });
}

assert.equal(seeds,24);
assert.equal(record.carrier.dimension,24*2**12);
assert.equal(record.carrier.normalSubgroupOrder,2**25);
assert.equal(record.exactTraces.identity,98304);
assert.equal(record.exactTraces.centralMinus,-98304);
assert.equal(record.exactTraces.everyNoncentralNormalPauli,0);
if(record.generatorFingerprints.length) assert.deepEqual(record.generatorFingerprints,fingerprints);

console.log(JSON.stringify({status:"PASS",dimension:record.carrier.dimension,markedSeedCovarianceChecks:generators.length*n,generatorFingerprints:fingerprints,boundary:record.notEstablished}));

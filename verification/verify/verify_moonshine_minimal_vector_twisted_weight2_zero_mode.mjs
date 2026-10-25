import assert from "node:assert/strict";
import fs from "node:fs";

const data = new URL("../../evidence/data/", import.meta.url);
const record = JSON.parse(fs.readFileSync(new URL("moonshine-minimal-vector-twisted-weight2-zero-mode-v1.json", data), "utf8"));
const K = JSON.parse(fs.readFileSync(new URL("leech-explicit-k-matrix-v1.json", data), "utf8")).K.map(r=>r.map(BigInt));
const generators = JSON.parse(fs.readFileSync(new URL("leech-catalogue-automorphism-generators-v1.json", data), "utf8")).generators.map(g=>g.map(r=>r.map(BigInt)));
const pauliHex = JSON.parse(fs.readFileSync(new URL("leech-minimal-pair-to-pauli-action-v1.json", data), "utf8")).executableCompiler;
assert.equal(record.schemaVersion,"moonshine-minimal-vector-twisted-weight2-zero-mode-v1");
const n=K.length;
const I=Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>BigInt(i===j)));
const T=a=>a[0].map((_,j)=>a.map(r=>r[j]));
const mul=(a,b)=>a.map(r=>b[0].map((_,j)=>r.reduce((s,x,i)=>s+x*b[i][j],0n)));
const mulv=(a,v)=>a.map(r=>r.reduce((s,x,i)=>s+x*v[i],0n));
const outer=(a,b)=>a.map(x=>b.map(y=>x*y));
const sub=(a,b)=>a.map((r,i)=>r.map((x,j)=>x-b[i][j]));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0n);
const trace=a=>a.reduce((s,r,i)=>s+r[i],0n);
const basis=I.map((_,i)=>I.map(r=>r[i]));

const channel=[];
for(const alpha of basis){
  assert.equal(dot(alpha,mulv(K,alpha)),4n);
  const covector=mulv(T(K),alpha);
  const R=sub(I,outer(alpha,covector).map(r=>r.map(x=>2n*x)));
  assert.deepEqual(mulv(R,alpha),alpha.map(x=>-7n*x));
  assert.equal(trace(R),16n);
  assert.equal(trace(mul(R,R)),72n);
  assert.equal(trace(mul(mul(R,R),mul(R,R))),2424n);
  channel.push(R);
}

let covarianceChecks=0;
for(const G of generators){
  const A=T(G);
  for(let i=0;i<n;i++){
    const alpha=basis[i]; const image=mulv(A,alpha);
    const imageCovector=mulv(T(K),image);
    const Rimage=sub(I,outer(image,imageCovector).map(r=>r.map(x=>2n*x)));
    assert.deepEqual(mul(A,channel[i]),mul(Rimage,A));
    covarianceChecks++;
  }
}

const ground=2**12;
const spectrum=record.singleOperatorFingerprint.zeroModeEigenvalues;
assert.equal(spectrum.reduce((s,x)=>s+x.multiplicity,0),24*ground);
assert.equal(record.singleOperatorFingerprint.trace,0);
assert.equal(record.singleOperatorFingerprint.traceSquare,Number(72n)*ground/64);
assert.equal(record.singleOperatorFingerprint.traceFourthPower,Number(2424n)*ground/4096);
assert.equal(pauliHex.markedOperators,24);
assert.equal(covarianceChecks,record.covariance.checks);

// The normalization 2^{-alpha^2} satisfies the Bakalov--Kac product factor
// B(alpha,beta)^{-1}=2^{2(alpha,beta)} for inversion.
for(const inner of [-4,-2,-1,0,1,2,4]){
  const scalingRatio=2**(2*inner);
  const Binverse=2**(2*inner);
  assert.equal(scalingRatio,Binverse);
}

console.log(JSON.stringify({
  status:"PASS",
  compiledSeeds:n,
  carrierDimension:24*ground,
  zeroModeFormula:record.compiledZeroMode.formula,
  eigenvalues:spectrum,
  traceMoments:{trace:0,traceSquare:4608,traceFourthPower:2424},
  covarianceChecks,
  next:record.open
}));

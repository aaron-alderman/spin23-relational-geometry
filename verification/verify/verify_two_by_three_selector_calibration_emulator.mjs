import assert from "node:assert/strict";

const EPS=1e-9;
const eye=n=>Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const mm=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale=(a,A)=>A.map(r=>r.map(x=>a*x));
const frob=A=>Math.sqrt(A.flat().reduce((s,x)=>s+x*x,0));
const maxAbs=A=>Math.max(...A.flat().map(Math.abs));
const det=A=>A.length===1?A[0][0]:A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const trace=A=>A.reduce((s,r,i)=>s+r[i],0);
const power=(A,n)=>{let P=eye(A.length);for(let i=0;i<n;i++)P=mm(P,A);return P;};
const residual=(A,B)=>frob(add(A,scale(-1,B)))/Math.max(frob(B),EPS);

let state=0x05e1ec70;
const uniform=()=>{state|=0;state=(state+0x6D2B79F5)|0;let t=Math.imul(state^(state>>>15),1|state);t=(t+Math.imul(t^(t>>>7),61|t))^t;return ((t^(t>>>14))>>>0)/4294967296;};
const gaussian=()=>Math.sqrt(-2*Math.log(Math.max(uniform(),1e-12)))*Math.cos(2*Math.PI*uniform());
const tomograph=(M,sigma,shots)=>M.map(r=>r.map(x=>x+Array.from({length:shots},()=>sigma*gaussian()).reduce((a,b)=>a+b,0)/shots));

const c=-.5,s=Math.sqrt(3)/2;
const R2=[[c,-s],[s,c]],H2=scale(-1,eye(2));
const R3=[[0,0,1],[1,0,0],[0,1,0]],H3=scale(-1,[[0,1,0],[1,0,0],[0,0,1]]);
assert.ok(maxAbs(add(power(R2,3),scale(-1,eye(2))))<EPS);
assert.ok(maxAbs(add(power(H2,2),scale(-1,eye(2))))<EPS);
assert.ok(maxAbs(add(power(R3,3),scale(-1,eye(3))))<EPS);
assert.ok(maxAbs(add(power(H3,2),scale(-1,eye(3))))<EPS);
assert.deepEqual([trace(R2),Math.round(det(R2)),trace(H2),Math.round(det(H2))],[-1,1,-2,1]);
assert.deepEqual([trace(R3),Math.round(det(R3)),trace(H3),Math.round(det(H3))],[0,1,-1,1]);

const E=[[3/5,5/13],[4/5,0],[0,12/13]],Et=tr(E);
const sigma=.02,shots=32,trials=500;
const summaries={plus:{correct:0,margins:[]},minus:{correct:0,margins:[]}};
let maxFingerprintError=0;
for(let k=0;k<trials;k++){
  for(const M of [R2,H2,R3,H3]){
    const est=tomograph(M,sigma,shots);
    maxFingerprintError=Math.max(maxFingerprintError,residual(est,M));
  }
  const F=tomograph(E,sigma,shots);
  for(const [name,sign] of [["plus",1],["minus",-1]]){
    const B=tomograph(scale(sign,Et),sigma,shots);
    const rp=residual(B,tr(F)),rm=residual(B,scale(-1,tr(F)));
    const predicted=rp<rm?"plus":"minus";
    if(predicted===name)summaries[name].correct++;
    summaries[name].margins.push(Math.abs(rp-rm));
  }
}
const result=Object.fromEntries(Object.entries(summaries).map(([k,v])=>[k,{accuracy:v.correct/trials,minMargin:Math.min(...v.margins),meanMargin:v.margins.reduce((a,b)=>a+b,0)/v.margins.length}]));
assert.equal(result.plus.accuracy,1);
assert.equal(result.minus.accuracy,1);
assert.ok(maxFingerprintError<.02);

console.log(JSON.stringify({
  status:"PASS",
  protocol:"two-input/three-output selector calibration and reciprocal branch tomography",
  preparations:["two source basis probes","three target basis probes","order-three pulse","order-two pulse","forward channel pulse","reverse channel pulse"],
  exactFingerprints:{two:{R:[-1,1,3],H:[-2,1,2]},three:{R:[0,1,3],H:[-1,1,2]}},
  estimator:"compare normalized reverse-transfer residuals ||B-E^T||/||E|| and ||B+E^T||/||E||",
  noiseBenchmark:{seed:"0x05e1ec70",entryNoiseSigma:sigma,shotsPerMatrixEntry:shots,trials,maxFingerprintError,branches:result},
  decisionRule:"smaller signed-reciprocity residual selects +E^T or -E^T; reject if the residual margin is below the preregistered calibration floor",
  controls:["transpose cable/port labels","reverse endpoint time-reversal parity","blind branch labels","measure detector transfer independently"],
  boundary:"this benchmarks identifiability after physical ports and selector pulses exist; it does not manufacture those operations"
}));

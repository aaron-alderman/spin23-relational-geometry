import assert from "node:assert/strict";
import fs from "node:fs";

const EPS = 1e-9;
const zero = (m,n) => Array.from({length:m},()=>Array(n).fill(0));
const eye = n => Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>+(i===j)));
const tr = A => A[0].map((_,j)=>A.map(r=>r[j]));
const mm = (A,B) => A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const add = (A,B) => A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const scale = (a,A) => A.map(r=>r.map(x=>a*x));
const maxAbs = A => Math.max(...A.flat().map(Math.abs));
const trace = A => A.reduce((s,r,i)=>s+r[i],0);
const det = A => A.length===1 ? A[0][0] : A[0].reduce((s,x,j)=>s+(j%2?-1:1)*x*det(A.slice(1).map(r=>r.filter((_,k)=>k!==j))),0);
const power = (A,n) => { let P=eye(A.length); for(let i=0;i<n;i++) P=mm(P,A); return P; };
const blockDiag = (A,B) => {
  const C=zero(A.length+B.length,A.length+B.length);
  for(let i=0;i<A.length;i++) for(let j=0;j<A.length;j++) C[i][j]=A[i][j];
  for(let i=0;i<B.length;i++) for(let j=0;j<B.length;j++) C[i+A.length][j+A.length]=B[i][j];
  return C;
};
const outer = (u,v) => u.map(x=>v.map(y=>x*y));

const c=-0.5, s=Math.sqrt(3)/2;
const R2=[[c,-s],[s,c]], H2=scale(-1,eye(2));
const R3=[[0,0,1],[1,0,0],[0,1,0]];
const H3=scale(-1,[[0,1,0],[1,0,0],[0,0,1]]);
const R=blockDiag(R2,R3), H=blockDiag(H2,H3);

assert.ok(maxAbs(add(power(R,3),scale(-1,eye(5))))<EPS);
assert.ok(maxAbs(add(power(H,2),scale(-1,eye(5))))<EPS);
assert.ok(Math.abs(trace(R)+1)<EPS && Math.abs(det(R)-1)<EPS);
assert.ok(Math.abs(trace(H)+3)<EPS && Math.abs(det(H)-1)<EPS);

const E=[[3/5,5/13],[4/5,0],[0,12/13]], g=4/5, M=scale(g,E);
const gram=mm(tr(E),E);
assert.ok(maxAbs(add(gram,scale(-1,[[1,3/13],[3/13,1]])))<EPS);
const singularSquared=[16/13,10/13];
const scaledSingularSquared=singularSquared.map(x=>g*g*x);
assert.ok(Math.max(...scaledSingularSquared)<1);

// Explicit SVD of E: right singular vectors are symmetric/antisymmetric.
const rt=Math.sqrt(0.5);
const vp=[rt,rt], vm=[rt,-rt];
const col=(A,j)=>A.map(r=>r[j]);
const mv=(A,v)=>A.map(r=>r.reduce((q,x,j)=>q+x*v[j],0));
const normalize=v=>{const n=Math.hypot(...v);return v.map(x=>x/n);};
const up=normalize(mv(E,vp)), um=normalize(mv(E,vm));
const e1=col(E,0),e2=col(E,1);
const u0=normalize([e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]]);
const cp=Math.sqrt(1-scaledSingularSquared[0]);
const cm=Math.sqrt(1-scaledSingularSquared[1]);
const A=add(scale(cp,outer(vp,vp)),scale(cm,outer(vm,vm)));
let root3=add(scale(cp,outer(up,up)),scale(cm,outer(um,um)));
root3=add(root3,outer(u0,u0));
const D=scale(-1,root3);
const S=zero(5,5);
for(let i=0;i<2;i++) for(let j=0;j<2;j++) S[i][j]=A[i][j];
for(let i=0;i<3;i++) for(let j=0;j<2;j++) {S[i+2][j]=M[i][j];S[j][i+2]=M[i][j];}
for(let i=0;i<3;i++) for(let j=0;j<3;j++) S[i+2][j+2]=D[i][j];
const orthogonalityResidual=maxAbs(add(mm(tr(S),S),scale(-1,eye(5))));
const reciprocityResidual=maxAbs(add(S,scale(-1,tr(S))));
assert.ok(orthogonalityResidual<EPS);
assert.ok(reciprocityResidual<EPS);

// Intensity records erase the signs central to both gates.
const powerMap=A=>A.map(r=>r.map(x=>x*x));
assert.ok(maxAbs(add(powerMap(H),scale(-1,powerMap(scale(-1,H)))))<EPS);
assert.ok(maxAbs(add(powerMap(tr(M)),scale(-1,powerMap(scale(-1,tr(M))))))<EPS);

const ledger=JSON.parse(fs.readFileSync(new URL("../../corpus/programmes/frontier/wave-7/five_channel_microwave_carrier_v1.json",import.meta.url)));
assert.equal(ledger.platform.signalChannels,5);
assert.deepEqual(ledger.platform.sectorSplit,[2,3]);
assert.equal(ledger.channel.nativeBranch,"+transpose");

console.log(JSON.stringify({
  status:"PASS",
  selector:{R:{trace:trace(R),determinant:det(R),order:3},H:{trace:trace(H),determinant:det(H),order:2}},
  channel:{gram,singularSquared,passiveScale:g,scaledSingularSquared},
  dilation:{dimension:5,orthogonalityResidual,reciprocityResidual,forwardShape:[3,2],reverseShape:[2,3]},
  detectorBoundary:"intensity cannot distinguish H from -H or +M^T from -M^T; a calibrated phase reference is mandatory",
  verdict:"a five-channel reciprocal microwave processor can realize the scaled plus-transpose carrier as a passive symmetric orthogonal dilation"
}));


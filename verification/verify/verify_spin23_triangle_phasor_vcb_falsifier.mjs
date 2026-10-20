import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../..");
const data=JSON.parse(readFileSync(path.join(root,"evidence/data/spin23-triangle-phasor-vcb-falsifier.json"),"utf8"));

function jacobi(A){
  const scale=Math.max(...A.flat().map(Math.abs));A=A.map(r=>r.map(x=>x/scale));
  let U=[[1,0,0],[0,1,0],[0,0,1]];
  for(let k=0;k<100;k+=1){
    let p=0,q=1;for(let i=0;i<3;i+=1)for(let j=i+1;j<3;j+=1)if(Math.abs(A[i][j])>Math.abs(A[p][q]))[p,q]=[i,j];
    if(Math.abs(A[p][q])<1e-15)break;
    const phi=.5*Math.atan2(2*A[p][q],A[q][q]-A[p][p]),c=Math.cos(phi),s=Math.sin(phi);
    const app=c*c*A[p][p]-2*s*c*A[p][q]+s*s*A[q][q],aqq=s*s*A[p][p]+2*s*c*A[p][q]+c*c*A[q][q];
    for(let r=0;r<3;r+=1)if(r!==p&&r!==q){const x=A[r][p],y=A[r][q];A[r][p]=A[p][r]=c*x-s*y;A[r][q]=A[q][r]=s*x+c*y;}
    A[p][p]=app;A[q][q]=aqq;A[p][q]=A[q][p]=0;
    for(let r=0;r<3;r+=1){const x=U[r][p],y=U[r][q];U[r][p]=c*x-s*y;U[r][q]=s*x+c*y;}
  }
  const order=[0,1,2].sort((i,j)=>A[i][i]-A[j][j]);
  return {values:order.map(i=>A[i][i]*scale),vectors:U.map(row=>order.map(i=>row[i]))};
}
const C=(re,im=0)=>({re,im}),add=(x,y)=>C(x.re+y.re,x.im+y.im),mul=(x,y)=>C(x.re*y.re-x.im*y.im,x.re*y.im+x.im*y.re),conj=x=>C(x.re,-x.im),abs=x=>Math.hypot(x.re,x.im);
const w=data.inadmissibleReversedOrderBranch,{a,b,c,eta}=w,D=[a+c,a+b,b+c],H=[[0,a,-c],[a,0,b],[-c,b,0]];
const matrix=s=>D.map((d,i)=>D.map((_,j)=>(i===j?d:0)+s*H[i][j]));
const up=jacobi(matrix(-1)),down=jacobi(matrix(eta));
const ratio=e=>(e[1]-e[0])/(e[2]-e[0]);
assert.ok(Math.abs(ratio(up.values)-w.upMassSquaredLocation)<2e-14);
assert.ok(Math.abs(ratio(down.values)-w.downMassSquaredLocation)<2e-14);
const B=down.vectors.map(row=>w.downOrderingZeroBased.map(j=>row[j]));
const phases=[C(1),C(Math.cos(w.alpha),Math.sin(w.alpha)),C(Math.cos(w.beta),Math.sin(w.beta))];
const V=Array.from({length:3},(_,i)=>Array.from({length:3},(_,j)=>up.vectors.reduce((z,row,k)=>add(z,mul(C(row[i]*B[k][j]),phases[k])),C(0))));
const M=V.map(row=>row.map(abs));
assert.ok(Math.max(...M.flatMap((row,i)=>row.map((x,j)=>Math.abs(x-w.mixingMagnitudes[i][j]))))<2e-9);
const J=Math.abs(mul(mul(V[0][0],V[1][1]),mul(conj(V[0][1]),conj(V[1][0]))).im);
assert.ok(Math.abs(J-w.fitted.absoluteJarlskog)<2e-12);
const physicalAfterReversal=1-w.sortedDownLocation;
assert.ok(Math.abs(physicalAfterReversal-w.physicalDownLocationAfterReversal)<1e-15);
assert.ok(Math.abs(physicalAfterReversal-w.downMassSquaredLocation)>.99);
assert.equal(w.orderingCompatibleWithClaimedMassHierarchy,false);
assert.ok(data.claim1480WitnessControl.maximumVcs<data.claim1480WitnessControl.pdgVcs);
assert.equal(data.verdict.reversedOrderNearFitPhysicallyAdmissible,false);
assert.equal(data.verdict.nominalVcbFalsifierWithdrawn,true);
assert.equal(data.verdict.wholeTriangleFamilyExcluded,false);
assert.equal(data.verdict.physicalAdmissionChanged,false);
console.log(`PASS 1481 CORRECTED: the exact phasor bound excludes the claim-1480 witness; the apparent reversed-order near-fit maps rd to 1-rd=${physicalAfterReversal.toFixed(9)} and is not a joined mass/mixing solution.`);

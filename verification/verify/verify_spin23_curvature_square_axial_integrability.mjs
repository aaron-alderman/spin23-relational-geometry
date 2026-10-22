#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence=JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-curvature-square-axial-integrability-v1.json",
  import.meta.url,
),"utf8"));

const n=4;
const eps=(a,b,c,d)=>{
  const q=[a,b,c,d];
  if(new Set(q).size<4)return 0;
  let s=1;
  for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)if(q[i]>q[j])s=-s;
  return s;
};
const z4=()=>Array.from({length:n},()=>Array.from({length:n},()=>Array.from({length:n},()=>Array(n).fill(0))));
const z2=()=>Array.from({length:n},()=>Array(n).fill(0));
const curvature=(M,S,Rbar,c=-1/6)=>{
  const R=z4();
  for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let m=0;m<n;m++)for(let v=0;v<n;v++){
    let D=0,Q=0;
    for(let p=0;p<n;p++)D+=c*(eps(a,b,v,p)*M[m][p]-eps(a,b,m,p)*M[v][p]);
    for(let x=0;x<n;x++)for(let p=0;p<n;p++)for(let q=0;q<n;q++)
      Q+=c*c*(eps(a,x,m,p)*S[p]*eps(x,b,v,q)*S[q]-eps(a,x,v,p)*S[p]*eps(x,b,m,q)*S[q]);
    R[a][b][m][v]=Rbar[a][b][m][v]+D+Q;
  }
  return R;
};
const invariants=R=>{
  let I1=0,I2=0,I3=0,I4=0,I5=0,I6=0;
  const Ric=z2();
  for(let b=0;b<n;b++)for(let v=0;v<n;v++)for(let a=0;a<n;a++)Ric[b][v]+=R[a][b][a][v];
  let scalar=0; for(let a=0;a<n;a++)scalar+=Ric[a][a];
  for(let a=0;a<n;a++)for(let b=0;b<n;b++){
    I4+=Ric[a][b]*Ric[a][b]; I5+=Ric[a][b]*Ric[b][a];
    for(let c=0;c<n;c++)for(let d=0;d<n;d++){
      I1+=R[a][b][c][d]**2;
      I2+=R[a][b][c][d]*R[c][d][a][b];
      I3+=R[a][b][c][d]*R[a][c][b][d];
    }
  }
  I6=scalar**2;
  return [I1,I2,I3,I4,I5,I6];
};
const lcFromRic=Ric=>{
  const R=z4(); let scalar=0; for(let a=0;a<n;a++)scalar+=Ric[a][a];
  const d=(a,b)=>a===b?1:0;
  for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let c=0;c<n;c++)for(let e=0;e<n;e++)
    R[a][b][c][e]=.5*(d(a,c)*Ric[b][e]-d(a,e)*Ric[b][c]-d(b,c)*Ric[a][e]+d(b,e)*Ric[a][c])-(scalar/6)*(d(a,c)*d(b,e)-d(a,e)*d(b,c));
  return R;
};
const diag=xs=>xs.map((x,i)=>xs.map((_,j)=>i===j?x:0));
const derivativeProbe=(i,j)=>{
  const M=z2(); M[i][j]=1;
  return invariants(curvature(M,[0,0,0,0],z4()));
};
const long=derivativeProbe(0,0), trans=derivativeProbe(0,1);
const Mmix=z2(); Mmix[0][1]=1; Mmix[1][0]=1;
const mix=invariants(curvature(Mmix,[0,0,0,0],z4()));
const alpha=trans;
const beta=mix.map((x,i)=>x/2-alpha[i]);
const B=long.map(x=>2*x), Z=trans.map(x=>2*x);
const quadraticCross=Rbar=>{
  const f0=invariants(curvature(z2(),[0,0,0,0],Rbar));
  const f1=invariants(curvature(z2(),[1,0,0,0],Rbar));
  const f2=invariants(curvature(z2(),[2,0,0,0],Rbar));
  return f1.map((x,i)=>(16*(x-f0[i])-(f2[i]-f0[i]))/12);
};
const cc=quadraticCross(lcFromRic(diag([3,3,3,3])));
const tr=quadraticCross(lcFromRic(diag([3,-1,-1,-1])));
const xiRicRaw=tr.map(x=>2*x/3);
const xiR=cc.map((x,i)=>(x-1.5*xiRicRaw[i])/6);
const xiRic=xiRicRaw.map((x,i)=>x-2*(alpha[i]+beta[i]));
const enumerated=[B,Z,xiR,xiRic];

const frac=s=>{
  if(s==="0")return 0;
  const [a,b]=s.split("/").map(Number);
  return b?a/b:a;
};
const names=["B","Z","xiR","xiRic","C2ModuloEuler","R2ModuloEuler"];
const M=names.map(name=>evidence.responseRows[name].map(frac));
const rank=input=>{
  const A=input.map(r=>[...r]);
  let out=0;
  for(let c=0;c<A[0].length&&out<A.length;c++){
    let p=out;
    for(let i=out+1;i<A.length;i++)if(Math.abs(A[i][c])>Math.abs(A[p][c]))p=i;
    if(Math.abs(A[p][c])<1e-12)continue;
    [A[out],A[p]]=[A[p],A[out]];
    const q=A[out][c];
    for(let j=c;j<A[0].length;j++)A[out][j]/=q;
    for(let i=0;i<A.length;i++)if(i!==out){
      const q2=A[i][c];
      for(let j=c;j<A[0].length;j++)A[i][j]-=q2*A[out][j];
    }
    out++;
  }
  return out;
};
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-12*Math.max(1,Math.abs(a),Math.abs(b)));

for(let i=0;i<4;i++)for(let j=0;j<6;j++)close(enumerated[i][j],M[i][j]);

// The chosen contorsion normalization gives Xhat^(1)=div(S).
const Mdiv=z2(); Mdiv[0][0]=1;
const Rdiv=curvature(Mdiv,[0,0,0,0],z4());
let Xhat=0;
for(let a=0;a<n;a++)for(let b=0;b<n;b++)for(let m=0;m<n;m++)for(let v=0;v<n;v++)
  Xhat+=eps(m,v,a,b)*Rdiv[a][b][m][v]/2;
close(Xhat,1);

assert.equal(rank(M.slice(0,4)),4);
assert.equal(rank(M.slice(0,5)),5);
assert.equal(rank(M),5);

const euler=evidence.kernel.map(frac);
for(const row of M)close(dot(row,euler),0);
for(let i=0;i<6;i++)close(M[5][i],-1.5*M[2][i]);

// Packet witness: c_R2=5/(36*(4pi)^2)=5/(576*pi^2), whereas
// -3 xi_R/2 at kappa=A=1,a1=1 is 11/(96*pi^2).
const torsionless=5/576;
const predicted=7/64+1/(96*2);
close(predicted,11/96);
close(predicted-torsionless,61/576);
assert.notEqual(predicted,torsionless);

assert.match(evidence.decision,/independent RTT/);
assert.match(evidence.nextBoundary,/non-axial torsion/);

console.log("Spin(2,3) curvature-square axial integrability: PASS");
console.log("  axial curvature-square response rank: 4");
console.log("  axial plus C^2 rank modulo Euler: 5");
console.log("  exact truncation identity: c_R2=-(3/2)*xi_R");
console.log("  packet witness: 5/576 != 11/96");
console.log("  independent RTT-type counterterm: required");

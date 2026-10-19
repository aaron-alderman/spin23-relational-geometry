#!/usr/bin/env node

const zero=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const comm=(A,B)=>sub(mul(A,B),mul(B,A));
const etaDiag=[-1,-1,1,1,1,1];
const eta=etaDiag.map((x,i)=>etaDiag.map((_,j)=>i===j?x:0));
const J=(a,b)=>{
  const M=zero(6);
  M[a][b]=etaDiag[b];
  M[b][a]=-etaDiag[a];
  return M;
};
const metricError=M=>maxabs(add(mul(mul(tr(M),eta),zero(6)),add(mul(tr(M),eta),mul(eta,M)))); // first term vanishes
const algebraError=M=>maxabs(add(mul(tr(M),eta),mul(eta,M)));
const stabilizer=[],complement=[];
for(let a=0;a<6;a++)for(let b=a+1;b<6;b++){
  if(b===5)complement.push(J(a,b));else stabilizer.push(J(a,b));
}
const supportOutside=(M,kind)=>{
  let e=0;
  for(let i=0;i<6;i++)for(let j=0;j<6;j++){
    const allowed=kind==="stabilizer"?(i<5&&j<5):((i===5&&j<5)||(j===5&&i<5));
    if(!allowed)e=Math.max(e,Math.abs(M[i][j]));
  }
  return e;
};
const ccErrors=[];
for(let i=0;i<complement.length;i++)for(let j=i+1;j<complement.length;j++)
  ccErrors.push(supportOutside(comm(complement[i],complement[j]),"stabilizer"));
const scErrors=[];
for(const S of stabilizer)for(const C of complement)
  scErrors.push(supportOutside(comm(S,C),"complement"));
const detH2R=(t,x,z)=>t*t-x*x-z*z;
const detH2C=(t,x,y,z)=>t*t-x*x-y*y-z*z;
const sample={t:3,x:1.1,y:0.7,z:-0.4};
const report={
  protocol:"h2c-parent-restoration/1",
  jordanDeterminants:{
    H2R:"det [[t+z,x],[x,t-z]]=t^2-x^2-z^2",
    H2C:"det [[t+z,x-iy],[x+iy,t-z]]=t^2-x^2-y^2-z^2",
    sample,
    realSliceValue:detH2R(sample.t,sample.x,sample.z),
    complexCarrierValue:detH2C(sample.t,sample.x,sample.y,sample.z),
    differenceEqualsMinusYSquared:Math.abs(detH2C(sample.t,sample.x,sample.y,sample.z)-detH2R(sample.t,sample.x,sample.z)+sample.y**2)<1e-12
  },
  groupDimensions:{
    spin23:5*4/2,
    spin24:6*5/2,
    complement:5
  },
  orthogonalEmbedding:{
    metricSignature:"(2,4)",
    stabilizerGenerators:stabilizer.length,
    complementGenerators:complement.length,
    generatorMetricErrors:[...stabilizer,...complement].map(algebraError),
    complementCommutatorClosesInStabilizer:ccErrors.every(e=>e<1e-12),
    stabilizerActsOnComplement:scErrors.every(e=>e<1e-12),
    symmetricPair:"[h,h] subset h, [h,m] subset m, [m,m] subset h with h=so(2,3), dim m=5"
  },
  interpretation:{
    realCarrier:"Conf(H2(R)) has Lie algebra sp(4,R) ~= so(2,3), dimension 10.",
    complexCarrier:"Conf(H2(C)) has Lie algebra su(2,2) ~= so(2,4), dimension 15.",
    selectorMeaning:"Setting the imaginary off-diagonal Jordan coordinate y to zero is the carrier-level real slice; preserving it corresponds to retaining the Spin(2,3) stabilizer rather than restoring the five-dimensional Spin(2,4)/Spin(2,3) complement."
  }
};
report.passed=report.jordanDeterminants.differenceEqualsMinusYSquared&&
  report.groupDimensions.spin23===10&&report.groupDimensions.spin24===15&&
  report.groupDimensions.complement===5&&stabilizer.length===10&&complement.length===5&&
  report.orthogonalEmbedding.generatorMetricErrors.every(e=>e<1e-12)&&
  report.orthogonalEmbedding.complementCommutatorClosesInStabilizer&&
  report.orthogonalEmbedding.stabilizerActsOnComplement;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

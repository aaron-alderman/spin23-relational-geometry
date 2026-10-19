#!/usr/bin/env node

const matMul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const flatten=A=>A.flat();
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const A=[
  [[0,0,0],[0,0,-1],[0,1,0]],
  [[0,0,1],[0,0,0],[-1,0,0]],
  [[0,-1,0],[1,0,0],[0,0,0]]
];
const B=[[0,-1],[1,0]];
const columns=K=>{
  const cs=A.map(a=>flatten(matMul(a,K)));
  cs.push(flatten(matMul(K,B)).map(x=>-x));
  return cs;
};
const gram=K=>{
  const cs=columns(K);
  return cs.map(x=>cs.map(y=>dot(x,y)));
};
const determinant=M=>{
  M=M.map(r=>r.slice());let det=1,n=M.length;
  for(let c=0;c<n;c++){
    let p=c;while(p<n&&M[p][c]===0)p++;
    if(p===n)return 0;
    if(p!==c){[M[p],M[c]]=[M[c],M[p]];det=-det;}
    const d=M[c][c];det*=d;
    for(let i=c+1;i<n;i++){
      const f=M[i][c]/d;
      for(let j=c;j<n;j++)M[i][j]-=f*M[c][j];
    }
  }
  return det;
};
const Kiso=[[1,0],[0,1],[0,0]];
const Kaniso=[[2,0],[0,1],[0,0]];
const Miso=gram(Kiso),Maniso=gram(Kaniso);
const report={
  protocol:"locking-gauge-spectrum/1",
  convention:"unit internal and external gauge couplings, unit locking scale",
  isotropicMassMatrix:Miso,
  isotropicEigenvalues:[0,1,1,4],
  masslessGenerator:"T3_internal + T_external",
  anisotropicMassMatrix:Maniso,
  anisotropicDeterminant:determinant(Maniso),
  degreeCount:{
    lockingTensorRealComponents:6,
    isotropicVacuumOrbitGoldstones:3,
    eatenIfBothGroupsGauged:3,
    remainingAmplitudeScalars:3,
    standardModelHiggsPhysicalScalars:1
  },
  conclusion:[
    "The isotropic lock gives three massive and one massless gauge combination.",
    "The anisotropic lock gives no massless continuous combination.",
    "An unconstrained 3x2 locking field leaves three physical amplitude scalars, two more than the minimal Standard Model Higgs sector."
  ]
};
report.passed=JSON.stringify(Miso)===JSON.stringify([[1,0,0,0],[0,1,0,0],[0,0,2,-2],[0,0,-2,2]])&&
  report.anisotropicDeterminant>0&&report.degreeCount.remainingAmplitudeScalars===3;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

#!/usr/bin/env node

const Z=(re=0,im=0)=>({re,im});
const mul=(a,b)=>Z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const conj=a=>Z(a.re,-a.im);
const scale=(r,a)=>Z(r*a.re,r*a.im);
const abs=a=>Math.hypot(a.re,a.im);
const residue=(a,b)=>mul(conj(a),b);
const aligned=cs=>{
  for(let i=0;i<cs.length;i++)for(let j=i+1;j<cs.length;j++)
    if(Math.abs(mul(cs[i],conj(cs[j])).im)>1e-12)return false;
  return true;
};
const rankOneDet=(a,b)=>{
  const aa=abs(a)**2,bb=abs(b)**2,c=residue(a,b);
  return aa*bb-abs(c)**2;
};
const a=[Z(1),Z(2),Z(-0.7)];
const bEven=[Z(3),Z(-1),Z(0.2)];
const bOdd=[Z(0,3),Z(0,-1),Z(0,0.2)];
const delta=0.63,phase=Z(Math.cos(-delta),Math.sin(-delta));
const lambdas=[2,-0.5,1.7];
const bSpurion=a.map((x,i)=>scale(lambdas[i],mul(phase,x)));
const bGeneric=[Z(1),Z(0,1),Z(1,1)];
const families={
  antiunitarySameParity:a.map((x,i)=>residue(x,bEven[i])),
  antiunitaryOppositeParity:a.map((x,i)=>residue(x,bOdd[i])),
  commonSpurion:a.map((x,i)=>residue(x,bSpurion[i])),
  hermitianPositiveButGeneric:a.map((x,i)=>residue(x,bGeneric[i]))
};
const report={
  protocol:"antiunitary-spectral-alignment/1",
  theorem:"If an antiunitary Theta fixes the vacuum, commutes with every spectral projector and gives O_i parities eta_i, then c_E*=eta_1 eta_2 c_E. All c_E are real for equal parity or purely imaginary for opposite parity.",
  antiunitaryFamilies:{
    sameParityResidues:families.antiunitarySameParity,
    sameParityAligned:aligned(families.antiunitarySameParity),
    oppositeParityResidues:families.antiunitaryOppositeParity,
    oppositeParityAligned:aligned(families.antiunitaryOppositeParity)
  },
  commonSpurion:{
    relation:"b_E=exp(-i delta) lambda_E a_E with real lambda_E",
    delta,
    residues:families.commonSpurion,
    aligned:aligned(families.commonSpurion)
  },
  insufficiencyCounterexample:{
    residues:families.hermitianPositiveButGeneric,
    aligned:aligned(families.hermitianPositiveButGeneric),
    rankOneResidueDeterminants:a.map((x,i)=>rankOneDet(x,bGeneric[i])),
    meaning:"Hermitian positive rank-one spectral matrices allow unrelated cross phases."
  },
  physicsGate:"A full antiunitary symmetry is sufficient but may conflict with flavor CP. A common real spurion can align only the flavor-singlet cross response without making the entire flavor algebra real."
};
report.passed=report.antiunitaryFamilies.sameParityAligned&&
  report.antiunitaryFamilies.oppositeParityAligned&&report.commonSpurion.aligned&&
  !report.insufficiencyCounterexample.aligned&&
  report.insufficiencyCounterexample.rankOneResidueDeterminants.every(x=>Math.abs(x)<1e-12);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

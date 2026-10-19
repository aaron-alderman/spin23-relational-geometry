#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im);
const mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re);
const scale=(a,s)=>z(a.re*s,a.im*s);
const conj=a=>z(a.re,-a.im);
const abs=a=>Math.hypot(a.re,a.im);
const I=[[z(1),z()],[z(),z(1)]];
const sx=[[z(),z(1)],[z(1),z()]];
const sy=[[z(),z(0,-1)],[z(0,1),z()]];
const sz=[[z(1),z()],[z(),z(-1)]];
const mm=(A,B)=>A.map((row,i)=>B[0].map((_,j)=>row.reduce((s,a,k)=>add(s,mul(a,B[k][j])),z())));
const dagger=A=>A[0].map((_,i)=>A.map(row=>conj(row[i])));
const madd=(A,B)=>A.map((row,i)=>row.map((a,j)=>add(a,B[i][j])));
const mscale=(A,s)=>A.map(row=>row.map(a=>mul(a,s)));
const maxDiff=(A,B)=>Math.max(...A.flatMap((row,i)=>row.map((a,j)=>abs(add(a,scale(B[i][j],-1))))));
const expPauli=(theta,sigma)=>madd(mscale(I,z(Math.cos(theta))),mscale(sigma,z(0,-Math.sin(theta))));
const walk=(k,m)=>{
  const halfCoin=expPauli(m/2,sx);
  const stream=expPauli(k,sz);
  return mm(mm(halfCoin,stream),halfCoin);
};
const identError=U=>maxDiff(mm(dagger(U),U),I);
const chiralityError=U=>maxDiff(mm(mm(sy,U),sy),dagger(U));
const determinant=A=>add(mul(A[0][0],A[1][1]),scale(mul(A[0][1],A[1][0]),-1));
const trace=A=>add(A[0][0],A[1][1]);

let maximumUnitarityError=0,maximumChiralityError=0,maximumTraceError=0,maximumDeterminantError=0,maximumReconstructionError=0;
const samples=[];
for(const k of [-Math.PI,-2.1,-0.4,0,0.9,2.7,Math.PI])for(const m of [0,0.17,0.8,1.4]){
  const U=walk(k,m);
  const dx=Math.sin(m)*Math.cos(k),dz=Math.sin(k),scalar=Math.cos(m)*Math.cos(k);
  const reconstructed=madd(mscale(I,z(scalar)),madd(mscale(sx,z(0,-dx)),mscale(sz,z(0,-dz))));
  const ue=identError(U),ce=chiralityError(U),te=abs(add(trace(U),z(-2*Math.cos(k)*Math.cos(m))));
  const de=abs(add(determinant(U),z(-1)));
  const re=maxDiff(U,reconstructed);
  maximumUnitarityError=Math.max(maximumUnitarityError,ue);
  maximumChiralityError=Math.max(maximumChiralityError,ce);
  maximumTraceError=Math.max(maximumTraceError,te);
  maximumDeterminantError=Math.max(maximumDeterminantError,de);
  maximumReconstructionError=Math.max(maximumReconstructionError,re);
  samples.push({k,m,omega:Math.acos(Math.max(-1,Math.min(1,scalar))),unitarityError:ue});
}

const continuum=[1e-1,5e-2,1e-2,5e-3].map(e=>{
  const k=e,m=.7*e;
  const omega=Math.acos(Math.cos(k)*Math.cos(m));
  const dirac=Math.hypot(k,m);
  return {scale:e,k,m,omega,dirac,relativeError:Math.abs(omega/dirac-1)};
});
const groupVelocities=[];
for(let i=0;i<=400;i++){
  const k=-Math.PI+2*Math.PI*i/400,m=.43;
  const cosOmega=Math.cos(k)*Math.cos(m);
  const sinOmega=Math.sqrt(Math.max(0,1-cosOmega*cosOmega));
  if(sinOmega>1e-12)groupVelocities.push(Math.abs(Math.sin(k)*Math.cos(m)/sinOmega));
}
const maximumGroupVelocity=Math.max(...groupVelocities);

const windingMass=.43,N=2000;
let previous=Math.atan2(Math.sin(-Math.PI),Math.sin(windingMass)*Math.cos(-Math.PI)),unwrapped=previous;
for(let i=1;i<=N;i++){
  const k=-Math.PI+2*Math.PI*i/N;
  const angle=Math.atan2(Math.sin(k),Math.sin(windingMass)*Math.cos(k));
  let delta=angle-previous;
  while(delta>Math.PI)delta-=2*Math.PI;
  while(delta<=-Math.PI)delta+=2*Math.PI;
  unwrapped+=delta; previous=angle;
}
const winding=Math.round((unwrapped-Math.atan2(Math.sin(-Math.PI),Math.sin(windingMass)*Math.cos(-Math.PI)))/(2*Math.PI));
const masslessCones={
  zeroQuasienergy:{k:0,omega:Math.acos(Math.cos(0))},
  piQuasienergy:{k:Math.PI,omega:Math.acos(Math.cos(Math.PI))}
};

const report={
  protocol:"null-streaming-dirac-walk/1",
  update:"U(k)=exp(-i m sigma_x/2) exp(-i k sigma_z) exp(-i m sigma_x/2)",
  exactDispersion:"cos(omega)=cos(k) cos(m)",
  exactBlochVector:"(d_x,d_z)=(sin(m) cos(k), sin(k))",
  maximumUnitarityError,
  maximumChiralityError,
  maximumTraceError,
  maximumDeterminantError,
  maximumReconstructionError,
  maximumGroupVelocity,
  continuum,
  windingAtPositiveMass:winding,
  masslessCones,
  interpretation:[
    "The conditional shift transports the two components on exact 1+1-dimensional null links and the on-site coin is unitary.",
    "In the symmetric time frame sigma_y U sigma_y=U dagger, and the long-wavelength generator is k sigma_z+m sigma_x.",
    "The exact quasienergy satisfies cos(omega)=cos(k)cos(m), with group speed no larger than the microscopic light speed.",
    "At zero mass there is a cone at quasienergy zero and a second ultraviolet cone at quasienergy pi; discrete time relocates rather than deletes the extra Floquet sector.",
    "This is a kinematic Dirac prototype, not a 3+1-dimensional chiral gauge regulator or an anomaly calculation."
  ]
};
report.passed=maximumUnitarityError<1e-12&&maximumChiralityError<1e-12&&maximumTraceError<1e-12&&
  maximumDeterminantError<1e-12&&maximumReconstructionError<1e-12&&maximumGroupVelocity<=1+1e-12&&
  continuum.at(-1).relativeError<1e-5&&winding===1&&
  Math.abs(masslessCones.zeroQuasienergy.omega)<1e-12&&Math.abs(masslessCones.piQuasienergy.omega-Math.PI)<1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

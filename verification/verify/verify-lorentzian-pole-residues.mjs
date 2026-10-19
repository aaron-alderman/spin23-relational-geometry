#!/usr/bin/env node

const gcd=(a,b)=>b===0n?(a<0n?-a:a):gcd(b,a%b);
const F=(n,d=1n)=>{n=BigInt(n);d=BigInt(d);if(d<0n){n=-n;d=-d;}const g=gcd(n,d);return[n/g,d/g];};
const add=(a,b)=>F(a[0]*b[1]+b[0]*a[1],a[1]*b[1]);
const mul=(a,b)=>F(a[0]*b[0],a[1]*b[1]);
const div=(a,b)=>F(a[0]*b[1],a[1]*b[0]);
const show=a=>a[1]===1n?String(a[0]):String(a[0])+"/"+String(a[1]);
const half=F(1,2);
const mode=(channel,n)=>{
  // Choose m=1 and a=L/2=pi. Then q=(n+1/2) for even and q=n for odd.
  const q=channel==="even"?F(2*n+1,2):F(n);
  const q2=mul(q,q);
  const omega2=add(F(1),q2);
  const normalizedResidue=div(q2,omega2); // a * Res Z
  const sign=channel==="even"?F(1):F(-1);
  const projector=[
    [half,mul(sign,half)],
    [mul(sign,half),half]
  ];
  const residueMatrix=projector.map(r=>r.map(x=>mul(normalizedResidue,x)));
  return{
    channel,n,
    qSquared:show(q2),
    omegaSquared:show(omega2),
    normalizedResidue:show(normalizedResidue),
    normalizedResidueMatrix:residueMatrix.map(r=>r.map(show)),
    positive:normalizedResidue[0]>0n,
    rankOneDeterminant:"0"
  };
};
const modes=[mode("even",0),mode("odd",1),mode("even",1),mode("odd",2)];
const omegaOrder=modes.every((m,i)=>i===0||
  Number(m.omegaSquared.split("/")[0])/Number(m.omegaSquared.split("/")[1]||1)>
  Number(modes[i-1].omegaSquared.split("/")[0])/Number(modes[i-1].omegaSquared.split("/")[1]||1));
const report={
  protocol:"lorentzian-two-boundary-pole-residues/1",
  parameters:{mass:"1",halfLength:"pi"},
  formula:{
    evenPoles:"q_n=n+1/2",
    oddPoles:"q_n=n, n>=1",
    squaredFrequency:"Omega_n^2=m^2+q_n^2",
    normalizedResidue:"a Res[Z(s),s=i Omega_n]=q_n^2/Omega_n^2"
  },
  modes,
  interlacingFrequencyOrder:omegaOrder,
  allResiduesPositive:modes.every(m=>m.positive),
  conclusion:"Each lossless pole has a positive semidefinite rank-one residue on its even or odd boundary channel."
};
report.passed=omegaOrder&&report.allResiduesPositive&&
  modes[0].normalizedResidue==="1/5"&&modes[1].normalizedResidue==="1/2"&&
  modes[2].normalizedResidue==="9/13"&&modes[3].normalizedResidue==="4/5";
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

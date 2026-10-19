#!/usr/bin/env node

const g=3,gE=4,k=1;
const blockFactor=2*k*k;
const neutral=[
  [blockFactor*g*g,-blockFactor*g*gE],
  [-blockFactor*g*gE,blockFactor*gE*gE]
];
const mul=(A,v)=>A.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const eq=(a,b)=>a.every((x,i)=>x===b[i]);
const photon=[gE,g];
const massive=[g,-gE];
const normSquared=g*g+gE*gE;
const report={
  protocol:"locking-gauge-mixing/1",
  parameters:{g,gExternal:gE,k},
  chargedInternalMassSquared:[g*g*k*k,g*g*k*k],
  neutralMassMatrix:neutral,
  neutralEigenvalues:[0,blockFactor*normSquared],
  photonDirectionUnnormalized:photon,
  massiveDirectionUnnormalized:massive,
  mixing:{
    sinTheta:gE/Math.sqrt(normSquared),
    cosTheta:g/Math.sqrt(normSquared),
    tanTheta:gE/g,
    diagonalCoupling:g*gE/Math.sqrt(normSquared)
  },
  unbrokenGenerator:"Q_candidate=T3+T_external",
  hyperchargeGate:"T_external must act on every matter multiplet with its observed Y; this is not established by the locking field.",
  checks:{
    photonNull:eq(mul(neutral,photon),[0,0]),
    massiveEigen:eq(mul(neutral,massive),massive.map(x=>x*blockFactor*normSquared))
  }
};
report.passed=report.checks.photonNull&&report.checks.massiveEigen&&
  report.neutralEigenvalues[1]===50&&report.mixing.diagonalCoupling===12/5;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

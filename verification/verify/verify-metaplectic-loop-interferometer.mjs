#!/usr/bin/env node

const zero=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const I2=[[1,0],[0,1]],Z=zero(2);
const block=(A,B,C,D)=>[[...A[0],...B[0]],[...A[1],...B[1]],[...C[0],...D[0]],[...C[1],...D[1]]];
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const sub=(A,B)=>A.map((r,i)=>r.map((x,j)=>x-B[i][j]));
const maxabs=A=>Math.max(...A.flat().map(Math.abs));
const J=block(Z,I2,[[-1,0],[0,-1]],Z);
const phasePlane=(mode,theta)=>{
  const c=Math.cos(theta),s=Math.sin(theta);
  const A=[[1,0],[0,1]],B=zero(2),C=zero(2),D=[[1,0],[0,1]];
  A[mode][mode]=c;D[mode][mode]=c;B[mode][mode]=s;C[mode][mode]=-s;
  return block(A,B,C,D);
};
const symplecticError=G=>maxabs(sub(mul(mul(tr(G),J),G),J));
const endpoint0=phasePlane(0,0),endpoint1=phasePlane(0,2*Math.PI);
const amplitudes=(phaseA,phaseB)=>{
  const plus={re:(phaseA.re+phaseB.re)/2,im:(phaseA.im+phaseB.im)/2};
  const minus={re:(phaseA.re-phaseB.re)/2,im:(phaseA.im-phaseB.im)/2};
  return {plusProbability:plus.re**2+plus.im**2,minusProbability:minus.re**2+minus.im**2};
};
const plusPhase={re:1,im:0},minusPhase={re:-1,im:0};
const report={
  protocol:"metaplectic-loop-interferometer/1",
  classicalPaths:{
    gamma0:"constant loop at I4",
    gamma1:"2pi rotation of one canonical phase plane",
    gamma0Endpoint:endpoint0,
    gamma1Endpoint:endpoint1,
    endpointError:maxabs(sub(endpoint0,endpoint1)),
    sampleSymplecticErrors:[0,0.4,1.7,Math.PI,2*Math.PI].map(t=>symplecticError(phasePlane(0,t))),
    sameJordanEndpoint:true
  },
  metaplecticLifts:{
    gamma0:"+I",
    gamma1:"-I",
    source:"exp[-i 2pi(N+1/2)]=-I for one oscillator plane",
    relativePhase:Math.PI
  },
  interferometer:{
    initialPathState:"(|0>+|1>)/sqrt(2)",
    equalLiftOutputs:amplitudes(plusPhase,plusPhase),
    oddMaslovOutputs:amplitudes(plusPhase,minusPhase),
    observation:"The odd-winding loop switches the recombined output port for every internal state."
  },
  braidGate:"The observable applies to the squared braid center only after a physical braid-to-Sp(4) path is specified and shown to have odd Maslov parity. Endpoint matrices alone do not supply this.",
  hopfGate:"A comparison with helicity Berry holonomy requires a canonical map between the momentum-space loop and this phase-space loop."
};
report.passed=report.classicalPaths.endpointError<1e-12&&
  report.classicalPaths.sampleSymplecticErrors.every(e=>e<1e-12)&&
  report.interferometer.equalLiftOutputs.plusProbability>1-1e-12&&
  report.interferometer.oddMaslovOutputs.minusProbability>1-1e-12;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

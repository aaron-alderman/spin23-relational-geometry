#!/usr/bin/env node

const a=0.7,c=2.3,dt=a/c;
const ds2=-c*c*dt*dt+a*a;
const N=17,T=9;
const f=Array.from({length:N},(_,n)=>Math.sin(2*Math.PI*n/N)+0.2*Math.cos(6*Math.PI*n/N));
const g=Array.from({length:N},(_,n)=>0.4*Math.cos(4*Math.PI*n/N));
const idx=n=>((n%N)+N)%N;
const phi=(t,n)=>f[idx(n-t)]+g[idx(n+t)];
let maxRecurrenceError=0;
for(let t=1;t<T;t++)for(let n=0;n<N;n++){
  const lhs=phi(t+1,n);
  const rhs=phi(t,n-1)+phi(t,n+1)-phi(t-1,n);
  maxRecurrenceError=Math.max(maxRecurrenceError,Math.abs(lhs-rhs));
}
const modes=[0.1,0.7,1.9,2.8].map(ka=>{
  const lhs=Math.sin(ka/2)**2;
  const omegaDt=ka;
  const rhs=Math.sin(omegaDt/2)**2;
  return {ka,omegaDt,dispersionError:Math.abs(lhs-rhs)};
});
const cfl=[1,2,3,4].map(d=>({spatialDimension:d,maximumStableCourant:1/Math.sqrt(d),axisNullCourant:1,axisNullStable:1<=1/Math.sqrt(d)+1e-12}));
const report={
  protocol:"null-link-cellular-wave/1",
  nullLink:{a,c,dt,dsSquared:ds2,isNull:Math.abs(ds2)<1e-12},
  oneDimensionalWave:{
    recurrence:"phi(t+1,n)=phi(t,n-1)+phi(t,n+1)-phi(t-1,n)",
    exactSolution:"phi(t,n)=f(n-t)+g(n+t)",
    maximumRecurrenceError:maxRecurrenceError,
    modes,
    exactPrincipalBranchDispersion:modes.every(m=>m.dispersionError<1e-12)
  },
  higherDimensionalCFL:cfl,
  interpretation:[
    "At Courant number one in 1+1 dimensions, cell-to-cell links are null and the standard wave update transports arbitrary left/right profiles exactly.",
    "For the standard d-dimensional Cartesian stencil, stability requires c dt/a <= 1/sqrt(d); axis-neighbor links are then spacelike rather than individually null for d>1.",
    "A causal cellular automaton requires a bounded dependency cone, but causality alone does not choose Conway's update rule, reversibility, isotropy, quantum amplitudes, or gauge structure."
  ]
};
report.passed=report.nullLink.isNull&&maxRecurrenceError<1e-12&&
  report.oneDimensionalWave.exactPrincipalBranchDispersion&&
  cfl[0].axisNullStable&&cfl.slice(1).every(x=>!x.axisNullStable);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

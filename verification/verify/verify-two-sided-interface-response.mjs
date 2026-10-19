#!/usr/bin/env node

const X=[[2,1],[1,2]];
const q=[3,-1];
const mv=(a,v)=>a.map(r=>r.reduce((s,x,i)=>s+x*v[i],0));
const dot=(a,b)=>a.reduce((s,x,i)=>s+x*b[i],0);
const p=mv(X,q);
const action=dot(q,p)/2;
const det=X[0][0]*X[1][1]-X[0][1]*X[1][0];
const report={
  protocol:"two-sided-interface-response/1",
  boundaryChannels:["left","right"],
  responseMatrix:X,
  independentRelations:["left self-response","cross-response","right self-response"],
  reciprocal:X[0][1]===X[1][0],
  positiveDefinite:X[0][0]>0&&det>0,
  eigenResponses:[1,3],
  sampleBoundaryValue:q,
  sampleFlux:p,
  sampleOnShellQuadraticAction:action,
  gradientMatchesFlux:p[0]===2*q[0]+q[1]&&p[1]===q[0]+2*q[1],
};
report.passed=report.reciprocal&&report.positiveDefinite&&report.gradientMatchesFlux&&action===7;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

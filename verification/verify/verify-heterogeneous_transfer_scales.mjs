#!/usr/bin/env node

const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const T=(m,L)=>{
  const c=Math.cosh(m*L),s=Math.sinh(m*L);
  return [[c,s/m],[m*s,c]];
};
const I=[[1,0],[0,1]];
const product=segments=>segments.reduce((R,s)=>mul(T(s.m,s.L),R),I);
const scales=(M,totalL)=>{
  const [a,b]=M[0],[c,d]=M[1];
  const X=[[a/b,-1/b],[-1/b,d/b]];
  return {
    transfer:M,
    transferDeterminant:det(M),
    response:X,
    responseDeterminant:det(X),
    determinantScale:Math.sqrt(det(X)),
    floquetScale:Math.acosh((a+d)/2)/totalL,
    trace:a+d,
    b,c
  };
};
const homogeneous=[{m:1.4,L:0.3},{m:1.4,L:0.8},{m:1.4,L:1.1}];
const heterogeneous=[{m:1,L:0.6},{m:2,L:0.9},{m:0.7,L:0.5}];
const split=heterogeneous.flatMap(s=>[{m:s.m,L:s.L*0.37},{m:s.m,L:s.L*0.63}]);
const total=s=>s.reduce((x,y)=>x+y.L,0);
const h=scales(product(homogeneous),total(homogeneous));
const q=scales(product(heterogeneous),total(heterogeneous));
const qSplit=scales(product(split),total(split));
const reversed=scales(product([...heterogeneous].reverse()),total(heterogeneous));
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const report={
  protocol:"heterogeneous-transfer-scales/1",
  convention:"T maps (q,p) across each Euclidean segment; total transfer is ordered multiplication.",
  homogeneous:{
    segments:homogeneous,
    ...h,
    bothScalesEqualMass:Math.abs(h.determinantScale-1.4)<1e-12&&Math.abs(h.floquetScale-1.4)<1e-12
  },
  heterogeneous:{
    segments:heterogeneous,
    ...q,
    splitRefinement:{
      segments:split,
      transferError:maxerr(q.transfer,qSplit.transfer),
      determinantScaleError:Math.abs(q.determinantScale-qSplit.determinantScale),
      floquetScaleError:Math.abs(q.floquetScale-qSplit.floquetScale)
    },
    scalesDiffer:Math.abs(q.determinantScale-q.floquetScale)>1e-4,
    interpretation:"sqrt(det X)=sqrt(c/b) and arcosh(tr T/2)/L are distinct subdivision-invariant generalizations."
  },
  reversal:{
    reversedSegments:[...heterogeneous].reverse(),
    determinantScale:reversed.determinantScale,
    floquetScale:reversed.floquetScale,
    determinantScaleInvariant:Math.abs(q.determinantScale-reversed.determinantScale)<1e-12,
    floquetScaleInvariant:Math.abs(q.floquetScale-reversed.floquetScale)<1e-12
  },
  conclusion:"Heterogeneous free interfaces admit at least two natural invariant scales. Homogeneity makes them coincide; without an extra physical criterion normalization is nonunique."
};
report.passed=Math.abs(h.transferDeterminant-1)<1e-12&&report.homogeneous.bothScalesEqualMass&&
  Math.abs(q.transferDeterminant-1)<1e-12&&
  qSplit.transferDeterminant>0&&
  report.heterogeneous.splitRefinement.transferError<1e-12&&
  report.heterogeneous.splitRefinement.determinantScaleError<1e-12&&
  report.heterogeneous.splitRefinement.floquetScaleError<1e-12&&
  report.heterogeneous.scalesDiffer&&report.reversal.determinantScaleInvariant&&
  report.reversal.floquetScaleInvariant;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

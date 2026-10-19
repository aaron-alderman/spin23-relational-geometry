#!/usr/bin/env node

const X=(m,L)=>{
  const s=Math.sinh(m*L),c=Math.cosh(m*L);
  return [[m*c/s,-m/s],[-m/s,m*c/s]];
};
const det=A=>A[0][0]*A[1][1]-A[0][1]*A[1][0];
const glue=(A,B)=>{
  const s=A[1][1]+B[0][0];
  return [
    [A[0][0]-A[0][1]*A[1][0]/s,-A[0][1]*B[0][1]/s],
    [-B[1][0]*A[1][0]/s,B[1][1]-B[1][0]*B[0][1]/s]
  ];
};
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const m=1.4,lengths=[0.31,0.77,1.2,0.48,0.95];
const segments=lengths.map(L=>X(m,L));
let sewn=segments[0],total=lengths[0];
const stages=[{totalLength:total,determinant:det(sewn),directError:maxerr(sewn,X(m,total))}];
for(let i=1;i<segments.length;i++){
  sewn=glue(sewn,segments[i]);total+=lengths[i];
  stages.push({totalLength:total,determinant:det(sewn),directError:maxerr(sewn,X(m,total))});
}
const differentMass=glue(X(1,0.8),X(2,0.8));
const report={
  protocol:"dtn-determinant-gluing-scale/1",
  homogeneousBulk:{
    mass:m,
    segmentLengths:lengths,
    stages,
    finalSewn:sewn,
    finalDirect:X(m,total),
    everyDeterminantEqualsMassSquared:stages.every(s=>Math.abs(s.determinant-m*m)<1e-11),
    everyStageEqualsDirectInterval:stages.every(s=>s.directError<1e-11),
    normalizationAtEveryStage:stages.map(s=>Math.sqrt(s.determinant))
  },
  heterogeneousWarning:{
    masses:[1,2],
    sewnResponse:differentMass,
    determinant:det(differentMass),
    notEqualToEitherMassSquared:Math.abs(det(differentMass)-1)>1e-6&&Math.abs(det(differentMass)-4)>1e-6,
    meaning:"The invariant scale requires one homogeneous bulk operator; interfaces between different masses need a new matching law."
  },
  conclusion:"For arbitrary subdivision of one homogeneous massive interval, Schur gluing preserves X(m,sum L_i) and sqrt(det X)=m exactly."
};
report.passed=report.homogeneousBulk.everyDeterminantEqualsMassSquared&&
  report.homogeneousBulk.everyStageEqualsDirectInterval&&
  report.heterogeneousWarning.notEqualToEitherMassSquared;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

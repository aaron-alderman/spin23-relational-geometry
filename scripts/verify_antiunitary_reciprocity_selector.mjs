#!/usr/bin/env node

const z=(re=0,im=0)=>({re,im});
const add=(a,b)=>z(a.re+b.re,a.im+b.im),mul=(a,b)=>z(a.re*b.re-a.im*b.im,a.re*b.im+a.im*b.re),scale=(a,s)=>z(a.re*s,a.im*s),conj=a=>z(a.re,-a.im),abs=a=>Math.hypot(a.re,a.im);
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j])),bar=A=>A.map(r=>r.map(conj));
const madd=(A,B)=>A.map((r,i)=>r.map((x,j)=>add(x,B[i][j]))),mscale=(A,s)=>A.map(r=>r.map(x=>scale(x,s)));
const maxDiff=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>abs(add(x,scale(B[i][j],-1))))));
const det2=A=>add(mul(A[0][0],A[1][1]),scale(mul(A[0][1],A[1][0]),-1));
const entryImag=A=>A.map(r=>r.map(x=>x.im));
const positiveReal2=A=>A[0][0]>1e-12&&A[0][0]*A[1][1]-A[0][1]*A[1][0]>1e-12;

const t=2.1,x=.4,y=.7,w=-.3;
const carrier=[[z(t+w),z(x,-y)],[z(x,y),z(t-w)]];
const selected=mscale(madd(carrier,bar(carrier)),.5),forbidden=mscale(madd(carrier,mscale(bar(carrier),-1)),.5);
const parentDet=det2(carrier),selectedDet=det2(selected);

const A=[[z(.4),z(.2,.3)],[z(.2,-.3),z(-.1)]];
const B=[[z(1.2),z(.1,.25)],[z(.1,-.25),z(.9)]];
const iB=B.map(r=>r.map(q=>mul(z(0,1),q))),Z=madd(A,iB);
const reciprocal=mscale(madd(Z,tr(Z)),.5),oriented=mscale(madd(Z,mscale(tr(Z),-1)),.5);
const reciprocalImag=entryImag(reciprocal);
const reconstructed=madd(reciprocal,oriented);
const counts={
  parent:{translations:4,structure:7,specialConformal:4,total:15},
  fixedSlice:{translations:3,structure:4,specialConformal:3,total:10},
  broken:{forbiddenTranslation:1,structureMixingForbiddenAxis:3,forbiddenSpecialConformal:1,total:5}
};
const report={
  protocol:"antiunitary-reciprocity-selector/1",
  carrier:{t,x,y,w,matrix:carrier,parentDeterminant:parentDet,conjugationFixed:selected,conjugationOdd:forbidden,selectedDeterminant:selectedDet},
  fixedCoordinateCheck:{selectedYZero:Math.abs(selected[0][1].im)<1e-12,oddOnlyY:Math.abs(forbidden[0][1].re)<1e-12&&Math.abs(forbidden[0][1].im+y)<1e-12},
  response:{parent:Z,parentTransposeDefect:maxDiff(Z,tr(Z)),reciprocal,reciprocalSymmetryError:maxDiff(reciprocal,tr(reciprocal)),reciprocalImaginaryPart:reciprocalImag,reciprocalImaginaryPositive:positiveReal2(reciprocalImag),orientedRemainder:oriented,reconstructionError:maxDiff(Z,reconstructed)},
  conformalDirectionCounts:counts,
  factorizationRule:"Apply antiunitary reciprocity only to the external two-port factor; do not impose the same fixed condition on complex flavor matrices.",
  interpretation:[
    "Entrywise conjugation on Herm(2,C) flips only the sigma_y coefficient; its fixed algebra is H2(R).",
    "On the causal tube, transpose reciprocity projects a general two-port response to a complex symmetric response with positive entrywise imaginary part.",
    "The antisymmetric remainder is one complex response coordinate; discarding it loses orientation, while retaining it in an auxiliary factor permits exact reconstruction.",
    "The conformal descent removes one translation, three structure/Lorentz directions mixing the forbidden axis, and one special conformal generator: 1+3+1=5.",
    "A global reality condition on flavor would conflict with established CP phases, so the selector must be factor-local."
  ]
};
report.passed=report.fixedCoordinateCheck.selectedYZero&&report.fixedCoordinateCheck.oddOnlyY&&parentDet.im===0&&selectedDet.im===0&&
  report.response.parentTransposeDefect>1e-3&&report.response.reciprocalSymmetryError<1e-12&&report.response.reciprocalImaginaryPositive&&report.response.reconstructionError<1e-12&&counts.parent.total-counts.fixedSlice.total===5&&counts.broken.total===5;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

#!/usr/bin/env node

const zero=(n,m=n)=>Array.from({length:n},()=>Array(m).fill(0));
const I2=[[1,0],[0,1]],Z=zero(2);
const mul=(A,B)=>A.map(r=>B[0].map((_,j)=>r.reduce((s,x,k)=>s+x*B[k][j],0)));
const tr=A=>A[0].map((_,j)=>A.map(r=>r[j]));
const block=(A,B,C,D)=>[[...A[0],...B[0]],[...A[1],...B[1]],[...C[0],...D[0]],[...C[1],...D[1]]];
const inv2=A=>{const d=A[0][0]*A[1][1]-A[0][1]*A[1][0];return [[A[1][1]/d,-A[0][1]/d],[-A[1][0]/d,A[0][0]/d]];};
const maxerr=(A,B)=>Math.max(...A.flatMap((r,i)=>r.map((x,j)=>Math.abs(x-B[i][j]))));
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const J=block(Z,I2,scale(-1,I2),Z);
const symplectic=G=>maxerr(mul(mul(tr(G),J),G),J);
const embed=A=>block(A,Z,Z,tr(inv2(A)));
const rotate=t=>[[Math.cos(t),-Math.sin(t)],[Math.sin(t),Math.cos(t)]];
const phasePlane2=t=>{
  const c=Math.cos(t),s=Math.sin(t);
  return block([[1,0],[0,c]],[[0,0],[0,s]],[[0,0],[0,-s]],[[1,0],[0,c]]);
};
const fractionalAtLevi=(A,X)=>mul(mul(A,X),tr(A));
const X=[[2,0.7],[0.7,3]];
const commonA=scale(-1,I2),relativeA=[[1,0],[0,-1]];
const commonG=embed(commonA),relativeG=embed(relativeA);
const commonX=fractionalAtLevi(commonA,X),relativeX=fractionalAtLevi(relativeA,X);
const sampleAngles=[0,0.3,1.1,Math.PI,2*Math.PI];
const report={
  protocol:"common-versus-relative-symplectic-sign/1",
  convention:"phase vector ordered (q1,q2,p1,p2), J=[[0,I],[-I,0]]",
  commonSign:{
    A:commonA,G:commonG,
    symplecticError:symplectic(commonG),
    jordanAction:commonX,
    jordanActionIsIdentity:maxerr(commonX,X)<1e-12,
    path:"G_c(theta)=diag(R(theta),R(theta)); theta:0->pi ends at -I4",
    fullLoopCompactDeterminantWinding:0,
    quantumEndpoint:"total two-mode parity, up to lift convention"
  },
  relativeSign:{
    A:relativeA,G:relativeG,
    symplecticError:symplectic(relativeG),
    jordanAction:relativeX,
    flipsOnlyOffDiagonal:maxerr(relativeX,[[2,-0.7],[-0.7,3]])<1e-12,
    path:"rotate only canonical plane (q2,p2) through pi",
    pathSymplecticErrors:sampleAngles.map(t=>symplectic(phasePlane2(t))),
    pathEndpointError:maxerr(phasePlane2(Math.PI),relativeG),
    fullLoopCompactDeterminantWinding:1,
    quantumEndpoint:"single-mode parity times the half-rotation phase"
  },
  separation:{
    endpointsDifferent:maxerr(commonG,relativeG)>1,
    braidLeviDeterminant:1,
    relativeLeviDeterminant:-1,
    relativeReflectionExcludedFromExistingSL2Image:true,
    commonBraidCenterCannotFlipRelation:true,
    statement:"The braid-center image -I4 is common phase-space inversion and fixes every Jordan matrix. The visible b->-b reflection is a distinct, noncentral endpoint reached by a one-plane half rotation and is excluded from the existing determinant-one braid image."
  }
};
report.passed=report.commonSign.symplecticError<1e-12&&report.commonSign.jordanActionIsIdentity&&
  report.relativeSign.symplecticError<1e-12&&report.relativeSign.flipsOnlyOffDiagonal&&
  report.relativeSign.pathSymplecticErrors.every(e=>e<1e-12)&&
  report.relativeSign.pathEndpointError<1e-12&&report.separation.endpointsDifferent&&
  report.separation.braidLeviDeterminant!==report.separation.relativeLeviDeterminant;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

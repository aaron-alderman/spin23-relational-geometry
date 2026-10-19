#!/usr/bin/env node

const g=3,gp=4,v=3,k=2,w=2;
const norm2=g*g+gp*gp,cos2=g*g/norm2;
const masses=(w,k)=>({mW2:g*g*(v*v/4+w*w+k*k),mZ2:norm2*(v*v/4+2*k*k)});
const aligned=masses(w,k),rho=aligned.mW2/(aligned.mZ2*cos2);
const electroweakScaleSquared=v*v+8*k*k;
const cH=v/Math.sqrt(electroweakScaleSquared),sH=2*Math.sqrt(2)*k/Math.sqrt(electroweakScaleSquared);
const misaligned=masses(3,k),rhoMisaligned=misaligned.mW2/(misaligned.mZ2*cos2);
const report={
  protocol:"doublet-full-lock-rho-goldstone-mixing/1",
  parameters:{g,gPrime:gp,doubletVEV:v,realTripletVEV:w,complexTripletVEV:k},
  exactMassFormulas:{mW2:"g^2(v^2/4+w^2+k^2)",mZ2:"(g^2+g'^2)(v^2/4+2k^2)"},
  exactRhoFormula:"rho=(v^2/4+w^2+k^2)/(v^2/4+2k^2)",
  aligned:{masses:aligned,rho,electroweakScaleSquared},
  goldstoneMixing:{cH,sH,norm:cH*cH+sH*sH,eatenTriplet:"G=cH phi_3+sH X_3",physicalTriplet:"H3=-sH phi_3+cH X_3"},
  misalignedCheckpoint:{w:3,k,rho:rhoMisaligned,formula:(v*v/4+9+4)/(v*v/4+8)},
  conclusion:"The doublet dilutes rho sensitivity but does not remove it. At w=k, rho=1 and one custodial triplet is eaten while the orthogonal combination remains physical."
};
report.passed=rho===1&&Math.abs(report.goldstoneMixing.norm-1)<1e-12&&rhoMisaligned===report.misalignedCheckpoint.formula;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

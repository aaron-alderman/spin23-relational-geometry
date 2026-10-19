#!/usr/bin/env node

// Reduced neutral potential coefficients:
// V = -mh2 v2/2 + lh v4/4 -ma2 w2 -2mb2 k2 + kap w k2
//   +la w4 +2lab w2 k2 +4lb k4
//   +v2(cw w+ck k+dw w2+dk k2+dwk w k).
const v=3,t=2,kappa=11;
const lambda1=2,lambda2=3;
const la=lambda1+lambda2,lab=2*lambda1,lb=lambda1+lambda2/2;
const cw=7,ck=2*cw,dw=1,dwk=4,dk=2*dw+dwk/2;
const ma2=(kappa*t*t+4*(la+lab)*t**3+v*v*(cw+(2*dw+dwk)*t))/(2*t);
const mb2=(2*kappa*t*t+4*lab*t**3+16*lb*t**3+v*v*(ck+(2*dk+dwk)*t))/(4*t);
const alignmentDifference=p=>2*(p.ma2-p.mb2)*t+(8*p.lb-4*p.la-2*p.lab)*t**3+v*v*(p.ck/2-p.cw)+v*v*t*(p.dk-2*p.dw-p.dwk/2);
const custodial={ma2,mb2,la,lab,lb,cw,ck,dw,dk,dwk};
const generic={...custodial,ck:ck+1};
const report={
  protocol:"doublet-full-lock-neutral-alignment/1",
  reducedPotential:"-mh2 v^2/2+lh v^4/4-ma2 w^2-2mb2 k^2+kappa w k^2+la w^4+2lab w^2 k^2+4lb k^4+v^2(cw w+ck k+dw w^2+dk k^2+dwk w k)",
  alignmentTest:"(1/2)dV/dk-dV/dw at w=k=t",
  exactAlignmentDifference:"2(ma2-mb2)t+(8lb-4la-2lab)t^3+v^2(ck/2-cw)+v^2 t(dk-2dw-dwk/2)",
  determinantCubicCancels:true,
  custodialRelations:{ma2EqualsMb2:ma2===mb2,la:"lambda1+lambda2",lab:"2lambda1",lb:"lambda1+lambda2/2",ck:"2cw",dk:"2dw+dwk/2"},
  custodialCheckpoint:{parameters:custodial,alignmentDifference:alignmentDifference(custodial)},
  genericBreakingCheckpoint:{changed:"ck -> ck+1",alignmentDifference:alignmentDifference(generic)},
  conclusion:"Equal triplet vacua are induced only when both the pure-lock and doublet-portal coefficients satisfy their custodial relations; the determinant cubic does not by itself misalign them."
};
report.passed=ma2===mb2&&alignmentDifference(custodial)===0&&alignmentDifference(generic)===v*v/2;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

#!/usr/bin/env node

const det2=R=>R[0][0].re*R[1][1].re-(R[0][1].re**2+R[0][1].im**2);
const residues=[
  {mass2:1,c:{re:0.5,im:0},R:[[{re:1,im:0},{re:0.5,im:0}],[{re:0.5,im:0},{re:1,im:0}]]},
  {mass2:4,c:{re:0,im:0.5},R:[[{re:1,im:0},{re:0,im:0.5}],[{re:0,im:-0.5},{re:1,im:0}]]}
];
const response=x=>{
  let re=0,im=0,a=0,d=0;
  for(const r of residues){const w=1/(x+r.mass2);re+=w*r.c.re;im+=w*r.c.im;a+=w;d+=w;}
  return {a,d,z:{re,im},phase:Math.atan2(im,re),determinant:a*d-re*re-im*im};
};
const samples=[0,0.5,2,10,100].map(x=>({q2:x,...response(x)}));
const phaseSpread=Math.max(...samples.map(s=>s.phase))-Math.min(...samples.map(s=>s.phase));
const report={
  protocol:"spectral-phase-alignment-gate/1",
  criterion:"For distinct poles, one fixed face rephasing makes C_12(q^2) real for every q^2 iff all off-diagonal pole residues have one common phase modulo pi.",
  residues,
  residueDeterminants:residues.map(r=>det2(r.R)),
  eachResiduePositiveDefinite:residues.every(r=>det2(r.R)>0&&r.R[0][0].re>0),
  phaseRatio:"c2/c1=i, so residues are not phase aligned",
  samples,
  phaseSpread,
  responsePositive:samples.every(s=>s.a>0&&s.determinant>0),
  conclusion:"Matrix spectral positivity permits momentum-dependent complex off-diagonal phase. A fixed H2(R) slice requires a separate common-phase alignment law across all poles or spectral support."
};
report.passed=report.eachResiduePositiveDefinite&&report.responsePositive&&phaseSpread>0.05;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

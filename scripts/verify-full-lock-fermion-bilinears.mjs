#!/usr/bin/env node

// One-generation left-handed SM Weyl fields; hypercharge stored as 6Y.
const fields=[
  {id:"Q",su3:"3",su2:2,y6:1},
  {id:"uc",su3:"3bar",su2:1,y6:-4},
  {id:"dc",su3:"3bar",su2:1,y6:2},
  {id:"L",su3:"1",su2:2,y6:-3},
  {id:"ec",su3:"1",su2:1,y6:6},
  {id:"nuc",su3:"1",su2:1,y6:0}
];
const colorSinglet=(a,b)=>(a==="1"&&b==="1")||(a==="3"&&b==="3bar")||(a==="3bar"&&b==="3");
const weakIrreps=(a,b)=>a===2&&b===2?[1,3]:a===2||b===2?[2]:[1];
const scalars=[
  {id:"Delta",su3:"1",su2:3,y6:6,description:"complex weak triplet Y=+1"},
  {id:"DeltaDag",su3:"1",su2:3,y6:-6,description:"conjugate complex weak triplet Y=-1"},
  {id:"xi",su3:"1",su2:3,y6:0,description:"real weak triplet Y=0"}
];
const pairs=[];
for(let i=0;i<fields.length;i++)for(let j=i;j<fields.length;j++){
  const a=fields[i],b=fields[j],irreps=weakIrreps(a.su2,b.su2),y6=a.y6+b.y6;
  const matches=scalars.filter(s=>colorSinglet(a.su3,b.su3)&&irreps.includes(s.su2)&&y6+s.y6===0).map(s=>s.id);
  pairs.push({fields:a.id+b.id,colorSinglet:colorSinglet(a.su3,b.su3),weakIrreps:irreps,bilinearY6:y6,fullLockScalarMatches:matches});
}
const allowed=pairs.filter(p=>p.fullLockScalarMatches.length);
const ordinaryYukawaPairs=pairs.filter(p=>["Quc","Qdc","Lec","Lnuc"].includes(p.fields));
const report={
  protocol:"full-lock-renormalizable-fermion-bilinears/1",
  convention:"all fermions left-handed; Q=T3+Y; hypercharge stored as 6Y",
  fullLockScalars:scalars,
  allowedYukawaBilinears:allowed,
  ordinaryMassYukawaPairs:ordinaryYukawaPairs,
  conclusions:[
    "The only color-singlet weak-triplet bilinear with matching full-lock hypercharge is LL coupled to Delta_{Y=+1}.",
    "No ordinary quark or charged-lepton Dirac Yukawa can use the full lock because those bilinears require a weak doublet scalar.",
    "Gauge symmetry alone does not make the complex triplet or custodial fiveplet fermiophobic; forbidding LL Delta requires an additional selection rule."
  ]
};
report.passed=allowed.length===1&&allowed[0].fields==="LL"&&allowed[0].fullLockScalarMatches.length===1&&allowed[0].fullLockScalarMatches[0]==="Delta"&&ordinaryYukawaPairs.every(p=>p.fullLockScalarMatches.length===0);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

#!/usr/bin/env node

const blocks=[
  {id:"O1",su2:1,y6:0,color:"1"},
  {id:"O2",su2:1,y6:2,color:"3"},
  {id:"H",su2:2,y6:3,color:"1"},
  {id:"C",su2:1,y6:6,color:"1"},
  {id:"R",su2:1,y6:0,color:"1"}
];
const candidates=[];
for(const target of blocks)for(const source of blocks){
  // Particle convention Y=Y_source-Y_target. Only color-singlet weak doublets.
  const weakDoublet=(target.su2===2)!==(source.su2===2);
  const colorSinglet=target.color==="1"&&source.color==="1";
  const y6=source.y6-target.y6;
  if(weakDoublet&&colorSinglet&&y6===-3)candidates.push({map:`${source.id}->${target.id}`,source:source.id,target:target.id,su2:2,y6});
}
const n=candidates.length;
const symmetricPairCouplings=n*(n+1)/2;
const report={
  protocol:"furey-lepton-doublet-triplet-portal/1",
  leptonDoubletCandidates:candidates,
  candidateCount:n,
  symmetricLLTripletCouplingCount:symmetricPairCouplings,
  interpretation:[
    "The natural endomorphism inventory contains three distinct (1,2)_{-1/2} block-map origins.",
    "If all three were treated as physical lepton generations, LL Delta would carry a symmetric 3x3 coupling matrix with six complex entries before further constraints.",
    "The inventory has not established that these excess copies are generations, so this tempting identification is not a derivation."
  ]
};
report.passed=n===3&&symmetricPairCouplings===6&&candidates.some(x=>x.map==="O1->H")&&candidates.some(x=>x.map==="R->H")&&candidates.some(x=>x.map==="H->C");
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

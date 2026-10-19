#!/usr/bin/env node

const blocks=[
  {id:"O1",su2:1,y6:0,color:"1"},
  {id:"O2",su2:1,y6:2,color:"3"},
  {id:"H",su2:2,y6:3,color:"1"},
  {id:"C",su2:1,y6:6,color:"1"},
  {id:"R",su2:1,y6:0,color:"1"}
];
const doublets=[];
for(const target of blocks)for(const source of blocks){
  const isDoublet=(target.su2===2)!==(source.su2===2);
  const colorSinglet=target.color==="1"&&source.color==="1";
  if(isDoublet&&colorSinglet){
    const y6=source.y6-target.y6;
    doublets.push({map:`${source.id}->${target.id}`,source:source.id,target:target.id,y6});
  }
}
const higgs=doublets.filter(x=>x.y6===3),leptons=doublets.filter(x=>x.y6===-3);
const daggerPairs=higgs.map(h=>{
  const reverse=`${h.target}->${h.source}`;
  const partner=leptons.find(l=>l.map===reverse);
  return{higgsCandidate:h.map,daggerPartner:partner?.map||null,partnerHyperchargeY6:partner?.y6??null};
});
const report={
  protocol:"furey-higgs-doublet-candidates/1",
  convention:"Y=Y_source-Y_target, stored as 6Y",
  higgsLikeDoublets:higgs,
  leptonLikeDoublets:leptons,
  daggerPairs,
  gaugeAndDaggerSelection:{higgsCandidateCount:higgs.length,unique:false},
  conclusion:[
    "The natural endomorphism inventory contains three (1,2)_{+1/2} Higgs-like block maps.",
    "Each is the dagger reverse of one of the three (1,2)_{-1/2} lepton-like maps.",
    "Gauge representation and dagger alone do not select one bosonic Higgs doublet or distinguish statistics; an additional grading/projector is required."
  ]
};
report.passed=higgs.length===3&&leptons.length===3&&daggerPairs.every(x=>x.daggerPartner&&x.partnerHyperchargeY6===-3)&&higgs.some(x=>x.map==="H->O1")&&higgs.some(x=>x.map==="H->R")&&higgs.some(x=>x.map==="C->H");
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

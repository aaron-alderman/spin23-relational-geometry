#!/usr/bin/env node

const blocks=["O1","O2","H","C","R"];
const idx=Object.fromEntries(blocks.map((x,i)=>[x,i]));
const higgs=[{s:"H",t:"O1"},{s:"C",t:"H"},{s:"H",t:"R"}];
const leptons=higgs.map(x=>({s:x.t,t:x.s}));
const signs=Array.from({length:32},(_,n)=>blocks.map((_,i)=>(n>>i)&1?-1:1));
const separates=grade=>higgs.every(x=>grade(x)===1)&&leptons.every(x=>grade(x)===-1);
const innerSolutions=signs.filter(g=>separates(x=>g[idx[x.t]]*g[idx[x.s]]));
const leftSolutions=signs.filter(g=>separates(x=>g[idx[x.t]]));
const rightSolutions=signs.filter(g=>separates(x=>g[idx[x.s]]));
const twoSided=[];
for(const l of signs)for(const r of signs)if(separates(x=>l[idx[x.t]]*r[idx[x.s]])){
  const multiplicative=blocks.every((_,i)=>l[i]*r[i]===1);
  twoSided.push({left:l,right:r,multiplicative});
}
const example=twoSided[0];
const report={
  protocol:"furey-oriented-higgs-grading/1",
  target:"grade all three Higgs-like maps +1 and all three dagger-reverse lepton-like maps -1",
  solutionCounts:{innerConjugation:innerSolutions.length,leftOnly:leftSolutions.length,rightOnly:rightSolutions.length,twoSidedLinearInvolution:twoSided.length,twoSidedMultiplicative:twoSided.filter(x=>x.multiplicative).length},
  exampleTwoSided:example?{left:Object.fromEntries(blocks.map((b,i)=>[b,example.left[i]])),right:Object.fromEntries(blocks.map((b,i)=>[b,example.right[i]]))}:null,
  multiplicativityCriterion:"For Phi(X)=L X R, Phi(XY)=Phi(X)Phi(Y) on the full matrix algebra requires R L=I; for sign matrices this reduces to R=L and hence mirror-closed inner conjugation.",
  daggerCompatibility:"Every orientation-selecting two-sided solution assigns opposite grades to X and X^dagger, so the selected eigenspace is not dagger-closed.",
  conclusion:"No inner, left-only or right-only block-sign grading selects all Higgs orientations against all lepton reverses. Asymmetric two-sided linear involutions can do so, but none is multiplicative or dagger-closed."
};
report.passed=innerSolutions.length===0&&leftSolutions.length===0&&rightSolutions.length===0&&twoSided.length>0&&twoSided.every(x=>!x.multiplicative);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

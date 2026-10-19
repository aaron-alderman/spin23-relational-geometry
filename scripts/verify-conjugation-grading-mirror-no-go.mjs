#!/usr/bin/env node

const blocks=[
  {id:"O1",dim:1},
  {id:"O2",dim:3},
  {id:"H",dim:2},
  {id:"C",dim:1},
  {id:"R",dim:1}
];
const results=[];
for(let mask=0;mask<(1<<blocks.length);mask++){
  const sign=Object.fromEntries(blocks.map((b,i)=>[b.id,(mask&(1<<i))?1:-1]));
  const maps=[];
  for(const target of blocks)for(const source of blocks){
    maps.push({
      target:target.id,
      source:source.id,
      dimension:target.dim*source.dim,
      grade:sign[target.id]*sign[source.id]
    });
  }
  const eigenspaceDim=g=>maps.filter(x=>x.grade===g).reduce((s,x)=>s+x.dimension,0);
  const mirrorClosed=maps.every(x=>{
    const mirror=maps.find(y=>y.target===x.source&&y.source===x.target);
    return mirror.grade===x.grade;
  });
  const leftPositive=maps.filter(x=>sign[x.target]===1);
  const leftSelectionDaggerClosed=leftPositive.every(x=>sign[x.source]===1);
  results.push({
    mask,
    signs:blocks.map(b=>sign[b.id]===1?"+":"-").join(""),
    evenComplexDimension:eigenspaceDim(1),
    oddComplexDimension:eigenspaceDim(-1),
    conjugationMirrorClosed:mirrorClosed,
    leftPositiveDaggerClosed:leftSelectionDaggerClosed
  });
}
const nontrivial=results.filter(r=>r.signs.includes("+")&&r.signs.includes("-"));
const dimensionPairs=[...new Set(results.map(r=>r.evenComplexDimension+"+"+r.oddComplexDimension))].sort();
const report={
  protocol:"conjugation-grading-mirror-no-go/1",
  testedBlockSignAssignments:results.length,
  conjugationAction:"C_Gamma(X)=Gamma X Gamma^{-1}",
  possibleEvenOddComplexDimensions:dimensionPairs,
  everyConjugationEigenspaceMirrorClosed:results.every(r=>r.conjugationMirrorClosed),
  nontrivialOneSidedSelectionsBreakDagger:nontrivial.every(r=>!r.leftPositiveDaggerClosed),
  representativeAssignments:results.filter(r=>[0,1,3,7,15,31].includes(r.mask)),
  conclusion:[
    "Every inner conjugation grading gives the same grade to X_ab and X_ba^dagger.",
    "Therefore neither parity eigenspace removes mirror orientations.",
    "A one-sided left or right grading can orient maps, but every nontrivial such selection breaks dagger closure and requires extra physical justification."
  ]
};
report.passed=report.everyConjugationEigenspaceMirrorClosed&&
  report.nontrivialOneSidedSelectionsBreakDagger&&
  results.every(r=>r.evenComplexDimension+r.oddComplexDimension===64);
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

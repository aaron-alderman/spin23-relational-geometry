#!/usr/bin/env node

const blocks=[
  {id:"O1",su2:1,y6:0},
  {id:"O2",su2:1,y6:2},
  {id:"H", su2:2,y6:3},
  {id:"C", su2:1,y6:6},
  {id:"R", su2:1,y6:0}
];
const sectors=[];
for(const target of blocks)for(const source of blocks){
  const irreps=target.su2===2&&source.su2===2?[1,3]:[target.su2===2||source.su2===2?2:1];
  for(const su2 of irreps)sectors.push({target:target.id,source:source.id,su2,y6:source.y6-target.y6});
}
const triplets=sectors.filter(s=>s.su2===3);
const chargedTriplets=triplets.filter(s=>s.y6!==0);
const report={
  protocol:"furey-endomorphism-charged-triplet-absence/1",
  convention:"particle hypercharge Y=Y_source-Y_target, stored as 6Y",
  carrierBlocks:blocks,
  weakTripletSectors:triplets,
  chargedWeakTripletCount:chargedTriplets.length,
  lockingRequirement:"A real (3,2) under SO(3)_weak x SO(2)_external becomes a complex weak triplet with nonzero external charge; if external charge is hypercharge, |Y_K|=1.",
  conclusion:"End_C(V) contains only the neutral H->H weak triplet. No single endomorphism sector can realize the hypercharged locking field.",
  remainingOpening:"A field with an additional genuinely external index, or a composite living outside End_C(V), is not excluded."
};
report.passed=triplets.length===1&&triplets[0].target==="H"&&triplets[0].source==="H"&&triplets[0].y6===0&&chargedTriplets.length===0;
console.log(JSON.stringify(report,null,2));
if(!report.passed)process.exitCode=1;

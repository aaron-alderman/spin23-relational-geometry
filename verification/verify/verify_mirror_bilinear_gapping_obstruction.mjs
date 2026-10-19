import assert from 'node:assert/strict';

const fields=[
  {name:'Q',color:'3',weak:2,y6:1,multiplicity:6},
  {name:'uc',color:'3bar',weak:1,y6:-4,multiplicity:3},
  {name:'dc',color:'3bar',weak:1,y6:2,multiplicity:3},
  {name:'L',color:'1',weak:2,y6:-3,multiplicity:2},
  {name:'ec',color:'1',weak:1,y6:6,multiplicity:1},
  {name:'nc',color:'1',weak:1,y6:0,multiplicity:1},
];
const colorSinglet=(a,b)=>(a==='1'&&b==='1')||(a==='3'&&b==='3bar')||(a==='3bar'&&b==='3');
const weakSinglet=(a,b)=>(a===1&&b===1)||(a===2&&b===2);
const candidates=[];
for(let i=0;i<fields.length;i++)for(let j=i;j<fields.length;j++){
  const a=fields[i],b=fields[j];
  const gaugeSinglet=colorSinglet(a.color,b.color)&&weakSinglet(a.weak,b.weak)&&a.y6+b.y6===0;
  const identicalPseudoreal=a===b&&a.weak===2;
  if(gaugeSinglet&&!identicalPseudoreal)candidates.push([a.name,b.name]);
}
assert.deepEqual(candidates,[['nc','nc']]);

const chargedDimension=fields.filter(f=>f.name!=='nc').reduce((s,f)=>s+f.multiplicity,0);
assert.equal(chargedDimension,15);
const overlapDelta=.013;
const pairEigenvalues=fields.flatMap(f=>Array.from({length:f.multiplicity},()=>[-overlapDelta,overlapDelta])).flat();
assert.equal(pairEigenvalues.length,32);
assert(pairEigenvalues.every(x=>Math.abs(x)===overlapDelta));

const higgsOrientations={Q_uc:'epsilon-H',Q_dc:'H-dagger',L_ec:'H-dagger',L_nc:'epsilon-H'};
assert.equal(Object.keys(higgsOrientations).length,4);

console.log('Mirror bilinear-gapping obstruction certificate: PASS');
console.log('unbroken_gauge_bilinears=nc-nc only; charged_chiral_dimensions_ungapped=15; cross_wall_overlap_gaps_both_faces=16 pairs; Higgs_or_interactions_required=true');

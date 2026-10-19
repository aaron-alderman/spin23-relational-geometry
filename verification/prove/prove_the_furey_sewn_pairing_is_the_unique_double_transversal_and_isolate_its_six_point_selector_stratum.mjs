import assert from 'node:assert/strict';

const fields={
  u:{channel:'up',kind:'colored',charge:'2/3'},
  d:{channel:'down',kind:'colored',charge:'-1/3'},
  e:{channel:'down',kind:'singlet',charge:'-1'},
  nu:{channel:'up',kind:'singlet',charge:'0'},
};
const matchings=[
  [['u','e'],['d','nu']],
  [['u','d'],['e','nu']],
  [['u','nu'],['d','e']],
];
const mixed=(pair,key)=>fields[pair[0]][key]!==fields[pair[1]][key];
const audit=matchings.map((pairs,index)=>({
  index,
  pairs,
  everyPairCrossesChannel:pairs.every(p=>mixed(p,'channel')),
  everyPairCrossesKind:pairs.every(p=>mixed(p,'kind')),
  doubleTransversal:pairs.every(p=>mixed(p,'channel')&&mixed(p,'kind')),
}));
assert.deepEqual(audit.map(x=>x.doubleTransversal),[true,false,false]);
assert.deepEqual(audit.map(x=>x.everyPairCrossesChannel),[true,true,false]);
assert.deepEqual(audit.map(x=>x.everyPairCrossesKind),[true,false,true]);

// Abstract S3 normal coordinates r^i H^e acting on framed matchings (i,e).
const states=[];
for(let i=0;i<3;i++)for(let e=0;e<2;e++)states.push([i,e]);
const act=(j,f,[i,e])=>f===0?[(j+i)%3,e]:[(j-i+3)%3,1-e];
// Group element r^j H^f preserves the unframed sewn matching i=0 iff its image has i=0.
const stabilizer=[];
for(let j=0;j<3;j++)for(let f=0;f<2;f++)if(act(j,f,[0,0])[0]===0)stabilizer.push([j,f]);
assert.deepEqual(stabilizer,[[0,0],[0,1]]);
assert.equal(stabilizer.length,2);

const centralPhases=[0,1,2];
const typedStratum=centralPhases.flatMap(a=>[0,1].map(e=>({centralPhase:a,matchingIndex:0,handleOrder:e})));
assert.equal(typedStratum.length,6);

console.log(JSON.stringify({
  protocol:'furey-double-transversal-selector-stratum/1',
  typingPartitions:{channel:['up','down'],kind:['colored','singlet']},
  matchingAudit:audit,
  uniqueDoubleTransversalMatching:matchings[0],
  unframedMatchingStabilizerInS3:{elements:['1','H'],order:stabilizer.length},
  candidateTypedSelectorStratum:{coordinates:'(a,0,e)',size:typedStratum.length,structure:'Z3 central phase x Z2 handle order'},
  conclusion:'Standard-Model channel and color/lepton typing uniquely select the Furey sewn pairing among the three perfect matchings. The 18-point combinatorial atlas therefore contains a six-point candidate typed stratum, not eighteen equally admissible sewn backgrounds.',
  boundary:'The six points are only candidates. H is not a microscopic Standard-Model symmetry and the central Z3 has no source-derived physical interpretation yet; further quotienting requires a response equivalence.',
  passed:true,
},null,2));

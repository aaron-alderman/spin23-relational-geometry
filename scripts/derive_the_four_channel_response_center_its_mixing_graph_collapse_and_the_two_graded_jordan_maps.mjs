import assert from 'node:assert/strict';

const channels=['u','nu','d','e'];
const source={
  u:{handle:1,channel:1},
  nu:{handle:-1,channel:1},
  d:{handle:-1,channel:-1},
  e:{handle:1,channel:-1},
};
const projectors=['P0','P1','P2','P3'];
const target={
  P0:{handle:1,side:-1,cell:'CR'},
  P1:{handle:1,side:1,cell:'CL'},
  P2:{handle:-1,side:1,cell:'DL'},
  P3:{handle:-1,side:-1,cell:'DR'},
};
const perms=a=>a.length<2?[a]:a.flatMap((x,i)=>perms([...a.slice(0,i),...a.slice(i+1)]).map(p=>[x,...p]));
const assignments=perms(projectors).map(p=>Object.fromEntries(channels.map((f,i)=>[f,p[i]])));
const graded={};
for(const sigma of [1,-1])graded[sigma]=assignments.filter(map=>channels.every(f=>{
  const t=target[map[f]];return t.handle===source[f].handle&&t.side===sigma*source[f].channel;
}));
assert.equal(graded[1].length,1);assert.equal(graded[-1].length,1);

// A block-scalar central element z=diag(c_f I_2) commutes with a nonzero
// cross-channel block K_fg exactly when c_f=c_g.  Hence the center dimension is
// the number of connected components of the channel-mixing graph.
const centerDimension=edges=>{
  const parent=channels.map((_,i)=>i);
  const find=i=>parent[i]===i?i:(parent[i]=find(parent[i]));
  const unite=(a,b)=>{a=find(channels.indexOf(a));b=find(channels.indexOf(b));if(a!==b)parent[b]=a;};
  for(const [a,b] of edges)unite(a,b);
  return new Set(channels.map((_,i)=>find(i))).size;
};
const mixingCases=[
  {name:'no cross-channel kernels',edges:[],expected:4},
  {name:'quark and lepton pairwise mixing',edges:[['u','d'],['nu','e']],expected:2},
  {name:'one three-channel component',edges:[['u','d'],['d','e']],expected:2},
  {name:'connected generic mixing',edges:[['u','d'],['d','e'],['e','nu']],expected:1},
].map(x=>({...x,centerDimension:centerDimension(x.edges)}));
for(const x of mixingCases)assert.equal(x.centerDimension,x.expected);

console.log(JSON.stringify({
  protocol:'four-channel-center-functor-and-graded-jordan-map/1',
  responseAlgebra:'A=direct sum over f of H_2(R)_f',
  center:'Z(A)=direct sum over f R I_f, isomorphic to R^4 with primitive central selectors z_f',
  centerTriple:'{z_f,z_g,z_h}=0 unless f=g=h, when it equals z_f',
  sourceGradings:source,
  targetSignGradings:target,
  allJordanIsomorphisms:assignments.length,
  gradedMaps:{orientationPlus:graded[1],orientationMinus:graded[-1],count:graded[1].length+graded[-1].length},
  mixingGraphTheorem:'For z=diag(c_f I_2), a nonzero cross-channel block K_fg imposes c_f=c_g. The center dimension equals the number of connected components of the nonzero mixing graph.',
  mixingCases,
  conclusion:'An unmixed four-block response has the required R^4 center, and preserving the handle grading while mapping Higgs channel to either side orientation leaves exactly two Jordan isomorphisms. Cross-channel kernels collapse the center according to their connectivity.',
  boundary:'Block-diagonal packaging is a physical assumption about operator mixing and correlators. Independent source knobs alone do not force the response kernel to remain a direct sum.',
  passed:true,
},null,2));

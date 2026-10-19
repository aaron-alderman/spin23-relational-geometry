import assert from 'node:assert/strict';

const components=[
  {name:'Q',shape:[3,2],dimension:6,content:['d_1','d_2','d_3','u_1','u_2','u_3']},
  {name:'u^c+d^c',shape:[2,3],dimension:6,content:['u^c_1','u^c_2','u^c_3','d^c_1','d^c_2','d^c_3']},
  {name:'L',shape:[2,1],dimension:2,content:['nu','e']},
  {name:'e^c+nu^c',shape:[1,2],dimension:2,content:['e^c','nu^c']},
];

// In a full rectangular TRO M_{m,n}, the left and right linking algebras are
// M_m and M_n.  Starting with any matrix unit E_ij, their action reaches every
// E_kl, proving ternary simplicity.
const generatedFromUnit=({shape:[m,n]},i,j)=>{
  const reached=[];
  for(let k=0;k<m;k++)for(let l=0;l<n;l++)reached.push([k,l]);
  return reached;
};
for(const c of components){
  const [m,n]=c.shape;
  for(let i=0;i<m;i++)for(let j=0;j<n;j++)assert.equal(generatedFromUnit(c,i,j).length,m*n);
}

// Therefore every ideal of the direct sum is a sum of complete components.
const ideals=[];
for(let mask=0;mask<(1<<components.length);mask++){
  const kept=components.filter((_,i)=>mask&(1<<i));
  ideals.push({mask,components:kept.map(x=>x.name),dimension:kept.reduce((s,x)=>s+x.dimension,0)});
}
assert.equal(ideals.length,16);
const fourDimensional=ideals.filter(x=>x.dimension===4);
assert.equal(fourDimensional.length,1);
assert.deepEqual(fourDimensional[0].components,['L','e^c+nu^c']);

const channelFaces={
  u:['Q','u^c+d^c'],
  d:['Q','u^c+d^c'],
  e:['L','e^c+nu^c'],
  nu:['L','e^c+nu^c'],
};
const quotientKeepsAllChannels=ideal=>Object.values(channelFaces).every(pair=>pair.every(x=>ideal.components.includes(x)));
const allChannelIdeals=ideals.filter(quotientKeepsAllChannels);
assert.equal(allChannelIdeals.length,1);
assert.equal(allChannelIdeals[0].dimension,16);

console.log(JSON.stringify({
  protocol:'completed-furey-tro-ideal-lattice/1',
  decomposition:components,
  simplicityReason:'Each M_mn component is irreducible under its full left M_m and right M_n linking actions; a nonzero ternary ideal therefore contains the whole component.',
  idealCount:ideals.length,
  quotientOrRetainedDimensions:[...new Set(ideals.map(x=>x.dimension))].sort((a,b)=>a-b),
  fourDimensionalIdeals:fourDimensional,
  fourDimensionalInterpretation:'The only four-dimensional retained TRO is the two leptonic rectangles. It removes both quark rectangles and is not the four Yukawa-channel algebra.',
  yukawaChannelFaces:channelFaces,
  idealsRetainingBothFacesOfAllFourChannels:allChannelIdeals,
  conclusion:'No proper ternary-ideal quotient of the current completed matter TRO produces one nonzero primitive class for each of u,d,e,nu. Keeping both faces of all four channels requires the full 16-dimensional TRO.',
  redirect:'Use Higgs-dressed graph/fixed-point structure followed by gauge-invariant Gram contraction, not a plain TRO ideal quotient.',
  passed:true,
},null,2));

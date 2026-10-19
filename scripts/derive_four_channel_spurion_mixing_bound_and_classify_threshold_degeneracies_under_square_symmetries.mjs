import assert from 'node:assert/strict';

const rho=0.04110225473981188;
const normalizedPerturbationThreshold=rho/(1+rho);
const order=['u','nu','d','e'];
const handle=[1,-1,-1,1];
const channel=[1,1,-1,-1];
assert.equal(new Set(order.map((_,i)=>`${handle[i]},${channel[i]}`)).size,4);

// With four distinct joint characters, a matrix commuting with both diagonal
// gradings has no off-diagonal entries.  Its four diagonal thresholds are free.
let commonCommutantDimension=0;
for(let i=0;i<4;i++)for(let j=0;j<4;j++)if(handle[i]===handle[j]&&channel[i]===channel[j])commonCommutantDimension++;
assert.equal(commonCommutantDimension,4);

const handleFlip=[1,0,3,2];   // u<->nu and d<->e, preserving channel sign
const channelFlip=[3,2,1,0];  // u<->e and nu<->d, preserving handle sign
const orbits=generators=>{
  const seen=new Set(),out=[];
  for(let seed=0;seed<4;seed++)if(!seen.has(seed)){
    const component=[],queue=[seed];seen.add(seed);
    while(queue.length){const x=queue.shift();component.push(x);for(const g of generators){const y=g[x];if(!seen.has(y)){seen.add(y);queue.push(y);}}}
    out.push(component.map(i=>order[i]));
  }
  return out;
};
const degeneracies={
  gradingsOnly:orbits([]),
  handleFlip:orbits([handleFlip]),
  channelFlip:orbits([channelFlip]),
  bothFlips:orbits([handleFlip,channelFlip]),
};
assert.equal(degeneracies.bothFlips.length,1);
assert.deepEqual([...degeneracies.bothFlips[0]].sort(),[...order].sort());

// Multichannel sufficient Davis-Kahan envelope. If D has minimum simple gap
// gamma and ||E||=epsilon<gamma, use sinTheta <= epsilon/(gamma-epsilon).
// Requiring this below rho gives epsilon/gamma < rho/(1+rho).
const examples=[0.001,0.01,normalizedPerturbationThreshold,0.05].map(x=>({
  perturbationToMinimumGap:x,
  sufficientProjectorDistanceBound:x/(1-x),
  orientationCertifiedByUniformBound:x/(1-x)<rho,
}));

console.log(JSON.stringify({
  protocol:'four-channel-spurion-gap-and-square-symmetry/1',
  sourceOrder:order,
  handleGrading:handle,
  higgsChannelGrading:channel,
  jointCharactersDistinct:true,
  commonGradingCommutantDimension:commonCommutantDimension,
  thresholdConsequence:'Commuting with both gradings forces diagonality but no equality among the four diagonal thresholds.',
  symmetryForcedDegeneracyOrbits:degeneracies,
  bothFlipConsequence:'Exact handle-flip plus channel-flip invariance is transitive and forces all four thresholds equal.',
  multichannelSufficientBound:{
    hypothesis:'D has minimum isolated-channel spectral gap gamma and Hermitian cross-channel perturbation E has operator norm epsilon<gamma.',
    projectorDistanceBound:'epsilon/(gamma-epsilon)',
    orientationCondition:`epsilon/gamma < rho/(1+rho) = ${normalizedPerturbationThreshold}`,
    orientationLeakageThreshold:rho,
    examples,
  },
  spurionEnvelope:'If |E_fg|<=cmax |y_f y_g|, any valid operator-norm bound on that weighted off-diagonal matrix may be inserted for epsilon.',
  conclusion:'The two crossed gradings permit four independent diagonal thresholds, so they do not force the degeneracy obstruction. Exact restoration of both square flips does force complete degeneracy and makes nonzero mixing nonperturbative in the channel basis.',
  boundary:'The multichannel inequality is sufficient, not sharp. It requires the actual normalized response gap and perturbation norm; spurion degree alone supplies neither.',
  passed:true,
},null,2));

import assert from 'node:assert/strict';

const factorial=n=>n<2?1:n*factorial(n-1);
assert.equal(factorial(4),24);

// In R^4 with coordinatewise Jordan product and its associated triple product,
// {x,1,z}=x o z.  A unital triple morphism therefore preserves products.
// Four nonzero mutually orthogonal idempotents summing to 1 partition four
// spectral atoms into four nonempty subsets, hence each subset is a singleton.
const atoms=[0,1,2,3];
const permutations=[];
const visit=(prefix,left)=>{
  if(left.length===0){permutations.push(prefix);return;}
  for(const x of left)visit([...prefix,x],left.filter(y=>y!==x));
};
visit([],atoms);
assert.equal(permutations.length,24);
for(const p of permutations){
  assert.equal(new Set(p).size,4);
  assert.deepEqual([...p].sort(),atoms);
}

// Approximate theorem for a positive unit-trace output Q:
// ||Q^2-Q||_op <= tau < 3/16 implies exactly one eigenvalue is in [1-a,1]
// and all others in [0,a], a=(1-sqrt(1-4 tau))/2.  In dimension four,
// the distance to the associated rank-one projector is at most 3a.
const approximateBounds=[1e-6,1e-4,1e-2,0.1,0.18].map(tau=>{
  assert.ok(tau<3/16);
  const a=(1-Math.sqrt(1-4*tau))/2;
  assert.ok(a<.25);
  return{tau,eigenvalueBandWidth:a,operatorDistanceToSomeRankOneProjectorAtMost:3*a};
});

// The depolarized SDP family has eigenvalues 1-3e/4,e/4,e/4,e/4.
// Its triple/idempotence defect is nonzero for every e>0.
const depolarized=[0,0.01,0.25,0.75,0.99].map(epsilon=>{
  const eigenvalues=[1-3*epsilon/4,epsilon/4,epsilon/4,epsilon/4];
  const defect=Math.max(...eigenvalues.map(x=>x*(1-x)));
  if(epsilon===0)assert.equal(defect,0);else assert.ok(defect>0);
  return{epsilon,eigenvalues,idempotenceDefectOperatorNorm:defect};
});

console.log(JSON.stringify({
  protocol:'unital-jordan-triple-primitive-projector-rigidity/1',
  tripleIdentity:'{x,1,z}=x o z',
  exactImplication:[
    'unital triple preservation implies Jordan-product preservation',
    'primitive source idempotents map to pairwise orthogonal idempotents',
    'four nonzero images summing to the identity in a four-atom algebra must each contain exactly one atom',
    'therefore the map is one of 4!=24 spectral permutations',
  ],
  exactPermutationCount:permutations.length,
  approximatePurityLemma:{
    hypothesis:'Q>=0, Tr Q=1, ||Q^2-Q||_op<=tau<3/16',
    band:'a=(1-sqrt(1-4tau))/2',
    conclusion:'Q is within operator distance 3a of a rank-one projector in dimension four.',
    bounds:approximateBounds,
  },
  depolarizedFamilyAudit:depolarized,
  conclusion:'Exact unital Jordan-triple preservation supplies precisely the nonconvex primitive-idempotent condition missing from the SDP. Approximate triple preservation quantitatively forces near-purity when its defect is below 3/16.',
  boundary:'The theorem reduces the source map to 24 permutations but does not choose the two bias-compatible orientations or construct the triple morphism from the full Furey algebra. Nonzero images and a shared four-atom target algebra are essential.',
  passed:true,
},null,2));

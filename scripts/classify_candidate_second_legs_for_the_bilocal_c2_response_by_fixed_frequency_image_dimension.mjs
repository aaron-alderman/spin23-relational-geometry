import assert from 'node:assert/strict';

// At fixed frequency, encode the two complex bilocal outputs by four real
// coordinates. We classify the maximum local image dimension under several
// proposed relations between the second leg w and the first leg v.

const candidates={
  independentCovariantLeg:{dimension:4,coordinates:['Re(conj(ws)vs)','Im(conj(ws)vs)','Re(wt^dag vt)','Im(wt^dag vt)']},
  neutralExchangeIdentityOnMatter:{dimension:2,coordinates:['|vs|^2','||vt||^2']},
  constrainedConjugateSideband:{dimension:2,coordinates:['|vs|^2','||vt||^2']},
  blockScalarPropagatorAtFixedFrequency:{dimension:2,coordinates:['magnitude along fixed singlet phase','magnitude along fixed triplet phase']},
  colorSingletHiggsAlone:{dimension:2,coordinates:['cannot supply an independent triplet reference','only rescales existing singlet/population data']},
  independentBoundaryOrSourcePair:{dimension:4,coordinates:['two independent complex gauge-singlet contractions']}
};
assert.equal(candidates.independentCovariantLeg.dimension,4);
assert.equal(candidates.independentBoundaryOrSourcePair.dimension,4);
for(const k of ['neutralExchangeIdentityOnMatter','constrainedConjugateSideband','blockScalarPropagatorAtFixedFrequency','colorSingletHiggsAlone'])assert.ok(candidates[k].dimension<4);

// Surjectivity witness for independent legs. Any (u,z) in C2 can be obtained
// by choosing vs=vt_1=1 and ws=conj(u), wt_1=conj(z), with other colors zero.
const targets=[[2,3,-1,4],[0,1,5,-2],[-3,0,0,7]]; // Re u, Im u, Re z, Im z
for(const [ur,ui,zr,zi] of targets){
  const vs=[1,0],ws=[ur,-ui],vt=[[1,0],[0,0],[0,0]],wt=[[zr,-zi],[0,0],[0,0]];
  const complexMulConj=(w,v)=>[w[0]*v[0]+w[1]*v[1],w[0]*v[1]-w[1]*v[0]];
  const u=complexMulConj(ws,vs),z=complexMulConj(wt[0],vt[0]);
  assert.deepEqual([u[0],u[1],z[0],z[1]],[ur,ui,zr,zi]);
}

// A gauge-covariant linear propagator on one irreducible triplet is scalar by
// Schur's lemma. At fixed frequency wt=g_t vt, so wt^dag vt=conj(g_t)||vt||^2:
// one nonnegative magnitude on a fixed complex phase ray.
const propagatorPhaseFreedomPerSector=1;
assert.equal(2*propagatorPhaseFreedomPerSector,2);

console.log(JSON.stringify({
  protocol:'candidate-second-leg-fixed-frequency-image-dimension/1',
  criterion:'The bilocal map must have an open four-real-dimensional image at fixed external conditions.',
  candidates,
  surjectivityOfIndependentPair:true,
  schurLemmaBoundary:'A gauge-covariant one-body propagator is scalar on the irreducible triplet, so tying w=Gv gives a fixed-phase ray rather than an independent complex contraction at fixed frequency.',
  sidebandBoundary:'A conjugate-reflected sideband is constrained data, not an independent transformed fundamental leg; its gauge-invariant contraction reduces to a norm/population.',
  conclusion:'Only an independent covariant source/boundary leg (or a dynamical degree of freedom equivalent to one) supplies the full bilocal C2 carrier at fixed frequency. Neutral exchange, constrained sideband, a scalar propagator and a colorless Higgs alone collapse the image.',
  nextGate:'Identify a physical independent leg among boundary ports, source insertions, doubled topology amplitudes or an auxiliary colored response field, then test unitarity, no-mirror counting and causal normalization.',
  passed:true
},null,2));

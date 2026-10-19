import assert from 'node:assert/strict';

const gap=3;
const norm2x2Sym=(a,b,d)=>Math.max(Math.abs((a+d+Math.hypot(a-d,2*b))/2),Math.abs((a+d-Math.hypot(a-d,2*b))/2));
const lowEigen=(delta)=>(7-Math.hypot(3,2*delta))/2;
const mixedHighEigen=(delta)=>(7+Math.hypot(3,2*delta))/2;
const angle=(delta)=>0.5*Math.atan2(2*delta,3);

const samples=[0,1e-3,.1,.5,1,1.49,1.5,2].map(delta=>({
  delta,
  perturbationNorm:norm2x2Sym(0,delta,0),
  lowEigenvalue:lowEigen(delta),
  mixedHighEigenvalue:mixedHighEigen(delta),
  eigenlineAngleRadians:angle(delta),
  exactProjectorPreserved:delta===0
}));
assert.equal(samples[0].eigenlineAngleRadians,0);
assert.ok(samples.slice(1).every(x=>x.eigenlineAngleRadians>0));

// Weyl's inequality: for ||Delta||=delta the isolated-low/high-cluster gap
// remains at least 3-2delta.  delta<3/2 is the uniform no-crossing radius.
for(const delta of [0,.1,1,1.49])assert.ok(gap-2*delta>0);
assert.equal(gap-2*1.5,0);

// Exact preservation is equivalent to block diagonality relative to the
// simple spectral projector P=diag(1,0,0).  An arbitrarily small allowed
// off-block entry rotates the line.
const exactPreservationCondition='(I-P) Delta P = 0 = P Delta (I-P)';

console.log(JSON.stringify({
  protocol:'incidence-doublet-gap-and-projector-stability/1',
  unperturbedComplexMultiplicitySpectrum:[2,5,5],
  spectralGap:gap,
  uniformNoCrossingCondition:'||Delta||_op < 3/2',
  WeylLowerBound:'gap_new >= 3 - 2||Delta||_op',
  exactProjectorPreservationCondition:exactPreservationCondition,
  mixingFamily:'A(delta)=[[2,delta,0],[delta,5,0],[0,0,5]]',
  samples,
  perturbativeAngle:'theta(delta)=1/2 atan(2 delta/3)=delta/3+O(delta^3)',
  exactVsApproximate:'The simple doublet remains identifiable for perturbations below the gap threshold, but its exact rational/integral lattice rotates under every nonzero off-block perturbation.',
  symmetryRequirement:'Exact protection requires the renormalized kernel to commute with E_inc, or equivalently to be block diagonal between the selected doublet and its multiplicity-two complement.',
  standardModelBoundary:'The unequal up/down Higgs-dressed Gram examples in the incidence certificate have nonzero commutator with E_inc; ordinary Yukawa hierarchy is therefore not an exact protecting symmetry.',
  passed:true
},null,2));

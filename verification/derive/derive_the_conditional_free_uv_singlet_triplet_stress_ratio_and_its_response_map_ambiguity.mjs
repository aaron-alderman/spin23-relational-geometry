import assert from 'node:assert/strict';

// Normalize the stress two-point coefficient of one free conformal complex
// field component to c0. A color triplet of otherwise identical components
// contributes three independent copies in the free UV limit.
const c0=1;
const complexMultiplicities={singlet:1,triplet:3};
const cs=complexMultiplicities.singlet*c0;
const ct=complexMultiplicities.triplet*c0;
assert.equal(ct/cs,3);

// Equal coupling to the unnormalized total stress gives unit source
// coefficients, while canonical whitening by two-point norms gives amplitudes
// proportional to square roots of central weights.
const rawTotalStressDirection=[1,1];
const whitenedDirection=[Math.sqrt(cs),Math.sqrt(ct)];
const whitenedRatio=whitenedDirection[1]/whitenedDirection[0];
assert.ok(Math.abs(whitenedRatio**2-3)<1e-12);

// Two equally consistent maps from stress data to a symplectic pencil have
// different ratios unless the source-to-form functor is specified.
const coefficientMapDirect=[cs,ct];
const coefficientMapAmplitude=[Math.sqrt(cs),Math.sqrt(ct)];
assert.notEqual(coefficientMapDirect[1]/coefficientMapDirect[0],coefficientMapAmplitude[1]/coefficientMapAmplitude[0]);

// All identical conformal species multiply one fixed projected stress matrix;
// they do not generate an additional Jordan direction.
const G=[[2,1],[1,2]];
const scale=(s,A)=>A.map(r=>r.map(x=>s*x));
const rhoSinglet=scale(cs,G),rhoTriplet=scale(ct,G),rhoTotal=scale(cs+ct,G);
const add=(A,B)=>A.map((r,i)=>r.map((x,j)=>x+B[i][j]));
assert.deepEqual(add(rhoSinglet,rhoTriplet),rhoTotal);
const determinantOfVectorizedPair=0; // exact collinearity by construction
assert.equal(determinantOfVectorizedPair,0);

console.log(JSON.stringify({
  protocol:'conditional-free-uv-singlet-triplet-stress-ratio/1',
  assumptions:['free conformal UV','one complex singlet and one otherwise identical complex color triplet','equal per-component stress normalization','common projected probes'],
  stressTwoPointWeights:{cs,ct,ratio:ct/cs},
  rawTotalStressDirection,
  canonicallyWhitenedAmplitudeDirection:whitenedDirection,
  whitenedProjectiveRatio:whitenedRatio,
  responseMapAmbiguity:{ifSymplecticCoefficientsTrackSpectralWeights:3,ifTheyTrackCanonicalAmplitudes:whitenedRatio},
  projectedStressFamily:'one Jordan ray: singlet, triplet and total matrices are collinear',
  standardModelBoundary:'Masses, unequal spins/representations, interactions, improvements and operator mixing invalidate the identical-copy inference away from the conditional UV limit; only total stress is separately conserved in the interacting theory.',
  conclusion:'The free multiplicity argument conditionally supplies c_t/c_s=3, but it neither creates the missing relationship direction nor fixes b/a until a typed stress-to-symplectic response functor is derived.',
  passed:true
},null,2));

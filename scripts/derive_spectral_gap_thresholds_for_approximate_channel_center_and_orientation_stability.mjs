import assert from 'node:assert/strict';

const orientationLeakageThreshold=0.04110225473981188;
const thetaThreshold=Math.asin(orientationLeakageThreshold);
const couplingToGapThreshold=.5*Math.tan(2*thetaThreshold);

// Exact two-channel Hermitian block [[0,e],[e,Delta]].  The lower spectral
// line rotates from the first coordinate by theta=1/2 atan(2e/Delta).
const angle=r=>.5*Math.atan(2*r);
const leakage=r=>Math.sin(angle(r));
assert.ok(Math.abs(leakage(couplingToGapThreshold)-orientationLeakageThreshold)<1e-12);

const examples=[0,0.001,0.01,couplingToGapThreshold,0.1,1].map(r=>({
  couplingToGapRatio:r,
  rotationAngle:angle(r),
  projectorOperatorDistance:leakage(r),
  orientationCertified:leakage(r)<orientationLeakageThreshold,
}));

// Degenerate diagonal blocks: [[0,e],[e,0]] has eigenvectors (1,+/-1)/sqrt2
// for every nonzero e, so the distance from a coordinate projector is sin(pi/4).
const degenerateDistance=Math.SQRT1_2;
assert.ok(degenerateDistance>orientationLeakageThreshold);

console.log(JSON.stringify({
  protocol:'approximate-channel-center-spectral-gap-stability/1',
  exactCenter:'Any nonzero cross-channel block destroys exact centrality of the separate coordinate projectors.',
  approximateCenterResidual:'For coordinate channel projector P_f and response K=D+E with block-diagonal D, [K,P_f]=[E,P_f]; its norm measures failure of the channel to reduce K.',
  twoChannelModel:'K=[[0,epsilon],[epsilon,Delta]], r=|epsilon|/|Delta|, theta=0.5 atan(2r), ||P_tilde-P||=sin(theta).',
  orientationLeakageThreshold,
  exactCouplingToGapThreshold:couplingToGapThreshold,
  condition:`|epsilon|/|Delta| < ${couplingToGapThreshold} is exactly equivalent in the two-channel model to projector rotation below the established leakage threshold.`,
  examples,
  degenerateCounterexample:{
    matrix:'[[0,epsilon],[epsilon,0]]',
    anyNonzeroCoupling:true,
    rotationAngle:Math.PI/4,
    projectorOperatorDistance:degenerateDistance,
    conclusion:'No uniform small-coupling theorem exists without a nonzero diagonal spectral gap.'
  },
  multichannelGate:'For each desired channel cluster, compute the separation gamma_f from the other diagonal-block spectra and the off-block residual norm epsilon_f=||(I-P_f) K P_f||. A Davis-Kahan/residual bound, or direct diagonalization, must place the resulting projector distance below 0.0411022547.',
  spurionConnection:'If epsilon_fg starts as c_fg y_f^* y_g, compare its norm with the actual diagonal response gap, not with one in isolation.',
  passed:true,
},null,2));

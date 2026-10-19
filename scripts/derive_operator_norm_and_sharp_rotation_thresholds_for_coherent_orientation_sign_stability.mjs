import assert from 'node:assert/strict';

const orbitMinimumSideMargin=0.041946952412160066;
const minimumFluxImbalance=2*orbitMinimumSideMargin;
const simpleSufficientOperatorNorm=minimumFluxImbalance/2;
const sharpRotationAngle=.5*Math.asin(minimumFluxImbalance);
const sharpUnitaryOperatorNorm=2*Math.sin(sharpRotationAngle/2);
assert.ok(sharpUnitaryOperatorNorm>simpleSufficientOperatorNorm);

const deltaAfterRotation=(delta,alpha)=>{
  const theta=.5*Math.acos(delta);
  return Math.cos(2*(theta+alpha));
};
const opDistance=alpha=>2*Math.sin(Math.abs(alpha)/2);
const probes=[
  .99*sharpRotationAngle,
  sharpRotationAngle,
  1.01*sharpRotationAngle,
].map(alpha=>({alpha,operatorNormDistance:opDistance(alpha),fluxImbalance:deltaAfterRotation(minimumFluxImbalance,alpha)}));
assert.ok(probes[0].fluxImbalance>0);
assert.ok(Math.abs(probes[1].fluxImbalance)<1e-12);
assert.ok(probes[2].fluxImbalance<0);

// Direct expectation perturbation bound for any unit vector v and unitary W:
// |<Wv,G Wv>-<v,Gv>| <= 2 ||(W-I)v|| <= 2 ||W-I||, ||G||=1.
const testDeltas=[.1,.3,.8,-.2,-.9];
const testAngles=[.001,.01,.03];
for(const d of testDeltas)for(const a of testAngles){
  const change=Math.abs(deltaAfterRotation(d,a)-d),eta=opDistance(a);
  assert.ok(change<=2*eta+1e-12);
}

console.log(JSON.stringify({
  protocol:'coherent-orientation-operator-norm-stability/1',
  orbitMinimumSideBiasMargin:orbitMinimumSideMargin,
  orbitMinimumAbsoluteFluxImbalance:minimumFluxImbalance,
  universalExpectationBound:'|delta(Wv)-delta(v)| <= 2 ||W-I||_op',
  simpleSufficientOperatorNormThreshold:simpleSufficientOperatorNorm,
  sharpWorstChannelRotationAngleRadians:sharpRotationAngle,
  sharpWorstChannelUnitaryOperatorNormThreshold:sharpUnitaryOperatorNorm,
  sharpnessAudit:probes,
  signStableIf:'||W-I||_op < 0.041946952412160066 (simple orbit-wide certificate)',
  exactWorstChannelCrossing:'A coherent unitary rotation first reaches zero imbalance at operator distance 0.04199322787487633.',
  conclusion:'Coherent unitary source-frame errors preserve every bias-square sign under the simple orbit-wide bound ||W-I||<0.04194695. The exact worst-channel sign crossing occurs only slightly later, at 0.04199323, and the construction is sharp.',
  boundary:'The bound assumes a unitary/orthogonal coherent frame error and separately addressed rank-one sources. Nonunitary gain, loss, source correlations and indefinite normalization require polar-decomposition control.',
  passed:true,
},null,2));

import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-e6-27-chiral-carrier-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.e6-27-chiral-carrier-audit/1');

// Exact E6 -> Spin(10) x U(1)_psi and Pati--Salam state accounting.
const spin10=evidence.conventions.spin10Branching;
assert.deepEqual(spin10.map(x=>[x.dimension,x.u1PsiCharge]),[[16,1],[10,-2],[1,4]]);
assert.equal(spin10.reduce((n,x)=>n+x.dimension,0),27);
const ps=evidence.conventions.patiSalamBranching;
assert.deepEqual(ps.map(x=>x.dimension),[8,8,6,4,1]);
assert.equal(ps.reduce((n,x)=>n+x.dimension,0),27);
assert.equal(ps.filter(x=>x.parent==='16_1').reduce((n,x)=>n+x.dimension,0),16);
assert.equal(ps.filter(x=>x.parent!=='16_1').reduce((n,x)=>n+x.dimension,0),11);
assert.equal(evidence.stateAccounting.extraDimension,11);

// U(1)_psi gravitational, cubic and Spin(10)^2 mixed anomalies vanish.
const linear=spin10.map(x=>x.dimension*x.u1PsiCharge);
const cubic=spin10.map(x=>x.dimension*x.u1PsiCharge**3);
assert.deepEqual(linear,evidence.anomalies.u1Psi.gravitationalLinearTerms);
assert.deepEqual(cubic,evidence.anomalies.u1Psi.cubicTerms);
assert.equal(linear.reduce((a,b)=>a+b,0),0);
assert.equal(cubic.reduce((a,b)=>a+b,0),0);
const indices=[2,1,0];
const mixed=spin10.map((x,i)=>x.u1PsiCharge*indices[i]);
assert.deepEqual(mixed,evidence.anomalies.u1Psi.spin10SquaredMixedTerms);
assert.equal(mixed.reduce((a,b)=>a+b,0),0);

// The family contributes four doublets to each weak SU(2); the bidoublet
// contributes two more to each.  Both Witten parities remain even.
assert.equal(evidence.anomalies.patiSalam.su2LDoubletCount,6);
assert.equal(evidence.anomalies.patiSalam.su2RDoubletCount,6);
assert.deepEqual([
  evidence.anomalies.patiSalam.su2LDoubletCount%2,
  evidence.anomalies.patiSalam.su2RDoubletCount%2
],evidence.anomalies.patiSalam.wittenParity);
assert.equal(evidence.anomalies.patiSalam.su4CubicContributions.reduce((a,b)=>a+b,0),0);

// Reality counts answer three different questions and must not be conflated.
assert.equal(27*2,evidence.reality.fullE6Ordinary.dimension);
assert.equal(16*2+10+1,evidence.reality.brokenPatiSalamOrdinary.dimension);
assert.equal(evidence.reality.outerTwist.twistedDimension,27);
assert.equal(evidence.reality.fullE6Ordinary.dimension,54);
assert.equal(evidence.reality.brokenPatiSalamOrdinary.dimension,43);
assert.equal(evidence.grading.fullE6CommutantDimension,1);
assert.equal(evidence.grading.nontrivialE6EquivariantGradingExists,false);

// U(1)_psi charge conservation leaves precisely the familiar 16*16*10 and
// 10*10*1 branch types inside the symmetric 27 cubic.
const q={"16_1":1,"10_-2":-2,"1_4":4};
for(const triple of evidence.cubicAndYukawaChannels.matterCubic27.u1PsiNeutralBranchTriples)
  assert.equal(triple.reduce((s,x)=>s+q[x],0),0);
assert.deepEqual(
  evidence.cubicAndYukawaChannels.matterCubic27.u1PsiNeutralBranchTriples,
  [["16_1","16_1","10_-2"],["10_-2","10_-2","1_4"]]);
assert.equal(evidence.cubicAndYukawaChannels.matterCubic27.diracBidoubletPresent,true);
assert.equal(evidence.cubicAndYukawaChannels.matterCubic27.rightMajorana126Present,false);

// The 351' dimension ledger and family multiplicity expose exactly what its
// one parent tensor does and does not buy.
const dims=evidence.cubicAndYukawaChannels.scalar351Prime.spin10Dimensions;
assert.deepEqual(dims,[1,10,16,54,126,144]);
assert.equal(dims.reduce((a,b)=>a+b,0),351);
assert.equal(evidence.cubicAndYukawaChannels.scalar351Prime.containsSpin10ConjugateOneHundredTwentySix,true);
assert.equal(evidence.cubicAndYukawaChannels.scalar351Prime.symmetricMatterChannelMultiplicity,1);
assert.equal(evidence.portalWardTest.oneFamilyGaugeTensorCoefficientCount,1);
assert.equal(evidence.portalWardTest.threeFamilySymmetricCoefficientCount,3*4/2);
assert.equal(evidence.portalWardTest.typedExchangeExists,false);

assert.equal(evidence.verdict.ordinaryFullE6Reality,'54 states');
assert.equal(evidence.verdict.ordinaryBrokenPatiSalamReality,'43 states after discarding U(1)_psi and E6 covariance');
assert.equal(evidence.verdict.twistedE6Reality,'27 states conditionally');
assert.equal(evidence.verdict.minimal27CubicMajoranaClosure,'UNSAT');
assert.equal(evidence.verdict.portalWardIntertwiner,'UNSAT');

console.log('PASS 1560: 27 = 16_1 + 10_-2 + 1_4 gives an anomaly-free chiral E6 parent and maps the extra eleven states exactly to (6,1,1)+(1,2,2)+(1,1,1); it needs 54 states for ordinary full-E6 reality (43 only after abandoning E6 and U(1)_psi), admits a conditional outer-twisted 27, and its minimal 27 cubic lacks a Majorana 126.  A 351-prime unifies the two portal types in one gauge tensor but does not derive the selected-family, VEV-normalized, threshold-parallel Ward line.');

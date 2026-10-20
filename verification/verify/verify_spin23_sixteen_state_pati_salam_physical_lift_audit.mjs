import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const labels=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-sixteen-state-gauge-higgs-mass-audit.json','utf8'));
const evidence=JSON.parse(readFileSync(
  'evidence/data/spin23-sixteen-state-pati-salam-physical-lift-audit.json','utf8'));
assert.equal(evidence.schema,'spin23.sixteen-state-pati-salam-physical-lift-audit/1');

const base=JSON.parse(readFileSync(
  'evidence/data/spin23-six-character-ordinary-correspondence-completion.json','utf8'));
const states=[...base.hilbertSpace.sectors,...labels.addedStates];
assert.equal(states.length,16);
assert.equal(states.filter(x=>x.gamma===1).length,8);
assert.equal(states.filter(x=>x.gamma===-1).length,8);
assert.equal(evidence.dimensionAndChirality.labelDimension,16);
assert.equal(evidence.dimensionAndChirality.labelGammaPlus,8);
assert.equal(evidence.dimensionAndChirality.labelGammaMinus,8);

const rep=(su4,su2L,su2R)=>({su4,su2L,su2R});
const FL=rep('4','2','1');
const FRc=rep('bar4','1','2');
const conjugate=r=>rep(r.su4==='4'?'bar4':r.su4==='bar4'?'4':r.su4,r.su2L,r.su2R);
const lrTwist=r=>rep(r.su4,r.su2R,r.su2L);
const same=(a,b)=>a.su4===b.su4&&a.su2L===b.su2L&&a.su2R===b.su2R;

// An ordinary antilinear intertwiner V -> W exists only when W is
// equivalent to conjugate(V).  The weak factor is the exact obstruction.
assert.deepEqual(conjugate(FL),rep('bar4','2','1'));
assert.ok(!same(conjugate(FL),FRc));
assert.ok(!same(conjugate(FRc),FL));
assert.equal(evidence.ordinaryReality.ordinaryIntertwinerDimension,0);
assert.equal(evidence.ordinaryReality.reverseIntertwinerDimension,0);
assert.equal(evidence.ordinaryReality.minimalOrdinaryRealDimension,32);
assert.equal(evidence.ordinaryReality.sixteenStateOrdinaryDecision,'UNSAT');

// The obstruction disappears only after composing conjugation with the
// left-right outer automorphism.  This certifies the conditional twisted
// reopening without mislabelling it as ordinary reality.
assert.ok(same(lrTwist(conjugate(FL)),FRc));
assert.ok(same(lrTwist(conjugate(FRc)),FL));
assert.equal(evidence.twistedReality.twistedIntertwinerDimension,1);
assert.equal(evidence.twistedReality.sixteenStateTwistedDecision,'CONDITIONAL SAT');

// One all-left Pati-Salam family cancels SU(4)^3: the two weak components
// of 4 and bar4 contribute with opposite cubic index.  Each weak factor
// sees four doublets, so both Witten parities are even.
const su4Cubic=[2,-2];
assert.deepEqual(evidence.nonabelianAnomalies.su4CubicContributions,su4Cubic);
assert.equal(su4Cubic.reduce((a,b)=>a+b,0),0);
assert.equal(evidence.nonabelianAnomalies.su2LPseudorealDoubletCount,4);
assert.equal(evidence.nonabelianAnomalies.su2RPseudorealDoubletCount,4);
assert.deepEqual([
  evidence.nonabelianAnomalies.su2LPseudorealDoubletCount%2,
  evidence.nonabelianAnomalies.su2RPseudorealDoubletCount%2
],evidence.nonabelianAnomalies.wittenParity);

// 4 x bar4 contains 1+15, while 2_L x 2_R is a bidoublet rather than a
// singlet.  Hence every cross-chiral coefficient needs a (1 or 15,2,2)
// scalar insertion, including the orbit neutral only under the label torus.
const su4Product=['1','15'];
const weakProduct=['2','2'];
const scalarCandidates=su4Product.map(x=>`(${x},${weakProduct[0]},${weakProduct[1]})`);
assert.deepEqual(scalarCandidates,evidence.linkAndScalarLift.diracScalarCandidates);
assert.equal(evidence.linkAndScalarLift.patiSalamBareBilinearSingletMultiplicity,0);
assert.equal(labels.jEdgeOrbitAudit.length,7);
assert.equal(labels.bareInvariantOrbitCount,1);
assert.equal(evidence.linkAndScalarLift.labelJEdgeOrbitCount,7);
assert.equal(evidence.linkAndScalarLift.physicalBareOrbitCount,0);

// The declared finite-Dirac support is grading odd.  Under the only
// dimension-compatible assignment all its edges are FL--FRc edges, whereas
// the right-Majorana carrier is FRc--FRc and therefore grading even.
const permitted=(u,v)=>u.gamma*v.gamma===-1&&
  u.relationParity===v.relationParity&&
  (u.left===v.left||u.right===v.right);
const allowedEdges=[];
for(let i=0;i<states.length;i++)for(let j=i+1;j<states.length;j++)
  if(permitted(states[i],states[j]))allowedEdges.push([states[i],states[j]]);
assert.equal(allowedEdges.length,14);
assert.ok(allowedEdges.every(([u,v])=>u.gamma*v.gamma===-1));
assert.equal(allowedEdges.length/2,labels.jEdgeOrbitAudit.length);
assert.equal(evidence.linkAndScalarLift.allOrbitsCrossGamma,true);
assert.equal(evidence.majoranaAndBreaking.rightMajoranaGammaParityUnderCandidateAssignment,'even');
assert.equal(evidence.majoranaAndBreaking.declaredFiniteDiracEdgeParity,'odd');
assert.equal(evidence.majoranaAndBreaking.majoranaPresentInSevenEdgeSupport,false);
assert.ok(evidence.majoranaAndBreaking.standardBreakingExamples.every(
  x=>!evidence.linkAndScalarLift.diracScalarCandidates.includes(x)));

assert.equal(evidence.verdict.representationAndChiralityCount,'SAT');
assert.equal(evidence.verdict.nonabelianAnomalyGate,'SAT');
assert.equal(evidence.verdict.ordinarySixteenStateJ,'UNSAT');
assert.equal(evidence.verdict.leftRightTwistedSixteenStateJ,'CONDITIONAL SAT');
assert.equal(evidence.verdict.physicalScalarAndBreakingClosure,'UNSAT');

console.log('PASS 1556: the repaired 16 labels match one chiral Pati-Salam family and its anomaly counts, but ordinary gauge-equivariant J has zero intertwiner dimension and requires a 32-state real completion; only an explicit left-right twist closes J at 16, while all seven Dirac edges need bidoublet lifts and supply neither the same-chirality Majorana carrier nor conventional high-scale Pati-Salam breaking.');

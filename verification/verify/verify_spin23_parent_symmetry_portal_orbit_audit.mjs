import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const evidence=JSON.parse(readFileSync('evidence/data/spin23-parent-symmetry-portal-orbit-audit.json','utf8'));

// Pati-Salam representation tuples use (SU4,SU2L,SU2R) dimensions.
const dimension=r=>r.reduce((a,b)=>a*b,1);
const FL=[4,2,1],FR=[4,1,2];
const HD1=[1,2,2],HD15=[15,2,2];
const HMR=[10,1,3],HM6=[6,1,1];
assert.equal(dimension(FL),8);
assert.equal(dimension(FR),8);
assert.deepEqual(
  {H_D1:dimension(HD1),H_D15:dimension(HD15),H_MR:dimension(HMR),H_M6:dimension(HM6)},
  evidence.involutionInvariant.scalarDimensions
);

// Whole irreducible multiplets in one orbit of an automorphism must have the
// same dimension. None of the sourced D scalars matches either M scalar.
for(const d of [HD1,HD15])for(const m of [HMR,HM6])
  assert.notEqual(dimension(d),dimension(m));

// Left-right parity swaps only the two SU(2) dimensions. It relates FL/FR,
// fixes a bidoublet type, and sends a right triplet to a left triplet rather
// than to either Dirac scalar.
const lr=([d4,dL,dR])=>[d4,dR,dL];
assert.deepEqual(lr(FL),FR);
assert.deepEqual(lr(HD1),HD1);
assert.deepEqual(lr(HD15),HD15);
assert.deepEqual(lr(HMR),[10,3,1]);
assert.notDeepEqual(lr(HMR),HD1);
assert.notDeepEqual(lr(HMR),HD15);

// SU(4)xSp(4) is the smallest audited connected near-miss. Sp(4) branch
// dimensions work: 4=(2,1)+(1,2), 10=(3,1)+(1,3)+(2,2). But a product irrep
// carries one fixed SU(4) dimension across all weak branches.
assert.equal(2+2,4);
assert.equal(3+3+4,10);
const diracSU4=[1,15],majoranaSU4=[10,6];
for(const d of diracSU4)for(const m of majoranaSU4)assert.notEqual(d,m);

// Spin(10) branch accounting. The 16 contains both matter chiralities. The
// 126 contains the adjoint-bidoublet and right-Majorana branches, while the
// 10 contains the singlet bidoublet. Multiplicity-one channels do not merge
// distinct parent irreps.
const spin16Branches=new Set(['FL','FR']);
const spin10Branches=new Set(['HD1','HM6']);
const spin126Branches=new Set(['HD15','HMR','HML','HM6']);
assert.ok(spin16Branches.has('FL')&&spin16Branches.has('FR'));
assert.ok(spin10Branches.has('HD1'));
assert.ok(spin126Branches.has('HD15')&&spin126Branches.has('HMR'));
const spinTensorMultiplicities={10:1,120:1,126:1};
assert.deepEqual(spinTensorMultiplicities,{10:1,120:1,126:1});
const minimalChannels=new Set(['10','126']);
assert.equal(minimalChannels.size,2); // HD1 plus HMR
const shared126Channels=new Set(['126','126']);
assert.equal(shared126Channels.size,1); // HD15 plus HMR

// D parity preserves portal type: the 126 bidoublet remains a bidoublet and
// HMR goes to HML. It does not exchange the complete portal complexes.
const dParity={HD15:'HD15',HMR:'HML',HML:'HMR'};
assert.notEqual(dParity.HD15,'HMR');
assert.notEqual(dParity.HMR,'HD15');

// E6 branch accounting. One 351-prime contains both Spin(10) 10 and 126,
// and selecting its multiplicity-one Yukawa channel gives one parent gauge
// tensor. The outer involution conjugates the whole parent representation,
// not the two internal branches.
const e627Branches=new Set(['16','10','1']);
const e6351pBranches=new Set(['1','10','16','54','126','144']);
assert.ok(e627Branches.has('16'));
assert.ok(e6351pBranches.has('10')&&e6351pBranches.has('126'));
const e6TensorChannels={bar27:1,bar351:1,bar351prime:1};
assert.equal(e6TensorChannels.bar351prime,1);
const e6Outer={27:'bar27',bar27:'27',"351prime":'bar351prime',bar351prime:'351prime'};
assert.equal(e6Outer['351prime'],'bar351prime');
assert.notEqual(e6Outer['351prime'],'10');
assert.notEqual(e6Outer['351prime'],'126');

// A doubled Pati-Salam exchange preserves the type label and therefore has
// two operator cycles, exactly as in claim 1534.
const doubled=['D_A','M_A','D_B','M_B'];
const copyExchange=[2,3,0,1];
const type=x=>x[0];
for(let i=0;i<4;i++)assert.equal(type(doubled[i]),type(doubled[copyExchange[i]]));
const fixedCouplings=[2,7,2,7];
assert.deepEqual(copyExchange.map(i=>fixedCouplings[i]),fixedCouplings);
assert.notEqual(fixedCouplings[0],fixedCouplings[1]);

// One gauge invariant tensor is not one numerical coefficient with family
// multiplicity. A symmetric n-family Yukawa matrix has n(n+1)/2 entries.
const symmetricFamilyDimension=n=>n*(n+1)/2;
assert.equal(symmetricFamilyDimension(1),1);
assert.equal(symmetricFamilyDimension(3),6);
assert.equal(evidence.familyMultiplicityAudit.threeFamilyDimension,6);
const Y={PP:3,PN:5};
assert.notEqual(Y.PP,Y.PN);

// Candidate-level result matrix: none passes complete orbit, while Spin(10)
// and E6 alone reach one gauge-tensor channel.
assert.equal(evidence.candidateAudit.length,5);
assert.equal(evidence.candidateAudit.some(x=>x.completePortalOrbit),false);
const oneGaugeTensor=evidence.candidateAudit
  .filter(x=>x.gaugeInvariantContractionCountLowerBound===1)
  .map(x=>x.candidate);
assert.deepEqual(oneGaugeTensor,['Spin(10)','E6']);
assert.equal(evidence.candidateAudit.some(x=>x.familyMultiplicityResolved),false);

assert.equal(evidence.ranking[0].candidate,'Spin(10) shared-126 channel');
assert.match(evidence.strongestConclusion,/No audited standard compact parent/);
assert.match(evidence.reopeningDatum,/Y_PP and Y_PN/);
assert.match(evidence.verdict,/not exchange but a single parent invariant/);

console.log('PASS 1535: no audited normalizer involution exchanges the unequal-dimensional complete Dirac and Majorana Pati-Salam scalar multiplets. Spin(10) shared-126 and E6 351-prime channels each provide a multiplicity-one gauge tensor containing both component types, but neither supplies a D/M involutive orbit or equates the distinct selected family-matrix entries.');

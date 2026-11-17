import hashlib
import json
from pathlib import Path
import numpy as np

receipt_path='evidence/data/joint-background-source-checks-v1.json'
receipt=json.loads(Path(receipt_path).read_text())
sources=[receipt_path,'scripts/audit-joint-background-vacuum-kinetic-protection.py',
 'evidence/data/peirce-potential-kinetic-metric-v1.json',
 'evidence/data/dynamical-finite-dirac-full-action-v1.json',
 'corpus/claims/1500-1599/1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md',
 'corpus/claims/1500-1599/1574_two_matter_channels_close_the_copy_frame_but_reduction_to_one_chiral_family_collapses_it_at_threshold.md',
 'corpus/claims/1500-1599/1575_a_residual_Z3_family_cycle_realizes_the_two_copy_frame_and_protects_a_three_family_E6_portal.md',
 'corpus/claims/1500-1599/1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md']
for check in receipt['checks']:
    assert check['exitCode']==0
    sources.append(check['command'].removeprefix('node '))

def basis(n):
    out=[]
    for i in range(n):
        T=np.zeros((n,n),complex);T[i,i]=1;out.append(T)
    for i in range(n):
        for j in range(i):
            T=np.zeros((n,n),complex);T[i,j]=T[j,i]=1/np.sqrt(2);out.append(T)
            T=np.zeros((n,n),complex);T[i,j]=1j/np.sqrt(2);T[j,i]=-1j/np.sqrt(2);out.append(T)
    return out
T=basis(3)
assert np.allclose([[np.trace(a@b) for b in T] for a in T],np.eye(9))
def hessian(M,c2,c4):
    M2=M@M
    images=[-2*c2*t+4*c4*(M2@t+M@t@M+t@M2) for t in T]
    return np.array([[np.trace(a@b).real for b in images] for a in T])

rows=[]
for c2 in [.5,2.,8.]:
    c4=ckin=y=1.;v=np.sqrt(c2/(2*c4))
    for label,signs,theta in [('all_positive',[1,1,1],0.),('mixed_0',[1,-1,-1],0.),
                              ('mixed_03',[1,-1,-1],.3),('mixed_07',[1,-1,-1],.7)]:
        O=np.eye(3);O[:2,:2]=[[np.cos(theta),-np.sin(theta)],[np.sin(theta),np.cos(theta)]]
        M=v*O@np.diag(signs)@O.T
        H=hessian(M,c2,c4);freq=np.linalg.eigvalsh(H/(2*ckin));radial=2*c2/ckin
        gap=float(min(abs(y*np.linalg.eigvalsh(M))))
        rows.append(dict(label=label,c2=c2,c4=c4,cKin=ckin,y=y,v=v,PhiReal=M.tolist(),
          a=float(M[0,0]),BReal=M[1:,1:].tolist(),KReal=M[1:,0].tolist(),
          radialMassSquared=radial,minimumFermionGap=gap,gapToRadialMass=gap/np.sqrt(radial),
          realHermitianHessian=H.tolist(),generalizedSquaredFrequencies=freq.tolist(),
          positiveCurvatureDirections=int((freq>1e-8).sum()),zeroCurvatureDirections=int((abs(freq)<1e-8).sum()),
          fullGaussianScaleDerivativeAtVacuum=float(-2*np.trace((M@M)).real*np.exp(-v*v))))

deformations=[]
for ckin,y in [(1.,1.),(1.25,1.),(2.,1.),(1.,.8)]:
    c2=c4=1.;v=np.sqrt(c2/(2*c4));mass2=2*c2/ckin
    deformations.append(dict(cKin=ckin,c4=c4,c2=c2,y=y,v=v,
      radialMassSquared=mass2,fermionGap=y*v,ratio=y*v/np.sqrt(mass2),
      preservesBosonicUnitaryConjugation=True,leavesStrictBareSpectralCoefficientRelation=(ckin!=c4 or y!=1.)))

# One odd 1-to-2 block is stationary in the unrestricted quartic but has an
# unstable formerly-unmatched diagonal direction; the odd restriction removes it.
odd=np.array([[0.,1.,0.],[1.,0.,0.],[0.,0.,0.]])
odd_freq=np.linalg.eigvalsh(hessian(odd,2.,1.)/2)

report=dict(schemaVersion='joint-background-vacuum-kinetic-protection-v1',date='2026-11-08',
 authority='Bounded corpus/primary-source audit and fully varied classical Hermitian polynomial comparison. No physical T1/T2 full vacuum, beta functions or pole-mass relation derived.',
 evidenceFamily='corpus-selector-action-audit',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sorted(set(sources))},
 sourceVerificationReceipt=receipt_path,
 primarySources=[
  dict(url='https://arxiv.org/html/1112.4690',version='v1',sections='introduction and discussion after Example 30; renormalizable versus multiplicatively renormalizable',accessed='2026-11-08'),
  dict(url='https://www.waltervansuijlekom.nl/wp-content/uploads/2020/11/Chamseddine2020_Article_SpectralActionInMatrixForm.pdf',sections='introduction and equations 9-11; stability investigation',accessed='2026-11-08')],
 primarySourceBoundary='Primary pages reviewed; full remote source bytes are not archived here.',
 jointlyVariedPolynomial=dict(potential='-c2 Tr Phi^2+c4 Tr Phi^4; c2,c4>0',
  exactLowerBound='V>=-N c2^2/(4 c4), equality iff Phi^2=c2/(2 c4) I',
  variationDomain='All Hermitian 3x3 entries; no physical gauge/representation identification asserted.',
  metric='2 cKin I on a trace-orthonormal real Hermitian basis',
  normalizedRatio='Delta^2/m_rad^2=y^2 cKin/(4 c4)',
  massRatioConstantAcrossVacuumOrbit=True,backgroundBlocksUnique=False,samples=rows),
 pureCrossRestriction=dict(matrix=odd.tolist(),minimumFermionSingularValue=0.,
  unrestrictedSquaredFrequencies=odd_freq.tolist(),
  cannotReachInvertibleEqualMassMinimumWithRankOneToRankTwoOddSupport=True),
 symmetryAllowedDeformations=deformations,
 fieldCoordinateInvariant='y^2 cKin/c4 unchanged under Phi_new=t Phi, y_new=y/t, cKin_new=cKin/t^2, c4_new=c4/t^4',
 corpusProtectionAudit=dict(reducedStableVacuum1567=True,completePhysicalE6ScalarVacuumDerived=False,
  residualZ3ForbidsSelectedMixedCopyOperators1575=True,
  residualZ3FixesYukawaKineticQuarticRatio=False,
  thresholdCanDestroyTightFrame1574=True),
 quantumCondition=dict(constantRunningTreeCombinationRequires='2 beta_y/y+beta_kin/cKin-beta_4/c4=0 plus compatible thresholds',
  physicalBetaFunctionsComputed=False,poleSelfEnergyMatchingComputed=False,
  multiplicativeSpectralProtectionEstablished=False,
  predictionPossibleFromUniqueUVBoundaryAndComputedRunningWithoutExactProtection=True),
 verdict=dict(jointPolynomialVariationRemovesIndependentBackgroundFittingAtTreeLevel=True,
  orbitInvariantConditionalTreeRatio=True,
  originalFullDecayingCutoffVacuumStabilized=False,
  physicalBackgroundCarrierDerived=False,
  kineticYukawaQuarticCombinationProtectedByInspectedCorpus=False,
  positivePhysicalT1T2PoleMassRatioPredicted=False,
  universalNoGoForPredictiveUVCompletion=False,
  nextDiscriminator='One sourced full stabilizing action and physical carrier, with either a protecting Ward identity or independently fixed UV boundary plus calculated RG, threshold and pole matching.'))
out=Path('evidence/data/joint-background-vacuum-kinetic-protection-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),sourceHashes=len(report['sources']),verdict=report['verdict']),indent=2))

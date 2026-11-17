import hashlib
import json
from pathlib import Path
import numpy as np

sources = [
 'scripts/audit-peirce-potential-kinetic-metric.py',
 'evidence/data/peirce-metric-source-checks-v1.json',
 'verification/verify/verify_linking_pairing_real_structure_gap.mjs',
 'evidence/data/dynamical-finite-dirac-full-action-v1.json',
 'evidence/data/spectral-mass-ratio-closure-v1.json',
 'corpus/claims/0100-0199/198_linking_algebra_pairing_uniqueness_and_real_structure_gap.md',
 'corpus/claims/1100-1199/1195_a_charge_three_cross_peirce_vacuum_completes_the_rank_split_to_a_full_jordan_frame_but_needs_response_to_gap_cp1.md',
 'corpus/claims/1100-1199/1197_the_minimum_variance_response_functional_is_a_canonical_relative_selector_but_standard_model_family_spaces_and_weights_remain_noncanonical.md',
 'corpus/claims/1100-1199/1198_the_charge_three_link_has_a_scalar_flavon_versus_dynamical_cross_peirce_fork_separating_bf_closure_from_flavour_closure.md',
 'corpus/claims/1500-1599/1502_pure_curvature_is_blind_to_flat_leakage_but_covariant_projector_energy_selects_the_parallel_mask.md',
 'corpus/claims/1000-1099/1084_the_minimal_spectral_graph_has_an_all_orders_rank_one_bridge_normal_form_that_forbids_holomorphic_cross_six_mixing.md',
 'corpus/claims/1500-1599/1530_the_common_coefficient_line_is_RG_invariant_only_under_universal_projective_flow_and_a_fixed_ratio_requires_a_Ward_eigenline.md']

def phi(a, B, K):
    return np.block([[np.array([[a]]), K.conj()[None,:]], [K[:,None], B]])

rows = []
for label, a, bvalues in [('background_08',0.,[.2,.8]),('background_11',0.,[.2,1.1]),('pure_cross',0.,[0.,0.])]:
    c2,c4,ckin=2.,1.,1.
    B=np.diag(bvalues)
    H=-2*c2*np.eye(2)+4*c4*(a*a*np.eye(2)+a*B+B@B)
    h, U=np.linalg.eigh(H); Z=2*ckin
    v=np.sqrt(-h[0]/(4*c4));K=v*U[:,0].astype(complex)
    full=phi(a,B,K);eig, vec=np.linalg.eigh(full)
    mass_rad2=-2*h[0]/Z
    gap=float(min(abs(eig)))
    hessian=np.diag([-2*h[0],0.,h[1]-h[0],h[1]-h[0]])
    fprime=vec@np.diag(-2*eig*np.exp(-eig*eig))@vec.conj().T
    gradient=[]
    for j in range(4):
        dk=np.zeros(2,complex);dk[j//2]=(1 if j%2==0 else 1j)/np.sqrt(2)
        tangent=phi(0.,np.zeros((2,2)),dk)
        gradient.append(float(np.trace(fprime@tangent).real))
    grading=np.diag([1.,-1.,-1.])
    rows.append(dict(label=label,a=a,B=B.tolist(),c2=c2,c4=c4,cKin=ckin,
      H=H.tolist(),h=h.tolist(),selectedKReal=K.real.tolist(),selectedKImag=K.imag.tolist(),
      linkNormSquared=v*v,kineticMetric=(Z*np.eye(4)).tolist(),realCoordinateHessian=hessian.tolist(),
      radialMassSquared=mass_rad2,directionalMassSquared=(h[1]-h[0])/Z,
      phasePotentialCurvature=0.,fermionEigenvalues=eig.tolist(),minimumFermionSingularValue=gap,
      minimumGapToRadialMass=gap/np.sqrt(mass_rad2),
      pairedLinkNormToRadialMass=v/np.sqrt(mass_rad2),
      fullGaussianGradientAtTruncatedVacuum=gradient,
      fullGaussianGradientNorm=float(np.linalg.norm(gradient)),
      sectorGradingAnticommutatorNorm=float(np.linalg.norm(grading@full+full@grading))))

base=rows[0];kinetic_family=[]
for delta_z in [0.,1.,3.]:
    Z=base['kineticMetric'][0][0]+delta_z
    mr2=-2*base['h'][0]/Z
    kinetic_family.append(dict(deltaZ=delta_z,totalKineticZ=Z,radialMassSquared=mr2,
      fixedFermionGap=base['minimumFermionSingularValue'],
      minimumGapToRadialMass=base['minimumFermionSingularValue']/np.sqrt(mr2)))

report=dict(schemaVersion='peirce-potential-kinetic-metric-v1',date='2026-11-08',
 authority='New exact block-trace identities and leading heat-coefficient comparison; supplied backgrounds and declared matrix carrier, not a derived physical T1/T2 stabilizing theory.',
 evidenceFamily='corpus-selector-action-audit',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sorted(sources)},
 sourceVerificationReceipt='evidence/data/peirce-metric-source-checks-v1.json',
 primarySources=[dict(url='https://arxiv.org/html/1507.08161',version='v1',sections='equations 12-21; free allowed finite entries',accessed='2026-11-08')],
 model=dict(block='Phi=[[a,K^dagger],[K,B]]; P rank 1, Q rank 2; a and B fixed in link variation',
  tracePhi4='a^4+Tr B^4+4 K^dagger(a^2 I+a B+B^2)K+2(K^dagger K)^2',
  potential='K^dagger H K+2 c4 (K^dagger K)^2',
  H='-2 c2 I+4 c4(a^2 I+a B+B^2)',
  metric='G_K=2 cKin I in K_j=(x_j+i y_j)/sqrt(2)',
  heatCoefficients=dict(c2='f2 Lambda^2/(2 pi^2)',c4='f0/(8 pi^2)',cKin='f0/(8 pi^2)'),
  radialMassSquared='-2 h1/Z_K',directionalMassSquared='(h2-h1)/Z_K',
  assumptions=['flat Dirac/scalar heat action through a4','canonical fermion mass vertex Phi',
   'one declared common block trace','fixed Hermitian diagonal backgrounds','physical gauge and Lorentz identification open']),
 backgroundFamily=rows,allowedEFTKineticCorrectionFamily=kinetic_family,
 kineticCorrectionBoundary='Counterexample to symmetry/potential uniqueness in the local EFT. It leaves a strictly frozen bare spectral coefficient relation, so it is not a counterexample within that narrower axiom.',
 corpusAudit=dict(relativeAlignmentFunctionalExists=True,physicalResponseTensorsAndWeightsDerived=False,
  invariantMetricShapeExistsUpToScale=True,fullSelectingPotentialAndKineticMetricDerived=False),
 verdict=dict(leadingLinkPotentialAndMetricDerivedInDeclaredBlock=True,
  physicalDiagonalBackgroundsSelected=False,
  fullGaussianStationarityAtSavedQuarticVacua=False,
  scalarReferenceFixedByPhysicalCorpusAction=False,
  fullMinimumGapEqualsLinkNorm=False,
  pureCrossRankOneToRankTwoHasUnmatchedZero=True,
  positivePhysicalT1T2MassRatioPredicted=False,
  nextDiscriminator='Identify physical P,K,a,B and derive their common full stabilizing action and kinetic operator; solve the controlled vacuum, then obtain fermion singular values and scalar pole without target calibration.'))
out=Path('evidence/data/peirce-potential-kinetic-metric-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),sourceHashes=len(sources),verdict=report['verdict']),indent=2))

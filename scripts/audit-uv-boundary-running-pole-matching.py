import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq

receipt_path='evidence/data/uv-pole-source-checks-v1.json'
receipt=json.loads(Path(receipt_path).read_text())
sources=[receipt_path,'scripts/audit-uv-boundary-running-pole-matching.py',
 'evidence/data/joint-background-vacuum-kinetic-protection-v1.json',
 'corpus/claims/1600-1699/1612_a_radiative_selector_portal_joins_spin23_planck_and_yang_mills_scales_but_retains_one_color_boundary.md',
 'corpus/claims/1600-1699/1616_asymptotic_safety_can_conditionally_fix_the_color_boundary_but_not_without_a_spin23_universality_class.md',
 'corpus/claims/1700-1799/1745_the_known_rg_slice_cannot_identify_an_interacting_one_eighth_axial_fixed_point.md',
 'corpus/claims/1700-1799/1746_the_fixed_point_escape_is_reduced_to_a_complete_beta_and_matching_packet.md',
 'corpus/claims/1700-1799/1760_both_surviving_routes_now_end_at_new_construction_not_unexecuted_local_inference.md']
for check in receipt['checks']:
    assert check['exitCode']==0
    sources.append(check['command'].removeprefix('node '))

g=.3;mf=1.;multiplicity=1
def rho(t):
    return multiplicity*g*g*t/(8*np.pi)*max(1-4*mf*mf/t,0)**1.5 if t>4*mf*mf else 0.
def nonlocal_part(s):
    assert 0<=s<4
    integral=quad(lambda z:z**4/(4-s+s*z*z),0,1,epsabs=1e-12)[0]
    return multiplicity*g*g*s*s/(4*np.pi**2)*integral
def nonlocal_derivative(s):
    I=quad(lambda z:z**4/(4-s+s*z*z),0,1,epsabs=1e-12)[0]
    dI=quad(lambda z:z**4*(1-z*z)/(4-s+s*z*z)**2,0,1,epsabs=1e-12)[0]
    return multiplicity*g*g/(4*np.pi**2)*(2*s*I+s*s*dI)
def pole(A,B,tree_mass_squared=4.):
    equation=lambda s:s-tree_mass_squared+A+B*s+nonlocal_part(s)
    s=brentq(equation,0,4-1e-10,xtol=1e-13)
    return dict(A=A,B=B,treeScalarMassSquared=tree_mass_squared,poleSquared=s,
      scalarChannelPoleMass=float(np.sqrt(s)),referenceFermionMass=mf,
      conditionalPoleMassRatio=float(mf/np.sqrt(s)),
      residue=float(1/(1+B+nonlocal_derivative(s))),inversePropagatorResidual=equation(s))
matching=[pole(A,B) for A,B in [(0.,0.),(.05,0.),(.2,0.),(.05,.01)]]
scheme_before=pole(.05,0.);scheme_after=pole(.15,0.,4.1)
threshold=[]
for s in [3.9,4.,4.0001,4.1,5.,9.]:
    width=rho(s)/np.sqrt(s) if s>4 else 0.
    threshold.append(dict(s=s,absorptiveWeight=rho(s),partialWidth=width))

report=dict(schemaVersion='uv-boundary-running-pole-matching-v1',date='2026-11-08',
 authority='Bounded source audit and declared scalar-channel dispersive matching surrogate. No UV completion, target beta functions, full threshold packet or physical T1/T2 pole ratio derived.',
 evidenceFamily='corpus-selector-action-audit',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sorted(set(sources))},
 sourceVerificationReceipt=receipt_path,
 primarySources=[dict(url='https://arxiv.org/html/hep-ph/0109228',version='v2',sections='1-2; complex poles, physical thresholds and tadpole consistency',accessed='2026-11-08')],
 primarySourceBoundary='Primary page reviewed; full remote source bytes are not archived here.',
 corpusInputAudit=dict(stablePhysicalFullUVActionAvailable=False,independentTargetBoundaryConditionsAvailable=False,
  targetCompleteBetaFunctionsAvailable=False,targetHeavySpectrumAndMatchingAvailable=False,
  targetScalarFermionSelfEnergyPacketAvailable=False,
  knownColorFixedPointIsDeclaredToySystem=True,knownAxialBetaSliceIdentifiesFullFixedPoint=False,
  existingLocalQuantumPacketClosesThisUVTheory=False),
 formalPolePipeline=dict(runningTreeRatioDerivative='beta_y/y + beta_kin/(2 cKin) - beta_4/(2 c4)',
  firstOrderStablePoleRatio='R_pole=R_running*(1+delta_f-delta_r/2)',
  physicalRunningComputed=False,physicalThresholdCorrectionsComputed=False,
  possibleComplexPolePrescriptionRequired=True),
 scalarChannelSurrogate=dict(inputs=dict(g=g,referenceFermionMass=mf,multiplicity=multiplicity,treeScalarMassSquared=4.),
  inversePropagatorConvention='Gamma_r(s)=s-mr0^2+Pi_R(s)',
  cut='rho(t)=N g^2 t/(8 pi)*(1-4 mf^2/t)^(3/2) theta(t-4 mf^2)',
  twiceSubtractedSelfEnergy='Pi_R(s)=A+B s+s^2/pi integral_4^infinity rho(t)/(t^2(t-s-i0)) dt',
  belowThresholdTransform='Pi_nonlocal(s)=N g^2 s^2/(4 pi^2) integral_0^1 z^4/(4-s+s z^2) dz; mf=1',
  matchingFamily=matching,thresholdSamples=threshold,
  sameCutAcrossMatchingFamily=True,matchingTermsDerivedFromUV=False,
  scope='Fixed reference fermion and one scalar self-energy channel; roots of a declared inverse propagator, not complete QFT predictions.',
  omitted=['fermion self-energy','other scalar and gauge loops','tadpole/VEV matching','heavy thresholds',
   'target-model beta functions','vacuum stability and complex-pole continuation above threshold']),
 finiteSchemeControl=dict(transformation='A->A+delta and mr0^2->mr0^2+delta leaves Gamma unchanged',
  before=scheme_before,after=scheme_after,
  changingMatchingAtFixedTreeParameterIsPureSchemeChange=False),
 verdict=dict(treeRatioOneHalfIsPairThresholdIfScalarVertexAllowed=True,
  cutAloneFixesFiniteMatchingTerms=False,
  sameCutWithDifferentMatchingChangesScalarChannelPole=True,
  consistentFiniteSchemeReparameterizationPreservesPole=True,
  stablePhysicalUVActionDerived=False,
  targetMassFitted=False,
  physicalUVRunningThresholdPolePredictionEstablished=False,
  universalUVCompletionNoGo=False,
  nextDiscriminator='A new or supplied complete physical UV model with independently fixed boundary data, complete beta functions, vacuum and heavy spectrum, then consistent finite matching and two-point pole calculations.'))
out=Path('evidence/data/uv-boundary-running-pole-matching-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),sourceHashes=len(report['sources']),verdict=report['verdict']),indent=2))

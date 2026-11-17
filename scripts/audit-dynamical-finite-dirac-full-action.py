import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq

sources = [
 'scripts/audit-dynamical-finite-dirac-full-action.py',
 'evidence/data/spectral-mass-ratio-closure-v1.json',
 'corpus/claims/1100-1199/1198_the_charge_three_link_has_a_scalar_flavon_versus_dynamical_cross_peirce_fork_separating_bf_closure_from_flavour_closure.md',
 'corpus/claims/1100-1199/1195_a_charge_three_cross_peirce_vacuum_completes_the_rank_split_to_a_full_jordan_frame_but_needs_response_to_gap_cp1.md',
 'corpus/claims/1100-1199/1196_no_u3_covariant_effective_action_of_one_projector_can_select_its_orientation_so_closure_requires_a_second_family_tensor.md',
 'corpus/claims/1100-1199/1105_the_generalized_quadratic_inner_fluctuation_is_a_first_order_defect_dressing_not_the_square_of_the_charge_three_family_edge.md']

profiles = {
 'gaussian': lambda t: np.exp(-t),
 'positive_nonmonotone': lambda t: np.exp(-t)*(1+4*(t-1)**2),
}
samples = []
for name, F in profiles.items():
    for s in [.1, .7, 2., 6.]:
        W, err = quad(lambda t: (t-s)*F(t), s, np.inf, epsabs=1e-12)
        tail, _ = quad(F, s, np.inf, epsabs=1e-12)
        momentum, _ = quad(lambda p: p**3*F(p*p+s), 0, np.inf, epsabs=1e-12)
        samples.append(dict(profile=name, s=s, W=W, derivative=-tail,
          secondDerivative=float(F(s)), directRadialMomentumIntegral=momentum,
          quadratureErrorEstimate=err))

fixed_radius = []
for name, F in profiles.items():
    def W(s):
        return quad(lambda t: (t-s)*F(t), s, np.inf, epsabs=1e-12)[0]
    for shape in [[1., 1., 1.], [.5, 1., 1.5], [.1, .9, 2.]]:
        fixed_radius.append(dict(profile=name, squaredMasses=shape,
          sumSquaredMasses=sum(shape), action=sum(W(x) for x in shape),
          equalShapeAction=3*W(1.),
          excludedCollectiveRadialDirection=[1., 1., 1.]))

soft = []
N, R, Z, C0, cutoff = 2, 1., 1., 1., 1.
for kappa in [.25, 1., 4.]:
    q = brentq(lambda x:kappa*(N*x-R)-np.exp(-x), R/N, (R+1/kappa)/N, xtol=1e-14)
    Hs = np.exp(-q)*np.eye(N)+kappa*np.ones((N,N))
    Hm = 4*C0*q*cutoff**2/Z*Hs
    radial_mass_squared = 4*C0*q*cutoff**2/Z*(np.exp(-q)+kappa*N)
    soft.append(dict(numberChannels=N, radiusTarget=R, kappa=kappa,
      suppliedKineticZ=Z, suppliedPotentialPrefactor=C0, cutoff=cutoff, q=q,
      singularGap=float(np.sqrt(q)*cutoff),
      squaredMassCoordinateHessian=Hs.tolist(), amplitudeHessian=Hm.tolist(),
      hessianEigenvalues=np.linalg.eigvalsh(Hm).tolist(),
      radialMassSquared=radial_mass_squared,
      gapToRadialMass=float(np.sqrt(q)*cutoff/np.sqrt(radial_mass_squared))))

measure = []
for L in [1., 2., 4., 8.]:
    integral, _ = quad(lambda d:np.exp(-2*np.exp(-d*d)), -L, L, epsabs=1e-12)
    measure.append(dict(L=L, partitionIntegralOnInterval=integral,
      rigorousLowerBound=2*L*float(np.exp(-2))))

confining = []
for alpha in [.5, 1., 2.]:
    integral, _ = quad(lambda d:np.exp(-alpha*(d*d-1)**2), -np.inf, np.inf, epsabs=1e-12)
    confining.append(dict(alpha=alpha, minimumAbsoluteEigenvalue=1.,
      curvatureWithAssumedUnitKinetic=8*alpha,
      conditionalGapToCurvatureMass=float(1/np.sqrt(8*alpha)), partitionIntegral=integral))

report = dict(schemaVersion='dynamical-finite-dirac-full-action-v1', date='2026-11-08',
 authority='Bounded corpus audit and exact flat constant-mass full-cutoff result, with supplied hard/soft constraints and finite-matrix comparison models. No selected physical T1/T2 operator, vacuum or mass ratio.',
 evidenceFamily='corpus-selector-action-audit',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sorted(sources)},
 primarySources=[
  dict(url='https://arxiv.org/html/1510.01377', version='v2', sections='1-2 and 4; measure over finite Dirac operators and polynomial actions', accessed='2026-11-08'),
  dict(url='https://arxiv.org/html/1912.13288', version='v5', sections='abstract and 2.5; growing polynomial spectral actions', accessed='2026-11-08')],
 primarySourceBoundary='Remote primary pages reviewed; full remote bytes are not archived here.',
 corpusDynamicalFork=dict(fixedFamilyMapIsSpurion=True,dynamicalFamilyMapRouteExplicit=True,
  selectingResponsePotentialDerived=False,fullFiniteDiracVariationDomainDerived=False),
 fullCutoffTheorem=dict(
  assumptions=['flat Euclidean R4 momentum density','constant Hermitian mass matrix',
   'nonnegative cutoff F(t)=f(sqrt(t)) with finite required moments',
   'independent squared-mass variations allowed','no added potential or determinant'],
  density='Lambda^4/(4 pi^2) sum_i W(s_i), W(s)=integral_s^infinity (t-s) F(t) dt',
  derivative='Wprime(s)=-integral_s^infinity F(t) dt',secondDerivative='Wdoubleprime(s)=F(s)',
  conclusion='No isolated selected finite positive mass radius on this unconstrained domain. Positive tails give descent; compact support gives an undetermined plateau.',
  nonmonotoneProfileDerivativeAtT2=float(3*np.exp(-2)), samples=samples,
  universalNoGoForAllSpectralActions=False),
 hardRadius=dict(identity='sum W(s_i)>=N W(R/N) for sum s_i=R',
  shapeSamples=fixed_radius, equalShapeSelectedForStrictConvexity=True,
  radiusSupplied=True,collectiveRadialReferenceRetained=False,orientationSelectionEstablished=False),
 softStabilizer=dict(potential='sum exp(-s_i)+kappa/2 (sum s_i-R)^2',
  stationarity='kappa (N q-R)=exp(-q)', scope='Full untruncated comparison potential; independently supplied kinetic term; singular-value directions only.',
  samples=soft,parametersDerivedFromSelector=False,allMatrixOrientationModesGapped=False),
 finiteDiracMeasure=dict(boundedCutoffFlatMeasureNormalizable=False,
  lowerBound='For bounded S<=B on an unbounded matrix space, exp(-S)>=exp(-B)>0.',
  oneParameterCutoffSamples=measure,confiningPolynomialSamples=confining,
  polynomialIsFullFiniteModelAction=True,
  physicalScalarPoleDerivedFromZeroDimensionalEnsemble=False),
 verdict=dict(dynamicalFiniteDiracPossibleAsNewModelClass=True,
  stablePhysicalFiniteSpectrumSelectedByInspectedCorpus=False,
  fullDecayingCutoffAloneSelectsFiniteRadiusInAuditedModel=False,
  fixedRadiusCanSelectShape=True,
  fixedRadiusPreservesEarlierRadialReference=False,
  suppliedSoftStabilizerCanSelectStableSingularValues=True,
  positivePhysicalT1T2MassRatioPredicted=False,
  nextDiscriminator='Derive the physical finite-operator variation domain and kinetic/measure geometry, a confining full action with fixed coefficients, and a positive-residue reference mode; then calculate the ratio without target-mass matching.'))
out = Path('evidence/data/dynamical-finite-dirac-full-action-v1.json')
out.write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(dict(written=str(out), sourceHashes=len(sources), verdict=report['verdict']), indent=2))

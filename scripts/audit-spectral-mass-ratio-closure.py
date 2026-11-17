import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

receipt_path = 'evidence/data/spectral-mass-ratio-source-checks-v1.json'
receipt = json.loads(Path(receipt_path).read_text())
sources = [receipt_path, 'scripts/audit-spectral-mass-ratio-closure.py',
 'evidence/data/yukawa-vacuum-scale-selection-v1.json',
 'corpus/claims/1100-1199/1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md',
 'corpus/claims/1100-1199/1111_a_rank_one_complementary_Majorana_block_can_give_three_heavy_masses_but_block_preserving_seesaw_forces_a_selected_flavour_texture_zero.md',
 'corpus/claims/1100-1199/1196_no_u3_covariant_effective_action_of_one_projector_can_select_its_orientation_so_closure_requires_a_second_family_tensor.md',
 'corpus/programmes/lattice-subroutine-gravity/induced-action-preflight.md']
for check in receipt['checks']:
    assert check['exitCode'] == 0
    sources.append(check['command'].removeprefix('node '))

sx = np.array([[0, 1], [1, 0]], complex)
sy = np.array([[0, -1j], [1j, 0]], complex)
sz = np.diag([1., -1.])
eye2 = np.eye(2)
gammas = [np.kron(sx, p) for p in [sx, sy, sz]] + [np.kron(sz, eye2)]
g5 = np.linalg.multi_dot(gammas)
assert np.allclose(g5 @ g5, np.eye(4))
for i, gi in enumerate(gammas):
    for j, gj in enumerate(gammas):
        assert np.allclose(gi @ gj + gj @ gi, 2*np.eye(4)*(i == j))
vertices = [1j*g @ g5 for g in gammas]
derivative_gram = np.array([[np.trace(a @ b).real for b in vertices] for a in vertices])
assert np.allclose(derivative_gram, 4*np.eye(4))

# Direct finite-matrix E^2 test with a non-diagonal internal coefficient.
C = np.array([[1., .3], [.3, 2.]])
u, gradients = .7, np.array([.2, -.4, .3, .1])
E = np.kron(np.eye(4), u*u*C@C).astype(complex)
for vertex, derivative in zip(vertices, gradients):
    E += np.kron(vertex, derivative*C)
trace_e2 = float(np.trace(E @ E).real)
expected_e2 = float(4*u**4*np.trace(np.linalg.matrix_power(C, 4)) + 4*np.dot(gradients, gradients)*np.trace(C@C))
assert abs(trace_e2-expected_e2) < 1e-12

moment_family = []
for epsilon in [0., .5, .75]:
    profile = lambda x: np.exp(-x*x)*(1-epsilon*x*x+epsilon*x**4/3)
    f2, err2 = quad(lambda x: x*profile(x), 0, np.inf, epsabs=1e-12)
    f4, err4 = quad(lambda x: x**3*profile(x), 0, np.inf, epsabs=1e-12)
    f0 = profile(0.)
    a, b, k = f2/np.pi**2, f0/(2*np.pi**2), f0/(4*np.pi**2)
    moment_family.append(dict(epsilon=epsilon, f0=f0, f2=f2, f4=f4,
      quadratureErrorEstimates=[err2, err4], a=a, b=b, k=k,
      aOverB=a/b, scalarMassSquaredOverCutoffSquared=2*a/k,
      singleChannelGapSquaredOverCutoffSquared=a/b,
      singleChannelSquaredMassRatio=k/(2*b),
      positivityPolynomialMinimum=1-3*epsilon/4,
      derivativePolynomialMaximum=-1+13*epsilon/12))

shape_cases = []
for weights in [[.5, .5], [.8, .2], [1.]]:
    rho = float(np.dot(weights, weights))
    ratios = [float(.5*np.sqrt(x/rho)) for x in weights]
    shape_cases.append(dict(weights=weights, rho=rho,
      gapToScalarMassRatios=ratios, minimumRatio=min(ratios)))

cross_blocks = []
for y in [.5, 1., 2.]:
    matrix = np.array([[2., .4, y], [.4, 1., 0.], [y, 0., 0.]])
    eigenvalues = np.linalg.eigvalsh(matrix)
    s = np.sort(abs(eigenvalues))
    weights = s*s/np.dot(s, s)
    rho = float(np.dot(weights, weights))
    cross_blocks.append(dict(y=y, matrix=matrix.tolist(), determinant=float(np.linalg.det(matrix)),
      complementaryRank=1, signedEigenvalues=eigenvalues.tolist(), singularValues=s.tolist(),
      normalizedSquaredSingularValues=weights.tolist(), rho=rho,
      conditionalMinimumGapToScalarMass=float(.5*np.sqrt(weights.min()/rho))))

report = dict(schemaVersion='spectral-mass-ratio-closure-v1', date='2026-11-08',
 authority='New conditional flat Euclidean Dirac/scalar heat-kernel calculation and bounded source audit; no physical T1/T2 action, spectrum or pole matching admitted.',
 evidenceFamily='corpus-selector-action-audit',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sorted(set(sources))},
 sourceVerificationReceipt=receipt_path,
 primarySources=[
  dict(url='https://arxiv.org/html/1507.08161', version='v1', sections='equations 2-3 and 12-21; finite Yukawa matrices', accessed='2026-11-08'),
  dict(url='https://alainconnes.org/wp-content/uploads/bookwebfinal-2.pdf', sections='17.1, equation 1.785, and 17.12', accessed='2026-11-08')],
 primarySourceBoundary='Read from primary endpoints; full remote source bytes are not archived by this calculation.',
 explicitModel=dict(operator='D=i gamma^mu partial_mu + gamma5 u C; C Hermitian, fixed; one real scalar; flat Euclidean four-space',
  momentConvention='f0=f(0); f2=integral x f(x) dx; f4=integral x^3 f(x) dx',
  assumptions=['canonical fermion vertex u C','unweighted common trace','integrated total derivatives discarded',
   'heat expansion truncated through a4','positive canonical Lorentzian interpretation remains a physical matching gate'],
  spinDerivativeGram=derivative_gram.tolist(), directTraceE2=trace_e2, expectedTraceE2=expected_e2,
  coefficients=dict(k='f0/(4 pi^2)', a='f2/pi^2', b='f0/(2 pi^2)'),
  scalarReference='canonical radial curvature of this same one-scalar truncated action',
  squaredMassRatio='Delta_i^2/m_scalar^2 = r_i/(4 rho)'),
 cutoffMomentFamily=moment_family, shapeCases=shape_cases,
 fixedTraceShapeOptimization=dict(identity='Tr X^2 = Z^2/N + Tr(X-Z I/N)^2',
  equalShapeSelectedIfAllShapeVariationsAllowed=True,
  physicalFiniteDiracVariationDerived=False,
  boundary='Varying a fixed input D_F or imposing fixed trace requires a new variational/constraint principle.'),
 rankOneComplementFullMatrixFamily=cross_blocks,
 fullGaussianNegativeControl=dict(exactDensityOverZeroMass='exp(-s)', s='m^2/Lambda^2',
  quarticTruncation='1-s+s^2/2', truncatedMinimumS=1., exactDerivativeAtTruncatedMinimum=-float(np.exp(-1.)),
  establishes='This simple full Gaussian spectral density does not share the truncated finite-mass minimum.',
  universalSpectralActionVacuumNoGo=False),
 verdict=dict(coefficientRatioDerivedForExplicitModel=True, commonMomentsCancelForSameScalarReference=True,
  physicalReferenceScalarIdentified=False, finiteSingularValueShapeDynamicallySelectedByCorpus=False,
  positivePhysicalT1T2MassRatioPredicted=False,
  everyMassRatioNecessarilyDependsOnCutoffMoments=False,
  rankOneComplementForcesFullMasslessMode=False,
  nextDiscriminator='Select the physical finite operator and its variation domain, derive a controlled stable vacuum and reference mode from the same action, then transport the ratio through mixing and thresholds.'))
out = Path('evidence/data/spectral-mass-ratio-closure-v1.json')
out.write_text(json.dumps(report, indent=2)+'\n')
print(json.dumps(dict(written=str(out), sourceHashes=len(report['sources']), verdict=report['verdict']), indent=2))

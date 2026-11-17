import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

sources=['scripts/audit-full-spectral-finite-k.py',
 'evidence/data/photon-medium-native-action-v1.json',
 'evidence/data/dynamical-finite-dirac-full-action-v1.json',
 'corpus/claims/1100-1199/1110_the_minimal_spectral_kinetic_metric_can_be_normalized_to_the_Jordan_face_but_quartic_exchange_forces_the_Q_Majorana_block_to_rank_one.md',
 'corpus/claims/1700-1799/1761_matching_the_weyl_square_leak_to_an_entire_kernel_fixes_one_scale_not_the_completion_or_axial_coupling.md',
 'corpus/claims/1700-1799/1762_the_entire_function_escape_is_an_existence_proof_not_a_predictive_uv_completion.md',
 'verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs']
def F(t,b):return np.exp(-t)*(1+b*(t-1)**2)/(1+b)
def tail(s,b):return np.exp(-s)*(1+b*(s*s+1))/(1+b)
def W(s,b):return np.exp(-s)*(1+b*(s*s+2*s+3))/(1+b)
profiles=[]
for b in [0.,1.,4.]:
    rows=[]
    for x in [0.,.01,.1,1.,4.,10.,30.,100.,1000.]:
        h=quad(lambda a:F(a*(1-a)*x,b),0,1,epsabs=1e-12)[0]
        rel=x*h/2
        rows.append(dict(kSquaredOverCutoffSquared=x,fullKernel=-1+rel,
          relativeToZeroMomentum=rel,
          fourthDerivativeRelativeTruncation=x/2-(1+3*b)/(1+b)*x*x/12))
    constant=[]
    for s in [0.,.5,1.,2.,4.]:
        constant.append(dict(squaredScalarOverCutoffSquared=s,
          fullPotential=W(s,b),radialDerivativeInS=-tail(s,b),
          normalizedLowMomentumGaugeCoefficient=F(s,b)))
    profiles.append(dict(b=b,cutoff='exp(-t)*(1+b*(t-1)^2)/(1+b)',
      nonnegative=True,cutoffAtZero=F(0,b),integralOfCutoff=tail(0,b),
      leadingSubtractedPotentialCoefficientsInS=[-1.,.5],
      leadingGradientCoefficient=.5,
      derivativeOfCutoffAtZero=-(1+3*b)/(1+b),
      momentumSamples=rows,constantScalarSamples=constant))
report=dict(schemaVersion='full-spectral-finite-k-v1',date='2026-11-08',
 authority='Exact-in-momentum quadratic calculation in a declared flat Euclidean Dirac/scalar model; not the complete physical corpus action',
 evidenceFamily='periodic-maxwell-fixture',
 sources={s:hashlib.sha256(Path(s).read_bytes()).hexdigest() for s in sources},
 primarySources=[dict(url='https://arxiv.org/html/1312.2235',version='v1',
  reviewed='Equations 1,4,6,8-10 and Appendix 1; Gaussian heat-trace scalar form factor',
  boundary='Neighbouring primary construction, not a corpus-selected photon medium; remote bytes not archived')],
 sourceCertificateExecution=dict(command='node verification/verify/verify_spin23_entire_completion_matching_degeneracy.mjs',
  exitCode=0,observed='Spin(2,3) entire-completion matching degeneracy: PASS; same p^4 coefficient and pole count with different higher coefficients; axial coupling remains independent'),
 declaredModel=dict(operator='D=-i gamma^mu partial_mu + gamma5 phi, flat Euclidean R4',
  action='Tr F(D^2/Lambda^2), with field-independent vacuum subtraction',
  background='phi=0, no gauge field; four spin components, one commuting real scalar',
  normalization='x=k^2/Lambda^2; omit common positive Lambda^2/(4 pi^2) in quadratic coefficient; no factor 1/2 in phi K phi',
  requirements='Smooth nonnegative rapidly decaying F and derivatives; no density, boundaries, curvature, matrix noncommutativity or loops'),
 exactKernel=dict(formula='K_F(x)=-integral_0^infinity F(u)du + x/2 integral_0^1 F(alpha(1-alpha)x)dalpha',
  scalarSquare='D^2=-partial^2+phi^2-i gamma^mu gamma5 partial_mu phi',
  derivation='Seagull integral: integral u Fprime(u)du=-integral F. Derivative bubble uses divided difference of Fprime; Feynman interpolation and momentum shift give integral u Fsecond(u+c)du=F(c).',
  ordering='K_F(x)-K_F(0)>=0 for every x>=0 when F>=0',
  finiteWaveNumberPreferred=False,
  exactInMomentum=True,quadraticInScalarOnly=True,
  gaussianFormula='K(x)=-1+x/2 h(x), h(x)=integral_0^1 exp(-alpha(1-alpha)x)dalpha',
  gaussianExpansion='K(x)=-1+x/2-x^2/12+x^3/120-...'),
 profiles=profiles,
 nonlinearBoundary=dict(constantPotential='W(s)=integral_s^infinity (t-s)F(t)dt',
  derivative='Wprime(s)=-integral_s^infinity F(t)dt<0 for these profiles',
  gaussian='W(s)=exp(-s); quartic truncation has s=1 minimum but full derivative there is -exp(-1)',
  finiteAmplitudeUnconstrainedConstantVacuumSelected=False,
  arbitraryNonconstantPeriodicSolutionsExcluded=False),
 photonJoin=dict(conditions='Same specified Dirac action, neutral commuting constant scalar, fixed U(1) representation; gauge quadratic term at photon momentum tending to zero',
  gaussianFactorization='D_A(phi_constant)^2=D_A(0)^2+phi_constant^2; heat trace factors by exp(-s)',
  relativeCoefficient='Z_A(s)/Z_A(0)=F(s)/F(0)',
  relativeCouplingFixedOnceFullModelChosen=True,
  linearScalarPhotonVertexAtZeroBackground=0.,
  nonlinearPatternOpticalSourceMapCalculated=False,
  boundary='This is a Lorentz-covariant F_mu_nu F^mu_nu coefficient, not a permittivity-only constitutive law; finite-frequency nonuniform pattern response is not obtained by local substitution without a derivative/error estimate.'),
 verdict=dict(fullMomentumScalarKernelCalculated=True,
  nonnegativeCutoffScalarKernelPrefersFiniteWaveNumber=False,
  commonLeadingCoefficientsFixFullMomentumResponse=False,
  relativeGaugeCouplingDerivedInDeclaredConstantScalarModel=True,
  sourceNativeStablePatternActionEstablished=False,
  nonlinearPeriodicSaturationEstablished=False,
  physicalPhotonCouplingAndContactTermsFixed=False,
  physicalLatticeSpacingModulationAndGapPredicted=False,
  allSpectralActionsRuledOut=False,
  nextDiscriminator='Freeze a complete source-native spectral triple, cutoff and physical state; derive the coupled Hessian about an actual stationary vacuum, then a stable nonlinear periodic branch and its finite-frequency gauge response.'))
out=Path('evidence/data/full-spectral-finite-k-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),verdict=report['verdict']),indent=2))

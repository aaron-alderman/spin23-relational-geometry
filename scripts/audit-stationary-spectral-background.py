import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq

sources=['scripts/audit-stationary-spectral-background.py',
 'evidence/data/full-spectral-finite-k-v1.json',
 'evidence/data/joint-background-vacuum-kinetic-protection-v1.json',
 'corpus/claims/1600-1699/1632_a_finite_spectral_triple_can_couple_to_spin23_geometry_but_the_action_vacuum_and_spectrum_are_missing.md',
 'corpus/claims/1500-1599/1567_a_nonsupersymmetric_E6_quartic_vacuum_restores_the_exotic_rank_but_no_residual_abelian_selector_protects_bidoublet_inertness.md',
 'verification/verify/verify_spin23_e6_nonsusy_vacuum_residual_selector_audit.mjs']
N=3;R=1.
def F(s,b):return np.exp(-s)*(1+b*(s-1)**2)/(1+b)
def Fp(s,b):return np.exp(-s)*(2*b*(s-1)-1-b*(s-1)**2)/(1+b)
def tail(s,b):return np.exp(-s)*(1+b*(s*s+1))/(1+b)
def W(s,b):return np.exp(-s)*(1+b*(s*s+2*s+3))/(1+b)
def basis():
    out=[]
    for i in range(N):
        t=np.zeros((N,N),complex);t[i,i]=1;out.append(t)
    for i in range(N):
        for j in range(i):
            t=np.zeros((N,N),complex);t[i,j]=t[j,i]=1/np.sqrt(2);out.append(t)
            t=np.zeros((N,N),complex);t[i,j]=1j/np.sqrt(2);t[j,i]=-1j/np.sqrt(2);out.append(t)
    return out
T=basis();rows=[]
for b in [0.,1.,4.]:
    for kappa in [.25,1.,4.]:
        s=brentq(lambda s:kappa*(N*s-R)-tail(s,b),R/N,4.,xtol=1e-14)
        for signs in [[1,1,1],[1,-1,-1]]:
            S=np.diag(signs);plus=[(t+S@t@S)/2 for t in T]
            gram=np.array([[np.trace(a@c).real for c in plus] for a in plus])
            radial=np.array([np.trace(S@t).real for t in T])
            samples=[]
            for x in [0.,.01,.1,1.,4.,10.,100.]:
                h=quad(lambda a:F(s+a*(1-a)*x,b),0,1,epsabs=1e-12)[0]
                lo=x*h/2;le=(x+4*s)*h/2
                K=lo*np.eye(9)+2*s*h*gram+2*s*kappa*np.outer(radial,radial)
                z=6*quad(lambda a:a*(1-a)*F(s+a*(1-a)*x,b),0,1,epsabs=1e-12)[0]
                # In common scalar prefactor 4/(4pi)^2, N=3 unit-charge
                # copies give transverse gauge coefficient x*z.
                coupled=np.zeros((12,12));coupled[:9,:9]=K;coupled[9:,9:]=x*z*np.eye(3)
                samples.append(dict(x=x,scalarQuadraticMatrix=K.tolist(),
                  scalarEigenvalues=np.linalg.eigvalsh(K).tolist(),
                  oddCoefficient=lo,evenCoefficient=le,
                  radialCoefficient=le+2*N*s*kappa,
                  relativeGaugeCoefficient=z,gaugeTransverseCoefficient=x*z,
                  coupledEigenvalues=np.linalg.eigvalsh(coupled).tolist()))
            rows.append(dict(b=b,kappa=kappa,R=R,N=N,s=s,signs=signs,
              stationarityResidual=kappa*(N*s-R)-tail(s,b),
              constantVacuumEnergy=N*W(s,b)+kappa/2*(N*s-R)**2,
              smallMomentumEvenSlope=F(s,b)/2+s*Fp(s,b)/3,
              logGaugeDerivativePerDimensionlessScalar=2*np.sqrt(s)*Fp(s,b)/F(s,b),
              samples=samples))
report=dict(schemaVersion='stationary-spectral-background-v1',date='2026-11-08',
 authority='Declared stabilized neutral Hermitian matrix spectral comparison; stationary background and full-momentum quadratic scalar/photon blocks, not a source-native physical medium',
 evidenceFamily='periodic-maxwell-fixture',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sources},
 sourceCertificateExecution=dict(command='node verification/verify/verify_spin23_e6_nonsusy_vacuum_residual_selector_audit.mjs',exitCode=0,
  observed='PASS 1567: reduced simultaneous-singlet vacuum; residual commuting abelian selector cannot protect bidoublets',
  receiptKind='summary of observed execution, not byte-for-byte stdout'),
 primarySources=[dict(url='https://arxiv.org/html/1410.7999',version='v2',reviewed='Section II, equations 12-14; scalar and transverse gauge Gaussian form factors',
  boundary='Neighbouring flat model, not a corpus-selected medium; remote bytes not archived')],
 model=dict(action='Tr F(D_A^2/Lambda^2) plus C Lambda^4 kappa/2 (Tr Phi^2/Lambda^2 - R)^2',
  D='-i gamma^mu(partial_mu+i A_mu I3)+gamma5 Phi',
  normalization='C=1/(4pi^2); Lambda=1 in saved calculations; quadratic coefficient convention h K h without factor 1/2',
  physicalInputs=['full cutoff profile b','soft stabilizer kappa and R','scale Lambda','neutral matrix variation domain','unit-charge identity U(1) representation'],
  gravityFrozen=True,chargedNoncentralGaugeModesIncluded=False,
  electromagneticGaugeQuotient='three transverse Euclidean off-shell directions; longitudinal null excluded, not three on-shell photon polarizations'),
 derivation=dict(stationary='Phi0=sqrt(s) S, S^2=I; kappa(Ns-R)=I_s, I_s=integral_s^infinity F',
  constantGlobalMinimum='Convex W(s_i), coercive soft sum penalty, Jensen: all squared eigenvalues equal s; signs and conjugation orbit not uniquely selected',
  bubble='H_s(x)=integral_0^1 F(s+alpha(1-alpha)x)dalpha',
  bareScalar='-I_s Tr h^2 + H_s(x)/2 [x Tr h^2 + Tr {Phi0,h}^2]',
  softScalar='Uprime Tr h^2 + 2 kappa (Tr Phi0 h)^2; Uprime=I_s at stationarity',
  odd='K_odd=x H_s/2 for {S,h}=0',
  even='K_even=(x+4s)H_s/2 for [S,h]=0 and Tr S h=0',
  radial='K_radial=K_even+2Ns kappa',
  positivity='F>=0 and kappa>=0 imply nonnegative scalar quadratic form at every x; for saved positive profiles strictly positive at x>0',
  gauge='Z_A(s,x)/Z_A(0,0)=6 integral_0^1 alpha(1-alpha)F(s+alpha(1-alpha)x)dalpha/F(0)',
  gaussianIdentity='-4+(4+2x)h(x)=8x integral_0^1 alpha(1-alpha)exp(-alpha(1-alpha)x)dalpha',
  scalarGaugeMixedBlock='zero at quadratic order about constant neutral Phi0 and A=0; Euclidean rotational covariance gives a vector proportional to k_mu, and the electromagnetic Ward identity removes it for k^2>0'),
 samples=rows,
 stabilityScope=dict(constantMatrixGlobalMinimum=True,allNineHermitianScalarDirections=True,
  exactInMomentumAtQuadraticOrder=True,translationBreakingInstabilityFound=False,
  mixedSignOrbitZeroModesRetained=True,
  fullNonconstantNonlinearGlobalMinimumProved=False,
  firstOrderPeriodicBranchExcluded=False,LorentzianResiduesAndUnitarityProved=False),
 verdict=dict(stationaryNonzeroBackgroundConstructedInDeclaredRepair=True,
  sourceNativeStabilizerAndBackgroundFixed=False,
  fullIncludedScalarPhotonHessianHasFiniteKInstability=False,
  conditionalFiniteMomentumPhotonResponseDerived=True,
  nonlinearPeriodicStabilityEstablished=False,
  physicalPhotonPortsAndContactMatchingFixed=False,
  physicalLatticeSpacingModulationAndGapPredicted=False,
  allNonzeroSpectralBackgroundsRuledOut=False,
  nextDiscriminator='Derive a source-native nonconvex/competing mechanism or a different state/representation, freeze its scales and cutoff, and compute the actual stationary branch, full physical Hessian, nonlinear stability and finite-frequency source matching.'))
out=Path('evidence/data/stationary-spectral-background-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),backgrounds=len(rows),verdict=report['verdict']),indent=2))

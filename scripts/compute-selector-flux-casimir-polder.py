"""No-refit conditional optical-to-electromagnetic Casimir-Polder bridge.

Uses the complete finite dipole spectrum in the prior gauge-covariant fixture.
Leading electric dipole order, ground state, zero temperature, ideal conducting
plane. This is not a measured device or a selector-derived material response.
"""
import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

source=Path('evidence/data/selector-flux-boundary-action-audit-v1.json')
data=json.loads(source.read_text())
records=data['conditionalConstruction']['records']
assert data['conditionalConstruction']['frozenModel']['refitsAcrossFlux']==0

def alpha(row,x):
    gaps=np.asarray(row['gaps']); weights=np.asarray(row['dipoleWeights'])
    return float(np.sum(2*gaps*weights/(gaps*gaps+x*x)))

def integrals(row,ell,first_only=False):
    # ell=L E_star/(hbar c). A=alpha/(d_star^2/E_star).
    # U=-hbar c alpha_scale I/(64 pi^2 eps0 L^4).
    # F=-hbar c alpha_scale J/(64 pi^2 eps0 L^5).
    def a(x):
        if first_only:
            d,w=row['gaps'][0],row['dipoleWeights'][0]
            return 2*d*w/(d*d+x*x)
        return alpha(row,x)
    def f(s,force=False):
        poly=3+6*s+8*s*s+8*s**3 if force else 1+2*s+4*s*s
        return np.exp(-2*s)*a(s/ell)*poly
    I,ie=quad(f,0,np.inf,epsabs=2e-12,epsrel=2e-11)
    J,je=quad(lambda s:f(s,True),0,np.inf,epsabs=2e-12,epsrel=2e-11)
    return I,J,ie,je

ells=[10.,30.,100.]
out=[]; max_fd_error=max_tail_bound=max_quad_error=0.
for row in records:
    assert abs(alpha(row,0)-row['static'])<1e-12
    for ell in ells:
        I,J,ie,je=integrals(row,ell)
        I1,J1,_,_=integrals(row,ell,True)
        # Independent numerical differentiation at fixed spectrum and units.
        h=ell*1e-4
        Im=integrals(row,ell-h)[0]; Ip=integrals(row,ell+h)[0]
        fd=-((-Ip/(ell+h)**4)-(-Im/(ell-h)**4))/(2*h)
        analytic=-J/ell**5
        err=abs(fd/analytic-1); max_fd_error=max(max_fd_error,err)
        assert err<2e-7
        assert I>0 and J>0
        # Explicit exponentially suppressed quadrature-domain remainder, s>30.
        # A(s/ell)<=A(0); incomplete integer gamma integral is elementary.
        def monomial_tail(n,S=30.):
            import math
            return np.exp(-2*S)*math.factorial(n)*sum((2*S)**k/math.factorial(k) for k in range(n+1))/2**(n+1)
        tail_i=alpha(row,0)*sum(c*monomial_tail(n) for n,c in enumerate([1,2,4]))
        tail_j=alpha(row,0)*sum(c*monomial_tail(n) for n,c in enumerate([3,6,8,8]))
        max_tail_bound=max(max_tail_bound,tail_i/I,tail_j/J)
        max_quad_error=max(max_quad_error,ie/I,je/J)
        out.append({'fluxOverQuantum':row['fluxOverQuantum'],'ell':ell,
                    'firstOpticalGap':row['gaps'][0],'firstOpticalDipoleWeight':row['dipoleWeights'][0],
                    'staticPolarizabilityReduced':alpha(row,0),'energyIntegralI':I,'forceIntegralJ':J,
                    'energyReduced':-I/(64*np.pi**2*ell**4),
                    'forceReduced':-J/(64*np.pi**2*ell**5),
                    'firstPoleOnlyEnergyRelativeError':I1/I-1,
                    'firstPoleOnlyForceRelativeError':J1/J-1,
                    'forceDerivativeRelativeError':err,
                    'energyQuadratureAbsoluteEstimate':ie,'forceQuadratureAbsoluteEstimate':je,
                    'energyIntegralTailUpper':tail_i,'forceIntegralTailUpper':tail_j})

# Two independent limiting checks of the vector electromagnetic plate kernel.
row=records[0]; a0=alpha(row,0)
Iret,Jret,_,_=integrals(row,1e5)
retarded_error=max(abs(Iret/(2*a0)-1),abs(Jret/(8*a0)-1))
assert retarded_error<1e-8
# Nonretarded limit in the original frequency coordinate avoids a narrow peak.
ell=1e-7
Inr,nrerr=quad(lambda x:alpha(row,x)*np.exp(-2*ell*x)*(1+2*ell*x+4*(ell*x)**2),
              0,np.inf,epsabs=1e-10,epsrel=1e-9)
nonretarded_error=abs(Inr/(np.pi*sum(row['dipoleWeights']))-1)
assert nonretarded_error<1e-5
max_image_kernel_error=0.
for x in [0.,.1,1.,3.]:
    # Plane-wave imaginary-frequency electric Green kernel, parallel dipole.
    L=2.
    green,_=quad(lambda k:np.exp(-2*k*L)*(k*k+x*x)/(8*np.pi),x,np.inf,
                 epsabs=1e-22,epsrel=1e-12)
    closed=np.exp(-2*x*L)*(1+2*x*L+4*(x*L)**2)/(32*np.pi*L**3)
    max_image_kernel_error=max(max_image_kernel_error,abs(green/closed-1))
assert max_image_kernel_error<1e-9

contrasts=[]
for ell in ells:
    a=next(r for r in out if r['ell']==ell and r['fluxOverQuantum']==0)
    b=next(r for r in out if r['ell']==ell and r['fluxOverQuantum']==.5)
    contrasts.append({'ell':ell,'halfFluxVsZeroForceFraction':b['forceReduced']/a['forceReduced']-1,
                      'halfFluxVsZeroEnergyFraction':b['energyReduced']/a['energyReduced']-1})
sources=[str(source),__file__,
 'corpus/programmes/admissibility/admissibility_30_casimir_seebeck_nernst_spectral_ladder.md',
 'corpus/programmes/admissibility/admissibility_58_casimir_spectral_coverage_and_distance_gate.md']
report={
 'schemaVersion':'selector-flux-optical-casimir-polder-bridge-v1','date':'2026-11-08',
 'authority':'Conditional no-refit prediction from an assumed finite gauge-covariant boundary model plus an explicitly fixed electromagnetic environment. Not a corpus-derived selector action, material fit, measured force or full plate-plate Lifshitz prediction.',
 'sources':{p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sources},
 'primaryElectromagneticReference':'https://arxiv.org/abs/0908.2649',
 'corpusStatus':'AZ-030 demands one optical response predicting boundary forces without refitting. AZ-058 records the spectral-coverage/geometry gate. The available finite boundary proxies and incomplete material tensors do not close that physical gate.',
 'commonAction':'The prior Peierls-link charge Hamiltonian and fixed electric dipole, embedded via -D_x E_x in the Maxwell field with ideal-conductor boundary conditions. No new fitted material coupling is introduced in the force calculation.',
 'geometry':{'body':'Pointlike effective neutral polarizable object at distance L above z=0; only electric x polarizability, parallel to the plane.',
             'opposingBody':'Infinite ideal electric conductor: r_TE=-1, r_TM=1 on the imaginary axis.',
             'state':'Ground state, T=0; weak electromagnetic coupling, leading electric-dipole order.',
             'flux':'Static external AB control changes only the prior model link phase; no direct force from the flux apparatus is modeled.',
             'fixedAcrossFlux':True,'ellValues':ells},
 'normalization':{'alphaScale':'d_star^2/E_star, with d_star=q a; these physical scales remain unspecified by the corpus.',
                  'ell':'L E_star/(hbar c)',
                  'energyReduced':'U / [hbar c alphaScale / (eps0 (hbar c/E_star)^4)]',
                  'forceReduced':'F / [hbar c alphaScale / (eps0 (hbar c/E_star)^5)]',
                  'absoluteSIForcePredicted':False},
 'formulas':{'polarizability':'alpha_x(i xi)=alphaScale sum_j 2 Delta_j w_j/[Delta_j^2+(hbar xi/E_star)^2]. All three transitions of the four-state fixture are included.',
             'energy':'U=-hbar/(64 pi^2 eps0 L^3) int_0^inf dxi alpha_x(i xi) exp(-2u)(1+2u+4u^2), u=xi L/c.',
             'force':'F=-hbar/(64 pi^2 eps0 L^4) int_0^inf dxi alpha_x(i xi) exp(-2u)(3+6u+8u^2+8u^3). Spectrum held fixed under L differentiation.',
             'retardedLimit':'U -> -hbar c alpha_x(0)/(32 pi^2 eps0 L^4) for this single parallel component.',
             'nonretardedLimit':'U -> -sum_j |D_j0|^2/(64 pi eps0 L^3).'},
 'records':out,'fluxContrasts':contrasts,
 'noRefit':{'HamiltonianChanged':False,'dipoleChanged':False,'opticalWeightsReweighted':False,
            'extraCasimirGain':False,'geometryChangedAcrossFlux':False},
 'verification':{'passed':True,'maxForceDerivativeRelativeError':max_fd_error,
                 'maxQuadratureRelativeEstimate':max_quad_error,
                 'maxUnintegratedSTailRelativeUpper':float(max_tail_bound),
                 'retardedLimitRelativeError':retarded_error,
                 'nonretardedLimitRelativeError':nonretarded_error,
                 'maxPlaneWaveGreenKernelRelativeError':max_image_kernel_error,
                 'boundary':'Quadrature estimates and asymptotic checks are numerical. They do not bound physical model error or missing transitions outside the declared four-state fixture.'},
 'limitations':['The boundary model and physical charge/length/energy scales have not been derived from the selector.',
  'A compensating fixed charge at the reference cancels net charge; the connected response excludes the permanent-dipole electrostatic image interaction. This predicts only the fluctuation Casimir-Polder component, not the total mechanical force.',
  'The perfect-conductor plane and point electric-dipole approximation are supplied assumptions. Finite size, magnetic response, material dispersion, substrates, temperature and higher-order dressing are not included.',
  'The complete finite spectrum determines its imaginary-frequency response, but three observed optical lines would not certify completeness for a real material.',
  'The resulting force is even under flux reversal for this particular spinless diagonal-dipole model; no universal force parity or selector fingerprint follows.'],
 'nextPhysicalGate':'Provide a named selector-coupled device action with calibrated charge, energy, length, complete relevant optical response and actual scattering geometry; freeze these and predict optical and force flux sweeps before inspecting force data.',
 'reproduction':'./.venv-alpaca/Scripts/python.exe scripts/compute-selector-flux-casimir-polder.py'
}
target=Path('evidence/data/selector-flux-optical-casimir-polder-bridge-v1.json')
target.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'output':str(target),'fluxContrasts':contrasts,'verification':report['verification']},indent=2))

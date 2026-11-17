import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.optimize import root
from scipy.linalg import eigh

p=dict(r=.98,kappa2=-2.,kappa4=1.,u=1.,chi=.2,v=1.)
receipt_path='evidence/data/photon-medium-scale-source-checks-v1.json'
receipt=json.loads(Path(receipt_path).read_text())
sources=[receipt_path,'scripts/audit-photon-medium-period-and-amplitude.py',
 'evidence/data/periodic-photon-medium-bridge-v1.json',
 'corpus/programmes/dynatology/mystery_atlas_21_aether_substrate_and_universal_cone.md',
 'corpus/programmes/translation-free-exceptional-topology/E8_CONSTITUTIVE_METRIC_GATE.md',
 'corpus/programmes/translation-free-exceptional-topology/QUASICRYSTAL_BACKPLANE_BRIDGE.md',
 'corpus/programmes/rdg-maxwell-bridge/03_hodge_constitutive_and_dynamics_gate.md',
 'corpus/programmes/rdg-maxwell-bridge/04_sources_resonance_and_material_memory_gate.md',
 'corpus/claims/0100-0199/144_null_links_and_cellular_causality.md',
 'corpus/claims/0100-0199/176_eight_body_diagonal_weyl_walk_and_null_speed_gate.md']
for check in receipt['checks']:
    assert check['exitCode']==0
    sources.append(check['command'].removeprefix('node '))

theta=np.arange(1024)*2*np.pi/1024
q0=np.sqrt(-p['kappa2']/(2*p['kappa4']))
r_eff=p['r']-p['kappa2']**2/(4*p['kappa4'])
A0=np.sqrt(-4*r_eff/(3*p['u']))

def solve_pattern(number_modes):
    m=np.arange(1,2*number_modes,2)
    C=np.cos(np.outer(theta,m))
    def energy_gradient_hessian(x):
        A,q=x[:-1],x[-1];field=C@A
        L=p['r']+p['kappa2']*q*q*m*m+p['kappa4']*q**4*m**4
        energy=.25*np.dot(L,A*A)+p['u']/4*np.mean(field**4)
        ga=L*A/2+p['u']*np.mean(field[:,None]**3*C,axis=0)
        gq=p['kappa2']*q/2*np.dot(m*m,A*A)+p['kappa4']*q**3*np.dot(m**4,A*A)
        Haa=np.diag(L/2)+3*p['u']*(C.T@(field[:,None]**2*C))/len(theta)
        Haq=(p['kappa2']*q*m*m+2*p['kappa4']*q**3*m**4)*A
        Hqq=p['kappa2']/2*np.dot(m*m,A*A)+3*p['kappa4']*q*q*np.dot(m**4,A*A)
        H=np.block([[Haa,Haq[:,None]],[Haq[None,:],np.array([[Hqq]])]])
        return energy,np.r_[ga,gq],H
    initial=np.r_[A0,np.zeros(number_modes-1),q0]
    if number_modes>1:
        initial[1]=-p['u']*A0**3/(4*(p['r']+p['kappa2']*(3*q0)**2+p['kappa4']*(3*q0)**4))
    sol=root(lambda x:energy_gradient_hessian(x)[1],initial,
      jac=lambda x:energy_gradient_hessian(x)[2],tol=1e-11)
    energy,gradient,H=energy_gradient_hessian(sol.x)
    assert np.max(abs(gradient))<1e-9
    A,q=sol.x[:-1],sol.x[-1];field=C@A
    euler=C@((p['r']+p['kappa2']*(q*m)**2+p['kappa4']*(q*m)**4)*A)+p['u']*field**3
    eta=p['chi']*A[0]/2
    return dict(numberOddModes=number_modes,harmonics=m.tolist(),amplitudes=A.tolist(),
      q=q,latticeSpacing=2*np.pi/q,etaFirst=eta,
      envelopeHalfGapFrequency=abs(eta)*p['v']*q/4,
      energyDensity=energy,stationarityResidual=float(np.max(abs(gradient))),
      eulerResidualL2=float(np.sqrt(np.mean(euler**2))),
      amplitudeAndWaveNumberHessianEigenvalues=np.linalg.eigvalsh(H).tolist(),
      solverSuccess=bool(sol.success),solverMessage=str(sol.message))

patterns=[solve_pattern(n) for n in [1,3,5]]
base=patterns[-1];A=np.array(base['amplitudes']);m=np.array(base['harmonics']);q=base['q']
field=np.cos(np.outer(theta,m))@A
real_basis=[np.ones_like(theta)];mode_numbers=[0]
for n in range(1,17):
    real_basis.extend([np.sqrt(2)*np.cos(n*theta),np.sqrt(2)*np.sin(n*theta)]);mode_numbers.extend([n,n])
RB=np.array(real_basis).T;n=np.array(mode_numbers)
cell_H=np.diag(p['r']+p['kappa2']*(q*n)**2+p['kappa4']*(q*n)**4)+3*p['u']*(RB.T@(field[:,None]**2*RB))/len(theta)

length_family=[]
for scale in [.5,1.,2.]:
    length_family.append(dict(scale=scale,kappa2=p['kappa2']*scale**2,kappa4=p['kappa4']*scale**4,
      q=q/scale,latticeSpacing=base['latticeSpacing']*scale,etaFirst=base['etaFirst'],
      envelopeHalfGapFrequency=base['envelopeHalfGapFrequency']/scale))
port_family=[dict(chi=chi,etaFirst=chi*A[0]/2,envelopeHalfGapFrequency=abs(chi*A[0])*p['v']*q/8) for chi in [0.,.1,.2,.4]]
quartic_family=[dict(u=u,firstAmplitude=A[0]/np.sqrt(u/p['u']),q=q,
 etaFirst=p['chi']*A[0]/(2*np.sqrt(u/p['u']))) for u in [.5,1.,2.]]

def maxwell_bands(order):
    indices=np.arange(-order,order);eps=np.eye(len(indices));diff=indices[:,None]-indices[None,:]
    for harmonic,amplitude in zip(m,A):eps+=p['chi']*amplitude/2*(abs(diff)==harmonic)
    k=q*(indices+.5)
    return np.sqrt(eigh(np.diag(k*k),eps,eigvals_only=True)[:2])*p['v']
bands=maxwell_bands(12);bands_high=maxwell_bands(16)

report=dict(schemaVersion='photon-medium-period-amplitude-v1',date='2026-11-08',
 authority='Bounded corpus audit and supplied finite-wave-number mean-field pattern action with a declared optical port. No action-derived physical photon-aether period, modulation or gap admitted.',
 evidenceFamily='periodic-maxwell-fixture',
 sources={path:hashlib.sha256(Path(path).read_bytes()).hexdigest() for path in sorted(set(sources))},
 sourceVerificationReceipt=receipt_path,
 primarySources=[dict(url='https://arxiv.org/abs/2010.02643',version='v1',scope='Neighbouring Swift-Hohenberg/phase-field-crystal pattern framework; comparison action here is declared.',accessed='2026-11-08')],
 corpusAudit=dict(substrateActionAndPhotonPortDerived=False,internalE8LatticeFixesPhysicalSpacing=False,
  nullLinkSpeedConditionFixesSpacing=False,selectorFixesConstitutiveContrast=False),
 positiveGradientBoundary=dict(assumptions=['no imposed winding, fixed inhomogeneous density or patterned boundary',
  'positive spatial gradient metric','local potential with an attainable constant minimum'],
  identity='F>=Volume*Vmin; a constant minimizer attains it',
  isolatedNonzeroPeriodSelected=False),
 declaredPatternModel=dict(parameters=p,
  energy='integral [r phi^2/2+kappa2 (phi_x)^2/2+kappa4 (phi_xx)^2/2+u phi^4/4] dx',
  quadraticKernel='r+kappa2 k^2+kappa4 k^4',
  opticalPort='epsilon_r=epsilon_bar*(1+chi phi); classical weak-probe, no electromagnetic backreaction',
  oneHarmonic=dict(q=q0,rEffective=r_eff,amplitude=A0,latticeSpacing=2*np.pi/q0,
    eta=p['chi']*A0/2,formula='q^2=-kappa2/(2 kappa4); A^2=-4 rEff/(3 u); eta=chi A/2'),
  harmonicRefinement=patterns,
  unitCellHessianEigenvalues=np.linalg.eigvalsh(cell_H).tolist(),
  minimumRelativePermittivity=float(min(1+p['chi']*field)),
  stabilityScope='Phase-fixed odd harmonics and variable cell wave number; full real Fourier variations in one periodic cell. No all-sideband, higher-dimensional, thermodynamic, radiative or universal-cone theorem.',
  translationModeMustBeRetained=True),
 lengthRescalingFamily=length_family,opticalPortFamily=port_family,quarticAmplitudeFamily=quartic_family,
 maxwellJoin=dict(planeWaveBands=bands.tolist(),largerBasisBands=bands_high.tolist(),
  numericalHalfGap=float((bands[1]-bands[0])/2),
  fixedFourierPredictedHalfGap=base['envelopeHalfGapFrequency'],
  couplingRefitted=False),
 verdict=dict(suppliedFiniteWaveNumberActionCanSelectPattern=True,
  corpusDerivesRequiredFiniteWaveNumberCoefficients=False,
  corpusDerivesPhysicalPhotonLatticeSpacing=False,corpusDerivesOpticalModulation=False,
  scalarCoordinateChangeAloneFixesOpticalCoupling=False,
  physicalAetherEstablished=False,envelopeGapPredictedFromCorpusWithoutMaterialInputs=False,
  nextDiscriminator='Derive the substrate quadratic kernel, nonlinear saturation and normalized electromagnetic port from one sourced action; solve a stable pattern and predict its bandgap before using optical gap data.'))
out=Path('evidence/data/photon-medium-period-amplitude-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),pattern=base,verdict=report['verdict']),indent=2))

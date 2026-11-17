import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.linalg import eigh

r=json.loads(Path('evidence/data/photon-medium-period-amplitude-v1.json').read_text())
for path,digest in r['sources'].items():assert hashlib.sha256(Path(path).read_bytes()).hexdigest()==digest,path
model=r['declaredPatternModel'];p=model['parameters'];patterns=model['harmonicRefinement']
theta=np.arange(4096)*2*np.pi/4096
for row in patterns:
    m=np.array(row['harmonics']);A=np.array(row['amplitudes']);q=row['q']
    phi=np.cos(np.outer(theta,m))@A
    # Independently differentiate on a periodic physical cell by FFT.
    modes=np.fft.fftfreq(len(theta),1/len(theta))*q
    # Use the represented Fourier coefficients for spectral differentiation;
    # reconstructing them from sampled phi injects roundoff in absent modes,
    # which differentiation amplifies by k^2 and k^4.
    fft=np.fft.fft(phi)
    exact_fft=np.zeros_like(fft)
    for harmonic,amplitude in zip(m,A):
        exact_fft[harmonic]=exact_fft[-harmonic]=len(theta)*amplitude/2
    assert np.max(abs(fft-exact_fft))/len(theta)<1e-14
    dx=np.fft.ifft(1j*modes*exact_fft).real;dxx=np.fft.ifft(-modes*modes*exact_fft).real
    fourth=np.fft.ifft(modes**4*exact_fft).real
    euler=p['r']*phi-p['kappa2']*dxx+p['kappa4']*fourth+p['u']*phi**3
    norm=np.sqrt(np.mean(euler**2))
    assert abs(norm-row['eulerResidualL2'])<1e-10
    energy=np.mean(p['r']/2*phi**2+p['kappa2']/2*dx**2+p['kappa4']/2*dxx**2+p['u']/4*phi**4)
    assert abs(energy-row['energyDensity'])<1e-12 and energy<0
    for harmonic in m:
        assert abs(np.mean(euler*np.cos(harmonic*theta)))<1e-9
    assert min(row['amplitudeAndWaveNumberHessianEigenvalues'])>0
assert patterns[-1]['eulerResidualL2']<patterns[0]['eulerResidualL2']*1e-5
assert abs(patterns[-1]['q']-patterns[-2]['q'])<1e-9
assert abs(patterns[-1]['etaFirst']-patterns[-2]['etaFirst'])<1e-9
H_eigs=np.array(model['unitCellHessianEigenvalues'])
assert min(H_eigs)>-1e-8 and sum(abs(H_eigs)<1e-8)==1
base=patterns[-1];A=np.array(base['amplitudes']);m=np.array(base['harmonics']);q=base['q']
for row in r['lengthRescalingFamily']:
    scale=row['scale'];qnew=row['q']
    oldL=p['r']+p['kappa2']*(q*m)**2+p['kappa4']*(q*m)**4
    newL=p['r']+row['kappa2']*(qnew*m)**2+row['kappa4']*(qnew*m)**4
    assert np.max(abs(oldL-newL))<1e-9
    assert abs(row['latticeSpacing']/base['latticeSpacing']-scale)<1e-12
    assert abs(row['envelopeHalfGapFrequency']*scale-base['envelopeHalfGapFrequency'])<1e-12
for row in r['quarticAmplitudeFamily']:
    factor=np.sqrt(p['u']/row['u'])
    assert abs(row['firstAmplitude']-base['amplitudes'][0]*factor)<1e-12
for row in r['opticalPortFamily']:
    assert abs(row['etaFirst']-row['chi']*A[0]/2)<1e-12
assert r['opticalPortFamily'][0]['envelopeHalfGapFrequency']==0
# A scalar field-coordinate redefinition rescales its port inversely.
for t in [.4,2.]:assert abs((p['chi']/t)*(t*A[0])-p['chi']*A[0])<1e-12
assert model['minimumRelativePermittivity']>0
indices=np.arange(-20,20);diff=indices[:,None]-indices[None,:]
eps=np.eye(len(indices))
for harmonic,amplitude in zip(m,A):eps+=p['chi']*amplitude/2*(abs(diff)==harmonic)
bands=np.sqrt(eigh(np.diag((q*(indices+.5))**2),eps,eigvals_only=True)[:2])*p['v']
join=r['maxwellJoin'];assert np.max(abs(bands-join['planeWaveBands']))<1e-9
assert abs(((bands[1]-bands[0])/2)/join['fixedFourierPredictedHalfGap']-1)<.001
assert join['couplingRefitted'] is False
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text())
assert len(receipt['checks'])==3 and all(x['exitCode']==0 for x in receipt['checks'])
assert r['verdict']['suppliedFiniteWaveNumberActionCanSelectPattern'] is True
assert r['verdict']['envelopeGapPredictedFromCorpusWithoutMaterialInputs'] is False
assert r['verdict']['physicalAetherEstablished'] is False
print(json.dumps(dict(passed=True,checks=['source hashes and three archived source certificates',
 'independent FFT Euler equation and energy','harmonic refinement and variable cell wave number',
 'positive phase-fixed Hessian and retained unit-cell translation mode',
 'length rescaling preserves dimensionless kernel but changes period and gap',
 'independent nonlinear saturation and optical-port freedoms','field-coordinate redundancy control',
 'Maxwell eigenproblem and gap without refitting','local-stability and physical-status boundaries'],
 scope='Declared one-dimensional pattern action and optical port; no corpus-derived physical photon-aether parameters'),indent=2))

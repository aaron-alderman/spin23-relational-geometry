import hashlib
import json
from pathlib import Path
import numpy as np

r=json.loads(Path('evidence/data/photon-medium-native-action-v1.json').read_text())
for path,digest in r['sources'].items():assert hashlib.sha256(Path(path).read_bytes()).hexdigest()==digest,path
g=r['gaussianElimination'];p=g['parameters'];coeff=g['expansionInTSmall']
for row in g['samples']:
    t=row['kSquared'];h=p['M2']+p['Y']*t
    H=np.array([[p['r']+p['z']*t,p['lam']],[p['lam'],h]])
    x=np.array([1.,-p['lam']/h])
    assert abs(x@H@x-row['exactKernel'])<1e-12
    assert min(np.linalg.eigvalsh(H))>0
    assert row['exactSlope']>0
assert coeff[1]>0 and coeff[2]<0
assert g['samples'][-1]['fourthDerivativeTruncation']<0<g['samples'][-1]['exactKernel']
# Independent random multi-component controls: Schur-complement monotonicity.
rng=np.random.default_rng(412)
for _ in range(30):
    a=rng.normal(size=(5,5));b=rng.normal(size=(5,5))
    H0=a.T@a+np.eye(5);H1=b.T@b
    def schur(t):
        H=H0+t*H1
        return H[:2,:2]-H[:2,2:]@np.linalg.solve(H[2:,2:],H[2:,:2])
    assert min(np.linalg.eigvalsh(schur(2)-schur(.1)))>-1e-10
theta=np.arange(2048)*2*np.pi/2048
for row in r['opticalPort']['linearFamily']:
    Z=row['Z0']+row['b']*row['firstAmplitude']*np.cos(theta)
    assert min(Z)>0
    assert abs(np.mean((Z/np.mean(Z))*np.cos(theta))-row['eta'])<1e-14
    for t in [.3,2.]:assert abs((row['b']/t)*(t*row['firstAmplitude'])-row['b']*row['firstAmplitude'])<1e-14
A=r['opticalPort']['linearFamily'][0]['firstAmplitude'];Z0=r['opticalPort']['linearFamily'][0]['Z0']
for row in r['opticalPort']['evenFamily']:
    Z=Z0+row['b']*(A*np.cos(theta))**2
    assert abs(np.mean(Z)-row['meanElectricCoefficient'])<1e-14
    assert abs(np.mean(Z/np.mean(Z)*np.cos(2*theta))-row['etaAtTwiceSubstrateWaveNumber'])<1e-14
    assert abs(np.mean(Z*np.cos(theta)))<1e-14
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text())
assert len(receipt['checks'])==2 and all(x['exitCode']==0 for x in receipt['checks'])
for key in ['sourceNativeJoinedPatternPhotonActionFound','physicalLatticeSpacingPredicted',
 'opticalModulationPredicted','envelopeGapPredictedWithoutMaterialInputs','physicalAetherEstablished']:
    assert r['verdict'][key] is False
print(json.dumps(dict(passed=True,checks=['source hashes and two archived normalization certificates',
 'exact auxiliary minimization and controlled derivative expansion',
 'matrix Schur-complement monotonicity controls','positive independently varied optical ports',
 'canonical normalization versus field-coordinate redundancy','parity-even optical wave number and Fourier weights',
 'retained physical-status boundaries']),indent=2))

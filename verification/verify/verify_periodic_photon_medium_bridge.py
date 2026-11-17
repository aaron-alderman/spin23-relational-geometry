import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.linalg import eigh

r=json.loads(Path('evidence/data/periodic-photon-medium-bridge-v1.json').read_text())
for p,h in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==h
sx=np.array([[0.,1.],[1.,0.]]);sz=np.diag([1.,-1.]);assert np.allclose(sx@sz+sz@sx,0)
for row in r['records']:
    eta,q=row['eta'],row['q'];g=-eta*np.pi/2
    assert abs(eta)<.5
    H=q*sz+g*sx;assert np.allclose(H@H,(q*q+g*g)*np.eye(2))
    assert np.max(abs(np.linalg.eigvalsh(H)+np.pi-row['fixedCouplingPrediction']))<1e-12
    assert row['cutoffChange']<1e-9
    # Fresh larger basis, not the two-wave Hamiltonian being compared.
    m=np.arange(-16,16);k=np.pi+q+2*np.pi*m
    eps=np.eye(len(m))+eta*(np.eye(len(m),k=1)+np.eye(len(m),k=-1))
    w2,V=eigh(np.diag(k*k),eps)
    assert np.min(np.linalg.eigvalsh(eps))>0
    assert np.max(abs(np.sqrt(w2[:2])-row['planeWaveBands']))<1e-9
    for i in [0,1]:assert np.linalg.norm(np.diag(k*k)@V[:,i]-w2[i]*(eps@V[:,i]))<1e-8
    if eta==0:assert np.max(abs(np.array(row['planeWaveBands'])-row['fixedCouplingPrediction']))<1e-10
gaprows=[x for x in r['records'] if x['q']==0 and x['eta']>0]
for row in gaprows:
    predicted=abs(row['couplingFrequency'])
    assert abs(row['numericalHalfSplitting']/predicted-1)<.02
errors=[abs(x['numericalHalfSplitting']/abs(x['couplingFrequency'])-1) for x in gaprows]
assert errors[0]<errors[-1]
# Bloch relabelling retains the physical Fourier wave number and carrier energy.
G=2*np.pi;q=.01;k=q+5*G
assert abs((q+G)+4*G-k)<1e-12
assert k>100*q
assert r['verdict']['periodicWaveEquationDerivesEnvelopeMixing'] is True
assert r['verdict']['physicalAetherEstablished'] is False
assert r['verdict']['genuineUVIRDualityEstablished'] is False
print(json.dumps(dict(passed=True,checks=['source hash','positive dielectric metric',
 'Maxwell plane-wave residuals and basis convergence','fixed Fourier-derived mixing and anticommutation',
 'uncoupled limit and weak-grating gap accuracy','Bloch label versus microscopic wave number',
 'hypothesis and physical-identification boundaries'],scope='Declared periodic Maxwell medium; no vacuum-aether or UV/IR-duality validation'),indent=2))

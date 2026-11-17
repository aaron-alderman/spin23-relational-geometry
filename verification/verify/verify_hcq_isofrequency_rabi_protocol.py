import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.linalg import expm

r=json.loads(Path('evidence/data/hcq-isofrequency-rabi-protocol-v1.json').read_text())
for name,digest in r['sources'].items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
p=r['fixedInputs'];nu1=p['nu1GHz'];nu2=p['nu2GHz'];Ip=p['IpAmpere'];e=1.602176634e-19
assert p['parametersRefitted']==0
sx=np.array([[0.,1.],[1.,0.]],complex);sy=np.array([[0.,-1j],[1j,0.]],complex);sz=np.diag([1.,-1.])
def strength(charge,flux):
    t=nu1+nu2*np.exp(1j*np.pi*charge)
    eps=Ip/e*flux/1e9
    H=-.5*(eps*sz+t.real*sx-t.imag*sy)
    energies,U=np.linalg.eigh(H)
    W=abs(U[:,1].conj()@sz@U[:,0])**2
    return energies[1]-energies[0],W
for point in r['workingPoints']:
    ft,wt=strength(point['targetChargeOverElectron'],point['targetDeltaFluxOverQuantum'])
    fr,wr=strength(point['referenceChargeOverElectron'],point['referenceDeltaFluxOverQuantum'])
    assert abs(ft-fr)<1e-12
    assert abs(ft-point['frequencyGHz'])<1e-12
    assert abs(wr-1)<1e-12
    assert abs(wt/wr-point['predictedStrengthRatio'])<1e-12
for record in r['simulation']['records']:
    assert abs(record['predictedRatio']-record['recoveredRatio'])<1e-9
    for side in ['referenceTraceExtraction','targetTraceExtraction']:
        trace=record[side]
        expected=trace['observedOscillationRadiansPerSecond']*np.sqrt(1+trace['normalizedSineCoefficient']**2)
        assert abs(expected/trace['correctedHamiltonianRabiRadiansPerSecond']-1)<1e-12

# Independent affine Bloch evolution with different populations and readout maps.
Gamma1,Gamma2,Omega,z_eq=50e6,110e6,2*np.pi*120e6,.7
L=np.array([[-Gamma2,-Omega,0.],[Omega,-Gamma1,Gamma1*z_eq],[0.,0.,0.]])
M=L[:2,:2]
times=np.linspace(0,30e-9,50)
for za,zb,gain,offset in [(.2,-.6,3.,17.),(.8,.1,-2.,-.3),(.03,-.02,.1,2.)]:
    sa=np.array([offset+gain*(expm(L*t)@np.array([0.,za,1.]))[1] for t in times])
    sb=np.array([offset+gain*(expm(L*t)@np.array([0.,zb,1.]))[1] for t in times])
    n=(sa-sb)/(sa[0]-sb[0])
    expected=np.array([(expm(M*t)@np.array([0.,1.]))[1] for t in times])
    assert np.max(abs(n-expected))<1e-11
for case in r['remainingNoncancellation']['biasLoadingCounterexample']:
    assert abs(case['inferredStrengthRatioOverTrueStrengthRatio']-case['targetToReferencePumpFieldRatio']**2)<1e-14
print(json.dumps({'passed':True,'checks':['source hashes','direct two-state current matrix elements','target/reference carrier equality','degeneracy reference normalization','damping-corrected rate extraction','affine readout and unknown-population cancellation','explicit bias-loading limitation'],
 'scope':'Prospective protocol validated on ideal Bloch simulations; no new experimental confirmation'},indent=2))

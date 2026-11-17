import hashlib
import json
from pathlib import Path
import numpy as np

r=json.loads(Path('evidence/data/hcq-screening-pickup-geometry-v1.json').read_text())
for p,digest in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==digest,p
f=r['surrogateForwardModel'];K=np.array(f['fullChannelMatrixHenry']);m=np.array(f['externalGeneralizedDriveWeightsHenry'])
a=np.array(f['reconstructionCoefficients'])
assert K.shape==(5,3) and np.linalg.matrix_rank(K)==3
assert np.linalg.norm(a@K-m)/np.linalg.norm(m)<1e-10
assert abs(a@K[:,2])/np.linalg.norm(m)<1e-10,'DUT self mode must be nulled'
assert f['selectedFiveChannelCoefficientNorm']<2
assert f['rejectedFourChannelCoefficientNorm']>1e3
rng=np.random.default_rng(426)
for _ in range(200):
    currents=(rng.normal(size=3)+1j*rng.normal(size=3))*1e-9
    assert abs(a@(K@currents)-m@currents)<1e-26
test=r['loadingAndSelfCurrentInjectionTest']
assert abs(test['reconstructedExternalPumpRatio']-test['trueExternalPumpRatio'])<1e-8
assert abs(test['naiveBranchVoltageRatio']-test['trueExternalPumpRatio'])>.1
b=r['errorBudgetContract']
assert abs(sum(x['amplitudeBound'] for x in b['terms'])-b['sum'])<1e-14
assert abs(b['sum']+b['remainingServoResidualAllowance']-.005)<1e-14
assert b['achieved'] is False
assert r['verdict']['actualPointFivePercentEqualityVerified'] is False
assert r['verdict']['actualScreeningModeCompletenessEstablished'] is False
# Independently check covariance derivatives for a shared calibration vector.
y0=np.array([.4,.3,.2,.1,.5]);y1=np.array([.3,.4,.1,.6,.7]);a0=np.array([.2,.1,-.1,.3,.8]);hstep=1e-6
ratio=lambda z:(z@y1)/(z@y0)
gradient=(y1-ratio(a0)*y0)/(a0@y0)
numerical=np.array([(ratio(a0+hstep*np.eye(5)[j])-ratio(a0-hstep*np.eye(5)[j]))/(2*hstep) for j in range(5)])
assert np.max(abs(gradient-numerical))<1e-8
print(json.dumps({'passed':True,'checks':['source hashes','five-channel three-mode coverage','DUT self-current rejection','matched unshared monitor improves conditioning','complex current reconstructions','loading injection test','correlated coefficient sensitivity','error allocations remain unachieved'],
 'scope':'Conditional geometry/model audit; no fabrication, complete device EM model or measured 0.5-percent calibration'},indent=2))

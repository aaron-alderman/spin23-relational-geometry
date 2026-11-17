import hashlib
import json
from pathlib import Path, PureWindowsPath
import numpy as np

ROOT = Path(__file__).resolve().parents[2]
LEGACY_ROOT = PureWindowsPath(r'C:\Users\aaron\grand-theory')


def source_path(name):
    local = Path(name)
    if not local.is_absolute() or not local.is_relative_to(ROOT):
        windows = PureWindowsPath(name)
        if windows.is_absolute():
            local = Path(*windows.relative_to(LEGACY_ROOT).parts)
    resolved = (ROOT / local).resolve()
    assert resolved.is_relative_to(ROOT), name
    return resolved


r=json.loads((ROOT / 'evidence/data/hcq-independent-local-flux-witness-v1.json').read_text())
for name,digest in r['sources'].items():
    assert hashlib.sha256(source_path(name).read_bytes()).hexdigest()==digest,name
example=r['numericalCounterexample']
m=np.array(example['deviceFluxWeights'])
M1=np.array(example['singleSensorCoupling']);M2=np.array(example['twoSensorCoupling'])
i0=np.array(example['referenceCurrents']);i1=np.array(example['targetCurrents'])
assert np.max(abs(M1@(i1-i0)))<1e-14
assert abs(m@(i1-i0))>.09
assert np.linalg.matrix_rank(np.vstack([M1,m]))>np.linalg.matrix_rank(M1)
assert np.linalg.matrix_rank(np.vstack([M2,m]))==np.linalg.matrix_rank(M2)
a=np.linalg.lstsq(M2.T,m,rcond=None)[0]
assert np.max(abs(a@M2-m))<1e-14
rng=np.random.default_rng(3712)
for _ in range(100):
    currents=rng.normal(size=2)+1j*rng.normal(size=2)
    assert abs(a@(M2@currents)-m@currents)<1e-12

# Independent gain and block amplitude cancellation for arbitrary complex flux.
for _ in range(100):
    g0,g1=np.exp(rng.normal(size=2)+1j*rng.uniform(-3,3,size=2))
    probe0,probe1=np.exp(rng.normal(size=2)+1j*rng.uniform(-3,3,size=2))
    phi0=.01*(rng.normal()+1j*rng.normal());phi1=.01*(rng.normal()+1j*rng.normal())
    c0=probe0*g0;c1=probe1*g0
    b0=probe0*g1*phi0;b1=probe1*g1*phi1
    assert abs((b1*c0)/(b0*c1)-phi1/phi0)<1e-12
test=r['injectedLawViolationTest']
assert abs(test['fieldCorrectedStrengthRatio']-test['injectedTrueStrengthRatio'])<1e-14
assert abs(test['fieldCorrectedStrengthRatio']-test['predictedStrengthRatio'])>.1
for tolerance in r['correctedStrengthTest']['toleranceBudget']:
    eps=tolerance['fluxAmplitudeTolerance']
    assert np.max(abs(np.array(tolerance['strengthBiasInterval'])-np.array([(1-eps)**2,(1+eps)**2])))<1e-14
print(json.dumps({'passed':True,'checks':['source hashes','single-pickup blind-mode counterexample','sensor row-span criterion','complex multi-mode reconstruction','independent sideband/carrier cross-ratio cancellation','real strength violation preserved after field correction','field-to-strength error budget'],
 'scope':'Prospective independent-field witness; no GHz sensor precision or equal local pump flux measured on the public device'},indent=2))

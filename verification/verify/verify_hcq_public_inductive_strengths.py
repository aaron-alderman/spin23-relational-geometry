import hashlib
import json
from pathlib import Path
import numpy as np
import openpyxl

r=json.loads(Path('evidence/data/hcq-public-inductive-strength-test-v1.json').read_text())
for name,digest in r['sourceHashes'].items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
assert r['fixedModel']['parametersRefitted']==0
assert r['strengthTest']['passed'] is None and r['strengthTest']['rejected'] is None
book=openpyxl.load_workbook('evidence/data/hcq-device-primary-v1/Fig3a.xlsx',read_only=True,data_only=True)
rows=list(book.active.values);book.close()
matrix=np.array([row for row in rows if isinstance(row[0],(float,int))],float)
assert matrix.shape==(401,151)
assert abs(r['dataset']['frequencyStepMHz']-40.)<1e-10
h=6.62607015e-34;k=1.380649e-23
reference=next(row for row in r['records'] if row['requestedFluxOverQuantum']==0)
inversion=np.tanh(h*reference['predictedTransitionGHz']*1e9/(2*k*.012))
assert abs(inversion-r['populationAudit']['equilibriumReferenceInversion'])<1e-14
for row in r['records']:
    expected=(reference['predictedTransitionGHz']/row['predictedTransitionGHz'])**2
    assert abs(expected-row['predictedCurrentStrengthRatio'])<1e-12
    for diag in row['uncalibratedAreaDiagnostics']:
        ratio=diag['measurement']['signedAreaArbitraryUnitsGHz']/diag['reference']['signedAreaArbitraryUnitsGHz']
        assert abs(ratio-diag['rawSignedAreaRatio'])<1e-12

# Independent full steady-state Bloch lineshape under W/pump-transfer scaling.
# Identical Omega^2 means equal saturation, population and linewidth as well as area.
detunings=np.linspace(-10,10,101)
W=np.array([1.,.76,.34,.11]);alternative=np.sqrt(W)
pump=np.ones(4);alternative_pump=W/alternative
T1,T2=.8,.3
def response(weights,drive):
    Omega2=weights*drive
    saturation=Omega2*T1*T2
    return .5*saturation[:,None]/(1+saturation[:,None]+(detunings[None,:]*T2)**2)
assert np.max(abs(response(W,pump)-response(alternative,alternative_pump)))<1e-14

# Check the Lorentzian undersampling diagnostic by a direct discrete sum.
step=40e6;gamma=1/(4*np.pi*20e-9)
n=np.arange(-100000,100001)
direct=[]
for offset in [step/2,0.]:
    direct.append(float(step*np.sum(gamma**2/((n*step+offset)**2+gamma**2))/(np.pi*gamma)))
assert np.max(abs(np.array(direct)-r['linewidthAudit']['idealLorentzianInfiniteGridAreaFactorRange']))<1e-5
print(json.dumps({'passed':True,'checks':['immutable public workbook hashes','raw map dimensions and frequency steps','fixed spectral prediction','thermal population calculation','raw area normalization','full saturated Bloch lineshape underidentification','direct Lorentzian sampling sum'],
 'measurementStatus':r['strengthTest']['status'],
 'scope':'Evidence and identifiability checks pass; the physical current-strength law is neither confirmed nor rejected'},indent=2))

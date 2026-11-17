"""Independent source/contact and primary-workbook receipt checks."""
import hashlib
import json
import re
from pathlib import Path
import numpy as np
import openpyxl

r=json.loads(Path('evidence/data/hcq-device-field-source-derivation-v1.json').read_text())
for name,digest in r['receipts'].items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
e=1.602176634e-19;h=6.62607015e-34
for x in r['gateCalibration']:
    book=openpyxl.load_workbook(Path('evidence/data/hcq-device-primary-v1')/x['file'],read_only=True,data_only=True)
    value=book[x['sheet']][x['periodCell']].value
    assert value==x['periodText']
    period=float(re.search(r'=([\d.]+)mV',value)[1])*1e-3
    assert abs((2*e/period)/x['gateCapacitanceFromPeriodF']-1)<1e-14
    book.close()
g=r['geometryConsistency']
assert abs(g['literalJunctionCapacitanceF']/(g['junctionAreaSquareMicrometre']*g['printedSpecificCapacitanceFPerSquareMicrometre'])-1)<1e-14
assert abs((e*e/(2*h*g['literalJunctionCapacitanceF'])/1e9)/g['literalChargingFrequencyGHz']-1)<1e-14
assert 99<g['ratioLiteralToQuotedChargingFrequency']<102
f=r['fluxCalibration']
book=openpyxl.load_workbook('evidence/data/hcq-device-primary-v1/Fig3a_fit.xlsx',read_only=True,data_only=True)
assert book[f['sheet']][f['periodCell']].value==f['periodText'];book.close()
assert abs(f['coilToLoopMutualInductanceH']*f['controlCurrentPeriodAmpere']/(h/(2*e))-1)<1e-14

# Test the full matrix source formula, with a non-diagonal three-node C.
C=np.array([[3.,-.4,-.2],[-.4,2.,-.3],[-.2,-.3,1.5]])
assert np.linalg.eigvalsh(C).min()>0
eta=np.array([.2,-.1,.04]);p=np.array([.8,.3,-.2]);q0=np.array([.1,-.2,.05])
E=.17;step=2e-4
# Retain an independently specified direct source term to test its sign.
direct=.03
def H(x):
    q=p-q0-eta*x
    return .5*q@np.linalg.solve(C,q)-.5*direct*x*x
d=eta@np.linalg.solve(C,p-q0-eta*E)+direct*E
contact=eta@np.linalg.solve(C,eta)-direct
d_fd=-(H(E+step)-H(E-step))/(2*step)
c_fd=(H(E+step)-2*H(E)+H(E-step))/step**2
assert abs(d-d_fd)<1e-10 and abs(contact-c_fd)<1e-8
v=r['jointPredictionVerdict']
assert v['electricalGatePeriodRecovered'] is True
assert v['numericalFreeSpaceFieldLeverArmDerived'] is False
assert v['completePhysicalContactsDetermined'] is False
assert v['physicalCasimirForcePredictionPossible'] is False
assert all(x['parametersRefitted'] is False for x in r['publishedParameterReplays'])
assert r['geometryOnlyPhaseSlipTest']['equalNominalJunctionPredictedMaximumGapGHz']>2*r['geometryOnlyPhaseSlipTest']['fittedMaximumGapGHz']
print(json.dumps({'passed':True,'checks':['primary workbook hashes and period cells','voltage-to-charge calibration','coil-to-flux period calibration','printed junction-capacitance unit mismatch','independent non-diagonal matrix source/contact derivatives including direct term','no-refit versus fitted-curve replay boundary','missing field normalization not replaced by zero'],
 'scope':'Derivation and bounded source audit; no calibrated electric dipole or physical Casimir force claimed'},indent=2))

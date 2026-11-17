import hashlib
import json
from pathlib import Path
import numpy as np

r=json.loads(Path('evidence/data/hcq-lever-arm-ratio-test-v1.json').read_text())
for name,digest in r['sources'].items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
assert r['parameters']['refittedParameters']==0
rows=r['sourceCounterexample']['records']
for detuning in [0.,.25,.5,1.,2.,4.]:
    a=next(x for x in rows if x['model']=='modulus-lift' and x['epsilonOverA']==detuning)
    b=next(x for x in rows if x['model']=='complex-path-lift' and x['epsilonOverA']==detuning)
    assert abs(a['gapGHz']-b['gapGHz'])<1e-12
    assert abs(a['staticKuboMinusContact']-b['staticKuboMinusContact'])<1e-12
zero_a=next(x for x in rows if x['model']=='modulus-lift' and x['epsilonOverA']==0)
zero_b=next(x for x in rows if x['model']=='complex-path-lift' and x['epsilonOverA']==0)
assert zero_a['strengthRatioToR1']==0
assert .51<zero_b['strengthRatioToR1']<.52
assert len({round(x['totalForceRatioR2ToR1'],8) for x in r['backgroundTest']})>1
differences=r['backgroundSubtractedDifferenceRatios']
assert max(differences)-min(differences)<1e-10
assert len({round(x['forceRatioR2ToR1'],6) for x in r['unknownFrequencyWeightingTest']})==3

# Directly diagonalize the physical flux-source two-level model at each bias.
sx=np.array([[0.,1.],[1.,0.]]);sz=np.diag([1.,-1.])
Ip=r['parameters']['IpAmpere'];f0=r['parameters']['fluxSweepGapAtDegeneracyGHz'];e=1.602176634e-19
for row in r['magneticSourcePrediction']['records']:
    epsGHz=Ip/e*row['deltaFluxOverFluxQuantum']/1e9
    energies,U=np.linalg.eigh(-.5*(epsGHz*sz+f0*sx))
    normalizedWeight=abs(U[:,1]@sz@U[:,0])**2
    assert abs(normalizedWeight-row['currentTransitionStrengthRatio'])<1e-12
    assert abs(energies[1]-energies[0]-row['gapGHz'])<1e-12
    assert abs(row['currentStaticPolarizabilityRatioGroundState']-normalizedWeight*f0/row['gapGHz'])<1e-12
assert r['verification']['maxScalarLeverArmRatioChange']<1e-10
assert r['verification']['maxContactCompletedStaticResponseDifference']<1e-12
print(json.dumps({'passed':True,'checks':['source hashes','fixed published parameters','same spectra with different normalized electric strengths','contact-completed static response equality','background subtraction versus raw force ratios','unknown frequency weighting survives','direct diagonalization of inductive strength ratios'],
 'scope':'Conditional normalization-free tests; no unique full electric/Casimir device prediction or measured-strength validation'},indent=2))

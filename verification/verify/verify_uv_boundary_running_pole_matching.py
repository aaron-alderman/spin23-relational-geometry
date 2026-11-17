import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad
from scipy.optimize import brentq

r=json.loads(Path('evidence/data/uv-boundary-running-pole-matching-v1.json').read_text())
for p,digest in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==digest,p
model=r['scalarChannelSurrogate'];g=model['inputs']['g'];mf=model['inputs']['referenceFermionMass'];N=model['inputs']['multiplicity']
def rho(t):return N*g*g*t/(8*np.pi)*(1-4*mf*mf/t)**1.5 if t>4*mf*mf else 0.
def dispersion(s):
    return s*s/np.pi*quad(lambda t:rho(t)/(t*t*(t-s)),4,np.inf,epsabs=1e-12)[0]
ratios=[]
for row in model['matchingFamily']:
    s=row['poleSquared'];assert 0<s<4
    f=lambda x:x-row['treeScalarMassSquared']+row['A']+row['B']*x+dispersion(x)
    assert abs(f(s))<1e-10
    independent=brentq(f,0,4-1e-9,xtol=1e-12)
    assert abs(independent-s)<1e-10
    h=1e-5;derivative=(f(s+h)-f(s-h))/(2*h)
    assert derivative>0 and abs(1/derivative-row['residue'])<1e-8
    assert abs(mf/np.sqrt(s)-row['conditionalPoleMassRatio'])<1e-12
    ratios.append(row['conditionalPoleMassRatio'])
assert max(ratios)-min(ratios)>.01

# Independently compute the scalar-Yukawa spin trace with Minkowski gamma matrices.
I=np.eye(2);Z=np.zeros((2,2));sx=np.array([[0,1],[1,0]]);sy=np.array([[0,-1j],[1j,0]]);sz=np.diag([1,-1])
g0=np.block([[I,Z],[Z,-I]]);g3=np.block([[Z,sz],[-sz,Z]])
for row in model['thresholdSamples']:
    s=row['s'];assert abs(row['absorptiveWeight']-rho(s))<1e-12
    if s<=4:
        assert row['partialWidth']==0
    else:
        E=np.sqrt(s)/2;p=np.sqrt(s/4-mf*mf)
        slashp=E*g0-p*g3;slashq=E*g0+p*g3
        spinTrace=np.trace((slashp+mf*np.eye(4))@(slashq-mf*np.eye(4))).real
        assert abs(spinTrace-2*(s-4*mf*mf))<1e-12
        width=N*g*g*spinTrace*np.sqrt(1-4*mf*mf/s)/(16*np.pi*np.sqrt(s))
        assert abs(width-row['partialWidth'])<1e-12
        assert abs(np.sqrt(s)*width-row['absorptiveWeight'])<1e-12

before=r['finiteSchemeControl']['before'];after=r['finiteSchemeControl']['after']
assert abs(before['poleSquared']-after['poleSquared'])<1e-12
for s in [.3,1.,3.8]:
    inverse=lambda row:s-row['treeScalarMassSquared']+row['A']+row['B']*s+dispersion(s)
    assert abs(inverse(before)-inverse(after))<1e-12
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text())
assert len(receipt['checks'])==3 and all(x['exitCode']==0 for x in receipt['checks'])
assert r['formalPolePipeline']['physicalRunningComputed'] is False
assert r['corpusInputAudit']['knownColorFixedPointIsDeclaredToySystem'] is True
assert r['verdict']['targetMassFitted'] is False
assert r['verdict']['physicalUVRunningThresholdPolePredictionEstablished'] is False
assert r['verdict']['universalUVCompletionNoGo'] is False
print(json.dumps(dict(passed=True,checks=['source hashes and three archived source certificates',
 'original-variable dispersion integral versus transformed pole calculation','positive below-threshold residues',
 'same cut with different finite matching produces different scalar-channel poles',
 'independent Dirac spin trace and two-body threshold power','consistent finite scheme change preserves pole',
 'missing target RG/UV data not replaced by unrelated toy beta functions','surrogate and physical-status boundaries'],
 scope='Conditional scalar-channel matching calculation and bounded corpus audit; no UV-derived physical pole-mass prediction'),indent=2))

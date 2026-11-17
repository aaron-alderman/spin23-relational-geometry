import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

r = json.loads(Path('evidence/data/spectral-mass-ratio-closure-v1.json').read_text())
for path, digest in r['sources'].items():
    assert hashlib.sha256(Path(path).read_bytes()).hexdigest() == digest, path
assert np.allclose(r['explicitModel']['spinDerivativeGram'], 4*np.eye(4))
assert abs(r['explicitModel']['directTraceE2']-r['explicitModel']['expectedTraceE2']) < 1e-12

# Independently evaluate scalar-field-dependent heat terms from a4. A general
# anti-Hermitian derivative Clifford vertex becomes Hermitian after multiplying i.
sx=np.array([[0,1],[1,0]],complex);sy=np.array([[0,-1j],[1j,0]]);sz=np.diag([1.,-1.])
gamma=[np.kron(sz,sx),np.kron(sz,sy),np.kron(sz,sz),np.kron(sx,np.eye(2))]
g5=gamma[0]@gamma[1]@gamma[2]@gamma[3]
for g in gamma:
    assert np.allclose(np.trace((1j*g@g5)@(1j*g@g5)),4)
    assert abs(np.trace(1j*g@g5))<1e-12

for row in r['cutoffMomentFamily']:
    e=row['epsilon']
    assert row['positivityPolynomialMinimum']>0 and row['derivativePolynomialMaximum']<0
    assert abs(row['f0']-1)<1e-12
    assert abs(row['f2']-(.5-e/6))<1e-12
    assert abs(row['f4']-.5)<1e-12
    # Gaussian moments from Gamma integrals independently fix these polynomial moments.
    assert abs(row['aOverB']-2*row['f2']/row['f0'])<1e-12
    assert abs(row['singleChannelSquaredMassRatio']-.25)<1e-12
    assert abs(row['singleChannelGapSquaredOverCutoffSquared']/row['scalarMassSquaredOverCutoffSquared']-.25)<1e-12
assert abs(r['cutoffMomentFamily'][0]['aOverB']-r['cutoffMomentFamily'][-1]['aOverB'])>.2
equal,unequal,single=r['shapeCases']
assert abs(equal['minimumRatio']-.5)<1e-12
assert abs(unequal['minimumRatio']**2-5/68)<1e-12
assert single['minimumRatio']==.5

# The fixed-trace quartic bound is checked on non-diagonal positive matrices,
# rather than presupposing a diagonal variation or a chosen eigenbasis.
rng=np.random.default_rng(806)
for n in [2,3,5]:
    for _ in range(25):
        Y=rng.normal(size=(n,n))+1j*rng.normal(size=(n,n)); X=Y.conj().T@Y;X/=np.trace(X)
        lhs=np.trace(X@X).real;rhs=1/n+np.trace((X-np.eye(n)/n)@(X-np.eye(n)/n)).real
        assert abs(lhs-rhs)<1e-12 and lhs>=1/n-1e-12

ratios=[]
for row in r['rankOneComplementFullMatrixFamily']:
    M=np.array(row['matrix']);assert np.linalg.matrix_rank(M[1:,1:])==1
    assert np.linalg.matrix_rank(M)==3
    assert abs(np.linalg.det(M)+row['y']**2)<1e-12
    s=np.linalg.svd(M,compute_uv=False);weights=s*s/(s@s);rho=weights@weights
    ratio=.5*np.sqrt(weights.min()/rho);ratios.append(ratio)
    assert abs(ratio-row['conditionalMinimumGapToScalarMass'])<1e-12
assert max(ratios)-min(ratios)>.05

# Unexpanded Gaussian spectral action: perform the four-momentum radial integral.
for s in [0.,1.,2.]:
    integral=quad(lambda p:p**3*np.exp(-(p*p+s)),0,np.inf,epsabs=1e-12)[0]
    assert abs(integral-.5*np.exp(-s))<1e-12
assert r['fullGaussianNegativeControl']['exactDerivativeAtTruncatedMinimum']<0
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text())
assert len(receipt['checks'])==2 and all(x['exitCode']==0 for x in receipt['checks'])
v=r['verdict']
assert v['commonMomentsCancelForSameScalarReference'] is True
assert v['positivePhysicalT1T2MassRatioPredicted'] is False
assert v['rankOneComplementForcesFullMasslessMode'] is False
print(json.dumps(dict(passed=True,checks=['source hashes and archived source receipts',
 'independent Clifford derivative trace','fixed f0 and f4 with variable f2',
 'same-action scalar-reference moment cancellation','spectral-shape mass-ratio counterexample',
 'non-diagonal fixed-trace shape bound','rank-one complement with full rank and variable spectrum',
 'unexpanded Gaussian integral versus truncated minimum','physical-status boundaries'],
 scope='Explicit flat one-scalar truncated-action calculation; no selected physical T1/T2 operator or mass ratio'),indent=2))

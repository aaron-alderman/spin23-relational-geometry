import hashlib
import json
from pathlib import Path
import numpy as np

r=json.loads(Path('evidence/data/joint-background-vacuum-kinetic-protection-v1.json').read_text())
for p,digest in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==digest,p
T=[]
for i in range(3):
    a=np.zeros((3,3),complex);a[i,i]=1;T.append(a)
for i in range(3):
    for j in range(i):
        for z in [1.,1j]:
            a=np.zeros((3,3),complex);a[i,j]=z/np.sqrt(2);a[j,i]=np.conj(z)/np.sqrt(2);T.append(a)
def potential(M,c2,c4):return float((-c2*np.trace(M@M)+c4*np.trace(np.linalg.matrix_power(M,4))).real)
rng=np.random.default_rng(1575)
for row in r['jointlyVariedPolynomial']['samples']:
    M=np.array(row['PhiReal'],complex);c2,c4,ckin=row['c2'],row['c4'],row['cKin'];v=row['v']
    assert np.allclose(M@M,v*v*np.eye(3))
    assert np.linalg.norm(-2*c2*M+4*c4*np.linalg.matrix_power(M,3))<1e-10
    assert abs(potential(M,c2,c4)+3*c2*c2/(4*c4))<1e-10
    # Independently differentiate every real Hermitian direction, including
    # imaginary links and all diagonal backgrounds.
    h=1e-4;H=np.empty((9,9))
    for i,ti in enumerate(T):
        H[i,i]=(potential(M+h*ti,c2,c4)-2*potential(M,c2,c4)+potential(M-h*ti,c2,c4))/h**2
        for j in range(i):
            tj=T[j]
            H[i,j]=H[j,i]=(potential(M+h*(ti+tj),c2,c4)-potential(M+h*(ti-tj),c2,c4)-potential(M+h*(-ti+tj),c2,c4)+potential(M-h*(ti+tj),c2,c4))/(4*h*h)
    assert np.max(abs(H-np.array(row['realHermitianHessian'])))<3e-5
    assert row['positiveCurvatureDirections']==(9 if row['label']=='all_positive' else 5)
    assert row['zeroCurvatureDirections']==(0 if row['label']=='all_positive' else 4)
    radial=np.array([np.trace(t@M).real for t in T]);radial/=np.linalg.norm(radial)
    assert abs(radial@np.array(row['realHermitianHessian'])@radial/(2*ckin)-row['radialMassSquared'])<1e-10
    assert abs(row['gapToRadialMass']-.5)<1e-12
    # Full Gaussian action decreases along the same common scale direction.
    density=lambda scale:np.exp(-np.linalg.eigvalsh(scale*M)**2).sum()
    derivative=(density(1+h)-density(1-h))/(2*h)
    assert abs(derivative-row['fullGaussianScaleDerivativeAtVacuum'])<2e-7 and derivative<0
    for _ in range(5):
        X=rng.normal(size=(3,3))+1j*rng.normal(size=(3,3));X=(X+X.conj().T)/2
        residual=X@X-v*v*np.eye(3)
        assert abs(potential(X,c2,c4)+3*c2*c2/(4*c4)-c4*np.trace(residual@residual).real)<1e-9
sample=[x for x in r['jointlyVariedPolynomial']['samples'] if x['c2']==2. and x['label'].startswith('mixed')]
assert max(x['a'] for x in sample)-min(x['a'] for x in sample)>.5
assert min(r['pureCrossRestriction']['unrestrictedSquaredFrequencies'])<0

# Kinetic and quartic operators are independently invariant under conjugation.
for _ in range(20):
    X=rng.normal(size=(3,3))+1j*rng.normal(size=(3,3));M=(X+X.conj().T)/2
    X=rng.normal(size=(3,3))+1j*rng.normal(size=(3,3));dM=(X+X.conj().T)/2
    U,_=np.linalg.qr(rng.normal(size=(3,3))+1j*rng.normal(size=(3,3)))
    assert abs(np.trace((U@dM@U.conj().T)@(U@dM@U.conj().T))-np.trace(dM@dM))<1e-10
    assert abs(np.trace(np.linalg.matrix_power(U@M@U.conj().T,4))-np.trace(np.linalg.matrix_power(M,4)))<1e-9
for row in r['symmetryAllowedDeformations']:
    y,k,b=row['y'],row['cKin'],row['c4'];assert abs(row['ratio']**2-y*y*k/(4*b))<1e-12
    for t in [.4,2.3]:assert abs((y/t)**2*(k/t**2)/(b/t**4)-y*y*k/b)<1e-12
assert r['symmetryAllowedDeformations'][0]['ratio']!=r['symmetryAllowedDeformations'][2]['ratio']
# This is a calculus identity for arbitrary running functions, not a computed
# beta function or loop prediction for the proposed physical model.
y=lambda t:np.exp(.1*t);k=lambda t:np.exp(.2*t);b=lambda t:np.exp(.3*t);h=1e-5
f=lambda t:np.log(y(t)**2*k(t)/b(t))
assert abs((f(h)-f(-h))/(2*h)-(.2+.2-.3))<1e-10
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text())
assert len(receipt['checks'])==3 and all(x['exitCode']==0 for x in receipt['checks'])
assert r['verdict']['orbitInvariantConditionalTreeRatio'] is True
assert r['verdict']['originalFullDecayingCutoffVacuumStabilized'] is False
assert r['verdict']['positivePhysicalT1T2PoleMassRatioPredicted'] is False
assert r['quantumCondition']['predictionPossibleFromUniqueUVBoundaryAndComputedRunningWithoutExactProtection'] is True
print(json.dumps(dict(passed=True,checks=['source hashes and three archived certificates',
 'global quartic square-completion bound','nine-direction independent Hermitian Hessian',
 'background orbit and invariant tree mass ratio','positive and zero scalar-mode counts',
 'pure-cross unmatched instability in unrestricted variation','full Gaussian scale descent',
 'separately invariant kinetic/quartic operators and ratio deformation',
 'field-coordinate-invariant coupling combination','formal RG tangency identity',
 'conditional versus physical and UV-running boundaries'],scope='Classical polynomial model and bounded source audit; no protected physical full-action pole ratio'),indent=2))

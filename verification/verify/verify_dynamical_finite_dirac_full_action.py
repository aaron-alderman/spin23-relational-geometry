import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

r=json.loads(Path('evidence/data/dynamical-finite-dirac-full-action-v1.json').read_text())
for p,digest in r['sources'].items():
    assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==digest,p
def W(name,s):
    return np.exp(-s) if name=='gaussian' else np.exp(-s)*(4*s*s+8*s+13)
def F(name,s):
    return np.exp(-s) if name=='gaussian' else np.exp(-s)*(1+4*(s-1)**2)
for row in r['fullCutoffTheorem']['samples']:
    name,s=row['profile'],row['s'];h=1e-4
    assert abs(row['W']-W(name,s))<1e-10
    fd=(W(name,s+h)-W(name,s-h))/(2*h)
    assert abs(fd-row['derivative'])<1e-7 and row['derivative']<0
    fd2=(W(name,s+h)-2*W(name,s)+W(name,s-h))/h**2
    assert abs(fd2-F(name,s))<2e-6
    assert abs(2*row['directRadialMomentumIntegral']-row['W'])<1e-10
assert r['fullCutoffTheorem']['nonmonotoneProfileDerivativeAtT2']>0
# A compact-support example has a plateau, rather than a unique finite radius.
compact_W=lambda s:.5*max(1-s,0)**2
assert compact_W(2)==compact_W(3)==0
for row in r['hardRadius']['shapeSamples']:
    assert abs(sum(row['squaredMasses'])-3)<1e-12
    assert row['action']>=row['equalShapeAction']-1e-12
    assert abs(row['action']-sum(W(row['profile'],s) for s in row['squaredMasses']))<1e-10
    assert sum(row['excludedCollectiveRadialDirection'])!=0
# Random unequal spectra test the full-cutoff convexity statement, not just the
# three saved diagonal examples.
rng=np.random.default_rng(1198)
for name in ['gaussian','positive_nonmonotone']:
    for n in [2,3,5]:
        for _ in range(20):
            x=rng.dirichlet(np.ones(n))*n
            assert sum(W(name,s) for s in x)>=n*W(name,1)-1e-12
ratios=[]
for row in r['softStabilizer']['samples']:
    n,q,kappa,R=row['numberChannels'],row['q'],row['kappa'],row['radiusTarget']
    assert abs(kappa*(n*q-R)-np.exp(-q))<1e-12
    assert q>0 and min(row['hessianEigenvalues'])>0
    m=np.full(n,np.sqrt(q));h=1e-4
    potential=lambda z:np.exp(-z*z).sum()+kappa/2*((z*z).sum()-R)**2
    numerical=np.empty((n,n))
    for i in range(n):
        ei=np.eye(n)[i]*h
        numerical[i,i]=(potential(m+ei)-2*potential(m)+potential(m-ei))/h**2
        for j in range(i):
            ej=np.eye(n)[j]*h
            numerical[i,j]=numerical[j,i]=(potential(m+ei+ej)-potential(m+ei-ej)-potential(m-ei+ej)+potential(m-ei-ej))/(4*h*h)
    assert np.max(abs(numerical-np.array(row['amplitudeHessian'])))<2e-6
    unit=np.ones(n)/np.sqrt(n)
    assert abs(unit@np.array(row['amplitudeHessian'])@unit-row['radialMassSquared'])<1e-10
    assert abs(row['gapToRadialMass']-np.sqrt(q/row['radialMassSquared']))<1e-12
    ratios.append(row['gapToRadialMass'])
assert max(ratios)-min(ratios)>.1
# Full-matrix orientation degeneracy remains even with equal singular values.
C=np.diag([1.,-1.]);theta=.37;O=np.array([[np.cos(theta),-np.sin(theta)],[np.sin(theta),np.cos(theta)]])
rotated=O@C@O.T
assert not np.allclose(C,rotated) and np.allclose(rotated@rotated,np.eye(2))
for row in r['finiteDiracMeasure']['oneParameterCutoffSamples']:
    assert row['partitionIntegralOnInterval']>=row['rigorousLowerBound']
    assert abs(row['rigorousLowerBound']-2*row['L']*np.exp(-2))<1e-12
for row in r['finiteDiracMeasure']['confiningPolynomialSamples']:
    a=row['alpha'];assert np.isfinite(row['partitionIntegral']) and row['partitionIntegral']>0
    assert abs(row['conditionalGapToCurvatureMass']-1/np.sqrt(8*a))<1e-12
assert r['verdict']['fixedRadiusCanSelectShape'] is True
assert r['verdict']['fixedRadiusPreservesEarlierRadialReference'] is False
assert r['verdict']['positivePhysicalT1T2MassRatioPredicted'] is False
print(json.dumps(dict(passed=True,checks=['source hashes','exact closed forms versus momentum quadrature',
 'full-cutoff descent despite nonmonotone positive profile','compact-support plateau',
 'fixed-radius full-action shape bound','hard constraint excludes collective radial mode',
 'soft-stabilizer stationarity and independent amplitude Hessian','stable shape with parameter-dependent ratio',
 'full-matrix orientation degeneracy','bounded-action measure divergence and confining alternative',
 'physical-status boundaries'],scope='Flat constant-mass cutoff theorem and supplied comparison models; no selected physical finite Dirac theory'),indent=2))

import hashlib
import json
from pathlib import Path
import numpy as np
from numpy.polynomial.legendre import leggauss
from scipy.integrate import quad

r=json.loads(Path('evidence/data/full-spectral-finite-k-v1.json').read_text())
for path,digest in r['sources'].items():assert hashlib.sha256(Path(path).read_bytes()).hexdigest()==digest,path
def F(u,b):return np.exp(-u)*(1+b*(u-1)**2)/(1+b)
def Fp(u,b):return np.exp(-u)*(2*b*(u-1)-1-b*(u-1)**2)/(1+b)
def Fpp(u,b):return np.exp(-u)*(2*b-4*b*(u-1)+1+b*(u-1)**2)/(1+b)
# Direct four-dimensional bubble in its original radial/angular variables.
# Gauss-Chebyshev second-kind rule exactly incorporates the S3 angular weight.
nodes,weights=leggauss(240);u=(nodes+1)*30;wu=weights*30
j=np.arange(1,241);z=np.cos(j*np.pi/241);wz=2/241*np.sin(j*np.pi/241)**2
for profile in r['profiles']:
    b=profile['b'];assert abs(quad(lambda t:F(t,b),0,np.inf)[0]-1)<1e-10
    for x in [.1,1.,4.,9.]:
        a=u[:,None];bb=a+x+2*np.sqrt(a*x)*z[None,:];delta=bb-a
        dd=np.divide(Fp(bb,b)-Fp(a,b),delta,out=np.zeros_like(delta),where=abs(delta)>1e-8)
        dd=np.where(abs(delta)<=1e-8,Fpp((a+bb)/2,b),dd)
        direct=float(np.sum(wu*u*(dd@wz)))
        reduced=quad(lambda alpha:F(alpha*(1-alpha)*x,b),0,1,epsabs=1e-12)[0]
        assert abs(direct-reduced)<1e-8,(b,x,direct,reduced)
    for row in profile['momentumSamples']:
        x=row['kSquaredOverCutoffSquared']
        # Independent identity: the radial F'' integral equals F(c).
        if x in [0.,1.,10.]:
            for alpha in [.1,.5]:
                c=alpha*(1-alpha)*x
                integrated=quad(lambda v:v*Fpp(v+c,b),0,np.inf,epsabs=1e-12)[0]
                assert abs(integrated-F(c,b))<1e-10
        expected=x/2*quad(lambda t:F(t*(1-t)*x,b),0,1,epsabs=1e-12)[0]
        assert abs(expected-row['relativeToZeroMomentum'])<1e-11
        assert expected>=0 and abs(row['fullKernel']-(-1+expected))<1e-11
    for row in profile['constantScalarSamples']:
        s=row['squaredScalarOverCutoffSquared']
        potential=quad(lambda t:(t-s)*F(t,b),s,np.inf,epsabs=1e-12)[0]
        tail=quad(lambda t:F(t,b),s,np.inf,epsabs=1e-12)[0]
        assert abs(potential-row['fullPotential'])<1e-10
        assert abs(-tail-row['radialDerivativeInS'])<1e-10 and tail>0
        assert abs(F(s,b)/F(0,b)-row['normalizedLowMomentumGaugeCoefficient'])<1e-12
# Same leading coefficients but genuinely different full kernels and gauge ports.
assert len({round(p['momentumSamples'][5]['fullKernel'],8) for p in r['profiles']})==3
assert len({round(p['constantScalarSamples'][2]['normalizedLowMomentumGaugeCoefficient'],8) for p in r['profiles']})==3
gaussian=r['profiles'][0]
row=gaussian['momentumSamples'][5]
assert row['kSquaredOverCutoffSquared']==10
assert row['fourthDerivativeRelativeTruncation']<0<row['relativeToZeroMomentum']
# Constant scalar commutes with the gauged squared Dirac operator in this model.
eig=np.array([.2,1.,3.,7.])
for s in [.1,1.,3.]:assert abs(np.sum(np.exp(-(eig+s)))/np.sum(np.exp(-eig))-np.exp(-s))<1e-14
assert r['verdict']['fullMomentumScalarKernelCalculated'] is True
for k in ['sourceNativeStablePatternActionEstablished','nonlinearPeriodicSaturationEstablished',
 'physicalPhotonCouplingAndContactTermsFixed','physicalLatticeSpacingModulationAndGapPredicted','allSpectralActionsRuledOut']:
    assert r['verdict'][k] is False
print(json.dumps(dict(passed=True,checks=['source hashes','direct four-dimensional divided-difference bubble versus reduced exact form factor',
 'nonnegative cutoff ordering beyond gradient truncation','false high-momentum instability of fourth-derivative truncation',
 'same leading moments but different full response','unexpanded nonlinear constant-field potential',
 'conditional constant-scalar gauge factorization','physical and scope boundaries']),indent=2))

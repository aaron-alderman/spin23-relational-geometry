import hashlib
import json
from pathlib import Path
import numpy as np
from numpy.polynomial.legendre import leggauss
from scipy.integrate import quad

r=json.loads(Path('evidence/data/stationary-spectral-background-v1.json').read_text())
for p,h in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==h,p
def F(u,b):return np.exp(-u)*(1+b*(u-1)**2)/(1+b)
def Fp(u,b):return np.exp(-u)*(2*b*(u-1)-1-b*(u-1)**2)/(1+b)
def Fpp(u,b):return np.exp(-u)*(2*b-4*b*(u-1)+1+b*(u-1)**2)/(1+b)
def W(s,b):return np.exp(-s)*(1+b*(s*s+2*s+3))/(1+b)
nodes,weights=leggauss(220);u=(nodes+1)*30;wu=weights*30
j=np.arange(1,221);z=np.cos(j*np.pi/221);wz=2/221*np.sin(j*np.pi/221)**2
rng=np.random.default_rng(908)
for row in r['samples']:
    b=row['b'];s=row['s'];N=row['N'];kap=row['kappa'];R=row['R'];S=np.diag(row['signs'])
    tail=quad(lambda v:F(v,b),s,np.inf)[0]
    assert abs(kap*(N*s-R)-tail)<1e-12
    for x in [1.,4.]:
        a=u[:,None]+s;bb=a+x+2*np.sqrt(u[:,None]*x)*z[None,:];d=bb-a
        dd=np.divide(Fp(bb,b)-Fp(a,b),d,out=np.zeros_like(d),where=abs(d)>1e-8)
        dd=np.where(abs(d)<=1e-8,Fpp((a+bb)/2,b),dd)
        direct=float(np.sum(wu*u*(dd@wz)))
        reduced=quad(lambda t:F(s+t*(1-t)*x,b),0,1)[0]
        assert abs(direct-reduced)<1e-8
    for sample in row['samples']:
        x=sample['x'];H=quad(lambda t:F(s+t*(1-t)*x,b),0,1)[0]
        K=np.array(sample['scalarQuadraticMatrix']);eig=np.linalg.eigvalsh(K)
        assert np.max(abs(eig-sample['scalarEigenvalues']))<1e-11
        assert min(eig)>-1e-10
        if x>0:assert min(eig)>0 and min(sample['coupledEigenvalues'])>0
        elif row['signs']==[1,-1,-1]:assert sum(abs(eig)<1e-10)==4
        else:assert min(eig)>0
        h=rng.normal(size=(3,3))+1j*rng.normal(size=(3,3));h=(h+h.conj().T)/2
        anti=np.sqrt(s)*(S@h+h@S)
        # Independent direct invariant expression at the stationary point.
        energy=H/2*(x*np.trace(h@h).real+np.trace(anti@anti).real)+2*kap*(np.trace(np.sqrt(s)*S@h).real)**2
        coordinates=list(np.diag(h).real)
        for i in range(3):
            for j in range(i):coordinates.extend([np.sqrt(2)*h[i,j].real,np.sqrt(2)*h[i,j].imag])
        coordinates=np.array(coordinates)
        assert abs(coordinates@K@coordinates-energy)<1e-10
        odd=(h-S@h@S)/2;even=(h+S@h@S)/2
        projected=x*H/2*np.trace(odd@odd).real+(x+4*s)*H/2*np.trace(even@even).real+2*kap*(np.trace(np.sqrt(s)*S@h).real)**2
        assert abs(energy-projected)<1e-10
        expected=6*quad(lambda t:t*(1-t)*F(s+t*(1-t)*x,b),0,1)[0]
        assert expected>0 and abs(expected-sample['relativeGaugeCoefficient'])<1e-12
    # Exact nonlinear constant-field comparison; not a spatial global proof.
    for _ in range(12):
        masses=rng.normal(size=3)*2
        energy=sum(W(m*m,b) for m in masses)+kap/2*(sum(masses**2)-R)**2
        assert energy>=row['constantVacuumEnergy']-1e-12
    assert abs(row['samples'][0]['relativeGaugeCoefficient']-F(s,b))<1e-12
for x in [.01,1.,10.,100.]:
    h=quad(lambda t:np.exp(-t*(1-t)*x),0,1)[0]
    J=quad(lambda t:t*(1-t)*np.exp(-t*(1-t)*x),0,1)[0]
    assert abs(-4+(4+2*x)*h-8*x*J)<1e-10
assert r['verdict']['stationaryNonzeroBackgroundConstructedInDeclaredRepair'] is True
assert r['verdict']['conditionalFiniteMomentumPhotonResponseDerived'] is True
for k in ['sourceNativeStabilizerAndBackgroundFixed','fullIncludedScalarPhotonHessianHasFiniteKInstability',
 'nonlinearPeriodicStabilityEstablished','physicalPhotonPortsAndContactMatchingFixed',
 'physicalLatticeSpacingModulationAndGapPredicted','allNonzeroSpectralBackgroundsRuledOut']:
    assert r['verdict'][k] is False
print(json.dumps(dict(passed=True,checks=['source hashes','stationarity of 18 nonzero matrix backgrounds',
 'direct massive four-dimensional bubble','all nine scalar directions and transverse gauge positivity',
 'four retained mixed-sign orbit zero modes','invariant matrix versus even/odd decomposition',
 'nonlinear constant-matrix minima','exact gauge form-factor identity and nonzero-background response',
 'physical and nonlinear scope boundaries']),indent=2))

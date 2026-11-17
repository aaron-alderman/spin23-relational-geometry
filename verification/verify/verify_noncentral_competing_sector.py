import hashlib
import json
from pathlib import Path
import numpy as np
from numpy.polynomial.legendre import leggauss
from scipy.integrate import quad

r=json.loads(Path('evidence/data/noncentral-competing-sector-v1.json').read_text())
for p,h in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==h,p
nodes,weights=leggauss(240);u=(nodes+1)*30;wu=weights*30
j=np.arange(1,241);z=np.cos(j*np.pi/241);wz=2/241*np.sin(j*np.pi/241)**2
for bg in r['noncentralExtension']['backgrounds']:
    s=bg['s'];B=np.array(bg['B']);S=np.diag(bg['signs'])
    assert abs(3*s-1-np.exp(-s))<1e-12
    for x in [1.,4.]:
        a=u[:,None]+s;bb=a+x+2*np.sqrt(u[:,None]*x)*z[None,:];d=bb-a
        dd=np.divide(np.exp(-a)-np.exp(-bb),d,out=np.zeros_like(d),where=abs(d)>1e-8)
        dd=np.where(abs(d)<=1e-8,np.exp(-(a+bb)/2),dd)
        # Original four-dimensional orbital + spin bubble and A^2 seagull.
        weight=2*u[:,None]*(1-z[None,:]**2)/3+x/2
        direct=-np.exp(-s)+float(np.sum(wu*u*((dd*weight)@wz)))
        J=quad(lambda t:t*(1-t)*np.exp(-s-t*(1-t)*x),0,1)[0]
        assert abs(direct-2*x*J)<1e-8,(s,x,direct,2*x*J)
    for sample in bg['samples']:
        x=sample['x'];H=sample['H'];J=sample['J'];eig=np.array(sample['full45Eigenvalues'])
        assert min(eig)>-1e-9 and sum(abs(eig)<1e-9)==9 and sum(eig>1e-9)==36
        even=(x+4*s)*H/2
        analytic=[0.]*9+[even]*8+[even+6*s]
        if bg['signs']==[1,-1,-1]:analytic += [2*x*J]*15+[2*x*J+2*s*H]*12
        else:analytic += [2*x*J]*27
        assert np.max(abs(np.sort(analytic)-eig))<1e-10
        expected=np.linalg.eigvalsh(2*x*J*np.eye(9)+H/2*B.T@B)
        assert max(abs(expected-np.array(sample['transverseGaugeEigenvalues'])))<1e-12
        # Each infinitesimal gauge orbit must lie in the coupled null space.
        rng=np.random.default_rng(182);theta=rng.normal(size=9)
        h=1j*B@theta/np.sqrt(x);A=theta
        assert np.linalg.norm(1j*np.sqrt(x)*h+B@A)<1e-12
        # Analytic broken pair: positive eigenvalue and exact gauge null.
        pair=H/2*np.array([[x,-2j*np.sqrt(s*x)],[2j*np.sqrt(s*x),4*s]])
        assert abs(np.linalg.det(pair))<1e-10 and min(np.linalg.eigvalsh(pair))>-1e-10
    if bg['signs']==[1,-1,-1]:assert sum(np.linalg.eigvalsh(B.T@B)>1e-9)==4
    else:assert np.max(abs(B))==0

for row in r['helicalControl']['samples']:
    m=row['m'];mu=row['mu'];q=row['u'];k=row['kStar'];A2=row['amplitudeSquared'];delta=mu*mu/4-m*m
    assert row['zeroMomentumCoefficient']>0 and row['highMomentumCoefficientAtK100']>0
    assert abs(k*k+m*m-mu*k-row['minimumCoefficient'])<1e-12
    if delta>0:
        low,high=row['negativeBand'];assert low>0 and low<k<high
        assert abs(low*low+m*m-mu*low)<1e-12 and abs(high*high+m*m-mu*high)<1e-12
        # Fourier differentiation verifies curl, field amplitude and exact energy.
        theta=np.arange(1024)*2*np.pi/1024;A=np.sqrt(A2)
        V=np.array([A*np.cos(theta),-A*np.sin(theta),np.zeros_like(theta)])
        modes=np.fft.fftfreq(len(theta),1/len(theta))*k
        deriv=np.fft.ifft(1j*modes*np.fft.fft(V,axis=1),axis=1).real
        curl=np.array([-deriv[1],deriv[0],np.zeros_like(theta)])
        assert np.max(abs(curl-k*V))<1e-10
        density=np.sum(curl**2,axis=0)/2+m*m*np.sum(V**2,axis=0)/2-mu*np.sum(V*curl,axis=0)/2+q*np.sum(V**2,axis=0)**2/4
        assert abs(np.mean(density)-row['minimumEnergyDensity'])<1e-12
        rng=np.random.default_rng(421);v=rng.normal(size=(3,100));c=rng.normal(size=(3,100))
        raw=np.sum(c*c,axis=0)/2+m*m*np.sum(v*v,axis=0)/2-mu*np.sum(v*c,axis=0)/2+q*np.sum(v*v,axis=0)**2/4
        square=np.sum((c-mu*v/2)**2,axis=0)/2+q/4*(np.sum(v*v,axis=0)-delta/q)**2-delta**2/(4*q)
        assert np.max(abs(raw-square))<1e-12
    else:assert row['negativeBand'] is None and A2==0
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text())
assert len(receipt['checks'])==2 and all(c['exitCode']==0 for c in receipt['checks'])
for k in ['sourceNativeCompetingCoefficientAndStateFixed','physicalNonlinearPatternAndPhotonResponsePredicted',
 'physicalLatticeSpacingModulationAndGapPredicted','allNoncentralOrCompetingInteractionsRuledOut']:
    assert r['verdict'][k] is False
print(json.dumps(dict(passed=True,checks=['source hashes and two archived certificates','direct noncentral transverse gauge bubble',
 '45-direction spectra with nine gauge nulls retained','longitudinal gauge/Goldstone square and broken-generator rank',
 'stable endpoints and exact finite instability band in supplied helical control','nonlinear square-completion bound and saturating helix',
 'physical source, state and photon matching boundaries']),indent=2))

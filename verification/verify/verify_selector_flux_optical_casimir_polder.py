"""Independent frequency-coordinate integration and evidence receipt checks."""
import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

path=Path('evidence/data/selector-flux-optical-casimir-polder-bridge-v1.json')
r=json.loads(path.read_text())
for name,digest in r['sources'].items():
    assert hashlib.sha256(Path(name).read_bytes()).hexdigest()==digest,name
source=json.loads(Path('evidence/data/selector-flux-boundary-action-audit-v1.json').read_text())
spectra=source['conditionalConstruction']['records']
assert r['normalization']['absoluteSIForcePredicted'] is False
assert all(value is False for value in r['noRefit'].values())
assert len(r['records'])==21
max_error=0.
for row in r['records']:
    s=next(x for x in spectra if x['fluxOverQuantum']==row['fluxOverQuantum'])
    gaps=np.array(s['gaps']);weights=np.array(s['dipoleWeights']);L=row['ell']
    def alpha(x):
        return float(np.sum(2*gaps*weights/(gaps*gaps+x*x)))
    def energy(x):
        y=x*L
        return alpha(x)*np.exp(-2*y)*(1+2*y+4*y*y)
    def force(x):
        y=x*L
        return alpha(x)*np.exp(-2*y)*(3+6*y+8*y*y+8*y**3)
    # Original frequency coordinate x=hbar xi/E_star, not s=xi L/c.
    U=-quad(energy,0,np.inf,epsabs=1e-13,epsrel=1e-10)[0]/(64*np.pi**2*L**3)
    F=-quad(force,0,np.inf,epsabs=1e-13,epsrel=1e-10)[0]/(64*np.pi**2*L**4)
    error=max(abs(U/row['energyReduced']-1),abs(F/row['forceReduced']-1))
    max_error=max(max_error,error);assert error<1e-9
    assert U<0 and F<0
    assert row['firstOpticalGap']==s['gaps'][0]
    assert row['firstOpticalDipoleWeight']==s['dipoleWeights'][0]
    assert -1<row['firstPoleOnlyForceRelativeError']<0
for contrast in r['fluxContrasts']:
    rows=[x for x in r['records'] if x['ell']==contrast['ell']]
    zero=next(x for x in rows if x['fluxOverQuantum']==0)
    half=next(x for x in rows if x['fluxOverQuantum']==.5)
    full=next(x for x in rows if x['fluxOverQuantum']==1)
    assert abs(full['forceReduced']/zero['forceReduced']-1)<1e-12
    assert abs(contrast['halfFluxVsZeroForceFraction']-(half['forceReduced']/zero['forceReduced']-1))<1e-14
    assert -.22<contrast['halfFluxVsZeroForceFraction']<-.20
print(json.dumps({'passed':True,'maxIndependentFrequencyIntegralRelativeError':max_error,
 'checks':['source hashes','same optical poles and weights','no extra force fit','independent frequency-coordinate integration','full flux periodicity','flux contrast recomputation','first-pole-only response misses force weight'],
 'scope':'Conditional leading electric-dipole Casimir-Polder bridge, not a calibrated material or selector prediction'},indent=2))

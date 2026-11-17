import hashlib
import json
from pathlib import Path
import numpy as np

r=json.loads(Path('evidence/data/peirce-potential-kinetic-metric-v1.json').read_text())
for p,digest in r['sources'].items():assert hashlib.sha256(Path(p).read_bytes()).hexdigest()==digest,p
def phi(a,B,K):return np.block([[np.array([[a]]),K.conj()[None,:]],[K[:,None],B]])
rng=np.random.default_rng(1197)
for _ in range(70):
    a=rng.normal();Y=rng.normal(size=(2,2))+1j*rng.normal(size=(2,2));B=(Y+Y.conj().T)/2
    K=rng.normal(size=2)+1j*rng.normal(size=2);q=np.vdot(K,K).real;M=phi(a,B,K)
    expected=a**4+np.trace(np.linalg.matrix_power(B,4))+4*np.vdot(K,(a*a*np.eye(2)+a*B+B@B)@K)+2*q*q
    assert abs(np.trace(np.linalg.matrix_power(M,4))-expected)<1e-9
    dk=rng.normal(size=2)+1j*rng.normal(size=2);tangent=phi(0.,np.zeros((2,2)),dk)
    assert abs(np.trace(tangent@tangent)-2*np.vdot(dk,dk))<1e-10
    U,_=np.linalg.qr(rng.normal(size=(2,2))+1j*rng.normal(size=(2,2)))
    transformed=phi(a,U@B@U.conj().T,U@K)
    assert np.max(abs(np.linalg.eigvalsh(M)-np.linalg.eigvalsh(transformed)))<1e-10

for row in r['backgroundFamily']:
    a=row['a'];B=np.array(row['B']);K=np.array(row['selectedKReal'])+1j*np.array(row['selectedKImag'])
    x=np.ravel(np.column_stack([K.real,K.imag]))*np.sqrt(2);hstep=1e-4;n=4
    def getK(z):return (z[::2]+1j*z[1::2])/np.sqrt(2)
    def potential(z):
        M=phi(a,B,getK(z));return float((-row['c2']*np.trace(M@M)+row['c4']*np.trace(np.linalg.matrix_power(M,4))).real)
    def full(z):return np.exp(-np.linalg.eigvalsh(phi(a,B,getK(z)))**2).sum()
    H=np.empty((n,n));gradient=[];fullgradient=[]
    for i in range(n):
        ei=np.eye(n)[i]*hstep
        gradient.append((potential(x+ei)-potential(x-ei))/(2*hstep))
        fullgradient.append((full(x+ei)-full(x-ei))/(2*hstep))
        H[i,i]=(potential(x+ei)-2*potential(x)+potential(x-ei))/hstep**2
        for j in range(i):
            ej=np.eye(n)[j]*hstep
            H[i,j]=H[j,i]=(potential(x+ei+ej)-potential(x+ei-ej)-potential(x-ei+ej)+potential(x-ei-ej))/(4*hstep**2)
    assert max(abs(np.array(gradient)))<2e-7
    assert np.max(abs(H-np.array(row['realCoordinateHessian'])))<3e-6
    assert np.max(abs(np.array(fullgradient)-row['fullGaussianGradientAtTruncatedVacuum']))<2e-7
    assert row['fullGaussianGradientNorm']>.1
    G=np.array(row['kineticMetric']);freq=np.linalg.eigvalsh(np.linalg.solve(G,H))
    assert abs(freq[-1]-row['radialMassSquared'])<2e-6
    assert abs(min(abs(np.linalg.eigvalsh(phi(a,B,K))))-row['minimumFermionSingularValue'])<1e-12

first,second,pure=r['backgroundFamily']
assert abs(first['linkNormSquared']-second['linkNormSquared'])<1e-12
assert abs(first['radialMassSquared']-second['radialMassSquared'])<1e-12
assert abs(first['minimumGapToRadialMass']-second['minimumGapToRadialMass'])>.02
assert first['directionalMassSquared']>0 and second['directionalMassSquared']>0
assert pure['minimumFermionSingularValue']==0 and abs(pure['pairedLinkNormToRadialMass']-.5)<1e-12
assert pure['sectorGradingAnticommutatorNorm']==0 and first['sectorGradingAnticommutatorNorm']>0
family=r['allowedEFTKineticCorrectionFamily']
assert family[0]['minimumGapToRadialMass']<family[-1]['minimumGapToRadialMass']
for row in family:assert abs(row['radialMassSquared']*row['totalKineticZ']+2*first['h'][0])<1e-12
receipt=json.loads(Path(r['sourceVerificationReceipt']).read_text());assert len(receipt['checks'])==1 and receipt['checks'][0]['exitCode']==0
assert r['verdict']['leadingLinkPotentialAndMetricDerivedInDeclaredBlock'] is True
assert r['verdict']['positivePhysicalT1T2MassRatioPredicted'] is False
print(json.dumps(dict(passed=True,checks=['source hashes and archived pairing certificate',
 'complex non-diagonal quartic block identities','kinetic trace and frame covariance',
 'independent four-real-coordinate Hessian and generalized frequencies','same radial reference with changed full fermion gap',
 'unmatched pure-cross zero versus paired-mode ratio','diagonal repair changes sector anticommutator',
 'full Gaussian gradient at truncated vacua','EFT kinetic correction boundary','physical-status boundaries'],
 scope='Leading spectral block calculation and source audit; no selected full physical link action'),indent=2))

import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.linalg import eigh

def bands(eta,q,order):
    # a=v=1. The even basis is symmetric at K=pi, retaining both Bragg waves.
    m=np.arange(-order,order);k=np.pi+q+2*np.pi*m
    eps=np.eye(len(m))+eta*(np.eye(len(m),k=1)+np.eye(len(m),k=-1))
    return np.sqrt(eigh(np.diag(k*k),eps,eigvals_only=True)[:2])

rows=[]
for eta in [0.,.005,.02,.05,.1]:
    for q in [0.,.02*np.pi]:
        lo=bands(eta,q,8);hi=bands(eta,q,12)
        predicted=np.pi+np.array([-1.,1.])*np.sqrt(q*q+(eta*np.pi/2)**2)
        rows.append(dict(eta=eta,q=q,planeWaveBands=hi.tolist(),lowerOrderBands=lo.tolist(),
          fixedCouplingPrediction=predicted.tolist(),couplingFrequency=-eta*np.pi/2,
          cutoffChange=float(np.max(abs(hi-lo))),
          approximationAbsoluteErrors=(hi-predicted).tolist(),
          numericalHalfSplitting=float((hi[1]-hi[0])/2)))
sources=['scripts/derive-periodic-photon-medium-bridge.py']
report=dict(schemaVersion='periodic-photon-medium-bridge-v1',date='2026-11-08',
 authority='Declared periodic dielectric calculation under a hypothetical photon-medium interpretation. No empirical aether identification, selector realization or UV/IR duality admitted.',
 evidenceFamily='periodic-maxwell-fixture',
 sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sources},
 primarySources=[dict(url='https://arxiv.org/html/2310.08423',version='v2',sections='2.1, counterpropagating grating modes',accessed='2026-11-08')],
 assumptions=dict(aether='user-specified working hypothesis, not established by this calculation',
  michelsonMorley='set aside for this hypothetical calculation, not a claim that the measurements establish no constraints',
  medium='lossless stationary nonmagnetic 1D dielectric; coefficients nondispersive only over the tested band',
  materialProfile='epsilon_r=epsilon_bar*(1+2 eta cos(2 pi x/a))',
  units='a=v=hbar=1 for numerical fixture'),
 derivation=dict(braggCarrierWaveNumber='pi/a',braggCarrierFrequency='v pi/a',
  envelopeHamiltonian='hbar v q sigma_z - hbar eta omega_B sigma_x/2',
  fixedMixingFrequency='g_B=-eta omega_B/2',envelopeHalfGap='hbar abs(g_B)',
  approximation='First order in eta, q/k_B and detuning/carrier frequency',
  actualFrequency='omega=omega_B+delta_omega; both branches near a positive carrier'),
 records=rows,
 verdict=dict(periodicWaveEquationDerivesEnvelopeMixing=True,
  geometryAndConstitutiveInputsDerived=False,
  smallEnvelopeWaveNumberImpliesSmallAbsoluteEnergy=False,
  fundamentalPhotonRestMassDerived=False,physicalAetherEstablished=False,
  physicalSelectorT1T2Identified=False,genuineUVIRDualityEstablished=False))
out=Path('evidence/data/periodic-photon-medium-bridge-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),records=len(rows),verdict=report['verdict']),indent=2))

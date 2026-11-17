import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

receipt='evidence/data/noncentral-competing-source-checks-v1.json'
sources=['scripts/audit-noncentral-competing-sector.py',receipt,
 'evidence/data/stationary-spectral-background-v1.json',
 'corpus/claims/1500-1599/1502_pure_curvature_is_blind_to_flat_leakage_but_covariant_projector_energy_selects_the_parallel_mask.md',
 'corpus/claims/1600-1699/1611_the_surviving_0minus_torsion_mode_gives_a_generic_axionlike_spin_portal_not_yet_a_spin23_fingerprint.md',
 'corpus/claims/1600-1699/1632_a_finite_spectral_triple_can_couple_to_spin23_geometry_but_the_action_vacuum_and_spectrum_are_missing.md']
for check in json.loads(Path(receipt).read_text())['checks']:
    assert check['exitCode']==0;sources.append(check['command'].removeprefix('node '))
prior=json.loads(Path(sources[2]).read_text())
T=[]
for i in range(3):
    a=np.zeros((3,3),complex);a[i,i]=1;T.append(a)
for i in range(3):
    for j in range(i):
        a=np.zeros((3,3),complex);a[i,j]=a[j,i]=1/np.sqrt(2);T.append(a)
        a=np.zeros((3,3),complex);a[i,j]=1j/np.sqrt(2);a[j,i]=-1j/np.sqrt(2);T.append(a)
backgrounds=[]
for row in prior['samples']:
    if row['b']!=0 or row['kappa']!=1:continue
    s=row['s'];S=np.diag(row['signs']);Phi=np.sqrt(s)*S
    # i[T_b,Phi] maps the gauge parameter into the real scalar tangent.
    B=np.array([[np.trace(a@(1j*(b@Phi-Phi@b))).real for b in T] for a in T])
    v=np.array([np.trace(S@a).real for a in T])
    plus=[(a+S@a@S)/2 for a in T]
    gram=np.array([[np.trace(a@b).real for b in plus] for a in plus])
    samples=[]
    for x in [.01,1.,10.,100.]:
        H=quad(lambda t:np.exp(-s-t*(1-t)*x),0,1,epsabs=1e-13)[0]
        J=quad(lambda t:t*(1-t)*np.exp(-s-t*(1-t)*x),0,1,epsabs=1e-13)[0]
        Ks=x*H/2*np.eye(9)+2*s*H*gram+2*s*np.outer(v,v)
        mass=H/2*(B.T@B)
        Kt=2*x*J*np.eye(9)+mass
        # Ordering: 9 scalars, 9 longitudinal gauge, 3 x 9 transverse gauge.
        full=np.zeros((45,45),complex);full[:9,:9]=Ks;full[9:18,9:18]=mass
        cross=-1j*np.sqrt(x)*H/2*B
        full[:9,9:18]=cross;full[9:18,:9]=cross.conj().T
        for q in range(3):full[18+9*q:27+9*q,18+9*q:27+9*q]=Kt
        eig=np.linalg.eigvalsh(full)
        samples.append(dict(x=x,H=H,J=J,transverseGaugeEigenvalues=np.linalg.eigvalsh(Kt).tolist(),
          full45Eigenvalues=eig.tolist(),gaugeNullCount=int(sum(abs(eig)<1e-9)),
          positiveCount=int(sum(eig>1e-9)),minimumEigenvalue=float(min(eig))))
    backgrounds.append(dict(s=s,signs=row['signs'],B=B.tolist(),samples=samples))

# Deliberately supplied competing static interaction: massive transverse vector.
# It is an exact nonlinear control, not a corpus-derived spectral action.
helices=[]
for mu in [1.5,2.5,3.]:
    m=u=1.;delta=mu*mu/4-m*m;k=mu/2
    edges=None if delta<=0 else [k-np.sqrt(delta),k+np.sqrt(delta)]
    helices.append(dict(m=m,u=u,mu=mu,kStar=k,
      zeroMomentumCoefficient=m*m,minimumCoefficient=-delta,
      negativeBand=edges,amplitudeSquared=max(delta,0)/u,
      minimumEnergyDensity=-max(delta,0)**2/(4*u),
      highMomentumCoefficientAtK100=10000+m*m-mu*100))
report=dict(schemaVersion='noncentral-competing-sector-v1',date='2026-11-08',
 authority='Bounded corpus audit, supplied full U(3) spectral/gauge extension, and supplied exact static helical control; no physical source-native medium prediction',
 evidenceFamily='periodic-maxwell-fixture',sources={p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in sources},
 sourceVerificationReceipt=receipt,
 corpusAudit=dict(projector1502='Positive noncentral connection stiffness; spectral origin and promoted gauge group remain open',
  torsion1611='Anomaly-induced pseudoscalar F dualF possible, but descendant and exotic thresholds needed to fix coefficient; no stationary rolling background derived',
  triple1632='Concrete spectral triple, action, stationary vacuum and healthy spectrum remain absent'),
 noncentralExtension=dict(model='Prior Gaussian stabilized Hermitian matrix with full U(3) gauged by conjugation',
  supplied=True,physicalElectromagneticEmbeddingDerived=False,
  assumptions='Flat Euclidean space, zero gauge background, Phi0^2=s I, kappa=R=1, cutoff exp(-t), no density or gauge flux; gravity frozen',
  basis='Trace-orthonormal Hermitian generators: three diagonal then real/imaginary pairs i>j',
  scalarGaugeMap='B_ab=Tr T_a i[T_b,Phi0]',
  scalarBlock='K_s=x H/2 I + 2s H P_even + 2s v v^T; v_a=Tr S T_a',
  transverseGaugeBlock='K_T=2x J I+H/2 B^T B; J=integral alpha(1-alpha)exp(-s-alpha(1-alpha)x)',
  longitudinalBlock='K_L=H/2 B^T B',
  mixedBlock='K_scalar,longitudinal=-i sqrt(x) H/2 B; transverse mixed block zero',
  positivityIdentity='Coupled odd/longitudinal quadratic form is H/2 ||i sqrt(x) h_odd+B A_L||^2; remaining scalar and transverse terms nonnegative',
  gaugeNulls='Nine gauge nulls at x>0; mixed-sign scalar orbit modes are included in the coupled gauge identity, not deleted',
  backgrounds=backgrounds,
  photonPort='Central unbroken U(1) chosen as probe; relative coefficient 6J, but U(3)->U(1)xU(2) does not uniquely identify physical electromagnetism'),
 helicalControl=dict(energy='integral [|curl V|^2/2 + m^2 |V|^2/2 - mu V dot curl V/2 + u |V|^4/4], div V=0',
  representation='Real massive transverse vector in a declared medium rest frame; not assumed to be the electromagnetic connection',
  helicityCoefficients='lambda_plusminus=k^2+m^2 plusminus mu k',
  finiteBandCondition='mu^2>4m^2 with m^2>0; negative helicity band between (mu-sqrt(mu^2-4m^2))/2 and (mu+sqrt(mu^2-4m^2))/2 for mu>0',
  squareCompletion='|curl V-mu V/2|^2/2 + u/4 (|V|^2-delta/u)^2 - delta^2/(4u), delta=mu^2/4-m^2>0',
  saturatingField='V=A(cos(k z),-sin(k z),0), curl V=k V, k=mu/2, A^2=delta/u',
  nonlinearScope='Exact global static lower bound in the declared divergence-free class on a periodic domain admitting that helical wave number; not dynamical UV/causality proof',
  physicalInputs=['vector carrier and mass m','parity-odd coefficient mu','quartic u','periodic-domain compatibility','electromagnetic port'],
  connectionToTorsion='Constant theta F dualF is a bulk total derivative for smooth Abelian fields; a rolling theta can supply a spatial helicity term after integration by parts, but it is not a stationary constant scalar vacuum and its drive/backreaction must be specified',
  photonResponseFixed=False,samples=helices),
 verdict=dict(noncentralFullGaugeScalarOperatorCalculated=True,
  noncentralGaussianConvexRepairHasFiniteKInstability=False,
  suppliedHelicalControlHasStableEndpointsAndFiniteBand=True,
  suppliedHelicalControlHasExactStaticSaturation=True,
  sourceNativeCompetingCoefficientAndStateFixed=False,
  physicalNonlinearPatternAndPhotonResponsePredicted=False,
  physicalLatticeSpacingModulationAndGapPredicted=False,
  allNoncentralOrCompetingInteractionsRuledOut=False,
  nextDiscriminator='Derive the competing helicity/nonlocal interaction or another finite-band mechanism with coefficient, source state, nonlinear terms and electromagnetic embedding fixed from one source-native action; then check the full physical Hessian and response without choosing those inputs from the target pattern.'))
out=Path('evidence/data/noncentral-competing-sector-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),verdict=report['verdict']),indent=2))

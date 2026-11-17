import hashlib
import json
from pathlib import Path
import numpy as np

receipt='evidence/data/photon-medium-native-action-source-checks-v1.json'
sources=[receipt,'scripts/audit-photon-medium-native-action.py',
 'evidence/data/photon-medium-period-amplitude-v1.json',
 'corpus/claims/1500-1599/1502_pure_curvature_is_blind_to_flat_leakage_but_covariant_projector_energy_selects_the_parallel_mask.md',
 'corpus/claims/1100-1199/1198_the_charge_three_link_has_a_scalar_flavon_versus_dynamical_cross_peirce_fork_separating_bf_closure_from_flavour_closure.md',
 'corpus/programmes/frontier/wave-7/frontier_wave7_100_chain_theory_photon_normalization_no_go.md',
 'corpus/programmes/frontier/wave-7/frontier_wave7_101_compact_charge_does_not_fix_alpha.md',
 'corpus/programmes/rdg-maxwell-bridge/04_sources_resonance_and_material_memory_gate.md',
 'corpus/programmes/dynatology/mystery_atlas_21_aether_substrate_and_universal_cone.md']
for row in json.loads(Path(receipt).read_text())['checks']:
    assert row['exitCode']==0
    sources.append(row['command'].removeprefix('node '))

# Declared Gaussian elimination control, not a recovered substrate action.
# H(t)=H0+t H1, t=k^2; H0,H1 positive definite in this example.
p=dict(r=2.,z=.5,M2=4.,Y=1.5,lam=1.)
def kernel(t):return p['r']+p['z']*t-p['lam']**2/(p['M2']+p['Y']*t)
def slope(t):return p['z']+p['lam']**2*p['Y']/(p['M2']+p['Y']*t)**2
coeff=[p['r']-p['lam']**2/p['M2'],
 p['z']+p['lam']**2*p['Y']/p['M2']**2,
 -p['lam']**2*p['Y']**2/p['M2']**3]
rows=[]
for t in [0.,.01,.1,1.,10.,100.]:
    H=np.array([[p['r']+p['z']*t,p['lam']],
      [p['lam'],p['M2']+p['Y']*t]])
    rows.append(dict(kSquared=t,exactKernel=kernel(t),exactSlope=slope(t),
      fullHessianEigenvalues=np.linalg.eigvalsh(H).tolist(),
      fourthDerivativeTruncation=coeff[0]+coeff[1]*t+coeff[2]*t*t))

# Physically distinct ports at fixed field normalization, substrate and Z0.
# Permittivity-only example in a declared medium rest frame, magnetic port fixed.
A=.16;Z0=2.
ports=[dict(b=b,Z0=Z0,firstAmplitude=A,eta=b*A/(2*Z0),
 minimumElectricCoefficient=Z0-abs(b*A)) for b in [0.,.2,.4,.8]]
# An exact internal phi -> -phi symmetry forbids the linear port, but leaves
# the coefficient of phi^2 E^2 free and changes the first optical wave number.
even=[]
for b in [0.,.4,.8]:
    mean=Z0+b*A*A/2
    even.append(dict(b=b,meanElectricCoefficient=mean,
      etaAtTwiceSubstrateWaveNumber=b*A*A/(4*mean),
      opticalReciprocalWaveNumberOverSubstrate=2))
report=dict(schemaVersion='photon-medium-native-action-v1',date='2026-11-08',
 authority='Bounded source audit and declared Gaussian/port controls; no physical admission',
 evidenceFamily='periodic-maxwell-fixture',
 sources={s:hashlib.sha256(Path(s).read_bytes()).hexdigest() for s in sources},
 sourceVerificationReceipt=receipt,
 sourceAudit=[
 dict(source=sources[3],result='positive covariant-projector penalty; parallel minimum; coefficient and spectral origin open'),
 dict(source=sources[4],result='charged scalar or dynamical link fork; potential parameters and physical carrier matching remain inputs'),
 dict(source=sources[5],result='homogeneous Ward constraints do not fix Maxwell residue'),
 dict(source=sources[6],result='compact charge lattice does not fix positive gauge kinetic coefficient'),
 dict(source=sources[7],result='positive material-memory dynamics with supplied oscillator parameters'),
 dict(source=sources[8],result='substrate action/state/species ports required rather than supplied')],
 gaussianElimination=dict(parameters=p,quadraticMatrix='H0 + k^2 H1, H0 >= 0, H1 >= 0',
  exactKernel='r + z t - lambda^2/(M2+Y t), t=k^2',
  exactSlope='z + lambda^2 Y/(M2+Y t)^2 >= 0',
  expansionInTSmall=coeff,expansionRadiusInT=p['M2']/p['Y'],samples=rows,
  generalArgument='The minimized quadratic energy is pointwise nondecreasing in t when H1 is positive semidefinite; taking its infimum over auxiliary fields preserves that ordering.',
  scope='Static Gaussian elimination with positive two-derivative matrix and invertible auxiliary block; excludes derivative mixing outside this positivity class, finite density, nonlocal interactions and nonequilibrium drives.'),
 opticalPort=dict(linearFamily=ports,evenFamily=even,
  assumptions='Fixed substrate normalization and solution, fixed mean Z0 for linear port, independent positive magnetic coefficient and declared medium rest frame; zero probe backreaction.',
  canonicalLinearCoefficient='b/Z0 after E_c=sqrt(Z0) E',
  coordinateRedundancy='phi_new=t phi, b_new=b/t leaves b phi invariant',
  gaugeInvariantCovariantForm='Separate electric and magnetic scalars require a medium four-velocity; f(phi) F_mu_nu F^mu_nu alone does not justify changing only permittivity.'),
 verdict=dict(sourceNativeJoinedPatternPhotonActionFound=False,
  positiveTwoDerivativeGaussianEliminationSelectsFiniteWaveNumber=False,
  canonicalPhotonNormalizationAloneFixesModulation=False,
  exactInternalParityWouldForbidLinearPort=True,
  physicalLatticeSpacingPredicted=False,opticalModulationPredicted=False,
  envelopeGapPredictedWithoutMaterialInputs=False,physicalAetherEstablished=False,
  nextDiscriminator='One source-native substrate/photon action and state must derive a controlled finite-k minimum, nonlinear saturation and normalized electric/magnetic response, then predict a held-out band spectrum.'))
out=Path('evidence/data/photon-medium-native-action-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps(dict(written=str(out),verdict=report['verdict']),indent=2))

"""Corpus-source audit plus a conditional gauge-covariant boundary construction.

The four-site fixture is not an identified Spin(2,3) selector or a calibrated device.
It demonstrates which flux predictions follow once a Hamiltonian and source are fixed.
"""
import hashlib
import json
from pathlib import Path
import numpy as np

sources = [
    'corpus/programmes/rdg-maxwell-bridge/06_topology_cut_holonomy_and_boundary_record_gate.md',
    'corpus/claims/1200-1299/1230_the_nearest_a11_experiment_is_an_aharonov_casher_two_port_while_protected_z3_requires_verified_sector_algebra_and_scaling.md',
    'corpus/claims/1400-1499/1459_the_a7_a9_a11_lane_is_underidentified_and_reopens_only_with_a_generator_state_port_packet.md',
    'corpus/claims/1400-1499/1464_no_existing_named_platform_contains_the_generator_state_port_and_sector_packet_needed_for_a11.md',
    'corpus/programmes/admissibility/admissibility_54_transverse_joint_detector_symmetry_ceiling.md',
    'scripts/audit-selector-flux-boundary-action.py',
]
# Site order L,a,R,b; energies and hoppings in arbitrary common energy units.
eps = np.array([0., .9, 1.7, 2.9])
t = np.array([.4, .35, .3, .45])
positions = np.array([-1., 0., 1., .2])
D = np.diag(positions)
p, internal = [0, 2], [1, 3]

def hamiltonian(phi, break_path=False):
    H = np.diag(eps).astype(complex)
    for i, j, value in [(0, 1, t[0]), (1, 2, t[1]),
                        (0, 3, 0. if break_path else t[2]),
                        (3, 2, t[3]*np.exp(1j*phi))]:
        H[i, j] = value
        H[j, i] = np.conj(value)
    return H

def boundary(H, z):
    return H[np.ix_(p,p)] + H[np.ix_(p,internal)] @ np.linalg.solve(
        z*np.eye(2)-H[np.ix_(internal,internal)], H[np.ix_(internal,p)])

def measure(H):
    e, U = np.linalg.eigh(H)
    d = U.conj().T @ D @ U
    gaps, weights = e[1:]-e[0], np.abs(d[1:,0])**2
    static = float(np.sum(2*weights/gaps))
    slope = float(np.sum(2*weights/gaps**3))
    first_moment = float(gaps @ weights)
    g = U[:,0]
    double_commutator = 2*D@H@D-D@D@H-H@D@D
    commutator_moment = float(np.real(g.conj() @ double_commutator @ g)/2)
    assert abs(first_moment-commutator_moment)<1e-12
    return {'energies':e.tolist(), 'gaps':gaps.tolist(), 'dipoleWeights':weights.tolist(),
            'static':static, 'frequencySquaredSlope':slope,
            'firstMoment':first_moment, 'doubleCommutatorMoment':commutator_moment}

records=[]
max_gauge_spectrum=max_gauge_weight=max_schur=max_periodicity=max_path_off=0.
max_boundary_dipole=max_boundary_norm=max_naive_dipole_error=0.
phases=np.array([.3, -.8, .6, 1.1])
G=np.diag(np.exp(1j*phases))
for phi in np.pi*np.array([0., .25, .5, .75, 1., 1.5, 2.]):
    H=hamiltonian(phi); m=measure(H); gauged=measure(G@H@G.conj().T)
    # Reconstruct physical dipole transitions from the eliminated boundary action.
    levels, vectors=np.linalg.eigh(H)
    hpq=H[np.ix_(p,internal)]; hqp=hpq.conj().T
    dq=D[np.ix_(internal,internal)]; dp=D[np.ix_(p,p)]
    resolvents=[np.linalg.inv(e*np.eye(2)-H[np.ix_(internal,internal)]) for e in levels]
    for a in range(4):
        ua=vectors[p,a]; ra=resolvents[a]
        metric=np.eye(2)+hpq@ra@ra@hqp
        max_boundary_norm=max(max_boundary_norm,abs(ua.conj()@metric@ua-1))
        for b in range(4):
            ub=vectors[p,b]; rb=resolvents[b]
            vertex=dp+hpq@ra@dq@rb@hqp
            exact=vectors[:,a].conj()@D@vectors[:,b]
            max_boundary_dipole=max(max_boundary_dipole,abs(ua.conj()@vertex@ub-exact))
            max_naive_dipole_error=max(max_naive_dipole_error,abs(ua.conj()@dp@ub-exact))
    max_gauge_spectrum=max(max_gauge_spectrum,float(np.max(np.abs(np.array(m['energies'])-gauged['energies']))))
    max_gauge_weight=max(max_gauge_weight,float(np.max(np.abs(np.array(m['dipoleWeights'])-gauged['dipoleWeights']))))
    effective=[]
    for z in [-1., .1]:
        B=boundary(H,z)
        formula=t[0]*t[1]/(z-eps[1])+t[2]*t[3]*np.exp(1j*phi)/(z-eps[3])
        max_schur=max(max_schur,abs(B[0,1]-formula))
        # Exact projected resolvent, including its energy-dependent self-energy.
        full=np.linalg.inv(z*np.eye(4)-H)[np.ix_(p,p)]
        reduced=np.linalg.inv(z*np.eye(2)-B)
        assert np.max(np.abs(full-reduced))<1e-12
        effective.append({'z':z,'gReal':float(B[0,1].real),
                          'gImag':float(B[0,1].imag),'gMagnitude':float(abs(B[0,1]))})
    # Reality/time reversal for this spinless model, not a universal magnetic rule.
    reverse=measure(hamiltonian(-phi))
    assert np.max(np.abs(np.array(m['gaps'])-reverse['gaps']))<1e-12
    periodic=measure(hamiltonian(phi+2*np.pi))
    max_periodicity=max(max_periodicity,float(np.max(np.abs(np.array(m['gaps'])-periodic['gaps']))))
    off=measure(hamiltonian(phi,True)); off0=measure(hamiltonian(0,True))
    max_path_off=max(max_path_off,float(np.max(np.abs(np.array(off['gaps'])-off0['gaps']))),
                     float(np.max(np.abs(np.array(off['dipoleWeights'])-off0['dipoleWeights']))))
    records.append({'fluxPhase':float(phi),'fluxOverQuantum':float(phi/(2*np.pi)),
                    **m,'effectiveBoundaryCouplings':effective})
assert max(max_gauge_spectrum,max_gauge_weight,max_schur,max_periodicity,max_path_off)<1e-12
assert max(max_boundary_dipole,max_boundary_norm)<1e-10
# The vector-potential source and direct contact come from derivatives of H.
phi=.61; h=2e-4
H=hamiltonian(phi)
H1=np.zeros((4,4),complex); H1[3,2]=1j*t[3]*np.exp(1j*phi); H1[2,3]=np.conj(H1[3,2])
H2=np.zeros((4,4),complex); H2[3,2]=-t[3]*np.exp(1j*phi); H2[2,3]=np.conj(H2[3,2])
derivative_error=float(np.max(np.abs((hamiltonian(phi+h)-hamiltonian(phi-h))/(2*h)-H1)))
contact_error=float(np.max(np.abs((hamiltonian(phi+h)-2*H+hamiltonian(phi-h))/h**2-H2)))
assert derivative_error<1e-8 and contact_error<1e-7
report={
 'schemaVersion':'selector-flux-boundary-action-audit-v1','date':'2026-11-08',
 'sources':{path:hashlib.sha256(Path(path).read_bytes()).hexdigest() for path in sources},
 'corpusVerdict':'The searched sources provide gauge-invariant loop/boundary holonomy, flux-dependent Peierls Hamiltonians and a two-path Aharonov-Casher mechanism. They do not join these to an identified physical selector, fixed microscopic coupling and calibrated optical dipole.',
 'sourceFindings':[
  {'source':sources[0],'supplies':'Compact U(1) Wilson loop becomes an endpoint transition after cutting; gauge-invariant record is retained.','missing':'No material oscillator Hamiltonian or optical source normalization.'},
  {'source':sources[1],'supplies':'t_slip=t1+t2 exp(i2pi ng), a charge-controlled Aharonov-Casher phase.','missing':'t1 and t2 are explicitly unspecified; ordinary magnetic flux is a controlled nuisance in that proposed charge sweep.'},
  {'source':sources[2],'supplies':'An explicit generator-state-port/contact packet required for response prediction.','missing':'Symmetry alone leaves pole shifts and residues underidentified.'},
  {'source':sources[3],'supplies':'Audit of named platforms and finite realizations.','missing':'No common named device packet with generator, preparation, physical ports, sectors and calibration.'},
  {'source':sources[4],'supplies':'A specified Peierls-flux Hamiltonian with fixed leads and reciprocity checks.','missing':'No selector-derived g or optical dipole; parameters and geometry are supplied.'}
 ],
 'conditionalConstruction':{
  'authority':'New four-site single-charge finite boundary fixture, not a corpus-derived Spin(2,3) realization, E8 mapping, material prediction or independent physical evidence.',
  'action':'S=int dt c^dagger[i hbar partial_t-q varphi-H_hop(A)+E D]c; H_ij=t_ij exp[i(q/hbar)int_j^i A.dl]; D=q diag(x_i).',
  'gaugeLaw':'c_i -> exp(i q chi_i/hbar)c_i; A -> A+grad chi; varphi_i -> varphi_i-partial_t chi_i. H_hop -> U H_hop U^dagger.',
  'boundaryKernel':'K_eff(z)=z I-H_PP-H_PQ(z I-H_QQ)^(-1)H_QP. The same elimination acts on electric-source and contact vertices; they cannot be independently refitted.',
  'mixingFormula':'g_LR(z,Phi)=t_La t_aR/(z-eps_a)+t_Lb t_bR exp(i q Phi/hbar)/(z-eps_b), in the stated endpoint gauge.',
  'phaseBoundary':'The loop relative phase is gauge invariant. The phase of an individual endpoint matrix element g is gauge dependent; its magnitude and closed-loop observables are physical.',
  'constantCouplingLimit':'g(Phi)=g1+g2 exp(i q Phi/hbar) requires an off-resonant or narrow-band reduction. Generic boundary elimination gives an energy-dependent g(z,Phi).',
  'spectrum':'Solve the full Hermitian H(Phi), equivalently det K_eff(z)=0 away from the eliminated-chart poles. Do not treat g(z,Phi) as a constant across all resonances.',
  'source':'Electric probe H_probe=-E D; dipole strengths are |<j(Phi)|D|0(Phi)>|^2 from the same eigenvectors.',
  'inducedDipoleVertex':'D_eff(z_m,z_n)=D_PP+H_PQ R(z_m) D_QQ R(z_n) H_QP, where R(z)=(z-H_QQ)^(-1). This formula uses the fixture diagonal site dipole, D_PQ=0; a general source has additional cross blocks.',
  'boundaryNormalization':'For a full normalized eigenstate with boundary component u_n, u_n^dagger[I+H_PQ R(z_n)^2 H_QP]u_n=1. Its transition dipole equals u_m^dagger D_eff(z_m,z_n)u_n. Using D_PP alone loses the eliminated-site response.',
  'contacts':'For the declared linear length-gauge E source, the full four-site H has no explicit E^2 term. The link-phase source has J_phi=-partial_phi H and contact partial_phi^2 H. Eliminating internal sites induces additional source/contact vertices automatically.',
  'frozenModel':{'onsites':eps.tolist(),'hoppings':t.tolist(),'positions':positions.tolist(),
                 'units':'hbar=q=common energy unit=length unit=1 for this fixture; no absolute physical calibration.',
                 'refitsAcrossFlux':0},
  'records':records,
  'firstGapRange':[min(r['gaps'][0] for r in records),max(r['gaps'][0] for r in records)],
  'firstDipoleWeightRange':[min(r['dipoleWeights'][0] for r in records),max(r['dipoleWeights'][0] for r in records)]
 },
 'verification':{'passed':True,'maxGaugeSpectrumError':max_gauge_spectrum,
  'maxGaugeDipoleWeightError':max_gauge_weight,'maxSchurCouplingError':float(max_schur),
  'maxFluxPeriodicityError':max_periodicity,'maxBrokenPathFluxDependence':max_path_off,
  'maxInducedDipoleVertexError':float(max_boundary_dipole),
  'maxBoundaryNormalizationError':float(max_boundary_norm),
  'maxNaiveUndressedDipoleError':float(max_naive_dipole_error),
  'vectorSourceDerivativeError':derivative_error,'vectorContactDerivativeError':contact_error,
  'additionalChecks':['exact projected resolvent','complete finite dipole double-commutator sum rule','spinless flux-reversal gap equality']},
 'missingPhysicalBridge':['Identify actual paths, charges and flux-to-loop calibration.',
  'Derive the path amplitudes and material levels from one source-native boundary action.',
  'Identify the selector representation on those physical modes; a continuously tunable U(1) loop does not by itself realize the order-18 selector or protected Z3 sectors.',
  'Derive and normalize physical electric ports/dipoles, contacts, bath and preparation.',
  'Freeze that packet and predict unseen flux-dependent poles and integrated dipole strengths without flux-dependent parameter fitting.'],
 'reproduction':'./.venv-alpaca/Scripts/python.exe scripts/audit-selector-flux-boundary-action.py'
}
path=Path('evidence/data/selector-flux-boundary-action-audit-v1.json')
path.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'output':str(path),'firstGapRange':report['conditionalConstruction']['firstGapRange'],
                 'firstDipoleWeightRange':report['conditionalConstruction']['firstDipoleWeightRange'],
                 'verification':report['verification']},indent=2))

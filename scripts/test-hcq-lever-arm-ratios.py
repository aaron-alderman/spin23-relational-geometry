"""Test scalar normalization cancellation and remaining h-CQUID source ambiguity.

Uses fixed published phase-slip parameters. No device parameter is optimized.
Conditional zero-T point-dipole force ratios are not total chip force predictions.
"""
import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.integrate import quad

nu1,nu2=1.48,1.08  # fixed reported rates in GHz
x=.5              # physical charge Q/e, a declared test bias
sx=np.array([[0.,1.],[1.,0.]],complex)
sy=np.array([[0.,-1j],[1j,0.]],complex)
sz=np.diag([1.,-1.]).astype(complex)
t=nu1+nu2*np.exp(1j*np.pi*x)
tx=1j*np.pi*nu2*np.exp(1j*np.pi*x)
txx=-np.pi**2*nu2*np.exp(1j*np.pi*x)
A=abs(t);Ax=float(np.real(np.conj(t)*tx)/A)
Axx=float((abs(tx)**2+np.real(np.conj(t)*txx))/A-np.real(np.conj(t)*tx)**2/A**3)

def evaluate(r,model,eta=1.):
    epsilon=r*A
    if model=='modulus-lift':
        H=-(epsilon*sz+A*sx)/2
        D=eta*Ax*sx/2
        K=-eta**2*Axx*sx/2
    else:
        H=-(epsilon*sz+t.real*sx-t.imag*sy)/2
        D=eta*(tx.real*sx-tx.imag*sy)/2
        K=-eta**2*(txx.real*sx-txx.imag*sy)/2
    energies,U=np.linalg.eigh(H)
    gap=float(energies[1]-energies[0])
    weight=float(abs(U[:,1].conj()@D@U[:,0])**2)
    diagonal=float(abs(U[:,0].conj()@D@U[:,0]))
    contact=float(np.real(U[:,0].conj()@K@U[:,0]))
    return {'gapGHz':gap,'weightReduced':weight,'diagonalSourceMagnitude':diagonal,
            'HamiltonianContactExpectation':contact,
            'staticKuboMinusContact':2*weight/gap-contact}

def force(row,ell,eta=1.):
    # ell=2 pi (1 GHz) L/c, with the unknown physical dipole scale factored out.
    # Exact force kernel for one parallel electric dipole beside an ideal plane,
    # at leading CP order and T=0; sign/common prefactors cancel in ratios.
    gap,w=row['gapGHz'],eta**2*row['weightReduced']
    def integrand(s):
        alpha=2*gap*w/(gap*gap+(s/ell)**2)
        return np.exp(-2*s)*(3+6*s+8*s*s+8*s**3)*alpha
    return quad(integrand,0,np.inf,epsabs=1e-12,epsrel=2e-11)[0]

detunings=[0.,.25,.5,1.,2.,4.]
ells=[.1,1.,10.]
models=['modulus-lift','complex-path-lift']
records=[];max_eta_error=0.;max_spectrum_error=0.
for model in models:
    reference=evaluate(1.,model)
    for r in detunings:
        row=evaluate(r,model)
        other=evaluate(r,models[1] if model==models[0] else models[0])
        max_spectrum_error=max(max_spectrum_error,abs(row['gapGHz']-other['gapGHz']))
        ratio=row['weightReduced']/reference['weightReduced']
        for eta in [.2,3.,11.]:
            scaled=evaluate(r,model,eta)['weightReduced']/evaluate(1.,model,eta)['weightReduced']
            max_eta_error=max(max_eta_error,abs(scaled-ratio))
        forces=[]
        for ell in ells:
            F=force(row,ell);Fref=force(reference,ell)
            for eta in [.2,3.,11.]:
                max_eta_error=max(max_eta_error,abs(force(row,ell,eta)/force(reference,ell,eta)-F/Fref))
            forces.append({'ell':ell,'isolatedElectricForceRatio':F/Fref})
        records.append({'model':model,'epsilonOverA':r,**row,
                        'strengthRatioToR1':ratio,
                        'retardedElectricForceRatioToR1':ratio*reference['gapGHz']/row['gapGHz'],
                        'forceRatios':forces})
assert max_eta_error<1e-10 and max_spectrum_error<1e-12

# Full source derivatives of the two isospectral charge actions: static Kubo
# and contact terms compensate. Transition-only force integrals above must not
# be presented as full Casimir predictions of these nonlinear source actions.
contact_records=[];max_static_difference=0.
for r in detunings:
    a=evaluate(r,'modulus-lift');b=evaluate(r,'complex-path-lift')
    max_static_difference=max(max_static_difference,abs(a['staticKuboMinusContact']-b['staticKuboMinusContact']))
    gap=a['gapGHz']
    static_curvature=-np.pi**2*nu1*nu2*np.cos(np.pi*x)/(2*gap)-np.pi**2*nu1**2*nu2**2*np.sin(np.pi*x)**2/(2*gap**3)
    assert abs(a['staticKuboMinusContact']-static_curvature)<1e-12
    frequency_differences=[]
    for xi in [.5,1.,3.]:
        chiA=2*gap*a['weightReduced']/(gap*gap+xi*xi)-a['HamiltonianContactExpectation']
        chiB=2*gap*b['weightReduced']/(gap*gap+xi*xi)-b['HamiltonianContactExpectation']
        predicted=-2*(b['weightReduced']-a['weightReduced'])*xi*xi/(gap*(gap*gap+xi*xi))
        assert abs((chiB-chiA)-predicted)<1e-12
        frequency_differences.append({'imaginaryFrequencyGHz':xi,'chiBMinusChiA':chiB-chiA})
    contact_records.append({'epsilonOverA':r,'staticQuantumCorrection':static_curvature,
                            'staticDifference':b['staticKuboMinusContact']-a['staticKuboMinusContact'],
                            'frequencyDifferences':frequency_differences})
assert max_static_difference<1e-12

# Verify analytic two-level matrix-element formulas independently.
formula_error=0.
for row in records:
    epsilon=row['epsilonOverA']*A
    if row['model']=='modulus-lift':
        predicted=Ax**2*epsilon**2/(epsilon**2+A**2)/4
    else:
        predicted=(abs(tx)**2-np.real(np.conj(t)*tx)**2/(epsilon**2+A**2))/4
    formula_error=max(formula_error,abs(row['weightReduced']-predicted))
assert formula_error<1e-12

# A fixed, physical flux source is more constrained in the declared two-state model.
# I=-partial H/partial Phi=Ip sigma_z, assuming flux-independent tunneling.
Ip=11.5e-9;e=1.602176634e-19;f0=2.555
flux_sweep=[]
for delta in [0.,.01,.02,.05,.1]:
    epsGHz=Ip/e*delta/1e9
    gap=np.sqrt(f0*f0+epsGHz*epsGHz)
    flux_sweep.append({'deltaFluxOverFluxQuantum':delta,'gapGHz':float(gap),
                       'currentTransitionStrengthRatio':float((f0/gap)**2),
                       'currentStaticPolarizabilityRatioGroundState':float((f0/gap)**3)})

# Distinguish a pure-channel ratio from a total-force ratio with an unknown offset.
model='complex-path-lift';ell=1.
F0=force(evaluate(0.,model),ell);F1=force(evaluate(1.,model),ell);F2=force(evaluate(2.,model),ell)
background=[];difference_ratios=[]
for eta,B in [(1.,0.),(.2,1.),(3.,4.)]:
    # Signed model contributions would all acquire the same sign; the identity is unchanged.
    y0=B+eta**2*F0;y1=B+eta**2*F1;y2=B+eta**2*F2
    background.append({'etaTestValue':eta,'backgroundTestValue':B,'totalForceRatioR2ToR1':y2/y1})
    difference_ratios.append((y2-y0)/(y1-y0))
assert max(difference_ratios)-min(difference_ratios)<1e-10

# Even a flux-independent unknown frequency-dependent lever arm does not generally
# factor out of a frequency integral when flux changes the spectral shape.
frequency_weighting=[]
for scale in [None,.5,2.]:
    def weighted_force(row):
        gap,w=row['gapGHz'],row['weightReduced']
        def f(s):
            xi=s/ell
            coupling2=1. if scale is None else 1/(1+xi/scale)**2
            return np.exp(-2*s)*(3+6*s+8*s*s+8*s**3)*2*gap*w/(gap*gap+xi*xi)*coupling2
        return quad(f,0,np.inf,epsabs=1e-12,epsrel=2e-11)[0]
    frequency_weighting.append({'unmeasuredWeightingScale':scale,
        'forceRatioR2ToR1':weighted_force(evaluate(2.,model))/weighted_force(evaluate(1.,model))})

source='evidence/data/hcq-device-field-source-derivation-v1.json'
report={
 'schemaVersion':'hcq-lever-arm-ratio-test-v1','date':'2026-11-08',
 'sources':{p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in [source,__file__]},
 'primaryPaper':'https://arxiv.org/abs/2601.06682v1',
 'parameters':{'nu1GHz':nu1,'nu2GHz':nu2,'testChargeOverElectron':x,'IpAmpere':Ip,
               'fluxSweepGapAtDegeneracyGHz':f0,'refittedParameters':0,
               'trainingBoundary':'Parameters are previously fitted values reported by the paper. This is an identifiability/conditional-prediction test, not new held-out validation.'},
 'cancellationTheorem':{
  'strength':'If d(Phi)=eta Dbar(Phi) with the same scalar eta at every bias, |d_j0(Phi)|^2/|d_k0(Phi_ref)|^2 is eta-independent, provided the denominator is nonzero.',
  'isolatedForce':'In leading CP order, for one fixed electric channel with alpha(Phi,i xi)=eta^2 alphabar(Phi,i xi), F(Phi)=eta^2 Fbar(Phi). The pure-channel force ratio cancels eta.',
  'totalForce':'For F_total(Phi)=B+eta^2 Fbar(Phi), an unknown flux-independent B does not cancel in a simple ratio. It cancels in [F(Phi)-F(Phi0)]/[F(Phi1)-F(Phi0)].',
  'conditions':['Fixed geometry and source direction.','Scalar lever arm constant over flux and the contributing frequencies, or an independently known frequency shape times one unknown amplitude.','Known physical source operator, common state/preparation and modeled contacts.','Single isolated force channel or controlled subtraction of other contributions.'],
  'boundaries':['An unknown frequency-dependent weighting remains inside the integral.','Electric and magnetic channels with different unknown gains do not share one scalar cancellation.','General multiple-scattering log determinants are nonlinear in response strength; simple cancellation is a leading weak-coupling/CP statement.','Flux-dependent contacts, temperatures/populations, screening, backgrounds or transfer functions require their own matching.']},
 'sourceCounterexample':{
  'modelA':'H_A/hGHz=-(epsilon sigma_z+A(x) sigma_x)/2, A=|nu1+nu2 exp(i pi x)|; canonical kinetic term i psi^dagger psi_dot.',
  'modelB':'H_B/hGHz=-(epsilon sigma_z+Re[t(x)]sigma_x-Im[t(x)]sigma_y)/2 with t=nu1+nu2 exp(i pi x); the same canonical kinetic convention.',
  'dipoleConstruction':'In each action use d_reduced=-partial_x H and the same unknown overall electric lever arm. The static spectra agree for all charge and flux values, but transition strengths differ.',
  'gaugeWarning':'A source-dependent basis transformation relates the instantaneous matrices, but also generates a time-derivative source connection. Keeping that connection makes a coordinate change equivalent; omitting it defines different source actions. The static spectrum alone does not determine which source connection describes the device.',
  'forceDiagnosticBoundary':'All forceRatios in these records integrate only the transition Kubo term to test scalar cancellation. The nonlinear charge-source actions also have contacts, examined separately below. These transition-only integrals are not their complete physical Casimir forces.',
  'scope':'An underidentification witness, not an assertion that both lifts are the microscopic action of the actual h-CQUID.',
  'records':records},
 'contactCompletion':{
  'response':'chi_xx(i xi)=2 Delta w/(Delta^2+xi^2)-<H_xx>, before additional direct geometric terms and high-frequency completion.',
  'identity':'At zero temperature chi_xx(0)=-partial_x^2 E_ground. The two instantaneous spectra are identical, so their static source responses agree once both source contacts are retained.',
  'finiteFrequencyDifference':'For these two actions, chi_B(i xi)-chi_A(i xi)=-2(w_B-w_A) xi^2/[Delta(Delta^2+xi^2)]. Static agreement therefore does not fix broadband response.',
  'staticCandidate':'At Q/e=1/2 the traceless two-state ground-energy curvature scales as Delta(Phi)^(-3); its ratio is known conditional on the model and subtraction of other contributions.',
  'staticBoundary':'This signed quantum-capacitance correction is not by itself a complete passive free-space polarizability. Source-only geometric terms, a source-dependent common energy offset and high-frequency modes remain to be matched.',
  'records':contact_records},
 'magneticSourcePrediction':{
  'source':'I=-partial_Phi H=Ip sigma_z in the stated fixed flux-state basis and flux-independent tunneling approximation.',
  'strengthRelation':'|I_10(Phi)|^2/|I_10(Phi0)|^2=[f01(Phi0)/f01(Phi)]^2, with Phi0 here denoting the degeneracy bias.',
  'staticRelation':'Ground-state transition polarizability ratio equals [f01(Phi0)/f01(Phi)]^3.',
  'records':flux_sweep,
  'scope':'Conditional candidate for calibrated inductive transition strength; not automatically an electric dipole or a prediction of total Casimir force. Readout peak heights require occupation, linewidth and transfer-function correction.'},
 'backgroundTest':background,'backgroundSubtractedDifferenceRatios':list(map(float,difference_ratios)),
 'unknownFrequencyWeightingTest':frequency_weighting,
 'frequencyWeightingBoundary':'An integral-weighting diagnostic using the squared imaginary-axis shape of a first-order low-pass transfer. It is not a complete material-response realization; direct and bath terms of a physical embedding must also be matched.',
 'forceGeometry':'Conditional pointlike parallel electric dipole and ideal conducting plane at T=0; ell=2pi*(1GHz)*L/c. It is not the actual chip/environment geometry or the experimental 12mK state.',
 'verification':{'passed':True,'maxScalarLeverArmRatioChange':max_eta_error,
                  'maxSameSpectrumDifferenceGHz':max_spectrum_error,'maxAnalyticWeightFormulaError':formula_error,
                  'maxContactCompletedStaticResponseDifference':max_static_difference},
 'physicalVerdict':'Scalar normalization can be removed, which enables conditional falsifiable response-ratio tests. Available spectroscopy does not fix the electric source action or complete force channels, so no unique h-CQUID electric-strength/Casimir ratio is established.',
 'nextTest':'Measure weak-drive, population- and linewidth-corrected integrated transition weights under a fixed electric or inductive probe. Compare the frozen model ratios across flux; then use a fixed electromagnetic geometry and controlled force differences. Do not fit a different gain or source operator at each bias.',
 'reproduction':'./.venv-alpaca/Scripts/python.exe scripts/test-hcq-lever-arm-ratios.py'
}
target=Path('evidence/data/hcq-lever-arm-ratio-test-v1.json')
target.write_text(json.dumps(report,indent=2)+'\n')
at_zero=[r for r in records if r['epsilonOverA']==0]
print(json.dumps({'output':str(target),'zeroDetuningContrasts':at_zero,
 'magneticSourcePrediction':flux_sweep,'frequencyWeighting':frequency_weighting,
 'verification':report['verification']},indent=2))

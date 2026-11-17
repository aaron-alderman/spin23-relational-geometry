"""Prospective paired-frequency Rabi protocol, not a new measurement.

Numerically verifies pump-transfer cancellation and contrast/population/gain
invariance, with explicit damping corrections and a bias-loading counterexample.
"""
import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.linalg import expm

nu1,nu2=1.48,1.08
x_target=.5
A0=abs(nu1+nu2*np.exp(1j*np.pi*x_target))
Ip=11.5e-9;e=1.602176634e-19
slope_GHz=Ip/e/1e9
frequencies=[float(A0),2.,2.2,2.4,2.56]
amplitudes=[.55,1.,1.4]
points=[]
for f in frequencies:
    cosine=np.clip((f*f-nu1*nu1-nu2*nu2)/(2*nu1*nu2),-1,1)
    xref=float(np.arccos(cosine)/np.pi)
    target_flux=float(np.sqrt(max(0.,f*f-A0*A0))/slope_GHz)
    points.append({'frequencyGHz':f,'targetChargeOverElectron':x_target,
                   'targetDeltaFluxOverQuantum':target_flux,
                   'referenceChargeOverElectron':xref,'referenceDeltaFluxOverQuantum':0.,
                   'predictedStrengthRatio':float(A0*A0/(f*f)),
                   'predictedHamiltonianRabiRateRatio':float(A0/f)})

def extract_trace(shapeOmega,Gamma1,Gamma2,populationContrast,readoutGain,offset):
    # Difference of two preparations cancels the common steady state and offset.
    # Initial y difference is zero; z difference is unknown but nonzero.
    M=np.array([[-Gamma2,-shapeOmega],[shapeOmega,-Gamma1]])
    t=np.arange(0,35e-9,.1e-9)
    z0=populationContrast
    difference=np.array([readoutGain*(expm(M*time)@np.array([0.,z0]))[1] for time in t])
    n=difference/difference[0]
    # In data this is a damped-oscillation shape estimate. Here extract poles by
    # an independent linear recurrence, not by inserting the generating rates.
    coefficients=np.linalg.lstsq(np.column_stack([n[1:-1],n[:-2]]),n[2:],rcond=None)[0]
    a,b=coefficients;rho=np.sqrt(-b);angle=np.arccos(np.clip(a/(2*rho),-1,1))
    dt=t[1]-t[0];omega_obs=angle/dt;gamma=-np.log(rho)/dt
    design=np.column_stack([np.cos(omega_obs*t),np.sin(omega_obs*t)])
    C,S=np.linalg.lstsq(design,n*np.exp(gamma*t),rcond=None)[0]
    sine_coefficient=S/C
    correctedOmega=omega_obs*np.sqrt(1+sine_coefficient**2)
    expected_obs=np.sqrt(shapeOmega**2-((Gamma1-Gamma2)/2)**2)
    assert abs(omega_obs/expected_obs-1)<1e-7
    return {'observedOscillationRadiansPerSecond':float(omega_obs),
             'normalizedSineCoefficient':float(sine_coefficient),
             'correctedHamiltonianRabiRadiansPerSecond':float(correctedOmega),
             'correctionRelativeError':float(abs(correctedOmega/shapeOmega-1)),
             'initialDifferenceSignal':float(difference[0]),
             'unusedReadoutOffsetTestValue':offset}

records=[];maxerror=0.;maxcorrection=0.
for i,point in enumerate(points):
    f=point['frequencyGHz'];r=point['predictedStrengthRatio']
    # Deliberately frequency-dependent unknown transfer. Each paired run shares
    # it, so its shape need not be calibrated across the carrier frequencies.
    transfer=.7+.5*np.sin(.8*f)**2
    for j,u in enumerate(amplitudes):
        Omega_ref=2*np.pi*180e6*transfer*u
        Omega_target=Omega_ref*np.sqrt(r)
        # Relaxation/dephasing may differ between target and reference AND power.
        g1ref=(45+5*i+4*u*u)*1e6;g2ref=(80+10*i+8*u*u)*1e6
        g1target=(65+3*i+9*u*u)*1e6;g2target=(120+8*i+20*u*u)*1e6
        ref=extract_trace(Omega_ref,g1ref,g2ref,.15+.1*i,-.7-.4*i,.8)
        target=extract_trace(Omega_target,g1target,g2target,.9-.1*i,2.+i,-1.)
        ratio=(target['correctedHamiltonianRabiRadiansPerSecond']/ref['correctedHamiltonianRabiRadiansPerSecond'])**2
        error=abs(ratio-r);maxerror=max(maxerror,error)
        maxcorrection=max(maxcorrection,ref['correctionRelativeError'],target['correctionRelativeError'])
        records.append({'frequencyGHz':f,'sourceAmplitudeRelative':u,
                         'unknownCommonPumpTransferTestValue':float(transfer),
                         'predictedRatio':r,'recoveredRatio':float(ratio),
                         'rawDampedFrequencySquaredRatio':float((target['observedOscillationRadiansPerSecond']/ref['observedOscillationRadiansPerSecond'])**2),
                         'referenceTraceExtraction':ref,'targetTraceExtraction':target})
assert maxerror<1e-6 and maxcorrection<1e-6

# Bias-dependent local loading is NOT removed merely by matching frequency.
loading=[{'targetToReferencePumpFieldRatio':a,
          'inferredStrengthRatioOverTrueStrengthRatio':a*a} for a in [.9,1.,1.1]]
source='evidence/data/hcq-public-inductive-strength-test-v1.json'
report={
 'schemaVersion':'hcq-isofrequency-rabi-protocol-v1','date':'2026-11-08',
 'authority':'New prospective protocol derived from the published minimal h-CQUID model; simulation validation only. No experiment or existing multi-bias Rabi dataset is claimed.',
 'sources':{p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in [source,__file__]},
 'primaryDeviceReference':'https://arxiv.org/abs/2601.06682v1',
 'fixedInputs':{'nu1GHz':nu1,'nu2GHz':nu2,'IpAmpere':Ip,'targetChargeOverElectron':x_target,
               'parametersRefitted':0,
               'scope':'Published fitted spectral parameters are frozen. Experimental reference charges should be set from a preregistered static spectrum, not optimized against Rabi ratios.'},
 'keyIdea':'A charge-tunable degeneracy reference can match each target transition frequency. Same carrier and source amplitude cancel arbitrary frequency-only pump transfer in a paired Rabi-rate ratio.',
 'derivation':{
  'model':'H=-(epsilon(Phi) sigma_z+Re[t(Q)] sigma_x-Im[t(Q)] sigma_y)/2, with flux-independent t and fixed Ip.',
  'current':'I=-partial_Phi H=Ip sigma_z.',
  'target':'At fixed Q_target, A0=|t(Q_target)|/h, f=sqrt(A0^2+(2 Ip DeltaPhi/h)^2); |I10,target|=Ip A0/f.',
  'reference':'At flux degeneracy, choose Q_ref so |t(Q_ref)|/h=f; then |I10,ref|=Ip in this model.',
  'rateRatio':'[Omega_target(f,u)/Omega_ref(f,u)]^2=[A0/f]^2 when both runs see the same local pump flux.',
  'noAbsoluteCalibration':'Unknown common pump amplitude, its frequency dependence, readout gain and nonzero preparation contrast are not needed.',
  'scopeOfReference':'Reference strength Ip is a consequence of the fixed flux-state current vertex at degeneracy. This tests the full minimal two-state model, not a model-independent reconstruction of arbitrary source operators.',
  'accessibleRange':'Requires min|t|/h <= f <= max|t|/h. For these parameters .4 to 2.56 GHz. The original 2.555 GHz fixed-charge sweep above 2.56 GHz cannot be covered by this same-device degeneracy reference; use a lower-gap target to obtain a nontrivial interval.'},
 'workingPoints':points,
 'measurementProtocol':[
  'Freeze the static two-control spectrum, charge/parity branch, Ip and candidate working points before acquiring Rabi ratios.',
  'For each carrier frequency alternate the flux-detuned target with the gate-tuned degeneracy reference; use the identical source carrier, pulse amplitude, drive line and pulse envelope.',
  'Prepare two different diagonal initial populations, apply the variable-duration resonant pulse, then read out with the same timed protocol, preferably at a common readout bias. Interleave the preparations.',
  'Subtract the preparation traces and normalize by the zero-duration difference. No absolute population or readout-gain calibration is required if readout is linear, stable and nonzero in contrast.',
  'Infer the Hamiltonian Rabi rate from the normalized damped trace, separating oscillation frequency from damping. This estimates observables; do not retune the predicted current ratios.',
  'Repeat at three or more identical source-amplitude levels for both working points. Require the recovered squared-rate ratio to be amplitude independent in the declared regime.',
  'Randomize target/reference order, track parity switching and drift, verify carrier resonance and control pulse transients and state mapping.',
  'Score the frozen ratio (A0/f)^2 with measurement uncertainty; do not fit per-bias gains or modify nu1, nu2 or Ip to improve agreement.'
 ],
 'dampingAndContrastCancellation':{
  'normalizedSignal':'n(t)=[s_A(t)-s_B(t)]/[s_A(0)-s_B(0)], for identical readout mapping and two diagonal preparations with nonzero difference.',
  'resonantMarkovSolution':'n(t)=exp(-gamma t)[cos(omega_d t)+c sin(omega_d t)], gamma=(Gamma1+Gamma2)/2, c=(Gamma2-Gamma1)/(2 omega_d).',
  'HamiltonianRate':'Omega^2=omega_d^2*(1+c^2). Using omega_d alone would retain a damping bias.',
  'initialDerivativeIdentity':'Omega^2=n_prime(0)^2-n_second(0), an equivalent ideal flat-pulse identity; short-time differentiation can be noise sensitive.',
  'powerDifferenceAlternative':'If Gamma1 and Gamma2 are power independent, differences of omega_d^2 between two common source powers remove the damping offset directly. Three powers test this restricted alternative.',
  'conditions':'Near-resonant two-level Markov dynamics, stable rates during each flat pulse, no initial transverse-coherence difference and validated pulse onset. Finite ramp shape, detuning, leakage, nonlinear readout or changing preparation/readout must be modeled or bounded independently.'},
 'simulation':{'records':records,'maximumRecoveredRatioAbsoluteError':maxerror,
                'maximumHamiltonianRateRelativeError':maxcorrection,
                'scope':'Noiseless Bloch traces with different readout signs/gains, populations and power-dependent damping; unknown frequency-dependent transfer held common within each pair. Trace recurrence and quadrature extraction validate the algebra, not experimental feasibility or precision.'},
 'remainingNoncancellation':{
  'biasLoadingCounterexample':loading,
  'statement':'Matching frequency does not guarantee equal local flux if gate/flux bias changes source loading or field participation. A 10-percent local-field mismatch gives a 21-percent squared-rate error.',
  'control':'Use a sufficiently stiff, weakly loading flux drive or an independently monitored local reference; characterize bias-dependent loading rather than replacing it with a fitted strength correction.',
  'otherConditions':['Parity must remain identifiable over the pulse and paired acquisition.','Gate-dependent Ip or extra charge-drive coupling must be independently characterized.','The reported short coherence may limit the observable cycles and uncertainty.','No ratio can eliminate completely arbitrary bias-dependent pump transfer with no reference or physical constraint.']},
 'publicDataStatus':'The release contains one Rabi trace, not these paired same-frequency, multi-power, two-preparation traces. The protocol requires new acquisition.',
 'scientificStatus':'A concrete self-referenced test of the declared current vertex; not evidence for a fundamental Spin(2,3) selector or a validated Casimir force prediction.',
 'reproduction':'./.venv-alpaca/Scripts/python.exe scripts/design-hcq-isofrequency-rabi-test.py'
}
out=Path('evidence/data/hcq-isofrequency-rabi-protocol-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'output':str(out),'workingPoints':points,
 'maximumRecoveredRatioAbsoluteError':maxerror,
 'maximumHamiltonianRateRelativeError':maxcorrection,
 'loadingCounterexample':loading},indent=2))

"""Independent local flux witness for paired-frequency h-CQUID Rabi tests.

Prospective circuit/measurement design and identifiability audit, not hardware
data or a claim that the published device contains the proposed pickup.
"""
import hashlib
import json
from pathlib import Path
import numpy as np
from scipy.special import jv

# Detector gain cancels in a cross-ratio of the same carrier and sideband bins.
# A phase-modulation witness is illustrative; the small-signal result only needs
# a fixed linear sensor response, not an exactly phase-only resonator model.
g0=2.3*np.exp(.4j);g1=.7*np.exp(-.8j)
block_amplitudes=[.5*np.exp(.2j),3*np.exp(-.7j)]
sideband=[]
for ratio in [.9,1.,1.1]:
    m_ref=.04;m_target=ratio*m_ref
    C_ref=block_amplitudes[0]*g0*jv(0,m_ref)
    B_ref=block_amplitudes[0]*g1*1j*jv(1,m_ref)
    C_target=block_amplitudes[1]*g0*jv(0,m_target)
    B_target=block_amplitudes[1]*g1*1j*jv(1,m_target)
    cross=B_target*C_ref/(B_ref*C_target)
    exact=jv(1,m_target)*jv(0,m_ref)/(jv(1,m_ref)*jv(0,m_target))
    assert abs(cross-exact)<1e-14
    sideband.append({'trueLocalFluxRatio':ratio,'sidebandCarrierCrossRatioReal':float(cross.real),
                      'crossRatioImaginaryError':float(abs(cross.imag)),
                      'linearApproximationRelativeError':float(abs(cross.real/ratio-1)),
                      'uncorrectedStrengthBiasFactor':ratio**2})

# Demonstrate exact phase-and-amplitude recovery in the linear response limit.
linear=[]
for field_ratio in [.9,1.,1.1*np.exp(.12j)]:
    normalized_ref=(g1/g0)*(.13+.07j)
    normalized_target=(g1/g0)*(.13+.07j)*field_ratio
    recovered=normalized_target/normalized_ref
    assert abs(recovered-field_ratio)<1e-14
    linear.append({'trueComplexRatio':[float(np.real(field_ratio)),float(np.imag(field_ratio))],
                    'recoveredComplexRatio':[float(recovered.real),float(recovered.imag)]})

# A remote or non-coextensive single sensor can miss a loading-induced mode.
mD=np.array([1.,.4])
Mone=np.array([[1.,0.]])
reference=np.array([1.,0.])
target=np.array([1.,.25])
assert np.allclose(Mone@reference,Mone@target)
assert not np.isclose(mD@reference,mD@target)
Mtwo=np.array([[1.,0.],[.2,1.]])
coeff=np.linalg.solve(Mtwo.T,mD)
assert np.max(abs(coeff@Mtwo-mD))<1e-14
target_reconstructed=coeff@(Mtwo@target)
reference_reconstructed=coeff@(Mtwo@reference)
assert abs(target_reconstructed/(mD@target)-1)<1e-14

# Recover a matrix-element ratio even when the pump fields differ, using an
# independently observed flux ratio rather than forcing an arbitrary gain fit.
predicted_W=.5827777777777777
corrections=[]
for field_ratio in [.9,1.,1.1]:
    observed_rabi_squared=predicted_W*field_ratio**2
    corrected=observed_rabi_squared/field_ratio**2
    assert abs(corrected-predicted_W)<1e-14
    corrections.append({'localFluxRatio':field_ratio,
                         'observedRabiRateSquaredRatio':observed_rabi_squared,
                         'independentlyCorrectedStrengthRatio':corrected})

# An independently measured field must preserve a real violation of the law.
injected_W=.70;injected_field=1.10
injected_observation=injected_W*injected_field**2
injected_corrected=injected_observation/injected_field**2
assert abs(injected_corrected-injected_W)<1e-14
assert abs(injected_corrected-predicted_W)>.1

# Propagate a tolerance for unknown residual field mismatch. If amplitudes are
# constrained within +-epsilon around unity, the squared-rate systematic lies
# between (1-epsilon)^2 and (1+epsilon)^2, before measurement uncertainty.
tolerances=[{'fluxAmplitudeTolerance':eps,'strengthBiasInterval':[(1-eps)**2,(1+eps)**2]}
            for eps in [.005,.01,.05]]

paths=['evidence/data/hcq-isofrequency-rabi-protocol-v1.json',
 'corpus/claims/1200-1299/1230_the_nearest_a11_experiment_is_an_aharonov_casher_two_port_while_protected_z3_requires_verified_sector_algebra_and_scaling.md',
 __file__]
report={
 'schemaVersion':'hcq-independent-local-flux-witness-v1','date':'2026-11-08',
 'authority':'New prospective noncircular field-witness design plus exact numerical examples. No pickup data, chip layout or implemented h-CQUID instrument is claimed.',
 'sources':{p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in paths},
 'primaryPrecedent':{'url':'https://doi.org/10.1088/1361-6668/aaf048',
                    'arxiv':'https://arxiv.org/abs/1808.09612',
                    'result':'Independent on-chip SQUID-resonator flux-to-microwave-phase transduction, without using a qubit transition matrix element.',
                    'bandwidthBoundary':'The paper demonstrates waveforms through hundreds of MHz and describes a 2.6 GHz bandwidth limit. Precision for the proposed 1.8-2.56 GHz h-CQUID carrier range must be independently demonstrated, not assumed from the nominal bandwidth.'},
 'rejectedShortcuts':[
  'Matching qubit Rabi amplitudes or Stark shifts using an assumed current matrix element is circular for this test.',
  'An ordinary first-order longitudinal Ramsey flux meter is blind at the exact flux-degeneracy reference where the static frequency slope vanishes.',
  'A second measurement of remote transmission or input power alone does not identify local flux under unknown reflected and screening currents.'
 ],
 'proposedWitness':{
  'hardware':'A weakly loading on-chip flux pickup/SQUID transducer coupled to the relevant drive-current modes, with a separate probe carrier. A pickup of only a remote feedline is insufficient without a transfer/coverage proof.',
  'measurement':'While switching the h-CQUID between paired working points, keep the pump carrier and source waveform fixed and keep the sensor at the same operating point. Measure its complex probe carrier C and pump-induced sideband B.',
  'smallSignalModel':'B_b/C_b=K(omega_p) Phi_sensor,b + O(Phi_sensor,b^3), b=target,reference. Sensor and detector gain K need not be absolutely known if it is unchanged within each interleaved pair.',
  'selfReferencedObservable':'R_sensor=(B_target C_reference)/(B_reference C_target)=Phi_sensor,target/Phi_sensor,reference in the linear regime.',
  'gainCancellation':'An unknown sensor response and different gains at the probe carrier and sideband cancel because each frequency bin appears in both blocks. A blockwise common probe-amplitude/gain factor also cancels.',
  'notCancelled':'State-correlated change of sensor operating point, carrier/sideband gain ratio, crosstalk, or a spatial flux component not seen by the pickup.',
  'operatingPointControl':'Hold the sensor DC response fixed; interleave blocks faster than drift. Use an independent small calibration dither and probe-power checks to test sensor-gain invariance, not the qubit matrix element.',
  'backactionControl':'Bound sensor-induced shifts, heating, poisoning and changes in coherence by sensor-probe-power and sensor-on/off controls. Freeze the static spectrum of the instrumented device before acquiring the strength test.',
  'nonlinearityControl':'Repeat at several small pump amplitudes. The leading cross-ratio is amplitude independent; retain nonlinear corrections or restrict the regime using the witness data, not by fitting a qubit strength correction.'},
 'localityCriterion':{
  'model':'Let relevant physical drive/screening mode currents be i, device flux Phi_D=m_D^T i, and sensor fluxes phi_S=M_S i.',
  'identifiability':'Device flux is reconstructible from the sensors if and only if m_D^T is in the row span of M_S, on the allowed current subspace.',
  'reconstruction':'Choose a such that a^T M_S=m_D^T; then Phi_D=a^T phi_S. An unknown overall common calibration scale cancels in target/reference ratios; relative sensor calibrations and the coupling geometry still need to be fixed independently.',
  'singleModeEscape':'If one measured current generates the relevant external flux through a fixed mutual inductance M, Phi_D=M I_local, the same-current ratio suffices. The M need not be known absolutely.',
  'multipleModeBoundary':'Shared resonator and induced screening/return currents can require more than one independent pickup. A single scalar sensor is conclusive only if its coupling is proportional to the device-flux functional on that subspace.',
  'requiredEvidence':'Circuit topology and relative mutual couplings, or an experimentally validated independent-mode injection/Maxwell reconstruction. Low-frequency coupling calibration alone does not prove a GHz mode model.'},
 'numericalCounterexample':{
  'deviceFluxWeights':mD.tolist(),'singleSensorCoupling':Mone.tolist(),
  'referenceCurrents':reference.tolist(),'targetCurrents':target.tolist(),
  'singleSensorReadings':[float((Mone@reference)[0]),float((Mone@target)[0])],
  'trueDeviceFluxRatio':float((mD@target)/(mD@reference)),
  'twoSensorCoupling':Mtwo.tolist(),'reconstructionCoefficients':coeff.tolist(),
  'reconstructedDeviceFluxRatio':float(target_reconstructed/reference_reconstructed),
  'interpretation':'A single pickup reports equality while the actual device flux changes by 10 percent. A second independent mode measurement detects it; no qubit matrix element is used.'},
 'phaseSensorTests':sideband,'linearComplexRatioTests':linear,'independentCorrectionTests':corrections,
 'injectedLawViolationTest':{'predictedStrengthRatio':predicted_W,
                            'injectedTrueStrengthRatio':injected_W,
                            'independentlyMeasuredFluxRatio':injected_field,
                            'observedRabiRateSquaredRatio':injected_observation,
                            'fieldCorrectedStrengthRatio':injected_corrected,
                            'violationPreserved':True},
 'correctedStrengthTest':{
  'formula':'W_target/W_reference=|Omega_target/Omega_reference|^2 / |Phi_D,target/Phi_D,reference|^2, after the Rabi damping correction in the preceding protocol.',
  'equalityAlternative':'Use the independent flux witness to servo the two local fields equal before acquiring Rabi traces. That is input calibration, not a fit of the strength law.',
  'toleranceBudget':tolerances,
  'order':'Freeze the sensor/coupling calibration and loading correction before scoring the predicted current ratios. Preserve complex field ratios and covariance.',
  'remainingConditions':'Linear stable readout for normalized preparation differences, identified charge/parity branch, validated pulse dynamics and independent bounds on sensor backaction and unobserved field modes.'},
 'conclusion':'An independent local-flux witness can remove the circularity. The equal-field assertion is conditional on sensor stability and coverage of the device-flux modes. The public h-CQUID release contains no such witness; this requires a new measurement setup or an independently validated local-current monitor.',
 'verification':{'phaseGainCrossRatioPassed':True,'complexLinearRatioPassed':True,
                 'blindModeCounterexamplePassed':True,'twoSensorReconstructionPassed':True,
                 'independentLoadingCorrectionPassed':True},
 'reproduction':'./.venv-alpaca/Scripts/python.exe scripts/design-hcq-local-flux-witness.py'
}
out=Path('evidence/data/hcq-independent-local-flux-witness-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'output':str(out),'phaseSensorTests':sideband,
 'localityCounterexample':report['numericalCounterexample'],
 'correctedStrengthTests':corrections,'toleranceBudget':tolerances},indent=2))

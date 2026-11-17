"""Concrete candidate pickup layout and bounded calibration feasibility audit.

The coordinates are an illustrative redesign, not extracted h-CQUID CAD.
Thin-filament magnetostatics is an engineering surrogate, not a 0.5% EM model.
"""
import hashlib
import json
from pathlib import Path
import numpy as np

mu0=4*np.pi*1e-7;h=6.62607015e-34;e=1.602176634e-19
phi0=h/(2*e)
def rect(x0,y0,x1,y1,z=0.):return [[x0,y0,z],[x1,y0,z],[x1,y1,z],[x0,y1,z],[x0,y0,z]]
def segments(path,step=.1):
    centers=[];vectors=[]
    for start,end in zip(path[:-1],path[1:]):
        start=np.array(start,float);end=np.array(end,float)
        count=max(1,int(np.ceil(np.linalg.norm(end-start)/step)))
        v=(end-start)/count
        for j in range(count):centers.append(start+(j+.5)*v);vectors.append(v)
    return np.array(centers)*1e-6,np.array(vectors)*1e-6
def mutual(p,q,step=.1):
    a,da=segments(p,step);b,db=segments(q,step)
    # Regularization radius .125 um represents a finite conductor only crudely.
    # Shared centerline segments require a finite-section/London solution in reality.
    radius=.125e-6
    distance=np.sqrt(np.sum((a[:,None,:]-b[None,:,:])**2,axis=2)+radius**2)
    return float(mu0/(4*np.pi)*np.sum((da@db.T)/distance))

dut=rect(-2,-2,2,2)
drive=rect(-12,-4,12,-9,-.40)
resonator=[[-2,-2,0],[10,-2,0],[10,-6,0],[-2,-6,0],[-2,-2,0]]
z=.30
pickups={
 'P_D_drive_gradiometer':[(1,rect(-1,-3.8,1,-3.2,z)),(-1,rect(-1,-4.8,1,-4.2,z))],
 'P_R_shared_arm_gradiometer':[(1,rect(-1,-1.8,1,-1.2,z)),(-1,rect(-1,-2.8,1,-2.2,z))],
 'P_A_aperture_guard':[(1,rect(-1.5,-1.5,1.5,1.5,z))]
}
paths=[drive,resonator,dut]
magnetic=np.array([[sum(sign*mutual(loop,path) for sign,loop in lobes) for path in paths]
                   for lobes in pickups.values()])
fine=np.array([[sum(sign*mutual(loop,path,.05) for sign,loop in lobes) for path in paths]
                   for lobes in pickups.values()])
Lsheet=1.6e-9;shared_length=4.;shared_width=.25
Lshared=Lsheet*shared_length/shared_width
magnetic_target=np.array([mutual(dut,drive),mutual(dut,resonator),0.])
# Effective external circuit drive includes the shared kinetic cross term.
# The self coordinate remains explicitly in the DUT Hamiltonian, so its target
# coefficient is zero. A winding convention may reverse the shared cross sign.
m=magnetic_target+np.array([0.,Lshared,0.])
# Differential voltage pickup across shared branch, expressed as V/(i omega).
# Both resonator and DUT mode currents run in that branch in this mesh convention.
voltage=np.array([0.,Lshared,Lshared])
K_baseline=np.vstack([fine,voltage])
baseline_coeff=np.linalg.lstsq(K_baseline.T,m,rcond=None)[0]
# Improved bridge: same-length/width NbN monitor section on an unshared
# resonator arm, carrying the environment current but not direct DUT circulation.
Lmonitor=Lshared
monitor=np.array([0.,Lmonitor,0.])
K=np.vstack([fine,voltage,monitor])
assert np.linalg.matrix_rank(K)==3
# Independent calibrated channel noise matters more than raw dimensional conditioning.
# Equal flux-noise density is only an illustrative electronics assumption.
a=np.linalg.lstsq(K.T,m,rcond=None)[0]
coverage_error=float(np.linalg.norm(a@K-m)/np.linalg.norm(m))
assert coverage_error<1e-9

# Rabi-scale reference drive and an independent self-current contamination case.
Ip=11.5e-9;Omega=2*np.pi*100e6
drive_phi=(h/(2*np.pi))*Omega/Ip
I_res=drive_phi/m[1]
i_ref=np.array([0.,I_res,5e-9])
i_target=np.array([0.,1.10*I_res,-3e-9])
y_ref=K@i_ref;y_target=K@i_target
recovered_ratio=float((a@y_target)/(a@y_ref))
assert abs(recovered_ratio-1.10)<1e-8
# A naive branch-voltage or aperture comparison is contaminated by DUT response.
naive_voltage_ratio=float(y_target[-2]/y_ref[-2])
monitor_ratio=float(y_target[-1]/y_ref[-1])

# Equal, uncorrelated channel uncertainty for an illustrative sensitivity bound.
# For phi=a.y, sigma_phi=sigma_channel ||a||; paired ratio has both blocks.
amplitude_target_sigma=.0008
required_sigma_flux=amplitude_target_sigma*drive_phi/(np.sqrt(2)*np.linalg.norm(a))
required_sigma_microPhi=required_sigma_flux/phi0*1e6
nominal_individual_sensor_floor=.2e-3*phi0
averaging_factor=(nominal_individual_sensor_floor/required_sigma_flux)**2

budget=[
 {'term':'statistical paired-ratio envelope','amplitudeBound':.0008},
 {'term':'sensor drift and interleaving','amplitudeBound':.0004},
 {'term':'sensor nonlinearity / relative-channel response','amplitudeBound':.0004},
 {'term':'calibrated complex reconstruction coefficients','amplitudeBound':.0012},
 {'term':'unobserved current-mode contribution','amplitudeBound':.0008},
 {'term':'pickup backaction and source-definition residual','amplitudeBound':.0004}
]
budget_sum=sum(x['amplitudeBound'] for x in budget)
assert budget_sum<.005

report={
 'schemaVersion':'hcq-screening-pickup-geometry-v1','date':'2026-11-08',
 'authority':'Concrete parametric candidate geometry, thin-wire forward calculation and prospective calibration acceptance contract. Not the actual published chip CAD, a fabricated pickup or demonstrated 0.5-percent equality.',
 'primaryReferences':['https://arxiv.org/abs/2601.06682v1','https://arxiv.org/abs/1808.09612',
                      'https://www.nature.com/articles/srep28095'],
 'sources':{p:hashlib.sha256(Path(p).read_bytes()).hexdigest() for p in [
  'evidence/data/hcq-independent-local-flux-witness-v1.json',__file__]},
 'essentialCorrection':{
  'sharedKineticInductance':'The h-CQUID shares an NbN branch with its resonator. The generalized loop drive can contain shared kinetic inductance as well as geometric magnetic mutual coupling. Measuring aperture B flux alone is not automatically measuring the circuit drive coordinate.',
  'meshDerivation':'For branch currents I_branch=B i_mesh, U_ind=(1/2)i_mesh^T B^T(L_geo+L_kin)B i_mesh. Shared branches create off-diagonal inductive terms, including kinetic ones.',
  'selfResponse':'A pickup sees DUT-induced current as well as pump/environment currents. The latter drive coordinate must be reconstructed separately from the DUT self term already present in its Hamiltonian, rather than corrected using an assumed transition strength.',
  'definitionBoundary':'The separation must be fixed by a complete circuit/input-output action. If strong resonator dressing invalidates a classical pump plus bare two-state DUT model, the test needs that dressed model.'},
 'geometry':{'units':'micrometre','layoutStatus':'Illustrative redesign around a 4x4 um loop. All dimensions below are proposed, not measurements of the publication.',
  'dutLoopCenterline':dut,'driveCurrentModeCenterline':drive,'sharedResonatorModeCenterline':resonator,
  'layerAssignment':'DUT/resonator at z=0; separate insulated pump layer at z=-0.40 um; magnetic pickups at z=+0.30 um. Projected line crossings are not galvanic connections. This proposed multilayer stack requires fabrication and full capacitive/EM design.',
  'pickupHeight':z,'pickupTraceWidthTarget':.15,'sharedBranchWidthAssumption':shared_width,
  'magneticPickups':{name:[{'windingSign':s,'closedCenterline':loop} for s,loop in lobes] for name,lobes in pickups.items()},
  'differentialVoltageTap':{'nodePositions':[[-2,-2,0],[2,-2,0]],
   'implementation':'Balanced capacitive voltage taps across the shared branch, with close differential routing to a separate receiver. Tap capacitance target <=5 aF per node is a design target requiring full EM calculation, not a parallel-plate prediction.',
   'purpose':'Observe the branch flux V_shared/(i omega), including kinetic inductance. Calibrate electrical crosstalk and the tap return-path magnetic area.'},
  'matchedUnsharedVoltageTap':{'nodePositions':[[6,-6,0],[10,-6,0]],
   'segmentLength':4.,'segmentWidth':.25,
   'implementation':'Match film, width and length to the shared branch but place this segment on an unshared resonator arm. Use balanced high-impedance differential voltage taps and independently calibrate the complex shared/monitor impedance ratio at the pump carrier.',
   'purpose':'Measure the actual environment resonator current through its kinetic branch flux without subtracting a large direct DUT self-current. Lithographic matching alone does not certify equality of impedances.'},
  'pickupRoles':{'P_D':'Opposite-winding lobes straddling the pump trace measure drive-current mode.',
                'P_R':'Opposite-winding lobes straddling the shared arm constrain resonator/DUT-current mixture.',
                'P_A':'Aperture loop supplies an independent spatial field signature and an overdetermination/guard channel.',
                'V_shared':'Differential branch voltage supplies the kinetic/shared-phase coordinate.',
                'V_monitor':'Matched unshared segment isolates the resonator-current coordinate and makes the reconstruction better conditioned.'}},
 'surrogateForwardModel':{'modeOrder':['pump trace','shared resonator current','DUT circulating current'],
   'channelOrder':list(pickups)+['V_shared/(i omega)','V_monitor/(i omega)'],
   'method':'Regularized Neumann filament integrals for magnetic flux and a lumped shared kinetic branch for the voltage channel; no substrate/superconducting sheet-current/capacitive/full-wave solution.',
   'magneticCouplingsHenry':fine.tolist(),'fullChannelMatrixHenry':K.tolist(),
   'sharedKineticInductanceAssumptionHenry':Lshared,
   'sharedSheetInductanceAssumptionHenryPerSquare':Lsheet,
   'matchedUnsharedInductanceAssumptionHenry':Lmonitor,
   'externalGeneralizedDriveWeightsHenry':m.tolist(),
   'DUTSelfCoefficientInTarget':0.,'reconstructionCoefficients':a.tolist(),
   'relativeLinearCoverageResidual':coverage_error,
   'rejectedFourChannelCoefficientNorm':float(np.linalg.norm(baseline_coeff)),
   'selectedFiveChannelCoefficientNorm':float(np.linalg.norm(a)),
   'magneticQuadratureRefinementChange':float(np.linalg.norm(fine-magnetic)/np.linalg.norm(fine)),
   'warning':'Quadrature refinement is not a physical-model uncertainty bound. Finite films, kinetic sheet response, junction displacement currents, tap capacitance and distributed modes require a London/Maxwell circuit model at the actual carrier.'},
 'loadingAndSelfCurrentInjectionTest':{'referenceCurrentVectorAmpere':i_ref.tolist(),
   'targetCurrentVectorAmpere':i_target.tolist(),
   'trueExternalPumpRatio':1.10,'reconstructedExternalPumpRatio':recovered_ratio,
   'naiveBranchVoltageRatio':naive_voltage_ratio,
   'unsharedMonitorVoltageRatio':monitor_ratio,
   'scope':'Synthetic test separates a changed pump current from a simultaneously changed DUT current without using its strength law.'},
 'sensitivityDiagnostic':{'referenceHamiltonianRabiFrequencyHz':100e6,'IpAmpereAssumption':Ip,
   'requiredReferenceExternalDriveWeber':drive_phi,'environmentModeCurrentAmpere':float(I_res),
   'reconstructionCoefficientNorm':float(np.linalg.norm(a)),
   'pairedRatioStatisticalAllocation':amplitude_target_sigma,
   'equalIndependentChannelSigmaRequiredWeber':float(required_sigma_flux),
   'equalIndependentChannelSigmaRequiredMicroFluxQuantum':float(required_sigma_microPhi),
   'illustrativeSingleSensorScaleWeber':nominal_individual_sensor_floor,
   'independentAveragesSquaredSensitivityRatio':float(averaging_factor),
   'scope':'Noise allocation illustration, not an averaging-time prediction. The published 0.2 mPhi sensitivity is not a matched GHz noise spectral density. Sensor bandwidth, correlations, drift and backaction can prevent reaching this requirement.'},
 'calibrationProtocol':[
  'Obtain the real GDS/stack and fit a source-native lumped/London-Maxwell model including shared kinetic inductance, junction capacitances, resonator return paths and the pickup/tap loading.',
  'Calibrate each independent sensor channel versus known local test-current modes using superconducting periodicity and calibrated microwave current/voltage standards; establish complex transfer and relative channel gains at each actual pump frequency. Measure the shared/unshared segment impedance ratio with an independent classical current injection, rather than setting it equal from nominal dimensions.',
  'Fix the DUT self-current pickup direction independently, for example using prepared winding-state changes and a validated current-distribution model. Absolute self-current amplitude is not needed for a null, but low-frequency direction calibration alone does not certify the GHz response.',
  'Validate the full complex matrix with additional independent common/differential calibration injections and held-out combinations; do not use Rabi strengths to determine its coefficients.',
  'Require the desired drive functional to lie in the calibrated sensor row span while nulling the DUT self-current mode. Use all five channels with measured covariance. Bound remaining sensor-blind modes with full EM and independent drive-port excitations; a small guard residual alone is insufficient.',
  'Use carrier/sideband cross-ratios at fixed sensor biases to measure each paired change. Interleave target/reference states and independent sensor-gain reference injections. Preserve complex amplitude and phase.',
  'Propagate sensor and reconstruction covariance jointly. For r=(a.y_target)/(a.y_reference), derivatives are a/(a.y_reference), -r a/(a.y_reference), and (y_target-r y_reference)/(a.y_reference) with respect to the two readings and common coefficients.',
  'Test probe-power and sensor-on/off limits, device parity stability, pulse-envelope bandwidth and any extra electric drive. Freeze the calibration and uncertainty bounds before scoring strength data.',
  'Servo the independently reconstructed pump amplitude ratio toward one. Accept equality only when abs(abs(r_hat)-1)+U95_plus_bounded_bias <=0.005. Record phase matching separately if coherent phase is part of the test.'
 ],
 'errorBudgetContract':{'type':'Proposed conservative amplitude-error allocations, not achieved uncertainties.',
  'terms':budget,'sum':budget_sum,'remainingServoResidualAllowance':.005-budget_sum,
  'coverage':'Statistical envelope must have stated joint coverage; bounded systematic terms are added conservatively. Correlated calibration errors are propagated, not treated as independent by default.',
  'achieved':False},
 'missingBeforeVerification':['Actual GDS, full stack and measured kinetic inductance distribution.',
   'Cryogenic complex pickup/voltage-tap transfer matrix and noise covariance at 1.8-2.56 GHz.',
   'Measured response to independent field/current modes, including self-current rejection and guard residual bounds.',
   'Backaction/drift bounds and actual paired pump-flux records.'],
 'verdict':{'candidateGeometryDerived':True,'surrogateModeReconstructionPassed':True,
   'actualScreeningModeCompletenessEstablished':False,'actualPointFivePercentEqualityVerified':False,
   'reason':'The paper supplies neither the complete geometry nor the calibration and uncertainty data. The surrogate reveals strong kinetic-drive/self-current rejection and noise requirements, so a 0.5-percent certificate cannot be inferred from a pickup sketch or nominal bandwidth.'},
 'reproduction':'./.venv-alpaca/Scripts/python.exe scripts/design-hcq-screening-pickups.py'
}
out=Path('evidence/data/hcq-screening-pickup-geometry-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')

# Code-native schematic of the candidate centerlines, not a fabrication drawing.
colors={'DUT':'#111827','drive':'#c2410c','resonator':'#64748b',
        'P_D_drive_gradiometer':'#2563eb','P_R_shared_arm_gradiometer':'#059669','P_A_aperture_guard':'#9333ea'}
def coords(path):return ' '.join(f'{350+24*x:.2f},{190-24*y:.2f}' for x,y,z in path)
svg=['<svg xmlns="http://www.w3.org/2000/svg" width="900" height="530" viewBox="0 0 900 530">',
 '<rect width="900" height="530" fill="white"/>',
 '<text x="24" y="28" font-family="sans-serif" font-size="20">Candidate h-CQUID pickup geometry</text>',
 '<text x="24" y="50" font-family="sans-serif" font-size="12">Proposed dimensions in micrometres; schematic redesign, not published chip CAD or a 0.5% certificate</text>']
for label,path in [('drive',drive),('resonator',resonator),('DUT',dut)]:
    svg.append(f'<polyline points="{coords(path)}" fill="none" stroke="{colors[label]}" stroke-width="3"/>')
for name,lobes in pickups.items():
    for sign,loop in lobes:
        svg.append(f'<polyline points="{coords(loop)}" fill="none" stroke="{colors[name]}" stroke-width="2" stroke-dasharray="5 3"/>')
        x=np.mean(np.array(loop[:-1])[:,0]);y=np.mean(np.array(loop[:-1])[:,1])
        svg.append(f'<text x="{350+24*x-4}" y="{190-24*y+4}" font-family="sans-serif" font-size="13" fill="{colors[name]}">{"+" if sign>0 else "-"}</text>')
for x in [-2,2]:svg.append(f'<circle cx="{350+24*x}" cy="238" r="5" fill="#dc2626"/>')
for x in [6,10]:svg.append(f'<circle cx="{350+24*x}" cy="334" r="5" fill="#dc2626"/>')
legend=[('DUT','DUT loop: 4 x 4 um'),('drive','Pump / remote return mode'),('resonator','Shared resonator branch'),
 ('P_D_drive_gradiometer','P_D: drive gradiometer'),('P_R_shared_arm_gradiometer','P_R: shared-arm gradiometer'),('P_A_aperture_guard','P_A: aperture guard')]
for j,(key,label) in enumerate(legend):
    yy=90+j*27
    svg.append(f'<line x1="660" y1="{yy}" x2="690" y2="{yy}" stroke="{colors[key]}" stroke-width="3"/>')
    svg.append(f'<text x="700" y="{yy+4}" font-family="sans-serif" font-size="12">{label}</text>')
svg.extend(['<text x="660" y="280" font-family="sans-serif" font-size="12" fill="#dc2626">Red dots: shared and monitor taps</text>',
 '<text x="660" y="303" font-family="sans-serif" font-size="12">Pickup plane: z = 0.30 um</text>',
 '<text x="660" y="350" font-family="sans-serif" font-size="12">Pump lower layer: z = -0.40 um</text>',
 '<text x="660" y="326" font-family="sans-serif" font-size="12">Tap target: at most 5 aF / node</text>',
 '<line x1="70" y1="465" x2="166" y2="465" stroke="black" stroke-width="3"/>',
 '<text x="85" y="486" font-family="sans-serif" font-size="12">4 um</text>',
 '<text x="24" y="514" font-family="sans-serif" font-size="12">Magnetic channels constrain currents; the voltage channel constrains shared kinetic flux. DUT self response is nulled.</text>', '</svg>'])
Path('evidence/data/hcq-screening-pickup-geometry-v1.svg').write_text('\n'.join(svg))
print(json.dumps({'output':str(out),'matrixHenry':K.tolist(),'weights':a.tolist(),
 'coverageResidual':coverage_error,'noise':report['sensitivityDiagnostic'],
 'verdict':report['verdict']},indent=2))

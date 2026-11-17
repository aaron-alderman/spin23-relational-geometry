"""No-refit audit of public h-CQUID two-tone data for inductive strength ratios.

Uses the bundled scientific Python. Read-only workbook extraction; no fits to
physical parameters, linewidths, per-bias gains, or missing calibrations.
Raw window areas are diagnostics, not calibrated transition matrix elements.
"""
import hashlib
import json
from pathlib import Path
import numpy as np
import openpyxl

base=Path('evidence/data/hcq-device-primary-v1')
def read(name):
    book=openpyxl.load_workbook(base/name,read_only=True,data_only=True)
    result={sheet.title:list(sheet.values) for sheet in book};book.close()
    return result

raw=read('Fig3a.xlsx')['Fig3a']
data=np.array([row for row in raw if isinstance(row[0],(float,int))],float)
assert data.shape==(401,151)
notes=[row[0] for row in raw if isinstance(row[0],str)]
assert '0.1-16.1GHz 401 points' in notes[0]
assert '151 points' in notes[1]
fit_rows=read('Fig3a_fit.xlsx')['Fig3a_fit']
axis_rows=np.array([row[:4] for row in fit_rows[1:] if isinstance(row[0],(float,int))],float)
assert len(axis_rows)==151
frequency=np.linspace(.1,16.1,401)
flux=axis_rows[:,2]  # author's calibrated flux axis; no new calibration fit
Ip=11.5e-9;f0=2.555;e=1.602176634e-19;h=6.62607015e-34;kB=1.380649e-23
predicted_frequency=np.sqrt(f0*f0+(Ip/e*flux/1e9)**2)
strength=(f0/predicted_frequency)**2
T=.012
inversion=np.tanh(h*predicted_frequency*1e9/(2*kB*T))
reference=int(np.argmin(abs(flux)))

# Prespecified window diagnostic: signed dip area relative to a constant local
# flank mean. Do not rectify or tune windows to enforce agreement. All three
# widths are retained as sensitivity cases. No linewidth is fitted.
widths=[.12,.20,.28]
standing_modes=np.array([3.671,6.670,10.676])
def area(column,half_width):
    center=predicted_frequency[column]
    distance=frequency-center
    local=(abs(distance)>=.32)&(abs(distance)<=.52)
    local &= np.min(abs(frequency[:,None]-standing_modes[None,:]),axis=1)>.12
    window=abs(distance)<=half_width
    if local.sum()<4 or window.sum()<4:return None
    baseline=float(np.mean(data[local,column]))
    value=float(np.trapezoid(baseline-data[window,column],frequency[window]))
    return {'signedAreaArbitraryUnitsGHz':value,'flankMean':baseline,
            'windowBins':int(window.sum()),'flankBins':int(local.sum())}

def apparent_width(column):
    local=area(column,.28)
    if local is None:return None
    contrast=local['flankMean']-data[:,column]
    center=predicted_frequency[column]
    core=np.where(abs(frequency-center)<=.28)[0]
    peak=int(core[np.argmax(contrast[core])])
    height=float(contrast[peak])
    if height<=0:return {'status':'no-positive-dip'}
    half=height/2
    left=[j for j in range(peak-1,-1,-1) if contrast[j]<=half and abs(frequency[j]-center)<=.52]
    right=[j for j in range(peak+1,len(frequency)) if contrast[j]<=half and abs(frequency[j]-center)<=.52]
    if not left or not right:return {'status':'no-local-half-height-crossings'}
    il,ir=left[0],right[0]
    xl=np.interp(half,[contrast[il],contrast[il+1]],[frequency[il],frequency[il+1]])
    xr=np.interp(half,[contrast[ir],contrast[ir-1]],[frequency[ir],frequency[ir-1]])
    return {'status':'apparent-width-only','peakGHz':float(frequency[peak]),
            'halfHeightWidthMHz':float((xr-xl)*1e3),'dipHeightArbitraryUnits':height,
            'scope':'Unfitted half-height crossings; not a deconvolved qubit linewidth. Noise, overlapping lines, pump broadening and readout conversion remain.'}

targets=[-.10,-.05,-.02,0.,.02,.05,.10]
records=[]
for requested in targets:
    j=int(np.argmin(abs(flux-requested)))
    diagnostics=[]
    for width in widths:
        measurement=area(j,width);anchor=area(reference,width)
        ratio=None if measurement is None or anchor is None or abs(anchor['signedAreaArbitraryUnitsGHz'])<1e-14 else measurement['signedAreaArbitraryUnitsGHz']/anchor['signedAreaArbitraryUnitsGHz']
        diagnostics.append({'halfWindowGHz':width,'rawSignedAreaRatio':ratio,
                            'measurement':measurement,'reference':anchor})
    records.append({'requestedFluxOverQuantum':requested,'actualFluxOverQuantum':float(flux[j]),
                    'excelColumnIndexOneBased':j+1,'predictedTransitionGHz':float(predicted_frequency[j]),
                    'predictedCurrentStrengthRatio':float(strength[j]/strength[reference]),
                    'equilibriumPopulationDifference':float(inversion[j]),
                    'relativeEquilibriumPopulationCorrection':float(inversion[reference]/inversion[j]),
                    'apparentWidthDiagnostic':apparent_width(j),
                    'uncalibratedAreaDiagnostics':diagnostics})

# Inspect the remaining release before deciding which corrections are available.
inventory=[]
for p in sorted(base.glob('*.xlsx')):
    sheets=read(p.name)
    inventory.append({'file':p.name,'sheets':[{'name':name,'rows':len(rows),'columns':len(rows[0]),
        'headers':list(rows[0]) if p.name not in ['Fig3a.xlsx','Fig4a.xlsx','Fig4b.xlsx'] else None,
        'textNotes':[row[0] for row in rows if isinstance(row[0],str)]} for name,rows in sheets.items()]})
resonator_rows=read('Fig2_insert.xlsx')['Fig2_insert']
resonator_notes=[row[0] for row in resonator_rows if isinstance(row[0],str)]
assert any('|t|' in str(row) for row in resonator_rows[:1])
assert any('half_width' in str(row) for row in resonator_rows)

# What sampling alone can do to a Lorentzian area at the reported lifetime.
T1=.02e-6
minimum_FWHM_Hz=1/(2*np.pi*T1)
step_Hz=(frequency[1]-frequency[0])*1e9
gamma=minimum_FWHM_Hz/2
a=2*np.pi*gamma/step_Hz
area_sample_min=float(np.tanh(a/2));area_sample_max=float(1/np.tanh(a/2))

# Quantify the remaining inverse problem without fitting a correction function.
# In the weak, unsaturated two-tone limit A=G*T1*Delta_p*|Phi_ac|^2*W up to
# a common constant. Two candidate positive strengths have exactly the same
# signal if the unmeasured transfer product changes inversely.
W1=strength/strength[reference]
W2=np.sqrt(W1)
G1=np.ones_like(W1);G2=W1/W2
assert np.max(abs(G1*W1-G2*W2))<1e-14

inputs=[*base.glob('*.xlsx'),Path('evidence/data/hcq-lever-arm-ratio-test-v1.json'),Path(__file__)]
report={
 'schemaVersion':'hcq-public-inductive-strength-test-v1','date':'2026-11-08',
 'primaryPaper':'https://arxiv.org/abs/2601.06682v1','primaryData':'https://osf.io/q4dav/',
 'sourceHashes':{str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in inputs},
 'sourcePolicy':'Original public workbooks read only; numerical values and author axes preserved. No physical parameter, linewidth or per-bias gain refit.',
 'fixedModel':{'IpAmpere':Ip,'referenceFrequencyGHz':f0,'temperatureKelvin':T,
              'parametersRefitted':0,'referenceColumnIndexOneBased':reference+1,
              'referenceFluxOverQuantum':float(flux[reference]),
              'predictedStrength':'W(Phi)/W(Phi_ref)=[f01(Phi_ref)/f01(Phi)]^2',
              'sourceBoundary':'Previously published fitted spectral parameters; not an independent prediction of pole positions.'},
 'measurementModel':{
  'observable':'Two-tone dispersive readout contrast versus spectroscopy frequency and flux, in arbitrary units.',
  'weakDriveArea':'A(Phi)=constant*G_readout(Phi)*T1(Phi)*Delta_p(Phi)*|Phi_ac(omega01,Phi)|^2*|I10(Phi)|^2, for a linear readout and weak unsaturated drive.',
  'linewidth':'An ideally fully integrated weak-drive Lorentzian area removes the explicit T2 factor, but finite sampling/windows, saturation, overlap and readout distortion prevent automatic cancellation.',
  'inversion':'Delta_p=tanh(h f01/(2 kB T)) only in thermal equilibrium. Under drive, steady state and saturation must be measured or predicted by a calibrated dynamical model.',
  'readout':'G_readout includes dispersive population-to-resonator conversion and detection transfer. Through-transmission magnitude does not by itself determine local pump flux or this conversion.',
  'conditionalCorrection':'W/W_ref=(A/A_ref)*(G_ref/G)*(T1_ref/T1)*(Delta_p_ref/Delta_p)*(|Phi_ac,ref|^2/|Phi_ac|^2). The unmeasured factors are not set to one.'},
 'dataset':{'mapShapeFrequencyByFlux':list(data.shape),'frequencyGHz':[float(frequency[0]),float(frequency[-1])],
            'frequencyStepMHz':float(step_Hz/1e6),'fluxRange':[float(flux[0]),float(flux[-1])],
            'notes':notes,'sourceRange':'Fig3a!A1:EU401','inventory':inventory},
 'populationAudit':{'equilibriumReferenceInversion':float(inversion[reference]),
                    'maximumEquilibriumCorrectionOverEntireFluxMap':float(1/inversion[reference]-1),
                    'drivenPopulationsAvailable':False,
                    'interpretation':'The equilibrium correction is tiny on this fixed-charge flux sweep; the bath temperature does not certify driven populations or weak saturation.'},
 'linewidthAudit':{'reportedLifetimeSeconds':T1,'lifetimeLimitedMinimumFWHMMHz':minimum_FWHM_Hz/1e6,
                  'frequencyStepOverMinimumFWHM':step_Hz/minimum_FWHM_Hz,
                  'fluxResolvedQubitT1T2Provided':False,
                  'scope':'Lifetime-based estimate takes the paper reported 20 ns at face value. Its single Rabi trace is not a bias-resolved relaxation/dephasing or power-broadening calibration.',
                  'idealLorentzianInfiniteGridAreaFactorRange':[area_sample_min,area_sample_max],
                  'apparentHalfHeightWidthRangeMHz':[min(row['apparentWidthDiagnostic']['halfHeightWidthMHz'] for row in records if row['apparentWidthDiagnostic'] and row['apparentWidthDiagnostic']['status']=='apparent-width-only'),
                                                    max(row['apparentWidthDiagnostic']['halfHeightWidthMHz'] for row in records if row['apparentWidthDiagnostic'] and row['apparentWidthDiagnostic']['status']=='apparent-width-only')],
                  'samplingScope':'Diagnostic for a hypothetical lifetime-limited narrow line, not a confidence interval or a claim that these visibly broadened features are undersampled. Apparent widths do not isolate homogeneous dephasing, saturation or overlapping response.'},
 'probeTransferAudit':{'resonatorSourceNotes':resonator_notes,
                       'magnitudeOnlyTransmission':True,'localPumpFluxCalibrationAvailable':False,
                       'fluxResolvedPopulationReadoutConversionAvailable':False,
                       'resonatorLinewidthIsNotQubitLinewidth':True,
                       'scope':'Published total attenuation and gain are not a calibrated frequency/bias-resolved local flux transfer. The source frequency headers say GHz but numeric magnitudes in Fig2 are Hz; this audit does not reinterpret them as calibrated qubit-drive amplitudes.'},
 'rawAreaProtocol':{'halfWindowGHz':widths,'flanksGHz':[.32,.52],
                    'standingModeExclusionHalfWidthGHz':.12,
                    'normalization':'Same extraction at the nearest degeneracy column.',
                    'scope':'Fixed-window, signed local-flank diagnostics. Model-assisted location; no linewidth fit. Window sensitivity retained. Neither positive nor negative contrast is promoted to a current matrix element.'},
 'records':records,
 'identifiabilityWitness':{'maxEqualSignalDifference':float(np.max(abs(G1*W1-G2*W2))),
                         'alternativeStrength':'sqrt(W_predicted/W_reference)',
                         'alternativeTransfer':'G_alternative=G_original*(W_predicted/W_reference)/W_alternative',
                         'frequencyOnlyFreedom':'Both W_pred and sqrt(W_pred) depend only on f01 for this model, so the compensating factor can be one smooth frequency-dependent pump transfer rather than independently fitted bias gains.',
                         'scope':'Algebraic underidentification by an unmeasured positive transfer product. No such correction is fitted to claim agreement.'},
 'strengthTest':{'status':'NOT_IDENTIFIABLE_FROM_PUBLISHED_CALIBRATION','passed':None,'rejected':None,
                 'reason':'Available maps contain spectral features but not the measured correction product required to extract inductive matrix-element ratios. A corrected no-refit comparison cannot be scored.',
                 'notInferred':['No confirmation from visibility fading.','No rejection from raw contrast/area ratios.','No population, transfer or linewidth values invented at unmeasured biases.']},
 'requiredAcquisition':['Weak-power sweep at each bias to establish the unsaturated limit.',
  'Flux-resolved relaxation and linewidth/coherence or an independently calibrated full dynamical model.',
  'Pump frequency-to-local-flux calibration and population-to-readout response at the same bias.',
  'Integrated line weights with sufficient frequency resolution, overlap treatment and covariance.',
  'Freeze those calibrations before scoring the square-gap law on withheld flux biases.'],
 'verification':{'fixedModelOnly':True,'equalSignalWitnessPassed':True,'originalSourcesUnmodified':True},
 'reproduction':'Run scripts/test-hcq-public-inductive-strengths.py with the bundled Python containing openpyxl and numpy.'
}
out=Path('evidence/data/hcq-public-inductive-strength-test-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'output':str(out),'populationAudit':report['populationAudit'],
 'linewidthAudit':report['linewidthAudit'],'strengthTest':report['strengthTest'],
 'records':[{k:v for k,v in row.items() if k!='uncalibratedAreaDiagnostics'}|{
 'rawAreaRatios':[x['rawSignedAreaRatio'] for x in row['uncalibratedAreaDiagnostics']]} for row in records]},indent=2))

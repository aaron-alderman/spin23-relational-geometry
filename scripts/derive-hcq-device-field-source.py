"""Read-only primary-workbook audit and source/contact derivation for h-CQUID.

Run with the bundled scientific Python (openpyxl, numpy). No source workbook is
changed, and no fit parameter is optimized. Missing geometry is not invented.
"""
import hashlib
import json
import re
from pathlib import Path
import numpy as np
import openpyxl

base=Path('evidence/data/hcq-device-primary-v1')
e=1.602176634e-19; h=6.62607015e-34
def values(name):
    book=openpyxl.load_workbook(base/name,read_only=True,data_only=True)
    sheet=book.active
    result=list(sheet.values);book.close()
    return result
gate=[];fit_replays=[]
for suffix,rates in [('a',(1.48,1.08)),('b',(3.15,1.45))]:
    name=f'Fig4{suffix}-fit.xlsx'; raw=values(name)
    rows=np.array([r[:8] for r in raw[1:] if isinstance(r[0],(float,int))],float)
    period_line=next(r[0] for r in raw if isinstance(r[0],str) and r[0].startswith('period='))
    period_v=float(re.search(r'period=([\d.]+)mV',period_line)[1])*1e-3
    capacitance=2*e/period_v
    # Use the literal header: displayed x=1000 V_gate expressed in mV.
    xvolts=rows[:,0]*1e-6
    slopes=np.diff(rows[:,4])/np.diff(xvolts)
    slope=float(np.median(slopes))
    assert abs(slope*e/capacitance-1)<1e-10
    gate.append({'file':name,'sheet':name[:-5],'rowCount':len(rows),
                 'header':raw[0][0],'periodText':period_line,'periodVolt':period_v,
                 'gateCapacitanceFromPeriodF':capacitance,
                 'gateCapacitanceAttofarad':capacitance/1e-18,
                 'chargeInElectronUnitsPerVolt':slope,
                 'periodCell':f'A{len(raw)}',
                 'interpretation':'Cg=2e/DeltaVg from the authors period annotation, not an independent electrostatic geometry calculation or an uncertainty-certified line calibration.'})
    nu1,nu2=rates
    pred=np.sort(np.sqrt(np.maximum(0,nu1**2+nu2**2+
        np.array([1.,-1.])[:,None]*2*nu1*nu2*np.cos(np.pi*rows[:,4]))),axis=0).T
    observed=np.sort(rows[:,[5,7]],axis=1)
    errors=pred-observed
    fit_replays.append({'file':name,'sourceCells':f'E2:H{len(rows)+1}',
        'publishedRatesGHz':list(rates),'parametersRefitted':False,
        'rmseGHz':float(np.sqrt(np.mean(errors**2))),
        'maximumAbsoluteErrorGHz':float(np.max(np.abs(errors))),
        'scope':'Replay against authors fitted curves, not raw held-out spectroscopy, calibrated oscillator strengths or a new device validation. Printed parameter rounding and curve offsets remain.'})

flux_rows=values('Fig3a_fit.xlsx')
flux_period_line=next(r[0] for r in flux_rows if isinstance(r[0],str) and r[0].startswith('period='))
flux_period_ampere=float(re.search(r'period=([\d.]+)mA',flux_period_line)[1])*1e-3
flux_quantum=h/(2*e)
mutual_inductance=flux_quantum/flux_period_ampere

# Reproduce the geometry-to-charging conversion without silently correcting units.
area_um2=.28*.1; specific_F_um2=5e-16
C_literal=area_um2*specific_F_um2
EC_literal=e*e/(2*C_literal*h)
EC_quoted=13.8e9; C_from_quoted=e*e/(2*h*EC_quoted)
EJ_GHz=29.2; EC_GHz=13.8
nu_semiclassical=8*np.sqrt(EJ_GHz*EC_GHz/np.pi)*(8*EJ_GHz/EC_GHz)**.25*np.exp(-np.sqrt(8*EJ_GHz/EC_GHz))

# Independent finite differences of a generic one-island charging action.
# These numerical test constants are not assigned to the named device.
C_test=2.7;cg_test=.13;eta_test=.19;p_test=.7;v_test=.2;E_test=.1;step=2e-4
def HC(E):return (p_test-cg_test*v_test-eta_test*E)**2/(2*C_test)
d_exact=eta_test*(p_test-cg_test*v_test-eta_test*E_test)/C_test
contact_exact=eta_test**2/C_test
d_fd=-(HC(E_test+step)-HC(E_test-step))/(2*step)
c_fd=(HC(E_test+step)-2*HC(E_test)+HC(E_test-step))/step**2
assert abs(d_fd-d_exact)<1e-10 and abs(c_fd-contact_exact)<1e-8

# Raw maps retain author axes notes but no calibrated electric-field amplitude.
raw_maps=[]
for name in ['Fig3a.xlsx','Fig4a.xlsx','Fig4b.xlsx']:
    rows=values(name)
    notes=[r[0] for r in rows if isinstance(r[0],str)]
    count=sum(isinstance(r[0],(float,int)) for r in rows)
    raw_maps.append({'file':name,'numericRows':count,'columns':len(rows[0]),'axisNotes':notes,
                     'absoluteElectricFieldOrDipoleCalibrationPresent':False})

files=list(base.glob('*.xlsx'))
cache_files=[Path('.tmp/hcq-device-paper.pdf'),Path('.tmp/hcq-device-osf-files.json'),
             *[Path(f'.tmp/hcq-device-osf-Fig{i}.json') for i in [2,3,4]]]
receipts={str(p):hashlib.sha256(p.read_bytes()).hexdigest() for p in [*files,*cache_files,Path(__file__)] if p.exists()}
report={
 'schemaVersion':'hcq-device-field-source-derivation-v1','date':'2026-11-08',
 'primaryPaper':'https://arxiv.org/abs/2601.06682v1','primaryData':'https://osf.io/q4dav/',
 'receipts':receipts,
 'workbookPolicy':'Original public workbooks read only. No cells changed; no fitting performed.',
 'repositoryInventory':{'rootFolders':['Fig2','Fig3','Fig4'],
     'finding':'The inspected public OSF root and its three immediate folders contain figure workbooks. No CAD, mesh, full capacitance matrix, dielectric stack or Casimir geometry was found in this inspected release.',
     'scope':'Bounded public-release inspection, not a claim about unreleased author files.'},
 'gateCalibration':gate,'publishedParameterReplays':fit_replays,'rawMapInventory':raw_maps,
 'fluxCalibration':{'file':'Fig3a_fit.xlsx','sheet':'Fig3a_fit','periodCell':'A154',
    'periodText':flux_period_line,'fluxQuantumWeber':flux_quantum,
    'controlCurrentPeriodAmpere':flux_period_ampere,'coilToLoopMutualInductanceH':mutual_inductance,
    'scope':'Calibration from the authors current-to-flux period; not an independently reconstructed loop area or local magnetic field map.'},
 'geometryConsistency':{'junctionAreaSquareMicrometre':area_um2,
     'printedSpecificCapacitanceFPerSquareMicrometre':specific_F_um2,
     'literalJunctionCapacitanceF':C_literal,'literalChargingFrequencyGHz':EC_literal/1e9,
     'quotedChargingFrequencyGHz':EC_quoted/1e9,
     'junctionCapacitanceImpliedByQuotedEnergyF':C_from_quoted,
     'ratioLiteralToQuotedChargingFrequency':EC_literal/EC_quoted,
     'specificCapacitanceRequiredByQuotedEnergy':C_from_quoted/area_um2,
     'interpretation':'Approximately factor-100 inconsistency between printed area/specific-capacitance units and quoted EC. A typographical or unit error is plausible but not corrected by this audit. Junction barrier capacitance is not gate capacitance.'},
 'geometryOnlyPhaseSlipTest':{'quotedInputEJOverHGHz':EJ_GHz,'quotedInputECOverHGHz':EC_GHz,
     'semiclassicalRateFromPrintedFormulaGHz':float(nu_semiclassical),
     'paperReportedGeometryEstimateGHz':2.7,
     'paperFittedRatesGHz':[1.48,1.08],
     'equalNominalJunctionPredictedMaximumGapGHz':float(2*nu_semiclassical),
     'fittedMaximumGapGHz':2.56,'equalNominalJunctionPredictedMinimumGapGHz':0.,
     'fittedMinimumGapGHz':.4,
     'verdict':'Available nominal junction estimates do not reproduce the fitted interference envelope without changing parameters. This is a diagnostic of incomplete microscopic inputs/approximation, not a fundamental no-go. The semiclassical formula is not used with the inconsistent literal large-EC geometry.'},
 'fieldLeverArmDerivation':{
  'electrostaticProblem':'Solve div[epsilon(r) grad u_a]=0 for unit-potential conductor weighting fields, using the actual dielectric stack, conductor surfaces, ground/floating constraints and external-field boundary conditions.',
  'capacitance':'C_ab=int d^3r epsilon grad u_a dot grad u_b. This gives the Maxwell capacitance matrix, not merely junction overlap capacitance.',
  'fieldCoupling':'Let eta_i,alpha=partial Q_g,i/partial E_alpha be the induced offset-charge derivative from the same boundary-value solution. A measured gate Cg specifies partial Qg/partial Vg, not eta for a free-space field.',
  'singleGateReduction':'If a separately determined Vg=ell_eff,alpha E_alpha applies, eta_alpha=Cg ell_eff,alpha. ell_eff includes shielding and electrode participation; it is not the junction width or SEM scale-bar length.',
  'numericalEtaAvailable':False,
  'frequencyBoundary':'The electrostatic solution fixes a low-frequency source map. Broadband Casimir response additionally requires the frequency-dependent Maxwell problem and material response beyond the reduced circuit band.',
  'missingGeometry':['Full gate/island/loop/resonator dimensions and conductor thicknesses.','Substrate/cap/barrier permittivity and screening boundary conditions.','Reference-plane voltage-to-field calibration and opposing-body/separation geometry.']},
 'commonCanonicalAction':{
  'coordinates':'Node fluxes varphi (units Wb); canonical charges p, with the relevant Cooper-pair charge convention fixed in the complete circuit.',
  'Lagrangian':'L=(1/2) varphi_dot^T C varphi_dot + Qg(E,Vg)^T varphi_dot - U(varphi,Phi_ext) + L_direct(E,Vg).',
  'Hamiltonian':'H=(1/2)(p-Qg)^T C^{-1}(p-Qg)+U-L_direct.',
  'electricDipole':'For Qg=Qg0+eta E and field-independent U,C: d_alpha=eta_alpha^T C^{-1}(p-Qg)+partial_Ealpha L_direct.',
  'HamiltonianContact':'partial_Ealpha partial_Ebeta H=eta_alpha^T C^{-1} eta_beta-partial_Ealpha partial_Ebeta L_direct.',
  'scope':'These are fixed-state source derivatives. The full response also includes the spectral Kubo term. If geometry/material coefficients or U depend on the source, their derivatives must be included.',
  'singleIsland':'H_C=(2e n-Cg Vg-eta E)^2/(2 C_Sigma); d=eta(2e n-Cg Vg-eta E)/C_Sigma; charging contact=eta^2/C_Sigma.',
  'retainedBoundaryTerms':'The source-only electrostatic term L_direct is fixed by the same conductor problem. Dropping it arbitrarily changes the contact response.',
  'inductiveSource':'For U_L=(varphi_loop-Phi_ext)^2/(2 Lk), -partial_PhiExt H=(varphi_loop-Phi_ext)/Lk and partial_PhiExt^2 H=1/Lk. If Phi_ext=M I_coil, the corresponding coil-current contact is M^2/Lk. These lumped source terms do not determine the complete electromagnetic scattering response.',
  'twoStateProjection':'A bias-dependent basis requires covariant derivatives or the induced source connection. The fitted real gap E_S(Q)=|t(Q)| alone does not uniquely supply a physical electric transition operator.'},
 'verification':{'chargingDipoleFiniteDifferenceError':float(abs(d_fd-d_exact)),
                 'chargingContactFiniteDifferenceError':float(abs(c_fd-contact_exact)),
                 'sourceDerivativeChecksPassed':True},
 'jointPredictionVerdict':{
  'electricalGatePeriodRecovered':True,'numericalFreeSpaceFieldLeverArmDerived':False,
  'completePhysicalContactsDetermined':False,'geometryOnlySpectrumPredictionPass':False,
  'heldOutAbsoluteDipoleStrengthTestPossible':False,'physicalCasimirForcePredictionPossible':False,
  'reason':'The public release gives useful voltage/flux spectroscopy, but not the electrostatic boundary solution, full source/contact dictionary, complete electromagnetic material response and force geometry needed by the same-action prediction.',
  'forceScaling':'For the isolated electric-channel Casimir-Polder approximation, scaling eta by s scales dipole weights and the leading force by s^2 while leaving the zero-probe spectrum unchanged. Unknown direct and magnetic channels add further physical inputs.',
  'earlierFixtureTransfer':'The earlier four-state 20.8-percent contrast is not transferred to this h-CQUID. No force percentage or force in newtons is assigned to the device.'},
 'reproduction':'Run scripts/derive-hcq-device-field-source.py with the bundled Python containing openpyxl and numpy.'
}
out=Path('evidence/data/hcq-device-field-source-derivation-v1.json')
out.write_text(json.dumps(report,indent=2)+'\n')
print(json.dumps({'output':str(out),'gateCalibration':gate,'geometryConsistency':report['geometryConsistency'],
 'phaseSlipTest':report['geometryOnlyPhaseSlipTest'],'replay':fit_replays,'jointPredictionVerdict':report['jointPredictionVerdict']},indent=2))

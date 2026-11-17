import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Run from the repository root. Explicit curation avoids indexing unrelated work.
const root = process.cwd();
const packetDir = 'corpus/programmes/optical-boundary-response';
const hash = p => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
const files = new Map();
function add(p, familyId, role) {
  if (!fs.existsSync(p)) throw new Error(`Missing packet dependency: ${p}`);
  files.set(p, {path:p, sha256:hash(p), familyId, role});
}
for (const name of fs.readdirSync(packetDir).filter(n=>n.endsWith('.md')).sort()) add(`${packetDir}/${name}`, 'documentation', 'programme-note');
add(`${packetDir}/ADS_TIDAL_RESPONSE.md`,'matched-ads-tidal-fixture','programme-note');
add(`${packetDir}/ADS_BOUNDARY_CHARGES.md`,'matched-ads-tidal-fixture','programme-note');
for (const p of ['AGENTS.md','corpus/programmes/translation-free-exceptional-topology/README.md',
 'scripts/index-optical-boundary-response-research-packet.mjs',
 'verification/verify/verify_optical_boundary_response_research_packet.mjs']) add(p,'documentation','integration-or-integrity');
const groups = [
 ['matched-ads-tidal-fixture',['ads-tidal-response-v1','ads-boundary-charges-v1']],
 ['supplied-e8-rotor', [
  'translation-free-e8-charge-dipole-result-v1','translation-free-e8-expanded-charge-dipole-result-v1',
  'translation-free-e8-charge-shell-convergence-result-v1','translation-free-e8-multifrequency-result-v1',
  'translation-free-e8-multifrequency-test-contract-v1','translation-free-e8-multifrequency-replay-v1',
  'translation-free-e8-doublet-overlap-diagnostic-v1','translation-free-e8-line-strength-convergence-v1',
  'translation-free-e8-refined-frozen-predictions-v1','translation-free-e8-refined-frozen-response-v1',
  'translation-free-e8-refined-holdout-score-v1','translation-free-e8-selector-identifiability-v1']],
 ['four-site-boundary-model',['selector-flux-boundary-action-audit-v1','selector-flux-optical-casimir-polder-bridge-v1']],
 ['hybrid-model-and-instrument-design',['selector-device-physical-scale-audit-v1','hcq-device-field-source-derivation-v1',
  'hcq-lever-arm-ratio-test-v1','hcq-isofrequency-rabi-protocol-v1','hcq-independent-local-flux-witness-v1','hcq-screening-pickup-geometry-v1']],
 ['dunstan-2026-public-release',['hcq-public-inductive-strength-test-v1']],
 ['corpus-selector-action-audit',['t1-t2-action-mass-gap-audit-v1','t1-t2-action-source-checks-v1',
  'yukawa-vacuum-scale-selection-v1','yukawa-vacuum-source-checks-v1',
  'spectral-mass-ratio-closure-v1','spectral-mass-ratio-source-checks-v1',
  'dynamical-finite-dirac-full-action-v1',
  'peirce-potential-kinetic-metric-v1','peirce-metric-source-checks-v1',
  'joint-background-vacuum-kinetic-protection-v1','joint-background-source-checks-v1',
  'uv-boundary-running-pole-matching-v1','uv-pole-source-checks-v1']],
 ['periodic-maxwell-fixture',['periodic-photon-medium-bridge-v1','photon-medium-period-amplitude-v1','photon-medium-scale-source-checks-v1','photon-medium-native-action-v1','photon-medium-native-action-source-checks-v1','full-spectral-finite-k-v1','stationary-spectral-background-v1','noncentral-competing-sector-v1','noncentral-competing-source-checks-v1']]
];
for(const [family,names] of groups) for(const name of names) add(`evidence/data/${name}.json`,family,'result-record');
for(const name of fs.readdirSync('evidence/data/hcq-device-primary-v1').filter(n=>n.endsWith('.xlsx')).sort())
 add(`evidence/data/hcq-device-primary-v1/${name}`,'dunstan-2026-public-release','public-source-workbook');
for(const ext of ['svg','png']) add(`evidence/data/hcq-screening-pickup-geometry-v1.${ext}`,'hybrid-model-and-instrument-design','proposed-geometry');
add('evidence/data/translation-free-e8-dipole-geometry-v1.json','supplied-e8-rotor','geometry-record');
for(const name of ['LocalFlux','LocalFluxWitness','LocalFluxAudit'])
 add(`verification/lean/${name}.lean`,'hybrid-model-and-instrument-design','formal-certificate');
add('scripts/model-cavity-shield-antinode.mjs','cavity-shield-antinode','calculation-or-renderer');

const bundledPython = 'C:/Users/aaron/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe';
const checks = [
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_ads_tidal_response.py','matched-ads-tidal-fixture'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_ads_boundary_charges.py','matched-ads-tidal-fixture'],
 ['node','verification/verify/verify_cavity_shield_antinode.mjs','cavity-shield-antinode'],
 ['node','verification/verify/verify_translation_free_e8_multifrequency.mjs','supplied-e8-rotor'],
 ['node','verification/verify/verify_translation_free_e8_refined_holdout.mjs','supplied-e8-rotor'],
 ['node','verification/verify/verify_translation_free_e8_selector_identifiability.mjs','supplied-e8-rotor'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_selector_flux_optical_casimir_polder.py','four-site-boundary-model'],
 [bundledPython,'verification/verify/verify_hcq_device_field_source.py','hybrid-model-and-instrument-design'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_hcq_lever_arm_ratios.py','hybrid-model-and-instrument-design'],
 [bundledPython,'verification/verify/verify_hcq_public_inductive_strengths.py','dunstan-2026-public-release'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_hcq_isofrequency_rabi_protocol.py','hybrid-model-and-instrument-design'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_hcq_local_flux_witness.py','hybrid-model-and-instrument-design'],
 ['python3','verification/verify/verify_hcq_local_flux_lean.py','hybrid-model-and-instrument-design'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_hcq_screening_pickups.py','hybrid-model-and-instrument-design'],
 ['node','verification/verify/verify_t1_t2_action_mass_gap.mjs','corpus-selector-action-audit'],
 ['node','verification/verify/verify_yukawa_vacuum_scale_selection.mjs','corpus-selector-action-audit'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_spectral_mass_ratio_closure.py','corpus-selector-action-audit'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_dynamical_finite_dirac_full_action.py','corpus-selector-action-audit'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_peirce_potential_kinetic_metric.py','corpus-selector-action-audit'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_joint_background_vacuum_kinetic_protection.py','corpus-selector-action-audit'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_uv_boundary_running_pole_matching.py','corpus-selector-action-audit'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_periodic_photon_medium_bridge.py','periodic-maxwell-fixture'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_photon_medium_period_amplitude.py','periodic-maxwell-fixture'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_photon_medium_native_action.py','periodic-maxwell-fixture'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_full_spectral_finite_k.py','periodic-maxwell-fixture'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_stationary_spectral_background.py','periodic-maxwell-fixture'],
 ['.venv-alpaca/Scripts/python.exe','verification/verify/verify_noncentral_competing_sector.py','periodic-maxwell-fixture']
].map(([runtime,script,familyId])=>{add(script,familyId,'result-verifier');return {runtime,script,familyId};});
for(const [family,names] of [
 ['supplied-e8-rotor',['expand-translation-free-e8-charge-dictionary.py','compute-translation-free-e8-frequency-response.py',
  'audit-translation-free-e8-charge-shell.py','audit-translation-free-e8-selector-identifiability.mjs',
  'test-translation-free-e8-multifrequency.mjs','grade-translation-free-e8-refined-holdout.mjs']],
 ['four-site-boundary-model',['audit-selector-flux-boundary-action.py','compute-selector-flux-casimir-polder.py']],
 ['hybrid-model-and-instrument-design',['audit-selector-device-physical-scales.mjs','derive-hcq-device-field-source.py',
  'test-hcq-lever-arm-ratios.py','design-hcq-isofrequency-rabi-test.py','design-hcq-local-flux-witness.py',
  'design-hcq-screening-pickups.py','render-hcq-pickup-preview.py']],
 ['dunstan-2026-public-release',['test-hcq-public-inductive-strengths.py']],
 ['corpus-selector-action-audit',['audit-t1-t2-action-mass-gap.mjs','audit-yukawa-vacuum-scale-selection.mjs','audit-spectral-mass-ratio-closure.py','audit-dynamical-finite-dirac-full-action.py','audit-peirce-potential-kinetic-metric.py','audit-joint-background-vacuum-kinetic-protection.py','audit-uv-boundary-running-pole-matching.py']],
 ['periodic-maxwell-fixture',['derive-periodic-photon-medium-bridge.py','audit-photon-medium-period-and-amplitude.py','audit-photon-medium-native-action.py','audit-full-spectral-finite-k.py','audit-stationary-spectral-background.py','audit-noncentral-competing-sector.py']]
]) for(const name of names) add(`scripts/${name}`,family,'calculation-or-renderer');

const read = p=>JSON.parse(fs.readFileSync(`evidence/data/${p}.json`,'utf8'));
const score=read('translation-free-e8-refined-holdout-score-v1');
const pickup=read('hcq-screening-pickup-geometry-v1');
const publicTest=read('hcq-public-inductive-strength-test-v1');
const actionGap=read('t1-t2-action-mass-gap-audit-v1');
const yukawaScale=read('yukawa-vacuum-scale-selection-v1');
const spectralRatio=read('spectral-mass-ratio-closure-v1');
const dynamicalDirac=read('dynamical-finite-dirac-full-action-v1');
const peirceMetric=read('peirce-potential-kinetic-metric-v1');
const jointBackground=read('joint-background-vacuum-kinetic-protection-v1');
const uvPole=read('uv-boundary-running-pole-matching-v1');
const periodicMedium=read('periodic-photon-medium-bridge-v1');
const patternMedium=read('photon-medium-period-amplitude-v1');
const nativeMedium=read('photon-medium-native-action-v1');
const fullSpectralPattern=read('full-spectral-finite-k-v1');
const stationarySpectral=read('stationary-spectral-background-v1');
const noncentralCompeting=read('noncentral-competing-sector-v1');
const adsTidal=read('ads-tidal-response-v1');
const adsBoundary=read('ads-boundary-charges-v1');
for(const audit of [actionGap,yukawaScale,spectralRatio,dynamicalDirac,peirceMetric,jointBackground,uvPole])for(const p of Object.keys(audit.sources))if(!files.has(p))add(p,'corpus-selector-action-audit','corpus-source-or-certificate');
for(const p of Object.keys(patternMedium.sources))if(!files.has(p))add(p,'periodic-maxwell-fixture','corpus-source-or-certificate');
for(const p of Object.keys(nativeMedium.sources))if(!files.has(p))add(p,'periodic-maxwell-fixture','corpus-source-or-certificate');
for(const p of Object.keys(fullSpectralPattern.sources))if(!files.has(p))add(p,'periodic-maxwell-fixture','corpus-source-or-certificate');
for(const p of Object.keys(stationarySpectral.sources))if(!files.has(p))add(p,'periodic-maxwell-fixture','corpus-source-or-certificate');
for(const p of Object.keys(noncentralCompeting.sources))if(!files.has(p))add(p,'periodic-maxwell-fixture','corpus-source-or-certificate');
// Keep source verdicts in full, without upgrading them through documentation.
const packet = {
 schemaVersion:'optical-boundary-response-research-packet-v1', date:'2026-11-08',
 reviewStatus:'research-packet-for-review', physicalAdmission:false,
 authority:'Curated programme documentation and provenance index; does not change corpus admissions.',
 selectionBoundary:'Explicit high-level reports, source workbooks, scripts and notes; not a complete numerical environment or transitive dependency archive.',
 rootDocument:`${packetDir}/README.md`,
 evidenceFamilies:[
  {id:'documentation',kind:'editorial-integration',independentPhysicalMeasurement:false},
  {id:'supplied-e8-rotor',kind:'one-supplied-model-numerical-family',independentPhysicalMeasurement:false},
  {id:'four-site-boundary-model',kind:'constructed-conditional-model',independentPhysicalMeasurement:false},
  {id:'dunstan-2026-public-release',kind:'one-public-experimental-release',independentPhysicalMeasurement:true,
   primarySources:['https://arxiv.org/abs/2601.06682v1','https://osf.io/q4dav/'],
   boundary:'Raw maps and fit curves are not separate experiments; extraction does not identify all calibration factors.'},
  {id:'hybrid-model-and-instrument-design',kind:'conditional-deductions-and-simulations',independentPhysicalMeasurement:false},
  {id:'corpus-selector-action-audit',kind:'one-corpus-audit-with-conditional-mathematical-witnesses',independentPhysicalMeasurement:false},
  {id:'periodic-maxwell-fixture',kind:'declared-periodic-medium-wave-and-pattern-comparisons',independentPhysicalMeasurement:false},
  {id:'cavity-shield-antinode',kind:'phenomenological-two-balance-comparison',independentPhysicalMeasurement:false},
  {id:'matched-ads-tidal-fixture',kind:'one-exact-matched-source-bulk-and-wall-comparison',independentPhysicalMeasurement:false,
   primarySources:['https://arxiv.org/abs/1903.06830','https://arxiv.org/abs/gr-qc/9801052',
    'https://arxiv.org/abs/gr-qc/9209012','https://arxiv.org/abs/1906.08616']}
 ],
 retainedBoundaries:{
  originalCoarseReplayPassed:score.originalCoarseReplayPassed,
  refinedNumericalHoldoutPassed:score.summary.numericalHoldoutPass,
  selectorSpecificPhysicalPredictionEstablished:score.selectorSpecificPhysicalPredictionEstablished,
  publicStrengthTestVerdict:publicTest.strengthTest,
  pickupVerdict:pickup.verdict,
  absoluteDeviceCasimirForcePredicted:false,
  t1T2ActionVerdict:actionGap.verdict,
  yukawaVacuumScaleVerdict:yukawaScale.verdict,
  spectralMassRatioVerdict:spectralRatio.verdict,
  dynamicalFiniteDiracVerdict:dynamicalDirac.verdict,
  peircePotentialMetricVerdict:peirceMetric.verdict,
  jointBackgroundProtectionVerdict:jointBackground.verdict,
  uvBoundaryPoleVerdict:uvPole.verdict,
  periodicPhotonMediumVerdict:periodicMedium.verdict,
  photonMediumPeriodAmplitudeVerdict:patternMedium.verdict,
  photonMediumNativeActionVerdict:nativeMedium.verdict,
  fullSpectralPatternVerdict:fullSpectralPattern.verdict,
  stationarySpectralBackgroundVerdict:stationarySpectral.verdict,
  noncentralCompetingVerdict:noncentralCompeting.verdict,
  adsTidalVerdict:adsTidal.verdict,
  adsBoundaryChargeVerdict:adsBoundary.verdict
 },
 verificationCommands:checks,
 artifacts:[...files.values()].sort((a,b)=>a.path.localeCompare(b.path))
};
// Fail rather than publish an index with an unidentified public-data verdict.
if(!packet.retainedBoundaries.publicStrengthTestVerdict) throw new Error('Inspect public report verdict schema');
const out=path.join(root,'evidence/data/optical-boundary-response-research-packet-v1.json');
fs.writeFileSync(out,JSON.stringify(packet,null,2)+'\n');
console.log(JSON.stringify({written:path.relative(root,out),artifacts:packet.artifacts.length,physicalAdmission:false}));

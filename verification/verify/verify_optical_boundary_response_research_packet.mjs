import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const read=p=>JSON.parse(fs.readFileSync(p,'utf8'));
const packet=read('evidence/data/optical-boundary-response-research-packet-v1.json');
assert.equal(packet.physicalAdmission,false);
assert.equal(packet.reviewStatus,'research-packet-for-review');
const families=new Set(packet.evidenceFamilies.map(f=>f.id));
assert.equal(families.size,9);
assert.equal(packet.evidenceFamilies.find(f=>f.id==='cavity-shield-antinode').independentPhysicalMeasurement,false);
assert.equal(packet.evidenceFamilies.find(f=>f.id==='matched-ads-tidal-fixture').independentPhysicalMeasurement,false);
const seen=new Set();
let links=0;
for(const item of packet.artifacts){
 assert(!seen.has(item.path),`Duplicate: ${item.path}`);seen.add(item.path);
 assert(families.has(item.familyId),`Unassigned family: ${item.path}`);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(item.path)).digest('hex'),item.sha256,item.path);
 if(item.role!=='programme-note') continue;
 const text=fs.readFileSync(item.path,'utf8');
 assert(text.includes('**Status:**'),`Missing status: ${item.path}`);
 for(const match of text.matchAll(/\]\(([^)]+)\)/g)){
  const target=match[1].replace(/^<|>$/g,'').split('#')[0];
  if(!target || /^[a-z][a-z0-9+.-]*:/i.test(target))continue;
  assert(fs.existsSync(path.resolve(path.dirname(item.path),decodeURIComponent(target))),`Broken link in ${item.path}: ${target}`);
  links++;
 }
}
for(const command of packet.verificationCommands)assert(seen.has(command.script));
const score=read('evidence/data/translation-free-e8-refined-holdout-score-v1.json');
const pickup=read('evidence/data/hcq-screening-pickup-geometry-v1.json');
const publicTest=read('evidence/data/hcq-public-inductive-strength-test-v1.json');
const b=packet.retainedBoundaries;
assert.equal(b.originalCoarseReplayPassed,false);
assert.equal(b.originalCoarseReplayPassed,score.originalCoarseReplayPassed);
assert.equal(b.refinedNumericalHoldoutPassed,score.summary.numericalHoldoutPass);
assert.equal(b.selectorSpecificPhysicalPredictionEstablished,false);
assert.equal(b.selectorSpecificPhysicalPredictionEstablished,score.selectorSpecificPhysicalPredictionEstablished);
assert.deepEqual(b.pickupVerdict,pickup.verdict);
assert.equal(b.pickupVerdict.actualPointFivePercentEqualityVerified,false);
assert.equal(b.pickupVerdict.actualScreeningModeCompletenessEstablished,false);
assert.deepEqual(b.publicStrengthTestVerdict,publicTest.strengthTest);
assert.equal(b.publicStrengthTestVerdict.status,'NOT_IDENTIFIABLE_FROM_PUBLISHED_CALIBRATION');
assert.equal(b.absoluteDeviceCasimirForcePredicted,false);
const actionGap=read('evidence/data/t1-t2-action-mass-gap-audit-v1.json');
assert.deepEqual(b.t1T2ActionVerdict,actionGap.verdict);
assert.equal(b.t1T2ActionVerdict.anticommutingPhysicalT1T2OperatorsDerived,false);
assert.equal(b.t1T2ActionVerdict.gapMagnitudePredictedWithoutFreeCoupling,false);
const yukawaScale=read('evidence/data/yukawa-vacuum-scale-selection-v1.json');
assert.deepEqual(b.yukawaVacuumScaleVerdict,yukawaScale.verdict);
assert.equal(b.yukawaVacuumScaleVerdict.commonBareAmplitudeCancelsInDeclaredTraceCompletion,true);
assert.equal(b.yukawaVacuumScaleVerdict.physicalGapOrIndependentMassRatioPredicted,false);
const spectralRatio=read('evidence/data/spectral-mass-ratio-closure-v1.json');
assert.deepEqual(b.spectralMassRatioVerdict,spectralRatio.verdict);
assert.equal(b.spectralMassRatioVerdict.commonMomentsCancelForSameScalarReference,true);
assert.equal(b.spectralMassRatioVerdict.positivePhysicalT1T2MassRatioPredicted,false);
const dynamicalDirac=read('evidence/data/dynamical-finite-dirac-full-action-v1.json');
assert.deepEqual(b.dynamicalFiniteDiracVerdict,dynamicalDirac.verdict);
assert.equal(b.dynamicalFiniteDiracVerdict.fixedRadiusPreservesEarlierRadialReference,false);
assert.equal(b.dynamicalFiniteDiracVerdict.positivePhysicalT1T2MassRatioPredicted,false);
const peirceMetric=read('evidence/data/peirce-potential-kinetic-metric-v1.json');
assert.deepEqual(b.peircePotentialMetricVerdict,peirceMetric.verdict);
assert.equal(b.peircePotentialMetricVerdict.leadingLinkPotentialAndMetricDerivedInDeclaredBlock,true);
assert.equal(b.peircePotentialMetricVerdict.fullGaussianStationarityAtSavedQuarticVacua,false);
assert.equal(b.peircePotentialMetricVerdict.positivePhysicalT1T2MassRatioPredicted,false);
const jointBackground=read('evidence/data/joint-background-vacuum-kinetic-protection-v1.json');
assert.deepEqual(b.jointBackgroundProtectionVerdict,jointBackground.verdict);
assert.equal(b.jointBackgroundProtectionVerdict.orbitInvariantConditionalTreeRatio,true);
assert.equal(b.jointBackgroundProtectionVerdict.originalFullDecayingCutoffVacuumStabilized,false);
assert.equal(b.jointBackgroundProtectionVerdict.positivePhysicalT1T2PoleMassRatioPredicted,false);
const uvPole=read('evidence/data/uv-boundary-running-pole-matching-v1.json');
assert.deepEqual(b.uvBoundaryPoleVerdict,uvPole.verdict);
assert.equal(b.uvBoundaryPoleVerdict.consistentFiniteSchemeReparameterizationPreservesPole,true);
assert.equal(b.uvBoundaryPoleVerdict.physicalUVRunningThresholdPolePredictionEstablished,false);
assert.equal(b.uvBoundaryPoleVerdict.targetMassFitted,false);
const periodicMedium=read('evidence/data/periodic-photon-medium-bridge-v1.json');
assert.deepEqual(b.periodicPhotonMediumVerdict,periodicMedium.verdict);
assert.equal(b.periodicPhotonMediumVerdict.periodicWaveEquationDerivesEnvelopeMixing,true);
assert.equal(b.periodicPhotonMediumVerdict.physicalAetherEstablished,false);
assert.equal(b.periodicPhotonMediumVerdict.genuineUVIRDualityEstablished,false);
const patternMedium=read('evidence/data/photon-medium-period-amplitude-v1.json');
assert.deepEqual(b.photonMediumPeriodAmplitudeVerdict,patternMedium.verdict);
assert.equal(b.photonMediumPeriodAmplitudeVerdict.suppliedFiniteWaveNumberActionCanSelectPattern,true);
assert.equal(b.photonMediumPeriodAmplitudeVerdict.corpusDerivesPhysicalPhotonLatticeSpacing,false);
assert.equal(b.photonMediumPeriodAmplitudeVerdict.corpusDerivesOpticalModulation,false);
assert.equal(b.photonMediumPeriodAmplitudeVerdict.physicalAetherEstablished,false);
assert.equal(b.photonMediumPeriodAmplitudeVerdict.envelopeGapPredictedFromCorpusWithoutMaterialInputs,false);
const nativeMedium=read('evidence/data/photon-medium-native-action-v1.json');
assert.deepEqual(b.photonMediumNativeActionVerdict,nativeMedium.verdict);
assert.equal(b.photonMediumNativeActionVerdict.sourceNativeJoinedPatternPhotonActionFound,false);
assert.equal(b.photonMediumNativeActionVerdict.positiveTwoDerivativeGaussianEliminationSelectsFiniteWaveNumber,false);
assert.equal(b.photonMediumNativeActionVerdict.physicalLatticeSpacingPredicted,false);
assert.equal(b.photonMediumNativeActionVerdict.opticalModulationPredicted,false);
assert.equal(b.photonMediumNativeActionVerdict.envelopeGapPredictedWithoutMaterialInputs,false);
assert.equal(b.photonMediumNativeActionVerdict.physicalAetherEstablished,false);
const fullSpectralPattern=read('evidence/data/full-spectral-finite-k-v1.json');
assert.deepEqual(b.fullSpectralPatternVerdict,fullSpectralPattern.verdict);
assert.equal(b.fullSpectralPatternVerdict.fullMomentumScalarKernelCalculated,true);
assert.equal(b.fullSpectralPatternVerdict.nonnegativeCutoffScalarKernelPrefersFiniteWaveNumber,false);
assert.equal(b.fullSpectralPatternVerdict.relativeGaugeCouplingDerivedInDeclaredConstantScalarModel,true);
assert.equal(b.fullSpectralPatternVerdict.sourceNativeStablePatternActionEstablished,false);
assert.equal(b.fullSpectralPatternVerdict.nonlinearPeriodicSaturationEstablished,false);
assert.equal(b.fullSpectralPatternVerdict.physicalPhotonCouplingAndContactTermsFixed,false);
assert.equal(b.fullSpectralPatternVerdict.physicalLatticeSpacingModulationAndGapPredicted,false);
assert.equal(b.fullSpectralPatternVerdict.allSpectralActionsRuledOut,false);
const stationarySpectral=read('evidence/data/stationary-spectral-background-v1.json');
assert.deepEqual(b.stationarySpectralBackgroundVerdict,stationarySpectral.verdict);
assert.equal(b.stationarySpectralBackgroundVerdict.stationaryNonzeroBackgroundConstructedInDeclaredRepair,true);
assert.equal(b.stationarySpectralBackgroundVerdict.conditionalFiniteMomentumPhotonResponseDerived,true);
assert.equal(b.stationarySpectralBackgroundVerdict.sourceNativeStabilizerAndBackgroundFixed,false);
assert.equal(b.stationarySpectralBackgroundVerdict.fullIncludedScalarPhotonHessianHasFiniteKInstability,false);
assert.equal(b.stationarySpectralBackgroundVerdict.nonlinearPeriodicStabilityEstablished,false);
assert.equal(b.stationarySpectralBackgroundVerdict.physicalPhotonPortsAndContactMatchingFixed,false);
assert.equal(b.stationarySpectralBackgroundVerdict.physicalLatticeSpacingModulationAndGapPredicted,false);
assert.equal(b.stationarySpectralBackgroundVerdict.allNonzeroSpectralBackgroundsRuledOut,false);
const noncentralCompeting=read('evidence/data/noncentral-competing-sector-v1.json');
assert.deepEqual(b.noncentralCompetingVerdict,noncentralCompeting.verdict);
assert.equal(b.noncentralCompetingVerdict.noncentralFullGaugeScalarOperatorCalculated,true);
assert.equal(b.noncentralCompetingVerdict.noncentralGaussianConvexRepairHasFiniteKInstability,false);
assert.equal(b.noncentralCompetingVerdict.suppliedHelicalControlHasStableEndpointsAndFiniteBand,true);
assert.equal(b.noncentralCompetingVerdict.suppliedHelicalControlHasExactStaticSaturation,true);
assert.equal(b.noncentralCompetingVerdict.sourceNativeCompetingCoefficientAndStateFixed,false);
assert.equal(b.noncentralCompetingVerdict.physicalNonlinearPatternAndPhotonResponsePredicted,false);
assert.equal(b.noncentralCompetingVerdict.physicalLatticeSpacingModulationAndGapPredicted,false);
assert.equal(b.noncentralCompetingVerdict.allNoncentralOrCompetingInteractionsRuledOut,false);
const adsTidal=read('evidence/data/ads-tidal-response-v1.json');
assert.deepEqual(b.adsTidalVerdict,adsTidal.verdict);
assert.deepEqual(b.adsTidalVerdict,{
 exactMatchedBulkTidalResidualZero:true,
 independentPhysicalMeasurement:false,
 physicalAdmission:false,
 boundaryChargeEquivalenceTested:false,
 connectionSensitiveMatterTested:false
});
const adsBoundary=read('evidence/data/ads-boundary-charges-v1.json');
assert.equal(adsBoundary.evidenceFamily,adsTidal.evidenceFamily);
assert.equal(adsBoundary.sourceRecord,'evidence/data/ads-tidal-response-v1.json');
assert.deepEqual(b.adsBoundaryChargeVerdict,adsBoundary.verdict);
assert.deepEqual(b.adsBoundaryChargeVerdict,{
 exactMatchedDirichletWallChargeResidualZero:true,
 eachWallHasNonzeroVacuumSubtractedEnergyForPositivePulse:true,
 independentConnectionOrFrameChargesCompared:false,
 independentPhysicalMeasurement:false,
 physicalAdmission:false
});
console.log(JSON.stringify({passed:true,artifacts:seen.size,localLinks:links,
 scope:'Packet integrity and retained status boundaries; not a fresh spectral solve or physical admission'},null,2));

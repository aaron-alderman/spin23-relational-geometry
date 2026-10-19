import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import test from "node:test";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { validateResearchStrike } from "./compile-research-strike.mjs";

const here = dirname(fileURLToPath(import.meta.url));
const parse = (name) => JSON.parse(readFileSync(resolve(here, name), "utf8"));
const method = parse("meta2-research-process.json");
const instance = parse("d02-support-stratified-schur-strike.json");
const clone = (value) => structuredClone(value);

test("D-02 is a complete option-preserving lightning strike", () => {
  const result = validateResearchStrike(method, instance);
  assert.equal(result.foundationCount, 4);
  assert.equal(result.requiredLayerCount, 8);
  assert.equal(result.symmetryCount, 6);
  assert.equal(result.optionPointCount, 4);
  assert.equal(result.retainedOptionCount, 15);
  assert.equal(result.strikeLinkCount, 9);
  assert.equal(result.portfolioRoleCount, 4);
});

test("layer collapse fails closed", () => {
  const bad = clone(instance);
  bad.layerLedgers = bad.layerLedgers.filter(({ layer }) => layer !== "physical");
  assert.throws(() => validateResearchStrike(method, bad), /every required layer/);
});

test("a preferred answer cannot erase its alternatives", () => {
  const bad = clone(instance);
  bad.optionPoints[0].options = [bad.optionPoints[0].options[0]];
  assert.throws(() => validateResearchStrike(method, bad), /collapsed to one path/);
});

test("an incomplete symmetry record fails closed", () => {
  const bad = clone(instance);
  delete bad.symmetries[0].anomalyOrObstruction;
  assert.throws(() => validateResearchStrike(method, bad), /missing anomalyOrObstruction/);
});

test("a lightning link without a falsifier fails closed", () => {
  const bad = clone(instance);
  bad.lightningStrike.links[4].falsifier = "";
  assert.throws(() => validateResearchStrike(method, bad), /lacks necessity, closure or falsifier/);
});

test("a broken lightning chain fails closed", () => {
  const bad = clone(instance);
  bad.lightningStrike.links[5].from = "an unrelated object";
  assert.throws(() => validateResearchStrike(method, bad), /strike chain breaks/);
});

test("authority cannot silently upgrade", () => {
  const bad = clone(instance);
  bad.authority.entails = true;
  assert.throws(() => validateResearchStrike(method, bad));
});

test("method foundation drift fails closed", () => {
  const badMethod = clone(method);
  badMethod.existingFoundations[0].sha256 = "0".repeat(64);
  assert.throws(() => validateResearchStrike(badMethod, instance), /method foundation drift/);
});

test("the D-02 local strike establishes its positive and negative boundaries", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-local-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-execution-receipt.json");
  const result = parse("generated/d02-execution-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.disposition.globalAcrossRankChangeLaw, "split-into-stratum-specific-calculi");
  assert.equal(result.results.wallDecoration.bulkIndexStatus, "not-determined-by-projected-response");
});

test("the final docket retains the Sourcery rejection receipts and split disposition", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d02-strike.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d02-final-docket.json");
  assert.equal(docket.disposition, "retain-local-law-split-global-rank-change-law");
  assert.equal(docket.lightningLinks.length, 9);
  assert.equal(docket.lightningLinks.find(({ id }) => id === "LS7").status, "split-to-typed-preserve-loss-refuse-matrix");
  assert.equal(docket.authority.automaticCorpusAdmission, false);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});

test("valuation and normal-direction data repair the bounded zero-jet ambiguity", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-valuation-gluing.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-valuation-gluing-receipt.json");
  const result = parse("generated/d02-valuation-gluing-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.multiParameter.radialValuationSufficient, false);
  assert.equal(result.limits.zeroJetResolvedForBoundedLeadingOrderClass, true);
  assert.equal(result.limits.finiteJetResolvesFullGermUniformly, false);
});

test("the full meromorphic correction closes unequal-order non-diagonal analytic crossings", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-meromorphic-filtration.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-meromorphic-filtration-receipt.json");
  const result = parse("generated/d02-meromorphic-filtration-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.unequalOrderNonDiagonalFixture.passiveAfterElimination, true);
  assert.equal(result.theoremCandidate.decisionRule.poleInCorrection, "retain the interior or refuse elimination");
  assert.equal(result.fixedDecorationCounterexample.finitePartFixtures.length, 3);
});

test("the arc-groupoid audit exhausts the declared finite-dimensional analytic scope", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-exhaustion-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-bounded-exhaustion-receipt.json");
  const audit = parse("generated/d02-bounded-exhaustion-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(audit.strongestFixedDecorationCounterexample.finiteJetCounterexamples.length, 6);
  assert.equal(audit.boundedExhaustion.everyInScopeBranchHasDisposition, true);
  assert.equal(audit.boundedExhaustion.unresolvedBoundedDiscriminantThatCanChangeDisposition, false);
});

test("the superseding exhaustion docket retains admitted review and explicit frontiers", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d02-exhaustion.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d02-exhaustion-docket.json");
  assert.equal(docket.boundedExhaustion.achieved, true);
  assert.deepEqual(docket.boundedExhaustion.remainingInScopeDiscriminants, []);
  assert.equal(docket.admittedReview.positiveCandidateSteps.length, 1);
  assert.equal(docket.admittedReview.invalidRuleIds.length, 3);
  assert.equal(docket.externalFrontiers.length, 4);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});

test("the bounded-operator strike separates range, topology and Schatten gates", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-bounded-operator-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-bounded-operator-receipt.json");
  const result = parse("generated/d02-bounded-operator-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.closedRangeRequired, false);
  assert.equal(result.dispositions.normConvergenceAutomatic, false);
  assert.equal(result.dispositions.traceMeasureRequiresSchattenDecoration, true);
  assert.equal(result.essentialSpectrumFixture.spectralCases.length, 4);
});

test("the operator topology strike preserves noncommuting covariance and endpoint path data", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-operator-topology-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-operator-topology-receipt.json");
  const result = parse("generated/d02-operator-topology-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.noncommutingFixture.directFactorizedError < 1e-10, true);
  assert.equal(result.stratificationUpgrade.requiredCoordinates.length, 6);
  assert.equal(result.essentialSpectrumTopologyCounterexample.essentialPaths.frozen.normStable, false);
});

test("the operator measure strike keeps the residue cone and convergence topologies distinct", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-operator-measure-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-operator-measure-receipt.json");
  const result = parse("generated/d02-operator-measure-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.finiteProbeNoGo.finiteProbeCounterexamples.length, 4);
  assert.equal(result.topologyNoGo.weakOnlyWitnesses.every(({ strongErrorOnEveryUnitVector }) => strongErrorOnEveryUnitVector === 0.5), true);
  assert.equal(result.topologyNoGo.hierarchy.length, 4);
});

test("operator Harnack comparability fixes the dissipative range class across frequency", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-operator-harnack-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-operator-harnack-receipt.json");
  const result = parse("generated/d02-operator-harnack-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.oneBasePointDeterminesSquareRootRangeClass, true);
  assert.equal(result.dispositions.fullComplexFactorizationAutomatic, false);
  assert.equal(result.diagonalWitness.comparabilitySamples.length, 4);
});

test("the bounded-operator audit exhausts every declared interior Hilbert-space branch", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-operator-exhaustion-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-bounded-operator-exhaustion-receipt.json");
  const audit = parse("generated/d02-bounded-operator-exhaustion-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(audit.dispatcher.length, 5);
  assert.equal(audit.requiredOperatorStratum.length, 8);
  assert.equal(audit.boundedExhaustion.everyInScopeBranchHasDisposition, true);
  assert.equal(audit.boundedExhaustion.unresolvedInScopeDiscriminantThatCanChangeDisposition, false);
});

test("the final operator docket retains governed review and bounded exhaustion", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d02-operator-exhaustion.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d02-bounded-operator-exhaustion-docket.json");
  assert.equal(docket.boundedExhaustion.achieved, true);
  assert.deepEqual(docket.boundedExhaustion.remainingInScopeDiscriminants, []);
  assert.equal(docket.findings.length, 12);
  assert.equal(docket.requiredOperatorStratum.length, 8);
  assert.equal(docket.admittedReview.invalidRuleIds.length, 4);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});

test("the boundary measure strike separates density, atoms and singular-continuous mass", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-boundary-measure-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-boundary-measure-receipt.json");
  const result = parse("generated/d02-boundary-measure-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.noBoundedDensityFixture.densityGrowth.at(-1).boundaryDensityNorm, 200);
  assert.equal(result.atomTopologyFixture.atomAtZero, 0);
  assert.equal(result.singularContinuousFixture.singularContinuousMass, 1);
});

test("boundary Schur elimination requires multiplicative topology and uniform inverse control", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-boundary-schur-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-boundary-schur-receipt.json");
  const result = parse("generated/d02-boundary-schur-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.densityFixture.identityError < 1e-10, true);
  assert.equal(result.dispositions.weakBoundaryCommutesWithSchur, false);
  assert.equal(result.dispositions.uniformInverseBoundDispensable, false);
});

test("boundary approach geometry separates nontangential limits from tangential spike paths", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-boundary-approach-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-boundary-approach-receipt.json");
  const result = parse("generated/d02-boundary-approach-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.arbitraryTangentialPromotionAdmissible, false);
  assert.equal(result.dispositions.approachGeometryRequiredDecoration, true);
  assert.equal(result.dispositions.genericBoundaryTheoremImpliesUniformLAP, false);
});

test("the boundary audit disposes every bounded real-axis discriminant without collapsing layers", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d02-boundary-exhaustion-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d02-boundary-exhaustion-receipt.json");
  const audit = parse("generated/d02-boundary-exhaustion-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(audit.dispatcher.length, 10);
  assert.equal(audit.requiredBoundaryDecorations.length, 10);
  assert.equal(audit.boundedBoundaryExhaustion.everyTechnicallyActionableDiscriminantHasDisposition, true);
  assert.equal(audit.boundedBoundaryExhaustion.unresolvedInScopeDiscriminantThatCanChangeDisposition, false);
});

test("the final boundary docket retains governed review and bounded real-axis exhaustion", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d02-boundary-exhaustion.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d02-bounded-boundary-exhaustion-docket.json");
  assert.equal(docket.boundedBoundaryExhaustion.achieved, true);
  assert.deepEqual(docket.boundedBoundaryExhaustion.remainingInScopeDiscriminants, []);
  assert.equal(docket.findings.length, 16);
  assert.equal(docket.requiredBoundaryDecorations.length, 10);
  assert.equal(docket.admittedReview.invalidRuleIds.length, 6);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});

test("the D-03 free metric-Higgs rung is a spectral ray with a shear-invariant innovation gate", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-free-metric-higgs-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-free-metric-higgs-receipt.json");
  const result = parse("generated/d03-free-metric-higgs-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.freeHiggsProducesFullH2Carrier, false);
  assert.equal(result.dispositions.freeHiggsProducesSpectralRay, true);
  assert.equal(result.dispositions.innovationIsSourceShearInvariant, true);
  assert.equal(result.interactionWitness.innovation > 0, true);
});

test("the D-03 Abelian anomaly opens the ray but remains in a fixed spectral plane", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-abelian-anomaly-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-abelian-anomaly-receipt.json");
  const result = parse("generated/d03-abelian-anomaly-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.traceAnomalyCanCreatePositiveInnovation, true);
  assert.equal(result.dispositions.leadingDecoupledAnomalyCreatesFullH2Family, false);
  assert.equal(result.fixture.maximumTripleSpanDeterminant < 1e-9, true);
  assert.equal(Math.abs(result.mixedDirectionWitness.fullSpanDeterminant) > 0.1, true);
});

test("the D-03 projective spectrum spans H2 exactly at three distinct real source ratios", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-projective-spectrum-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-projective-spectrum-receipt.json");
  const result = parse("generated/d03-projective-spectrum-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.threeDistinctRealSourceRatiosSpanH2, true);
  assert.equal(result.dispositions.threeNamedSectorsAutomaticallySpanH2, false);
  assert.equal(Math.abs(result.candidateStateCensus.coordinateDeterminant) > 1e-6, true);
  assert.equal(Math.abs(result.collapsedSectorCounterexample.coordinateDeterminant) < 1e-12, true);
});

test("the D-03 checkpoint preserves the ray-plane-carrier ladder without a physical overclaim", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-metric-higgs-checkpoint.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-metric-higgs-checkpoint-receipt.json");
  const checkpoint = parse("generated/d03-metric-higgs-checkpoint.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(checkpoint.ladder.length, 5);
  assert.equal(checkpoint.invalidPromotions.length, 6);
  assert.equal(checkpoint.status.physicalH2CarrierEstablished, false);
  assert.equal(checkpoint.status.spin23ResponseSymmetryEstablished, false);
  assert.equal(checkpoint.status.continueCampaign, true);
});

test("the D-03 mixed scalar cut generically supplies the third projective direction", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-mixed-scalar-cut-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-mixed-scalar-cut-receipt.json");
  const result = parse("generated/d03-mixed-scalar-cut-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.genericQuarticRunningSuppliesThirdProjectiveDirection, true);
  assert.equal(result.dispositions.threeLeadingThresholdClassesSpanH2, true);
  assert.equal(result.dispositions.fullSpanEstablishesSpin23Covariance, false);
  assert.equal(Math.abs(result.fixedPointCounterexample.determinant) < 1e-12, true);
});

test("the D-03 thermal control separates full span from an open physical image", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-thermal-control-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-thermal-control-receipt.json");
  const result = parse("generated/d03-thermal-control-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.thermalChannelsCanSpanH2, true);
  assert.equal(result.dispositions.independentChannelWeightsGiveOpenSubcone, true);
  assert.equal(result.dispositions.frequencyScanAloneProvesOpenImage, false);
  assert.equal(result.controlMap.jacobianDeterminant > 1, true);
});

test("the D-03 scheme audit preserves projective rank and refuses a vacuum open image", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-scheme-open-image-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-scheme-open-image-receipt.json");
  const audit = parse("generated/d03-scheme-open-image-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(audit.dispositions.spectralRankSchemeStable, true);
  assert.equal(audit.dispositions.brstCompletionFinishedBySimplifiedStrike, false);
  assert.equal(audit.dispositions.realSymmetricCarrierAutomatic, false);
  assert.equal(audit.dispositions.vacuumFrequencyFamilyHasOpenThreeDimensionalImage, false);
});

test("the D-03 electroweak audit demotes the carrier and retains an anomaly observable", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d03-electroweak-closure-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d03-electroweak-closure-receipt.json");
  const audit = parse("generated/d03-electroweak-closure-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(audit.transformationClosure.counterexample.supportClosed, false);
  assert.equal(audit.decisiveDispositions.fullH2SpanIsDistinctiveEvidenceForSpin23, false);
  assert.equal(audit.decisiveDispositions.exactA2BridgeEstablished, false);
  assert.equal(audit.decisiveDispositions.constrainedObservableIdentified, true);
});

test("the final D-03 docket exhausts the bounded response-geometry campaign", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d03-response-geometry.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d03-response-geometry-exhaustion-docket.json");
  assert.equal(docket.exhaustion.everyTechnicallyActionableGateHasDisposition, true);
  assert.equal(docket.exhaustion.unresolvedInScopeGateThatCanChangeCurrentClassification, false);
  assert.equal(docket.sourceryReview.positiveCandidateCount, 1);
  assert.equal(docket.sourceryReview.invalidRuleIds.length, 3);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});

test("the D-04 BRST audit separates particle-cut loops from beta-function loops", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d04-brst-one-loop-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d04-brst-one-loop-receipt.json");
  const audit = parse("generated/d04-brst-one-loop-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(audit.topologyAudit.find(({ id }) => id === "four-particle-cut-effective-form-factors").loops, 3);
  assert.equal(audit.perturbativeOrder.quarticAnomalyInterferenceOnFourParticleCut.uniformOrder, 4);
  assert.equal(audit.dispositions.originalQTestableInOneLoopSpectralMatrix, false);
});

test("the D-04 beta-vector identity survives improvement and operator mixing", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d04-beta-vector-identity.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d04-beta-vector-identity-receipt.json");
  const result = parse("generated/d04-beta-vector-identity.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.betaVectorContractionBasisInvariant, true);
  assert.equal(result.dispositions.quarticOnlyQProtectedByBrst, false);
  assert.equal(result.dispositions.numericalPredictionAvailableWithoutPhysicalFormFactors, false);
});

test("the final D-04 docket closes one-loop scope without fabricating trace integrals", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d04-brst-anomaly-strike.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d04-brst-anomaly-exhaustion-docket.json");
  assert.equal(docket.exhaustion.everyTechnicallyActionableGateInDeclaredOneLoopScopeHasDisposition, true);
  assert.equal(docket.exhaustion.unresolvedOneLoopDiscriminantThatCanRescueQ, false);
  assert.equal(docket.sourceryReview.positiveCandidateCount, 1);
  assert.equal(docket.sourceryReview.invalidRuleIds.length, 4);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});

test("the D-05 physical two-body form factors give a generic rank-two beta response", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d05-two-body-form-factor-strike.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d05-two-body-form-factor-receipt.json");
  const result = parse("generated/d05-two-body-form-factor-result.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.twoBodyPhysicalResponseMatrixFullRankGenerically, true);
  assert.equal(result.dispositions.fourBodyCutRequiredForBetaVectorTomography, false);
  assert.equal(result.dispositions.oneLoopUniformInnovationEstablished, false);
});

test("the D-05 inclusive scan retains mean and innovation information", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d05-inclusive-tomography-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d05-inclusive-tomography-receipt.json");
  const result = parse("generated/d05-inclusive-tomography-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.inclusiveSumErasesAllTomographicInformation, false);
  assert.equal(result.dispositions.twoEnergyInclusiveScanCanRecoverTwoBetas, true);
  assert.equal(result.dispositions.goldstonesArePhysicalPositiveSpectralStates, false);
});

test("the D-05 conditioning audit preserves signal but not a naked condition number", () => {
  execFileSync(process.execPath, [resolve(here, "execute-d05-conditioning-audit.mjs")], { encoding: "utf8" });
  const receipt = parse("generated/d05-conditioning-receipt.json");
  const result = parse("generated/d05-conditioning-audit.json");
  assert.equal(receipt.passed, true);
  assert.ok(Object.values(receipt.checks).every(Boolean));
  assert.equal(result.dispositions.rankDependsOnOperatorBasis, false);
  assert.equal(result.dispositions.betaSignalDependsOnOperatorBasis, false);
  assert.equal(result.dispositions.conditionNumberIsBasisIndependentWithoutMetric, false);
});

test("the final D-05 docket closes the two-body rank campaign", () => {
  execFileSync(process.execPath, [resolve(here, "finalize-d05-two-body-tomography.mjs")], { encoding: "utf8" });
  const docket = parse("generated/d05-two-body-tomography-exhaustion-docket.json");
  assert.equal(docket.exhaustion.everyDeclaredFormFactorRankAndConditioningGateHasDisposition, true);
  assert.equal(docket.exhaustion.unresolvedInScopeDiscriminantThatCanChangeRankConclusion, false);
  assert.equal(docket.sourceryReview.positiveCandidateCount, 1);
  assert.equal(docket.sourceryReview.invalidRuleIds.length, 5);
  assert.match(docket.docketSha256, /^[a-f0-9]{64}$/);
});






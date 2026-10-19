import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const budget = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-effect-window-budget.json", import.meta.url), "utf8"));
const protocol = JSON.parse(await readFile(new URL("../../evidence/data/spin23-a11-observable-protocol.json", import.meta.url), "utf8"));

assert.equal(budget.schema, "spin23.a11-effect-window-budget/1");
assert.equal(budget.parentProtocol, "evidence/data/spin23-a11-observable-protocol.json");
assert.equal(budget.claimBoundary.microscopicEffectSizeDerived, false);
assert.equal(budget.claimBoundary.physicalFrequencyWindowDerived, false);
assert.equal(budget.claimBoundary.physicalDataAvailable, false);
assert.equal(budget.claimBoundary.a11Passed, false);
assert.equal(budget.claimBoundary.physicalAdmission, false);

const dot = (x, y) => x.reduce((sum, value, index) => sum + value * y[index], 0);
const norm = x => Math.hypot(...x);
const add = (x, y) => x.map((value, index) => value + y[index]);
const scale = (a, x) => x.map(value => a * value);
const coords = C => [C[0][0], C[1][1], Math.SQRT2 * C[0][1]];

// Balanced Z3 harmonics exactly reject every sector-independent contact vector.
const angles = protocol.design.sectorAngles;
const cosineWeights = angles.map(theta => (2 / 3) * Math.cos(theta));
const sineWeights = angles.map(theta => (2 / 3) * Math.sin(theta));
assert(Math.abs(cosineWeights.reduce((x, y) => x + y, 0)) < 1e-14);
assert(Math.abs(sineWeights.reduce((x, y) => x + y, 0)) < 1e-14);
const contact = coords(protocol.syntheticFixtures.commonContactMatrix);
const contactCosine = cosineWeights.reduce((sum, weight) => add(sum, scale(weight, contact)), [0, 0, 0]);
const contactSine = sineWeights.reduce((sum, weight) => add(sum, scale(weight, contact)), [0, 0, 0]);
assert(norm(contactCosine) < 1e-14);
assert(norm(contactSine) < 1e-14);

// Two-by-two symmetric eigenvalues and the sufficient Weyl positivity budget.
function eigenvalues(C) {
  const center = (C[0][0] + C[1][1]) / 2;
  const radius = Math.hypot((C[0][0] - C[1][1]) / 2, C[0][1]);
  return [center - radius, center + radius];
}
const baseline = budget.positivityBudget.syntheticBaseline;
const baselineEigenvalues = eigenvalues(baseline);
const baselineNorm = norm(coords(baseline));
assert(Math.abs(baselineEigenvalues[0] - budget.positivityBudget.syntheticMinimumEigenvalue) < 1e-12);
assert(Math.abs(baselineNorm - budget.positivityBudget.syntheticFrobeniusNorm) < 1e-12);
assert(Math.abs(baselineEigenvalues[0] / baselineNorm - budget.positivityBudget.syntheticSufficientDimensionlessCeiling) < 1e-12);
assert(budget.syntheticPowerExample.targetDimensionlessAmplitude < budget.positivityBudget.syntheticSufficientDimensionlessCeiling);

// For even central chi-square degrees of freedom, use the exact finite survival sum.
function centralChiSquareCdfEven(x, halfDegrees) {
  let term = 1;
  let sum = 1;
  for (let j = 1; j < halfDegrees; j += 1) {
    term *= (x / 2) / j;
    sum += term;
  }
  return 1 - Math.exp(-x / 2) * sum;
}

// Poisson-mixture representation of a noncentral chi-square CDF with two degrees of freedom.
function noncentralChiSquare2Cdf(x, noncentrality) {
  let poissonWeight = Math.exp(-noncentrality / 2);
  let cdf = 0;
  for (let k = 0; k < 2000; k += 1) {
    cdf += poissonWeight * centralChiSquareCdfEven(x, k + 1);
    poissonWeight *= (noncentrality / 2) / (k + 1);
    if (poissonWeight < 1e-15 && k > noncentrality / 2 + 20) break;
  }
  return cdf;
}

function requiredNoncentrality(criticalValue, power) {
  let low = 0;
  let high = 500;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const middle = (low + high) / 2;
    if (1 - noncentralChiSquare2Cdf(criticalValue, middle) >= power) high = middle;
    else low = middle;
  }
  return high;
}

const frequency = budget.frequencyWindow;
assert.equal(frequency.familywiseAlpha, protocol.thresholds.familywiseAlpha);
assert.equal(frequency.minimumPassingResolutionElements, protocol.identifiability.minimumFrequenciesPassing);
assert.equal(frequency.minimumIndependentReplications, protocol.identifiability.minimumIndependentReplicationsPassing);
const perElementAlpha = frequency.familywiseAlpha / frequency.windowResolutionElements;
const criticalValue = -2 * Math.log(perElementAlpha);
assert.equal(perElementAlpha, frequency.perElementAlpha);
assert(Math.abs(criticalValue - frequency.chiSquare2CriticalValue) < 1e-12);

const example = budget.syntheticPowerExample;
const effectiveSignal = example.minimumNuisanceRetention * example.targetDimensionlessAmplitude - example.maximumWorstCaseRelativeBias;
assert(Math.abs(effectiveSignal - example.effectiveWorstCaseSignal) < 1e-15);
const lambda90 = requiredNoncentrality(criticalValue, example.singleEventPower);
assert(Math.abs(lambda90 - example.singleEventRequiredNoncentrality) < 1e-10);
const runs90 = Math.ceil(lambda90 * 2 * example.singleRunProjectedRelativeStandardDeviation ** 2 / (3 * effectiveSignal ** 2));
assert.equal(runs90, example.singleEventMinimumRunsPerSector);

// Four required pass events = two resolution elements times two replications.
// Allocating beta/4 to each gives a dependence-robust union-bound guarantee.
assert.equal(example.requiredPassEvents, frequency.minimumPassingResolutionElements * frequency.minimumIndependentReplications);
const perEventPower = 1 - (1 - example.jointPowerTarget) / example.requiredPassEvents;
assert(Math.abs(perEventPower - example.unionBoundPerEventPower) < 1e-15);
const lambdaJoint = requiredNoncentrality(criticalValue, perEventPower);
assert(Math.abs(lambdaJoint - example.jointGuaranteeRequiredNoncentrality) < 1e-10);
const runsJoint = Math.ceil(lambdaJoint * 2 * example.singleRunProjectedRelativeStandardDeviation ** 2 / (3 * effectiveSignal ** 2));
assert.equal(runsJoint, example.jointGuaranteeMinimumRunsPerSectorPerReplication);
const achievedLambda = 3 * runsJoint * effectiveSignal ** 2 / (2 * example.singleRunProjectedRelativeStandardDeviation ** 2);
const achievedPerEventPower = 1 - noncentralChiSquare2Cdf(criticalValue, achievedLambda);
const jointUnionLowerBound = 1 - example.requiredPassEvents * (1 - achievedPerEventPower);
assert(Math.abs(achievedPerEventPower - example.jointGuaranteeActualPerEventPower) < 1e-12);
assert(Math.abs(jointUnionLowerBound - example.jointGuaranteeLowerBound) < 1e-12);
assert(jointUnionLowerBound >= example.jointPowerTarget);
assert.equal(example.totalSectorRunsAcrossTwoReplications, runsJoint * protocol.design.holonomySectors.length * frequency.minimumIndependentReplications);

for (const row of example.noiseScalingTable) {
  const requiredRuns = Math.ceil(lambdaJoint * 2 * row.singleRunProjectedRelativeStandardDeviation ** 2 / (3 * effectiveSignal ** 2));
  assert.equal(requiredRuns, row.minimumRunsPerSectorPerReplication);
}

// Distinguish power to reject zero from power to cross the nonzero protocol threshold.
const thresholdCaution = example.protocolThresholdCrossingCaution;
const standardError = Math.sqrt(2 / 3) * example.singleRunProjectedRelativeStandardDeviation / Math.sqrt(runsJoint);
assert(Math.abs(standardError - thresholdCaution.at144RunsStandardError) < 1e-12);
const pointThresholdNoncentrality = requiredNoncentrality((protocol.thresholds.minimumPositiveTransverseAmplitude / standardError) ** 2, 0.9);
const effectiveAmplitudeForCrossing = standardError * Math.sqrt(pointThresholdNoncentrality);
const rawAmplitudeForCrossing = (effectiveAmplitudeForCrossing + example.maximumWorstCaseRelativeBias) / example.minimumNuisanceRetention;
assert(Math.abs(rawAmplitudeForCrossing - thresholdCaution.rawTrueAmplitudeFor90PercentChanceToExceedPointThreshold) < 1e-12);

// Bias must not consume all retained signal; otherwise no finite n can detect the target.
assert(example.maximumWorstCaseRelativeBias < example.minimumNuisanceRetention * example.targetDimensionlessAmplitude);
assert.equal(Object.values(budget.nuisanceBudget.biasBreakdown).reduce((x, y) => x + y, 0), budget.nuisanceBudget.maximumWorstCaseRelativeBias);
assert.match(budget.syntheticPowerExample.scope, /two particular preregistered resolution elements/u);
assert.match(budget.uncertaintyAccounting.normalization, /delta method or a run-level bootstrap/u);
assert.match(budget.uncertaintyAccounting.correlatedFrequencies, /resolution elements/u);
assert(budget.decisionThresholds.advance.length >= 7);
assert(budget.decisionThresholds.poweredNull.length >= 3);

console.log(JSON.stringify({
  passed: true,
  budgetId: budget.budgetId,
  familywiseAlpha: frequency.familywiseAlpha,
  perElementAlpha,
  chiSquare2CriticalValue: criticalValue,
  singleEventRunsPerSector: runs90,
  jointGuaranteeRunsPerSectorPerReplication: runsJoint,
  totalSectorRunsAcrossTwoReplications: example.totalSectorRunsAcrossTwoReplications,
  jointPowerLowerBound: jointUnionLowerBound,
  protocolPointThreshold: protocol.thresholds.minimumPositiveTransverseAmplitude,
  rawAmplitudeFor90PercentThresholdCrossing: rawAmplitudeForCrossing,
  physicalAdmission: budget.claimBoundary.physicalAdmission
}, null, 2));

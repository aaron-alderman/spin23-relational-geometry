#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-e6-threshold-shared-scale-no-go.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.e6-threshold-shared-scale-no-go/1");

const pi = Math.PI;
const close = (actual, expected, relative = 1e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual - expected) <= relative * scale,
    "expected " + expected + ", received " + actual);
};
const runDown = (alphaInverse, b0, high, low) =>
  alphaInverse - b0/(2*pi)*Math.log(high/low);
const lambdaFrom = (scale, alphaInverse, b0) =>
  scale*Math.exp(-2*pi*alphaInverse/b0);

const toy = evidence.e6ToyDescent;
assert.equal(toy.colorIndexAccounting.oneStandardModelFamilySumWeylT, 2);
assert.equal(toy.colorIndexAccounting.oneVectorlikeTripletPairSumWeylT, 1);
close(11-(2/3)*(3*2), toy.colorIndexAccounting.threeFamiliesSixDiracFlavorsB0);
close(11-(2/3)*(3*2+3*1), toy.colorIndexAccounting.threeFamiliesPlusThreeExoticDiracTripletsB0);

const input = evidence.benchmark.inputs;
const scales = [input.M_U_GeV, input.M_X_GeV, input.mTop_GeV, input.mBottom_GeV, input.mCharm_GeV];
let alphaInverse = input.alphaUInverse;
for (let i=0; i<evidence.benchmark.segments.length; i++) {
  const segment = evidence.benchmark.segments[i];
  alphaInverse = runDown(alphaInverse, segment.b0, scales[i], scales[i+1]);
  close(alphaInverse, segment.alphaInverseAtLowerEnd);
}
const lambda3 = lambdaFrom(input.mCharm_GeV, alphaInverse, 9);
close(lambda3, evidence.benchmark.Lambda3_GeV);
assert.ok(lambda3 > 0 && lambda3 < input.mCharm_GeV);

const calculateLambda3 = (alphaUInverse, exoticThreshold) => {
  let inverse = runDown(alphaUInverse, 5, input.M_U_GeV, exoticThreshold);
  inverse = runDown(inverse, 7, exoticThreshold, input.mTop_GeV);
  inverse = runDown(inverse, 23/3, input.mTop_GeV, input.mBottom_GeV);
  inverse = runDown(inverse, 25/3, input.mBottom_GeV, input.mCharm_GeV);
  return lambdaFrom(input.mCharm_GeV, inverse, 9);
};

for (const point of evidence.sensitivity.alphaUInverseScanAtMX1e12GeV) {
  close(calculateLambda3(point.alphaUInverse, input.M_X_GeV), point.Lambda3_GeV);
}
for (const point of evidence.sensitivity.exoticThresholdScanAtAlphaUInverse42) {
  close(calculateLambda3(input.alphaUInverse, point.M_X_GeV), point.Lambda3_GeV);
}
close(evidence.sensitivity.analyticDerivatives.dLnLambda3_dAlphaUInverse, -2*pi/9);
close(evidence.sensitivity.analyticDerivatives.dLnLambda3_dLnMX, (7-5)/9);

const split = evidence.sensitivity.nondegenerateExoticMassLaw;
const exoticMassContribution = split.threeMasses_GeV
  .reduce((sum, mass) => sum + (2/27)*Math.log(mass/input.M_X_GeV), 0);
close(Math.exp(exoticMassContribution), 1);
close(split.threeMasses_GeV.reduce((product, mass) => product*mass, 1)**(1/3), split.geometricMean_GeV);
close(split.Lambda3_GeV, lambda3);
const finite = evidence.sensitivity.finiteMatchingShiftLaw;
close(finite.dLnLambda3_dDelta, -2*pi/9);
close(finite.multiplicativeFactorForDeltaPlusOne, Math.exp(-2*pi/9));
close(finite.multiplicativeFactorForDeltaMinusOne, Math.exp(2*pi/9));

const requiredAlphaInverse = (targetLambda, exoticThreshold) => {
  const zeroBoundaryLambda = calculateLambda3(0, exoticThreshold);
  return (9/(2*pi))*Math.log(zeroBoundaryLambda/targetLambda);
};
for (const point of evidence.sensitivity.alphaUInverseRequiredForLambda3_0p2GeV) {
  close(requiredAlphaInverse(0.2, point.M_X_GeV), point.alphaUInverse);
  close(calculateLambda3(point.alphaUInverse, point.M_X_GeV), 0.2);
}

const coincidence = evidence.spin5Su3Coincidence;
assert.equal(coincidence.pureYangMills.C_A_Spin5, coincidence.pureYangMills.C_A_SU3);
assert.equal(coincidence.pureYangMills.b0Both, 11);
const shared = coincidence.pureYangMills.sharedBoundary;
close(lambdaFrom(shared.M_GeV, shared.alphaInverse, 11), coincidence.pureYangMills.LambdaBoth_GeV);
close(lambdaFrom(shared.M_GeV, shared.alphaInverse, 31/3), coincidence.matterCounterexample.SU3.Lambda_GeV);
close(lambdaFrom(shared.M_GeV, shared.alphaInverse, 29/3), coincidence.matterCounterexample.Spin5.Lambda_GeV);
close(
  coincidence.matterCounterexample.Spin5.Lambda_GeV/coincidence.matterCounterexample.SU3.Lambda_GeV,
  coincidence.matterCounterexample.LambdaSpin5OverLambdaSU3,
);
assert.equal(coincidence.embeddingIndexAudit.directEmbedding, false);

const modulus = evidence.sharedModulusTest;
const scaleRatio = (g, xi, b0) => xi**(-0.5)*Math.exp(-8*pi*pi/(b0*g*g));
close(scaleRatio(modulus.benchmark.gAtV, modulus.benchmark.xi, modulus.benchmark.b0), modulus.benchmark.ratio);
for (const point of modulus.gScanAtXi1) close(scaleRatio(point.gAtV, 1, modulus.benchmark.b0), point.ratio);
for (const point of modulus.xiScanAtG0p5) close(scaleRatio(0.5, point.xi, modulus.benchmark.b0), point.ratio);
close(modulus.logSensitivityAtG0p5.dLnRatio_dg, 16*pi*pi/(11*0.5**3));
close(modulus.logSensitivityAtG0p5.dLnRatio_dLnXi, -0.5);
assert.match(modulus.decision, /does not predict/);
assert.match(evidence.exhaustionBoundary.programmeDecision, /does not predict Lambda_QCD/);

console.log("Spin(2,3) E6 threshold/shared-scale audit: PASS");
console.log("  declared three-27 toy: Lambda_3=" + lambda3.toFixed(6) + " GeV for alpha_U^-1=42, M_X=10^12 GeV");
console.log("  alpha_U^-1 +/-1 changes Lambda_3 by about a factor of two");
console.log("  shifting M_X through six decades changes Lambda_3 by a factor of 21.54");
console.log("  split exotic thresholds reduce to their geometric mean at one loop; an unfixed Delta=+/-1 adds a factor-two ambiguity");
console.log("  one allowed matter choice splits the Spin(5)/SU(3) scale ratio to " + coincidence.matterCounterexample.LambdaSpin5OverLambdaSU3.toFixed(6));
console.log("  shared-modulus ratio at g=0.5, xi=1: " + modulus.benchmark.ratio.toExponential(6) + "; g and xi remain free");

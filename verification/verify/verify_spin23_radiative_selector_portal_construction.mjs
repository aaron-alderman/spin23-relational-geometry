#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-radiative-selector-portal-construction.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.radiative-selector-portal-construction/1");
const close = (actual, expected, tolerance = 1e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= tolerance*scale,
    "expected " + expected + ", received " + actual);
};

const inputs = evidence.benchmarkInputs;
close(inputs.lambdaPortal, 2*Math.sqrt(inputs.lambdaS*inputs.lambdaChi));
const ray = evidence.gildenerWeinbergRay;
close(ray.nS**2, ray.nSSquared);
close(ray.nChi**2, ray.nChiSquared);
close(ray.nSSquared+ray.nChiSquared, 1);
close(ray.nSSquared/ray.nChiSquared, inputs.lambdaPortal/(2*inputs.lambdaS));

const H = ray.treeHessianOverVSquared;
close(H[0][0], inputs.lambdaPortal*ray.nChiSquared);
close(H[1][1], inputs.lambdaPortal*ray.nSSquared);
close(H[0][1], -inputs.lambdaPortal*ray.nS*ray.nChi);
close(H[1][0], H[0][1]);
close(H[0][0]+H[1][1], ray.treeEigenvaluesOverVSquared[1]);
close(H[0][0]*H[1][1]-H[0][1]**2, ray.treeEigenvaluesOverVSquared[0]);
const flatResidual = [
  H[0][0]*ray.flatDirectionEigenvector[0]+H[0][1]*ray.flatDirectionEigenvector[1],
  H[1][0]*ray.flatDirectionEigenvector[0]+H[1][1]*ray.flatDirectionEigenvector[1],
];
close(Math.hypot(...flatResidual), 0);

const loop = evidence.oneLoopPotential;
close(loop.kX, inputs.gX**2*ray.nSSquared);
close(loop.kH, inputs.lambdaPortal);
close(loop.kT, inputs.kappa*ray.nChiSquared/2);
assert.equal(loop.colorScalarRealDegrees, 6*inputs.numberColorTriplets);
const B = (3*loop.kX**2+loop.kH**2+
  loop.colorScalarRealDegrees*loop.kT**2)/(64*Math.PI**2);
const A = (3*loop.kX**2*(Math.log(loop.kX)-5/6)+
  loop.kH**2*(Math.log(loop.kH)-3/2)+
  loop.colorScalarRealDegrees*loop.kT**2*(Math.log(loop.kT)-3/2))/
  (64*Math.PI**2);
close(B, loop.B);
close(A, loop.A);
close(Math.exp((-0.5-A/B)/2), loop.vOverMuGW);
close(Math.sqrt(inputs.lambdaPortal), loop.massesOverV.heavyScalar);
close(Math.sqrt(loop.kX), loop.massesOverV.hiddenVector);
close(Math.sqrt(loop.kT), loop.massesOverV.colorThreshold);
close(Math.sqrt(8*B), loop.massesOverV.scalon);
close(-B/2, loop.vacuumEnergyOverV4);
assert.ok(B > 0);

const gravity = evidence.spin23InducedGravityMatch;
const gA = Math.sqrt(B/(6*inputs.xi*ray.nChiSquared**2));
close(gA, gravity.gA);
close(Math.sqrt(inputs.xi)*ray.nChi, gravity.planckOverV);
close(gA*ray.nChi, gravity.inverseEllOverV);
close(Math.sqrt(inputs.xi)/gA, gravity.planckTimesEll);
close(-3*gravity.inverseEllOverV**2, gravity.lambdaGravityOverV2);
close(gravity.planckOverV**2*gravity.lambdaGravityOverV2,
  gravity.einsteinVacuumEnergyOverV4);
close(gravity.einsteinVacuumEnergyOverV4, loop.vacuumEnergyOverV4);
close(gravity.inverseEllOverV/loop.massesOverV.scalon,
  gravity.inverseEllOverScalonMass);

const color = evidence.colorThresholdMatching;
assert.equal(color.bHigh, 11-inputs.numberColorTriplets/6);
assert.equal(color.bLow, 11);
assert.equal(color.deltaB, color.bLow-color.bHigh);
close(Math.sqrt(loop.kT), color.thresholdOverV);
const inverseGThresholdSquared = 1/inputs.g3AtV**2+
  color.bHigh/(8*Math.PI**2)*Math.log(color.thresholdOverV);
close(1/Math.sqrt(inverseGThresholdSquared), color.g3AtThreshold);
const lambdaFromThreshold = color.thresholdOverV*Math.exp(
  -8*Math.PI**2/(color.bLow*color.g3AtThreshold**2));
const lambdaDirect = loop.kT**(color.deltaB/(2*color.bLow))*Math.exp(
  -8*Math.PI**2/(color.bLow*inputs.g3AtV**2));
close(lambdaFromThreshold, color.lambdaYMOverV);
close(lambdaDirect, color.lambdaYMOverV);
close(color.lambdaYMOverV/gravity.planckOverV, color.lambdaYMOverMPlanck);

for (const point of color.g3Scan) {
  const predicted = loop.kT**(1/22)*Math.exp(-8*Math.PI**2/(11*point.g3AtV**2));
  close(predicted, point.lambdaYMOverV);
  close(predicted/gravity.planckOverV, point.lambdaYMOverMPlanck);
}
for (const point of color.kappaScanAtG3Point7) {
  const threshold = Math.sqrt(point.kappa*ray.nChiSquared/2);
  const predicted = threshold**(1/11)*Math.exp(-8*Math.PI**2/(11*0.7**2));
  close(threshold, point.thresholdOverV);
  close(predicted, point.lambdaYMOverV);
}

const sensitivity = evidence.logSensitivitiesOfLambdaYMOverMPlanck;
close(16*Math.PI**2/(11*inputs.g3AtV**2), sensitivity.withRespectToLogG3);
close(1/22, sensitivity.withRespectToLogKappa);
close(-1/2, sensitivity.withRespectToLogXi);
close(1/11-1, sensitivity.withRespectToLogNChi);
assert.ok(sensitivity.withRespectToLogG3 > 29);

assert.equal(evidence.gates.passedAtFiniteOneLoopBenchmark.length, 6);
assert.equal(evidence.gates.stillOpen.length, 5);
assert.match(evidence.epistemicBoundary.programmeDecision, /genuine positive/);
assert.match(evidence.epistemicBoundary.programmeDecision, /exponential color boundary/);

console.log("Spin(2,3) radiative selector-portal construction: PASS");
console.log("  GW minimum v/mu=" + loop.vOverMuGW.toFixed(6) +
  ", positive scalon mass/v=" + loop.massesOverV.scalon.toFixed(6));
console.log("  minimal backreaction derives g_A=" + gravity.gA.toFixed(8) +
  " and M_Pl ell=" + gravity.planckTimesEll.toFixed(3));
console.log("  colored scalar threshold M_T/v=" + color.thresholdOverV.toFixed(6) +
  " gives Lambda_YM/M_Pl=" + color.lambdaYMOverMPlanck.toExponential(6));
console.log("  d log(Lambda_YM/M_Pl)/d log g3=" +
  sensitivity.withRespectToLogG3.toFixed(4) + ": the exponential boundary remains");

#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-gauge-gravity-fixed-point-color-boundary.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.gauge-gravity-fixed-point-color-boundary/1");
const close = (actual, expected, tolerance = 1e-11) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= tolerance*scale,
    "expected " + expected + ", received " + actual);
};

const beta = evidence.betaSystem;
close(11/(16*Math.PI**2), beta.b);
const gaussian = evidence.gaussianGaugeFixedPoint;
assert.deepEqual(gaussian.criticalExponentsAtBenchmarkF,
  gaussian.stabilityMatrix.map((row, i) => -row[i]));
assert.ok(gaussian.criticalExponentsAtBenchmarkF.every((theta) => theta > 0));

const fp = evidence.interactingBenchmark;
const {f,c,GStar} = fp.inputs;
const x = (beta.b+Math.sqrt(beta.b**2+4*c*f*GStar))/(2*c);
close(x, fp.gStarSquared);
close(Math.sqrt(x), fp.gStar);
close(fp.gStar*(-f*GStar-beta.b*fp.gStar**2+c*fp.gStar**4), 0);
const L = 4*f*GStar+2*beta.b*x;
close(L, fp.gaugeStabilityEigenvalue);
close(-L, fp.criticalExponents[1]);
close(f*fp.gStar/(L+2), fp.criticalSurfaceSlope);
close(fp.stabilityMatrix[1][0], -f*fp.gStar);
close(fp.stabilityMatrix[1][1], L);
assert.ok(fp.criticalExponents[0] > 0);
assert.ok(fp.criticalExponents[1] < 0);
const negativeF = -0.01;
const twoTermInteractingTheta = -2*negativeF;
assert.ok(twoTermInteractingTheta > 0);
assert.match(evidence.signAndExistenceTests.cZeroFNegative, /theta_g=-2f>0/);

const flow = evidence.criticalTrajectory;
close(Math.log(1/flow.planckOverVFromClaim1612), flow.tAtV);
const gravity = (t) => 1/(1+Math.exp(-2*t));
close(gravity(flow.tAtV), flow.GAtV);

const integrateGauge = ({f: flowF, c: flowC, startT, endT, step}) => {
  const rootSquared = (beta.b+Math.sqrt(beta.b**2+4*flowC*flowF))/(2*flowC);
  const root = Math.sqrt(rootSquared);
  const eigenvalue = 4*flowF+2*beta.b*rootSquared;
  const slope = flowF*root/(eigenvalue+2);
  const gaugeBeta = (t, g) => g*(-flowF*gravity(t)-beta.b*g*g+flowC*g**4);
  let t = startT;
  let g = root+slope*(gravity(t)-1);
  let h = -Math.abs(step);
  const advance = (delta) => {
    const k1 = gaugeBeta(t,g);
    const k2 = gaugeBeta(t+delta/2,g+delta*k1/2);
    const k3 = gaugeBeta(t+delta/2,g+delta*k2/2);
    const k4 = gaugeBeta(t+delta,g+delta*k3);
    g += delta*(k1+2*k2+2*k3+k4)/6;
    t += delta;
  };
  while (t+h > endT) advance(h);
  advance(endT-t);
  return {g, root, eigenvalue};
};

const benchmarkFlow = integrateGauge({
  f,
  c,
  startT: flow.integrationStartT,
  endT: flow.tAtV,
  step: flow.integrationStepMagnitude,
});
close(benchmarkFlow.g, flow.g3AtV, 5e-10);
const hierarchy = flow.portalKT**(1/22)*
  Math.exp(-8*Math.PI**2/(11*flow.g3AtV**2))/flow.planckOverVFromClaim1612;
close(hierarchy, flow.lambdaYMOverMPlanck);

for (const point of evidence.coefficientSensitivityScan) {
  const solved = integrateGauge({
    f: point.f,
    c: point.c,
    startT: flow.integrationStartT,
    endT: flow.tAtV,
    step: flow.integrationStepMagnitude,
  });
  close(solved.root, point.gStar);
  close(-solved.eigenvalue, point.gaugeCriticalExponent);
  close(solved.g, point.g3AtV, 5e-10);
  const ratio = flow.portalKT**(1/22)*
    Math.exp(-8*Math.PI**2/(11*solved.g**2))/flow.planckOverVFromClaim1612;
  close(ratio, point.lambdaYMOverMPlanck);
}

const ratios = evidence.coefficientSensitivityScan.map((point) =>
  point.lambdaYMOverMPlanck);
const span = Math.log10(Math.max(...ratios)/Math.min(...ratios));
close(span, evidence.schemeAndTruncationBoundary.scanSpanOrdersOfMagnitude);
assert.ok(span > 14);
assert.equal(evidence.closureConditions.length, 5);
assert.match(evidence.programmeDecision, /can remove/);
assert.match(evidence.programmeDecision, /trades g3/);

console.log("Spin(2,3) gauge-gravity fixed-point color-boundary audit: PASS");
console.log("  Gaussian color theta_g=" +
  gaussian.criticalExponentsAtBenchmarkF[1] + " is relevant: g3(v) remains free");
console.log("  interacting toy g*=" + fp.gStar.toFixed(6) +
  ", theta_g=" + fp.criticalExponents[1].toFixed(6) + " is irrelevant");
console.log("  unique critical trajectory gives g3(v)=" + flow.g3AtV.toFixed(6) +
  " and Lambda_YM/M_Pl=" + flow.lambdaYMOverMPlanck.toExponential(6));
console.log("  coefficient scan spans " + span.toFixed(3) +
  " orders: prediction awaits a stable Spin(2,3) universality class");

import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/three-resonator-parity-switch-detector-v1.json", root), "utf8"));

function signedTriangle(a, b, c, signs) {
  const K = [
    [a + c, 0, 0],
    [0, a + b, 0],
    [0, 0, b + c]
  ];
  const edges = [[0, 1, a, signs[0]], [1, 2, b, signs[1]], [2, 0, c, signs[2]]];
  for (const [i, j, w, s] of edges) K[i][j] = K[j][i] = -s * w;
  return K;
}

const addOnsite = (K, omega2) => K.map((row, i) => row.map((v, j) => v + (i === j ? omega2 : 0)));
const trace = A => A.reduce((sum, row, i) => sum + row[i], 0);
const multiply = (A, B) => A.map((row, i) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const determinant = A =>
  A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1])
  - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0])
  + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);

for (const [a, b, c, omega2] of [[1, 1, 1, 0], [2, 3, 5, 7], [0.25, 1.5, 4, 2.25]]) {
  const plus = addOnsite(signedTriangle(a, b, c, [1, 1, 1]), omega2);
  const minus = addOnsite(signedTriangle(a, b, c, [-1, 1, 1]), omega2);
  assert(Math.abs(trace(minus) - trace(plus)) < 1e-10);
  assert(Math.abs(trace(multiply(minus, minus)) - trace(multiply(plus, plus))) < 1e-10);
  assert(Math.abs((determinant(minus) - determinant(plus)) - 4 * a * b * c) < 1e-10);

  const gaugeEquivalent = addOnsite(signedTriangle(a, b, c, [-1, -1, 1]), omega2);
  assert(Math.abs(determinant(gaugeEquivalent) - determinant(plus)) < 1e-10);
  assert(Math.abs(trace(multiply(gaugeEquivalent, gaugeEquivalent)) - trace(multiply(plus, plus))) < 1e-10);
}

const ordinary = signedTriangle(1, 1, 1, [1, 1, 1]);
const frustrated = signedTriangle(1, 1, 1, [-1, 1, 1]);
assert.equal(determinant(ordinary), 0);
assert.equal(determinant(frustrated), 4);
const characteristicAt = (A, lambda) => determinant(A.map((row, i) => row.map((v, j) => v - (i === j ? lambda : 0))));
for (const lambda of [0, 3, 3]) assert(Math.abs(characteristicAt(ordinary, lambda)) < 1e-10);
for (const lambda of [1, 1, 4]) assert(Math.abs(characteristicAt(frustrated, lambda)) < 1e-10);
const openPlus = addOnsite(signedTriangle(2, 3, 0, [1, 1, 1]), 5);
const openMinus = addOnsite(signedTriangle(2, 3, 0, [-1, 1, 1]), 5);
assert(Math.abs(determinant(openMinus) - determinant(openPlus)) < 1e-10);
assert.deepEqual(evidence.equalCouplingExample.ordinaryCouplingEigenvaluesInKappaUnits, [0, 3, 3]);
assert.deepEqual(evidence.equalCouplingExample.frustratedCouplingEigenvaluesInKappaUnits, [1, 1, 4]);
assert.equal(evidence.decision.observationAloneWouldBeNewPhysics, false);

const build = evidence.buildScaleExample;
const kappa = build.edgeSpringNPerM / build.massKg;
const omega2 = build.onsiteSpringNPerM / build.massKg;
const hz = angularSquared => Math.sqrt(angularSquared) / (2 * Math.PI);
const expectedOrdinaryHz = [hz(omega2), hz(omega2 + 3 * kappa), hz(omega2 + 3 * kappa)];
const expectedFrustratedHz = [hz(omega2 + kappa), hz(omega2 + kappa), hz(omega2 + 4 * kappa)];
expectedOrdinaryHz.forEach((value, i) => assert(Math.abs(value - build.ordinaryFrequenciesHz[i]) < 1e-12));
expectedFrustratedHz.forEach((value, i) => assert(Math.abs(value - build.frustratedFrequenciesHz[i]) < 1e-12));
const ordinaryProduct = omega2 * (omega2 + 3 * kappa) ** 2;
const frustratedProduct = (omega2 + kappa) ** 2 * (omega2 + 4 * kappa);
assert.equal(ordinaryProduct, build.ordinarySquaredAngularFrequencyProductPerSecond6);
assert.equal(frustratedProduct, build.frustratedSquaredAngularFrequencyProductPerSecond6);
assert.equal(frustratedProduct - ordinaryProduct, build.differencePerSecond6);
assert.equal((frustratedProduct - ordinaryProduct) / ordinaryProduct, build.differenceRelativeToOrdinary);

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  carrier: evidence.carrier,
  selector: evidence.selector,
  detector: evidence.detector,
  traceDifference: 0,
  quadraticMomentDifference: 0,
  determinantDifference: "4*kappa12*kappa23*kappa31",
  equalCouplingOrdinarySpectrum: [0, 3, 3],
  equalCouplingFrustratedSpectrum: [1, 1, 4],
  buildScaleFrequenciesHz: { ordinary: build.ordinaryFrequenciesHz, frustrated: build.frustratedFrequenciesHz },
  buildScaleDeterminantRelativeShift: build.differenceRelativeToOrdinary,
  newPhysicsByObservationAlone: evidence.decision.observationAloneWouldBeNewPhysics,
  reopeningDatum: evidence.reopeningDatum
}, null, 2));

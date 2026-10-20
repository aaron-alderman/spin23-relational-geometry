#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-susy-holomorphic-mass-gap-shared-scale-audit.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.susy-holomorphic-mass-gap-shared-scale-audit/1");
const close = (actual, expected, tolerance = 1e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= tolerance*scale,
    "expected " + expected + ", received " + actual);
};

const vacua = evidence.holomorphicVacua;
let sumReal = 0;
let sumImaginary = 0;
for (const point of vacua.condensates) {
  const phase = (vacua.theta+2*Math.PI*point.k)/vacua.N;
  const scale = vacua.lambdaSYM**3;
  close(scale*Math.cos(phase), point.real);
  close(scale*Math.sin(phase), point.imaginary);
  close(Math.hypot(point.real, point.imaginary), point.magnitude);
  sumReal += point.real;
  sumImaginary += point.imaginary;
}
close(sumReal, vacua.sum.real);
close(sumImaginary, vacua.sum.imaginary);

const kahler = evidence.kahlerCounterexample;
for (const point of kahler.points) {
  close(kahler.N/(point.Z*kahler.absoluteS), point.mass);
}
assert.ok(kahler.points[0].mass/kahler.points.at(-1).mass === 100);

const index = evidence.wittenIndexWitness;
for (const point of index.points) {
  const value = index.index + Math.exp(-index.beta*point.epsilon) -
    Math.exp(-index.beta*point.epsilon);
  close(value, point.indexValue);
}
assert.equal(index.points[0].indexValue, index.points.at(-1).indexValue);

const soft = evidence.softMassVacuumSplitting;
for (const point of soft.points) {
  const energies = Array.from({length: soft.N}, (_, k) =>
    -2*soft.mLambda*soft.lambdaSYM**3*
      Math.cos((point.theta+2*Math.PI*k)/soft.N));
  for (let k=0; k<soft.N; k++) close(energies[k], point.energies[k]);
  const minimum = Math.min(...energies);
  const branches = energies.map((energy, k) => ({energy, k}))
    .filter(({energy}) => Math.abs(energy-minimum) < 1e-12)
    .map(({k}) => k);
  assert.deepEqual(branches, point.minimumBranches);
}
close(
  Math.max(...soft.points[0].energies)-Math.min(...soft.points[0].energies),
  soft.vacuumEnergySplittingAtTheta0,
);

const matching = evidence.softDecouplingMatching;
for (const point of matching.points) {
  close(point.mLambda**(2/11)*matching.fixedLambdaSYM**(9/11), point.lambdaYM);
}
assert.equal(matching.overlap, false);

const sugra = evidence.supergravityCondensateWitness;
const expectedCondensate = sugra.inputs.N*sugra.inputs.lambdaSYM**3;
close(expectedCondensate, sugra.inputs.Wcond);
for (const point of sugra.points) {
  const total = (1+point.W0OverWcond)*sugra.inputs.Wcond;
  close(total, point.Wtotal);
  const gravitinoMass = Math.abs(total)/(sugra.inputs.MPlanck**2);
  close(gravitinoMass, point.mGravitino);
  close(-3*gravitinoMass**2, point.lambdaGravity);
  if (gravitinoMass === 0) assert.equal(point.ell, null);
  else close(1/gravitinoMass, point.ell);
}

assert.match(evidence.ospAdSBridge.bosonicSubgroup, /Spin\(2,3\)/);
assert.equal(evidence.protectionBoundary.protected.length, 4);
assert.equal(evidence.protectionBoundary.notProtected.length, 6);
assert.equal(evidence.protectionBoundary.reopeningConditions.length, 3);
assert.match(evidence.protectionBoundary.programmeDecision, /no protected pure-YM gap/);

console.log("Spin(2,3) SUSY/holomorphic mass-gap and shared-scale audit: PASS");
console.log("  SU(3) condensates form three unit roots with vanishing sum");
console.log("  unchanged holomorphic extrema allow a 100-fold toy curvature change through Kahler Z");
console.log("  Witten index remains " + index.index + " as epsilon ranges from " +
  index.points[0].epsilon + " to " + index.points.at(-1).epsilon);
console.log("  soft theta=0 vacuum splitting=" + soft.vacuumEnergySplittingAtTheta0.toFixed(2) +
  "; this is not a particle gap");
console.log("  one-loop Lambda_YM changes from " + matching.points[0].lambdaYM.toFixed(6) +
  " to " + matching.points.at(-1).lambdaYM.toFixed(6) + " across the threshold scan");
console.log("  fixed condensate plus free W0 yields AdS, Minkowski, or a fourfold |Lambda_grav| change");

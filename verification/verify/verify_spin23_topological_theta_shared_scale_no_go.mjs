#!/usr/bin/env node

import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const evidence = JSON.parse(await readFile(new URL(
  "../../evidence/data/spin23-topological-theta-shared-scale-no-go.json",
  import.meta.url,
), "utf8"));

assert.equal(evidence.schema, "spin23.topological-theta-shared-scale-no-go/1");
const pi = Math.PI;
const close = (actual, expected, tolerance = 1e-12) => {
  const scale = Math.max(1, Math.abs(actual), Math.abs(expected));
  assert.ok(Math.abs(actual-expected) <= tolerance*scale,
    "expected " + expected + ", received " + actual);
};

const instantonFactor = (g) => Math.exp(-8*pi*pi/(g*g));
for (const point of evidence.compactYangMills.instantonFactorScan) {
  close(instantonFactor(point.g), point.expMinus8Pi2OverG2);
}
assert.ok(
  evidence.compactYangMills.instantonFactorScan.at(-1).expMinus8Pi2OverG2 /
  evidence.compactYangMills.instantonFactorScan[0].expMinus8Pi2OverG2 > 1e29,
);

const finite = evidence.finiteSectorWitness;
const partition = (theta) => {
  let value = 1;
  for (let charge=1; charge<=finite.Qmax; charge++) {
    value += 2*Math.exp(-finite.A*charge)*Math.cos(charge*theta);
  }
  return value;
};
close(partition(0), finite.Z0);
for (const point of finite.points) {
  const z = partition(point.theta);
  close(z, point.Z);
  close(-Math.log(z/finite.Z0), point.minusLogZOverZ0);
}
let secondMomentNumerator = 0;
for (let charge=1; charge<=finite.Qmax; charge++) {
  secondMomentNumerator += 2*charge*charge*Math.exp(-finite.A*charge);
}
close(secondMomentNumerator/finite.Z0, finite.chargeVarianceAtTheta0);
const r = Math.exp(-finite.A);
close(2*r/(1-r)**2, finite.infiniteSumChargeVariance);

const gas = evidence.diluteInstantonGasWitness;
const {K,V,theta} = gas.inputs;
close(Math.exp(2*K*V*(Math.cos(theta)-1)), gas.ZRatio);
close(2*K*(1-Math.cos(theta)), gas.energyDifferenceValue);
close(2*K, gas.susceptibilityValue);

const largeN = evidence.largeNMultibranchWitness;
const branchEnergy = (angle, branch) =>
  0.5*largeN.chi*(angle+2*pi*branch)**2;
for (const point of largeN.points) {
  const energies = [];
  for (let branch=-3; branch<=3; branch++) {
    energies.push({branch, energy: branchEnergy(point.theta, branch)});
  }
  const minimum = Math.min(...energies.map(({energy}) => energy));
  close(minimum, point.minimumEnergy);
  const minimizing = energies
    .filter(({energy}) => Math.abs(energy-minimum) < 1e-12)
    .map(({branch}) => branch);
  assert.deepEqual(minimizing, point.minimizingBranches);
}
close(largeN.points[0].minimumEnergy, largeN.points.at(-1).minimumEnergy);

const mm = evidence.macdowellMansouriTopologicalSector;
close(4*pi*pi*mm.benchmark.x, mm.benchmark.actionPerEulerUnit);
close(Math.exp(-mm.benchmark.actionPerEulerUnit), mm.benchmark.relativeEuclideanWeightPerEulerUnit);
assert.equal(mm.pontryagin.bulkVariationOnClosedFixedTopology, 0);

const variance = (action) => {
  const suppression = Math.exp(-action);
  return 2*suppression/(1-suppression)**2;
};
const diagonal = evidence.forcedDiagonalChargeTest;
close(variance(diagonal.inputs.A_c), diagonal.separateInfiniteSumVariances.color);
close(variance(diagonal.inputs.A_g), diagonal.separateInfiniteSumVariances.gravity);
close(variance(diagonal.inputs.A_c+diagonal.inputs.A_g), diagonal.diagonalInfiniteSumVariance);
assert.ok(diagonal.diagonalInfiniteSumVariance < diagonal.separateInfiniteSumVariances.gravity);

const axion = evidence.anomalyAxionEscape;
const axionMassSquared = (
  axion.toyInputs.N_c**2*axion.toyInputs.chi_c +
  axion.toyInputs.N_g**2*axion.toyInputs.chi_g
)/axion.toyInputs.f**2;
close(axionMassSquared, axion.axionMassSquaredAtAlignedMinimum);
assert.match(axion.shiftInvariantAngle, /N_g theta_c-N_c theta_g/);
assert.match(axion.additiveConstant, /unconstrained/);

assert.equal(evidence.characteristicClassSeparation.independentBundles, true);
assert.match(evidence.susceptibilityAndVacuumEnergy.nonCancellation, /does not set/);
assert.match(evidence.sharedScaleAttempt.decision, /not a dimensionful/);
assert.equal(evidence.exhaustionBoundary.closedFiniteRoutes.length, 9);
assert.match(evidence.exhaustionBoundary.programmeDecision, /No presently available/);

console.log("Spin(2,3) topological/theta shared-scale audit: PASS");
console.log("  finite sector sum: variance=" + finite.chargeVarianceAtTheta0.toFixed(9) +
  ", F(pi)-F(0)=" + finite.points.at(-1).minusLogZOverZ0.toFixed(9));
console.log("  instanton factor g=0.8 to 1.2 changes by more than 10^29 while integer charge is unchanged");
console.log("  imposed Q_color=Q_gravity gives variance=" + diagonal.diagonalInfiniteSumVariance.toFixed(9) +
  " but retains both continuous actions");
console.log("  large-N branch toy is 2pi-periodic with a theta=pi cusp, but chi=" + largeN.chi + " remains input");
console.log("  MM Euler fugacity at x=0.1 is " + mm.benchmark.relativeEuclideanWeightPerEulerUnit.toFixed(9) +
  "; topology does not fix x");
console.log("  mixed-axion toy mass^2=" + axionMassSquared.toFixed(6) +
  "; one orthogonal theta angle and the additive vacuum constant remain");

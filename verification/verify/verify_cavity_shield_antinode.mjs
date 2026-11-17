import assert from 'node:assert/strict';
import { compareBidirectionalMotion, compareMatchedVelocityCrossings, compareMotionAtProgress, forceComponents, gapRangeMm, motionTestForces, phaseTestForces, physicalScaleBenchmarks } from '../../scripts/model-cavity-shield-antinode.mjs';

function close(actual, expected, tolerance = 1e-12) {
  assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} differs from ${expected}`);
}

for (const [gap, expected] of [[5, 0.5], [10, 1], [20, 0], [30, 1], [40, 0]]) {
  close(forceComponents(gap).antinode[0], expected);
}

for (let gap = gapRangeMm[0]; gap <= gapRangeMm[1]; gap += 0.25) {
  const forces = forceComponents(gap);
  for (const [cavity, shield] of Object.values(forces)) close(cavity + shield, 0);
  close(forces.antinode[0], forces.rfStandingWave[0]);
  assert.ok(forces.antinode[0] >= 0 && forces.antinode[0] <= 1);
  assert.ok(forces.casimir[0] > 0 && forces.rf[0] < 0);
}

const atTen = forceComponents(10);
const atTwenty = forceComponents(20);
close(atTen.casimir[0] / atTwenty.casimir[0], 8);
close(atTen.casimir[0] * 1e6, 0.001981024, 1e-9);
close(atTen.rf[1], 1.0006922855944562);
console.log('Antinode extrema, two-balance closure, thermal Casimir scale and RF reference verified.');

const expectedPhaseReadings = [
  [0, [0.5, 1.5, 1.5]], [90, [0, 1, 0.5]], [180, [-0.5, 0.5, -0.5]], [270, [0, 1, 0.5]]
];
for (const [phase, expected] of expectedPhaseReadings) {
  Object.values(phaseTestForces(phase)).forEach(([cavity, shield], index) => {
    close(cavity, expected[index]);
    close(shield, -expected[index]);
  });
}
for (const gap of [5, 10, 20, 30]) {
  for (let phase = 0; phase < 360; phase += 5) {
    const a = phaseTestForces(phase, gap);
    const b = phaseTestForces(phase + 180, gap);
    close((a.rfOnly[0] + b.rfOnly[0]) / 2, 0);
    close((a.gapLocked[0] + b.gapLocked[0]) / 2, forceComponents(gap).antinode[0]);
    close((a.phaseFollowing[0] + b.phaseFollowing[0]) / 2, 0.5);
    close(a.phaseFollowing[0], 0.5 + 2 * a.rfOnly[0]);
  }
}
console.log('Phase sweep, reversal averages and phase-following RF degeneracy verified.');

const quarterMove = compareMotionAtProgress(0.25);
close(quarterMove.fast.gapMm, 11.03515625);
close(quarterMove.fast.accelerationMps2, 0.05625);
close(quarterMove.fast.balance[0] - quarterMove.slow.balance[0], 0.84375);
close(quarterMove.fast.balance[1] - quarterMove.slow.balance[1], -3.375);
for (let percent = -10; percent <= 120; percent += 1) {
  const progress = percent / 100;
  const { fast, slow, recoveredGapOnly } = compareMotionAtProgress(progress);
  close(fast.gapMm, slow.gapMm);
  close(fast.accelerationMps2, 4 * slow.accelerationMps2);
  close(fast.accelerationMps2, -motionTestForces(1 - progress, 1).accelerationMps2);
  for (const index of [0, 1]) close(recoveredGapOnly[index], fast.gapOnly[index]);
}
const settled = compareMotionAtProgress(1.2);
close(settled.fast.gapMm, 20);
close(settled.fast.balance[0], -0.5, 3e-10);
close(settled.fast.balance[1], 0.5, 3e-10);
assert.deepEqual(settled.fast.balance, settled.slow.balance);
console.log('Motion reversal, two-speed force recovery and settled readings verified.');

const bidirectionalQuarter = compareBidirectionalMotion(0.25);
close(bidirectionalQuarter.runs[0].odd[0], 0.421875);
close(bidirectionalQuarter.runs[0].odd[1], -1.0546875);
for (let percent = 0; percent <= 100; percent += 1) {
  const fit = compareBidirectionalMotion(percent / 100);
  for (const { forward, reverse } of fit.runs) {
    close(forward.gapMm, reverse.gapMm);
    close(forward.velocityMmps, -reverse.velocityMmps);
    close(forward.accelerationMps2, reverse.accelerationMps2);
  }
  for (const index of [0, 1]) {
    close(fit.gapOnly[index], fit.runs[0].forward.gapOnly[index]);
    close(fit.fastAcceleration[index], fit.runs[0].forward.pickup[index]);
    close(fit.runs[1].odd[index], fit.runs[0].odd[index] / 2);
    close(fit.predictedHoldoutEven[index] + fit.predictedHoldoutOdd[index], fit.holdout.forward.balance[index]);
    close(fit.predictedHoldoutEven[index] - fit.predictedHoldoutOdd[index], fit.holdout.reverse.balance[index]);
  }
}
const midpoint = compareBidirectionalMotion(0.5);
close(midpoint.fastAcceleration[0], 0);
close(midpoint.runs[0].odd[0], 0.75);
console.log('Matched-gap reversal, velocity recovery and both held-out 4 s traces verified.');

const matched = compareMatchedVelocityCrossings();
const [short, long] = matched.runs;
close(long.startGapMm, 8.96484375);
close(long.endGapMm, 28.96484375);
close(short.forward.velocityMmps, 10.546875);
close(short.forward.accelerationMps2, 0.05625);
close(long.forward.accelerationMps2, 0.028125);
for (const run of matched.runs) {
  close(run.forward.gapMm, matched.parked.gapMm);
  close(run.reverse.gapMm, matched.parked.gapMm);
  close(run.forward.velocityMmps, short.forward.velocityMmps);
  close(run.reverse.velocityMmps, -short.forward.velocityMmps);
  close(run.reverse.accelerationMps2, run.forward.accelerationMps2);
}
const halfSpeed = compareMatchedVelocityCrossings(2);
close(halfSpeed.runs[0].forward.gapMm, matched.parked.gapMm);
close(halfSpeed.runs[0].forward.velocityMmps, short.forward.velocityMmps / 2);
for (const index of [0, 1]) {
  close(short.odd[index], long.odd[index]);
  close(short.forward.balance[index] - long.forward.balance[index], short.forward.pickup[index] / 2);
  close(short.reverse.balance[index] - long.reverse.balance[index], short.forward.pickup[index] / 2);
  close(matched.shortAcceleration[index], short.forward.pickup[index]);
  close(matched.recoveredSquaredVelocity[index], short.forward.squaredVelocityPickup[index]);
  close(halfSpeed.recoveredSquaredVelocity[index], matched.recoveredSquaredVelocity[index] / 4);
}
console.log('Scaled travel matches velocity and separates the acceleration term and squared-speed example.');

const scales = physicalScaleBenchmarks();
const reverseCoast = physicalScaleBenchmarks(-1000, 0);
close(scales.absorbedBeamForceN * 1e9, 1.000692, 1e-6);
close(scales.idealCasimirForceN * 1e9, 1.300126, 1e-6);
close(scales.newtonianForceN * 1e9, 0.657542, 2e-6);
close(scales.axialFrameDraggingRadPerS * 1e25, 1.485232, 1e-5);
close(reverseCoast.axialFrameDraggingRadPerS / scales.axialFrameDraggingRadPerS, -1);
close(reverseCoast.imbalanceForceN, 10);
close(reverseCoast.centripetalAccelerationMps2, 1e5);
close(reverseCoast.spinUpTorqueNm, 0);
close(scales.spinUpTorqueNm, 10);
console.log('Ordinary force scales and weak-field rotor reversal verified.');

export const gapRangeMm = [2, 40];
export const wavelengthMm = 40;
export const antinodeAmplitudeNn = 1;
export const rfPowerW = 0.30;

const speedOfLight = 299792458;
const boltzmann = 1.380649e-23;
const zeta3 = 1.202056903159594;
const reducedPlanck = 6.62607015e-34 / (2 * Math.PI);
const gravitationalConstant = 6.67430e-11;

// Positive forces point from the cavity toward the shield.
// Return [cavity, shield] in nanonewtons for every component.
export function forceComponents(gapMm) {
  const gapM = gapMm / 1000;
  const antinode = antinodeAmplitudeNn * Math.sin(2 * Math.PI * gapMm / wavelengthMm) ** 2;
  // Example periodic RF force after subtraction of its value at a node.
  const rfStandingWave = antinodeAmplitudeNn * (1 - Math.cos(4 * Math.PI * gapMm / wavelengthMm)) / 2;
  const casimir = 1e9 * boltzmann * 300 * zeta3 * 0.01 / (8 * Math.PI * gapM ** 3);
  const rf = 1e9 * rfPowerW / speedOfLight;
  return {
    antinode: [antinode, -antinode],
    casimir: [casimir, -casimir],
    rf: [-rf, rf],
    rfStandingWave: [rfStandingWave, -rfStandingWave]
  };
}

export const phaseTestGapMm = 10;
export const rfPhaseAmplitudeNn = 0.5;

// Steady-state force pairs after the phase-matched RF-off baseline and
// phase-independent ordinary driven forces have been accounted for.
export function phaseTestForces(phaseDegrees, gapMm = phaseTestGapMm) {
  const gapPhase = 4 * Math.PI * gapMm / wavelengthMm;
  const roundTripPhase = gapPhase + phaseDegrees * Math.PI / 180;
  const rf = -rfPhaseAmplitudeNn * Math.cos(roundTripPhase);
  const gapLocked = antinodeAmplitudeNn * (1 - Math.cos(gapPhase)) / 2;
  const phaseFollowing = antinodeAmplitudeNn * (1 - Math.cos(roundTripPhase)) / 2;
  return {
    rfOnly: [rf, -rf],
    gapLocked: [rf + gapLocked, -rf - gapLocked],
    phaseFollowing: [rf + phaseFollowing, -rf - phaseFollowing]
  };
}

export const motionDurationsSeconds = [1, 2];
export const bidirectionalDurationsSeconds = [...motionDurationsSeconds, 4];
const motionStartMm = 10;
const motionTravelMm = 10;
const accelerationPickupMicrograms = [20, -80];
const velocityPickupNnPerMmps = [0.04, -0.10];
const squaredVelocityPickupNnPerMmpsSquared = [0.005, -0.010];

// Signed equivalent masses parameterize illustrative acceleration pickup.
// Multiplying micrograms by m/s² gives nanonewtons.
export function motionTestForces(timeSeconds, durationSeconds, {
  reverse = false,
  includeVelocityPickup = false,
  includeSquaredVelocityPickup = false,
  startGapMm = motionStartMm,
  travelMm = motionTravelMm
} = {}) {
  const elapsedFraction = Math.min(1, Math.max(0, timeSeconds / durationSeconds));
  const progress = reverse ? 1 - elapsedFraction : elapsedFraction;
  const position = progress ** 3 * (10 - 15 * progress + 6 * progress ** 2);
  const gapMm = startGapMm + travelMm * position;
  const accelerationMps2 = (travelMm / 1000) * 60 * progress * (1 - progress)
    * (1 - 2 * progress) / durationSeconds ** 2;
  const velocityMmps = (reverse ? -1 : 1) * travelMm * 30 * progress ** 2
    * (1 - progress) ** 2 / durationSeconds;
  const casimir = forceComponents(gapMm).casimir;
  const driven = phaseTestForces(0, gapMm).gapLocked;
  const gapOnly = driven.map((force, index) => force + casimir[index]);
  const pickup = accelerationPickupMicrograms.map(mass => mass * accelerationMps2);
  const velocityPickup = velocityPickupNnPerMmps.map(coefficient =>
    includeVelocityPickup ? coefficient * velocityMmps : 0);
  const squaredVelocityPickup = squaredVelocityPickupNnPerMmpsSquared.map(coefficient =>
    includeSquaredVelocityPickup ? coefficient * velocityMmps ** 2 : 0);
  const balance = gapOnly.map((force, index) =>
    force + pickup[index] + velocityPickup[index] + squaredVelocityPickup[index]);
  return { gapMm, accelerationMps2, velocityMmps, gapOnly, pickup, velocityPickup, squaredVelocityPickup, balance };
}

export function compareMotionAtProgress(progress) {
  const [fast, slow] = motionDurationsSeconds.map(duration => motionTestForces(progress * duration, duration));
  const durationSquaredRatio = (motionDurationsSeconds[1] / motionDurationsSeconds[0]) ** 2;
  const recoveredGapOnly = slow.balance.map((force, index) =>
    (durationSquaredRatio * force - fast.balance[index]) / (durationSquaredRatio - 1));
  return { fast, slow, recoveredGapOnly };
}

// Progress always labels the gap on the forward path. The reverse run samples
// that gap at the complementary time, so velocity changes sign and acceleration does not.
export function compareBidirectionalMotion(progress) {
  const runs = bidirectionalDurationsSeconds.map(duration => {
    const forward = motionTestForces(progress * duration, duration, { includeVelocityPickup: true });
    const reverse = motionTestForces((1 - progress) * duration, duration,
      { reverse: true, includeVelocityPickup: true });
    const even = forward.balance.map((force, index) => (force + reverse.balance[index]) / 2);
    const odd = forward.balance.map((force, index) => (force - reverse.balance[index]) / 2);
    return { forward, reverse, even, odd };
  });
  const [fast, slow, holdout] = runs;
  const fastAcceleration = fast.even.map((force, index) => 4 * (force - slow.even[index]) / 3);
  const gapOnly = fast.even.map((force, index) => force - fastAcceleration[index]);
  const predictedHoldoutEven = gapOnly.map((force, index) => force + fastAcceleration[index] / 16);
  const predictedHoldoutOdd = fast.odd.map(force => force / 4);
  return { runs, holdout, fastAcceleration, gapOnly, predictedHoldoutEven, predictedHoldoutOdd };
}

export function compareMatchedVelocityCrossings(baseDurationSeconds = 1) {
  const progress = 0.25;
  const reference = motionTestForces(progress, 1);
  const crossingGapMm = reference.gapMm;
  const runs = [1, 2].map(scale => {
    const durationSeconds = scale * baseDurationSeconds;
    const startGapMm = crossingGapMm - scale * (crossingGapMm - motionStartMm);
    const travelMm = scale * motionTravelMm;
    const options = { startGapMm, travelMm, includeVelocityPickup: true, includeSquaredVelocityPickup: true };
    const forward = motionTestForces(progress * durationSeconds, durationSeconds, options);
    const reverse = motionTestForces((1 - progress) * durationSeconds, durationSeconds, { ...options, reverse: true });
    const even = forward.balance.map((force, index) => (force + reverse.balance[index]) / 2);
    const odd = forward.balance.map((force, index) => (force - reverse.balance[index]) / 2);
    return { durationSeconds, startGapMm, endGapMm: startGapMm + travelMm, forward, reverse, even, odd };
  });
  const parked = motionTestForces(0, 1, { startGapMm: crossingGapMm, travelMm: 0 });
  const [short, long] = runs;
  const shortAcceleration = short.even.map((force, index) => 2 * (force - long.even[index]));
  const recoveredSquaredVelocity = long.even.map((force, index) =>
    force - shortAcceleration[index] / 2 - parked.balance[index]);
  return { runs, parked, shortAcceleration, recoveredSquaredVelocity };
}

// Thin-ring example with an on-axis readout. Frame dragging uses the leading
// weak-field angular momentum term, valid far from the ring compared with its radius.
export function physicalScaleBenchmarks(angularSpeedRadPerS = 1000, angularAccelerationRadPerS2 = 100) {
  const rotorMassKg = 10;
  const radiusM = 0.1;
  const axialDistanceM = 1;
  const imbalanceOffsetM = 1e-6;
  const testMassKg = 1;
  const inertiaKgM2 = rotorMassKg * radiusM ** 2;
  const angularMomentum = inertiaKgM2 * angularSpeedRadPerS;
  const idealPlateAreaM2 = 1e-6;
  const idealPlateGapM = 1e-6;
  return {
    absorbedBeamForceN: rfPowerW / speedOfLight,
    idealCasimirForceN: Math.PI ** 2 * reducedPlanck * speedOfLight * idealPlateAreaM2 / (240 * idealPlateGapM ** 4),
    angularMomentum,
    centripetalAccelerationMps2: radiusM * angularSpeedRadPerS ** 2,
    tangentialAccelerationMps2: radiusM * angularAccelerationRadPerS2,
    spinUpTorqueNm: inertiaKgM2 * angularAccelerationRadPerS2,
    imbalanceForceN: rotorMassKg * imbalanceOffsetM * angularSpeedRadPerS ** 2,
    newtonianForceN: gravitationalConstant * rotorMassKg * testMassKg * axialDistanceM
      / (axialDistanceM ** 2 + radiusM ** 2) ** 1.5,
    axialFrameDraggingRadPerS: 2 * gravitationalConstant * angularMomentum / (speedOfLight ** 2 * axialDistanceM ** 3)
  };
}

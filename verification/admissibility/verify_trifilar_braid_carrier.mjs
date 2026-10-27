import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-braid-carrier-v1.json",
  import.meta.url,
), "utf8"));

const tolerance = 1e-11;
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const transpose = (A) => A[0].map((_, column) => A.map((row) => row[column]));
const multiply = (A, B) => A.map((row) => B[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * B[index][column], 0)));
const matrixVector = (A, x) => A.map((row) => dot(row, x));
const outer = (a, b) => a.map((left) => b.map((right) => left * right));
const identity = (n) => Array.from({ length: n }, (_, row) =>
  Array.from({ length: n }, (_, column) => row === column ? 1 : 0));
const subtract = (A, B) => A.map((row, i) => row.map((value, j) => value - B[i][j]));
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const scale = (factor, A) => A.map((row) => row.map((value) => factor * value));
const maxResidual = (A, B) => Math.max(...A.flatMap((row, i) =>
  row.map((value, j) => Math.abs(value - B[i][j]))));

const ec = evidence.basis.common;
const e1 = evidence.basis.differential1;
const e2 = evidence.basis.differential2;
const basis = [ec, e1, e2];
for (let i = 0; i < 3; i += 1) {
  for (let j = 0; j < 3; j += 1) {
    assert(Math.abs(dot(basis[i], basis[j]) - (i === j ? 1 : 0)) < tolerance,
      "common/differential basis is not orthonormal");
  }
}
assert(Math.abs(e1.reduce((a, b) => a + b, 0)) < tolerance
  && Math.abs(e2.reduce((a, b) => a + b, 0)) < tolerance,
"differential basis must lie in the zero-sum plane");

const cyclic = evidence.cyclicPermutation;
assert(maxResidual(matrixVector(cyclic, ec).map((value) => [value]), ec.map((value) => [value])) < tolerance,
  "cyclic permutation must fix common mode");
const restricted = [e1, e2].map((left) => [e1, e2].map((right) =>
  dot(left, matrixVector(cyclic, right))));
const restrictedTrace = restricted[0][0] + restricted[1][1];
const restrictedDeterminant = restricted[0][0] * restricted[1][1]
  - restricted[0][1] * restricted[1][0];
const rotationDegrees = Math.atan2(restricted[1][0], restricted[0][0]) * 180 / Math.PI;
assert(Math.abs(restrictedTrace + 1) < tolerance && Math.abs(restrictedDeterminant - 1) < tolerance,
  "cyclic restriction must be a 120-degree rotation");
assert(Math.abs(Math.abs(rotationDegrees) - evidence.bareBraidBoundary.restrictedRotationDegreesMagnitude) < tolerance,
  "restricted rotation angle mismatch");

const differentialProjector = add(outer(e1, e1), outer(e2, e2));
const expectedProjector = subtract(identity(3), outer(ec, ec));
assert(maxResidual(differentialProjector, expectedProjector) < tolerance,
  "differential projector mismatch");
const permutedProjector = multiply(multiply(cyclic, differentialProjector), transpose(cyclic));
assert(maxResidual(permutedProjector, differentialProjector) < tolerance,
  "ideal braid must keep the differential projector fixed");
assert(evidence.bareBraidBoundary.differentialProjectorMoves === false,
  "evidence must retain the fixed-plane no-go");

const zero2 = [[0, 0], [0, 0]];
const identity2 = identity(2);
const omega = [
  [...zero2[0], ...identity2[0]],
  [...zero2[1], ...identity2[1]],
  [...scale(-1, identity2)[0], ...zero2[0]],
  [...scale(-1, identity2)[1], ...zero2[1]],
];
const symplecticLift = [
  [...restricted[0], 0, 0],
  [...restricted[1], 0, 0],
  [0, 0, ...restricted[0]],
  [0, 0, ...restricted[1]],
];
const preservedOmega = multiply(multiply(transpose(symplecticLift), omega), symplecticLift);
assert(maxResidual(preservedOmega, omega) < tolerance,
  "canonical cyclic lift must preserve the symplectic form");

const line = evidence.slowLineFixture;
const rootLC = Math.sqrt(line.seriesInductanceHenry * line.shuntCapacitanceFarad);
const lowFrequencyVelocity = line.cellSpacingMeters / rootLC;
const characteristicImpedance = Math.sqrt(line.seriesInductanceHenry / line.shuntCapacitanceFarad);
const cutoffFrequencyHertz = 1 / (Math.PI * rootLC);
const approximateProbeWavelengthMeters = lowFrequencyVelocity / line.probeFrequencyHertz;
assert(Math.abs(lowFrequencyVelocity - 10) < tolerance, "slow-line velocity mismatch");
assert(Math.abs(characteristicImpedance - 100) < tolerance, "slow-line impedance mismatch");

const repair = evidence.movingProjectorRepair;
const c = repair.latitudeCosine;
const s = Math.sqrt(1 - c * c);
const physicalN = (phi) => {
  const local = [s * Math.cos(phi), s * Math.sin(phi), c];
  return ec.map((_, row) => e1[row] * local[0] + e2[row] * local[1] + ec[row] * local[2]);
};
const movingProjector = (phi) => subtract(identity(3), outer(physicalN(phi), physicalN(phi)));
const p0 = movingProjector(0);
const pQuarter = movingProjector(Math.PI / 2);
const pClose = movingProjector(2 * Math.PI);
assert(maxResidual(p0, pQuarter) > 0.1, "repaired projector must move");
assert(maxResidual(p0, pClose) < tolerance, "repaired projector loop must close");
const solidAngle = 2 * Math.PI * (1 - c);
assert(Math.abs(solidAngle - repair.solidAngleRadians) < tolerance,
  "moving-projector solid angle mismatch");

let nodalSignViolations = 0;
let positiveDefiniteSamples = 0;
for (let sample = 0; sample < 360; sample += 1) {
  const n = physicalN(2 * Math.PI * sample / 360);
  const P = subtract(identity(3), outer(n, n));
  const K = add(scale(repair.darkEigenvalue, P), scale(repair.brightEigenvalue, outer(n, n)));
  const quadraticSamples = [
    [1, 0, 0], [0, 1, 0], [0, 0, 1], [1, 1, 1], [1, -1, 0], [1, 1, -2],
  ];
  if (quadraticSamples.every((x) => dot(x, matrixVector(K, x)) > 0)) positiveDefiniteSamples += 1;
  const offDiagonalPositive = K.some((row, i) => row.some((value, j) => i !== j && value > tolerance));
  const negativeRowSum = K.some((row) => row.reduce((sum, value) => sum + value, 0) < -tolerance);
  if (offDiagonalPositive || negativeRowSum) nodalSignViolations += 1;
}
assert(positiveDefiniteSamples === 360, "moving quadratic family must stay positive definite");
assert(nodalSignViolations > 0, "simple family must expose a direct-capacitor realization obstruction");
assert(repair.ordinaryPairwiseCapacitorRealizableForWholeLoop === false,
  "evidence must not overclaim direct capacitor synthesis");

console.log(JSON.stringify({
  status: "PASS",
  quotient: { commonDimension: 1, differentialDimension: 2 },
  cyclicRestriction: { matrix: restricted, rotationDegrees, restrictedTrace, restrictedDeterminant },
  symplecticLiftPreservesOmega: true,
  bareBraid: { differentialProjectorMoves: false, canonicalProjectorHolonomy: "identity" },
  slowLine: { lowFrequencyVelocity, characteristicImpedance, cutoffFrequencyHertz, approximateProbeWavelengthMeters },
  movingProjector: { closes: true, moves: true, solidAngle, targetHolonomy: repair.targetHolonomy },
  passiveSynthesisAudit: { positiveDefiniteSamples, nodalSignViolations, directPairwiseCapacitorLoop: false },
  verdict: "The ideal braid has a real C3 symplectic action but a fixed differential projector; a quarter-turn requires a moving projector and a separately closed network synthesis.",
}, null, 2));

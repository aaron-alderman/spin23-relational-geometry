import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-finite-projector-ladder-v1.json",
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
const identity = (n) => Array.from({ length: n }, (_, row) =>
  Array.from({ length: n }, (_, column) => row === column ? 1 : 0));
const outer = (a, b) => a.map((left) => b.map((right) => left * right));
const subtract = (A, B) => A.map((row, i) => row.map((value, j) => value - B[i][j]));

const c = evidence.latitudeCosine;
const s = Math.sqrt(1 - c * c);
const normal = (phi) => [s * Math.cos(phi), s * Math.sin(phi), c];
const projector = (phi) => subtract(identity(3), outer(normal(phi), normal(phi)));
const frame = (phi) => [
  [-Math.sin(phi), c * Math.cos(phi)],
  [Math.cos(phi), c * Math.sin(phi)],
  [0, -s],
];
const maxResidual = (A, B) => Math.max(...A.flatMap((row, i) =>
  row.map((value, j) => Math.abs(value - B[i][j]))));

function twoByTwoSingularValues(A) {
  const ata = multiply(transpose(A), A);
  const trace = ata[0][0] + ata[1][1];
  const determinant = ata[0][0] * ata[1][1] - ata[0][1] * ata[1][0];
  const discriminant = Math.sqrt(Math.max(0, trace * trace - 4 * determinant));
  return [Math.sqrt((trace + discriminant) / 2), Math.sqrt((trace - discriminant) / 2)];
}

function finiteReturn(steps, direction = 1) {
  let product = identity(3);
  for (let index = 1; index <= steps; index += 1) {
    product = multiply(projector(direction * 2 * Math.PI * index / steps), product);
  }
  const returnMatrix = multiply(transpose(frame(0)), multiply(product, frame(0)));
  const angleRadians = Math.atan2(
    returnMatrix[1][0] - returnMatrix[0][1],
    returnMatrix[0][0] + returnMatrix[1][1],
  );
  return {
    returnMatrix,
    angleDegrees: angleRadians * 180 / Math.PI,
    singularValues: twoByTwoSingularValues(returnMatrix),
  };
}

assert(maxResidual(multiply(transpose(frame(0)), frame(0)), identity(2)) < tolerance,
  "declared tangent frame must be orthonormal");
assert(Math.abs(dot(normal(0), frame(0).map((row) => row[0]))) < tolerance
  && Math.abs(dot(normal(0), frame(0).map((row) => row[1]))) < tolerance,
"declared tangent frame must lie in the dark plane");

const computed = evidence.samples.map((expected) => {
  const actual = finiteReturn(expected.steps);
  assert(Math.abs(actual.angleDegrees - expected.angleDegrees) < 1e-9,
    `angle mismatch at N=${expected.steps}`);
  expected.singularValues.forEach((value, index) => {
    assert(Math.abs(actual.singularValues[index] - value) < 1e-9,
      `singular-value mismatch at N=${expected.steps}`);
  });
  return { steps: expected.steps, ...actual };
});

const subDegree = computed.find(({ angleDegrees }) =>
  Math.abs(angleDegrees - evidence.targetAngleDegrees) < 1);
const highSurvival = computed.find(({ singularValues }) => singularValues.every((value) => value > 0.95));
assert(subDegree?.steps === evidence.designThresholds.subDegreeAngleMinimumStepsInSampledLadder,
  "sub-degree step threshold mismatch");
assert(highSurvival?.steps === evidence.designThresholds.bothSingularValuesAbove095MinimumStepsInSampledLadder,
  "high-survival step threshold mismatch");

const forward = finiteReturn(128, 1);
const reverse = finiteReturn(128, -1);
assert(Math.abs(forward.angleDegrees + reverse.angleDegrees) < 1e-9,
  "path reversal must reverse the geometric angle");
assert(forward.singularValues.every((value, index) =>
  Math.abs(value - reverse.singularValues[index]) < 1e-9),
"path reversal must retain the ideal singular values");
assert(evidence.interpretiveBoundary.equivalentMechanisms === false,
  "projection and Hamiltonian adiabatic mechanisms must remain distinct");

console.log(JSON.stringify({
  status: "PASS",
  targetAngleDegrees: evidence.targetAngleDegrees,
  sampledLadder: computed.map(({ steps, angleDegrees, singularValues }) => ({
    steps, angleDegrees, singularValues,
  })),
  thresholds: evidence.designThresholds,
  reversal: {
    forwardAngleDegrees: forward.angleDegrees,
    reverseAngleDegrees: reverse.angleDegrees,
    singularValues: forward.singularValues,
  },
  verdict: "Four settings calibrate the moving matrix but do not resolve the quarter-turn; finite projection converges with measurable contraction that must not be normalized away.",
}, null, 2));

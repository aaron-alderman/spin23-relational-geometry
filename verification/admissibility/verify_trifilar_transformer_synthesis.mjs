import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-trifilar-transformer-synthesis-v1.json",
  import.meta.url,
), "utf8"));

const tolerance = 1e-11;
function assert(condition, message) {
  if (!condition) throw new Error(message);
}
const dot = (a, b) => a.reduce((sum, value, index) => sum + value * b[index], 0);
const identity = (n) => Array.from({ length: n }, (_, row) =>
  Array.from({ length: n }, (_, column) => row === column ? 1 : 0));
const transpose = (A) => A[0].map((_, column) => A.map((row) => row[column]));
const multiply = (A, B) => A.map((row) => B[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * B[index][column], 0)));
const matrixVector = (A, x) => A.map((row) => dot(row, x));
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const subtract = (A, B) => A.map((row, i) => row.map((value, j) => value - B[i][j]));
const scale = (factor, A) => A.map((row) => row.map((value) => factor * value));
const outer = (a, b) => a.map((left) => b.map((right) => left * right));
const maxResidual = (A, B) => Math.max(...A.flatMap((row, i) =>
  row.map((value, j) => Math.abs(value - B[i][j]))));
const rowSums = (A) => A.map((row) => row.reduce((sum, value) => sum + value, 0));

const ec = [1, 1, 1].map((value) => value / Math.sqrt(3));
const e1 = [1 / Math.sqrt(2), -1 / Math.sqrt(2), 0];
const e2 = [1 / Math.sqrt(6), 1 / Math.sqrt(6), -2 / Math.sqrt(6)];
const target = evidence.targetFamily;
const c = target.latitudeCosine;
const s = Math.sqrt(1 - c * c);
const nAt = (phi) => ec.map((_, row) =>
  s * Math.cos(phi) * e1[row] + s * Math.sin(phi) * e2[row] + c * ec[row]);
const familyAt = (phi) => {
  const n = nAt(phi);
  const bright = outer(n, n);
  const dark = subtract(identity(3), bright);
  const K = add(scale(target.darkEigenvalue, dark), scale(target.brightEigenvalue, bright));
  const T = add(scale(Math.sqrt(target.darkEigenvalue), dark),
    scale(Math.sqrt(target.brightEigenvalue), bright));
  return { n, bright, dark, K, T };
};

let maximumFactorResidual = 0;
let nodalSignViolationSamples = 0;
for (let sample = 0; sample < target.sampleCount; sample += 1) {
  const { K, T } = familyAt(2 * Math.PI * sample / target.sampleCount);
  maximumFactorResidual = Math.max(maximumFactorResidual,
    maxResidual(multiply(transpose(T), T), K));
  const hasPositiveOffDiagonal = K.some((row, i) =>
    row.some((value, j) => i !== j && value > tolerance));
  if (hasPositiveOffDiagonal) nodalSignViolationSamples += 1;
}
assert(maximumFactorResidual < tolerance, "transformer square-root factorization failed");
assert(nodalSignViolationSamples > 0, "target family must expose capacitor nodal sign obstruction");
assert(evidence.capacitorOnlyBoundary.classPreservedUnderElimination === true,
  "evidence must retain the Kron-reduction boundary");

// A representative positive grounded capacitor graph with one hidden node.
// Positive edge capacitances enter as negative off-diagonal nodal terms.
const edges = [
  [0, 1, 0.2], [0, 3, 0.5], [1, 3, 0.7], [2, 3, 0.4], [1, 2, 0.1],
];
const grounds = [1.0, 1.2, 0.8, 0.9];
const fullC = Array.from({ length: 4 }, () => Array(4).fill(0));
for (let node = 0; node < 4; node += 1) fullC[node][node] += grounds[node];
for (const [left, right, capacitance] of edges) {
  fullC[left][left] += capacitance;
  fullC[right][right] += capacitance;
  fullC[left][right] -= capacitance;
  fullC[right][left] -= capacitance;
}
const boundary = fullC.slice(0, 3).map((row) => row.slice(0, 3));
const coupling = fullC.slice(0, 3).map((row) => row[3]);
const internal = fullC[3][3];
const reducedC = boundary.map((row, i) => row.map((value, j) =>
  value - coupling[i] * coupling[j] / internal));
assert(reducedC.every((row, i) => row.every((value, j) => i === j || value <= tolerance)),
  "Kron-reduced capacitor example left the Stieltjes sign class");
assert(rowSums(reducedC).every((value) => value >= -tolerance),
  "Kron-reduced capacitor example acquired a negative ground term");

const { T: testT } = familyAt(0.37);
const vx = [0.7, -0.2, 0.5];
const iy = [-0.3, 0.9, 0.4];
const vy = matrixVector(testT, vx);
const ix = matrixVector(transpose(testT), iy);
const externalPower = dot(vx, ix);
const internalPower = dot(vy, iy);
const powerResidual = Math.abs(externalPower - internalPower);
assert(powerResidual < tolerance, "ideal transformer port law failed to preserve power");
assert(evidence.idealTransformerClosure.instantaneousPowerPreserved === true,
  "evidence must declare exact static power preservation");

const phi = 0.41;
const phaseRate = 0.3;
const n = nAt(phi);
const nDerivativePerPhi = ec.map((_, row) =>
  -s * Math.sin(phi) * e1[row] + s * Math.cos(phi) * e2[row]);
const kDerivativePerPhi = scale(target.brightEigenvalue - target.darkEigenvalue,
  add(outer(nDerivativePerPhi, n), outer(n, nDerivativePerPhi)));
const state = [0.7, -0.2, 0.5];
const controlPower = 0.5 * dot(state, matrixVector(scale(phaseRate, kDerivativePerPhi), state));
assert(Math.abs(controlPower) > 1e-6, "fixture must expose a nonzero control-work term");
assert(evidence.controlWorkBoundary.timeVaryingImplementationAutonomouslyPassive === false,
  "time variation must not be labelled autonomous passivity");

const phaseZero = familyAt(0).K;
const positivePhaseZeroOffDiagonals = [];
for (let i = 0; i < 3; i += 1) {
  for (let j = i + 1; j < 3; j += 1) {
    if (phaseZero[i][j] > tolerance) positivePhaseZeroOffDiagonals.push([i + 1, j + 1, phaseZero[i][j]]);
  }
}
assert(positivePhaseZeroOffDiagonals.length >= 2,
  "phase-zero target should visibly certify the capacitor-only no-go");

console.log(JSON.stringify({
  status: "PASS",
  idealTransformer: {
    maximumFactorResidual,
    powerResidual,
    identity: evidence.idealTransformerClosure.identity,
  },
  capacitorOnlyNoGo: {
    nodalSignViolationSamples,
    phaseZeroPositiveOffDiagonals: positivePhaseZeroOffDiagonals,
    hiddenNodeExamplePreservesSignClass: true,
    reducedRowSums: rowSums(reducedC),
  },
  movingControl: { phi, phaseRate, controlPower, controllerPortRequired: true },
  verdict: "Hidden positive capacitors cannot repair the nodal sign obstruction; a static ideal transformer exactly factors the target, while any temporal motion adds an explicit control-work port.",
}, null, 2));

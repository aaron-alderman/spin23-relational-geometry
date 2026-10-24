import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const nodeIndex = new Map(nodes.map((node, index) => [node, index]));
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const seams = register.relations.filter((edge) => edge.type === "shares_action_not_carrier");
const wallIndex = edges.findIndex((edge) => edge.id === "QR-003");
const size = nodes.length;

const zeroMatrix = () => Array.from({ length: size }, () => Array(size).fill(0));
const matrixUnit = (edge, reciprocalLeakage = 0) => {
  const matrix = zeroMatrix();
  const from = nodeIndex.get(edge.from); const to = nodeIndex.get(edge.to);
  matrix[to][from] = 1;
  matrix[from][to] = reciprocalLeakage;
  return matrix;
};
const multiply = (left, right) => left.map((row) => right[0].map((_, column) =>
  row.reduce((sum, value, index) => sum + value * right[index][column], 0)));
const sumEntries = (matrix) => matrix.flat().reduce((sum, value) => sum + value, 0);

function rank(matrix, tolerance = 1e-9) {
  const work = matrix.map((row) => row.map(Number));
  let pivotRow = 0;
  for (let column = 0; column < (work[0]?.length ?? 0) && pivotRow < work.length; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < work.length; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    if (Math.abs(work[pivot][column]) < tolerance) continue;
    [work[pivotRow], work[pivot]] = [work[pivot], work[pivotRow]];
    const scale = work[pivotRow][column];
    for (let j = column; j < work[0].length; j += 1) work[pivotRow][j] /= scale;
    for (let row = 0; row < work.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = work[row][column];
      for (let j = column; j < work[0].length; j += 1) work[row][j] -= factor * work[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
}

function jacobiEigenvalues(matrix, tolerance = 1e-12, maxIterations = 200000) {
  const a = matrix.map((row) => row.map(Number));
  for (let iteration = 0; iteration < maxIterations; iteration += 1) {
    let p = 0; let q = 1; let maximum = 0;
    for (let i = 0; i < a.length; i += 1) for (let j = i + 1; j < a.length; j += 1) {
      if (Math.abs(a[i][j]) > maximum) { maximum = Math.abs(a[i][j]); p = i; q = j; }
    }
    if (maximum < tolerance) return a.map((row, index) => row[index]);
    const angle = 0.5 * Math.atan2(2 * a[p][q], a[q][q] - a[p][p]);
    const c = Math.cos(angle); const s = Math.sin(angle);
    for (let k = 0; k < a.length; k += 1) if (k !== p && k !== q) {
      const apk = a[p][k]; const aqk = a[q][k];
      a[p][k] = a[k][p] = c * apk - s * aqk;
      a[q][k] = a[k][q] = s * apk + c * aqk;
    }
    const app = a[p][p]; const aqq = a[q][q]; const apq = a[p][q];
    a[p][p] = c * c * app - 2 * s * c * apq + s * s * aqq;
    a[q][q] = s * s * app + 2 * s * c * apq + c * c * aqq;
    a[p][q] = a[q][p] = 0;
  }
  throw new Error("eigenvalue iteration failed");
}

const pairToEdge = new Map(edges.map((edge, index) => [[edge.from, edge.to].sort().join("|"), index]));
const triangles = [];
for (let a = 0; a < nodes.length; a += 1) for (let b = a + 1; b < nodes.length; b += 1) for (let c = b + 1; c < nodes.length; c += 1) {
  const triangle = [
    pairToEdge.get([nodes[a], nodes[b]].sort().join("|")),
    pairToEdge.get([nodes[a], nodes[c]].sort().join("|")),
    pairToEdge.get([nodes[b], nodes[c]].sort().join("|")),
  ];
  if (triangle.every((index) => index !== undefined)) triangles.push(triangle);
}
const triangleResponse = [];
for (let j = 0; j < edges.length; j += 1) for (let k = j; k < edges.length; k += 1) {
  triangleResponse.push(edges.map((_, i) => triangles.some((triangle) =>
    triangle.includes(i) && triangle.includes(j) && triangle.includes(k) && new Set([i, j, k]).size === 3) ? 1 : 0));
}

function pathResponse(reciprocalLeakage) {
  const operators = edges.map((edge) => matrixUnit(edge, reciprocalLeakage));
  return operators.map((left) => operators.map((right) =>
    sumEntries(multiply(left, right)) + sumEntries(multiply(right, left))));
}

function detectorDiagnostics(epsilon) {
  const response = [...pathResponse(epsilon), ...triangleResponse];
  const gram = edges.map((_, i) => edges.map((__, j) =>
    response.reduce((sum, row) => sum + row[i] * row[j], 0)));
  const eigenvalues = jacobiEigenvalues(gram).map((value) => Math.max(0, value)).sort((a, b) => a - b);
  const wallColumnNorm = Math.sqrt(response.reduce((sum, row) => sum + row[wallIndex] ** 2, 0));
  return {
    epsilon,
    rank: rank(response, 1e-8),
    smallestSingularValue: Math.sqrt(eigenvalues[0]),
    secondSmallestSingularValue: Math.sqrt(eigenvalues[1]),
    wallColumnNorm,
  };
}

const leakageSweep = [0, 1e-4, 1e-3, 1e-2, 5e-2, 1e-1].map(detectorDiagnostics);
if (leakageSweep[0].rank !== 23 || leakageSweep.slice(1).some((entry) => entry.rank !== 24)) {
  throw new Error("reciprocal leakage should lift the exact null");
}

// Unequal directed edge weights cannot repair a missing path: QR-003 stays in
// the kernel as long as no reverse or cross-component edge is added.
const unequalWeights = edges.map((_, index) => 0.5 + (index + 1) / 24);
const weightedOperators = edges.map((edge, index) => matrixUnit(edge).map((row) => row.map((value) => unequalWeights[index] * value)));
const weightedPath = weightedOperators.map((left) => weightedOperators.map((right) =>
  sumEntries(multiply(left, right)) + sumEntries(multiply(right, left))));
if (!weightedPath.every((row) => row[wallIndex] === 0)) throw new Error("directed gain disorder should preserve the wall null");

const wallOperator = matrixUnit(edges[wallIndex]);
const seamCouplings = seams.map((seam) => {
  const seamOperator = matrixUnit(seam);
  return {
    seam: seam.id,
    symmetrizedPathResponse: sumEntries(multiply(wallOperator, seamOperator)) + sumEntries(multiply(seamOperator, wallOperator)),
  };
});

const incomingCounts = nodes.map((node) => edges.filter((edge) => edge.to === node).length);
const outgoingCounts = nodes.map((node) => edges.filter((edge) => edge.from === node).length);
const maximumDirectedDegree = Math.max(...incomingCounts, ...outgoingCounts);

console.log(JSON.stringify({
  result: "pass",
  design: { modes: nodes.length, directedLinks: edges.length, disabledSharedActionSeams: seams.length },
  reciprocalLeakageSweep: leakageSweep,
  leadingWallLeakageLaw: "wall path self-response K_003,003 = 4 epsilon",
  directedGainDisorder: {
    testedWeightRange: [Math.min(...unequalWeights), Math.max(...unequalWeights)],
    qr003RemainsExactNull: true,
  },
  seamContamination: {
    couplings: seamCouplings,
    warning: "enabling shared-action seams changes the carrier graph and must be fitted as contamination, not absorbed into reciprocal leakage",
  },
  stability: {
    maximumDirectedInOrOutDegree: maximumDirectedDegree,
    sufficientContinuousTimeCondition: `kappa > ${maximumDirectedDegree} * |g| by the row/column-sum norm bound`,
  },
  acceptanceRule: {
    nullHypothesis: "composition signal under QR-003 drive is explained by calibrated reciprocal leakage and seam contamination",
    structuralExcess: "reject the declared directed graph if residual coherent response exceeds those calibrated channels across frequency",
  },
}, null, 2));

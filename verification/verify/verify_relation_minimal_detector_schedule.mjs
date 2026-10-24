import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const schedule = JSON.parse(fs.readFileSync(
  "corpus/programmes/frontier/wave-7/relation_minimal_detector_schedule_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const wallIndex = edges.findIndex((edge) => edge.id === "QR-003");

function rank(matrix, tolerance = 1e-9) {
  const work = matrix.map((row) => row.map(Number));
  let pivotRow = 0;
  for (let column = 0; column < work[0].length && pivotRow < work.length; column += 1) {
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

function determinantBareiss(matrix) {
  const work = matrix.map((row) => row.map(BigInt));
  let sign = 1n;
  let previous = 1n;
  for (let pivotIndex = 0; pivotIndex < work.length - 1; pivotIndex += 1) {
    let pivotRow = pivotIndex;
    while (pivotRow < work.length && work[pivotRow][pivotIndex] === 0n) pivotRow += 1;
    if (pivotRow === work.length) return 0n;
    if (pivotRow !== pivotIndex) {
      [work[pivotRow], work[pivotIndex]] = [work[pivotIndex], work[pivotRow]];
      sign = -sign;
    }
    const pivot = work[pivotIndex][pivotIndex];
    for (let i = pivotIndex + 1; i < work.length; i += 1) for (let j = pivotIndex + 1; j < work.length; j += 1) {
      work[i][j] = (work[i][j] * pivot - work[i][pivotIndex] * work[pivotIndex][j]) / previous;
    }
    previous = pivot;
  }
  return sign * work.at(-1).at(-1);
}

function integerInverse(matrix) {
  const size = matrix.length;
  const work = matrix.map((row, i) => [
    ...row.map(Number),
    ...Array.from({ length: size }, (_, j) => i === j ? 1 : 0),
  ]);
  for (let column = 0; column < size; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < size; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    if (Math.abs(work[pivot][column]) < 1e-12) throw new Error("singular response matrix");
    [work[column], work[pivot]] = [work[pivot], work[column]];
    const scale = work[column][column];
    for (let j = 0; j < 2 * size; j += 1) work[column][j] /= scale;
    for (let row = 0; row < size; row += 1) {
      if (row === column) continue;
      const factor = work[row][column];
      for (let j = 0; j < 2 * size; j += 1) work[row][j] -= factor * work[column][j];
    }
  }
  const rounded = work.map((row) => row.slice(size).map((value) => Math.round(value)));
  for (let i = 0; i < size; i += 1) for (let j = 0; j < size; j += 1) {
    const product = matrix[i].reduce((sum, value, k) => sum + value * rounded[k][j], 0);
    if (product !== (i === j ? 1 : 0)) throw new Error("rounded inverse failed exact integral verification");
  }
  return rounded;
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

const directed = edges.map((first) => edges.map((second) => first.to === second.from ? 1 : 0));
const rows = new Map(edges.map((edge, i) => [
  `path_probe:${edge.id}`,
  edges.map((_, j) => directed[i][j] + directed[j][i]),
]));
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
for (let j = 0; j < edges.length; j += 1) for (let k = j; k < edges.length; k += 1) {
  const row = edges.map((_, i) => triangles.some((triangle) =>
    triangle.includes(i) && triangle.includes(j) && triangle.includes(k) && new Set([i, j, k]).size === 3) ? 1 : 0);
  if (row.some(Boolean)) rows.set(`triangle_pair:${edges[j].id}*${edges[k].id}`, row);
}

const composition = schedule.compositionChannels.map((label) => {
  if (!rows.has(label)) throw new Error(`unknown or zero channel ${label}`);
  return rows.get(label);
});
const direct = edges.map((_, index) => index === wallIndex ? 1 : 0);
const response = [...composition, direct];
const determinant = determinantBareiss(response);
const inverse = integerInverse(response);
const gram = edges.map((_, i) => edges.map((__, j) => response.reduce((sum, row) => sum + row[i] * row[j], 0)));
const singularValues = jacobiEigenvalues(gram).map((value) => Math.sqrt(Math.max(0, value))).sort((a, b) => a - b);
const conditionNumber = singularValues.at(-1) / singularValues[0];

if (schedule.directChannel !== "direct:QR-003") throw new Error("wrong direct completion channel");
if (composition.length !== 23 || rank(composition) !== 23) throw new Error("composition schedule is not a rank-23 basis");
if (rank(response) !== 24) throw new Error("completed schedule is not full rank");
if (determinant !== 1n && determinant !== -1n) throw new Error(`schedule is not unimodular: det=${determinant}`);
if (Math.abs(conditionNumber - schedule.conditioning.conditionNumber) > 1e-9) throw new Error("stored condition number drifted");
if (schedule.counts.path !== schedule.compositionChannels.filter((label) => label.startsWith("path_probe:")).length) throw new Error("path count drifted");
if (schedule.counts.triangle !== schedule.compositionChannels.filter((label) => label.startsWith("triangle_pair:")).length) throw new Error("triangle count drifted");

const noiseAmplification = inverse.map((row, index) => ({
  relation: edges[index].id,
  varianceFactor: row.reduce((sum, value) => sum + value * value, 0),
  nonzeroInverseCoefficients: row.filter((value) => value !== 0).length,
  maximumAbsoluteCoefficient: Math.max(...row.map(Math.abs)),
})).sort((a, b) => b.varianceFactor - a.varianceFactor || a.relation.localeCompare(b.relation));
const inverseNonzero = inverse.flat().filter((value) => value !== 0);
const measurementLabels = [...schedule.compositionChannels, schedule.directChannel];
const reconstruction = inverse.map((row, index) => ({
  relation: edges[index].id,
  terms: row.flatMap((coefficient, measurementIndex) => coefficient === 0 ? [] : [{
    channel: measurementLabels[measurementIndex], coefficient,
  }]),
}));

console.log(JSON.stringify({
  result: "pass",
  compositionRank: rank(composition),
  completedRank: rank(response),
  determinant: determinant.toString(),
  inverseIsIntegral: true,
  smallestSingularValue: singularValues[0],
  largestSingularValue: singularValues.at(-1),
  conditionNumber,
  channels: schedule.counts,
  inverse: {
    nonzeroCoefficients: inverseNonzero.length,
    totalCoefficients: inverse.length ** 2,
    maximumAbsoluteCoefficient: Math.max(...inverseNonzero.map(Math.abs)),
    worstEqualNoiseRelations: noiseAmplification.slice(0, 6),
    bestEqualNoiseRelations: noiseAmplification.slice(-6).reverse(),
  },
  reconstruction,
}, null, 2));

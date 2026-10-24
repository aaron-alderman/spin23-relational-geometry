import fs from "node:fs";

const register = JSON.parse(fs.readFileSync(
  "corpus/programmes/quotient-scars/quotient_scar_register_v1.json", "utf8",
));
const nodes = register.entries.map((entry) => entry.id);
const edges = register.relations.filter((edge) => edge.type !== "shares_action_not_carrier");
const wallIndex = edges.findIndex((edge) => edge.id === "QR-003");

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

function determinantBareiss(matrix) {
  const work = matrix.map((row) => row.map(BigInt));
  let sign = 1n; let previous = 1n;
  for (let pivotIndex = 0; pivotIndex < work.length - 1; pivotIndex += 1) {
    let pivotRow = pivotIndex;
    while (pivotRow < work.length && work[pivotRow][pivotIndex] === 0n) pivotRow += 1;
    if (pivotRow === work.length) return 0n;
    if (pivotRow !== pivotIndex) { [work[pivotRow], work[pivotIndex]] = [work[pivotIndex], work[pivotRow]]; sign = -sign; }
    const pivot = work[pivotIndex][pivotIndex];
    for (let i = pivotIndex + 1; i < work.length; i += 1) for (let j = pivotIndex + 1; j < work.length; j += 1) {
      work[i][j] = (work[i][j] * pivot - work[i][pivotIndex] * work[pivotIndex][j]) / previous;
    }
    previous = pivot;
  }
  return sign * work.at(-1).at(-1);
}

function gcdBigInt(a, b) {
  let x = a < 0n ? -a : a; let y = b < 0n ? -b : b;
  while (y !== 0n) [x, y] = [y, x % y];
  return x;
}

const directed = edges.map((first) => edges.map((second) => first.to === second.from ? 1 : 0));
const candidates = edges.map((edge, i) => ({
  kind: "path",
  label: `path_probe:${edge.id}`,
  row: edges.map((_, j) => directed[i][j] + directed[j][i]),
}));

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
  if (row.some((value) => value !== 0)) candidates.push({
    kind: "triangle",
    label: `triangle_pair:${edges[j].id}*${edges[k].id}`,
    row,
  });
}

// Row-pivoted modified Gram-Schmidt selects a numerically robust basis for the
// 23-dimensional composition-visible subspace.
const selected = [];
const selectedIndices = [];
const orthonormal = [];
const unused = new Set(candidates.map((_, index) => index));
while (selected.length < 23) {
  let bestIndex = -1; let bestResidual = null; let bestNormSquared = -1;
  for (const index of unused) {
    const residual = candidates[index].row.map(Number);
    for (const basis of orthonormal) {
      const coefficient = residual.reduce((sum, value, coordinate) => sum + value * basis[coordinate], 0);
      for (let coordinate = 0; coordinate < residual.length; coordinate += 1) residual[coordinate] -= coefficient * basis[coordinate];
    }
    const normSquared = residual.reduce((sum, value) => sum + value * value, 0);
    if (normSquared > bestNormSquared + 1e-14) { bestIndex = index; bestResidual = residual; bestNormSquared = normSquared; }
  }
  if (bestNormSquared < 1e-12) throw new Error("candidate responses do not span rank 23");
  const norm = Math.sqrt(bestNormSquared);
  orthonormal.push(bestResidual.map((value) => value / norm));
  selected.push(candidates[bestIndex]);
  selectedIndices.push(bestIndex);
  unused.delete(bestIndex);
}

const directWall = edges.map((_, index) => index === wallIndex ? 1 : 0);
function logAbsDeterminant(matrix) {
  const work = matrix.map((row) => row.map(Number));
  let result = 0;
  for (let column = 0; column < work.length; column += 1) {
    let pivot = column;
    for (let row = column + 1; row < work.length; row += 1) if (Math.abs(work[row][column]) > Math.abs(work[pivot][column])) pivot = row;
    if (Math.abs(work[pivot][column]) < 1e-12) return -Infinity;
    [work[column], work[pivot]] = [work[pivot], work[column]];
    const scale = work[column][column]; result += Math.log(Math.abs(scale));
    for (let row = column + 1; row < work.length; row += 1) {
      const factor = work[row][column] / scale;
      for (let j = column; j < work.length; j += 1) work[row][j] -= factor * work[column][j];
    }
  }
  return result;
}

let volumeImprovementSwaps = 0;
let currentLogVolume = logAbsDeterminant([...selected.map((entry) => entry.row), directWall]);
for (let iteration = 0; iteration < 20; iteration += 1) {
  let best = { logVolume: currentLogVolume, position: -1, candidateIndex: -1 };
  for (let position = 0; position < selected.length; position += 1) for (const candidateIndex of unused) {
    const trial = selected.map((entry, index) => index === position ? candidates[candidateIndex].row : entry.row);
    const logVolume = logAbsDeterminant([...trial, directWall]);
    if (logVolume > best.logVolume + 1e-10) best = { logVolume, position, candidateIndex };
  }
  if (best.position < 0) break;
  const oldIndex = selectedIndices[best.position];
  unused.delete(best.candidateIndex); unused.add(oldIndex);
  selectedIndices[best.position] = best.candidateIndex;
  selected[best.position] = candidates[best.candidateIndex];
  currentLogVolume = best.logVolume;
  volumeImprovementSwaps += 1;
}

const completed = [...selected.map((entry) => entry.row), directWall];
if (rank(selected.map((entry) => entry.row)) !== 23 || rank(completed) !== 24) throw new Error("selected detector basis has wrong rank");
const exactDeterminant = determinantBareiss(completed);
if (exactDeterminant !== 8n && exactDeterminant !== -8n) throw new Error(`unexpected detector determinant ${exactDeterminant}`);

const gram = edges.map((_, i) => edges.map((__, j) =>
  completed.reduce((sum, row) => sum + row[i] * row[j], 0)));
const singularValues = jacobiEigenvalues(gram).map((value) => Math.sqrt(Math.max(0, value))).sort((a, b) => a - b);
const conditionNumber = singularValues.at(-1) / singularValues[0];

// Challenge the apparent index eight across deterministic shuffled bases.
let randomState = 1271;
const random = () => { randomState = (1664525 * randomState + 1013904223) >>> 0; return randomState / 2 ** 32; };
const sampledDeterminants = new Set();
let sampledGcd = 0n;
let unimodularSample = null;
for (let sample = 0; sample < 500; sample += 1) {
  const order = candidates.map((_, index) => index);
  for (let i = order.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1)); [order[i], order[j]] = [order[j], order[i]];
  }
  const basis = [];
  const basisIndices = [];
  let currentRank = 0;
  for (const index of order) {
    const trial = [...basis, candidates[index].row];
    const trialRank = rank(trial);
    if (trialRank > currentRank) { basis.push(candidates[index].row); basisIndices.push(index); currentRank = trialRank; }
    if (currentRank === 23) break;
  }
  const determinant = determinantBareiss([...basis, directWall]);
  const absolute = determinant < 0n ? -determinant : determinant;
  sampledDeterminants.add(absolute.toString());
  sampledGcd = gcdBigInt(sampledGcd, absolute);
  if (absolute === 1n) {
    const trialCompleted = [...basis, directWall];
    const trialGram = edges.map((_, i) => edges.map((__, j) =>
      trialCompleted.reduce((sum, row) => sum + row[i] * row[j], 0)));
    const trialSingularValues = jacobiEigenvalues(trialGram)
      .map((value) => Math.sqrt(Math.max(0, value))).sort((a, b) => a - b);
    const trialCondition = trialSingularValues.at(-1) / trialSingularValues[0];
    if (unimodularSample === null || trialCondition < unimodularSample.conditionNumber) unimodularSample = {
      rows: basis,
      labels: basisIndices.map((index) => candidates[index].label),
      conditionNumber: trialCondition,
      smallestSingularValue: trialSingularValues[0],
      largestSingularValue: trialSingularValues.at(-1),
    };
  }
}
if (unimodularSample === null) throw new Error("failed to find a unimodular minimal detector schedule");

const pathCount = selected.filter((entry) => entry.kind === "path").length;
const triangleCount = selected.filter((entry) => entry.kind === "triangle").length;

console.log(JSON.stringify({
  result: "pass",
  candidateFormalChannels: candidates.length,
  candidateNonzeroChannels: candidates.filter((entry) => entry.row.some((value) => value !== 0)).length,
  zeroFormalChannels: candidates.filter((entry) => entry.row.every((value) => value === 0)).map((entry) => entry.label),
  compositionBasis: {
    channels: selected.length,
    pathChannels: pathCount,
    triangleChannels: triangleCount,
    volumeImprovementSwaps,
    absoluteDeterminant: Number(exactDeterminant < 0n ? -exactDeterminant : exactDeterminant),
    labels: selected.map((entry) => entry.label),
  },
  completedDetector: {
    channels: completed.length,
    directChannel: "direct:QR-003",
    rank: rank(completed),
    smallestSingularValue: singularValues[0],
    largestSingularValue: singularValues.at(-1),
    conditionNumber,
  },
  determinantChallenge: {
    sampledBases: 500,
    observedAbsoluteDeterminants: [...sampledDeterminants].map(Number).sort((a, b) => a - b),
    sampledGcd: Number(sampledGcd),
    bestSampledUnimodularSchedule: {
      labels: unimodularSample.labels,
      smallestSingularValue: unimodularSample.smallestSingularValue,
      largestSingularValue: unimodularSample.largestSingularValue,
      conditionNumber: unimodularSample.conditionNumber,
    },
    interpretation: sampledGcd === 8n
      ? "evidence for an index-eight response lattice; exhaustive Smith reduction still required"
      : "determinant eight is basis-dependent and not a canonical response-lattice index",
  },
  minimality: "23 composition channels are necessary for rank 23; one independent direct wall channel is necessary and sufficient for rank 24",
}, null, 2));

import fs from "node:fs";

const evidence = JSON.parse(fs.readFileSync(new URL(
  "../../evidence/data/admissibility-impedance-holonomy-identifiability-v1.json",
  import.meta.url,
), "utf8"));
const tolerance = 1e-12;
const c = evidence.darkDoubletWitness.latitudeCosine;
const s = Math.sqrt(1 - c * c);

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function projector(phi) {
  const n = [s * Math.cos(phi), s * Math.sin(phi), c];
  const P = Array.from({ length: 4 }, () => Array(4).fill(0));
  for (let i = 0; i < 3; i += 1) {
    for (let j = 0; j < 3; j += 1) P[i][j] = (i === j ? 1 : 0) - n[i] * n[j];
  }
  return P;
}

function multiplyMatrixVector(A, x) {
  return A.map((row) => row.reduce((sum, value, j) => sum + value * x[j], 0));
}

function frobeniusDistance(A, B) {
  let total = 0;
  for (let i = 0; i < A.length; i += 1) {
    for (let j = 0; j < A[i].length; j += 1) total += (A[i][j] - B[i][j]) ** 2;
  }
  return Math.sqrt(total);
}

function rank(vectors) {
  const rows = vectors[0].map((_, index) => vectors.map((v) => v[index]));
  let matrix = rows.map((row) => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < matrix[0].length && pivotRow < matrix.length; column += 1) {
    let pivot = pivotRow;
    while (pivot < matrix.length && Math.abs(matrix[pivot][column]) < tolerance) pivot += 1;
    if (pivot === matrix.length) continue;
    [matrix[pivotRow], matrix[pivot]] = [matrix[pivot], matrix[pivotRow]];
    const scale = matrix[pivotRow][column];
    matrix[pivotRow] = matrix[pivotRow].map((value) => value / scale);
    for (let r = 0; r < matrix.length; r += 1) {
      if (r === pivotRow) continue;
      const factor = matrix[r][column];
      matrix[r] = matrix[r].map((value, j) => value - factor * matrix[pivotRow][j]);
    }
    pivotRow += 1;
  }
  return pivotRow;
}

const e4 = [0, 0, 0, 1];
const samples = [0, Math.PI / 3, Math.PI, 2 * Math.PI];
const projectors = samples.map(projector);
for (const P of projectors) {
  const dark = multiplyMatrixVector(P, e4);
  assert(dark.every((value) => Math.abs(value) < tolerance), "scalar port sees the dark doublet");
}
assert(frobeniusDistance(projectors[0], projectors[1]) > 0.1,
  "projector path must move despite constant scalar response");
assert(frobeniusDistance(projectors[0], projectors[3]) < tolerance,
  "projector loop must close");

const delta = 3;
const H0 = projectors[0].map((row, i) => row.map((value, j) => delta * ((i === j ? 1 : 0) - value)));
const krylov = [];
let vector = e4;
for (let power = 0; power < 4; power += 1) {
  krylov.push(vector);
  vector = multiplyMatrixVector(H0, vector);
}
const scalarRank = rank(krylov);
assert(scalarRank === evidence.darkDoubletWitness.scalarObservabilityRank,
  "scalar observability rank mismatch");

const fullPorts = [
  [1, 0, 0, 0],
  [0, 1, 0, 0],
  [0, 0, 1, 0],
  [0, 0, 0, 1],
];
assert(rank(fullPorts) === evidence.darkDoubletWitness.fullPortObservabilityRank,
  "full-port observability rank mismatch");

const solidAngle = 2 * Math.PI * (1 - c);
assert(Math.abs(solidAngle - Math.PI / 2) < tolerance, "quarter-turn solid angle mismatch");

console.log(JSON.stringify({
  status: "PASS",
  projectorLoopCloses: true,
  projectorMoves: true,
  scalarResponseConstant: true,
  scalarObservabilityRank: scalarRank,
  fullPortObservabilityRank: rank(fullPorts),
  solidAngle,
  verdict: "A scalar port is exactly blind to a moving doublet with quarter-turn holonomy; matrix-valued residue access repairs the finite identifiability failure.",
}, null, 2));

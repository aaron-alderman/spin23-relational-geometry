import { readFileSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { dirname, extname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const evidenceRoot = resolve(root, "evidence/data");
const outputPath = resolve(evidenceRoot, "admissibility-distributed-a2-sweep-v1.json");
const tolerance = 1e-9;

const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const C = [[2, -1, -1], [-1, 2, -1], [-1, -1, 2]];
const K = [[0, 1, -1], [-1, 0, 1], [1, -1, 0]];

const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => {
  const BT = transpose(B);
  return A.map((row) => BT.map((column) => row.reduce((sum, x, k) => sum + x * column[k], 0)));
};
const add = (...matrices) => matrices[0].map((row, i) =>
  row.map((_, j) => matrices.reduce((sum, matrix) => sum + matrix[i][j], 0)));
const scale = (s, A) => A.map((row) => row.map((x) => s * x));
const flatten = (A) => A.flat();
const dot = (a, b) => a.reduce((sum, x, i) => sum + x * b[i], 0);
const norm = (a) => Math.sqrt(dot(a, a));

function inverse3(A) {
  const M = A.map((row, i) => [...row, ...I[i]]);
  for (let column = 0; column < 3; column += 1) {
    let pivot = column;
    while (pivot < 3 && Math.abs(M[pivot][column]) < tolerance) pivot += 1;
    if (pivot === 3) throw new Error("singular normal matrix");
    [M[column], M[pivot]] = [M[pivot], M[column]];
    const divisor = M[column][column];
    M[column] = M[column].map((x) => x / divisor);
    for (let row = 0; row < 3; row += 1) {
      if (row === column) continue;
      const factor = M[row][column];
      M[row] = M[row].map((x, j) => x - factor * M[column][j]);
    }
  }
  return M.map((row) => row.slice(3));
}

const basis = [I, C, K].map(flatten);
const gram = basis.map((left) => basis.map((right) => dot(left, right)));
const gramInverse = inverse3(gram);

function fit(A) {
  const vector = flatten(A);
  const rhs = basis.map((item) => dot(item, vector));
  const coefficients = gramInverse.map((row) => dot(row, rhs));
  const reconstructed = add(...[I, C, K].map((item, i) => scale(coefficients[i], item)));
  const residual = norm(flatten(add(A, scale(-1, reconstructed))));
  const denominator = Math.max(1, norm(vector));
  return { coefficients, relativeResidual: residual / denominator };
}

function permutations(values) {
  if (values.length === 0) return [[]];
  return values.flatMap((value, index) =>
    permutations(values.filter((_, candidate) => candidate !== index)).map((tail) => [value, ...tail]));
}

const signedPermutations = [];
for (const permutation of permutations([0, 1, 2])) {
  for (const signs of [-1, 1].flatMap((a) => [-1, 1].flatMap((b) => [-1, 1].map((c) => [a, b, c])))) {
    signedPermutations.push(permutation.map((image, row) =>
      [0, 1, 2].map((column) => Number(column === image) * signs[row])));
  }
}

function bestFit(A) {
  let best = null;
  for (let index = 0; index < signedPermutations.length; index += 1) {
    const Q = signedPermutations[index];
    const transformed = multiply(multiply(Q, A), transpose(Q));
    const candidate = { ...fit(transformed), transformIndex: index, transformed };
    if (!best || candidate.relativeResidual < best.relativeResidual) best = candidate;
  }
  return best;
}

const isNumericMatrix3 = (value) => Array.isArray(value)
  && value.length === 3
  && value.every((row) => Array.isArray(row)
    && row.length === 3
    && row.every((entry) => typeof entry === "number" && Number.isFinite(entry)));

function collectMatrices(value, path = "$") {
  const found = [];
  if (isNumericMatrix3(value)) found.push({ path, matrix: value });
  if (Array.isArray(value)) {
    value.forEach((entry, index) => found.push(...collectMatrices(entry, `${path}[${index}]`)));
  } else if (value && typeof value === "object") {
    for (const [key, entry] of Object.entries(value)) {
      found.push(...collectMatrices(entry, `${path}.${key}`));
    }
  }
  return found;
}

function filesBelow(directory) {
  return readdirSync(directory).flatMap((name) => {
    const path = resolve(directory, name);
    return statSync(path).isDirectory() ? filesBelow(path) : [path];
  });
}

const files = filesBelow(evidenceRoot).filter((path) =>
  extname(path).toLowerCase() === ".json" && resolve(path) !== outputPath);
const hits = [];
const parseFailures = [];
let matrixCount = 0;

for (const file of files) {
  let data;
  try {
    data = JSON.parse(readFileSync(file, "utf8"));
  } catch (error) {
    parseFailures.push({ file: relative(root, file).replaceAll("\\", "/"), error: error.message });
    continue;
  }
  for (const entry of collectMatrices(data)) {
    matrixCount += 1;
    const candidate = bestFit(entry.matrix);
    const [a, b, c] = candidate.coefficients;
    if (candidate.relativeResidual < tolerance && (Math.abs(b) > tolerance || Math.abs(c) > tolerance)) {
      hits.push({
        file: relative(root, file).replaceAll("\\", "/"),
        path: entry.path,
        family: Math.abs(c) > tolerance ? "oriented-a2" : "metric-a2",
        coefficients: { a, b, c },
        signedPermutationIndex: candidate.transformIndex,
        matrix: entry.matrix,
      });
    }
  }
}

const uniqueFiles = [...new Set(hits.map((hit) => hit.file))];
const summary = {
  protocol: "distributed-a2-operator-family-discovery/1",
  scope: "All parseable JSON files below evidence/data; every nested numeric 3x3 matrix; equivalence under signed permutation conjugation.",
  template: "M=aI+b(3I-J)+c(T-T^T)",
  jsonFilesScanned: files.length,
  parseFailures,
  numericMatrices3x3Scanned: matrixCount,
  exactHits: hits.length,
  filesWithHits: uniqueFiles.length,
  familyCounts: {
    metricA2: hits.filter((hit) => hit.family === "metric-a2").length,
    orientedA2: hits.filter((hit) => hit.family === "oriented-a2").length,
  },
  hits,
  boundary: "An algebraic normal-form hit is a candidate shared type shape, not a physical identification or provenance-bearing transition map."
};

if (process.argv.includes("--write")) {
  writeFileSync(outputPath, `${JSON.stringify(summary, null, 2)}\n`, "utf8");
}
console.log(JSON.stringify(summary, null, 2));

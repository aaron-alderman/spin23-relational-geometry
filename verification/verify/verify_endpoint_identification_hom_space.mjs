import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/endpoint_identification_hom_space_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const sub = (A, B) => A.map((row, i) => row.map((value, j) => value - B[i][j]));
const flat = (A) => A.flat();
const rank = (rows, tolerance = 1e-10) => {
  const A = rows.map((row) => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < A[0].length && pivotRow < A.length; column += 1) {
    let pivot = pivotRow;
    for (let row = pivotRow + 1; row < A.length; row += 1) if (Math.abs(A[row][column]) > Math.abs(A[pivot][column])) pivot = row;
    if (Math.abs(A[pivot][column]) < tolerance) continue;
    [A[pivotRow], A[pivot]] = [A[pivot], A[pivotRow]];
    const q = A[pivotRow][column];
    for (let j = column; j < A[0].length; j += 1) A[pivotRow][j] /= q;
    for (let row = 0; row < A.length; row += 1) if (row !== pivotRow) {
      const f = A[row][column];
      for (let j = column; j < A[0].length; j += 1) A[row][j] -= f * A[pivotRow][j];
    }
    pivotRow += 1;
  }
  return pivotRow;
};
const commutantDimension = (generators, n) => {
  const equations = [];
  for (const G of generators) for (let i = 0; i < n; i += 1) for (let j = 0; j < n; j += 1) {
    const row = Array(n * n).fill(0);
    for (let k = 0; k < n; k += 1) {
      row[i * n + k] += G[k][j];
      row[k * n + j] -= G[i][k];
    }
    equations.push(row);
  }
  return n * n - rank(equations);
};

const cycle = [[0,0,1],[1,0,0],[0,1,0]];
const reflection = [[0,1,0],[1,0,0],[0,0,1]];
const s3HomDimension = commutantDimension([cycle, reflection], 3);
insist(s3HomDimension === 2, "S3 equivariant Hom dimension mismatch");

const J = Array.from({ length: 3 }, () => Array(3).fill(1 / 3));
const I = [[1,0,0],[0,1,0],[0,0,1]];
const A2 = sub(I, J);
for (const x of [-1, 1]) for (const y of [-1, 1]) {
  const T = J.map((row, i) => row.map((value, j) => x * value + y * A2[i][j]));
  const TT = mul(T.map((_, j) => T.map((row) => row[j])), T);
  insist(flat(sub(TT, I)).every((value) => Math.abs(value) < 1e-12), "declared S3 isometry failed");
}

const e12 = [[0,1],[0,0]], e21 = [[0,0],[1,0]];
const m2HomDimension = commutantDimension([e12, e21], 2);
insist(m2HomDimension === 1, "M2 module Hom dimension mismatch");
insist(ledger.threeCarrier.realEquivariantHomDimension === 2, "ledger three-carrier dimension mismatch");
insist(ledger.twoCarrier.fullM2EquivariantHomDimension === 1, "ledger two-carrier dimension mismatch");

console.log(JSON.stringify({
  status: "PASS",
  threeCarrier: {
    realS3EquivariantHomDimension: s3HomDimension,
    realIsometricMapsAfterLabelChoice: 4,
    labelTorsor: 6,
  },
  twoCarrier: { fullM2EquivariantHomDimension: m2HomDimension },
  canonicalFromRepresentationTypeAlone: false,
  remainingDatum: "label, basis and relative-phase provenance",
}));

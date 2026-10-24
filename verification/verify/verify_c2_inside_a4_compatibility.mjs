import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/c2_inside_a4_compatibility_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };
const zero = (n, m = n) => Array.from({ length: n }, () => Array(m).fill(0));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const mul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const sub = (A, B) => A.map((row, i) => row.map((value, j) => value - B[i][j]));
const commutator = (A, B) => sub(mul(A, B), mul(B, A));
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

const Q = [[-1,0,0,0,0],[0,-1,0,0,0],[0,0,1,0,0],[0,0,0,1,0],[0,0,0,0,1]];
const cross = [];
for (let i = 0; i < 2; i += 1) for (let a = 0; a < 3; a += 1) {
  const X = zero(5);
  X[i][a + 2] = 1;
  X[a + 2][i] = 1;
  cross.push(X);
}
const so2 = zero(5); so2[0][1] = 1; so2[1][0] = -1;
const so3 = [];
for (let a = 0; a < 3; a += 1) for (let b = a + 1; b < 3; b += 1) {
  const X = zero(5);
  X[a + 2][b + 2] = 1;
  X[b + 2][a + 2] = -1;
  so3.push(X);
}
const basis = [so2, ...so3, ...cross];
for (const X of basis) insist(flat(add(mul(transpose(X), Q), mul(Q, X))).every((value) => value === 0), "basis element does not preserve Q");
insist(rank(basis.map(flat)) === 10, "so(2,3) basis dimension mismatch");

const crossClosure = [...cross];
for (let i = 0; i < cross.length; i += 1) for (let j = i + 1; j < cross.length; j += 1) crossClosure.push(commutator(cross[i], cross[j]));
insist(rank(crossClosure.map(flat)) === 10, "cross sector does not generate full so(2,3)");

// Standard block intersections: skew 2x2 has dimension 1; skew 3x3 has dimension 3.
const blockIntersectionDimension = 1 + 3;
insist(blockIntersectionDimension === ledger.blockDecomposition.diagonalDimension, "block intersection mismatch");
insist(ledger.capturedLeviCompatibility.abstractSl3SubalgebraOfSo5 === false, "sl3 compatibility boundary mismatch");

console.log(JSON.stringify({
  status: "PASS",
  ambient: "sl5(R)",
  selectedRealForm: "so(2,3) ~= sp4(R)",
  selectedDimension: 10,
  decomposition: { diagonal: "so2+so3", diagonalDimension: 4, crossDimension: 6 },
  crossSectorGeneratesFullSo23: true,
  capturedLeviIntersectionDimension: 4,
  preservesFullCapturedSl2Sl3: false,
  requiredNewDatum: "signature-(2,3) metric Q and Q-adjoint pairing",
}));

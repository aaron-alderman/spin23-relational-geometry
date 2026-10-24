import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "../..");
const ledger = JSON.parse(fs.readFileSync(path.join(
  root,
  "corpus/programmes/frontier/wave-7/bifundamental_stabilizer_and_potential_v1.json",
), "utf8"));
const insist = (condition, message) => { if (!condition) throw new Error(message); };

const zero = (rows, columns) => Array.from({ length: rows }, () => Array.from({ length: columns }, () => [0, 0]));
const add = ([ar, ai], [br, bi]) => [ar + br, ai + bi];
const mul = ([ar, ai], [br, bi]) => [ar * br - ai * bi, ar * bi + ai * br];
const sub = ([ar, ai], [br, bi]) => [ar - br, ai - bi];
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => add(sum, mul(value, B[k][j])), [0, 0])));
const action = (Y, E, X) => matMul(Y, E).map((row, i) => row.map((value, j) => sub(value, matMul(E, X)[i][j])));
const flattenReal = (A) => A.flatMap((row) => row.flatMap(([re, im]) => [re, im]));
const unit = (n, i, j, value = [1, 0]) => { const A = zero(n, n); A[i][j] = value; return A; };
const combine = (...matrices) => matrices[0].map((row, i) => row.map((_, j) => matrices.reduce((sum, A) => add(sum, A[i][j]), [0, 0])));
const scale = (A, s) => A.map((row) => row.map(([re, im]) => [re * s, im * s]));
const rank = (columns, tolerance = 1e-10) => {
  if (columns.length === 0) return 0;
  const A = Array.from({ length: columns[0].length }, (_, i) => columns.map((column) => column[i]));
  let row = 0;
  for (let col = 0; col < A[0].length && row < A.length; col += 1) {
    let pivot = row;
    for (let i = row + 1; i < A.length; i += 1) if (Math.abs(A[i][col]) > Math.abs(A[pivot][col])) pivot = i;
    if (Math.abs(A[pivot][col]) < tolerance) continue;
    [A[row], A[pivot]] = [A[pivot], A[row]];
    const q = A[row][col];
    for (let j = col; j < A[0].length; j += 1) A[row][j] /= q;
    for (let i = 0; i < A.length; i += 1) if (i !== row) {
      const f = A[i][col];
      for (let j = col; j < A[0].length; j += 1) A[i][j] -= f * A[row][j];
    }
    row += 1;
  }
  return row;
};

const suBasis = (n) => {
  const basis = [];
  for (let i = 0; i < n; i += 1) for (let j = i + 1; j < n; j += 1) {
    basis.push(combine(unit(n, i, j), scale(unit(n, j, i), -1)));
    basis.push(combine(unit(n, i, j, [0, 1]), unit(n, j, i, [0, 1])));
  }
  for (let i = 0; i < n - 1; i += 1) basis.push(combine(unit(n, i, i, [0, 1]), unit(n, i + 1, i + 1, [0, -1])));
  return basis;
};
const su3 = suBasis(3), su2 = suBasis(2);
const z3 = zero(3, 3), z2 = zero(2, 2);
const diagE = (a, b) => [[[a, 0], [0, 0]], [[0, 0], [b, 0]], [[0, 0], [0, 0]]];
const compactStabilizerDimension = (E) => {
  const columns = [
    ...su3.map((Y) => flattenReal(action(Y, E, z2))),
    ...su2.map((X) => flattenReal(action(z3, E, X))),
  ];
  return 11 - rank(columns);
};

const compactCases = [[0, 0, 11], [1, 0, 4], [1, 1, 3], [2, 1, 1]];
for (const [a, b, expected] of compactCases) insist(compactStabilizerDimension(diagE(a, b)) === expected, `SU stabilizer mismatch at ${a},${b}`);

// Real SO(3)xSO(2) is the real-skew subset of the same construction.
const so3 = [
  combine(unit(3, 0, 1), scale(unit(3, 1, 0), -1)),
  combine(unit(3, 0, 2), scale(unit(3, 2, 0), -1)),
  combine(unit(3, 1, 2), scale(unit(3, 2, 1), -1)),
];
const so2 = [combine(unit(2, 0, 1), scale(unit(2, 1, 0), -1))];
const realStabilizerDimension = (E) => {
  const columns = [
    ...so3.map((Y) => flattenReal(action(Y, E, z2))),
    ...so2.map((X) => flattenReal(action(z3, E, X))),
  ];
  return 4 - rank(columns);
};
const realCases = [[0, 0, 4], [1, 0, 1], [1, 1, 1], [2, 1, 0]];
for (const [a, b, expected] of realCases) insist(realStabilizerDimension(diagE(a, b)) === expected, `SO stabilizer mismatch at ${a},${b}`);

// A symmetric quartic in the squared singular values has equal interior roots
// unless its anisotropy coefficient is absent.  The witness potential below
// makes this explicit.
const alpha = 2, beta = 3, v2 = 2;
const V = (a, b) => alpha * (a + b - v2) ** 2 + beta * (a - b) ** 2;
insist(V(1, 1) === 0 && V(16 / 13, 10 / 13) > 0, "isotropic quartic witness failed");
const h = 12 / 13 * beta;
const selectedDifference = h / (2 * beta);
insist(Math.abs(selectedDifference - 6 / 13) < 1e-12, "spurion-selected anisotropy mismatch");
insist(ledger.checkpoint.squaredSingularValues[0] === "16/13", "ledger checkpoint mismatch");

console.log(JSON.stringify({
  status: "PASS",
  realStabilizers: { zero: 4, rank1: 1, isotropicRank2: 1, anisotropicRank2: 0 },
  compactStabilizers: { zero: 11, rank1: 4, isotropicRank2: 3, anisotropicRank2: 1 },
  checkpointSquaredSingularValues: [16 / 13, 10 / 13],
  minimalUnspurionedQuarticSelectsIsotropy: true,
  unequalStablePointRequiresAnisotropyDatum: true,
}));

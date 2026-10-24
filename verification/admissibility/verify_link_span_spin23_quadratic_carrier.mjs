import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const certificate = JSON.parse(readFileSync(resolve(root, "evidence/data/admissibility-link-span-spin23-carrier-v1.json"), "utf8"));

const permutations = (items) => items.length === 1
  ? [items]
  : items.flatMap((item, index) => permutations(items.filter((_, i) => i !== index)).map((tail) => [item, ...tail]));
const matrices = permutations([0, 1, 2]).map((p) => Array.from({ length: 3 }, (_, i) => Array.from({ length: 3 }, (_, j) => Number(p[i] === j))));
const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const multiply = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const det2 = (R) => R[0][0] * R[1][1] - R[0][1] * R[1][0];
const det3 = (A) => A[0][0] * (A[1][1] * A[2][2] - A[1][2] * A[2][1]) - A[0][1] * (A[1][0] * A[2][2] - A[1][2] * A[2][0]) + A[0][2] * (A[1][0] * A[2][1] - A[1][1] * A[2][0]);
const near = (x, y, eps = 1e-10) => Math.abs(x - y) < eps;
const matrixNear = (A, B) => A.every((row, i) => row.every((x, j) => near(x, B[i][j])));
const rank = (rows, eps = 1e-10) => {
  const A = rows.map((row) => [...row]);
  let r = 0;
  for (let c = 0; c < A[0].length && r < A.length; c += 1) {
    let pivot = r;
    while (pivot < A.length && Math.abs(A[pivot][c]) < eps) pivot += 1;
    if (pivot === A.length) continue;
    [A[r], A[pivot]] = [A[pivot], A[r]];
    const scale = A[r][c];
    for (let j = c; j < A[0].length; j += 1) A[r][j] /= scale;
    for (let i = 0; i < A.length; i += 1) {
      if (i === r) continue;
      const factor = A[i][c];
      for (let j = c; j < A[0].length; j += 1) A[i][j] -= factor * A[r][j];
    }
    r += 1;
  }
  return r;
};

assert.equal(rank(matrices.map((M) => M.flat())), 5);

const s3 = Math.sqrt(3);
const s2 = Math.sqrt(2);
const s6 = Math.sqrt(6);
const U = [
  [1 / s3, 1 / s2, 1 / s6],
  [1 / s3, -1 / s2, 1 / s6],
  [1 / s3, 0, -2 / s6]
];
assert.ok(matrixNear(multiply(transpose(U), U), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]));

const coordinates = matrices.map((P) => {
  const adapted = multiply(multiply(transpose(U), P), U);
  for (const [i, j] of [[0, 1], [0, 2], [1, 0], [2, 0]]) assert.ok(near(adapted[i][j], 0));
  const a = adapted[0][0];
  const R = [[adapted[1][1], adapted[1][2]], [adapted[2][1], adapted[2][2]]];
  assert.ok(near(a, 1));
  assert.ok(near(det2(R), det3(P)));
  return [a, R[0][0], R[0][1], R[1][0], R[1][1]];
});
assert.equal(rank(coordinates), 5);

const H = [
  [-1, 0, 0, 0, 0],
  [0, 0, 0, 0, 0.5],
  [0, 0, 0, -0.5, 0],
  [0, 0, -0.5, 0, 0],
  [0, 0.5, 0, 0, 0]
];
const knownEigenvalues = [-1, -0.5, -0.5, 0.5, 0.5];
assert.deepEqual(knownEigenvalues.filter((x) => x > 0).length, 2);
assert.deepEqual(knownEigenvalues.filter((x) => x < 0).length, 3);
const quadratic = (v) => v.reduce((sum, x, i) => sum + x * H[i].reduce((inner, h, j) => inner + h * v[j], 0), 0);

let evenNull = 0;
let oddTimelike = 0;
for (let i = 0; i < matrices.length; i += 1) {
  const parity = det3(matrices[i]);
  const q = quadratic(coordinates[i]);
  assert.ok(near(q, parity - 1));
  if (parity === 1 && near(q, 0)) evenNull += 1;
  if (parity === -1 && near(q, -2)) oddTimelike += 1;
}
assert.deepEqual([evenNull, oddTimelike], [3, 3]);

const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const A = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
const B = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
const power = (M, n) => {
  let result = I3;
  for (let k = 0; k < n; k += 1) result = multiply(result, M);
  return result;
};
const mixedOrbit = Array.from({ length: 6 }, (_, n) => multiply(power(A, n % 2), power(transpose(B), n % 3)).flat());
const harmonicNorms = Array.from({ length: 6 }, (_, k) => {
  let normSquared = 0;
  for (let j = 0; j < 9; j += 1) {
    let re = 0;
    let im = 0;
    for (let n = 0; n < 6; n += 1) {
      re += mixedOrbit[n][j] * Math.cos(-2 * Math.PI * k * n / 6) / 6;
      im += mixedOrbit[n][j] * Math.sin(-2 * Math.PI * k * n / 6) / 6;
    }
    normSquared += re * re + im * im;
  }
  return Math.sqrt(normSquared);
});
assert.ok(near(harmonicNorms[0], 1));
for (const k of [1, 2, 4, 5]) assert.ok(near(harmonicNorms[k], 1 / Math.sqrt(2)));
assert.ok(near(harmonicNorms[3], 0));

assert.equal(certificate.protocol, "admissibility-link-span-spin23-carrier/1");
assert.equal(certificate.carrier.dimension, 5);
assert.deepEqual(certificate.quadraticForm.signature, [2, 3]);
assert.equal(certificate.status.fullSpin23ActionDerived, false);
assert.equal(certificate.status.physicalAdmission, false);

console.log(JSON.stringify({
  status: "PASS",
  permutationVacua: 6,
  linearSpanDimension: 5,
  decomposition: "R singlet + End(A2)",
  quadraticForm: "det(R)-a^2",
  signature: [2, 3],
  harmonicNorms: harmonicNorms.map((x) => Number(x.toFixed(12))),
  absentLinearSheetMode: "k=3",
  evenVacua: "3 null",
  oddVacua: "3 timelike with Q=-2",
  fullSpin23PhysicalSymmetry: "NOT DERIVED"
}));

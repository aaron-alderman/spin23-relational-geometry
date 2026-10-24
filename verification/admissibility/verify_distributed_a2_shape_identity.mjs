import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "../..");
const ledger = JSON.parse(
  readFileSync(resolve(root, "evidence/data/admissibility-distributed-a2-shape-v1.json"), "utf8"),
);

const I = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const J = [[1, 1, 1], [1, 1, 1], [1, 1, 1]];
const T = [[0, 1, 0], [0, 0, 1], [1, 0, 0]];
const F = [[1, 0, 0], [0, 0, 1], [0, 1, 0]];
const mark = [1, 0, 0];

const transpose = (A) => A[0].map((_, j) => A.map((row) => row[j]));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map((row) => row.map((x) => {
  const value = s * x;
  return Object.is(value, -0) ? 0 : value;
}));
const subtract = (A, B) => add(A, scale(-1, B));
const multiply = (A, B) => {
  const BT = transpose(B);
  return A.map((row) => BT.map((column) => row.reduce((sum, x, k) => sum + x * column[k], 0)));
};
const close = (A, B, tolerance = 1e-12) =>
  A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tolerance));

const P0 = add(I, scale(-1 / 3, J));
const C = add(scale(3, I), scale(-1, J));
const D = [[-2, 1, 1], [1, -2, 1], [1, 1, -2]];
const familyGram = multiply(transpose(D), D);
const fureySigned = add(scale(2, I), C);
const K = subtract(T, transpose(T));

assert.ok(close(C, scale(3, P0)));
assert.ok(close(D, scale(-1, C)));
assert.ok(close(familyGram, scale(3, C)));
assert.ok(close(fureySigned, [[4, -1, -1], [-1, 4, -1], [-1, -1, 4]]));
assert.ok(close(multiply(K, K), scale(-1, C)));
assert.ok(close(multiply(transpose(K), K), C));
assert.ok(close(multiply(P0, K), K));
assert.ok(close(multiply(K, P0), K));
assert.ok(close(multiply(scale(1 / Math.sqrt(3), K), scale(1 / Math.sqrt(3), K)), scale(-1, P0)));

const permutations = (values) => values.length === 0
  ? [[]]
  : values.flatMap((value, index) =>
      permutations(values.filter((_, candidate) => candidate !== index)).map((tail) => [value, ...tail]));
const permutationMatrix = (p) => p.map((image) => [0, 1, 2].map((j) => Number(j === image)));
const conjugate = (A, p) => {
  const P = permutationMatrix(p);
  return multiply(multiply(P, A), transpose(P));
};
const preservesVector = (v, p) => v.every((x, i) => x === v[p[i]]);
const all = permutations([0, 1, 2]);
const metric = all.filter((p) => close(conjugate(C, p), C));
const oriented = metric.filter((p) => close(conjugate(K, p), K));
const marked = metric.filter((p) => preservesVector(mark, p));
const framed = oriented.filter((p) => preservesVector(mark, p));

assert.equal(metric.length, ledger.stabilizers.metric_only.order);
assert.equal(oriented.length, ledger.stabilizers.metric_plus_orientation.order);
assert.equal(marked.length, ledger.stabilizers.metric_plus_mark.order);
assert.equal(framed.length, ledger.stabilizers.metric_plus_orientation_plus_mark.order);
assert.ok(close(multiply(multiply(F, K), transpose(F)), scale(-1, K)));

assert.equal(ledger.verdict.common_representation_shape_established, true);
assert.equal(ledger.verdict.physical_label_identification_established, false);
assert.equal(ledger.verdict.dynamical_orientation_selection_established, false);
assert.equal(ledger.verdict.e8_closure_established, false);

console.log(JSON.stringify({
  status: "PASS",
  exact_chain: ["C=3P0", "D=-C", "D^T D=3C", "M_F=2I+C", "K^2=-C"],
  decomposition: "R3=1+A2",
  stabilizer_orders: { metric: metric.length, oriented: oriented.length, marked: marked.length, framed: framed.length },
  physical_identification: "OPEN"
}));


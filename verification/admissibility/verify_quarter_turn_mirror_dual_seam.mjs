import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const root = new URL("../../", import.meta.url);
const evidence = JSON.parse(readFileSync(new URL("evidence/data/admissibility-quarter-turn-mirror-dual-seam-v1.json", root), "utf8"));
const document = readFileSync(new URL("corpus/programmes/admissibility/admissibility_130_quarter_turn_and_mirror_generate_the_dual_seam.md", root), "utf8");

const one = [[1, 0], [0, 1]];
const zero = [[0, 0], [0, 0]];
const I = [[0, -1], [1, 0]];
const J = [[0, 1], [1, 0]];
const multiply = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((sum, value, k) => sum + value * B[k][j], 0)));
const add = (A, B) => A.map((row, i) => row.map((value, j) => value + B[i][j]));
const subtract = (A, B) => add(A, scale(-1, B));
const scale = (s, A) => A.map(row => row.map(value => s * value));
const determinant = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const maxError = (A, B) => Math.max(...A.flatMap((row, i) => row.map((value, j) => Math.abs(value - B[i][j]))));
const commutator = (A, B) => subtract(multiply(A, B), multiply(B, A));
const rank = input => {
  const A = input.map(row => [...row]);
  let pivotRow = 0;
  for (let column = 0; column < A[0].length && pivotRow < A.length; column += 1) {
    const pivot = A.findIndex((row, index) => index >= pivotRow && Math.abs(row[column]) > 1e-12);
    if (pivot < 0) continue;
    [A[pivotRow], A[pivot]] = [A[pivot], A[pivotRow]];
    const scaleFactor = A[pivotRow][column];
    A[pivotRow] = A[pivotRow].map(value => value / scaleFactor);
    for (let row = 0; row < A.length; row += 1) {
      if (row === pivotRow) continue;
      const factor = A[row][column];
      A[row] = A[row].map((value, index) => value - factor * A[pivotRow][index]);
    }
    pivotRow += 1;
  }
  return pivotRow;
};

const K = multiply(I, J);
assert.ok(maxError(multiply(I, I), scale(-1, one)) < 1e-12);
assert.ok(maxError(multiply(J, J), one) < 1e-12);
assert.ok(maxError(multiply(K, K), one) < 1e-12);
assert.ok(maxError(add(multiply(I, J), multiply(J, I)), zero) < 1e-12);

const nPlus = scale(0.5, add(J, I));
const nMinus = scale(0.5, subtract(J, I));
assert.ok(maxError(multiply(nPlus, nPlus), zero) < 1e-12);
assert.ok(maxError(multiply(nMinus, nMinus), zero) < 1e-12);
assert.ok(maxError(add(multiply(nPlus, nMinus), multiply(nMinus, nPlus)), one) < 1e-12);
assert.ok(maxError(commutator(nPlus, nMinus), K) < 1e-12);
assert.ok(maxError(add(nPlus, nMinus), J) < 1e-12);
assert.ok(maxError(subtract(nPlus, nMinus), I) < 1e-12);

const flattened = [one, I, J, K].map(matrix => matrix.flat());
assert.equal(rank(flattened), 4);

for (const kappa of [-1, -0.4, 0, 0.7, 1]) {
  const X = add(scale((1 + kappa) / 2, J), scale((1 - kappa) / 2, I));
  assert.ok(maxError(multiply(X, X), scale(kappa, one)) < 1e-12);
  assert.ok(Math.abs(-determinant(X) - kappa) < 1e-12);
}

assert.equal(evidence.packet, "AZ-130");
assert.equal(evidence.closure.dimension, 4);
assert.equal(evidence.boundaries.sourceNativeAnticommutingPairDerived, false);

for (const required of [
  "Cl(1,1)\\cong M_2(\\mathbb R)",
  "The dual seam is derived",
  "two dual-number seams",
  "Local Spin geometry",
  "The two side rails are the",
  "idempotent decomposition; the rungs are nilpotent maps",
  "Physical firewall"
]) assert.ok(document.includes(required), `missing required closure text: ${required}`);

console.log(JSON.stringify({
  result: "pass",
  packet: evidence.packet,
  algebraDimension: evidence.closure.dimension,
  nilpotentSeams: 2,
  nextGate: evidence.nextGate
}, null, 2));

import assert from "node:assert/strict";

const fano = [
  [1, 2, 3], [1, 4, 5], [1, 7, 6], [2, 4, 6],
  [2, 5, 7], [3, 4, 7], [3, 6, 5]
];

const basisProduct = (i, j) => {
  if (i === 0) return [1, j];
  if (j === 0) return [1, i];
  if (i === j) return [-1, 0];
  for (const [a, b, c] of fano) {
    for (const [u, v, w] of [[a, b, c], [b, c, a], [c, a, b]]) {
      if (i === u && j === v) return [1, w];
      if (i === v && j === u) return [-1, w];
    }
  }
  throw new Error(`missing product e${i}e${j}`);
};

const zero = () => Array(8).fill(0);
const unit = (i) => { const out = zero(); out[i] = 1; return out; };
const sub = (x, y) => x.map((v, i) => v - y[i]);
const dot = (x, y) => x.reduce((sum, v, i) => sum + v * y[i], 0);
const norm2 = (x) => dot(x, x);
const mul = (x, y) => {
  const out = zero();
  for (let i = 0; i < 8; i += 1) for (let j = 0; j < 8; j += 1) {
    const [sign, k] = basisProduct(i, j);
    out[k] += sign * x[i] * y[j];
  }
  return out;
};
const associator = (a, b, c) => sub(mul(mul(a, b), c), mul(a, mul(b, c)));

const matrix = (entry) => Array.from({length: 8}, (_, i) => Array.from({length: 8}, (_, j) => entry(i, j)));
const mmul = (A, B) => matrix((i, j) => A[i].reduce((sum, v, k) => sum + v * B[k][j], 0));
const msub = (A, B) => matrix((i, j) => A[i][j] - B[i][j]);
const mvec = (A, x) => A.map((row) => dot(row, x));
const frobenius2 = (A) => A.reduce((sum, row) => sum + norm2(row), 0);
const leftAction = (a) => matrix((i, j) => mul(a, unit(j))[i]);
const equalVector = (x, y, tolerance = 1e-12) => x.every((value, i) => Math.abs(value - y[i]) <= tolerance);

const a = unit(1);
const b = unit(2);
const c = unit(4);
const labelAssociator = associator(a, b, c);
assert.deepEqual(labelAssociator, [0, 0, 0, 0, 0, 0, 0, 2]);

// Realized spatial/action chains compose associatively even when their labels do not.
const La = leftAction(a);
const Lb = leftAction(b);
const Lc = leftAction(c);
const actionAssociator = msub(mmul(mmul(La, Lb), Lc), mmul(La, mmul(Lb, Lc)));
assert.equal(frobenius2(actionAssociator), 0);

// The meaningful residual compares two compiler routes: collapse symbols first,
// then realize them as actions. It is not an associator of action composition.
const collapseLeftThenAct = mmul(leftAction(mul(a, b)), Lc);
const collapseRightThenAct = mmul(La, leftAction(mul(b, c)));
const compilerDefect = msub(collapseLeftThenAct, collapseRightThenAct);
assert(frobenius2(compilerDefect) > 0);
assert.deepEqual(mvec(compilerDefect, unit(0)), labelAssociator);

// A scalar sign still needs a selected direction. The canonical norm is even.
const reversed = associator(c, b, a);
assert(equalVector(reversed, labelAssociator.map((x) => -x)));
assert.equal(norm2(reversed), norm2(labelAssociator));

console.log(JSON.stringify({
  protocol: "muqarnas-label-action-compiler-boundary/1",
  interpretation: {
    labelAlgebra: "candidate symbolic cell-collapse grammar",
    actionAlgebra: "realized geometric attachment or transformation operators",
    warning: "nonassociative labels do not make associative action composition nonassociative"
  },
  witness: {
    labels: ["e1", "e2", "e4"],
    labelAssociator,
    labelAssociatorNormSquared: norm2(labelAssociator),
    actionAssociatorFrobeniusSquared: frobenius2(actionAssociator),
    compilerDefectFrobeniusSquared: frobenius2(compilerDefect),
    compilerDefectOnIdentity: mvec(compilerDefect, unit(0))
  },
  admissionRule: "A muqarnas bridge must exhibit a native symbol-collapse map and a separately sourced geometric realization; a label associator alone is insufficient.",
  passed: true
}, null, 2));


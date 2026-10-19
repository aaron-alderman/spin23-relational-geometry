import assert from 'node:assert/strict';

const tol = 1e-12;
const same = (A, B) => A.every((row, i) => row.every((x, j) => Math.abs(x - B[i][j]) < tol));
const add = (A, B) => A.map((row, i) => row.map((x, j) => x + B[i][j]));
const scale = (r, A) => A.map((row) => row.map((x) => r * x));
const product = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((s, x, k) => s + x * B[k][j], 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => a * b))));

const I = [[1, 0], [0, 1]];
const D = [[1, 0], [0, -1]];
const X = [[0, 1], [1, 0]];
const J = [[0, 1], [-1, 0]];
const epsilon = product(D, X);
const P = scale(0.5, add(I, D));
const Q = scale(0.5, add(I, scale(-1, D)));
const I4 = kron(I, I);
const E = kron(I, epsilon);
const S = (sign) => add(kron(I, P), scale(sign, kron(J, Q)));
const edgeES = (sign) => product(E, S(sign));
const edgeSE = (sign) => product(S(sign), E);
const power = (A, n) => {
  let out = I4;
  for (let k = 0; k < n; k += 1) out = product(A, out);
  return out;
};
const word = (edge, signs) => signs.reduce((acc, sign) => product(edge(sign), acc), I4);

const uniformES = edgeES(1);
const uniformSE = edgeSE(1);
assert.ok(same(power(uniformES, 2), scale(-1, kron(J, I))));
assert.ok(same(power(uniformSE, 2), scale(-1, kron(J, I))));
assert.ok(same(power(uniformES, 4), scale(-1, I4)));
assert.ok(same(power(uniformES, 6), kron(J, I)));
assert.ok(same(power(uniformES, 8), I4));
assert.ok(!same(power(uniformES, 6), scale(-1, I4)));
assert.ok(same(power(uniformES, 12), scale(-1, I4)));
assert.ok(same(power(uniformES, 24), I4));

const classify = (edge) => {
  const minusIdentity = [];
  const plusIdentity = [];
  const noncentral = [];
  for (let mask = 0; mask < 64; mask += 1) {
    const signs = Array.from({ length: 6 }, (_, n) => ((mask >> n) & 1 ? -1 : 1));
    const W = word(edge, signs);
    if (same(W, scale(-1, I4))) minusIdentity.push(signs);
    else if (same(W, I4)) plusIdentity.push(signs);
    else noncentral.push(signs);
  }
  return { minusIdentity, plusIdentity, noncentral };
};

const es = classify(edgeES);
const se = classify(edgeSE);
assert.equal(es.minusIdentity.length + es.plusIdentity.length + es.noncentral.length, 64);
assert.equal(se.minusIdentity.length + se.plusIdentity.length + se.noncentral.length, 64);

console.log(JSON.stringify({
  protocol: 'six-edge-sewing-quarter-turn-composition/1',
  uniformEdgeOrder: 8,
  uniformSixEdgeHolonomy: 'J_phase tensor I_channel',
  uniformTwelveEdgeHolonomy: '-I',
  uniformTwentyFourEdgeHolonomy: '+I',
  sewingThenTurn: {
    minusIdentityCount: es.minusIdentity.length,
    plusIdentityCount: es.plusIdentity.length,
    noncentralCount: es.noncentral.length,
    minusIdentityExamples: es.minusIdentity.slice(0, 4),
  },
  turnThenSewing: {
    minusIdentityCount: se.minusIdentity.length,
    plusIdentityCount: se.plusIdentity.length,
    noncentralCount: se.noncentral.length,
    minusIdentityExamples: se.minusIdentity.slice(0, 4),
  },
  passed: true,
}, null, 2));

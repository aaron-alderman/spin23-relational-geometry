import assert from 'node:assert/strict';

const add = (A, B) => A.map((r, i) => r.map((x, j) => x + B[i][j]));
const scale = (s, A) => A.map(r => r.map(x => s * x));
const mm = (A, B) => A.map(r => B[0].map((_, j) => r.reduce((s, x, k) => s + x * B[k][j], 0)));
const tr = A => A[0].map((_, j) => A.map(r => r[j]));
const trace = A => A[0][0] + A[1][1];
const det = A => A[0][0] * A[1][1] - A[0][1] * A[1][0];
const sharp = A => [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
const inv = A => scale(1 / det(A), sharp(A));
const same = (A, B) => A.every((r, i) => r.every((x, j) => Math.abs(x - B[i][j]) < 1e-12));
const zero = A => A.every(r => r.every(x => Math.abs(x) < 1e-12));

const q = (A, C) => {
  const s = trace(mm(A, C));
  return -2 * (s * s - 4 * det(A) * det(C));
};
const triple = (A, C) => {
  const s = trace(mm(A, C));
  return [
    add(scale(-s, A), scale(2 * det(A), sharp(C))),
    add(scale(s, C), scale(-2 * det(C), sharp(A))),
  ];
};

const I = [[1, 0], [0, 1]];
const G = [[2, 1], [1, 1]]; // det G=1, so every check remains integral.
const Ginv = inv(G);
const A = mm(G, tr(G));

for (const lambda of [2, 7]) {
  const C = scale(lambda, mm(tr(Ginv), Ginv));
  assert.ok(same(C, scale(lambda, inv(A))));
  assert.ok(Math.abs(q(A, C)) < 1e-12);
  const [TA, TC] = triple(A, C);
  assert.ok(zero(TA) && zero(TC));
  assert.equal(trace(mm(A, C)) / 2, lambda);
}

// The vanishing equations cannot distinguish the two positive inverse rays.
assert.ok(Math.abs(q(I, scale(2, I))) < 1e-12);
assert.ok(Math.abs(q(I, scale(7, I))) < 1e-12);
assert.ok(triple(I, scale(2, I)).every(zero));
assert.ok(triple(I, scale(7, I)).every(zero));

// An orientation reversal of a chosen link line lies in SO(8):
// diag(-1,-1,1,...,1) has determinant +1 and maps e_1 to -e_1.
const orientationReversal = [-1, -1, 1, 1, 1, 1, 1, 1];
assert.equal(orientationReversal.reduce((p, x) => p * x, 1), 1);
const e1 = [1, 0, 0, 0, 0, 0, 0, 0];
const reversed = e1.map((x, i) => orientationReversal[i] * x);
assert.ok(reversed.every((x, i) => Math.abs(x - (i === 0 ? -1 : 0)) < 1e-12));
assert.equal(e1.reduce((s, x) => s + x * x, 0), reversed.reduce((s, x) => s + x * x, 0));

console.log(JSON.stringify({
  protocol: 'frontier-freudenthal-inverse-orbit-no-selector/1',
  inversePair: 'C=lambda A^{-1}, A positive in H_2(R)',
  dualAction: '(A,C)->(G A G^T,G^{-T} C G^{-1})',
  exactOrbitWitness: {G, A, testedLambda: [2, 7]},
  quarticOnEveryTestedInverseRay: 0,
  tripleOnEveryTestedInverseRay: 0,
  residualOrbitLabel: 'lambda=tr(AC)/2=sqrt(det(A)det(C))',
  orientationReversalInsideSO8: orientationReversal,
  conclusion: 'The quartic-null/triple-critical equations classify inverse matching but leave a positive one-parameter family. Dual GL(2) removes A shape and scale at fixed lambda; norm symmetry removes the link-line and its sign. No scale, embedding, or orientation is selected.',
  passed: true,
}, null, 2));

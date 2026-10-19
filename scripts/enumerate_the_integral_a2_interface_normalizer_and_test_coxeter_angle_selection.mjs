import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3);
const G = [[2, -1], [-1, 2]];
const A = [[0, -1], [1, -1]];
const B = [[1, -1], [0, -1]];
const I = [[1, 0], [0, 1]];
const P = [[1, -1 / 2], [0, rt3 / 2]];
const Pinv = [[1, 1 / rt3], [0, 2 / rt3]];
const mm = (X, Y) => X.map(row => Y[0].map((_, j) => row.reduce((s, x, k) => s + x * Y[k][j], 0)));
const mv = (X, v) => X.map(row => row.reduce((s, x, j) => s + x * v[j], 0));
const tr = X => X[0].map((_, j) => X.map(row => row[j]));
const det = X => X[0][0] * X[1][1] - X[0][1] * X[1][0];
const trace = X => X[0][0] + X[1][1];
const eq = (X, Y, eps = 1e-10) => X.every((row, i) => row.every((x, j) => Math.abs(x - Y[i][j]) < eps));
const key = X => X.flat().join(',');
const reflection = v => {
  const n2 = v[0] ** 2 + v[1] ** 2;
  return [[1 - 2 * v[0] ** 2 / n2, -2 * v[0] * v[1] / n2], [-2 * v[0] * v[1] / n2, 1 - 2 * v[1] ** 2 / n2]];
};
const order = (X, max = 24) => {
  let Y = I;
  for (let k = 1; k <= max; k++) {
    Y = mm(Y, X);
    if (eq(Y, I)) return k;
  }
  return null;
};

const isometries = [];
for (let a = -3; a <= 3; a++) for (let b = -3; b <= 3; b++)
for (let c = -3; c <= 3; c++) for (let d = -3; d <= 3; d++) {
  const M = [[a, b], [c, d]];
  if (Math.abs(det(M)) === 1 && eq(mm(mm(tr(M), G), M), G)) isometries.push(M);
}
assert.equal(new Set(isometries.map(key)).size, 12);
const preserving = isometries.filter(M => det(M) === 1);
const reversing = isometries.filter(M => det(M) === -1);
assert.equal(preserving.length, 6);
assert.equal(reversing.length, 6);
assert.ok(reversing.some(M => eq(M, B)));
assert.ok(eq(mm(mm(tr(A), G), A), G));
assert.ok(eq(mm(mm(tr(B), G), B), G));

// Every reversing isometry is B times one of the six rotations ±A^k.
let Ak = I;
const rotations = [];
for (let k = 0; k < 3; k++) {
  rotations.push(Ak, Ak.map(row => row.map(x => -x)));
  Ak = mm(Ak, A);
}
const dihedralReflections = rotations.map(R => mm(B, R));
assert.equal(new Set(dihedralReflections.map(key)).size, 6);
assert.ok(reversing.every(M => dihedralReflections.some(N => eq(M, N))));

const n = [1, rt3];
const Hplus = reflection(n);
const outcomes = reversing.map(Tint => {
  const Teuclidean = mm(mm(P, Tint), Pinv);
  const Htwisted = reflection(mv(Teuclidean, n));
  const C = mm(Htwisted, Hplus);
  return { Tint, trace: Math.round(trace(C) * 1e12) / 1e12, order: order(C) };
});
const orderCounts = Object.fromEntries([...new Set(outcomes.map(x => x.order))].sort((a, b) => a - b).map(o => [o, outcomes.filter(x => x.order === o).length]));
const hchiOutcome = outcomes.find(x => eq(x.Tint, B));
assert.equal(hchiOutcome.order, 3);
assert.equal(hchiOutcome.trace, -1);
assert.ok(Object.keys(orderCounts).length > 1);

console.log(JSON.stringify({
  protocol: 'integral-a2-interface-normalizer/1',
  latticeMetric: G,
  automorphismGroup: { size: isometries.length, orientationPreserving: preserving.length, orientationReversing: reversing.length, structure: 'D6 of order 12' },
  orientationReversingCoset: 'B times {+/- I, +/- A, +/- A^2}',
  hchiIntegralReflection: B,
  coxeterOutcomeForHchi: hchiOutcome,
  coxeterOrderCountsAcrossAllIntegralReflections: orderCounts,
  verdict: 'integrality discretizes the continuous interface axis to six reflections but does not uniquely select the order-three h*chi reflection',
  consequence: 'The A2 lattice supplies finite protection after its emergence; the Standard-Model h*chi grading is still needed to choose the correct dihedral element.',
  passed: true,
}, null, 2));

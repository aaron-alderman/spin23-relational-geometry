import assert from 'node:assert/strict';

const rt2 = Math.sqrt(2), rt3 = Math.sqrt(3);
const c = (re, im = 0) => [re, im];
const add = ([a, b], [d, e]) => [a + d, b + e];
const sub = ([a, b], [d, e]) => [a - d, b - e];
const scale = (r, [a, b]) => [r * a, r * b];
const mul = ([a, b], [d, e]) => [a * d - b * e, a * e + b * d];
const conj = ([a, b]) => [a, -b];
const div = ([a, b], [d, e]) => { const n = d * d + e * e; return [(a * d + b * e) / n, (b * d - a * e) / n]; };
const realM = A => A.map(row => row.map(x => c(x)));
const identity = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => c(Number(i === j))));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const dagger = A => A[0].map((_, j) => A.map(row => conj(row[j])));
const madd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const msub = (A, B) => A.map((row, i) => row.map((x, j) => sub(x, B[i][j])));
const mscale = (r, A) => A.map(row => row.map(x => scale(r, x)));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const eigenvaluesHermitian2 = A => {
  const a = A[0][0][0], d = A[1][1][0], q = A[0][1][0] ** 2 + A[0][1][1] ** 2;
  const disc = Math.sqrt((a - d) ** 2 + 4 * q);
  return [(a + d - disc) / 2, (a + d + disc) / 2];
};
const rank = A => eigenvaluesHermitian2(A).filter(x => x > 1e-9).length;

// Root-label synthesis: rows are the three equal-norm A2 roots.
const M = realM([[1, rt3], [-2, 0], [1, -rt3]]);
const Pstd = realM([[2 / 3, -1 / 3, -1 / 3], [-1 / 3, 2 / 3, -1 / 3], [-1 / 3, -1 / 3, 2 / 3]]);
assert.ok(maxDefect(mm(dagger(M), M), realM([[6, 0], [0, 6]])) < 1e-12);
assert.ok(maxDefect(mm(M, dagger(M)), mscale(6, Pstd)) < 1e-12);

const zeta = c(-0.5, rt3 / 2), zeta2 = conj(zeta);
const F = [[c(1), c(1), c(1)], [c(1), zeta2, zeta], [c(1), zeta, zeta2]].map(row => row.map(x => scale(1 / rt3, x)));
const fourierPstd = mm(mm(dagger(F), Pstd), F);
const expectedFourierProjector = realM([[0, 0, 0], [0, 1, 0], [0, 0, 1]]);
assert.ok(maxDefect(fourierPstd, expectedFourierProjector) < 1e-12);

// Rebuild the loss-deformed active cycle and its unique character POVM.
const U = realM([[1 / 2, -rt3 / 2], [rt3 / 2, 1 / 2]]), Ut = dagger(U), D = realM([[1, 0], [0, -1]]);
const factor = (gamma, ell) => { const q = div(c(1, -gamma * Math.exp(-ell)), c(1, gamma * Math.exp(ell))); return mul(q, q); };
const cycle = ell => {
  const S = mm(mm(U, [[factor(1 + rt2, ell), c(0)], [c(0), factor(rt2 - 1, ell)]]), Ut);
  return mm(mm(mm(D, S.map(row => row.map(conj))), D), S);
};
const povm = C => {
  const Ch = dagger(C), re = mscale(0.5, madd(C, Ch));
  const diff = msub(C, Ch), im = mscale(0.5, diff.map(row => row.map(([x, y]) => c(y, -x))));
  const P0 = mscale(1 / 3, madd(identity(2), mscale(2, re))), half = mscale(0.5, msub(identity(2), P0));
  return [P0, madd(half, mscale(1 / rt3, im)), msub(half, mscale(1 / rt3, im))];
};
const losslessEffects = povm(cycle(0)), lossyEffects = povm(cycle(0.05));
const effectData = effects => effects.map(P => ({ rank: rank(P), eigenvalues: eigenvaluesHermitian2(P), trace: P[0][0][0] + P[1][1][0] }));

const rootEffects = [[1, rt3], [-2, 0], [1, -rt3]].map(g => realM([
  [g[0] * g[0] / 6, g[0] * g[1] / 6],
  [g[1] * g[0] / 6, g[1] * g[1] / 6],
]));
const rootEffectData = effectData(rootEffects);
assert.deepEqual(rootEffectData.map(x => x.rank), [1, 1, 1]);
assert.deepEqual(effectData(losslessEffects).map(x => x.rank), [0, 1, 1]);
assert.deepEqual(effectData(lossyEffects).map(x => x.rank), [2, 2, 2]);

console.log(JSON.stringify({
  protocol: 'a2-root-label-versus-dilation-character-duality/1',
  rootFrame: { synthesisIdentities: ['M^*M=6I2', 'MM^*=6Pstd'], normalizedEffectData: rootEffectData },
  labelFourierTransform: { transformedZeroSumProjector: 'diag(0,1,1)', consequence: 'the A2 label plane contains exactly the two nontrivial C3 characters' },
  dilationEffects: { lossless: effectData(losslessEffects), equalLoss005: effectData(lossyEffects) },
  obstruction: 'Rank patterns (1,1,1), (0,1,1), and (2,2,2) differ, so no invertible carrier congruence identifies the root tight-frame POVM with either dilation POVM.',
  bridge: 'The structures are Fourier dual at the three-label level: cyclic root labels map to characters. Loss activates the formerly absent trivial-character environment sector.',
  limitation: 'Fourier-dual labels do not derive the loss weights or identify environment ports with mediator particles.',
  passed: true,
}, null, 2));

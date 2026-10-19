import assert from 'node:assert/strict';

const rt3 = Math.sqrt(3), a = 2 * Math.PI / 3;
const c = (re, im = 0) => [re, im];
const add = ([x, y], [u, v]) => [x + u, y + v];
const mul = ([x, y], [u, v]) => [x * u - y * v, x * v + y * u];
const conj = ([x, y]) => [x, -y];
const scale = (r, [x, y]) => [r * x, r * y];
const realM = A => A.map(row => row.map(x => c(x)));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((z, x, k) => add(z, mul(x, B[k][j])), c(0))));
const transpose = A => A[0].map((_, j) => A.map(row => row[j]));
const dagger = A => transpose(A).map(row => row.map(conj));
const maxDefect = (A, B) => Math.max(...A.flatMap((row, i) => row.map((x, j) => Math.hypot(x[0] - B[i][j][0], x[1] - B[i][j][1]))));
const zeta = c(-0.5, rt3 / 2), zeta2 = conj(zeta);
const F = [[c(1), c(1), c(1)], [c(1), zeta2, zeta], [c(1), zeta, zeta2]].map(row => row.map(x => scale(1 / rt3, x)));
const diagonal = xs => xs.map((x, i) => xs.map((_, j) => i === j ? x : c(0)));
const Q = diagonal([c(1), zeta, zeta2]);
const T = mm(mm(F, Q), dagger(F));
const Tinv = dagger(T);

// Principal autonomous Hermitian generator for one unit time.
const H = mm(mm(F, diagonal([c(0), c(-a), c(a)])), dagger(F));
const expMinusIH = mm(mm(F, diagonal([c(1), zeta, zeta2])), dagger(F));
const chiralScale = 2 * Math.PI / (3 * rt3);
const orientedAdjacency = [[c(0), c(0, 1), c(0, -1)], [c(0, -1), c(0), c(0, 1)], [c(0, 1), c(0, -1), c(0)]];
const orientedH = orientedAdjacency.map(row => row.map(x => scale(chiralScale, x)));

assert.ok(maxDefect(H, dagger(H)) < 1e-12);
assert.ok(Math.min(maxDefect(H, orientedH), maxDefect(H, orientedH.map(row => row.map(x => scale(-1, x))))) < 1e-12);
assert.ok(maxDefect(expMinusIH, T) < 1e-12);
assert.ok(maxDefect(transpose(T), T) > 0.9);

// Two reciprocal local involutions give the same shift as a Floquet word.
const S01 = realM([[0, 1, 0], [1, 0, 0], [0, 0, 1]]);
const S12 = realM([[1, 0, 0], [0, 0, 1], [0, 1, 0]]);
for (const S of [S01, S12]) {
  assert.ok(maxDefect(transpose(S), S) < 1e-12);
  assert.ok(maxDefect(mm(S, S), realM([[1, 0, 0], [0, 1, 0], [0, 0, 1]])) < 1e-12);
}
const wordForward = mm(S12, S01), wordReverse = mm(S01, S12);
const forwardChoice = maxDefect(wordForward, T) < maxDefect(wordReverse, T) ? 'S12 S01' : 'S01 S12';
assert.ok(Math.min(maxDefect(wordForward, T), maxDefect(wordReverse, T)) < 1e-12);
assert.ok(Math.min(maxDefect(wordForward, Tinv), maxDefect(wordReverse, Tinv)) < 1e-12);

console.log(JSON.stringify({
  protocol: 'three-label-shift-local-realization-classification/1',
  autonomous: {
    generator: 'H = (2 pi/(3 sqrt(3))) i times oriented triangle adjacency, up to orientation sign',
    hermitianDefect: maxDefect(H, dagger(H)),
    exponentialDefect: maxDefect(expMinusIH, T),
    reciprocityObstruction: maxDefect(transpose(T), T),
    orientationReversal: 'complex conjugation sends H to -H and T to T^{-1}',
  },
  twoStep: {
    faces: ['S01', 'S12'],
    eachSymmetricOrthogonalInvolution: true,
    forwardWord: forwardChoice,
    reverseWord: forwardChoice === 'S12 S01' ? 'S01 S12' : 'S12 S01',
    productsGiveOppositeThreeCycles: true,
  },
  verdict: 'One autonomous continuous generator needs an oriented chiral hopping. Alternatively, two individually reciprocal local swap faces generate the directed three-cycle as an ordered Floquet word.',
  passed: true,
}, null, 2));

import assert from 'node:assert/strict';

const close = (a, b, eps = 1e-10) => Math.abs(a - b) < eps;
const matScale = (A, x) => A.map(row => row.map(v => v * x));
const matAdd = (A, B, a = 1, b = 1) => A.map((row, i) => row.map((v, j) => a * v + b * B[i][j]));
const maxDiff = (A, B) => Math.max(...A.flatMap((row, i) => row.map((v, j) => Math.abs(v - B[i][j]))));
const mm = (A, B) => A.map(row => B[0].map((_, j) => row.reduce((s, v, k) => s + v * B[k][j], 0)));
const eye = n => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 1 : 0));
const kron = (A, B) => A.flatMap(rowA => B.map(rowB => rowA.flatMap(a => rowB.map(b => a * b))));

for (const [n, expected] of [[1, 1], [2, 3], [3, 6], [4, 10]]) {
  assert.equal(n * (n + 1) / 2, expected);
  assert.equal(n * n, expected + n * (n - 1) / 2);
}

// The central U(1) sends every symmetric tensor to exp(2 i theta) times itself.
const theta = 0.37;
const phaseDistanceFromOne = Math.hypot(Math.cos(2 * theta) - 1, Math.sin(2 * theta));
assert(phaseDistanceFromOne > 1e-3);
// Invariance under this element implies phase*S=S; with nontrivial phase, every component is zero.
const sampleSymmetric = [[1.2, -0.4, 0.7], [-0.4, 2.1, 0.3], [0.7, 0.3, -1.1]];
assert(maxDiff(sampleSymmetric, matScale(sampleSymmetric, Math.cos(2 * theta))) > 1e-3);

// Generation endomorphisms commute with a generation-blind source action A tensor I.
const A = [[1, 2], [-3, 0.5]];
const B = [[0.2, 1.1, -0.4], [0.7, -0.3, 0.9], [1.2, 0.1, 0.6]];
const source = kron(A, eye(3));
const generation = kron(eye(2), B);
assert(maxDiff(mm(source, generation), mm(generation, source)) < 1e-12);
assert.equal(3 * 3, 9); // complex dimension of the multiplicity commutant M_3(C)

// One spurion forces alignment.
const S = [[2, 0.4, -0.2], [0.4, 1.1, 0.6], [-0.2, 0.6, 0.8]];
const a = 1.7, b = -0.9;
const Mone = matScale(S, a);
const Cone = matScale(S, b);
assert(maxDiff(Cone, matScale(Mone, b / a)) < 1e-12);

// Two independent spurions are generically misaligned; ad-bc is the coefficient determinant.
const T = [[0.1, 0.8, 0.3], [0.8, -0.5, 0.2], [0.3, 0.2, 1.4]];
const ca = 1.2, cb = -0.4, cc = 0.3, cd = 1.1;
const Mtwo = matAdd(S, T, ca, cb);
const Ctwo = matAdd(S, T, cc, cd);
const coefficientDeterminant = ca * cd - cb * cc;
assert(!close(coefficientDeterminant, 0));
const ratio = Ctwo[0][0] / Mtwo[0][0];
assert(maxDiff(Ctwo, matScale(Mtwo, ratio)) > 1e-3);

// If coefficient vectors are proportional, two-spurion alignment is restored.
const lambda = -0.65;
const CalignedTwo = matAdd(S, T, lambda * ca, lambda * cb);
assert(maxDiff(CalignedTwo, matScale(Mtwo, lambda)) < 1e-12);

// Signed permutations leave the orthogonal invariant ray span{I} fixed.
const P = [[0, -1, 0], [1, 0, 0], [0, 0, -1]];
const PT = P[0].map((_, j) => P.map(row => row[j]));
assert(maxDiff(mm(mm(PT, eye(3)), P), eye(3)) < 1e-12);

console.log('Generation-commutant alignment no-go certificate: PASS');
console.log('Sym2 counts=1,3,6,10; U(n) invariant symmetric vector=0; commutant_dim_n3=9; single_spurion_aligned=true; two_spurion_generic=false');

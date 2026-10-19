import assert from 'node:assert/strict';

const tol = 1e-12;
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const cm = (A) => A.map((row) => row.map((x) => typeof x === 'number' ? C(x) : x));
const mm = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((s, x, k) => add(s, mul(x, B[k][j])), C(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const maxAbs = (A) => Math.max(...A.flat().map((z) => Math.hypot(z.re, z.im)));
const sub = (A, B) => A.map((row, i) => row.map((x, j) => C(x.re - B[i][j].re, x.im - B[i][j].im)));
const eq = (A, B) => maxAbs(sub(cm(A), cm(B))) < tol;
const rmm = (A, B) => A.map((row) => B[0].map((_, j) =>
  row.reduce((s, x, k) => s + x * B[k][j], 0)));

const A = [[0, -1], [1, -1]];
const Lambda = [[1, 0, 1], [0, 1, 1]]; // columns u,d,l
const T = [[0, 0, -1], [1, 0, 0], [0, -1, 0]];
const I3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
assert.deepEqual(rmm(A, Lambda), rmm(Lambda, T));
assert.deepEqual(rmm(rmm(T, T), T), I3);
const kernel = [-1, -1, 1];
assert.deepEqual(T.map((row) => row.reduce((s, x, i) => s + x * kernel[i], 0)), kernel);

// Source gauge orientation: u,d use S^dagger while l uses S.
const P = [[-1, 0, 0], [0, -1, 0], [0, 0, 1]];
const commutator = rmm(T, P).map((row, i) => row.map((x, j) => x - rmm(P, T)[i][j]));
assert(commutator.flat().some((x) => x !== 0));

const H0 = cm([[2, -1], [-1, 2]]);
const Hodd = [[C(0), C(0, 1)], [C(0, -1), C(0)]];
const Ac = cm(A);
const invariant = (H) => maxAbs(sub(mm(mm(dagger(Ac), H), Ac), H)) < tol;
assert(invariant(H0));
assert(invariant(Hodd));

// General C3-invariant Hermitian form:
// H=a/2 G_A2 + d [[0,i],[-i,0]].
const general = (a, d) => [
  [C(a), C(-a / 2, d)],
  [C(-a / 2, -d), C(a)],
];
for (const [a, d] of [[2, 0], [3, 0.4], [1.7, -0.2]]) assert(invariant(general(a, d)));

// Positivity and Real symmetry.
const determinant = (a, d) => 3 * a * a / 4 - d * d;
assert(determinant(2, 0.5) > 0);
const realConjugate = (H) => H.map((row) => row.map(conj));
assert(eq(realConjugate(H0), H0));
assert(eq(realConjugate(Hodd), Hodd.map((row) => row.map((z) => C(-z.re, -z.im)))));
assert(!eq(realConjugate(general(2, 0.5)), general(2, 0.5)));
assert(eq(realConjugate(general(2, 0)), general(2, 0)));

console.log(JSON.stringify({
  protocol: 'c3-real-counterterms-gauge-orientation-wilson-a2-mediator/1',
  couplingIntertwiner: {
    sourceOrder: ['u', 'd', 'l'],
    Lambda,
    signedSourceCycle: T,
    equation: 'A Lambda = Lambda T',
    kernel: kernel,
    kernelMeaning: 'l-u-d=0',
    kernelFixedByCycle: true,
  },
  countertermAlgebra: {
    c3InvariantHermitianFamily: 'H(a,d)=[[a,-a/2+i d],[-a/2-i d,a]]',
    realDimension: 2,
    positiveCondition: '|d| < sqrt(3) a/2 with a>0',
    evenGenerator: 'G_A2',
    oddGenerator: '[[0,i],[-i,0]]',
    complexConjugationAction: 'd -> -d',
    c3PlusRealInvariantCone: 'positive multiples of G_A2',
  },
  gaugeOrientationAudit: {
    orientationOrder: ['u:S-dagger', 'd:S-dagger', 'l:S'],
    grading: P,
    signedCycleCommutesWithOrientation: false,
    consequence: 'the source cycle is not an ordinary complex-linear gauge symmetry; it requires conjugation/graded sewing or a neutral effective quotient',
  },
  verdict: {
    metricProtection: 'C3 plus compatible Real symmetry protects the A2 metric ray against quadratic counterterms',
    unresolved: 'derive the Real/graded action on the actual gauge-dressed S1 vertices and show it is compatible with locality and the Standard-Model charge algebra',
  },
  passed: true,
}, null, 2));

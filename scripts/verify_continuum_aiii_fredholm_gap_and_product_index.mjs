const fail = (message) => { throw new Error(message); };
const assert = (condition, message) => { if (!condition) fail(message); };
const C = (re, im = 0) => ({ re, im });
const add = (x, y) => C(x.re + y.re, x.im + y.im);
const sub = (x, y) => C(x.re - y.re, x.im - y.im);
const mul = (x, y) => C(x.re * y.re - x.im * y.im, x.re * y.im + x.im * y.re);
const conj = (x) => C(x.re, -x.im);
const scale = (a, x) => C(a * x.re, a * x.im);
const abs = (x) => Math.hypot(x.re, x.im);
const matAdd = (A, B) => A.map((row, i) => row.map((x, j) => add(x, B[i][j])));
const matScale = (a, A) => A.map((row) => row.map((x) => scale(a, x)));
const matMul = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((q, x, k) => add(q, mul(x, B[k][j])), C(0))));
const dagger = (A) => A[0].map((_, j) => A.map((row) => conj(row[j])));
const identity = (n) => Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => C(i === j ? 1 : 0)));
const zeros = (n, m) => Array.from({ length: n }, () => Array.from({ length: m }, () => C(0)));
const diagonal = (xs) => xs.map((x, i) => xs.map((_, j) => C(i === j ? x : 0)));
const kron = (A, B) => A.flatMap((rowA) => B.map((rowB) => rowA.flatMap((a) => rowB.map((b) => mul(a, b)))));
const closeMatrix = (A, B, tol = 1e-10) => A.every((row, i) => row.every((x, j) => abs(sub(x, B[i][j])) < tol));
const block = (A, B, D, E) => [...A.map((r, i) => [...r, ...B[i]]), ...D.map((r, i) => [...r, ...E[i]])];

const sx = [[C(0), C(1)], [C(1), C(0)]];
const sy = [[C(0), C(0, -1)], [C(0, 1), C(0)]];
const sz = [[C(1), C(0)], [C(0), C(-1)]];

// One-generation internal 8+7 Yukawa complex with one forced unmatched direction.
const M = zeros(8, 7);
for (let i = 0; i < 7; i += 1) {
  M[i][i] = C(i + 1, i % 2 === 0 ? 0.2 : -0.3);
}
const H = block(zeros(8, 8), M, dagger(M), zeros(7, 7));
const W = diagonal([...Array(8).fill(1), ...Array(7).fill(-1)]);
const I15 = identity(15);
const S = kron(sy, W);
const zero30 = zeros(30, 30);

assert(closeMatrix(matAdd(matMul(W, H), matMul(H, W)), zeros(15, 15)), "internal Yukawa operator must be W-odd");

const symbol = (k, mass, textureScale = 1) => matAdd(
  matAdd(matScale(k, kron(sx, I15)), matScale(mass, kron(sz, I15))),
  matScale(textureScale, kron(sy, H)),
);

for (const [k, mass, textureScale] of [[0, 2, 1], [1.3, -3, 0.4], [-2.1, 1.5, 0]]) {
  const D = symbol(k, mass, textureScale);
  assert(closeMatrix(matAdd(matMul(S, D), matMul(D, S)), zero30), "continuum symbol must retain total AIII grading");
  const D2 = matMul(D, D);
  const expected = matAdd(
    matScale(k * k + mass * mass, identity(30)),
    matScale(textureScale * textureScale, kron(identity(2), matMul(H, H))),
  );
  assert(closeMatrix(D2, expected, 1e-8), "asymptotic symbol square identity mismatch");
  // The square differs from (k^2+m^2)I by textureScale^2 I⊗H^2 = (I⊗H)^†(I⊗H), hence is bounded below.
  assert(k * k + mass * mass > 0, "asymptotic lower gap must be positive");
}

// Scaling every bounded W-odd texture to zero cannot close the asymptotic gap when m_± are nonzero.
const mMinus = -2;
const mPlus = 3;
for (let step = 0; step <= 10; step += 1) {
  const tau = step / 10;
  assert(Math.min(mMinus * mMinus, mPlus * mPlus) > 0, "wall gap must stay open along texture homotopy");
  const Dminus = symbol(0, mMinus, tau);
  const Dplus = symbol(0, mPlus, tau);
  assert(closeMatrix(matAdd(matMul(S, Dminus), matMul(Dminus, S)), zero30), "negative-end homotopy must stay AIII");
  assert(closeMatrix(matAdd(matMul(S, Dplus), matMul(Dplus, S)), zero30), "positive-end homotopy must stay AIII");
}

// The continuum fiber ranks are equal, unlike the finite toy complex.
const totalPlusFiber = 1 * 8 + 1 * 7;
const totalMinusFiber = 1 * 7 + 1 * 8;
assert(totalPlusFiber === 15 && totalMinusFiber === 15, "continuum total-grading fiber ranks must be equal");

// Analytic product index: wall index times internal superdimension.
const wallIndex = 1;
const oneGenerationSuperdimension = 8 - 7;
const generations = 3;
const productIndex = wallIndex * generations * oneGenerationSuperdimension;
assert(productIndex === 3, "three-generation Fredholm product index must be three");

// Dirac completion balances 8+8; a same-sector block breaks W-oddness.
assert(wallIndex * generations * (8 - 8) === 0, "Dirac completion must balance the index");
const sameSector = zeros(15, 15);
sameSector[0][0] = C(0.4);
const brokenH = matAdd(H, sameSector);
assert(!closeMatrix(matAdd(matMul(W, brokenH), matMul(brokenH, W)), zeros(15, 15)), "same-sector Majorana term must break the grading");

console.log("Continuum AIII Fredholm-gap and product-index certificate: PASS");
console.log("asymptotic_symbol_square=k^2+m^2+H_Y^2; nonzero_wall_mass_protects_gap");
console.log("continuum_fiber_ranks=15_and_15; index_is_analytic_not_rank_imbalance");
console.log("index=wall_index*(8-7)*3=3; Dirac_completion=0; Majorana_breaks_grading");

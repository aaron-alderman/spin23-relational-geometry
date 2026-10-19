import assert from "node:assert/strict";

const mod = (x, q) => ((x % q) + q) % q;
const z = (re = 0, im = 0) => ({ re, im });
const add = (a, b) => z(a.re + b.re, a.im + b.im);
const sub = (a, b) => z(a.re - b.re, a.im - b.im);
const mul = (a, b) => z(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re);
const scale = (a, s) => z(a.re * s, a.im * s);
const div = (a, b) => scale(mul(a, z(b.re, -b.im)), 1 / (b.re * b.re + b.im * b.im));
const exp = (a) => scale(z(Math.cos(a.im), Math.sin(a.im)), Math.exp(a.re));
const sqrt = (a) => {
  const r = Math.hypot(a.re, a.im);
  const re = Math.sqrt(Math.max(0, (r + a.re) / 2));
  const im = Math.sign(a.im || 1) * Math.sqrt(Math.max(0, (r - a.re) / 2));
  return z(re, im);
};
const abs = (a) => Math.hypot(a.re, a.im);
const det2 = (M) => sub(mul(M[0][0], M[1][1]), mul(M[0][1], M[1][0]));
const inv2 = (M) => {
  const d = det2(M);
  return [[div(M[1][1], d), div(scale(M[0][1], -1), d)], [div(scale(M[1][0], -1), d), div(M[0][0], d)]];
};
const mm2 = (A, B) => A.map((row) => B[0].map((_, j) => row.reduce((sum, x, k) => add(sum, mul(x, B[k][j])), z())));
const realComplex = (A) => A.map((row) => row.map((x) => z(x, 0)));
const block = (M, r, c) => [[M[r][c], M[r][c + 1]], [M[r + 1][c], M[r + 1][c + 1]]];

function transformTau(M, tau) {
  const A = realComplex(block(M, 0, 0));
  const B = realComplex(block(M, 0, 2));
  const C = realComplex(block(M, 2, 0));
  const D = realComplex(block(M, 2, 2));
  const numerator = mm2(A, tau).map((row, i) => row.map((x, j) => add(x, B[i][j])));
  const denominator = mm2(C, tau).map((row, i) => row.map((x, j) => add(x, D[i][j])));
  return { tau: mm2(numerator, inv2(denominator)), automorphy: sqrt(det2(denominator)) };
}

function thetaConstant(tau, cutoff = 8) {
  const a = [1, 1], b = [1, 1];
  let total = z();
  for (let n1 = -cutoff; n1 <= cutoff; n1++) for (let n2 = -cutoff; n2 <= cutoff; n2++) {
    const v = [n1 + a[0] / 2, n2 + a[1] / 2];
    let quadratic = z();
    for (let i = 0; i < 2; i++) for (let j = 0; j < 2; j++) quadratic = add(quadratic, scale(tau[i][j], v[i] * v[j]));
    const linear = v[0] * b[0] + v[1] * b[1];
    total = add(total, exp(add(mul(z(0, Math.PI), quadratic), z(0, Math.PI * linear))));
  }
  return total;
}

// Generic point away from the decomposable locus where odd x odd vanishes.
const tau = [[z(0.13, 1.2), z(0.07, 0.23)], [z(0.07, 0.23), z(-0.11, 0.95)]];
const tauSecond = [[z(-0.19, 1.05), z(0.09, -0.18)], [z(0.09, -0.18), z(0.17, 1.31)]];
const C3h1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 3, 0], [0, 0, 0, 1]];
const C3h2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 3]];
const FourierH1 = [[0, 0, -1, 0], [0, 1, 0, 0], [1, 0, 0, 0], [0, 0, 0, 1]];
const FourierH2 = [[1, 0, 0, 0], [0, 0, 0, -1], [0, 0, 1, 0], [0, 1, 0, 0]];
const upper3E11 = [[1, 0, 3, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const upper3E22 = [[1, 0, 0, 0], [0, 1, 0, 3], [0, 0, 1, 0], [0, 0, 0, 1]];
const mutual = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 2, 1, 0], [2, 3, 0, 1]];
const forbidden = [[1, 0, 0, 0], [0, 1, 0, 0], [3, 0, 1, 0], [0, 1, 0, 1]];
const lower2E11 = [[1, 0, 0, 0], [0, 1, 0, 0], [2, 0, 1, 0], [0, 0, 0, 1]];
const lower2E22 = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 2, 0, 1]];
const lower2Off = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 2, 1, 0], [2, 0, 0, 1]];
const lower2I = [[1, 0, 0, 0], [0, 1, 0, 0], [2, 0, 1, 0], [0, 2, 0, 1]];
const upper2E11 = [[1, 0, 2, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const upper2E22 = [[1, 0, 0, 0], [0, 1, 0, 2], [0, 0, 1, 0], [0, 0, 0, 1]];
const upper2Off = [[1, 0, 0, 2], [0, 1, 2, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
const upper2I = [[1, 0, 2, 0], [0, 1, 0, 2], [0, 0, 1, 0], [0, 0, 0, 1]];
const identity = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];

const theta0 = thetaConstant(tau);
assert.ok(abs(theta0) > 1e-6);
const multiplierRatio = (M, point = tau) => {
  const transformed = transformTau(M, point);
  return div(thetaConstant(transformed.tau), mul(transformed.automorphy, thetaConstant(point)));
};
const squareComplex = (a) => mul(a, a);
const near = (a, b, tolerance = 6e-5) => abs(sub(a, b)) < tolerance;
for (const [name, M, chi, eta, testRelation = true] of [
  ["identity", identity, 0, 0], ["C3_handle_1", C3h1, 0, 0], ["C3_handle_2", C3h2, 0, 0],
  ["Fourier_handle_1_outside_matched", FourierH1, 0, 1, false], ["Fourier_handle_2_outside_matched", FourierH2, 0, 1, false],
  ["upper_3E11_outside_matched", upper3E11, 0, 1, false], ["upper_3E22_outside_matched", upper3E22, 0, 1, false],
  ["positive_mutual", mutual, 0, 1], ["forbidden_shear", forbidden, 1, 1],
  ["lower_2E11", lower2E11, 1, 0], ["lower_2E22", lower2E22, 1, 0], ["lower_2off", lower2Off, 0, 0], ["lower_2I", lower2I, 0, 0],
  ["upper_2E11", upper2E11, 1, 0], ["upper_2E22", upper2E22, 1, 0], ["upper_2off", upper2Off, 0, 0], ["upper_2I", upper2I, 0, 0],
]) {
  const ratio = multiplierRatio(M);
  const squared = squareComplex(ratio);
  const fourth = mul(mul(ratio, ratio), mul(ratio, ratio));
  const target = z((chi ^ eta) ? -1 : 1, 0);
  if (testRelation) {
    assert.ok(near(squared, target), `${name}: squared multiplier must equal (-1)^(chi+eta)`);
    assert.ok(near(squareComplex(multiplierRatio(M, tauSecond)), target), `${name}: relation must persist at the second Siegel point`);
  }
  console.log(`${name} chi=${chi} eta=${eta} ratio=${ratio.re.toFixed(9)}${ratio.im >= 0 ? "+" : ""}${ratio.im.toFixed(9)}i abs=${abs(ratio).toFixed(9)} square=${squared.re.toFixed(9)}${squared.im >= 0 ? "+" : ""}${squared.im.toFixed(9)}i fourth=${fourth.re.toFixed(9)}${fourth.im >= 0 ? "+" : ""}${fourth.im.toFixed(9)}i`);
}

let shearTests = 0;
for (let k11 = 0; k11 < 4; k11++) for (let k22 = 0; k22 < 4; k22++) for (const k12 of [0, 2]) {
  if (k11 % 2 !== k22 % 2) continue;
  const k = k11 % 2;
  const chi = mod((k11 + k22) / 2 + k, 2);
  const target = z((chi ^ k) ? -1 : 1, 0);
  const lower = [[1, 0, 0, 0], [0, 1, 0, 0], [k11, k12, 1, 0], [k12, k22, 0, 1]];
  const upper = [[1, 0, k11, k12], [0, 1, k12, k22], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (const point of [tau, tauSecond]) {
    assert.ok(near(squareComplex(multiplierRatio(lower, point)), target));
    assert.ok(near(squareComplex(multiplierRatio(upper, point)), target));
  }
  shearTests += 2;
}
assert.equal(shearTests, 32);
console.log("squared_multiplier_relation=epsilon_squared=(-1)^(chi+common_handle_parity)");
console.log("all_admissible_upper_and_lower_shear_tests=" + shearTests);
console.log("generic_siegel_points_tested=2");
